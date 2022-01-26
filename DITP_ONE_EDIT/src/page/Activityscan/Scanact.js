import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon2 from 'react-native-vector-icons/Entypo';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import MaskTabBar, {TabView} from 'react-native-tab-view';
import {getinfoActivity} from '../../actions/data.actions';
import Styles from './Styles';
import {TabActions} from '@react-navigation/native';
import {connect} from 'react-redux';
const Scanact = ({route, navigation, dispatch}) => {
  const [Scan, setScan] = useState(require('../../image/scanqr.png'));
  const [SelecIndex, setSelecIndex] = useState(2);
  const name = route.params.name;
  const width = Dimensions.get('window').width;
  const height = Math.round(Dimensions.get('window').height);
  const id = route.params.id;
  // console.log(route.params.id);
  const handleIndexChange = (index, number) => {
    setSelecIndex(index);
  };
  const onSuccess = async e => {
    try {
      const Data = JSON.parse(e.data);
      if (Data['Check'] === true) {
        navigation.navigate('ProfileScan1', {
          profile: Data['profile'],
          name: Data['name'],
          ssoid: Data['ssoid'],
          naturalId: Data['naturalId'],
          company: Data['company'],
          phonenumber: Data['phonenumber'],
          membertype: Data['membertype'],
          type: Data['type'],
          cid: Data['cid'],
          Token: Data['Token'],
        });

        dispatch({
          type: 'GET_CID_SUCCESS',
          payload: {Token: Data['Token'], id: id},
        });
      } else {
        Alert.alert('Qr code ไม่ถูกต้อง');
      }
    } catch (error) {
      Alert.alert('Qr code ไม่ถูกต้อง');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        containerStyle={{backgroundColor: '#ffffff'}}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon2 name="chevron-left" size={20} />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text style={{fontSize: 25, color: '#3a3a3a'}}>สแกน QR Code</Text>
          </View>
        }
      />
      <View
        style={{
          backgroundColor: '#ffffff',
          padding: 10,
          width: '100%',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <Text numberOfLines={2} style={[Styles.centerText]}>
          {name}
        </Text>
      </View>

      <RNCamera
        onBarCodeRead={onSuccess}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          bottom: 100,
          zIndex: -1,
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
          }}>
          <Image
            resizeMode={'stretch'}
            style={{width: '100%', height: '100%'}}
            source={require('../../image/QrcodeScan.png')}
          />
        </View>
      </RNCamera>

      {/* <QRCodeScanner
        cameraStyle={{height: height}}
        showMarker={true}
        topViewStyle={{height: '10%', flex: 0, backgroundColor: '#ffffff'}}
        containerStyle={{}}
        topContent={
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 10,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text numberOfLines={2} style={[Styles.centerText]}>
              {name}
            </Text>
          </View>
        }
        customMarker={
          <Image
            resizeMode={'stretch'}
            style={[Styles.Maker]}
            source={require('../../image/QrcodeScan.png')}
          />
        }
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
      /> */}
      {/* <View
        style={{
          height: '100%',
          width: '10%',
          backgroundColor: '#00000090',
          position: 'absolute',
          right: 0,
        }}
      />
      <View
        style={{
          height: '100%',
          width: '10%',
          backgroundColor: '#00000090',
          position: 'absolute',
          left: 0,
        }}
      />
      <View
        style={{
          height: Platform.OS === 'android' ? '28.5%' : '22%',
          width: '80%',
          backgroundColor: '#00000090',
          position: 'absolute',
          alignSelf: 'center',
          top: 0,
        }}
      />
      <View
        style={{
          height: Platform.OS === 'android' ? '28.5%' : '22%',
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  null,
  mapDispatchToProps,
)(Scanact);
