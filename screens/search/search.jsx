import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import {
  Avatar,
  List,
  Divider,
  IconButton,
  Searchbar,
} from "react-native-paper";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleSearch = (text) => {
    const dummyData = [
      { id: "1", username: "user1", fullName: "Raj" },
      { id: "2", username: "user2", fullName: "Naman" },
    ];
    const filteredResults = dummyData.filter((user) =>
      user.fullName.toLowerCase().startsWith(text.toLowerCase())
    );
    setSearchResults(text.length == 0 ? [] : filteredResults);
    setShowClearButton(text.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowClearButton(false);
  };

  const renderUserItem = ({ item }) => (
    <List.Item
      title={item.fullName}
      description={`@${item.username}`}
      left={(props) => (
        <Avatar.Text {...props} label={item.username.charAt(0).toUpperCase()} />
      )}
      onPress={() => console.log("User profile clicked:", item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search User"
          mode="bar"
          style={styles.searchInput}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          onClearIconPress={handleClearSearch}
          value={searchQuery}
        />
      </View>
      <Divider />
      <FlatList
        data={searchResults}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchInput: {
    borderRadius: 5,
    margin: 10,
    // padding:0
  },
  clearButton: {
    marginLeft: 10,
  },
  flatList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default SearchPage;
