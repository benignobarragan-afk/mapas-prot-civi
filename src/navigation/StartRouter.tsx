import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Start } from '../screens/Start'
// import { AsideMenu } from './AsideMenu'
import { BottomTabs } from './BottomTabs'
import { AuthContext } from '../context/AuthContext'
import { LoadingScreen } from '../screens/LoadingScreen'
import { RegisterScreen } from '../screens/RegisterScreen'

export type RootStackParam = {
  Start: undefined
  Menu: undefined
  RegisterScreen: undefined
}

const Stack = createStackNavigator<RootStackParam>()

export const StartRouter = () => {
  const { status } = useContext(AuthContext)

  if (status === 'checking') return <LoadingScreen />

  console.log(status)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}
    >
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name='Start' component={Start} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name='Menu' component={BottomTabs} />
      )}
    </Stack.Navigator>
  )
}
