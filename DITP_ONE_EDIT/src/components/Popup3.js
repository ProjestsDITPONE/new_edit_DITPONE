import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
import Icon2 from 'react-native-vector-icons/Feather';
export default class Popup3 extends Component {
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
          height: 220,
        }}>
        <View
          style={{
            top: -35,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row-reverse',
            borderRadius: 32,
            width: 23,
            alignSelf: 'flex-end',
            left: 8,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={this.props.cancle}>
            <Icon2 color="#2b688f" name="x" size={20} style={{right: 1}} />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row-reverse',
          }}>
          <TouchableOpacity style={{padding: 10}} onPress={this.props.cancle}>
            <Icon2 name="x" size={20} />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            style={{width: 72, height: 72}}
            source={require('../image/info.png')}
          />
          <View style={{top: 20}}>
            <Text
              style={{
                fontSize: 24,
                color: '#4d4d4d',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {I18n.t('translate_questionnaire_HOME')}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={
                  this.props.cancle
                  // setPopup2(false)
                }
                style={{
                  width: 127,
                  height: 34,
                  borderWidth: 2,
                  borderColor: '#2d6dc4',
                  borderRadius: 21.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Text style={{fontSize: 20, color: '#2d6dc4'}}>
                  {I18n.t('translate_across')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  this.props.accept
                  //   setTimeout(() => {
                  //     setPopup2(false);
                  //     // navigation.navigate('Questionnaire');
                  //   }, 200)
                }
                style={{
                  width: 127,
                  height: 34,
                  backgroundColor: '#2d6dc4',
                  borderRadius: 21.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#ffffff'}}>
                  {I18n.t('translate_Takequestionnaire')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
