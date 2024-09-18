import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const ChangePassword = ({navigation}) => {
  return (
    <View>
      <Text>ChangePassword</Text>
      <Button title='Update' onPress={()=> navigation.popToTop()}/>
      <Button title='Cancel' onPress={()=> navigation.goBack()}/>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})