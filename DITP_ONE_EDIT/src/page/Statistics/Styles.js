import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const width1 = Dimensions.get('window').width;
const height2 = Dimensions.get('window').height;
export default StyleSheet.create({
  ViewTab: {
    width: '100%',
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  TabStyle: {
    backgroundColor: '#e1e7eb',
    borderColor: '#e1e7eb',
    borderTopRightRadius: ViewScale(10),
    borderTopLeftRadius: ViewScale(10),
  },
  TabText: {
    color: '#73838f',
    fontSize: ViewScale(21),
    fontFamily: 'PSL Kittithada Pro',
  },
  fistTabStyle: {
    width: '100%',
    height: ViewScale(40),
    borderTopRightRadius: ViewScale(10),
    borderTopLeftRadius: ViewScale(10),
    
  },
  lastTabStyle: {
    borderTopRightRadius: ViewScale(10),
    borderTopLeftRadius: ViewScale(10),
  
  },
  backgroundTab: {
    backgroundColor: '#2d6dc4',
    
  },
  Tabcontainer: {
    // width: '100%',
    // height: '100%',
    // alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    // borderColor: '#ffffff',
    // borderRightColor: '#dadada40',
    // borderLeftColor: '#dadada40',
    // borderWidth: 3,
    // borderRadius: 1,
  },
  ViewSub1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  alignItemsCenter: {
    // alignItems: 'center',
  },
  ViewSub2: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // right: 25,
  },
  TextSub1: {
    color: '#014886',
    fontSize: ViewScale(20),
  },
  ImgSub1: {
    width: ViewScale(10),
    height: ViewScale(5),
    // top: 2,
  },
  marginLeft15: {
    marginLeft: ViewScale(10),
    marginRight: ViewScale(5),
  },
  ImgSub2: {
    width: ViewScale(2),
    height: ViewScale(23),
  },
  ViewSub3: {
    marginLeft: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewSub4: {
    alignItems: 'center',
    marginTop: ViewScale(5),
    flex: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  ViewSub5: {
    flex: 1,
    alignItems: 'center',
    // left: 48,
  },
  TextSub2: {
    fontSize: ViewScale(18),
    color: '#54a85e',
  },
  flexDirectionRowres: {
    flexDirection: 'row-reverse',
  },
  ViewSub6: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ViewScale(10),
    marginRight: ViewScale(10),
  },
  ImgSub3: {
    width: ViewScale(10),
    height: ViewScale(16),
  },
  IconArrow: {
    transform: [{ rotate: '180deg' }],
  },
  TextSub3: {
    fontSize: ViewScale(18),
    color: '#73838f',
  },
  ViewSub7: {
    width: '100%',
    height: ViewScale(40),
    backgroundColor: '#2d6dc4',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: ViewScale(5),
  },
  TextSub4: {
    fontSize: ViewScale(20),
    color: '#ffffff',
  },
  ViewSub8: {
    // flexDirection: 'row',
    flex: 0.50,
    // borderWidth:1
  },
  ViewSub9: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth:1,
    // height:28
  },
  ViewSub10: {
    width: '33%',
    height: null,
    backgroundColor: '#ebf3f7',
    borderRightWidth: 1,
    borderRightColor: '#014886',
    // padding: 10
  },
  ViewSub11: {
    width: '33%',
    height: ViewScale(37),
    backgroundColor: '#ebf3f7',
  },
  ViewSub12: {
    width: '33%',
    height: null,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#014886',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10
  },
  ViewSub13: {
    width: '35%',
    height: null,
    backgroundColor: '#ffffff',
    
  },
  ViewSub14: {
    width: '100%',
    height: ViewScale(37),
    backgroundColor: '#568ae0',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  ViewSub15: {
    // width: '100%',
    // flex:0.8,
    // height: 37,
    backgroundColor: '#ebf3f7',
    // alignItems: 'center',
    // flexDirection: 'row',
    // borderRightWidth: 1,
    // borderRightColor: '#014886',
  },
  TextSelec: {
    fontSize: Platform.OS === 'ios' ? ViewScale(23) : ViewScale(20),
    color: '#014886',
    marginLeft: ViewScale(10),
    width: '100%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    height: ViewScale(40),
    margin: ViewScale(10),
    // paddingRight: 30,
  },
  TextSelec1: {
    fontSize: Platform.OS === 'ios' ? ViewScale(23) : ViewScale(20),
    color: '#014886',
    marginLeft: ViewScale(10),
    width: '100%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    height: ViewScale(40),
    paddingRight: ViewScale(40),
    alignItems: 'center',
  },
});
