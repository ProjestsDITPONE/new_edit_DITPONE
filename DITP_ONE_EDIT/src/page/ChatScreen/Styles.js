import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  fontEnd: {
    fontSize: 18,
    color: '#ffffff',
  },
  viewEnd: {
    width: 104,
    height: 28,
    backgroundColor: '#2d6dc4',
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
  },
  viewFootEnd: {
    height: 50,
  },
  viewMainAlert: {height: 300, alignItems: 'center'},
  alerttitle: {alignItems: 'center', marginTop: 10, width: '60%'},
  fontalertitle: {fontSize: 22, color: '#163c70', textAlign: 'center'},
  background2d6c480: {backgroundColor: '#2d6dc480'},
  viewImagealert1: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  viewAlert2: {
    width: '30%',
    alignItems: 'center',
  },
  sizeImageAlert: {
    width: 50,
    height: 47,
  },
  colorTextAlert: {
    fontSize: 20,
    color: '#4d4d4d',
  },
  colorTextAlert2: {fontSize: 20, color: '#dcdcdc'},
  viewTextCenterAlert: {
    width: '90%',
    marginTop: 10,
  },
  textCenterAlert: {textAlign: 'center', color: '#4d4d4d', fontSize: 20},
  marginTop20: {marginTop: 20},
  btnAlert: {
    width: 220,
    height: 45,
    borderRadius: 24.5,
    backgroundColor: '#002270',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBTNAlert: {fontSize: 22, color: '#ffffff'},
  viewMainInput: {
    flexDirection: 'row',
    width: '100%',
    height: 57,
    backgroundColor: '#ffffff',
    shadowOffset: {width: 1, height: -3},
    shadowColor: '#cccccc',
    shadowOpacity: 0.1,
  },
  viewLeftInput: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageFile: {width: 15, resizeMode: 'contain'},
  imagePhoto: {width: 20, resizeMode: 'contain'},
  viewCenterInput: {
    width: width*0.5,
    height: null,
    // marginHorizontal: 8,
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,
  },
  inputChat: {
    // width: '70%',
    // marginLeft: 15,
    // height: 50,
    fontFamily: 'PSL Kittithada Pro',
    fontWeight: 'normal',
    color: '#000000',
    fontSize: 25,
    // borderWidth:1,
    flex:1,
    // paddingTop: 10,
  },
  viewBTNChat: {
    // marginTop:13,
    width: 60,
    height: 26,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#04a68a',
    borderRadius: 40,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  textBtnInput: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PSL Kittithada Pro',
  },
  chatWrap: {
    width,
    height,
    backgroundColor: '#ffffff',
  },
  onlineIndicator: {
    fontSize: 20,
    color: 'green',
  },
  subtitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  viewMainBotChat: {
    width: 269,
    zIndex: -1,
  },
  textTitleBotChat: {
    color: '#4d4d4d',
    fontSize: 18,
    margin: 10,
    fontFamily: 'PSL Kittithada Pro',
  },
  listItemBotChat: {
    marginHorizontal: 3,
    marginTop: 3,
  },
  textBotChat: {
    color: '#2d6dc4',
    fontSize: 18,
  },
  textBottomBotChat: {
    color: '#4d4d4d',
    fontSize: 18,
    margin: 10,
    fontFamily: 'PSL Kittithada Pro',
  },
  lineChat: {
    width: '90%',
    height: 1,
    backgroundColor: '#97979750',
    marginVertical: 15,
    alignSelf: 'center',
  },
  color246dc4: {
    color: '#2d6dc4',
  },
  hashtag: {
    color: '#2d6dc4',
  },
});
