import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView, Text } from "react-native";
import { Button, TextInput, DataTable, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getAllMember } from "../../redux/actions/memberActions";
import PageLoader from "../../components/pageLoader";
import NoDataPage from "../../components/NotAvailable";
import StatusFilterMenu from "../../components/filterMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { memberActions } from "../../redux/slices/memberSlice";


const MembersList = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [ refreshRequest , setRefreshRequest ] = useState(false);
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  const [members, setMembers] = useState([]);

  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.member.allMembers
  );

  let token = route.params.token;

  const fetchMembers = useCallback(() => {
    if (token) {
      dispatch(getAllMember(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  useMemo(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setMembers(data.data);
      setMessage("Member Fetched Successfully");
      setVisible(true);
      setLoading(false);
      dispatch(memberActions.clearAllMembersStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      dispatch(memberActions.clearAllMembersError());
    }
  }, [status]);

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

  useFocusEffect(
    useCallback(() => {
      fetchMembers();
    }, [fetchMembers])
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20, flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
          <Button
            icon="account-plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("AddMember");
            }}
          >
            Add Member
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TextInput
            label="Search"
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={{ flex: 1, marginRight: 10 }}
          />
          <StatusFilterMenu
            visible={statusFilterVisible}
            setVisible={setStatusFilterVisible}
            onChange={(option) => setFilterOption(option)}
            options={filterMenuOptions}
          />
        </View>

        {loading ? (
          <PageLoader />
        ) : members.length > 0 ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title key="sno">SNo.</DataTable.Title>
              <DataTable.Title key="name">Name</DataTable.Title>
              <DataTable.Title key="membershipStatus">
                Membership
              </DataTable.Title>
            </DataTable.Header>
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
                <DataTable.Row
                  key={member._id}
                  onPress={() =>
                    navigation.navigate("MemberDetails", { member })
                  }
                >
                  <DataTable.Cell key={"sno"}>{index + 1}</DataTable.Cell>
                  <DataTable.Cell key={"name"}>{member.name}</DataTable.Cell>
                  <DataTable.Cell key={"membershipStatus"}>
                    {member.membershipStatus}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
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
    </ScrollView>
  );
};

export default MembersList;
