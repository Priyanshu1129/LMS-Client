import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, useTheme } from "react-native-paper";
import React, { useState } from "react";

const PriceDetails = ({
  organizationDetails,
  editedDetails,
  setEditedDetails,
  handleUpdateOrganization,
  edit,
  setEdit,
}) => {
  const { seatDefaultPrice, lockerDefaultPrice } = organizationDetails;

  const [detailsObject, setDetailsObject] = useState({
    settings: organizationDetails.settings,
  });

  // console.log("settings", detailsObject);
  // const handleChange = (key, value) => {
  //   setEditedDetails({ ...editedDetails, [key]: value });
  // };

  const handleChange = (keyPath, value) => {
    // const keys = keyPath.split(".");
    // let updatedDetails = { ...detailsObject };
    // updatedDetails.settings[keys[0]][keys[1]][keys[2]] = value;
    // console.log("keys-",updatedDetails.settings[keys[0]][keys[1]][keys[2]]);
    // console.log("updatedDetails", JSON.stringify(updatedDetails));
    // setDetailsObject(updatedDetails);
    // setEditedDetails(detailsObject);
  };

  const theme = useTheme();
  const colors = {
    labelColor: theme.colors.primary,
    buttonBackground: theme.colors.primary,
  };

  console.log(seatDefaultPrice?.morning);
  console.log(lockerDefaultPrice?.small);

  return (
    <ScrollView>
      <View style={styles.tabContent}>
        <View style={styles.userInfo}>
          <View style={styles.userInfoRow}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.lg },
              ]}
            >
              Seat Price
            </Text>
            <View style={styles.inputParentContainer}>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Morning
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.seat?.morning ||
                    String(seatDefaultPrice?.morning)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.seat.morning", value)
                  }
                />
              </View>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Noon
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.seat?.noon ||
                    String(seatDefaultPrice.noon)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.seat.noon", value)
                  }
                />
              </View>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Evening
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.seat?.evening ||
                    String(seatDefaultPrice.evening)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.seat.evening", value)
                  }
                />
              </View>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Full Day
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.seat?.fullDay ||
                    String(seatDefaultPrice.fullDay)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.seat.fullDay", value)
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.userInfoRow}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.lg },
              ]}
            >
              Locker Price
            </Text>
            <View style={styles.inputParentContainer}>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Small
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.locker?.small ||
                    String(lockerDefaultPrice?.small)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.locker.small", value)
                  }
                />
              </View>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Medium
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.locker?.medium ||
                    String(lockerDefaultPrice?.medium)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.locker.medium", value)
                  }
                />
              </View>
              <View style={styles.inputSection}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: colors.labelColor, fontSize: theme.fontSizes.md },
                  ]}
                >
                  Large
                </Text>
                <TextInput
                  style={styles.input}
                  editable={edit}
                  value={
                    editedDetails?.settings?.defaultPrice?.locker?.large ||
                    String(lockerDefaultPrice?.large)
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("defaultPrice.locker.large", value)
                  }
                />
              </View>
            </View>
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
                labelStyle={{ fontSize: theme.fontSizes.md }}
                onPress={() => [setEdit(false)]}
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
    </ScrollView>
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
    width: 200,
  },
  userInfo: {
    display: "flex",
    gap: 8,
  },
  userInfoRow: {
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
    width: 130,
    color: "#666",
    fontSize: 17,
    marginBottom: 2,
  },
  inputParentContainer: {
    display: "flex",
    gap: 6,
    padding: 14,
  },
  inputSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontWeight: "500",
    width: 130,
    color: "#666",
    fontSize: 15,
  },
  value: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 6,
    flex: 1,
  },
  buttonLabel: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 6,
    minWidth: 150,
    flex: 1,
  },
});

export default PriceDetails;
