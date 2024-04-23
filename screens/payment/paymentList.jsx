import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, List, TextInput, Avatar, Snackbar } from "react-native-paper";
import Dropdown from "../../components/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { getAllPayment } from "../../redux/actions/paymentActions";
import { paymentActions } from "../../redux/slices/paymentSlice";
import PageLoader from "../../components/pageLoader";
import PaymentListCard from "../../components/paymentListCard";
import SearchBar from "../../components/searchBar";
import ModeFilterMenu from "../../components/filterMenu";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const PaymentHistoryPage = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [modeFilterVisible, setModeFilterVisible] = useState(false);

  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.payment.allPayments
  );
  const {
    status: deleteStatus,
    data: deleteData,
    error: deleteError,
  } = useSelector((state) => state.payment.deletePayment);

  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoading(true);
    } else if (deleteStatus === "success") {
      dispatch(getAllPayment(token));
      dispatch(paymentActions.clearDeletePaymentStatus());
      setMessage("Payment Deleted Successfully");
      setVisible(true);
    } else if (deleteStatus === "failed") {
      setLoading(false);
      setMessage(deleteError);
      setVisible(true);
      dispatch(paymentActions.clearDeletePaymentStatus());
      dispatch(paymentActions.clearDeletePaymentError());
    }
  }, [deleteStatus]);

  const [payments, setPayments] = useState(data?.data ? data.data : []);
  const { token, paymentCreated } = route.params;

  useEffect(() => {
    if (paymentCreated && !loading) {
      setMessage("Payment Created Successfully");
      setVisible(true);
    }
  }, [paymentCreated, loading]);

  const fetAllPayments = useCallback(() => {
    if (token) {
      dispatch(getAllPayment(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!data?.data) {
      fetAllPayments();
    }
  }, [fetAllPayments]);

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
      .map((payment) => <PaymentListCard payment={payment} token={token} />);

  const onChangeSearch = (query) => setNameFilter(query);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  const filterMenuOptions = [
    { title: "All", value: "all" },
    { title: "Cash", value: "cash" },
    { title: "Online", value: "online" },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <SearchBar value={{ nameFilter }} onChangeText={onChangeSearch} />
        </View>
        <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
          <ModeFilterMenu
            style={styles.optionButton}
            visible={modeFilterVisible}
            setVisible={setModeFilterVisible}
            onChange={(option) => setMethodFilter(option)}
            options={filterMenuOptions}
          />
          <Button
            style={styles.optionButton}
            onPress={() => navigation.navigate("MakePayment")}
            mode="contained"
          >
            <MaterialIcon name="person-add-alt" size={20} color="white" />
          </Button>
          <Button
            style={styles.optionButton}
            onPress={() => fetAllPayments()}
            mode="contained"
          >
            <MaterialIcon name="refresh" size={20} color="white" />
          </Button>
        </View>
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
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  filterContainer: {
    marginBottom: 10,
  },
  optionButton: {
    borderRadius: 5,
  },
  input: {
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 10,
    height: 100,
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
