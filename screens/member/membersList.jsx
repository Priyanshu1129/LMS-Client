import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SearchBar from "../../components/searchBar";
import { StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Button, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getAllMember } from "../../redux/actions/memberActions";
import PageLoader from "../../components/pageLoader";
import StatusFilterMenu from "../../components/filterMenu";
import { memberActions } from "../../redux/slices/memberSlice";
import NoDataPage from "../../components/NotAvailable";
import UserListCard from "../../components/userListCard";

const MembersList = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [ refreshRequest , setRefreshRequest ] = useState(false);
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  const { token, memberCreated, memberDeleted } = route.params;

  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.member.allMembers
  );
  const [members, setMembers] = useState(data?.data ? [...data?.data] : []);

  const fetchMembers = useCallback(() => {
    if (token) {
      dispatch(getAllMember(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!data?.data) {
      fetchMembers();
    }
  }, [fetchMembers]);

  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setMembers(data.data);
      setLoading(false);
      dispatch(memberActions.clearAllMembersStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      dispatch(memberActions.clearAllMembersError());
    }
  }, [status]);

  useEffect(() => {
    if (memberCreated && !loading) {
      setMessage("Member Added Successfully");
      setVisible(true);
    } else if (memberDeleted && !loading) {
      setMessage("Member Deleted Successfully");
      setVisible(true);
    }
  }, [memberCreated, memberDeleted, loading]);

  useMemo(() => {
    if (members.length) {
      setLoading(false);
    }
  }, [members]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  const filterMenuOptions = [
    { title: "All", value: "all" },
    { title: "Active", value: "active" },
    { title: "Inactive", value: "inactive" },
    { title: "Expired", value: "expired" },
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <SearchBar value={{ searchQuery }} onChangeText={onChangeSearch} />
          <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
            <StatusFilterMenu
              style={styles.optionButton}
              visible={statusFilterVisible}
              setVisible={setStatusFilterVisible}
              onChange={(option) => setFilterOption(option)}
              options={filterMenuOptions}
            />
            <Button
              style={styles.optionButton}
              onPress={() => navigation.navigate("AddMember")}
              mode="contained"
            >
              <MaterialIcon name="person-add-alt" size={20} color="white" />
            </Button>
            <Button
              style={styles.optionButton}
              onPress={() => fetchMembers()}
              mode="contained"
            >
              <MaterialIcon name="refresh" size={20} color="white" />
            </Button>
          </View>
        </View>

        {loading ? (
          <PageLoader />
        ) : members.length > 0 ? (
          <View>
            {members
              .filter((member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .filter(
                (member) =>
                  filterOption === "all" ||
                  member.membershipStatus.toLowerCase() ===
                    filterOption.toLowerCase()
              )
              .map((member, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MemberDetails", { member })
                  }
                  activeOpacity={0.2}
                >
                  <UserListCard
                    key={member._id}
                    name={member.name}
                    balance={member.account.balance}
                    membershipStatus={member.membershipStatus}
                    seatNumber={member?.seat?.seatNumber}
                  />
                </TouchableOpacity>
              ))}
          </View>
        ) : (
          <NoDataPage message={"Members Not Available"} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    borderRadius: 2,
  },
});

export default MembersList;
