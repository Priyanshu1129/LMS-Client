import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { List, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

const PaymentHistoryPage = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          label="Search by Name"
          value={nameFilter}
          onChangeText={setNameFilter}
          style={styles.input}
        />
      </View>
      {/* <View style={styles.filterContainer}>
        <Dropdown
          label="Method Filter"
          value={methodFilter}
          data={[
            { label: "All", value: "all" },
            { label: "Cash", value: "Cash" },
            { label: "Online", value: "Online" },
          ]}
          onChangeText={(value) => setMethodFilter(value)}
          style={styles.input}
        />
      </View> */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {payments.filter(filterPayments).map((payment) => (
          <List.Item
            key={payment.id}
            title={`${payment.date}`}
            description={`${payment.method}, ${payment.paidBy}`}
            right={() => <Text style={styles.amount}>{payment.amount}</Text>}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
        ))}
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

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const paymentList = () => {
//   return (
//     <View>
//       <Text>paymentList</Text>
//     </View>
//   )
// }

// export default paymentList

// const styles = StyleSheet.create({})
