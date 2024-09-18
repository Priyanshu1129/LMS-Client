import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Touchable,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <Text
          style={[
            styles.title,
            { color: theme.colors.secondary, fontSize: theme.fontSizes.md },
          ]}
        >
          {name}
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <AntDesign
          name="forward"
          size={18}
          color={"#6B7280"}
          style={[styles.forwardIcon, { color: theme.colors.secondary }]}
        />
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
    elevation: 4,
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
  rightWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
