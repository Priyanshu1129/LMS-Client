import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { seatActions } from "../../redux/slices/seatSlice";
import { allocateSeat } from "../../redux/actions/seatActions";
import { deAllocateSeat } from "../../redux/actions/seatActions";

const SlotCard = ({
  members,
  slot,
  occupiedBy,
  member,
  setMember,
  seatId,
  token,
}) => {
  const [allocate, setAllocate] = useState(false);

  const dispatch = useDispatch();

  const handleAllocation = () => {
    dispatch(
      allocateSeat(
        { memberId: member, seatId, schedule: slot.toLowerCase() },
        token
      )
    );
  };

  const handleDeallocation = (memberId) => {
    // console.log(id);
    dispatch(deAllocateSeat(memberId, token));
  };

  return (
    <Card style={styles.card}>
      <Title style={styles.title}>{slot} Slot</Title>
      <Card.Content>
        {!occupiedBy ? (
          <View style={styles.slotContainer}>
            {!allocate && (
              <Paragraph style={styles.label}>Unoccupied</Paragraph>
            )}
            <View style={styles.occupiedBy}>
              {allocate && (
                <Dropdown
                  data={members}
                  placeholder={"Select Member"}
                  search={true}
                  value={member}
                  setValue={setMember}
                />
              )}
              <View style={styles.slot}>
                {!allocate ? (
                  <Button
                    mode="contained"
                    onPress={() => setAllocate(true)}
                    style={styles.allocateButton}
                  >
                    Allocate
                  </Button>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      mode="outlined"
                      onPress={() => [setAllocate(false), setMember(null)]}
                      style={styles.allocateButton}
                    >
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      disabled={!member}
                      onPress={handleAllocation}
                      style={styles.allocateButton}
                    >
                      Confirm
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.slotContainer}>
            <Paragraph style={styles.label}>Occupied By</Paragraph>
            <Paragraph style={styles.label}>{occupiedBy.name}</Paragraph>
            <View style={styles.occupiedBy}>
              <View style={styles.slot}>
                <Button
                  mode="contained"
                  onPress={() => {
                    handleDeallocation(occupiedBy._id);
                  }}
                  style={styles.button}
                >
                  Deallocate
                </Button>
              </View>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default SlotCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    elevation: 5,
    padding: 10,
    marginBottom: 10
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  slotContainer: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 23,
    textAlign: "center",
    color: "#333",
  },
  occupiedBy: {
    marginLeft: 10,
  },
  slot: {
    marginBottom: 10,
    alignItems: "center",
  },
  slotText: {
    fontSize: 18,
  },
  // button: {
  //   marginLeft: 10,
  // },
  allocateButton: {
    fontSize: 10,
  },
});
