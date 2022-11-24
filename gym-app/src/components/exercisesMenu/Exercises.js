import React, { useEffect, useState } from "react";
import ExercisesMenu from "./ExercisesMenu";
import { useSelector, useDispatch } from "react-redux";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { exercisesSelector, fetchExercises } from "../../redux/exercisesSlice";
import { Box, Pagination, styled } from "@mui/material";

const PaginationBox = styled(Box)(({theme})=>({
  display:'flex',
  justifyContent:'center',
  margin:'50px auto'
}))

const Exercises = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const exercises = useSelector(exercisesSelector);
  useEffect(() => {
    dispatch(fetchExercises({ query: query }));
  }, [query]);
  useEffect(() => {
    dispatch(fetchExercises({}));
  }, []);

  const exercisesPerPage = 9;
  const lastExerciseIndex = exercisesPerPage * currentPage;
  const firstExerciseIndex = lastExerciseIndex - exercisesPerPage;
  const currentPageExercises = exercises.slice(
    firstExerciseIndex,
    lastExerciseIndex
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <AutoCompleteSearch setQuery={setQuery} query={query} />
      <ExercisesMenu exercises={currentPageExercises} />
      <PaginationBox>
        <Pagination
          count={Math.ceil(exercises.length / exercisesPerPage)}
          onChange={paginate}
          variant="outlined"
          page={currentPage}
        />
      </PaginationBox>
    </Box>
  );
};

export default Exercises;
