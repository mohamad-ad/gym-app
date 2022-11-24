import React, { memo, useEffect } from "react";
import { Box, styled, Typography } from "@mui/material";
import HorizontalScrollMenu from "../HorizontalScrollMenu";
import { useSelector, useDispatch } from "react-redux";
import { bodyPartsSelector, fetchBodyParts } from "../../redux/exercisesSlice";
import BodyPartCard from "./BodyPartCard";

const BodyPartsMenu = () => {
  const dispatch = useDispatch();
  const bodyParts = useSelector(bodyPartsSelector);
  const items = ["all", ...bodyParts.map((bodyPart) => bodyPart.name)];
  useEffect(() => {
    dispatch(fetchBodyParts());
  }, [dispatch]);

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: "500",
    margin: "0 0 30px 50px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));
  return (
    <Box m="60px auto">
      <StyledTypography> Exercises By Body Part </StyledTypography>
      <HorizontalScrollMenu items={items} Component={BodyPartCard}/>
    </Box>
  );
};

export default memo(BodyPartsMenu);
