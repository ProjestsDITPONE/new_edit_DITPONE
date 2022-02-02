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
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    margin: ViewScale(20),
  },
  ViewSub3: {
    flexDirection: 'row-reverse',
  },

  TextSub1: {
    fontSize: ViewScale(24),
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
    marginLeft: ViewScale(10),
  },
  ViewSub4: {
    width: ViewScale(243),
    height: ViewScale(141),
  },
  ViewSub5: {
    alignItems: 'center',
  },
  ImgSub2: {
    width: ViewScale(25),
    height: ViewScale(25),
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
    width: ViewScale(50),
    height: ViewScale(3),
    marginLeft: ViewScale(20),
    backgroundColor: '#40536d',
  },
  ScrollViewTabBar: {
    borderColor: 'transparent',
    marginBottom: ViewScale(10),
  },
  ViewTab1: {
    flex: 1,
    backgroundColor: '#FFFFFF50',

    alignSelf: 'center',
    marginBottom: ViewScale(25),
  },
  ViewTab11: {
    width: '93%',
    alignSelf: 'center',
    marginRight: ViewScale(10),
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
    padding: Platform.OS === 'ios' ? ViewScale(5) : ViewScale(3),
    left: Platform.OS === 'ios' ? ViewScale(0) : ViewScale(1),
    width: '90%',
    fontFamily: 'Mitr-Regular',
  },
  flastListtab1: {
    // flex: 1,
    zIndex: -1,
    top: ViewScale(10),
    // flexDirection:'column'
  },
  ViewImgList: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgStyle: {
    width: ViewScale(9),
    height: ViewScale(12),
    marginHorizontal: ViewScale(4),
  },
  TouchRead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ViewScale(1),
  },
  ImgTouchRead: {
    width: ViewScale(17),
    height: ViewScale(13),
  },
  ViewTab2: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    marginTop: ViewScale(5),
  },
  Overlay: {
    backgroundColor: 'transparent',
  },
  ViewOverlay: {
    width: ViewScale(358),
    height: ViewScale(264),
    backgroundColor: '#FFFFFF',
  },
  OverlayView1: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    position: 'absolute',
    padding: ViewScale(15),
    right: ViewScale(-20),
    top: ViewScale(-55),
  },
  ImgClose: {
    width: ViewScale(28),
    height: ViewScale(28),
  },
  OverlayView2: {
    width: width1 -50,
    height: null,
  },

  OverlayView3: {},

  ImgActivity: {
    width: ViewScale(350),
    height: ViewScale(268),
  },
  flastListContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    // marginTop:10
  },
  TouchSub1: {
    marginTop: ViewScale(10),
    width: ViewScale(163),
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchSub6: {
    marginTop: ViewScale(10),
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
    left: ViewScale(-10),
  },
  TouchSub2: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 130,
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: 8,
    margin: ViewScale(7),
    flex: 1,
    paddingHorizontal: ViewScale(5),
  },
  TouchSub5: {
    justifyContent: 'center',
    alignItems: 'center',

    // width: 130,
    height: ViewScale(34),
    backgroundColor: '#787878',
    borderRadius: 8,
    margin: ViewScale(7),
    flex: 1,
    paddingHorizontal: ViewScale(5),
  },
  checkIcon: {
    width: ViewScale(15),
    height: ViewScale(150),
  },
  OverlayHight: {
    height: height * ViewScale(0.78),
  },
  OverlayHight1: {
    height: height * ViewScale(0.12),
  },
  themeoverlay: {
    borderWidth: 2,
    borderColor: '#2d6dc4',
    backgroundColor: '#2d6dc4',
    // top: height * 0.001,
    top: ViewScale(-70),
  },
  separator: {
    height: ViewScale(0.5),
    backgroundColor: 'rgba(0,0,0,0.0)',

    borderColor: '#ffffff',
  },
  footer: {
    padding: ViewScale(10),
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
    bottom: ViewScale(20),
  },
  ViewSub13: {
    marginTop: 5,
    width: '90%',
    height: ViewScale(35),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop10: {
    marginTop: ViewScale(10),
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
    margin: ViewScale(10),
  },
  ImgSub4: {
    width: ViewScale(60),
    height: ViewScale(55),
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
    fontSize: ViewScale(14),
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
    fontSize: ViewScale(18),
    color: '#4b4b4b',
    fontFamily: 'Kittithada Bold 75',
  },
  TextSub8: {
    fontSize: ViewScale(16),
    color: '#6f819a',
  },
  TextSub9: {
    fontSize: ViewScale(20),
    color: '#7fadec',
    fontFamily: 'Kittithada Bold 75',
  },
  ViewSub17: {
    bottom: ViewScale(20),
    // marginLeft: 10,
    left: ViewScale(20),
  },
  ViewSubOver: {
    backgroundColor: Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
    opacity: Platform.OS === 'android' ? ViewScale(0.5) : ViewScale(0.8),
  },
  ViewSub18: {
    marginTop: ViewScale(13),
    alignItems: 'center',
  },
  TextSub10: {
    fontSize: ViewScale(18),
    color: '#FFFFFF',
  },
  ViewTextInput: {
    marginTop: ViewScale(5),
    width: '35%',
    height: ViewScale(35),
    backgroundColor: '#FFFFFF',
    // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: ViewScale(5),
  },
  ViewTextInput2: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: ViewScale(5),
    // marginRight:25
  },
  // css searchadvaced Data

  GrouopViewSearchAD: {
    marginTop: ViewScale(3),
    width: '50%',
    height: ViewScale(35),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    // marginLeft: 5,
    // flexDirection: 'row',

    marginBottom: ViewScale(4),
    margin: ViewScale(2),
  },
  TextGroupTitle: {
    fontSize: ViewScale(20),
    color: '#20416e',
    margin: ViewScale(4),
  },
  imageArrowGroup: {
    width: ViewScale(15),
    height: ViewScale(12),
    bottom: ViewScale(30),
    right: Platform.OS === 'ios' ? ViewScale(-10) : ViewScale(-10),
    top: Platform.OS === 'ios' ? ViewScale(12) : ViewScale(10),
  },
  // TextGroup2: {
  //   right: Platform.OS === 'ios' ? 5 : 5,
  //   width: '100%',
  //   color: '#73838f',
  //   fontSize: 19,
  //   top: Platform.OS === 'ios' ? -15 : -15,
  //   padding: Platform.OS === 'ios' ? 13 : 15,
  //   flexShrink: 1,
  //   flexWrap: 'wrap',

  //   // backgroundColor:'red'
  // },
  TextGroup22: {
    right: Platform.OS === 'ios' ? ViewScale(5) : ViewScale(5),
    width: '100%',
    color: '#dadada',
    fontSize: ViewScale(18),
    top: Platform.OS === 'ios' ? ViewScale(-16) : ViewScale(-15),
    padding: Platform.OS === 'ios' ? ViewScale(13) : ViewScale(15),
    flexShrink: 1,
    flexWrap: 'wrap',

    // backgroundColor:'red'
  },
  ViewTextInput: {
    // marginTop: 5,
    width: '15%',
    height: ViewScale(35),
    backgroundColor: '#FFFFFF',
    // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: ViewScale(5),
  },
  GrouopViewSearchAD: {
    marginTop: ViewScale(10),
    width: '23%',
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: ViewScale(15),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    margin: ViewScale(2),
  },
  GrouopViewSearchAD2: {
    marginTop: ViewScale(10),
    // width: '50%',
    flex: 1,
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: ViewScale(10),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    // margin:2
  },
  GrouopViewSearchAD3: {
    marginTop: ViewScale(10),
    // width: '50%',
    flex: 1,
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: ViewScale(10),
    // flexDirection: 'row',
    marginBottom: ViewScale(40),
    // margin:2
  },
  GrouopViewSearchAD5: {
    marginTop: ViewScale(10),
    flex: 1,
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: ViewScale(10),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    // margin:2
  },
  GrouopViewSearchAD6: {
    marginTop: ViewScale(10),
    flex: 1,
    height: ViewScale(34),
    backgroundColor: '#FFFFFF',
    borderColor: '#2d6dc4',
    borderWidth: 1,
    borderRadius: 21.5,
    marginHorizontal: ViewScale(10),
    // flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: ViewScale(4),
    // margin:2
  },
  TextGroup2: {
    right: Platform.OS === 'ios' ? ViewScale(5) : ViewScale(5),
    width: '100%',
    color: '#999999',
    fontSize: ViewScale(21),
    top: Platform.OS === 'ios' ? ViewScale(-16) : ViewScale(-15),
    padding: Platform.OS === 'ios' ? ViewScale(13) : ViewScale(15),
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
    fontSize: ViewScale(14),
    textAlign: 'center',
    left: ViewScale(5),
    fontFamily: 'Mitr-Regular',
    marginTop: ViewScale(3),
  },
  searchProduct1: {
    fontSize: ViewScale(20),
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    fontSize: ViewScale(13),
  },
  searchProduct2: {
    flex: 0.7,
    fontSize: ViewScale(14),
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
  },
  searchCOntry: {
    textAlign: 'center',
    fontSize: ViewScale(20),
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
    fontSize: ViewScale(14),
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
    fontSize: ViewScale(20),
    color: '#FFF',
    fontFamily: 'Mitr-Regular',
    fontSize: ViewScale(13),
  },
  textActivitydate: {
    fontFamily: 'Pridi-Medium',
    fontSize: ViewScale(12),
    color: '#6f819a',
    marginTop: ViewScale(8),
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
    fontSize: ViewScale(14),
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
    marginTop: ViewScale(4),
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
    height: height * ViewScale(0.3),
    justifyContent: 'center',
  },
});
