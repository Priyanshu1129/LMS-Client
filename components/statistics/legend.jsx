import { View, Text } from "react-native";

const Legend = ({size, color, label}) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        gap: 5,
        borderRadius: 5,
        alignSelf: "flex-start",
        padding: 1,
        paddingHorizontal: 5,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: 2,
        }}
      ></View>
      <Text>{label}</Text>
    </View>
  );
};

export default Legend