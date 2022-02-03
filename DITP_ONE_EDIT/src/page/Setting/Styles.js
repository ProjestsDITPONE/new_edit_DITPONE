import {StyleSheet, Dimensions, Platform} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
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
    marginTop: ViewScale(20),
    alignSelf: 'center',
    padding: ViewScale(10),
  },
  ViewSub10: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  TextSub1: {
    fontSize: ViewScale(16),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub4: {
    flexDirection: 'row-reverse',
    flex: 0.95,
  },
  ViewSub5: {
    marginTop: ViewScale(35),
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  Imgsub1: {
    width: ViewScale(25),
    height: ViewScale(25),
  },
  ViewSub6: {
    alignContent: 'center',
    alignItems: 'center',
  },

  //Unsubscribe
  SafeArea2: {
    height: '100%',
    padding: ViewScale(10),
    backgroundColor: '#FFFFFF',
  },
  margin10: {
    marginLeft: ViewScale(10),
  },
  margin15: {
    marginTop: ViewScale(15),
  },
  marginTop20: {
    marginTop: ViewScale(20),
  },
  TextSub2: {
    fontSize: ViewScale(25),
    color: '#40536d',
  },
  TextSub3: {
    fontSize: ViewScale(20),
    color: '#40536d',
  },
  TextSub4: {
    fontSize: ViewScale(25),
    color: '#FFFFFF',
  },
  alignItemsCenter: {
    // alignItems: 'center',
  },
  ViewSub7: {
    marginTop: ViewScale(5),
    width: '100%',
    height: ViewScale(42),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: ViewScale(21.5),
    justifyContent: 'center',
  },
  ViewSub8: {
    marginTop: ViewScale(5),
    width: '100%',
    height: ViewScale(190),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: ViewScale(5),
  },
  ViewSub9: {
    marginTop: Platform.OS === 'android' ? ViewScale(20) : ViewScale(10),
    marginBottom: Platform.OS === 'android' ? ViewScale(10) : ViewScale(20),
    alignContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column-reverse',
    // justifyContent: 'center',
    // flex: 1,
  },
  TextinputSub1: {
    fontSize: ViewScale(20),
    color: '#4d4d4d',
    marginLeft: ViewScale(20),
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    padding: 0,
  },
  TextinputSub2: {
    fontSize: ViewScale(20),
    color: '#4d4d4d',
    marginLeft: ViewScale(20),
    marginTop: ViewScale(10),
  },
  TouchSub1: {
    width: '100%',
    height: ViewScale(48),
    backgroundColor: '#2d6dc4',
    borderRadius: ViewScale(21.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchSub5: {
    width: '90%',
    height: ViewScale(48),
    backgroundColor: '#dadada',
    borderRadius: ViewScale(21.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingTop20: {
    paddingTop: ViewScale(20),
  },
  TouchSub2: {
    width: ViewScale(150),
    height: ViewScale(35),
    borderWidth: 2,
    borderColor: '#2d6dc4',
    borderRadius: ViewScale(21.5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Imgsub2: {
    width: ViewScale(17),
    height: ViewScale(16),
  },
  TextSub5: {
    fontSize: ViewScale(24),
    color: '#2d6dc4',
    fontFamily: 'Kittithada Bold 75',
  },

  color: {
    color: '#000000',
  },
  fontSize: {
    fontSize: ViewScale(21),
    // fontWeight: 'normal',
    // fontFamily: 'Kittithada Bold 75',
    fontFamily: 'Kittithada Bold 75',
  },
});
