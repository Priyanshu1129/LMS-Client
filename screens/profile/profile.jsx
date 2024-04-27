import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { updateStaff } from "../../redux/actions/staffActions.js";
import BasicInfo from "./basicInfo.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = ({ route, navigation }) => {
  const { token } = route.params;
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [profileUrl, setProfileUrl] = useState(defaultAvatar);
  const [editedDetails, setEditedDetails] = useState({});
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const getData = async () => {
    const storedData = await AsyncStorage.getItem("data");

    setData(JSON.parse(storedData));
  };

  useEffect(() => {
    getData();
  }, []);

  const user = {
    name: data?.data?.name || "N/A",
    email: data?.data?.email || "N/A",
    phone: data?.data?.phone || "N/A",
    gender: data?.data?.gender || "N/A",
    address: data?.data?.address || "",
    createdAt: data?.data?.createdAt || "N/A",
    avatar: data?.data?.avatar || defaultAvatar,
  };

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  const handleUpdateStaff = () => {
    if (profileUrl !== data?.data?.avatar) {
      editedDetails.avatarUri = profileUrl;
    }
    dispatch(updateStaff(editedDetails, token, data?.data?._id));
  };

  return (
    <ScrollView>
      {/* <Text>{JSON.stringify(data.data)}</Text> */}
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            // { backgroundColor: theme.colors.secondaryContainer },
          ]}
        >
          <EditProfilePic
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <BasicInfo
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          user={user}
          setDeleteDialogVisible={setDialogVisible}
          handleUpdateStaff={handleUpdateStaff}
        />

        <ConfirmationDialog
          visible={dialogVisible}
          setVisible={setDialogVisible}
          message={"Confirm Delete Staff"}
          setConfirmation={setDeleteConfirmation}
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
