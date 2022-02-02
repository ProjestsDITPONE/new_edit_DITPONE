import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Header, Avatar, Badge } from 'react-native-elements';
import { ViewScale } from '../config/ViewScale';
import I18n from '../utils/I18n';
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
          marginTop: ViewScale(5),
          marginBottom: ViewScale(10),
          flexDirection: 'row-reverse',
          left: ViewScale(50),
          zIndex: -1,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#f4f5f8',
              margin: ViewScale(10),
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
              paddingHorizontal: ViewScale(10),
            }}>
            {this.nameTab(this.state.nameTab)}
          </View>
          <View style={{ flexDirection: 'row', left: ViewScale(-25), zIndex: -1 }}>
            <Image
              style={{
                width: ViewScale(28),
                height: ViewScale(33),
                top: ViewScale(7),
                zIndex: 9999,
              }}
              source={require('../image/tagname.png')}
            />
            <Image
              style={{
                width: ViewScale(33),
                height: ViewScale(33),
                backgroundColor: 'transparent',
                top: ViewScale(10),
              }}
              source={require('../image/HearderTage2.png')}
            />
            <View style={{ top: ViewScale(45), right: ViewScale(30) }}>
              <Text style={{ fontSize: ViewScale(12), color: '#135f9b' }}>{I18n.t('translate_NongDulea')}</Text>
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
          fontSize: ViewScale(14),
          color: '#20416e',
          fontFamily: 'Mitr-Regular',
          
          height:ViewScale(28.9)
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
          left: ViewScale(5),
        }}>
        <Text style={{ fontSize: ViewScale(15), color: '#FFFFFF' }}>
          {this.props.nameTab2}
        </Text>
      </View>
    );
  }
}
