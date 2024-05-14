import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "react-native-paper";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllSeats } from "../../redux/actions/seatActions";
import PageLoader from "../../components/pageLoader";
import { seatActions } from "../../redux/slices/seatSlice";
import NoDataPage from "../../components/NotAvailable";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchBar from "../../components/searchBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RadioFilter from "../../components/radioFilter";
const AllSeats = ({ navigation, route }) => {
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status, data, error } = useSelector((state) => state.seat.allSeats);
  const [seats, setSeats] = useState(data?.data ?? []);

  const [schedule, setSchedule] = useState("fullDay");

  const dispatch = useDispatch();

  const { token, operationSuccess, operationMessage } = route.params;

  const fetchAllSeats = useCallback(() => {
    if (token) {
      dispatch(getAllSeats(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!data?.data) {
      fetchAllSeats();
    }
  }, [fetchAllSeats]);

  useEffect(() => {
    getFilteredSeats();
  }, [schedule, seats]);

  useEffect(() => {
    if (operationSuccess && !loading) {
      setMessage(operationMessage);
      setVisibleSnackbar(true);
    }
  }, [operationSuccess, loading]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setSeats(data.data);
      setFilteredSeats(data.data);
      setLoading(false);
      dispatch(seatActions.clearAllSeatsStatus());
    } else {
      setMessage(error);
      setVisibleSnackbar(true);
      setLoading(false);
      seatActions.clearAllSeatsError();
      dispatch(seatActions.clearAllSeatsStatus());
    }
  }, [status]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const getFilteredSeats = () => {
    const filteredResult = seats.map((seat) => {
      let isOccupied = true;
      if (seat.schedule[schedule].occupant != null) {
        isOccupied = true;
      } else {
        isOccupied = false;
      }
      return { ...seat, isOccupied: isOccupied };
    });
    setFilteredSeats(filteredResult);
  };
  const renderSeats = (theme) => {
    const styles = {
      occupiedSeat: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        shadow: 2,
      },
      unoccupiedSeat: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.primary,
        elevation: 4, // Apply elevation here
      },
      occupiedSeatText: {
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: "bold",
      },
      unoccupiedSeatText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: "bold",
      },
      seat: {
        width: `12%`,
        height: `12%`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        margin: `1%`, // Margin is evenly distributed on both sides of the seat
        borderRadius: 4,
      },
    };

    return filteredSeats.map((seat, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.seat,
            seat.isOccupied ? styles.occupiedSeat : styles.unoccupiedSeat,
          ]}
          key={index}
          onPress={() => navigation.navigate("SeatDetails", { seat })}
        >
          <Text
            style={
              seat.isOccupied
                ? styles.occupiedSeatText
                : styles.unoccupiedSeatText
            }
          >
            {seat.seatNumber}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const onDismissSnackBar = () => {
    setVisibleSnackbar(false);
    setMessage(null);
  };

  const theme = useTheme();

  scheduleOptions = [
    {
      label: "Morning",
      value: "morning",
    },
    {
      label: "Noon",
      value: "noon",
    },
    {
      label: "Evening",
      value: "evening",
    },
    {
      label: "Full Day",
      value: "fullDay",
    },
  ];

  statusOptions = [
    {
      label: "Occupied",
      value: "occupied",
    },
    {
      label: "All",
      value: null,
    },
    {
      label: "Vacant",
      value: "vacant",
    },
  ];

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder={"Enter Seat Number"}
            value={{ searchQuery }}
            onChangeText={onChangeSearch}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("AddSeat")}
            style={styles.addButton}
          >
            Add Seat
          </Button>
          <Button
            mode="contained"
            onPress={() => fetchAllSeats()}
            style={styles.addButton}
          >
            <MaterialIcons name="refresh" size={20} color="white" />
          </Button>
        </View>
      </View>

      <View
        style={{
          flexDirection: "col",
          gap: 5,
          backgroundColor: theme.colors.secondaryContainer,
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontWeight: 500,
              color: theme.colors.primary,
            }}
          >
            Filter
          </Text>
          <AntDesign name="filter" size={20} color={theme.colors.primary} />
        </View>
        <View
          style={{
            borderTopColor: theme.colors.background,
            borderTopWidth: 2,
            padding: 2,
            paddingBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "start", gap: 2 }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: theme.colors.primary,
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              Schedule
            </Text>
            <MaterialIcons
              name="schedule"
              size={20}
              color={theme.colors.primary}
            />
          </View>
          <RadioFilter
            options={scheduleOptions}
            checked={schedule}
            setChecked={setSchedule}
          />
        </View>
      </View>
      {loading ? (
        <PageLoader />
      ) : seats.length > 0 ? (
        <ScrollView>
          <View style={styles.bottomSection}>{renderSeats(theme)}</View>
        </ScrollView>
      ) : (
        <NoDataPage message={"No Seats Available"} />
      )}

      {message && (
        <Snackbar
          visible={visibleSnackbar}
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
    flexGrow: 1,
    padding: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    borderRadius: 5,
  },
  searchBar: {
    width: "50%",
  },
  bottomSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioButton: {
    flexDirection: "row", // Display as flex row
    alignItems: "center", // Align items to center
    justifyContent: "space-between", // Space between button and label
    paddingHorizontal: 16, // Add padding to the button
    borderRadius: 8, // Rounded corners
  },
});

export default AllSeats;
