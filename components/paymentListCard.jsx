import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import ConfirmationDialog from "./confirmationDialog.jsx";
import { useDispatch } from "react-redux";
import { deletePayment } from "../redux/actions/paymentActions";

const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;

const PaymentListCard = ({ payment, token }) => {
  const profileImage =
    "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain";
  const [isClicked, setIsClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(-10));
  const theme = useTheme();
  const dispatch = useDispatch();

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    if (deleteConfirmation) {
      dispatch(deletePayment(payment._id, token));
    }
  }, [deleteConfirmation]);

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: showOptions ? 0 : -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showOptions]);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowOptions((state) => !state)}>
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
                {
                  backgroundColor:
                    payment?.method == "cash" ? "#4ADE80" : "#68D391",
                },
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
      </TouchableOpacity>
      {/* // sliding menu for edit and delete payment */}
      { showOptions && <Animated.View style={[styles.slidingOptionsContainer, { transform: [{ translateY: slideAnimation }] }]}>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            Amount:
          </Text>
          <TextInput style={styles.input} value={50} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}>
          <Button style={[styles.optionButton, { backgroundColor: "#14B37D" }]}>
            <Text style={{ color: "white" }}>Update</Text>
          </Button>
          <Button style={[styles.optionButton, { backgroundColor: "#F87171" }]} onPress={() => setDialogVisible(true)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </Button>
          <Button style={[styles.optionButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={{ color: "white" }} onPress={() => setShowOptions(false)}>Cancel</Text>
          </Button>
        </View>
      </Animated.View>
}
      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={"Confirm Delete Payment"}
        setConfirmation={setDeleteConfirmation}
      />
    </View>
  );
};

export default PaymentListCard;

const styles = StyleSheet.create({
  slidingOptionsContainer: {
    backgroundColor: "gray",
    margin : 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginTop: -5,
    zIndex : -10
  },
  optionButton: {
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flex: 1,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontWeight: "bold",
    width: 130,
    color: "#666",
    fontSize: 15,
    marginBottom: 2,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },
  container: {
    padding: 8,
    margin: 2,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    position: 'relative',
    zIndex: 10,
    elevation: 5,
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
    justifyContent: "center",
    marginLeft: 4,
  },
  amountWrapper: {
    paddingVertical: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  modeText: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 7,
    color: "white",
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
