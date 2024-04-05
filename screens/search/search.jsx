import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Divider, IconButton } from 'react-native-paper';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleSearch = (text) => {
    // Perform search operation here
    // For now, dummy data is used
    const dummyData = [
      { id: '1', username: 'user1', fullName: 'User One' },
      { id: '2', username: 'user2', fullName: 'User Two' },
      // Add more dummy data as needed
    ];
    const filteredResults = dummyData.filter(user => user.username.toLowerCase().startsWith(text.toLowerCase()));
    setSearchResults(filteredResults);
    setShowClearButton(text.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowClearButton(false);
  };

  const renderUserItem = ({ item }) => (
    <List.Item
      title={item.fullName}
      description={`@${item.username}`}
      left={props => <Avatar.Text {...props} label={item.username.charAt(0).toUpperCase()} />}
      onPress={() => console.log('User profile clicked:', item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search for users"
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          style={styles.searchInput}
        />
        {showClearButton && (
          <IconButton
            icon="close"
            size={20}
            onPress={handleClearSearch}
            style={styles.clearButton}
          />
        )}
      </View>
      <Divider />
      <FlatList
        data={searchResults}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
