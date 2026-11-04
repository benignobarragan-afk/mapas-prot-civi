import React, { useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'

import { styles } from '../styleSheet/StyleSheet'

interface LatLng {
  latitude: Number
  longitude: Number
}

interface MapProps {
  mapRef: any
  latitude: number
  longitude: number
  region:
    | {
        latitude: number
        longitude: number
        latitudeDelta: number
        longitudeDelta: number
      }
    | undefined
  selectedLocationHandler: (event: any) => void
  areaCorrectHandler: (event: any, index: number) => void
  polygon: any | undefined
  mark: {
    latitude: number
    longitude: number
  }
  setDelta: (latitude: number, longitude: number) => void
}

export const Maps = ({
  mapRef,
  latitude,
  longitude,
  region,
  selectedLocationHandler,
  areaCorrectHandler,
  polygon,
  mark,
  setDelta
}: MapProps) => {
  let isInside = {
    latitude: 20.685288862326914,
    longitude: -103.33284800642346
  }
  useEffect(() => {}, [])

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      region={region}
      onPress={selectedLocationHandler}
      onRegionChangeComplete={event => {
        setDelta(event.latitudeDelta, event.longitudeDelta)
      }}
      showsUserLocation={true}
    >
      <Marker coordinate={mark} />

      <Polygon
        coordinates={polygon[0]}
        fillColor={'#ff000033'}
        onPress={event => areaCorrectHandler(event, 0)}
        tappable
      />
      <Polygon
        coordinates={polygon[1]}
        fillColor={'#33ff0033'}
        onPress={event => areaCorrectHandler(event, 1)}
        tappable
      />
      <Polygon
        coordinates={polygon[2]}
        fillColor={'#006eff33'}
        onPress={event => areaCorrectHandler(event, 2)}
        tappable
      />
      <Polygon
        coordinates={polygon[3]}
        fillColor={'#ff00f233'}
        onPress={event => areaCorrectHandler(event, 3)}
        tappable
      />
      <Polygon
        coordinates={polygon[4]}
        fillColor={'#00ffea33'}
        onPress={event => areaCorrectHandler(event, 4)}
        tappable
      />

      <Polygon
        coordinates={polygon[5]}
        fillColor={'#00ffea33'}
        onPress={event => areaCorrectHandler(event, 5)}
        tappable
      />
    </MapView>
  )
}
