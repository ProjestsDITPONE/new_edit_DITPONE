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
} from 'react-native';
import {Header, Avatar, Badge} from 'react-native-elements';
export default class Headerstage3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTab: '',
      nameTab2: '',
    };
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          zIndex: -1,
          left: 15,
          marginTop: 5,
          marginLeft: 10,
          marginBottom: 10,
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
            <View style={{top: 38, right: 30}}>
              <Text style={{fontSize: 12, color: '#135f9b'}}>น้องดูแล</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  nameTab() {
    return (
      <Text
        style={{
          fontSize: 25,
          color: '#20416e',
          fontFamily: 'Kittithada Bold 75',
        }}>
        {this.props.nameTab}
      </Text>
    );
  }
  nameTabAct() {
    return (
      <View
        style={{
          width: 103,
          height: 20,
          backgroundColor: '#2d6dc480',
          borderRadius: 11.5,
          alignItems: 'center',
          left: 5,
        }}>
        <Text style={{fontSize: 14, color: '#FFFFFF'}}>
          {this.props.nameTab2}
        </Text>
      </View>
    );
  }
}
