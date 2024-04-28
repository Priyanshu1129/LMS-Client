import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

import { CartesianChart, Line } from "victory-native";
import ArrivalVsLeavingMembers from "../../components/statistics/arrivalVsLeavingMembers";
import OrganizationBanner from "../../components/organizationBanner";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ route }) => {
  const token = route.params.token;
  const theme = useTheme();
  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <ScrollView>
      <View styles={[styles.container]}>
        <OrganizationBanner />
        <ArrivalVsLeavingMembers />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
