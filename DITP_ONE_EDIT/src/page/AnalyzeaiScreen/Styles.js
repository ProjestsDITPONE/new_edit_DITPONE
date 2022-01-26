import {StyleSheet, Dimensions} from 'react-native';
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
  Imagelogo: {width: 236, height: 175, alignSelf: 'center'},
  backgroundStar: {
    width: '100%',
    height: 145,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -30,
  },
  viewsubText: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  fontsub: {
    fontSize: 20,
    paddingTop: 10,
    color: '#FFFFFF',
  },
  TextInputseach1: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 10,
    backgroundColor: 'transparent',
    padding: 0,
    fontFamily: 'Mitr-Regular',
  },
  ViewSub2: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Image: {
    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    // marginLeft: 10,
    marginTop: 5,
  },
  StyeSelec: {
    backgroundColor: null,
    borderColor: 'transparent',
    paddingVertical: 10,
  },
  backgroundColor: {
    backgroundColor: '#f4f5f8',
  },
  fontSelec: {
    fontSize: 17,
    color: '#2d6dc4',
  },
  fontSelecP: {
    fontSize: 17,
    color: '#40536d',
    // textAlign: 'center',
    // left: Dimensions.get('window').width < 400 ? '-50%' : 0,
  },
  ArrowStyle: {
    backgroundColor: 'transparent',
    fontSize:17,
  

  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textActivityTitl: {
    fontSize: 12,
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
    fontSize: 10,
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
    marginTop: -2,
  },
  fromTouchableOpacity: {
    flex: 0.5,
    marginHorizontal: 10,
    height: 34,
    backgroundColor: '#2d6dc4',
    // flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
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
    fontSize: 20,
    textAlign: 'center',
  },
  viewivon4: {
    justifyContent: 'center',
    flex: 0.2,
  },

  inview1: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 35,
    borderRadius: 17,
    borderColor: '#2d6dc4',
  },
  inview2: {
    flex: 1,
    justifyContent: 'center',
  },
  inviewtext3: {
    color: '#2d6dc4',
    fontSize: 20,
    textAlign: 'center',
  },
  inviewicon4: {
    flex: 0.4,
    justifyContent: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // height: height * 0.3,
  },
});
