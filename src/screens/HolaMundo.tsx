import React from 'react'
import { Text, View } from 'react-native';

export const HolaMundo = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
        }}>Hello World</Text>
    </View>
  )
}
