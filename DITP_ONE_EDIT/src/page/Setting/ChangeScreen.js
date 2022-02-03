import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
import Headers from '../../components/Headers';

const ChangeScreen = ({navigation}) => {
  const [Newpassword, setNewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <View style={{marginTop: ViewScale(20), zIndex: -1}}>
        <Text style={{fontSize: ViewScale(28), color: '#40536d'}}>{I18n.t('translate_Changepassword')}</Text>
        <View style={{marginLeft: ViewScale(5), marginTop: ViewScale(10)}}>
          <ImageBackground
            source={require('../../image/textbox.png')}
            style={{
              width: ViewScale(354),
              height: ViewScale(48),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              maxLength={10}
              value={Newpassword}
              onChangeText={text => setNewpassword(text)}
              secureTextEntry={true}
              style={{fontSize: ViewScale(26), left: ViewScale(30)}}
              placeholder={I18n.t('transalte_new_pass')}
              placeholderTextColor="#cad8e1"
            />
          </ImageBackground>
          <ImageBackground
            source={require('../../image/textbox.png')}
            style={{
              width: ViewScale(354),
              height: ViewScale(48),
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: ViewScale(20),
            }}>
            <TextInput
              value={confirmpassword}
              maxLength={10}
              onChangeText={text => setconfirmpassword(text)}
              secureTextEntry={true}
              style={{fontSize: ViewScale(26), left: ViewScale(30)}}
              placeholder={I18n.t('password2_regis')}
              placeholderTextColor="#cad8e1"
            />
          </ImageBackground>
          <View
            style={{
              top: ViewScale(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: ViewScale(354),
                height: ViewScale(48),
                backgroundColor: '#2d6dc4',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: ViewScale(21.5),
              }}>
              <Text style={{fontSize: ViewScale(27), color: '#ffffff'}}>{I18n.t('btn_accept2_complaint')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangeScreen;
