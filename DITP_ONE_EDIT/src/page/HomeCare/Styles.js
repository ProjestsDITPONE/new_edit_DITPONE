import {StyleSheet, Dimensions} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
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
  Imagelogo: {width: ViewScale(236), height: ViewScale(175), alignSelf: 'center'},
  backgroundStar: {
    width: '100%',
    height: ViewScale(145),
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'absolute',
    bottom: ViewScale(-30),
  },
  viewsubText: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  fontsub: {
    fontSize: ViewScale(24),
    paddingTop: ViewScale(10),
    color: '#FFFFFF',
  },
});
