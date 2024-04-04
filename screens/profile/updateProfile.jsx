import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Image,
  Button,
} from "react-native";
import { Formik } from "formik";
import { object, string, number, date } from "yup";
import { Avatar } from "react-native-paper";
import styles from "./stylesProfileEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Back from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { updateProfile } from "../../redux/actions/updateProfileActions";

let profileSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number().required(),
  gender: string().required(),
});

function UpdateProfile({ navigation }) {
  const dispatch = useDispatch();
  const {
    status,
    error,
    data: updateProfileData,
  } = useSelector((state) => state.updateProfile.updateProfileDetails);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setData(JSON.parse(storedData));
  };
  useEffect(() => {
    getData();
  }, []);

  useMemo(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleUpdateProfile = (values) => {
    console.log("values", values);
    
    navigation.goBack();
    // dispatch(updateProfile());
  };

  useEffect(() => {
    if (status === "pending") {
      //  loading
    } else if (status === "success") {
      navigation.goBack();
    } else if (status === "failed") {
      Alert.alert(error);
    }
  }, [status]);

  return (
    <ScrollView
      keyboardShouldPersistTaps={"always"}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* <Text>{JSON.stringify(data)}</Text> */}
      {!loading ? (
        <View>
          <View style={styles.camDiv}>
            <View style={styles.camIconDiv}>
              <Back name="camera" size={22} style={styles.cameraIcon} />
            </View>

            <TouchableOpacity>
              <Avatar.Image
                size={140}
                style={styles.avatar}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC",
                }}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              name: data?.data?.name,
              email: data?.data?.email,
              phone: data?.data?.phone,
              gender: data?.data?.gender,
            }}
            onSubmit={handleUpdateProfile}
            validationSchema={profileSchema}
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
              <View>
                <View
                  style={{
                    marginTop: 50,
                    marginHorizontal: 22,
                  }}
                >
                  <View style={styles.infoEditView}>
                    <Text style={styles.infoEditFirst_text}>Name</Text>
                    <TextInput
                      placeholder="Your Name"
                      placeholderTextColor={"#999797"}
                      style={styles.infoEditSecond_text}
                      value={values.name}
                      onChangeText={handleChange("name")}
                    />
                    {errors.name && touched.name ? (
                      <Text>{errors.name}</Text>
                    ) : null}
                  </View>
                  <View style={styles.infoEditView}>
                    <Text style={styles.infoEditFirst_text}>Email</Text>
                    <TextInput
                      editable={false}
                      placeholder="Your Email"
                      placeholderTextColor={"#999797"}
                      style={styles.infoEditSecond_text}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                    {errors.email && touched.email ? (
                      <Text>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.infoEditView}>
                    <Text style={styles.infoEditFirst_text}>Gender</Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={styles.radioView}>
                        <Text style={styles.radioText}>Male</Text>
                        <RadioButton
                          value="M"
                          status={
                            values.gender === "M" ? "checked" : "unchecked"
                          }
                          onPress={() => handleChange("gender")("M")}
                        />
                      </View>
                      <View style={styles.radioView}>
                        <Text style={styles.radioText}>Female</Text>
                        <RadioButton
                          value="F"
                          status={
                            values.gender === "F" ? "checked" : "unchecked"
                          }
                          onPress={() => handleChange("gender")("F")}
                        />
                      </View>
                    </View>
                    {errors.gender && touched.gender ? (
                      <Text>{errors.gender}</Text>
                    ) : null}
                  </View>
                  <View style={styles.infoEditView}>
                    <Text style={styles.infoEditFirst_text}>Mobile No</Text>
                    <TextInput
                      placeholder="Your Mobile No"
                      placeholderTextColor={"#999797"}
                      keyboardType="numeric"
                      maxLength={10}
                      style={styles.infoEditSecond_text}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                    />
                    {errors.phone && touched.phone ? (
                      <Text>{errors.phone}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.button}>
                  <Button
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={styles.inBut}
                    title="Update Details"
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      ) : (
        <Text>LOADING...</Text>
      )}
    </ScrollView>
  );
}

export default UpdateProfile;
