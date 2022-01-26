import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import I18n from '../../utils/I18n';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar, Header} from 'react-native-elements';
import {SendMemberBuy} from '../../actions/auth.actions';
import {getInfoQrcode, SETID} from '../../actions/data.actions';

const QRscreen = ({navigation, route, dispatch, authData, getUser}) => {
  const [Info, setInfo] = useState();
  // const name = route.params.name;
  // const profile = route.params.profile;
  // const company = route.params.company;
  // const naturalId = route.params.naturalId;
  // const phonenumber = route.params.phonenumber;
  // const ssoid = route.params.ssoid;
  const type = route.params.type;
  const Token1 = route.params.Token;
  //  alert(type);
  // console.log("Token1"+Token1)
  var arr = route.params.url.split('/');
  //  alert(arr[4]);
  const Token2 = arr[4];
  const _getInfoQr = async valuse => {
    try {
      var Token = '';
      console.log(Token);
      if (getUser.userDetails.res_result.type == 6) {
        Token = authData.token.res_result.token;
      } else {
        Token = authData.token;
      }
      console.log('Tokemmm', route.params.type);
      const response = await dispatch(
        getInfoQrcode({
          res: {
            token_code: Token2,
          },
          token: Token,
          type: getUser.userDetails.res_result.type,
        }),
      );
      console.log(response);
      if (response.res_code === '00') {
        setInfo(response.res_result);
      }
    } catch (error) {}
  };

  const _SendMember = async valuse => {
    try {
      var Token = '';
      var member = type;
      var Type = null;
      if (getUser.userDetails.res_result.type == 6) {
        Token = authData.token.res_result.token;
        Type = 2;
      } else {
        Token = authData.token;
        Type = 1;
      }
      console.log('??????', Type);
      console.log('ค่า', valuse);
      const response = await dispatch(
        SendMemberBuy({
          results: {
            member_ssoid: valuse.ssoid,
            type: valuse.type,
            member_type: Type,
            member_type_owner: Type,
          },
          typep: getUser.userDetails.res_result.type,
          token: Token,
        }),
      );
      console.log('member_type:', valuse.type_member);
      console.log('member_type_owner:', Type);
      console.log('TOKEN:', Token);

      if (response.res_code === '00') {
        console.log('mmmmmmm');
        const response = await dispatch(
          valuse.type === 1 ? SETID(3) : SETID(4),
        );
        navigation.navigate('Mybasket', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
        // navigation.navigate('Mybasket', {
        //   itemId: 86,
        //   otherParam: 'anything you want here',
        // });
      } else if (response.res_code === '01') {
        Alert.alert(response.res_text);
      }
      console.log('OKOO', response);
    } catch (error) {}
  };
  useEffect(() => {
    _getInfoQr();
    // console.log(Info[0].name_th);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        leftComponent={
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.navigate('Home')}>
            <Icon name="x" size={30} />
          </TouchableOpacity>
        }
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#FFFFFF',
        }}>
        {/* <Text>{route.params.url}</Text> */}
        {Info != undefined ? (
          <Avatar
            containerStyle={{
              bottom: 50,
              borderWidth: 7,
              borderColor: '#2d6dc4',
            }}
            size={120}
            rounded
            source={{
              uri:
                Info[0].profile != undefined
                  ? Info[0].profile
                  : 'http://one.ditp.go.th/uploads/member_profile/profile_new.png',
            }}
          />
        ) : (
          <View />
        )}
        {Info != undefined ? (
          <View style={{bottom: 30, alignItems: 'center'}}>
            {Info[0].type != '2' || Info[0].type != '4' ? (
              <View style={{alignItems: 'center'}}>
                <View>
                  <Text style={{fontSize: 24, color: '#163c70'}}>
                    {Info[0].title_th}
                    {Info[0].name_th} {Info[0].lastname_th}
                  </Text>
                </View>
                <View>
                  {Info[0].company_name_th != '' && (
                    <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                      {Info[0].company_name_th}
                    </Text>
                  )}
                </View>

                <View>
                  {Info[0].type === '1' && (
                    <View>
                      {Info[0].naturalId != undefined && (
                        <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                          {Info[0].naturalId}
                        </Text>
                      )}
                    </View>
                  )}
                </View>

                <View>
                  {Info[0].tel != undefined && (
                    <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                      {Info[0].tel}
                    </Text>
                  )}
                </View>

                {Info[0].type === 1 || Info[0].type === 2 ? (
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#013984',
                      width: 150,
                      borderRadius: 15,
                      height: 26,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 22,
                      }}>
                      {Info[0].type === 1 ? 'นิติบุคคล' : 'นิติบุคคลต่างชาติ'}
                    </Text>
                    <Text>{''}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#BD280D',
                      width: 150,
                      borderRadius: 15,
                      height: 26,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 22,
                      }}>
                      {Info[0].type === 3
                        ? 'บุคคลทั่วไป'
                        : 'บุคคลทั่วไปต่างชาติ'}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 24, color: '#163c70'}}>
                  {Info[0].title_en}
                  {Info[0].name_en} {Info[0].lastname_en}
                </Text>

                {Info[0].company_name_th != undefined && (
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {Info[0].company_name_en}
                  </Text>
                )}
                {Info[0].naturalId != undefined && (
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {Info[0].naturalId}
                  </Text>
                )}
                {Info[0].tel != undefined && (
                  <Text style={{fontSize: 25, color: '#4b4b4b'}}>
                    {Info[0].tel}
                  </Text>
                )}
              </View>
            )}
            <View style={{marginTop: 10}} />
          </View>
        ) : (
          <View />
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={
              () =>
                _SendMember({
                  ssoid:
                    Info[0].ssoid === undefined ? Info[0].id : Info[0].ssoid,
                  type: 1,
                  type_member: Info[0].type,
                })
              // console.log(Info[0].type )
            }
            style={{
              width: 141,
              height: 34,
              backgroundColor: '#2d6dc4',
              alignSelf: 'center',
              marginRight: 10,
              borderRadius: 24.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>ผู้ซื้อของฉัน</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              _SendMember({
                ssoid: Info[0].ssoid === undefined ? Info[0].id : Info[0].ssoid,
                type: 2,
                type_member: Info[0].type,
              })
            }
            style={{
              width: 141,
              height: 34,
              backgroundColor: '#f96145',
              borderRadius: 24.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>เครือข่าย</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,

  // getImg: state.authReducer.getImg,
  // getStatus: state.dataReducer.getStatus,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRscreen);
