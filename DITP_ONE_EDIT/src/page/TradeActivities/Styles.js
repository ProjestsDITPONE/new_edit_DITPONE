import {StyleSheet, Dimensions, Platform} from 'react-native';
import {ViewScale} from '../../config/ViewScale';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const width1 = Dimensions.get('screen').width;
const height1 = Dimensions.get('screen').height;
var aspectRatio = '55%';
if (height / width > 1.6) {
  //iphone
  aspectRatio = '45%';
}
export default StyleSheet.create({
  ViewSub1: {
    backgroundColor: '#FFFFFF',
    // flex: 1,
  },
  ViewSub2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  ViewSub3: {
    flexDirection: 'row-reverse',
  },

  TextSub1: {
    fontSize: 26,
    color: '#40536d',
    fontFamily: 'Kittithada Bold 75',
  },
  TextSub2: {
    fontSize: ViewScale(14),
    color: '#40536d',
    fontFamily: 'Mitr-Regular',
  },
  ImgSub1: {
    width: ViewScale(69),
    height: ViewScale(30),
  },
  marginLeft10: {
    marginLeft: 10,
  },
  ViewSub4: {
    width: 243,
    height: 141,
  },
  ViewSub5: {
    alignItems: 'center',
  },
  ImgSub2: {
    width: 25,
    height: 25,
  },
  TextSub3: {
    fontSize: ViewScale(12),
    color: '#94adbd',
    fontFamily: 'Pridi-Medium',
  },
  ViewSub6: {
    width: '90%',
    height: null,
    flexDirection: 'row',
  },
  TextSub4: {
    fontSize: ViewScale(14),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  textContry1: {
    color: '#94adbd',
    fontFamily: 'Pridi-Medium',
    fontSize: ViewScale(12),
  },
  ViewSub7: {},
  ViewSub8: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub3: {
    width: ViewScale(20),
    height: ViewScale(13),
  },
  ImgBackgroungSub1: {
    width: ViewScale(25),
    height: ViewScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub5: {
    fontSize: ViewScale(14),
    color: '#FFFFFF',
  },
  ScrollTabStyle: {
    backgroundColor: '#FFFFFF',
  },
  tabbarTextStyle: {
    fontSize: ViewScale(23),
    fontFamily: 'Kittithada Bold 75',
  },
  tabunderLine: {
    width: 50,
    height: 3,
    marginLeft: 20,
    backgroundColor: '#40536d',
  },
  ScrollViewTabBar: {
    borderColor: 'transparent',
    marginBottom: 10,
  },
  ViewTab1: {
    flex: 1,
    backgroundColor: '#FFFFFF50',

    alignSelf: 'center',
    marginBottom: 25,
  },
  ViewTab11: {
    width: '93%',
    alignSelf: 'center',
    marginRight: 10,
  },
  Image: {
    width: ViewScale(20),
    height: ViewScale(20),
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  TextInputseach1: {
    fontSize: ViewScale(15),
    color: '#999999',
    marginLeft: 10,
    backgroundColor: 'transparent',
    padding: Platform.OS === 'ios' ? 5 : 3,
    left: Platform.OS === 'ios' ? 0 : 1,
    width: '90%',
    fontFamily: 'Mitr-Regular',
  },
  flastListtab1: {
    // flex: 1,
    zIndex: -1,
    top: 10,
    // flexDirection:'column'
  },
  ViewImgList: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgStyle: {
    width: 9,
    height: 12,
    marginHorizontal: 4,
  },
  TouchRead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
  },
  ImgTouchRead: {
    width: 17,
    height: 13,
  },
  ViewTab2: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    marginTop: 5,
  },
  Overlay: {
    backgroundColor: 'transparent',
  },
  ViewOverlay: {
    width: 358,
    height: 264,
    backgroundColor: '#FFFFFF',
  },
  OverlayView1: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    position: 'absolute',
    padding: 15,
    right: -20,
    top: -55,
  },
  ImgClose: {
    width: ViewScale(28),
    height: ViewScale(28),
  },
  OverlayView2: {
    width: width1 - 50,
    height: null,
  },

  OverlayView3: {},

  ImgActivity: {
    width: 350,
    height: 268,
  },
  flastListContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    // marginTop:10
  },
  TouchSub1: {
    marginTop: 10,
    width: ViewScale(163),
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchSub6: {
    marginTop: 10,
    width: ViewScale(163),
    height: ViewScale(34),
    backgroundColor: '#787878',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewSub9: {
    width: '100%',
  },

  ViewSub10: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    left: -10,
  },
  TouchSub2: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 130,
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: 8,
    margin: 7,
    flex: 1,
    paddingHorizontal: 5,
  },
  TouchSub5: {
    justifyContent: 'center',
    alignItems: 'center',

    // width: 130,
    height: ViewScale(34),
    backgroundColor: '#787878',
    borderRadius: 8,
    margin: 7,
    flex: 1,
    paddingHorizontal: 5,
  },
  checkIcon: {
    width: 15,
    height: 15,
  },
  OverlayHight: {
    height: height * 0.78,
  },
  OverlayHight1: {
    height: height * 0.12,
  },
  themeoverlay: {
    borderWidth: 2,
    borderColor: '#2d6dc4',
    backgroundColor: '#2d6dc4',
    // top: height * 0.001,
    top: -70,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.0)',

    borderColor: '#ffffff',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // borderWidth:1,
    // flex:1
    
  },
  ViewSub11: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,

    borderColor: '#dadada',
  },
  heightTiltle: {
    width: aspectRatio,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  ViewSub12: {
    flex: 1,
    bottom: 20,
  },
  ViewSub13: {
    marginTop: 5,
    width: '90%',
    height: 35,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop10: {
    marginTop: 10,
  },
  flex1: {
    flex: 1,
  },
  ImageBackgroundStyle: {
    height: null,
    width: '110%',
    marginLeft: '-5%',
  },
  ViewSub14: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  ImgSub4: {
    width: 60,
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00000010',
  },
  ViewSub15: {
    marginTop: Platform.OS === 'ios' ? 1 : 8,
    alignItems: 'center',
    width: '100%',
  },
  TextSub6: {
    fontSize: 15,
    color: '#6f819a',
    textAlign: 'center',
  },
  ViewSub16: {
    // left: 25,
    // flex: 1,
    // position: 'relative',
    // top: 5,
  },
  TextSub7: {
    fontSize: 19,
    color: '#4b4b4b',
    fontFamily: 'Kittithada Bold 75',
  },
  TextSub8: {
    fontSize: 16,
    color: '#6f819a',
  },
  TextSub9: {
    fontSize: 20,
    color: '#7fadec',
    fontFamily: 'Kittithada Bold 75',
  },
  ViewSub17: {
    bottom: 20,
    // marginLeft: 10,
    left: 20,
  },
  ViewSubOver: {
    backgroundColor: Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
    opacity: Platform.OS === 'android' ? 0.5 : 0.8,
  },
  ViewSub18: {
    marginTop: 13,
    alignItems: 'center',
  },
  TextSub10: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  ViewTextInput: {
    marginTop: 5,
    width: '35%',
    height: 35,
    backgroundColor: '#FFFFFF',
    // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 5,
  },
  ViewTextInput2: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 5,
    // marginRight:25
  },
  // css searchadvaced Data

  GrouopViewSearchAD: {
    marginTop: 3,
    width: '50%',
    height: 35,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    // marginLeft: 5,
    // flexDirection: 'row',

    marginBottom: 4,
    margin: 2,
  },
  TextGroupTitle: {
    fontSize: 20,
    color: '#20416e',
    margin: 4,
  },
  imageArrowGroup: {
    width: 15,
    height: 12,
    bottom: 30,
    right: Platform.OS === 'ios' ? -10 : -10,
    top: Platform.OS === 'ios' ? 12 : 10,
  },
  TextGroup2: {
    right: Platform.OS === 'ios' ? 5 : 5,
    width: '100%',
    color: '#73838f',
    fontSize: 19,
    top: Platform.OS === 'ios' ? -15 : -15,
    padding: Platform.OS === 'ios' ? 13 : 15,
    flexShrink: 1,
    flexWrap: 'wrap',

    // backgroundColor:'red'
  },
  TextGroup22: {
    right: Platform.OS === 'ios' ? 5 : 5,
    width: '100%',
    color: '#dadada',
    fontSize: 19,
    top: Platform.OS === 'ios' ? -16 : -15,
    padding: Platform.OS === 'ios' ? 13 : 15,
    flexShrink: 1,
    flexWrap: 'wrap',

    // backgroundColor:'red'
  },
  ViewTextInput: {
    // marginTop: 5,
    width: '15%',
    height: 35,
    backgroundColor: '#FFFFFF',
    // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 5,
  },
  GrouopViewSearchAD: {
    marginTop: 10,
    width: '23%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 15,
    // flexDirection: 'row',
    marginBottom: 4,
    margin: 2,
  },
  GrouopViewSearchAD2: {
    marginTop: 10,
    // width: '50%',
    flex: 1,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: 10,
    // flexDirection: 'row',
    marginBottom: 4,
    // margin:2
  },
  GrouopViewSearchAD3: {
    marginTop: 10,
    // width: '50%',
    flex: 1,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: 10,
    // flexDirection: 'row',
    marginBottom: 4,
    // margin:2
  },
  GrouopViewSearchAD5: {
    marginTop: 10,
    flex: 1,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: 10,
    // flexDirection: 'row',
    marginBottom: 4,
    // margin:2
  },
  GrouopViewSearchAD6: {
    marginTop: 10,
    flex: 1,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderColor: '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
    // margin:2
  },
  TextGroup2: {
    right: Platform.OS === 'ios' ? 5 : 5,
    width: '100%',
    color: '#999999',
    fontSize: 20,
    top: Platform.OS === 'ios' ? -16 : -15,
    padding: Platform.OS === 'ios' ? 13 : 15,
    flexShrink: 1,
    flexWrap: 'wrap',

    // backgroundColor:'red'
  },
  searchText1: {
    color: '#FFFFFF',
    fontSize: ViewScale(15),
    textAlign: 'center',
    fontFamily: 'Mitr-Regular',
  },
  selecttextneed: {
    width: '100%',
    color: '#2d6dc4',
    fontSize: 13,
    textAlign: 'center',
    left: 5,
    fontFamily: 'Mitr-Regular',
    marginTop: 3,
  },
  searchProduct1: {
    fontSize: 20,
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    fontSize: 13,
  },
  searchProduct2: {
    flex: 0.7,
    fontSize: 13,
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
  },
  searchCOntry: {
    textAlign: 'center',
    fontSize: 20,
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    fontSize: 13,
  },
  Notnoline: {
    textAlign: 'center',
    // fontSize: 20,
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    fontSize: ViewScale(14),
  },
  online: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Mitr-Regular',
    fontSize: 13,
  },
  textActivitydate: {
    fontFamily: 'Pridi-Medium',
    fontSize: ViewScale(12),
    color: '#6f819a',
    marginTop: 8,
    textAlign: 'center',
  },
  textActivityTitle: {
    fontSize: ViewScale(14),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  textactivityloca: {
    color: '#8b9bb0',
    fontSize: ViewScale(12),
    fontFamily: 'Pridi-Medium',
  },
  textactivityRegiter: {
    fontSize: ViewScale(12),
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  textactivityread: {
    fontSize: ViewScale(12),
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
  },
  textlistactivityall: {
    fontSize: ViewScale(14),
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
  },

  popupTextTitle: {
    fontSize: ViewScale(20),
    color: '#163c70',
    fontFamily: 'Mitr-Regular',
  },
  opoupTextData1: {
    fontSize: ViewScale(14),
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextloca: {
    fontSize: ViewScale(14),
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextMap: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: ViewScale(14),
    fontFamily: 'Pridi-Regular',
  },
  popupTexthideText: {
    fontSize: ViewScale(14),
    color: '#2d6dc4',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Mitr-Regular',
  },
  popupTextTitledetail: {
    fontSize: ViewScale(14),
    color: '#3a3a3a',
    fontFamily: 'Mitr-Regular',
  },
  popupTextdetail: {
    fontSize: ViewScale(14),
    color: '#7d7d7d',
    fontFamily: 'Pridi-Regular',
  },
  popupTextdelect: {
    fontSize: ViewScale(14),
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
  },
  textactivityregister: {
    fontSize: ViewScale(12),
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  popuptextnumber: {
    fontSize: 13,
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
    marginTop: 4,
  },
  viewckText: {
    fontSize: ViewScale(14),
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    textAlign: 'center',
  },
  view1: {
    flexDirection: 'row',
    borderWidth: 1,
    height: ViewScale(34),
    borderColor: '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
  },
  view2: {
    flex: 1,
    justifyContent: 'center',
  },
  view3icon: {
    justifyContent: 'center',
    flex: 0.2,
  },
  // footer: {
  //   padding: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: '#ffffff',
  //   height: height * 0.3,
  // },
  footerNotdata: {
    alignItems: 'center',
    // flex: 1,
    height: height * 0.3,
    justifyContent: 'center',
  },
});
