import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseURL = 'http://10.2.20.68:3012'

const mobileApi = axios.create({ baseURL })

mobileApi.interceptors.request.use(async (config: any) => {
  console.log('config', config)

  const token = await AsyncStorage.getItem('token')
  const fcmToken = await AsyncStorage.getItem('fcmToken')

  if (token) {
    config.headers['x-token'] = token
  }

  if (fcmToken) {
    config.headers['fcmToken'] = fcmToken
  }
  if (config.data) {
    config.body = config.data
  }
  return config
})

export default mobileApi
