import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "login/loginUserAsync",
  async (userData) => {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  }
);
const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //   userLogin(state, action) {
    //     console.log(action.payload);
    //     state.regiteredUser = action.payload;
    //   },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "failed";
        state.error = state.error.message;
      });
  },
});
export const { userLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
