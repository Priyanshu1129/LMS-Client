import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrganization,
  getOrganization,
} from "../../redux/actions/organizationActions.js";
import BasicInfo from "./basicInfo.jsx";
import PriceDetails from "./priceDetails.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { organizationActions } from "../../redux/slices/organizationSlice.js";
import PageLoader from "../../components/pageLoader.jsx";

const MyOrganizationPage = ({ route }) => {
  const { token } = route.params;
  const [message, setMessage] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [organizationDetails, setOrganizationDetails] = useState();
  const [editedDetails, setEditedDetails] = useState({});
  const [activeTab, setActiveTab] = useState("basicInfo");
  const dispatch = useDispatch();
  const theme = useTheme();

  const { status, data, error } = useSelector(
    (state) => state.organization.organizationDetails
  );

  const [organizationData, setOrganizationData] = useState(data?.data);
  const [logoUrl, setLogoUrl] = useState(data?.data?.logo || defaultAvatar);

  const getOrgId = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setOrganizationId(JSON.parse(storedData)?.data?.organization);
  };

  useEffect(() => {
    getOrgId();
  }, []);

  useEffect(() => {
    if (organizationId && token && !organizationData) {
      dispatch(getOrganization(organizationId, token));
    }
  }, [organizationId, token]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setLogoUrl(data?.data?.logo);
      setOrganizationData(data?.data);
      // setMessage("Profile Updated Successfully");
      // setVisibleSnackBar(true);
      setLoading(false);
      dispatch(organizationActions.clearOrganizationDetailsStatus());
    } else {
      setLoading(false);
      setMessage(error);
      setVisibleSnackBar(true);
      dispatch(organizationActions.clearOrganizationDetailsStatus());
      dispatch(organizationActions.clearOrganizationDetailsError());
    }
  }, [status]);

  useEffect(() => {
    if (organizationData) {
      setOrganizationDetails({
        name: organizationData?.name || "N/A",
        address: organizationData?.address || "N/A",
        id: organizationData?._id || "N/A",
        description: organizationData?.description || "N/A",
        logo: organizationData?.logo || defaultAvatar,
        createdAt: organizationData?.createdAt || "N/A",
        owner: organizationData?.owner || "N/A",
        settings: organizationData?.settings,
        seatDefaultPrice: organizationData?.settings?.defaultPrice?.seat,
        lockerDefaultPrice: organizationData?.settings?.defaultPrice?.locker,
      });
    }
  }, [organizationData]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  const handleUpdateOrganization = () => {
    if (logoUrl !== organizationData?.logo) {
      console.log(logoUrl);
      console.log(organizationData?.logo);
      editedDetails.logo = logoUrl;
    }
    console.log("editedDetails", editedDetails);
    if (Object.keys(editedDetails).length > 0) {
      dispatch(
        updateOrganization(organizationDetails.id, editedDetails, token)
      );
    }
    setEditedDetails({});
  };

  return loading ? (
    <PageLoader />
  ) : (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          // { backgroundColor: theme.colors.secondaryContainer },
        ]}
      >
        <EditProfilePic
          edit={edit}
          profileUrl={logoUrl}
          setProfileUrl={setLogoUrl}
        />
        <Text style={[styles.name, { fontSize: theme.fontSizes.lg }]}>
          {organizationDetails?.name}
        </Text>
        {/* <Text style={[styles.email, { fontSize: theme.fontSizes.sm }]}>
          {organizationDetails?.email}
        </Text> */}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab == "basicInfo"
              ? {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                }
              : { backgroundColor: theme.colors.secondaryContainer },
          ]}
          onPress={() => setActiveTab("basicInfo")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { fontSize: theme.fontSizes.sm },
              {
                color:
                  activeTab === "basicInfo"
                    ? theme.colors.background
                    : theme.colors.primary,
              },
            ]}
          >
            Basic Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab == "accountDetails"
              ? {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                }
              : { backgroundColor: theme.colors.secondaryContainer },
          ]}
          onPress={() => setActiveTab("accountDetails")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { fontSize: theme.fontSizes.sm },
              {
                color:
                  activeTab === "accountDetails"
                    ? theme.colors.background
                    : theme.colors.primary,
              },
            ]}
          >
            Price Details
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab == "basicInfo" ? (
        <BasicInfo
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          edit={edit}
          setEdit={setEdit}
          organizationDetails={organizationDetails}
          handleUpdateOrganization={handleUpdateOrganization}
        />
      ) : (
        <PriceDetails
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          edit={edit}
          setEdit={setEdit}
          organizationDetails={organizationDetails}
          handleUpdateOrganization={handleUpdateOrganization}
        />
      )}
      {message && (
        <Snackbar
          visible={visibleSnackBar}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 0,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: "#666",
  },
  status: {
    fontSize: 16,
  },
  statusWrapper: {
    marginTop: 8,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 40,
    marginVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  activeTab: {
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    borderRadius: 2,
    borderRadius: 6,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
});

export default MyOrganizationPage;
