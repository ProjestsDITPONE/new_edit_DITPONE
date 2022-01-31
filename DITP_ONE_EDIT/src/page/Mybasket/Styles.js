import {StyleSheet, Dimensions, Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const width1 = Dimensions.get('screen').width;
const height1 = Dimensions.get('screen').height;
var aspectRatio = '60%';
if (height / width > 1.6) {
  //iphone
  aspectRatio = '55%';
}
export default StyleSheet.create({
  textnodata: {
    fontSize: 22,
    // fontFamily: 'Kittithada Bold 75',
  },
  footerNotdata: {
    alignSelf: 'center',
    marginTop: 10,
    // borderWidth: 1,
    height: height * 0.4,
    justifyContent: 'center',
  },
  ContainerList: {
    width: '100%',
    marginBottom: 15,
    // height: null,
  },
  OverlayView2: {
    width: width1 - 50,
    height: null,
  },
  ContainerList2: {
    width: '100%',
    height: null,
    borderWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: '#f4f5f8',
    borderBottomWidth: 1,
  },

  ContainerList4: {
    width: '100%',

    borderWidth: 0,

    borderColor: '#f4f5f8',
    borderBottomWidth: 1,
  },

  ContainerList3: {
    width: '100%',
    borderWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderColor: '#ffffff',
    borderBottomWidth: 1,
  },

  alignItemsCenter: {
    width: '39%',
    alignItems: 'center',
  },

  alignItemsCenter2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  ViewImg: {
    width: 110,
    height: 60,
  },

  ViewListDate: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  ViewListDate2: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: null,
    height: null,
  },

  fontView: {
    fontSize: 16,
    color: '#6f819a',
  },

  ListStyle: {
    width: '100%',
    height: null,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 5,
    borderColor: '#f4f5f850',
  },

  titleList: {
    fontSize: 20,
    color: '#4b4b4b',
    fontFamily: 'Kittithada Bold 75',
  },

  ViewImgList: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  ImgStyle: {
    width: 9,
    height: 12,
  },

  textListCountry: {
    fontSize: 16,
    color: '#8b9bb0',
    textAlignVertical: 'center',
  },

  textDetail: {
    fontSize: 14,
    color: '#8b9bb0',
  },

  ViewTouchList: {
    flexDirection: 'row',
    // width: '100%',
  },

  TouchStyle: {
    // width: null,
    // height: null,
    // borderRadius: 11.5,
    // backgroundColor: '#2d6dc4',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 13,
    // margin: 10,
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
  TouchStyle1: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 130,
    height: 34,
    backgroundColor: '#787878',
    borderRadius: 8,
    margin: 7,
    flex: 1,
    paddingHorizontal: 5,
    // width: null,
    // height: null,
    // borderRadius: 11.5,
    // backgroundColor: '#dadada50',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 10,
    // margin: 10,
  },

  fontAct: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'PSL Kittithada Pro',
  },

  TouchRead: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
    // borderWidth:1
  },

  ImgTouchRead: {width: 17, height: 13},

  TextRead: {
    fontSize: 15,
    color: '#7fadec',
    fontFamily: 'PSL Kittithada Pro',
  },

  SafeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  ScrollTabStyle: {
    backgroundColor: '#FFFFFF',
    width: '100%'
    // borderWidth:1
  },

  tabbarTextStyle: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 16,
    // backgroundColor: 'red',
    // width: Platform.OS === 'android' ? 250 : null,
    // borderWidth: Platform.OS === 'android' ? 1 : null,
    // paddingHorizontal: Platform.OS === 'android' ? 20 : null,
    fontFamily: 'Mitr-Regular',

    // marginTop: 5,
  },

  tabunderLine: {
    // width: Platform.OS ==='ios' ?25:0,
    height: 3,
    backgroundColor: Platform.OS === 'android' ? '#40536d' : null,
    marginLeft: Platform.OS ==='android' ?0:0,
    // borderWidth:1
    
  },

  ScrollViewTabBar: {
    borderColor: 'transparent',
    paddingVertical: 5,
    // flex: 1,
    // borderWidth: 0.8,
    // borderColor: 'red',
    // borderWidth:1
  },

  ViewTab1: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    // marginTop: 5,
  },

  ViewTab2: {
    flex: 1,
    backgroundColor: '#FFFFFF50',
    marginTop: 5,
    alignSelf: 'center',
  },

  ViewTab11: {
    width: width1 * 0.9,
    height: Platform.OS === 'android' ? height * 0.06 : height * 0.044,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dadada',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  Image: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    marginLeft: 10,
  },

  TextInputseach1: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 10,
    backgroundColor: 'transparent',
    padding: 5,
    left: 10,
    width: '90%',
    fontFamily: 'Mitr-Regular',
  },

  flastListtab1: {},

  ViewTouchFlat1: {
    justifyContent: 'center',
    alignSelf: 'center',
  },

  TouchFlat: {
    width: null,
    height: 34,
    backgroundColor: '#f86767',
    borderRadius: 24.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  fontTouchBasket: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  ViewListPop: {},

  ViewListPop2: {
    flex: 1,
  },

  checkIcon: {
    width: 15,
    height: 15,
    right: 5,
  },

  TextTouchbasket: {
    fontSize: 19,
    color: '#FFFFFF',
    fontFamily: 'Kittithada Bold 75',
  },

  ViewCheck: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    bottom: 0,
  },

  CheckAllContainer: {
    width: '30%',
    height: 50,
    alignSelf: 'center',
    borderColor: 'transparent',
    backgroundColor: '#FFFFFF',
  },

  textStyleCheck: {
    fontSize: 20,
    color: '#40536d',
    fontFamily: 'Kittithada Bold 75',
  },

  TouchDelete: {
    width: '35%',
    height: 34,
    backgroundColor: '#f96145',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  TouchDelete1: {
    width: '35%',
    height: 34,
    backgroundColor: '#dadada',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  texttDelete: {
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Kittithada Bold 75',
  },

  TouchCancle: {
    width: '30%',
    height: 34,
    borderWidth: 1,
    borderRadius: 24.5,
    borderColor: '#f96145',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },

  textCancle: {
    fontSize: 19,
    fontFamily: 'Kittithada Bold 75',
    color: '#f96145',
  },

  ListTitleStyle: {
    color: '#014886',
    fontSize: 20,
    fontFamily: 'Kittithada Bold 75',
  },

  ViewSubtitle: {
    flex: 1,
    flexDirection: 'row',
  },

  ViewSubtitle2: {
    flex: 0.5,
    flexDirection: 'row',
  },

  fontSubtitle: {
    color: '#73838f',
    fontSize: 16,
  },

  ViewSubtitle3: {
    flex: 0.5,
    flexDirection: 'row-reverse',
  },

  TouchSutitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  Overlay: {
    // backgroundColor: 'transparent',
  },

  ViewOverlay: {
    width: 358,
    height: 264,
    backgroundColor: '#FFFFFF',
  },

  ViewOerlay2: {
    backgroundColor: '#f4f7fa',
    width: 358,
    height: null,
    alignItems: 'center',
    // borderColor: '#f4f7fa',
  },

  ViewOverlay3: {
    flexDirection: 'row-reverse',
    width: 358,
  },

  ViewOverlay4: {
    width: Platform.OS === 'android' ? 300 : 315,
    height: 40,
    // borderColor: '#7a899d',
    borderWidth: 1,
    borderRadius: 4.5,
    justifyContent: 'center',
  },

  ViewOverlay5: {
    marginTop: 10,
    marginLeft: 15,
  },

  ViewOverlay6: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  Iconoverlay: {
    marginRight: 10,
    marginTop: 10,
  },

  TextOverlay: {
    fontSize: 25,
    color: '#163c70',
    marginTop: 5,
  },

  TextOverlay2: {
    fontSize: 22,
    color: '#4b4b4b',
    marginBottom: 15,
  },

  TextOverlay3: {
    fontSize: 24,
    color: '#163c70',
  },

  TextInputOverlay: {
    marginLeft: 10,
    fontSize: 30,
    color: '#73838f',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
  },

  TouchOverlay: {
    width: 116,
    height: 34,
    backgroundColor: '#2d6dc4',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TouchOverlay2: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  ViewListContect: {
    flexDirection: 'row',
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
    right: -12,
  },

  ImgClose: {
    width: 18,
    height: 18,
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

  ImgActivity: {
    width: 350,
    height: 268,
  },

  flastListContainer: {
    marginTop: 5,
    backgroundColor: '#f4f5f805',
    borderColor: '#f4f5f880',
    borderWidth: 8,
  },

  ImgBackgroungSub1: {
    width: 37.5,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  TouchSub2: {
    marginTop: 10,
    width: 163,
    height: 34,
    backgroundColor: '#787878',
    borderRadius: 24.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextSub5: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  //css new
  ViewSub9: {
    width: '100%',
  },
  heightTiltle: {
    width: aspectRatio,
  },
  ViewImgList: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgStyle: {
    width: 9,
    height: 12,
  },
  ViewSub10: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // left: -10,
  },
  textActivitydate: {
    fontFamily: 'Pridi-Medium',
    fontSize: 11,
    color: '#6f819a',
    marginTop: 8,
    textAlign: 'center',
  },
  textActivityTitle: {
    fontSize: 13,
    color: '#4b4b4b',
    fontFamily: 'Mitr-Regular',
  },
  textActivityTitleNews: {
    fontSize: 14,
    color: '#014886',
    fontFamily: 'Mitr-Regular',
  },
  textactivityloca: {
    color: '#8b9bb0',
    fontSize: 11,
    fontFamily: 'Pridi-Medium',
  },
  textactivityRegiter: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  textactivityread: {
    fontSize: 10,
    color: '#7fadec',
    fontFamily: 'Mitr-Regular',
  },
  textlistactivityall: {
    fontSize: 15,
    color: '#2d6dc4',
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
  textactivityregister: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  popuptextnumber: {
    fontSize: 13,
    color: '#163c70',
    fontFamily: 'Pridi-Regular',
    marginTop: 4,
  },
  textShowAll: {
    fontSize: 14,
    color: '#2d6dc4',
    fontFamily: 'Mitr-Regular',
  },
  tabnewsck1: {
    borderWidth: 1,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#2d6dc4',
    borderColor: '#2d6dc4',
    height: 32,
    justifyContent: 'center',
  },
  tabnewsck2: {
    borderWidth: 1,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ebf3f7',
    borderColor: '#ebf3f7',
    height: 32,
    justifyContent: 'center',
  },
  texttabnewsck1: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Kittithada Bold 75',
  },
  texttabnewsck2: {
    textAlign: 'center',
    color: '#73838f',
    fontSize: 20,
    fontFamily: 'Kittithada Bold 75',
  },
  textActivityTitl: {
    fontSize: 12,
    color: '#4b4b4b',
    fontFamily: 'Mitr-Medium',
  },
  ViewSub10AI: {
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
  viewtabsearch1:{
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,

    flexDirection: 'row',
  },
  viewdelete1:{
    backgroundColor: '#f86767',

    justifyContent: 'center',
    height: 25,
    width: 25,
    borderRadius: 35,

    alignItems: 'center',
  },
  viewtabsearch2:{
    width: '90%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 21.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsearchiconbule:{
    width: 19,
    height: 19,
    marginHorizontal: 10,
    marginTop: 4,
  },
  ListnewsAidelete:{

    marginBottom: 8,
    borderRadius: 10,
    alignSelf: 'center',
    flex: 1,
    width: '95%',
    shadowColor: '#f4f6fa',
   
  },
  Listitemdelete:{
    
      width: '100%',
      height: null,
      flex: 1,
      backgroundColor: '#f4f5f850',
    
  }
  

});
