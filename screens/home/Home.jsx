import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

import { CartesianChart, Line } from "victory-native";
import OrganizationBanner from "../../components/organizationBanner";
import { ScrollView } from "react-native-gesture-handler";
import SeatsStats from "../../components/statistics/seatsStat";
import LockerStats from "../../components/Dashboard/lockerStats";
import MemberStats from "../../components/Dashboard/memberStats";
import ArrivalVsLeavingMembers from "../../components/statistics/arrivalVsLeavingMembers";

const Home = ({ route }) => {
  const token = route.params.token;
  const theme = useTheme();
  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <MemberStats />
        {/* <OrganizationBanner /> */}
        <SeatsStats />
        <LockerStats />
        <ArrivalVsLeavingMembers />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: 10,
    padding: 15,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
