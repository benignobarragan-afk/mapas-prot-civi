import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'
import { Background } from '../components/Background'

export const colors = {
  primary: '#61dafb',
  backgroundColor: 'white'
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: 'black'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  label: {
    marginTop: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  inputField: {
    color: 'white',
    fontSize: 20
  },
  inputFieldDouble: {
    color: 'white',
    fontSize: 20,
    width: 165
  },
  inputFieldIOS: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4
  },
  inputFieldIOSDouble: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4,
    width: 160
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 50
  },
  btn: {
    alignItems: 'center',
    aspectRatio: 20 / 4,
    color: 'black',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#61dafb'
  },
  btnFloat: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  floatRight: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  floatLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    // height: 800,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backgroundColor: 'red'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 30,
    color: 'black'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  modalBody: {
    width: '100%',
    marginTop: 10
  },
  modalFooter: {
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: 'transparent',
    padding: 15
  },
  textbuttonClose: {
    color: 'black'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
  containerCard: {
    backgroundColor: 'transparent',
    bottom: 20,
    position: 'absolute',
    zIndex: 1,
    color: 'black'
  },
  btnAlert: {
    backgroundColor: 'red',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textBtnAlert: {
    color: 'white',
    fontSize: 40
  },
  input: {
    maxWidth: '100%',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    textAlignVertical: 'top',
    borderRadius: 10
  },
  btnSend: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 2,
    justifyContent: 'center',
    marginBottom: 10
  },
  btnSendText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20
  },
  containerLoggin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50
  },
  buttonReturn: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100
  },
  contDoubleInput: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainerDouble: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonDanger: {
    borderColor: 'red'
  },
  buttonTextDanger: {
    color: 'red'
  },
  safeArea: {
    flex: 1,
    padding: 20
  }
})
