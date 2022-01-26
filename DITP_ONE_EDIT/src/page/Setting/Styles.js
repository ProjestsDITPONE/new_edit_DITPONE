import {StyleSheet, Dimensions, Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
  SafeArea: {
    // flex: 1,
    backgroundColor: 'transparent',
  },
  ViewSub1: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewSub2: {
    width: '90%',
    height: null,
    backgroundColor: '#FFFFFF',
  },
  ViewSub3: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  ViewSub10: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  TextSub1: {
    fontSize: 16,
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub4: {
    flexDirection: 'row-reverse',
    flex: 0.95,
  },
  ViewSub5: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  Imgsub1: {
    width: 25,
    height: 25,
  },
  ViewSub6: {
    alignContent: 'center',
    alignItems: 'center',
  },

  //Unsubscribe
  SafeArea2: {
    height: '100%',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  margin10: {
    marginLeft: 10,
  },
  margin15: {
    marginTop: 15,
  },
  marginTop20: {
    marginTop: 20,
  },
  TextSub2: {
    fontSize: 25,
    color: '#40536d',
  },
  TextSub3: {
    fontSize: 20,
    color: '#40536d',
  },
  TextSub4: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  alignItemsCenter: {
    // alignItems: 'center',
  },
  ViewSub7: {
    marginTop: 5,
    width: '100%',
    height: 42,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    justifyContent: 'center',
  },
  ViewSub8: {
    marginTop: 5,
    width: '100%',
    height: 190,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 5,
  },
  ViewSub9: {
    marginTop: Platform.OS === 'android' ? 20 : 10,
    marginBottom: Platform.OS === 'android' ? 10 : 20,
    alignContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column-reverse',
    // justifyContent: 'center',
    // flex: 1,
  },
  TextinputSub1: {
    fontSize: 20,
    color: '#4d4d4d',
    marginLeft: 20,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    padding: 0,
  },
  TextinputSub2: {
    fontSize: 20,
    color: '#4d4d4d',
    marginLeft: 20,
    marginTop: 10,
  },
  TouchSub1: {
    width: '100%',
    height: 48,
    backgroundColor: '#2d6dc4',
    borderRadius: 21.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchSub5: {
    width: '90%',
    height: 48,
    backgroundColor: '#dadada',
    borderRadius: 21.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingTop20: {
    paddingTop: 20,
  },
  TouchSub2: {
    width: 150,
    height: 35,
    borderWidth: 2,
    borderColor: '#2d6dc4',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Imgsub2: {
    width: 17,
    height: 16,
  },
  TextSub5: {
    fontSize: 24,
    color: '#2d6dc4',
    fontFamily: 'Kittithada Bold 75',
  },

  color: {
    color: '#000000',
  },
  fontSize: {
    fontSize: 21,
    // fontWeight: 'normal',
    // fontFamily: 'Kittithada Bold 75',
    fontFamily: 'Kittithada Bold 75',
  },
});
