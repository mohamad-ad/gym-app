import { Avatar, Paper, Skeleton, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { fetchExercises } from "../../redux/exercisesSlice";
import { useDispatch } from "react-redux";

const BodyPartCard = ({ item, setSelected, selected }) => {
  const StyledCard = styled(Paper)(({ theme }) => ({
    width: "200px",
    height: "220px",
    cursor: "pointer",
    margin: "10px 2px",
    backgroundColor:
      selected
        ? theme.palette.text.primary
        : theme.palette.background.paper,
  }));
  const CardContentWrapper = styled(Stack)({
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const CardAvatar = styled(Avatar)(({ theme }) => ({
    marginTop: "10px",
    width: "100px",
    height: "100px",
    backgroundColor: "#fff",
    padding: "10px",
  }));
  const CardText = styled(Typography)(({ theme }) => ({
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "20px",
    marginBottom: "20px",
    color:
      selected 
        ? theme.palette.background.paper
        : theme.palette.text.primary,
  }));

  const dispatch = useDispatch();
  const handleClick = (e, item) => {
    e.preventDefault();
    setSelected(item);
    if (item === "all") return dispatch(fetchExercises({}));
    dispatch(fetchExercises({ bodyPart: item }));
  };
  return item ? (
    <StyledCard elevation={5}  onClick={(e) => handleClick(e, item)}>
      <CardContentWrapper>
        <CardAvatar
          alt={`${item}`}
          src={require(`../../assets/icons/${item}.png`)}
        />
        <CardText>{item}</CardText>
      </CardContentWrapper>
    </StyledCard>
  ) : (
    <StyledCard elevation={5}  >
    <Stack justifyContent={"center"} alignItems="center">
      <Skeleton
        variant="circular"
        style={{ marginTop: "10px" }}
        width="100px"
        height="100px"
      />
      <Skeleton
        variant="rectangular"
        sx={{ mt: "50px" }}
        width={"50%"}
        height={20}
      />
    </Stack>
    </StyledCard>
  );
};

export default BodyPartCard;
