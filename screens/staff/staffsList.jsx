import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, TextInput, DataTable, Menu } from "react-native-paper";

const StaffList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [columnFilterVisible, setColumnFilterVisible] = useState(false);
  const [filterOption, setFilterOption] = useState("all");
  const [displayColumns, setDisplayColumns] = useState({
    id: true,
    name: true,
    status: true,
    phone: false,
    email: false,
    gender: false,
  });
  const [staffs, setStaffs] = useState([
    {
      id: 1,
      name: "John Doe",
      status: "Active",
      phone: "1234567890",
      email: "john@example.com",
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Inactive",
      phone: "9876543210",
      email: "jane@example.com",
      gender: "Female",
    },
    // Add more members as needed
  ]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const openStatusFilter = () => setStatusFilterVisible(true);

  const closeStatusFilter = () => setStatusFilterVisible(false);

  const openColumnFilter = () => setColumnFilterVisible(true);

  const closeColumnFilter = () => setColumnFilterVisible(false);

  const toggleColumn = (column) => {
    setDisplayColumns({ ...displayColumns, [column]: !displayColumns[column] });
  };

  const setDefaultColumns = () => {
    const defaultColumns = {
      id: true,
      name: true,
      status: true,
      phone: false,
      email: false,
      gender: false,
    };
    setDisplayColumns(defaultColumns);
    setColumnFilterVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Button
            icon="account-plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("AddStaff");
            }}
          >
            Add Staff
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
          <Menu
            visible={statusFilterVisible}
            onDismiss={closeStatusFilter}
            anchor={
              <Button onPress={openStatusFilter} style={{ marginRight: 10 }}>
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setFilterOption("all");
                closeStatusFilter();
              }}
              title="All"
            />
            <Menu.Item
              onPress={() => {
                setFilterOption("active");
                closeStatusFilter();
              }}
              title="Active"
            />
            <Menu.Item
              onPress={() => {
                setFilterOption("inactive");
                closeStatusFilter();
              }}
              title="Inactive"
            />
          </Menu>
          <Menu
            visible={columnFilterVisible}
            onDismiss={closeColumnFilter}
            anchor={
              <Button onPress={openColumnFilter} style={{ flex: 1 }}>
                Columns
              </Button>
            }
          >
            <Menu.Item onPress={setDefaultColumns} title="Default" />
            {Object.keys(displayColumns).map((column) => (
              <Menu.Item
                key={column}
                onPress={() => toggleColumn(column)}
                title={column.charAt(0).toUpperCase() + column.slice(1)}
                status={displayColumns[column] ? "checked" : "unchecked"}
              />
            ))}
          </Menu>
        </View>
        <DataTable>
          <DataTable.Header>
            {Object.keys(displayColumns).map(
              (column) =>
                displayColumns[column] && (
                  <DataTable.Title key={column}>{column}</DataTable.Title>
                )
            )}
          </DataTable.Header>
          {staffs
            .filter((staff) =>
              staff.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter(
              (staff) =>
                filterOption === "all" ||
                staff.status.toLowerCase() === filterOption.toLowerCase()
            )
            .map((staff) => (
              <DataTable.Row key={staff.id}>
                {Object.entries(displayColumns).map(
                  ([column, display]) =>
                    display && (
                      <DataTable.Cell key={column}>
                        {staff[column]}
                      </DataTable.Cell>
                    )
                )}
              </DataTable.Row>
            ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default StaffList;
