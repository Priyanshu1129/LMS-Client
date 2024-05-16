import { Text, View, StyleSheet } from "react-native";
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie, PolarChart } from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Legend2 from "./legend2";

const LockerStats = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: "white", borderRadius: 8, padding: 10 }}>
      <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
        <FontAwesome5 size={16} name={"user-lock"} />
        <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
          Loker Stats
        </Text>
      </View>
      <View style={[styles.graphWrapper]}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 10,
            gap: 10,
          }}
        >
          <MyChart
            totalCount={100}
            sliceColor={[theme.colors.primary, "#E2E8F0"]}
            series={[40, 50]}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Legend
                count={15}
                label={"Avail"}
                color={theme.colors.primary}
                size={12}
              />
              <Legend count={15} label={"booked"} color={"#E2E8F0"} size={12} />
            </View>
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

export default LockerStats;
