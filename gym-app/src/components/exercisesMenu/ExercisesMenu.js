import { Box,  Divider, Paper, Skeleton, Stack, styled, Typography } from "@mui/material";
import React  from "react";
import ExerciseCard from "./ExerciseCard";

const ExercisesContainer = styled(Stack)(({theme})=>({
  marginTop:'50px',
  flexDirection:'row',
  flexWrap:'wrap',
  gap:'20px',
  justifyContent:'center',
  alignContent:'center',
  alignItems:"center"
}))

const ExercisesMenu = ({ exercises }) => {
  return (
      exercises &&
      <ExercisesContainer>
        {exercises.length > 0
          ? exercises.slice(0, 9).map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise}/>
            ))
          : Array(9)
              .fill(0)
              .map((item, index) => (
                <ExerciseCard key={index}/>  
              ))}
      </ExercisesContainer>
   
  );
};


export default ExercisesMenu;
