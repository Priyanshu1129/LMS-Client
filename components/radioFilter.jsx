import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

const MyRadioButton = ({ label , value , theme, setChecked, checked }) => {
  const active = value === checked;

  const style = {
    radioButton: {
      width: 15,
      height: 15,
      backgroundColor: active
        ? theme.colors.primary
        : theme.colors.background,
      borderRadius: 2,
      padding: 2,
    },
  };

  return (
    <TouchableOpacity onPress={() => setChecked(value)}>
      <View style={{ flexDirection: "col", alignItems: "center" }}>
        <View
          style={{
            width: "fit-content",
            borderWidth: 1,
            padding: 2,
            borderColor: "black",
            borderRadius: 2,
          }}
        >
          <View style={[style.radioButton]}></View>
        </View>
        <Text style={{color : theme.colors.onPrimaryContainer}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RadioFilter = ({ checked = "morning", setChecked, options }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {options.map((option) => (
        <MyRadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={checked}
          setChecked={setChecked}
          theme={theme}
        />
      ))}
    </View>
  );
};

export default RadioFilter;
