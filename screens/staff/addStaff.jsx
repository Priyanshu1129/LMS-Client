import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const AddAdmin = ({navigation}) => {
  return (
    <View>
      <Text>Add Admin</Text>
      <Button title='Register' onPress={()=> navigation.goBack()} />
      <Button title='Cancel' onPress={()=> navigation.goBack()} />
    </View>
  )
}

export default AddAdmin

const styles = StyleSheet.create({})