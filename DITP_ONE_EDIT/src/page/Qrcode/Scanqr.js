import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import {getTokenQr} from '../../actions/data.actions';
import I18n from '../../utils/I18n';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import { ViewScale } from '../../config/ViewScale';
const Scanqr = ({
  getUser,
  getImg,
  authData,
  dispatch,
  getTokenQr,
  navigation,
}) => {
  const [Scan, setScan] = useState(require('../../image/scanqr.png'));
  const [SelecIndex, setSelecIndex] = useState(2);
  const [name, setname] = useState();
  const [TokenQr, setTokenQr] = useState();
  const handleIndexChange = (index, number) => {
    setSelecIndex(index);
  };

  function Phonenumber(tel) {
    return (
      tel.substring(0, 3) +
      '-' +
      tel.substring(3, 6) +
      '-' +
      tel.substring(6, 10)
    );
  }

  return (

    
   
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'traparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: ViewScale(60),
            }}
            tabLabel="QR ของฉัน">
            {getUser.userDetails.res_result.type === 6 && (
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <Avatar
                  containerStyle={{bottom: ViewScale(50)}}
                  size={ViewScale(101)}
                  source={{
                    uri: getImg.isSuccess
                      ? getImg.img
                      : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                  }}
                  rounded
                />
                <View style={{bottom: ViewScale(30), alignItems: 'center'}}>
                  <Text style={{fontSize: ViewScale(24), color: '#163c70'}}>
                    {getUser.userDetails.res_result.title_th +
                      ' ' +
                      getUser.userDetails.res_result.name_th +
                      ' ' +
                      getUser.userDetails.res_result.lastname_th}
                  </Text>
                  <Text style={{fontSize: ViewScale(22), color: '#4b4b4b'}}>
                    {getUser.userDetails.res_result.agency}
                  </Text>

                  <View style={{marginTop: ViewScale(10)}}>
                    <QRCode
                      value={
                        'http://one.ditp.go.th/qr/' +
                        getTokenQr.TokenQr.res_result.token_code
                        // ssoid: getUser.userDetails.res_result.id,
                        // type: 2,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // Token: getTokenQr.TokenQr.res_result.token_code,
                        // profile: getImg.isSuccess
                        //   ? getImg.img
                        //   : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                        // positon: getUser.userDetails.res_result.agency,
                        // name:
                        //   getUser.userDetails.res_result.title_th +
                        //   ' ' +
                        //   getUser.userDetails.res_result.name_th +
                        //   ' ' +
                        //   getUser.userDetails.res_result.lastname_th,
                      }
                      size={ViewScale(270)}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              </View>
            )}
            {getUser.userDetails.res_result.type === 1 && (
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  
                  borderRadius: ViewScale(8),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  
                  elevation: 4,
                }}>
                <Avatar
                  containerStyle={{bottom: ViewScale(50)}}
                  size={ViewScale(101)}
                  source={{
                    uri: getImg.isSuccess
                      ? getImg.img
                      : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                  }}
                  rounded
                />
                <View style={{bottom: ViewScale(30), alignItems: 'center'}}>
                  <Text style={{fontSize: ViewScale(24), color: '#163c70'}}>
                    {getUser.userDetails.res_result.sub_member.titleTh +
                      ' ' +
                      getUser.userDetails.res_result.sub_member.nameTh +
                      ' ' +
                      getUser.userDetails.res_result.sub_member.lastnameTh}
                  </Text>
                  <Text style={{fontSize: ViewScale(22), color: '#4b4b4b'}}>
                    บริษัท{'  '}
                    {getUser.userDetails.res_result.company.nameTh} 
                  
                  </Text>
                  {/* <Text style={{fontSize: 22, color: '#4b4b4b'}}>
                    {getUser.userDetails.res_result.naturalId}
                  </Text> */}
                  {/* <Text style={{fontSize: 22, color: '#4b4b4b'}}>
                    {Phonenumber(getUser.userDetails.res_result.sub_member.tel)}
                  </Text> */}
                  <View style={{marginTop: ViewScale(10)}}>
                    <QRCode
                      value={
                        'http://one.ditp.go.th/qr/' +
                        getTokenQr.TokenQr.res_result.token_code
                        // type: 1,
                        // membertype: 1,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // Token: getTokenQr.TokenQr.res_result.token_code,
                        // Check: true,
                        // type: 1,
                        // ssoid: getUser.userDetails.res_result.ssoid,
                        // Screen: 'ViewAdd',
                        // profile: getImg.isSuccess
                        //   ? getImg.img
                        //   : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                        // name:
                        //   getUser.userDetails.res_result.sub_member.titleEn +
                        //   getUser.userDetails.res_result.sub_member.nameEn +
                        //   ' ' +
                        //   getUser.userDetails.res_result.sub_member.lastnameEn,
                      }
                      size={ViewScale(270)}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              </View>
            )}
            {getUser.userDetails.res_result.type === 2 && (
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <Avatar
                  containerStyle={{bottom: ViewScale(50)}}
                  size={ViewScale(101)}
                  source={{
                    uri: getImg.isSuccess
                      ? getImg.img
                      : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                  }}
                  rounded
                />
                <View style={{bottom: ViewScale(30), alignItems: 'center'}}>
                  <Text style={{fontSize: ViewScale(24), color: '#163c70'}}>
                    {getUser.userDetails.res_result.sub_member.titleEn +
                      ' ' +
                      getUser.userDetails.res_result.sub_member.nameEn +
                      ' ' +
                      getUser.userDetails.res_result.sub_member.lastnameEn}
                  </Text>

                  <Text style={{fontSize: ViewScale(22), color: '#4b4b4b'}}>
                    {getUser.userDetails.res_result.agency}
                  </Text>

                  <View style={{marginTop: ViewScale(10)}}>
                    <QRCode
                      value={
                        'http://one.ditp.go.th/qr/' +
                        getTokenQr.TokenQr.res_result.token_code

                        // type: 1,
                        // membertype: 1,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // Token: getTokenQr.TokenQr.res_result.token_code,
                        // Check: true,
                        // type: 1,
                        // ssoid: getUser.userDetails.res_result.ssoid,
                        // Screen: 'ViewAdd',
                        // profile: getImg.isSuccess
                        //   ? getImg.img
                        //   : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                        // name:
                        //   getUser.userDetails.res_result.sub_member.titleEn +
                        //   getUser.userDetails.res_result.sub_member.nameEn +
                        //   ' ' +
                        //   getUser.userDetails.res_result.sub_member.lastnameEn,
                      }
                      size={ViewScale(270)}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              </View>
            )}
            {getUser.userDetails.res_result.type === 4 && (
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <Avatar
                  containerStyle={{bottom: ViewScale(50)}}
                  size={ViewScale(101)}
                  source={{
                    uri: getImg.isSuccess
                      ? getImg.img
                      : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                  }}
                  rounded
                />
                <View style={{bottom: ViewScale(30), alignItems: 'center'}}>
                  <Text style={{fontSize: ViewScale(24), color: '#163c70'}}>
                    {getUser.userDetails.res_result.member.titleEn +
                      ' ' +
                      getUser.userDetails.res_result.member.nameEn +
                      ' ' +
                      getUser.userDetails.res_result.member.lastnameEn}
                  </Text>

                  {/* <Text style={{fontSize: 22, color: '#4b4b4b'}}>
                  {getUser.userDetails.res_result.agency}
                </Text> */}
                  <View style={{marginTop: ViewScale(10)}}>
                    <QRCode
                      value={
                        'http://one.ditp.go.th/qr/' +
                        getTokenQr.TokenQr.res_result.token_code
                        // type: 1,
                        // membertype: 1,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // Token: getTokenQr.TokenQr.res_result.token_code,
                        // type: 1,
                        // membertype: 1,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // profile: getImg.isSuccess
                        //   ? getImg.img
                        //   : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                        // ssoid: getUser.userDetails.res_result.ssoid,
                        // name:
                        //   getUser.userDetails.res_result.member.titleEn +
                        //   getUser.userDetails.res_result.member.nameEn +
                        //   ' ' +
                        //   getUser.userDetails.res_result.member.lastnameEn,
                      }
                      size={ViewScale(270)}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              </View>
            )}
            {getUser.userDetails.res_result.type === 3 && (
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <Avatar
                  containerStyle={{bottom: ViewScale(50)}}
                  size={ViewScale(101)}
                  source={{
                    uri: getImg.isSuccess
                      ? getImg.img
                      : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                  }}
                  rounded
                />
                <View style={{bottom: ViewScale(30), alignItems: 'center'}}>
                  <Text style={{fontSize: ViewScale(24), color: '#163c70'}}>
                    {getUser.userDetails.res_result.member.titleTh +
                      ' ' +
                      getUser.userDetails.res_result.member.nameTh +
                      ' ' +
                      getUser.userDetails.res_result.member.lastnameTh}
                  </Text>
                  {/* <Text
                   
                    style={{fontSize: 22, color: '#4b4b4b'}}>
                    {Phonenumber(getUser.userDetails.res_result.member.tel)}
                  </Text> */}

                  <View style={{marginTop: ViewScale(10)}}>
                    <QRCode
                      value={
                        'http://one.ditp.go.th/qr/' +
                        getTokenQr.TokenQr.res_result.token_code
                        // type: 1,
                        // membertype: 1,
                        // Check: true,
                        // Screen: 'ViewAdd',
                        // Token: getTokenQr.TokenQr.res_result.token_code,
                        // type: 1,
                        // naturalId: getUser.userDetails.res_result.naturalId,
                        // ssoid: getUser.userDetails.res_result.ssoid,
                        // Check: true,
                        // phonenumber: Phonenumber(
                        //   getUser.userDetails.res_result.member.tel,
                        // ),
                        // Screen: 'ViewAdd',
                        // profile: getImg.isSuccess
                        //   ? getImg.img
                        //   : 'https://p7.hiclipart.com/preview/495/472/46/computer-icons-user-profile-password-login-end-user.jpg',
                        // name:
                        //   getUser.userDetails.res_result.member.titleTh +
                        //   getUser.userDetails.res_result.member.nameTh +
                        //   ' ' +
                        //   getUser.userDetails.res_result.member.lastnameTh,
                      }
                      size={ViewScale(270)}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
          <View
                style={{

                  marginBottom:ViewScale(15),
                  flex:1,
                  height:ViewScale(44),
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  marginHorizontal:ViewScale(20),
                  marginTop:ViewScale(15),
                  borderRadius: ViewScale(8),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.20,
                  shadowRadius: 1.41,
                  elevation: 2,
                  justifyContent:'center',
                  flexDirection:'row'
                
                }}>
                  <Icon3 name='infocirlce' style={{color:'#2d6dc4',marginHorizontal:ViewScale(10)}} />
                  <Text style={{color:'#40536d',fontSize:ViewScale(20)}}>QR Code สำหรับสแกนเข้าร่วมกิจกรรม หรือเพิ่มเพื่อน</Text>
                  </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  getImg: state.authReducer.getImg,
  authData: state.authReducer.authData,
  getTokenQr: state.dataReducer.getTokenQr,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scanqr);
