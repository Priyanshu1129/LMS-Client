// import React, { useState, useEffect, useMemo } from "react";
// import { View, ScrollView, Text } from "react-native";
// import {
//   Button,
//   TextInput,
//   DataTable,
//   Menu,
//   Snackbar,
// } from "react-native-paper";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllMember } from "../../redux/actions/memberActions";
// import PageLoader from "../../components/pageLoader";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { memberActions } from "../../redux/slices/memberSlice";

// const MembersPage = ({ navigation }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [token, setToken] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [statusFilterVisible, setStatusFilterVisible] = useState(false);
//   const [columnFilterVisible, setColumnFilterVisible] = useState(false);
//   const [filterOption, setFilterOption] = useState("all");
//   const [displayColumns, setDisplayColumns] = useState({
//     sno: true,
//     name: true,
//     membershipStatus: true,
//     phone: false,
//     email: false,
//     gender: false,
//   });
//   const [members, setMembers] = useState([]);

//   const getToken = async () => {
//     const storedToken = await AsyncStorage.getItem("token");
//     setToken(storedToken);
//   };

//   useEffect(() => {
//     getToken();
//   }, []);

//   const dispatch = useDispatch();
//   const { status, data, error } = useSelector(
//     (state) => state.member.allMembers
//   );

//   useMemo(() => {
//     if (token) {
//       dispatch(getAllMember(token));
//     }
//   }, [token]);

//   useMemo(() => {
//     if (status === "pending") {
//       setLoading(true);
//     } else if (status === "success" && data.status === "success") {
//       setMembers(data.data);
//       setMessage("Member Fetched Successfully");
//       setVisible(true);
//       setLoading(false);
//     } else {
//       setMessage(error);
//       setVisible(true);
//       setLoading(false);
//       memberActions.clearAllMembersError();
//     }
//   }, [status]);

//   const onChangeSearch = (query) => setSearchQuery(query);

//   const openStatusFilter = () => setStatusFilterVisible(true);

//   const closeStatusFilter = () => setStatusFilterVisible(false);

//   const openColumnFilter = () => setColumnFilterVisible(true);

//   const closeColumnFilter = () => setColumnFilterVisible(false);

//   const toggleColumn = (column) => {
//     setDisplayColumns({ ...displayColumns, [column]: !displayColumns[column] });
//   };

//   const setDefaultColumns = () => {
//     const defaultColumns = {
//       sno: true,
//       name: true,
//       membershipStatus: true,
//       phone: false,
//       email: false,
//       gender: false,
//     };
//     setDisplayColumns(defaultColumns);
//     setColumnFilterVisible(false);
//   };

//   const onDismissSnackBar = () => {
//     setVisible(false);
//     setMessage(null);
//   };

//   return loading ? (
//     <PageLoader />
//   ) : (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ padding: 20 }}>
//         <View style={{ marginBottom: 20 }}>
//           <Button
//             icon="account-plus"
//             mode="contained"
//             onPress={() => {
//               navigation.navigate("AddMember");
//             }}
//           >
//             Add Member
//           </Button>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginBottom: 20,
//           }}
//         >
//           <TextInput
//             label="Search"
//             value={searchQuery}
//             onChangeText={onChangeSearch}
//             style={{ flex: 1, marginRight: 10 }}
//           />
//           <Menu
//             visible={statusFilterVisible}
//             onDismiss={closeStatusFilter}
//             anchor={
//               <Button onPress={openStatusFilter} style={{ marginRight: 10 }}>
//                 {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
//               </Button>
//             }
//           >
//             <Menu.Item
//               onPress={() => {
//                 setFilterOption("all");
//                 closeStatusFilter();
//               }}
//               title="All"
//             />
//             <Menu.Item
//               onPress={() => {
//                 setFilterOption("active");
//                 closeStatusFilter();
//               }}
//               title="Active"
//             />
//             <Menu.Item
//               onPress={() => {
//                 setFilterOption("inactive");
//                 closeStatusFilter();
//               }}
//               title="Inactive"
//             />
//           </Menu>
//           <Menu
//             visible={columnFilterVisible}
//             onDismiss={closeColumnFilter}
//             anchor={
//               <Button onPress={openColumnFilter} style={{ flex: 1 }}>
//                 Columns
//               </Button>
//             }
//           >
//             <Menu.Item onPress={setDefaultColumns} title="Default" />
//             {Object.keys(displayColumns).map((column) => (
//               <Menu.Item
//                 key={column}
//                 onPress={() => toggleColumn(column)}
//                 title={column.charAt(0).toUpperCase() + column.slice(1)}
//                 status={displayColumns[column] ? "checked" : "unchecked"}
//               />
//             ))}
//           </Menu>
//         </View>
//         {members.length > 0 ? (
//           <DataTable>
//             <DataTable.Header>
//               {Object.keys(displayColumns).map(
//                 (column) =>
//                   displayColumns[column] && (
//                     <DataTable.Title key={column}>{column}</DataTable.Title>
//                   )
//               )}
//             </DataTable.Header>
//             {members
//               .filter((member) =>
//                 member.name.toLowerCase().includes(searchQuery.toLowerCase())
//               )
//               .filter(
//                 (member) =>
//                   filterOption === "all" ||
//                   member.membership.toLowerCase() === filterOption.toLowerCase()
//               )
//               .map((member) => (
//                 <DataTable.Row key={member._id}>
//                   {Object.entries(displayColumns).map(
//                     ([column, display]) =>
//                       display && (
//                         <DataTable.Cell key={column}>
//                           {member[column]}
//                         </DataTable.Cell>
//                       )
//                   )}
//                 </DataTable.Row>
//               ))}
//           </DataTable>
//         ) : (
//           <Text>No Member Available</Text>
//         )}
//       </View>
//       {message && (
//         <Snackbar
//           visible={visible}
//           onDismiss={onDismissSnackBar}
//           action={{
//             label: "Hide",
//             onPress: () => {
//               onDismissSnackBar();
//             },
//           }}
//         >
//           {message}
//         </Snackbar>
//       )}
//     </ScrollView>
//   );
// };

// export default MembersPage;
