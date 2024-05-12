import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import TakePhotoOptions from "./takePhotoOptions";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import imageCompressor from "../utils/imageCompressor";

export default EditProfilePic = ({ profileUrl, setProfileUrl, edit }) => {
  const [showImageOption, setShowImageOption] = useState(false);

  // No permissions request is necessary for launching the image library

  

  const closeImageOptions = () => {
    setShowImageOption(false);
  };
  const OpenImageOptions = () => {
    setShowImageOption(true);
  };

  const handleGalleryPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const comUrl = await imageCompressor(result.assets[0].uri);
      setProfileUrl(comUrl);
      console.log("image uri from component gallery ", profileUrl);
    }
    closeImageOptions();
  };

  const handleCameraPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const comUrl = await imageCompressor(result.assets[0].uri);
      console.log(
        "image uri from component after compression comUrl ------",
        comUrl
      );
      setProfileUrl(comUrl);
      console.log(
        "image uri from component after compression ------",
        profileUrl
      );
    }
    closeImageOptions();
  };

  const theme = useTheme();

  return (
    <View>
      <View style={styles.profileContainer}>
        <View
          style={[styles.avatarWrapper, { borderColor: theme.colors.primary }]}
        >
          <Avatar.Image
            style={{ opacity: edit ? 0.4 : 1 }}
            size={95}
            source={{ uri: profileUrl }}
          />
          {edit && (
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <TouchableOpacity onPress={OpenImageOptions}>
                <Feather name="edit" color="white" size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <TakePhotoOptions
        visible={showImageOption}
        onClose={closeImageOptions}
        onGalleryPress={handleGalleryPress}
        onCameraPress={handleCameraPress}
      />
    </View>
  );
};
const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;
const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 2,
  },
  imageWrapper: {
    width: baseUnit * 2.6,
    height: baseUnit * 2.6,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    position: "absolute",
    top: "60%",
    right: "-1%",
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  avatarWrapper: {
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 100,
  },
});
