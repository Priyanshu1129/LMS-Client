import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React from "react";

const MemberBasicInfo = ({ user, setDeleteDialogVisible }) => (
  <View style={styles.tabContent}>
    <View style={styles.userInfo}>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View> */}
      <View style={styles.userInfoRow}>
        <TextInput
          label="Email"
          value={user?.email}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user?.phone}</Text>
      </View> */}
      <View style={styles.userInfoRow}>
        <TextInput
          label="Phone"
          value={user?.phone}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{user?.gender}</Text>
      </View> */}
      <View style={styles.userInfoRow}>
        <TextInput
          label="Gender"
          value={user?.gender}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Monthly Fee:</Text>
        <Text style={styles.value}>{user?.monthlySeatFee}</Text>
      </View> */}
      <View style={styles.userInfoRow}>
        <TextInput
          label="Address"
          value={user?.address}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{user?.address}</Text>
      </View> */}
      <View style={styles.userInfoRow}>
        <TextInput
          label="Membership"
          value={user?.membershipStatus}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Membership:</Text>
        <Text style={styles.value}>{user?.membershipStatus}</Text>
      </View> */}
      {/* <View style={styles.userInfoRow}>
        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>{user?.createdAt}</Text>
      </View> */}
    </View>
    <View style={styles.buttonContainer}>
      <Button
        icon="update"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Update
      </Button>
      <Button
        icon="delete"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => setDeleteDialogVisible(true)}
      >
        Delete
      </Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabContent: {
    padding: 40,
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  avatar: {
    marginRight: 20,
  },
  input: {
    flex: 1,
  },
  userInfo: {
    // backgroundColor: "yellow",
    display: "flex",
    justifyContent: "space-between",
  },
  userInfoRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  label: {
    fontWeight: "bold",
    width: 130,
    color: "#666",
    fontSize: 20,
  },
  value: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default MemberBasicInfo;
