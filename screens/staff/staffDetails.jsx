import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const AdminDetails = ({navigation}) => {
  return (
    <View>
      <Text>adminDetails</Text>
      <Button title='Go Back' onPress={()=> navigation.goBack()}/>
    </View>
  )
}

export default AdminDetails

const styles = StyleSheet.create({})