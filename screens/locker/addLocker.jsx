import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, RadioButton, TextInput, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createLocker, getAllLockers } from "../../redux/actions/lockerActions";
import { lockerActions } from "../../redux/slices/lockerSlice";
import Dropdown from "../../components/dropdown";
import PageLoader from "../../components/pageLoader";

const AddLockerPage = ({ navigation, route }) => {
  const [createSingleLocker, setCreateSingleLocker] = useState(true);
  const [lockerNumber, setLockerNumber] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let token = route.params.token;

  const { status, data, error } = useSelector(
    (state) => state.locker.lockerDetails
  );

  const handleCreateLocker = () => {
    if (createSingleLocker && lockerNumber && price) {
      console.log("Creating single locker:", { lockerNumber, size, price });
      dispatch(
        createLocker({ createSingleLocker, lockerNumber, size, price }, token)
      );
    } else if (startNumber && endNumber) {
      dispatch(
        createLocker(
          { createSingleLocker, start: startNumber, end: endNumber },
          token
        )
      );
      console.log("Creating multiple lockers:", { startNumber, endNumber });
    }
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(getAllLockers(token));
      dispatch(lockerActions.clearLockerDetailsStatus());
      navigation.navigate({
        name: "AllLockers",
        params: {
          operationSuccess: true,
          operationMessage: "Locker Added Successfully",
        },
        merge: true,
      });
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      dispatch(lockerActions.clearLockerDetailsStatus());
      dispatch(lockerActions.clearLockerDetailsError());
    }
  }, [status]);

  const handleDismissSnackBar = () => setVisible(false);

  const lockerMenuOptions = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
  ];

  return loading ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      {createSingleLocker ? (
        <View>
          <TextInput
            label="Locker Number"
            value={lockerNumber}
            // mode="outlined"
            keyboardType="numeric"
            onChangeText={setLockerNumber}
            style={styles.input}
          />
          <Dropdown
            data={lockerMenuOptions}
            placeholder={"Select Locker Size"}
            value={size}
            setValue={setSize}
          />
          <TextInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            keyboardType="Numeric"
          />
        </View>
      ) : (
        <View>
          <TextInput
            label="Start Number"
            value={startNumber}
            mode="outlined"
            keyboardType="numeric"
            onChangeText={setStartNumber}
            style={styles.input}
          />
          <TextInput
            label="End Number"
            value={endNumber}
            keyboardType="numeric"
            mode="outlined"
            onChangeText={setEndNumber}
            style={styles.input}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreateLocker}
          style={styles.button}
        >
          Create
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Cancel
        </Button>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={handleDismissSnackBar}
        action={{
          label: "Dismiss",
          onPress: handleDismissSnackBar,
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "transparent"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default AddLockerPage;
