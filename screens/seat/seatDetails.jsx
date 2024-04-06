import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { memberActions } from "../../redux/slices/memberSlice.js";
import { getAllMember } from "../../redux/actions/memberActions.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken } from "../../config/fetchAsyncStorage.js";
import PageLoader from "../../components/pageLoader";

import { Title } from "react-native-paper";
import SlotCard from "./slotCard.jsx";

const SeatDetailsPage = ({ route }) => {
  const dispatch = useDispatch();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [slotToDeallocate, setSlotToDeallocate] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [member, setMember] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { seat } = route.params;

  const {
    status: membersStatus,
    data: membersData,
    error: membersError,
  } = useSelector((state) => state.member.allMembers);

  const { status, data, error } = useSelector(
    (state) => state.seat.seatDetails
  );

  const getToken = async () => {
    const storedToken = await fetchToken();
    setToken(storedToken);
  };

  useMemo(() => {
    if (token) {
      dispatch(getAllMember(token));
    }
  }, [token]);

  useEffect(() => {
    getToken();
  }, []);

  useMemo(() => {
    if (membersStatus === "pending") {
      setMembersLoading(true);
    } else if (
      membersStatus === "success" &&
      membersData.status === "success"
    ) {
      setFetchedMembers([...membersData.data]);
      setMembersLoading(false);
    } else {
      setMessage(membersError);
      setVisible(true);
      setMembersLoading(false);
      memberActions.clearAllMembersError();
    }
  }, [membersStatus]);

  useMemo(() => {
    const modifyMembers = fetchedMembers.map((member) => ({
      label: member.name,
      value: member._id,
    }));
    setMembers(modifyMembers);
  }, [fetchedMembers]);

  const seatDetails = {
    id: seat?._id,
    seatNumber: seat?.seatNumber || 1,
    occupiedBy: {
      morning: seat?.schedule?.morning?.occupant || "",
      noon: seat?.schedule?.noon?.occupant || "",
      evening: seat?.schedule?.evening?.occupant || "",
      fullDay: seat?.schedule?.fullDay?.occupant || "",
    },
    description: "Comfortable seat near the window",
    createdAt: seat?.createdAt || "",
    updatedAt: seat?.updatedAt || "",
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setMessage(data.message);
      setVisible(true);
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      memberActions.clearMemberDetailsError();
    }
  }, [status]);

  // const confirmDeallocate = () => {
  //   // Perform deallocation action here
  //   Alert.alert(
  //     `Deallocated ${slotToDeallocate} slot for ${seatDetails.occupiedBy[slotToDeallocate]}`
  //   );
  //   setConfirmationVisible(false);
  // };

  // const cancelDeallocate = () => {
  //   setConfirmationVisible(false);
  // };

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  return loading ? (
    <PageLoader />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Seat {seatDetails.seatNumber}</Title>

      <SlotCard
        members={members}
        slot="Morning"
        seatId={seatDetails.id}
        occupiedBy={seatDetails?.occupiedBy?.morning}
        member={member}
        token={token}
        setMember={setMember}
      />
      <SlotCard
        members={members}
        slot="Noon"
        seatId={seatDetails.id}
        occupiedBy={seatDetails?.occupiedBy?.noon}
        member={member}
        token={token}
        setMember={setMember}
      />
      <SlotCard
        members={members}
        slot="Evening"
        seatId={seatDetails.id}
        occupiedBy={seatDetails?.occupiedBy?.evening}
        member={member}
        token={token}
        setMember={setMember}
      />
      {/* 
      <Paragraph style={styles.info}>
        Description: {seatDetails.description}
      </Paragraph>
      <Paragraph style={styles.info}>
        Created At: {seatDetails.createdAt}
      </Paragraph> */}
      {/* <Portal>
        <Dialog visible={confirmationVisible} onDismiss={cancelDeallocate}>
          <Dialog.Title>Confirm Deallocate</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to de allocate {slotToDeallocate} slot for{" "}
              {seatDetails.occupiedBy[slotToDeallocate]}?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelDeallocate}>Cancel</Button>
            <Button onPress={confirmDeallocate}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      {message && (
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Hide",
            onPress: () => {
              onDismissSnackBar();
            },
          }}
        >
          {message}
        </Snackbar>
      )}
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
