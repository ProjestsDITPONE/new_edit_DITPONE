import {StyleSheet, Dimensions} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
export default StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ViewSub1: {
    width: '60%',
    height: ViewScale(25),
    backgroundColor: '#f96145',
    alignItems: 'center',
    borderTopRightRadius: ViewScale(12.5),
    borderBottomRightRadius: ViewScale(12.5),
    flexDirection: 'row',
  },
  Img1: {
    width: ViewScale(12),
    height: ViewScale(15),
    marginLeft: ViewScale(20),
  },
  TextSub1: {
    color: '#4b4b4b',
    fontSize: ViewScale(18),
    fontFamily: 'Kittithada Bold 75',
  },
  ViewSub2: {
    alignItems: 'center',
    marginTop: ViewScale(10),
  },
  ViewSub3: {
    width: '95%',
    height: null,
    backgroundColor: '#f8fbfd',
    alignItems: 'center',
    marginBottom: ViewScale(30),
  },
  ViewSub4: {
    flexDirection: 'row',
  },
  textSub3: {
    fontSize: ViewScale(20),
    color: '#40536d',
  },
  textSub4: {
    fontSize: ViewScale(20),
    color: '#2d6dc4',
  },
  ViewSub5: {
    width: '80%',

    flexDirection: 'row-reverse',
  },
  ViewSub6: {
    // alignSelf: 'center',
    flexDirection: 'row',
    // flex: 1,
  },
  ViewSub7: {
    width: '90%',

    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  ViewSub8: {
    width: '20%',
    // backgroundColor: 'green',
  },
  ViewSub9: {
    width: '10%',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  ViewSub10: {
    flexDirection: 'row',
    width: '50%',
    // backgroundColor: 'red',
  },
  ViewSub11: {
    width: '60%',
    height: ViewScale(23),
    backgroundColor: '#ffffff',
    // margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ViewScale(18),
    justifyContent: 'center',
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    
  },
  ViewSub12: {
    // alignItems: 'center',
    width: '100%',
   
  },
  Img2: {
    width: ViewScale(10),
    height: ViewScale(15),
  },
  ViewFont1: {
    fontSize: ViewScale(18),
    color: '#40536d',
    fontFamily: 'Kittithada Bold 75',
  },
  ViewSub13: {
    marginTop: ViewScale(10),
    width: '33%',
    alignItems: 'center',

    height: '100%',
  },
  textSub5: {
    fontSize: ViewScale(20),
    color: '#40536d',
  },
});
