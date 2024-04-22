import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React, { useState } from "react";

const MemberBasicInfo = ({
  user,
  setDeleteDialogVisible,
  editedDetails,
  setEditedDetails,
  handlUpdateMember,
}) => {
  const [edit, setEdit] = useState(false);

  const handleChange = (key, value) => {
    setEditedDetails({ ...editedDetails, [key]: value });
    console.log(editedDetails);
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
            Email:
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={editedDetails?.email || user?.email}
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.userInfoRow, { width: "60%" }]}>
            <Text style={[styles.label, { color: colors.labelColor }]}>
              Phone:
            </Text>
            <TextInput
              style={styles.input}
              editable={edit}
              value={editedDetails?.phone || user?.phone}
              onChangeText={(value) => handleChange("phone", value)}
            />
          </View>
          <View style={[styles.userInfoRow, { width: "37%" }]}>
            <Text style={[styles.label, { color: colors.labelColor }]}>
              Gender:
            </Text>
            <TextInput
              style={styles.input}
              editable={edit}
              value={editedDetails?.gender || user?.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.userInfoRow, { width: "60%" }]}>
            <Text style={[styles.label, { color: colors.labelColor }]}>
              Monthly Fee:
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              editable={edit}
              value={
                editedDetails?.monthlySeatFee?.toString() ||
                user?.monthlySeatFee?.toString()
              }
              onChangeText={(value) =>
                handleChange("monthlySeatFee", parseFloat(value))
              }
            />
          </View>
          <View style={[styles.userInfoRow, { width: "37%" }]}>
            <Text style={[styles.label, { color: colors.labelColor }]}>
              Membership:
            </Text>
            <TextInput
              style={styles.input}
              value={editedDetails?.membershipStatus || user?.membershipStatus}
              onChangeText={(value) => handleChange("monthlySeatFee", value)}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Address:
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={editedDetails?.address || user?.address}
            onChangeText={(value) => handleChange("address", value)}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text style={[styles.label, { color: colors.labelColor }]}>
            Created At:
          </Text>
          <TextInput
            style={styles.input}
            value={editedDetails?.createdAt || user?.createdAt}
            onChangeText={(value) => handleChange("monthlySeatFee", value)}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit ? (
          <>
            <Button
              icon="update"
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
              onPress={() => handlUpdateMember()}
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
            <Button
              icon="delete"
              mode="contained"
              style={[
                styles.button,
                { backgroundColor: colors.buttonBackground },
              ]}
              labelStyle={styles.buttonLabel}
              onPress={() => setDeleteDialogVisible(true)}
            >
              Delete
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
    // backgroundColor: "red",
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

export default MemberBasicInfo;
