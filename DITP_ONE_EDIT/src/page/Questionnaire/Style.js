import {StyleSheet, Dimensions} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  ViewSub1: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  TextSub1: {
    fontSize: ViewScale(30),
    color: '#2d6dc4',
    // fontWeight: 'bold',
  },
  ViewSub2: {
    
    width: width * 1,
    alignItems: 'center',
    marginTop: ViewScale(20),
    height: '100%',
    alignSelf: 'center',
  },

  ViewSub3: {
    width: '99%',
    height: ViewScale(50),
    backgroundColor: '#2d6dc4',
    justifyContent: 'center',
  },

  TextSub2: {
    fontSize: ViewScale(22),
    color: '#ffffff',
  },

  ViewSub4: {
    width: (width * 95) / 100,
    height: null,
    backgroundColor: '#ffffff',
  },

  ViewSub5: {
    margin: ViewScale(20),
  },

  ViewSub6: {
    width: '100%',
    height: ViewScale(33),
    borderWidth: 1,
    borderRadius: ViewScale(18),
    borderColor: '#dadada',

    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub1: {
    width: ViewScale(14),
    height: ViewScale(14),
    left: ViewScale(10),
  },

  TextInputSub1: {
    fontSize: ViewScale(20),
    left: ViewScale(20),
    padding: ViewScale(0),
    color: '#000000',
    width:"80%",
  
  },
  marginTop10: {
    marginTop: ViewScale(10),
  },
  ImgSub2: {
    width: ViewScale(42),
    height: ViewScale(10),
  
  },
  marginTop20: {
    marginTop: ViewScale(30),
  },
  TocuhSub1: {
    width: width * 0.9,
    height: ViewScale(38),
    backgroundColor: '#2d6dc4',
    borderRadius: ViewScale(21.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextSub3: {
    fontSize: ViewScale(24),
    color: '#ffffff',
  },

  ViewSub7: {
    marginTop: ViewScale(15),
    marginBottom: ViewScale(30),
  },

  TocuhSub2: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextSub4: {
    fontSize: ViewScale(25),
    color: '#4b4b4b',
    textDecorationLine: 'underline',
  },

  ViewSub8: {
    width: (width * 95) / 100,
    // height: null,
    backgroundColor: '#ffffff',
    flex:1,
   
  },

  ViewSub9: {
    alignItems: 'center',
    marginTop: ViewScale(20),
    height: '100%',
    alignSelf: 'center',
  },
});
