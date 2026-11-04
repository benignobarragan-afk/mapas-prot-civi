import React from 'react'
import { View } from 'react-native'

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#2d95cd',
        top: -250,
        width: 1000,
        height: 1200,
        transform: [{ rotate: '-40deg' }]
      }}
    />
  )
}
