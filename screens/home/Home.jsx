import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PaymentListCard from "../../components/paymentListCard";
import SearchBar from "../../components/searchBar";
import { useTheme } from "react-native-paper";

import { CartesianChart, Line } from "victory-native";
import ArrivalVsLeavingMembers from "../../components/statistics/arrivalVsLeavingMembers";
import OrganizationBanner from "../../components/organizationBanner";
import { ScrollView } from "react-native-gesture-handler";
import MyChart from "../../components/statistics/myChart";

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
     
       <OrganizationBanner/>
       <ArrivalVsLeavingMembers/>

    </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container : {
    padding : 10
  }
});
