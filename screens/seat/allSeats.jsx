import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllSeats } from "../../redux/actions/seatActions";
import PageLoader from "../../components/pageLoader";
import { seatActions } from "../../redux/slices/seatSlice";
import NoDataPage from "../../components/NotAvailable";

const AllSeats = ({ navigation, route }) => {
  const [seats, setSeats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status, data, error } = useSelector((state) => state.seat.allSeats);

  const dispatch = useDispatch();

  let token = route.params.token;

  const fetchAllSeats = useCallback(() => {
    if (token) {
      dispatch(getAllSeats(token));
    }
  }, []);

  useEffect(() => {
    fetchAllSeats();
  }, [fetchAllSeats]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setSeats(data.data);
      setMessage("Seats Fetched Successfully");
      setVisible(true);
      setLoading(false);
      dispatch(seatActions.clearAllSeatsStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      seatActions.clearAllSeatsError();
      dispatch(seatActions.clearAllSeatsStatus());
    }
  }, [status]);

  const renderSeats = () => {
    return seats.map((seat, index) => (
      <View
        key={index}
        style={[
          styles.seat,
          seat.occupied ? styles.occupiedSeat : styles.unoccupiedSeat,
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SeatDetails", { seat })}
        >
          <Text style={styles.seatText}>{seat.seatNumber}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllSeats();
    }, [fetchAllSeats])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <TextInput
          mode="outlined"
          placeholder="Search Seat"
          style={styles.searchBar}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddSeat")}
          style={styles.addButton}
        >
          Add Seat
        </Button>
      </View>
      {loading ? (
        <PageLoader />
      ) : seats.length > 0 ? (
        <View style={styles.bottomSection}>{renderSeats()}</View>
      ) : (
        <NoDataPage message={"No Seats Available"} />
      )}
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
    </ScrollView>
  );
};

const numberOfSeatsPerRow = 5;
const totalMargin = 0.05; // 1% margin for each side of each seat

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    width: "40%",
  },
  searchBar: {
    width: "50%",
  },
  bottomSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  seat: {
    width: `${(100 - totalMargin * 100) / numberOfSeatsPerRow}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ADD8E6",
    margin: `${(totalMargin / 2) * 100}%`, // Margin is evenly distributed on both sides of the seat
    borderRadius: 5,
  },
  occupiedSeat: {
    backgroundColor: "#ADD8E6",
  },
  unoccupiedSeat: {
    backgroundColor: "#fff",
  },
  seatText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllSeats;
