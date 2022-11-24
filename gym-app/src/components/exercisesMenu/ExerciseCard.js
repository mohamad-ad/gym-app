import React from "react";
import {
  Checkbox,
  Divider,
  Paper,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  jwtSelector,
  userSelector,
} from "../../redux/userSlice";

const StyledCard = styled(Paper)(({ theme }) => ({
  width: "300px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  position: "relative",
}));

const CardText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "500",
}));

const ExerciseCard = ({ exercise }) => {
  const dispatch = useDispatch();
  const jwt = useSelector(jwtSelector);
  const user = useSelector(userSelector);
  const addToFavorite = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(addFavorite({ exerciseId: exercise.id, jwt: jwt }));
    } else {
      dispatch(removeFavorite({ exerciseId: exercise.id, jwt: jwt }));
    }
  };
  let exist;
  if (user.isLogedin) {
    if (user.userInfo.favIds.length > 0) {
      exist = user.userInfo.favIds.find((fav) => fav === exercise.id);
    }
  }

  return exercise ? (
    <StyledCard elevation={8}>
      <img
        style={{ width: "90%", height: "70%", borderRadius: "10px" }}
        src={exercise.gifUrl}
        alt={exercise.name}
      />
      <Checkbox
        checked={Boolean(exist)}
        onChange={addToFavorite}
        sx={{ position: "absolute", top: "10px", right: "10px" }}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite color="error" />}
      />
      <Divider width="80%" sx={{ m: "30px auto" }} variant="middle" />
      <CardText variant="body1"> {exercise.name}</CardText>
    </StyledCard>
  ) : (
    <StyledCard elevation={8}>
      <Skeleton variant="rounded" width={"90%"} height={"230px"} />
      <Divider width="80%" sx={{ m: "30px auto" }} variant="middle" />
      <Skeleton variant="rounded" width={"90%"} height={30} />
    </StyledCard>
  );
};

export default ExerciseCard;
