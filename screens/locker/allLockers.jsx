import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "react-native-paper";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllLockers } from "../../redux/actions/lockerActions";
import PageLoader from "../../components/pageLoader";
import { lockerActions } from "../../redux/slices/lockerSlice";
import NoDataPage from "../../components/NotAvailable";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchBar from "../../components/searchBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AllLockers = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status, data, error } = useSelector(
    (state) => state.locker?.allLockers
  );
  const [lockers, setLockers] = useState(data?.data ? data.data : []);

  const dispatch = useDispatch();

  const { token, operationSuccess, operationMessage } = route.params;

  const fetchAllLockers = useCallback(() => {
    if (token) {
      dispatch(getAllLockers(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!data?.data) {
      fetchAllLockers();
    }
  }, [fetchAllLockers]);

  useEffect(() => {
    if (operationSuccess && !loading) {
      setMessage(operationMessage);
      setVisible(true);
    }
  }, [operationSuccess, loading]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setLockers(data.data);
      setLoading(false);
      dispatch(lockerActions.clearAllLockersStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      lockerActions.clearAllLockersError();
      dispatch(lockerActions.clearAllLockersStatus());
    }
  }, [status]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderLockers = (theme) => {
    const styles = {
      occupiedLocker: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        shadow: 2,
      },
      unoccupiedLocker: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.primary,
        elevation: 4, // Apply elevation here
      },
      occupiedLockerText: {
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: "bold",
      },
      unoccupiedLockerText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: "bold",
      },
      locker: {
        width: `12%`,
        height: `12%`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        margin: `1%`, // Margin is evenly distributed on both sides of the locker
        borderRadius: 4,
      },
    };
    return lockers.map((locker, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.locker,
            locker.isOccupied ? styles.occupiedLocker : styles.unoccupiedLocker,
          ]}
          key={index}
          onPress={() => navigation.navigate("LockerDetails", { locker })}
        >
          <Text
            style={
              locker.isOccupied
                ? styles.occupiedLockerText
                : styles.unoccupiedLockerText
            }
          >
            {locker.lockerNumber}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  const theme = useTheme();


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
          <SearchBar value={{ searchQuery }} onChangeText={onChangeSearch} />
        </View>
        <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("AddLocker")}
            style={styles.addButton}
          >
            Add Locker
          </Button>
          <Button
            mode="contained"
            onPress={() => fetchAllLockers()}
            style={styles.addButton}
          >
            <MaterialIcons name="refresh" size={20} color="white" />
          </Button>
        </View>
      </View>

      {loading ? (
        <PageLoader />
      ) : lockers.length > 0 ? (
        <ScrollView>
          <View style={styles.bottomSection}>{renderLockers(theme)}</View>
        </ScrollView>
      ) : (
        <NoDataPage message={"No Lockers Available"} />
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

export default AllLockers;
