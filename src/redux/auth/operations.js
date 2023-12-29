import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  signUp,
  signIn,
  singOut,
  addToEvents,
  removeFromEvents,
  refreshUserToken,
  updateUserData,
  changePassword,
  forgotPassword,
} from "services";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "/auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await signUp(credentials);
      setAuthHeader(data.data.authToken);
      return data;
    } catch (error) {
      alert(`Something wrong`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "/auth/signin",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await signIn(credentials);
      setAuthHeader(data.data.authToken);
      return data;
    } catch (error) {
      alert(`Something wrong`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await singOut("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const update = createAsyncThunk(
  "/auth/update/:id",
  async (updateData, thunkAPI) => {
    try {
      const result = await updateUserData(updateData);
      return result;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await refreshUserToken("/auth");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePasswordAuth = createAsyncThunk(
  "/auth/changePassword",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await changePassword(credentials);
      return data;
    } catch (error) {
      alert(`Something wrong`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgotPasswordAuth = createAsyncThunk(
  "/auth/forgotPassword",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await forgotPassword(credentials);
      return data;
    } catch (error) {
      alert(`Something wrong`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addEvents = createAsyncThunk(
  "/auth/addEvents",
  async (id, thunkAPI) => {
    try {
      await addToEvents(`${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeEvents = createAsyncThunk(
  "/auth/removeEvents",
  async (id, thunkAPI) => {
    try {
      await removeFromEvents(`${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
