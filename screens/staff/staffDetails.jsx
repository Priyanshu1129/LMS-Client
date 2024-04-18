import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteStaff } from "../../redux/actions/staffActions.js";
import { staffActions } from "../../redux/slices/staffSlice.js";
import StaffBasicInfo from "./staffBasicInfo.jsx";
import { getAllStaff, getStaff } from "../../redux/actions/staffActions.js";
import PageLoader from "../../components/pageLoader.jsx";

const StaffProfilePage = ({ route, navigation }) => {
  const { staff, token } = route.params;
  const [staffDetails, setStaffDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (staff && token) {
      dispatch(getStaff(staff._id, token));
    }
  }, [staff]);

  const {
    status: getStaffStatus,
    data: getStaffData,
    error: getStaffError,
  } = useSelector((state) => state.staff.staffDetails);

  useEffect(() => {
    if (getStaffStatus == "pending") {
      setLoading(true);
    } else if (getStaffStatus == "success") {
      setStaffDetails(getStaffData.data);
      setLoading(false);
      dispatch(staffActions.clearStaffDetailsStatus());
    } else if (getStaffStatus == "failed") {
      setLoading(false);
      setMessage(getStaffError);
      setVisibleSnackBar(true);
      dispatch(staffActions.clearStaffDetailsStatus());
      dispatch(staffActions.clearStaffDetailsError());
    }
  }, [getStaffStatus]);

  const { status: deleteStatus, error: deleteError } = useSelector(
    (state) => state.staff.deleteStaff
  );

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      setLoading(false);
      dispatch(getAllStaff(token));
      dispatch(staffActions.clearDeleteStaffStatus());
      navigation.navigate({
        name: "StaffsList",
        params: { staffDeleted: true },
        merge: true,
      });
    } else if (deleteStatus === "failed") {
      setLoading(false);
      setMessage(deleteError);
      setVisibleSnackBar(true);
      dispatch(staffActions.clearDeleteStaffStatus());
      dispatch(staffActions.clearDeleteStaffError());
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (deleteConfirmation) {
      dispatch(deleteStaff(staff._id, token));
    }
  }, [deleteConfirmation]);

  const user = {
    name: staffDetails?.name || "N/A",
    email: staffDetails?.email || "N/A",
    phone: staffDetails?.phone || "N/A",
    gender: staffDetails?.gender || "N/A",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: staffDetails?.createdAt || "N/A",
  };

  const [activeTab, setActiveTab] = useState("basicInfo");

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  return loading && !staffDetails ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={require("../../assets/avatar.jpg")} // Provide path to actual avatar image
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "basicInfo" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("basicInfo")}
        >
          <Text style={styles.tabButtonText}>Basic Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "accountDetails" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("accountDetails")}
        >
          <Text style={styles.tabButtonText}>Account Details</Text>
        </TouchableOpacity>
      </View>

      <StaffBasicInfo user={user} setDeleteDialogVisible={setDialogVisible} />
      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={"Confirm Delete Staff"}
        setConfirmation={setDeleteConfirmation}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: "#666",
  },
  status: {
    fontSize: 16,
  },
  statusWrapper: {
    marginTop: 8,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0070BB",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default StaffProfilePage;
