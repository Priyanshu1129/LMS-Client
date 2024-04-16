import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, { useState } from "react";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const baseUnit = windowWidth / 20;

const UserListCard = ({ membershipStatus = 'expired' , balance = 30, name = "example" , seatNumber = "N/A" ,profileImage = "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"}) => {
  const [isClicked, setIsClicked] = useState(false);
  const balanceColor = balance <= 0 ? 'green' : 'orange' 
  const balanceBg = balance <= 0 ?  '#D1FAE5' : '#FFEDD5'
  const theme = useTheme(); 

  const handlePress = () => {
    setIsClicked(!isClicked);
  };


  return (
    <View
      
      style={[styles.container, { backgroundColor: isClicked ? '#f0f0f0' : 'white', backdrop : theme.colors.backdrop}]}
    >
      <View style={styles.profileWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${profileImage}` }}
            style={styles.image}
          />
          <View style={[styles.statusIndicator, { backgroundColor: membershipStatus == "active" ? 'green' : 'orange'  }]} />
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.infoWrapper}>
        <View style={[styles.balanceWrapper, {backgroundColor : balanceBg} ]}  >
          <FontAwesome name="rupee" size={16} color={balanceColor}  />
          <Text style={[styles.balanceText, {color : balanceColor}]}> {balance < 0 ? "- " : "+ " }{Math.abs(balance)}</Text>
        </View>
        <View style={[ {backgroundColor : theme.colors.surfaceVariant} ,styles.seatWraper]}>
           <MaterialIcons name="event-seat" size={16}/>
           <Text style={styles.balanceText}> {seatNumber}</Text>
        </View>
        <AntDesign name="forward" size={18} color={"#6B7280"} style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default UserListCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 2,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: baseUnit * 2.6,
    height: baseUnit * 2.6,
    overflow: 'hidden',
    position: 'relative',
    
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius : 100,
    borderWidth : 2,
  },
  statusIndicator: {
    position: 'absolute',
    top: 30,
    right: -2,
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
  balanceWrapper: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 6,
    paddingHorizontal : 8
  },
  balanceText: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 2,
   
  },
  forwardIcon: {
    marginTop: 2,
  },
  seatWraper: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 6,
    paddingHorizontal : 6
  }
});
