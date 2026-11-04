import React, { createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import cafeApi from '../api/cafeApi'
import mobileApi from '../api/mobileApi'

import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData
} from '../interfaces/appInterfaces'
import { authReducer, AuthState } from './AuthReducer'

type AuthContextProps = {
  errorMessage: string
  token: string | null
  user: Usuario | null
  status: 'checking' | 'authenticated' | 'not-authenticated'
  signUp: (registerData: RegisterData) => void
  signIn: (loginData: LoginData) => void
  logOut: () => void
  removeError: () => void
}

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')

    // No token, no autenticado
    if (!token) return dispatch({ type: 'notAuthenticated' })

    // Hay token
    // const resp = await cafeApi.get('/auth')
    // if (resp.status !== 200) {
    //   return dispatch({ type: 'notAuthenticated' })
    // }

    // await AsyncStorage.setItem('token', resp.data.token)
    let data = {
      token: 'token',
      usuario: {
        nombre: 'Julio',
        apepat: 'Mariscal',
        estado: true,
        correo: 'julio@hcg.gob.mx'
      }
    }

    dispatch({
      type: 'signUp',
      payload: {
        token: data.token,
        user: data.usuario
      }
    })
  }

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      if (!correo || !password) {
        return dispatch({
          type: 'addError',
          payload: 'Email y password son obligatorios'
        })
      }

      let { data } = await mobileApi.post<LoginResponse>(
        '/api/mobile/users/login',
        {
          correo,
          password
        }
      )

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      })

      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('user', JSON.stringify(data.usuario))
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Información incorrecta'
      })
    }
  }

  const signUp = async ({
    nombre,
    correo,
    password,
    ape_pat,
    ape_mat,
    telefono
  }: RegisterData) => {
    if (!nombre || !correo || !password || !ape_pat) {
      return dispatch({
        type: 'addError',
        payload: 'Completa los campos obligatorios'
      })
    }

    try {
      const { data } = await mobileApi.post<LoginResponse>(
        '/api/mobile/users',
        {
          correo,
          password,
          nombre,
          ape_pat,
          ape_mat,
          telefono
        }
      )
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      })

      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('user', JSON.stringify(data.usuario))
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Revise la información'
      })
    }
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'logout' })
  }

  const removeError = () => {
    dispatch({ type: 'removeError' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
