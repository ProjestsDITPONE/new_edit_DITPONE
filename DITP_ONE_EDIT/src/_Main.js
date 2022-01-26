import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  Dimensions,
} from 'react-native';
import Routes from './navigation/Routes';
import {connect} from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';
import I18n from './utils/I18n';
import Loader from './components/Loader';
import {
  refreshtoken,
  authNotification,
  CountNotification,
  GetChatCount,
  UpdateCountChat,
} from './actions/auth.actions';
import {
  getMenuHome,
  ScoreLogin,
  getStatus,
  getDateTop,
  logApp,
} from './actions/data.actions';
import Styles from './page/Login/Styles';
import {getimgprofile} from './actions/auth.actions';

import messaging from '@react-native-firebase/messaging';

import * as RootNavigation from './RootNavigation';
import {RecoilRoot} from 'recoil';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const {cond, eq, add, set, Value, event, interpolate, Extrapolate} = Animated;

var PushNotification = require('react-native-push-notification');
var thisError = '';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      savePage: '',
      ActDateTop: [],
      ShowAct: false,
      count: 0,
    };
    thisError = this;
  }

  _getDateTop = async values => {
    try {
      const respones = await this.props.dispatch(getDateTop());

      if (respones.res_code === '00') {
        this.setState({ActDateTop: respones.res_result});
      }
    } catch (error) {}
  };

  _getMenuHome = async value => {
    try {
      var tokenMenu = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenMenu = this.props.authData.token.res_result.token;
      } else {
        tokenMenu = this.props.authData.token;
      }
      const respones = await this.props.dispatch(
        getMenuHome({
          token: tokenMenu,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
    } catch (error) {
      // console.log(error);
    }
  };

  _getCountChat = async value => {
    try {
      const respones = await this.props.dispatch(
        GetChatCount({
          token: this.props.authData.token,
        }),
      );
    } catch (error) {}
  };

  _UpdateCountChat = async values => {
    try {
      var tokenMenu = this.props.authData.token;
      const response = await this.props.dispatch(
        UpdateCountChat({token: tokenMenu}),
      );

      if (response.res_code === '00') {
        const respones = await this.props.dispatch(
          GetChatCount({
            token: tokenMenu,
          }),
        );
      }
    } catch (error) {}
  };

  _getStatus = async value => {
    try {
      const respones = await this.props.dispatch(
        getStatus({token: this.props.authData.token}),
      );
    } catch (error) {}
  };

  _getSoreLogin = async value => {
    try {
      const respones = await this.props.dispatch(
        ScoreLogin({token: this.props.authData.token}),
      );
    } catch (error) {}
  };

  _getImageProfile = async value => {
    try {
      const respones = await this.props.dispatch(
        getimgprofile({token: this.props.authData.token}),
      );
    } catch (error) {}
  };



  _getNotification = async value => {

    // alert("_getNotification")
    let thisObj = this;
    try {
      // const messaging = firebase.messaging();
      const authStatus = await messaging().requestPermission();
      const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //  alert(enabled);
      // alert(authStatus)
      messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                /* got permission */
              })
              .catch(error => {
                /* handle error */
              });
          }
        })
        .catch(error => {
          /* handle error */
        });

        // messaging().onNotificationOpenedApp

        messaging().onNotificationOpenedApp(notification => {
        // console.log('onNotificationOpened:', notification);
        RootNavigation.navigate('ListNotiScreen');
      });

      messaging().onMessage(notification => {
        console.log('onNotification1:', notification);
        const {title, body, subtitle} = notification;

        thisObj.setState({
          savePage: notification.data.type,
          count: notification.data.count,
        });

        thisObj.props.dispatch(CountNotification(notification.data.count));
        this._getCountChat();

        PushNotification.localNotification({
          title: title,
          message: subtitle, // (required)
        });
        RootNavigation.navigate('ListNotiScreen');
      });

      PushNotification.configure({
        onRegister: function(token) {
          // console.log('onRegister:', token);
          // console.log('notification3');
          // if (Platform.OS === 'ios') {
          messaging()
            .getToken()
            .then(token => {
              thisObj.props.dispatch(authNotification(token));
            })

            .catch(error => {
              /* handle error */
              console.log(error);
            });
          // }
        },

        onNotification: function(notification) {
          // console.log('onNotificationCount2:', notification);
          thisObj.props.dispatch(CountNotification(notification.data.count));
          thisObj._getCountChat();
          // PushNotification.setApplicationIconBadgeNumber(
          //   notification.data.count,
          // );

          // RootNavigation.navigate('ListNotiScreen');
          if (Platform.OS === 'android') {
            if (notification.data.count != undefined) {
              thisObj.setState({
                savePage: notification.data.type,
                count: notification.data.count,
              });

              PushNotification.localNotification({
                title: notification.title.toString(), // (optional)
                message: notification.message.toString(), // (required)
              });
            } else {
              // RootNavigation.navigate('ListNotiScreen');
              alert('ListNotiScreen')
            }
          }
        },
        onAction: function(notification) {
          // console.log('onAction3:', notification);
          thisObj._getCountChat();
          // PushNotification.setApplicationIconBadgeNumber(
          //   notification.data.count,
          // );
        },

        // senderID: '21440400816',
         senderID: '302523589217',
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    } catch (error) {
      console.log(error);
    }
  };









  _refreshtoken = async value => {
    try {
      const respones = await this.props.dispatch(
        refreshtoken({token: this.props.authData.token}),
      );
    } catch (error) {}
  };

  componentDidMount() {
    const {
      authData: {isLoggedIn},
    } = this.props;

    if (isLoggedIn) {
      this._getMenuHome();
      this._getSoreLogin();
      this._getStatus();
      this._getImageProfile();
      this._getCountChat();
    }

    this._getDateTop();
    this._refreshtoken();
    setTimeout(() => {
      this.setState({ShowAct: true});
    }, 2000);

    this.token = setInterval(() => {
      this._refreshtoken();
    }, 5000000);
  }

  dragX = new Value(0);
  dragY = new Value(0);
  offsetX = new Value(width / 2);
  offsetY = new Value(height / 2);
  gestureState = new Value(-1);
  onGestureEvent = event([
    {
      nativeEvent: {
        translationX: this.dragX,
        translationY: this.dragY,
        state: this.gestureState,
      },
    },
  ]);
  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetX, this.dragX),
    set(this.offsetX, add(this.offsetX, this.dragX)),
  );
  transY = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetY, this.dragY),
    set(this.offsetY, add(this.offsetY, this.dragY)),
  );
  borderWidth = interpolate(this.transX, {
    inputRange: [0, width],
    outputRange: [0, 5],
    extrapolate: Extrapolate.CLAMP,
  });

  opacity = 0.8;

  componentDidUpdate() {
    this._getNotification();
    this._getCountChat();
  }

  render() {
    const {LoadingCounters} = this.props;

    const {
      authData: {isLoggedIn},
    } = this.props;

    return (
      <ErrorBoundary FallbackComponent={CustomFallback} onError={errorHandler}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <RecoilRoot>
           
            <Routes isLoggedIn={isLoggedIn} />
          </RecoilRoot>

          {this.props.CheckOnlineCheck && (
            <PanGestureHandler
              maxPointers={1}
              onGestureEvent={this.onGestureEvent}
              onHandlerStateChange={this.onGestureEvent}>
              <Animated.View
                style={[
                  styles.box,
                  {
                    opacity: this.opacity,
                    borderWidth: this.borderWidth,
                    transform: [
                      {
                        translateX: this.transX,
                      },
                      {
                        translateY: this.transY,
                      },
                    ],
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.dispatch({
                      type: 'Offline',
                    });
                  }}>
                  <Image
                    style={{width: 15, height: 15, alignSelf: 'flex-end'}}
                    source={require('./image/close.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{height: '100%', width: '100%'}}
                  onPress={() => {
                    RootNavigation.navigate('ChatScreen');
                  }}>
                  <Image
                    style={{width: '100%', height: '110%'}}
                    source={require('./image/iconAdminChat.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          )}

          {LoadingCounters > 0 && <Loader />}
        </View>
      </ErrorBoundary>
    );
  }
}
const errorHandler = (error: Error, stackTrace: string) => {
  try {
    thisError.props.dispatch(
      logApp({
        errorText: error.toString(),
        stackTrace: stackTrace.toString(),
      }),
    );
  } catch (error) {}
};

const CustomFallback = (props: {error: Error, resetError: Function}) => (
  <ImageBackground
    source={require('./image/Backgrounglogin.png')}
    style={Styles.ImgBackground}>
    <View style={Styles.flex1}>
      <View style={Styles.ViewSub1}>
        <Image
          style={{opacity: 0.5, width: 110, height: 150}}
          source={require('./image/DitpLogin.png')}
        />
        <View
          style={{alignSelf: 'center', alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 28, color: '#4b4b4b'}}>
            {I18n.t('translate_titleError')}
          </Text>
          <Text style={{fontSize: 23, color: '#999999'}}>
            {I18n.t('translate_titleError2')}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 150,
          }}>
          <TouchableOpacity
            onPress={props.resetError}
            style={{
              width: 180,
              height: 40,
              borderRadius: 24,
              backgroundColor: '#2d6dc4',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text style={{fontSize: 23, color: '#ffffff'}}>
              {I18n.t('translate_tryagain')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ImageBackground>
);

const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginLeft: (width - CIRCLE_SIZE * 2.5) / 2,
    marginTop: (height - CIRCLE_SIZE * 5.5) / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: 'transparent',
    zIndex: 99,
    position: 'absolute',
  },
});
const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  CheckOnlineCheck: state.globalReducer.CheckOnlineCheck,
  CountNotification: state.authReducer.getCountNotification,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
