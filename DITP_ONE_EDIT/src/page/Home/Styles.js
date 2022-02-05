import {StyleSheet, Dimensions, Platform} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
const window = Dimensions.get('window');
const parentWidth = window.width;
const childrenWidth = window.width;
const childrenHeight = 75;

export default StyleSheet.create({
  title: {
    fontSize: ViewScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: ViewScale(24),
  },
  lockItem: {
    borderRadius: ViewScale(4),
    backgroundColor: '#aaa',
    position: 'absolute',
    top: ViewScale(0),
    left: ViewScale(0),
    right: ViewScale(0),
    bottom: ViewScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: ViewScale(16),
    color: '#09f',
    alignSelf: 'center',
  },
  cover: {
    backgroundColor: '#666',
    padding: ViewScale(4),
  },
  imageBGDrag: {
    height: ViewScale(122),
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
    marginTop: ViewScale(10),
  },
  marginTop24: {
    marginTop: ViewScale(24),
  },
  marginTop20: {
    marginTop: ViewScale(20),
  },
  marginTopD4: {
    marginTop: ViewScale(-4),
  },
  ViewText: {
    bottom: ViewScale(15),
    position: 'absolute',
    paddingHorizontal: ViewScale(8),
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
    borderRightWidth: ViewScale(2),
  },
  IconScan: {
    width: ViewScale(23),
    height: ViewScale(18),
  },
  IconQR: {
    width: ViewScale(20),
    height: ViewScale(20),
  },
  ViewTabTop: {
    flexDirection: 'row',
    height: ViewScale(44),
    backgroundColor: '#ffffff',
    marginBottom: ViewScale(5),
  },
  BGeff0f6: {
    backgroundColor: '#eff0f6',
  },
  TextQR: {
    color: '#2d6dc4',
    fontSize: ViewScale(18),
    marginLeft: ViewScale(8),
  },
  ViewBGHeader: {
    position: 'absolute',
    left: ViewScale(29),
    top: '50%',
    flexDirection: 'row',
  },
  BGProfileLogo: {
    width: ViewScale(80),
    height: ViewScale(80),
    resizeMode: 'stretch',
  },
  ViewAvatraHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  avatarContainer: {
    borderWidth: ViewScale(2),
    borderColor: '#fff',
  },
  HeaderTest: {
    width: window.width,
    height: ViewScale(220),
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: ViewScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: ViewScale(2),
  },
  header_title: {
    color: '#333',
    fontSize: ViewScale(24),
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
    marginLeft: ViewScale(20),
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
    fontSize: ViewScale(20),
    marginLeft: ViewScale(20),
    marginRight: ViewScale(20),

    textAlign: 'left',
    flex: 1,
    fontFamily: 'PSL Kittithada Pro',
    fontWeight: '100',
  },
  bannerTest: {
    height: ViewScale(100),
    resizeMode: 'cover',
    width: '100%',
  },
  fontDetailProfile2: {
    fontSize: ViewScale(17),
    marginTop: ViewScale(-3),
  },
  fontCompayProfile: {
    fontSize: ViewScale(22),
    marginTop: ViewScale(-1),
  },
  font27: {
    fontSize: ViewScale(27),
  },
  marginL17: {
    marginLeft: ViewScale(10),
  },
  ViewBottom: {
    backgroundColor: '#f4f8fb',
    width: '100%',
    height: ViewScale(35),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ViewBottom1: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: ViewScale(35),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextBottom: {
    fontSize: ViewScale(18),
    color: '#3b4254',
    marginTop: ViewScale(5),
  },
  IconBottom: {
    marginTop: ViewScale(7),
    marginRight: ViewScale(5),
  },
  parallaxView: {
    overflow: 'hidden',
    marginTop: ViewScale(-110),
  },
  flex1: {
    flex: 1,
  },
  alertContainer: {
    flexDirection: 'row-reverse',
    bottom: ViewScale(0),
    marginRight: ViewScale(3),
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,
  },
  alertBadge: {
    right: ViewScale(15),
    zIndex: 2,
    position: 'absolute',
    bottom: ViewScale(5),
  },
  alertImage: {
    width: ViewScale(20),
    height: ViewScale(20),
  },
  color2d6dc480: {
    backgroundColor: Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
    opacity: Platform.OS === 'android' ? 0.5 : 0.8,
  },
  popupPanel: {
    width: window.width * 0.85,
    maxWidth: ViewScale(500),
    height: ViewScale(245),
  },
  popupTextHeader: {
    fontSize: ViewScale(24),
    color: '#4d4d4d',
    textAlign: 'center',
    marginTop: ViewScale(20),
  },
  popupButtonCancel: {
    width: ViewScale(127),
    height: ViewScale(34),
    marginRight: ViewScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: ViewScale(21.5),
    borderColor: '#2d6dc4',
  },
  popupButtonCancelText: {
    fontSize: ViewScale(20),
    color: '#2d6dc4',
  },
  popupButtonAccept: {
    width: ViewScale(127),
    height: ViewScale(34),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d6dc4',
    borderRadius: ViewScale(21.5),
  },
  popupButtonAcceptText: {
    fontSize: ViewScale(20),
    color: '#fff',
  },
  popup3Panel: {
    width: window.width * 0.85,
    maxWidth: ViewScale(500),
    alignItems: 'center',
  },
  popup3TextHeader: {
    fontSize: ViewScale(25),
    textAlign: 'center',
    // marginTop: 20,
    color: '#163c70',
    
  },
  popup3RatingContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: ViewScale(20),
  },
  popup3RatingImageContainer: {
    marginHorizontal: ViewScale(13),
    alignItems: 'center',
  },
  popup3RatingImageText: {
    fontSize: ViewScale(20),
    marginVertical: ViewScale(5),
  },
  popup3DetailContainer: {
    width: '100%',
    maxWidth: ViewScale(350),
    height: ViewScale(88),
    borderRadius: ViewScale(4),
    borderWidth: 1,
    borderColor: '#0274',
  },
  popup3DetailTextInput: {
    fontSize: ViewScale(20),
    padding: ViewScale(0),
    margin: ViewScale(7),
  },
  popup3SubmitButton: {
    width: ViewScale(130),
    height: ViewScale(34),
    marginTop: ViewScale(12),
    borderRadius: ViewScale(24.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d6dc4',
  },
  popup3disableButton: {
    width: ViewScale(130),
    height: ViewScale(34),
    marginTop: ViewScale(12),
    borderRadius: ViewScale(24.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
  },
  liveIconContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    top: ViewScale(5),
    right: ViewScale(5),
  },
});
