import * as React from "react";
import { useSelector } from "react-redux";
import { exercisesSelector } from "../../redux/exercisesSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


export default function AutoCompleteSearch({ query, setQuery }) {
  const exercises = useSelector(exercisesSelector);
  const exercisesNames = exercises.map((exercise) => exercise.name);
  const filteredExercises = exercisesNames.filter(
    (exercise, index) => exercise !== exercisesNames[index - 1]
  );

  const handleSelect = (e, value) => {
    if (value) {
      setQuery(value);
    } else {
      setQuery("");
    }
  };

  return (
    <Autocomplete
      disablePortal
      onChange={handleSelect}
      fullWidth
      options={filteredExercises}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
