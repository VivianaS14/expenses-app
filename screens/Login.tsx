import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import AuthContent from "../components/Auth/AuthContent";

import { Credential } from "../types/Auth";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { authenticate } from "../features/auth/authSlice";

import { Colors } from "../utils/colors";
import { Alert } from "react-native";

export default function Login() {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const logInHandler = async (credential: Credential) => {
    try {
      setIsAuthenticating(true);
      await dispatch(
        authenticate({
          authMode: "signInWithPassword",
          credential,
        })
      );
    } catch (error) {
      console.error("Fail to Log In", error);
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <ActivityIndicator animating={true} color={Colors.mainColor} />;
  }

  return <AuthContent onAuthenticate={logInHandler} isLogin />;
}
