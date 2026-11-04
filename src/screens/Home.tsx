import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { styles } from '../styleSheet/StyleSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<any, any> { };

export const Home = ({ navigation }: Props) => {

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{ marginTop: insets.top }}
        >

            <Text
                style={{ color: 'black' }}
            >Home</Text>

            <TouchableOpacity
                style={styles.floatRight}
                onPress={() => { }}
            >
                <View
                    style={[styles.btn, styles.btnFloat]}
                >
                    <Text
                        style={styles.btnText}
                    >
                        +
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
