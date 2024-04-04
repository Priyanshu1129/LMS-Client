import { StyleSheet, Text, View , Button } from 'react-native'
import React from 'react'

const MemberDetails = ({navigation}) => {
  return (
    <View>
      <Text>MemberDetails</Text>
      <Button title='Go Back' onPress={()=> navigation.goBack()} />
    </View>
  )
}

export default MemberDetails

const styles = StyleSheet.create({})