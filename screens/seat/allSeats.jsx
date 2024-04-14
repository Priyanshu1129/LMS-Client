import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "react-native-paper";
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
import { RadioButton } from "react-native-paper";
import RadioButtonsExample from "../../components/radioFilter";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RadioFilter from "../../components/radioFilter";
const AllSeats = ({ navigation, route }) => {
  const [seats, setSeats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status, data, error } = useSelector((state) => state.seat.allSeats);
  
  const [schedule, setSchedule] = useState("morning");
  const [seatStatus, setSeatStatus] = useState(null);

  const dispatch = useDispatch();

  let token = route.params.token;
  
  const fetchAllSeats = useCallback(() => {
    if (token) {
      dispatch(getAllSeats(token));
    }
  }, []);

  useEffect(() => {
    fetchAllSeats();
  }, [fetchAllSeats, seatStatus, schedule]);

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

  const renderSeats = (theme) => {
    const styles = {
      occupiedSeat: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        shadow : 2
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
    return seats.map((seat, index) => { 
      if(seat.schedule[schedule].occupant == null){
        seat.isOccupied = false;
      }else{
        seat.isOccupied = true;
      }
      console.log("------------------",seat.schedule[schedule].occupant)
      console.log("////////////////",seat.isOccupied)
      return (
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
          <Text
            style={
              seat.occupied
                ? styles.occupiedSeatText
                : styles.unoccupiedSeatText
            }
          >
            {seat.seatNumber}
          </Text>
        </TouchableOpacity>
      </View>
      
    )
  });
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

  const theme = useTheme();

  const style = {
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    filterWraper: {
      flexDirection: "row",
    },
  };

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
    {
      label: "All",
      value: null,
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
    <ScrollView contentContainerStyle={styles.container}>
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
            borderBottomColor: theme.colors.background,
            borderBottomWidth: 2,
            padding: 2,
            paddingBottom :10
          }}
        >
          <View style={{flexDirection : "row" , justifyContent : "start", gap : 2}}>
          <Text
            style={{
              alignSelf: "center",
              color : theme.colors.primary,
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            Schedule
          </Text>
          <MaterialIcons name="schedule" size={20} color={theme.colors.primary} />
          </View>
          <RadioFilter
            options={scheduleOptions}
            checked={schedule}
            setChecked={setSchedule}
          />
        </View>
         <View style={{flexDirection : "row", alignContent : "center", gap : 4}}>  
        <Text
          style={{
            alignSelf: "center",
            fontWeight: 500,
            color : theme.colors.primary
          }}
        >
          Status
        </Text>
        <MaterialIcons name="event-available" size={20} color={theme.colors.primary} />
        </View>
        <RadioFilter
          options={statusOptions}
          checked={seatStatus}
          setChecked={setSeatStatus}
        />
      </View>
      {loading ? (
        <PageLoader />
      ) : seats.length > 0 ? (
        <View style={styles.bottomSection}>{renderSeats(theme)}</View>
      ) : (
        <NoDataPage message={"No Seats Available"} />
      )}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AddSeat")}
        style={styles.addButton}
      >
        Add Seat
      </Button>
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
  radioButton: {
    flexDirection: "row", // Display as flex row
    alignItems: "center", // Align items to center
    justifyContent: "space-between", // Space between button and label
    paddingHorizontal: 16, // Add padding to the button
    borderRadius: 8, // Rounded corners
  },
});

export default AllSeats;
