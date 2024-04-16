import React, { useState } from "react";
import { Menu, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const FilterMenu = ({ visible, setVisible, onChange, options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const closeFilter = () => setVisible(false);

  const openFilter = () => setVisible(true);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
    closeFilter();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeFilter}
      anchor={
        <Button
          onPress={openFilter}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
        >
          <AntDesign name="filter" size={18}/>
        </Button>
      }
      contentStyle={styles.menuContent}
    >
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => handleOptionSelect(option.value)}
          title={option.title}
          titleStyle={styles.menuItemTitle}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6, // Ensure the button has rounded corners
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 0,
  },
  buttonLabel: {
    color: "white",
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 8,
  },
  menuItemTitle: {
    color: "#333",
  },
});

export default FilterMenu;
