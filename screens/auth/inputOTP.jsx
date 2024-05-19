import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { object, string, number, date } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/authActions";
import { Formik } from "formik";
import { authActions } from "../../redux/slices/authSlice";

let otpSchema = object({
  otp: string().length(4),
});

const InputOTP = ({ navigation }) => {
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
    dispatch();
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
      <Text style={{ fontSize: 20, margin: 10 }}>Enter OTP</Text>
      <Formik
        initialValues={{ otp: "" }}
        onSubmit={handleSubmit}
        validationSchema={otpSchema}
      >
        {({ values, handleChange, handleSubmit, isValid, touched, errors }) => (
          <View style={{ width: "70%" }}>
            <TextInput
              style={Styles.input}
              placeholder="OTP"
              keyboardType="numeric"
              value={values.otp}
              onChangeText={handleChange("otp")}
              textContentType="oneTimeCode"
            />
            {errors.otp && touched.otp ? <Text>{errors.otp}</Text> : null}
            <Button
              loading={loading}
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
      <View style={Styles.resendButton}>
        <Text>01:59</Text>
        <Button disabled onPress={() => navigation.goBack()}>
          Resend OTP
        </Button>
      </View>
      <Button onPress={() => navigation.goBack()}>Back To Login </Button>
    </View>
  );
};

export default InputOTP;

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
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
