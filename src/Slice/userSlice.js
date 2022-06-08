import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "loginuser",
  async (userCredentialsObject, thunkApi) => {
    let response = await axios.post("/user/login", userCredentialsObject);
    let data = response.data;
    if (data.message === "logged in successfully") {
      localStorage.setItem("token", data.token);
      return data.userObj;
    }
    if (
      data.message === "Invalid Username" ||
      data.message === "Invalid Password"
    ) {
      return thunkApi.rejectWithValue(data);
    }
  }
);

let userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    errMsg: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.isSuccess = false;
      state.userObj = null;
      state.isError = false;
      state.errMsg = "";
      return state;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.errMsg = "";
    },
    [userLogin.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload.message;
    },
  },
});

export const { clearLoginStatus } = userSlice.actions;

export default userSlice.reducer;
