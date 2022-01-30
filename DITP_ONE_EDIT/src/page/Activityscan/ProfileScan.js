import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import I18n from '../../utils/I18n';
import styles from '../Home/Styles';
import {getinfoActivity, SaveAct} from '../../actions/data.actions';
import {connect} from 'react-redux';
const ProfileScan = ({
  route,
  getCid,
  dispatch,
  authData,
  getUser,
  navigation,
}) => {
  const [profile, setProfile] = useState();
  const [name, setname] = useState();
  const [company, setcompany] = useState();
  const [naturalId, setnaturalId] = useState();
  const [cid, setcid] = useState();
  const [Status, setStatus] = useState();
  const [type, settype] = useState();
  const [course_id, setcourse_id] = useState();
  const _getinfoActivity = async values => {
    try {
      const response = await dispatch(
        getinfoActivity({
          result: {
            token_code: getCid.isResult.Token,
            course_id: getCid.isResult.id,
            // token_code: "1d333338d85d30c1fb93dc7091e2be3f6e229426",
            // course_id: 11000,
          },
          Authorization: authData.token.res_result.token,
        }),
      );
      console.log(response);

      if (response.res_code == '00') {
        setProfile(response.img_profile);
        setname(response.res_result);
        setcid(response.res_result);
        setStatus(response);
        setcompany(response.res_result.company.nameTh);
        setnaturalId(response.res_result.naturalId);
        setcourse_id(response.course_id);
      }
    } catch (error) {}
  };

  const _SaveAct = async values => {
    try {
      console.log(values);
      const response = await dispatch(
        SaveAct({
          result: {
            id_list: getCid.isResult.id,
            ssoid: Status.res_result.ssoid,
            type: values,
            //  staff_id:
            staff_name: getUser.userDetails.res_result.name_th,
            status: getUser.userDetails.res_result.status,
            cid: getCid.isResult.cid,
            course_id: course_id,
          },
          Authorization: authData.token.res_result.token,
        }),
      );
      if (response.res_text == 'success !') {
        navigation.navigate('Scanact');
      } else {
        Alert.alert(response.res_text);
      }
      console.log('มา', response);
    } catch (error) {}
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  useEffect(() => {
    _getinfoActivity();
  }, []);
  //  console.log(name);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../image/BGProfileLogo.png')}
          style={{width: 130, height: 130, resizeMode: 'stretch'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Avatar
              containerStyle={{
                // bottom: 50,
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}
              size={120}
              rounded
              source={{
                uri: profile,
              }}
            />
          </View>
        </ImageBackground>

        <View style={{bottom: -30, alignItems: 'center'}}>
          {name != undefined ? (
            <View>
              {name.member != undefined && (
                <Text style={{fontSize: 24, color: '#163c70'}}>
                  {name.member.titleTh +
                    name.member.nameTh +
                    ' ' +
                    name.member.lastnameTh}
                </Text>
              )}
            </View>
          ) : (
            <View />
          )}
          {name != undefined ? (
            <View>
              {name.sub_member != undefined && (
                <Text style={{fontSize: 24, color: '#163c70'}}>
                  {name.sub_member.titleTh +
                    name.sub_member.nameTh +
                    ' ' +
                    name.sub_member.lastnameTh}
                </Text>
              )}
            </View>
          ) : (
            <View />
          )}
          {company != undefined && (
            <Text style={{fontSize: 25, color: '#4b4b4b'}}>{company}</Text>
          )}
          {cid != undefined && (
            <View>
              {cid.type === 1 ? (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('translate_Juristic_ID')} : {naturalId}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
          {cid != undefined && (
            <View>
              {cid.type === 2 ? (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('translate_Juristic_ID')} : {naturalId}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
          {cid != undefined && (
            <View>
              {cid.type === 1 ? (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('cid_regis')} : {cid.sub_member.cid}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
          {cid != undefined && (
            <View>
              {cid.type === 2 ? (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('cid_regis')} : {cid.sub_member.cid}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          )}

          {cid != undefined ? (
            <View>
              {cid.type === 3 && (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('cid_regis')} : {cid.naturalId}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View />
          )}
          {cid != undefined ? (
            <View>
              {cid.type === 4 && (
                <View>
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {I18n.t('cid_regis')} : {cid.naturalId}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View />
          )}
          <View style={{marginTop: 10}} />
        </View>
      </View>
      {Status != undefined && (
        <View>
          {Status.status_drive === false ? (
            <View style={{alignItems: 'center'}}>
              <View style={{marginTop: 40}}>
                <Text style={{fontSize: 20, color: '#b1b1b1'}}>
                  {I18n.t('transalte_not_registration')}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => _SaveAct(2)}
                  style={{
                    width: width * 0.45,
                    height: height * 0.05,
                    backgroundColor: '#f96145',
                    borderRadius: 24.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: '#ffffff'}}>
                    {I18n.locale === 'th' ? 'ลงทะเบียน Walk in' : 'Register Wolk In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 13, height: 13}}
                  source={require('../../image/AcceptAct.png')}
                />
                <Text style={{fontSize: 20, color: '#029d00'}}>
                  {'\t'}{I18n.locale === 'th' ? 'ลงทะเบียน Walk in' : 'Register Wolk In'}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => _SaveAct(1)}
                  style={{
                    width: width * 0.45,
                    height: height * 0.05,
                    backgroundColor: '#2d6dc4',
                    borderRadius: 24.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: '#ffffff'}}>
                    {I18n.t('transalte_confirmation_participation')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getCid: state.dataReducer.getCid,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScan);
