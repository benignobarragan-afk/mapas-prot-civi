import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import { colors, styles } from '../styleSheet/StyleSheet'

import Carousel from 'react-native-snap-carousel'
import { Icon } from './Icon'

interface ItemProps {
  title: string
  text: string
}

interface RenderItemProps {
  item: ItemProps
  index: number
}

interface Zone {
  zone: number
  inZone: boolean
}

const exampleItems = [
  {
    title: 'Rojo',
    text: 'Text 1'
  },
  {
    title: 'Verde',
    text: 'Text 2'
  },
  {
    title: 'Azul',
    text: 'Text 3'
  },
  {
    title: 'Purpura',
    text: 'Text 4'
  },
  {
    title: 'Turquesa',
    text: 'Text 5'
  },
  {
    title: 'HCG',
    text: 'Text 5'
  }
]

interface CarouselProps {
  setNewRegion: (region: number) => void
  openModal: (index: number) => void
  isLocationinZone: Zone
}

export const Cards = ({
  setNewRegion,
  openModal,
  isLocationinZone
}: CarouselProps) => {
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>(exampleItems)
  const ref = useRef(null)

  useEffect(() => {
    ref?.current?.snapToItem(isLocationinZone.zone)
  }, [isLocationinZone.zone])

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          height: 130,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
          // marginLeft: 25,
          // marginRight: 25,
        }}
      >
        <View>
          <Text style={{ fontSize: 30, color: 'black' }}>{item.title}</Text>
          <Text style={{ color: 'black' }}>{item.text}</Text>
        </View>
        <View>
          <Pressable
            style={styles.btnAlert}
            onPress={() => {
              openModal(index)
            }}
          >
            <Text style={styles.textBtnAlert}>
              <Icon icon='flag' size={40} color='white' />
            </Text>
          </Pressable>
        </View>
      </View>
    )
  }, [])

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <Carousel
        layout={'default'}
        ref={ref}
        data={carouselItems}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={(index: number) => {
          setNewRegion(index)
        }}
      />
    </View>
  )
}
