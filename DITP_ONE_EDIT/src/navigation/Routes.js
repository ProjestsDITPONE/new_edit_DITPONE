import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Styles from '../page/Login/Styles';

import {ViewScale} from '../config/ViewScale';

import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CheckConnection from '../service/CheckConnetion';

import {createDrawerNavigator} from '@react-navigation/drawer';
//importpage DITPCARE
import HomeCare from '../page/HomeCare/HomeScreen';
import AnalyzeAi from '../page/AnalyzeaiScreen/AnalyzeAi';
import Term from '../page/Term/Term';
import Typeappel from '../page/Typeappeal/Typeappel';
import Typeappel2 from '../page/Typeappeal/Typeappel2';
import Typeappel3 from '../page/Typeappeal/Typeappel3';
import Typeappel4 from '../page/Typeappeal/Typeappel4';
import I18n from '../utils/I18n';
//page main
import LoginScreen from '../page/Login/LoginScreen';
import LoginOfficer from '../page/Login/LoginScreenofficerScreen';
import HomeScreen from '../page/Home/HomeScreen';
import CartScreen from '../page/Cart/CartScreen';
import TradeActivitiesScreen from '../page/TradeActivities/TradeActivitiesScreen';
import StatisticsScreen from '../page/Statistics/StatisticsScreen';
import ViewStaticsScren from '../page/Statistics/ViewStaticsScren';

import AtivitysScreen from '../page/ProfileActivity/Activities';

//ViewTrade
import ViewTrade from '../page/TradeActivities/ViewTrade';
import SearchData from '../page/TradeActivities/SearchData';
import SearchAdvancedDevelop from '../page/Develop/SearchAdvancedDevelop';
// import TradeActivitiesRegister from ''
import TradeActivitiesRegister from '../page/TradeActivities/TradeRegister/TradeActivitiesRegister';
//Appeal
import AppealHome from '../page/Appeal/AppealHome';
import AppealView from '../page/Appeal/AppealView';
import AppealViewAll from '../page/Appeal/AppealViewAll';
//ยืนยันตัวตน
import Identity from '../page/IdentityScreen/IdentityScreen';

//LiveChat
import ChatScreen from '../page/ChatScreen/ChatScreen';

//รายการแชท
import ListChatScreen from '../page/ListChatScreen/ListChatScreen';

//ChatHistory
import ChatScreenHistory from '../page/ChatScreenHistory/ChatScreenHistory';

//สถานะการณ์แนวโน้มตลาด
import MarketContry from '../page/MarketContry/MarketContry';
import SearchMenu from '../page/MarketContry/SearchMenu';

import ViewMarketCountry from '../page/MarketContry/ViewMarketCountry';

//ตราสัญลักษณ์กรม
import Brand from '../page/Brand/Brand';

//ตะกร้าของฉัน
import Mybasket from '../page/Mybasket/Mybasket';
import Addperson from '../page/Mybasket/Addperson';
import AddJuristic from '../page/Mybasket/AddJuristic';

//โปรไฟล์ผู้ซื้องฉัน
import ProfileContect from '../page/ProfileContect/ProfileContect';

//โปรไฟล์กิจกรรมที่เข้าร่วม
import ProfileActivity from '../page/ProfileActivity/ProfileActivity';

//ติดต่อกรม
import Contectdepartment from '../page/Contectdepartment/Contect';

//QRcode
import ViewAct from '../page/Qrcode/QRscreen';
import QRcode from '../page/Qrcode/Qrcode';
import Scanqr from '../page/Qrcode/Scanqr';

//Setting
import Setting from '../page/Setting/Setting';
import Unsubscribe from '../page/Setting/Unsubscribe';
import ChangeScreen from '../page/Setting/ChangeScreen';
import Policy from '../page/Setting/Policy';
import RegisterPolicy from '../page/Setting/Registerpolicy';
import Pincodepassword from '../page/Pincode/Pincode';
import ChangePincodepassword from '../page/Pincode/ChangePincode';

//กิจกรรมสแกน
import Activityscan from '../page/Activityscan/Activityscan';
import Scanact from '../page/Activityscan/Scanact';
import Viewact from '../page/Activityscan/Viewact';
import Accept from '../page/Activityscan/Accept';
import Viewpeople from '../page/Activityscan/Viewpeople';
import ProfileScan from '../page/Activityscan/ProfileScan';
import DetailScan from '../page/Activityscan/DetailScan';

//ค้นหา  exporter
import Seachexporter from '../page/Seachexporter/Seachexporter';
import Seachtabex from '../page/Seachexporter/Seachtabex';
import Viewexport from '../page/Seachexporter/Viewexport';

//ประวัติบุคลากร
import Infopersonal from '../page/Infopersonal/Infopersonal';

// พัฒนาศักยภาพ
import DevelopScreen from '../page/Develop/DevelopScreen';
import ViewDevelop from '../page/Develop/ViewDevelop';
// import DevlopRegister from '../page/Develop/DevlopRegister';
import DevlopRegister from '../page/Develop/DevlopRegister';

//แบบสอบถาม
import Questionnaire from '../page/Questionnaire/QuestionnaireScreen';
import Questionnaireseminar from '../page/EvaluateQuestionnaire/Questionnaireseminar';

//แจ้งเตือน
import ListNotiScreen from '../page/ListNotiScreen/ListNotiScreen';

//ขั้นตอนการส่งออก
import OsecScreen from '../page/OSECScreen/Osec';
import OsecView from '../page/OSECScreen/OsecView';

//Smes
import SmesActivityshowProduct from '../page/ProfileActivity/SmesActivityshowProduct';
import SemsBusiness from '../page/ProfileActivity/SmesActivityShowBusiness';
import SMeS from '../page/ProfileActivity/SmeActivity';

//แชทผู้ประกอบการ
import UserChatHome from '../page/ChatUserHome/UserChatHome';
import UserChatRoom from '../page/ChatUserHome/UserChatRoom';

import SettingNoti from '../page/Setting/SettingNoti';

import {navigationRef} from '../RootNavigation';

import SafeArea from 'react-native-safe-area';
import {useIsFocused} from '@react-navigation/native';
import {getBasket} from '../actions/data.actions';
import {ForeUpdate} from '../actions/auth.actions';
import {Overlay} from 'react-native-elements';
// import firebase from 'react-native-firebase';
import analytics from '@react-native-firebase/analytics';

import SlideDownPanel from '../lib_edit/react-native-slide-down-panel';
import {Keyboard} from 'react-native';

const {height, width} = Dimensions.get('window');
//ipad
var aspectRatio = 1;
if (height / width > 1.6) {
  //iphone
  aspectRatio = 0;
}

const Routes = ({
  dispatch,
  isLoggedIn,
  navigation,
  getUser,
  authData,
  getHome,
  getImg,
  getUser1,
}) => {
  const [bottom, setbottom] = useState(1);
  const [CheckStaus, setCheckStaus] = useState(false);
  const [Url, setUrl] = useState('');
  const [text, settext] = useState('');

  const [PassPINCode, setPassPINCode] = useState('');

  useEffect(() => {
    try {
      retrieveUserSession();
    } catch (error) {}
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      if (result.safeAreaInsets.bottom != 0) {
        setbottom(6);
      }
    });

    _ForceUpdate();
  }, []);

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        //
        setPassPINCode(session.PIN);
      }
    } catch (error) {
      // There was an error on the native side
    }
  }

  const _ForceUpdate = async values => {
    try {
      const ForceUp = await dispatch(
        ForeUpdate({
          res: {type: Platform.OS === 'android' ? 1 : 2, build: 20220127},
        }),
      );

      if (ForceUp.res_code === '01') {
        setCheckStaus(true);
        setUrl(
          Platform.OS === 'android' ? ForceUp.url_android : ForceUp.url_ios,
        );
        settext(
          I18n.locale === 'th' ? ForceUp.res_text_th : ForceUp.res_text_en,
        );
      } else {
        setCheckStaus(false);
      }
    } catch (error) {}
  };

  const _getBasket = async values => {
    try {
      const payload = '/' + 1;

      const Token = authData.token;

      const response = await dispatch(getBasket({type: payload, token: Token}));
    } catch (error) {}
  };

  const _CloseHearder = () => {
    SlideDownPanel.hideHeader();
  };

  const DitpStack = createStackNavigator();
  function LoginStackScreen() {
    return (
      <DitpStack.Navigator initialRouteName="LoginScreen" headerMode="none">
        <DitpStack.Screen name="LoginScreen" component={LoginScreen} />
        <DitpStack.Screen name="LoginOfficer" component={LoginOfficer} />
      </DitpStack.Navigator>
    );
  }

  function LoginPincodeStackScreen() {
    return (
      <DitpStack.Navigator initialRouteName="Pincodepassword" headerMode="none">
        <DitpStack.Screen name="Pincodepassword" component={Pincodepassword} />
        <DitpStack.Screen
          name="ChangePincodepassword"
          component={ChangePincodepassword}
        />
        <DitpStack.Screen name="ChatScreen" component={ChatScreen} />
        <DitpStack.Screen
          name="ChatScreenHistory"
          component={ChatScreenHistory}
        />
        <DitpStack.Screen name="DevlopRegister" component={DevlopRegister} />
        <DitpStack.Screen name="UserChatHome" component={UserChatHome} />
        <DitpStack.Screen name="UserChatRoom" component={UserChatRoom} />
        <DitpStack.Screen name="Qrcode" component={AllQr} />
        <DitpStack.Screen name="QrcodeScan" component={AllQrScan} />

        <DitpStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <DitpStack.Screen name="Setting" component={Setting} />
        <DitpStack.Screen name="ChangeScreen" component={ChangeScreen} />
        <DitpStack.Screen name="Questionnaire" component={Questionnaire} />
        <DitpStack.Screen
          name="Questionnaireseminar"
          component={Questionnaireseminar}
        />
        <DitpStack.Screen name="ViewAdd" component={ViewAct} />

        <DitpStack.Screen name="Unsubscribe" component={Unsubscribe} />
        <DitpStack.Screen name="Policy" component={Policy} />

        <DitpStack.Screen name="RegisterPolicy" component={RegisterPolicy} />
        <DitpStack.Screen name="ProfileContect" component={ProfileContect} />
        <DitpStack.Screen name="Brand" component={Brand} />
        <DitpStack.Screen name="Mybasket" component={Mybasket} />
        {/* <HomeStack.Screen name="Mybasket" component={Mybasket} /> */}
        <DitpStack.Screen
          initialParams={{abc: true}}
          name="ViewStaticsScren"
          component={ViewStaticsScren}
        />
        <DitpStack.Screen
          initialParams={{abc: true}}
          name="ViewMarketCountry"
          component={ViewMarketCountry}
        />
        <DitpStack.Screen name="Scanact" component={Scanact} />
        <DitpStack.Screen name="Viewact" component={Viewact} />
        <DitpStack.Screen name="Accept" component={Accept} />
        <DitpStack.Screen name="SMeS" component={SMeS} />
        <DitpStack.Screen
          name="SmesActivityshowProduct"
          component={SmesActivityshowProduct}
        />
        <DitpStack.Screen name="SemsBusiness" component={SemsBusiness} />

        <DitpStack.Screen name="Viewpeople" component={Viewpeople} />

        <DitpStack.Screen name="SearchData" component={SearchData} />
        <DitpStack.Screen
          name="SearchAdvancedDevelop"
          component={SearchAdvancedDevelop}
        />

        <DitpStack.Screen
          name="TradeActivitiesRegister"
          component={TradeActivitiesRegister}
        />
        <DitpStack.Screen name="SettingNoti" component={SettingNoti} />

        <DitpStack.Screen name="TabSearch" component={Drawer} />
        <DitpStack.Screen name="SearchMenu" component={SearchMenu} />
        <DitpStack.Screen name="Addperson" component={Addperson} />
        <DitpStack.Screen name="AddJuristic" component={AddJuristic} />
        <DitpStack.Screen name="ListNotiScreen" component={ListNotiScreen} />

        <DitpStack.Screen name="Typeappel" component={Typeappel} />

        <DitpStack.Screen name="Typeappel2" component={Typeappel2} />
        <DitpStack.Screen name="Typeappel3" component={Typeappel3} />
        <DitpStack.Screen name="Typeappel4" component={Typeappel4} />

        <DitpStack.Screen name="AppealHome" component={AppealHome} />

        <DitpStack.Screen name="AppealView" component={AppealView} />

        <DitpStack.Screen name="Term" component={Term} />
        <DitpStack.Screen
          name="Seachexporter"
          initialParams={{abc: true}}
          component={Drawer2}
        />
        <DitpStack.Screen name="Infopersonal" component={Infopersonal} />
        <DitpStack.Screen name="Viewexport" component={Viewexport} />

        <DitpStack.Screen
          initialParams={{abc: true}}
          name="TradeActivities"
          component={TradeActivitiesScreen}
        />
      </DitpStack.Navigator>
    );
  }

  function DitpStackScreen() {
    return (
      <DitpStack.Navigator initialRouteName="HomeStackScreen" headerMode="none">
        <DitpStack.Screen name="HomeStackScreen" component={HomeStackScreen} />

        <DitpStack.Screen name="ChatScreen" component={ChatScreen} />
        <DitpStack.Screen name="Term" component={Term} />
        <DitpStack.Screen name="Typeappel" component={Typeappel} />
        <DitpStack.Screen
          name="ChatScreenHistory"
          component={ChatScreenHistory}
        />
        <DitpStack.Screen name="Typeappel2" component={Typeappel2} />
        <DitpStack.Screen name="Typeappel3" component={Typeappel3} />
        <DitpStack.Screen name="Typeappel4" component={Typeappel4} />
        <DitpStack.Screen name="AppealHome" component={AppealHome} />
        <DitpStack.Screen name="AppealView" component={AppealView} />
        <DitpStack.Screen name="TabSearch" component={Drawer} />
        <DitpStack.Screen name="SearchMenu" component={SearchMenu} />
        <DitpStack.Screen name="Brand" component={Brand} />
        <DitpStack.Screen name="ProfileContect" component={ProfileContect} />
        <DitpStack.Screen name="ProfileActivity" component={ProfileActivity} />
        <DitpStack.Screen
          name="Contectdepartment"
          component={Contectdepartment}
        />
        <DitpStack.Screen name="Qrcode" component={AllQr} />
        <DitpStack.Screen name="QrcodeScan" component={AllQrScan} />
        <DitpStack.Screen name="Setting" component={Setting} />
        <DitpStack.Screen name="Pincodepassword" component={Pincodepassword} />
        <DitpStack.Screen
          name="ChangePincodepassword"
          component={ChangePincodepassword}
        />
        <DitpStack.Screen name="Unsubscribe" component={Unsubscribe} />
        <DitpStack.Screen name="Policy" component={Policy} />
        <DitpStack.Screen name="RegisterPolicy" component={RegisterPolicy} />
        <DitpStack.Screen name="UserChatHome" component={UserChatHome} />
        {/* ใส่ตรงนี้ tab หาย */}
        <DitpStack.Screen name="DevlopRegister" component={DevlopRegister} />
        <DitpStack.Screen name="UserChatRoom" component={UserChatRoom} />
        <DitpStack.Screen
          name="Activityscan"
          initialParams={{abc: true}}
          component={Activityscan}
        />
        <DitpStack.Screen name="ProfileScan1" component={Profileuser1} />
        <DitpStack.Screen name="Scanact" component={Scanact} />
        <DitpStack.Screen name="Viewact" component={Viewact} />
        <DitpStack.Screen name="Accept" component={Accept} />
        <DitpStack.Screen name="SMeS" component={SMeS} />
        <DitpStack.Screen
          name="SmesActivityshowProduct"
          component={SmesActivityshowProduct}
        />
        <DitpStack.Screen name="SemsBusiness" component={SemsBusiness} />

        <DitpStack.Screen name="Viewpeople" component={Viewpeople} />
        <DitpStack.Screen
          name="Seachexporter"
          initialParams={{abc: true}}
          component={Drawer2}
        />
        <DitpStack.Screen name="Viewexport" component={Viewexport} />

        <DitpStack.Screen name="Infopersonal" component={Infopersonal} />
        <DitpStack.Screen
          initialParams={{abc: true}}
          name="TradeActivities"
          component={TradeActivitiesScreen}
        />

        {/* <DitpStack.Screen
          initialParams={{abc: true}}
          name="Addperson"
          component={Addperson}
        />
         <DitpStack.Screen
          initialParams={{abc: true}}
          name="AddJuristic"
          component={AddJuristic}
        /> */}

        <DitpStack.Screen
          initialParams={{abc: true}}
          name="StatisticsScreen"
          component={StatisticsScreen}
        />
        <DitpStack.Screen
          initialParams={{abc: true}}
          name="AtivitysScreen"
          component={AtivitysScreen}
        />

        <DitpStack.Screen
          initialParams={{abc: true}}
          name="ViewStaticsScren"
          component={ViewStaticsScren}
        />
        <DitpStack.Screen name="ChangeScreen" component={ChangeScreen} />
        <DitpStack.Screen name="Questionnaire" component={Questionnaire} />
        <DitpStack.Screen
          name="Questionnaireseminar"
          component={Questionnaireseminar}
        />

        <DitpStack.Screen name="ViewAdd" component={ViewAct} />
        <DitpStack.Screen name="SearchData" component={SearchData} />
        <DitpStack.Screen
          name="SearchAdvancedDevelop"
          component={SearchAdvancedDevelop}
        />
        <DitpStack.Screen
          name="TradeActivitiesRegister"
          component={TradeActivitiesRegister}
        />
        <DitpStack.Screen name="SettingNoti" component={SettingNoti} />
        {/* <DitpStack.Screen name="TradeActivitiesRegister" component={TradeActivitiesRegister} />  */}
      </DitpStack.Navigator>
    );
  }

  const AllStack = createStackNavigator();
  function Modal() {
    return (
      <AllStack.Navigator headerMode="none" mode="modal">
        <AllStack.Screen name="MarketContry" component={MarketContry} />
        <AllStack.Screen name="SearchMenu" component={SearchMenu} />
        <AllStack.Screen
          name="ViewMarketCountry"
          component={ViewMarketCountry}
        />
        <AllStack.Screen name="TabSearch" component={Drawer} />
      </AllStack.Navigator>
    );
  }
  const AllQR = createStackNavigator();

  function AllQr() {
    return (
      <AllQR.Navigator headerMode="screen" mode="card">
        <AllQR.Screen
          name="QRscreen"
          component={Qrcode}
          options={{
            headerTitle: 'QR Code',
            headerTitleStyle: {
              // fontWeight: 'bold',
              fontSize: 25,
              fontFamily: 'Kittithada Bold 75',
              fontWeight: 'normal',
            },

            headerBackImage: () => (
              <View style={{padding: 20, paddingLeft: 10}}>
                <Image
                  style={{width: 10, height: 15}}
                  source={require('../image/arrow-left-qr.png')}
                />
              </View>
            ),
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerLeftContainerStyle: {left: 12},
          }}
        />
        {/* <AllQR.Screen name="Qrcode" component={ViewAct} /> */}
      </AllQR.Navigator>
    );
  }
  function AllQrScan() {
    return (
      <AllQR.Navigator headerMode="screen" mode="card">
        <AllQR.Screen
          name="QRscreen"
          component={ScanqrPage}
          options={{
            headerTitle: 'QR Code',
            headerTitleStyle: {
              // fontWeight: 'bold',
              fontSize: 25,
              fontFamily: 'Kittithada Bold 75',
              fontWeight: 'normal',
            },

            headerBackImage: () => (
              <View style={{padding: 20, paddingLeft: 10}}>
                <Image
                  style={{width: 10, height: 15}}
                  source={require('../image/arrow-left-qr.png')}
                />
              </View>
            ),
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerLeftContainerStyle: {left: 12},
          }}
        />
        {/* <AllQR.Screen name="Qrcode" component={ViewAct} /> */}
      </AllQR.Navigator>
    );
  }

  const Profileuser = createStackNavigator();
  function Profileuser1() {
    return (
      <Profileuser.Navigator headerMode="screen" mode="card">
        <Profileuser.Screen
          name="profile1"
          component={profile1}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerBackImage: () => (
              <View style={{padding: 10}}>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../image/close.png')}
                />
              </View>
            ),
            headerBackTitleVisible: false,
            headerLeftContainerStyle: {left: 12},
          }}
        />
        {/* <AllQR.Screen name="Qrcode" component={ViewAct} /> */}
      </Profileuser.Navigator>
    );
  }

  const Profile = createMaterialTopTabNavigator();
  function profile1() {
    return (
      <Profile.Navigator
        tabBarOptions={{
          tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            top: 2,
          },
          labelStyle: {fontSize: 25},
          activeTintColor: '#2d6dc4',
          inactiveTintColor: '#bfced7',
          showIcon: true,
          showLabel: true,

          indicatorContainerStyle: {flexDirection: 'row'},
        }}
        tabBarPosition="top">
        <Profile.Screen
          name="ProfileScan"
          component={ProfileScan}
          options={{
            tabBarLabel: 'ข้อมูลการลงทะเบียน',
          }}
        />
        <Profile.Screen
          name="DetailScan"
          component={DetailScan}
          options={{
            tabBarLabel: 'ประวัติสมาชิก',
          }}
        />
      </Profile.Navigator>
    );
  }

  // Drawer Tab
  const DrawerStack = createDrawerNavigator();
  function Drawer() {
    return (
      <DrawerStack.Navigator
        keyboardDismissMode={'none'}
        drawerStyle={{
          width: 321,
        }}
        overlayColor="#2d6dc490"
        drawerPosition="right"
        headerMode="none"
        drawerContent={props => {
          Keyboard.dismiss();

          props.descriptors;
          return <SearchMenu {...props} />;
        }}>
        <DrawerStack.Screen
          initialParams={{dateSech: null}}
          name="MarketContry"
          component={MarketContry}
        />
      </DrawerStack.Navigator>
    );
  }

  function Drawer2({route, navigation}) {
    return (
      <DrawerStack.Navigator
        drawerStyle={{
          width: 321,
        }}
        overlayColor="#2d6dc490"
        drawerPosition="right"
        headerMode="none"
        drawerContent={props => <Seachtabex {...props} />}>
        <DrawerStack.Screen
          name="Seachexporter"
          initialParams={{abc: route.params}}
          component={Seachexporter}
        />
      </DrawerStack.Navigator>
    );
  }

  const TopScan = createMaterialTopTabNavigator();
  function Qrcode() {
    return (
      <TopScan.Navigator
        initialRouteName="QRcode"
        tabBarOptions={{
          tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            top: 2,
          },
          labelStyle: {fontSize: 25},
          activeTintColor: '#2d6dc4',
          inactiveTintColor: '#bfced7',
          showIcon: true,
          showLabel: true,

          indicatorContainerStyle: {flexDirection: 'row'},
        }}
        tabBarPosition="top">
        <TopScan.Screen
          name="QRcode"
          component={QRcode}
          options={{
            // tabBarLabel: 'สแกน QR',
            tabBarLabel: ({focused}) => (
              <Text
                style={{fontSize: 23, color: focused ? '#2d6dc4' : '#bfced7'}}>
                {' '}
                {I18n.t('translate_Scan')}
              </Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../image/scanA.png')
                    : require('../image/scanB.png')
                }
              />
            ),
          }}
        />
        <TopScan.Screen
          name="Scanqr"
          component={Scanqr}
          options={{
            // tabBarLabel: 'QR ของฉัน',
            tabBarLabel: ({focused}) => (
              <Text
                style={{fontSize: 23, color: focused ? '#2d6dc4' : '#bfced7'}}>
                {' '}
                {I18n.t('translate_MyQrcode')}
              </Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../image/QrcodeA.png')
                    : require('../image/QrcodeB.png')
                }
              />
            ),
          }}
        />
      </TopScan.Navigator>
    );
  }

  function ScanqrPage() {
    return (
      <TopScan.Navigator
        initialRouteName="Scanqr"
        tabBarOptions={{
          tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            top: 2,
          },
          labelStyle: {fontSize: 25},
          activeTintColor: '#2d6dc4',
          inactiveTintColor: '#bfced7',
          showIcon: true,
          showLabel: true,

          indicatorContainerStyle: {flexDirection: 'row'},
        }}
        tabBarPosition="top">
        <TopScan.Screen
          name="QRcode"
          component={QRcode}
          options={{
            // tabBarLabel: 'สแกน QR',
            tabBarLabel: ({focused}) => (
              <Text
                style={{fontSize: 23, color: focused ? '#2d6dc4' : '#bfced7'}}>
                {' '}
                {I18n.t('translate_Scan')}
              </Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../image/scanA.png')
                    : require('../image/scanB.png')
                }
              />
            ),
          }}
        />
        <TopScan.Screen
          name="Scanqr"
          component={Scanqr}
          options={{
            // tabBarLabel: 'QR ของฉัน',
            tabBarLabel: ({focused}) => (
              <Text
                style={{fontSize: 23, color: focused ? '#2d6dc4' : '#bfced7'}}>
                {' '}
                {I18n.t('translate_MyQrcode')}
              </Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../image/QrcodeA.png')
                    : require('../image/QrcodeB.png')
                }
              />
            ),
          }}
        />
      </TopScan.Navigator>
    );
  }

  /////////////////
  /*  Menu Tab   */
  /////////////////
  const HomeStack = createStackNavigator();
  function Menu1StackScreen() {
    return (
      <HomeStack.Navigator initialRouteName="Home" headerMode="none">
        {/* <HomeStack.Screen name="Main" component={Main} /> */}
        <HomeStack.Screen
          name="Home"
          initialParams={{checkScreenhome: true}}
          component={HomeScreen}
        />
        <HomeStack.Screen
          initialParams={{index: 0}}
          name="ProfileActivity"
          component={ProfileActivity}
        />
        <HomeStack.Screen
          name="ViewMarketCountry"
          component={ViewMarketCountry}
        />
        <HomeStack.Screen name="MarketContry" component={Drawer} />
        <HomeStack.Screen name="HomeCare" component={HomeCare} />
        <HomeStack.Screen name="AnalyzeAi" component={AnalyzeAi} />
        <HomeStack.Screen name="Term" component={Term} />
        <HomeStack.Screen name="Infopersonal" component={Infopersonal} />
        <HomeStack.Screen name="Typeappel" component={Typeappel} />

        <HomeStack.Screen name="Typeappel3" component={Typeappel3} />
        <HomeStack.Screen name="Typeappel4" component={Typeappel4} />
        <HomeStack.Screen
          name="TradeActivities"
          component={TradeActivitiesScreen}
        />
        <HomeStack.Screen name="Addperson" component={Addperson} />
        <HomeStack.Screen name="AddJuristic" component={AddJuristic} />

        <DitpStack.Screen name="SMeS" component={SMeS} />
        <HomeStack.Screen name="SearchData" component={SearchData} />
        <HomeStack.Screen
          name="SearchAdvancedDevelop"
          component={SearchAdvancedDevelop}
        />

        <HomeStack.Screen
          name="TradeActivitiesRegister"
          component={TradeActivitiesRegister}
        />
        <HomeStack.Screen
          name="SmesActivityshowProduct"
          component={SmesActivityshowProduct}
        />

        <HomeStack.Screen name="SemsBusiness" component={SemsBusiness} />

        <HomeStack.Screen
          initialParams={{index: 0}}
          name="Contectdepartment"
          component={Contectdepartment}
        />
        <HomeStack.Screen name="ListChatScreen" component={ListChatScreen} />
        <HomeStack.Screen name="AppealViewAll" component={AppealViewAll} />
        <HomeStack.Screen name="ViewTrade" component={ViewTrade} />
        {/* <HomeStack.Screen name="TradeActivitiesRegister" component={TradeActivitiesRegister} />  */}
        <HomeStack.Screen name="DevelopScreen" component={DevelopScreen} />
        <HomeStack.Screen name="ViewDevelop" component={ViewDevelop} />
        {/* <HomeStack.Screen name="DevlopRegister" component={DevlopRegister} /> */}
        <HomeStack.Screen
          name="Questionnaireseminar"
          component={Questionnaireseminar}
        />
        <HomeStack.Screen name="AppealHome" component={AppealHome} />
        <HomeStack.Screen name="AppealView" component={AppealView} />
        <HomeStack.Screen name="Identity" component={Identity} />
        <HomeStack.Screen
          // initialParams={{abc: true}}
          name="StatisticsScreen"
          component={StatisticsScreen}
        />
        <HomeStack.Screen
          // initialParams={{abc: true}}
          name="AtivitysScreen"
          component={AtivitysScreen}
        />

        <HomeStack.Screen
          // initialParams={{abc: true}}
          name="ViewStaticsScren"
          component={ViewStaticsScren}
        />
        <HomeStack.Screen name="ListNotiScreen" component={ListNotiScreen} />
        <HomeStack.Screen name="Activityscan" component={Activityscan} />
        <HomeStack.Screen name="Seachexporter" component={Drawer2} />
        <HomeStack.Screen name="OsecScreen" component={OsecScreen} />
        <HomeStack.Screen name="OsecView" component={OsecView} />
      </HomeStack.Navigator>
    );
  }
  function Menu2StackScreen() {
    return (
      <HomeStack.Navigator initialRouteName="Mybasket" headerMode="none">
        <HomeStack.Screen name="Cart" component={CartScreen} />
        <HomeStack.Screen name="Mybasket" component={Mybasket} />
        {/* <HomeStack.Screen name="Addperson" component={Addperson} /> 
        <HomeStack.Screen name="AddJuristic" component={AddJuristic} />  */}
        <HomeStack.Screen
          initialParams={{index: 0}}
          name="ProfileActivity"
          component={ProfileActivity}
        />
      </HomeStack.Navigator>
    );
  }
  function Menu3StackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="TradeActivities"
        headerMode="none">
        <HomeStack.Screen
          initialParams={{index: 0}}
          name="ProfileActivity"
          component={ProfileActivity}
        />
        <HomeStack.Screen
          initialParams={{abc: true}}
          name="TradeActivities"
          component={TradeActivitiesScreen}
        />
        <HomeStack.Screen
          initialParams={{abc: true}}
          name="Addperson"
          component={Addperson}
        />
        <HomeStack.Screen
          initialParams={{abc: true}}
          name="AddJuristic"
          component={AddJuristic}
        />

        <HomeStack.Screen name="ViewTrade" component={ViewTrade} />
        <HomeStack.Screen name="DevelopScreen" component={DevelopScreen} />
        {/* <HomeStack.Screen name="DevlopRegister" component={DevlopRegister} /> */}
        <HomeStack.Screen name="SearchData" component={SearchData} />
        <HomeStack.Screen
          name="TradeActivitiesRegister"
          component={TradeActivitiesRegister}
        />
        {/* <HomeStack.Screen name="TradeActivitiesRegister" component={TradeActivitiesRegister} /> */}
        {/* <HomeStack.Screen name="SmesActivityshowProduct" component={SmesActivityshowProduct} /> */}
      </HomeStack.Navigator>
    );
  }
  function Menu4StackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Statistics"
        headerMode="none">
        <HomeStack.Screen
          initialParams={{index: 0}}
          name="ProfileActivity"
          component={ProfileActivity}
        />
        <HomeStack.Screen
          name="Statistics"
          component={StatisticsScreen}
          initialParams={{abc: true}}
        />
      </HomeStack.Navigator>
    );
  }
  function Menu5StackScreen() {
    return (
      <HomeStack.Navigator initialRouteName="Setting" headerMode="none">
        <HomeStack.Screen
          initialParams={{index: 0}}
          name="ProfileActivity"
          component={ProfileActivity}
        />
        <HomeStack.Screen
          name="AtivitysScreen"
          component={AtivitysScreen}
          initialParams={{abc: true}}
        />
        <HomeStack.Screen name="Setting" component={Setting} />
        <DitpStack.Screen name="SettingNoti" component={SettingNoti} />
        {/* <HomeStack.Screen name="SmesActivityshowProduct" component={SmesActivityshowProduct} /> */}
      </HomeStack.Navigator>
    );
  }
  function Menu6StackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Activityscan"
        headerMode="none">
        <HomeStack.Screen
          name="Activityscan"
          initialParams={{abc: true}}
          component={Activityscan}
        />
      </HomeStack.Navigator>
    );
  }

  function Menu7StackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Seachexporter"
        headerMode="none">
        <HomeStack.Screen
          name="Seachexporter"
          initialParams={{abc: true}}
          component={Drawer2}
        />
      </HomeStack.Navigator>
    );
  }
  /////////////////
  /*   Sum Tab   */
  /////////////////
  const Tab = createBottomTabNavigator();
  function HomeStackScreen(navigation, route) {
    const isFocused = useIsFocused();
    return (
      <Tab.Navigator
        initialRouteName="Home1"
        backBehavior="none"
        tabBarOptions={{
          showLabel: true,

          activeTintColor: '#2d6dc4',
          inactiveTintColor: '#96b3cb',
          style: {
            height: '9%',
            paddingTop: Platform.OS == 'android' ? 10 : 8,
            paddingBottom: Platform.OS == 'android' ? 5 : bottom,
            shadowColor: '#ccc',
            shadowOffset: {height: 10, width: 0},
            elevation: 20,
            borderTopWidth: 2,
            borderTopColor: '#00000009',
            bottom,
            paddingLeft: aspectRatio == 1 ? '5%' : 0,
            paddingRight: aspectRatio == 1 ? '5%' : 0,
          },

          labelStyle: {fontSize: 12},
        }}>
        <Tab.Screen
          name="Home1"
          component={Menu1StackScreen}
          options={{
            tabBarLabel: ({tintColor, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  bottom: 10,
                  marginTop: Platform.isPad && 50,
                }}>
                {navigationRef.current && (
                  <View>
                    {navigationRef.current.getCurrentRoute().name ===
                    'ListNotiScreen' ? (
                      <Text
                        style={{
                          fontSize:ViewScale(12),
                          color: '#96b3cb',
                          fontFamily: 'Mitr-Medium',
                        }}>
                        {I18n.t('Home')}
                      </Text>
                    ) : (
                      <Text
                        style={
                          focused
                            ? {
                              fontSize:ViewScale(12),
                                color: '#2d6dc4',
                                fontFamily: 'Mitr-Medium',
                              }
                            : {
                              fontSize:ViewScale(12),
                                color: '#96b3cb',
                                fontFamily: 'Mitr-Medium',
                              }
                        }>
                        {I18n.t('Home')}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <View>
                {navigationRef.current && (
                  <View>
                    {navigationRef.current.getCurrentRoute().name ===
                    'ListNotiScreen' ? (
                      <Image
                        style={{width: 21, height: 21, bottom: 6}}
                        source={require('../image/homehoven.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          width:ViewScale(22),
                          height:ViewScale(22),
                          bottom: Platform.isPad?15:4,
                          marginLeft:
                            I18n.locale === 'th'
                              ? Platform.isPad && 40
                              : Platform.isPad && 30,
                        }}
                        source={
                          focused
                            ? require('../image/HomeTabXX.png')
                            : require('../image/homenohoven.png')
                        }
                      />
                    )}
                  </View>
                )}
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              _CloseHearder();

              navigation.navigation.navigate('Home1');
            },
          }}
        />
        <Tab.Screen
          name="Mybasket"
          component={Menu2StackScreen}
          listeners={{
            tabPress: (e, focused) => {
              _CloseHearder();
              _getBasket();
              // navigation.navigation.navigate('Mybasket');
            },
          }}
          options={{
            tabBarLabel: ({tintColor, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  bottom: 10,
                  marginTop: Platform.isPad && 50,
                }}>
                <Text
                  style={
                    focused
                      ? {
                          fontSize:ViewScale(12),
                          color: '#2d6dc4',
                          fontFamily: 'Mitr-Medium',
                        }
                      : {
                          fontSize:ViewScale(12),
                          color: '#96b3cb',
                          fontFamily: 'Mitr-Medium',
                        }
                  }>
                  {I18n.t('translate_Mybasket')}
                </Text>
              </View>
            ),
            tabBarIcon: ({tintColor, focused, navigation}) => (
              <View>
                <Image
                  style={{
                    width: ViewScale(22),
                    height: ViewScale(22),
                    bottom: Platform.isPad?15:4,
                    marginLeft:
                      I18n.locale === 'th'
                        ? Platform.isPad && 60
                        : Platform.isPad && 40,
                  }}
                  source={
                    focused
                      ? require('../image/starXX.png')
                      : require('../image/starAx.png')
                  }
                />
              </View>
            ),
          }}
        />
        {getUser.isSuccess ? (
          <Tab.Screen
            name={getUser.type === 6 ? 'Activityscan' : 'DigitalCard'}
            component={getUser.type === 6 ? Menu6StackScreen : Menu3StackScreen}
            listeners={{
              tabPress: e => {
                _CloseHearder();
                if (getUser.type === 6) {
                  navigation.navigation.navigate('Activityscan');
                } else {
                  navigation.navigation.navigate('DigitalCard');
                }
              },
            }}
            options={{
              tabBarLabel: ({tintColor, focused}) => (
                <View>
                  {getUser.type === 6 ? (
                    <View
                      style={{
                        alignItems: 'center',
                        bottom: 10,
                        marginTop: Platform.isPad && 50,
                      }}>
                      <Text
                        style={
                          focused
                            ? {
                                fontSize: ViewScale(12),
                                color: '#2d6dc4',
                                fontFamily: 'Mitr-Medium',
                              }
                            : {
                                fontSize: ViewScale(12),
                                color: '#96b3cb',
                                fontFamily: 'Mitr-Medium',
                              }
                        }>
                        {' '}
                        {I18n.t('translate_ScanQrr')}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        bottom: 10,
                        marginTop: Platform.isPad && 50,
                      }}>
                      <Text
                        adjustsFontSizeToFit
                        style={
                          focused
                            ? {
                                fontSize: ViewScale(12),
                                color: '#2d6dc4',
                                fontFamily: 'Mitr-Medium',
                              }
                            : {
                                fontSize: ViewScale(12),
                                color: '#96b3cb',
                                fontFamily: 'Mitr-Medium',
                              }
                        }>
                        {I18n.t('DitpDrive')}
                      </Text>
                    </View>
                  )}
                </View>
              ),
              tabBarIcon: ({tintColor, focused}) => (
                <View>
                  {getUser.type === 6 ? (
                    <Image
                      style={{
                        width: ViewScale(17),
                        height: ViewScale(25),
                        bottom: Platform.isPad?15:4,
                        marginLeft: Platform.isPad && 60,
                      }}
                      source={
                        focused
                          ? require('../image/ACTXX.png')
                          : require('../image/TabScanPhone.png')
                      }
                    />
                  ) : (
                    <Image
                      style={{
                        width: ViewScale(17),
                        height: ViewScale(25),
                        bottom: Platform.isPad?15:4,
                        marginLeft: Platform.isPad && 80,
                      }}
                      // style={{width: 23, height: 24, bottom: 9,marginLeft:Platform.isPad&&40}}
                      source={
                        focused
                          ? require('../image/ACTXX.png')
                          : require('../image/III.png')
                      }
                    />
                  )}
                </View>
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name={'DigitalCard'}
            component={Menu3StackScreen}
            listeners={{
              tabPress: e => {
                _CloseHearder();
              },
            }}
            options={{
              tabBarLabel: ({tintColor, focused}) => (
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: Platform.isPad && 50,
                    }}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      style={
                        focused
                          ? {
                              fontSize:ViewScale(12),
                              color: '#2d6dc4',
                              fontFamily: 'Mitr-Medium',
                            }
                          : {
                              fontSize:ViewScale(12),
                              color: '#96b3cb',
                              fontFamily: 'Mitr-Medium',
                            }
                      }>
                      {I18n.t('DitpDrive')}
                    </Text>
                  </View>
                </View>
              ),
              tabBarIcon: ({tintColor, focused}) => (
                <View>
                  <Image
                    // style={{width: 17, height: 22}}
                    style={{
                      width:ViewScale(18),
                      height:ViewScale(23),
                      marginLeft: Platform.isPad && 60,
                      bottom: Platform.isPad?15:0,
                    }}
                    source={
                      focused
                        ? require('../image/ACTXX.png')
                        : require('../image/MenuBottom3_B.png')
                    }
                  />
                </View>
              ),
            }}
          />
        )}

        {getUser.isSuccess ? (
          <Tab.Screen
            name={getUser.type === 6 ? 'Seachexporter' : 'Statistics'}
            component={getUser.type === 6 ? Menu7StackScreen : Menu4StackScreen}
            listeners={{
              tabPress: e => {
                _CloseHearder();

                if (getUser.type === 6) {
                  // navigation.navigate('Seachexporter', {abc: true});
                } else {
                  navigation.navigation.navigate('Statistics');
                }
              },
            }}
            options={{
              tabBarLabel: ({tintColor, focused}) => (
                <View>
                  {getUser.type === 6 ? (
                    <View
                      style={{
                        alignItems: 'center',
                        bottom: 11,
                        marginTop: Platform.isPad && 50,
                      }}>
                      <Text
                        style={
                          focused
                            ? {
                                fontSize: 12.5,
                                color: '#2d6dc4',
                                fontFamily: 'Mitr-Medium',
                              }
                            : {
                                fontSize: 12.5,
                                color: '#96b3cb',
                                fontFamily: 'Mitr-Medium',
                              }
                        }>
                        {'  '}
                        {I18n.t('translate_Exporter')}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        bottom: 10,
                        marginTop: Platform.isPad && 50,
                      }}>
                      <Text
                        style={
                          focused
                            ? {
                                fontSize: ViewScale(12),
                                color: '#2d6dc4',
                                fontFamily: 'Mitr-Medium',
                              }
                            : {
                                fontSize:ViewScale(12),
                                color: '#96b3cb',
                                fontFamily: 'Mitr-Medium',
                              }
                        }>
                        {I18n.t('translate_StatisticsT')}
                      </Text>
                    </View>
                  )}
                </View>
              ),
              tabBarIcon: ({tintColor, focused}) => (
                <View>
                  {getUser.type === 6 ? (
                    <Image
                      style={{
                        width: 25,
                        height: 21,
                        bottom: Platform.isPad?15:3,
                        marginLeft: Platform.isPad && 60,
                      }}
                      source={
                        focused
                          ? require('../image/seachTabcolor.png')
                          : require('../image/seachTab.png')
                      }
                    />
                  ) : (
                    <Image
                      // style={{width: 25, height: 21, bottom: 5}}
                      style={{
                        width:ViewScale(26),
                        height:ViewScale(22),
                        bottom: Platform.isPad?15:3,
                        marginLeft: Platform.isPad && 60,
                      }}
                      source={
                        focused
                          ? require('../image/GXX.png')
                          : require('../image/barchats.png')
                      }
                    />
                  )}
                </View>
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name={'Seachexporter'}
            component={Menu4StackScreen}
            listeners={{
              tabPress: e => {
                _CloseHearder();
              },
            }}
            options={{
              tabBarLabel: ({tintColor, focused}) => (
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: Platform.isPad && 50,
                    }}>
                    <Text
                      style={
                        focused
                          ? {
                              fontSize:ViewScale(12),
                              color: '#2d6dc4',
                              fontFamily: 'Mitr-Medium',
                            }
                          : {
                              fontSize:ViewScale(12),
                              color: '#96b3cb',
                              fontFamily: 'Mitr-Medium',
                            }
                      }>
                      {'  '}
                      {I18n.t('translate_StatisticsT')}
                    </Text>
                  </View>
                </View>
              ),
              tabBarIcon: ({tintColor, focused}) => (
                <View>
                  <Image
                    // style={{width: 28, height: 28, left: 2}}
                    style={{
                      width:ViewScale(25),
                      height:ViewScale(25),
                      bottom: Platform.isPad?15:3,
                      marginLeft: Platform.isPad && 40,
                    }}
                    source={
                      focused
                        ? require('../image/GXX.png')
                        : require('../image/MenuBottom4_B.png')
                    }
                  />
                </View>
              ),
            }}
          />
        )}

        <Tab.Screen
          name="Loan"
          component={Menu5StackScreen}
          listeners={{
            tabPress: e => {
              SlideDownPanel.hideHeader();
              navigation.navigation.navigate('Loan');
            },
          }}
          options={{
            tabBarLabel: ({tintColor, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  bottom: 10,
                  marginTop: Platform.isPad && 50,
                }}>
                <Text
                  style={
                    focused
                      ? {
                          fontSize: ViewScale(12),
                          color: '#2d6dc4',
                          fontFamily: 'Mitr-Medium',
                        }
                      : {
                          fontSize: ViewScale (12),
                          color: '#96b3cb',
                          fontFamily: 'Mitr-Medium',
                        }
                  }>
                  {I18n.t('title_setting')}
                </Text>
              </View>
            ),
            tabBarIcon: ({tintColor, focused}) => (
              <View
                style={{
                  alignSelf: Platform.isPad && 'center',
                }}>
                <Image
                  style={{
                    width: ViewScale(24),
                    height: ViewScale(25),
                    bottom: Platform.isPad?15:3,
                    marginLeft:
                      I18n.locale === 'th'
                        ? Platform.isPad && 40
                        : Platform.isPad && 60,
                  }}
                  source={
                    focused
                      ? require('../image/settingTabXX.png')
                      : require('../image/setting.png')
                  }
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const ErrorCard = () => {
    return (
      <ImageBackground
        source={require('../image/Backgrounglogin.png')}
        style={Styles.ImgBackground}>
        <View style={Styles.flex1}>
          <View style={Styles.ViewSub1}>
            <Image
              style={{opacity: 0.5, width: 110, height: 150}}
              source={require('../image/DitpLogin.png')}
            />
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 28, color: '#4b4b4b'}}>
                No Internet connection
              </Text>
              <Text style={{fontSize: 23, color: '#999999'}}>
                Check your internet settings and try again.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  let network = CheckConnection();
  // console.log(network);
  if (network === false) {
    return <ErrorCard />;
  }

  return (
    <NavigationContainer
      onStateChange={() => {
        const Screen = navigationRef.current.getCurrentRoute().name;
        // firebase.analytics().setCurrentScreen(Screen.toString());

        analytics().logScreenView({
          screen_name: Screen.toString(),
          screen_class: Screen.toString(),
        });

        // analytics().setCurrentScreen(Screen.toString());
        // alert(Screen.toString());
      }}
      ref={navigationRef}>
      {CheckStaus === true && (
        <Overlay
          windowBackgroundColor={'#fd5c4d99'}
          borderRadius={10}
          isVisible={CheckStaus}
          overlayBackgroundColor="white">
          <View style={{width: 300, height: 140}}>
            <Text
              style={{
                alignSelf: 'center',
                width: '90%',
                fontSize: 22,
                textAlign: 'center',
                marginTop: 15,
              }}>
              {text}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(Url)}
              style={{
                width: '90%',
                height: 40,
                backgroundColor: '#2d6dc4',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 40,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 18, color: '#ffffff'}}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      )}
      {isLoggedIn && getHome.isSuccess ? (
        // <DitpStackScreen />

        <>
          {PassPINCode === undefined ? (
            <DitpStackScreen />
          ) : (
            <LoginPincodeStackScreen />
          )}
        </>
      ) : (
        <LoginStackScreen />
      )}
    </NavigationContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = state => ({
  getUser: state.userReducer.getType,
  getRefresh: state.userReducer.getRefresh,
  authData: state.authReducer.authData,
  getHome: state.dataReducer.getHome,
  getImg: state.authReducer.getImg,
  getUser1: state.authReducer.getUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    color: '#3843d7',
    fontFamily: 'Mitr-Medium',
  },
});
