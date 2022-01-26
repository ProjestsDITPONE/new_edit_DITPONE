import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';

class Point1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexslide: 0,
    };
    this.swiperRef = swiper => (this.swiper = swiper);
  }
  render() {
    return (
   
                <View
                  style={{
                    alignSelf: 'center',

                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: 11,
                      height: 11,
                    }}
                    source={require('../../image/poin1x.png')}
                  />
                  <Image
                    style={{
                      width: 25,
                      height: 1.5,
                      marginTop: 5,
                    }}
                    source={require('../../image/linepoint1x.png')}
                  />
                  <Image
                    style={{
                      width: 11,
                      height: 11,
                    }}
                    source={require('../../image/point2x.png')}
                  />
                  <Image
                    style={{
                      width: 25,
                      height: 1.5,
                      marginTop: 5,
                    }}
                    source={require('../../image/linepoint2x.png')}
                  />
                  <Image
                    style={{
                      width: 11,
                      height: 11,
                    }}
                    source={require('../../image/point3x.png')}
                  />
                  <Image
                    style={{
                      width: 25,
                      height: 1.5,
                      marginTop: 5,
                    }}
                    source={require('../../image/linepoint3x.png')}
                  />
                    <Image
                    style={{
                      width: 11,
                      height: 11,
                    }}
                    source={require('../../image/point4x.png')}
                  />
                </View>
         
    );
  }
}

export default (Point1);


