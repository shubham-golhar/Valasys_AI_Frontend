import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

// Your React component

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("csrftoken="))
  .split("=")[1];

// Now you can include this token in your fetch or Axios requests
// fetch('/your-endpoint/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken,
//     },
//     // other request configurations
// })

export const loginUserAsync = createAsyncThunk(
  "login/loginUserAsync",
  async (userData) => {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
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
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Update this line
      });
  },
});
export const { userLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
