import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown";
import { Title, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { seatActions } from "../../redux/slices/seatSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { allocateSeat } from "../../redux/actions/seatActions";
import { deAllocateSeat } from "../../redux/actions/seatActions";
import { compose } from "@reduxjs/toolkit";

const RenewalPeriodOptions = [
  { label: "Day", value: "days" },
  { label: "Week", value: "weeks" },
  { label: "Month", value: "months" },
];

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
  const [renewalPeriodUnit, setRenewalPeriodUnit] = useState("months");
  const [periodLength, setPeriodLength] = useState(1);
  const [periodCharge, setPeriodCharge] = useState(1);

  const dispatch = useDispatch();

  const convertString = (str) => {
    let words = str.split(" ");
    // Convert the first word to lowercase
    let result = words[0].toLowerCase();
    // Process the remaining words
    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      result += word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
    }
    console.log("schedule-modified", result);
    return result;
  };

  const handleAllocation = () => {
    if (
      member &&
      seatId &&
      slot &&
      renewalPeriodUnit &&
      periodLength &&
      periodCharge
    ) {
      dispatch(
        allocateSeat(
          {
            memberId: member,
            seatId,
            schedule: convertString(slot),
            renewalPeriodUnit,
            renewalPeriodAmount: periodLength,
            charges: periodCharge,
          },
          token
        )
      );
    }
  };

  const handleDeallocation = (memberId) => {
    dispatch(deAllocateSeat(memberId, token));
  };

  return (
    <View style={styles.card}>
      <Title style={styles.title}>{slot}</Title>
      {!occupiedBy ? (
        <View style={styles.slotContainer}>
          {!allocate && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text style={styles.label}>Status: Unoccupied</Text>
              <FontAwesome name="circle-o" size={16} />
            </View>
          )}
          <View style={styles.occupiedBy}>
            {allocate && (
              <>
                <Dropdown
                  data={members}
                  placeholder={"Select Member"}
                  search={true}
                  value={member}
                  setValue={setMember}
                />
                <Dropdown
                  data={RenewalPeriodOptions}
                  placeholder={"Renewal Period Unit"}
                  value={renewalPeriodUnit}
                  setValue={setRenewalPeriodUnit}
                />
                <TextInput
                  label="Period Length"
                  value={periodLength}
                  onChangeText={(value) => setPeriodLength(value)}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="Period Charge"
                  value={periodCharge}
                  onChangeText={(value) => setPeriodCharge(value)}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </>
            )}

            <View style={styles.slot}>
              {!allocate ? (
                <Button
                  mode="contained"
                  onPress={() => setAllocate(true)}
                  style={styles.button}
                >
                  Allocate
                </Button>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    gap: 10,
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <Text style={styles.label}>Status: Occupied</Text>
            <FontAwesome name="check-circle" size={18} />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.label}>Occupied By: {occupiedBy.name}</Text>
          </View>
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
    </View>
  );
};

export default SlotCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    marginBottom: 14,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  slotContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  slot: {
    marginBottom: 10,
    alignItems: "center",
  },
  slotText: {
    fontSize: 18,
  },
  button: {
    borderRadius: 5,
    marginTop: 20,
  },
  allocateButton: {
    fontSize: 10,
    borderRadius: 5,
  },
});
