import { useTheme } from "react-native-paper";
import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

const MyChart = ({totalCount = 100, series , sliceColor}) => {
  const theme = useTheme();
  const widthAndHeight = 100;

  return (
    <View style={styles.container}>
      <PieChart
        style={{ borderWidth: 5, borderColor: "black" }}
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.65}
        coverFill={"#FFF"}
      />
      <Text
        style={{
          position: "absolute",
          top: 40,
          color: theme.colors.primary,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {totalCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default MyChart;
