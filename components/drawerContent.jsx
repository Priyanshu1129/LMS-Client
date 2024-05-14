import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerList = [
  { icon: "home-outline", label: "Home", navigateTo: "Home" },
  { icon: "account-group", label: "Member", navigateTo: "Members" },
  { icon: "account", label: "Staff", navigateTo: "StaffsList" },
  { icon: "seat", label: "Seat", navigateTo: "AllSeats" },
  { icon: "locker", label: "Locker", navigateTo: "AllLockers" },
  { icon: "cash-multiple", label: "Payment", navigateTo: "PaymentList" },
  {
    icon: "library",
    label: "My Organization",
    navigateTo: "MyOrganization",
  },
];

const DrawerItems = ({ theme, styles }) => {
  const navigation = useNavigation();
  return DrawerList.map((el, i) => {
    return (
      <DrawerItem
        key={i}
        icon={({ color, size }) => (
          <Icon name={el.icon} color={color} size={theme.iconSizes.md} />
        )}
        label={() => (
          <Text style={{ fontSize: theme.fontSizes.md }}>{el.label}</Text>
        )}
        onPress={() => {
          navigation.navigate(el.navigateTo);
        }}
      />
    );
  });
};
function DrawerContent(props) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const getData = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setData(JSON.parse(storedData));
  };

  useEffect(() => {
    getData();
  }, []);

  const SignOut = () => {
    AsyncStorage.setItem("isAuthenticated", "");
    AsyncStorage.setItem("data", "");
    navigation.navigate("Login");
  };

  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: theme.fontSizes.lg,
      marginTop: 3,
      fontWeight: "600",
    },
    caption: {
      fontSize: theme.fontSizes.sm,
      lineHeight: 14,
      // color: '#6e6e6e',
      width: "100%",
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderBottomWidth: 0,
      borderBottomColor: "#dedede",
      borderBottomWidth: 1,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: "#dedede",
      borderTopWidth: 1,
      borderBottomColor: "#dedede",
      borderBottomWidth: 1,
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC",
                  }}
                  size={50}
                  style={{ marginTop: 5 }}
                />
                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                  <Title style={styles.title}>{data?.data?.name}</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    {data?.data?.email}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems theme={theme} styles={styles} />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={theme.iconSizes.md} />
          )}
          onPress={SignOut}
          label={() => (
            <Text style={{ fontSize: theme.fontSizes.md }}>Sign Out</Text>
          )}
        />
      </View>
    </View>
  );
}
export default DrawerContent;
