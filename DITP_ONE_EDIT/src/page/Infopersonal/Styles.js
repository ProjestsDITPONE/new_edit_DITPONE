import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
  ViewSub1: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  ImageBackground: {
    width: 86,
    height: 88,
    right: 5,
  },
  AvatarContainer: {
    left: -5,
    top: -3,
  },
  flexDirection: {
    flexDirection: 'row-reverse',
  },
  AvatarContainer2: {
    bottom: 21,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  overlayContainer: {
    backgroundColor: '#FFFFFF',
  },

  ViewSub2: {
    flex: 1,
    left: 48,
    top: 20,
  },
  ViewSub3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub1: {
    width: 14,
    height: 17,
  },
  TextSub1: {
    fontSize: 25,
    color: '#4b4b4b',
  },
  ViewSub4: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 18,
  },
  ImgSub2: {
    width: 18,
    height: 15,
  },

  ViewSub5: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 35,
  },
  ImgSub3: {
    width: 19,
    height: 18,
  },
  ViewSub6: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ViewSub7: {
    alignContent: 'center',
    alignItems: 'center',
  },
  TextSub2: {
    fontSize: 25,
    color: '#163c70',
  },
  TextSub3: {
    fontSize: 20,
    color: '#73838f',
  },
  ViewSub8: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  ViewSub9: {
    width: 385,
    height: null,
    backgroundColor: '#f8fbfd',
  },
  margin15: {
    margin: 15,
  },
  TextSub4: {
    fontSize: 24,
    color: '#163c70',
  },
  marginTop7: {
    marginTop: 7,
  },
  ImgSub4: {
    width: 356,
    height: 1,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginTop5: {
    marginTop: 5,
  },
  TextSub5: {
    fontSize: 18,
    color: '#73838f',
  },
  ImgSub5: {
    width: 356,
    height: 1,
    alignSelf: 'center',
  },
  ViewSub10: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
