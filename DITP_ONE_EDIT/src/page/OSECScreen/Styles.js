import {StyleSheet, Dimensions, Platform} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  View1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  View2: {
    flex: 0.9,
  },
  View3: {
    // width: '100%',
    // flex:1,
   
    marginHorizontal:ViewScale(10),
    // height:'100%',
    backgroundColor:'#FFFFFF',
    borderRadius:ViewScale(8),
  },
  View4: {
    width: '50%',
    alignItems: 'center',
  },
  TextView1: {
    fontSize: ViewScale(30),
    color: '#40536d',
  },
  View5: {
    alignItems: 'center',
    marginTop: ViewScale(10),
  },
  ViewH: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    padding: ViewScale(10),
    borderRadius: ViewScale(8),
  },
  TextView2: {
    fontSize: ViewScale(23),
    color: '#163c70',
  },
  View6: {
    width: '40%',
    alignItems: 'center',
    marginTop: ViewScale(10),
  },
  TextView3: {
    fontSize: ViewScale(23),
    color: '#163c70',
  },
  ViewalignItem: {
    alignItems: 'center',
  },
  View7: {
    width: '90%',
    height: ViewScale(40),
    borderRadius: ViewScale(18),
    borderColor: '#d6d6d6',
    borderWidth: 1,
    // justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  ViewRN: {
    fontSize: ViewScale(20),
    color: '#4b4b4b',
    marginLeft: ViewScale(10),
    width: '80%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
  },
  TextRN: {
    fontSize: ViewScale(23),
    color: '#4b4b4b',
    marginLeft: ViewScale(10),
    width: '80%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
  },

  View9: {
    width: '100%',
    height: Platform.OS ==='ios'?ViewScale(33):ViewScale(44),
    
    borderRadius: ViewScale(18),
    borderColor: '#d6d6d6',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
