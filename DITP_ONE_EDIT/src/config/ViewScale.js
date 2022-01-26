import {PixelRatio, Platform} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ViewScale = size => {
  Platform.OS === 'android' && size > 2 ? (size += 4) : size;
  let newSize = RFValue(size, 896);
  if (newSize > 2) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  } else {
    return newSize;
  }
};
