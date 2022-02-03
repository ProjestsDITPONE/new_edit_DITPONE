import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {Overlay} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
// import ImagePicker from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import I18n from '../../utils/I18n';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import { ViewScale } from '../../config/ViewScale';
import {color} from 'react-native-reanimated';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const window = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

//ipad
var aspectRatio = 1.6;
if (height / width > 1.6) {
  //iphone
  aspectRatio = 3;
}
var aspectRatio1 = 240;
if (height / width > 1.6) {
  //iphone
  aspectRatio1 = 150;
}
var aspectRatio2 = '35%';
if (height / width > 1.6) {
  //iphone
  aspectRatio2 = '40%';
}

var aspectRatio3 = '58%';
if (height / width > 1.6) {
  //iphone
  aspectRatio3 = '38%';
}
const IdentityScreen = ({navigation, authData, dispatch}) => {
  const [Swich, setSwich] = useState(1);
  const [Img, setImg] = useState(null);
  const [Img2, setImg2] = useState(null);
  const [Show2, setShow2] = useState(null);
  const [url, setUrl] = useState('');
  const [url2, setUrl2] = useState('');
  const [page, pageSet] = useState(1);
  const [Accept, setAccept] = useState(false);
  const [heightSheet, setSheet] = useState(150);
  const [CammeraOn1, setCammeraOn1] = useState(false);
  const [CammeraOn, setCammeraOn] = useState(false);
  const [RBsheet1, setRBsheet1] = useState();
  const [Camera, setCamera] = useState();
  const isFocused = useIsFocused();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [checknewupload, setchecknewupload] = useState(false);
  const [checknewupload2, setchecknewupload2] = useState(false);

  const takePicture = async value => {
    var Camera1 = value;
    const options = {quality: 1, base64: true, width: 800, height: 600};
    const options1 = {
      quality: 1,
      base64: true,
      width: ViewScale(800),
      height: ViewScale(600),
    };
    const data = await Camera.takePictureAsync(options);
    const data1 = await Camera.takePictureAsync(options1);
    if (Camera1 === 2) {
      if (!data.didCancel) {
        let path = data.uri;

        
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!data.fileName) {
          data.fileName = path.split('/').pop();
        }
        console.log(data.fileName);

        setUrl2(data.uri);
        setImg2(data.fileName);
      }
    } else if (Camera1 === 1) {
      if (!data1.didCancel) {
        let path = data1.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!data1.fileName) {
          data1.fileName = path.split('/').pop();
        }
        console.log(data1);

        setUrl(data1.uri);
        setImg(data1.fileName);
      }
    }
  };

  const _SendDocIden = async value => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await RNFetchBlob.fetch(
        'POST',
        'http://one.ditp.go.th/api/confirm_identity',
        {token: authData.token},
        [
          {
            name: 'image1',
            filename: Img,
            type: 'image/jpeg',
            data: RNFetchBlob.wrap(
              Platform.OS === 'android' ? url : url.replace('file://', ''),
            ),
          },

          {
            name: 'image2',
            filename: Img2,
            type: 'image/jpeg',
            data: RNFetchBlob.wrap(
              Platform.OS === 'android' ? url2 : url2.replace('file://', ''),
            ),
          },
        ],
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 1000);

      console.log('ส่ง', response);
    } catch (error) {}
  };

  const imageGalleryLaunch = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
    };
    launchImageLibrary(options2, response => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!responses.fileName) {
          responses.fileName = path.split('/').pop();
        }

        setUrl(responses.uri);
        setImg(responses.fileName);
      }

      RBsheet1.close();
    });
  };
  const imageGalleryLaunch2 = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
    };

    launchImageLibrary(options2, response => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!responses.fileName) {
          responses.fileName = path.split('/').pop();
        }

        setUrl2(responses.uri);

        setImg2(responses.fileName);
      }

      RBsheet1.close();
    });
  };

  const Call = number => {
    // console.log(number);
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const Bar = () => {
    if (page === 1) {
      return (
        <View style={Styles.ViewSub11}>
          {CammeraOn1 === true && (
            <Overlay
              fullScreen={true}
              overlayStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                opacity: 1,
                shadowOpacity: 0,
              }}
              isVisible
              backdropStyle={{backgroundColor: '#2d6dc4'}}>
              <SafeAreaView style={{flex: 1}}>
                <View
                  style={{
                    flex: 0.4,
                    marginLeft: ViewScale(10),
                    marginTop: ViewScale(20),
                    zIndex: -1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        setImg(null);
                        setCammeraOn1(false);
                        RBsheet1.close();
                      }, 200);
                    }}>
                    <Image
                      style={{width: ViewScale(20), height: ViewScale(20)}}
                      source={require('../../image/CloseCamra.png')}
                    />
                  </TouchableOpacity>
                </View>
                {Img === null && (
                  <View style={[Styles.container1]}>
                    <RNCamera
                      captureAudio={false}
                      detectedImageInEvent={true}
                      ref={ref => {
                        setCamera(ref);
                      }}
                      style={{
                        width: '99%',
                        height: '44%',
                        overflow: 'hidden',
                        borderRadius: ViewScale(8),
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
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode={'stretch'}
                        source={require('../../image/frameCard.png')}
                      />
                    </RNCamera>

                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: ViewScale(25), color: '#ffffff'}}>
                        {I18n.t('translate_takeId')}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTimeout(() => {
                            takePicture(1);
                          }, 200);
                        }}
                        style={Styles.capture}>
                        <Image
                          style={{width: ViewScale(80), height: ViewScale(80)}}
                          source={require('../../image/TouchPhoto.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {Img != null && (
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <ImageBackground
                        imageStyle={{
                          borderWidth: ViewScale(2),
                          borderColor: '#ffffff',
                          width: '100%',
                          height: '75%',
                        }}
                        source={{uri: url}}
                        style={{
                          width: '100%',
                          height: '75%',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            RBsheet1.close();
                            setCammeraOn1(false);
                          }}
                          style={{
                            backgroundColor: '#000000',

                            marginRight: ViewScale(10),
                            borderRadius: ViewScale(10),
                            width: '30%',
                            paddingVertical: ViewScale(10),
                            paddingHorizontal: ViewScale(15),
                          }}>
                          <Text
                            style={{
                              fontSize: ViewScale(25),
                              color: '#ffffff',
                              textAlign: 'center',
                            }}>
                            {I18n.t('translate_Aceept')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setImg(null);
                          }}
                          style={{
                            backgroundColor: '#000000',
                            borderRadius: ViewScale(10),
                            width: '30%',
                            paddingVertical: ViewScale(10),
                            paddingHorizontal: ViewScale(15),
                          }}>
                          <Text
                            style={{
                              fontSize: ViewScale(25),
                              color: '#ffffff',
                              textAlign: 'center',
                            }}>
                            {I18n.t('translate_Cancel')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </SafeAreaView>
            </Overlay>
          )}
          <TouchableOpacity
            onPress={() => {
              setTimeout(() => {
                setCammeraOn1(true);
              }, 200);
            }}>
            <View style={Styles.ViewSub12}>
              <Image
                style={Styles.ImageSub5}
                source={require('../../image/Camara.png')}
              />
              <Text style={Styles.TextSub8}>
                {'   '}
                {I18n.t('translate_takePhoto')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                imageGalleryLaunch();
              }, 200)
            }>
            <View style={Styles.ViewSub13}>
              <Image
                style={Styles.ImageSub5}
                source={require('../../image/gallry.png')}
              />
              <Text style={Styles.TextSub8}>
                {'   '}
                {I18n.t('translate_SelecPhoto')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (page === 2) {
      return (
        <View style={Styles.ViewSub11}>
          <View>
            {CammeraOn === true && (
              <Overlay
                fullScreen={true}
                overlayStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  opacity: 1,
                  shadowOpacity: 0,
                }}
                isVisible
                backdropStyle={{backgroundColor: '#2d6dc4'}}>
                <SafeAreaView style={{flex: 1}}>
                  <View style={{flex: 0.08, marginLeft: ViewScale(10), marginTop: ViewScale(20)}}>
                    <TouchableOpacity
                      onPress={() => {
                        setTimeout(() => {
                          setCammeraOn(false);
                          RBsheet1.close();
                        }, 200);
                      }}>
                      <Image
                        style={{width: ViewScale(20), height: ViewScale(20)}}
                        source={require('../../image/CloseCamra.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {Img2 === null && (
                    <View style={Styles.container}>
                      <View style={{overflow: 'hidden', borderRadius: ViewScale(145)}}>
                        <RNCamera
                          captureAudio={false}
                          detectedImageInEvent={true}
                          ref={ref => {
                            setCamera(ref);
                          }}
                          style={Styles.preview}
                          autoFocus={RNCamera.Constants.AutoFocus.on}
                          type={RNCamera.Constants.Type.front}
                          flashMode={RNCamera.Constants.FlashMode.off}
                          androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message:
                              'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                          }}
                          androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message:
                              'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: ViewScale(195),
                          height: null,
                          alignItems: 'center',
                          paddingTop: ViewScale(60),
                          
                        }}>
                        <Text style={{fontSize: ViewScale(25), color: '#ffffff'}}>
                          {I18n.t('translate_rejectEyeglass')}
                        </Text>
                        {/* <Text style={{fontSize: 25, color: '#ffffff'}}>
                          {I18n.t('translate_Scrollreject')}
                        </Text> */}
                      </View>
                      <View
                        style={{
                          flex: 0,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setTimeout(() => {
                              takePicture(2);
                            }, 200);
                          }}
                          style={Styles.capture}>
                          <Image
                            style={{width: ViewScale(80), height: ViewScale(80)}}
                            source={require('../../image/TouchPhoto.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {Img2 != null && (
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, alignSelf: 'center'}}>
                        <View
                          style={{
                            overflow: 'hidden',
                            borderRadius: ViewScale(145),
                          }}>
                          <ImageBackground
                            source={{uri: url2}}
                            style={{
                              width: width * 0.8,
                              height: width * 1,

                              overflow: 'hidden',
                              borderRadius: ViewScale(145),
                            }}
                          />
                        </View>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              RBsheet1.close();
                              setCammeraOn(false);
                            }}
                            style={{
                              backgroundColor: '#000000',

                              marginRight: ViewScale(10),
                              borderRadius: ViewScale(10),
                              width: '30%',
                              paddingVertical: ViewScale(10),
                              paddingHorizontal: ViewScale(15),
                            }}>
                            <Text
                              style={{
                                fontSize: ViewScale(25),
                                color: '#ffffff',
                                textAlign: 'center',
                              }}>
                              {I18n.t('translate_Accept')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setImg2(null);
                            }}
                            style={{
                              backgroundColor: '#000000',
                              borderRadius: ViewScale(10),
                              width: '30%',
                              paddingVertical: ViewScale(10),
                              paddingHorizontal: ViewScale(15),
                            }}>
                            <Text
                              style={{
                                fontSize: ViewScale(25),
                                color: '#ffffff',
                                textAlign: 'center',
                              }}>
                              {I18n.t('translate_Cancel')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                </SafeAreaView>
              </Overlay>
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                setCammeraOn(true);
              }, 200)
            }>
            <View style={Styles.ViewSub12}>
              <Image
                style={Styles.ImageSub5}
                source={require('../../image/Camara.png')}
              />
              <Text style={Styles.TextSub8}>
                {'   '}
                {I18n.t('translate_takePhoto')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                imageGalleryLaunch2();
              }, 200)
            }>
            <View style={Styles.ViewSub13}>
              <Image
                style={Styles.ImageSub5}
                source={require('../../image/gallry.png')}
              />
              <Text style={Styles.TextSub8}>
                {'   '}
                {I18n.t('translate_SelecPhoto')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={Styles.ViewSub1}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />

      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <Headerstage nameTab={I18n.t('translate_Confirm_identity')} />

      <ScrollView style={{zIndex: -1}}>
        <View style={{zIndex: -1}}>
          {Accept === true && (
            <>
              <Overlay
                overlayStyle={[Styles.bottom45, {borderRadius: ViewScale(8)}]}
                isVisible
                backdropStyle={{
                  backgroundColor:
                    Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                  opacity: Platform.OS === 'android' ? ViewScale(0.5) : ViewScale(0.8),

                  flex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    top: ViewScale(-39),
                    borderRadius: ViewScale(20),
                    height: ViewScale(25),
                    width: ViewScale(25),
                    alignSelf: 'flex-end',
                    left: ViewScale(10),
                  }}>
                  <TouchableOpacity
                   onPress={()=>{

                    setAccept(false);

                   }}
                  >
                    <Icon
                      size={ViewScale(17)}
                      name="close"
                      style={{alignSelf: 'center', top: ViewScale(5)}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{padding: ViewScale(20)}}>
                  {/* <View style={Styles.flexDirectionRow}>
                  <TouchableOpacity
                    onPress={() =>
                      setTimeout(() => {
                        navigation.navigate('Home');
                        setAccept(false);
                      }, 200)
                    }>
                    <Icon2 name="x" size={15} color="#2d6dc4" />
                  </TouchableOpacity>
                </View> */}
                  <View style={{textAlign: 'center'}}>
                    <Text style={[Styles.TextSub9, {textAlign: 'center'}]}>
                      {/* {I18n.t('translate_detailAlert')} */}
                      {'กรมจะแจ้งผลการตรวจสอบข้อมูล\nภายใน 3 วันทำการ'}
                    </Text>
                  </View>
                  <View style={{top: 0, alignSelf: 'center'}}>
                    {/* <View style={Styles.ViewSub17}>
                    <Image
                      source={require('../../image/Alertiden.png')}
                      style={Styles.ImageSub9}
                    />
                    <View>
                      <Text style={Styles.TextSub10}>
                        {I18n.t('translate_ContectDitp')}{' '}
                        <Text
                          style={{
                            color: '#2d6dc4',
                            textDecorationLine: 'underline',
                          }}
                          onPress={() => Call(1169)}>
                          1169
                        </Text>
                      </Text>
                    </View>
                  </View> */}

                    <Text
                      style={{
                        fontSize: ViewScale(18),
                        color: '#686868',
                        textAlign: 'center',
                      }}>
                      จ. - ศ. 08.30 - 17.30 น.
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setTimeout(() => {
                        navigation.navigate('Home');
                        setAccept(false);
                      }, 200)
                    }
                    style={{
                      height: ViewScale(34),
                      backgroundColor: '#2d6dc4',
                      borderRadius: ViewScale(24.5),
                      alignItems: 'center',
                      justifyContent: 'center',

                      marginTop: ViewScale(25),
                    }}>
                    <Text style={Styles.TextSub11}>
                      {I18n.t('translate_Aceept')}
                    </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', marginTop: ViewScale(25)}}>
                    <TouchableOpacity
                      onPress={() =>
                        setTimeout(() => {
                          navigation.navigate('ListChatScreen');
                          setAccept(false);
                        }, 200)
                      }
                      style={[Styles.ViewSub19, {}]}>
                      <Image
                        style={{width: ViewScale(45), height: ViewScale(45), right: ViewScale(10)}}
                        source={require('../../image/nogsaix.png')}
                      />
                      <Text style={[Styles.TextSub11, {textAlign: 'left'}]}>
                        {I18n.t('translate_ChatIden')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Call(1169)}
                      // onPress={() =>
                      //   setTimeout(() => {
                      //     navigation.navigate('Home');
                      //     setAccept(false);
                      //   }, 200)
                      // }
                      style={[Styles.TocuhSub3]}>
                      <Text
                        style={[
                          Styles.TextSub11,
                          {
                            padding: ViewScale(5),
                            textAlign: 'center',
                            left: ViewScale(8),
                          },
                        ]}>
                        {/* {I18n.t('translate_Aceept')} */}
                        สายด่วน 1169
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderWidth: ViewScale(1.5),
                          borderColor: '#499cc3',
                          borderRadius: ViewScale(30),
                          height: ViewScale(44),
                          width: ViewScale(44),
                          left: ViewScale(5),
                        }}>
                        <Icon
                          style={{
                            top: ViewScale(7),
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                          size={ViewScale(30)}
                          name="call"
                          color="#499cc3"
                        />
                      </View>
                      {/* <Image
                      style={{width: 45, height: 45, right: 10}}
                      source={require('../../image/nogsaix.png')}
                    /> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </Overlay>
            </>
          )}

          <View style={[Styles.alignSelfCenter]}>
            <RBSheet
              ref={ref => {
                setRBsheet1(ref);
              }}
              height={heightSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: '#2d6dc490',
                },
                draggableIcon: {
                  backgroundColor: '#f1f1f1',
                  width: ViewScale(66),
                  height: ViewScale(8),
                },
                container: {
                  borderTopLeftRadius: ViewScale(10),
                  borderTopRightRadius: ViewScale(10),
                },
              }}>
              {Bar()}
            </RBSheet>
            {/* <Text style={Styles.TextSub1}>
              {I18n.t('translate_UploadJoinAct')}
            </Text> */}
          </View>
          <View style={{flex: 1}}>
            <LinearGradient
              style={{
                height: ViewScale(220),

                marginHorizontal: ViewScale(10),
                borderRadius: ViewScale(8),
              }}
              start={{x: 0, y: 0}}
              end={{x: 0.8, y: 0}}
              colors={['#8fb0ec', '#b7a4f7']}>
              <Text
                style={[
                  Styles.TextSub1,
                  {
                    textAlign: 'center',
                    top: ViewScale(9),
                    fontSize: ViewScale(25),
                    fontFamily: 'PSL Kittithada Pro',
                  },
                ]}>
                {I18n.t('translate_UploadJoinAct')}
              </Text>
              <Text
                style={[
                  Styles.TextSub1,
                  {
                    textAlign: 'center',
                    top: ViewScale(9),
                    fontSize: ViewScale(15),
                    fontFamily: 'PSL Kittithada Pro',
                  },
                ]}>
                {I18n.t('translate_typeFile')}
              </Text>
              <View
                style={{
                  marginHorizontal: ViewScale(50),
                  borderRadius: ViewScale(80),
                  backgroundColor: '#FFFFFF',

                  height: ViewScale(110),
                  top: ViewScale(45),
                }}>
                <ImageBackground
                  style={{
                    flex: 1,
                    width: ViewScale(90),
                    height: ViewScale(140),
                    alignSelf: 'center',
                    top: ViewScale(-30),
                  }}
                  source={require('../../image/PPER.png')}
                />
              </View>
            </LinearGradient>
          </View>
          <View style={Styles.alignSelfCenter}>
            {/* <Text style={Styles.TextSub2}>{I18n.t('translate_typeFile')}</Text> */}
          </View>
          <View style={{flex: 1, marginHorizontal: ViewScale(10)}}>
            <Text style={{color: '#163c70', fontSize: ViewScale(24)}}>
              บัตรประจำตัวประชาชน/Passport 
            </Text>
          </View>

          {/*ขั้นที่1 */}
          {/* {Swich === 1 && (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{alignItems: 'center', left: 30, zIndex: 99}}>
                  <ImageBackground
                    style={Styles.ViewSub3}
                    source={require('../../image/iden1.png')}>
                    <Text style={Styles.TextSub3}>1</Text>
                  </ImageBackground>
                  <Text style={[Styles.TextSub4, {textAlign: 'center'}]}>
                    {I18n.t('translate_IdcardPass')}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#dadada',
                    height: 2,
                    width: '40%',
                    zIndex: 1,

                    top: 20,
                  }}
                />
                <View style={{alignItems: 'center', right: 30, zIndex: 99}}>
                  <ImageBackground
                    style={Styles.ImageBackgroundSub1}
                    source={require('../../image/unden2.png')}>
                    <Text style={Styles.TextSub3}>2</Text>
                  </ImageBackground>
                  <Text style={[Styles.TextSub4, {textAlign: 'center'}]}>
                    {I18n.t('translate_TakeFace')}
                  </Text>
                </View>
              </View>
            </View>
          )} */}
          {/*ขั้นที่1 */}

          {/*ขั้นที่2 */}
          {/* {Swich === 2 && (
            <View>
              <View style={Styles.ViewSub2}>
                <ImageBackground
                  style={Styles.ViewSub3}
                  source={require('../../image/iden1green.png')}>
                  <Text style={Styles.TextSub3}>1</Text>
                </ImageBackground>
                <View
                  style={{
                    backgroundColor: '#2d6dc4',
                    height: 2,
                    width: aspectRatio1,
                  }}
                />

                <ImageBackground
                  style={Styles.ViewSub6}
                  source={require('../../image/iden1.png')}>
                  <Text style={Styles.TextSub3}>2</Text>
                </ImageBackground>
              </View>
              <View style={[Styles.ViewSub4]}>
                <Text
                  style={[Styles.TextSub4, {textAlign: 'center', right: 20}]}>
                  {I18n.t('translate_IdcardPass')}
                </Text>
                <View
                  style={{flexDirection: 'row-reverse', width: aspectRatio2}}>
                  <Text style={Styles.TextSub5}>
                    {I18n.t('translate_TakeFace')}
                  </Text>
                </View>
              </View>
            </View>
          )} */}
          {/*ขั้นที่2 */}

          {/*ขั้นที่1 */}

          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                Styles.ViewSub8,
                {flex: 1, marginHorizontal: ViewScale(10), height: ViewScale(130)},
              ]}>
              {Img === null && (
                <View style={{alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    style={{width: ViewScale(155), height: ViewScale(122), top: ViewScale(4)}}
                    source={require('../../image/passportsample.png')}
                  />
                </View>
              )}
              {Img != null && (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: ViewScale(200), height: ViewScale(120), top: ViewScale(8)}}
                    source={{uri: url}}
                  />
                  <View
                    style={{
                      width: Platform.OS === 'ios' ? '50%' : '60%',
                      flexDirection: 'row-reverse',
                    }}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        setImg(null);
                      }}>
                      <Image
                        style={{width: 20, height: 20,top:-10,left:35}}
                        source={require('../../image/bindelete.png')}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
              )}
              {/* <View style={{alignItems: 'center', marginTop: 10}}>
                  <TouchableOpacity
                    disabled={Img != null}
                    onPress={() => {
                      pageSet(1);
                      setTimeout(() => {
                        RBsheet1.open();
                      }, 200);
                    }}
                    style={Styles.ViewSub9}>
                    <View style={Styles.ViewSub10}>
                      <Icon name="add-a-photo" size={45} color="#ffffff" />
                    </View>
                  </TouchableOpacity>
                </View> */}
            </View>
            <View style={{flex: 0.5, marginHorizontal: ViewScale(8)}}>
              {/* <TouchableOpacity
                    disabled={Img != null}
                    onPress={() => {
                      pageSet(1);
                      setTimeout(() => {
                        RBsheet1.open();
                      }, 200);
                    }}
                    style={{}}>
                    <View style={{}}>
                      <Icon name="add-a-photo" size={45} color="#ffffff" />
                    </View>
                  </TouchableOpacity> */}
              {checknewupload === false ? (
                <TouchableOpacity
                  // disabled={Img != null}
                  onPress={() => {
                    pageSet(1);
                    setchecknewupload(true);
                    setTimeout(() => {
                      RBsheet1.open();
                    }, 200);
                  }}>
                  <LinearGradient
                    style={{height: ViewScale(130), borderRadius: ViewScale(8)}}
                    start={{x: 0.1, y: 1}}
                    end={{x: 0.7, y: 0.3}}
                    colors={['#3986ee', '#9c7df6']}>
                    <View style={{flex: 0.8, alignSelf: 'center', top: ViewScale(30)}}>
                      <Icon name="add-a-photo" size={ViewScale(65)} color="#ffffff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    pageSet(1);
                    setchecknewupload(false);
                    setTimeout(() => {
                      setImg(null);

                      RBsheet1.open();
                    }, 200);
                  }}>
                <LinearGradient
                    style={{height: ViewScale(130), borderRadius: ViewScale(8)}}
                    start={{x: 0.1, y: 1}}
                    end={{x: 0.7, y: 0.3}}
                    colors={['#3986ee', '#9c7df6']}>
                    <View style={{flex: 0.8, alignSelf: 'center', top: ViewScale(30)}}>
                      <Icon name="add-a-photo" size={ViewScale(65)} color="#ffffff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/*ขั้นที่1 */}

          {/*ขั้นที่2 */}
          <View style={{flex: 1, marginHorizontal: ViewScale(10), top: ViewScale(10)}}>
            <Text style={{color: '#163c70', fontSize: ViewScale(24)}}>
              รูปหน้าตรงคู่บัตรประจำตัวประชาชน / Passport 
            </Text>
          </View>
          <View style={{flexDirection: 'row', top: ViewScale(10)}}>
            <View style={[Styles.ViewSub8, {flex: 1, marginHorizontal: ViewScale(10)}]}>
              {Img2 === null && (
                <View style={{alignItems: 'center', marginBottom: ViewScale(5)}}>
                  <Image
                    // style={Styles.ImageSub3}
                    resizeMode={'contain'}
                    style={{width: ViewScale(200), height: ViewScale(110), top: ViewScale(8)}}
                    source={require('../../image/PPER.png')}
                  />
                </View>
              )}
              {Img2 != null && (
                <View style={{alignItems: 'center'}}>
                  <Image
                    // resizeMode="cover"
                    // style={Styles.ImageSub7}
                    resizeMode={'contain'}
                    style={{width: ViewScale(200), height: ViewScale(120), top: ViewScale(8)}}
                    source={{uri: url2}}
                  />
                  {/* <View style={Styles.ViewSub14}>
                    <TouchableOpacity
                      onPress={() => {
                        setImg2(null);
                      }}>
                      <Image
                        style={Styles.ImageSub8}
                        source={require('../../image/bindelete.png')}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
              )}
            </View>
            <View style={{flex: 0.5, marginHorizontal: ViewScale(8)}}>
              {/* <View style={{alignItems: 'center', marginTop: 10}}>
                    <TouchableOpacity
                      disabled={Img2 != null}
                      style={Styles.ViewSub9}
                      onPress={() => {
                        pageSet(2);
                        setTimeout(() => {
                          RBsheet1.open();
                        }, 200);
                      }}>
                      <View style={Styles.ViewSub10}>
                        <Icon name="add-a-photo" size={45} color="#ffffff" />
                      </View>
                    </TouchableOpacity>
                  </View> */}
              {checknewupload2 === false ? (
                <TouchableOpacity
                  // disabled={Img2 != null}
                  onPress={() => {
                    pageSet(2);
                    setchecknewupload2(true);
                    setTimeout(() => {
                      RBsheet1.open();
                    }, 200);
                  }}>
                  <LinearGradient
                    style={{height: ViewScale(130), borderRadius: ViewScale(8)}}
                    start={{x: 0.1, y: 1}}
                    end={{x: 0.7, y: 0.3}}
                    colors={['#3986ee', '#9c7df6']}>
                    <View style={{flex: 0.8, alignSelf: 'center', top: ViewScale(30)}}>
                      <Icon name="add-a-photo" size={ViewScale(65)} color="#ffffff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  // disabled={Img2 != null}
                  onPress={() => {
                    pageSet(2);
                    setchecknewupload2(false);
                    setTimeout(() => {
                      setImg2(null);
                      RBsheet1.open();
                    }, 200);
                  }}>
                <LinearGradient
                    style={{height: ViewScale(130), borderRadius: ViewScale(8)}}
                    start={{x: 0.1, y: 1}}
                    end={{x: 0.7, y: 0.3}}
                    colors={['#3986ee', '#9c7df6']}>
                    <View style={{flex: 0.8, alignSelf: 'center', top: ViewScale(30)}}>
                      <Icon name="add-a-photo" size={ViewScale(65)} color="#ffffff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/*ขั้นที่2 */}

          {/*ขั้นที่2 */}
          {/* {Swich === 1 && (
            <View style={{alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity
                disabled={!(Img != null)}
                onPress={() => setSwich(2)}
                style={Img ? Styles.TocuhSub1 : Styles.TocuhSub2}>
                <Text style={Styles.TextSub7}>{I18n.t('translate_Next')}</Text>
              </TouchableOpacity>
            </View>
          )} */}
          {/* {Swich === 2 && ( */}
          <View style={{alignItems: 'center', marginTop: ViewScale(25)}}>
            <TouchableOpacity
              disabled={Img === null || Img2 === null ? true : false}
              onPress={() => {
                _SendDocIden();
                setTimeout(() => {
                  setAccept(true);
                  setSwich(1);
                }, 200);
              }}
              style={
                Img === null || Img2 === null
                  ? Styles.TocuhSub2
                  : Styles.TocuhSub1
              }>
              <Text style={Styles.TextSub7}>{I18n.t('translate_Accept')}</Text>
            </TouchableOpacity>
          </View>
          {/* )} */}
        </View>
        <View style={{alignItems: 'center', marginTop: ViewScale(25)}} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  null,
)(IdentityScreen);
