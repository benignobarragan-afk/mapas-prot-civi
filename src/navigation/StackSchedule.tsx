import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Schedule } from '../screens/Schedule';

export type RootStackParam = {
    Home: undefined,
    Schedule: undefined,
}

const Stack = createStackNavigator<RootStackParam>();

export const StackSchedule = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Schedule" component={Schedule} /> */}
        </Stack.Navigator>
    );
}