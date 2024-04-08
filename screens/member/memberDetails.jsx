import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember } from "../../redux/actions/memberActions.js";
import { fetchToken } from "../../config/fetchAsyncStorage.js";
import { memberActions } from "../../redux/slices/memberSlice.js";

const UserProfile = ({ route, navigation }) => {
  const { member } = route.params;
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const avatarUri = "https://randomuser.me/api/portraits/men/1.jpg";
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

  const getToken = async () => {
    const storedToken = await fetchToken();
    setToken(storedToken);
  };

  useEffect(() => {
    getToken();
  }, []);

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
    payments: [
      { date: "2024-03-28", amount: "$50" },
      { date: "2024-03-15", amount: "$50" },
      { date: "2024-02-28", amount: "$50" },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.header}>
          <Avatar.Image size={100} source={{ uri: avatarUri }} />
          <Title style={styles.name}>{user.name}</Title>
        </Card.Content>
      </Card>
      <Card style={styles.detailsCard}>
        <Card.Content>
          <View style={styles.details}>
            <Paragraph style={styles.label}>Email:</Paragraph>
            <Paragraph style={styles.value}>{user.email}</Paragraph>
            <Paragraph style={styles.label}>Phone:</Paragraph>
            <Paragraph style={styles.value}>{user.phone}</Paragraph>
            <Paragraph style={styles.label}>Gender:</Paragraph>
            <Paragraph style={styles.value}>{user.gender}</Paragraph>
            <Paragraph style={styles.label}>Monthly Seat Fee:</Paragraph>
            <Paragraph style={styles.value}>{user.monthlySeatFee}</Paragraph>
            <Paragraph style={styles.label}>Address:</Paragraph>
            <Paragraph style={styles.value}>{user.address}</Paragraph>
            <Paragraph style={styles.label}>Membership Status:</Paragraph>
            <Paragraph style={styles.value}>{user.membershipStatus}</Paragraph>
            <Paragraph style={styles.label}>Created At:</Paragraph>
            <Paragraph style={styles.value}>{user.createdAt}</Paragraph>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.paymentsCard}>
        <Card.Content>
          <Title style={styles.paymentsTitle}>Payments:</Title>
          {user.payments.map((payment, index) => (
            <View key={index} style={styles.payment}>
              <Paragraph style={styles.paymentDate}>{payment.date}</Paragraph>
              <Paragraph style={styles.paymentAmount}>
                Amount: {payment.amount}
              </Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button icon="update" mode="contained" style={styles.button}>
          Update Member
        </Button>
        <Button
          icon="delete"
          mode="contained"
          style={styles.button}
          onPress={() => setDialogVisible(true)}
        >
          Delete Member
        </Button>
      </View>
      <ConfirmationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        setConfirmation={setDeleteConfirmation}
        message={`Confirm Delete For Member ${user.name}`}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsCard: {
    marginBottom: 20,
  },
  details: {},
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },
  paymentsCard: {
    marginBottom: 20,
  },
  paymentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  payment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  paymentDate: {
    fontSize: 16,
    color: "#555",
  },
  paymentAmount: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#007AFF", // Example button color
  },
});

export default UserProfile;
