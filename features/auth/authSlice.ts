import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authApi } from "../../api";
import { FIREBASE_AUTH_API_KEY } from "@env";

import { AuthMode, Credential, SignUpApiResponse } from "../../types/Auth";
import { RootState } from "../../store";
import {
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  User,
  Users,
} from "../../types/Profile";

export interface State {
  token: string;
  isAuthenticated: boolean;
  profile: User;
  isEditing: boolean;
  error?: unknown;
}

const initialState: State = {
  token: "",
  isAuthenticated: false,
  profile: {
    localId: "",
    email: "",
    emailVerified: false,
    displayName: "",
    providerUserInfo: [],
    photoUrl: "",
    passwordHash: "",
    passwordUpdatedAt: 0,
    validSince: "",
    disabled: false,
    lastLoginAt: "",
    createdAt: "",
    customAuth: false,
  },
  isEditing: false,
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

export const getProfileData = createAsyncThunk(
  "profile/getData",
  async (idToken: string) => {
    const { data } = await authApi.post<Users>(
      `:lookup?key=${FIREBASE_AUTH_API_KEY}`,
      { idToken }
    );
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updateProfile: UpdateProfileRequest) => {
    const { data } = await authApi.post<UpdateProfileResponse>(
      `:update?key=${FIREBASE_AUTH_API_KEY}`,
      { ...updateProfile, returnSecureToken: true }
    );
    return data;
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (updatePassword: UpdatePasswordRequest) => {
    const { data } = await authApi.post<UpdatePasswordResponse>(
      `:update?key=${FIREBASE_AUTH_API_KEY}`,
      { ...updatePassword, returnSecureToken: true }
    );
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.profile = initialState.profile;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.isAuthenticated = !!action.payload.idToken;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.profile = action.payload.users[0];
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.isAuthenticated = true;
        state.profile = {
          ...state.profile,
          displayName: action.payload.displayName,
          photoUrl: action.payload.photoUrl,
        };
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.isAuthenticated = true;
        state.profile = {
          ...state.profile,
          passwordHash: action.payload.passwordHash,
        };
      });
  },
});

export const { logOut, updateToken, setIsEditing } = authSlice.actions;

export default authSlice.reducer;

export const authState = (state: RootState) => state.auth;

export const profileData = (state: RootState) => state.auth;
