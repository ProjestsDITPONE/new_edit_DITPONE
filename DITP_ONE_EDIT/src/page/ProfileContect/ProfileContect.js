import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import {Avatar, Overlay} from 'react-native-elements';
import {SendNoteMem} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import I18n from '../../utils/I18n';
//icon
import Icon from 'react-native-vector-icons/Feather';
import Styles from './Styles';
import Headers from '../../components/Headers';
import CountryPicker from '../../lib_edit/react-native-country-picker-modal';
import LinearGradient from 'react-native-linear-gradient';

const ProfileContect = ({route, navigation, authData, dispatch, getUser}) => {
  //paramiter
  const name = route.params.name;
  const work = route.params.work;
  const imgPro = route.params.imgPro;
  const [img, setimg] = useState(imgPro);

  const position = route.params.position;
  const dateTime = route.params.date;

  const address = route.params.address;
  const amper = route.params.amper;
  const tumbun = route.params.tumbun;
  const city = route.params.city;
  const zibcode = route.params.zibcode;
  const ShowData = route.params.ShowData;
  const email = route.params.email;
  const phone = route.params.phone;
  const Country = route.params.Country;
  const ActtivityMeet = route.params.ActtivityMeet;
  const note = route.params.note;
  const type = route.params.type;
  const ssoid = route.params.ssoid;
  const member_type = route.params.member_type;
  const id = route.params.id;
  const from = route.params.from;
  const nick_namne = route.params.nick_namne;
  const lastname = route.params.lastname;
  const MRname = route.params.MRname;
 
  // const tel_country_code = route.params.tel_country_code,
  // const tel_code = route.params.tel_code

  ///////////////
  const [Activty, setActivity] = useState(false);
  const [enote, setenote] = useState(false);
  const [notee, setnotee] = useState(note);
  const [countryCode, setcountryCode] = useState('TH');
  const [CountryCodePhone, setCountryCodePhone] = useState('(+66)');
  const [nametitle,setnametitle]=useState(null)
  // const [ openphonenumber,setopenphonenumber] = useState(false)

  // useEffect(() => {
  //   try {
  //     setnametitle(
  //       getUser.userDetails.res_result.member != undefined
  //         ? getUser.userDetails.res_result.member.titleTh
  //         : getUser.userDetails.res_result.sub_member.titleTh,
  //     );
  //   } catch (error) {}
  // }, []);

  const _SendNoteMem = async values => {
    try {
      const Token = authData.token;
      var tokenActivity = '';
      var typee = null;
      if (getUser.userDetails.res_result.type == 6) {
        tokenActivity = authData.token.res_result.token;
      } else {
        tokenActivity = authData.token;
      }
      console.log();
      const response = await dispatch(
        SendNoteMem({
          results: {
            // member_ssoid: ssoid,
            type: type,
            note: notee,
            member_type: member_type,
            type_from: from,
            id: id,
            nick_namne: nick_namne === '' ? '' : nick_namne,
          },
          token: tokenActivity,
          type: getUser.userDetails.res_result.type,
        }),
      );
      if (response.res_text === 'success !') {
        this._getBasket();
      }
      console.log('บันทึกโน้ต', response);
    } catch (error) {}
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
  function PhoneNum(item) {
    var phone =
      CountryCodePhone +
      ' ' +
      item.substring(1, 3) +
      item.substring(3, 6) +
      ' ' +
      item.substring(6, 10);

    return phone;
  }

  return (
    <View style={Styles.SafeArea}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      {enote === true && (
        <Overlay
          onBackdropPress={() => setenote(false)}
          overlayStyle={Styles.Overlay}
          isVisible>
          <View style={Styles.ViewOverlay}>
            <View style={Styles.ViewOerlay2}>
              <View style={Styles.ViewOverlay3}>
                <TouchableOpacity onPress={() => setenote(false)}>
                  <Icon name="x" size={16} style={Styles.Iconoverlay} />
                </TouchableOpacity>
              </View>
              <Text style={Styles.TextOverlay}>{name}</Text>
              <Text style={Styles.TextOverlay2}>{work}</Text>
            </View>
            <View style={Styles.ViewOverlay5}>
              <Text style={Styles.TextOverlay3}>Note :</Text>
              <View style={Styles.ViewOverlay4}>
                <TextInput
                  defaultValue={notee}
                  style={Styles.TextInputOverlay}
                  onChangeText={setnotee}
                />
              </View>
            </View>
            <View style={Styles.ViewOverlay6}>
              <TouchableOpacity
                style={Styles.TouchOverlay}
                onPress={() => {
                  setenote(false);
                  _SendNoteMem();
                }}>
                <Text style={Styles.TouchOverlay2}>
                  {I18n.t('translate_Save')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      )}
      <View style={{zIndex: -1, flex: 1}}>
        <ScrollView contentContainerStyle={{marginTop: 20}}>
          <View style={Styles.ViewSub1}>
            <LinearGradient
              style={{borderRadius: 65}}
              colors={['#865ff7', '#1e4af1']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              {imgPro != null && (
                <Avatar
                  // containerStyle={Styles.containerAvatar}
                  size={110}
                  source={{uri: imgPro}}
                  rounded
                  overlayContainerStyle={Styles.OverlayAvatar}
                />
              )}
            </LinearGradient>
            {imgPro === null && (
              <LinearGradient
                style={{borderRadius: 65}}
                colors={['#865ff7', '#1e4af1']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Avatar
                  size={113}
                  rounded
                  icon={{
                    name: 'photo-camera',
                    type: 'material',
                    color: '#dadde0',
                    size: 36,
                  }}
                  // overlayContainerStyle={Styles.OverlayAvatar2}
                  overlayContainerStyle={Styles.OverlayAvatar}
                  activeOpacity={0.7}
                />
              </LinearGradient>
            )}

            <View style={Styles.ViewSubScroll}>
              <View style={Styles.marginTop10}>
                <Text style={Styles.Textname}>
                  {/* นางสาว สงกราน เพื่องฟู */}
                  {name}
                </Text>
              </View>
              {/* {position != '' ? (
              <Text style={Styles.Textposition}>({position})</Text>
            ) : (
              <View />
            )} */}

              {work != '' ? (
                <Text style={Styles.TextWork}>{work}</Text>
              ) : (
                <View />
              )}

              <View style={Styles.ViewDate}>
                <Text style={Styles.TextDate}>
                  {I18n.t('translate_Ondate')}
                </Text>
                <Text style={Styles.TextDate2}> {dateTime}</Text>
              </View>
            </View>
          </View>

          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              paddingBottom: 0,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                ชื่อเล่น
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {name}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 150}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              paddingBottom: 1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                ชื่อนิติบุคคล
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {work}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 150}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
              // paddingBottom: 10,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                ที่อยู่ติดต่อ
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {address}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                คำนำหน้า
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {MRname}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                ชื่อ
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {name}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                นามสกุล
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {lastname}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                ตำแหน่ง
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {'ผู้จัดการฝ่ายขาย'}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                อีเมล์
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {email}
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                หมายเลขโทรศัพท์
              </Text>
              <View style={{flexDirection: 'row', marginHorizontal: 30}}>
                <CountryPicker
                  // close={this.setState({openphonenumber: false})}
                  containerButtonStyle={{bottom: 0}}
                  countryCode={countryCode}
                  withFlag={true}
                  withFilter={true}
                  withEmoji={true}
                  withCallingCode={true}
                  withAlphaFilter={false}
                  onSelect={iii => {
                    console.log('OKOOKOK', iii);
                    this.onSelect(iii);
                  }}
                  // visible={openphonenumber}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#73838f',
                  }}>
                  {PhoneNum(phone)}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../image/bgregister.png')}
            resizeMode={'stretch'}
            imageStyle={{width: '100%', height: 130}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth:1,
              marginBottom: 85,
            }}>
            <View style={{flex: 1, marginTop: 25}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',

                  marginHorizontal: 35,
                }}>
                Note:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 22,
                    color: '#73838f',
                    marginHorizontal: 35,
                    marginTop: 0,
                    flex: 1,
                  }}>
                  {notee}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 0.2,
                  }}
                  onPress={() => setenote(true)}>
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../image/penx.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContect);
