import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
import Icon2 from 'react-native-vector-icons/Feather';
export default class Popup5 extends Component {
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
      <View
        style={{
          width: 300,
          height: 200,
          backgroundColor: '#ffffff',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row-reverse',
          }}>
          <TouchableOpacity onPress={this.props.accept}>
            <Icon2 name="x" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          {this.props.Icon}
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 40, color: '#4d4d4d'}}>
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}
