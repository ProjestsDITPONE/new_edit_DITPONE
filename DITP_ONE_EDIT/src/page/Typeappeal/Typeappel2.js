import React, {Fragment} from 'react';
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
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {CheckBox, Overlay, Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import RNPickerSelect from 'react-native-picker-select';
import RNFetchBlob from 'rn-fetch-blob';
import Style from './Styles';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../utils/I18n';
import * as yup from 'yup';
import {Formik} from 'formik';
import FormSet1 from '../../components/FormDITPCare/FormSet1';
import FormSet2 from '../../components/FormDITPCare/FormSet2';
import FormSet3 from '../../components/FormDITPCare/FormSet3';
import FormSet4 from '../../components/FormDITPCare/FormSet4';
import FormSet5 from '../../components/FormDITPCare/FormSet5';
import FormSet33 from '../../components/FormDITPCare/FormSet33';
import FormSet34 from '../../components/FormDITPCare/FormSet34';
import DocoumentPicker from 'react-native-document-picker';
// import Swiper from 'react-native-swiper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {CompValidate} from '../../actions/data.actions';

class Typeappel2 extends React.Component {
  state = {
    n_company: null,
    branch: null,
    name: null,
    phone: null,
    c_email: null,
    register_num: null,
    adress: null,
    county: null,
    togleUser: null,
    slideHeight: 0, //1010,940,770,940,770,770
    swiperIndex: 0,
    slideFormName: '',
    slideIndex: '',
    pdf: [],
    sumForm: {},
  };

  constructor(props) {
    super(props);
    this.swiperRef = swiper => (this.swiper = swiper);
    this.formHeight = [];
    this.formName = [];
    this.formIndex = [];
    setTimeout(() => {
      this.setState({
        slideHeight: this.formHeight[0],
      });
      this.setState({
        slideFormName: this.formName[0],
      });
      // this.setState({
      //   slideIndex: this.formIndex[0],
      // });
    }, 100);

    this.validationCare2 = yup.object().shape({
      ///////////////// Form 2 /////////////////
      Set2temp1: yup.string().required('Required'),
      Set2temp2: yup.string(),
      Set2temp3: yup.string().required('Required'),
      Set2temp4: yup.string().required('Required'),
      Set2temp5: yup.string().required('Required'),
      Set2temp6: yup.number().required('Required'),
      Set2temp7: yup.number(),
      Set2temp8: yup.string().required('Required'),
      Set2temp9:
        this.props.route.params.profile_care.country_id == '162' ||
        this.props.route.params.formSetId_P1 == '9'
          ? yup.string().required('Required')
          : yup.string(),
      Set2temp10:
        this.props.route.params.profile_care.country_id != '162' &&
        this.props.route.params.formSetId_P1 != '9'
          ? yup.number().required('Required')
          : yup.number(),
    });

    this.validationCare3 = yup.object().shape({
      // ///////////////// Form 3 /////////////////
      Set3temp1: yup.string().required('Required'),
      Set3temp2: yup.string(),
      Set3temp6: yup.number(),
      Set3temp3: yup.string(),
      Set3temp4: yup.number(),
      Set3temp5: yup.string(),
      Set3temp10: yup.string().required('Required'),
      Set3temp7: yup.string().required('Required'),
      Set3temp8: yup.string().required('Required'),
      Set3temp9: yup.number(),
    });

    this.validationCare4 = yup.object().shape({
      // ///////////////// Form 4 /////////////////
      Set4temp1: yup.string().required('Required'),
      Set4temp2: yup.string(),
      Set4temp6: yup.string(),
      Set4temp3: yup.string(),
      Set4temp4: yup.number(),
      Set4temp5: yup.string(),
      Set4temp10: yup.string().required('Required'),
      Set4temp7: yup.string().required('Required'),
      Set4temp8: yup.string().required('Required'),
      Set4temp9: yup.number(),
    });

    this.validationCare5 = yup.object().shape({
      // ///////////////// Form 5 /////////////////
      Set5temp1: yup.string().required('Required'),
      Set5temp2: yup.string().required('Required'),
      textotherflag_comp1: yup.number(),
      Set5temp3: yup.string().required('Required'),
      Set5temp4: yup.number().required('Required'),
      Set5temp5: yup.string().required('Required'),
      Set5temp6: yup.string(),
    });

    this.validationCare33 = yup.object().shape({
      // ///////////////// Form 33 /////////////////
      Set33temp1: yup.string().required('Required'),
      Set33temp2: yup.string().required('Required'),
      Set33temp3: yup.string().required('Required'),
      Set33temp4: yup.string(),
      Set33temp5: yup.string(),
      Set33temp6: yup.number(),
      Set33temp7: yup.string(),
      Set33temp8: yup.string(),
    });

    this.validationCare34 = yup.object().shape({
      // ///////////////// Form 34 /////////////////
      Set34temp9: yup.string().required('Required'),
      Set34temp10: yup.string().required('Required'),
      textotherflag_comp2: yup.string(),
      Set34temp11: yup.string().required('Required'),
      Set34temp12: yup.number().required('Required'),
      Set34temp5: yup.string().required('Required'),
      Set34temp14: yup.string(),
    });
  }

  componentDidMount() {
    console.log(this.props.route.params.formSetId_P1, 'formSetId_P1');
    console.log(this.props.route.params.formSetId_P2, 'formSetId_P2');
    console.log(this.props.route.params.formSetId_P3, 'formSetId_P3');
    console.log(this.props.route.params.profile_care, 'country_id');
    console.log("this.props.route.params._Country",this.props.route.params._Country);
  }

  Picker = async value => {
    try {
      console.log('ค่า', value);
      const res = await DocoumentPicker.pickMultiple({
        type: [DocoumentPicker.types.allFiles],
        // readContent: true,
      });
      // console.log(res[0]);
      if (value == 1) {
        const fs = RNFetchBlob.fs;
        let imagePath = null;
        RNFetchBlob.config({
          fileCache: true,
        })
          .fetch('GET', res[0].uri)
          .then(resp => {
            imagePath = resp.path();
            return resp.readFile('base64');
          })
          .then(base64Data => {
            // console.log(base64Data);
            this.setState({
              pdf: [
                ...this.state.pdf,
                {
                  name: res[0].name,
                  base64: 'data:' + res[0].type + ';base64,' + base64Data,
                  name_file_change: res[0].name,
                  name_file_ori: res[0].name,
                },
              ],
            });
            return fs.unlink(imagePath);
          });
      } else {
        console.log('TEST');
        const fs = RNFetchBlob.fs;
        let imagePath = null;
        const filePath = res[0].uri;
        const file = await RNFetchBlob.fs.readFile(filePath, 'base64');

        this.setState({
          pdf: [
            ...this.state.pdf,
            {
              name: res[0].name,
              base64: 'data:' + res[0].type + ';base64,' + file,
              name_file_change: res[0].name,
              name_file_ori: res[0].name,
            },
          ],
        });
        return fs.unlink(imagePath);
        // });
      }
    } catch (err) {
      if (DocoumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  formHeightFun = text => {
    this.formName.push(text);
    if (text === 'FormSet2') {
      this.formHeight.push(920);
      this.formIndex.push(0);
    }
    if (text === 'FormSet3') {
      this.formHeight.push(940);
      this.formIndex.push(1);
    }
    if (text === 'FormSet4') {
      this.formHeight.push(940);
      this.formIndex.push(2);
    }
    if (text === 'FormSet5') {
      this.formHeight.push(690);
      this.formIndex.push(3);
    }
    if (text === 'FormSet33') {
      this.formHeight.push(770);
      this.formIndex.push(4);
    }
    if (text === 'FormSet34') {
      this.formHeight.push(690);
      this.formIndex.push(5);
    }
    // console.log(this.formIndex, 'formIndex');
  };

  setDeletePdf = pdfx => {
    this.setState({pdf: pdfx});
  };

  backFormslide = () => {
    if (this.formHeight[this.state.swiperIndex - 1] != undefined) {
      this.setState({
        slideHeight: this.formHeight[this.state.swiperIndex - 1],
        slideFormName: this.formName[this.state.swiperIndex - 1],
      });
    }
    const indexslide = this.formIndex[this.state.swiperIndex - 1];
    if (this.state.swiperIndex === 1) {
      this.setState({swiperIndex: 0}, async => {
        this.swiper.scrollToIndex({
          index: indexslide,
          animated: true,
        });
      });
    } else if (this.state.swiperIndex === 2) {
      this.setState({swiperIndex: 1}, async => {
        this.swiper.scrollToIndex({
          index: indexslide,
          animated: true,
        });
      });
    } else {
      this.props.navigation.goBack();
      console.log('exit');
    }

    setTimeout(() => {
      this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true});
    }, 500);
  };

  render() {
    // console.log(this.props.route.params.formSetName_P1);
    return (
      <View
        // source={require('../../image/backgroungType.png')}
        style={Style.backgroundView}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
          backDitpCare={true}
          backFormslide={this.backFormslide}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_Report')} />

        <Formik
          initialValues={{
            ///////////////// Form 2 /////////////////
            Set2temp1: '',
            Set2temp2: '',
            Set2temp3: '',
            Set2temp4: '',
            Set2temp5: '',
            Set2temp6: '',
            Set2temp7: '',
            Set2temp8: '',
            Set2temp9: '',
            Set2temp10: '',
            ///////////////// Form 3 /////////////////
            Set3temp1: '',
            Set3temp2: '',
            Set3temp6: '',
            Set3temp3: '',
            Set3temp4: '',
            Set3temp5: '',
            Set3temp10: '',
            Set3temp7: '',
            Set3temp8: '',
            Set3temp9: '',
            ///////////////// Form 4 /////////////////
            Set4temp1: '',
            Set4temp2: '',
            Set4temp6: '',
            Set4temp3: '',
            Set4temp4: '',
            Set4temp5: '',
            Set4temp10: '',
            Set4temp7: '',
            Set4temp8: '',
            Set4temp9: '',
            ///////////////// Form 5 /////////////////
            Set5temp1: '',
            Set5temp2: '',
            textotherflag_comp1: '',
            Set5temp3: '',
            Set5temp4: '',
            Set5temp5: '',
            Set5temp6: '',
            ///////////////// Form 33 /////////////////
            Set33temp1: '',
            Set33temp2: '',
            Set33temp3: '',
            Set33temp4: '',
            Set33temp5: '',
            Set33temp6: '',
            Set33temp7: '',
            Set33temp8: '',
            ///////////////// Form 34 /////////////////
            Set34temp9: '',
            Set34temp10: '',
            textotherflag_comp2: '',
            Set34temp11: '',
            Set34temp12: '',
            Set34temp5: '',
            Set34temp14: '',
          }}
          onSubmit={async (values, formikActions) => {
            this.interest = [];
            if (this.formHeight[this.state.swiperIndex + 1] != undefined) {
              this.setState({
                slideHeight: this.formHeight[this.state.swiperIndex + 1],
                slideFormName: this.formName[this.state.swiperIndex + 1],
              });
            }
            const indexslide = this.formIndex[this.state.swiperIndex + 1];
            if (this.state.swiperIndex === 0) {
              this.setState({swiperIndex: 1}, async => {
                this.swiper.scrollToIndex({
                  index: indexslide,
                  animated: true,
                });
              });
            } else if (
              this.state.swiperIndex === 1 &&
              this.formHeight.length > 2
            ) {
              this.setState({swiperIndex: 2}, async => {
                this.swiper.scrollToIndex({
                  index: indexslide,
                  animated: true,
                });
              });
            } else {
              if (
                this.props.route.params.formSetId_P1 == '6' ||
                (this.props.route.params.formSetId_P1 == '1' &&
                  this.props.route.params.profile_care.country_id == '162') ||
                (this.props.route.params.formSetId_P1 == '2' &&
                  this.props.route.params.profile_care.country_id != '162')
              ) {
                this.Form1 = {
                  ///////////////// Form 1 /////////////////
                  applnt_firstname: this.props.route.params.profile_care
                    .applnt_firstname,
                  applnt_lastname: this.props.route.params.profile_care
                    .applnt_lastname,
                  applnt_ident: this.props.route.params.profile_care
                    .applnt_ident,
                  applnt_career: this.props.route.params.profile_care
                    .applnt_career,
                  applnt_address: this.props.route.params.profile_care
                    .applnt_address,
                  applnt_prov_id: this.props.route.params.profile_care
                    .applnt_prov_id,
                  applnt_gender: this.props.route.params.profile_care
                    .applnt_gender,
                  applnt_mobile: this.props.route.params.profile_care
                    .applnt_mobile,
                  applnt_zipcode: this.props.route.params.profile_care
                    .applnt_zipcode,
                  applntOrg_position:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_position
                      : '',
                  applntOrg_name:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_name
                      : '',
                  applntOrg_branch:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_branch
                      : '',
                  applntOrg_trade_number:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care
                          .applntOrg_trade_number
                      : '',
                  applntOrg_address:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_address
                      : '',
                  applntOrg_prov_id:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_prov_id
                      : '',
                  applntOrg_zipcode:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_zipcode
                      : '',
                  applntOrg_tel:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_tel
                      : '',
                  applntOrg_fax:
                    this.props.route.params.profile_care.member_type == 1
                      ? this.props.route.params.profile_care.applntOrg_fax
                      : '',
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form1),
                });
              }

              if (
                this.props.route.params.formSetId_P1 == '9' ||
                (this.props.route.params.formSetId_P1 == '1' &&
                  this.props.route.params.profile_care.country_id != '162') ||
                (this.props.route.params.formSetId_P1 == '2' &&
                  this.props.route.params.profile_care.country_id == '162')
              ) {
                this.Form2 = {
                  ///////////////// Form 2 /////////////////
                  applntOrg_name: values.Set2temp1,
                  applntOrg_branch: values.Set2temp2,
                  applntOrg_position: values.Set2temp3,
                  applntOrg_trade_number: values.Set2temp4,
                  applntOrg_address: values.Set2temp5,
                  applntOrg_tel: values.Set2temp6,
                  applntOrg_fax: values.Set2temp7,
                  applntOrg_zipcode: values.Set2temp8,
                  applntOrg_country_id: values.Set2temp9,
                  applntOrg_prov_id: values.Set2temp10,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form2),
                });
              }

              if (this.props.route.params.formSetId_P2 == '3') {
                this.Form3 = {
                  // ///////////////// Form 3 /////////////////
                  complnt_name: values.Set3temp1,
                  complnt_branch: values.Set3temp2,
                  complnt_trade_number: values.Set3temp6,
                  complnt_contact_name: values.Set3temp3,
                  complnt_contact_tel: values.Set3temp4,
                  complnt_contact_email: values.Set3temp5,
                  complnt_import_export: values.Set3temp10,
                  complnt_contact_address: values.Set3temp7,
                  complnt_prov_id: values.Set3temp8,
                  complnt_zipcode: values.Set3temp9,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form3),
                });
              }

              if (
                this.props.route.params.formSetId_P2 == '4' ||
                this.props.route.params.formSetId_P2 == '10'
              ) {
                this.Form4 = {
                  // ///////////////// Form 4 /////////////////
                  complnt_name: values.Set4temp1,
                  complnt_branch: values.Set4temp2,
                  complnt_trade_number: values.Set4temp6,
                  complnt_contact_name: values.Set4temp3,
                  complnt_contact_tel: values.Set4temp4,
                  complnt_contact_email: values.Set4temp5,
                  complnt_import_export: values.Set4temp10,
                  complnt_contact_address: values.Set4temp7,
                  complnt_country_id: values.Set4temp8.v,
                  complnt_zipcode: values.Set4temp9,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form4),
                });
              }

              if (
                this.props.route.params.formSetId_P3 == '5' ||
                this.props.route.params.formSetId_P3 == '11'
              ) {
                this.Form5 = {
                  ///////////////// Form 5 /////////////////
                  caseDtl_title: values.Set5temp1,
                  prodType_id: values.Set5temp2.value,
                  prodType_other: values.textotherflag_comp1,
                  caseDtl_derivation: values.Set5temp3,
                  caseDtl_damage_val: values.Set5temp4,
                  curren_id: values.Set5temp5.v,
                  caseDtl_complnt_need: values.Set5temp6,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form5),
                });
              }

              if (this.props.route.params.formSetId_P1 == '6') {
                this.Form33 = {
                  ///////////////// Form 33 /////////////////
                  complnt_name: values.Set33temp1,
                  complnt_branch: values.Set33temp2,
                  complnt_position: values.Set33temp3,
                  complnt_birthday: values.Set33temp4,
                  complnt_age: values.Set33temp5,
                  complnt_contact_tel: values.Set33temp6,
                  complnt_contact_email: values.Set33temp7,
                  complnt_contact_address: values.Set33temp8,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form33),
                });
              }

              if (this.props.route.params.formSetId_P2 == '7') {
                this.Form34 = {
                  ///////////////// Form 34 /////////////////
                  caseDtl_title: values.Set34temp9,
                  incType_id: values.Set34temp10.v,
                  incType_other: values.textotherflag_comp2,
                  caseDtl_derivation: values.Set34temp11,
                  caseDtl_damage_val: values.Set34temp12,
                  curren_id: values.Set34temp5.v,
                  caseDtl_complnt_need: values.Set34temp14,
                };
                this.setState({
                  sumForm: Object.assign(this.state.sumForm, this.Form34),
                });
              }

              this.complnt_country_id = '';
              this.applntOrg_country_id = '';
              this.applntOrg_trade_number = '';
              this.applntOrg_name = '';
              this.applntOrg_import_export = '';
              this.applntOrg_branch = '';
              this.applntOrg_tel = '';
              this.applntOrg_fax = '';
              this.applntOrg_address = '';
              this.applnt_prov_id = '';

              if (
                this.props.route.params.formSetId_P3 == '5' ||
                this.props.route.params.formSetId_P3 == '11'
              ) {
                if (this.props.route.params.formSetId_P1 == '1') {
                  if (values.Set4temp8 != undefined) {
                    this.complnt_country_id = values.Set4temp8.v;
                  } else {
                    this.complnt_country_id = '';
                  }
                } else {
                  if (this.props.route.params.formSetId_P2 == '10') {
                    this.complnt_country_id = values.Set4temp8.v;
                  } else {
                    this.complnt_country_id = '162';
                  }
                }
              }

              if (this.props.route.params.profile_care.country_id != '162') {
                this.applnt_prov_id = 0;
              }
              if (this.props.route.params.formSetId_P1 != 2) {
                if (this.props.route.params.formSetId_P1 != 9) {
                  this.applntOrg_country_id = '';
                }
              } else {
                if (values.Set2temp9 != undefined) {
                  this.applntOrg_country_id = values.Set2temp9;
                } else {
                  if (
                    this.props.route.params.profile_care.country_id != '162'
                  ) {
                    this.applntOrg_country_id = this.props.route.params.profile_care.country_id;
                    this.applntOrg_trade_number = this.props.route.params.profile_care.applntOrg_trade_number;
                    this.applntOrg_name = this.props.route.params.profile_care.applntOrg_name;
                    this.applntOrg_import_export = values.Set4temp10;
                    this.applntOrg_branch = this.props.route.params.profile_care.applntOrg_branch;
                    this.applntOrg_tel = this.props.route.params.profile_care.applntOrg_tel;
                    this.applntOrg_fax = this.props.route.params.profile_care.applntOrg_fax;
                    this.applntOrg_address = this.props.route.params.profile_care.applntOrg_address;
                  } else {
                    this.applntOrg_country_id = '';
                  }
                }
              }

              this.FormALL = {
                complnt_country_id:
                  this.complnt_country_id != ''
                    ? this.complnt_country_id
                    : values.Set4temp8.v,
                applntOrg_country_id:
                  this.props.route.params.formSetId_P1 == 9
                    ? values.Set2temp9
                    : this.applntOrg_country_id,
                applntOrg_trade_number:
                  this.applntOrg_trade_number != ''
                    ? this.applntOrg_trade_number
                    : this.props.route.params.profile_care
                        .applntOrg_trade_number,
                applntOrg_name:
                  this.applntOrg_name != ''
                    ? this.applntOrg_name
                    : this.props.route.params.profile_care.applntOrg_name,
                applntOrg_import_export: this.applntOrg_import_export,
                applntOrg_branch:
                  this.applntOrg_branch != ''
                    ? this.applntOrg_branch
                    : this.props.route.params.profile_care.applntOrg_branch,
                applntOrg_tel:
                  this.applntOrg_tel != ''
                    ? this.applntOrg_tel
                    : this.props.route.params.profile_care.applntOrg_tel,
                applntOrg_fax:
                  this.applntOrg_fax != ''
                    ? this.applntOrg_fax
                    : this.props.route.params.profile_care.applntOrg_fax,
                applntOrg_address:
                  this.applntOrg_address != ''
                    ? this.applntOrg_address
                    : this.props.route.params.profile_care.applntOrg_address,
                applnt_prov_id:
                  this.applnt_prov_id != ''
                    ? this.applnt_prov_id
                    : this.props.route.params.profile_care.applnt_prov_id,
                applnt_firstname: this.props.route.params.profile_care
                  .applnt_firstname,
                applnt_lastname: this.props.route.params.profile_care
                  .applnt_lastname,
                applnt_gender: this.props.route.params.profile_care
                  .applnt_gender,
                applnt_mobile: this.props.route.params.profile_care
                  .applnt_mobile,
                applntOrg_name2: this.props.route.params.profile_care
                  .applntOrg_name,
                applnt_tel: this.props.route.params.profile_care.applnt_tel,
                applnt_country_id: this.props.route.params.profile_care
                  .country_id,
                applntOrg_trade_number2: this.props.route.params.profile_care
                  .applntOrg_trade_number,
                applnt_ident: this.props.route.params.profile_care.applnt_ident,
                ///////////////////// ALL /////////////////////
                compType_id: this.props.route.params.select_typeComp1,
                compTypeSub1_id: this.props.route.params.select_typeComp2,
                compTypeSub2_id: this.props.route.params.select_typeComp3,
                TxtTitle1: this.props.route.params.TxtTitle1,
                TxtTitle2: this.props.route.params.TxtTitle2,
                TxtTitle3: this.props.route.params.TxtTitle3,
                formSetId_P1: this.props.route.params.formSetId_P1,
                formSetId_P2: this.props.route.params.formSetId_P2,
                formSetId_P3: this.props.route.params.formSetId_P3,
                formSetName_P1: this.props.route.params.formSetName_P1,
                formSetName_P2: this.props.route.params.formSetName_P2,
                formSetName_P3: this.props.route.params.formSetName_P3,
                pdf: this.state.pdf,
                member_type: this.props.route.params.profile_care.member_type,
                country_id: this.props.route.params.profile_care.country_id,
                case_createBy_id: this.props.route.params.profile_care
                  .case_createBy_id,
                checkflag: this.props.route.params.checkflag,
              };
              this.setState({
                sumForm: Object.assign(this.state.sumForm, this.FormALL),
              });

              // console.log(this.state.sumForm);

              // try {
              //   const response = await this.props.dispatch(CompValidate());
              //   // console.log(response, 'term');
              //   if (response.success) {
              this.props.navigation.navigate('Typeappel4', this.state.sumForm);
              //   } else {
              //     throw response;
              //   }
              // } catch (error) {}
              console.log('data');
            }

            setTimeout(() => {
              this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true});
            }, 500);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 300);
          }}
          validationSchema={
            this.state.slideFormName === 'FormSet2'
              ? this.validationCare2
              : this.state.slideFormName === 'FormSet3'
              ? this.validationCare3
              : this.state.slideFormName === 'FormSet4'
              ? this.validationCare4
              : this.state.slideFormName === 'FormSet5'
              ? this.validationCare5
              : this.state.slideFormName === 'FormSet33'
              ? this.validationCare33
              : this.validationCare34
          }>
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            setFieldValue,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={{backgroundColor: '#F0F3F4', flex: 1, zIndex: -1}}>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.select({ios: 60, android: 78})}
                enabled>
                <ScrollView
                  ref={ref => {
                    this.scrollListReftop = ref;
                  }}>
                  <View style={[Style.headerContainer, {padding: 8}]}>
                    {this.props.route.params.TxtTitle1 != '' && (
                      <Text style={Style.headerText}>
                        {this.props.route.params.TxtTitle1}
                      </Text>
                    )}
                    {this.props.route.params.TxtTitle2 != '' && (
                      <Text style={Style.headerText}>
                        {this.props.route.params.TxtTitle2}
                      </Text>
                    )}
                    {this.props.route.params.TxtTitle3 != '' && (
                      <Text style={Style.headerText}>
                        {this.props.route.params.TxtTitle3}
                      </Text>
                    )}
                  </View>
                  {(this.props.route.params.formSetId_P1 == 6 ||
                    (this.props.route.params.formSetId_P1 == 1 &&
                      this.props.route.params.profile_care.country_id == 162) ||
                    (this.props.route.params.formSetId_P1 == 2 &&
                      this.props.route.params.profile_care.country_id !=
                        162)) && (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          if (this.state.togleUser === 0) {
                            this.setState({togleUser: null});
                          } else {
                            this.setState({togleUser: 0});
                          }
                        }}>
                        <LinearGradient
                          colors={['#59a6e4', '#2d6dc4']}
                          start={{x: 1, y: 0}}
                          style={Style.headerGradient}>
                          <Icon2
                            name="user"
                            size={24}
                            color="#fff"
                            style={{marginRight: 10}}
                          />
                          {/* <Text style={Style.headerGradientText}>
                            {this.props.route.params.formSetName_P1}
                          </Text> */}
                          <View style={Style.headerGradientIcon}>
                            <Icon
                              name={
                                this.state.togleUser === null
                                  ? 'downcircleo'
                                  : 'upcircleo'
                              }
                              size={20}
                              color="#fff"
                            />
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                      {this.state.togleUser === 0 && (
                        <View style={Style.ViewBox1}>
                          <View style={{height: 10}} />
                          <View style={Style.ViewIcon}>
                            <Icon2
                              name="user"
                              size={20}
                              color="#5D6D7E"
                              style={Style.IconUser}
                            />
                            <Text style={Style.textUser}>
                              {'  '}
                              {
                                this.props.route.params.profile_care
                                  .applnt_firstname
                              }{' '}
                              {
                                this.props.route.params.profile_care
                                  .applnt_lastname
                              }
                            </Text>
                          </View>
                          {this.props.route.params.profile_care.member_type ==
                            1 && (
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
                                {
                                  this.props.route.params.profile_care
                                    .applntOrg_name
                                }
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                  <View style={Style.bodyContainer2}>
                    <LinearGradient
                      colors={['#59a6e4', '#2d6dc4']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      style={[
                        Style.headerGradient,
                        {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                      ]}>
                      <Icon2
                        name="building-o"
                        size={24}
                        color="#fff"
                        style={{marginRight: 10}}
                      />
                      <Text style={Style.headerGradientText}>
                        {this.state.slideFormName === 'FormSet2'
                          ? this.props.route.params.formSetName_P1
                          : this.state.slideFormName === 'FormSet3'
                          ? this.props.route.params.formSetName_P2
                          : this.state.slideFormName === 'FormSet4'
                          ? this.props.route.params.formSetName_P2
                          : this.state.slideFormName === 'FormSet5'
                          ? this.props.route.params.formSetName_P3
                          : this.state.slideFormName === 'FormSet33'
                          ? this.props.route.params.formSetName_P2
                          : this.props.route.params.formSetName_P3}
                      </Text>
                    </LinearGradient>
                    <Text style={{display: 'none'}}>
                      {(this.formHeight = [])}
                      {(this.formIndex = [])}
                      {(this.formName = [])}
                    </Text>
                    <View
                      style={[
                        Style.wrapper,
                        Style.bodyContainer,
                        {
                          height:
                            this.state.slideHeight +
                            ((this.state.slideFormName === 'FormSet5' ||
                              this.state.slideFormName === 'FormSet34') &&
                              this.state.pdf.length * 60),
                        },
                      ]}>
                      {/* <Text>{this.state.slideIndex}</Text> */}
                      <SwiperFlatList
                        index={this.state.slideIndex}
                        showPagination={false}
                        renderAll={true}
                        disableGesture={true}
                        ref={this.swiperRef}>
                        {(this.props.route.params.formSetId_P1 == '9' ||
                          (this.props.route.params.formSetId_P1 == '1' &&
                            this.props.route.params.profile_care.country_id !=
                              '162') ||
                          (this.props.route.params.formSetId_P1 == '2' &&
                            this.props.route.params.profile_care.country_id ==
                              '162')) && (
                          <View style={Style.child}>
                            <FormSet2
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              province={this.props.route.params._Province}
                              setFieldValue={setFieldValue}
                              handleSubmit={handleSubmit}
                              touched={touched}
                              errors={errors}
                              formSetId_P1={
                                this.props.route.params.formSetId_P1
                              }
                              country_id={
                                this.props.route.params.profile_care.country_id
                              }
                              profile_care={
                                this.props.route.params.profile_care
                              }
                            />
                            {this.formHeightFun('FormSet2')}
                          </View>
                        )}

                        {this.props.route.params.formSetId_P2 == '3' && (
                          <View style={Style.child}>
                            <FormSet3
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              province={this.props.route.params._Province}
                              typeBusiness={
                                this.props.route.params._TypeBusiness
                              }
                              setFieldValue={setFieldValue}
                              touched={touched}
                              errors={errors}
                            />
                            {this.formHeightFun('FormSet3')}
                          </View>
                        )}
                        {(this.props.route.params.formSetId_P2 == '4' ||
                          this.props.route.params.formSetId_P2 == '10') && (
                          <View style={Style.child}>
                            <FormSet4
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              typeBusiness={
                                this.props.route.params._TypeBusiness
                              }
                              setFieldValue={setFieldValue}
                              touched={touched}
                              errors={errors}
                            />
                            {this.formHeightFun('FormSet4')}
                          </View>
                        )}

                        {(this.props.route.params.formSetId_P3 == '5' ||
                          this.props.route.params.formSetId_P3 == '11') && (
                          <View style={Style.child}>
                            <FormSet5
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              typeProduct={this.props.route.params._TypeProduct}
                              currency={this.props.route.params._Currency}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              errors={errors}
                              Picker={this.Picker}
                              pdf={this.state.pdf}
                              setDeletePdf={this.setDeletePdf}
                            />
                            {this.formHeightFun('FormSet5')}
                          </View>
                        )}
                        {this.props.route.params.formSetId_P1 == '6' && (
                          <View style={Style.child}>
                            <FormSet33
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              errors={errors}
                            />
                            {this.formHeightFun('FormSet33')}
                          </View>
                        )}
                         {/* {this.props.route.params.formSetId_P2 == '7' && ( */}
                        {this.props.route.params.formSetId_P2 == '8' && (
                          <View style={Style.child}>
                            <FormSet34
                              handleChange={handleChange}
                              values={values}
                              setFieldTouched={setFieldTouched}
                              country={this.props.route.params._Country}
                              currency={this.props.route.params._Currency}
                              typeBusiness={
                                this.props.route.params._TypeBusiness
                              }
                              incorrectType={
                                this.props.route.params._IncorrectType
                              }
                              setFieldValue={setFieldValue}
                              touched={touched}
                              errors={errors}
                              Picker={this.Picker}
                              pdf={this.state.pdf}
                              setDeletePdf={this.setDeletePdf}
                            />
                            {this.formHeightFun('FormSet34')}
                          </View>
                        )}
                      </SwiperFlatList>
                    </View>
                    <View style={Style.ViewBTN}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={Style.BTN1}>
                        <Text style={Style.BTNText}>
                          {I18n.t('translate_Next')}
                        </Text>
                      </TouchableOpacity>
                      {this.state.swiperIndex == 0 && (
                        <Image
                          style={{width: 42, height: 10, marginTop: 10}}
                          source={require('../../image/page1.png')}
                        />
                      )}
                      {this.state.swiperIndex == 1 && (
                        <Image
                          style={{width: 42, height: 10, marginTop: 10}}
                          source={require('../../image/page2.png')}
                        />
                      )}
                      {this.state.swiperIndex == 2 && (
                        <Image
                          style={{width: 42, height: 10, marginTop: 10}}
                          source={require('../../image/page3.png')}
                        />
                      )}
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default Typeappel2;
