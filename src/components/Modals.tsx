import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native'
import { styles } from '../styleSheet/StyleSheet'
import DropDownPicker from 'react-native-dropdown-picker'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from './Icon'

import socket from '../sockets/Sockets'

interface ModalProps {
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  descrip: string
  report: any
  setReport: (report: any) => void
  onChange: (value: string, field: any) => void
  sendReport: () => void
}

export const Modals = ({
  modalVisible,
  setModalVisible,
  descrip,
  report,
  setReport,
  onChange,
  sendReport
}: ModalProps) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    { label: 'Problema 1', value: 1 },
    { label: 'Problema 2', value: 2 },
    { label: 'Problema 3', value: 3 },
    { label: 'Problema 4', value: 4 },
    { label: 'Problema 5', value: 5 }
  ])

  const handleSend = () => {
    console.log('Enviando')
    socket.emit('send-message', { message: 'Hola' }, (payload: any) => {
      if (payload.status === 200) {
        Alert.alert('Se envio el mensaje')
        setModalVisible(!modalVisible)
      }
    })
  }
  return (
    <View style={styles.modal}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <Pressable
          style={styles.centeredView}
          // onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reportar problema</Text>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textbuttonClose}>
                  <Icon
                    icon='times'
                    size={20}
                    color={styles.btnSendText.color}
                  />
                </Text>
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <DropDownPicker
                placeholder='Selecciona un tipo problema'
                open={open}
                value={report}
                items={items}
                setOpen={setOpen}
                setValue={setReport}
                setItems={setItems}
              />
              <TextInput
                placeholder='Descripción del problema'
                placeholderTextColor={styles.input.color}
                onChangeText={value => onChange(value, 'descrip')}
                value={descrip}
                style={styles.input}
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.btnSend} onPress={sendReport}>
                <Text style={styles.btnSendText}>
                  Enviar
                  <Icon
                    icon='paper-plane'
                    size={20}
                    color={styles.btnSendText.color}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
