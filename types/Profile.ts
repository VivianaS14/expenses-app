import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Users {
  users: User[];
}

export interface User {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  providerUserInfo: ProviderUserInfo[];
  photoUrl: string;
  passwordHash: string;
  passwordUpdatedAt: Double;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAuth: boolean;
}

export interface ProviderUserInfo {
  providerId?: string;
  displayName?: string;
  photoUrl?: string;
  federatedId?: string;
  email?: string;
  rawId?: string;
  screenName?: string;
}

export interface UpdateProfileRequest {
  idToken: string;
  displayName: string;
  photoUrl: string;
  deleteAttribute?: string;
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

export interface UpdatePasswordRequest {
  idToken: string;
  password: string;
}

export interface UpdatePasswordResponse {
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: ProviderUserInfo[];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}
