import React, { useEffect } from 'react'
import { Text, View, SafeAreaView } from 'react-native'

export const TabReports = () => {
  useEffect(() => {
    console.log('TabSchedule')
  }, [])
  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: 'black' }}>Futura lista de reportes</Text>
      </View>
    </SafeAreaView>
  )
}
