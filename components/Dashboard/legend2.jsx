import { View, Text } from "react-native";

const Legend2 = ({size=12, color1, color2, val1 = 10, val2=15, label}) => {
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
      <View style={{flexDirection : 'row', gap : 2}}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: color1,
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: 2,
        }}
      ></View>
      <Text>{val1}</Text>
      </View>
      <View style={{flexDirection : 'row', gap : 2}}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: color2,
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: 2,
        }}
      ></View>
      <Text>{val2}</Text>
      </View>
     
      <Text>{label}</Text>
    </View>
  );
};

export default Legend2