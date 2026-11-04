import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export async function requestUserPermission () {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

export async function getFcmToken () {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  // console.log('fcmToken old', fcmToken)
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken()
      if (fcmToken) {
        // console.log('fcmToken', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {
      console.log('error noti', error)
    }
  }
}

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification
    )
  })

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification
        )
      }
    })

  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground', remoteMessage)
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
  })
}
