import {StyleSheet, Dimensions, Platform} from 'react-native';
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  ViewSub3: {
    // flexDirection: 'row-reverse',
    flexDirection: 'row',
  },

  TextSub1: {
    fontSize: 24,
    color: '#40536d',
    fontFamily: 'Kittithada Bold 75',
  },
  TextSub2: {
    fontSize: 14,
    color: '#40536d',
    fontFamily: 'Mitr-Regular',
  },
  ImgSub1: {
    width: 69,
    height: 30,
  },
  marginLeft10: {
    // marginLeft: 10,
  },
  ViewSub4: {
    width: 243,
    height: 141,
    borderColor: '#3978c008',
    borderWidth: 5,
  },
  ViewSub5: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  ImgSub2: {
    width: 25,
    height: 25,
  },
  TextSub3: {
    fontSize: 11,
    color: '#94adbd',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub6: {
    marginHorizontal: 10,
    width: 192,
    height: null,
  },
  TextSub4: {
    fontSize: 12,
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  ViewSub7: {
    flexDirection: 'column-reverse',
    flex: 1,
    marginLeft: 10,
  },
  ViewSub8: {
    // left: 5,
    // padding: 10,
    // paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub3: {
    width: 20,
    height: 13,
  },
  ImgBackgroungSub1: {
    width: 25,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub5: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  ScrollTabStyle: {
    backgroundColor: '#FFFFFF',
  },
  tabbarTextStyle: {
    fontSize: 23,
    fontFamily: 'Kittithada Bold 75',
  },
  tabunderLine: {
    width: 35,
    height: 3,
    backgroundColor: '#40536d',
    marginLeft: 20,
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
    marginBottom: 25,
  },
  ViewTab11: {
    width: '90%',
    // alignSelf: 'center',
    height: '30%',
  },
  Image: {
    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginTop: 5,
  },
  TextInputseach1: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 10,
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
    width: 9,
    height: 12,
  },
  TouchRead: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 20,
  },
  ImgTouchRead: {
    width: 17,
    height: 13,
  },
  ViewTab2: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    marginTop: 5,
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
    height: 34,
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
    height: 34,
    backgroundColor: '#787878',
    borderRadius: 8,
    margin: 7,
    flex: 1,
    paddingHorizontal: 5,
  },
  TouchSub6: {
    marginTop: 10,
    width: 163,
    height: 34,
    backgroundColor: '#787878',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgActivity: {
    width: 350,
    height: 268,
  },
  flastListContainer: {
    marginTop: 15,
    // backgroundColor: '#f4f5f805',
    // borderColor: '#f4f5f880',
    // borderWidth: 1,
    
  },
  TouchSub1: {
    marginTop: 10,
    width: 163,
    height: 34,
    backgroundColor: '#2d6dc4',
    borderRadius: 24.5,
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
    padding: 10,
    right: -20,
    top: -55,
  },
  OverlayView2: {
    width: width1 - 50,
    height: null,
  },
  OverlayView3: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  ImgClose: {
    width: 28,
    height: 28,
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
  acceptDateText: {
    color: '#fff',
    fontSize: 25,
  },
  cancelDateText: {
    color: '#fff',
    fontSize: 25,
  },
  acceptDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: '#2d6dc4',
  },
  clearDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: '#96b3cb',
  },
  cancelDateButton: {
    width: '66%',
    height: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: '#f96145',
  },
  ViewSearYear2: {
    borderRadius: 18,
    width: '100%',
    height: 33,
    borderWidth: 1,
    borderColor: '#2d6dc4',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  ViewIconYear: {
    marginLeft: 10,
    marginTop: 5,
    marginRight: 5,
  },
  textInputYear: {
    marginLeft: 3,
    marginTop: 2,
    fontSize: 18,
    color: '#dadada',
  },
  textInputYear2: {
    marginLeft: 3,
    marginTop: 2,
    fontSize: 18,
    color: '#3c3c3c',
  },
  ViewSub2: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  ViewSearYear: {
    borderRadius: 18,
    width: '100%',
    height: 33,
    borderWidth: 1,
    borderColor: '#dadada',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  TextInputSearch: {
    fontSize: 20,
    padding: 0,
    width: '100%',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    marginLeft: 10,
    color: '#000000',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  margin10: {
    margin: 10,
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
  ViewTextInput2: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 5,
  },
  GrouopViewSearchAD: {
    marginTop: 10,
    width: '23%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 19,
    // flexDirection: 'row',
    marginBottom: 4,
    margin: 2,
  },
  GrouopViewSearchAD2: {
    marginTop: 10,
    width: '50%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 5,
    // flexDirection: 'row',
    marginBottom: 4,
    // margin:2
  },
  GrouopViewSearchAD3: {
    marginTop: 10,
    width: '35%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    marginLeft: 5,
    // flexDirection: 'row',
    marginBottom: 4,
    // margin:2
  },
  imageArrowGroup: {
    width: 12,
    height: 7,
    bottom: 30,
    right: Platform.OS === 'ios' ? -5 : -10,
    top: Platform.OS === 'ios' ? 12 : 10,
    color: '#dadada',
  },
  TextGroup2: {
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
  opencoure: {
    color: '#40536d',
    fontSize: 15,
    fontFamily: 'Mitr-Regular',
  },
  coureAll: {
    color: '#2d6dc4',
    fontSize: 12,
    fontFamily: 'Mitr-Regular',
  },
  textactivityDate: {
    fontSize: 11,
    color: '#6f819a',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Pridi-Medium',
  },
  textActivityTitl: {
    fontSize: 13,
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  textactivityloca: {
    fontSize: 10,
    color: '#6f819a',
    fontFamily: 'Pridi-Medium',
  },
  textactivityregister: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  textreaddetail: {
    fontSize: 10,
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
  },
  textsearchView: {
    flex: 1,
    fontSize: 14,
    color: '#999999',
    marginLeft: 10,
    backgroundColor: 'transparent',
    padding: Platform.OS === 'ios' ? 5 : 3,
    left: Platform.OS === 'ios' ? 0 : 1,
    width: '90%',
    fontFamily: 'Mitr-Regular',
  },
  popupTextTitle: {
    fontSize: 16,
    color: '#163c70',
    fontFamily: 'Mitr-Regular',
  },
  opoupTextData1: {
    fontSize: 13,
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextloca: {
    fontSize: 13,
    color: '#3a3a3a',
    fontFamily: 'Pridi-Regular',
  },
  popupTextMap: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Pridi-Regular',
  },
  popupTexthideText: {
    fontSize: 13,
    color: '#2d6dc4',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Mitr-Regular',
  },
  popupTextTitledetail: {
    fontSize: 13,
    color: '#3a3a3a',
    fontFamily: 'Mitr-Regular',
  },
  popupTextdetail: {
    fontSize: 13,
    color: '#7d7d7d',
    fontFamily: 'Pridi-Regular',
  },
  popupTextdelect: {
    fontSize: 14,
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
  },
  footer: {
    padding: 10,
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
    height: 35,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 17,
  },
  viewcheckValue: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2d6dc4',
    height: 35,
    borderRadius: 17,
  },
  viewcheckText: {
    flex: 1,
    justifyContent: 'center',
  },
  viewText: {
    color: '#2d6dc4',
    fontSize: 20,
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
    marginHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 1,
  },
  viewimgbg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  viewinputtext: {
    fontSize: 24,
    color: '#73838f',
    marginHorizontal: 10,
    flex: 1,
  },
  viewtextred: {
    color: 'red',
    marginLeft: -9,
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
    marginHorizontal: 15,
    elevation: 5,
    marginBottom: 30,
    paddingBottom: 10,
  },
  titletextvalue: {
    fontSize: 20,
    color: '#163c70',

    marginHorizontal: 10,
  },
  viewbgcheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  viewtextck1: {
    color: '#73838f',
    fontSize: 24,
    marginHorizontal: 15,
  },
  viewtextck2: {
    color: '#73838f',
    fontSize: 22,
    marginHorizontal: 15,
  },

  viewcompany1: {
    flex: 1,
    marginTop: 3,
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
    height: 120,
  },
  imgbgcompany2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  viewininputcompany1: {
    flex: 1,
    marginTop: 20,
  },
  viewininputcompany2: {
    flexDirection: 'row',
  },
  texttitlecompany: {
    fontSize: 20,
    color: '#163c70',
    marginHorizontal: 35,
  },
  textredcompany:{
    color: 'red',
    left: -32,
  },

  inimgbginput:{
    height: 28,
    width: '100%',
  },
  inimgbginput2:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 35,
  },
  textinputcompany:
    {
      fontSize: 24,
      color: '#73838f',
      marginHorizontal: 10,
      flex: 1,
      marginTop:
        Platform.OS === 'android'
          ? -11
          : 0,
      fontFamily:
        Platform.OS === 'android'
          ? 'Kittithada Bold 75'
          : 'PSL Kittithada Pro',
    
  },
  textininputcompany:{
    borderWidth: 1,
    color: '#163c70',
    fontSize: 24,
    flex: 1,
  },


  viewsearchIDcompany1:{
    marginHorizontal: 15,
    flexDirection: 'row',
    // marginBottom: 10,
  },
  viewsearchIDcompany:{
    borderWidth: 1,
    marginHorizontal: 10,
    height: 30,
    borderRadius: 18,
    borderColor: '#999999',
    flexDirection: 'row',
    flex: 0.8,
  },
  viewimgsearchcompany:{
    width: 23,
    height: 23,
    marginTop: 4,
    marginHorizontal: 9,
  },
  Tsearchcompany:{
    backgroundColor: '#2d6dc4',
    height: 30,
    borderRadius: 18,
    justifyContent: 'center',
  }


  
});
