import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import {CheckBox, Overlay, Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import Style from './Styles';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../utils/I18n';
import {connect} from 'react-redux';

import FormSet3_History from '../../components/FormDITPCare/FormSet3_History';
import FormSet4_History from '../../components/FormDITPCare/FormSet4_History';
import FormSet5_History from '../../components/FormDITPCare/FormSet5_History';
import FormSet33_History from '../../components/FormDITPCare/FormSet33_History';
import FormSet34_History from '../../components/FormDITPCare/FormSet34_History';
import {Complaint} from '../../actions/data.actions';

const Typeappel4 = ({navigation, route, dispatch, getUser}) => {
  const [array, Setarray] = useState(0);
  const [array1, Setarray1] = useState(0);
  const [CurrentDate, setCurrentDate] = useState();
  const [CurrentTime, setCurrentTime] = useState();
  const [sumForm, setSumForm] = useState();
  // const array2 = 0;

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '/' + month + '/' + year;
  };

  const getCurrentTime = () => {
    var Hours = new Date().getHours();
    var Minutes = new Date().getMinutes();
    return Hours + ':' + Minutes;
  };

  const getCurrentDateSend = type => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var Hours = new Date().getHours();
    var Minutes = new Date().getMinutes();
    var Seconds = new Date().getSeconds();
    if (type == 1) {
      return (
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        Hours +
        ':' +
        Minutes +
        ':' +
        Seconds
      );
    } else {
      return year + '-' + month + '-' + date;
    }
  };

  const sendformCare = async () => {
    let x = '';
    // console.log(route.params.pdf.length);
    if (route.params.pdf.length > 0) {
      x =
        '&complnt_file[0][base64]=' +
        route.params.pdf[0].base64 +
        '&complnt_file[0][name_file_change]=' +
        route.params.pdf[0].name_file_change +
        '&complnt_file[0][name_file_ori]=' +
        route.params.pdf[0].name_file_ori;
    }

    const formBody = Object.keys(sumForm)
      .map(key => encodeURIComponent(key) + '=' + sumForm[key])
      .join('&');
    // console.log(x);
    try {
      const response = await dispatch(
        Complaint({
          res: formBody + x,
          token:
            getUser.userDetails.res_result.token_care === ''
              ? 'de8a23983dae2f90f4cab2af19b37905'
              : getUser.userDetails.res_result.token_care,
        }),
      );
      if (response.res_code == '00') {
        navigation.navigate('HomeStackScreen');
        // console.log(response);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
    setCurrentTime(getCurrentTime());

    // $rootScope.arrayFile.push(request);

    var finForm = {
      case_createBy_id: route.params.case_createBy_id,
      case_receivedoc_date: getCurrentDateSend(2),
      case_receivedoc_real_datetime: getCurrentDateSend(1),
      case_create_datetime: getCurrentDateSend(1),
      // complnt_file: route.params.pdf,
      formSetId_P:
        route.params.formSetId_P1 +
        ',' +
        route.params.formSetId_P2 +
        ',' +
        route.params.formSetId_P3,
      applnt_type: route.params.member_type,
      compType_other:
        route.params.checkflag == '1' ? route.params.TxtTitle2 : '',
    };

    setSumForm(Object.assign(route.params, finForm));
  }, []);

  return (
    <View style={Style.backgroundView}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      <Headerstage nameTab={I18n.t('translate_Report_Header')} />

      <View style={{backgroundColor: '#F0F3F4', flex: 1, zIndex: -1}}>
        <ScrollView>
          <View style={Style.redTextHeader}>
            <Text style={Style.redText}>
              {I18n.t('translate_verify_information')}
            </Text>
          </View>
          <View style={[Style.headerContainer, {padding: 8}]}>
            {route.params.TxtTitle1 != '' && (
              <Text style={Style.headerText}>{route.params.TxtTitle1}</Text>
            )}
            {route.params.TxtTitle2 != '' && (
              <Text style={Style.headerText}>{route.params.TxtTitle2}</Text>
            )}
            {route.params.TxtTitle3 != '' && (
              <Text style={Style.headerText}>{route.params.TxtTitle3}</Text>
            )}
          </View>
          <View style={Style.View1}>
            <Text style={Style.dateText}>
              {I18n.t('translate_Date_T')} : {CurrentDate}
            </Text>
            <Text style={[Style.dateText, {textAlign: 'right'}]}>
              {I18n.t('translate_Date_time')} : {CurrentTime} {/* เวลา */}
            </Text>
          </View>

          <TouchableOpacity
            style={Style.TouchViewBox1}
            onPress={() => {
              if (array === 0) {
                Setarray(null);
              } else {
                Setarray(0);
              }
            }}>
            <View style={Style.ViewBox}>
              <View style={[Style.DropDownHaed2, Style.shadow4, Style.flexRow]}>
                <View style={Style.flex}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_DataReport')}
                  </Text>
                </View>

                <Icon
                  style={Style.selfCenter}
                  name={array === null ? 'downcircleo' : 'upcircleo'}
                  size={20}
                  color="#5f5f5f"
                />
              </View>
            </View>
          </TouchableOpacity>
          {array === 0 && (
            <View style={Style.ViewBox1}>
              <View style={Style.Line} />
              <View style={Style.ViewIcon}>
                <Icon2
                  name="user"
                  size={20}
                  color="#5D6D7E"
                  style={Style.IconUser}
                />
                <Text style={Style.textUser}>
                  {'  '}
                  {route.params.applnt_firstname} {route.params.applnt_lastname}
                </Text>
              </View>
              {route.params.member_type == 1 && (
                <View
                  style={[
                    Style.row,
                    Style.marginLeft10,
                    {alignItems: 'center'},
                  ]}>
                  <Image
                    style={{width: 13, height: 17}}
                    source={require('../../image/companygray.png')}
                  />
                  <Text style={Style.textUser}>
                    {'  '}
                    {route.params.applntOrg_name}
                  </Text>
                </View>
              )}
            </View>
          )}
          {route.params.formSetId_P2 == '3' && (
            <FormSet3_History params={route.params} />
          )}
          {(route.params.formSetId_P2 == '4' ||
            route.params.formSetId_P2 == '10') && (
            <FormSet4_History params={route.params} />
          )}
          {(route.params.formSetId_P3 == '5' ||
            route.params.formSetId_P3 == '11') && (
            <FormSet5_History params={route.params} />
          )}
          {route.params.formSetId_P1 == '6' && (
            <FormSet33_History params={route.params} />
          )}
          {route.params.formSetId_P2 == '7' && (
            <FormSet34_History params={route.params} />
          )}

          <View style={[Style.row, Style.justifyCenter]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Typeappel2')}
              style={Style.BTN2}>
              <Text style={Style.BTNText}>{I18n.t('translate_edit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendformCare()} style={Style.BTN3}>
              <Text style={Style.BTNText}>{I18n.t('translate_Send')}</Text>
            </TouchableOpacity>
          </View>
          <View style={Style.alertContainer}>
            <View style={[Style.justifyCenter, {marginRight: 5}]}>
              <Icon3 name="alert-circle" size={40} color="#fe2c2c" />
            </View>
            <Text style={Style.redText}>{I18n.t('translate_Callcenter')}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Typeappel4);
