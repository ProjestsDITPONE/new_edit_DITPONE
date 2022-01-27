import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Headers from '../../components/Headers';

const ChangeScreen = ({navigation}) => {
  const [Newpassword, setNewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      <View style={{marginTop: 20, zIndex: -1}}>
        <Text style={{fontSize: 28, color: '#40536d'}}>{I18n.t('translate_Changepassword')}</Text>
        <View style={{marginLeft: 5, marginTop: 10}}>
          <ImageBackground
            source={require('../../image/textbox.png')}
            style={{
              width: 354,
              height: 48,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              maxLength={10}
              value={Newpassword}
              onChangeText={text => setNewpassword(text)}
              secureTextEntry={true}
              style={{fontSize: 26, left: 30}}
              placeholder={I18n.t('transalte_new_pass')}
              placeholderTextColor="#cad8e1"
            />
          </ImageBackground>
          <ImageBackground
            source={require('../../image/textbox.png')}
            style={{
              width: 354,
              height: 48,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TextInput
              value={confirmpassword}
              maxLength={10}
              onChangeText={text => setconfirmpassword(text)}
              secureTextEntry={true}
              style={{fontSize: 26, left: 30}}
              placeholder={I18n.t('password2_regis')}
              placeholderTextColor="#cad8e1"
            />
          </ImageBackground>
          <View
            style={{
              top: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 354,
                height: 48,
                backgroundColor: '#2d6dc4',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 21.5,
              }}>
              <Text style={{fontSize: 27, color: '#ffffff'}}>{I18n.t('translate_Accept')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangeScreen;
