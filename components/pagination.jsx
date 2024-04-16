import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import { Button } from "react-native-paper";

const Pagination = ({ totalCount, pageNumber, setPageNumber }) => {
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const totalPages =
    totalCount % 10 == 0 ? totalCount / 10 : Math.floor(totalCount / 10) + 1;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: false ? "#f0f0f0" : "white" },
      ]}
    >
      <View style={styles.leftContainer}>
        <Entypo name="users" />
        <Text style={styles.title}>
          {pageNumber == totalPages
            ? `${totalCount}/${totalCount}`
            : `${pageNumber * 10}/${totalCount}`}
        </Text>
      </View>
      <View style={{ ...styles.rightContainer, ...styles.buttonWrapper }}>
        <TouchableOpacity
          disabled={pageNumber == 1}
          style={styles.rightContainer}
          onPress={() => prevPage()}
        >
          <Button disabled={pageNumber == 1}>
            <AntDesign name="left" /> Prev
          </Button>
        </TouchableOpacity>
        <Text>
          {pageNumber}/{totalPages}
        </Text>
        <TouchableOpacity
          disabled={pageNumber == totalPages}
          onPress={() => nextPage()}
          style={styles.rightContainer}
        >
          <Button disabled={pageNumber == totalPages}>
            Next <AntDesign name="right" />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 2,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    gap: 4,
  },
  title: {
    color: "gray",
    fontWeight: "500",
    marginLeft: 8,
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  forwardIcon: {
    marginTop: 2,
  },
  buttonWrapper: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 6,
    backgroundColor: "#F3F4F6",
  },
});
