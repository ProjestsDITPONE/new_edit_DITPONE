import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  ActivityIndicator,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
  Share,
} from 'react-native';
import {connect} from 'react-redux';
import Headers from '../../../components/Headers';
import HeaderstageRegister from '../../../components/HeaderstageRegister';
import I18n from '../../../utils/I18n';
import {CheckBox, Overlay, ListItem, Input} from 'react-native-elements';
import Styles from './Style';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import CountryPicker from '../../../lib_edit/react-native-country-picker-modal/lib';
import RNPickerSelect from 'react-native-picker-select';
import DropDownItem from 'react-native-drop-down-item_edit';
import {borderColor} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {
  getDatarefer,
  getChooseMaket,
  getCategoryProduct,
  getCateProductsub,
  getCateProductdis,
} from '../../../actions/data.actions';
import {SearchableFlatList} from 'react-native-searchable-list';
import ImagePicker from 'react-native-image-picker';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const dadamenu3 = [
  {
    id: 1,
    txt: I18n.t('transalte_personal_information'),
  },
  {
    id: 2,
    txt: I18n.t('transalte_ฺฺAccompanying_Information'),
  },
  {
    id: 3,
    txt: I18n.t('translate_PRODUCTS'),
  },
  {
    id: 4,
    txt: 'ข้อมูลบริษัท',
    txt2: I18n.t('transalte_Participants'),
  },
];
const dadamenu1 = [
  {
    id: 1,
    txt: I18n.t('transalte_personal_information'),
  },
  {
    id: 2,
    txt: I18n.t('transalte_ฺฺAccompanying_Information'),
  },
  {
    id: 3,
    txt: I18n.t('translate_PRODUCTS'),
  },
  {
    id: 4,
    txt: I18n.t('transalte_Participants'),
  },
];
const data2 = [
  {Value: 'ผู้ผลิต', key: '1'},
  {Value: 'ผู้ส่งออก', key: '2'},
  {Value: 'บริษัทการค้าระหว่างประเทศ', key: '3'},
  {Value: 'อื่นๆ', key: '4'},
];

const dataProduct = [
  {
    id: 1,
    name: 'Product Category',
    nameText: 'Textiles, Garments and Fashion…',
    nameBrand: 'Product Brand Name',
    nameTextBrand: 'Mai Thai Thorr',
  },
];

const datamember = [
  {
    id: 1,
    name: 'ชาญวิทย์ สุวธารมย์',
  },
  {
    id: 2,
    name: 'ชาญวิทย์ สุวธารมย์',
  },
];
const dataCompany = [];

const datasearch = [];

class DevelopProfile extends React.Component {
  constructor(props) {
    const getDate = new Date();
    super(props);
    this.state = {
      Allcontents: [
        {
          title: I18n.t('transalte_personal_information'),
        },
      ],
      Allcontents1: [
        {
          title: I18n.t('transalte_Juristic_Person_Information'),
        },
      ],

      Alldataoperator: [
        {
          title: I18n.t('transalte_ฺฺAccompanying_Information'),
        },
      ],
      Alldataproduct: [
        {
          title: I18n.t('translate_PRODUCTS'),
        },
      ],
      Alldatacompany: [
        {
          title: 'ข้อมูลบริษัท',
        },
      ],
      Alldatanumber: [
        {
          title: I18n.t('transalte_Participants'),
        },
      ],
      ///////เก็บข้อมูลข้อทมูลประกอบ
      checkBoxbisness: [],
      keybsiness: [],

      /////////////////////////
      ///////เก็บข้อมูลข้อมูลตลาดที่สนใจ
      dataMaket: [],
      openPopupmaket: false,
      searchTerm: '',
      searchAttribute: 'marketnameth',
      searchByTitle: false,
      ignoreCase: true,

      ////////////////////////////////////////////เก็บข้อมูลรูปภาพ/////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////////////////////
      datamarketIns: [],
      datatypeIbusiness: [],
      textIDjustic: null,
      searchByTitle: false,
      sucess: false,
      openphonenumber: false,
      checkPolicy: false,
      Addcompany: false,
      AddProduct: false,
      editdata: false,
      idBusiness: 0,
      checkBox: [],
      idDelete: [],
      inputdisble: false,
      checkeditmenu2: false,
      openCodenumber: false,
      idBusiness: 0,
      checkBox: [],
      idDelete: [],
      inputdisble: false,
      checkeditmenu0: false,
      openCodenumber: false,
      getProduct: [],
      AddProduct: false,
      DeleteProduct: false,
      AddPersonativity: false,
      Deletemember: false,
      // month: Moment(new Date(), 'MM YYYY'),
      ddmmyyy: Moment(new Date(), 'DD MM YYYY'),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), 'DD MM YYYY'),
      Isative: 0,
      IDcard:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.cid,

      number_tel:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.tel
          : '',
      number_naturalID:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : '',
      number_email:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.email
          : '',

      userstatus_category:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getStatus1.isResult.status_ditp.nameTh
          : '',

      nember_usernameTh:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.nameTh
          : '',
      nember_lastusernameTh:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.lastnameTh
          : '',

      nember_usernameEn:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.nameEn
          : '',
      nember_lastusernameEn:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.lastnameEn
          : '',

      corporate:
        this.props.getUser.userDetails.res_result.corporate != undefined
          ? getUser.userDetails.res_result.corporate.name
          : '',
      contact_address:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.address
          : '',

      contact_district:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.district
          : '',

      contact_postcode:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.postcode
          : '',

      contact_province:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.province
          : '',

      contact_subdistrict:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.subdistrict
          : '',
      /////////////////////////////// ข้อมูลของ นิติบุคคล ///////////////////////////
      company_nameTH:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.company.nameTh,
      company_nameEN:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.company.nameEn,

      contact_address_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.contact.address,

      contact_district_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.contact.district,

      contact_postcode_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.contact.postcode,

      contact_province_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.contact.province,

      contact_subdistrict_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.contact.subdistrict,

      subnumber_email_type1:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.sub_member.email,

      countryCode: 'TH',
      CountryCodePhone: '+66',

      ////////////////////////////////เก็บข้อมูผู้เข้าร่วมกิจกรรม/////////////////////////////
      namememberTH: null,
      lastnamememberTH: null,

      namememberEN: null,
      lastnamememberEN: null,
      membercareer: null,
      memberCenter: null,
      memberposition: null,
      membercontry: null,
      memberpostcode: null,
      memberstatesub: null,
      memberstaetdis: null,
      memberaddress: null,
      memberemail: null,
      membertel: null,

      ////////////////////////////////เก็บข้อมูล สินค้า และรูปภาพ //////////////////////////////////////////////////
      productDescritionEN: null,
      productDescritionTH: null,
      productBrandnameEN: null,
      productBrandnameTH: null,

      imageUrl: null,
      imagefilename: null,

      /////////////////เก็บข้อมูลประเภทสินค้า/////////////////////////////////////////////////////////////
      dataCategoryProduct: [],
      textcateproduct: null,
      idcateproduct: 0,

      dataCategoryProductsub: [],
      textcateproductsub: null,
      idcateproductsub: 0,

      dataCategoryProductdis: [],
      textcateproductdis: null,
      idcateproductdis: 0,

      ////////////////////////////////////////////////////////////////////////////////////////////////
    };
  }
  onSelect = country => {
    // setformat(country.callingCode[0]);
    this.setState({countryCode: country.cca2});
    this.setState({CountryCodePhone: '+' + country.callingCode[0]});
  };

  checkPolicy = item => {
    if (this.state.checkPolicy === false) {
      this.setState({checkPolicy: true});
    } else {
      this.setState({checkPolicy: false});
    }
  };

  PhoneNum(item) {
    var phone =
      this.state.CountryCodePhone +
      ' ' +
      item.substring(1, 3) +
      item.substring(3, 6) +
      ' ' +
      item.substring(6, 10);

    return phone;
  }
  idcardh(naturalId) {
    console.log('FGFGFG', naturalId);
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

  ////////////////////////////////////////setdata ////////////////////////////////////////////////

  editProfile = async value => {
    try {
      if (this.props.getUser.userDetails.res_result.type === 3) {
        console.log('contact_postcode', this.state.contact_postcode);
        // const payload = {
        //   result: {
        //     code: 'Bearer ' + authData.token,
        //     client_id: 'SS0047423',
        //     member: {
        //       titleTh: title,
        //       nameTh: name,
        //       lastnameTh: lname,
        //       tel: phoneN,
        //       tel_code: CountryCodePhone,
        //       tel_country_code: countryCode,
        //       email: email,
        //     },
        //     addressTh: {
        //       address: address,
        //       province: province,
        //       district: district,
        //       subdistrict: subdistrict,
        //       postcode: postcode,
        //     },
        //     addressEn: {
        //       address: addressEN,
        //       province: provinceEN,
        //       district: districtEN,
        //       subdistrict: subdistrictEN,
        //       postcode: postcodeEN,
        //     },
        //   },
        // };
      }
    } catch (error) {}
  };
  //////////////////////////////////////// getdata//////////////////////////////////////////////

  componentDidMount() {
    this.getDataMenu2();
    this.getDataMaket();
    this.getCategoryProduct();
    // this.getCategoryProductsub();
  }

  //ดึงข้อมูลผู้ประกอบการ
  getDataMenu2 = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      // console.log('authData', authData);
      const response = await this.props.dispatch(
        getDatarefer({
          token: payload,
        }),
      );
      // console.log('response.results');
      // console.log(response.results[1]);

      response.results[1].Items.map(databusiness => {
        databusiness.Data.map(Datatypebusiness => {
          this.state.datatypeIbusiness.push({
            key: Datatypebusiness.Key.toString(),
            Value: Datatypebusiness.Value.toString(),
          });
        });
      });
    } catch (error) {}
  };
  getDataMaket = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getChooseMaket({
          token: payload,
        }),
      );

      response.results[0].Items.map(dataMakets => {
        dataMakets.Data.map(Datamaket => {
          this.state.dataMaket.push({
            id: Datamaket.ActivityExportMarketId.toString(),
            marketnameth: Datamaket.ExportMarketNameTH.toString(),
            marketnameen: Datamaket.ExportMarketNameEN.toString(),
          });
        });
      });
    } catch (error) {}
  };

  getCategoryProduct = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCategoryProduct({
          token: payload,
        }),
      );
      response.results[0].Items.map(datacate => {
        datacate.Data.map(Datacatepro => {
          this.state.dataCategoryProduct.push({
            idcategoryproduct: Datacatepro.ProductCategoryId.toString(),
            namecategoryproductTH: Datacatepro.ProductCategoryNameTH.toString(),
            namecategoryproductEN: Datacatepro.ProductCategoryNameEN.toString(),
            ProductType: Datacatepro.ProductType.toString(),
          });
        });
      });
    } catch (error) {}
  };

  getCategoryProductsub = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductsub({
          token: payload,
          idSubcate: this.state.idcateproduct,
        }),
      );

      response.results[0].Items.map(datacatesub => {
        datacatesub.Data.map(Datasub => {
          this.state.dataCategoryProductsub.push({
            idProsub: Datasub.ProductSubCategoryId.toString(),
            nameThsub: Datasub.ProductSubCategoryNameTH.toString(),
            nameENsub: Datasub.ProductSubCategoryNameEN.toString(),
          });
        });
      });
      // console.log(response.results[0])
    } catch (error) {}
  };

  getCategoryProductdis = async value => {
    try {
      console.log('idcateproductsub', this.state.idcateproductsub);
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductdis({
          token: payload,
          idSubcate: this.state.idcateproductsub,
        }),
      );

      response.results[0].Items.map(datacatesub => {
        datacatesub.Data.map(Datasub => {
          this.state.dataCategoryProductdis.push({
            idProdis: Datasub.ProductGroupId.toString(),
            nameThdis: Datasub.ProductGroupNameTH.toString(),
            nameENdis: Datasub.ProductGroupNameEN.toString(),
          });
        });
      });
      console.log(response.results[0]);
    } catch (error) {}
  };

  imageGalleryLaunch = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
    };
    ImagePicker.launchImageLibrary(options2, response => {
      if (!response.didCancel) {
        let path = response.uri;

        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!response.fileName) {
          response.fileName = path.split('/').pop();
        }

        this.setState({
          imageUrl: response.uri,
          imagefilename: response.fileName,
        });
      }
    });
  };

  render() {
    const {
      searchTerm,
      searchByTitle,
      searchAttribute,
      ignoreCase,
      dataMaket,
    } = this.state;
    console.log('dataMaket', dataMaket);
    return (
      <View style={{flex: 1}}>
        <KeyboardAvoidingView behavior={10} style={{flex: 1}}>
          <>
            {this.props.getUser.userDetails.res_result.type === 3 && (
              <View style={{}}>
                <View style={{flex: 1}}>
                  <ImageBackground
                    source={require('../../../image/bgregister.png')}
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 125}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={{flex: 1, marginTop: 25}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        เลขบัตรประชาชน (Username)
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        {this.idcardh(this.state.IDcard)}
                      </Text>
                    </View>
                  </ImageBackground>

                  <ImageBackground
                    source={require('../../../image/bgregister.png')}
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 155}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={{flex: 1, marginTop: 30}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        ชื่อ - นามสกุล
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        {this.state.nember_usernameTh} {''}{' '}
                        {this.state.nember_lastusernameTh}
                      </Text>
                    </View>
                  </ImageBackground>

                  <ImageBackground
                    source={require('../../../image/bgregister.png')}
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 155}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={{flex: 1, marginTop: 30}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        Name-Surname
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        {this.state.nember_usernameEn}{' '}
                        {this.state.nember_lastusernameEn}
                      </Text>
                    </View>
                  </ImageBackground>

                  {this.state.editdata === false ? (
                    <ImageBackground
                      source={require('../../../image/bgregister.png')}
                      resizeMode={'stretch'}
                      imageStyle={{width: '100%', height: 160}}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <View style={{flex: 1, marginTop: 30}}>
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
                          {this.state.contact_address}{' '}
                          {this.state.contact_subdistrict === null ? '' : 'ต.'}
                          {this.state.contact_subdistrict}{' '}
                          {this.state.contact_district === null ? '' : 'อ.'}
                          {this.state.contact_district}{' '}
                          {this.state.contact_province === null ? '' : 'จ.'}
                          {this.state.contact_province}{' '}
                          {this.state.contact_postcode}{' '}
                        </Text>
                      </View>
                    </ImageBackground>
                  ) : (
                    <KeyboardAvoidingView style={{}}>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',
                                marginHorizontal: 35,
                              }}>
                              รหัสไปรษณีย์
                            </Text>
                            <Text
                              style={{
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              onChangeText={text => {
                                this.setState({contact_postcode: text});
                              }}
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 10,
                                flex: 1,
                              }}>
                              {this.state.contact_postcode}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                          marginTop: -10,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',

                                marginHorizontal: 35,
                              }}>
                              จังหวัด
                            </Text>
                            <Text
                              style={{
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              onChangeText={contact_province => {
                                this.setState({contact_postcode: text});
                              }}
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 10,
                                flex: 1,
                              }}>
                              {this.state.contact_province}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                          marginTop: -10,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',

                                marginHorizontal: 35,
                              }}>
                              อำเภอ/เขต
                            </Text>
                            <Text
                              style={{
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 10,

                                flex: 1,
                              }}>
                              {this.state.contact_district}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                          marginTop: -10,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',

                                marginHorizontal: 35,
                              }}>
                              ตำบล/แขวง
                            </Text>
                            <Text
                              style={{
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              style={{
                                fontSize: 24,
                                color: '#73838f',

                                marginHorizontal: 10,

                                flex: 1,
                              }}>
                              {this.state.contact_subdistrict}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                          marginTop: -10,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
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
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              style={{
                                fontSize: 24,
                                color: '#73838f',

                                marginHorizontal: 10,
                                flex: 1,
                              }}>
                              {this.state.contact_address}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 120}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                          marginTop: -10,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',

                                marginHorizontal: 35,
                              }}>
                              อีเมล
                            </Text>
                            <Text
                              style={{
                                color: 'red',
                                left: -32,
                              }}>
                              *
                            </Text>
                          </View>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 35,
                            }}>
                            <TextInput
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 10,
                                flex: 1,
                              }}>
                              {this.state.number_email}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                      <View style={{marginBottom: 40}}>
                        <ImageBackground
                          source={require('../../../image/bgregister.png')}
                          resizeMode={'stretch'}
                          imageStyle={{width: '100%', height: 120}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            marginTop: -10,
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
                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 28, width: '100%'}}
                              style={{
                                flexDirection: 'row',

                                marginHorizontal: 35,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({openphonenumber: true});
                                }}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <CountryPicker
                                  // close={this.setState({openphonenumber: false})}
                                  containerButtonStyle={{bottom: 0}}
                                  countryCode={this.state.countryCode}
                                  withFlag={true}
                                  withFilter={true}
                                  withEmoji={true}
                                  withCallingCode={true}
                                  withAlphaFilter={false}
                                  onSelect={iii => {
                                    console.log('OKOOKOK', iii);
                                    this.onSelect(iii);
                                  }}
                                  visible={this.state.openphonenumber}
                                />
                                <Image
                                  style={{
                                    width: 12,
                                    height: 7,

                                    right: 3,
                                    top: Platform.OS === 'ios' ? 1 : 3,
                                  }}
                                  source={require('../../../image/arrowtitle.png')}
                                />
                              </TouchableOpacity>
                              <TextInput
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 35,
                                  marginTop: 0,
                                  flex: 1,
                                  right: 25,
                                }}>
                                {this.PhoneNum(this.state.number_tel)}
                              </TextInput>
                            </ImageBackground>
                          </View>
                        </ImageBackground>
                      </View>
                    </KeyboardAvoidingView>
                  )}

                  {this.state.editdata === false && (
                    <ImageBackground
                      source={require('../../../image/bgregister.png')}
                      resizeMode={'stretch'}
                      imageStyle={{width: '100%', height: 125}}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <View style={{flex: 1, marginTop: 25}}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#163c70',

                            marginHorizontal: 35,
                          }}>
                          อีเมล
                        </Text>

                        <Text
                          style={{
                            fontSize: 24,
                            color: '#73838f',
                            marginHorizontal: 35,
                            marginTop: 0,
                          }}>
                          {this.state.number_email}
                        </Text>
                      </View>
                    </ImageBackground>
                  )}

                  {this.state.editdata === false && (
                    <View style={{marginBottom: 40}}>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 125}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
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
                          <View
                            style={{
                              flexDirection: 'row',

                              marginHorizontal: 35,
                            }}>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CountryPicker
                                close={true}
                                containerButtonStyle={{bottom: 0}}
                                countryCode={this.state.countryCode}
                                withFlag={true}
                                withFilter={true}
                                withEmoji={true}
                                withCallingCode={true}
                                withAlphaFilter={false}
                                onSelect={iii => {
                                  console.log('OKOOKOK', iii);
                                  this.onSelect(iii);
                                }}
                                visible={false}
                              />
                              <Image
                                style={{
                                  width: 12,
                                  height: 7,

                                  right: 3,
                                  top: Platform.OS === 'ios' ? 1 : 3,
                                }}
                                source={require('../../../image/arrowtitle.png')}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 35,
                                marginTop: 0,
                                flex: 1,

                                right: 25,
                              }}>
                              {this.PhoneNum(this.state.number_tel)}
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                </View>
                {this.state.editdata === false && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({editdata: true});
                    }}
                    style={{
                      backgroundColor: '#f86767',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}>
                      {I18n.t('transalte_Edit_Juristic_Information')}
                    </Text>
                  </TouchableOpacity>
                )}
                {/* เช็ดปุ่ม ถ้ากดแก้ไขก็จะเปลี่ยนปุ่มเป็นบันทึก */}
                {this.state.editdata === false ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({Isative: 1});
                    }}
                    style={{
                      backgroundColor: '#2d6dc4',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          color: '#FFFFFF',
                        }}>
                        {I18n.t('translate_Next')}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Icon
                        name="chevron-right"
                        size={25}
                        style={{
                          color: '#FFFFFF',
                          // marginTop: 9.1,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.editProfile();
                      this.setState({
                        editdata: false,
                      });
                    }}
                    style={{
                      backgroundColor: '#2d6dc4',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          color: '#FFFFFF',
                        }}>
                        {I18n.t('translate_Save')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {this.props.getUser.userDetails.res_result.type === 1 && (
              <View>
                <View style={{flex: 1}}>
                  <ImageBackground
                    source={
                      this.state.checkeditmenu0 === false
                        ? require('../../../image/bgregister.png')
                        : require('../../../image/bglock.png')
                    }
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 123}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, marginTop: 25}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        หมายเลขสมาชิกกรม
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        -
                      </Text>
                    </View>
                  </ImageBackground>

                  <>
                    {this.props.getStatus1.isResult != undefined && (
                      <>
                        {this.props.getStatus1.isResult.status_ditp.status !=
                          'not active ditp' && (
                          <ImageBackground
                            source={
                              this.state.checkeditmenu0 === false
                                ? require('../../../image/bgregister.png')
                                : require('../../../image/bglock.png')
                            }
                            resizeMode={'stretch'}
                            imageStyle={{width: '100%', height: 125}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <View style={{flex: 1, marginTop: 25}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 35,
                                }}>
                                ประเภทสมาชิกกรม
                              </Text>
                              <Text
                                style={{
                                  fontSize: 22,
                                  color: '#73838f',
                                  marginHorizontal: 35,
                                  marginTop: 0,
                                }}>
                                {this.state.userstatus_category}
                              </Text>
                            </View>
                          </ImageBackground>
                        )}
                      </>
                    )}
                  </>
                  <ImageBackground
                    source={
                      this.state.checkeditmenu0 === false
                        ? require('../../../image/bgregister.png')
                        : require('../../../image/bglock.png')
                    }
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 125}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={{flex: 1, marginTop: 25}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        เลขนิติบุคคล (Username)
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        {this.idcardh(this.state.IDcard)}
                      </Text>
                    </View>
                  </ImageBackground>

                  <ImageBackground
                    source={
                      this.state.checkeditmenu0 === false
                        ? require('../../../image/bgregister.png')
                        : require('../../../image/bglock.png')
                    }
                    resizeMode={'stretch'}
                    imageStyle={{width: '100%', height: 155}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View style={{flex: 1, marginTop: 30}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#163c70',

                          marginHorizontal: 35,
                        }}>
                        บริษัท / กิจการ
                      </Text>
                      <Text
                        style={{
                          fontSize: 24,
                          color: '#73838f',
                          marginHorizontal: 35,
                          marginTop: 0,
                        }}>
                        {this.state.company_nameTH}
                      </Text>
                      {/* edit ตอนclick แก้ไข */}
                    </View>
                  </ImageBackground>
                  {this.state.checkeditmenu0 === false && (
                    <ImageBackground
                      source={require('../../../image/bgregister.png')}
                      resizeMode={'stretch'}
                      imageStyle={{width: '100%', height: 155}}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <View style={{flex: 1, marginTop: 30}}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#163c70',

                            marginHorizontal: 35,
                          }}>
                          Company
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#73838f',
                            marginHorizontal: 35,
                            marginTop: 0,
                          }}>
                          {this.state.company_nameEN}
                        </Text>
                      </View>
                    </ImageBackground>
                  )}
                  {this.state.checkeditmenu0 === false ? (
                    <>
                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 160}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <View style={{flex: 1, marginTop: 30}}>
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
                            {this.state.contact_address_type1}{' '}
                            {this.state.contact_address_type1 === null
                              ? ''
                              : 'ต.'}
                            {this.state.contact_subdistrict_type1}{' '}
                            {this.state.contact_subdistrict_type1 === null
                              ? ''
                              : 'อ.'}
                            {this.state.contact_district_type1}{' '}
                            {this.state.contact_province_type1 === null
                              ? ''
                              : 'จ.'}
                            {this.state.contact_province_type1}{' '}
                            {this.state.contact_postcode_type1}{' '}
                          </Text>
                          {/* edit ตอนclick แก้ไข */}
                        </View>
                      </ImageBackground>

                      <ImageBackground
                        source={require('../../../image/bgregister.png')}
                        resizeMode={'stretch'}
                        imageStyle={{width: '100%', height: 125}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <View style={{flex: 1, marginTop: 25}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 35,
                            }}>
                            อีเมล
                          </Text>
                          <Text
                            style={{
                              fontSize: 24,
                              color: '#73838f',
                              marginHorizontal: 35,
                              marginTop: 0,
                            }}>
                            {this.state.subnumber_email_type1}
                          </Text>
                        </View>
                      </ImageBackground>
                      <View style={{marginBottom: 40}}>
                        <ImageBackground
                          source={require('../../../image/bgregister.png')}
                          resizeMode={'stretch'}
                          imageStyle={{width: '100%', height: 125}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
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
                            <View
                              style={{
                                flexDirection: 'row',

                                marginHorizontal: 35,
                              }}>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <CountryPicker
                                  close={true}
                                  containerButtonStyle={{bottom: 0}}
                                  countryCode={this.state.countryCode}
                                  withFlag={true}
                                  withFilter={true}
                                  withEmoji={true}
                                  withCallingCode={true}
                                  withAlphaFilter={false}
                                  onSelect={iii => {
                                    console.log('OKOOKOK', iii);
                                    this.onSelect(iii);
                                  }}
                                  visible={false}
                                />
                                <Image
                                  style={{
                                    width: 12,
                                    height: 7,

                                    right: 3,
                                    top: Platform.OS === 'ios' ? 1 : 3,
                                  }}
                                  source={require('../../../image/arrowtitle.png')}
                                />
                              </TouchableOpacity>
                              <Text
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 35,
                                  marginTop: 0,
                                  flex: 1,

                                  right: 25,
                                }}>
                                {this.PhoneNum(this.state.number_tel)}
                              </Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        flex: 1,
                        backgroundColor: '#FFFFFF',

                        marginTop: 15,
                        marginHorizontal: 23,
                        paddingBottom: 20,
                        marginBottom: 20,
                      }}>
                      <View style={{flex: 1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 15,
                            }}>
                            รหัสไปรษณีย์
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            *
                          </Text>
                        </View>

                        {/* edit ตอนclick แก้ไข */}

                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 24,
                              color: '#73838f',

                              flex: 1,
                              marginHorizontal: 10,
                            }}>
                            {this.state.contact_postcode}
                          </TextInput>
                        </ImageBackground>
                      </View>
                      <View style={{flex: 1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 15,
                            }}>
                            จังหวัด
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            *
                          </Text>
                        </View>

                        {/* edit ตอนclick แก้ไข */}

                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 24,
                              color: '#73838f',

                              flex: 1,
                              marginHorizontal: 10,
                            }}>
                            {this.state.contact_province_type1}
                          </TextInput>
                        </ImageBackground>
                      </View>
                      <View style={{flex: 1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 15,
                            }}>
                            อำเภอ/เขต
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            *
                          </Text>
                        </View>

                        {/* edit ตอนclick แก้ไข */}

                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 24,
                              color: '#73838f',

                              flex: 1,
                              marginHorizontal: 10,
                            }}>
                            {this.state.contact_district_type1}
                          </TextInput>
                        </ImageBackground>
                      </View>
                      <View style={{flex: 1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 15,
                            }}>
                            ตำบล/แขวง
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            *
                          </Text>
                        </View>

                        {/* edit ตอนclick แก้ไข */}

                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 24,
                              color: '#73838f',

                              flex: 1,
                              marginHorizontal: 10,
                            }}>
                            {this.state.contact_subdistrict_type1}
                          </TextInput>
                        </ImageBackground>
                      </View>
                      <View style={{flex: 1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 15,
                            }}>
                            ที่อยู่ติดต่อ
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            *
                          </Text>
                        </View>

                        {/* edit ตอนclick แก้ไข */}

                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 15,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 24,
                              color: '#73838f',

                              flex: 1,
                              marginHorizontal: 10,
                            }}>
                            {this.state.contact_address_type1}
                          </TextInput>
                        </ImageBackground>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <View style={{flex: 1, marginTop: 10}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 20,
                            }}>
                            หมายเลขโทรศัพท์
                          </Text>

                          <ImageBackground
                            source={require('../../../image/inputedittext.png')}
                            resizeMode={'stretch'}
                            imageStyle={{height: 28, width: '100%'}}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 15,
                            }}>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CountryPicker
                                close={true}
                                containerButtonStyle={{bottom: 0}}
                                countryCode={this.state.countryCode}
                                withFlag={true}
                                withFilter={true}
                                withEmoji={true}
                                withCallingCode={true}
                                withAlphaFilter={false}
                                onSelect={iii => {
                                  console.log('OKOOKOK', iii);
                                  this.onSelect(iii);
                                }}
                                visible={false}
                              />
                              <Image
                                style={{
                                  width: 12,
                                  height: 7,

                                  right: 3,
                                  top: Platform.OS === 'ios' ? 1 : 3,
                                }}
                                source={require('../../../image/arrowtitle.png')}
                              />
                            </TouchableOpacity>
                            <TextInput
                              style={{
                                fontSize: 24,
                                color: '#73838f',
                                marginHorizontal: 25,
                                marginTop: 0,

                                right: 25,
                              }}>
                              {this.PhoneNum(this.state.number_tel)}
                            </TextInput>
                          </ImageBackground>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                {this.state.checkeditmenu0 === false && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({checkeditmenu0: true});
                    }}
                    style={{
                      backgroundColor: '#f86767',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}>
                      {I18n.t('transalte_Edit_Juristic_Information')}
                    </Text>
                  </TouchableOpacity>
                )}

                {this.state.checkeditmenu0 === false ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({Isative: 1});
                    }}
                    style={{
                      backgroundColor: '#2d6dc4',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          color: '#FFFFFF',
                        }}>
                        {I18n.t('translate_Next')}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Icon
                        name="chevron-right"
                        size={25}
                        style={{
                          color: '#FFFFFF',
                          // marginTop: 9.1,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({checkeditmenu0: false});
                    }}
                    style={{
                      backgroundColor: '#2d6dc4',
                      flex: 1,
                      height: 40,
                      marginHorizontal: 40,
                      borderRadius: 22,
                      marginBottom: 15,
                      justifyContent: 'center',
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          color: '#FFFFFF',
                        }}>
                        {I18n.t('translate_Save')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  getStatus1: state.dataReducer.getStatus,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevelopProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 70,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 110,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },

  container1: {
    flex: 0.5,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // paddingTop: 60,
  },
  header: {
    width: '100%',
    paddingVertical: 5,
    // paddingHorizontal: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d6dc4',
    // marginHorizontal: 15,
  },
  headerTxt: {
    fontSize: 12,
    color: 'rgb(74,74,74)',
    // marginRight: 60,
    flexWrap: 'wrap',
  },
  txt: {
    fontSize: 14,
  },
});
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 23,
    color: '#73838f',
    // paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingBottom: 5,
    flex: 0.8,
    width: '100%',
  },
  inputAndroid: {
    height: 40,
    fontSize: 23,
    color: '#73838f',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 70,
  },
  inputMore: {
    color: 'red',
  },
});
