import { Text, View, StyleSheet } from "react-native";
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie, PolarChart } from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Legend2 from "./legend2";

const SeatsStats = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 6,
        padding: 10,
        gap: 10
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
          <MaterialIcons size={20} name={"event-seat"} />
          <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
            Seats Stats
          </Text>
        </View>
        <Legend2
          color1={theme.colors.primary}
          color2={"#E2E8F0"}
          val1={"Booked"}
          val2={"Avail"}
          size={12}
        />
      </View>
      <View style={[styles.graphWrapper]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              width: "50%",
              // borderRightWidth: 1,
              borderColor: "#A5B4C8",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MyChart
              totalCount={100}
              sliceColor={[theme.colors.primary, "#E2E8F0"]}
              series={[40, 50]}
            />
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              {/* <MaterialIcons size={20} name={"event-seat"} /> */}
              <Text style={{ fontWeight: 500, color: theme.colors.secondary }}>
                Full Day
              </Text>
              <Legend2
                // label={"Morning"}
                val1={30}
                val2={70}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
            </View>
          </View>

          <View style={{ width: "50%", alignItems: "center", gap: 6 }}>
            <MyChart
              totalCount={100}
              sliceColor={[theme.colors.primary, "#E2E8F0"]}
              series={[40, 50]}
            />
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              {/* <MaterialIcons size={20} name={"event-seat"} /> */}
              <Text style={{ fontWeight: 500, color: theme.colors.secondary }}>
                Morning
              </Text>
              <Legend2
                // label={"Morning"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View
            style={{
              width: "50%",
              // borderRightWidth: 1,
              borderColor: "#A5B4C8",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MyChart
              totalCount={100}
              sliceColor={[theme.colors.primary, "#E2E8F0"]}
              series={[40, 50]}
            />
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              {/* <MaterialIcons size={20} name={"event-seat"} /> */}
              <Text style={{ fontWeight: 500, color: theme.colors.secondary }}>
                Noon
              </Text>
              <Legend2
                // label={"Morning"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
            </View>
          </View>

          <View style={{ width: "50%", alignItems: "center", gap: 6 }}>
            <MyChart
              totalCount={100}
              sliceColor={[theme.colors.primary, "#E2E8F0"]}
              series={[40, 50]}
            />
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              {/* <MaterialIcons size={20} name={"event-seat"} /> */}
              <Text style={{ fontWeight: 500, color: theme.colors.secondary }}>
                Evening
              </Text>
              <Legend2
                // label={"Morning"}
                color1={theme.colors.primary}
                color2={"#E2E8F0"}
                size={12}
              />
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

export default SeatsStats;
