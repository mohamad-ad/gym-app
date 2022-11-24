import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// http://localhost:4000/exercises
// http://localhost:4000/bodyParts
// http://localhost:4000/targetMuscles
// http://localhost:4000/equipmentList

export const fetchExercises = createAsyncThunk('exercises', async ({id, bodyPart, query})=>{
  if(id) return (await fetch(`http://localhost:4000/exercises/${id}`)).json();
  if(bodyPart) return (await fetch(`http://localhost:4000/exercises?bodypart=${bodyPart}`)).json();
  if(query) return (await fetch(`http://localhost:4000/exercises?q=${query}`)).json();
  return (await fetch(`http://localhost:4000/exercises`)).json()
})
export const fetchBodyParts = createAsyncThunk('bodyParts' , async ()=>{
  return (await fetch(' http://localhost:4000/exercises/bodyParts')).json();
})


export const fetchTargetMuscles = createAsyncThunk('targetMuscles', async ()=>{
  return (await fetch('http://localhost:4000/targetMuscles')).json()
})
export const fetchEquipmentList = createAsyncThunk('equipmentList', async ()=>{
  return (await fetch('http://localhost:4000/equipmentList')).json()
})

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
    bodyParts: [],
    equipmentList: [],
    targetMuscles: [],
    pending: false,
    error: false,
  },
  extraReducers: {
    [fetchExercises.pending]: (state) => {
      state.pending = true;
    },
    [fetchExercises.fulfilled]: (state, action) => {
      state.pending = false;
      state.exercises = action.payload;
    },
    [fetchExercises.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [fetchBodyParts.pending]: (state) => {
      state.pending = true;
    },
    [fetchBodyParts.fulfilled]: (state, action) => {
      state.pending = false;
      state.bodyParts = action.payload
    },
    [fetchBodyParts.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [fetchTargetMuscles.pending]: (state) => {
      state.pending = true;
    },
    [fetchTargetMuscles.fulfilled]: (state, action) => {
      state.pending = false;
      state.targetMuscles = action.payload;
    },
    [fetchTargetMuscles.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [fetchEquipmentList.pending]: (state) => {
      state.pending = true;
    },
    [fetchEquipmentList.fulfilled]: (state, action) => {
      state.pending = false;
      state.equipmentList = action.payload;
    },
    [fetchEquipmentList.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default exercisesSlice.reducer;
export const bodyPartsSelector = (state) => state.exercises.bodyParts;
export const exercisesSelector = (state) => state.exercises.exercises;
export const equipmentListSelector = (state) => state.exercises.equipmentList;
export const targetMusclesSelector = (state) => state.exercises.targetMuscles;
