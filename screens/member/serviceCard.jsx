import { View, Text } from 'react-native'
import React from 'react'
import ServiceDropdownCard from './serviceDropdownCard'
import PaymentListCard from '../../components/paymentListCard'
import PaymentListCard2 from '../../components/paymentListCard2'

const ServiceCard = ({service, token}) => {
  return (
    <View>
      <ServiceDropdownCard service={service} token={token} />
      <View>
        {service.renewalPayments.map((payment)=><PaymentListCard payment={payment}/>)}
      </View>
    </View>
  )
}

export default ServiceCard