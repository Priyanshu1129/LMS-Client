import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { object, string, number, date } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/authActions";
import { Formik } from "formik";
import { authActions } from "../../redux/slices/authSlice";

let forgotPasswordSchema = object({
  email: string().email().required(),
});

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const { status, data, error } = useSelector(
    (state) => state.auth.authDetails
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      Alert.alert(data.message);
      dispatch(authActions.clearStatus());
    } else if (status === "failed") {
      setLoading(false);
      Alert.alert(error);
      dispatch(authActions.clearStatus());
      dispatch(authActions.clearError());
    }
  }, [status]);

  const handleSubmit = (data) => {
    dispatch(forgotPassword(data));
  };

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
      <Text style={{ fontSize: 20, margin: 10 }}>Forgot Password</Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={forgotPasswordSchema}
      >
        {({ values, handleChange, handleSubmit, isValid, touched, errors }) => (
          <View style={{ width: "70%" }}>
            <TextInput
              style={Styles.input}
              placeholder="Email"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            <Button
              loading={loading}
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid}
            >
              Forgot Password
            </Button>
          </View>
        )}
      </Formik>
      <Button onPress={() => navigation.goBack()}>Back To Login </Button>
    </View>
  );
};

export default ForgotPassword;

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
