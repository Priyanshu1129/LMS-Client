import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, List, TextInput } from "react-native-paper";
import Dropdown from "../../components/dropdown";

const PaymentHistoryPage = ({ navigation }) => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: "2024-04-01",
      amount: 500,
      method: "Cash",
      paidBy: "John Doe",
    },
    {
      id: 2,
      date: "2024-04-05",
      amount: 800,
      method: "Online",
      paidBy: "Jane Smith",
    },
    // Add more payments as needed
  ]);

  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  const filterPayments = (payment) => {
    if (
      nameFilter &&
      !payment.paidBy.toLowerCase().includes(nameFilter.toLowerCase())
    )
      return false;
    if (dateFilter && payment.date !== dateFilter) return false;
    if (methodFilter !== "all" && payment.method !== methodFilter) return false;
    return true;
  };

  const renderPayments = () =>
    payments
      .filter(filterPayments)
      .map((payment) => (
        <List.Item
          key={payment.id}
          title={`${payment.date}`}
          description={`${payment.method}, ${payment.paidBy}`}
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
        {renderPayments()}
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
