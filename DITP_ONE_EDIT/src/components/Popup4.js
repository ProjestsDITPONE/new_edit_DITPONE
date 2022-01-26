import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
import Icon2 from 'react-native-vector-icons/Feather';
import Styles from '../page/Home/Styles';
export default class Popup3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: null,
      cancle: null,
      Ass1: null,
      Ass2: null,
      Ass3: null,
      Image1: null,
      Image2: null,
      Image3: null,
      text1: null,
      text2: null,
      text3: null,
      textInput: null,
      Touch: null,
      Touch2: null,
      TouchStyle: null,
    };
  }
  render() {
    return (
      <View style={Styles.popup3Panel}>
        <Text style={Styles.popup3TextHeader}>
        {I18n.t('translate_PleaseRate')}
        </Text>
        <View style={Styles.popup3RatingContainer}>
          <View style={Styles.popup3RatingImageContainer}>
            <TouchableOpacity onPress={this.props.Ass1}>
              <Image
                style={{width: 68, height: 68}}
                source={this.props.Image1}
              />
            </TouchableOpacity>
            {this.props.text1}
          </View>
          <View style={Styles.popup3RatingImageContainer}>
            <TouchableOpacity onPress={this.props.Ass2}>
              <Image
                style={{width: 68, height: 68}}
                source={this.props.Image2}
              />
            </TouchableOpacity>
            {this.props.text2}
          </View>
          <View style={Styles.popup3RatingImageContainer}>
            <TouchableOpacity onPress={this.props.Ass3}>
              <Image
                style={{width: 68, height: 68}}
                source={this.props.Image3}
              />
            </TouchableOpacity>
            {this.props.text3}
          </View>
        </View>
        {this.props.textInput}
        {this.props.Touch}
        <TouchableOpacity
          disabled={this.props.Touch}
          onPress={this.props.Touch2}
          style={this.props.TouchStyle}>
          <Text style={Styles.popupButtonAcceptText}>ส่ง</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
