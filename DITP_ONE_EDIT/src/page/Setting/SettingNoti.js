import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import Headers from '../../components/Headers';
import HeaderText from '../../components/HeaderText';
import ToggleSwitch from 'toggle-switch-react-native';
import I18n from '../../utils/I18n';

const SettingNoti = ({navigation}) => {
  const [nontinews, setnontinews] = useState(false);
  const [nontinewsActive, setnontinewsActive] = useState(false);
  const [nontinewsChat, setnontinewsChat] = useState(false);
  const [nontinewsChat1, setnontinewsChat1] = useState(false);
  const [nontinewsconfrim, setnontinewsconfrim] = useState(false);
  const [nontinewsconfrimchat, setnontinewsconfrimchat] = useState(false);
  const [nontinewsrequest, setnontinewsrequest] = useState(false);
  const [nontinewsSMEsPro, setnontinewsSMEsPro] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      <View style={{marginTop: 20, zIndex: -1, marginBottom: 20}}>
        <Text
          style={{
            fontSize: 25,
            color: '#20416e',
            textAlign: 'center',
            fontFamily: 'Kittithada Bold 75',
          }}>
          {I18n.t('translate_nonti')}
        </Text>
      </View>
      <ScrollView style={{zIndex: -1}}>
        <View
          style={{
            width: '90%',
            height: null,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            marginHorizontal: 20,
            borderRadius: 8,
          }}>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_newsNoti')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinews}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinews === false) {
                      setnontinews(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinews === true) {
                      setnontinews(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
               {I18n.t('transalte_application_activities')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsActive}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsActive === false) {
                      setnontinewsActive(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsActive === true) {
                      setnontinewsActive(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>


          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_Favorite_activity')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsChat1}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsChat1 === false) {
                      setnontinewsChat1(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsChat1 === true) {
                      setnontinewsChat1(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>




          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_newsChat')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsChat}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsChat === false) {
                      setnontinewsChat(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsChat === true) {
                      setnontinewsChat(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>





          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_Chat_with_importers')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsconfrimchat}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsconfrimchat === false) {
                      setnontinewsconfrimchat(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsconfrimchat === true) {
                      setnontinewsconfrimchat(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_newconfrim')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsconfrim}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsconfrim === false) {
                      setnontinewsconfrim(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsconfrim === true) {
                      setnontinewsconfrim(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>
          
          
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_newrequest')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsrequest}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsrequest === false) {
                      setnontinewsrequest(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsrequest === true) {
                      setnontinewsrequest(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#4b4b4b',
                  fontFamily: 'Kittithada Bold 75',
                }}>
                {I18n.t('transalte_newSMEsProactive')}
              </Text>

              <View style={{flexDirection: 'row-reverse', flex: 1}}>
                <ToggleSwitch
                  isOn={nontinewsSMEsPro}
                  onColor="#04a68a"
                  offColor="#f2f2f2"
                  onToggle={ison => {
                    //  console.log(ison);
                    //   let statusNoti = 0;
                    if (nontinewsSMEsPro === false) {
                      setnontinewsSMEsPro(true);
                      // AsyncStorage.setItem('Noti', 'true');
                      // statusNoti = 1;
                      // console.log('Noti1' + statusNoti);
                    } else if (nontinewsSMEsPro === true) {
                      setnontinewsSMEsPro(false);
                      // AsyncStorage.setItem('Noti', 'false');
                      // statusNoti = 0;
                      // console.log('Noti0' + statusNoti);
                    }
                    //   dispatch(
                    //     disblaNoti({
                    //       device_uuid:
                    //         getNotification.tokenNotification != undefined
                    //           ? getNotification.tokenNotification
                    //           : '0',
                    //       status: statusNoti,
                    //     }),
                    //   );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  height: 2,
                  width: '100%',
                }}
                source={require('../../image/linesetting.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SettingNoti;
