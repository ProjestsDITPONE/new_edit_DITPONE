import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  view: {
    flex: 1,
  },
  Imagelogo: {width: 236, height: 175, alignSelf: 'center'},
  backgroundStar: {
    width: '100%',
    height: 145,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -30,
  },
  viewsubText: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  fontsub: {
    fontSize: 20,
    paddingTop: 10,
    color: '#FFFFFF',
  },
});
