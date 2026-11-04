import * as React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabHome } from '../screens/TabHome'
import { TabReports } from '../screens/TabReports'
import { TabUser } from '../screens/TabUser'
import { colors } from '../styleSheet/StyleSheet'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.backgroundColor
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0
        },
        tabBarLabelStyle: {
          fontSize: 15
        }
      }}
    >
      <Tab.Screen
        name='Mapa'
        options={{ tabBarIcon: props => iconBar(props, 'map') }}
        component={TabHome}
      />
      <Tab.Screen
        name='Reportes'
        options={{ tabBarIcon: props => iconBar(props, 'flag') }}
        component={TabReports}
      />
      {/* <Tab.Screen name="Resultados" options={{ tabBarIcon: (props) => iconBar(props, 'file-medical') }} component={TabAnalysis} /> */}
      <Tab.Screen
        name='Cuenta'
        options={{ tabBarIcon: props => iconBar(props, 'user') }}
        component={TabUser}
      />
    </Tab.Navigator>
  )
}

const iconBar = (
  props: {
    focused: boolean
    color: string
    size: number
  },
  icon: string
) => {
  let icono = <FontAwesome5 name={icon} size={props.size} color={props.color} />
  return (
    <View style={{}}>
      <Text>{icono}</Text>
    </View>
  )
}
