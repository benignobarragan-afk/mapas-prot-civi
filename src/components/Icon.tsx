import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text } from 'react-native'

interface IconProps {
  icon: string
  size: number | undefined
  color: string | undefined
}

export const Icon = ({ icon, size = 20, color = 'white' }: IconProps) => {
  return <FontAwesome5 name={icon} size={size} color={color} />
}
