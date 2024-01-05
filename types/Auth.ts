export interface CredentialsIsInvalid {
  email: boolean;
  password: boolean;
  confirmEmail: boolean;
  confirmPassword: boolean;
}

export interface Credentials {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
}

export interface Credential {
  email: string;
  password: string;
}

export interface SignUpApiResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export type AuthMode = "signUp" | "signInWithPassword";
