import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, Platform } from 'react-native';
import { Header, Avatar, Badge } from 'react-native-elements';
export default class Headerstage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTab: '',
      nameTab2: '',
    };
  }

  format(item) {
    var name = item;
    return name.substring(0, 31);
  }

  render() {
    return (
      <View
        style={{
          marginTop: Platform.OS === 'android'? 17:0,
          marginBottom: 10,
          flexDirection: 'row-reverse',
          left: 50,
          zIndex: 99,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#f4f5f8',
              margin: 10,
              width: null,
              height: null,
              flexDirection: 'row',
              borderRadius: 8,
              shadowOffset: {
                height: 0,
                width: 1,
              },
              shadowRadius: 0,
              shadowOpacity: 0.15,
              shadowColor: '#FFFFFF',
              alignSelf: 'center',
              paddingHorizontal: 10
            }}>
            {this.nameTab(this.state.nameTab)}
          </View>
          <View style={{ flexDirection: 'row', left: -25, zIndex: -1 }}>
            <Image
              style={{
                width: 28,
                height: 33,
                top: 7,
                zIndex: -1,
              }}
              source={require('../image/tagname.png')}
            />
            <Image
              style={{
                width: 33,
                height: 33,
                backgroundColor: 'transparent',
                top: 10,
              }}
              source={require('../image/HearderTage2.png')}
            />
            <View style={{ top: 45, right: 30 }}>
              <Text style={{ fontSize: 12, color: '#FFFFFF' }}>น้องดูแล</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  nameTab() {
    return (
      <Text
        numberOfLines={1}
        style={{
          fontSize: 23.5,
          color: '#20416e',
          fontFamily: 'Kittithada Bold 75',
        }}>
        {' '}
        {this.props.nameTab}{' '}
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
        <Text style={{ fontSize: 14, color: '#FFFFFF' }}>
          {this.props.nameTab2}
        </Text>
      </View>
    );
  }
}
