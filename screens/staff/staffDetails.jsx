import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Snackbar, useTheme } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteStaff, updateStaff } from "../../redux/actions/staffActions.js";
import { staffActions } from "../../redux/slices/staffSlice.js";
import StaffBasicInfo from "./staffBasicInfo.jsx";
import { getAllStaff, getStaff } from "../../redux/actions/staffActions.js";
import PageLoader from "../../components/pageLoader.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import { ScrollView } from "react-native-gesture-handler";

const StaffProfilePage = ({ route, navigation }) => {
  const { staff, token } = route.params;
  const [staffDetails, setStaffDetails] = useState(null);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [profileUrl, setProfileUrl] = useState(defaultAvatar);
  const [editedDetails, setEditedDetails] = useState({});
  const dispatch = useDispatch();
  const theme = useTheme();

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

  const {
    status: deleteStatus,
    data: deleteData,
    error: deleteError,
  } = useSelector((state) => state.staff.deleteStaff);

  const {
    status: updateStatus,
    data: updateData,
    error: updateError,
  } = useSelector((state) => state.staff.updateStaff);

  useEffect(() => {
    if (updateStatus === "pending") {
      setLoading(true);
    } else if (updateStatus === "success") {
      dispatch(getAllStaff(token));
      setStaffDetails(updateData?.data);
      setMessage("Details Updated Successfully");
      setVisibleSnackBar(true);
      setLoading(false);
      dispatch(staffActions.clearUpdateStaffStatus());
    } else if (updateStatus === "failed") {
      setLoading(false);
      setMessage(updateError);
      setVisibleSnackBar(true);
      dispatch(staffActions.clearUpdateStaffStatus());
      dispatch(staffActions.clearUpdateStaffError());
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      dispatch(getAllStaff(token));
      setLoading(false);
      dispatch(staffActions.clearDeleteStaffStatus());
      navigation.navigate({
        name: "Staffs",
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

  useEffect(() => {
    setUser({
      name: staffDetails?.name || "N/A",
      email: staffDetails?.email || "N/A",
      phone: staffDetails?.phone || "N/A",
      gender: staffDetails?.gender || "N/A",
      address: staffDetails?.address || "",
      createdAt: staffDetails?.createdAt || "N/A",
      avatar: staffDetails?.avatar || defaultAvatar,
    });
    setProfileUrl(staffDetails?.avatar);
  }, [staffDetails]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  const handleUpdateStaff = () => {
    if (profileUrl !== staffDetails.avatar) {
      editedDetails.avatarUri = profileUrl;
    }
    if (Object.keys(editedDetails).length > 0) {
      dispatch(updateStaff(editedDetails, token, staffDetails._id));
    }
    console.log(editedDetails);
    setEditedDetails({});
  };

  return loading && !staffDetails ? (
    <PageLoader />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            // { backgroundColor: theme.colors.secondaryContainer },
          ]}
        >
          <EditProfilePic
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
            edit={edit}
          />
          <Text style={[styles.name, { fontSize: theme.fontSizes.lg }]}>
            {user?.name}
          </Text>
          <Text style={[styles.email, { fontSize: theme.fontSizes.sm }]}>
            {user?.email}
          </Text>
        </View>

        <StaffBasicInfo
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          user={user}
          setEdit={setEdit}
          edit={edit}
          setDeleteDialogVisible={setDialogVisible}
          handleUpdateStaff={handleUpdateStaff}
        />

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 0,
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
    borderRadius: 5,
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
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 150,
  },
  activeTab: {
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    borderRadius: 2,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
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
  input: {
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
});

export default StaffProfilePage;
