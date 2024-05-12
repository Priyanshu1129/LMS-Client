import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/profileActions.js";
import BasicInfo from "./basicInfo.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileActions } from "../../redux/slices/profileSlice.js";
import PageLoader from "../../components/pageLoader.jsx";

const ProfilePage = ({ route, navigation }) => {
  const { token } = route.params;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [profileUrl, setProfileUrl] = useState(defaultAvatar);
  const [user, setUser] = useState();
  const [editedDetails, setEditedDetails] = useState({});
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  const { status, data, error } = useSelector(
    (state) => state.organization.organizationDetails
  );

  const getUserData = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setUserData(JSON.parse(storedData)?.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setUser({
      name: userData?.name || "N/A",
      email: userData?.email || "N/A",
      phone: userData?.phone || "N/A",
      gender: userData?.gender || "N/A",
      address: userData?.address || "",
      createdAt: userData?.createdAt || "N/A",
      avatar: userData?.avatar || defaultAvatar,
    });
    setProfileUrl(userData?.avatar);
  }, [userData]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      // setProfileUrl(data?.data?.avatar);
      // setUserData(data?.data);
      getUserData();
      setLoading(false);
      setMessage("Profile Updated Successfully");
      setVisibleSnackBar(true);
      dispatch(profileActions.clearProfileStatus());
    } else {
      setLoading(false);
      setMessage(error);
      setVisibleSnackBar(true);
      dispatch(profileActions.clearProfileStatus());
      dispatch(profileActions.clearProfileError());
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  const handleUpdate = () => {
    if (profileUrl !== userData?.avatar) {
      editedDetails.avatarUri = profileUrl;
    }
    console.log("editedDEtails--", editedDetails);
    if (Object.keys(editedDetails).length > 0) {
      dispatch(updateProfile(editedDetails, token));
    }
    setEditedDetails({});
  };

  return loading ? (
    <PageLoader />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            // { backgroundColor: theme.colors.secondaryContainer },
          ]}
        >
          <EditProfilePic
            profileUrl={profileUrl}
            edit={edit}
            setProfileUrl={setProfileUrl}
          />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <BasicInfo
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          user={user}
          edit={edit}
          setEdit={setEdit}
          handleUpdate={handleUpdate}
        />

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
    </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 150,
  },
  activeTab: {
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    borderRadius: 2,
  },
  tabButtonText: {
    fontSize: 16,
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

export default ProfilePage;
