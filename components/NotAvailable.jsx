import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoDataPage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between", // Add this line
  },
  message: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default NoDataPage;
