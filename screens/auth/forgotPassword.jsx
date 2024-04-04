import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { object, string, number, date } from "yup";
import { Formik } from "formik";

let forgotPasswordSchema = object({
  email: string().email().required(),
});

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

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
        initialValues={{ email: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={forgotPasswordSchema}
      >
        {({ values, handleChange, handleSubmit, isValid, touched, errors }) => (
          <View style={{ width: "70%" }}>
            <TextInput
              style={Styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            <Button
              style={Styles.btn}
              title="Send Email"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          {" "}
          Back To Login{" "}
        </Text>
      </TouchableOpacity>
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
