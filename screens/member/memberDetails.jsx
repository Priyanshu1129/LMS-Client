import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember } from "../../redux/actions/memberActions.js";
import { memberActions } from "../../redux/slices/memberSlice.js";
import MemberBasicInfo from "./memberBasicInfo.jsx";
import MemberAccountDetails from "./memberAccountDetails.jsx";

const MemberProfilePage = ({ route, navigation }) => {
  const { member, token } = route.params;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

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
      setMessage(deleteData.message);
      setVisibleSnackBar(true);
      dispatch(memberActions.clearDeleteMemberStatus());
      console.log("msg-delete", deleteData.message);
      navigation.goBack();
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
    name: member?.name || "N/A",
    email: member?.email || "N/A",
    phone: member?.phone || "N/A",
    gender: member?.gender || "N/A",
    monthlySeatFee: member?.monthlySeatFee || "N/A",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    address: member?.address || "",
    membershipStatus: member?.membershipStatus || "N/A",
    createdAt: member?.createdAt || "N/A",
  };

  const [activeTab, setActiveTab] = useState("basicInfo");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={require("../../assets/avatar.jpg")} // Provide path to actual avatar image
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.status}>{user.membershipStatus}</Text>
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
        <MemberBasicInfo user={user} />
      ) : (
        <MemberAccountDetails />
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
    marginTop: 5,
    color: "#00a000",
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
