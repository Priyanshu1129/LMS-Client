import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { register } from "../../redux/actions/authActions";
import { authActions } from "../../redux/slices/authSlice";

let signUpSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  phone: number().required(),
  gender: string().required(),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { status, isAuthenticated, error, data } = useSelector(
    (state) => state.auth.authDetails
  );

  const handleRegistration = (values) => {
    dispatch(register(values));
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && isAuthenticated) {
      navigation.navigate("Home");
      setLoading(false);
      dispatch(authActions.clearStatus());
    } else if (status === "failed") {
      Alert.alert(error);
      setLoading(false);
      dispatch(authActions.clearStatus());
      dispatch(authActions.clearError());
    }
  }, [status]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          gender: "",
        }}
        onSubmit={handleRegistration}
        validationSchema={signUpSchema}
      >
        {({ handleChange, handleSubmit, isValid, values, touched, errors }) => (
          <View style={{ width: "70%" }}>
            <TextInput
              style={Styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
            />
            {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
            <TextInput
              style={Styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            <TextInput
              style={Styles.input}
              placeholder="Mobile"
              value={values.phone}
              onChangeText={handleChange("phone")}
            />
            {errors.phone && touched.phone ? <Text>{errors.phone}</Text> : null}
            <TextInput
              style={Styles.input}
              placeholder="Gender"
              value={values.gender}
              onChangeText={handleChange("gender")}
            />
            {errors.gender && touched.gender ? (
              <Text>{errors.gender}</Text>
            ) : null}
            <TextInput
              secureTextEntry
              style={Styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <Button
              disabled={!isValid}
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
            >
              Register
            </Button>
          </View>
        )}
      </Formik>
      <Button onPress={() => navigation.navigate("Login")}>
        Already Have An Account ? Login
      </Button>
    </View>
  );
};

export default Register;

const Styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
