import { Text, View, StyleSheet } from "react-native";
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie, PolarChart } from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Legend2 from "./legend2";

const MemberStats = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 6,
        padding: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
        <MaterialIcons size={20} name={"event-seat"} />
        <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
          Member Stats
        </Text>
      </View>
      <View style={[styles.graphWrapper]}>
        <View
          style={{
            flexDirection: "row",
            padding: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRightWidth: 1,
              borderColor: "#A5B4C8",
            }}
          >
            <View style={{}}>
              <Legend
                label={"Total"}
                count={"200"}
                color={theme.colors.primary}
                size={12}
              />
              <Legend
                label={"Active"}
                count={"150"}
                color={"green"}
                size={12}
              />
              <Legend
                label={"Inactive"}
                count={"30"}
                color={"orange"}
                size={12}
              />
              <Legend label={"Expired"} color={"tomato"} count={20} size={12} />
            </View>
          </View>

          <View style={{ width: "50%" }}>
            <MyChart
              totalCount={200}
              sliceColor={["green", "orange", "tomato"]}
              series={[150, 30, 20]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  graphWrapper: {
    backgroundColor: "white",
  },
});

export default MemberStats;
