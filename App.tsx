import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'

// import { Menu } from './src/routers/Menu';
import { StartRouter } from './src/navigation/StartRouter'
import { AuthProvider } from './src/context/AuthContext'

import {
  requestUserPermission,
  getFcmToken,
  NotificationListener
} from './src/utils/pushnotification_helper'

export const App = () => {
  useEffect(() => {
    requestUserPermission()
    getFcmToken()
    NotificationListener()
  }, [])

  return (
    <NavigationContainer>
      <AppState>
        <StartRouter />
      </AppState>
    </NavigationContainer>
  )
}
const AppState = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>
}
