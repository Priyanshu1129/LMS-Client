import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Snackbar } from "react-native-paper";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../../redux/actions/memberActions";
import { memberActions } from "../../redux/slices/memberSlice";
import PageLoader from "../../components/pageLoader";
import Dropdown from "../../components/dropdown";
import { getAllMember } from "../../redux/actions/memberActions";
import { defaultAvatar } from "../../constant";
import { TouchableOpacity } from "react-native-gesture-handler";
import TakePhotoOptions from "../../components/takePhotoOptions";
import EditProfilePic from "../../components/EditProfilePic";



const memberSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  phone: number()
    .required("Phone number is required")
    .min(1000000000, "Phone number must be 10 digits")
    .max(9999999999, "Phone number must be 10 digits"),
  gender: string().required("Gender is required"),
  preparation: string().required("Preparation is required"),
  address: string().required("Address is required"),
  monthlySeatFee: number()
    .required("Monthly seat fee is required")
    .test(
      "non-zero",
      "Monthly seat fee must start with a non-zero digit",
      (value) => /^[1-9]\d*$/.test(value)
    )
    .max(100000, "Monthly seat fee cannot exceed 100000"),
});

const AddMemberPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [profileUrl, setProfileUrl] = useState(defaultAvatar)
  const { status, data, error } = useSelector(
    (state) => state.member.createMember
  );
  let token = route.params.token;

  const handleRegister = (values) => {
    console.log("valuels in handleRegister-------", values)
    dispatch(createMember(values, token));
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(getAllMember(token));
      dispatch(memberActions.clearCreateMemberStatus());
      navigation.navigate({
        name: "Members",
        params: { operationPerformed: "memberCreated" },
        merge: true,
      });
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      dispatch(memberActions.clearCreateMemberError());
      dispatch(memberActions.clearCreateMemberStatus());
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  const genderMenuOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
       
        <EditProfilePic profileUrl={profileUrl} setProfileUrl={setProfileUrl}/>
       
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            phone: "",
            email: "",
            gender: "",
            monthlySeatFee: "",
            address: "",
            preparation: "",
            avatarUri : profileUrl,
          }}
          validationSchema={memberSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <Dropdown
                data={genderMenuOptions}
                placeholder={"Select Gender"}
                value={gender}
                setValue={setGender}
              />
              <TextInput
                label="Name"
                // mode="outlined"
                value={values.name}
                onChangeText={handleChange("name")}
                style={styles.input}
              />
              <TextInput
                label="avatarUri"
                // mode="outlined"
                value={profileUrl}

                style={styles.input}
              />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
              <TextInput
                label="Phone"
                value={values.phone}
                // mode="outlined"
                maxLength={10}
                onChangeText={handleChange("phone")}
                keyboardType="numeric"
                style={styles.input}
              />
              {errors.phone && touched.phone ? (
                <Text>{errors.phone}</Text>
              ) : null}
              <TextInput
                label="Email"
                value={values.email}
                // mode="outlined"
                onChangeText={handleChange("email")}
                keyboardType="email-address"
                style={styles.input}
              />
              {errors.email && touched.email ? (
                <Text>{errors.email}</Text>
              ) : null}
              <View style={styles.row}>
                <Text style={styles.label}>Gender :</Text>

                <View style={styles.radioView}>
                  <View style={styles.radio}>
                    <Text style={styles.radioText}>Male</Text>
                    <RadioButton
                      value="M"
                      status={values.gender === "M" ? "checked" : "unchecked"}
                      onPress={(event) => {
                        event.persist();
                        handleChange("gender")("M");
                      }}
                    />
                  </View>
                  <View style={styles.radio}>
                    <Text style={styles.radioText}>Female</Text>
                    <RadioButton
                      value="F"
                      status={values.gender === "F" ? "checked" : "unchecked"}
                      onPress={(event) => {
                        event.persist();
                        handleChange("gender")("F");
                      }}
                    />
                  </View>
                </View>
                {errors.gender && touched.gender ? (
                  <Text>{errors.gender}</Text>
                ) : null}
              </View>
              <TextInput
                label="Monthly Fee"
                value={values.monthlySeatFee}
                // mode="outlined"
                maxLength={4}
                onChangeText={handleChange("monthlySeatFee")}
                keyboardType="numeric"
                style={styles.input}
              />
              {errors.monthlySeatFee && touched.monthlySeatFee ? (
                <Text>{errors.monthlySeatFee}</Text>
              ) : null}
              <TextInput
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                style={styles.input}
                // mode="outlined"
              />
              {errors.address && touched.address ? (
                <Text>{errors.address}</Text>
              ) : null}
              <TextInput
                label="Preparation"
                value={values.preparation}
                // mode=""
                onChangeText={handleChange("preparation")}
                style={styles.input}
              />
              {errors.preparation && touched.preparation ? (
                <Text>{errors.preparation}</Text>
              ) : null}
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  contentStyle={styles.buttonContent}
                >
                  Register
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  style={styles.rightButton}
                  labelStyle={styles.buttonLabel}
                  contentStyle={styles.buttonContent}
                >
                  Cancel
                </Button>
              </View>
            </View>
          )}
        </Formik>
        {message && (
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Hide",
              onPress: () => {
                onDismissSnackBar();
              },
            }}
            style={styles.snackbar}
          >
            {message}
          </Snackbar>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  rightButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  buttonLabel: {
    color: "white",
  },
  buttonContent: {
    height: 45,
  },
  snackbar: {
    borderRadius: 4,
  },
});

export default AddMemberPage;
