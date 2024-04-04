import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, date } from "yup";
import { Formik } from "formik";
import { register } from "../../redux/actions/authActions";

let signUpSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  phone: number().required(),
  gender: string().required(),
});

const Register = ({ navigation }) => {

  const dispatch = useDispatch();
  const { status, isAuthenticated, error, data } = useSelector((state) => state.auth.authDetails);

  const handleRegistration = (values) => {
    dispatch(register(values));
  }

  useEffect(()=>{
    if(status === "pending"){
      //  loading
    }else if(status === "success" && isAuthenticated){
      navigation.navigate('Home');
    }else if(status === "failed" ){
      Alert.alert(error);
    }
  },[status])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
              title="Register"
              style={Styles.btn}
              onPress={handleSubmit}
              loading={true}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          Have an Account, Login
        </Text>
      </TouchableOpacity>
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
