import React, { useEffect, useState, useRef, useCallback } from 'react'
import { View, Text, Modal, Pressable, Alert } from 'react-native'
// import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions'
import { Cards } from '../components/Cards'
import { Maps } from '../components/Maps'
import { Modals } from '../components/Modals'
import { styles } from '../styleSheet/StyleSheet'
import * as geolib from 'geolib'
import Geolocation from '@react-native-community/geolocation'
import { useSetState } from '../hooks/useSetState'
import { useForm } from '../hooks/useForm'
import mobileApi from '../api/mobileApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const latitude = 20.68796
const longitude = -103.3312

const poly1 = [
  { latitude: 20.686198, longitude: -103.332564 }, // 1
  { latitude: 20.68665, longitude: -103.332366 }, // 2
  { latitude: 20.686826, longitude: -103.332798 }, // 3
  { latitude: 20.687151, longitude: -103.332649 }, // 4
  { latitude: 20.687227, longitude: -103.332832 }, // 5
  { latitude: 20.687425, longitude: -103.332733 }, // 6
  { latitude: 20.687603, longitude: -103.333119 }, // 7
  { latitude: 20.687372, longitude: -103.333622 }, // 8
  { latitude: 20.686908, longitude: -103.333534 }, // 9
  { latitude: 20.686945, longitude: -103.333195 }, // 10
  { latitude: 20.686392, longitude: -103.333114 } // 11
]

const poly2 = [
  { latitude: 20.685656, longitude: -103.333957 }, // 1
  { latitude: 20.685141, longitude: -103.333519 }, // 2
  { latitude: 20.684698, longitude: -103.333136 }, // 3
  { latitude: 20.68471, longitude: -103.332839 }, // 4
  { latitude: 20.685199, longitude: -103.332288 }, // 5
  { latitude: 20.68563, longitude: -103.331794 }, // 6 esquina inferior derecha
  { latitude: 20.685822, longitude: -103.332217 }, // 7
  { latitude: 20.685945, longitude: -103.332526 }, // 8
  { latitude: 20.686054, longitude: -103.332599 }, // 9
  { latitude: 20.68611, longitude: -103.332851 }, // 10
  { latitude: 20.685914, longitude: -103.33282 }, // 11
  { latitude: 20.685924, longitude: -103.332946 }, // 12
  { latitude: 20.685693, longitude: -103.332932 } // 13
]

const poly3 = [
  { latitude: 20.686529, longitude: -103.330803 }, // 1
  { latitude: 20.686728, longitude: -103.331018 }, // 2
  { latitude: 20.686916, longitude: -103.331601 }, // 3
  { latitude: 20.686782, longitude: -103.331658 }, // 4
  { latitude: 20.687151, longitude: -103.332649 }, // 5
  { latitude: 20.686826, longitude: -103.332798 }, // 6
  { latitude: 20.68665, longitude: -103.332366 }, // 7
  { latitude: 20.686198, longitude: -103.332564 }, // 8
  { latitude: 20.686308, longitude: -103.332878 }, // 9
  { latitude: 20.68611, longitude: -103.332851 }, // 10
  { latitude: 20.686054, longitude: -103.332599 }, // 11
  { latitude: 20.685945, longitude: -103.332526 }, // 12 por acomodar
  { latitude: 20.68563, longitude: -103.331794 }, // 13
  { latitude: 20.686066, longitude: -103.331326 } // 14
]

const poly4 = [
  { latitude: 20.687666, longitude: -103.329629 }, // 1
  { latitude: 20.687549, longitude: -103.329688 }, // 2
  { latitude: 20.687074, longitude: -103.330208 }, // 3
  { latitude: 20.686529, longitude: -103.330803 }, // 4
  { latitude: 20.686728, longitude: -103.331018 }, // 5
  { latitude: 20.686916, longitude: -103.331601 }, // 6
  { latitude: 20.687206, longitude: -103.331485 }, // 7
  { latitude: 20.687371, longitude: -103.331974 }, // 8
  { latitude: 20.687743, longitude: -103.331688 }, // 9
  { latitude: 20.687716, longitude: -103.331224 }, // 10
  { latitude: 20.68789, longitude: -103.331214 }, // 11
  { latitude: 20.68785, longitude: -103.330059 } // 12
]

const poly5 = [
  { latitude: 20.688707, longitude: -103.331977 }, // 1
  { latitude: 20.688939, longitude: -103.331591 }, // 2
  { latitude: 20.688522, longitude: -103.33103 }, // 3
  { latitude: 20.688665, longitude: -103.330923 }, // 4
  { latitude: 20.688491, longitude: -103.330631 }, // 5
  { latitude: 20.688547, longitude: -103.330595 }, // 6
  { latitude: 20.688249, longitude: -103.330131 }, // 7
  { latitude: 20.688057, longitude: -103.330265 }, // 8
  { latitude: 20.68785, longitude: -103.330059 }, // 9
  { latitude: 20.68789, longitude: -103.331214 }, // 10
  { latitude: 20.687716, longitude: -103.331224 }, // 11
  { latitude: 20.687743, longitude: -103.331688 }, // 12
  { latitude: 20.688035, longitude: -103.331559 }, // 13
  { latitude: 20.688394, longitude: -103.332 }, // 14
  { latitude: 20.688514, longitude: -103.33191 } // 15
]

const poly6 = [
  { latitude: 20.685656, longitude: -103.333957 }, // 1
  { latitude: 20.685693, longitude: -103.332932 }, // 13
  { latitude: 20.685924, longitude: -103.332946 }, // 12
  { latitude: 20.685914, longitude: -103.33282 }, // 11
  { latitude: 20.686308, longitude: -103.332878 }, // 9
  { latitude: 20.686392, longitude: -103.333114 }, // 11
  { latitude: 20.686945, longitude: -103.333195 }, // 10
  { latitude: 20.686908, longitude: -103.333534 }, // 9
  { latitude: 20.687372, longitude: -103.333622 } // 8
]

const Polygons = [poly1, poly2, poly3, poly4, poly5, poly6]

const Cordinates = [
  {
    latitude: 20.68725,
    longitude: -103.33302
  },
  {
    latitude: 20.68539,
    longitude: -103.33289
  },
  {
    latitude: 20.68654,
    longitude: -103.33169
  },
  {
    latitude: 20.68745,
    longitude: -103.33078
  },
  {
    latitude: 20.68849,
    longitude: -103.33121
  },
  {
    latitude: 20.686090233584935,
    longitude: -103.33316133354732
  }
]

interface Zone {
  zone: number
  inZone: boolean
}

interface deltaZone {
  latitudeDelta: number
  longitudeDelta: number
}

interface StateCoords {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export const TabHome = () => {
  const mapRef = useRef(null)
  const [region, setRegion] = useState<StateCoords>()
  const [modalVisible, setModalVisible] = useState(false)
  const [coords, setCoords, getCoords] = useSetState({
    latitude: 20.68725,
    longitude: -103.33302
  })
  const [report, setReport, getReport] = useSetState({
    report: 0
  })
  const [CurrentCoords, setCurrentCoords, getCurrentCoords] = useSetState({
    latitude: 1,
    longitude: -1
  })
  const [deltaZone, setDeltaZone] = useState<deltaZone>({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  })
  const [isLocationinZone, setLocationInZone, getLocationInZone] = useSetState({
    zone: 0,
    inZone: true
  })

  const { descrip, onChange } = useForm({
    descrip: ''
  })

  const setNewRegion = async (key: number) => {
    setRegion({
      ...Cordinates[key],
      latitudeDelta: deltaZone.latitudeDelta,
      longitudeDelta: deltaZone.longitudeDelta
    })
    setCoords({
      ...Cordinates[key]
    })
  }

  const setDelta = (latitude: number, longitude: number) => {
    setDeltaZone({
      latitudeDelta: latitude,
      longitudeDelta: longitude
    })
  }

  const openModal = async (key: number) => {
    // let current = geolib.getcur

    let coords = await getCoords()

    let lat = coords?.latitude
    let long = coords?.longitude
    let visit = false

    Polygons.map((element, index) => {
      let isInside = geolib.isPointInPolygon(
        { latitude: lat, longitude: long },
        element
      )

      if (isInside) {
        visit = true
        setModalVisible(true)
      }
    })
    if (!visit) {
      Alert.alert('Selecciona una zona valida')
    }
  }

  const sendReport = async () => {
    let zona = await getLocationInZone()
    let rep = await getReport()
    let user_coords = await getCurrentCoords()
    let coords = await getCoords()
    let user = await AsyncStorage.getItem('user')
    let id = ''
    let jsonuser = {
      id: ''
    }
    let data = {}
    if (user) {
      jsonuser = await JSON.parse(user)
      id = user ? (jsonuser.id ? jsonuser.id : '') : ''
    }

    data = {
      id_zona: zona.zone,
      descrip: descrip,
      id_user: id,
      tipo_repo: rep,
      lat: coords.latitude,
      long: coords.longitude,
      lat_user: user_coords.latitude,
      long_user: user_coords.longitude
    }

    await mobileApi.post('/api/mobile/reports', data).then(res => {
      setModalVisible(false)
    })
  }

  const selectedLocationHandler = (event: any) => {
    try {
      setCoords({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude
      })
      setLocationInZone({
        zone: isLocationinZone.zone,
        inZone: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  const areaCorrectHandler = (event: any, index: number) => {
    let lat = event.nativeEvent.coordinate.latitude
    let long = event.nativeEvent.coordinate.longitude

    setCoords({
      latitude: lat,
      longitude: long
    })

    Polygons.map((element, index) => {
      let isInside = geolib.isPointInPolygon(
        { latitude: lat, longitude: long },
        element
      )

      if (isInside) {
        setLocationInZone({ zone: index, inZone: isInside })
      }
    })
  }

  useEffect(() => {
    console.log('TabHome')

    // let bol = geolib.isPointInPolygon(isInside, polygon[1])
    let lat = 0
    let long = 0
    Geolocation.getCurrentPosition(info => {
      lat = info.coords.latitude
      long = info.coords.longitude

      setCurrentCoords({
        latitude: lat,
        longitude: long
      })
      Polygons.map((element, index) => {
        let isInside = geolib.isPointInPolygon(
          { latitude: lat, longitude: long },
          element
        )

        if (isInside) {
          setCoords({
            latitude: lat,
            longitude: long
          })
          setLocationInZone({ zone: index, inZone: isInside })
        }
      })
    })

    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          // console.log(
          //   'This feature is not available (on this device / in this context)'
          // )
          break
        case RESULTS.DENIED:
          await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          // console.log(
          //   'The permission has not been requested / is denied but requestable'
          // )
          break
        case RESULTS.LIMITED:
          // console.log('The permission is limited: some actions are possible')
          break
        case RESULTS.GRANTED:
          // console.log('The permission is granted')
          break
        case RESULTS.BLOCKED:
          // console.log('The permission is denied and not requestable anymore')
          break
      }
    })
  }, [])

  return (
    <View style={styles.containerMap}>
      <Maps
        mapRef={mapRef}
        latitude={latitude}
        longitude={longitude}
        region={region}
        selectedLocationHandler={selectedLocationHandler}
        areaCorrectHandler={areaCorrectHandler}
        polygon={Polygons}
        mark={coords}
        setDelta={setDelta}
      />

      <View style={styles.containerCard}>
        <Cards
          setNewRegion={setNewRegion}
          openModal={openModal}
          isLocationinZone={isLocationinZone}
        />
      </View>

      <Modals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        descrip={descrip}
        report={report}
        setReport={setReport}
        onChange={onChange}
        sendReport={sendReport}
      />
    </View>
  )
}
