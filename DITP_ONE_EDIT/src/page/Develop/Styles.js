import {StyleSheet, Dimensions, Platform} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const width1 = Dimensions.get('screen').width;
const height1 = Dimensions.get('screen').height;

var aspectRatio = '60%';
if (height / width > 1.6) {
  //iphone
  aspectRatio = '45%';
}
export default StyleSheet.create({
  ViewSub1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ViewSub2: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    margin: ViewScale(10),
  },
  ViewSub3: {
    // flexDirection: 'row-reverse',
    flexDirection: 'row',
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
    // marginLeft: 10,
  },
  ViewSub4: {
    width: ViewScale(243),
    height: ViewScale(141),
    borderColor: '#3978c008',
    borderWidth: ViewScale(5),
  },
  ViewSub5: {
    flexDirection: 'row',
    margin: ViewScale(5),
    alignItems: 'center',
  },
  ImgSub2: {
    width: ViewScale(25),
    height: ViewScale(25),
  },
  TextSub3: {
    fontSize: ViewScale(12),
    color: '#94adbd',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub6: {
    marginHorizontal: ViewScale(10),
    width: ViewScale(192),
    height: null,
  },
  TextSub4: {
    fontSize: ViewScale(12),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub7: {
    flexDirection: 'column-reverse',
    flex: 1,
    marginLeft: ViewScale(10),
  },
  ViewSub8: {
    // left: 5,
    // padding: 10,
    // paddingLeft: 10,
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
    width: ViewScale(35),
    height: ViewScale(3),
    backgroundColor: '#40536d',
    marginLeft: ViewScale(20),
  },
  ScrollViewTabBar: {
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  ViewTab1: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    // marginTop: 5,
    alignSelf: 'center',
    marginBottom: ViewScale(25),
  },
  ViewTab11: {
    width: '90%',
    // alignSelf: 'center',
    height: '30%',
  },
  Image: {
    width: ViewScale(22),
    height: ViewScale(22),
    backgroundColor: 'transparent',
    marginLeft: ViewScale(10),
    marginTop: ViewScale(5),
  },
  TextInputseach1: {
    fontSize: ViewScale(14),
    color: '#999999',
    marginLeft: ViewScale(10),
    backgroundColor: 'transparent',
    padding: 0,
    fontFamily: 'Mitr-Regular',
  },
  flastListtab1: {
    width: '100%',
    zIndex: -1,
  },
  ViewImgList: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgStyle: {
    width: ViewScale(9),
    height: ViewScale(12),
  },
  TouchRead: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 20,
  },
  ImgTouchRead: {
    width: ViewScale(17),
    height: ViewScale(13),
  },
  ViewTab2: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    marginTop: ViewScale(5),
    // alignSelf: 'center',
  },
  ViewSub9: {
    width: '100%',
  },
  ViewSub10: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // bottom: 10,
  },
  TouchSub2: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 130,
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: ViewScale(8),
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
    borderRadius: ViewScale(8),
    margin: ViewScale(7),
    flex: 1,
    paddingHorizontal: ViewScale(5),
  },
  TouchSub6: {
    marginTop: ViewScale(10),
    width: ViewScale(163),
    height: ViewScale(34),
    backgroundColor: '#787878',
    borderRadius: ViewScale(24.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgActivity: {
    width: ViewScale(350),
    height: ViewScale(268),
  },
  flastListContainer: {
    marginTop: ViewScale(15),
    // backgroundColor: '#f4f5f805',
    // borderColor: '#f4f5f880',
    // borderWidth: 1,
    
  },
  TouchSub1: {
    marginTop: ViewScale(10),
    width: ViewScale(163),
    height: ViewScale(34),
    backgroundColor: '#2d6dc4',
    borderRadius: ViewScale(24.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  OverlayHight: {
    height: height * 0.78,
  },
  OverlayView1: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    position: 'absolute',
    padding: ViewScale(10),
    right: ViewScale(-20),
    top: ViewScale(-55),
  },
  OverlayView2: {
    width: width1 - 50,
    height: null,
  },
  OverlayView3: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: ViewScale(4),
  },
  ImgClose: {
    width: ViewScale(28),
    height: ViewScale(28),
  },
  ViewSub11: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ViewScale(18),

    borderColor: '#dadada',
  },
  heightTiltle: {
    width: aspectRatio,
  },
  acceptDateText: {
    color: '#fff',
    fontSize: ViewScale(25),
  },
  cancelDateText: {
    color: '#fff',
    fontSize: ViewScale(25),
  },
  acceptDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: ViewScale(20),
    borderRadius: ViewScale(50),
    backgroundColor: '#2d6dc4',
  },
  clearDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: ViewScale(10),
    borderRadius: ViewScale(50),
    backgroundColor: '#96b3cb',
  },
  cancelDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: ViewScale(20),
    marginTop: ViewScale(10),
    borderRadius: ViewScale(50),
    backgroundColor: '#f96145',
  },
  ViewSearYear2: {
    borderRadius: ViewScale(18),
    width: '100%',
    height: ViewScale(33),
    borderWidth: 1,
    borderColor: '#2d6dc4',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  ViewIconYear: {
    marginLeft: ViewScale(10),
    marginTop: ViewScale(5),
    marginRight: ViewScale(5),
  },
  textInputYear: {
    marginLeft: ViewScale(3),
    marginTop: ViewScale(2),
    fontSize: ViewScale(18),
    color: '#dadada',
  },
  textInputYear2: {
    marginLeft: ViewScale(3),
    marginTop: ViewScale(2),
    fontSize: ViewScale(18),
    color: '#3c3c3c',
  },
  ViewSub2: {
    marginTop: ViewScale(0),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ViewScale(10),
  },
  ViewSearYear: {
    borderRadius: ViewScale(18),
    width: '100%',
    height: ViewScale(33),
    borderWidth: 1,
    borderColor: '#dadada',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  TextInputSearch: {
    fontSize: ViewScale(20),
    padding: 0,
    width: '100%',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    marginLeft: ViewScale(10),
    color: '#000000',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  margin10: {
    margin: ViewScale(10),
  },
  ViewTextInput: {
    // marginTop: 5,
    width: '15%',
    height: ViewScale(35),
    backgroundColor: '#FFFFFF',
    // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
    borderWidth: 1,
    borderRadius: ViewScale(21.5),
    marginLeft: ViewScale(5),
  },
  ViewTextInput2: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: ViewScale(5),
  },
  GrouopViewSearchAD: {
    marginTop: ViewScale(10),
    width: '23%',
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: ViewScale(21.5),
    marginLeft: ViewScale(19),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    margin: ViewScale(2),
  },
  GrouopViewSearchAD2: {
    marginTop: ViewScale(10),
    width: '50%',
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: ViewScale(21.5),
    marginLeft: ViewScale(5),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    // margin:2
  },
  GrouopViewSearchAD3: {
    marginTop: ViewScale(10),
    width: '35%',
    height: ViewScale(30),
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: ViewScale(21.5),
    marginLeft: ViewScale(5),
    // flexDirection: 'row',
    marginBottom: ViewScale(4),
    // margin:2
  },
  imageArrowGroup: {
    width: ViewScale(12),
    height: ViewScale(7),
    bottom: ViewScale(30),
    right: Platform.OS === 'ios' ? ViewScale(-5) : ViewScale(-10),
    top: Platform.OS === 'ios' ? ViewScale(12) : ViewScale(10),
    color: '#dadada',
  },
  TextGroup2: {
    right: Platform.OS === 'ios' ? ViewScale(5) : ViewScale(5),
    width: '100%',
    color: '#dadada',
    fontSize: ViewScale(19),
    top: Platform.OS === 'ios' ? ViewScale(-16) : ViewScale(-15),
    padding: Platform.OS === 'ios' ? ViewScale(13) : ViewScale(15),
    flexShrink: 1,
    flexWrap: 'wrap',

    // backgroundColor:'red'
  },
  opencoure: {
    color: '#40536d',
    fontSize: ViewScale(15),
    fontFamily: 'Mitr-Regular',
  },
  coureAll: {
    color: '#2d6dc4',
    fontSize: ViewScale(12),
    fontFamily: 'Mitr-Regular',
  },
  textactivityDate: {
    fontSize: ViewScale(12),
    color: '#6f819a',
    marginTop: ViewScale(8),
    textAlign: 'center',
    fontFamily: 'Pridi-Medium',
  },
  textActivityTitl: {
    fontSize:  ViewScale(14),
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  textactivityloca: {
    fontSize: ViewScale(12),
    color: '#6f819a',
    fontFamily: 'Pridi-Medium',
  },
  textactivityregister: {
    fontSize: ViewScale(14),
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  textreaddetail: {
    fontSize: ViewScale(12),
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
  },
  textsearchView: {
    flex: 1,
    fontSize: ViewScale(14),
    color: '#999999',
    marginLeft: ViewScale(10),
    backgroundColor: 'transparent',
    padding: Platform.OS === 'ios' ? ViewScale(5) : ViewScale(3),
    left: Platform.OS === 'ios' ? 0 : ViewScale(1),
    width: '90%',
    fontFamily: 'Mitr-Regular',
  },
  popupTextTitle: {
    fontSize: ViewScale(16),
    color: '#163c70',
    fontFamily: 'Mitr-Regular',
  },
  opoupTextData1: {
    fontSize: ViewScale(13),
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextloca: {
    fontSize: ViewScale(13),
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextMap: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: ViewScale(13),
    fontFamily: 'Pridi-Regular',
  },
  popupTexthideText: {
    fontSize: ViewScale(13),
    color: '#2d6dc4',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Mitr-Regular',
  },
  popupTextTitledetail: {
    fontSize: ViewScale(13),
    color: '#3a3a3a',
    fontFamily: 'Mitr-Regular',
  },
  popupTextdetail: {
    fontSize: ViewScale(13),
    color: '#7d7d7d',
    fontFamily: 'Pridi-Regular',
  },
  popupTextdelect: {
    fontSize: ViewScale(14),
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
  },
  footer: {
    padding: ViewScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // height: height * 0.3,
  },
  footerNotdata: {
    alignItems: 'center',
    // flex: 1,
    height: height * 0.3,
    justifyContent: 'center',
  },

  viewstart: {
    flex: 1,
    height: ViewScale(35),
    marginHorizontal: ViewScale(10),
    marginVertical: ViewScale(10),
    borderRadius: ViewScale(17),
  },
  viewcheckValue: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2d6dc4',
    height: ViewScale(35),
    borderRadius: ViewScale(17),
  },
  viewcheckText: {
    flex: 1,
    justifyContent: 'center',
  },
  viewText: {
    color: '#2d6dc4',
    fontSize: ViewScale(20),
    textAlign: 'center',
  },
  viewIcon: {
    justifyContent: 'center',
    flex: 0.19,
  },
  viewmember1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',

    shadowColor: '#f6f7fa',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: ViewScale(15),
    paddingBottom: ViewScale(15),
    marginBottom: ViewScale(1),
  },
  viewimgbg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ViewScale(10),
  },
  viewinputtext: {
    fontSize: ViewScale(24),
    color: '#73838f',
    marginHorizontal: ViewScale(10),
    flex: 1,
  },
  viewtextred: {
    color: 'red',
    marginLeft: ViewScale(-9),
  },
  viewcheckbox: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#f8f9fb',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: ViewScale(15),
    elevation: 5,
    marginBottom: ViewScale(30),
    paddingBottom: ViewScale(10),
  },
  titletextvalue: {
    fontSize: ViewScale(20),
    color: '#163c70',

    marginHorizontal: ViewScale(10),
  },
  viewbgcheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ViewScale(10),
  },
  viewtextck1: {
    color: '#73838f',
    fontSize: ViewScale(24),
    marginHorizontal: ViewScale(15),
  },
  viewtextck2: {
    color: '#73838f',
    fontSize: ViewScale(22),
    marginHorizontal: ViewScale(15),
  },

  viewcompany1: {
    flex: 1,
    marginTop: ViewScale(3),
    shadowColor: '#f9fafc',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  imgbgcompany: {
    width: '100%',
    height: ViewScale(120),
  },
  imgbgcompany2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  viewininputcompany1: {
    flex: 1,
    marginTop: ViewScale(20),
  },
  viewininputcompany2: {
    flexDirection: 'row',
  },
  texttitlecompany: {
    fontSize: ViewScale(20),
    color: '#163c70',
    marginHorizontal: ViewScale(35),
  },
  textredcompany:{
    color: 'red',
    left: ViewScale(-32),
  },

  inimgbginput:{
    height: ViewScale(28),
    width: '100%',
  },
  inimgbginput2:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ViewScale(35),
  },
  textinputcompany:
    {
      fontSize: ViewScale(24),
      color: '#73838f',
      marginHorizontal: ViewScale(10),
      flex: 1,
      marginTop:
        Platform.OS === 'android'
          ? ViewScale(-11)
          : ViewScale(0),
      fontFamily:
        Platform.OS === 'android'
          ? 'Kittithada Bold 75'
          : 'PSL Kittithada Pro',
    
  },
  textininputcompany:{
    borderWidth: 1,
    color: '#163c70',
    fontSize: ViewScale(24),
    flex: 1,
  },


  viewsearchIDcompany1:{
    marginHorizontal: ViewScale(15),
    flexDirection: 'row',
    // marginBottom: 10,
  },
  viewsearchIDcompany:{
    borderWidth: 1,
    marginHorizontal: ViewScale(10),
    height: ViewScale(30),
    borderRadius: ViewScale(18),
    borderColor: '#999999',
    flexDirection: 'row',
    flex: 0.8,
  },
  viewimgsearchcompany:{
    width: ViewScale(23),
    height: ViewScale(23),
    marginTop: ViewScale(4),
    marginHorizontal: ViewScale(9),
  },
  Tsearchcompany:{
    backgroundColor: '#2d6dc4',
    height: ViewScale(30),
    borderRadius: ViewScale(18),
    justifyContent: 'center',
  }


  
});
