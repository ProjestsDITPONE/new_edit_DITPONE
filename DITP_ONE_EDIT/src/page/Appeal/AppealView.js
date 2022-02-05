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
  Platform,
} from 'react-native';
import Style from './Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import I18n from '../../utils/I18n';
import FormSet4_History from '../../components/FormDITPCare/FormSet4_History';
import FormSet5_History from '../../components/FormDITPCare/FormSet5_History';
import FormSet33_History from '../../components/FormDITPCare/FormSet33_History';
import FormSet34_History from '../../components/FormDITPCare/FormSet34_History';
import { ViewScale } from '../../config/ViewScale';

const AppealView = ({route, navigation}) => {
  
  const [array, Setarray] = useState(0);
  const [array1, Setarray1] = useState(null);
  const [array2, Setarray2] = useState(null);
  const [comp_process, Setcomp_process] = useState();

  useEffect(() => {
    var obj = {};
    route.params.detail.comp_chos.map((value, i) => {
      obj[value.fieldset_name] = value.fieldset_value;
    });
    obj['incType_name'] = route.params.detail.incType_name;
    Setcomp_process(obj);
  }, []);

  return (
    <View style={Style.backgroundView}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <Headerstage nameTab={I18n.t('translate_Myreport')} />

      <View style={{backgroundColor: '#F0F3F4', flex: 1, zIndex: -1}}>
        <ScrollView>
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
                <View style={Style.flex1}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_HeaderSubject')} :{' '}
                    {comp_process && comp_process.caseDtl_title}
                  </Text>
                </View>
                <Icon
                  name={array === null ? 'downcircleo' : 'upcircleo'}
                  size={ViewScale(20)}
                  color="#5f5f5f"
                />
              </View>
            </View>
          </TouchableOpacity>
          {array === 0 && (
            <View style={Style.ViewBox1}>
              <View style={Style.Line} />
              <View style={Style.ViewIcon}>
                <Text style={[Style.textUser, Style.marginLeft20]}>
                  {I18n.t('translate_Date_T')} :
                </Text>
                <Image
                  style={{width: ViewScale(12), height: ViewScale(12)}}
                  source={require('../../image/calendagray.png')}
                />
                <Text style={Style.textUser}>
                  {' '}
                  {route.params.detail.comp_date}{' '}
                </Text>
                <Icon name="clockcircleo" size={ViewScale(13)} />
                <Text style={Style.textUser}>
                  {' '}
                  {route.params.detail.comp_time}
                </Text>
              </View>

              {// AlertCase == '2' ||
              (route.params.detail.compType_id == '1' ||
                // AlertCase == '1' ||
                route.params.detail.compType_id == '4') &&
                comp_process && (
                  <FormSet5_History params={comp_process} history={true} />
                )}

              {// AlertCase == '6' ||
              (route.params.detail.compType_id == '2' ||
                route.params.detail.compType_id == '3' ||
                route.params.detail.compType_id == '5' ||
                route.params.detail.compType_id == '6') &&
                comp_process && (
                  <FormSet34_History params={comp_process} history={true} />
                )}

              {/* <View style={Style.flex1}>
                <Text style={[Style.TextSub12, Style.marginLeft20]}>
                  {I18n.t('translate_ProductType')}
                </Text>
                <View style={Style.ViewIcon}>
                  <Text style={[Style.textUser, Style.marginLeft20]}>
                    ข้าว{' '}
                  </Text>
                </View>
                <View style={Style.flex1}>
                  <Text style={[Style.TextSub12, Style.marginLeft20]}>
                    {I18n.t('translate_Background_Complaint')}
                  </Text>
                </View>
                <View style={Style.flex1}>
                  <Text style={[Style.textUser, Style.marginLeft20]}>
                    บริษัท สยามเกรนส์ จำกัด ได้ส่งออกข้าวไปให้ลูกค้า Lay
                    Brothers PTY.LID มาเป็นเวลากว่า 10 ปี ภายใต้ Team D/P 60
                    Days after B/L Date
                    แต่เมื่อครบกำหนดลูกค้าไม่ได้ชำระเงินมาเป็นเวลา กว่า 1 ปี
                    รายละเอียด Invoice ที่ไม่ชำระเงินตามเอกสารที่บริษัทส่งมา
                    เป็นยอดเงินรวมจำนวน 367,752.23 บาท
                  </Text>
                </View>
                <View style={Style.flex1}>
                  <Text style={[Style.TextSub12, Style.marginLeft20]}>
                    {I18n.t('translate_Damage')}
                  </Text>
                  <View style={Style.flex1}>
                    <Text style={[Style.textUser, Style.marginLeft20]}>
                      367,752.23 บาท
                    </Text>
                  </View>
                </View>
                <View style={Style.flex1}>
                  <Text style={[Style.TextSub12, Style.marginLeft20]}>
                    {I18n.t('translate_Requirements')}
                  </Text>
                  <View style={Style.flex1}>
                    <Text style={[Style.textUser, Style.marginLeft20]}>
                      ขอความอนุเคาระห์จากกรมการค้าระหว่างประเทศช่วยติดตามทวงเงินจากลูกค้ารายนี้ให้กับทางบริษัทฯด้วย
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          )}
          {// AlertCase == '2' ||
          (route.params.detail.compType_id == '1' ||
            // AlertCase == '1' ||
            route.params.detail.compType_id == '4') &&
            comp_process && (
              <FormSet4_History params={comp_process} history={true} />
            )}
          {// AlertCase == '6' ||
          (route.params.detail.compType_id == '2' ||
            route.params.detail.compType_id == '3' ||
            route.params.detail.compType_id == '5' ||
            route.params.detail.compType_id == '6') &&
            comp_process && (
              <FormSet33_History params={comp_process} history={true} />
            )}
          {/* <View style={Style.row}>
                <View style={Style.smallIcon}>
                  <Image
                    style={{width: 13, height: 17}}
                    source={require('../../image/companygray.png')}
                  />
                </View>
                <Text style={Style.textUser}>Lay Brothers PTY. LTD.</Text>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_branch')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : Australia
                  </Text>
                </View>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_NameContect')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : MR. PAULO LAY
                  </Text>
                </View>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_EmailContect')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : MR. PAULO LAY
                  </Text>
                </View>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_Phonenumber')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : 61-397-916-399
                  </Text>
                </View>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_Contect')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : 23-29 (LOT2) David Street, Dandenong, Victoria 3175
                  </Text>
                </View>
              </View>
              <View style={Style.row}>
                <Text style={Style.detailHeadLabel}>
                  {I18n.t('translate_Country')}
                </Text>
                <View style={Style.detailLabel}>
                  <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                    : Australia
                    {'  '}
                  </Text>
                </View>
              </View> */}
          {route.params.detail.comp_attach != undefined && (
            <View>
              <TouchableOpacity
                style={Style.TouchViewBox2}
                onPress={() => {
                  if (array2 === 0) {
                    Setarray2(null);
                  } else {
                    Setarray2(0);
                  }
                }}>
                {/* {route.params.detail.comp_attach.map(){}} */}
                <View style={Style.ViewBox}>
                  <View
                    style={[Style.DropDownHaed2, Style.shadow4, Style.flexRow]}>
                    <View style={Style.flex1}>
                      <Text style={Style.TextSub12}>
                        {I18n.t('translate_FileReport')}
                      </Text>
                    </View>
                    <Icon
                      style={{marginTop: ViewScale(9)}}
                      name={array2 === null ? 'downcircleo' : 'upcircleo'}
                      size={ViewScale(20)}
                      color="#5f5f5f"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View>
                {array2 === 0 &&
                  route.params.detail.comp_attach.map(value => (
                    <View style={Style.ViewBox1}>
                      <View style={Style.documentPanel}>
                        <Image
                          style={{width: ViewScale(27), height: ViewScale(30), margin: ViewScale(10)}}
                          source={require('../../image/PDF.png')}
                        />
                        <Text style={{fontSize: ViewScale(20), color: '#4b4b4b'}}>
                          {value.caseAttach_file_name}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
          {/*0% */}
          {route.params.detail.comp_process == '0' && (
            <View style={[Style.ViewBox5, {marginTop: ViewScale(15), marginBottom: ViewScale(20)}]}>
              <View
                style={[
                  Style.viewSub2,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_Status')} :{' '}
                  </Text>
                  <View style={Style.viewSub6}>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      Waiting
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: ViewScale(50),
                  marginTop: ViewScale(30),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: ViewScale(5),
                }}>
                <Image source={require('../../image/percen0.png')} />
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{height: ViewScale(120), width: ViewScale(100)}}
                    source={require('../../image/percentgirl.png')}
                  />
                </View>
              </View>
            </View>
          )}
          {/*25% */}
          {route.params.detail.comp_process == '1' && (
            <View style={[Style.ViewBox5, {marginTop: ViewScale(15), marginBottom: ViewScale(20)}]}>
              <View
                style={[
                  Style.viewSub2,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_Status')} :{' '}
                  </Text>
                  <View style={Style.viewSub8}>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      ln process
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: ViewScale(22),
                      fontStyle: 'italic',
                      color: '#20416e',
                    }}>
                    Case ID : {route.params.detail.comp_caseId}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: ViewScale(50),
                  marginTop: ViewScale(30),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: ViewScale(5),
                }}>
                <Image source={require('../../image/percen1.png')} />
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{height: ViewScale(120), width: ViewScale(100)}}
                    source={require('../../image/percentgirl.png')}
                  />
                </View>
              </View>
            </View>
          )}
          {/* 50% */}
          {route.params.detail.comp_process == '2' && (
            <View style={[Style.ViewBox5, {marginTop: ViewScale(15), marginBottom: ViewScale(20)}]}>
              <View
                style={[
                  Style.viewSub2,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_Status')} :{' '}
                  </Text>
                  <View style={Style.viewSub8}>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      ln process
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: ViewScale(22),
                      fontStyle: 'italic',
                      color: '#20416e',
                    }}>
                    Case ID : {route.params.detail.comp_caseId}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: ViewScale(50),
                  marginTop: ViewScale(30),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: ViewScale(5),
                }}>
                <Image source={require('../../image/percen2.png')} />
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{height: ViewScale(120), width: ViewScale(100)}}
                    source={require('../../image/percentgirl.png')}
                  />
                </View>
              </View>
            </View>
          )}
          {/* 75%*/}
          {route.params.detail.comp_process == '3' && (
            <View style={[Style.ViewBox5, {marginTop: ViewScale(15), marginBottom: ViewScale(20)}]}>
              <View
                style={[
                  Style.viewSub2,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_Status')} :{' '}
                  </Text>
                  <View style={Style.viewSub8}>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      ln process
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: ViewScale(22),
                      fontStyle: 'italic',
                      color: '#20416e',
                    }}>
                    Case ID : {route.params.detail.comp_caseId}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: ViewScale(50),
                  marginTop: ViewScale(30),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: ViewScale(5),
                }}>
                <Image source={require('../../image/percen3.png')} />
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{height: ViewScale(120), width: ViewScale(100)}}
                    source={require('../../image/percentgirl.png')}
                  />
                </View>
              </View>
            </View>
          )}
          {/* 100%*/}
          {route.params.detail.comp_process == '4' && (
            <View style={[Style.ViewBox5, {marginTop: ViewScale(15), marginBottom: ViewScale(20)}]}>
              <View
                style={[
                  Style.viewSub2,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={Style.TextSub12}>
                    {I18n.t('translate_Status')} :{' '}
                  </Text>
                  <View style={Style.viewSub9}>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      {I18n.t('translate_Complete')}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize: ViewScale(22), color: '#20416e'}}>
                    {I18n.t('translate_CaseID')} :{' '}
                    {route.params.detail.comp_caseId}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: ViewScale(50),
                  marginTop: ViewScale(30),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: ViewScale(5),
                }}>
                <Image source={require('../../image/percen4.png')} />
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{height: ViewScale(120), width: ViewScale(100)}}
                    source={require('../../image/percentgirl.png')}
                  />
                </View>
              </View>
            </View>
          )}
          {/* โปรดรอเจ้าหน้าทีตรวจสอบ */}
          {route.params.detail.comp_process == '0' && (
            <View style={[Style.alertContainer, {paddingHorizontal: ViewScale(30)}]}>
              <View style={{alignSelf: 'center', marginRight: ViewScale(10)}}>
                <Image
                  source={require('../../image/sand.png')}
                  style={{width: ViewScale(30), height: ViewScale(30)}}
                />
              </View>
              <Text style={{fontSize: ViewScale(20), color: '#20416e', flex: 1}}>
                {I18n.t('translate_authoritieswating')}
              </Text>
            </View>
          )}
          {route.params.detail.comp_process != '4' && (
            <View style={Style.alertContainer}>
              <View style={{justifyContent: 'center', marginRight: ViewScale(5)}}>
                <Icon3 name="alert-circle" size={ViewScale(35)} color="#fe2c2c" />
              </View>
              <Text style={{fontSize: ViewScale(22), color: '#fe2c2c', flex: 1}}>
                {I18n.t('translate_Callcenter_from')}
              </Text>
            </View>
          )}
          {/* 0%  */}
          {route.params.detail.comp_process == '0' && (
            <View style={Style.viewAlert}>
              <View>
                <Image
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}
                />
              </View>
              <Text style={Style.textAlert}>
                {I18n.t('translate_officer_received')}
              </Text>
            </View>
          )}
          {/* 0% */}
          {(route.params.detail.comp_process == '1' ||
            route.params.detail.comp_process == '2' ||
            route.params.detail.comp_process == '3' ||
            route.params.detail.comp_process == '4') && (
            <View style={Style.viewAccept}>
              <View>
                <ImageBackground
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}>
                  <Image
                    style={{height: ViewScale(15), width: ViewScale(20)}}
                    source={require('../../image/Accept.png')}
                  />
                </ImageBackground>
              </View>
              <Text style={Style.textAccept}>
                {I18n.t('translate_officer_received')}
              </Text>
            </View>
          )}
          {/* 25% */}
          {(route.params.detail.comp_process == '0' ||
            route.params.detail.comp_process == '1') && (
            <View style={Style.viewAlert}>
              <View>
                <Image
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}
                />
              </View>
              <Text style={Style.textAlert}>
                {I18n.t('translate_coordinate_stakeholders')}
              </Text>
            </View>
          )}
          {/* 25% */}
          {(route.params.detail.comp_process == '2' ||
            route.params.detail.comp_process == '3' ||
            route.params.detail.comp_process == '4') && (
            <View style={Style.viewAccept}>
              <View>
                <ImageBackground
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}>
                  <Image
                    style={{height: ViewScale(15), width: ViewScale(20)}}
                    source={require('../../image/Accept.png')}
                  />
                </ImageBackground>
              </View>
              <Text style={Style.textAccept}>
                {I18n.t('translate_coordinate_stakeholders')}
              </Text>
            </View>
          )}
          {/*50% */}
          {(route.params.detail.comp_process == '0' ||
            route.params.detail.comp_process == '1' ||
            route.params.detail.comp_process == '2') && (
            <View style={Style.viewAlert}>
              <View>
                <Image
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}
                />
              </View>
              <Text style={Style.textAlert}>
                {I18n.t('translate_Investigation_summary')}
              </Text>
            </View>
          )}
          {/*50% */}
          {(route.params.detail.comp_process == '3' ||
            route.params.detail.comp_process == '4') && (
            <View style={Style.viewAccept}>
              <View>
                <ImageBackground
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}>
                  <Image
                    style={{height: ViewScale(15), width: ViewScale(20)}}
                    source={require('../../image/Accept.png')}
                  />
                </ImageBackground>
              </View>
              <Text style={Style.textAccept}>
                {I18n.t('translate_Investigation_summary')}
              </Text>
            </View>
          )}
          {/*75 */}
          {(route.params.detail.comp_process == '0' ||
            route.params.detail.comp_process == '1' ||
            route.params.detail.comp_process == '2' ||
            route.params.detail.comp_process == '3') && (
            <View style={Style.viewAlert}>
              <View>
                <Image
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}
                />
              </View>
              <Text style={Style.textAlert}>
                {I18n.t('translate_Terminate')}
              </Text>
            </View>
          )}
          {/*75 */}
          {route.params.detail.comp_process == '4' && (
            <View style={Style.viewAccept}>
              <View>
                <ImageBackground
                  style={Style.checkmarkImage}
                  source={require('../../image/Wong.png')}>
                  <Image
                    style={{height: ViewScale(15), width: ViewScale(20)}}
                    source={require('../../image/Accept.png')}
                  />
                </ImageBackground>
              </View>
              <Text style={Style.textAccept}>
                {I18n.t('translate_Terminate')}
              </Text>
            </View>
          )}
          {route.params.detail.comp_process == '4' && (
            <View
              style={{
                width: '95%',
                height: null,
                padding: ViewScale(20),
              }}>
              <Text
                style={{
                  fontSize: ViewScale(20),
                  color: '#07866a',
                  flex: 1,
                  marginBottom: ViewScale(10),
                }}>
                {I18n.t('textHeadEnd_complaintHistory')}
              </Text>

              <View
                style={{
                  padding: ViewScale(8),
                  backgroundColor: '#ffffff',
                  borderRadius: ViewScale(10),
                }}>
                <Text style={{color: '#858585', fontSize: ViewScale(20)}}>
                  {route.params.detail.comp_resultProcess}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default AppealView;
