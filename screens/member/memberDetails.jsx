import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember } from "../../redux/actions/memberActions.js";
import { memberActions } from "../../redux/slices/memberSlice.js";
import MemberBasicInfo from "./memberBasicInfo.jsx";
import MemberAccountDetails from "./memberAccountDetails.jsx";
import { getAllMember, getMember } from "../../redux/actions/memberActions.js";
import PageLoader from "../../components/pageLoader.jsx";

const MemberProfilePage = ({ route, navigation }) => {
  const { member, token } = route.params;
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

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
      setMemberDetails(getMemberData.data);
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

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      setLoading(false);
      dispatch(getAllMember(token));
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

  const user = {
    name: memberDetails?.name || "N/A",
    email: memberDetails?.email || "N/A",
    phone: memberDetails?.phone || "N/A",
    gender: memberDetails?.gender || "N/A",
    monthlySeatFee: memberDetails?.monthlySeatFee || "N/A",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    address: memberDetails?.address || "",
    membershipStatus: memberDetails?.membershipStatus || "N/A",
    createdAt: memberDetails?.createdAt || "N/A",
  };

  const [activeTab, setActiveTab] = useState("basicInfo");

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  return loading && !memberDetails ? (
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
        <View
          style={[
            styles.statusWrapper,
            {
              backgroundColor:
                user.membershipStatus === "active" ? "#D1FAE5" : "#FFEDD5",
            },
          ]}
        >
          <Text
            style={[
              styles.status,
              {
                color: user.membershipStatus === "active" ? "green" : "orange",
              },
            ]}
          >
            {user.membershipStatus}
          </Text>
        </View>
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
      {activeTab === "basicInfo" ? (
        <MemberBasicInfo
          user={user}
          setDeleteDialogVisible={setDialogVisible}
        />
      ) : (
        <MemberAccountDetails />
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

export default MemberProfilePage;
