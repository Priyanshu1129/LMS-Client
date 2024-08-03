import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  deAllocateServices,
  updateService,
} from "../../redux/actions/serviceActions";
import { updateMember } from "../../redux/actions/memberActions";
import { useDispatch, useSelector } from "react-redux";
import { serviceActions } from "../../redux/slices/serviceSlice";

const ServiceDetailsCard = ({ service, token }) => {
  const [editModeDetails, setEditModeDetails] = useState(service);
  const [editedDetails, setEditedDetails] = useState(service);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    status: updateServiceStatus,
    data: updateServiceData,
    error: updateServiceError,
  } = useSelector((state) => state.service.updateService);

  useEffect(() => {
    if (updateServiceStatus == "pending") {
      console.log("update service loading->pending", updateServiceStatus);
      setLoading(true);
    } else if (
      updateServiceStatus === "success" &&
      updateServiceData.status === "success"
    ) {
      console.log("updated-service-before-dispatch ", updateServiceData.data);
      dispatch(
        serviceActions.updateMemberServicesState(updateServiceData.data)
      );
      setLoading(false);
      dispatch(serviceActions.clearUpdateServiceStatus());
    } else if (updateServiceStatus == "failed") {
      setMessage(updateServiceError);
      setVisible(true);
      setLoading(false);
      dispatch(serviceActions.clearUpdateServiceError());
      dispatch(serviceActions.clearUpdateServiceError());
    }
  }, [updateServiceStatus]);

  const handleChange = (key, value) => {
    setEditModeDetails({ ...editModeDetails, [key]: value });
    setEditedDetails({ ...editedDetails, [key]: value });
  };

  const handleUpdateService = () => {
    console.log("update-service-edited-details-------------", editedDetails);
    dispatch(updateService(editedDetails, token, service._id));
    // setEditedDetails({});
  };

  const handleDeallocateService = () => {
    dispatch(deAllocateServices(service._id, token));
    setEditedDetails({});
  };

  useEffect(() => {
    setEditModeDetails(service);
  }, [service]);

  const theme = useTheme();
  const colors = {
    labelColor: theme.colors.primary,
    buttonBackground: theme.colors.primary,
  };

  return (
    <View
      style={[styles.tabContent, { borderBlockColor: "black", padding: 5 }]}
    >
      <View style={styles.serviceInfo}>
        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.serviceInfoRow, { width: "60%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Status
            </Text>
            <TextInput
              style={[styles.input]}
              editable={false}
              value={service?.status}
            />
          </View>
          <View style={[styles.serviceInfoRow, { width: "60%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Service type
            </Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={service?.serviceType}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.serviceInfoRow, { width: "60%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              validity
            </Text>
            <TextInput
              style={styles.input}
              editable={edit}
              value={edit ? editModeDetails?.validity : service?.validity}
              onChangeText={(value) => handleChange("validity", value)}
            />
          </View>
          <View style={[styles.serviceInfoRow, { width: "37%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Purchase Date
            </Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={service?.purchaseDate}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={[styles.serviceInfoRow, { width: "60%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Renewal Period Unit
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              editable={edit}
              value={
                edit
                  ? editModeDetails?.renewalPeriodUnit
                  : service?.renewalPeriodUnit
              }
              onChangeText={(value) =>
                handleChange("renewalPeriodUnit", parseFloat(value))
              }
            />
          </View>
          <View style={[styles.serviceInfoRow, { width: "37%" }]}>
            <Text
              style={[
                styles.label,
                { color: colors.labelColor, fontSize: theme.fontSizes.sm },
              ]}
            >
              Renewal Period Amount
            </Text>
            <TextInput
              style={styles.input}
              value={
                edit
                  ? editModeDetails?.renewalPeriodAmount.toString()
                  : service?.renewalPeriodAmount.toString()
              }
              keyboardType="numeric"
              onChangeText={(value) =>
                handleChange("renewalPeriodAmount", value)
              }
              editable={edit}
            />
          </View>
        </View>

        <View style={styles.serviceInfoRow}>
          <Text
            style={[
              styles.label,
              { color: colors.labelColor, fontSize: theme.fontSizes.sm },
            ]}
          >
            Charges
          </Text>
          <TextInput
            style={styles.input}
            editable={edit}
            keyboardType="numeric"
            value={
              edit
                ? editModeDetails?.charges.toString()
                : service?.charges.toString()
            }
            onChangeText={(value) => handleChange("charges", value)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
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
                  setEditModeDetails(service),
                  setEditedDetails({}),
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
                onPress={() => [handleUpdateService(), setEdit(false)]}
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
              <Button
                icon="delete"
                mode="contained"
                style={[styles.button, { backgroundColor: "#FF4242" }]}
                labelStyle={{ fontSize: theme.fontSizes.md }}
                onPress={handleDeallocateService}
              >
                De Allocate
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    padding: 5,
    tabContent: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      // backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
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
    serviceInfo: {
      // backgroundColor: "yellow",
      display: "flex",
      justifyContent: "space-between",
    },
    serviceInfoRow: {
      flexDirection: "col",
      marginBottom: 0,
      justifyContent: "space-between",
      // backgroundColor: "green",
    },
    label: {
      fontWeight: "500",
      width: 130,
      color: "#666",
      fontSize: 13,
      marginBottom: 2,
    },
    value: {
      flex: 1,
      fontWeight: "bold",
      fontSize: 18,
    },
    buttonContainer: {
      width: "100%",
      flexDirection: "row",
      marginTop: 12,
      gap: 8,
    },
    button: {
      width: 100,
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 10,
      flex: 1,
    },
    input: {
      marginBottom: 10,
      backgroundColor: "#f2f2f2",
      padding: 8,
      borderRadius: 6,
    },
  },
});

export default ServiceDetailsCard;
