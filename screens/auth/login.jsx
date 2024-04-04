import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { login } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

let loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { status, isAuthenticated, error } = useSelector(
    (state) => state.auth.authDetails
  );

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === "pending") {
      //  loading
    } else if (status === "success" && isAuthenticated) {
      navigation.navigate("Home");
    } else if (status === "failed") {
      Alert.alert(error);
    }
  }, [status]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={loginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          values,
          touched,
          errors,
        }) => (
          <View style={{ width: "70%" }}>
            <TextInput
              style={Styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
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
            <Button onPress={handleSubmit} disabled={!isValid} title="Login" />
          </View>
        )}
      </Formik>
      <Text
        style={{
          marginTop: 20,
        }}
      >
        Or
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text> Forget Password </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
