import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../../components/searchBar";
import { StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
  Button,
  TextInput,
  DataTable,
  Menu,
  Snackbar,
} from "react-native-paper";
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

  const [members, setMembers] = useState([]);

  let token = route.params.token;

  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.member.allMembers
  );

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
        
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom : 20
          }}
        >
          <SearchBar
            value={{ searchQuery }}
            onChangeText={onChangeSearch}
            onPress={() => {
              navigation.navigate("AddMember");
            }}
          />
          <View style={{flexDirection : "row", gap : 5 , margin : 5}}>
            <TouchableOpacity style={styles.optionButton} onPress={()=>navigation.navigate("AddMember")} >
              <AntDesign name="adduser" size={20} color="white" />
            </TouchableOpacity>

            <StatusFilterMenu
            style={styles.optionButton} 
              visible={statusFilterVisible}
              setVisible={setStatusFilterVisible}
              onChange={(option) => setFilterOption(option)}
              options={filterMenuOptions}
            />
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
                  activeOpacity={0.8}
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
    backgroundColor: '#007bff',
    borderRadius: 2,
    padding:8
    
  },
});



export default MembersList;
