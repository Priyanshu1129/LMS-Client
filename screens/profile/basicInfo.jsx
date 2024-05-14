import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React, { useState, useEffect } from "react";

const BasicInfo = ({
  user,
  editedDetails,
  setEditedDetails,
  handleUpdate,
  edit,
  setEdit,
}) => {
  const [editModeDetails, setEditModeDetails] = useState(user);

  useEffect(() => {
    setEditModeDetails(user);
  }, [user]);

  const handleChange = (key, value) => {
    setEditModeDetails({ ...editModeDetails, [key]: value });
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
          <Text
            style={[
              styles.label,
              { color: colors.labelColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            Name
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={edit ? editModeDetails?.name : user?.name}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text
            style={[
              styles.label,
              { color: colors.labelColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            Email
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={edit ? editModeDetails?.email : user?.email}
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.userInfoRow, { width: "60%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Phone
            </Text>
            <TextInput
              style={styles.input}
              editable={edit}
              value={edit ? editModeDetails?.phone : user?.phone}
              onChangeText={(value) => handleChange("phone", value)}
            />
          </View>
          <View style={[styles.userInfoRow, { width: "37%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Gender
            </Text>
            <TextInput
              style={styles.input}
              editable={edit}
              value={edit ? editModeDetails?.gender : user?.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
          </View>
        </View>

        <View style={styles.userInfoRow}>
          <Text
            style={[
              styles.label,
              { color: colors.labelColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            Address
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            value={edit ? editModeDetails?.address : user?.address}
            onChangeText={(value) => handleChange("address", value)}
          />
        </View>
        <View style={styles.userInfoRow}>
          <Text
            style={[
              styles.label,
              { color: colors.labelColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            Created At
          </Text>
          <TextInput
            style={styles.input}
            value={edit ? editModeDetails?.createdAt : user?.createdAt}
            onChangeText={(value) => handleChange("monthlySeatFee", value)}
            editable={false}
          />
        </View>
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
              labelStyle={{ fontSize: theme.fontSizes.md }}
              onPress={() => [
                setEdit(false),
                setEditedDetails({}),
                setEditModeDetails(user),
              ]}
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
              labelStyle={{ fontSize: theme.fontSizes.md }}
              onPress={() => [handleUpdate(), setEdit(false)]}
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
              labelStyle={{ fontSize: theme.fontSizes.md }}
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
    paddingHorizontal: 40,
    paddingVertical: 20,
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
    fontWeight: "500",
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
    marginTop: 20,
    gap: 8,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 6,
    flex: 1,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 6,
  },
});

export default BasicInfo;
