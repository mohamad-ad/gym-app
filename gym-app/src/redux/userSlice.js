import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "user/signup",
  async (userInformation) => {
    const information = JSON.stringify(userInformation);
    if (userInformation)
      return (
        await fetch("http://localhost:4000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: information,
        })
      ).json();
  }
);
export const login = createAsyncThunk("user/login", async (userInformation) => {
  const information = JSON.stringify(userInformation);
  if (userInformation) {
    const res = (
      await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: information,
      })
    ).json();
    console.log(res);
    return res;
  }
});

export const getFavorites = createAsyncThunk("user/favorites", async (jwt) => {
  if (jwt) {
    return (
      await fetch("http://localhost:4000/users/favorite", {
        headers: {
          "x-auth-token": `${jwt}`,
        },
      })
    ).json();
  }
});
export const addFavorite = createAsyncThunk(
  "user/addfavorite",
  async ({ exerciseId, jwt }) => {
    if (exerciseId && jwt)
      return (
        await fetch("http://localhost:4000/users/favorite", {
          method: "POST",
          headers: {
            "x-auth-token": `${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: exerciseId }),
        })
      ).json();
  }
);
export const removeFavorite = createAsyncThunk(
  "user/removefavorite",
  async ({ exerciseId, jwt }) => {
    if (exerciseId && jwt)
      return (
        await fetch(`http://localhost:4000/users/favorite/${exerciseId}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": `${jwt}`,
          },
        })
      ).json();
  }
);

const initialState = {
  userInfo: {
    username: "",
    email: "",
    jwt: "",
    favIds: [],
    favoriteExercises:[],
  },
  pending: false,
  error: false,
  isLogedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      // state = initialState
      return {
        ...state,
        userInfo: { username: "", email: "", jwt: "" },
        isLogedin: false,
      };
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.pending = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.isLogedin = true;
    },
    [signUp.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
    [login.pending]: (state) => {
      state.pending = true;
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.isLogedin = true;
    },
    [login.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
    [getFavorites.fulfilled]: (state, action) => {
      state.userInfo.favoriteExercises = action.payload;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.userInfo.favIds = action.payload;
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.userInfo.favIds = action.payload;
    },
  },
});
export const { logout } = userSlice.actions;
export const jwtSelector = (state) => state.user.userInfo.jwt;
export const userSelector = (state) => state.user;
export const favoriteExercisesSelector = (state)=> state.user.userInfo.favoriteExercises;
export default userSlice.reducer;
