import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authApi } from "../../api";
import { FIREBASE_AUTH_API_KEY } from "@env";

import { AuthMode, Credential, SignUpApiResponse } from "../../types/Auth";
import { RootState } from "../../store";

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: "",
  isAuthenticated: false,
};

export const authenticate = createAsyncThunk(
  "auth/createNewUser",
  async ({
    authMode,
    credential,
  }: {
    credential: Credential;
    authMode: AuthMode;
  }) => {
    const { data } = await authApi.post<SignUpApiResponse>(
      `:${authMode}?key=${FIREBASE_AUTH_API_KEY}`,
      {
        ...credential,
        returnSecureToken: true,
      }
    );
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.token = action.payload.idToken;
      state.isAuthenticated = !!action.payload.idToken;
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;

export const authState = (state: RootState) => state.auth;
