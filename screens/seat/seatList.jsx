import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const SeatList = ({ navigation }) => {
  return (
    <View>
      <Text>Seats:Here Will be able Reserved or General Seats List</Text>
      <Button
        title="View"
        onPress={() => navigation.navigate("ReservedSeatDetails", { id: 1 })}
      />
    </View>
  );
};

export default SeatList;

const styles = StyleSheet.create({});
