import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import MaskTabBar, {TabView} from 'react-native-tab-view';

import style from './Styles';

const Qrcode = ({navigation}) => {
  const [Scan, setScan] = useState(require('../../image/scanqr.png'));
  const [SelecIndex, setSelecIndex] = useState(2);
  const [Data, setData] = useState([]);
  const window = Dimensions.get('window');
  const {height, width} = Dimensions.get('window');

  var aspectRatio1 = '100%';
  if (height / width > 1.6) {
    //iphone
    aspectRatio1 = '100%';
  }

  var aspectRatio2 = '16%';
  if (height / width > 1.6) {
    //iphone
    aspectRatio2 = '23%';
  }

  var aspectRatio3 = '80%';
  if (height / width > 1.6) {
    //iphone
    aspectRatio3 = '70%';
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleIndexChange = (index, number) => {
    setSelecIndex(index);
  };
  const onSuccess = async e => {
    try {
      const Data = e.data;

      console.log('ค่าา', Data);
      if (Data != '') {
        navigation.navigate('ViewAdd', {
          url:Data
          // Token: Data.Token,
          // membertype: Data['membertype'],
          // type: Data['type'],
        });
      } else {
        Alert.alert('Qr code ไม่ถูกต้อง');
      }
    } catch (error) {
      // Alert.alert('Qr code ไม่ถูกต้อง');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        
        // opacity: 0.5,
        // overflow: 'hidden',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
        <RNCamera
          onBarCodeRead={onSuccess}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          detectedImageInEvent={true}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              zIndex: 1,
              // backgroundColor:'#f8fbfd'
            }}>
            <Image
              resizeMode={'stretch'}
              style={{width:302,height:302}}
              source={require('../../image/qrcodeimg.png')}
            />
          </View>
        </RNCamera>
      </View>

      {/* <View
        style={{
          height: aspectRatio1,
          width: '10%',
          backgroundColor: '#00000090',
          position: 'absolute',
          right: 0,
        }}
      />
      <View
        style={{
          height: aspectRatio1,
          width: '10%',
          backgroundColor: '#00000090',
          position: 'absolute',
          left: 0,
        }}
      />
      <View
        style={{
          height: Platform.OS === 'android' ? '28.5%' : aspectRatio2,
          width: '80%',
          backgroundColor: '#00000090',
          position: 'absolute',
          alignSelf: 'center',
          top: 0,
        }}
      />
      <View
        style={{
          height: Platform.OS === 'android' ? '28.5%' : aspectRatio3,
          width: '80%',
          backgroundColor: '#00000090',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 0,
        }}
      /> */}
    </View>
  );
};
const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  getImg: state.authReducer.getImg,
});

export default Qrcode;
