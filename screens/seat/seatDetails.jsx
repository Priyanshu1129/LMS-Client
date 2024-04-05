import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph, Button, Portal, Dialog, Text } from "react-native-paper";

const SeatDetailsPage = () => {
  // Dummy data for seat details
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [slotToDeallocate, setSlotToDeallocate] = useState("");
  const seatDetails = {
    seatNumber: 1,
    occupiedBy: {
      morning: "John Doe",
      noon: "Alice Smith",
      evening: "Bob Johnson",
    },
    description: "Comfortable seat near the window",
    createdAt: "2024-04-08T10:30:00Z",
    updatedAt: "2024-04-10T15:45:00Z",
  };

  const handleDeallocate = (slot) => {
    setSlotToDeallocate(slot);
    setConfirmationVisible(true);
  };

  const confirmDeallocate = () => {
    // Perform deallocation action here
    Alert.alert(`Deallocated ${slotToDeallocate} slot for ${seatDetails.occupiedBy[slotToDeallocate]}`);
    setConfirmationVisible(false);
  };

  const cancelDeallocate = () => {
    setConfirmationVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Seat {seatDetails.seatNumber}</Title>
          <View style={styles.slotContainer}>
            <Paragraph style={styles.label}>Occupied By:</Paragraph>
            <View style={styles.occupiedBy}>
              <View style={styles.slot}>
                <Text style={styles.slotText}>Morning: {seatDetails.occupiedBy.morning}</Text>
                <Button
                  mode="contained"
                  onPress={() => handleDeallocate("morning")}
                  style={styles.button}
                >
                  {seatDetails.occupiedBy.morning ? "Deallocate" : "Allocate"}
                </Button>
              </View>
              <View style={styles.slot}>
                <Text style={styles.slotText}>Noon: {seatDetails.occupiedBy.noon}</Text>
                <Button
                  mode="contained"
                  onPress={() => handleDeallocate("noon")}
                  style={styles.button}
                >
                  {seatDetails.occupiedBy.noon ? "Deallocate" : "Allocate"}
                </Button>
              </View>
              <View style={styles.slot}>
                <Text style={styles.slotText}>Evening: {seatDetails.occupiedBy.evening}</Text>
                <Button
                  mode="contained"
                  onPress={() => handleDeallocate("evening")}
                  style={styles.button}
                >
                  {seatDetails.occupiedBy.evening ? "Deallocate" : "Allocate"}
                </Button>
              </View>
            </View>
          </View>
          <Paragraph style={styles.info}>Description: {seatDetails.description}</Paragraph>
          <Paragraph style={styles.info}>Created At: {seatDetails.createdAt}</Paragraph>
          <Paragraph style={styles.info}>Updated At: {seatDetails.updatedAt}</Paragraph>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={confirmationVisible} onDismiss={cancelDeallocate}>
          <Dialog.Title>Confirm Deallocate</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to deallocate {slotToDeallocate} slot for {seatDetails.occupiedBy[slotToDeallocate]}?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelDeallocate}>Cancel</Button>
            <Button onPress={confirmDeallocate}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  slotContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 18,
    color: "#333",
  },
  occupiedBy: {
    marginLeft: 10,
  },
  slot: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotText: {
    fontSize: 18,
  },
  button: {
    marginLeft: 10,
  },
});

export default SeatDetailsPage;
