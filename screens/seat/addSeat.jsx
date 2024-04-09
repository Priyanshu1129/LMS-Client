import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, RadioButton, TextInput, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createSeat } from "../../redux/actions/seatActions";
import { seatActions } from "../../redux/slices/seatSlice";
import { fetchToken } from "../../config/fetchAsyncStorage";
import PageLoader from "../../components/pageLoader";

const AddSeatPage = ({ navigation }) => {
  const [createSingleSeat, setCreateSingleSeat] = useState(true);
  const [seatNumber, setSeatNumber] = useState("");
  const [description, setDescription] = useState("");
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.seat.seatDetails
  );

  const handleCreateSeat = () => {
    if (createSingleSeat && seatNumber) {
      console.log("Creating single seat:", { seatNumber, description });
      dispatch(
        createSeat({ createSingleSeat, seatNumber, description }, token)
      );
    } else if (startNumber && endNumber) {
      dispatch(
        createSeat(
          { createSingleSeat, start: startNumber, end: endNumber },
          token
        )
      );
      console.log("Creating multiple seats:", { startNumber, endNumber });
    }
  };

  const getToken = async () => {
    const storedToken = await fetchToken();
    setToken(storedToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setMessage("Seat Added Successfully");
      setVisible(true);
      dispatch(seatActions.clearSeatDetailsStatus());
      navigation.goBack();
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      dispatch(seatActions.clearSeatDetailsStatus());
      dispatch(seatActions.clearSeatDetailsError());
    }
  }, [status]);

  const handleDismissSnackBar = () => setVisible(false);

  return loading ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      <View>
        <View style={styles.radioButtonContainer}>
          <Text style={styles.radioText}>Single</Text>
          <RadioButton
            value="single"
            status={createSingleSeat ? "checked" : "unchecked"}
            onPress={() => setCreateSingleSeat(true)}
          />
        </View>
        <View style={styles.radioButtonContainer}>
          <Text style={styles.radioText}>Multiple</Text>
          <RadioButton
            value="multiple"
            status={!createSingleSeat ? "checked" : "unchecked"}
            onPress={() => setCreateSingleSeat(false)}
          />
        </View>
      </View>

      {createSingleSeat ? (
        <View>
          <TextInput
            label="Seat Number"
            value={seatNumber}
            keyboardType="numeric"
            onChangeText={setSeatNumber}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
        </View>
      ) : (
        <View>
          <TextInput
            label="Start Number"
            value={startNumber}
            keyboardType="numeric"
            onChangeText={setStartNumber}
            style={styles.input}
          />
          <TextInput
            label="End Number"
            value={endNumber}
            keyboardType="numeric"
            onChangeText={setEndNumber}
            style={styles.input}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreateSeat}
          style={styles.button}
        >
          Create
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log("Cancelled")}
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

export default AddSeatPage;
