import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import SearchBar from "../../components/searchBar";
import { StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Button, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getAllStaff } from "../../redux/actions/staffActions";
import PageLoader from "../../components/pageLoader";
import { staffActions } from "../../redux/slices/staffSlice";
import NoDataPage from "../../components/NotAvailable";
import StaffListCard from "../../components/staffListCard";

const StaffsList = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token, staffCreated, staffDeleted } = route.params;

  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.staff.allStaffs);
  const [staffs, setStaffs] = useState(data?.data ? [...data?.data] : []);

  const fetchStaffs = useCallback(() => {
    if (token) {
      dispatch(getAllStaff(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!data?.data) {
      fetchStaffs();
    }
  }, [fetchStaffs]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setStaffs(data.data);
      setLoading(false);
      dispatch(staffActions.clearAllStaffsStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      dispatch(staffActions.clearAllStaffsError());
    }
  }, [status]);

  useEffect(() => {
    if (staffCreated && !loading) {
      setMessage("Staff Added Successfully");
      setVisible(true);
    } else if (staffDeleted && !loading) {
      setMessage("Staff Deleted Successfully");
      setVisible(true);
    }
  }, [staffCreated, staffDeleted, loading]);

  useMemo(() => {
    if (staffs.length) {
      setLoading(false);
    }
  }, [staffs]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  return (
    <>
      <View style={{ padding: 20, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <SearchBar value={{ searchQuery }} onChangeText={onChangeSearch} />
          </View>
          <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
            <Button
              style={styles.optionButton}
              onPress={() => navigation.navigate("AddStaff")}
              mode="contained"
            >
              <MaterialIcon name="person-add-alt" size={20} color="white" />
            </Button>
            <Button
              style={styles.optionButton}
              onPress={() => [fetchStaffs()]}
              mode="contained"
              elevation={5}
            >
              <MaterialIcon name="refresh" size={20} color="white" />
            </Button>
          </View>
        </View>

        {loading ? (
          <PageLoader />
        ) : staffs.length > 0 ? (
          <>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {staffs
                  .filter((staff) =>
                    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((staff, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("StaffDetails", { staff })
                      }
                      activeOpacity={0.9}
                    >
                      <StaffListCard key={staff._id} name={staff.name} />
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <NoDataPage message={"Staffs Not Available"} />
        )}
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    borderRadius: 6,
  },
});

export default StaffsList;
