import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export const Schedule = () => {
    return (
        <View>
            {/* header */}
            <View>
                <Text
                    style={{ color: 'black' }}
                >
                    Mis citas
                </Text>
            </View>


            {/* float button */}
            <TouchableOpacity>
                <Text>
                    +
                </Text>
            </TouchableOpacity>


            {/* body */}
            <View>

            </View>
        </View>
    )
}
