import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styleSheet/StyleSheet';

export const Counter = () => {
    const [contador, setContador] = useState(10);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Counter: {contador}
            </Text>

            {/* <Button
                onPress={ () => setContador(contador + 1)}
                title="Incrementar"
            /> */}

            <TouchableOpacity
                style={styles.floatLeft}
                onPress={() => setContador(contador - 1)}
            >
                <View
                    style={[styles.btn, styles.btnFloat]}
                >
                    <Text
                        style={styles.btnText}
                    >
                        -
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.floatRight}
                onPress={() => setContador(contador + 1)}
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
