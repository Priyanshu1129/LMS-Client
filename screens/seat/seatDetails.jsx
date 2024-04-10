import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { memberActions } from "../../redux/slices/memberSlice.js";
import { getAllMember } from "../../redux/actions/memberActions.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken } from "../../config/fetchAsyncStorage.js";
import PageLoader from "../../components/pageLoader";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { Title } from "react-native-paper";
import SlotCard from "./slotCard.jsx";
import { seatActions } from "../../redux/slices/seatSlice.js";
import { deleteSeat } from "../../redux/actions/seatActions.js";

const SeatDetailsPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [member, setMember] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { seat, token } = route.params;

  const {
    status: membersStatus,
    data: membersData,
    error: membersError,
  } = useSelector((state) => state.member.allMembers);

  const { status, data, error } = useSelector(
    (state) => state.seat.seatDetails
  );
  const {
    status: deleteStatus,
    data: deleteData,
    error: deleteError,
  } = useSelector((state) => state.seat.deleteSeat);

  useMemo(() => {
    if (token) {
      dispatch(getAllMember(token));
    }
  }, [token]);

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
      setVisibleSnackBar(true);
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
      setVisibleSnackBar(true);
      dispatch(seatActions.clearSeatDetailsStatus());
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisibleSnackBar(true);
      dispatch(seatActions.clearSeatDetailsStatus());
      dispatch(seatActions.clearSeatDetailsError());
    }
  }, [status]);

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      setLoading(false);
      setMessage(deleteData.message);
      setVisibleSnackBar(true);
      dispatch(seatActions.clearDeleteSeatStatus());
      console.log("msg-delete", deleteData.message);
      navigation.goBack();
    } else if (deleteStatus === "failed") {
      setLoading(false);
      setMessage(deleteError);
      setVisibleSnackBar(true);
      dispatch(seatActions.clearDeleteSeatStatus());
      dispatch(seatActions.clearDeleteSEatError());
    }
  }, [deleteStatus]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  useEffect(() => {
    if (deleteConfirmation) {
      dispatch(deleteSeat(seatDetails.id, token));
    }
  }, [deleteConfirmation]);

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
      <Button
        mode="contained"
        onPress={() => setDialogVisible(true)}
        style={styles.allocateButton}
      >
        Delete Seat
      </Button>
      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        setConfirmation={setDeleteConfirmation}
        message={`Confirm Delete For Seat ${seatDetails.seatNumber}`}
      />
      {message && (
        <Snackbar
          visible={visibleSnackBar}
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
