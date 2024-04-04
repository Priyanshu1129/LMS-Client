import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <View>
      {/* <Text>Member Search</Text> */}
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button
        title="Go To Search Result Details"
        onPress={() => navigation.navigate("MemberDetails", { id: "1" })}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
