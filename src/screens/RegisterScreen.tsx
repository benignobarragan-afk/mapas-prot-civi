import React, { useContext, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Button
} from 'react-native'

import { AuthContext } from '../context/AuthContext'
import { styles } from '../styleSheet/StyleSheet'

import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { Background } from '../components/Background'
import { Icon } from '../components/Icon'

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext)

  const {
    email,
    password,
    name,
    ape_pat,
    ape_mat,
    telefono,
    onChange
  } = useForm({
    name: '',
    ape_pat: '',
    ape_mat: '',
    telefono: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (errorMessage.length === 0) return

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError
      }
    ])
  }, [errorMessage])

  const onRegister = () => {
    console.log({ email, password, name, ape_pat, ape_mat, telefono })
    Keyboard.dismiss()
    signUp({
      nombre: name,
      correo: email,
      password,
      ape_pat,
      ape_mat,
      telefono
    })
  }

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro</Text>

          <Text style={styles.label}>Nombre(s) *:</Text>
          <TextInput
            placeholder='Juan'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            style={[
              styles.inputField,
              Platform.OS === 'ios' && styles.inputFieldIOS
            ]}
            selectionColor='white'
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize='words'
            autoCorrect={false}
          />

          <View style={styles.contDoubleInput}>
            <View>
              <Text style={styles.label}>Primer apellido *:</Text>
              <TextInput
                placeholder='Perez'
                placeholderTextColor='rgba(255,255,255,0.4)'
                underlineColorAndroid='white'
                style={[
                  styles.inputFieldDouble,
                  Platform.OS === 'ios' && styles.inputFieldIOSDouble
                ]}
                selectionColor='white'
                onChangeText={value => onChange(value, 'ape_pat')}
                value={ape_pat}
                onSubmitEditing={onRegister}
                autoCapitalize='words'
                autoCorrect={false}
              />
            </View>
            <View>
              <Text style={styles.label}>Segundo apellido:</Text>
              <TextInput
                placeholder='Garcia'
                placeholderTextColor='rgba(255,255,255,0.4)'
                underlineColorAndroid='white'
                style={[
                  styles.inputFieldDouble,
                  Platform.OS === 'ios' && styles.inputFieldIOSDouble
                ]}
                selectionColor='white'
                onChangeText={value => onChange(value, 'ape_mat')}
                value={ape_mat}
                onSubmitEditing={onRegister}
                autoCapitalize='words'
                autoCorrect={false}
              />
            </View>
          </View>

          <Text style={styles.label}>Telefono:</Text>
          <TextInput
            placeholder='3322114455'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='phone-pad'
            underlineColorAndroid='white'
            style={[
              styles.inputField,
              Platform.OS === 'ios' && styles.inputFieldIOS
            ]}
            selectionColor='white'
            onChangeText={value => onChange(value, 'telefono')}
            value={telefono}
            onSubmitEditing={onRegister}
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Text style={styles.label}>Email *:</Text>
          <TextInput
            placeholder='juan@gmail.com'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={[
              styles.inputField,
              Platform.OS === 'ios' && styles.inputFieldIOS
            ]}
            selectionColor='white'
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Text style={styles.label}>Contraseña *:</Text>
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
            onSubmitEditing={onRegister}
            autoCapitalize='none'
            autoCorrect={false}
          />

          <View style={styles.buttonContainerDouble}>
            <TouchableOpacity
              onPress={() => navigation.replace('Start')}
              activeOpacity={0.8}
              style={[styles.button, styles.buttonDanger]}
            >
              <Text style={[styles.buttonText, styles.buttonTextDanger]}>
                <Icon icon='arrow-left' size={20} color='red' /> Regresar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onRegister}
            >
              <Text style={styles.buttonText}>
                Crear cuenta <Icon icon='paper-plane' size={20} color='white' />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
