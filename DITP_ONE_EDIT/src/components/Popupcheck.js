import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
import Icon2 from 'react-native-vector-icons/Feather';

export default class Popupcheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: null,
      cancle: null,
      Icon: null,
      text: '',
    };
  }
  render() {
    return (
      // <View
      //   style={{
      //     width: 300,
      //     height: 200,
      //     backgroundColor: '#ffffff',
      //     padding: 10,
      //   }}>

      // </View>
      <View>
        <Text
          style={{
            color: '#20416e',
            fontSize: 22,
            fontFamily: 'Kittithada Bold 75',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {'กรุณายืนยันการปรับแก้ไขเมนูหลัก'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 35,
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={this.props.cancle}
            style={{
              justifyContent: 'center',
              width: 120,
              height: 39,
              backgroundColor: '#f86767',
              borderRadius: 45,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFF',
                fontSize: 20,
              }}>
              {'ยกเลิก'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.accept}
            style={{
              justifyContent: 'center',
              width: 120,
              height: 39,
              backgroundColor: '#2d6dc4',
              borderRadius: 25,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFF',
                fontSize: 20,
              }}>
              {'ยืนยัน'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
