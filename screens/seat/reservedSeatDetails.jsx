import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const ReservedSeatDetails = ({ navigation }) => {
  return (
    <View>
      <Text>ReservedSeatDetails</Text>
      <Button title="Update" onPress={() => navigation.goBack()} />
      <Button title="Back To List" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ReservedSeatDetails;

const styles = StyleSheet.create({});
