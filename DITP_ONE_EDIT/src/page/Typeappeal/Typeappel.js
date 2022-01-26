import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { CheckBox, Overlay, Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../utils/I18n';
import Style from './Styles';
import { Checkformset } from '../../actions/data.actions';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
class Typeappel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkop: [],
      checktype1: [],
      checktype2: [],
      checktype3: false,
      checktype4: false,
      checktype5: false,
      checktype6: false,
      TypeComplaint: [],
      compType2: [],
      compType3: [],
      textotherflag: '',
      mySelect: false,
      firstname: null,
      lastname: null,
      naturalId: null,
      career: null,
      address: null,
      prov_id: null,
      gender: null,
      mobile: null,
      tel: null,
      zipcode: null,
      Org_position: null,
      Org_name: null,
      Org_branch: null,
      Org_trade_number: null,
      Org_address: null,
      Org_prov_id: null,
      Org_zipcode: null,
      Org_tel: null,
      Org_fax: null,
      member_type: null,
      country_id: null,
      OpenMenu: false,
      Selec1: [],
      Selec2: false,
      Seletitle: I18n.t('translate_SelecReport')
    };

    // this.country_id = '162';
    // this.profile_name = 'นางวิภา เหล่าประถัสสร';
    // this.profile_business = 'บริษัท สยามเกรนส์ จำกัด';
    // this.member_type = '1';

    this.profile_care = {
      case_createBy_id: this.props.getUser.userDetails.res_result.userID_care,
      applnt_firstname: this.state.firstname,
      applnt_lastname: this.state.lastname,
      applnt_ident: this.state.naturalId,
      applnt_career: this.state.career, //อาชีพ
      applnt_address: this.state.address,
      applnt_prov_id: this.state.prov_id,
      applnt_gender: this.state.gender,
      applnt_mobile: this.state.mobile,
      applnt_tel: this.state.tel,
      applnt_zipcode: this.state.zipcode,
      applntOrg_position: this.state.Org_position,
      applntOrg_name: this.state.Org_name,
      applntOrg_branch: this.state.Org_branch,
      applntOrg_trade_number: this.state.Org_trade_number,
      applntOrg_address: this.state.Org_address,
      applntOrg_prov_id: this.state.Org_prov_id,
      applntOrg_zipcode: this.state.zipcode,
      applntOrg_tel: this.state.tel,
      applntOrg_fax: this.state.Org_fax,
      member_type: this.state.member_type,
      country_id: this.state.country_id,
    };
  }

  CheckType = () => {
    this.profile_care.applntOrg_address = '';
    this.profile_care.applntOrg_tel = '';
    if (this.props.getUser.userDetails.res_result.type === 1) {
      this.profile_care.applnt_firstname =
        this.props.getUser.userDetails.res_result.sub_member.titleTh +
        this.props.getUser.userDetails.res_result.sub_member.nameTh;
      this.profile_care.applnt_lastname = this.props.getUser.userDetails.res_result.sub_member.lastnameTh;
      this.profile_care.applntOrg_address = this.props.getUser.userDetails.res_result.addressTh.address;
      this.profile_care.applntOrg_tel = this.props.getUser.userDetails.res_result.sub_member.tel;
    } else if (this.props.getUser.userDetails.res_result.type === 2) {
      this.profile_care.applnt_firstname =
        this.props.getUser.userDetails.res_result.sub_member.titleEn +
        this.props.getUser.userDetails.res_result.sub_member.nameEn;
      this.profile_care.applnt_lastname = this.props.getUser.userDetails.res_result.sub_member.lastnameEn;
      this.profile_care.applntOrg_address = this.props.getUser.userDetails.res_result.address.country;
      this.profile_care.applntOrg_tel = this.props.getUser.userDetails.res_result.sub_member.tel;
    } else if (this.props.getUser.userDetails.res_result.type === 3) {
      this.profile_care.applnt_firstname =
        this.props.getUser.userDetails.res_result.member.titleTh +
        this.props.getUser.userDetails.res_result.member.nameTh;

      this.profile_care.applnt_lastname = this.props.getUser.userDetails.res_result.member.lastnameTh;
      this.profile_care.applnt_ident = this.props.getUser.userDetails.res_result.naturalId;
    } else if (this.props.getUser.userDetails.res_result.type === 4) {
      this.profile_care.applnt_firstname =
        this.props.getUser.userDetails.res_result.member.titleEn +
        this.props.getUser.userDetails.res_result.member.nameEn;

      this.profile_care.applnt_lastname = this.props.getUser.userDetails.res_result.member.lastnameEn;
      this.profile_care.applnt_ident = this.props.getUser.userDetails.res_result.naturalId;
    }
  };

  componentDidMount() {
    // console.log(this.props.route.params._TypeComplaint.res_result);
    const newfloors = this.props.route.params._TypeComplaint.res_result.map(
      value => ({
        label:
          I18n.locale === 'th'
            ? value.compType_name
            : value.compType_name_en,
        value:
          value.compType_id +
          ',' +
          value.levelmenu +
          ',' +
          (I18n.locale === 'th'
            ? value.compType_name
            : value.compType_name_en) +
          ',' +
          value.compType_other_flag,

        type: value.compType_section
      }),
    );
    this.setState({ TypeComplaint: [...this.state.TypeComplaint, ...newfloors] });
    this.CheckType();
    console.log(newfloors);
  }

  complaintType_Select(data) {
    this.setState({ mySelect: data }, async () => {
      this.complaintType_Done();
    });
  }
  complaintType_Done() {
    console.log('Pick', this.state.mySelect);
    this.TxtTitle1 = ''; //แสดงหน้าอื่น
    this.TxtTitle2 = '';
    this.TxtTitle3 = '';

    try {
      var res = this.state.mySelect.split(',');
      // var mySelect = res[0]; ไมได้ใช้มั้ง
      // var levelmenu = res[1]; เอาตัวแปลไปใช้แทนแล้ว
      this.TxtTitle1 = res[2]; //แสดงหน้าอื่น
      this.checkflag = res[3];
      this.Rootlevelmenu = res[1];
      this.select_typeComp1 = res[0];
      this.setState({ compType2: [] });
      this.setState({ compType3: [] });
      this.select_typeComp2 = '';
      this.select_typeComp3 = '';
      let intialCheck = this.props.route.params._TypeComplaint.res_result[
        res[0] - 1
      ].compType_Sub1.map(x => false);
      this.setState({ checktype1: intialCheck });

      const newfloors2 = this.props.route.params._TypeComplaint.res_result[
        res[0] - 1
      ].compType_Sub1.map(value => ({
        compTypeSub1_id: value.compTypeSub1_id,
        compTypeSub1_name: value.compTypeSub1_name,
        compTypeSub1_name_en: value.compTypeSub1_name_en,
        compType_Sub2: value.compType_Sub2,
      }));
      this.setState({ compType2: newfloors2 });
    } catch (error) { }
  }

  complaintType2_Select(data) {
    this.TxtTitle2 = '';
    this.TxtTitle3 = '';
    this.TxtTitle2 =
      I18n.locale === 'th' ? data.compTypeSub1_name : data.compTypeSub1_name_en;
    this.select_typeComp2 = data.compTypeSub1_id;
    this.compType3 = [];
    this.select_typeComp3 = '';

    try {
      let intialCheck = this.state.compType2[
        data.compTypeSub1_id - 1
      ].compType_Sub2.map(x => false);
      this.setState({ checktype2: intialCheck });

      const newfloors3 = this.state.compType2[
        data.compTypeSub1_id - 1
      ].compType_Sub2.map(value => ({
        compTypeSub2_id: value.compTypeSub2_id,
        compTypeSub2_name: value.compTypeSub2_name,
        compTypeSub2_name_en: value.compTypeSub2_name_en,
      }));
      this.setState({ compType3: newfloors3 });
    } catch (error) { }
  }

  complaintType3_Select(data) {
    this.TxtTitle3 = '';
    this.TxtTitle3 =
      I18n.locale === 'th' ? data.compTypeSub2_name : data.compTypeSub2_name_en;
    this.select_typeComp3 = data.compTypeSub2_id;
  }

  RadioSub2 = ({ item, index }) => {
    return (
      <CheckBox
        title={
          I18n.locale === 'th'
            ? item.compTypeSub1_name
            : item.compTypeSub1_name_en
        }
        textStyle={Style.checkboxText}
        checked={this.state.checktype1[index]}
        containerStyle={{
          backgroundColor: '#fff0',
          borderColor: '#fff0',
          paddingVertical: 0,
        }}
        uncheckedIcon={
          <Image
            source={require('../../image/checkbox.png')}
            style={{ width: 20, height: 20 }}
          />
        }
        checkedIcon={
          <View style={Style.checkIcon}>
            <Image
              source={require('../../image/checkAccept.png')}
              style={{ width: 10, height: 10 }}
            />
          </View>
        }
        onPress={value => {
          let checktype1 = [...this.state.checktype1];
          checktype1 = checktype1.map(x => false);
          checktype1[index] = !checktype1[index];
          this.setState({ checktype1: checktype1 });
          this.complaintType2_Select(item);
        }}
      />
    );
  };

  RadioSub3 = ({ item, index }) => {
    return (
      <CheckBox
        title={
          I18n.locale === 'th'
            ? item.compTypeSub2_name
            : item.compTypeSub2_name_en
        }
        textStyle={Style.checkboxText}
        checked={this.state.checktype2[index]}
        containerStyle={{
          backgroundColor: '#fff0',
          borderColor: '#fff0',
          paddingVertical: 0,
        }}
        uncheckedIcon={
          <Image
            source={require('../../image/checkbox.png')}
            style={{ width: 20, height: 20 }}
          />
        }
        checkedIcon={
          <View style={Style.checkIcon}>
            <Image
              source={require('../../image/checkAccept.png')}
              style={{ width: 10, height: 10 }}
            />
          </View>
        }
        onPress={() => {
          let checktype2 = [...this.state.checktype2];
          checktype2 = checktype2.map(x => false);
          checktype2[index] = !checktype2[index];
          this.setState({ checktype2: checktype2 });
          this.complaintType3_Select(item);
        }}
      />
    );
  };

  selecitem1 = ({ item, index }) => {

    let Selec1 = [...this.state.Selec1];
    Selec1 = Selec1.map(x => false);
    Selec1[index] = !Selec1[index];
    this.setState({ Selec1: Selec1 });
    this.complaintType_Select(item);
    this.setState({ OpenMenu: false })
  };


  async nextTypeappel() {
    var request =
      'compType1=' +
      this.select_typeComp1 +
      '&compType2=' +
      this.select_typeComp2 +
      '&compType3=' +
      this.select_typeComp3;
    console.log(request);
    var request_level = {
      0: this.select_typeComp1,
      1: this.select_typeComp2,
      2: this.select_typeComp3,
    };
    this.select_typeComp11 = this.select_typeComp3;
    this.select_typeComp111 = this.select_typeComp1;
    this.select_typeComp12 = this.select_typeComp2;

    var check = true;
    var check2 = true;
    for (var i = 0; i < this.Rootlevelmenu; i++) {
      if (
        request_level[i] === undefined ||
        request_level[i] === null ||
        request_level[i] === ''
      ) {
        check = false;
      }
    }

    if (this.checkflag === '1') {
      if (
        this.state.textotherflag === '' ||
        this.state.textotherflag === undefined
      ) {
        check2 = false;
      }
    }
    if (check) {
      if (check2) {
        try {
          const response = await this.props.dispatch(Checkformset(request));

          if (response.res_code === '00') {
            const newfloors = response.res_result.map(value => ({
              frmset_field: value.frmset_field,
              frmset_id: value.frmset_id,
              frmset_name: value.frmset_name,
              frmset_name_en: value.frmset_name_en,
            }));
            this.setState({ formset: newfloors });

            this.formSetId_P1 = this.state.formset[0].frmset_id;
            this.formSetId_P2 = this.state.formset[1].frmset_id;
            this.formSetId_P3 = this.state.formset[2].frmset_id;

            if (this.profile_care.country_id === '162') {
              if (this.formSetId_P1 === '1') {
                this.compProcrss = '2';
              } else {
                this.compProcrss = '1';
              }
            } else {
              if (this.formSetId_P1 === '1') {
                this.compProcrss = '1';
              } else {
                this.compProcrss = '2';
              }
            }

            if (this.formSetId_P1 === '9') {
              this.compProcrss = '1';
            }

            this.formSetName_P1 = this.state.formset[0].frmset_name;
            this.formSetName_P2 = this.state.formset[1].frmset_name;
            this.formSetName_P3 = this.state.formset[2].frmset_name;

            if (this.checkflag === '1') {
              this.TxtTitle2 = this.state.textotherflag;
            }
            this.paramsText = {
              TxtTitle1: this.TxtTitle1,
              TxtTitle2: this.TxtTitle2,
              TxtTitle3: this.TxtTitle3,
              formSetId_P1: this.formSetId_P1,
              formSetId_P2: this.formSetId_P2,
              formSetId_P3: this.formSetId_P3,
              profile_care: this.profile_care,
              formSetName_P1: this.formSetName_P1,
              formSetName_P2: this.formSetName_P2,
              formSetName_P3: this.formSetName_P3,
              _Country: this.props.route.params._Country,
              _TypeComplaint: this.props.route.params._TypeComplaint,
              _TypeProduct: this.props.route.params._TypeProduct,
              _IncorrectType: this.props.route.params._IncorrectType,
              _Currency: this.props.route.params._Currency,
              _Province: this.props.route.params._Province,
              _TypeBusiness: this.props.route.params._TypeBusiness,
              formset: this.state.formset,
              select_typeComp1: this.select_typeComp1,
              select_typeComp2: this.select_typeComp2,
              select_typeComp3: this.select_typeComp3,
              checkflag: this.checkflag,
            };
            this.props.navigation.navigate('Typeappel2', this.paramsText);
            console.log('ค่าาา', this.paramsText);
          } else {
            throw response;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert(
          I18n.t('alertspecify'),
          '',
          [
            {
              text: 'ตกลง',
              onPress: () => { },
            },
          ],
          { cancelable: false },
        );
      }
    } else {
      Alert.alert(
        I18n.t('toast_alert_14ComplaintHistyControl_level'),
        '',
        [
          {
            text: 'ตกลง',
            onPress: () => { },
          },
        ],
        { cancelable: false },
      );
    }
  }

  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '/' + month + '/' + year;
  };

  getCurrentTime = () => {
    var Hours = new Date().getHours();
    var Minutes = new Date().getMinutes();
    return Hours + ':' + Minutes;
  };

  render() {
    // console.log(this.formSetName_P1);
    // console.log(this.props.getUser.userDetails.res_result.member.nameTh);
    return (
      <View style={Style.backgroundView}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{ marginTop: Platform.OS === 'android' && 90 }} />
        <Headerstage nameTab={I18n.t('translate_Report_Header')} />

        <View style={{ backgroundColor: '#F0F3F4', flex: 1, zIndex: -1 }}>
          {this.state.OpenMenu && (
            <Overlay
              onBackdropPress={() => {
                this.setState({ OpenMenu: false })
              }}
              overlayStyle={{ backgroundColor: 'transparent', top: 40 }}
              backdropStyle={{ backgroundColor: '#2d6dc470' }}>
              <View style={{ width: width * 0.8, height: null, backgroundColor: "#fff", }}>
                <View >
                  <ScrollView>
                    <FlatList
                      scrollEnabled={false}
                      data={this.state.TypeComplaint}
                      scrollEnabled={false}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ width: '100%' }}>
                            {index == 0 && (
                              <LinearGradient
                                colors={['#59a6e4', '#2d6dc4']}
                                start={{ x: 1, y: 0 }}

                                style={{
                                  width: null,
                                  height: 38,

                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  backgroundColor: '#59a6e4'
                                }}>
                                <View style={{ alignSelf: 'center' }}>
                                  <Text style={{ fontSize: 25, color: '#fff' }}>
                                    ร้องเรียนข้อพิพาททางการค้าระหว่างประเทศ
                                  </Text>
                                </View>
                              </LinearGradient>
                            )}

                            {item.type == 1 && (
                              <CheckBox
                                title={item.label}
                                checked={this.state.Selec1[index]}
                                textStyle={{
                                  fontSize: 18,
                                  color: '#4b4b4b',
                                  fontWeight: 'normal',
                                  fontFamily: 'PSL Kittithada Pro',
                                }}
                                checkedIcon={
                                  <ImageBackground
                                    style={{ width: 18, height: 18 }}
                                    source={require('../../image/checkQues.png')}>
                                    <Image
                                      style={{ width: 13, height: 9, top: 5, left: 2 }}
                                      source={require('../../image/CheckQues1.png')}
                                    />
                                  </ImageBackground>
                                }
                                uncheckedIcon={
                                  <Image
                                    style={{ width: 18, height: 18 }}
                                    source={require('../../image/uncheckQues.png')}
                                  />
                                }
                                containerStyle={{
                                  backgroundColor: 'transparent',
                                  borderColor: 'transparent',
                                }}
                                onPress={() => {
                                  this.selecitem1({
                                    item: item.value, index: index
                                  })
                                  this.setState({ Seletitle: item.label })
                                }}
                              />
                            )}
                          </View>
                        )
                      }}
                    />

                    <FlatList
                      scrollEnabled={false}
                      data={this.state.TypeComplaint}
                      scrollEnabled={false}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ width: '100%' }}>
                            {index == 0 && (
                              <LinearGradient
                                colors={['#59a6e4', '#2d6dc4']}
                                start={{ x: 1, y: 0 }}

                                style={{
                                  width: null,
                                  height: 38,

                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  backgroundColor: '#59a6e4'
                                }}>
                                <View style={{ alignSelf: 'center', width: '90%' }}>
                                  <Text numberOfLines={1} style={{ fontSize: 25, color: '#fff' }}>
                                    ร้องเรียนข้อพิพาททางการค้าระหว่างประเทศ
                              </Text>
                                </View>
                              </LinearGradient>
                            )}

                            {item.type == 2 && (
                              <CheckBox
                                title={item.label}
                                checked={this.state.Selec1[index]}
                                textStyle={{
                                  fontSize: 18,
                                  color: '#4b4b4b',
                                  fontWeight: 'normal',
                                  fontFamily: 'PSL Kittithada Pro',
                                }}
                                checkedIcon={
                                  <ImageBackground
                                    style={{ width: 18, height: 18 }}
                                    source={require('../../image/checkQues.png')}>
                                    <Image
                                      style={{ width: 13, height: 9, top: 5, left: 2 }}
                                      source={require('../../image/CheckQues1.png')}
                                    />
                                  </ImageBackground>
                                }
                                uncheckedIcon={
                                  <Image
                                    style={{ width: 18, height: 18 }}
                                    source={require('../../image/uncheckQues.png')}
                                  />
                                }
                                containerStyle={{
                                  backgroundColor: 'transparent',
                                  borderColor: 'transparent',
                                }}
                                onPress={() => {
                                  this.selecitem1({
                                    item: item.value, index: index
                                  })
                                  this.setState({ Seletitle: item.label })
                                }}
                              />
                            )}
                          </View>
                        )
                      }}
                    />
                  </ScrollView>
                </View>
              </View>
            </Overlay>)}
          <ScrollView>
            <View style={Style.View1}>
              <Text style={Style.dateText}>
                {I18n.t('translate_Date_T')} : {this.getCurrentDate()}
              </Text>
              <Text style={[Style.dateText, { textAlign: 'right' }]}>
                {I18n.t('translate_Date_time')} : {this.getCurrentTime()}{' '}
                {/* เวลา */}
              </Text>
            </View>
            <View style={[Style.ViewSubHeader, { paddingBottom: 15 }]}>
              <Text style={Style.textHearder1}>
                {I18n.t('translate_SelecReport')}
              </Text>
              <View style={Style.ViewTap}>
                <TouchableOpacity
                  onPress={() => { this.setState({ OpenMenu: true }) }}>
                  <LinearGradient
                    colors={['#59a6e4', '#2d6dc4']}
                    start={{ x: 1, y: 0 }}
                    style={[Style.dropdownGradient]}>
                    {/* {console.log(this.state.TypeComplaint)} */}
                    <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                        {/* {I18n.t('translate_SelecReport')} */}
                        {this.state.Seletitle}
                      </Text>
                      <Icon
                        name="caretdown"
                        size={15}
                        color="white"
                        style={Style.dropdownIcon}
                      />
                    </View>
                    {/* <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputIOS: {
                        fontSize: 20,
                        color: '#FFFFFF',
                        paddingRight: 30,
                        width: '100%',
                      },
                      inputAndroid: {
                        fontSize: 20,
                        color: '#FFFFFF',
                        // paddingRight: 30,
                        fontWeight: 'normal',
                        fontFamily: 'PSL Kittithada Pro',
                        padding: 5,
                        width: '90%',
                        textAlign: 'center',
                      },
                      placeholder: { color: '#FFFFFF' },
                    }}
                    mode="dropdown"
                    placeholder={{
                      label: '\t' + I18n.t('translate_SelecReport'),
                      value: null,
                    }}
                    onValueChange={value => {
                      console.log(value)
                      this.complaintType_Select(value);
                    }}

                    items={this.state.TypeComplaint}
                    Icon={() => {
                      return (
                        <Icon
                          name="caretdown"
                          size={15}
                          color="white"
                          style={Style.dropdownIcon}
                        />
                      );
                    }}
                  /> */}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: -1, marginTop: 10 }}>
                <FlatList
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index}
                  data={this.state.compType2}
                  renderItem={this.RadioSub2}
                />
              </View>
              {this.checkflag === '1' && (
                <View>
                  <Text style={Style.textHearder1}>
                    {I18n.t('comptitlename')}
                    <Text style={Style.TextSupinput2}> *</Text>
                  </Text>

                  <View
                    style={[
                      Style.ViewInput,
                      {
                        alignSelf: 'center',
                      },
                    ]}>
                    <TextInput
                      style={[Style.TextInput]}
                      onChangeText={text => {
                        this.setState({ textotherflag: text });
                      }}
                      value={this.state.textotherflag}
                      maxLength={30}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>
              )}
              {this.state.compType3.length > 0 && (
                <View style={Style.ViewSubHeader2}>
                  <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                    <Text style={Style.textHearder2}>
                      {I18n.t('translate_Selectcase')}
                    </Text>
                    <FlatList
                      scrollEnabled={false}
                      keyExtractor={(item, index) => index}
                      data={this.state.compType3}
                      renderItem={this.RadioSub3}
                    />
                  </View>
                </View>
              )}
            </View>
            <View
              style={[Style.ViewBTN, !this.state.mySelect && Style.opacityBTN]}>
              <TouchableOpacity
                disabled={!this.state.mySelect}
                onPress={() => this.nextTypeappel()}
                style={Style.BTN1}>
                <Text style={Style.BTNText}>{I18n.t('translate_Accept')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Typeappel);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    color: '#014886',
  },
  inputAndroid: {
    height: 40,
    fontSize: 18,
    color: '#014886',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    // paddingRight: 10,
    // paddingTop: 2,
    padding: 10,
  },
});
