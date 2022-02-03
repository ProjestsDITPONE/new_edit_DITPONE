import {StyleSheet, Dimensions} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
export default StyleSheet.create({
  SafeArea: {
    flex: 1,
    // margin: 5,
    backgroundColor: '#ffffff',
    height: null,
  },

  ViewFlat1: {
    width: ViewScale(168),
    flexDirection: 'column',
    marginTop: ViewScale(10),
    alignItems: 'center',
    backgroundColor: '#f4f5f8',
    margin: ViewScale(5),
  },

  ViewFlat2: {
    width: ViewScale(168),
    height: ViewScale(202),
    borderColor: 'transparent',
    borderWidth: 0,
  },
  ViewFlat3: {
    // alignItems: 'center',
    // marginTop: 10,
    // flex: 1,
    // backgroundColor: '#f4f5f8',
    // justifyContent: 'center',
    width: '50%',
    backgroundColor: 'red',
    alignItems: 'center',
  },
  ViewFlat4: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    // height: null,
  },
  ViewFlat5: {
    width: ViewScale(168),
    height: ViewScale(202),
    borderColor: '#f4f5f8',
    borderWidth: ViewScale(5),
    backgroundColor: '#FFFFFF',
  },
  ViewFlat6: {
    alignItems: 'center',
    marginTop: ViewScale(10),
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  ViewText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: '#FFFFFF',
  },
  Textname: {
    fontSize: ViewScale(24),
    color: '#40536d',
    fontFamily: 'Kittithada Bold 75',
  },
  Textname2: {
    fontSize: ViewScale(22),
    color: '#40536d',
  },
  ViewTouch: {
    backgroundColor: '#2d6dc4',
    alignItems: 'center',
    // marginTop: 10,
  },
  TouchStyle: {
    // color: '#73838f',
    width:'100%',
    height: ViewScale(34),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
    borderRadius: ViewScale(18),
    backgroundColor:'#2d6dc4',
  
  },
  TouchStyle1: {
    // color: '#73838f',
    width:'100%',
    height: ViewScale(34),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
    borderRadius: ViewScale(18),
    backgroundColor:'#FFF',
  
  },
  ViewImg: {
    marginTop: ViewScale(10),
    height: ViewScale(37),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  TouchText: {
    fontSize: ViewScale(20),
    color: '#FFFFFF',
  },
  TouchText2: {
    fontSize: ViewScale(24),
    color: '#2d6dc4',
  },
  ImgCup: {width: ViewScale(13), height: ViewScale(13), marginRight: ViewScale(5)},
  fontCup: {
    fontSize: ViewScale(20),
    color: '#73838f',
  },
});
