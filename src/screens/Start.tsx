import React, { useContext, useEffect } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Keyboard
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { styles } from '../styleSheet/StyleSheet'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { Background } from '../components/Background'
import { Icon } from '../components/Icon'

interface Props extends StackScreenProps<any, any> {}

export const Start = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext)

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (errorMessage.length === 0) return

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError
      }
    ])
  }, [errorMessage])

  const onLogin = () => {
    Keyboard.dismiss()
    signIn({ correo: email, password })
  }

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <Text style={styles.label}>Usuario</Text>
          <TextInput
            placeholder='Ingrese su email:'
            placeholderTextColor='rgba(255,255,255,0.4)'
            // keyboardType='email-address'
            underlineColorAndroid='white'
            style={[
              styles.inputField,
              Platform.OS === 'ios' && styles.inputFieldIOS
            ]}
            selectionColor='white'
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder='******'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            secureTextEntry
            style={[
              styles.inputField,
              Platform.OS === 'ios' && styles.inputFieldIOS
            ]}
            selectionColor='white'
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize='none'
            autoCorrect={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonText}>
                Ingresar <Icon icon='paper-plane' size={20} color='white' />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}
            >
              <Text style={styles.buttonText}>
                <Icon icon='user' size={20} color='white' /> Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
