import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { memberActions } from "../../redux/slices/memberSlice.js";
import { getAllMember } from "../../redux/actions/memberActions.js";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/pageLoader";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { Title } from "react-native-paper";
import Card from "./card.jsx";
import { lockerActions } from "../../redux/slices/lockerSlice.js";
import {
  deleteLocker,
  getAllLockers,
} from "../../redux/actions/lockerActions.js";

const LockerDetailsPage = ({ navigation, route }) => {
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
  const { locker, token } = route.params;

  const {
    status: membersStatus,
    data: membersData,
    error: membersError,
  } = useSelector((state) => state.member.allMembers);

  const { status, data, error } = useSelector(
    (state) => state.locker.lockerDetails
  );
  const {
    status: deleteStatus,
    data: deleteData,
    error: deleteError,
  } = useSelector((state) => state.locker.deleteLocker);

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
      setFetchedMembers([...membersData.data.allMembers]);
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

  const lockerDetails = {
    id: locker?._id,
    lockerNumber: locker?.lockerNumber || 1,
    occupiedBy: locker?.occupant || "",
    size: locker?.size || "",
    price: locker?.price || "",
    isOccupied: locker?.isOccupied || "",
    createdAt: locker?.createdAt || "",
    updatedAt: locker?.updatedAt || "",
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setMessage(data.message);
      setVisibleSnackBar(true);
      dispatch(lockerActions.clearLockerDetailsStatus());
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisibleSnackBar(true);
      dispatch(lockerActions.clearLockerDetailsStatus());
      dispatch(lockerActions.clearLockerDetailsError());
    }
  }, [status]);

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      setLoading(false);
      dispatch(getAllLockers(token));
      dispatch(lockerActions.clearDeleteLockerStatus());
      navigation.navigate({
        name: "AllLockers",
        params: {
          operationSuccess: true,
          operationMessage: deleteData.message,
        },
        merge: true,
      });
    } else if (deleteStatus === "failed") {
      setLoading(false);
      setMessage(deleteError);
      setVisibleSnackBar(true);
      dispatch(lockerActions.clearDeleteLockerStatus());
      dispatch(lockerActions.clearDeleteLockerError());
    }
  }, [deleteStatus]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  useEffect(() => {
    if (deleteConfirmation) {
      dispatch(deleteLocker(lockerDetails.id, token));
    }
  }, [deleteConfirmation]);

  return loading ? (
    <PageLoader />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        members={members}
        lockerDetails={lockerDetails}
        member={member}
        token={token}
        setMember={setMember}
      />
      <Button
        mode="contained"
        onPress={() => setDialogVisible(true)}
        style={styles.button}
      >
        Delete Locker
      </Button>
      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        setConfirmation={setDeleteConfirmation}
        message={`Confirm Delete For Locker ${lockerDetails.lockerNumber}`}
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
    borderRadius: 5,
  },
});

export default LockerDetailsPage;
