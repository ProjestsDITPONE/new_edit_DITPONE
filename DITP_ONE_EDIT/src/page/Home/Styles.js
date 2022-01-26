import {StyleSheet, Dimensions, Platform} from 'react-native';

const window = Dimensions.get('window');
const parentWidth = window.width;
const childrenWidth = window.width;
const childrenHeight = 75;

export default StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  lockItem: {
    borderRadius: 4,
    backgroundColor: '#aaa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#09f',
    alignSelf: 'center',
  },
  cover: {
    backgroundColor: '#666',
    padding: 4,
  },
  imageBGDrag: {
    height: 122,
    width: '100%',
  },
  ViewSumImageText: {
    alignItems: 'center',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop24: {
    marginTop: 24,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTopD4: {
    marginTop: -4,
  },
  ViewText: {
    bottom: 15,
    position: 'absolute',
    paddingHorizontal: 8,
  },
  colorFFFFFF: {
    color: '#FFFFFF',
  },
  color2d6dc4: {
    color: '#2d6dc4',
  },
  color40536d: {
    color: '#40536d',
  },
  TabScan: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  TabScanBorderRight: {
    borderRightColor: '#2d6dc450',
    borderRightWidth: 2,
  },
  IconScan: {
    width: 23,
    height: 18,
  },
  IconQR: {
    width: 20,
    height: 20,
  },
  ViewTabTop: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  BGeff0f6: {
    backgroundColor: '#eff0f6',
  },
  TextQR: {
    color: '#2d6dc4',
    fontSize: 18,
    marginLeft: 8,
  },
  ViewBGHeader: {
    position: 'absolute',
    left: 29,
    top: '50%',
    flexDirection: 'row',
  },
  BGProfileLogo: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
  },
  ViewAvatraHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  HeaderTest: {
    width: window.width,
    height: 220,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
  },
  header_title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // borderRadius: 4,
  },
  item_icon_swipe: {
    width: childrenHeight - 10,
    height: childrenHeight - 10,
    backgroundColor: '#fff',
    borderRadius: (childrenHeight - 10) / 2,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  item_icon: {
    width: childrenHeight - 20,
    height: childrenHeight - 20,
    resizeMode: 'contain',
  },
  item_text: {
    color: '#40536d',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,

    textAlign: 'left',
    flex: 1,
    fontFamily: 'PSL Kittithada Pro',
    fontWeight: '100',
  },
  bannerTest: {
    height: 100,
    resizeMode: 'cover',
    width: '100%',
  },
  fontDetailProfile2: {
    fontSize: 17,
    marginTop: -3,
  },
  fontCompayProfile: {
    fontSize: 22,
    marginTop: -1,
  },
  font27: {
    fontSize: 27,
  },
  marginL17: {
    marginLeft: 10,
  },
  ViewBottom: {
    backgroundColor: '#f4f8fb',
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ViewBottom1: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextBottom: {
    fontSize: 18,
    color: '#3b4254',
    marginTop: 5,
  },
  IconBottom: {
    marginTop: 7,
    marginRight: 5,
  },
  parallaxView: {
    overflow: 'hidden',
    marginTop: -110,
  },
  flex1: {
    flex: 1,
  },
  alertContainer: {
    flexDirection: 'row-reverse',
    bottom: 0,
    marginRight: 3,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,
  },
  alertBadge: {
    right: 15,
    zIndex: 2,
    position: 'absolute',
    bottom: 5,
  },
  alertImage: {
    width: 20,
    height: 20,
  },
  color2d6dc480: {
    backgroundColor: Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
    opacity: Platform.OS === 'android' ? 0.5 : 0.8,
  },
  popupPanel: {
    width: window.width * 0.85,
    maxWidth: 500,
    height: 245,
  },
  popupTextHeader: {
    fontSize: 24,
    color: '#4d4d4d',
    textAlign: 'center',
    marginTop: 20,
  },
  popupButtonCancel: {
    width: 127,
    height: 34,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 21.5,
    borderColor: '#2d6dc4',
  },
  popupButtonCancelText: {
    fontSize: 20,
    color: '#2d6dc4',
  },
  popupButtonAccept: {
    width: 127,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d6dc4',
    borderRadius: 21.5,
  },
  popupButtonAcceptText: {
    fontSize: 20,
    color: '#fff',
  },
  popup3Panel: {
    width: window.width * 0.85,
    maxWidth: 500,
    alignItems: 'center',
  },
  popup3TextHeader: {
    fontSize: 25,
    textAlign: 'center',
    // marginTop: 20,
    color: '#163c70',
    
  },
  popup3RatingContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  popup3RatingImageContainer: {
    marginHorizontal: 13,
    alignItems: 'center',
  },
  popup3RatingImageText: {
    fontSize: 20,
    marginVertical: 5,
  },
  popup3DetailContainer: {
    width: '100%',
    maxWidth: 350,
    height: 88,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0274',
  },
  popup3DetailTextInput: {
    fontSize: 20,
    padding: 0,
    margin: 7,
  },
  popup3SubmitButton: {
    width: 130,
    height: 34,
    marginTop: 12,
    borderRadius: 24.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d6dc4',
  },
  popup3disableButton: {
    width: 130,
    height: 34,
    marginTop: 12,
    borderRadius: 24.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
  },
  liveIconContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    top: 5,
    right: 5,
  },
});
