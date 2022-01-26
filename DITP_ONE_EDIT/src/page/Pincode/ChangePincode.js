import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import ReactNativePinView from 'react-native-pin-view-edit';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon4 from 'react-native-vector-icons/AntDesign';
import {ViewScale} from '../../config/ViewScale'



const ChangePincodepassword = ({navigation, route}) => {
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

  const [PinChageCKconfirm, setPinconfirm] = useState('');

  const [CheckPin, setCheckPin] = useState('');

  const [PassPINCode, setPassPINCode] = useState('ChagePIN');
  // const [PassPINCodeNew, setPassPINCodeNew] = useState(false);

  useEffect(() => {
    console.log(JSON.stringify(CheckPin));
    retrieveUserSession();

    //  var  num = CheckPin.replace("/").toString()
    var PINCodeck = CheckPin.substring(6, 12);
    console.log(PINCodeck);

    if (PassPINCode === 'ChagePIN') {
      if (enteredPinNewChage.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (enteredPinNewChage.length === 6) {
        if (enteredPinNewChage === PINCodeck) {
          setPassPINCode('ChageNew');
          pinViewNewChage.current.clearAll();
        } else {
          alert('กรุณาใส่รหัส PIN ใหม่อีกครั้ง');
          pinViewNewChage.current.clearAll();
        }
      } else {
        setShowCompletedButton(false);
      }
    } else if (PassPINCode === 'ChageNew') {
      if (PinNewChageCK.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (PinNewChageCK.length === 6) {
        //  alert('confirm_Chagennew')
        setPassPINCode('confirm_Chagennew');
      } else {
        setShowCompletedButton(false);
      }
    } else if ('confirm_Chagennew') {
      if (PinChageCKconfirm.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (PinChageCKconfirm.length === 6) {
        // alert('OK' + PinChageCKconfirm);
        //  setPassPINCode('confirm_Chagennew');

        if (PinChageCKconfirm === PinNewChageCK) {
          storeUserSession(PinChageCKconfirm);
          navigation.navigate('HomeStackScreen');
        } else {
          alert('กรุณาใส่รหัส PIN ใหม่อีกครั้ง');
          pconfirm.current.clearAll();
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
      alert('passcode' + enteredPin);
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
     <StatusBar backgroundColor="#2d6dc4" barStyle="dark-content" />

      {PassPINCode === 'ChagePIN' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#2d6dc4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        
          <Icon4
              onPress={() => {
                navigation.navigate('HomeStackScreen');
              }}
              name="close"
              size={23}
              style={{
                position: 'absolute',
                top: 50,
                left: 20,
                color: '#FFFFFF',
              }}
            />
          <Text
            onPress={() => {}}
            style={{
              textAlign: 'center',
              paddingTop: 0,
              paddingBottom: 48,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 30,
            }}>
            กรอก Passcode
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
                  alert('Entered Pin: ' + enteredPinNewChage);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>ลบ</Text>
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
          <View style={{paddingHorizontal: 25,width:ViewScale(450)}}>
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
                  alert('Entered Pin: ' + PinNewChageCK);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>ลบ</Text>
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
                  alert('Entered Pin: ' + PinChageCKconfirm);
                }
                //   if (key === "three") {
                //     alert("You can't use 3")
                //   }
              }}
              customLeftButton={
                showRemoveButton ? (
                  // <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
                  <View>
                    <Text style={{fontSize: 30, color: '#FFF'}}>ลบ</Text>
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
    </>
  );
};
export default ChangePincodepassword;
