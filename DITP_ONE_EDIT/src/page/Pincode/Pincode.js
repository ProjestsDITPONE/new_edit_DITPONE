import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  AlertIOS,
  AsyncStorage,
  Dimensions
} from 'react-native';
import ReactNativePinView from 'react-native-pin-view-edit';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from '../../utils/I18n';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

import {ViewScale} from '../../config/ViewScale'


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

const Pincodepassword = ({navigation, route}) => {
  const method = route.params?.status;
  const pinView = useRef(null);
  const pinViewNew = useRef(null);
  const pinViewNewlogin = useRef(null);
  const pinViewNewChage = useRef(null);
  const pinViewCKNew = useRef(null);
  const pconfirm = useRef(null);

  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [enteredPinNew, setEnteredPinNew] = useState('');
  const [enteredPinNewlogin, setEnteredPinNewlogin] = useState('');
  const [showCompletedButton, setShowCompletedButton] = useState(false);

  const [enteredPinNewChage, setEnteredPinNewChage] = useState('');
  const [PinNewChageCK, setPinNewChageCK] = useState('');
  const [CheackFaceIDTouchID, setCheackFaceIDTouchID] = useState(true);
  const [PinChageCKconfirm, setPinconfirm] = useState('');
  const [CheckFaceID, setCheckFaceID] = useState('');
  const [CheckPin, setCheckPin] = useState('');
  const [CheckLogincount, setCheckLogincount] = useState('');
  const [CheckLogincountN, setCheckLogincountN] = useState(1);

  const [PassPINCode, setPassPINCode] = useState('set');
  const [getTotal, setgetTotal] = useState('1');

  useEffect(() => {
    // ShowOnOffFaceID();

    AsyncStorage.getItem('num', (error, results) => {
      var sum = parseInt(results)
      // alert(sum)
      setgetTotal(sum + 1)
    });

    AsyncStorage.getItem('CheackFaceIDTouchID', (error, res) => {
      if (res === 'false') {
        // alert(res)
        setCheackFaceIDTouchID(false);
      } else {
        // alert(res+'eee')
        
        setCheackFaceIDTouchID(true);
      }
    });

    console.log(JSON.stringify(CheckPin));
    retrieveUserSession();

    loginCheack();
    //  var  num = CheckPin.replace("/").toString()
    var PINCodeck = CheckPin.substring(6, 12);
    console.log(PINCodeck);
    var Logcount = CheckLogincount.substring(6, 12);

    // alert(Logcount)

    if (PINCodeck === '') {
      if (PassPINCode === 'set') {
        if (enteredPin.length > 0) {
          setShowRemoveButton(true);
        } else {
          setShowRemoveButton(false);
        }
        if (enteredPin.length === 6) {
          setPassPINCode('confirm_set');
          pinView.current.clearAll();
        } else {
          setShowCompletedButton(false);
        }
      } else if (PassPINCode === 'confirm_set') {
        if (enteredPinNew.length > 0) {
          setShowRemoveButton(true);
        } else {
          setShowRemoveButton(false);
        }
        if (enteredPinNew.length === 6) {
          if (enteredPin === enteredPinNew) {
            alert('สำเร็จ');

            storeUserSession(enteredPinNew);
            navigation.navigate('HomeStackScreen');

            AsyncStorage.setItem('num', getTotal.toString());
           
          } else {
            alert('กรุณาใส่รหัส PIN ใหม่อีกครั้ง');
            pinViewNew.current.clearAll();
          }
        } else {
          setShowCompletedButton(false);
        }
      }
    } else {
      setPassPINCode('LoginPIN');

      if (enteredPinNewlogin.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (enteredPinNewlogin.length === 6) {
        //  alert('kkkkk')
        //   pinViewNewlogin.current.clearAll();
        if (enteredPinNewlogin === PINCodeck) {
          navigation.replace('HomeStackScreen');
          pinViewNewlogin.current.clearAll();

          AsyncStorage.setItem('num', getTotal.toString());
         
        } else {
          alert('รหัสผ่าน PIN ไม่ถูกต้อง');
          // removeUserSession()
          pinViewNewlogin.current.clearAll();
        }
      } else {
        setShowCompletedButton(false);
      }
    }
  }, [
    {
      enteredPin,
      enteredPinNew,
      enteredPinNewlogin,
      enteredPinNewChage,
      PinNewChageCK,
      PinChageCKconfirm,
    },
  ]);

  /**
   * function Zone
   */

   const NumTotal = () => {
  AsyncStorage.setItem('num', getTotal.toString());
   }

  /**
   * function Zone FingerprintScanner
   */

 

  const authenticateBiometrics = () => {
    if (Platform.OS === 'ios') {
      FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
          navigation.replace('HomeStackScreen');
          handlePopupDismissed();
          // this.NumTotal();
          AsyncStorage.setItem('num', getTotal.toString());
        
          // AsyncStorage.getItem('num', (error, results) => {
          //   var sum = parseInt(results)
          //   // alert(sum)
          //   setgetTotal(sum + 1)
          // });
         
         //alert('Authenticated successfully');
        })
        .catch(error => {
          handlePopupDismissed();
          alert(error.message);
        });

      // alert('ios')
    } else {
      FingerprintScanner.authenticate({title: 'Verify you identity'})
        .then(() => {
          navigation.replace('HomeStackScreen');
          // alert('ok')
          // navigation.replace(goToPath);
          // setShowSheetBiometrics(false);
          FingerprintScanner.release();
          // this.NumTotal();
          AsyncStorage.setItem('num', getTotal.toString());
          // AsyncStorage.getItem('num', (error, results) => {
          //   var sum = parseInt(results)
          //   // alert(sum)
          //   setgetTotal(sum + 1)
          // });
        })
        .catch(error => {
          // alert(error.message);
          // setShowSheetBiometrics(false);
          FingerprintScanner.release();
        });

      // alert('android')
    }
  };

  /**
   * function Zone pin code
   */

  async function storeUserSession(passcode_join) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          P: passcode_join,
          token: 'ACCESS_TOKEN',
        }),
      );

      // Congrats! You've just stored your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }

  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
      // Congrats! You've just removed your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }

  async function loginCheack() {
    try {
      let Counrlogin = CheckLogincount.substring(5, 6);

      let CounrloginNum = parseInt(Counrlogin);

      await EncryptedStorage.setItem(
        'user_loginCK',
        JSON.stringify({
          C: 1,
          token: 'ACCESS_TOKEN',
        }),
      );
      showLoginck();

      // Congrats! You've just stored your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }

  async function showLoginck() {
    try {
      const session = await EncryptedStorage.getItem('user_loginCK');

      setCheckLogincount(session.replace('/').toString());
    } catch (error) {
      // There was an error on the native side
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        setCheckPin(session.replace('/').toString());
      }
    } catch (error) {
      // There was an error on the native side
    }
  }



  // pinViewNewlogin

  async function loginf() {
    try {
      // alert('passcode' + enteredPin);
      // await EncryptedStorage.setItem(
      //     "user_session",
      //     JSON.stringify({
      //         passswordpincode : 123456,
      //         token : "ACCESS_TOKEN",
      //         username : "emeraldsanto",
      //         languages : ["fr", "en", "de"]
      //     })
      // );
      // Congrats! You've just stored your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }

  return (
    <>
      {/* <StatusBar barStyle="light-content" /> */}
      <StatusBar backgroundColor="#2d6dc4" barStyle="dark-content" />

      {PassPINCode === 'set' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            ตั้งค่า Passcode
          </Text>
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pinView}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setEnteredPin(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pinView.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();

                  // alert('Entered Pin: ' + enteredPin);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                showCompletedButton ? (
                  <View>{/* <Text>Delete</Text> */}</View>
                ) : (
                  //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}

      {PassPINCode === 'confirm_set' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            ยืนยัน Passcode
          </Text>
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pinViewNew}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setEnteredPinNew(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pinViewNew.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();
                  // alert('Entered Pin: ' + enteredPinNew);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                showCompletedButton ? (
                  <View>{/* <Text>Delete</Text> */}</View>
                ) : (
                  //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}

      {PassPINCode === 'ChagePIN' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('HomeStackScreen');
            }}
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            {I18n.t('transalte_set_Passcode')}
          </Text>
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pinViewNewChage}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setEnteredPinNewChage(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pinViewNewChage.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();
                  // alert('Entered Pin: ' + enteredPinNewChage);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                showCompletedButton ? (
                  <View>{/* <Text>Delete</Text> */}</View>
                ) : (
                  //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}
      {PassPINCode === 'ChageNew' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            เปลี่ยนรหัสผ่าน Passcode
          </Text>
          <View style={{paddingHorizontal: 25,borderWidth:1,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pinViewCKNew}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setPinNewChageCK(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pinViewCKNew.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();
                  // alert('Entered Pin: ' + PinNewChageCK);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                showCompletedButton ? (
                  <View>{/* <Text>Delete</Text> */}</View>
                ) : (
                  //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}

      {PassPINCode === 'confirm_Chagennew' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            ยืนยันเปลี่ยนรหัสผ่าน Passcode
          </Text>
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pconfirm}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setPinconfirm(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pconfirm.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();
                  // alert('Entered Pin: ' + PinChageCKconfirm);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                showCompletedButton ? (
                  <View>{/* <Text>Delete</Text> */}</View>
                ) : (
                  //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}

      {PassPINCode === 'LoginPIN' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            {I18n.t('transalte_set_Passcode')}
          </Text>
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
            <ReactNativePinView
              inputSize={20}
              ref={pinViewNewlogin}
              pinLength={6}
              buttonSize={90}
              onValueChange={value => setEnteredPinNewlogin(value)}
              buttonAreaStyle={{
                marginTop: 30,
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              onButtonPress={key => {
                if (key === 'custom_left') {
                  pinViewNewlogin.current.clear();
                }
                if (key === 'custom_right') {
                  authenticateBiometrics();
                  // alert('Entered Pin: ' + enteredPinNewlogin);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>{I18n.t('transalte_Delete_Code')}</Text>
                  </View>
                ) : (
                  undefined
                )
              }
              customRightButton={
                CheackFaceIDTouchID === true ? (
                  <Icon1 name={'fingerprint'} size={36} color={'#FFF'} />
                ) : (
                  undefined
                )
              }
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default Pincodepassword;
