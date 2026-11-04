import React, { useEffect, useContext } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Background } from '../components/Background'
import { styles } from '../styleSheet/StyleSheet'

import { AuthContext } from '../context/AuthContext'

export const TabUser = () => {
  const { logOut } = useContext(AuthContext)
  useEffect(() => {
    console.log('TabRecord')
  }, [])

  const handleLogout = () => {
    console.log('Logout')
    logOut()
  }

  return (
    <>
      <Background />
      <SafeAreaView style={Platform.OS === 'ios' ? {} : styles.safeArea}>
        <Text style={{ color: 'black' }}>Futura pantalla de cuenta</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}
