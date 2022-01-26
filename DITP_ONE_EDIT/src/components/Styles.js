import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  Image,
} from 'react-native';

const Style = StyleSheet.create({
  Viewin: {
    flexDirection: 'row',
  },
  TextSupinput: {
    fontSize: 22,
    color: '#20416e',
  },
  ViewInput: {
    width: Dimensions.get('window').width * 0.8,
    height: 36,
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 21.5,
    borderColor: '#cad8e1',
    backgroundColor: '#FFFFFF',

    shadowColor: '#cad8e1',
    shadowOffset: {
      height: 0,
      width: 9,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  TextSupinput2: {
    fontSize: 22,
    color: '#fe2c2c',
  },
  TextInput: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#4b4b4b',
    marginLeft: 10,
    padding: 0,
  },
  ViewInput2: {
    width: Dimensions.get('window').width * 0.8,
    height: 120,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 21.5,
    borderColor: '#cad8e1',
    backgroundColor: '#FFFFFF',

    shadowColor: '#cad8e1',
    shadowOffset: {
      height: 0,
      width: 9,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  dropdownIcon: {
    marginRight: 10,
    top: Platform.OS === 'android' ? 16 : 3,
  },
  checkboxText: {
    fontSize: 20,
    fontFamily: 'PSL Kittithada Pro',
    fontWeight: 'normal',
  },
  checkIcon: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conCheckBok: {
    backgroundColor: '#fff0',
    borderColor: '#fff0',
  },
  checkTrue: {
    width: 10,
    height: 10,
  },
  checkFalse: {
    width: 20,
    height: 20,
  },
  ViewBox1: {
    width: Dimensions.get('window').width * 0.93,
    height: null,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    paddingBottom: 10,
  },
  Line: {
    borderWidth: 0.5,
    borderColor: '#e2e2e2',
    margin: 10,
  },
  smallIcon: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  ViewIcon: {
    flexDirection: 'row',
    flex: 0.5,
  },
});
