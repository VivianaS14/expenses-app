import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  authState,
  logOut,
  getProfileData,
  setIsEditing,
  updateProfile,
} from "../features/auth/authSlice";

import { Colors } from "../utils/colors";
import CustomInput from "../components/UI/CustomInput";

export default function User() {
  const { token, profile, isEditing } = useSelector(authState);

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (profile.displayName !== name || profile.photoUrl !== image) {
      try {
        setIsUpdating(true);
        await dispatch(
          updateProfile({
            displayName: name,
            photoUrl: image,
            idToken: token,
            returnSecureToken: true,
          })
        );
      } catch (error) {
        console.error("Fail to save changes ", error);
      } finally {
        setIsUpdating(false);
        dispatch(setIsEditing(false));
      }
    }
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  const onCancel = () => {
    dispatch(setIsEditing(false));
    setName(profile.displayName ?? "My Account");
    setEmail(profile.email);
    setPassword(profile.passwordHash);
    setImage(profile.photoUrl);
  };

  useEffect(() => {
    if (token) {
      dispatch(getProfileData(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    setName(profile.displayName ?? "My Account");
    setEmail(profile.email);
    setPassword(profile.passwordHash);
    setImage(profile.photoUrl);
  }, [profile]);

  if (isUpdating) {
    return <ActivityIndicator animating={true} color={Colors.mainColor} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar.Image
          source={
            image ? { uri: image } : require("../assets/image/avatar.jpeg")
          }
          size={150}
        />
        {isEditing && (
          <Button
            mode="contained"
            color={Colors.mainColor}
            onPress={pickImageHandler}
          >
            Update Photo
          </Button>
        )}
      </View>
      <Text style={styles.title}>Name:</Text>
      <CustomInput
        value={name}
        onChangeText={(text) => setName(text)}
        disabled={!isEditing}
      />
      <Text style={styles.title}>Email:</Text>
      <CustomInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        disabled={!isEditing}
      />
      <Text style={styles.title}>Password:</Text>
      <CustomInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        disabled={!isEditing}
      />
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <Button
              mode="contained"
              color={Colors.mainColor}
              onPress={onSubmit}
            >
              Save Changes
            </Button>
            <Button color="#86363B" onPress={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="contained"
              color={Colors.mainColor}
              onPress={onLogOut}
            >
              Log Out
            </Button>
            <Button color="#86363B">Delete Account</Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 70,
    flex: 1,
  },

  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    paddingHorizontal: 15,
    marginTop: 15,
  },

  imageContainer: {
    alignItems: "center",
    gap: 15,
  },

  buttonsContainer: {
    marginVertical: 20,
    alignItems: "center",
    gap: 15,
  },
});
