import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthForm from "./AuthForm";

import { Colors } from "../../utils/colors";
import {
  Credentials,
  CredentialsIsInvalid,
  Credential,
} from "../../types/Auth";
import { RootParamList } from "../../types/Navigation";

interface Props {
  isLogin: boolean;
  onAuthenticate: ({ email, password }: Credential) => void;
}

export default function AuthContent({ isLogin, onAuthenticate }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const [credentialsInvalid, setCredentialsInvalid] =
    useState<CredentialsIsInvalid>({
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false,
    });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace("SignUp");
    } else {
      navigation.replace("Login");
    }
  };

  const submitHandler = (credentials: Credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    setCredentialsInvalid({
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false,
    });
    onAuthenticate({ email, password });
  };

  return (
    <View style={styles.authContainer}>
      <AuthForm
        isLogin={isLogin}
        credentialsInvalid={credentialsInvalid}
        onSubmit={submitHandler}
      />
      <View style={styles.button}>
        <Button
          mode="outlined"
          color={Colors.mainColor}
          onPress={switchAuthModeHandler}
        >
          {isLogin ? "Create New User" : "Log In Instead"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    marginTop: 50,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.thirdColor,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

  button: {
    paddingHorizontal: 15,
  },
});
