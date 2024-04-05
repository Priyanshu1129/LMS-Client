import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Snackbar } from "react-native-paper";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../../redux/actions/memberActions";
import { memberActions } from "../../redux/slices/memberSlice";
import PageLoader from "../../components/pageLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

let memberSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number().required(),
  gender: string().required(),
  preparation: string().required(),
  address: string().required(),
  monthlySeatFee: number().required(),
});

const AddMemberPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { status, data, error } = useSelector(
    (state) => state.member.memberDetails
  );

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleRegister = (values) => {
    console.log("member", values);
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
      setMessage("Member Added Successfully");
      setVisible(true);
      navigation.goBack();
    } else if (status === "failed") {
      setLoading(false);
      setMessage(error);
      setVisible(true);
      memberActions.clearMemberDetailsError();
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
            monthlySeatFee: 500,
            address: "",
            preparation: "",
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
                label="Monthly Fee"
                value={values.monthlySeatFee}
                mode="outlined"
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
                mode="outlined"
              />
              {errors.address && touched.address ? (
                <Text>{errors.address}</Text>
              ) : null}
              <TextInput
                label="Preparation"
                value={values.preparation}
                mode="outlined"
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

export default AddMemberPage;
