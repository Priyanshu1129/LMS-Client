import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const SearchBar = ({ placeholder, value, onChangeText, onPress }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background || "white",
      borderRadius: 5,
      padding: 10,
      paddingVertical: 10,
      marginVertical: 4,
      elevation: 2,
      flex: 1, // Set flex to 1 to allow flexible width
    },
    inputContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      marginLeft: 10,
      color: theme.colors.secondary || "black",
      fontSize: theme.fontSizes.lg,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" size={theme.iconSizes.sm} color="gray" />
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Search..."}
          // placeholderTextColor="gray"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default SearchBar;
