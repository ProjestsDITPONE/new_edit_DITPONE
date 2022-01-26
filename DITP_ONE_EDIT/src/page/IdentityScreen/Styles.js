import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
  ViewSub1: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  alignSelfCenter: {
    alignSelf: 'center',
    marginTop: 10,
  },
  TextSub1: {
    fontSize: 25,
    color: '#20416e',
  },
  TextSub2: {
    fontSize: 15,
    color: '#9dadb8',
  },
  ViewSub2: {
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewSub3: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub3: {
    fontSize: 30,
    color: '#ffffff',
  },
  ImageSub1: {
    width: 107,
    height: 3,
    right: 3,
  },
  ImageBackgroundSub1: {
    width: 40,
    height: 40,
    right: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewSub4: {
    alignSelf: 'center',
    flexDirection: 'row',


  },
  TextSub4: {
    fontSize: 16,
    color: '#40536d',
  },
  TextSub5: {
    fontSize: 16,
    color: '#dcdee6',
  },
  ViewSub5: {
    width: 109,
    height: 3,
    right: 1,
    backgroundColor: '#2d6dc4',
  },
  ViewSub6: {
    width: 50,
    height: 50,
    right: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSub6: {
    fontSize: 16,
    color: '#40536d',
  },
  ViewSub7: {
    alignItems: 'center',
    // margin: 20,
    // alignSelf: 'center',
  },
  ViewSub8: {
  
    // height: '100%',
    backgroundColor: '#e6e9f1',
    // alignItems: 'center',
    // alignSelf: 'center',
    // borderWidth:1,
    borderRadius:8
  },
  ImageSub2: {
    width: 155,
    height: 122,
    top: 20,
  },
  ViewSub9: {
    flexDirection: 'column-reverse',
    flex: 1,
  },
  ViewSub10: {
    width: 321,
    height: 125,
    backgroundColor: '#2d6dc4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ImageSub3: {
    width: 110,
    height: 120,
    top: 10,
  },
  marginBottom10: {
    // marginBottom: 10,
  },
  TocuhSub1: {
    width: '80%',
    height: 48,
    borderRadius: 21.5,
    backgroundColor: '#2d6dc4',
    justifyContent: 'center',
    // alignSelf: 'center',
    alignItems: 'center',
  },
  TocuhSub2: {
    width: '80%',
    height: 48,
    borderRadius: 21.5,
    backgroundColor: '#dadada',
    justifyContent: 'center',
    // alignSelf: 'center',
    alignItems: 'center',
  },
  TextSub7: {
    fontSize: 25,
    color: '#ffffff',
  },
  ViewSub11: {
    flex: 1,
    left: 48,
    top: 20,
  },
  ViewSub12: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageSub4: {
    width: 14,
    height: 17,
  },
  TextSub8: {
    fontSize: 25,
    color: '#4b4b4b',
  },
  ViewSub13: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 18,
  },
  ImageSub5: {
    width: 19,
    height: 18,
  },
  ImageSub6: {
    width: 208,
    height: 135,
    
  },
  ImageSub7: {
    width: 112,
    height: 148,
    top: 20,
  },
  ViewSub14: {
    // flex: 1,
    flexDirection: 'row-reverse',
    width: '25%',
  },
  ImageSub8: {
    width: 20,
    height: 20,
    // bottom: 10,
  },
  bottom45: {
    bottom: 45,
  },
  ViewSub15: {
    width: '95%',
    height: null,
  },
  flexDirectionRow: {
    flexDirection: 'row-reverse',
  },
  ViewSub16: {
    alignItems: 'center',
    // bottom: 10,
  },
  TextSub9: {
    fontSize: 28,
    color: '#163c70',
  },
  ViewSub17: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageSub9: {
    width: 18,
    height: 18,
    right: 6,
  },
  TextSub10: {
    fontSize: 22,
    color: '#686868',
  },
  ViewSub18: {
    flexDirection: 'row',
    marginTop: 10,
    // top: 20,
  },
  ViewSub19: {
    // width: 129,
    height: 34,
    backgroundColor: '#04a68a',
    borderRadius: 8,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    textAlign:'center',
    flex:1.5,
marginHorizontal:5
  },
  ViewSub20: {
    width: 18,
    height: 17,
    right: 5,
  },
  TextSub11: {
    fontSize: 21,
    color: '#ffffff',
  },
  TocuhSub3: {
    // width: 129,
    height: 34,
    backgroundColor: '#499cc3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex:1.5,

    
  },
  container: {
    flex: 1,

    alignItems: 'center',
    // flexDirection: 'column',
    // backgroundColor: '#2d6dc4',
    backgroundColor: '#2d6dc4',
  },
  preview: {
    // flex: 1,
    // width: width * 0.8,
    // height: height * 0.5,

     width: width *0.8,
    height: height * 0.5,
    
    justifyContent: 'flex-end',

    backgroundColor: '#4a4a4a',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  preview1: {
    // flex: 1,
    width: '100%',
    height: '60%',
    borderWidth: 2,
    // justifyContent: 'flex-end',
    backgroundColor: '#4a4a4a',
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderRadius: 8,
  },
  container1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  capture1: {
    // flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 5,
    // padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // margin: 20,
    top: 30,
  },
});
