import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import CustomInput from "../UI/CustomInput";
import { Credentials, CredentialsIsInvalid } from "../../types/Auth";
import { Colors } from "../../utils/colors";

interface Props {
  isLogin: boolean;
  credentialsInvalid: CredentialsIsInvalid;
  onSubmit: (credentials: Credentials) => void;
}

export default function AuthForm({
  isLogin,
  credentialsInvalid,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsNotMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsNotMatch,
  } = credentialsInvalid;

  const submitHandler = () => {
    onSubmit({
      email,
      confirmEmail,
      password,
      confirmPassword,
    });
  };

  return (
    <View>
      <View>
        <CustomInput
          label="Email Address"
          placeholder=""
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={emailIsInvalid}
          keyboardType="email-address"
        />
        {!isLogin && (
          <CustomInput
            label="Confirm Email Address"
            placeholder=""
            value={confirmEmail}
            onChangeText={(text) => setConfirmEmail(text)}
            error={emailsNotMatch}
            keyboardType="email-address"
          />
        )}
        <CustomInput
          label="Password"
          placeholder=""
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          error={passwordIsInvalid}
        />
        {!isLogin && (
          <CustomInput
            label="Confirm Password"
            placeholder=""
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            error={passwordsNotMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button
            mode="contained"
            color={Colors.mainColor}
            onPress={submitHandler}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
});
