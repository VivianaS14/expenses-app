import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Users {
  users: User[];
}

export interface User {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  providerUserInfo: UserInfo[];
  photoUrl: string;
  passwordHash: string;
  passwordUpdatedAt: Double;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAuth: boolean;
}

export interface UserInfo {
  providerId: string;
  displayName: string;
  photoUrl: string;
  federatedId: string;
  email: string;
  rawId: string;
  screenName: string;
}

export interface UpdateProfileRequest {
  idToken: string;
  displayName: string;
  photoUrl: string;
  deleteAttribute?: string;
  returnSecureToken: boolean;
}

export interface UpdateProfileResponse {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: ProviderUserInfo[];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export type ProviderUserInfo = {
  providerId: string;
  federatedId: string;
  displayName: string;
  photoUrl: string;
};
