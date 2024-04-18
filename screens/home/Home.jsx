import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PaymentListCard from "../../components/paymentListCard";
import SearchBar from "../../components/searchBar";
import { useTheme } from "react-native-paper";
import ImagePickerExample from "../member/ImagePickerCom";

const Home = ({ route }) => {
  const token = route.params.token;
  const theme = useTheme();

  return (
    <View styles={{ padding: 20 }}>
      <Text>Home</Text>
      <PaymentListCard />
      <SearchBar />
      <ImagePickerExample/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
