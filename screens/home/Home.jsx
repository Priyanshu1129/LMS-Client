import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UserListCard from "../../components/userListCard";
import SearchBar from "../../components/searchBar";
import { useTheme } from "react-native-paper";

const Home = ({ route }) => {
  const token = route.params.token;
  const theme = useTheme();
  
  return (
    <View>
      <Text>Home</Text>
      <UserListCard />
      <SearchBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
