import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView
} from '@react-navigation/drawer'
import { AppRouter } from './AppRouter'
import { Schedule } from '../screens/Schedule'
import { BottomTabs } from './BottomTabs'

const Drawer = createDrawerNavigator()

export const AsideMenu = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <MenuInterno {...props} />}
    >
      <Drawer.Screen name='App' component={BottomTabs} />
      <Drawer.Screen name='Schedule' component={Schedule} />
    </Drawer.Navigator>
  )
}

const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets()
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        paddingTop: insets.top
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        {/* Header */}
        <View
          style={{
            marginTop: 0,
            backgroundColor: '#2B96CC'
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>
            Menu General
          </Text>
        </View>

        {/* options list */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('App')}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
                color: 'black'
              }}
            >
              Mi archivo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
                color: 'black'
              }}
            >
              Mis citas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
                color: 'black'
              }}
            >
              Mis resultados
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}
