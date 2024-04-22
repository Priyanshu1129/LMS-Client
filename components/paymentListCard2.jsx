import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;

const PaymentListCard2 = ({ payment }) => {
  const profileImage =
    "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain";
  const [isClicked, setIsClicked] = useState(false);

  const theme = useTheme();

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View
      key={payment?._id}
      style={[
        styles.container,
        {
          backgroundColor: isClicked ? "#f0f0f0" : "white",
          backdrop: theme.colors.backdrop,
        },
      ]}
    >
      <View style={styles.leftWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: profileImage }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title}>{payment?.paidBy?.name}</Text>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>
             {formatDateTime(payment?.createdAt)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightWrapper}>
        <View
          style={[
            styles.modeWrapper,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Text style={styles.modeText}>{payment?.method}</Text>
        </View>
        <View style={styles.amountWrapper}>
          <MaterialIcons name="add" size={14} />
          <MaterialIcons name="currency-rupee" size={17} />
          <Text style={styles.amountText}>{payment?.amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentListCard2;

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
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontWeight: "500",
    marginLeft: 8,
    fontSize: 16,
  },
  rightWrapper: {
    flexDirection: "column",
  },
  dateWrapper: {
    padding: 2,
    flexDirection: "row",
  },
  modeWrapper: {
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  amountWrapper: {
    paddingVertical: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  modeText: {
    fontWeight: "400",
    fontSize: 14,
    marginLeft: 7,
  },
  dateText: {
    color: "gray",
    fontSize: 14,
    marginLeft: 7,
  },
  amountText: {
    fontWeight: "500",
    fontSize: 23,
  },
});
