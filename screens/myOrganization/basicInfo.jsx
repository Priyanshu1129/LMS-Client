import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React, { useState } from "react";

const BasicInfo = ({
  organizationDetails,
  editedDetails,
  setEditedDetails,
  handleUpdateOrganization,
}) => {
  const [edit, setEdit] = useState(false);

  const handleChange = (key, value) => {
    setEditedDetails({ ...editedDetails, [key]: value });
  };

  const theme = useTheme();
  const colors = {
    labelColor: theme.colors.primary,
    buttonBackground: theme.colors.primary,
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.userInfo}>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Name:
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={editedDetails?.name || organizationDetails?.name}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Owner:
          </Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={organizationDetails?.owner[0]?.name}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Address:
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={editedDetails?.address || organizationDetails?.address}
            onChangeText={(value) => handleChange("address", value)}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            About:
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={
              editedDetails?.description || organizationDetails?.description
            }
            onChangeText={(value) => handleChange("description", value)}
          />
        </View>
        {/* <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Created At:
          </Text>
          <TextInput
            style={styles.input}
            value={editedDetails?.createdAt || organizationDetails?.createdAt}
            onChangeText={(value) => handleChange("monthlySeatFee", value)}
            editable={false}
          />
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        {edit ? (
          <>
            <Button
              icon="cancel"
              mode="contained"
              style={[
                styles.button,
                { backgroundColor: colors.buttonBackground },
              ]}
              labelStyle={styles.buttonLabel}
              onPress={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button
              icon="update"
              mode="contained"
              style={[
                styles.button,
                { backgroundColor: colors.buttonBackground },
              ]}
              labelStyle={styles.buttonLabel}
              onPress={() => [handleUpdateOrganization(), setEdit(false)]}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <Button
              icon="pen"
              mode="contained"
              style={[
                styles.button,
                { backgroundColor: colors.buttonBackground },
              ]}
              labelStyle={styles.buttonLabel}
              onPress={() => setEdit(true)}
            >
              Edit
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tabContent: {
    padding: 40,
    display: "flex",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  avatar: {
    marginRight: 20,
  },
  input: {
    flex: 1,
  },
  userInfo: {
    // backgroundColor: "yellow",
    display: "flex",
    justifyContent: "space-between",
  },
  userInfoRow: {
    flexDirection: "col",
    marginBottom: 0,
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  label: {
    fontWeight: "bold",
    width: 130,
    color: "#666",
    fontSize: 15,
    marginBottom: 2,
  },
  value: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 18,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 5,
  },
});

export default BasicInfo;
