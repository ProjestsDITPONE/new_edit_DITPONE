import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Header, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../../utils/I18n';
import {
  getMenuHome,
  getImg,
  ScoreLogin,
  getStatus,
  SendEmail,
} from '../../actions/data.actions';
import {
  loginauthorities,
  loginUser,
  refreshtoken,
  getimgprofile,
  getinfoAuth,
} from '../../actions/auth.actions';

import Styles from './Styles';
import Icon1 from 'react-native-vector-icons/Entypo';
class LoginScreenofficerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modalVisible: false,
      dataSend: [],
      EyeDi: true,
    };
  }

  onOpen = () => this.setState({ modalVisible: true });

  _getSendEmail = async values => {
    const payload = {
      body: { email: this.state.email },
    };
    try {
      const response = await this.props.dispatch(SendEmail(payload));
      if (response.res_code === '00') {
        this.setState({ dataSend: response.res_result });
        Alert.alert(I18n.t('transalte_system_send_email'));
        this.setState({ modalVisible: false });
      } else if (response.res_code === '01') {
        this.setState({ dataSend: response.res_result });
        Alert.alert(I18n.t('transalte_please_wait_moment'));
        this.setState({ modalVisible: false });
      } else {
        Alert.alert(I18n.t('transalte_Email_not_found'));
      }
    } catch (error) { }
  };

  onLogin = async value => {
    try {
      const res = await this.props.dispatch(
        loginauthorities({
          result: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      );
      if (res.res_code === '00') {
        this.props.dispatch(getinfoAuth({ Authorization: res.res_result.token }));
        const resxxx = await this.props.dispatch(
          getMenuHome({
            token: res.res_result.token,
            type: 6,
          }),
        );
        this.props.dispatch(getStatus({ token: res.res_result.token }));
        this.props.dispatch(ScoreLogin({ token: res.res_result.token }));
        this.props.dispatch(getimgprofile({ token: res.res_result.token }));
      } else {
        Alert.alert(I18n.t('alert_Invalid_email_password'));
      }
    } catch (error) {
      Alert.alert(I18n.t('alert_Invalid_email_password'));
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../image/Backgrounglogin.png')}
        style={Styles.ImgBackground}>
        <Header
          containerStyle={{ backgroundColor: 'transparent' }}
          leftComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Icon name="left" size={30} />
            </TouchableOpacity>
          }
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 30}
          style={{ flex: 0.8, zIndex: 1 }}>
          <TouchableWithoutFeedback
            accessible={true}
            onPress={Keyboard.dismiss}>
            <View style={Styles.ViewSub4}>

              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/DitpLogin.png')}
                />
              </View>

              <View style={[Styles.marginTop10, { alignItems: 'center' }]}>
                <Text style={Styles.fontSub1}>{I18n.t('transalte_sign_in')}</Text>
              </View>

              <View style={{ width: '30%', alignItems: 'center' }}>
                <Text style={Styles.fontSub2}>{I18n.locale === 'th' ? 'อีเมล' : 'Email'}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <ImageBackground
                  source={require('../../image/TextInputofficer.png')}
                  resizeMode={'stretch'}
                  imageStyle={{ width: '100%', height: 40 }}
                  style={{
                    height: 40,
                    width: '80%',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Image
                    style={Styles.ImgSub5}
                    source={require('../../image/emailofficer.png')}
                  />
                  <TextInput
                    autoCapitalize={'none'}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={Styles.TextInputSub1}
                    placeholderTextColor="#cad8e1"
                    placeholder={I18n.t('translate_email')}
                  />
                </ImageBackground>
              </View>

              <View style={{ width: '30%', alignItems: 'center', marginTop: 10 }}>
                <Text style={Styles.fontSub2}>{I18n.t('password1_regis')}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', left: 15 }}>
                  <ImageBackground
                    source={require('../../image/TextInputofficer.png')}
                    resizeMode={'stretch'}
                    imageStyle={{ width: '100%', height: 40 }}
                    style={{
                      height: 40,
                      width: '80%',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Image
                      style={Styles.ImgSub6}
                      source={require('../../image/PassOfficer.png')}
                    />
                    <TextInput
                      value={this.state.password}
                      onChangeText={text => this.setState({ password: text })}
                      secureTextEntry={this.state.EyeDi ? true : false}
                      style={Styles.TextInputSub1}
                      placeholderTextColor="#cad8e1"
                      placeholder={I18n.t('password1_regis')}
                      onSubmitEditing={() => { this.onLogin() }}
                    />

                  </ImageBackground>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.EyeDi) {
                        this.setState({ EyeDi: false });
                      } else {
                        this.setState({ EyeDi: true });
                      }
                    }}
                    style={{ right: 50 }}>
                    <Icon1
                      name={this.state.EyeDi ? 'eye-with-line' : 'eye'}
                      size={35}
                      color="#b8c7db"
                    />
                  </TouchableOpacity>
                </View>
              </View>



              <View style={Styles.marginTop10}>

              </View>
              <View style={Styles.ViewSub6}>

                <TouchableOpacity
                  style={{ left: 20 }}
                  onPress={() => this.onOpen()}>
                  <Text style={Styles.TextSub4}>{I18n.t('transalte_forgot_password')}?</Text>
                </TouchableOpacity>
                <Overlay
                  isVisible={this.state.modalVisible}
                  onBackdropPress={() =>
                    this.setState({ modalVisible: false })
                  }>
                  <View style={{ width: '90%' }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#2d6dc4',
                        alignSelf: 'center',
                      }}>
                      {I18n.t('transalte_Please_email_password')}
                        </Text>
                    <View style={{ height: 15 }} />
                    <ImageBackground
                      source={require('../../image/TextInputofficer.png')}
                      style={{
                        width: '100%',
                        height: 48,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        style={{
                          fontSize: 20,
                          marginLeft: 10,
                          flex: 1,
                          color: '#000000',
                        }}
                        placeholderTextColor="#cad8e1"
                        placeholder={I18n.locale === 'th' ? 'อีเมล' : 'Email'}
                      />
                    </ImageBackground>
                    <View style={{ height: 20 }} />
                    <View
                      style={{ flexDirection: 'row', alignSelf: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          this._getSendEmail();
                        }}
                        style={Styles.PopupSend}>
                        <Text style={{ fontSize: 20, color: '#ffffff' }}>
                          {I18n.t('transalte_send')}
                            </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: false })}
                        style={Styles.PopupCancel}>
                        <Text style={{ fontSize: 20, color: '#2d6dc4' }}>
                          {I18n.t('translate_Bt_cancel')}
                            </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Overlay>
              </View>


            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View
          style={{
            zIndex: 2,
            flexDirection: 'column-reverse',
            marginBottom: Platform.OS === 'android' ? 80 : 50,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.onLogin();
            }}>
            <ImageBackground
              source={require('../../image/LoginOffiecr.png')}
              style={Styles.ImgBackground5}>
              <Text style={Styles.TextSub5}>{I18n.t('transalte_sign_in')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreenofficerScreen);
