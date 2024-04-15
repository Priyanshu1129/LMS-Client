import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding :10,
    paddingVertical :10,
    marginVertical: 4,
    flex: 1, // Set flex to 1 to allow flexible width
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 2,
    padding:8
    
  },
});

export default SearchBar;
