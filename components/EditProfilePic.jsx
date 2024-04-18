import React, { Component } from "react";
import { Text, View } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import TakePhotoOptions from "./takePhotoOptions";
import * as ImagePicker from 'expo-image-picker';


export default EditProfilePic = ({ profileUrl, setProfileUrl }) => {
  const [selectMode, setSelectMod] = useState(null);
  const [ showImageOption, setShowImageOpetion] = useState(false);

  // No permissions request is necessary for launching the image library

  
  const closeImageOptions = ()=>{
      setShowImageOpetion(false);
    }
    const OpenImageOptions = ()=>{
        setShowImageOpetion(true);
    }

    const handleGallaryPress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setProfileUrl(result.assets[0].uri);
      }
      closeImageOptions();
    };
  
  const handleCamaraPress = async()=>{
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setProfileUrl(result.assets[0].uri);
      }
      closeImageOptions();
  }
  
  

  return (
    <View>
      <TouchableOpacity onPress={OpenImageOptions}>
        <View style={styles.logoContainer}>
          <Avatar.Image size={100} source={{ uri: profileUrl }} />
        </View>
      </TouchableOpacity>
      <TakePhotoOptions visible={showImageOption}  onClose={closeImageOptions} onGalleryPress={handleGallaryPress} onCameraPress={handleCamaraPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
