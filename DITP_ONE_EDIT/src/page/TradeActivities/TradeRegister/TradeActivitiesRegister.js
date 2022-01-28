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
import Headerstage from '../../../components/Headerstage';
import Styles from '../Styles';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox, Overlay, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import CountryPicker from '../../../lib_edit/react-native-country-picker-modal';
import RNPickerSelect from 'react-native-picker-select';
import DropDownItem from 'react-native-drop-down-item_edit';
import I18n from '../../../utils/I18n';
import {width} from '../../Typeappeal/Styles';
import ImagePicker from 'react-native-image-picker';
import {
  getDatarefer,
  getChooseMaket,
  getCategoryProduct,
  getCateProductsub,
  getCateProductdis,
  Getactivefrom,
} from '../../../actions/data.actions';
const height = Dimensions.get('window').height;

const IC_ARR_DOWN = require('../../../image/arrowdownx.png');
const IC_ARR_UP = require('../../../image/ArrowUpx.png');

const dada = [
  {
    id: 1,
    txt: I18n.t('transalte_Juristic_Person_Information'),
  },
  {
    id: 2,
    txt: I18n.t('transalte_ฺฺAccompanying_Information'),
  },
  {
    id: 3,
    txt: I18n.t('transalte_contact_information'),
  },
  {
    id: 4,
    txt: I18n.t('translate_PRODUCTS'),
  },
  {
    id: 5,
    txt: I18n.t('transalte_Expenses'),
  },
  {
    id: 6,
    txt: 'เอกสารแนบ',
  },
];
const datagoal = [
  {
    id: 1,
    name: I18n.t('transalte_importer'),
  },
  {
    id: 2,
    name: I18n.t('transalte_dealer'),
  },
  {
    id: 3,
    name: I18n.t('transalte_factor_manufacturer'),
  },
  {
    id: 4,
    name: I18n.t('transalte_other'),
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

const datastaff = [
  {
    id: 1,
    name: 'ชาญวิทย์ สุวธารมย์',
  },
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

class TradeActivitiesRegister extends React.Component {
  constructor(props) {
    const getDate = new Date();
    super(props);
    this.state = {
      Allprofile: [
        {
          title: I18n.t('transalte_Juristic_Person_Information'),
        },
      ],
      Alldataoperator: [
        {
          title: I18n.t('transalte_ฺฺAccompanying_Information'),
        },
      ],
      Allcontact: [
        {
          title: I18n.t('transalte_contact_information'),
        },
      ],
      Alldataproduct: [
        {
          title: I18n.t('translate_PRODUCTS'),
        },
      ],

      Allprice: [
        {
          title: I18n.t('transalte_Expenses'),
        },
      ],
      Allfile: [
        {
          title: I18n.t('transalte_Attachment'),
        },
      ],
      disbleinput: true,
      dataMaket: [],
      selectinputnember: 0,
      SelecIndex: 0,
      AddPersonativity: false,
      textIDjustic: null,
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
      Deletemember: false,
      // month: Moment(new Date(), 'MM YYYY'),
      ddmmyyy: Moment(new Date(), 'DD MM YYYY'),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), 'DD MM YYYY'),
      Isative: 0,
      dataCategoryProductdis: [],
      dataCategoryProductsub: [],
      dataCategoryProduct: [],
      IDcard:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.cid,

      number_tel:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.tel
          : this.props.getUser.userDetails.res_result.sub_member.tel,
      number_naturalID:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.naturalId,
      number_email:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.member.email
          : this.props.getUser.userDetails.res_result.sub_member.email,

      userstatus_category: this.props.getStatus1.isResult.status_ditp.nameTh,

      company_nameTH:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.company.nameTh,

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

      company_nameEN:
        this.props.getUser.userDetails.res_result.member != undefined
          ? ''
          : this.props.getUser.userDetails.res_result.company.nameEn,

      contact_address:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.address
          : this.props.getUser.userDetails.res_result.contact.address,

      contact_district:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.district
          : this.props.getUser.userDetails.res_result.contact.district,

      contact_postcode:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.postcode
          : this.props.getUser.userDetails.res_result.contact.postcode,

      contact_province:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.province
          : this.props.getUser.userDetails.res_result.contact.province,

      contact_subdistrict:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.addressTh.subdistrict
          : this.props.getUser.userDetails.res_result.contact.subdistrict,

      countryCode: 'TH',

      CountryCodePhone: '+66',
      //////////////////////////// state get img ///////////////////////////////
      imageUrl: null,
      imagefilename: null,
      imageUrl2: null,
      imagefilename2: null,

      imageUrl3: null,
      imagefilename3: null,

      imageUrl4: null,
      imagefilename4: null,

      imageUrl5: null,
      imagefilename5: null,

      imageUrl6: null,
      imagefilename6: null,

      imageUrl7: null,
      imagefilename7: null,

      imageUrl8: null,
      imagefilename8: null,
      //////////////////////////////////state คูหา //////////////////////////////////////
      num_price: 0,
      /////////////////////////////////////////////////////////////////////////////
      addmembrtyp: 0,
    };
  }
  componentDidMount() {
    this.getDataMaket();
    this.getCategoryProduct();
    this.getCategoryProductsub();
    this.getCategoryProductdis();
  }
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
          if (
            Datamaket.ActivityExportMarketId <= 100 &&
            Datamaket.ActivityExportMarketId != 1
          ) {
            this.state.dataMaket.push({
              id: Datamaket.ActivityExportMarketId.toString(),
              marketnameth: Datamaket.ExportMarketNameTH.toString(),
              marketnameen: Datamaket.ExportMarketNameEN.toString(),
            });
          }
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
  imageGalleryLaunch2 = () => {
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
          imageUrl2: response.uri,
          imagefilename2: response.fileName,
        });
      }
    });
  };

  imageGalleryLaunch3 = () => {
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
          imageUrl3: response.uri,
          imagefilename3: response.fileName,
        });
      }
    });
  };

  imageGalleryLaunch4 = () => {
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
          imageUrl4: response.uri,
          imagefilename4: response.fileName,
        });
      }
    });
  };

  imageGalleryLaunch5 = () => {
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
          imageUrl5: response.uri,
          imagefilename5: response.fileName,
        });
      }
    });
  };

  imageGalleryLaunch6 = () => {
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
          imageUrl6: response.uri,
          imagefilename6: response.fileName,
        });
      }
    });
  };

  imageGalleryLaunch7 = () => {
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
          imageUrl7: response.uri,
          imagefilename7: response.fileName,
        });
      }
    });
  };
  imageGalleryLaunch8 = () => {
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
          imageUrl8: response.uri,
          imagefilename8: response.fileName,
        });
      }
    });
  };
  selecitemDelete = ({item, index}) => {
    let {checkBox, idDelete, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.id.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idDelete.pop(item.id);
    }
    console.log(this.state.idDelete);
  };
  selecitemGroup = ({item, index}) => {
    this.setState({idDelete: index});
  };
  Listmember = ({item, index}) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../image/bgregister.png')}
          style={styles.image}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              marginHorizontal: 30,
              marginTop: 25,
            }}>
            <CheckBox
              textStyle={{
                fontSize: 20,
                color: '#73838f',
                fontWeight: 'normal',
                fontFamily: 'PSL Kittithada Pro',

                height: 30,
                paddingHorizontal: 10,
                marginHorizontal: 20,
              }}
              uncheckedIcon={
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 0.5,
                    width: 18,
                    height: 18,
                    borderColor: '#999999',
                    borderRadius: 2.6,
                  }}
                />
              }
              checkedIcon={
                <Image
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  source={require('../../../image/rrr.png')}
                />
              }
              title={item.name}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              checked={this.state.checkBox[index]}
              // disabled={true}
              onPress={() => {
                this.selecitemDelete({item: item, index: index});
              }}
            />

            <TouchableOpacity
              onPress={() => {
                // alert('Edit');
              }}
              style={{
                flex: 0.9,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Image
                style={{
                  width: 18,
                  height: 18,
                }}
                source={require('../../../image/penlist.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  ListmemberDelete = ({item, index}) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../image/bgregister.png')}
          style={styles.image}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              marginHorizontal: 30,
              marginTop: 25,
            }}>
            <CheckBox
              textStyle={{
                fontSize: 20,
                color: '#73838f',
                fontWeight: 'normal',
                fontFamily: 'PSL Kittithada Pro',

                height: 30,
                paddingHorizontal: 10,
                marginHorizontal: 20,
              }}
              uncheckedIcon={
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 0.5,
                    width: 18,
                    height: 18,
                    borderColor: '#999999',
                    borderRadius: 2.6,
                  }}
                />
              }
              checkedIcon={
                <Image
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  source={require('../../../image/rrrred.png')}
                />
              }
              title={item.name}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              checked={this.state.checkBox[index]}
              // disabled={true}
              onPress={() => {
                this.selecitemDelete({item: item, index: index});
              }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };
  ListdataGroupglod = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 2,

          backgroundColor: '#FFF',
        }}>
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: '#73838f',
            fontWeight: 'normal',
            fontFamily: 'PSL Kittithada Pro',

            // height: 30,
            // paddingHorizontal: 10,
            // marginHorizontal: 20,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: '#999999',
                borderRadius: 2.6,
              }}
            />
          }
          checkedIcon={
            <Image
              style={{
                width: 18,
                height: 18,
              }}
              source={require('../../../image/rrr.png')}
            />
          }
          title={
            <View>
              {index === 0 && (
                <View
                  style={{
                    marginHorizontal: 8,
                  }}>
                  <Text style={{color: '#163c70', fontSize: 20}}>
                    {item.name}
                  </Text>
                </View>
              )}
              {index === 1 && (
                <View
                  style={{
                    marginHorizontal: 8,
                  }}>
                  <Text style={{color: '#163c70', fontSize: 20}}>
                    {item.name}
                  </Text>
                </View>
              )}
              {index === 2 && (
                <View
                  style={{
                    marginHorizontal: 8,
                  }}>
                  <Text style={{color: '#163c70', fontSize: 20}}>
                    {item.name}
                  </Text>
                </View>
              )}

              {index === 3 && (
                <View style={{flexDirection: 'row', flex: 1, marginTop: 14}}>
                  <View
                    style={{
                      marginHorizontal: 8,
                    }}>
                    <Text style={{color: '#163c70', fontSize: 20}}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 8,

                      width: '80%',
                    }}>
                    <ImageBackground
                      source={require('../../../image/inputedittext.png')}
                      resizeMode={'stretch'}
                      imageStyle={{height: 28, width: '100%'}}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 10,
                        marginBottom: 10,
                      }}>
                      <TextInput
                        style={{
                          fontSize: 24,
                          color: '#73838f',
                          marginHorizontal: 10,
                          flex: 1,
                        }}
                      />
                    </ImageBackground>
                  </View>
                </View>
              )}
            </View>
          }
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          checked={this.state.idDelete === index ? true : false}
          // disabled={true}
          onPress={() => {
            this.selecitemGroup({item: item, index: index});
          }}
        />
      </View>
    );
  };
  MenuRegister = ({item, index}) => {
    return (
      <LinearGradient
        style={{
          borderRadius: 8,
          flex: 1,
          borderWidth: 1,
          marginVertical: 4,
          height: 34,
          justifyContent: 'center',
          borderColor: '#2d6dc4',
          marginLeft: index % 2 != 0 ? 0 : 5,
          marginRight: 5,
        }}
        colors={
          this.state.Isative == index
            ? ['#73a6eb', '#8182da']
            : ['#FFFFFF', '#FFFFFF']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onPress={() => {
            this.setState({Isative: index});
          }}>
          {this.state.Isative == index ? (
            <Text style={{textAlign: 'center', fontSize: 18, color: '#FFFFFF'}}>
              {item.txt}
            </Text>
          ) : (
            <Text style={{textAlign: 'center', fontSize: 18, color: '#2d6dc4'}}>
              {item.txt}
            </Text>
          )}
          <View
            style={{
              position: 'absolute',
              right: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon2
              name="circle"
              size={20}
              style={{color: '#FFF', position: 'absolute', top: 0, left: 0}}
            />
            <Icon2
              name="check-circle"
              size={20}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#39b54a',
              }}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  Listproduct = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 25,
          backgroundColor: '#FFF',
          shadowColor: '#f8f9fb',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: '#73838f',
            fontWeight: 'normal',
            fontFamily: 'PSL Kittithada Pro',

            // height: 30,
            // paddingHorizontal: 10,
            // marginHorizontal: 20,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: '#999999',
                borderRadius: 2.6,
              }}
            />
          }
          checkedIcon={
            <Image
              style={{
                width: 18,
                height: 18,
              }}
              source={require('../../../image/rrr.png')}
            />
          }
          title={
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text style={{color: '#163c70', fontSize: 20}}>{item.name}</Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.nameText}
              </Text>
              <Text style={{color: '#163c70', fontSize: 20}}>
                {item.nameBrand}
              </Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.nameTextBrand}
              </Text>
            </View>
          }
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          checked={this.state.checkBox[index]}
          // disabled={true}
          onPress={() => {
            this.selecitemProduct({item: item, index: index});
          }}
        />

        <TouchableOpacity
          onPress={() => {
            // alert('Edit');
          }}
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require('../../../image/penlist.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  ListproductDelete = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 25,
          backgroundColor: '#FFF',
          shadowColor: '#f8f9fb',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: '#73838f',
            fontWeight: 'normal',
            fontFamily: 'PSL Kittithada Pro',

            // height: 30,
            // paddingHorizontal: 10,
            // marginHorizontal: 20,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: '#999999',
                borderRadius: 2.6,
              }}
            />
          }
          checkedIcon={
            <Image
              style={{
                width: 18,
                height: 18,
              }}
              source={require('../../../image/rrrred.png')}
            />
          }
          title={
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text style={{color: '#163c70', fontSize: 20}}>{item.name}</Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.nameText}
              </Text>
              <Text style={{color: '#163c70', fontSize: 20}}>
                {item.nameBrand}
              </Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.nameTextBrand}
              </Text>
            </View>
          }
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          checked={this.state.checkBox[index]}
          // disabled={true}
          onPress={() => {
            this.selecitemProduct({item: item, index: index});
          }}
        />
      </View>
    );
  };

  selecitemProduct = ({item, index}) => {
    let {checkBox, idDelete, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.id.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idDelete.pop(item.id);
    }
    console.log(this.state.idDelete);
  };

  CheckMonthFull = month => {
    if (month === null) {
      return 'DD-MM';
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === 'th' ? (Month = 'มกราคม') : (Month = 'January');
      } else if (month === 2) {
        return I18n.locale === 'th'
          ? (Month = 'กุมภาพันธ์')
          : (Month = 'February');
      } else if (month === 3) {
        return I18n.locale === 'th' ? (Month = 'มีนาคม') : (Month = 'March');
      } else if (month === 4) {
        return I18n.locale === 'th' ? (Month = 'เมษายน') : (Month = 'April');
      } else if (month === 5) {
        return I18n.locale === 'th' ? (Month = 'พฤษภาคม') : (Month = 'May');
      } else if (month === 6) {
        return I18n.locale === 'th' ? (Month = 'มิถุนายน') : (Month = 'June');
      } else if (month === 7) {
        return I18n.locale === 'th' ? (Month = 'กรกฎาคม') : (Month = 'July');
      } else if (month === 8) {
        return I18n.locale === 'th' ? (Month = 'สิงหาคม') : (Month = 'August');
      } else if (month === 9) {
        return I18n.locale === 'th'
          ? (Month = 'กันยายน')
          : (Month = 'September');
      } else if (month === 10) {
        return I18n.locale === 'th' ? (Month = 'ตุลาคม') : (Month = 'October');
      } else if (month === 11) {
        return I18n.locale === 'th'
          ? (Month = 'พฤศจิกายน')
          : (Month = 'November');
      } else if (month === 12) {
        return I18n.locale === 'th'
          ? (Month = 'ธันวาคม')
          : (Month = 'December');
      }
    }
  };

  CheckMonth = month => {
    if (month === null) {
      return 'DD-MM';
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === 'th' ? (Month = 'ม.ค.') : (Month = 'JAN');
      } else if (month === 2) {
        return I18n.locale === 'th' ? (Month = 'ก.พ.') : (Month = 'FEB');
      } else if (month === 3) {
        return I18n.locale === 'th' ? (Month = 'มี.ค.') : (Month = 'MAR');
      } else if (month === 4) {
        return I18n.locale === 'th' ? (Month = 'เม.ย.') : (Month = 'APR');
      } else if (month === 5) {
        return I18n.locale === 'th' ? (Month = 'พ.ค.') : (Month = 'MAY');
      } else if (month === 6) {
        return I18n.locale === 'th' ? (Month = 'มิ.ย.') : (Month = 'JUN');
      } else if (month === 7) {
        return I18n.locale === 'th' ? (Month = 'ก.ค.') : (Month = 'JUL');
      } else if (month === 8) {
        return I18n.locale === 'th' ? (Month = 'ส.ค.') : (Month = 'AUG');
      } else if (month === 9) {
        return I18n.locale === 'th' ? (Month = 'ก.ย.') : (Month = 'SEP');
      } else if (month === 10) {
        return I18n.locale === 'th' ? (Month = 'ต.ค.') : (Month = 'OCT');
      } else if (month === 11) {
        return I18n.locale === 'th' ? (Month = 'พ.ย.') : (Month = 'NOV');
      } else if (month === 12) {
        return I18n.locale === 'th' ? (Month = 'ธ.ค.') : (Month = 'DEC');
      }
    }
  };

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
  Star_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + ' ' + this.CheckMonth(mm);
    return date.toString();
  }
  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }
  End_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm) + ' ';
    return date.toString();
  }

  End_Datet(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm) + ' ' + yyyy;
    return date.toString();
  }
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
  checkPolicy = item => {
    if (this.state.checkPolicy === false) {
      this.setState({checkPolicy: true});
    } else {
      this.setState({checkPolicy: false});
    }
  };
  currencyFormat = num => {
    // console.log('num', num);
    // return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // let num = 1000;
    var price = Number(num);
    return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  render() {
    const {
      StarD_1,
      EndD_1,
      name,
      detail,
      location,
      img,
    } = this.props.route.params;
    console.log(this.state.dataMaket);
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('transalte_ThailandWeek')} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 20}
          style={{flex: 1, zIndex: -1}}>
          <ScrollView style={{flex: 1}}>
            <ListItem
              containerStyle={{
                marginBottom: 8,
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 10,
                width: '95%',
                shadowColor: '#f4f6fa ',
                // shadowOffset: {
                //   width: 0,
                //   height: 1,
                // },
                // shadowOpacity: 0.18,
                // shadowRadius: 1.00,
              }}
              style={{
                width: '100%',
                height: null,
                flex: 1,
                backgroundColor: '#f4f5f850',
              }}
              leftAvatar={
                <View style={{alignItems: 'center', flex: 0.4}}>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={{alignItems: 'center'}}>
                      {/* <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 55, height: 50, borderRadius: 15}}
                  /> */}
                      <Image
                        source={{uri: img}}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#6f819a',
                          marginTop: 8,
                          textAlign: 'center',
                        }}>
                        {this.Star_Date(StarD_1)}
                        {this.End_Date(EndD_1)}
                        {this.Yearend(EndD_1)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              title={
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '100%'}}>
                      <Text
                        onPress={() => {}}
                        numberOfLines={2}
                        style={{
                          fontSize: 18,
                          color: '#4b4b4b',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {' '}
                        {name}{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        bottom: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        alignSelf: 'flex-start',
                      }}>
                      <Image
                        style={{width: 9, height: 12, top: 3}}
                        source={require('../../../image/makerlocation.png')}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',

                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        numberOfLines={2}
                        style={{fontSize: 15.5, color: '#6f819a'}}>
                        {'  '}
                        {location}
                      </Text>
                    </View>
                  </View>
                </View>
              }
              subtitle={
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 1,
                    top: 3,
                  }}>
                  <Image
                    style={{width: 17, height: 13}}
                    source={require('../../../image/readDetail.png')}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#7fadec',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {' '}
                    {I18n.t('translate_Readmore')}{' '}
                  </Text>
                </TouchableOpacity>
              }
            />

            {this.state.sucess === false ? (
              <View>
                <FlatList
                  style={{width: '95%', alignSelf: 'center'}}
                  data={dada}
                  renderItem={this.MenuRegister}
                  keyExtractor={item => item.id}
                  numColumns={2}
                />

                {/* เมนูนิติบุคคล */}
                {this.state.Isative === 0 && (
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
                            {I18n.t('transalte_Department_Members')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 22,
                              color: '#73838f',
                              marginHorizontal: 35,
                              marginTop: 0,
                            }}>
                            {this.state.number_naturalID}
                          </Text>
                        </View>
                      </ImageBackground>

                      <>
                        {this.props.getStatus1.isResult != undefined && (
                          <>
                            {this.props.getStatus1.isResult.status_ditp
                              .status != 'not active ditp' && (
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
                                    {I18n.t('transalte_Department_Category')}
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
                            {I18n.t('transalte_Number_Juristic')}
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
                            {I18n.t('transalte_Company_ฺBusiness')}
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
                                {I18n.t('transalte_contact')}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 22,
                                  color: '#73838f',
                                  marginHorizontal: 35,
                                  marginTop: 0,
                                }}>
                                {this.state.contact_address}{' '}
                                {this.state.contact_subdistrict === null
                                  ? ''
                                  : 'ต.'}
                                {this.state.contact_subdistrict}{' '}
                                {this.state.contact_district === null
                                  ? ''
                                  : 'อ.'}
                                {this.state.contact_district}{' '}
                                {this.state.contact_province === null
                                  ? ''
                                  : 'จ.'}
                                {this.state.contact_province}{' '}
                                {this.state.contact_postcode}{' '}
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
                                {I18n.t('translate_Email')}
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
                                  {I18n.t('translate_Phonenumber')}
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
                                {I18n.t('transalte_postcode')}
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
                                {I18n.t('transalte_province')}
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
                                {this.state.contact_province}
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
                                {I18n.t('transalte_district')}
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
                                {this.state.contact_district}
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
                                {I18n.t('transalte_sub_district')}
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
                                {this.state.contact_subdistrict}
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
                                {I18n.t('transalte_contact')}
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
                                {this.state.contact_address}
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
                                {I18n.t('translate_Phonenumber')}
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

                {/* ข้อมูลประกอบ */}
                {this.state.Isative === 1 && (
                  <View>
                    {this.state.checkeditmenu0 === false ? (
                      <View>
                        <View style={{paddingBottom: 40}}>
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
                                  {I18n.t('transalte_Number_Affiliates')}
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
                                  {I18n.t('transalte_Please_Specify')}
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
                                  {I18n.t('transalte_trade_association_member')}
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
                                  {I18n.t('transalte_License')}
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
                            <View style={{flex: 0.2, marginTop: 10}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 25,
                                }}>
                                {' '}
                                {I18n.t('transalte_Product_Exportation')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={
                                this.state.checkeditmenu0 === false
                                  ? require('../../../image/bgregister.png')
                                  : require('../../../image/bglock.png')
                              }
                              resizeMode={'stretch'}
                              imageStyle={{width: '100%', height: 150}}
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
                                  {I18n.t('transalte_current_business_operations_services')}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  ส่งออกข้าวโพดสำหรับเลี้ยงสัตว์
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
                                  {I18n.t('transalte_export_share_domestic')}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  75% : 25%
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
                                  {I18n.t('transalte_main_markets_countries')}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  Australia
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
                                  {I18n.t('transalte_expand_the_export_of_new_products_services_namely')}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  ส่งออกข้าวโพดสำหรับเลี้ยงสัตว์
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
                                  {I18n.t('transalte_There_new_markets_such_countries')}
                                  </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  Laos
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
                                  {I18n.t('transalte_Country_target_group')}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#73838f',
                                    marginHorizontal: 35,
                                    marginTop: 0,
                                  }}>
                                  {I18n.t('transalte_importer')}
                                </Text>
                              </View>
                            </ImageBackground>
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({checkeditmenu0: true});
                            }}
                            style={{
                              backgroundColor: '#f86767',
                              flex: 1,
                              height: 40,
                              marginHorizontal: 40,
                              borderRadius: 24,
                              marginBottom: 15,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 22,
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}>
                              {I18n.t('transalte_edit_accompanying_info')}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 40,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({Isative: 0});
                              }}
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#2d6dc4',
                                height: 40,
                                flex: 1,
                                borderRadius: 24,
                                // marginBottom: 15,
                                borderWidth: 1,
                                justifyContent: 'center',
                                marginHorizontal: 3,
                                // flexDirection: 'row',
                                alignItems: 'center',
                                display: 'flex',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginHorizontal: 5,
                                  transform: [{translateX: -10}],
                                }}>
                                <Icon
                                  name="chevron-left"
                                  size={25}
                                  style={{
                                    color: '#2d6dc4',
                                    marginTop: 0,
                                    flex: 0.5,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: '#2d6dc4',
                                    fontSize: 22,

                                    flex: 0.4,

                                    marginTop: 0,
                                  }}>
                                  {I18n.t('transalte_Bt_back')}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                this.setState({Isative: 2});
                              }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                flex: 1,
                                height: 40,
                                borderRadius: 24,
                                marginBottom: 15,
                                justifyContent: 'center',
                                marginHorizontal: 2,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 22,

                                  flex: 1,
                                  textAlign: 'center',
                                  marginTop: 5.5,
                                }}>
                                {I18n.t('translate_Next')}
                              </Text>
                              <Icon
                                name="chevron-right"
                                size={25}
                                style={{
                                  color: '#FFF',

                                  flex: 0.2,
                                  marginTop: 5.5,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={{flex: 1, marginTop: 15}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 15,
                          }}>
                          <View style={{flex: 1, marginTop: 15}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_Number_Affiliates')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 28, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginBottom: 10,
                              }}>
                              <TextInput
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 10,
                                  flex: 1,
                                }}
                              />
                            </ImageBackground>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_Please_Specify')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 60, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Input
                                // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                inputContainerStyle={{
                                  height: 50,
                                  borderBottomWidth: 0,
                                }}
                                numberOfLines={10}
                                multiline={true}

                                // onChangeText={value => setTextComment(value)}
                                // disabled={true}
                              />
                            </ImageBackground>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_trade_association_member')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 28, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginBottom: 10,
                              }}>
                              <TextInput
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 10,
                                  flex: 1,
                                }}
                              />
                            </ImageBackground>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 15,
                          }}>
                          <View style={{flex: 1, marginTop: 15}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_License')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 60, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Input
                                // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                inputContainerStyle={{
                                  height: 50,
                                  borderBottomWidth: 0,
                                }}
                                numberOfLines={10}
                                multiline={true}

                                // onChangeText={value => setTextComment(value)}
                                // disabled={true}
                              />
                            </ImageBackground>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            marginTop: 15,
                            marginHorizontal: 20,
                            paddingBottom: 20,
                          }}>
                          <Text style={{color: '#40536d', fontSize: 20}}>
                            {I18n.t('transalte_Product_Exportation')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            paddingBottom: 20,
                            elevation: 5,
                            marginHorizontal: 15,
                          }}>
                          <View style={{flex: 1, marginTop: 15}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_current_business_operations_services')}
                              </Text>
                              <Text
                                style={{
                                  color: 'red',
                                }}>
                                *
                              </Text>
                            </View>
                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 60, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Input
                                // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                inputContainerStyle={{
                                  height: 50,
                                  borderBottomWidth: 0,
                                }}
                                numberOfLines={10}
                                multiline={true}

                                // onChangeText={value => setTextComment(value)}
                                // disabled={true}
                              />
                            </ImageBackground>

                            <View style={{flex: 1, marginTop: 15}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  {I18n.t('transalte_main_markets_countries')}
                                </Text>
                                <Text
                                  style={{
                                    color: 'red',
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
                                  marginHorizontal: 10,
                                }}
                              />
                              <RNPickerSelect
                                placeholder={{}}
                                useNativeAndroidPickerStyle={false}
                                _fixAndroidTouchableBug_={true}
                                style={{
                                  ...pickerSelectStyles2,
                                  inputAndroidContainer: {
                                    width: '100%',
                                  },
                                }}
                                onValueChange={(value, index) => {
                                  this.setState({
                                    textname:
                                      I18n.locale === 'th'
                                        ? this.state.dataMaket[index]
                                            .marketnameth
                                        : this.state.dataMaket[index]
                                            .marketnameen,
                                  });
                                }}
                                items={this.state.dataMaket.map(data => ({
                                  label:
                                    I18n.locale === 'th'
                                      ? data.marketnameth
                                      : data.marketnameen,
                                  value:
                                    I18n.locale === 'th'
                                      ? data.marketnameth
                                      : data.marketnameen,
                                  key: data.id,
                                }))}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    marginHorizontal: 20,

                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{flex: 1, justifyContent: 'center'}}>
                                    {this.state.textname === undefined ? (
                                      <Text
                                        style={{
                                          color: '#c0c0c0',
                                          fontSize: 22,
                                        }}>
                                        {I18n.t('transalte_main_markets_countries')}
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: '#163c70',
                                          fontSize: 22,
                                        }}>
                                        {this.state.textname}
                                      </Text>
                                    )}
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,

                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      style={{color: '#73838f'}}
                                      name="keyboard-arrow-down"
                                      size={16}
                                    />
                                  </View>
                                </View>
                              </RNPickerSelect>
                            </View>

                            <View style={{flex: 1, marginTop: 15}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  {I18n.t('transalte_Proportion_exports_services_markets_domestic')}
                                </Text>
                                <Text
                                  style={{
                                    color: 'red',
                                  }}>
                                  *
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginHorizontal: 15,
                                  paddingBottom: 10,
                                }}>
                                <View style={{flex: 1}}>
                                  <ImageBackground
                                    source={require('../../../image/inputedittext.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{height: 28, width: '100%'}}
                                    style={
                                      {
                                        // flexDirection: 'row',
                                        // alignItems: 'center',
                                        // marginHorizontal: 10,
                                        // marginBottom: 10,
                                      }
                                    }>
                                    <TextInput
                                      placeholder={'%'}
                                      style={{
                                        fontSize: 24,
                                        color: '#73838f',
                                        marginHorizontal: 10,
                                        textAlign: 'right',
                                      }}
                                    />
                                  </ImageBackground>
                                </View>
                                <View
                                  style={{flex: 0.1, justifyContent: 'center'}}>
                                  <Text
                                    style={{color: '#163c70', fontSize: 20}}>
                                    {' '}
                                    :
                                  </Text>
                                </View>
                                <View style={{flex: 1}}>
                                  <ImageBackground
                                    source={require('../../../image/inputedittext.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{height: 28, width: '100%'}}
                                    style={
                                      {
                                        // flexDirection: 'row',
                                        // alignItems: 'center',
                                        // marginHorizontal: 10,
                                        // marginBottom: 10,
                                      }
                                    }>
                                    <TextInput
                                      placeholder={'%'}
                                      style={{
                                        fontSize: 24,
                                        color: '#73838f',
                                        marginHorizontal: 10,
                                        flex: 1,
                                        textAlign: 'right',
                                      }}
                                    />
                                  </ImageBackground>
                                </View>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  {I18n.t('transalte_expand_the_export_of_new_products_services_namely')}
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../../image/inputedittext.png')}
                                resizeMode={'stretch'}
                                imageStyle={{height: 28, width: '100%'}}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                  marginBottom: 10,
                                }}>
                                <TextInput
                                  style={{
                                    fontSize: 24,
                                    color: '#73838f',
                                    marginHorizontal: 10,
                                    flex: 1,
                                  }}
                                />
                              </ImageBackground>
                            </View>

                            <View
                              style={{
                                flex: 1,
                                marginTop: 15,
                                paddingBottom: 5,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  {I18n.t('transalte_There_new_markets_such_countries')}
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../../image/inputedittext.png')}
                                resizeMode={'stretch'}
                                imageStyle={{height: 28, width: '100%'}}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                }}
                              />
                              <RNPickerSelect
                                placeholder={{}}
                                useNativeAndroidPickerStyle={false}
                                _fixAndroidTouchableBug_={true}
                                style={{
                                  ...pickerSelectStyles2,
                                  inputAndroidContainer: {
                                    width: '100%',
                                  },
                                }}
                                onValueChange={(value, index) => {
                                  this.setState({
                                    textname2:
                                      I18n.locale === 'th'
                                        ? this.state.dataMaket[index]
                                            .marketnameth
                                        : this.state.dataMaket[index]
                                            .marketnameen,
                                  });
                                }}
                                items={this.state.dataMaket.map(data => ({
                                  label:
                                    I18n.locale === 'th'
                                      ? data.marketnameth
                                      : data.marketnameen,
                                  value:
                                    I18n.locale === 'th'
                                      ? data.marketnameth
                                      : data.marketnameen,
                                  key: data.id,
                                }))}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    marginHorizontal: 20,

                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{flex: 1, justifyContent: 'center'}}>
                                    {this.state.textname2 === undefined ? (
                                      <Text
                                        style={{
                                          color: '#c0c0c0',
                                          fontSize: 22,
                                        }}>
                                        {I18n.t('transalte_select_country')}
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: '#163c70',
                                          fontSize: 22,
                                        }}>
                                        {this.state.textname2}
                                      </Text>
                                    )}
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,

                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      style={{color: '#73838f'}}
                                      name="keyboard-arrow-down"
                                      size={16}
                                    />
                                  </View>
                                </View>
                              </RNPickerSelect>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',
                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_Country_target_group')}
                              </Text>
                              <Text
                                style={{
                                  color: 'red',
                                }}>
                                *
                              </Text>
                            </View>
                            <FlatList
                              style={{}}
                              data={datagoal}
                              renderItem={this.ListdataGroupglod}
                              keyExtractor={item => item.id}
                            />
                          </View>
                        </View>

                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 40,
                              marginTop: 20,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({checkeditmenu0: false});
                              }}
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#2d6dc4',
                                height: 40,
                                flex: 1,
                                borderRadius: 24,
                                // marginBottom: 15,
                                borderWidth: 1,
                                justifyContent: 'center',
                                marginHorizontal: 3,
                                // flexDirection: 'row',
                                alignItems: 'center',
                                display: 'flex',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginHorizontal: 5,
                                  transform: [{translateX: -10}],
                                }}>
                                <Icon
                                  name="chevron-left"
                                  size={25}
                                  style={{
                                    color: '#2d6dc4',
                                    marginTop: 0,
                                    flex: 0.5,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: '#2d6dc4',
                                    fontSize: 22,

                                    flex: 0.4,

                                    marginTop: 0,
                                  }}>
                                  {I18n.t('transalte_Bt_back')}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                this.setState({checkeditmenu0: false});
                              }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                flex: 1,
                                height: 40,
                                borderRadius: 24,
                                marginBottom: 15,
                                justifyContent: 'center',
                                marginHorizontal: 2,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 22,

                                  flex: 1,
                                  textAlign: 'center',
                                  marginTop: 5.5,
                                }}>
                                {I18n.t('translate_Save')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )}
                {/* ข้อมูลผู้ติดต่อ */}
                {this.state.Isative === 2 && (
                  <View>
                    {this.state.AddPersonativity === false ? (
                      <View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          {/* เข้อมูลผู้ติดต่อ ข้อมูลเจ้าหน้าที่ร่วมคณะ */}
                          <LinearGradient
                            // Background Linear Gradient
                            colors={
                              this.state.SelecIndex === 0
                                ? ['#3986ee', '#9c7df6']
                                : ['#FFFFFF', '#FFFFFF']
                            }
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={[
                              {
                                flex: 1,
                                borderColor: '#3986ee',
                                borderWidth: 0.7,

                                height: 42,
                              },
                            ]}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({SelecIndex: 0});
                              }}
                              style={{flex: 1, justifyContent: 'center'}}>
                              <View>
                                <Text
                                  style={{
                                    color:
                                      this.state.SelecIndex === 0
                                        ? '#FFFFFF'
                                        : '#3986ee',
                                    fontSize: 22,
                                    textAlign: 'center',
                                    fontFamily: 'Kittithada Bold 75',
                                  }}>
                                  {I18n.t('transalte_contact_information')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </LinearGradient>
                          <LinearGradient
                            // Background Linear Gradient
                            colors={
                              this.state.SelecIndex === 1
                                ? ['#3986ee', '#9c7df6']
                                : ['#FFFFFF', '#FFFFFF']
                            }
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={[
                              {
                                flex: 1,
                                borderColor: '#3986ee',
                                borderWidth: 0.7,

                                height: 42,
                              },
                            ]}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({SelecIndex: 1});
                              }}
                              style={{flex: 1, justifyContent: 'center'}}>
                              <View>
                                <Text
                                  style={{
                                    color:
                                      this.state.SelecIndex === 1
                                        ? '#FFFFFF'
                                        : '#3986ee',
                                    fontSize: 22,
                                    textAlign: 'center',
                                    fontFamily: 'Kittithada Bold 75',
                                  }}>
                                  {I18n.t('transalte_Faculty_member_information')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>
                        {/* SelecIndex 0 คือเมนู ข้อมูลผู้ติดต่อ   */}
                        {this.state.SelecIndex === 0 && (
                          <View>
                            {datamember.length === 0 ? (
                              <View>
                                <View style={{height: height * 0.3}}>
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        marginTop: 25,

                                        height: 84,
                                        justifyContent: 'center',
                                        marginHorizontal: 15,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                          width: 0,
                                          height: 1,
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,

                                        elevation: 3,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 24,
                                          color: '#a3b4c1',
                                          fontStyle: 'italic',
                                          textAlign: 'center',
                                          marginHorizontal: 35,
                                        }}>
                                        {I18n.t('transalte_No_participant_information')}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({AddPersonativity: true});
                                  }}
                                  style={{
                                    backgroundColor: '#04a68a',
                                    marginHorizontal: 35,
                                    height: 45,
                                    borderRadius: 24,
                                    marginBottom: 15,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                  }}>
                                  <Icon
                                    name="add-circle"
                                    size={20}
                                    style={{
                                      color: '#FFFFFF',
                                      marginTop: 13,
                                      flex: 0.1,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 22,
                                      marginTop: 9.1,
                                    }}>
                                    {I18n.t('transalte_Bt_add_participants')}
                                  </Text>
                                </TouchableOpacity>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 40,
                                    marginBottom: 20,
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 1});
                                    }}
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      borderColor: '#2d6dc4',
                                      height: 45,
                                      width: '50%',
                                      borderRadius: 24,
                                      // marginBottom: 15,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 3,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View>
                                      <Icon
                                        name="chevron-left"
                                        size={25}
                                        style={{
                                          color: '#2d6dc4',
                                          // marginTop: 9.1,
                                        }}
                                      />
                                    </View>
                                    <View style={{flex: 1}}>
                                      <Text
                                        style={{
                                          color: '#2d6dc4',
                                          fontSize: 22,
                                          textAlign: 'center',
                                        }}>
                                        {I18n.t('transalte_Bt_back')}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 3});
                                    }}
                                    style={{
                                      backgroundColor: '#2d6dc4',
                                      borderColor: '#FFF',
                                      height: 45,
                                      width: '50%',
                                      borderRadius: 24,
                                      // marginBottom: 15,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 3,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View style={{flex: 1}}>
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 22,
                                          textAlign: 'center',
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
                                        }}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ) : (
                              <View>
                                {this.state.Deletemember === false ? (
                                  <View style={{marginTop: 8}}>
                                    {/* แสดงรายชื่อ เข้าร่วมกิจกรรม */}
                                    <FlatList
                                      style={{
                                        height: height * 0.3,
                                      }}
                                      data={datamember}
                                      renderItem={this.Listmember}
                                      keyExtractor={item => item.id}
                                    />

                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({AddPersonativity: true});
                                      }}
                                      style={{
                                        backgroundColor: '#04a68a',
                                        marginHorizontal: 35,
                                        height: 45,
                                        borderRadius: 24,
                                        marginBottom: 15,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                      }}>
                                      <Icon
                                        name="add-circle"
                                        size={20}
                                        style={{
                                          color: '#FFFFFF',
                                          marginTop: 13,
                                          flex: 0.1,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 22,
                                          marginTop: 9.1,
                                        }}>
                                        {I18n.t('transalte_Bt_add_participants')}
                                      </Text>
                                    </TouchableOpacity>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginHorizontal: 32,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Isative: 1});
                                        }}
                                        style={{
                                          backgroundColor: '#FFFFFF',
                                          borderColor: '#2d6dc4',
                                          height: 45,
                                          width: '30%',
                                          borderRadius: 24,
                                          // marginBottom: 15,
                                          borderWidth: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 3,
                                          // flexDirection: 'row',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 5,
                                            transform: [{translateX: -10}],
                                          }}>
                                          <Icon
                                            name="chevron-left"
                                            size={25}
                                            style={{
                                              color: '#2d6dc4',
                                              // marginTop: 9.1,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#2d6dc4',
                                              fontSize: 22,
                                              // textAlign: 'left',
                                              // flex: 0.7,

                                              // marginTop: 9.1,
                                            }}>
                                            {I18n.t('transalte_Bt_back')}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Deletemember: true});
                                        }}
                                        style={{
                                          backgroundColor: '#f86767',
                                          width: '34%',
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 5,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name="delete"
                                          size={18}
                                          style={{
                                            color: '#FFFFFF',
                                            marginTop: 13,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            textAlign: 'center',
                                            marginTop: 9.1,
                                          }}>
                                          {I18n.t('transalte_Bt_del_participants')}
                                        </Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Isative: 3});
                                        }}
                                        style={{
                                          backgroundColor: '#2d6dc4',
                                          width: '30%',
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 2,
                                          flexDirection: 'row',
                                        }}>
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            textAlign: 'right',
                                            flex: 0.5,
                                            marginTop: 9.1,
                                          }}>
                                          {I18n.t('translate_Next')}
                                        </Text>
                                        <Icon
                                          name="chevron-right"
                                          size={25}
                                          style={{
                                            color: '#FFFFFF',
                                            marginTop: 9.1,
                                            flex: 0.2,
                                          }}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View>
                                    <FlatList
                                      style={{
                                        height: height * 0.4,
                                      }}
                                      data={datamember}
                                      renderItem={this.ListmemberDelete}
                                      keyExtractor={item => item.id}
                                    />
                                    <View
                                      style={{
                                        flexDirection: 'row',

                                        marginBottom: 10,
                                      }}>
                                      <View
                                        style={{
                                          flex: 0.5,
                                          flexDirection: 'row',
                                        }}>
                                        <Text> </Text>
                                      </View>

                                      <View
                                        style={{
                                          flexDirection: 'row',

                                          flex: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.setState({
                                              Deletemember: false,
                                            });
                                          }}
                                          style={{
                                            backgroundColor: '#f86969',

                                            flex: 1,
                                            height: 34,
                                            borderRadius: 24,
                                            marginHorizontal: 5,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                          }}>
                                          <Icon
                                            name="delete"
                                            size={20}
                                            style={{
                                              color: '#FFFFFF',
                                              flex: 0.3,
                                              marginTop: 5,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#FFFFFF',
                                              fontSize: 18,
                                              marginTop: 3.5,
                                            }}>
                                            {I18n.t('transalte_Delete_Code')}
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.setState({
                                              Deletemember: false,
                                            });
                                          }}
                                          style={{
                                            borderColor: '#f86969',
                                            borderWidth: 1,
                                            backgroundColor: '#FFFFFF',
                                            flex: 1,
                                            height: 34,
                                            borderRadius: 24,
                                            marginHorizontal: 5,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              color: '#f86969',
                                              fontSize: 18,
                                              marginTop: 3.5,
                                            }}>
                                            {I18n.t('translate_Cancel')}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                            )}
                          </View>
                        )}

                        {/* SelecIndex 2 คือเมนู ข้อมูลเจ้าหน้าที่ร่วมคณะ   */}
                        {this.state.SelecIndex === 1 && (
                          <View>
                            {datastaff.length === 0 ? (
                              <View>
                                <View style={{height: height * 0.3}}>
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        marginTop: 25,

                                        height: 84,
                                        justifyContent: 'center',
                                        marginHorizontal: 15,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                          width: 0,
                                          height: 1,
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,

                                        elevation: 3,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 24,
                                          color: '#a3b4c1',
                                          fontStyle: 'italic',
                                          textAlign: 'center',
                                          marginHorizontal: 35,
                                        }}>
                                        {I18n.t('transalte_No_participant_information')}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({AddPersonativity: true});
                                  }}
                                  style={{
                                    backgroundColor: '#04a68a',
                                    marginHorizontal: 35,
                                    height: 45,
                                    borderRadius: 24,
                                    marginBottom: 15,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                  }}>
                                  <Icon
                                    name="add-circle"
                                    size={20}
                                    style={{
                                      color: '#FFFFFF',
                                      marginTop: 13,
                                      flex: 0.1,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 22,
                                      marginTop: 9.1,
                                    }}>
                                    {I18n.t('transalte_Bt_add_participants')}
                                  </Text>
                                </TouchableOpacity>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 40,
                                    marginBottom: 20,
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 1});
                                    }}
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      borderColor: '#2d6dc4',
                                      height: 45,
                                      width: '50%',
                                      borderRadius: 24,
                                      // marginBottom: 15,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 3,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View>
                                      <Icon
                                        name="chevron-left"
                                        size={25}
                                        style={{
                                          color: '#2d6dc4',
                                          // marginTop: 9.1,
                                        }}
                                      />
                                    </View>
                                    <View style={{flex: 1}}>
                                      <Text
                                        style={{
                                          color: '#2d6dc4',
                                          fontSize: 22,
                                          textAlign: 'center',
                                        }}>
                                        {I18n.t('transalte_Bt_back')}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 3});
                                    }}
                                    style={{
                                      backgroundColor: '#2d6dc4',
                                      borderColor: '#FFF',
                                      height: 45,
                                      width: '50%',
                                      borderRadius: 24,
                                      // marginBottom: 15,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 3,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View style={{flex: 1}}>
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 22,
                                          textAlign: 'center',
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
                                        }}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ) : (
                              <View>
                                {this.state.Deletemember === false ? (
                                  <View style={{marginTop: 8}}>
                                    {/* แสดงรายชื่อ เข้าร่วมกิจกรรม */}
                                    <FlatList
                                      style={{
                                        height: height * 0.3,
                                      }}
                                      data={datastaff}
                                      renderItem={this.Listmember}
                                      keyExtractor={item => item.id}
                                    />

                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({AddPersonativity: true});
                                      }}
                                      style={{
                                        backgroundColor: '#04a68a',
                                        marginHorizontal: 35,
                                        height: 45,
                                        borderRadius: 24,
                                        marginBottom: 15,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                      }}>
                                      <Icon
                                        name="add-circle"
                                        size={20}
                                        style={{
                                          color: '#FFFFFF',
                                          marginTop: 13,
                                          flex: 0.1,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 22,
                                          marginTop: 9.1,
                                        }}>
                                        {I18n.t('transalte_Bt_add_faculty_member')}
                                      </Text>
                                    </TouchableOpacity>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginHorizontal: 32,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Isative: 1});
                                        }}
                                        style={{
                                          backgroundColor: '#FFFFFF',
                                          borderColor: '#2d6dc4',
                                          height: 45,
                                          width: '30%',
                                          borderRadius: 24,
                                          // marginBottom: 15,
                                          borderWidth: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 3,
                                          // flexDirection: 'row',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 5,
                                            transform: [{translateX: -10}],
                                          }}>
                                          <Icon
                                            name="chevron-left"
                                            size={25}
                                            style={{
                                              color: '#2d6dc4',
                                              // marginTop: 9.1,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#2d6dc4',
                                              fontSize: 22,
                                              // textAlign: 'left',
                                              // flex: 0.7,

                                              // marginTop: 9.1,
                                            }}>
                                            {I18n.t('transalte_Bt_back')}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Deletemember: true});
                                        }}
                                        style={{
                                          backgroundColor: '#f86767',
                                          width: '34%',
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 5,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name="delete"
                                          size={18}
                                          style={{
                                            color: '#FFFFFF',
                                            marginTop: 13,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            textAlign: 'center',
                                            marginTop: 9.1,
                                          }}>
                                          {I18n.t('transalte_Bt_del_faculty_member')}
                                        </Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({Isative: 3});
                                        }}
                                        style={{
                                          backgroundColor: '#2d6dc4',
                                          width: '30%',
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 2,
                                          flexDirection: 'row',
                                        }}>
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            textAlign: 'right',
                                            flex: 0.5,
                                            marginTop: 9.1,
                                          }}>
                                          {I18n.t('translate_Next')}
                                        </Text>
                                        <Icon
                                          name="chevron-right"
                                          size={25}
                                          style={{
                                            color: '#FFFFFF',
                                            marginTop: 9.1,
                                            flex: 0.2,
                                          }}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View>
                                    <FlatList
                                      style={{
                                        height: height * 0.4,
                                      }}
                                      data={datastaff}
                                      renderItem={this.ListmemberDelete}
                                      keyExtractor={item => item.id}
                                    />
                                    <View
                                      style={{
                                        flexDirection: 'row',

                                        marginBottom: 10,
                                      }}>
                                      <View
                                        style={{
                                          flex: 0.5,
                                          flexDirection: 'row',
                                        }}>
                                        <Text> </Text>
                                      </View>

                                      <View
                                        style={{
                                          flexDirection: 'row',

                                          flex: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.setState({
                                              Deletemember: false,
                                            });
                                          }}
                                          style={{
                                            backgroundColor: '#f86969',

                                            flex: 1,
                                            height: 34,
                                            borderRadius: 24,
                                            marginHorizontal: 5,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                          }}>
                                          <Icon
                                            name="delete"
                                            size={20}
                                            style={{
                                              color: '#FFFFFF',
                                              flex: 0.3,
                                              marginTop: 5,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#FFFFFF',
                                              fontSize: 18,
                                              marginTop: 3.5,
                                            }}>
                                            {I18n.t('transalte_Delete_Code')}
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.setState({
                                              Deletemember: false,
                                            });
                                          }}
                                          style={{
                                            borderColor: '#f86969',
                                            borderWidth: 1,
                                            backgroundColor: '#FFFFFF',
                                            flex: 1,
                                            height: 34,
                                            borderRadius: 24,
                                            marginHorizontal: 5,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              color: '#f86969',
                                              fontSize: 18,
                                              marginTop: 3.5,
                                            }}>
                                            {I18n.t('translate_Bt_cancel')}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        {/* ถ้ากดปุ่มเพิ่มผู้เข้าร่วมก็จะเป็น true ก็จะไปหน้า เพิ่มผู้เข้าร่วม */}
                        {this.state.SelecIndex === 0 ? (
                          <View style={{marginTop: 15}}>
                            <View
                              style={{flexDirection: 'row', paddingBottom: 5}}>
                              <View style={{flex: 0.7}}>
                                <Text
                                  style={{
                                    color: '#40536d',
                                    fontSize: 22,
                                    marginHorizontal: 15,
                                    paddingBottom: 10,
                                  }}>
                                  {I18n.t('transalte_contact_information')}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({addmembrtyp: 0});
                                }}
                                style={{flex: 0.2}}>
                                <Text
                                  style={
                                    this.state.addmembrtyp === 0
                                      ? {
                                          color: '#40536d',
                                          fontSize: 22,
                                          marginHorizontal: 15,
                                        }
                                      : {
                                          color: '#cad8e1',
                                          fontSize: 22,
                                          marginHorizontal: 15,
                                        }
                                  }>
                                {I18n.t('transalte_thai')}
                                </Text>
                                <View>
                                  {this.state.addmembrtyp === 0 && (
                                    <View
                                      style={{
                                        borderBottomWidth: 3,
                                        width: 35,
                                        marginHorizontal: 15,
                                      }}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({addmembrtyp: 1});
                                }}
                                style={{flex: 0.3}}>
                                <Text
                                  style={
                                    this.state.addmembrtyp === 1
                                      ? {
                                          color: '#40536d',
                                          fontSize: 22,
                                          marginHorizontal: 15,
                                        }
                                      : {
                                          color: '#cad8e1',
                                          fontSize: 22,
                                          marginHorizontal: 15,
                                        }
                                  }>
                                  Agent
                                </Text>
                                <View>
                                  {this.state.addmembrtyp === 1 && (
                                    <View
                                      style={{
                                        borderBottomWidth: 3,
                                        width: 35,
                                        marginHorizontal: 15,
                                      }}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>
                            {/* ป้อนข้อมูลผู้ติดต่อ ภาษาไทย ของบุคคลไทย 1 */}
                            {this.state.addmembrtyp === 0 && (
                              <View>
                                {/* ป้อนข้อมูลผู้ติดต่อ ภาษาไทย */}
                                {this.state.selectinputnember === 0 && (
                                  <View>
                                    <View style={{flex: 1, marginTop: 1}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          flex: 1,
                                          backgroundColor: '#FFFFFF',

                                          shadowColor: '#f6f7fa',
                                          shadowOffset: {
                                            width: 0,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 3.84,

                                          elevation: 5,
                                          marginHorizontal: 15,
                                          paddingBottom: 15,
                                          marginBottom: 1,
                                        }}>
                                        <View style={{flex: 1, marginTop: 15}}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#163c70',

                                                marginHorizontal: 10,
                                              }}>
                                              {I18n.t('translate_naturalId')}
                                            </Text>
                                            <Text
                                              style={{
                                                color: 'red',
                                              }}>
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                              marginBottom: 10,
                                            }}>
                                            <TextInput
                                              style={{
                                                fontSize: 24,
                                                color: '#73838f',
                                                marginHorizontal: 10,
                                                flex: 1,
                                              }}
                                            />
                                          </ImageBackground>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#163c70',

                                                marginHorizontal: 10,
                                              }}>
                                              {I18n.t('transalte_name_prefix')}
                                            </Text>
                                            <Text
                                              style={{
                                                color: 'red',
                                              }}>
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                            }}
                                          />
                                          <RNPickerSelect
                                            placeholder={''}
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: '100%',
                                              },
                                            }}
                                            onValueChange={value =>
                                              console.log(value)
                                            }
                                            items={[
                                              {label: 'นาย', value: 'นาย'},
                                              {label: 'นาง', value: 'นาง'},
                                              {
                                                label: 'นางสาว',
                                                value: 'นางสาว',
                                              },
                                            ]}>
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                height: 30,
                                                marginHorizontal: 20,

                                                flexDirection: 'row',
                                              }}>
                                              <View
                                                style={{
                                                  flex: 1,
                                                  justifyContent: 'center',
                                                }}>
                                                <Text
                                                  style={{
                                                    color: '#c0c0c0',
                                                    fontSize: 24,
                                                  }}>
                                                  {I18n.t('transalte_select_name_prefix')}
                                                </Text>
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,

                                                  alignItems: 'flex-end',
                                                  justifyContent: 'center',
                                                }}>
                                                <Icon
                                                  style={{color: '#73838f'}}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </View>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        backgroundColor: '#FFFFFF',

                                        shadowColor: '#f6f7fa',
                                        shadowOffset: {
                                          width: 0,
                                          height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                        marginHorizontal: 15,
                                        paddingBottom: 15,
                                        marginBottom: 1,
                                      }}>
                                      <View style={{flex: 1, marginTop: 15}}>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            ชื่อ
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            นามสกุล
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Name
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Surname
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            ตำแหน่ง
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Position
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('translate_country')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_postcode')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_province')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>

                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_district')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_sub_district')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_contact')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>
                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_address_eng')}
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('translate_email')}
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>

                                        <View style={{flex: 1}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('translate_Phonenumber')}
                                          </Text>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                            }}>
                                            <TouchableOpacity
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                              }}>
                                              <CountryPicker
                                                close={true}
                                                containerButtonStyle={{
                                                  bottom: 0,
                                                }}
                                                countryCode={
                                                  this.state.countryCode
                                                }
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
                                                  top:
                                                    Platform.OS === 'ios'
                                                      ? 1
                                                      : 3,
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
                                              {this.PhoneNum(
                                                this.state.number_tel,
                                              )}
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginHorizontal: 32,
                                        marginTop: 20,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            AddPersonativity: false,
                                          });
                                        }}
                                        style={{
                                          backgroundColor: '#FFFFFF',
                                          borderColor: '#2d6dc4',
                                          height: 45,
                                          flex: 1,
                                          borderRadius: 24,
                                          // marginBottom: 15,
                                          borderWidth: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 3,
                                          // flexDirection: 'row',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 5,
                                            transform: [{translateX: -10}],
                                          }}>
                                          <Icon
                                            name="chevron-left"
                                            size={25}
                                            style={{
                                              color: '#2d6dc4',
                                              marginTop: 0,
                                              flex: 0.5,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#2d6dc4',
                                              fontSize: 22,

                                              flex: 0.4,

                                              marginTop: 0,
                                            }}>
                                            {I18n.t('transalte_Bt_back')}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            AddPersonativity: false,
                                          });
                                        }}
                                        style={{
                                          backgroundColor: '#2d6dc4',
                                          flex: 1,
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 2,
                                          flexDirection: 'row',
                                        }}>
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            flex: 0.9,
                                            marginTop: 10,

                                            textAlign: 'center',
                                          }}>
                                          {I18n.t('translate_Save')}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                )}
                              </View>
                            )}

                            {/* ป้อนข้อมูลผู้ติดต่อ Agent ของบุคคลไทย 1 */}
                            {this.state.addmembrtyp === 1 && (
                              <View>
                                {/* ป้อนข้อมูลผู้ติดต่อ ภาษาไทย */}
                                {this.state.selectinputnember === 0 && (
                                  <View>
                                    <View style={{flex: 1, marginTop: 1}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          flex: 1,
                                          backgroundColor: '#FFFFFF',

                                          shadowColor: '#f6f7fa',
                                          shadowOffset: {
                                            width: 0,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 3.84,

                                          elevation: 5,
                                          marginHorizontal: 15,
                                          paddingBottom: 15,
                                          marginBottom: 1,
                                        }}>
                                        <View style={{flex: 1, marginTop: 15}}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#163c70',

                                                marginHorizontal: 10,
                                              }}>
                                              Passport ID
                                            </Text>
                                            <Text
                                              style={{
                                                color: 'red',
                                              }}>
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                              marginBottom: 10,
                                            }}>
                                            <TextInput
                                              style={{
                                                fontSize: 24,
                                                color: '#73838f',
                                                marginHorizontal: 10,
                                                flex: 1,
                                              }}
                                            />
                                          </ImageBackground>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#163c70',

                                                marginHorizontal: 10,
                                              }}>
                                              Title
                                            </Text>
                                            <Text
                                              style={{
                                                color: 'red',
                                              }}>
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                            }}
                                          />
                                          <RNPickerSelect
                                            placeholder={''}
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: '100%',
                                              },
                                            }}
                                            onValueChange={value =>
                                              console.log(value)
                                            }
                                            items={[
                                              {label: 'นาย', value: 'นาย'},
                                              {label: 'นาง', value: 'นาง'},
                                              {
                                                label: 'นางสาว',
                                                value: 'นางสาว',
                                              },
                                            ]}>
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                height: 30,
                                                marginHorizontal: 20,

                                                flexDirection: 'row',
                                              }}>
                                              <View
                                                style={{
                                                  flex: 1,
                                                  justifyContent: 'center',
                                                }}>
                                                <Text
                                                  style={{
                                                    color: '#c0c0c0',
                                                    fontSize: 24,
                                                  }}>
                                                  Select your title
                                                </Text>
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,

                                                  alignItems: 'flex-end',
                                                  justifyContent: 'center',
                                                }}>
                                                <Icon
                                                  style={{color: '#73838f'}}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </View>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        backgroundColor: '#FFFFFF',

                                        shadowColor: '#f6f7fa',
                                        shadowOffset: {
                                          width: 0,
                                          height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                        marginHorizontal: 15,
                                        paddingBottom: 15,
                                        marginBottom: 1,
                                      }}>
                                      <View style={{flex: 1, marginTop: 15}}>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Name
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Surname
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Position
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Addess
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            City
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            State / Province / Region
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>

                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            ZIP / Postal Code
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Country
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Email
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>

                                        <View style={{flex: 1}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            Phone Number
                                          </Text>

                                          <ImageBackground
                                            source={require('../../../image/inputedittext.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              height: 28,
                                              width: '100%',
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginHorizontal: 10,
                                            }}>
                                            <TouchableOpacity
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                              }}>
                                              <CountryPicker
                                                close={true}
                                                containerButtonStyle={{
                                                  bottom: 0,
                                                }}
                                                countryCode={
                                                  this.state.countryCode
                                                }
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
                                                  top:
                                                    Platform.OS === 'ios'
                                                      ? 1
                                                      : 3,
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
                                              {this.PhoneNum(
                                                this.state.number_tel,
                                              )}
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginHorizontal: 32,
                                        marginTop: 20,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            AddPersonativity: false,
                                          });
                                        }}
                                        style={{
                                          backgroundColor: '#FFFFFF',
                                          borderColor: '#2d6dc4',
                                          height: 45,
                                          flex: 1,
                                          borderRadius: 24,
                                          // marginBottom: 15,
                                          borderWidth: 1,
                                          justifyContent: 'center',
                                          marginHorizontal: 3,
                                          // flexDirection: 'row',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 5,
                                            transform: [{translateX: -10}],
                                          }}>
                                          <Icon
                                            name="chevron-left"
                                            size={25}
                                            style={{
                                              color: '#2d6dc4',
                                              marginTop: 0,
                                              flex: 0.5,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              color: '#2d6dc4',
                                              fontSize: 22,

                                              flex: 0.4,

                                              marginTop: 0,
                                            }}>
                                            {I18n.t('transalte_Bt_back')}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            AddPersonativity: false,
                                          });
                                        }}
                                        style={{
                                          backgroundColor: '#2d6dc4',
                                          flex: 1,
                                          height: 45,
                                          borderRadius: 24,
                                          marginBottom: 15,
                                          justifyContent: 'center',
                                          marginHorizontal: 2,
                                          flexDirection: 'row',
                                        }}>
                                        <Text
                                          style={{
                                            color: '#FFFFFF',
                                            fontSize: 22,
                                            flex: 0.9,
                                            marginTop: 10,

                                            textAlign: 'center',
                                          }}>
                                          {I18n.t('translate_Save')}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                )}
                              </View>
                            )}
                          </View>
                        ) : (
                          <View style={{marginTop: 15}}>
                            <View
                              style={{flexDirection: 'row', paddingBottom: 5}}>
                              <View style={{flex: 0.7}}>
                                <Text
                                  style={{
                                    color: '#40536d',
                                    fontSize: 22,
                                    marginHorizontal: 15,
                                    paddingBottom: 10,
                                  }}>
                                  {I18n.t('transalte_Faculty_member_information')}
                                </Text>
                              </View>
                            </View>
                            {/* ป้อนข้อมูลผู้ติดต่อ ภาษาไทย ของบุคคลไทย 1 */}

                            <View>
                              {/* ป้อนข้อมูลผู้ติดต่อ ภาษาไทย */}
                              {this.state.selectinputnember === 0 && (
                                <View>
                                  <View style={{flex: 1, marginTop: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        backgroundColor: '#FFFFFF',

                                        shadowColor: '#f6f7fa',
                                        shadowOffset: {
                                          width: 0,
                                          height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                        marginHorizontal: 15,
                                        paddingBottom: 15,
                                        marginBottom: 1,
                                      }}>
                                      <View style={{flex: 1, marginTop: 15}}>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('translate_naturalId')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: '#73838f',
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: '#163c70',

                                              marginHorizontal: 10,
                                            }}>
                                            {I18n.t('transalte_name_prefix')}
                                          </Text>
                                          <Text
                                            style={{
                                              color: 'red',
                                            }}>
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                          }}
                                        />
                                        <RNPickerSelect
                                          placeholder={''}
                                          useNativeAndroidPickerStyle={false}
                                          _fixAndroidTouchableBug_={true}
                                          style={{
                                            ...pickerSelectStyles2,
                                            inputAndroidContainer: {
                                              width: '100%',
                                            },
                                          }}
                                          onValueChange={value =>
                                            console.log(value)
                                          }
                                          items={[
                                            {label: 'นาย', value: 'นาย'},
                                            {label: 'นาง', value: 'นาง'},
                                            {
                                              label: 'นางสาว',
                                              value: 'นางสาว',
                                            },
                                          ]}>
                                          <View
                                            style={{
                                              justifyContent: 'center',
                                              height: 30,
                                              marginHorizontal: 20,

                                              flexDirection: 'row',
                                            }}>
                                            <View
                                              style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                              }}>
                                              <Text
                                                style={{
                                                  color: '#c0c0c0',
                                                  fontSize: 24,
                                                }}>
                                                {I18n.t('transalte_select_name_prefix')}
                                              </Text>
                                            </View>
                                            <View
                                              style={{
                                                flex: 1,

                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                              }}>
                                              <Icon
                                                style={{color: '#73838f'}}
                                                name="keyboard-arrow-down"
                                                size={16}
                                              />
                                            </View>
                                          </View>
                                        </RNPickerSelect>
                                      </View>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      flex: 1,
                                      backgroundColor: '#FFFFFF',

                                      shadowColor: '#f6f7fa',
                                      shadowOffset: {
                                        width: 0,
                                        height: 2,
                                      },
                                      shadowOpacity: 0.25,
                                      shadowRadius: 3.84,

                                      elevation: 5,
                                      marginHorizontal: 15,
                                      paddingBottom: 15,
                                      marginBottom: 1,
                                    }}>
                                    <View style={{flex: 1, marginTop: 15}}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          ชื่อ
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          นามสกุล
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          Name
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          Surname
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          ตำแหน่ง
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          Position
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('translate_country')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_postcode')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_province')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>

                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_district')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_sub_district')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_contact')}
                                        </Text>
                                        <Text
                                          style={{
                                            color: 'red',
                                          }}>
                                          *
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('transalte_address_eng')}
                                        </Text>
                                      </View>
                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('translate_email')}
                                        </Text>
                                      </View>

                                      <ImageBackground
                                        source={require('../../../image/inputedittext.png')}
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          height: 28,
                                          width: '100%',
                                        }}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 10,
                                          marginBottom: 10,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 24,
                                            color: '#73838f',
                                            marginHorizontal: 10,
                                            flex: 1,
                                          }}
                                        />
                                      </ImageBackground>

                                      <View style={{flex: 1}}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#163c70',

                                            marginHorizontal: 10,
                                          }}>
                                          {I18n.t('translate_Phonenumber')}
                                        </Text>

                                        <ImageBackground
                                          source={require('../../../image/inputedittext.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            height: 28,
                                            width: '100%',
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                          }}>
                                          <TouchableOpacity
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <CountryPicker
                                              close={true}
                                              containerButtonStyle={{
                                                bottom: 0,
                                              }}
                                              countryCode={
                                                this.state.countryCode
                                              }
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
                                                top:
                                                  Platform.OS === 'ios' ? 1 : 3,
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
                                            {this.PhoneNum(
                                              this.state.number_tel,
                                            )}
                                          </TextInput>
                                        </ImageBackground>
                                      </View>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginHorizontal: 32,
                                      marginTop: 20,
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({
                                          AddPersonativity: false,
                                        });
                                      }}
                                      style={{
                                        backgroundColor: '#FFFFFF',
                                        borderColor: '#2d6dc4',
                                        height: 45,
                                        flex: 1,
                                        borderRadius: 24,
                                        // marginBottom: 15,
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        marginHorizontal: 3,
                                        // flexDirection: 'row',
                                        alignItems: 'center',
                                        display: 'flex',
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginHorizontal: 5,
                                          transform: [{translateX: -10}],
                                        }}>
                                        <Icon
                                          name="chevron-left"
                                          size={25}
                                          style={{
                                            color: '#2d6dc4',
                                            marginTop: 0,
                                            flex: 0.5,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: '#2d6dc4',
                                            fontSize: 22,

                                            flex: 0.4,

                                            marginTop: 0,
                                          }}>
                                          {I18n.t('transalte_Bt_back')}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({
                                          AddPersonativity: false,
                                        });
                                      }}
                                      style={{
                                        backgroundColor: '#2d6dc4',
                                        flex: 1,
                                        height: 45,
                                        borderRadius: 24,
                                        marginBottom: 15,
                                        justifyContent: 'center',
                                        marginHorizontal: 2,
                                        flexDirection: 'row',
                                      }}>
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 22,
                                          flex: 0.9,
                                          marginTop: 10,

                                          textAlign: 'center',
                                        }}>
                                        {I18n.t('translate_Save')}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
                {/* สินค้า */}
                {this.state.Isative === 3 && (
                  <View>
                    {/* เช็คหน้าเพิ่มสินค้า */}
                    {this.state.AddProduct === false ? (
                      <View>
                        {/* เช็คสินค้าว่ามีมั้ย ถ้าไม่มีก็จะเข้าหน้า ไม่มีสินค้า ถ้ามีก็จะเข้าไปหน้า แสดงสินค้า */}
                        {dataProduct.length === 0 ? (
                          <View style={{height: height * 0.5}}>
                            <View style={{flex: 1}}>
                              <View
                                style={{
                                  marginTop: 25,

                                  height: 84,
                                  justifyContent: 'center',
                                  marginHorizontal: 15,
                                  backgroundColor: '#FFFFFF',
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 1,
                                  },
                                  shadowOpacity: 0.22,
                                  shadowRadius: 2.22,

                                  elevation: 3,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 24,
                                    color: '#a3b4c1',
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    marginHorizontal: 35,
                                  }}>
                                  {I18n.t('transalte_not_product')}
                                </Text>
                              </View>
                            </View>

                            <TouchableOpacity
                              onPress={() => {
                                this.setState({AddProduct: true});
                              }}
                              style={{
                                backgroundColor: '#04a68a',
                                marginHorizontal: 35,
                                height: 45,
                                borderRadius: 24,
                                marginBottom: 15,
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignContent: 'center',
                              }}>
                              <Icon
                                name="add-circle"
                                size={20}
                                style={{
                                  color: '#FFFFFF',
                                  marginTop: 13,
                                  flex: 0.1,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 22,
                                  marginTop: 9.1,
                                }}>
                                {I18n.t('transalte_Bt_add_product')}
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 32,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({Isative: 2});
                                }}
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  borderColor: '#2d6dc4',
                                  height: 45,
                                  flex: 1,
                                  borderRadius: 24,
                                  // marginBottom: 15,
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  marginHorizontal: 3,
                                  // flexDirection: 'row',
                                  alignItems: 'center',
                                  display: 'flex',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    transform: [{translateX: -10}],
                                  }}>
                                  <Icon
                                    name="chevron-left"
                                    size={25}
                                    style={{
                                      color: '#2d6dc4',
                                      marginTop: 0,
                                      flex: 0.5,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: '#2d6dc4',
                                      fontSize: 22,

                                      flex: 0.4,

                                      marginTop: 0,
                                    }}>
                                    {I18n.t('transalte_Bt_back')}
                                  </Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({Isative: 4});
                                }}
                                style={{
                                  backgroundColor: '#2d6dc4',
                                  flex: 1,
                                  height: 45,
                                  borderRadius: 24,
                                  marginBottom: 15,
                                  justifyContent: 'center',
                                  marginHorizontal: 2,
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 22,
                                    flex: 0.9,
                                    marginTop: 10,

                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('translate_Next')}
                                </Text>
                                <Icon
                                  name="chevron-right"
                                  size={25}
                                  style={{
                                    color: '#FFFFFF',
                                    marginTop: 10,

                                    flex: 0.2,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View>
                            {this.state.DeleteProduct === false ? (
                              <View>
                                {/* แสดงหน้าลบข้อมูล */}
                                <FlatList
                                  style={{
                                    height: height * 0.4,
                                  }}
                                  data={dataProduct}
                                  renderItem={this.Listproduct}
                                  keyExtractor={item => item.id}
                                />
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({AddProduct: true});
                                  }}
                                  style={{
                                    backgroundColor: '#04a68a',
                                    marginHorizontal: 35,
                                    height: 45,
                                    borderRadius: 24,
                                    marginBottom: 15,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                  }}>
                                  <Icon
                                    name="add-circle"
                                    size={20}
                                    style={{
                                      color: '#FFFFFF',
                                      marginTop: 13,
                                      flex: 0.1,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 22,
                                      marginTop: 9.1,
                                    }}>
                                    {I18n.t('transalte_Bt_add_product')}
                                  </Text>
                                </TouchableOpacity>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 32,
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 2});
                                    }}
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      borderColor: '#2d6dc4',
                                      height: 45,
                                      width: '30%',
                                      borderRadius: 24,
                                      // marginBottom: 15,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 3,
                                      // flexDirection: 'row',
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                        transform: [{translateX: -10}],
                                      }}>
                                      <Icon
                                        name="chevron-left"
                                        size={25}
                                        style={{
                                          color: '#2d6dc4',
                                          // marginTop: 9.1,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: '#2d6dc4',
                                          fontSize: 22,
                                          // textAlign: 'left',
                                          // flex: 0.7,

                                          // marginTop: 9.1,
                                        }}>
                                        {I18n.t('transalte_Bt_back')}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({DeleteProduct: true});
                                    }}
                                    style={{
                                      backgroundColor: '#f86767',
                                      width: '34%',
                                      height: 45,
                                      borderRadius: 24,
                                      marginBottom: 15,
                                      justifyContent: 'center',
                                      marginHorizontal: 5,
                                      flexDirection: 'row',
                                    }}>
                                    <Icon
                                      name="delete"
                                      size={18}
                                      style={{
                                        color: '#FFFFFF',
                                        marginTop: 13,
                                      }}
                                    />
                                    <Text
                                      style={{
                                        color: '#FFFFFF',
                                        fontSize: 22,
                                        textAlign: 'center',
                                        marginTop: 9.1,
                                      }}>
                                      {I18n.t('transalte_Bt_del_product')}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({Isative: 4});
                                    }}
                                    style={{
                                      backgroundColor: '#2d6dc4',
                                      width: '30%',
                                      height: 45,
                                      borderRadius: 24,
                                      marginBottom: 15,
                                      justifyContent: 'center',
                                      marginHorizontal: 2,
                                      flexDirection: 'row',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#FFFFFF',
                                        fontSize: 22,
                                        textAlign: 'right',
                                        flex: 0.5,
                                        marginTop: 9.1,
                                      }}>
                                      {I18n.t('translate_Next')}
                                    </Text>
                                    <Icon
                                      name="chevron-right"
                                      size={25}
                                      style={{
                                        color: '#FFFFFF',
                                        marginTop: 9.1,
                                        flex: 0.2,
                                      }}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ) : (
                              <View>
                                <FlatList
                                  style={{
                                    height: height * 0.4,
                                  }}
                                  data={dataProduct}
                                  renderItem={this.ListproductDelete}
                                  keyExtractor={item => item.id}
                                />
                                <View
                                  style={{
                                    flexDirection: 'row',

                                    marginBottom: 10,
                                  }}>
                                  <View
                                    style={{
                                      flex: 0.5,
                                      flexDirection: 'row',
                                    }}>
                                    <Text> </Text>
                                  </View>

                                  <View
                                    style={{
                                      flexDirection: 'row',

                                      flex: 1,
                                      justifyContent: 'center',
                                      marginHorizontal: 5,
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({DeleteProduct: false});
                                      }}
                                      style={{
                                        backgroundColor: '#f86969',

                                        flex: 1,
                                        height: 34,
                                        borderRadius: 24,
                                        marginHorizontal: 5,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                      }}>
                                      <Icon
                                        name="delete"
                                        size={20}
                                        style={{
                                          color: '#FFFFFF',
                                          flex: 0.3,
                                          marginTop: 5,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: '#FFFFFF',
                                          fontSize: 18,
                                          marginTop: 3.5,
                                        }}>
                                        {I18n.t('transalte_Bt_del_product')}
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({DeleteProduct: false});
                                      }}
                                      style={{
                                        borderColor: '#f86969',
                                        borderWidth: 1,
                                        backgroundColor: '#FFFFFF',
                                        flex: 1,
                                        height: 34,
                                        borderRadius: 24,
                                        marginHorizontal: 5,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          color: '#f86969',
                                          fontSize: 18,
                                          marginTop: 3.5,
                                        }}>
                                        {I18n.t('translate_Bt_cancel')}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    ) : (
                      // หน้าเพิ่มสินค้า
                      <View style={{marginTop: 10, paddingBottom: 15}}>
                        <View style={{flex: 1, marginTop: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                              backgroundColor: '#FFFFFF',

                              shadowColor: '#f6f7fa',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                              marginHorizontal: 15,
                              paddingBottom: 15,
                              marginBottom: 1,
                            }}>
                            <View style={{flex: 1, marginTop: 15}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  Category/ประเภทสินค้า
                                </Text>
                                <Text
                                  style={{
                                    color: 'red',
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
                                  marginHorizontal: 10,
                                }}
                              />
                              <RNPickerSelect
                                mode="dropdown"
                                placeholder={{
                                  label: 'เลือกประเภทสินค้า',
                                  value: 0,
                                }}
                                useNativeAndroidPickerStyle={false}
                                _fixAndroidTouchableBug_={true}
                                style={{
                                  ...pickerSelectStyles2,
                                  inputAndroidContainer: {
                                    width: '100%',
                                  },
                                }}
                                onValueChange={(value, index) => {
                                  this.setState(
                                    {
                                      dataCategoryProductsub: [],
                                      textcateproductsub: null,

                                      textcateproduct:
                                        index === 0
                                          ? null
                                          : I18n.locale === 'TH'
                                          ? this.state.dataCategoryProduct[
                                              index - 1
                                            ].namecategoryproductTH
                                          : this.state.dataCategoryProduct[
                                              index - 1
                                            ].namecategoryproductEN,
                                      idcateproduct: index === 0 ? 0 : value,
                                    },
                                    function() {
                                      this.getCategoryProductsub();
                                    },
                                  );
                                }}
                                items={this.state.dataCategoryProduct.map(
                                  data => ({
                                    label:
                                      I18n.locale === 'TH'
                                        ? data.namecategoryproductTH
                                        : data.namecategoryproductEN,
                                    value: data.idcategoryproduct,
                                    key: data.idcategoryproduct,
                                  }),
                                )}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    marginHorizontal: 20,

                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{flex: 1, justifyContent: 'center'}}>
                                    {this.state.textcateproduct ===
                                    undefined ? (
                                      <Text
                                        style={{
                                          color: '#c0c0c0',
                                          fontSize: 20,
                                        }}>
                                        {I18n.t('select2_knowLedge')}
                                      </Text>
                                    ) : (
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          color: '#163c70',
                                          fontSize: 20,
                                          flex: 1,
                                        }}>
                                        {this.state.textcateproduct}{' '}
                                      </Text>
                                    )}
                                  </View>
                                  <View
                                    style={{
                                      flex: 0.1,

                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      style={{color: '#73838f'}}
                                      name="keyboard-arrow-down"
                                      size={16}
                                    />
                                  </View>
                                </View>
                              </RNPickerSelect>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 1, marginTop: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                              backgroundColor: '#FFFFFF',

                              shadowColor: '#f6f7fa',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                              marginHorizontal: 15,
                              paddingBottom: 15,
                              marginBottom: 1,
                            }}>
                            <View style={{flex: 1, marginTop: 15}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  Sub-Category/ประเภทสินค้าย่อย
                                </Text>
                                <Text
                                  style={{
                                    color: 'red',
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
                                  marginHorizontal: 10,
                                }}
                              />
                              <RNPickerSelect
                                placeholder={{
                                  label: I18n.t('transalte_select_subcategory'),
                                  value: 0,
                                }}
                                useNativeAndroidPickerStyle={false}
                                _fixAndroidTouchableBug_={true}
                                style={{
                                  ...pickerSelectStyles2,
                                  inputAndroidContainer: {
                                    width: '100%',
                                  },
                                }}
                                onValueChange={(value, index) => {
                                  this.setState(
                                    {
                                      dataCategoryProductdis: [],
                                      textcateproductdis: null,
                                      textcateproductsub:
                                        index === 0
                                          ? null
                                          : I18n.locale === 'TH'
                                          ? this.state.dataCategoryProductsub[
                                              index - 1
                                            ].nameThsub
                                          : this.state.dataCategoryProductsub[
                                              index - 1
                                            ].nameENsub,

                                      idcateproductsub: index === 0 ? 0 : value,
                                    },
                                    function() {
                                      this.getCategoryProductdis();
                                    },
                                  );
                                }}
                                items={this.state.dataCategoryProductsub.map(
                                  data => ({
                                    label:
                                      I18n.locale === 'TH'
                                        ? data.nameThsub
                                        : data.nameENsub,
                                    value: data.idProsub,
                                    key: data.idProsub,
                                  }),
                                )}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    marginHorizontal: 20,
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{flex: 1, justifyContent: 'center'}}>
                                    {this.state.textcateproductsub ===
                                    undefined ? (
                                      <Text
                                        style={{
                                          color: '#c0c0c0',
                                          fontSize: 20,
                                        }}>
                                        {I18n.t('transalte_select_subcategory')}{' '}
                                      </Text>
                                    ) : (
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          color: '#163c70',
                                          fontSize: 20,
                                          flex: 1,
                                        }}>
                                        {this.state.textcateproductsub}{' '}
                                      </Text>
                                    )}
                                  </View>
                                  <View
                                    style={{
                                      flex: 0.1,

                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      style={{color: '#73838f'}}
                                      name="keyboard-arrow-down"
                                      size={16}
                                    />
                                  </View>
                                </View>
                              </RNPickerSelect>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 1, marginTop: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                              backgroundColor: '#FFFFFF',

                              shadowColor: '#f6f7fa',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                              marginHorizontal: 15,
                              paddingBottom: 15,
                              marginBottom: 1,
                            }}>
                            <View style={{flex: 1, marginTop: 15}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  Product Group/กลุ่มสินค้า
                                </Text>
                                <Text
                                  style={{
                                    color: 'red',
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
                                  marginHorizontal: 10,
                                }}
                              />
                              <RNPickerSelect
                                placeholder={{
                                  label: 'เลือกกลุ่มสินค้า',
                                  value: 0,
                                }}
                                useNativeAndroidPickerStyle={false}
                                _fixAndroidTouchableBug_={true}
                                style={{
                                  ...pickerSelectStyles2,
                                  inputAndroidContainer: {
                                    width: '100%',
                                  },
                                }}
                                onValueChange={(value, index) => {
                                  this.setState({
                                    textcateproductdis:
                                      index === 0
                                        ? null
                                        : I18n.locale === 'TH'
                                        ? this.state.dataCategoryProductdis[
                                            index - 1
                                          ].nameThdis
                                        : this.state.dataCategoryProductdis[
                                            index - 1
                                          ].nameENdis,

                                    idcateproductdis: index === 0 ? 0 : value,
                                  });
                                }}
                                items={this.state.dataCategoryProductdis.map(
                                  data => ({
                                    label:
                                      I18n.locale === 'TH'
                                        ? data.nameThdis
                                        : data.nameENdis,
                                    value: data.idProdis,
                                    key: data.idProdis,
                                  }),
                                )}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    marginHorizontal: 20,

                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{flex: 1, justifyContent: 'center'}}>
                                    {this.state.textcateproductdis ===
                                    undefined ? (
                                      <Text
                                        style={{
                                          color: '#c0c0c0',
                                          fontSize: 24,
                                        }}>
                                        {I18n.t('transalte_select_product_group')}{' '}
                                      </Text>
                                    ) : (
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          color: '#163c70',
                                          fontSize: 24,
                                          flex: 1,
                                        }}>
                                        {this.state.textcateproductdis}
                                      </Text>
                                    )}
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,

                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      style={{color: '#73838f'}}
                                      name="keyboard-arrow-down"
                                      size={16}
                                    />
                                  </View>
                                </View>
                              </RNPickerSelect>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 15,
                          }}>
                          <View style={{flex: 1, marginTop: 15}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_ProductBrandNameEN')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 28, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginBottom: 10,
                              }}>
                              <TextInput
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 10,
                                  flex: 1,
                                }}
                                placeholder={'Product Brand Name (English)'}
                              />
                            </ImageBackground>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_ProductDescription')}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 50, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Input
                                // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                inputContainerStyle={{
                                  height: 50,
                                  borderBottomWidth: 0,
                                }}
                                numberOfLines={10}
                                multiline={true}
                                placeholder={'Product Description (English)'}

                                // onChangeText={value => setTextComment(value)}
                                // disabled={true}
                              />
                              <Text
                                style={{
                                  color: '#c0c0c0',
                                  fontSize: 14,
                                  right: 70,
                                }}>
                                {I18n.t('transalte_100_characters')}
                              </Text>
                            </ImageBackground>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 15,
                          }}>
                          <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_bratransalte_ProductBrandNameENnd_name')} {'thai'}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 28, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginBottom: 10,
                              }}>
                              <TextInput
                                style={{
                                  fontSize: 24,
                                  color: '#73838f',
                                  marginHorizontal: 10,
                                  flex: 1,
                                }}
                                placeholder={'ชื่อแบรนด์ (ไทย)'}
                              />
                            </ImageBackground>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_ProductDescription')} {'thai'}
                              </Text>
                            </View>

                            <ImageBackground
                              source={require('../../../image/inputedittext.png')}
                              resizeMode={'stretch'}
                              imageStyle={{height: 55, width: '100%'}}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Input
                                // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                inputContainerStyle={{
                                  height: 55,
                                  borderBottomWidth: 0,
                                }}
                                numberOfLines={10}
                                multiline={true}
                                placeholder={'รายละเอียด (ไทย)'}

                                // onChangeText={value => setTextComment(value)}
                                // disabled={true}
                              />
                              <Text
                                style={{
                                  color: '#c0c0c0',
                                  fontSize: 14,
                                  right: 70,
                                }}>
                                {I18n.t('transalte_100_characters')}
                              </Text>
                            </ImageBackground>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#FFFFFF',

                            shadowColor: '#f6f7fa',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 15,
                            paddingBottom: 15,
                          }}>
                          <View style={{flex: 1}}>
                            <View
                              style={{flexDirection: 'row', paddingBottom: 10}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_product_image')}
                              </Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                              {/* <Text
                              style={{
                                fontSize: 16,
                                color: 'red',

                                marginHorizontal: 10,
                              }}>
                              *เฉพาะไฟล์ JPEG, PNG, GIF ขนาดไม่เกิน 4 MB
                            </Text> */}
                            </View>
                            {this.state.imagefilename != null && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  paddingBottom: 10,
                                }}>
                                <View style={{flex: 0.2}}>
                                  <Icon2
                                    style={{marginHorizontal: 15, marginTop: 4}}
                                    name="check-circle"
                                    color="#39b54a"
                                    size={20}
                                  />
                                </View>
                                <View style={{flex: 0.6}}>
                                  <Text
                                    numberOfLines={2}
                                    style={{fontSize: 20, color: '#73838f'}}>
                                    {this.state.imagefilename}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={{flex: 0.3}}
                                  onPress={() => {
                                    this.setState({imagefilename: null});
                                  }}>
                                  <Icon
                                    style={{marginHorizontal: 15, marginTop: 4}}
                                    name="delete"
                                    color="red"
                                    size={20}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                            {this.state.imagefilename === null && (
                              <TouchableOpacity
                                onPress={() => {
                                  this.imageGalleryLaunch();
                                }}
                                style={{
                                  backgroundColor: '#2d6dc4',
                                  marginHorizontal: 20,
                                  width: 116,
                                  height: 34,
                                  borderRadius: 24,
                                  justifyContent: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                  }}>
                                  <Icon3
                                    name="arrowup"
                                    size={16}
                                    style={{color: '#FFFFFF', marginTop: 3}}
                                  />
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 18,
                                      textAlign: 'center',
                                    }}>
                                    {I18n.t('transalte_Upload_files')}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 32,
                            marginTop: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({AddProduct: false});
                            }}
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#2d6dc4',
                              height: 45,
                              flex: 1,
                              borderRadius: 24,
                              // marginBottom: 15,
                              borderWidth: 1,
                              justifyContent: 'center',
                              marginHorizontal: 3,
                              // flexDirection: 'row',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 5,
                                transform: [{translateX: -10}],
                              }}>
                              <Icon
                                name="chevron-left"
                                size={25}
                                style={{
                                  color: '#2d6dc4',
                                  marginTop: 0,
                                  flex: 0.5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#2d6dc4',
                                  fontSize: 22,

                                  flex: 0.4,

                                  marginTop: 0,
                                }}>
                                {I18n.t('transalte_Bt_back')}
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              this.setState({AddProduct: false});
                            }}
                            style={{
                              backgroundColor: '#2d6dc4',
                              flex: 1,
                              height: 45,
                              borderRadius: 24,
                              marginBottom: 15,
                              justifyContent: 'center',
                              marginHorizontal: 2,
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontSize: 22,
                                flex: 0.9,
                                marginTop: 10,

                                textAlign: 'center',
                              }}>
                              {I18n.t('translate_Save')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                )}

                {/* ค่าใช้จ่าย */}
                {this.state.Isative === 4 && (
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        marginTop: 25,
                        backgroundColor: '#fafbfc',
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        paddingTop: 10,
                        elevation: 7,
                      }}>
                      <View style={{flexDirection: 'row', flex: 0.8}}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#163c70',
                            marginHorizontal: 3,
                          }}>
                          จำนวนคูหา
                        </Text>
                        <Text style={{fontSize: 20, color: '#e82d2d'}}>*</Text>
                        <Text
                          numberOfLines={2}
                          style={{fontSize: 20, color: '#73838f', flex: 0.9}}>
                          {'(ราคาต่อคูหา : '}
                          {this.currencyFormat(this.state.num_price)} {' THB)'}
                        </Text>
                      </View>
                      <View style={{flex: 0.5}}>
                        <ImageBackground
                          source={require('../../../image/inputedittext.png')}
                          resizeMode={'stretch'}
                          imageStyle={{height: 28, width: '100%'}}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginBottom: 10,
                          }}>
                          <TextInput
                            onBlur={() => {
                              this.setState({disbleinput: true});
                            }}
                            editable={this.state.disbleinput}
                            keyboardType="numeric"
                            onChangeText={
                              numprice => {
                                // console.log(numprice.length)
                                if (numprice.length < 7) {
                                  this.setState({
                                    num_price: numprice,
                                    disbleinput: true,
                                  });
                                } else {
                                  this.setState({
                                    num_price: numprice,
                                    disbleinput: false,
                                  });
                                }
                              }
                              // this.setState({num_price: numprice})
                            }
                            style={{
                              fontSize: 24,
                              color: '#73838f',
                              marginHorizontal: 10,
                              flex: 0.8,
                            }}
                          />
                        </ImageBackground>
                      </View>
                      <Text style={{fontSize: 20, color: '#163c70'}}>คูหา</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 15,

                        backgroundColor: '#fafbfc',
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                      }}>
                      <View style={{marginHorizontal: 10}}>
                        <Text
                          style={{
                            color: '#e82d2d',
                            fontSize: 16,
                          }}>
                          {'          '}*หากท่านมีความประสงค์มากกว่า 1 คูหา
                          โปรดแนบเอกสาร
                          แจ้งความประสงค์พร้อมระบุเหตุผลความจำเป็นเพื่อใช้ประกอบการพิจารณา
                          ผ่านทางแอปพลิเคชันนี้ หรือ DITP DRIVE
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 15,

                        backgroundColor: '#fafbfc',
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                      }}>
                      <View style={{marginHorizontal: 10, flex: 1}}>
                        <Text
                          style={{
                            color: '#163c70',
                            fontSize: 20,
                          }}>
                          {I18n.t('transalte_Attachment')}
                        </Text>
                        {/* <Text
                          style={{
                            color: '#e82d2d',
                            fontSize: 15,
                          }}>
                          *เฉพาะไฟล์ .JPEG ,.PNG ,.GIF ,.PDF ขนาดไม่เกิน 4 MB
                        </Text> */}
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          this.imageGalleryLaunch2();
                        }}
                        style={{
                          flex: 0.6,
                          backgroundColor: '#2d6dc4',
                          height: 30,
                          borderRadius: 24,
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: '#FFFF', textAlign: 'center'}}>
                          {I18n.t('transalte_Upload_files')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.imagefilename2 != null && (
                      
                        <View style={{flexDirection: 'row', 
                        paddingBottom: 10,borderWidth:1, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                          <View style={{marginHorizontal: 15,}}> 
                          <Icon2
                            style={{ marginTop: 4}}
                            name="check-circle"
                            color="#39b54a"
                            size={20}
                          />
                          </View>
                          <View style={{borderWidth:1,flex:0.6}} > 
                          <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                            {this.state.imagefilename2}
                           
                          </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({imagefilename2: null});
                            }}>
                            <Icon
                              style={{marginHorizontal: 15, marginTop: 4}}
                              name="delete"
                              color="red"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                     
                     )} 
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 15,

                        backgroundColor: '#FFF',
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        paddingBottom: 10,
                        elevation: 7,
                      }}>
                      <View style={{flex: 1, marginTop: 15}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#163c70',

                              marginHorizontal: 10,
                            }}>
                            {I18n.t('transalte_privilege_discount')}
                          </Text>
                          <Text
                            style={{
                              color: 'red',
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
                            marginHorizontal: 10,
                          }}
                        />
                        <RNPickerSelect
                          placeholder={''}
                          useNativeAndroidPickerStyle={false}
                          _fixAndroidTouchableBug_={true}
                          style={{
                            ...pickerSelectStyles2,
                            inputAndroidContainer: {
                              width: '100%',
                            },
                          }}
                          onValueChange={value => console.log(value)}
                          items={[]}>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 30,
                              marginHorizontal: 20,

                              flexDirection: 'row',
                            }}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <Text style={{color: '#c0c0c0', fontSize: 24}}>
                                ถ้ามี โปรดเลือก
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,

                                alignItems: 'flex-end',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                style={{color: '#73838f'}}
                                name="keyboard-arrow-down"
                                size={16}
                              />
                            </View>
                          </View>
                        </RNPickerSelect>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 25,
                        marginTop: 10,
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            color: '#163c70',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          {I18n.t('transalte_total_cost')} :{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#163c70',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          {I18n.t('transalte_privilege_discount')} :
                        </Text>
                        <Text
                          style={{
                            color: '#163c70',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          {I18n.t('transalte_net_expenses')} :
                        </Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        <Text
                          style={{
                            color: '#2d6dc4',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          0 THB
                        </Text>
                        <Text
                          style={{
                            color: '#2d6dc4',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          0 THB
                        </Text>
                        <Text
                          style={{
                            color: '#2d6dc4',
                            textAlign: 'right',
                            fontSize: 20,
                          }}>
                          0 THB
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginHorizontal: 25,
                        marginTop: 10,
                        shadowColor: '#f8f9fb',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            color: '#86aec8',
                            textAlign: 'center',
                            fontSize: 16,
                          }}>
                          {I18n.t('transalte_Department_reserves')}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 40,
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({Isative: 3});
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#2d6dc4',
                          height: 40,
                          flex: 1,
                          borderRadius: 24,
                          // marginBottom: 15,
                          borderWidth: 1,
                          justifyContent: 'center',
                          marginHorizontal: 3,
                          // flexDirection: 'row',
                          alignItems: 'center',
                          display: 'flex',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            transform: [{translateX: -10}],
                          }}>
                          <Icon
                            name="chevron-left"
                            size={25}
                            style={{
                              color: '#2d6dc4',
                              marginTop: 0,
                              flex: 0.5,
                            }}
                          />
                          <Text
                            style={{
                              color: '#2d6dc4',
                              fontSize: 22,

                              flex: 0.4,

                              marginTop: 0,
                            }}>
                            {I18n.t('transalte_Bt_back')}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({Isative: 5});
                        }}
                        style={{
                          backgroundColor: '#2d6dc4',
                          flex: 1,
                          height: 40,
                          borderRadius: 24,
                          marginBottom: 15,
                          justifyContent: 'center',
                          marginHorizontal: 2,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 22,

                            flex: 1,
                            textAlign: 'center',
                            marginTop: 5.5,
                          }}>
                          {I18n.t('translate_Next')}
                        </Text>
                        <Icon
                          name="chevron-right"
                          size={25}
                          style={{
                            color: '#FFF',

                            flex: 0.2,
                            marginTop: 5.5,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* เอกสารแนบ */}

                {this.state.Isative === 5 && (
                  <View>
                    <View style={{paddingBottom: 40}}>
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginTop: 10,
                            shadowColor: '#f8f9fb',
                            backgroundColor: '#fafbfc',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#40536d',

                                marginHorizontal: 10,
                              }}>
                              {I18n.t('transalte_documents_consider')}
                            </Text>
                            {/* <Text
                              style={{
                                fontSize: 16,
                                color: 'red',
                                marginHorizontal: 10,
                                marginTop: 0,
                              }}>
                              *เฉพาะไฟล์ .JPEG, .PNG, .GIF, .PDF ขนาดไม่เกิน 4
                              MB
                            </Text> */}
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,

                            shadowColor: '#fafbfc',
                            backgroundColor: '#FFFFFF',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',
                                marginBottom:10,
                                marginHorizontal: 10,
                              }}>
                              {I18n.t('transalte_Company_Profile')}
                            </Text>
                            {this.state.imagefilename3 != null && ( 
                             <View style={{flexDirection: 'row', 
                             paddingBottom: 10, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                               <View style={{marginHorizontal: 15,}}> 
                               <Icon2
                                 style={{ marginTop: 4}}
                                 name="check-circle"
                                 color="#39b54a"
                                 size={20}
                               />
                               </View>
                               <View style={{flex:0.6}} > 
                               <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                                 {this.state.imagefilename3}
                                 
                                
                               </Text>
                               </View>
                               <TouchableOpacity
                                 onPress={() => {
                                   this.setState({imagefilename3: null});
                                 }}>
                                 <Icon
                                   style={{marginHorizontal: 15, marginTop: 4}}
                                   name="delete"
                                   color="red"
                                   size={20}
                                 />
                               </TouchableOpacity>
                             </View>
                            )}

                            <TouchableOpacity
                            onPress={()=>{
                              this.imageGalleryLaunch3()
                            }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                marginHorizontal: 20,
                                width: 116,
                                height: 34,
                                borderRadius: 24,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                }}>
                                <Icon3
                                  name="arrowup"
                                  size={16}
                                  style={{color: '#FFFFFF', marginTop: 3}}
                                />
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('transalte_Upload_files')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,

                            shadowColor: '#fafbfc',
                            backgroundColor: '#FFFFFF',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <View
                              style={{paddingBottom: 10, flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>

                                Catalogue/Brochure หรือ รูปภาพของสินค้า
                              </Text>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: 'red',
                                }}>
                                *
                              </Text>
                            </View>
                            {this.state.imagefilename4 != null && ( 
                           <View style={{flexDirection: 'row', 
                           paddingBottom: 10, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                             <View style={{marginHorizontal: 15,}}> 
                             <Icon2
                               style={{ marginTop: 4}}
                               name="check-circle"
                               color="#39b54a"
                               size={20}
                             />
                             </View>
                             <View style={{flex:0.6}} > 
                             <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                               {this.state.imagefilename4}
                               
                              
                             </Text>
                             </View>
                             <TouchableOpacity
                               onPress={() => {
                                 this.setState({imagefilename4: null});
                               }}>
                               <Icon
                                 style={{marginHorizontal: 15, marginTop: 4}}
                                 name="delete"
                                 color="red"
                                 size={20}
                               />
                             </TouchableOpacity>
                           </View>
                            )} 

                            <TouchableOpacity
                            onPress={()=>{
                              this.imageGalleryLaunch4()
                            }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                marginHorizontal: 20,
                                width: 116,
                                height: 34,
                                borderRadius: 24,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                }}>
                                <Icon3
                                  name="arrowup"
                                  size={16}
                                  style={{color: '#FFFFFF', marginTop: 3}}
                                />
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('transalte_Upload_files')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,

                            shadowColor: '#fafbfc',
                            backgroundColor: '#FFFFFF',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <View
                              style={{paddingBottom: 10, flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_product_certificate')}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: 'red',
                                }}>
                                *
                              </Text>
                            </View>
                            
                            {this.state.imagefilename5 != null && ( 
                          <View style={{flexDirection: 'row', 
                          paddingBottom: 10, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                            <View style={{marginHorizontal: 15,}}> 
                            <Icon2
                              style={{ marginTop: 4}}
                              name="check-circle"
                              color="#39b54a"
                              size={20}
                            />
                            </View>
                            <View style={{flex:0.6}} > 
                            <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                              {this.state.imagefilename5}
                              
                             
                            </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({imagefilename5: null});
                              }}>
                              <Icon
                                style={{marginHorizontal: 15, marginTop: 4}}
                                name="delete"
                                color="red"
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                            )}

                            <TouchableOpacity
                            onPress={()=>{
                              this.imageGalleryLaunch5()
                            }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                marginHorizontal: 20,
                                width: 116,
                                height: 34,
                                borderRadius: 24,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                }}>
                                <Icon3
                                  name="arrowup"
                                  size={16}
                                  style={{color: '#FFFFFF', marginTop: 3}}
                                />
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('transalte_Upload_files')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginTop: 10,
                            shadowColor: '#f8f9fb',
                            backgroundColor: '',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#40536d',

                                marginHorizontal: 10,
                              }}>
                              {I18n.t('transalte_other_documents')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,

                            shadowColor: '#fafbfc',
                            backgroundColor: '#FFFFFF',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <View
                              style={{paddingBottom: 10, flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                {I18n.t('transalte_trademark_patent')}
                              </Text>
                            </View>
                            {/* <View
                              style={{
                                paddingBottom: 10,
                                flexDirection: 'row',
                                marginHorizontal: 15,
                              }}>
                              <Icon
                                name="report-problem"
                                size={20}
                                style={{color: 'red'}}
                              />
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 10,
                                }}>
                                ประเภทไฟล์ไม่รองรับ กรุณาลองใหม่
                              </Text>
                            </View> */}
                         {this.state.imagefilename6 != null && ( 
                                 <View style={{flexDirection: 'row', 
                                 paddingBottom: 10, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                                   <View style={{marginHorizontal: 15,}}> 
                                   <Icon2
                                     style={{ marginTop: 4}}
                                     name="check-circle"
                                     color="#39b54a"
                                     size={20}
                                   />
                                   </View>
                                   <View style={{flex:0.6}} > 
                                   <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                                     {this.state.imagefilename6}
                                     
                                    
                                   </Text>
                                   </View>
                                   <TouchableOpacity
                                     onPress={() => {
                                       this.setState({imagefilename6: null});
                                     }}>
                                     <Icon
                                       style={{marginHorizontal: 15, marginTop: 4}}
                                       name="delete"
                                       color="red"
                                       size={20}
                                     />
                                   </TouchableOpacity>
                                 </View>
                            )}


                            <TouchableOpacity
                            onPress={()=>{
                              this.imageGalleryLaunch6()
                            }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                marginHorizontal: 20,
                                width: 116,
                                height: 34,
                                borderRadius: 24,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                }}>
                                <Icon3
                                  name="arrowup"
                                  size={16}
                                  style={{color: '#FFFFFF', marginTop: 3}}
                                />
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('transalte_Upload_files')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: 'row',
                            marginHorizontal: 20,

                            shadowColor: '#fafbfc',
                            backgroundColor: '#FFFFFF',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,

                            elevation: 7,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#163c70',

                                marginHorizontal: 10,
                              }}>
                              {I18n.t('transalte_reward_innovation_intellectual_property')}
                            </Text>

                            {this.state.imagefilename7!= null && ( 
                               <View style={{flexDirection: 'row', 
                               paddingBottom: 10, backgroundColor: '#fafbfc',marginHorizontal: 15}}>
                                 <View style={{marginHorizontal: 15,}}> 
                                 <Icon2
                                   style={{ marginTop: 4}}
                                   name="check-circle"
                                   color="#39b54a"
                                   size={20}
                                 />
                                 </View>
                                 <View style={{flex:0.6}} > 
                                 <Text numberOfLines={2} style={{fontSize: 22, color: '#73838f',}}>
                                   {this.state.imagefilename7}
                                   
                                  
                                 </Text>
                                 </View>
                                 <TouchableOpacity
                                   onPress={() => {
                                     this.setState({imagefilename7: null});
                                   }}>
                                   <Icon
                                     style={{marginHorizontal: 15, marginTop: 4}}
                                     name="delete"
                                     color="red"
                                     size={20}
                                   />
                                 </TouchableOpacity>
                               </View>
                            )}

                            <TouchableOpacity
                            onPress={()=>{
                              this.imageGalleryLaunch7()

                            }}
                              style={{
                                backgroundColor: '#2d6dc4',
                                marginHorizontal: 20,
                                width: 116,
                                height: 34,
                                borderRadius: 24,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                }}>
                                <Icon3
                                  name="arrowup"
                                  size={16}
                                  style={{color: '#FFFFFF', marginTop: 3}}
                                />
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlign: 'center',
                                  }}>
                                  {I18n.t('transalte_Upload_files')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{marginHorizontal: 15}}>
                          <View style={{marginHorizontal: 15}}>
                            <Text style={{color: '#86aec8', fontSize: 18}}>
                              {'  '} {I18n.t('transalte_Condition_details')}
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 15, marginTop: 10}}>
                            <Text style={{color: 'red', fontSize: 18}}>
                              *{I18n.t('transalte_total_accuracy_and_document_expiration_date')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 40,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({Isative: 4});
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#2d6dc4',
                          height: 40,
                          flex: 1,
                          borderRadius: 24,
                          // marginBottom: 15,
                          borderWidth: 1,
                          justifyContent: 'center',
                          marginHorizontal: 3,
                          // flexDirection: 'row',
                          alignItems: 'center',
                          display: 'flex',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            transform: [{translateX: -10}],
                          }}>
                          <Icon
                            name="chevron-left"
                            size={25}
                            style={{
                              color: '#2d6dc4',
                              marginTop: 0,
                              flex: 0.5,
                            }}
                          />
                          <Text
                            style={{
                              color: '#2d6dc4',
                              fontSize: 22,

                              flex: 0.4,

                              marginTop: 0,
                            }}>
                            {I18n.t('transalte_Bt_back')}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({sucess: true});
                        }}
                        style={{
                          backgroundColor: '#2d6dc4',
                          flex: 1,
                          height: 40,
                          borderRadius: 24,
                          marginBottom: 15,
                          justifyContent: 'center',
                          marginHorizontal: 2,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 22,

                            flex: 1,
                            textAlign: 'center',
                            marginTop: 5.5,
                          }}>
                          {I18n.t('translate_Next')}
                        </Text>
                        <Icon
                          name="chevron-right"
                          size={25}
                          style={{
                            color: '#FFF',

                            flex: 0.2,
                            marginTop: 5.5,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View style={{marginTop: 10}}>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Allprofile
                    ? this.state.Allprofile.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Alldataoperator
                    ? this.state.Alldataoperator.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Allcontact
                    ? this.state.Allcontact.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Alldataproduct
                    ? this.state.Alldataproduct.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Allprice
                    ? this.state.Allprice.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <ScrollView style={{alignSelf: 'center'}}>
                  {this.state.Allfile
                    ? this.state.Allfile.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: '#FFF',
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: '#FFF',
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}>
                                  {param.title}
                                </Text>
                              </View>
                            }>
                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingBottom: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'column',

                                  width: '50%',
                                }}
                              />
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}
                  <View style={{height: 10}} />
                </ScrollView>
                <View style={{alignItems: 'center'}}>
                  <CheckBox
                    textStyle={{
                      fontSize: 20,
                      color: '#73838f',
                      fontWeight: 'normal',
                    }}
                    uncheckedIcon={
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderWidth: 0.5,
                          width: 18,
                          height: 18,
                          borderColor: '#999999',
                          borderRadius: 2.6,
                          marginTop: -20,
                        }}
                      />
                    }
                    checkedIcon={
                      <Image
                        style={{
                          width: 18,
                          height: 18,
                          marginTop: -20,
                        }}
                        source={require('../../../image/rrr.png')}
                      />
                    }
                    title={
                      <View
                        style={{
                          marginHorizontal: 15,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#40536d',
                              textAlign: 'center',
                            }}>
                            {I18n.t('transalte_accept_the_terms')}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => {}}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#2d6dc4',
                              textAlign: 'center',
                              textDecorationLine: 'underline',
                            }}>
                            {I18n.t('transalte_Read_terms')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    }
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    checked={this.state.checkPolicy}
                    // disabled={true}
                    onPress={() => {
                      this.checkPolicy();
                    }}
                  />
                </View>
                {/* ปุ่มกลับ */}
                <View
                  style={{
                    marginHorizontal: 25,
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({Isative: 3, sucess: false});
                    }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      justifyContent: 'center',
                      borderColor: '#2d6dc4',
                      height: 40,
                      borderRadius: 24,
                      borderWidth: 1,
                      flexDirection: 'row',
                    }}>
                    <View style={{justifyContent: 'center'}}>
                      <Icon
                        name="keyboard-arrow-left"
                        size={25}
                        style={{color: '#2d6dc4'}}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          right: 12,
                          fontSize: 22,
                          color: '#2d6dc4',
                        }}>
                        {I18n.t('transalte_Bt_back')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* ปุ่มยืนยัน */}
                <View
                  style={{
                    marginHorizontal: 25,

                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2d6dc4',

                      borderRadius: 24,
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',

                        fontSize: 22,
                        color: '#FFFFFF',
                      }}>
                      {I18n.t('transalte_Bt_confirmation_apply')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
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
)(TradeActivitiesRegister);

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
