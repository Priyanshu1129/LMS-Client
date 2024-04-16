import PageLoader from "../../components/pageLoader";
import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import Dropdown from "../../components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../redux/actions/paymentActions";
import { paymentActions } from "../../redux/slices/paymentSlice.js";
import { memberActions } from "../../redux/slices/memberSlice.js";
import { getAllMember } from "../../redux/actions/memberActions.js";
import { getAllPayment } from "../../redux/actions/paymentActions";

const MakePaymentPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { status, data, error } = useSelector(
    (state) => state.payment.paymentDetails
  );
  const {
    status: membersStatus,
    data: membersData,
    error: membersError,
  } = useSelector((state) => state.member.allMembers);

  const methods = [
    { label: "Cash", value: "cash" },
    { label: "Online", value: "online" },
  ];
  const types = [
    { label: "Real", value: "real" },
    { label: "Adjustment", value: "adjustment" },
  ];

  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [type, setType] = useState("");

  let token = route.params.token;

  useMemo(() => {
    if (token) {
      dispatch(getAllMember(token));
    }
  }, [token]);
  const handleConfirm = () => {
    dispatch(createPayment({ amount, paidBy, method, type }, token));
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAmountChange = (text) => {
    // Validate input to allow only numbers without leading zeros
    const sanitizedText = text.replace(/[^1-9]/g, "").substring(0, 6);
    setAmount(sanitizedText);
  };

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
      setVisible(true);
      setMembersLoading(false);
      memberActions.clearAllMembersError();
    }
  }, [membersStatus]);

  useMemo(() => {
    const newMembers = fetchedMembers.map((member) => ({
      label: member.name,
      value: member._id,
    }));
    setMembers(newMembers);
  }, [fetchedMembers]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(getAllPayment(token));
      dispatch(paymentActions.clearPaymentDetailsStatus());
      navigation.navigate({
        name: "PaymentList",
        params: { paymentCreated: true },
        merge: true,
      });
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      dispatch(paymentActions.clearPaymentDetailsError());
      dispatch(paymentActions.clearPaymentDetailsStatus());
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  return loading ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      <Dropdown
        data={members}
        placeholder={"Select Member"}
        search={true}
        value={paidBy}
        setValue={setPaidBy}
      />
      <TextInput
        label="Amount"
        mode="outlined"
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <Dropdown
        data={methods}
        placeholder={"Select Method"}
        value={method}
        setValue={setMethod}
      />
      <Dropdown
        data={types}
        placeholder={"Select Type"}
        value={type}
        setValue={setType}
      />
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleConfirm} style={styles.button}>
          Confirm
        </Button>
        <Button mode="outlined" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default MakePaymentPage;
