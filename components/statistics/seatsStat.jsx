import { Text, View, StyleSheet } from "react-native";
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie, PolarChart } from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FilterMenu from "../filterMenu";
import Legend2 from "./legend2";

const SeatsStats = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        gap: 10
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4 }}>
          <MaterialIcons size={20} name={"event-seat"} />
          <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
            Seats Stats
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <MaterialIcons size={20} name={"arrow-drop-down"} />
          <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
            Morning
          </Text>
        </View>
      </View>
      <View style={[styles.graphWrapper]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
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
              {/* <Legend2
                label={"Morning"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
              <Legend2
                label={"Noon"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
              <Legend2
                label={"Evening"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
              <Legend2
                label={"FullDay"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              /> */}
              {/* <Legend
                label={"Total"}
                count={"200"}
                // color={theme.colors.primary}
                size={12}
              /> */}
              <Legend
                label={"Booked"}
                count={"150"}
                color={theme.colors.primary}
                size={12}
              />
              <Legend
                label={"Available"}
                color={"#E2E8F0"}
                count={20}
                size={12}
              />
            </View>
          </View>

          <View style={{ width: "50%" }}>
            <MyChart />
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

export default SeatsStats;
