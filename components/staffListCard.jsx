import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;

const StaffListCard = ({
  name = "example",
  profileImage = "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain",
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isClicked ? "#f0f0f0" : "white",
          backdrop: theme.colors.backdrop,
        },
      ]}
    >
      <View style={styles.profileWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: `${profileImage}` }} style={styles.image} />
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );
};

export default StaffListCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 2,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: baseUnit * 2.6,
    height: baseUnit * 2.6,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 2,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    color: "gray",
    fontWeight: "500",
    marginLeft: 8,
  },
});
