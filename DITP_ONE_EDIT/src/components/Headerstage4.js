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
import I18n from '../utils/I18n';
export default class Headerstage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTab: '',
      nameTab2: '',
      textShow: -1,
    };
  }
  toggleNumberOfLines = () => {
    this.setState({textShow: this.state.textShow});
  };
  render() {
    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          left: Platform.OS === 'android' ? 34 : 15,
          marginTop: 5,
          marginLeft: 10,
          marginBottom: 10,
          zIndex: -1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#f4f5f8',
              margin: 10,
              width: null,
              paddingLeft: 10,
              paddingRight: 10,
              height: 29,
              flexDirection: 'row',
              borderRadius: 8,
              shadowOffset: {
                height: null,
                width: null,
              },
              shadowRadius: 0,
              shadowOpacity: 0.15,
              shadowColor: '#FFFFFF',
              zIndex: 10000,
              left: 12,
              alignItems: 'center',
            }}>
            {this.nameTab(this.state.nameTab)}
            {this.nameTabAct(this.state.nameTab2)}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 28,
                height: 33,
                left: -5,
                top: 7,
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
              }}
              source={require('../image/HearderTage3.png')}
            />
            <View style={{top: 40, right: Platform.OS === 'android' ? 30 : 30}}>
              <Text style={{fontSize: 12, color: '#135f9b'}}>น้องดูแล</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  nameTab() {
    return (
      <View style={{position: 'relative'}}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            fontSize: 25,
            color: '#20416e',
            fontFamily: 'Kittithada Bold 75',
          }}>
          {this.props.nameTab}
        </Text>
      </View>
    );
  }
  nameTabAct() {
    return (
      <View
        style={{
          width: 69,
          height: 20,
          backgroundColor: '#2d6dc480',
          borderRadius: 11.5,
          alignItems: 'center',
          left: 5,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 14, color: '#FFFFFF'}}>
          {this.props.nameTab2} {I18n.t('translate_activities')}
        </Text>
      </View>
    );
  }
}
