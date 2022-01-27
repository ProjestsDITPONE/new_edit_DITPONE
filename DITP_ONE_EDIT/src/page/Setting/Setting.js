import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  AsyncStorage,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
// import InAppBrowser from 'react-native-inappbrowser-reborn';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import Headers from '../../components/Headers';
import Styles from './Styles';
import HeaderAndroid from '../../components/HeadersAndroid';
import {Overlay} from 'react-native-elements';
import Popup from '../../components/Popup';
import I18n from '../../utils/I18n';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  logoutUser,
  getstatustQues,
  SendCancle,
  testMoc,
} from '../../actions/auth.actions';
import {disblaNoti} from '../../actions/data.actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getDeepLink, getDeepLinkCheang} from '../../config/utilities';
import jwt_decode from 'jwt-decode';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import SlideDownPanel from '../../lib_edit/react-native-slide-down-panel';
const Setting = ({
  focused,
  navigation,
  dispatch,
  authData,
  getUser,
  getNotification,
}) => {
  const [local, setlocal] = useState('');
  const [nonti, setnonti] = useState(false);
  const [CheackFaceIDTouchID, setCheackFaceIDTouchID] = useState(false);
  // const [check, setCheck] = useState(true);
  const [StatusCancle, setStatusCancle] = useState();
  const [StatusQues, setStatusQues] = useState();
  const [language, setlanguage] = useState('TH');
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [PopAccept, setPopAccept] = useState(false);
  const [PopCancel, setPopCancel] = useState(false);
  const isFocused = useIsFocused();
  const name = 'มั่งมี';
  const lastname = 'ศรีสวัสดิ์';

  const Changpassword = async () => {
    const deepLink = getDeepLink('callback');
    var lang = '';
    const code = jwt_decode(authData.token).id_token;
    if (language.language === 'TH') {
      lang = 'th';
    } else {
      lang = 'en';
    }
    const urll = `https://sso.ditp.go.th/sso/auth/pre_changepassword?client_id=ssoidtest&token=${code}&redirect_uri=${deepLink}&test=123&lang=${lang}`;

    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(urll, code, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(response => {
          if (response.type === 'success') {
            AlertLogout();
          }
        });
      } else Linking.openURL(urll);
    } catch (error) {
      Linking.openURL(urll);
    }
  };

  const AlertLogout = () => {
    Alert.alert(
      I18n.t('translate_ChangepasswordProTitle'),
      I18n.t('translate_ChangepasswordProSubtitle'),
      [{text: 'ตกลง', onPress: () => onLogout()}],
      {cancelable: false},
    );
  };

  const _SendCancle = async values => {
    try {
      const response = await dispatch(SendCancle({token: authData.token}));
      console.log(response);
    } catch (error) {}
  };

  // console.log(getForeUpdate);
  useEffect(() => {
    try {
      AsyncStorage.getItem('language', (error, results) => {
        setlocal(language);

        if (results == null) {
          setlocal(language);
          setlanguage({language: I18n.t('translate_look')});
        } else {
          setlocal(language);
          setlanguage({language: results});
        }
      });

      AsyncStorage.getItem('Noti', (error, res) => {
        if (res === 'false') {
          setnonti(false);
        } else {
          setnonti(true);
        }
      });
      AsyncStorage.getItem('CheackFaceIDTouchID', (error, res) => {
        if (res === 'false') {
          setCheackFaceIDTouchID(false);
        } else {
          setCheackFaceIDTouchID(true);
        }
      });

      _getStatus();
      SlideDownPanel.hideHeader();
    } catch (error) {}
  }, [isFocused]);

  useEffect(() => {
    SlideDownPanel.hideHeader();
  }, []);

  const changelanguage = val => {
    console.log(val);
    setlanguage({language: val});
    AsyncStorage.setItem('language', val);
    I18n.changelanguage(val);
  };
  const onLogout = () => {
    dispatch({
      type: 'GET_REGION_FAIL',
      payload: null,
    });
    dispatch(
      logoutUser({
        // device_uuid: getNotification.tokenNotification,
        device_uuid:
          getNotification.tokenNotification != undefined
            ? getNotification.tokenNotification
            : '0',
        token: authData.token,
      }),
    );
  };

  const _onLogin = async () => {
    console.log(authData);
    
    const url = `https://account.moc.go.th/auth/authorize?&response_type=code&redirect_uri=https://sso.ditp.go.th/sso/index.php/auth/moccallback&client_id=5111195809841`;
    
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, {
          
        }).then(response => {
          if (response.type === 'success') {
            // AlertLogout();
            // alert('GO TO ');
          }
        });
      } else Linking.openURL(urll);
    } catch (error) {
      Linking.openURL(urll);
    }
  };

  const _getStatus = async value => {
    try {
      const payload = authData.token;
      const respones = await dispatch(
        getstatustQues({
          token: payload,
        }),
      );
      setStatusCancle(respones.res_result.status_member_cancel.status_code);
      setStatusQues(respones.res_result.status_questionnaire.status_code);
    } catch (error) {}
  };

  return (
    <View style={[Styles.SafeArea, {flex: 1}]}>
      <Headers badgeNumber="2" navigation={navigation} ArrowColor={false} />
      <ScrollView style={{zIndex: -1}}>
        <View
          style={[
            Styles.ViewSub1,
            {marginTop: Platform.OS === 'android' ? 120 : 40},
          ]}>
          <View style={Styles.ViewSub2}>
            <View style={Styles.ViewSub3}>
              <View style={Styles.ViewSub10}>
                <Text style={Styles.TextSub1}>
                  {I18n.t('translate_changelang')}
                </Text>
                <View style={Styles.ViewSub4}>
                  <TouchableOpacity
                    disabled={language.language != 'TH'}
                    onPress={() => {
                      changelanguage('EN');
                      AsyncStorage.setItem('language', 'EN');
                      setlocal('EN');
                      navigation.dispatch(
                        CommonActions.navigate({
                          name: 'Setting',
                        }),
                      );
                    }}>
                    {language.language === 'EN' ? (
                      <Image
                        style={Styles.Imgsub1}
                        source={require('../../image/UNA.png')}
                      />
                    ) : (
                      <Image
                        style={Styles.Imgsub1}
                        source={require('../../image/UNB.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={language.language != 'EN'}
                    // disabled={language.language === 'TH'}
                    style={{marginHorizontal: 5}}
                    onPress={() => {
                      changelanguage('TH');
                      AsyncStorage.setItem('language', 'TH');
                      setlocal('TH');
                      navigation.dispatch(
                        CommonActions.navigate({
                          name: 'Setting',
                        }),
                      );
                    }}>
                    {language.language === 'EN' ? (
                      <Image
                        style={Styles.Imgsub1}
                        source={require('../../image/thaiB.png')}
                      />
                    ) : (
                      <Image
                        style={Styles.Imgsub1}
                        source={require('../../image/thaiA.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={Styles.ViewSub6}>
              <Image
                style={{
                  height: 2,
                  width: '90%',
                  top: 10,
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SettingNoti');
              }}>
              <View style={Styles.ViewSub3}>
                <View style={Styles.ViewSub10}>
                  <Text style={Styles.TextSub1}>
                    {I18n.locale === 'th'
                      ? I18n.t('translate_nonti')
                      : I18n.t('translate_nonti')}
                  </Text>
                  <View style={Styles.ViewSub4}>
                    <Image
                      style={{width: 8, height: 13}}
                      source={require('../../image/Arrowright.png')}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* <View style={Styles.ViewSub3}>
              <View style={Styles.ViewSub10}>
                <Text style={Styles.TextSub1}>{I18n.t('translate_nonti')}</Text>

                <View style={Styles.ViewSub4}>
                  <ToggleSwitch
                    isOn={nonti}
                    onColor="#51de8c"
                    offColor="#f2f2f2"
                    onToggle={ison => {
                      //  console.log(ison);
                      let statusNoti = 0;
                      if (nonti === false) {
                        setnonti(true);
                        AsyncStorage.setItem('Noti', 'true');
                        statusNoti = 1;
                        console.log('Noti1' + statusNoti);
                      } else if (nonti === true) {
                        setnonti(false);
                        AsyncStorage.setItem('Noti', 'false');
                        statusNoti = 0;
                        console.log('Noti0' + statusNoti);
                      }
                      dispatch(
                        disblaNoti({
                          device_uuid:
                            getNotification.tokenNotification != undefined
                              ? getNotification.tokenNotification
                              : '0',
                          status: statusNoti,
                        }),
                      );
                    }}
                  />
                </View>
              </View>
            </View> */}

            <View style={Styles.ViewSub6}>
              <Image
                style={{
                  height: 2,
                  width: '90%',
                  top: 10,
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>

            {getUser.userDetails.res_result.type != 6 && (
              <View>
                <TouchableOpacity onPress={() => Changpassword()}>
                  <View style={Styles.ViewSub3}>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Password')}
                      </Text>
                      <View style={Styles.ViewSub4}>
                        <Image
                          style={{width: 8, height: 13}}
                          source={require('../../image/Arrowright.png')}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={Styles.ViewSub6}>
                  <Image
                    style={{
                      height: 2,
                      width: '90%',
                      top: 10,
                    }}
                    source={require('../../image/linesetting.png')}
                  />
                </View>

                <View style={Styles.ViewSub3}>
                  <View style={Styles.ViewSub10}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('transalte_FfaceIDTouchID')}
                    </Text>

                    <View style={Styles.ViewSub4}>
                      <ToggleSwitch
                        isOn={CheackFaceIDTouchID}
                        onColor="#04a68a"
                        offColor="#f2f2f2"
                        onToggle={ison => {
                          //  console.log(ison);
                          let statusNoti = 0;
                          if (CheackFaceIDTouchID === false) {
                            setCheackFaceIDTouchID(true);

                            // alert('coming soon');

                            AsyncStorage.setItem('CheackFaceIDTouchID', 'true');
                            // statusNoti = 1;
                            // console.log('Noti1' + statusNoti);
                          } else if (CheackFaceIDTouchID === true) {
                            setCheackFaceIDTouchID(false);
                            // alert('coming soon');
                            AsyncStorage.setItem('CheackFaceIDTouchID', 'false');
                            // statusNoti = 0;
                            // console.log('Noti0' + statusNoti);
                          }
                          // dispatch(
                          //   disblaNoti({
                          //     device_uuid:
                          //       getNotification.tokenNotification != undefined
                          //         ? getNotification.tokenNotification
                          //         : '0',
                          //     status: statusNoti,
                          //   }),
                          // );
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={Styles.ViewSub6}>
                  <Image
                    style={{
                      height: 2,
                      width: '90%',
                      top: 10,
                    }}
                    source={require('../../image/linesetting.png')}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChangePincodepassword',{status:'setingpasscode'});
                  }}>
                  <View style={Styles.ViewSub3}>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub1}>
                        {I18n.t('transalte_Passcode')}
                      </Text>
                      <View style={Styles.ViewSub4}>
                        <Image
                          style={{width: 8, height: 13}}
                          source={require('../../image/Arrowright.png')}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={Styles.ViewSub6}>
                  <Image
                    style={{
                      height: 2,
                      width: '90%',
                      top: 10,
                    }}
                    source={require('../../image/linesetting.png')}
                  />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
                  <View style={Styles.ViewSub3}>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Policy')}
                      </Text>
                      <View style={Styles.ViewSub4}>
                        <Image
                          style={{width: 8, height: 13}}
                          source={require('../../image/Arrowright.png')}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={Styles.ViewSub6}>
                  <Image
                    style={{
                      height: 2,
                      width: '90%',
                      top: 10,
                    }}
                    source={require('../../image/linesetting.png')}
                  />
                </View>

                <View>
                  {StatusCancle === 0 ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Unsubscribe')}>
                      <View style={Styles.ViewSub3}>
                        <View style={Styles.ViewSub10}>
                          <Text style={Styles.TextSub1}>
                            {I18n.locale === 'th'
                              ? I18n.t('translate_Canclemember')
                              : I18n.t('translate_Canclemember')}
                          </Text>
                          <View style={Styles.ViewSub4}>
                            <Image
                              style={{width: 8, height: 13}}
                              source={require('../../image/Arrowright.png')}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setPopCancel(true);
                      }}>
                      <View style={Styles.ViewSub3}>
                        <View style={Styles.ViewSub10}>
                          <Text style={Styles.TextSub1}>
                            {I18n.t('translate_CanclememberAg')}
                          </Text>
                          <View style={Styles.ViewSub4}>
                            <Image
                              style={{width: 8, height: 13}}
                              source={require('../../image/Arrowright.png')}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  <View style={Styles.ViewSub6}>
                    <Image
                      style={{
                        height: 2,
                        width: '90%',
                        top: 15,
                      }}
                      source={require('../../image/linesetting.png')}
                    />
                  </View>
                </View>
                <TouchableOpacity >
                  <View style={Styles.ViewSub3}>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub1}>Version 20220125</Text>
                      <View style={Styles.ViewSub4}>
                        <Image
                          style={{width: 8, height: 13}}
                          source={require('../../image/Arrowright.png')}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={Styles.ViewSub6}>
                  <Image
                    style={{
                      height: 2,
                      width: '90%',
                      top: 10,
                    }}
                    source={require('../../image/linesetting.png')}
                  />
                </View>
              </View>
            )}

            {PopAccept === true && (
              <Overlay
                onBackdropPress={() => setPopAccept(false)}
                fullScreen={false}
                isVisible={PopAccept}
                backdropStyle={{
                  backgroundColor:
                    Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                  borderColor: 'transparent',
                }}>
                <Popup
                  text={I18n.t('translate_Logout')}
                  accept={() => {
                    setTimeout(() => {
                      onLogout();
                    }, 200);
                    setPopAccept(false);
                  }}
                  cancle={() => setPopAccept(false)}
                  Icon={<Icon name="alert-circle" size={80} color="#f86767" />}
                />
              </Overlay>
            )}

            {PopCancel === true && (
              <Overlay
                onBackdropPress={() => setPopCancel(false)}
                fullScreen={false}
                isVisible={PopCancel}
                backdropStyle={{
                  backgroundColor:
                    Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                  borderColor: 'transparent',
                }}>
                <Popup
                  text={I18n.t('translate_UnDitp')}
                  accept={() => {
                    _SendCancle();
                    setTimeout(() => {
                      setStatusCancle(0);
                    }, 200);
                    setPopCancel(false);
                  }}
                  cancle={() => setPopCancel(false)}
                  Icon={<Icon name="alert-circle" size={80} color="#f86767" />}
                />
              </Overlay>
            )}

            {/* <View>
              <View style={Styles.ViewSub3}>
                <View style={Styles.ViewSub10}>
                  <Text style={Styles.TextSub1}>Version. 20210611</Text>
                  <View style={Styles.ViewSub4} />
                </View>
              </View>
              <View style={[Styles.ViewSub6]}>
                <Image
                  style={{
                    height: 2,
                    width: '90%',
                    top: 15,
                  }}
                  source={require('../../image/linesetting.png')}
                />
              </View>
            </View> */}

            <View style={[Styles.ViewSub5]}>
              <TouchableOpacity
                onPress={() => setPopAccept(true)}
                style={{
                  flexDirection: 'row',
                  margin: 0,
                  alignItems: 'center',
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#f86767',
                  borderRadius: 21,
                  paddingHorizontal: 10,
                }}>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../../image/logout3.png')}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#f86767',
                    fontFamily: 'Mitr-Regular',
                  }}>
                  {'  '}
                  {I18n.t('translate_logout')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 0}}>
            {getUser.userDetails.res_result.type != 6 && (
              <View>
                <Text
                  style={{
                    color: '#2d6dc4',
                    fontSize: 13,
                    fontFamily: 'Pridi-Medium',
                  }}>
                  {I18n.t('transalte_QAQA')}
                </Text>
              </View>
            )}
          </View>

          <View style={[Styles.paddingTop20]}>
            {getUser.userDetails.res_result.type != 6 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Questionnaire')}
                style={{
                  borderWidth: 2,
                  borderColor: '#2d6dc4',
                  backgroundColor: '#2d6dc4',
                  borderRadius: 21.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginBottom: 30
                }}>
                <Image
                  style={Styles.Imgsub2}
                  source={require('../../image/paperclip.png')}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontFamily: 'Mitr-Regular',
                  }}>
                  {' '}
                  {I18n.t('translate_questionnaire')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
       

          {/* <View style={[{marginBottom: 30}]}>
            {getUser.userDetails.res_result.type != 6 && (
              <TouchableOpacity
                onPress={() => {
                  _onLogin();
                }}
                style={Styles.TouchSub2}>
                <Image
                  style={Styles.Imgsub2}
                  source={require('../../image/Writeinfo.png')}
                />
                <Text style={Styles.TextSub5}> ทดสอบ MOC</Text>
              </TouchableOpacity>
            )}
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
  getStatus: state.dataReducer.getStatus,
  getNotification: state.authReducer.getNotification,
  getForeUpdate: state.authReducer.getForeUpdate,
  getlocal: state.dataReducer.getlocal,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
