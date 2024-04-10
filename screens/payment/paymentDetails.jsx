import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const PaymentDetails = ({ navigation, route }) => {
  let token = route.params.token;

  return (
    <View>
      <Text>PaymentDetails</Text>
      {/* here he can update status */}
      <Button title="Update" onPress={() => navigation.goBack()} />
      <Button title="Back To List" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({});
