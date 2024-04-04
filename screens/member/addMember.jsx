import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Menu } from "react-native-paper";

const AddMemberPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [monthlyFee, setMonthlyFee] = useState("500");
  const [status, setStatus] = useState("Active");
  const [address, setAddress] = useState("");
  const [seat, setSeat] = useState("");
  const [preparation, setPreparation] = useState("");
  const [seatMenuVisible, setSeatMenuVisible] = useState(false);

  const handleRegister = () => {
    // Handle registration logic here
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };

  const openSeatMenu = () => setSeatMenuVisible(true);

  const closeSeatMenu = () => setSeatMenuVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* <Text style={styles.heading}>Add New Member</Text> */}
        <TextInput
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Phone"
          value={phone}
          mode="outlined"
          onChangeText={setPhone}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>

          <RadioButton.Group
            onValueChange={(value) => setGender(value)}
            value={gender}
          >
            <View style={{ flexDirection: "row" }}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          label="Monthly Fee"
          value={monthlyFee}
          mode="outlined"
          onChangeText={setMonthlyFee}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <RadioButton.Group
            onValueChange={(value) => setStatus(value)}
            value={status}
          >
            <View style={{ flexDirection: "row" }}>
              <RadioButton.Item label="Active" value="Active" />
              <RadioButton.Item label="Inactive" value="Inactive" />
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
        />
        <Menu
          visible={seatMenuVisible}
          onDismiss={closeSeatMenu}
          anchor={
            <Button onPress={openSeatMenu} mode="elevated" style={styles.input}>
              {seat || "Select Seat"}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSeat("s-1");
              closeSeatMenu();
            }}
            title="s-1"
          />
          <Menu.Item
            onPress={() => {
              setSeat("s-2");
              closeSeatMenu();
            }}
            title="s-2"
          />
          {/* Add more seat options as needed */}
        </Menu>
        <TextInput
          label="Preparation"
          value={preparation}
          mode="outlined"
          onChangeText={setPreparation}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
          >
            Register
          </Button>
          <Button mode="outlined" onPress={handleCancel} style={styles.button}>
            Cancel
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddMemberPage;
