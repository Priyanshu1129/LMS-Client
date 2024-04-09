import React, { useState } from "react";
import { Menu, Button } from "react-native-paper";

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
        <Button onPress={openFilter}>
          {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
        </Button>
      }
    >
      {options.map((option) => (
        <Menu.Item
          onPress={() => handleOptionSelect(option.value)}
          title={option.title}
        />
      ))}
    </Menu>
  );
};

export default FilterMenu;
