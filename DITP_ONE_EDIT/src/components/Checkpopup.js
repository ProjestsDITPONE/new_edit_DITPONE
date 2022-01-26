import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../utils/I18n';
import Icon2 from 'react-native-vector-icons/Feather';
export default class Checkpopup extends Component {
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

{/* <View>
<Text
  style={{
    color: '#20416e',
    fontSize: ViewScale(22),
    fontFamily: 'Kittithada Bold 75',
    textAlign: 'center',
    marginBottom: 20,
  }}>
  {'กรุณายืนยันการปรับแก้ไขเมนูหลัก'}
</Text>
<View
  style={{

    flexDirection:'row',
    height:ViewScale(35),
    justifyContent: 'center',
    marginBottom:10
  }}>
  <TouchableOpacity
    onPress={() => {
     setPopupChenge(false)
    }}
    style={{
     justifyContent: 'center',
      width:ViewScale(120),
      height: ViewScale(39),
      backgroundColor: '#f86767',
      borderRadius: 45,
      marginHorizontal: 10,
    }}>
    <Text
      style={{
        textAlign: 'center',
        color: '#FFF',
        fontSize: ViewScale(20),
      }}>
      {'ยกเลิก'}
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => {

     _SendMenuHome();
     setTimeout(() => {
       setPopupChenge(false)
       
     }, 200);
    
      
    }}
    style={{
     justifyContent: 'center',
      width:ViewScale(120),
      height: ViewScale(39),
      backgroundColor: '#2d6dc4',
      borderRadius: 25,
      marginHorizontal: 10,
    }}>
    <Text
      style={{
        textAlign: 'center',
        color: '#FFF',
        fontSize:ViewScale(20),
      }}>
      {'ยืนยัน'}
    </Text>
  </TouchableOpacity>
</View>
</View> */}