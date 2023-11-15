import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  regiteredUser: {},
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

// Define an asynchronous thunk for registering a user
export const registerUserAsync = createAsyncThunk(
  "register/registerUserAsync",
  async (userData) => {
    const response = await fetch("http://localhost:5000/user/register", {
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

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // registerUser(state, action) {
    //   console.log(action.payload);
    //   state.regiteredUser = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.regiteredUser = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = "failed";
        state.error = state.error.message;
      });
  },
});
export const { registerUser } = RegisterSlice.actions;

export default RegisterSlice.reducer;
