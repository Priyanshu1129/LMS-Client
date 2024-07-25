import { StyleSheet } from "react-native";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, Animated, View } from "react-native";
import { useTheme } from "react-native-paper";
import { color } from "@mui/system";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import { Button } from "react-native";
import ServiceDetailCard from "./serviceDetailCard";
import ServiceDetailsDropdownCard from "./serviceDetailCard";
import { useSelector } from "react-redux";
import ServiceDetailsCard from "./serviceDetailCard";

const ServiceDropdownCard = ({ service, token }) => {

  
  const [slideAnimation] = useState(new Animated.Value(0));
  const [openMenue, setOpenMenue] = useState(false);
  const theme = useTheme();
  const colors = {
    labelColor: theme.colors.primary,
    buttonBackground: theme.colors.primary,
  };

  const toggleOptions = (token) => {
    setOpenMenue((state) => !state);
    Animated.timing(slideAnimation, {
      toValue: openMenue ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0], // Adjust this value to control the animation
  });

  return (
    <View style={[styles.card]}>
      {/* header */}

      <View
        style={[
          styles.serviceHeader,
          { backgroundColor: colors.buttonBackground },
        ]}
      >
        <View style={[{ display: "flex", flexDirection: "row" }]}>
          <MaterialIcons color={"white"} size={20} name={"event-seat"} />
          <Text style={[styles.title]}> {service?.seat?.seatNumber}</Text>
        </View>
        <View>
          {console.log("service--------", service)}
          <Text style={[styles.title]}>
            {Object.entries(service?.seat?.schedule ?? {}).filter(
              ([key, value]) => value?.occupant === service?.occupant
            )[0]?.[0] ?? "N/A"}
          </Text>
        </View>

        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            },
          ]}
        >
          <Text style={[styles.title]}>Status</Text>
          <View
            style={[
              {
                width: 12,
                height: 12,
                backgroundColor:
                  service?.status == "active" ? "green" : "orange",
                borderRadius: 4,
              },
            ]}
          ></View>
        </View>
        <TouchableOpacity onPress={toggleOptions} activeOpacity={0.9}>
          <View>
            {!openMenue ? (
              <MaterialCommunityIcons
                size={25}
                name={"menu-down"}
                color={"white"}
              />
            ) : (
              <MaterialCommunityIcons
                size={25}
                name={"menu-up"}
                color={"white"}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {openMenue && (
        <Animated.View
          style={[
            styles.slidingOptionsContainer,
            { transform: [{ translateY }] },
          ]}
        >
          <View style={styles.userInfoRow}>
            <ServiceDetailsCard service={service} token={token} />
          </View>
        </Animated.View>
      )}

      {/* Payment container */}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    width: 130,
    color: "#fff",
    fontSize: 15,
    marginBottom: "auto",
    marginTop: "auto",
  },
  serviceHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    borderRadius: 5,
  },
  container: { padding: 30 },
  card: {
    borderRadius: 5,
    elevation: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  cardInfo: {
    padding: 20,
    display: "flex",
    gap: 16,
  },
  cardInfoText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoKeys: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfoValues: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDropdownCard;
