import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMember,
  updateMember,
} from "../../redux/actions/memberActions.js";
import { memberActions } from "../../redux/slices/memberSlice.js";
import MemberBasicInfo from "./memberBasicInfo.jsx";
import MemberAccountDetails from "./memberAccountDetails.jsx";
import { getAllMember, getMember } from "../../redux/actions/memberActions.js";
import PageLoader from "../../components/pageLoader.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import { ScrollView } from "react-native-gesture-handler";
import AccountDetails from "./accountDetails.jsx";
import PlanDetails from "./memberPlanDetails.jsx";

const MemberProfilePage = ({ route, navigation }) => {
  const { member, token } = route.params;
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [profileUrl, setProfileUrl] = useState(defaultAvatar);
  const [editedDetails, setEditedDetails] = useState({});
  const [activeTab, setActiveTab] = useState("basicInfo");
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (member && token) {
      dispatch(getMember(member._id, token));
    }
  }, [member]);

  const {
    status: getMemberStatus,
    data: getMemberData,
    error: getMemberError,
  } = useSelector((state) => state.member.memberDetails);

  useEffect(() => {
    if (getMemberStatus == "pending") {
      setLoading(true);
    } else if (getMemberStatus == "success") {
      setMemberDetails(getMemberData?.data);
      setLoading(false);
      dispatch(memberActions.clearMemberDetailsStatus());
    } else if (getMemberStatus == "failed") {
      setLoading(false);
      setMessage(getMemberError);
      setVisibleSnackBar(true);
      dispatch(memberActions.clearMemberDetailsStatus());
      dispatch(memberActions.clearMemberDetailsError());
    }
  }, [getMemberStatus]);

  const {
    status: deleteStatus,
    data: deleteData,
    error: deleteError,
  } = useSelector((state) => state.member.deleteMember);

  const {
    status: updateStatus,
    data: updateData,
    error: updateError,
  } = useSelector((state) => state.member.updateMember);

  useEffect(() => {
    if (updateStatus === "pending") {
      setLoading(true);
    } else if (updateStatus === "success") {
      dispatch(getAllMember(token));
      setMemberDetails(updateData?.data);
      setMessage("Details Updated Successfully");
      setVisibleSnackBar(true);
      setLoading(false);
      dispatch(memberActions.clearUpdateMemberStatus());
    } else if (updateStatus === "failed") {
      setLoading(false);
      setMessage(updateError);
      setVisibleSnackBar(true);
      dispatch(memberActions.clearUpdateMemberStatus());
      dispatch(memberActions.clearUpdateMemberError());
    }
  }, [updateStatus]);

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      dispatch(getAllMember(token));
      setLoading(false);
      dispatch(memberActions.clearDeleteMemberStatus());
      navigation.navigate({
        name: "Members",
        params: { memberDeleted: true },
        merge: true,
      });
    } else if (deleteStatus === "failed") {
      setLoading(false);
      setMessage(deleteError);
      setVisibleSnackBar(true);
      dispatch(memberActions.clearDeleteMemberStatus());
      dispatch(memberActions.clearDeleteMemberError());
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (deleteConfirmation) {
      dispatch(deleteMember(member._id, token));
    }
  }, [deleteConfirmation]);

  useEffect(() => {
    setUser({
      name: memberDetails?.name || "N/A",
      email: memberDetails?.email || "N/A",
      phone: memberDetails?.phone || "N/A",
      gender: memberDetails?.gender || "N/A",
      monthlySeatFee: memberDetails?.monthlySeatFee || "N/A",
      address: memberDetails?.address || "",
      membershipStatus: memberDetails?.membershipStatus || "N/A",
      createdAt: memberDetails?.createdAt || "N/A",
      avatar: memberDetails?.avatar || defaultAvatar,
    });
    setProfileUrl(memberDetails?.avatar);
  }, [memberDetails]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  const handleUpdateMember = () => {
    //appending the avatarUri if the profile pic has been changed
    if (profileUrl !== memberDetails.avatar) {
      editedDetails.avatarUri = profileUrl;
    }
    if (Object.keys(editedDetails).length > 0) {
      dispatch(updateMember(editedDetails, token, memberDetails._id));
    }
    setEditedDetails({});
  };

  return loading && !memberDetails ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          // { backgroundColor: theme.colors.secondaryContainer },
        ]}
      >
        <EditProfilePic
          edit={edit}
          profileUrl={profileUrl}
          setProfileUrl={setProfileUrl}
        />
        <Text style={[styles.name, { fontSize: theme.fontSizes.lg }]}>
          {user?.name}
        </Text>
        <Text style={[styles.email, { fontSize: theme.fontSizes.sm }]}>
          {user?.email}
        </Text>
        <View
          style={[
            styles.statusWrapper,
            {
              backgroundColor:
                user?.membershipStatus === "active" ? "#D1FAE5" : "#FFEDD5",
            },
          ]}
        >
          <Text
            style={[
              [{ fontSize: theme.fontSizes.md }],
              {
                color: user?.membershipStatus === "active" ? "green" : "orange",
              },
            ]}
          >
            {user?.membershipStatus}
          </Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab == "basicInfo"
              ? {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                }
              : { backgroundColor: theme.colors.secondaryContainer },
          ]}
          onPress={() => setActiveTab("basicInfo")}
        >
          <Text
            style={[
              [styles.tabButtonText, { fontSize: theme.fontSizes.sm }],
              {
                color:
                  activeTab === "basicInfo"
                    ? theme.colors.background
                    : theme.colors.primary,
              },
            ]}
          >
            Basic Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab == "accountDetails"
              ? {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                }
              : { backgroundColor: theme.colors.secondaryContainer },
          ]}
          onPress={() => setActiveTab("accountDetails")}
        >
          <Text
            style={[
              [styles.tabButtonText, { fontSize: theme.fontSizes.sm }],
              {
                color:
                  activeTab === "accountDetails"
                    ? theme.colors.background
                    : theme.colors.primary,
              },
            ]}
          >
            Account Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab == "planDetail"
              ? {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                }
              : { backgroundColor: theme.colors.secondaryContainer },
          ]}
          onPress={() => setActiveTab("planDetail")}
        >
          <Text
            style={[
              [styles.tabButtonText, { fontSize: theme.fontSizes.sm }],
              {
                color:
                  activeTab === "planDetail"
                    ? theme.colors.background
                    : theme.colors.primary,
              },
            ]}
          >
            Plan Details
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "basicInfo" ? (
        <MemberBasicInfo
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          user={user}
          edit={edit}
          setEdit={setEdit}
          setDeleteDialogVisible={setDialogVisible}
          handleUpdateMember={handleUpdateMember}
        />
      ) : activeTab === "accountDetails" ? (
        <AccountDetails memberId={memberDetails._id} token={token} />
      ) : (
        <PlanDetails />
      )}

      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={"Confirm Delete Member"}
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
    padding: 10,
    paddingTop: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 0,
  },
  email: {
    fontSize: 15,
    marginTop: 5,
    color: "#666",
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
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 150,
    borderRadius: 6,
  },
  activeTab: {
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    borderRadius: 6,
  },
  tabButtonText: {
    fontSize: 15,
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

export default MemberProfilePage;

// const handleUpdate = () => {
//   // Handle update logic here
//   console.log("Updated details:", editedDetails);
// };

// const handleChange = (key, value) => {
//   setEditedDetails({ ...editedDetails, [key]: value });
// };
// <TextInput
//         style={styles.input}
//         value={editedDetails.email || user.email}
//         onChangeText={(value) => handleChange('email', value)}
//       />
//       input: {
//   marginBottom: 10,
//   backgroundColor: "#f2f2f2",
//   padding: 10,
//   borderRadius: 5,
// },
