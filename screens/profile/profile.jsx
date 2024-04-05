import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Avatar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Profile = ({ navigation, route }) => {
  const [data, setData] = useState();

  const getData = async () => {
    const storedData = await AsyncStorage.getItem("data");

    setData(JSON.parse(storedData));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Avatar.Image
            source={{
              uri:
                data?.data?.avatar ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC",
            }}
            size={100}
            style={{ marginTop: 5 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Title style={styles.title}>{data?.data?.name}</Title>
          </View>
        </View>
        <View style={styles.buttonList}>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="email" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.email}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="account" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.role}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="check-circle" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.status}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="human-male" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.gender}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="cellphone" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.phone}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="clock-edit" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.updatedAt}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Icon size={30} name="home" />
              </View>
              <Text style={styles.buttonName}>{data?.data?.createdAt}</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userInfoSection: {
    // backgroundColor: "red",
  },
  title: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: "100%",
    borderWidth: 4,
    borderColor: "#FFBB3B",
  },
  propic: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: 20,

    fontSize: 32,
  },
  membership: {
    color: "#FFBB3B",
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconArea: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonName: {
    width: 300,
    fontSize: 20,
    marginLeft: 20,
  },
  sp: {
    width: 400,
    marginTop: 10,
    height: 1,
    backgroundColor: "black",
  },
});
