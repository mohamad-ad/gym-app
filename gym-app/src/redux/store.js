import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import exercisesReducer from "./exercisesSlice";
import userReducer from './userSlice';
import { apiSlice } from "./apiSlice";


const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer

  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
});
export default store;
