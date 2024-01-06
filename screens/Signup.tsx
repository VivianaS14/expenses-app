import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import AuthContent from "../components/Auth/AuthContent";

import { Credential } from "../types/Auth";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { authState, authenticate } from "../features/auth/authSlice";

import { Colors } from "../utils/colors";
import { Alert } from "react-native";

export default function SignUp() {
  const { error } = useSelector(authState);
  const dispatch = useDispatch<AppDispatch>();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signUpHandler = async (credential: Credential) => {
    try {
      setIsAuthenticating(true);
      await dispatch(
        authenticate({
          authMode: "signUp",
          credential,
        })
      );
    } catch (error) {
      console.error("Fail to Sign Up", error);
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
    }
  }, [error]);

  if (isAuthenticating) {
    return <ActivityIndicator animating={true} color={Colors.mainColor} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} isLogin={false} />;
}
