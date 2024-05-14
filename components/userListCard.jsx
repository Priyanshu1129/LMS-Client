import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;

const UserListCard = ({
  key,
  membershipStatus = "expired",
  balance = 30,
  name = "example",
  seatNumber = "N/A",
  profileImage = "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain",
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const balanceColor = balance <= 0 ? "green" : "orange";
  const balanceBg = balance <= 0 ? "#D1FAE5" : "#FFEDD5";
  const theme = useTheme();

  return (
    <View
      key={key}
      style={[
        styles.container,
        {
          backgroundColor: isClicked ? "black" : theme.colors.background,
          backdrop: theme.colors.backdrop,
        },
      ]}
    >
      <View style={styles.profileWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: `${profileImage}` }} style={styles.image} />
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  membershipStatus == "active" ? "green" : "orange",
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.title,
            { color: theme.colors.secondary, fontSize: theme.fontSizes.md },
          ]}
        >{`${name.slice(0, 12)}${name.length > 12 ? "..." : ""}`}</Text>
      </View>

      <View style={styles.infoWrapper}>
        <View style={[styles.balanceWrapper, { backgroundColor: balanceBg }]}>
          <FontAwesome name="rupee" size={16} color={balanceColor} />
          <Text
            style={[
              styles.balanceText,
              { color: balanceColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            {" "}
            {balance < 0 ? "- " : "+ "}
            {Math.abs(balance)}
          </Text>
        </View>
        <View
          style={[
            { backgroundColor: theme.colors.surfaceVariant },
            styles.seatWraper,
          ]}
        >
          <MaterialIcons
            name="event-seat"
            // color={theme.colors.secondary}
            size={16}
          />
          <Text style={[styles.balanceText, { fontSize: theme.fontSizes.sm }]}>
            {" "}
            {seatNumber}
          </Text>
        </View>
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

export default UserListCard;

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
  statusIndicator: {
    position: "absolute",
    top: 30,
    right: -2,
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
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
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceWrapper: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 6,
    paddingHorizontal: 8,
  },
  balanceText: {
    fontWeight: "500",
    marginLeft: 2,
  },
  forwardIcon: {
    marginTop: 2,
  },
  seatWraper: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 6,
    paddingHorizontal: 6,
  },
});
