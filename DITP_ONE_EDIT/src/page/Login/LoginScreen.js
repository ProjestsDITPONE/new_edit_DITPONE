import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import Styles from './Styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  loginUser,
  refreshtoken,
  getimgprofile,
  GetChatCount
} from '../../actions/auth.actions';
import { getMenuHome, ScoreLogin, getStatus } from '../../actions/data.actions';
import { connect } from 'react-redux';
import { getDeepLink } from '../../config/utilities';
import I18n from '../../utils/I18n';
import SafeArea from 'react-native-safe-area';
import EncryptedStorage from 'react-native-encrypted-storage';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottm: 20,
    };
  }

  componentDidMount() {
    
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      if (result.safeAreaInsets.top != 0) {
        this.setState({ bottm: this.state.bottm });
      }
    });
    const {
      authData: { isLoggedIn },
    } = this.props;
  } 
 



  async onLogin() {

   
    const deepLink = getDeepLink('callback');
    const url = `https://sso.ditp.go.th/sso/index.php/auth?response_type=token&client_id=SS0047423&redirect_uri=${deepLink}&state=appditp`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(response => {
          if (response.type === 'success' && response.url) {
             console.log(this.getCode(response.url))
            this.props.dispatch(
              loginUser({
                token: this.getCode(response.url),
                notification: this.props.getNotification.tokenNotification,
              }),
            );
            this.props.dispatch(
              getMenuHome({ token: this.getCode(response.url) }),
            );

            this.props.dispatch(
              getimgprofile({ token: this.getCode(response.url) }),
            );

            this.props.dispatch(getStatus({ token: this.getCode(response.url) }));
            this.props.dispatch(
              ScoreLogin({ token: this.getCode(response.url) }),
            );

            this.props.dispatch(
              GetChatCount({
                token: this.getCode(response.url),
              }),
            );



          }

        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  getCode(url) {
    
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    const { code } = params;
    return code;
  }
  render() {
    return (
      <ImageBackground
        source={require('../../image/Backgrounglogin.png')}
        style={Styles.ImgBackground}>
        <View style={Styles.flex1}>
          <View style={Styles.ViewSub1}>
            <Image
              style={Styles.ImgSub1}
              source={require('../../image/DitpLogin.png')}
            />
            <View style={Styles.ViewSub2}>
              <TouchableOpacity
                onPress={() => {
                  this.onLogin();
                }}>
                <ImageBackground
                  style={Styles.ImgBackground2}
                  resizeMode="contain"
                  source={require('../../image/TouchLogin.png')}>
                  <Text style={Styles.TextSub1}>{I18n.t('transalte_singin_subscribe')}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              bottom: this.state.bottm,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginOfficer')}
              style={Styles.TocuhSub1}>
              <Image
                style={Styles.ImgSub2}
                source={require('../../image/personAdmin.png')}
              />
              <Text style={Styles.TextSub2}> {I18n.t('transalte_Department_staff')}</Text>
            </TouchableOpacity>
            <View style={Styles.ViewSub3}>
              <Image
                resizeMode={'contain'}
                style={Styles.ImgSub3}
                source={require('../../image/DitpLogo.png')}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getNotification: state.authReducer.getNotification,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
