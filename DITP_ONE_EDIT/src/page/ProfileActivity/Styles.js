import {StyleSheet, Dimensions, Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
  SafeArea: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ViewSub1: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: 15,
  },
  ViewSub2: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  ViewSub3: {
    alignSelf: 'center',
    marginBottom: 10,
    bottom: 20,
  },
  ViewSub4: {
    flexDirection: 'row',
    bottom: 20,
    marginRight: 3,
  },
  ViewSub21: {
    // top: 20,

    zIndex: 0,
    bottom: 5,
    marginBottom: 10,
    left: -5,
  },
  ViewSub5: {
    width: null,
    height: 25,
    borderRadius: 8,
    backgroundColor: '#2d6dc4',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  ViewSub6: {
    width: 25,
    height: 20,
    borderRadius: 8,
    backgroundColor: '#2d6dc4',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextCompany: {
    fontSize: 25,
    color: '#163c70',
    fontFamily: 'Kittithada Bold 75',
  },
  textAlert: {
    fontSize: 19,
    color: '#e82d2d',
    fontFamily: 'Kittithada Bold 75',
    textAlign: 'center',
  },
  textIdent: {
    fontSize: 21,
    color: '#FFFFFF',
    fontFamily: 'Kittithada Bold 75',
  },
  imgEL: {
    width: 12,
    height: 13,
  },
  imgAppStore: {
    width: 15,
    height: 13,
  },
  ImageBackground: {
    width: 113,
    height: 113,
  },
  AvatarContainer: {
    left: 7,
    top: 7,
    backgroundColor: '#FFF',
  },
  AvatarContainer2: {
    bottom: 35,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  flexDirection: {
    flexDirection: 'row-reverse',
  },
  overlayContainer: {
    backgroundColor: '#FFFFFF',
  },
  //ListItemDATAACT2
  styeList: {
    width: '100%',
    // margin: 10,
    // marginTop: 5,
    // borderRightWidth: 5,
    // // borderLeftWidth: 5,
    // borderColor: '#f4f5f8',

    backgroundColor: 'transparent',
  },
  containerList: {
    // width: '100%',
    backgroundColor: 'transparent',
    // left: 40,
    bottom: 5,
    // marginLeft: 50,
    // borderWidth:1,
    flex: 1,
  },

  containerList2: {
    width: '100%',
    backgroundColor: 'transparent',
    // marginLeft: 50,
  },
  ImgList: {
    width: 60,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000010',
  },
  titleList: {
    fontSize: 20,
    color: '#4b4b4b',
    fontFamily: 'Kittithada Bold 75',
  },
  TextDateList: {
    fontSize: 18,
    color: '#8b9bb0',
  },
  ViewSubList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgListwating: {
    width: 12,
    height: 12,
  },
  textDatepayList: {
    fontSize: 16,
    color: '#f5a623',
  },
  textDateEnd: {
    fontSize: 16,
    color: '#cad8e1',
  },
  ViewSubList2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgListPaysucsess: {
    width: 12,
    height: 12,
  },
  fonttextSucess: {
    fontSize: 16,
    color: '#51af12',
  },
  ListSubtitle: {
    fontSize: 14,
    color: '#8b9bb0',
  },
  //ListItemDATAACT2
  ViewSub7: {
    flexDirection: 'row',
    // top: 5,
    // marginTop: 10,
  },
  fonttextMember: {
    fontSize: 19,
    color: '#545454',
    // fontWeight: 'bold',
  },
  ViewSub8: {
    alignItems: 'center',
    // width: width * 0.85,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
    bottom: 10,
    flex: 1,
  },
  ViewSub17: {
    // alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },

  ViewSub19: {
    alignItems: 'center',
    width: '35%',
    // left: 10,
    alignItems: 'center',
    // alignSelf: 'center',
  },
  ViewSub20: {
    // alignItems: 'center',
    // width: width * 1,
    // alignSelf: 'center',
    // width: width * 1,
    // height: height,

    flex: 1,
  },

  tabactive: {
    backgroundColor: '#2d6dc4',
  },
  tabtext: {
    fontSize: 25,
    color: '#cad8e1',
    fontFamily: 'Kittithada Bold 75',
  },
  tabStyle: {
    borderColor: '#FFFFFF',
  },
  tabContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
    width: '80%',
    height: 42,
  },

  tabContainerAndroid: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: 'transparent',
    borderRadius: 3.84,
    elevation: 5,
    width: '80%',
    height: 42,
  },
  ViewSub9: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  TextMember: {
    fontSize: 20,
    color: 'black',
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop10: {
    marginTop: 0,
  },
  ViewSub10: {
    width: null,
    height: 25,
    backgroundColor: '#2d6dc4',

    borderTopRightRadius: 12.5,
    borderBottomRightRadius: 12.5,
    paddingRight: 10,
  },
  TextHearderSub1: {
    fontSize: 15.5,
    color: '#2d6dc4',
    // fontFamily: 'Kittithada Bold 75',
    // fontSize:15,
    fontFamily:'Mitr-Regular',
    fontWeight:'500'
    // bottom: 2,
  },
  ScrollTabView: {
    width: 0,
    height: 3,
    backgroundColor: '#40536d',
    // marginLeft: 20,
  },
  ScrollTabText: {
    fontSize: 21,
    fontFamily: 'Kittithada Bold 75',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  StyleTab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderBottomColor: null,
  },
  ScrollTabBar: {
    // justifyContent: 'center',
    borderColor: '#FFFFFF',
    paddingVertical: 5,
  },
  ViewSub11: {
    backgroundColor: '#FFFFFF',
  },
  ViewSub12: {
    borderColor: '#f4f5f8',
    borderWidth: 5,
    // flexDirection: 'row',
    // // elevation: 10,
    // width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  Touchhide: {
    // backgroundColor: 'red',
    // width: width,
    // height: 33,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
  },
  TextHide: {
    fontSize: 18,
    color: '#3b4254',
    textAlign: 'center',
  },
  ViewSub13: {
    marginTop: 20,
    flexDirection: 'row',
  },
  ViewSub14: {
    width: null,
    height: 25,
    backgroundColor: '#ff8973',
    alignItems: 'center',
    borderTopRightRadius: 12.5,
    borderBottomRightRadius: 12.5,
    justifyContent: 'center',
    paddingRight: 10,
  },
  fontHistory: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Kittithada Bold 75',
    // bottom: 2,
  },
  ViewSub15: {
    flexDirection: 'row-reverse',
    flex: 0.9,
  },
  ViewSub16: {
    width: null,
    height: 30,
    // backgroundColor: '#96b3cb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    padding: 5,
  },
  Viewckbg1: {
    backgroundColor: '#96b3cb',
  },
  Viewckbg2: {
    backgroundColor: '#5185b0',
  },
  ViewSubMax: {
    width: null,
    height: 30,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    padding: 5,
  },
  fontclaim: {
    top: Platform.OS === 'ios' ? -3 : 0,
    fontSize: 21,
    color: '#FFFFFF',
    fontFamily: 'Kittithada Bold 75',
  },

  //ListHistory
  titleListHis: {
    fontSize: 24,
    color: '#163c70',
    left: 20,
    fontFamily: 'Kittithada Bold 75',
  },
  ViewSubList3: {
    flexDirection: 'row-reverse',
    marginBottom: 3,
  },
  fontListDate: {
    fontSize: 16,
    color: '#73838f',
  },
  ImgSMEs: {
    width: 90,
    height: 68.5,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  tabactive2: {
    backgroundColor: '#2d6dc4',
  },
  tabtext2: {
    fontSize: 18,

    color: '#73838f',
  },
  tabStyle2: {
    borderColor: '#FFFFFF',
    width: '50%',
    height: 31,
    backgroundColor: '#d8d8d8',
    paddingVertical: 1,
    justifyContent: 'center',
    borderRadius: 8,
    padding: 20,
  },
  tabContainer2: {},
  ViewSub18: {
    // flex: 1,
    flex: 1,
    // justifyContent: 'center',
  },

  //Overlay 1
  backdrop: {
    backgroundColor: Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
    opacity: Platform.OS === 'android' ? 0.9 : 0.6,
  },

  OverlayView1: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    position: 'absolute',
    padding: 10,
    right: -20,
    top: -45,
  },

  ImgClose: {
    width: 23,
    height: 23,
  },

  OverlayView2: {
    width: width - 50,
    height: null,
  },

  OverlayView3: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  ImgActivity: {
    width: 360,
    height: 290,
  },
  marginTop4: {
    marginTop: 4,
  },
  TextOverlay: {
    fontSize: 25,
    color: '#163c70',
  },
  TextOverlay2: {
    fontSize: 20,
    color: '#3a3a3a',
  },
  OverlayView4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Imgmaker: {
    width: 12,
    height: 15,
  },
  TextOverlay3: {
    fontSize: 20,
    color: '#3a3a3a',
  },
  OverlayView5: {
    marginTop: 10,
    alignItems: 'center',
  },
  Imgunderline: {
    width: 334,
  },
  OverlayView6: {
    flexDirection: 'row',
    alignItems: 'center',

    // marginTop: 10,
  },
  OverlayView7: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 12,
  },
  OverlayView8: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 22,
  },
  OverlayView9: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 22,
  },
  OverlayView10: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 33,
  },
  OverlayView11: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 45,
  },
  OverlayView12: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  Imgendpoint: {
    width: 12,
    height: 12,
  },
  TextOverlay4: {
    fontSize: 18,
    textAlign: 'left',
  },
  TextOverlay10: {
    fontSize: 18,
    color: '#51c42d',
  },
  ImgLinepoint: {
    height: 20,
    width: 1.5,
    marginLeft: 5,
    bottom: 0,
  },
  // ImgLinepoint2: {
  //   height: 32,
  //   width: 1.5,
  //   marginLeft: 5,
  //   bottom: 17,
  // },
  // ImgLinepoint3: {
  //   height: 32,
  //   width: 1.5,
  //   marginLeft: 5,
  //   bottom: 28,
  // },
  // ImgLinepoint4: {
  //   height: 32,
  //   width: 1.5,
  //   marginLeft: 5,
  //   bottom: 38,
  // },
  TextOverlay5: {
    fontSize: 18,
    color: '#f1cc1c',
  },
  TextOverlay6: {
    fontSize: 18,
    color: '#feffff',
  },
  Touchinfo: {
    marginLeft: 10,
    borderRadius: 11.5,
    backgroundColor: '#51c42d',
    width: 75,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottom30: {
    bottom: 0,
  },
  marginTop5: {
    marginTop: 5,
  },
  TextOverlay7: {
    fontSize: 18,
    color: '#7d7d7d',
  },
  TextOverlay8: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  Touchclose: {
    width: 163,
    height: 34,
    backgroundColor: '#f02a2a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24.5,
  },
  ViewSub22: {
    flex: 1,
    width: '100%',

    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  ViewSub23: {
    // flex: 1,
    // left: 20,
    // alignItems: 'center',
  },
  ViewSub24: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  TextSub1: {
    fontSize: 20,
    color: '#163c70',
  },
  TextSub2: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Kittithada Bold 75',
  },
  TextSub5: {
    fontSize: 25,
    color: '#f86767',
    fontFamily: 'Kittithada Bold 75',
  },
  TocuhSub1: {
    width: '100%',
    height: 48,
    backgroundColor: '#ececec',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  TocuhSub3: {
    width: '100%',
    height: 48,
    backgroundColor: '#f86767',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  TocuhSub4: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#f86767',
    borderWidth: 2,
  },
  TocuhSub2: {
    width: '100%',
    height: 48,
    backgroundColor: '#2d6dc4',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  ViewSub25: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  ImagSub1: {
    width: 13,
    height: 13.5,
  },
  marginTop8: {
    marginTop: 8,
  },
  ImagSub2: {
    width: 356,
    height: 1,
  },
  marginLeft10: {},
  TextSub3: {
    fontSize: 24,
    color: '#73838f',
  },
  ViewSub26: {
    width: '80%',
    flexDirection: 'row',

    // marginTop: 10,
    // alignItems: 'center',

    // justifyContent: 'center',
  },
  ViewSub27: {
    flexDirection: 'row-reverse',
    flex: 0.5,
  },
  ViewSub28: {
    flexDirection: 'row-reverse',
    flex: 0.5,
  },
  ImageBackgroundEdite1: {},
  ImageBackgroundEdite: {
    width: '100%',
    height: null,
    marginTop: 0,
  },
  ContainerImageBackground: {
    resizeMode: 'cover',
    alignItems: 'center',
  },

  fileText: {
    fontSize: 17.5,
    color: '#163c70',
    fontWeight: 'normal',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  ViewSub29: {
    // width: 10,
    // height: 10,
    // borderWidth: 1,
    // borderRadius: 30,
    // borderColor: 'transparent',
    width: 12,
    height: 12,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
 
  },
  ViewSub30: {
    flexDirection: 'row',
    width: '100%',
  },
  ViewSub31: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewSub32: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e82d2d',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  ViewSub33: {
    right: 80,
    zIndex: 2,
    position: 'absolute',
    bottom: 14,
  },
  ViewSub34: {
    flexDirection: 'row-reverse',
    top: -25,
    right: 20,
    zIndex: 2,
  },
  ViewSub35: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop:-35
    
  },
  ViewSub36: {
    width: '75%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#cad8e1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  ImagSub3: {
    width: 20,
    height: 20,
    left: 10,
  },
  TextSub4: {
    color: '#ffffff',
    fontSize: 20,
  },
  ImagSubBackground: {
    width: '100%',
    height: '100%',
  },
  fistTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastTabStyle: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  ViewSub37: {
    // marginLeft: 10,
    justifyContent: 'center',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },

  textmeenustory: {
    textAlign: 'center',
  
    color: '#FFFFFF',

    fontSize:16,
    fontFamily:'Mitr-Regular'
  },
  textmeenustory2: {
    textAlign: 'center',
   
    color: '#2d6dc4',
  
    fontSize:16,
    fontFamily:'Mitr-Regular'
  },
  Touchmenustory: {
    flex: 0.7,
    height: 42,
    justifyContent: 'center',
    borderWidth:0.8,
    borderColor:'#3986ee'
  },
  Touchmenustory1: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
       borderWidth:0.8,
    borderColor:'#3986ee'
  },
  Touchmenustory2: {
    flex: 0.8,
    height: 42,
    justifyContent: 'center',
       borderWidth:0.8,
    borderColor:'#3986ee'
  },
});
