import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Header, Avatar, Badge } from 'react-native-elements';
import I18n from '../utils/I18n';
import {ViewScale} from '../config/ViewScale'
export default class HeaderText extends Component {
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
          marginTop: 5,
          marginBottom: 10,
          flexDirection: 'row-reverse',
          alignSelf:'center',
          zIndex: -1,
         
        }}>
        <View style={{  flexDirection: 'row' , }}>
          
            {this.nameTab(this.state.nameTab)}
          
          {/* <View style={{ flexDirection: 'row', left: -25, zIndex: -1 }}>
            <Image
              style={{
                width: 28,
                height: 33,
                top: 7,
                zIndex: 9999,
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
              <Text style={{ fontSize: 12, color: '#135f9b' }}>น้องดูแล</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  }
  nameTab() {
    return (
      <Text
        numberOfLines={1}
        style={{
          fontSize:ViewScale(17),
          color: '#20416e',
          fontFamily: 'Mitr-Regular',
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
          width: ViewScale(103),
          height: ViewScale(20),
          backgroundColor: '#2d6dc480',
          borderRadius: 11.5,
          alignItems: 'center',
          left: 5,
        }}>
        <Text style={{ fontSize: ViewScale(14), color: '#FFFFFF' }}>
          {this.props.nameTab2}
        </Text>
      </View>
    );
  }
}
