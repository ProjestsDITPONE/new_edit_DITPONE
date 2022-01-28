import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
import {ViewScale} from '../../config/ViewScale'
export default StyleSheet.create({
  ImgBackground: {
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  ViewSub1: {
    flex: 0.98,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgSub1: {
    width:ViewScale(174),
    height:ViewScale(235),
  },
  ViewSub2: {
    flex: 0.5,
    justifyContent: 'center',
  },
  ImgBackground2: {
    // width: 300,
    width:ViewScale(width ),
    height:ViewScale(120),
    // resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub1: {
    fontSize:ViewScale(30),
    color: '#20416E',
  },
  TocuhSub1: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
  },
  ImgSub2: {
    width: 24,
    height: 24,
  },
  TextSub2: {
    fontSize:ViewScale(27),
    color: '#819eb0',
    textDecorationLine: 'underline',
    marginTop: -2,
  },
  ViewSub3: {
    flex: 1,
    flexDirection: 'row-reverse',
    bottom: 5,
    right: 5,
  },
  ImgSub3: {
    width:ViewScale(110),
    height:ViewScale(30),
  },
  ViewSub4: {
    // width: '50%',
    // flex: 1,
    // alignItems: 'center',
    flex: 1
  },
  ViewSub5: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgSub4: {
    width: 106,
    height: 145,
  },
  marginTop10: {
    marginTop: 10,
  },
  fontSub1: {
    fontSize: 50,
    color: '#2d6dc4',
  },
  paddingTop30: {
    paddingTop: 30,
  },
  fontSub2: {
    fontSize: 24,
    color: '#2d6dc4',
  },
  ImgBackground3: {
    width: '100%',
    height: 48,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  ImgSub5: {
    width: 16,
    height: 16,
    marginLeft: 20,
  },
  TextInputSub1: {
    fontSize: 24,
    marginLeft: 10,
    flex: 1,
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    width: '70%',
    padding: 0
  },
  TextSub3: {
    fontSize: 24,
    color: '#2d6dc4',
  },
  ImgBackground4: {
    width: 354,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub6: {
    width: 15,
    height: 20,
    marginLeft: 20,

  },
  TextInputSub2: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    color: '#000000',
  },
  ViewSub6: {
    flexDirection: 'row-reverse',
    marginTop: 10,
  },
  TextSub4: {
    fontSize: 24,
    color: '#cad8e1',
    textDecorationLine: 'underline',
  },
  ImgBackground5: {
    width: 354,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub5: {
    fontSize: 25,
    color: '#2d6dc4',
  },
  PopupCancel: {
    width: 127,
    height: 34,
    backgroundColor: '#ffffff',
    borderRadius: 21.5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 40,
    borderColor: '#2d6dc4',
    borderWidth: 2,
    marginLeft: 10,
  },
  PopupSend: {
    width: 127,
    height: 34,
    backgroundColor: '#2d6dc4',
    borderRadius: 21.5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 10,
  },
});
