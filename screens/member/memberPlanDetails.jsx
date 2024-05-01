import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PlanDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Seat Plan Details</Text>
        <View style={styles.cardInfo}>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Seat Status</Text>
            <Text style={styles.cardInfoKeys}> Occupied</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Seat Number</Text>
            <Text style={styles.cardInfoKeys}> 12</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Plan Status</Text>
            <Text style={styles.cardInfoKeys}>Active</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Plan Validity</Text>
            <Text style={styles.cardInfoKeys}>12 Nov 2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Locker Plan Details</Text>
        <View style={styles.cardInfo}>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Locker Status</Text>
            <Text style={styles.cardInfoKeys}>Occupied</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Locker Number</Text>
            <Text style={styles.cardInfoKeys}>14</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Plan Status</Text>
            <Text style={styles.cardInfoKeys}>Active</Text>
          </View>
          <View style={styles.cardInfoText}>
            <Text style={styles.cardInfoKeys}>Plan Validity</Text>
            <Text style={styles.cardInfoKeys}>12 Nov 2024</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({
  container: { padding: 30 },
  card: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    minHeight: 200,
  },
  title: { textAlign: "center", fontSize: 16, fontWeight: "bold" },
  cardInfo: {
    padding: 20,
    display: "flex",
    gap: 16,
  },
  cardInfoText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoKeys: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfoValues: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
