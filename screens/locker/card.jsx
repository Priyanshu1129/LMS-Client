import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown";
import { Title, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { lockerActions } from "../../redux/slices/lockerSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { allocateLocker } from "../../redux/actions/lockerActions";
import { deAllocateLocker } from "../../redux/actions/lockerActions";

const SlotCard = ({ members, lockerDetails, member, setMember, token }) => {
  const [allocate, setAllocate] = useState(false);

  const dispatch = useDispatch();

  const handleAllocation = () => {
    dispatch(
      allocateLocker({ memberId: member, lockerId: lockerDetails?.id }, token)
    );
  };

  const handleDeallocation = () => {
    dispatch(deAllocateLocker(lockerDetails.id, token));
  };

  console.log("lockerDetails-", lockerDetails);

  return (
    <View style={styles.card}>
      <Title style={styles.title}>Locker {lockerDetails?.lockerNumber}</Title>
      <View style={styles.slotContainer}>
        {!allocate && (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text style={styles.label}>Size: {lockerDetails?.size}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text style={styles.label}>Price: {lockerDetails?.price}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              {lockerDetails?.occupiedBy ? (
                <>
                  <Text style={styles.label}>Status: Occupied</Text>
                  <FontAwesome name="check-circle" size={16} />
                </>
              ) : (
                <>
                  <Text style={styles.label}>Status: Unoccupied</Text>
                  <FontAwesome name="circle-o" size={16} />
                </>
              )}
            </View>

            {lockerDetails?.occupiedBy && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>
                  Occupied By: {lockerDetails?.occupiedBy?.name}
                </Text>
              </View>
            )}
          </>
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
          {lockerDetails?.occupiedBy ? (
            <View style={styles.occupiedBy}>
              <View style={styles.slot}>
                <Button
                  mode="contained"
                  onPress={() => {
                    handleDeallocation();
                  }}
                  style={styles.button}
                >
                  Deallocate
                </Button>
              </View>
            </View>
          ) : (
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
          )}
        </View>
      </View>
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
