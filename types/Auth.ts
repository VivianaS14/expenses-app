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
