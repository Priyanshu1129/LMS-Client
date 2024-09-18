import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Snackbar } from "react-native-paper";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createStaff, getAllStaff } from "../../redux/actions/staffActions";
import { staffActions } from "../../redux/slices/staffSlice";
import PageLoader from "../../components/pageLoader";

const staffSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  phone: number()
    .required("Phone number is required")
    .min(1000000000, "Phone number must be 10 digits")
    .max(9999999999, "Phone number must be 10 digits"),
  gender: string().required("Gender is required"),
  password: string().required("Password is required"),
  password_confirmation: string().required("Password Does Not Match"),
});

const AddStaffPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { status, error } = useSelector((state) => state.staff.staffDetails);

  let token = route.params.token;

  const handleRegister = (values) => {
    dispatch(createStaff(values, token));
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(staffActions.clearStaffDetailsStatus());
      dispatch(getAllStaff(token));
      navigation.navigate({
        name: "StaffsList",
        params: { staffCreated: true },
        merge: true,
      });
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      dispatch(staffActions.clearStaffDetailsStatus());
      staffActions.clearStaffDetailsError();
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            gender: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={staffSchema}
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
              <TextInput
                label="Name"
                mode="outlined"
                value={values.name}
                onChangeText={handleChange("name")}
                style={styles.input}
              />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
              <TextInput
                label="Phone"
                value={values.phone}
                mode="outlined"
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
                mode="outlined"
                onChangeText={handleChange("email")}
                keyboardType="email-address"
                style={styles.input}
              />
              {errors.email && touched.email ? (
                <Text>{errors.email}</Text>
              ) : null}
              <View style={styles.row}>
                <Text style={{ marginRight: 20 }}>Gender :</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.radioView}>
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
                  <View style={styles.radioView}>
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
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                value={values.password}
                mode="outlined"
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password ? (
                <Text>{errors.password}</Text>
              ) : null}
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Confirm Password"
                value={values.password_confirmation}
                mode="outlined"
                onChangeText={handleChange("password_confirmation")}
              />
              {errors.password_confirmation && touched.password_confirmation ? (
                <Text>{errors.password_confirmation}</Text>
              ) : null}

              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={styles.button}
                >
                  Register
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  style={styles.button}
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
          >
            {message}
          </Snackbar>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
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
  },
});

export default AddStaffPage;
