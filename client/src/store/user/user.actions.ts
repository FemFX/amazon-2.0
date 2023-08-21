import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, IEmailPassword } from "./user.interface";
import { AuthService } from "@/services/auth/auth.service";
import { AxiosResponse } from "axios";
import { removeFromStorage } from "@/services/auth/auth.helper";
import { errorCatch } from "@/helpers/api.helper";

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main("register", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main("login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  removeFromStorage();
});
export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
