import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Linking,
  RefreshControl,
  TextInput,
  Platform,
  AsyncStorage,
  Animated,
} from 'react-native';
import SortableGridview from '../../lib_edit/react-native-sortable-gridview';
import SortableGridviewOri from '../../lib_edit/react-native-sortable-gridviewOri';
import Headers from '../../components/Headers';
import HeaderHome from '../../components/HeaderHome';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Avatar, Overlay} from 'react-native-elements';

import AutoDragSortableView from '../../lib_edit/AutoDragSortableView';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import I18n from '../../utils/I18n';
import {useIsFocused} from '@react-navigation/native';
import {
  SendAssessment,
  SendHomeMenu,
  getBanner,
} from '../../actions/auth.actions';
import LinearGradient from 'react-native-linear-gradient';
import {
  getDateTop,
  getStatus,
  getMenuHome,
  getTokenQr,
  getPopupSys,
} from '../../actions/data.actions';

import {connect} from 'react-redux';
import Styles from './Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import Popiden from '../../components/Popup2';
import PopQues from '../../components/Popup3';
import PopAssessment from '../../components/Popup4';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {getDeepLinkAutoMem} from '../../config/utilities';
import SlideDownPanel from '../../lib_edit/react-native-slide-down-panel';

import Popup5 from '../../components/Popup5';

import PopupCk from '../../components/Popupcheck'

const window = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

//ipad
var aspectRatio = 1.6;
if (height / width > 1.6) {
  //iphone
  aspectRatio = 3;
}

var aspectRatio1 = 110;
if (height / width > 1.6) {
  //iphone
  aspectRatio1 = 80;
}

var aspectRatio2 = '100%';
if (height / width > 1.6) {
  //iphone
  aspectRatio2 = '70%';
}

const parentWidth = window.width;
const childrenWidth = window.width;
const childrenHeight = aspectRatio1;

const HomeScreen = ({
  navigation,
  dispatch,
  getUser,
  authData,
  getHome,
  getScore,
  getStatus1,
  getImg,
  route,
}) => {
  const [VarScroll, setVarScroll] = useState(true);
  const [Time, setTime] = useState(false);
  const [Box, setBox] = useState(false);
  const [Popup, setPopup] = useState(true);
  const [Popup2, setPopup2] = useState(true);
  const [Popup3, setPopup3] = useState(true);
  const [Popup4, setPopup4] = useState(false);
  const [ThanksDITP, setThanksDITP] = useState(false);
  const [remark, setremark] = useState('');
  const [Send, setSend] = useState(null);
  const isFocused = useIsFocused();
  const [popupSystem, setpopupSystem] = useState(null);
  const [popupSystemimg, setpopupSystemimg] = useState();
  const [DataListBottom, setDataListBottom] = useState([]);
  const [DataListTop, setDataListTop] = useState(parseInt[null]);
  const [DataBottom, setDataBottom] = useState(parseInt[null]);
  const [DataListTopStaff, setDataListTopStaff] = useState(parseInt[null]);
  const [language, setlanguage] = useState('TH');
  const [BannerTop, setBannerTop] = useState();
  const [BannerBottom, setBannerBottom] = useState();
  const [PopupSystemck, setPopupSystemck] = useState(true);

  //เช็คการย้ายเมนู แล้วให้แสดง popup
  const [PopupChenge, setPopupChenge] = useState(false);
  //เช้คการเข้าแอพ
  const [Countnumpopup, setCountnumpopup] = useState('');

  const [ActDateTop, setActDateTop] = useState();
  const [ShowAct, setShowAct] = useState(false);

  //css clickแล้ว ขยับ  Menu
  const animatedValue = useRef(new Animated.Value(0)).current;

  const isPressed = useRef(false);
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FFFFFF'],
  });

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

  const shakeButton = () => {
    if (!isPressed.current) {
      return;
    }
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 2,
        duration: 90,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 90,
        useNativeDriver: false,
      }),
    ]).start(shakeButton);
  };

  const handlePressIn = () => {
    isPressed.current = true;
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(shakeButton);
  };

  const handlePressOut = () => {
    isPressed.current = false;
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const _getBanner = async value => {
    try {
      const respones = await dispatch(getBanner());
      setBannerTop(respones.result.season);
      setBannerBottom(respones.result.banner);
    } catch (error) {}
  };

  const _getDateTop = async values => {
    try {
      const respones = await dispatch(getDateTop());
      if (respones.res_code === '00') {
        setActDateTop(respones.res_result);
      }
    } catch (error) {}
  };

  const _getStatus = async value => {
    try {
      const respones = await dispatch(getStatus({token: authData.token}));
    } catch (error) {}
  };

  const _SendAssessment = async value => {
    try {
      const payload = authData.token;
      const response = await dispatch(
        SendAssessment({
          results: {point: Send, remark: remark != '' ? remark : 'null'},
          token: payload,
        }),
      );
    } catch (error) {}
  };
  const AlertLogout2 = () => {
    dispatch({
      type: 'GET_REFRESH_SUCCESS',
    });
  };

  const _getPopupSystem = async values => {
    try {
      Token = authData.token;

      const payload = Token;
      const respones = await dispatch(
        getPopupSys({
          result: {},
          token: payload,
        }),
      );

      if (respones.res_code === '00') {
        // console.log(respones.res_result[0].popup_status);
        setpopupSystem(respones.res_result[0].popup_status);
        setpopupSystemimg(respones.res_result[0].img);
      }
    } catch (error) {}
  };

  const _getTokenQr = async values => {
    try {
      var Token = '';

      if (getUser.userDetails.res_result.type == 6) {
        Token = authData.token.res_result.token;
      } else {
        Token = authData.token;
      }
      const respones = await dispatch(
        getTokenQr({token: Token, type: getUser.userDetails.res_result.type}),
      );
    } catch (error) {}
  };

  const _SendMenuHome = async value => {

    
    try {
      if (getUser.userDetails.res_result.type != 6) {
        const respones = await dispatch(
          SendHomeMenu({
            results: {
              menu1: DataListTop != undefined ? DataListTop : [1, 2, 3, 4, 5],
              menu2:
                DataBottom != undefined ? DataBottom : [1, 2, 3, 4, 5, 6, 7, 8],
            },
            token: authData.token,
            type: getUser.userDetails.res_result.type,
          }),
        );

        if (value === 1) {
          const respones = await dispatch(
            SendHomeMenu({
              results: {
                menu1: [1, 2, 3, 4, 5],
                menu2: [1, 2, 3, 4, 5, 6, 7, 8],
              },
              token: authData.token,
              type: getUser.userDetails.res_result.type,
            }),
          );
          await dispatch(getMenuHome({token: authData.token}));

          AlertLogout2();
        }
      } else {
        const respones = await dispatch(
          SendHomeMenu({
            results: {
              menu1:
                DataListTopStaff != null
                  ? DataListTopStaff
                  : [1, 2, 3, 4, 5, 6],
              menu2: DataBottom != null ? DataBottom : [1, 2, 3, 4, 5, 6, 7, 8],
            },
            token: authData.token.res_result.token,
            type: getUser.userDetails.res_result.type,
          }),
        );

        if (value === 1) {
          // console.log('5555');
          const respones = await dispatch(
            SendHomeMenu({
              results: {
                menu1: [1, 2, 3, 4, 5, 6, 7, 8],
                menu2: [1, 2, 3, 4, 5, 6, 7, 8],
              },
              token: authData.token.res_result.token,
              type: getUser.userDetails.res_result.type,
            }),
          );
          await dispatch(
            getMenuHome({token: authData.token.res_result.token, type: 6}),
          );

          AlertLogout2();
        }
      }
    } catch (error) {}
  };

  //แสดงสไลด์
  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <View
        style={{
          height: 101,
          marginRight: 6,
          flex: 1,
        }}>
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Image style={styles.bannerTest} source={{uri: item.img}} />
        </TouchableOpacity>
      </View>
    );
  };

  setTimeout(() => {
    // console.log(ActDateTop);
  //  alert('มา'+ getStatus1.isResult.status_confirm_identity.status_code);
    // console.log(getHome, 'เมนูHome');
    // console.log(getScore.isResult, 'นับLOGIN');
    // console.log(authData.token);
    // // // console.log(Object.keys(BannerBottom));
    // console.log('ค่าuserDetails', getUser.userDetails);
    // console.log(getStatus1);
    // console.log(getImg);
    // console.log('ค่า', getStatus1);
  }, 200);

  const [refreshing, setRefreshing] = useState(false);
  const onRefreshing = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    try {
      AsyncStorage.getItem('language', (error, results) => {
        I18n.changelanguage(results);
      });

      AsyncStorage.getItem('num', (error, results) => {
        console.log('countnumnew' + results);
        setCountnumpopup(results);
        if (results > '5') {
          AsyncStorage.setItem('num', '0');
        }
      });

      if (getHome.isResult != undefined) {
        if (getUser.userDetails.res_result.type === 6) {
          setDataListBottom(
            [
              {
                sort: getHome.isResult.menu2[0],
                id: 1,
                icon: require('../../image/smelogo.png'),
                txt: 'SMEs Pro-active Program',
                screen: 'https://smesproactive.ditp.go.th/',
              },
              {
                sort: getHome.isResult.menu2[1],
                id: 2,
                icon: require('../../image/IconHomeBottom1.png'),
                txt: I18n.t('translate_internationalmarket'),
                screen1: 'MarketContry',
              },
              {
                sort: getHome.isResult.menu2[2],
                id: 3,
                icon: require('../../image/OSEC.png'),
                txt: I18n.t('translate_StudyinEpisodesandRules'),
                // screen: 'https://onestopservice.ditp.go.th/',
                screen1: 'OsecScreen',
              },

              {
                sort: getHome.isResult.menu2[3],
                id: 4,
                icon: require('../../image/Contect.png'),
                txt: I18n.t('translate_ContactDepartment'),
                screen1: 'Contectdepartment',
              },
            ].sort(function(a, b) {
              return a.sort - b.sort;
            }),
          );
        } else {
          setDataListBottom(
            [
              {
                sort: getHome.isResult.menu2[0],
                id: 1,
                icon: require('../../image/SMEsPro.png'),
                txt: 'SMEs Pro-active Program',
                screen: 'https://smesproactive.ditp.go.th/',
              },
              // {
              //   sort: getHome.isResult.menu2[1],
              //   id: 2,
              //   icon: require('../../image/ELearingX.png'),
              //   txt: 'E-Learning',
              //   screen: 'https://e-academy.ditp.go.th/',
              // },
              {
                sort: getHome.isResult.menu2[1],
                id: 2,
                icon: require('../../image/ddd2.png'),
                txt: I18n.t('translate_internationalmarket'),
                screen1: 'MarketContry',
              },
              {
                sort: getHome.isResult.menu2[2],
                id: 3,
                icon: require('../../image/OSECBG.png'),
                txt: I18n.t('translate_StudyinEpisodesandRules'),
                // screen: 'https://onestopservice.ditp.go.th/',
                screen1: 'OsecScreen',
              },
              {
                sort: getHome.isResult.menu2[3],
                id: 4,
                icon: require('../../image/registerDITP.png'),
                txt: I18n.t('transalte_Registers'),
                screen: 'https://pre.eventthai.com/home/register/visitor/',
              },

             
              {
                sort: getHome.isResult.menu2[4],
                id: 5,
                icon: require('../../image/AINews.png'),
                txt: I18n.t('transalte_analyze'),
                screen1: 'AnalyzeAi',
              },

              {
                sort: getHome.isResult.menu2[5],
                id: 6,
                icon: require('../../image/DITPCAREBG.png'),
                txt: I18n.t('translate_HomeCare'),
                screen1: 'HomeCare',
              },
            

              {
                sort: getHome.isResult.menu2[6],
                id: 7,
                icon: require('../../image/ccc2.png'),
                txt: I18n.t('translate_ContactDepartment'),
                screen1: 'Contectdepartment',
              },
            ].sort(function(a, b) {
              return a.sort - b.sort;
            }),
          );
        }
      }

      if (VarScroll) {
        setTimeout(() => {
          setTime(true);
        }, 1000);
      }
      _getStatus();
      _getBanner();
      _getDateTop();
      _getTokenQr();
      _getPopupSystem();

      setTimeout(() => {
        setShowAct(true);
      }, 2000);
    } catch (error) {}
    if (isFocused) {
      SlideDownPanel.hideHeader();
    } else {
      SlideDownPanel.hideHeader();
    }
  }, [getHome, isFocused]);
  //ต้องเปลี่ยน
  function renderItem(item, index) {
    return (
      <Animated.View style={[styles.button, {flex: 1, top: 5.5}]}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            if (VarScroll) {
              if (item.screen1) {
                navigation.navigate(item.screen1);
              } else {
                openLink(item.screen);
              }
            }
          }}>
          {/* <View style={[styles.item]}> */}
          {/* <View style={styles.item_icon_swipe}>
              <Image style={styles.item_icon} source={item.icon} />
            </View>
            <Text style={styles.item_text}>{item.txt}</Text>
            <View style={styles.item_icon_arrrow}>
              <Icon2 name="chevron-right" size={25} color="#bcbccb" />
            </View> */}
          {/* </View> */}
          <ImageBackground source={item.icon} style={[styles.item]}>
            <View style={styles.item_icon_swipe} />
            <View style={{flex: 0.8}}>
              <Text style={styles.item_text}>{item.txt}</Text>
            </View>

            <View style={styles.item_icon_arrrow}>
              <Icon2 name="chevron-right" size={25} color="#FFF" />
            </View>
          </ImageBackground>
          {/* </View> */}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const openLink = async item => {
    const url = item;
    // console.log(url);

    try {
      const url = item;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  const openLink2 = async item => {
    const Token = authData.token;
    const userDrive = getUser.userDetails.res_result.userID_drive;
    const deeplink = getDeepLinkAutoMem();
    const url = `https://drive.ditp.go.th/th-th/signin?type=1&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    // console.log(url);
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deeplink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.flex1]}>
      <HeaderHome
        checkScreenhome={route.params.checkScreenhome}
        badgeNumber="2"
        navigation={navigation}
        ArrowColor={true}
      />
      <View>
        {Popup4 === true && (
          <Overlay
            onBackdropPress={() => setPopup4(false)}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.5 : 0.8,
            }}>
            <Popup5
              Icon={
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../image/Dashboard.png')}
                />
              }
              accept={() => setPopup4(false)}
              text={'Coming Soon'}
            />
          </Overlay>
        )}
      </View>
            {/* เริ่มดดด */}
      {getStatus1.isResult.status_confirm_identity
                          .status_code === 0 && getScore.isResult ===  2  && (
        <View>
          {Popup === true && (
            <Overlay
              fullScreen={false}
              isVisible={Popup}
              onBackdropPress={() => setPopup(false)}
              backdropStyle={{
                backgroundColor:
                  Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                opacity: Platform.OS === 'android' ? 0.5 : 0.8,
              }}>
              <Popiden
                cancle={() => {
                  setPopup(false);
                }}
                accept={() => {
                  setTimeout(() => {
                    navigation.navigate('Identity');
                  }, 200);

                  setPopup(false);
                }}
              />
            </Overlay>
          )}
        </View>
       )}
      {/* เช็คเวลาการแจ้งเตือนระบบ */}
      {popupSystem === true && (
        <View>
          <Overlay
            fullScreen={false}
            isVisible={PopupSystemck}
            onBackdropPress={() => setPopupSystemck(false)}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.5 : 0.8,
            }}>
            <View style={{width: width * 0.9, height: height * 0.4}}>
              <Image
                style={{width: width * 0.9, height: height * 0.4}}
                source={{uri: popupSystemimg}}
              />
            </View>
          </Overlay>
        </View>
      )}

      <ParallaxScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
        }
        scrollEnabled={VarScroll}
        style={[
          styles.parallaxView,
          Platform.OS === 'android' && {zIndex: -1, marginTop: 5},
        ]}
        renderBackground={() => (
          <ImageBackground
            source={{uri: BannerTop}}
            style={[styles.HeaderTest]}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              position: 'absolute',
              left: 29,
              top: '45%',
              flexDirection: 'row',
              width: '90%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileActivity')}>
              <ImageBackground
                source={require('../../image/BGlogoProfile.png')}
                style={styles.BGProfileLogo}>
                <View style={styles.ViewAvatraHeader}>
                  {getImg.isSuccess ? (
                    <View>
                      <Avatar
                        size={69}
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                          backgroundColor: '#FFFFFF',
                        }}
                        source={{
                          uri:
                            getImg.img ==
                            'http://one.ditp.go.th/uploads/member_profile/profile_new.png'
                              ? 'https://adminshop.kwanpat.com/theme/test_uploads/accounnull.png'
                              : getImg.img,
                        }}
                      />
                    </View>
                  ) : (
                    <Avatar
                      size={69}
                      rounded
                      overlayContainerStyle={{
                        borderWidth: 2,
                        borderColor: '#FFFFFF',
                      }}
                      source={require('../../image/accounnull.png')}
                    />
                  )}

                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      bottom: 0,
                      marginRight: 3,
                      alignItems: 'center',
                      position: 'absolute',
                      zIndex: 0,
                    }}>
                    {getStatus1.isResult != undefined ? (
                      <View
                        style={{
                          right: 15,
                          zIndex: 2,
                          position: 'absolute',
                          bottom: 5,
                        }}>
                        {getStatus1.isResult.status_confirm_identity
                          .status_code === 0 && (
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../image/Alert12.png')}
                          />
                        )}
                        {getStatus1.isResult.status_confirm_identity
                          .status_code === 1 && (
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../image/watingPro.png')}
                          />
                        )}
                        {getStatus1.isResult.status_confirm_identity
                          .status_code === 2 && <View />}
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 27,
                width: '90%',
                bottom: 15,
              }}>
              <Text style={[styles.font27, styles.colorFFFFFF]}>
                {I18n.t('translate_Hello')}
              </Text>

              {getUser.isSuccess ? (
                <View style={{width: '100%'}}>
                  {getUser.userDetails.res_result.type === 1 && (
                    <View>
                      <View style={{width: aspectRatio2}}>
                        {/* <Text
                          numberOfLines={1}
                          style={[
                            styles.fontCompayProfile,
                            styles.colorFFFFFF,
                          ]}>
                          {getUser.userDetails.res_result.company.nameTh}
                        </Text> */}
                        <Text
                          style={[
                            styles.fontDetailProfile3,
                            styles.colorFFFFFF,
                          ]}>
                          {getUser.userDetails.res_result.sub_member.titleTh +
                            getUser.userDetails.res_result.sub_member.nameTh +
                            ' ' +
                            getUser.userDetails.res_result.sub_member
                              .lastnameTh}
                        </Text>
                      </View>

                      <Text
                        style={[styles.fontDetailProfile2, styles.colorFFFFFF]}>
                        {I18n.t('translate_Juristic_ID')} :{' '}
                        {getUser.userDetails.res_result.naturalId}
                      </Text>
                      {/* <Text
                        style={[styles.fontDetailProfile3, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.sub_member.titleTh +
                          getUser.userDetails.res_result.sub_member.nameTh +
                          ' ' +
                          getUser.userDetails.res_result.sub_member.lastnameTh}
                      </Text> */}
                      <View style={{width: aspectRatio2}}>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.fontCompayProfile,
                            styles.colorFFFFFF,
                          ]}>
                          {getUser.userDetails.res_result.company.nameTh}
                        </Text>
                      </View>

                      {getStatus1.isResult != undefined ? (
                        <View style={{flexDirection: 'row'}}>
                          {getStatus1.isResult.status_ditp.status !=
                          'not active ditp' && getStatus1.isResult.status_ditp.status != undefined ? (
                            <>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: '#ffffff',
                                  fontFamily: 'Pridi-Medium',
                                }}>
                                {I18n.t('translate_Member')}{' '}
                                {getStatus1.isResult.status_ditp.nameEn}
                              </Text>
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  marginTop: 4,
                                  marginLeft: 10,
                                }}
                                source={require('../../image/logoMM.png')}
                              />
                            </>
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View />
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View />
              )}
              {getUser.isSuccess ? (
                <View>
                  {getUser.userDetails.res_result.type === 2 && (
                    <View>
                      <Text
                        style={[styles.fontDetailProfile3, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.sub_member.titleEn +
                          getUser.userDetails.res_result.sub_member.nameEn +
                          ' ' +
                          getUser.userDetails.res_result.sub_member.lastnameEn}
                      </Text>
                      {/* <Text
                        style={[styles.fontCompayProfile, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.corporate.name}
                      </Text> */}
                      {getStatus1.isResult != undefined ? (
                        <View style={{flexDirection: 'row'}}>
                          {getStatus1.isResult != undefined ? (
                            <View style={{flexDirection: 'row'}}>
                              {getStatus1.isResult.status_ditp.status !=
                              'not active ditp' ? (
                                <Text
                                  style={{
                                    fontSize: 19,
                                    color: '#ffffff',
                                    fontFamily: 'Kittithada Bold 75',
                                  }}>
                                  {I18n.t('translate_Member')}{' '}
                                  {getStatus1.isResult.status_ditp.nameEn}
                                </Text>
                              ) : (
                                <View />
                              )}
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View />
                      )}
                      <Text
                        style={[styles.fontDetailProfile2, styles.colorFFFFFF]}>
                        {I18n.t('translate_Juristic_ID')} :{' '}
                        {getUser.userDetails.res_result.naturalId}
                      </Text>
                      {/* <Text
                        style={[styles.fontDetailProfile3, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.sub_member.titleEn +
                          getUser.userDetails.res_result.sub_member.nameEn +
                          ' ' +
                          getUser.userDetails.res_result.sub_member.lastnameEn}
                      </Text> */}
                      <Text
                        style={[styles.fontCompayProfile, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.corporate.name}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View />
              )}
              {getUser.isSuccess ? (
                <View>
                  {getUser.userDetails.res_result.type === 4 && (
                    <View>
                      <Text
                        style={[styles.fontCompayProfile, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.member.titleEn +
                          getUser.userDetails.res_result.member.nameEn +
                          ' ' +
                          getUser.userDetails.res_result.member.lastnameEn}
                      </Text>
                      {getStatus1.isResult != undefined ? (
                        <View style={{flexDirection: 'row'}}>
                          {getStatus1.isResult != undefined ? (
                            <View style={{flexDirection: 'row'}}>
                              {getStatus1.isResult.status_ditp.status !=
                              'not active ditp' ? (
                                <Text
                                  style={{
                                    fontSize: 19,
                                    color: '#ffffff',
                                    fontFamily: 'Kittithada Bold 75',
                                  }}>
                                  {I18n.t('translate_Member')}{' '}
                                  {getStatus1.isResult.status_ditp.nameEn}
                                </Text>
                              ) : (
                                <View />
                              )}
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View />
                      )}
                      <Text
                        style={[styles.fontDetailProfile2, styles.colorFFFFFF]}>
                        Passport ID : {getUser.userDetails.res_result.naturalId}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View />
              )}
              {getUser.isSuccess ? (
                <View>
                  {getUser.userDetails.res_result.type === 3 && (
                    <View>
                      <Text
                        style={[styles.fontCompayProfile, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.member.titleTh +
                          getUser.userDetails.res_result.member.nameTh +
                          ' ' +
                          getUser.userDetails.res_result.member.lastnameTh}
                      </Text>
                      {getStatus1.isResult != undefined ? (
                        <View style={{flexDirection: 'row'}}>
                          {getStatus1.isResult.status_ditp.status ===
                          'active ditp' ? (
                            <Text style={{fontSize: 20, color: '#ffffff'}}>
                              {I18n.t('translate_Member')} EL. nnnn
                            </Text>
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View />
                      )}
                      <View style={{width: '80%'}}>
                        <Text
                          numberOfLines={2}
                          style={[
                            {
                              fontSize: 15,
                              marginTop: -3,
                              fontFamily: 'Pridi-Regular',
                            },
                            styles.colorFFFFFF,
                          ]}>
                          {I18n.t('translate_naturalId')} :{'\n'}
                          {getUser.userDetails.res_result.naturalId}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <View />
              )}

              {getUser.isSuccess ? (
                <View>
                  {getUser.userDetails.res_result.type === 6 && (
                    <View>
                      <Text
                        style={[styles.fontCompayProfile, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.title_th +
                          getUser.userDetails.res_result.name_th +
                          ' ' +
                          getUser.userDetails.res_result.lastname_th}
                      </Text>

                      <Text style={[{fontSize: 25}, styles.colorFFFFFF]}>
                        {getUser.userDetails.res_result.agency}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        )}
        parallaxHeaderHeight={220}>
        {Time === true && (
          <View style={[styles.BGeff0f6]}>
            {ThanksDITP === true && (
              <View style={{borderRadius: 8}}>
                {/* {Popup2 === true && ( */}
                <Overlay
                  onBackdropPress={() => setThanksDITP(false)}
                  isVisible
                  backdropStyle={{
                    backgroundColor:
                      Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                    opacity: Platform.OS === 'android' ? 0.5 : 0.8,
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
                      onPress={() => {
                        setTimeout(() => {
                          setThanksDITP(false);
                        }, 100);
                      }}>
                      <Icon3
                        color="#2b688f"
                        name="x"
                        size={20}
                        style={{right: 1}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 300,
                      height: 260,
                      backgroundColor: '#ffffff',
                      padding: 10,

                      borderRadius: 8,
                      alignItems: 'center',
                    }}>
                    {/* <Text>ขอบคุณค่ะ</Text> */}
                    <Image
                      style={{width: 166, height: 190}}
                      source={require('../../image/ThanksDITP.png')}
                    />
                    <Text style={{fontSize: 24, color: '#20416e', top: 10}}>
                      {I18n.t('translate_ThanksDITP')}
                    </Text>
                  </View>
                </Overlay>
              </View>
            )}
            {/* แบบสอบถาม */}
            {getScore.isResult <= 1 && getStatus1.isResult.status_confirm_identity
                          .status_code === 0 && (
            
              <View>
                {Popup2 === true && (
                  <Overlay
                    onBackdropPress={() => setPopup2(false)}
                    isVisible
                    backdropStyle={{
                      backgroundColor:
                        Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                      opacity: Platform.OS === 'android' ? 0.5 : 0.8,
                    }}>
                    <PopQues
                      cancle={() => {
                        setPopup2(false);
                      }}
                      accept={() => {
                        setTimeout(() => {
                          setPopup2(false);
                          navigation.navigate('Questionnaire');
                        }, 200);
                      }}
                    />
                  </Overlay>
                )}
              </View>
             )}  
            {Countnumpopup === '5' && (
              // ให้คะแนน
              <View>
                {Popup3 === true && (
                  <Overlay
                    backdropStyle={Styles.color2d6dc480}
                    isVisible
                    onBackdropPress={() => setPopup3(false)}>
                    <PopAssessment
                      Ass1={() => {
                        if (Send === 5) {
                          setSend(null);
                        } else {
                          setSend(5);
                        }
                      }}
                      Image1={
                        Send === 5
                          ? require('../../image/newverygood2x.png')
                          : require('../../image/newverygoodx.png')
                      }
                      text1={
                        <Text
                          style={[
                            Styles.popup3RatingImageText,
                            {color: Send === 5 ? 'black' : '#dcdcdc'},
                          ]}>
                          {I18n.t('translate_good')}
                        </Text>
                      }
                      Ass2={() => {
                        if (Send === 3) {
                          setSend(null);
                        } else {
                          setSend(3);
                        }
                      }}
                      Image2={
                        Send === 3
                          ? require('../../image/newgood2x.png')
                          : require('../../image/newgoodx.png')
                      }
                      text2={
                        <Text
                          style={[
                            Styles.popup3RatingImageText,
                            {color: Send === 3 ? 'black' : '#dcdcdc'},
                          ]}>
                          {I18n.t('translate_good2')}
                        </Text>
                      }
                      Ass3={() => {
                        if (Send === 1) {
                          setSend(null);
                        } else {
                          setSend(1);
                        }
                      }}
                      Image3={
                        Send === 1
                          ? require('../../image/newnogood2x.png')
                          : require('../../image/newnogoodx.png')
                      }
                      text3={
                        <Text
                          style={[
                            Styles.popup3RatingImageText,
                            {color: Send === 1 ? 'black' : '#dcdcdc'},
                          ]}>
                          {I18n.t('translate_good3')}
                        </Text>
                      }
                      textInput={
                        <View style={Styles.popup3DetailContainer}>
                          <TextInput
                            value={remark}
                            onChangeText={text => setremark(text)}
                            placeholderTextColor="#c5d1da"
                            multiline={true}
                            style={Styles.popup3DetailTextInput}
                            placeholder={I18n.t('translate_goodDetail')}
                          />
                        </View>
                      }
                      Touch={!(Send != null)}
                      Touch2={() => {
                        setTimeout(() => {
                          _SendAssessment();
                        }, 200);
                        setPopup3(false);
                        setThanksDITP(true);
                      }}
                      TouchStyle={
                        Send
                          ? Styles.popup3SubmitButton
                          : Styles.popup3disableButton
                      }
                    />
                  </Overlay>
                )}
              </View>
            )}

<View>
                {PopupChenge === true && (
                         <View>
                         <Overlay
                           overlayStyle={{
                             width: width * 0.75,
                           }}
                           onBackdropPress={() => setPopupChenge(false)}
                           backdropStyle={{
                             backgroundColor:
                               Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                             opacity: Platform.OS === 'android' ? 0.5 : 0.8,
                           }}>
                           <View>
                             <PopupCk
                             text={''}
                            
                             cancle ={()=>{
                              setPopupChenge(false)

                             }}
                             accept = {()=>{

                              _SendMenuHome();
                              setTimeout(() => {
                                setPopupChenge(false)
                                
                              }, 200);
                               
                             }}


                             
                             />
                             {/* <Text
                               style={{
                                 color: '#20416e',
                                 fontSize: 22,
                                 fontFamily: 'Kittithada Bold 75',
                                 textAlign: 'center',
                                 marginBottom: 20,
                               }}>
                               {'กรุณายืนยันการปรับแก้ไขเมนูหลัก'}
                             </Text>
                             <View
                               style={{
                             
                                 flexDirection:'row',
                                 height:35,
                                 justifyContent: 'center',
                                 marginBottom:10
                               }}>
                               <TouchableOpacity
                                 onPress={() => {
                                  setPopupChenge(false)
                                 }}
                                 style={{
                                  justifyContent: 'center',
                                   width:120,
                                   height: 39,
                                   backgroundColor: '#f86767',
                                   borderRadius: 45,
                                   marginHorizontal: 10,
                                 }}>
                                 <Text
                                   style={{
                                     textAlign: 'center',
                                     color: '#FFF',
                                     fontSize: 20,
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
                                   width:120,
                                   height: 39,
                                   backgroundColor: '#2d6dc4',
                                   borderRadius: 25,
                                   marginHorizontal: 10,
                                 }}>
                                 <Text
                                   style={{
                                     textAlign: 'center',
                                     color: '#FFF',
                                     fontSize: 20,
                                   }}>
                                   {'ยืนยัน'}
                                 </Text>
                               </TouchableOpacity>
                             </View> */}
                           </View>
                         </Overlay>
                       </View>
                )}
              </View>

            <View style={styles.ViewTabTop}>
              <View style={[styles.TabScan, styles.TabScanBorderRight]}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() =>
                    setTimeout(() => {
                      navigation.navigate('Qrcode');
                    }, 200)
                  }>
                  <Image
                    style={styles.IconScan}
                    source={require('../../image/scanXX.png')}
                  />
                  <Text style={styles.TextQR}>{I18n.t('translate_Scan')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.TabScan}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() =>
                    setTimeout(() => {
                      if (Platform.OS === 'android') {
                        navigation.navigate('Qrcode');
                      } else {
                        navigation.navigate('QrcodeScan');
                      }
                    }, 200)
                  }>
                  <Image
                    style={styles.IconQR}
                    source={require('../../image/qrcodeXX.png')}
                  />
                  <Text style={styles.TextQR}>
                    {I18n.t('translate_MyQrcode')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {getHome.isResult != undefined && (
              <View>
                {getUser.isSuccess ? (
                  <View>
                    {getUser.userDetails.res_result.type != 6 ? (
                      <View>
                        <SortableGridview
                          data={[
                            {
                              name: 1,
                              sort: getHome.isResult.menu1[0],
                              title: 'ตรวจสอบสถานะ',
                              subtitle: 'การเข้าร่วมกิจกรรม',
                              title1: 'Check status',
                              subtitle1: 'participate',
                              icon: require('../../image/managementXX.png'),
                              iconW: '100%',
                              iconH: '50%',

                              screen1: 'ProfileActivity',
                            },

                            {
                              name: 2,
                              sort: getHome.isResult.menu1[1],
                              title: 'ร่วมกิจกรรม',
                              subtitle: 'ส่งเสริมการค้าระหว่างประเทศ',
                              title1: 'Participate',
                              subtitle1: 'in DITP events',
                              icon: require('../../image/bitmapx.png'),
                              iconW: '100%',
                              iconH: '43%',
                              screen1: 'TradeActivities',
                            },

                            {
                              // name: 3,
                              // sort: getHome.isResult.menu1[2],
                              // title: 'ค้าออนไลน์',
                              // subtitle: 'กับไทยเทรด',
                              // title1: 'Trade internationally',
                              // subtitle1: 'with ThaiTrade',
                              // icon: require('../../image/THAITRADELogo.png'),
                              // iconW: 45,
                              // iconH: 44,
                              // screen: 'https://www.thaitrade.com/',
                              name: 3,
                              sort: getHome.isResult.menu1[2],
                              title: 'ค้าออนไลน์',
                              // title: 'e-Commerce',
                              subtitle: 'กับไทยเทรด',
                              // title1: 'Trade internationally',
                              title1: 'e-Commerce',
                              subtitle1: 'with ThaiTrade',
                              icon: require('../../image/THAITRADELogo.png'),
                              iconW: '100%',
                              iconH: '43%',
                              screen:
                                Platform.OS === 'android'
                                  ? 'https://www.thaitrade.com/home?gclid=CjwKCAjwpMOIBhBAEiwAy5M6YB0d4xzPPui5nrvmgZEYihexmeGs0hgawWvljOl8ZaUR0ak5TPsw6RoCfGgQAvD_BwE'
                                  : 'https://www.thaitrade.com/home?gclid=CjwKCAjwpMOIBhBAEiwAy5M6YB0d4xzPPui5nrvmgZEYihexmeGs0hgawWvljOl8ZaUR0ak5TPsw6RoCfGgQAvD_BwE',
                            },

                            {
                              name: 4,
                              sort: getHome.isResult.menu1[3],
                              title: 'ฝึกอบรม',
                              subtitle: 'ฝึกอบรม',
                              title1: 'Trade Internationally',
                              subtitle1: 'with ThaiTrade',
                              icon: require('../../image/conferenceXX.png'),
                              iconW: '100%',
                              iconH: '43%',
                              screen1: 'DevelopScreen',
                              icon2: require('../../image/LiveHome.png'),
                              iconw2: 35,
                              iconH2: 10,
                            },

                            {
                              name: 5,
                              sort: getHome.isResult.menu1[4],
                              title: 'ตามติดสถิติ',
                              subtitle: 'การค้าระหว่างประเทศ',
                              title1: 'Trade statistics',
                              subtitle1: 'International',
                              icon: require('../../image/barchartXX.png'),
                              iconW: '100%',
                              iconH: '43%',
                              screen1: 'StatisticsScreen',
                            },
                          ].sort(function(a, b) {
                            if (a.sort < b.sort) {
                              return -1;
                            }
                            if (a.sort > b.sort) {
                              return 1;
                            }
                            return 0;
                          })}
                          lockData={[
                            {
                              name: 6,
                              title:
                                (getStatus1.isResult != undefined &&
                                  getStatus1.isResult.status_ditp.status ===
                                    'active ditp') ||
                                getUser.userDetails.res_result.type === 3
                                  ? 'สร้างมูลค่าเพิ่ม'
                                  : 'สมัครสมาชิกกรม',
                              title1:
                                getStatus1.isResult != undefined &&
                                getStatus1.isResult.status_ditp.status ===
                                  'active ditp'
                                  ? 'Emblem'
                                  : 'Apply',
                              subtitle:
                                getStatus1.isResult != undefined &&
                                getStatus1.isResult.status_ditp.status ===
                                  'active ditp'
                                  ? 'ของกรม'
                                  : 'สมาชิกกรม',
                              subtitle1:
                                getStatus1.isResult != undefined &&
                                getStatus1.isResult.status_ditp.status ===
                                  'active ditp'
                                  ? 'Department of'
                                  : 'Department members',
                              icon: require('../../image/DITP.png'),
                              iconW: '100%',
                              iconH: '43%',
                              screen1: 'Brand',
                            },
                          ]}
                          onDragStart={data => {
                            setVarScroll(false);
                            handlePressIn();

                            console.log('Move***');
                          }}

                          onDragRelease={data => {

                            // alert('กรุณาบันทึก')

                            console.log('End***');
                            handlePressOut();
                            setDataListTop([
                              data.findIndex(data => data.name == 1),
                              data.findIndex(data => data.name == 2),
                              data.findIndex(data => data.name == 3),
                              data.findIndex(data => data.name == 4),
                              data.findIndex(data => data.name == 5),
                              data.findIndex(data => data.name == 6),
                            ]);
                            setVarScroll(true);
                            setPopupChenge(true)
                     
                          
                            
                          }}
                          renderItem={(item, index, itemIndex) => {
                            return (
                              <Animated.View
                                uniqueKey={item.name}
                                style={[
                                  styles.button,
                                  {
                                    // shadowColor: '#FFF',
                                    // shadowOffset: {
                                    //   width: 0,
                                    //   height: 4,
                                    // },
                                    // shadowOpacity: 0.32,
                                    // shadowRadius: 5.46,

                                    // elevation: 9,
                                    flex: 1,
                                    margin: 1.5,
                                    borderRadius: 8,
                                    backgroundColor,
                                    transform: [{rotate}],
                                  },
                                ]}
                                //  ref={ref => setAnimetion(ref)}
                                // style={styles.imageBGDrag}
                              >
                                {/* <ImageBackground
                                  style={{}}
                                  source={require('../../image/bgicon.png')}
                                  imageStyle={styles.imageBGDrag}> */}
                                <View>
                                  {item.name === 4 && (
                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'row-reverse',
                                        top: 5,
                                        right: 5,
                                      }}>
                                      {getStatus1.isSuccess ? (
                                        <View>
                                          {getStatus1.isResult
                                            .status_activity != undefined && (
                                            <View>
                                              {getStatus1.isResult
                                                .status_activity.activity2 ===
                                              'no' ? (
                                                <View />
                                              ) : (
                                                <ImageBackground
                                                  source={item.icon2}
                                                  style={{
                                                    width: 29,
                                                    height: 12,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                  }}>
                                                  <Text
                                                    style={{
                                                      fontSize: 12,
                                                      color: '#ffffff',
                                                      bottom: 1,
                                                    }}>
                                                    {I18n.t(
                                                      'translate_Live_HOME',
                                                    )}
                                                  </Text>
                                                </ImageBackground>
                                              )}
                                            </View>
                                          )}
                                        </View>
                                      ) : (
                                        <View />
                                      )}
                                    </View>
                                  )}
                                </View>
                                {item.name === 2 && (
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row-reverse',
                                    }}>
                                    {getStatus1.isResult.status_activity !=
                                      undefined && (
                                      <View>
                                        {getStatus1.isResult.status_activity
                                          .activity1 === 'no' ? (
                                          <View />
                                        ) : (
                                          <ImageBackground
                                            source={item.icon2}
                                            style={{
                                              width: 29,
                                              height: 12,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#ffffff',
                                                bottom: 1,
                                              }}>
                                              {I18n.t('translate_Live_HOME')}
                                              {/* {'LLLLLLLLLLLLLLL'} */}
                                            </Text>
                                          </ImageBackground>
                                        )}
                                      </View>
                                    )}
                                  </View>
                                )}
                                <TouchableOpacity
                                  onPress={() => {
                                    if (VarScroll) {
                                     
                                      if (item.screen1) {
                                        navigation.navigate(item.screen1, {
                                          abc: false,
                                          index: 1,
                                        });
                                        // initAnalytic();
                                        SlideDownPanel.hideHeader();
                                      } else {
                                        openLink(item.screen);
                                        SlideDownPanel.hideHeader();
                                      }
                                    }
                                    
                                  }}>
                                  <View
                                    style={[styles.ViewSumImageText]}
                                    onTap={() => {
                                      console.log(`On Tap ${item.name}!`);
                                    }}>
                                    <Image
                                      resizeMode="contain"
                                      style={[
                                        {
                                          width: item.iconW,
                                          height: item.iconH,
                                          // width:'100%',
                                          // height:'40%',
                                          // borderWidth:1
                                        },
                                        styles.marginTop20,
                                      ]}
                                      source={item.icon}
                                    />
                                    <View style={styles.ViewText}>
                                      <Text
                                        style={[
                                          styles.text,
                                          styles.color2d6dc4,
                                        ]}
                                        numberOfLines={1}>
                                        {I18n.locale === 'th'
                                          ? item.title
                                          : item.title1}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                                {/* </ImageBackground> */}
                              </Animated.View>
                            );
                          }}
                          renderLockItem={(item, index) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  if (
                                    getStatus1.isResult.status_ditp.status !=
                                    'not active ditp' || getUser.userDetails.res_result.type === 3
                                  ) {
                                    setTimeout(() => {
                                      navigation.navigate(item.screen1, {
                                        abc: true,
                                      });
                                    }, 200);
                                    SlideDownPanel.hideHeader();
                                  } else {
                                    openLink2(
                                      getStatus1.isResult.status_ditp.url_regis,
                                    );
                                    SlideDownPanel.hideHeader();
                                  }
                                }}>
                                {/* <ImageBackground
                                  uniqueKey={item.name}
                                  source={require('../../image/MainMenuLock.png')}
                                  imageStyle={styles.imageBGDrag}
                                  style={{}}> */}
                                <LinearGradient
                                  style={{
                                    margin: 1.5,
                                    borderRadius: 8,
                                  }}
                                  colors={['#5dbde6', '#1d61bd']}
                                  start={{x: 0, y: 1}}
                                  end={{x: 1, y: 0}}>
                                  <View
                                    style={[styles.ViewSumImageText]}
                                    onTap={() => {
                                      console.log(`On Tap ${item.name}!`);
                                    }}>
                                    {/* <View style={{}}> */}
                                    <Image
                                      resizeMode="contain"
                                      style={[
                                        {
                                          width: '95%',
                                          height: '40%',
                                          marginTop: 26,
                                        },
                                      ]}
                                      source={item.icon}
                                    />
                                    {/* </View> */}
                                    <View style={styles.ViewText}>
                                      <Text
                                        style={[
                                          styles.text,
                                          styles.colorFFFFFF2,
                                        ]}
                                        numberOfLines={2}>
                                        {I18n.locale === 'th'
                                          ? item.title
                                          : item.title1}
                                      </Text>
                                    </View>
                                  </View>
                                </LinearGradient>
                                {/* </ImageBackground> */}
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    ) : (
                      <SortableGridviewOri
                        data={[
                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 1,
                            sort: getHome.isResult.menu1[0],
                            title: 'ร่วมกิจกรรม',
                            subtitle: 'การเข้าร่วมกิจกรรม',
                            title1: 'Check status',
                            subtitle1: 'participate',
                            icon: require('../../image/bitmapx.png'),
                            iconW: '100%',
                            iconH: '45%',
                            screen1: 'TradeActivities',
                          },
                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 2,
                            sort: getHome.isResult.menu1[1],
                            title: 'สแกน QR Code',
                            subtitle: 'สำหรับเจ้าหน้าที่',
                            title1: 'Scan QR Code',
                            subtitle1: 'For staff',
                            icon: require('../../image/ScanPhone.png'),
                            iconW: '100%',
                            iconH: '43%',
                            screen1: 'Activityscan',
                          },
                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 3,
                            sort: getHome.isResult.menu1[2],
                            title: 'Dashboard',
                            subtitle: '',
                            title1: 'Dashboard',
                            subtitle1: '',
                            icon: require('../../image/Dashboard.png'),
                            iconW: '100%',
                            iconH: '43%',
                          },
                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 4,
                            sort: getHome.isResult.menu1[3],
                            title: 'พัฒนาศักยาภาพ',
                            subtitle: 'พัฒนาศักยาภาพ',
                            title1: 'Trade internationally',
                            subtitle1: 'with ThaiTrade',
                            icon: require('../../image/conferencex.png'),
                            iconW: '100%',
                            iconH: '43%',
                            screen1: 'DevelopScreen',
                            icon2: require('../../image/LiveHome.png'),
                            iconw2: 35,
                            iconH2: 10,
                          },

                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 5,
                            sort: getHome.isResult.menu1[4],
                            title: 'ตามติดสถิติ',
                            subtitle: 'การค้าระหว่างประเทศ',
                            title1: 'trade statistics',
                            subtitle1: 'International',
                            icon: require('../../image/economic.png'),
                            iconW: '100%',
                            iconH: '43%',
                            screen1: 'StatisticsScreen',
                          },
                          {
                            //บุคลากรเจ้าหน้าที่
                            name: 6,
                            sort: getHome.isResult.menu1[5],
                            title: 'ค้นหา',
                            subtitle: 'ผู้ส่งออก',
                            title1: 'Search',
                            subtitle1: 'Exporter',
                            icon: require('../../image/sendout.png'),
                            iconW: '100%',
                            iconH: '43%',
                            screen1: 'Seachexporter',
                          },
                        ].sort(function(a, b) {
                          if (a.sort < b.sort) {
                            return -1;
                          }
                          if (a.sort > b.sort) {
                            return 1;
                          }
                          return 0;
                        })}
                        onDragStart={data => {
                          setVarScroll(false);
                          console.log('F*******');
                          handlePressIn();
                        }}
                        onDragRelease={data => {
                          setDataListTopStaff([
                            data.findIndex(data => data.name == 1),
                            data.findIndex(data => data.name == 2),
                            data.findIndex(data => data.name == 3),
                            data.findIndex(data => data.name == 4),
                            data.findIndex(data => data.name == 5),
                            data.findIndex(data => data.name == 6),
                          ]);
                          console.log('F88888');
                          handlePressOut();
                          setVarScroll(true);
                        
                        }}
                        renderItem={(item, index, itemIndex) => {
                          return (
                            <ImageBackground
                              uniqueKey={item.name}
                              source={require('../../image/MainMenuDrag.png')}
                              imageStyle={[styles.imageBGDrag, {marginTop: 3}]}
                              style={{}}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (VarScroll) {
                                    if (item.screen1) {
                                      if (item.name == 6) {
                                        navigation.navigate(item.screen1, {
                                          abc: false,
                                          index: 1,
                                        });
                                        SlideDownPanel.hideHeader();
                                      } else {
                                        navigation.navigate(item.screen1, {
                                          abc: false,
                                          index: 1,
                                        });
                                      }
                                    } else {
                                      SlideDownPanel.hideHeader();
                                      setPopup4(true);
                                    }
                                  }
                                }}>
                                <View
                                  style={[
                                    styles.ViewSumImageText,
                                    {marginBottom: 0},
                                  ]}
                                  onTap={() => {
                                    console.log(`On Tap ${item.name}!`);
                                  }}>
                                  <Image
                                    style={[
                                      {
                                        width: item.iconW,
                                        height: item.iconH,
                                      },
                                      item.name == 2
                                        ? styles.marginTop14
                                        : item.name == 3 || item.name == 5
                                        ? styles.marginTop20
                                        : styles.marginTop24,
                                    ]}
                                    source={item.icon}
                                  />
                                  <View style={styles.ViewText}>
                                    <Text
                                      style={[styles.text, styles.color2d6dc4]}
                                      numberOfLines={1}>
                                      {I18n.locale === 'th'
                                        ? item.title
                                        : item.title1}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </ImageBackground>
                          );
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <View />
                )}
              </View>
            )}
            {BannerBottom != undefined && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Carousel
                  layout={'default'}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  autoplayInterval={4000}
                  autoplay
                  loop
                  data={BannerBottom}
                  sliderWidth={
                    Dimensions.get('window').width -
                    Dimensions.get('window').width / aspectRatio
                  }
                  itemWidth={
                    Dimensions.get('window').width -
                    Dimensions.get('window').width / aspectRatio
                  }
                  renderItem={_renderItem}
                  onSnapToItem={index => {}}
                />
              </View>
            )}

            {getHome.isSuccess ? (
              <AutoDragSortableView
                dataSource={DataListBottom}
                parentWidth={parentWidth}
                childrenWidth={childrenWidth}
                marginChildrenBottom={5}
                childrenHeight={childrenHeight}
                onDragStart={data => {
                  setVarScroll(false);
                  handlePressIn();
                  console.log('Start');
                }}
                onDragRelease={data => {
                  setVarScroll(true);
                  console.log('End***');
                }}
                onDragEnd={data => {
                  handlePressOut();
                  console.log('End***');
                  setTimeout(() => {
                    setVarScroll(true);
                  }, 500);
                  setPopupChenge(true)
                }}
                onDataChange={data => {
                  setDataBottom([
                    data.findIndex(data => data.id == 1),
                    data.findIndex(data => data.id == 2),
                    data.findIndex(data => data.id == 3),
                    data.findIndex(data => data.id == 4),
                    data.findIndex(data => data.id == 5),
                    data.findIndex(data => data.id == 6),
                    // data.findIndex(data => data.id == 7),
                    // data.findIndex(data => data.id == 8),
                  ]);
                  if (data.length !== DataListBottom.length) {
                    setDataListBottom(data);
                  }
                }}
                keyExtractor={(item, index) => item.txt}
                renderItem={(item, index) => {
                  return renderItem(item, index);
                }}
              />
            ) : (
              <View />
            )}
          </View>
        )}

        {/* {Box === false && ( */}
          {/* <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                setBox(true);
              }, 200)
            }>
            <View style={styles.ViewBottom}>
              <Icon
                name="pluscircle"
                size={17}
                color={'#3b4254'}
                style={styles.IconBottom}
              />
              <Text style={styles.TextBottom}>
                {I18n.t('translate_Customize')}
              </Text>
            </View>
          </TouchableOpacity> */}
        {/* )} */}
        {/* {/* {Box === true && ( */}
          <View>
            {/* <TouchableOpacity
              onPress={() => {
                _SendMenuHome();
                setTimeout(() => {
                  setBox(false);
                }, 200);
              }}>
              <View style={styles.ViewBottom1}>
                <Icon
                  name="checkcircle"
                  size={17}
                  color={'#3b4254'}
                  style={styles.IconBottom}
                />
                <Text style={styles.TextBottom}>
                  {I18n.t('translate_Accept')}
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                setTimeout(() => {
                  _SendMenuHome(1);

                  setBox(false);
                }, 200)
              }>
              <View style={styles.ViewBottom}>
                <Text style={styles.TextBottom}>
                  {'    '}
                  {I18n.t('translate_Default')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        {/* )} */}
      </ParallaxScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getStatus1: state.dataReducer.getStatus,
  getUser: state.userReducer.getUser,
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getImg: state.authReducer.getImg,
  PopupCounter: state.globalReducer.PopupCounter,
  HeaderBack: state.globalReducer.HeaderBack,
  getHome: state.dataReducer.getHome,
  getScore: state.dataReducer.getScore,
  getNotification: state.authReducer.getNotification,
});

export default connect(
  mapStateToProps,
  null,
)(HomeScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  lockItem: {
    borderRadius: 4,
    backgroundColor: '#aaa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: '#2d6dc4',
    alignSelf: 'center',
    fontFamily: 'Mitr-Medium',
    textAlign: 'center',
    // borderColor: 'red',
  },
  cover: {
    backgroundColor: '#666',
    padding: 4,
  },
  imageBGDrag: {
    height: '100%',
    width: '100%',
  },
  ViewSumImageText: {
    alignItems: 'center',
    height: '100%',
  },
  marginTop24: {
    marginTop: 24,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginTopD4: {
    marginTop: -4,
  },
  ViewText: {
    bottom: 18,
    position: 'absolute',
    // paddingHorizontal: 8,
  },
  colorFFFFFF: {
    color: '#FFFFFF',
    fontFamily: 'Pridi-Regular',
  },
  colorFFFFFF2: {
    color: '#FFFFFF',
    fontFamily: 'Mitr-Medium',
  },
  color2d6dc4: {
    color: '#2d6dc4',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,

    // elevation: 1,
  },
  color40536d: {
    color: '#40536d',
  },
  TabScan: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  TabScanBorderRight: {
    borderRightColor: '#2d6dc450',
    borderRightWidth: 2,
  },
  IconScan: {
    width: 23,
    height: 18,
  },
  IconQR: {
    width: 20,
    height: 20,
  },
  ViewTabTop: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#ffffff',
    marginBottom: 0,
  },
  BGeff0f6: {
    backgroundColor: '#eff0f6',
  },
  TextQR: {
    color: '#2d6dc4',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Mitr-Regular',
  },
  ViewBGHeader: {
    width: '80%',
  },
  BGProfileLogo: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
  },
  marginTop14: {
    marginTop: 14,
  },
  ViewAvatraHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  HeaderTest: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
  },
  header_title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 9,
    flex: 1,
  },
  item_icon_swipe: {
    // width: childrenHeight - 10,
    // height: childrenHeight - 10,
    // backgroundColor: '#fff',
    // borderRadius: (childrenHeight - 10) / 2,
    // marginLeft: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 0.2,
  },
  item_icon_arrrow: {
    // width: childrenHeight - 10,
    // height: childrenHeight - 10,
    // backgroundColor: '#fff',
    // borderRadius: (childrenHeight - 10) / 2,
    // marginLeft: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 10,
    flex: 0.1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  item_icon: {
    width: childrenHeight - 10,
    height: childrenHeight - 20,
    resizeMode: 'contain',
  },
  item_text: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 1,
    marginRight: 2,
    textAlign: 'right',
    // flex: 1,
    fontFamily: 'Mitr-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  bannerTest: {
    height: 100,
    resizeMode: 'cover',
    width: '100%',
  },
  fontDetailProfile2: {
    fontSize: 16,
    marginTop: -3,
    fontFamily: 'Pridi-Regular',
  },
  fontDetailProfile3: {
    fontSize: 16,
    marginTop: -3,
    fontFamily: 'Pridi-Regular',
  },
  fontCompayProfile: {
    fontSize: 16,
    marginTop: -1,
    fontFamily: 'Pridi-Regular',
  },
  font27: {
    fontSize: 22,
    fontFamily: 'Pridi-Regular',
  },
  marginL17: {
    marginLeft: 10,
  },
  ViewBottom: {
    backgroundColor: '#f4f8fb',
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ViewBottom1: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextBottom: {
    fontSize: 13,
    color: '#3b4254',
    marginTop: 5,
    fontFamily: 'Mitr-Regular',
  },
  IconBottom: {
    marginTop: 7,
    marginRight: 5,
  },
  parallaxView: {
    // overflow: 'hidden',
    marginTop: -90,
    // top:-90,
    flex: 1,
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.46,
    // shadowRadius: 11.14,

    // elevation: 17,
  },
  flex1: {
    flex: 1,
  },
});
