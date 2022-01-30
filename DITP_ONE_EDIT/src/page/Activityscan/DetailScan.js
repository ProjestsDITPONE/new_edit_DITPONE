import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Styles from '../ProfileActivity/Styles';
import {Avatar} from 'react-native-elements';
import I18n from '../../utils/I18n';
const DetailScan = ({getUserScan}) => {
  const width = Dimensions.get('window').width;

  function formatdate(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = dd + '/' + mm + '/' + yyyy;
    return date.toString();
  }

  function idcard(naturalId) {
    return (
      naturalId.substring(0, 1) +
      '-' +
      naturalId.substring(1, 5) +
      '-' +
      naturalId.substring(5, 10) +
      '-' +
      naturalId.substring(10, 12) +
      '-' +
      naturalId.substring(12, 13)
    );
  }

  function Phonenumber(tel) {
    return (
      tel.substring(0, 3) +
      ' ' +
      tel.substring(3, 6) +
      ' ' +
      tel.substring(6, 10)
    );
  }

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      {getUserScan.isSuccess === true && (
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={Styles.ViewSub1}>
              <ImageBackground
                style={Styles.ImageBackground}
                source={require('../../image/onelogo.png')}>
                <Avatar
                  containerStyle={Styles.AvatarContainer}
                  size={101}
                  overlayContainerStyle={{
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                  }}
                  rounded
                  source={{uri: getUserScan.isResult.img_profile}}
                />
              </ImageBackground>
            </View>

            <View style={[Styles.ViewSub2, {marginTop: 30}]}>
              {getUserScan.isResult.res_result.company != undefined ? (
                <View style={Styles.ViewSub3}>
                  <Text style={Styles.TextCompany}>
                    {I18n.locale === 'th'
                      ? getUserScan.isResult.res_result.company.nameTh
                      : getUserScan.isResult.res_result.company.nameEn}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              <View style={Styles.ViewSub4}>
                {getUserScan.isResult.status_ditp.status === 'active ditp' ? (
                  <View style={Styles.ViewSub5}>
                    <Text style={{color: '#ffffff', fontSize: 18}}>
                      {I18n.t('translate_Member')} {getUserScan.isResult.status_ditp.nameEn}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <View style={{flexDirection: 'row', top: 5, marginTop: 0}}>
                <Text style={Styles.fonttextMember}>
                  {I18n.t('translate_Datemembership')}
                  {'  '}
                </Text>
                <Text style={Styles.fonttextMember}>
                  {getUserScan.isResult.res_result.create_date}
                </Text>
              </View>
            </View>

            <View style={[Styles.ViewSub22, {marginBottom: 20}]}>
              <ImageBackground
                imageStyle={Styles.ImageBackgroundEdite}
                resizeMode="cover"
                style={{
                  alignItems: 'center',
                }}
                source={require('../../image/backgroudedit2.png')}>
                {getUserScan.isResult.res_result.type != undefined ? (
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 15,
                    }}>
                    {getUserScan.isResult.res_result.type === 1 && (
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Juristic_ID_Profile')}
                      </Text>
                    )}

                    {getUserScan.isResult.res_result.type === 3 && (
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Idcard')}
                      </Text>
                    )}

                    {getUserScan.isResult.res_result.type === 2 && (
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Juristic_ID_Profile')}
                      </Text>
                    )}
                    {getUserScan.isResult.res_result.type === 4 && (
                      <Text style={Styles.TextSub1}>ID Card/Passport</Text>
                    )}

                    <Text style={Styles.TextSub1}>
                      {idcard(getUserScan.isResult.res_result.naturalId)}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </ImageBackground>
              {getUserScan.isResult.res_result.company != undefined && (
                <View style={[Styles.marginTop8]}>
                  <ImageBackground
                    resizeMode="cover"
                    imageStyle={Styles.ImageBackgroundEdite}
                    style={{
                      alignItems: 'center',
                    }}
                    source={require('../../image/backgroudedit2.png')}>
                    <View
                      style={{
                        width: '90%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <Text style={Styles.TextSub1}>
                        {'   '}
                        {I18n.t('translate_Nameentity')}
                      </Text>
                      <Text style={Styles.TextSub1}>
                        {'   '}

                        {getUserScan.isResult.res_result.type === 1
                          ? getUserScan.isResult.res_result.company.nameTh
                          : getUserScan.isResult.res_result.company.nameEn}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
              {getUserScan.isResult.res_result.type === 1 && (
                <ImageBackground
                  imageStyle={Styles.ImageBackgroundEdite}
                  style={{
                    resizeMode: 'cover',
                    alignItems: 'center',
                  }}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Corporate')}
                    </Text>
                    <Text style={Styles.TextSub3}>
                      {getUserScan.isResult.res_result.addressTh.address}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.subdistrict}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.district}{' '}
                      {getUserScan.isResult.res_result.addressTh.province}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.postcode}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              {getUserScan.isResult.res_result.type === 1 && (
                <ImageBackground
                  imageStyle={Styles.ImageBackgroundEdite}
                  style={{
                    resizeMode: 'cover',
                    alignItems: 'center',
                  }}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 0,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Contactaddress')}
                    </Text>
                    <Text style={Styles.TextSub3}>
                      {getUserScan.isResult.res_result.contact.address}
                      {'  '}
                      {getUserScan.isResult.res_result.contact.subdistrict}
                      {'  '}
                      {getUserScan.isResult.res_result.contact.district}{' '}
                      {getUserScan.isResult.res_result.contact.province}
                      {'  '}
                      {getUserScan.isResult.res_result.contact.postcode}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              {getUserScan.isResult.res_result.type === 3 && (
                <ImageBackground
                  imageStyle={Styles.ImageBackgroundEdite}
                  style={{
                    resizeMode: 'cover',
                    alignItems: 'center',
                  }}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Contactaddress')}
                    </Text>
                    <Text style={Styles.TextSub3}>
                      {getUserScan.isResult.res_result.addressTh.address}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.subdistrict}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.district}{' '}
                      {getUserScan.isResult.res_result.addressTh.province}
                      {'  '}
                      {getUserScan.isResult.res_result.addressTh.postcode}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              {getUserScan.isResult.res_result.type === 2 && (
                <ImageBackground
                  imageStyle={Styles.ImageBackgroundEdite}
                  style={{
                    resizeMode: 'cover',
                    alignItems: 'center',
                  }}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Corporate')}
                    </Text>
                    <Text style={Styles.TextSub3}>
                      {getUserScan.isResult.res_result.address.address}
                      {'  '}
                      {getUserScan.isResult.res_result.address.country}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              <ImageBackground
                resizeMode={'cover'}
                source={require('../../image/editbackground5.png')}
                imageStyle={Styles.ImageBackgroundEdite}
                style={{alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: 0.5,
                    borderBottomWidth: 1,
                    width: '89%',
                    borderBottomColor: '#cccccc40',
                    shadowOffset: {
                      height: 0,
                      width: 1,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 0.9,
                  }}
                />
                <View style={{width: '80%', marginTop: 10}}>
                  <View>
                    <View>
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Prefix')}
                      </Text>
                      {getUserScan.isResult.res_result.sub_member !=
                      undefined ? (
                        <Text style={Styles.TextSub3}>
                          {getUserScan.isResult.res_result.sub_member.titleTh}
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub3}>
                          {getUserScan.isResult.res_result.member.titleTh}
                        </Text>
                      )}
                      <View style={{marginTop: 8}}>
                        <Text style={Styles.TextSub1}>
                          {I18n.t('translate_name')}
                        </Text>
                        {getUserScan.isResult.res_result.sub_member !=
                        undefined ? (
                          <Text style={Styles.TextSub3}>
                            {getUserScan.isResult.res_result.sub_member.nameTh}
                          </Text>
                        ) : (
                          <Text style={Styles.TextSub3}>
                            {getUserScan.isResult.res_result.member.nameTh}
                          </Text>
                        )}
                      </View>
                      <View style={{marginTop: 8}}>
                        <Text style={Styles.TextSub1}>
                          {I18n.t('translate_lname')}
                        </Text>
                        <View style={{marginLeft: 0}}>
                          {getUserScan.isResult.res_result.sub_member !=
                          undefined ? (
                            <Text style={Styles.TextSub3}>
                              {
                                getUserScan.isResult.res_result.sub_member
                                  .lastnameTh
                              }
                            </Text>
                          ) : (
                            <Text style={Styles.TextSub3}>
                              {
                                getUserScan.isResult.res_result.member
                                  .lastnameTh
                              }
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              {getUserScan.isResult.res_result.type === 1 && (
                <ImageBackground
                  resizeMode={'cover'}
                  imageStyle={{
                    width: '100%',
                    height: null,
                    marginTop: 0,
                  }}
                  style={{alignItems: 'center'}}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Idcard')}
                    </Text>
                    <Text style={Styles.TextSub1}>
                      {idcard(getUserScan.isResult.res_result.sub_member.cid)}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              {getUserScan.isResult.res_result.type === 2 && (
                <ImageBackground
                  resizeMode={'cover'}
                  imageStyle={{
                    width: '100%',
                    height: null,
                    marginTop: 0,
                  }}
                  style={{alignItems: 'center'}}
                  source={require('../../image/backgroudedit2.png')}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Idcard')}
                    </Text>
                    <Text style={Styles.TextSub1}>
                      {idcard(getUserScan.isResult.res_result.sub_member.cid)}
                    </Text>
                  </View>
                </ImageBackground>
              )}
              <ImageBackground
                resizeMode={'cover'}
                imageStyle={{
                  width: '100%',
                  height: null,
                  marginTop: 0,
                }}
                style={{alignItems: 'center'}}
                source={require('../../image/editbackground7.png')}>
                <View style={{left: 0, marginTop: 10, width: '80%'}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_email')}
                  </Text>
                  {getUserScan.isResult.res_result.sub_member != undefined ? (
                    <Text style={{fontSize: 18, color: '#73838f'}}>
                      {getUserScan.isResult.res_result.sub_member.email}
                    </Text>
                  ) : (
                    <Text style={{fontSize: 18, color: '#73838f'}}>
                      {getUserScan.isResult.res_result.member.email}
                    </Text>
                  )}
                  <View style={{marginTop: 8}}>
                    <Text style={Styles.TextSub1}>
                      {I18n.t('translate_Phonenumber')}
                    </Text>
                    {getUserScan.isResult.res_result.sub_member != undefined ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{marginLeft: 0}}>
                          <Image
                            style={{width: 20, height: 13}}
                            source={{
                              uri:
                                getUserScan.isResult.res_result.sub_member
                                  .tel_icon_country,
                            }}
                          />
                        </View>
                        <Text style={{fontSize: 18, color: '#73838f'}}>
                          {'  '}
                          {Phonenumber(
                            getUserScan.isResult.res_result.sub_member.tel,
                          )}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{marginLeft: 0}}>
                          <Image
                            style={{width: 20, height: 13}}
                            source={{
                              uri:
                                getUserScan.isResult.res_result.member
                                  .tel_icon_country,
                            }}
                          />
                        </View>
                        <Text style={{fontSize: 18, color: '#73838f'}}>
                          {'  '}
                          {Phonenumber(
                            getUserScan.isResult.res_result.member.tel,
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </ImageBackground>
              {getUserScan.isResult.res_result.type != 3 &&
                getUserScan.isResult.res_result.type != 4 && (
                  <ImageBackground
                    imageStyle={Styles.ImageBackgroundEdite}
                    resizeMode="cover"
                    style={{
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    source={require('../../image/backgroudedit2.png')}>
                    <View style={{width: '80%'}}>
                      <Text style={Styles.TextSub1}>
                        {I18n.t('translate_Awards')}
                      </Text>
                    </View>
                    <View style={{alignSelf: 'center', margin: 10}}>
                      <Text style={{fontSize: 24, color: '#cad8e1'}}>
                        {I18n.t('translate_NotAwards')}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        width: '89%',
                        borderBottomColor: '#cccccc40',
                        shadowOffset: {
                          height: 0,
                          width: 1,
                        },
                        shadowRadius: 4,
                        shadowOpacity: 0.9,
                      }}
                    />
                  </ImageBackground>
                )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getUserScan: state.dataReducer.getUserScan,
});

export default connect(
  mapStateToProps,
  null,
)(DetailScan);
