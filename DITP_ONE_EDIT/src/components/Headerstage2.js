import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Header, Avatar, Badge} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../utils/I18n';
export default class Headerstage2 extends Component {
  constructor(props) {
    // var aspectRatio1 = 110;
    // if (height / width > 1.6) {
    //   //iphone
    //   aspectRatio1 = 80;
    // }
    super(props);
    this.state = {
      nameTab: '',
      nameTab2: '',
      textShow: -1,
      aspectRatio: null,
    };
  }
  toggleNumberOfLines = () => {
    this.setState({textShow: this.state.textShow});
  };

  format(item) {
    var name = item;
    return name.substring(0, 28);
  }

  sizeipad() {
    // console.log('TEST');
    const {height, width} = Dimensions.get('window');

    var aspectRatio = this.state.aspectRatio;
    // aspectRatio;
    if (height / width > 1.6) {
      //iphone
      // thisaspectRatio = 3;
      aspectRatio = 100;
    }
  }

  componentDidMount() {
    this.sizeipad();
  }

  render() {
    // const window = Dimensions.get('window');
    // const {height, width} = Dimensions.get('window');

    // //ipad
    // var {aspectRatio} = 1.6;
    // if (height / width > 1.6) {
    //   //iphone
    //   aspectRatio = 3;
    // }
    return (
      <View
        style={{
          marginBottom: 15,
          marginTop: 10,
          zIndex: -1,
          flexDirection: 'row-reverse',
          left: 34,
          
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#f4f5f8',
              width: null,
              height: 29,
              flexDirection: 'row',
              borderRadius: 8,
              zIndex: 10000,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 1,
            }}>
            {this.nameTab(this.state.nameTab)}
            {/* {this.nameTabAct(this.state.nameTab2)} */}
          </View>

          <View style={{flexDirection: 'row', right: 1, bottom: 9}}>
            <Image
              style={{
                width: 28,
                height: 33,
                left: -15,
                top: 8,
                zIndex: 9999,
              }}
              source={require('../image/tagname.png')}
            />
            <Image
              style={{
                width: 32,
                height: 33,
                backgroundColor: 'transparent',
                top: 8,
                left: -10,
              }}
              source={require('../image/HearderTage2.png')}
            />
            <View style={{top: 40, right: Platform.OS === 'android' ? 40 : 40}}>
              <Text style={{fontSize: 12, color: '#135f9b'}}>{I18n.t('translate_NongDulea')}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  nameTab() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: this.state.aspectRatio,
          marginRight: 3,
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: Platform.OS === 'android' ? 15 : 16,
            color: '#20416e',
            fontFamily: 'Mitr-Regular',
          }}>
          {/* {this.props.nameTab.length > 28
            ? this.format(this.props.nameTab) + '...' + ' '
            : this.props.nameTab} */}{' '}
          {this.props.nameTab}{' '}
        </Text>

        {this.nameTabAct(this.state.nameTab2)}
      </View>
    );
  }
  nameTabAct() {
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={['#5dbde6', '#1d61bd']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          alignItems: 'center',
          width: 69,
          height: 20,
          backgroundColor: '#2d6dc480',
          borderRadius: 11.5,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 14, color: '#FFFFFF'}}>
          {this.props.nameTab2} {I18n.t('translate_activities')}
        </Text>
      </LinearGradient>
    );
  }
}
