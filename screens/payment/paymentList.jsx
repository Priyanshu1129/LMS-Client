import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, List, TextInput } from "react-native-paper";
import Dropdown from "../../components/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { getAllPayment } from "../../redux/actions/paymentActions";
import { paymentActions } from "../../redux/slices/paymentSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageLoader from "../../components/pageLoader";

const PaymentHistoryPage = ({ navigation }) => {
  const [payments, setPayments] = useState([
    // {
    //   id: 1,
    //   date: "2024-04-01",
    //   amount: 500,
    //   method: "Cash",
    //   paidBy: "John Doe",
    // }
  ]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.payment.allPayments
  );

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  useMemo(() => {
    if (token) {
      dispatch(getAllPayment(token));
    }
  }, [token]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setPayments(data.data);
      setLoading(false);
      dispatch(paymentActions.clearAllPaymentsStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      dispatch(paymentActions.clearAllPaymentsError());
      dispatch(paymentActions.clearAllPaymentsStatus());
    }
  }, [status]);

  const filterPayments = (payment) => {
    if (
      nameFilter &&
      !payment.paidBy.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
      return false;
    if (dateFilter && payment.createdAt !== dateFilter) return false;
    if (methodFilter !== "all" && payment.method !== methodFilter) return false;
    return true;
  };

  const renderPayments = () =>
    payments
      .filter(filterPayments)
      .map((payment) => (
        <List.Item
          key={payment._id}
          title={`${payment.createdAt}`}
          description={`${payment.method}, ${payment.paidBy.name}`}
          right={() => <Text style={styles.amount}>{payment.amount}</Text>}
          style={styles.listItem}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
      ));

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          label="Search by Member Name"
          value={nameFilter}
          onChangeText={setNameFilter}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("MakePayment")}
          style={styles.addButton}
        >
          Make Payment
        </Button>
      </View>

      <View style={styles.filterContainer}>
        <Dropdown
          placeholder="Method Filter"
          value={methodFilter}
          data={[
            { label: "All", value: "all" },
            { label: "Cash", value: "Cash" },
            { label: "Online", value: "Online" },
          ]}
          setValue={setMethodFilter}
        />
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {loading ? (
          <PageLoader />
        ) : payments.length > 0 ? (
          renderPayments()
        ) : (
          <Text>No Payments Available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  filterContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  listItemTitle: {
    fontWeight: "bold",
  },
  listItemDescription: {
    color: "#666666",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentHistoryPage;
