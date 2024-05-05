import * as React from "react";
import { View , StyleSheet, Text} from "react-native";
import { CartesianChart, Line, Bar, BarGroup } from "victory-native";
import { Circle, center, useFont } from "@shopify/react-native-skia";

import inter from "../../assets/myfont.ttf"; // Wherever your font actually lives
import { Button, useTheme } from "react-native-paper";
import Legend from "./legend";

const ArrivalVsLeavingMembers = () => {
  const DATA = Array.from({ length: 10 }, (_, i) => ({
    x: i,
    y: 40 + 30 * Math.random(),
    z: 40 + 30 * Math.random(),
  }));
  console.log(DATA);
  const font = useFont(inter, 12);
  const theme  = useTheme();
  return (
    <View  style={{backgroundColor : 'white', margin : 5, borderRadius : 8, padding : 5}}>
    <View style={[styles.graphWrapper]}>
      <CartesianChart
        data={DATA}
        xKey="x"
        yKeys={["y", "z"]}
        axisOptions={{ font }}
        padding={{left : 0, right : 0, top : 0, bottom : 0}}
        domain={{x:[1]}}
        domainPadding={{left : 15, right : 20}}
        lineColor={{
          grid: { x: "lightgray", y: "lightgray" },
          frame: "green",
        }}
      >
        {({ points, chartBounds }) => (
          <BarGroup
            chartBounds={chartBounds}
            betweenGroupPadding={0.3}
            withinGroupPadding={0.1}
          >
            <BarGroup.Bar points={points.y} color="#E2E8F0" />
            <BarGroup.Bar points={points.z} color={`${theme.colors.primary}`} />
          </BarGroup>
        )}
      </CartesianChart>
    </View>
    <View style={{flexDirection : 'row', gap : 4, justifyContent : 'center'}}>
      <Legend size={12} color={theme.colors.primary} label="Joined" />
      <Legend size={12} color={"red"} label="Leaved" />    
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graphWrapper: {
    height: 200,
    backgroundColor: 'white',

  }
})

export default ArrivalVsLeavingMembers;
