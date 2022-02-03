import {StyleSheet, Dimensions} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  view: {
    flex: 1,
  },
  Imagelogo: {width: ViewScale(236), height: ViewScale(175), alignSelf: 'center'},
  backgroundStar: {
    width: '100%',
    height: ViewScale(145),
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'absolute',
    bottom: ViewScale(-30),
  },
  viewsubText: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  fontsub: {
    fontSize: ViewScale(20),
    paddingTop: ViewScale(10),
    color: '#FFFFFF',
  },
  TextInputseach1: {
    fontSize: ViewScale(14),
    color: '#999999',
    marginLeft: ViewScale(10),
    backgroundColor: 'transparent',
    padding: 0,
    fontFamily: 'Mitr-Regular',
  },
  ViewSub2: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ViewScale(10),
  },
  Image: {
    width: ViewScale((22)),
    height: ViewScale(22),
    backgroundColor: 'transparent',
    // marginLeft: 10,
    marginTop: ViewScale(5),
  },
  StyeSelec: {
    backgroundColor: null,
    borderColor: 'transparent',
    paddingVertical: ViewScale(10),
  },
  backgroundColor: {
    backgroundColor: '#f4f5f8',
  },
  fontSelec: {
    fontSize: ViewScale(17),
    color: '#2d6dc4',
  },
  fontSelecP: {
    fontSize: ViewScale(17),
    color: '#40536d',
    // textAlign: 'center',
    // left: Dimensions.get('window').width < 400 ? '-50%' : 0,
  },
  ArrowStyle: {
    backgroundColor: 'transparent',
    fontSize:ViewScale(17),
  

  },
  separator: {
    height: ViewScale(0.5),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textActivityTitl: {
    fontSize: ViewScale(12),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Medium',
  },
  ViewSub10: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // bottom: 10,
  },
  textreaddetail: {
    fontSize: ViewScale(12),
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
    marginTop: ViewScale(-2),
  },
  fromTouchableOpacity: {
    flex: 0.5,
    marginHorizontal: ViewScale(10),
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    // flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: ViewScale(8),
    // borderWidth:1
  },
  view1: {
    flexDirection: 'row',
    flex: 1,
  },
  view2: {
    flex: 1,
    justifyContent: 'center',
  },
  viewtext3: {
    color: '#FFFFFF',
    fontSize: ViewScale(20),
    textAlign: 'center',
  },
  viewivon4: {
    justifyContent: 'center',
    flex: 0.2,
  },

  inview1: {
    flexDirection: 'row',
    borderWidth: 1,
    height: ViewScale(35),
    borderRadius: ViewScale(17),
    borderColor: '#2d6dc4',
  },
  inview2: {
    flex: 1,
    justifyContent: 'center',
  },
  inviewtext3: {
    color: '#2d6dc4',
    fontSize: ViewScale(20),
    textAlign: 'center',
  },
  inviewicon4: {
    flex: 0.4,
    justifyContent: 'center',
  },
  footer: {
    padding: ViewScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // height: height * 0.3,
  },
});
