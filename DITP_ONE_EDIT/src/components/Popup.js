import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
export default class Popup extends Component {
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
          width: '100%',
          height: null,
          backgroundColor: '#ffffff',
          padding: 10,
        }}>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          {this.props.Icon}
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 24, color: '#f86767'}}>
            {this.props.text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            // borderWidth:1,
            marginHorizontal:10
            
          }}>
       
          <TouchableOpacity
            onPress={this.props.cancle}
            style={{
              width: 127,
              height: 34,
              backgroundColor: '#f86767',
              borderRadius: 21.5,
              alignItems: 'center',
              justifyContent: 'center',
              // marginLeft: 20,
              marginHorizontal:10
            }}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>
              {I18n.t('translate_Cancel')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={this.props.accept}
            style={{
              width: 127,
              height: 34,
              backgroundColor: '#2d6dc4',
              borderRadius: 21.5,
              alignItems: 'center',
              justifyContent: 'center',
              // marginRight: 15,
              marginHorizontal:10
            }}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>
              {I18n.t('translate_AcceptUn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
