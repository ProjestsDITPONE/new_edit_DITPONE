import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
export const {height, width} = Dimensions.get('window');
//ipad
var aspectRatio = 1;
if (height / width > 1.6) {
  //iphone
  aspectRatio = 0;
}

const Loader = () => {
  return (
    <View style={styles.container}>
      {aspectRatio == 1 ? (
        <Image
          style={{width: '14%', height: '10%'}}
          source={require('../image/LogoLoading2oct.gif')}
        />
      ) : (
        <Image
          style={{width: '20%', height: '10%'}}
          source={require('../image/LogoLoading2oct.gif')}
        />
      )}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    width: '100%',
    height: height,
    zIndex: 99,
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },
});
