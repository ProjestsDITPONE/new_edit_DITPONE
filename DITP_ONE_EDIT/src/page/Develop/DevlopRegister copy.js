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

import {Chip} from 'react-native-paper';
import {connect} from 'react-redux';
import Headers from '../../components/Headers';
import HeaderstageRegister from '../../components/HeaderstageRegister';
import I18n from '../../utils/I18n';
import {CheckBox, Overlay, ListItem, Input} from 'react-native-elements';
import Styles from './Styles';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import CountryPicker from '../../lib_edit/react-native-country-picker-modal/lib';
import RNPickerSelect from 'react-native-picker-select';
import DropDownItem from 'react-native-drop-down-item_edit';
import RNFetchBlob from 'rn-fetch-blob';
import {borderColor} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {
  getDatarefer,
  getChooseMaket,
  getCategoryProduct,
  getCateProductsub,
  getCateProductdis,
  Getactivefrom,
  getdataprovince,
  getdatadistrict,
  getdatasubdistrict,
  getdatacontry,
  getDataBusiness,
  getfromibusiness,
  sendDatabusiness,
  deleteDatabusiness,
  sendDataMaket,
  getDatamakets,
  getfromProduct,
  geDataProducts,
  getDataparticipant,
  SendAddprodutcs,
  sendItem_geturlimg,
  SendupdateDataProduct
} from '../../actions/data.actions';
import {SearchableFlatList} from 'react-native-searchable-list';
// import ImagePicker from 'react-native-image-picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import DevelopJuristic from './DevelopJuristic';
// import DevelopPerson from './DevelopPerson';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const IC_ARR_DOWN = require('../../image/arrowdownx.png');
const IC_ARR_UP = require('../../image/ArrowUpx.png');
const dadamenu3 = [
  {
    id: 1,
    txt: 'ข้อมูลส่วนตัว',
  },
  {
    id: 2,
    txt: 'ข้อมูลประกอบ',
  },
  {
    id: 3,
    txt: 'สินค้า',
  },
  {
    id: 4,
    txt: 'ข้อมูลบริษัท',
    txt2: 'ผู้เข้าร่วมกิจกรรม',
  },
];
const dadamenu1 = [
  {
    id: 1,
    txt: 'ข้อมูลส่วนตัว',
  },
  {
    id: 2,
    txt: 'ข้อมูลประกอบ',
  },
  {
    id: 3,
    txt: 'สินค้า',
  },
  {
    id: 4,
    txt: 'ผู้เข้าร่วมกิจกรรม',
  },
];
const data2 = [
  {Value: 'ผู้ผลิต', key: '1'},
  {Value: 'ผู้ส่งออก', key: '2'},
  {Value: 'บริษัทการค้าระหว่างประเทศ', key: '3'},
  {Value: 'อื่นๆ', key: '4'},
];

// const dataProduct = [
//   {
//     id: 1,
//     name: 'Product Category',
//     nameText: 'Textiles, Garments and Fashion…',
//     nameBrand: 'Product Brand Name',
//     nameTextBrand: 'Mai Thai Thorr',
//   },
// ];

const dataProdestsave = [
  {
    id: 1,
    img: require('../../image/Viewimg.png'),
  },
  {
    id: 2,
    name: 'Category/ประเภทสินต้า :',
    nameProduct: 'Textiles, Garments and Fashion Accessories',
  },
  {
    id: 3,
    name: 'Sub-Category/ประเภทสินค้าย่อย :',
    nameProduct: 'Textiles, Garments and Fashion Accessories',
  },
  {
    id: 4,
    name: 'Category/ประเภทสินต้า :',
    nameProduct: 'Textiles',
  },
  {
    id: 5,
    name: 'Product Group/กลุ่มสินค้า :',
    nameProduct: 'Textiles, Garments and Fashion Accessories',
  },
];
// const datamember = [
//   {
//     id: 1,
//     name: 'ชาญวิทย์ สุวธารมย์',
//   },
//   {
//     id: 2,
//     name: 'ชาญวิทย์ สุวธารมย์',
//   },
// ];
const dataCompany = [];

const datasearch = [];

class DevlopRegister extends React.Component {
  constructor(props) {
    const getDate = new Date();
    super(props);
    this.state = {
      // checkButton: 0,
      idBusiness: 0,
      checkBox: [],
      idDelete: [],
      inputdisble: false,
      checkeditmenu2: false,
      openCodenumber: false,
      // month: Moment(new Date(), 'MM YYYY'),
      ddmmyyy: Moment(new Date(), 'DD MM YYYY'),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), 'DD MM YYYY'),
      Isative: 0,
      ///////////state get from //////////////////

      Allcontents: [
        {
          title: 'ข้อมูลส่วนตัว',
        },
      ],
      Allcontents1: [
        {
          title: 'ข้อมูลนิติบุคคล',
        },
      ],

      Alldataoperator: [
        {
          title: 'ข้อมูลประกอบ',
        },
      ],
      Alldataproduct: [
        {
          title: 'สินค้า',
        },
      ],
      Alldatacompany: [
        {
          title: 'ข้อมูลบริษัท',
        },
      ],
      Alldatanumber: [
        {
          title: 'ผู้เข้าร่วมกิจกรรม',
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
      searchAttribute: 'ExportMarketNameTH',
      searchByTitle: false,
      ignoreCase: true,
      code: '',

      ////////////////////////////////////////////เก็บข้อมูลรูปภาพ/////////////////////////////////////////

      FormDatatype1: [],
      FormDatatype1addnress: [],
      FormDatatype1contact: [],

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
      Usernaturaid: this.props.getUser.userDetails.res_result.naturalId,
      UserSSoid: this.props.getUser.userDetails.res_result.ssoid,
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
      imagetype: null,

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
      checkBoxMaket: [],
      itemMaket: [],
      DataMakets: [],
      CheckBoxAllMaket: [],
      editProduct: false,

      ////////////////////////////////////////////////////////////////////////////////////////////////
      countryCode: 'TH',
      CountryCodePhone: '+66',
      ////////////////////////////////////////////เก็บ ข้อมูล ที่อยู่ ////////////////////
      Dataprovices: [],
      Datadistricts: [],
      Datasubdistricts: [],
      Datagetcontry: [],
      getProvinceCode: 0,

      getDataAmpor: [],
      getDatatumbur: [],

      ///////////////////////////////// เช็คการselect ข้อมูล ///////////
      enabled: true,
      checktest: false,
      checktest2: false,

      ///////////////////value get from ///////////

      fromgetcontact: [],
      fromBisiness: [],
      showDatabusiness: [],
      showDataMaket: [],
      ///////////////////////////////////

      textbusinessTypeOther: null,
      dataProduct: [],

      datamember:[]
      
    };
  }

  componentDidMount() {
    this.getDataMenu2();
    this.getDataMaket();
    // this.getCategoryProduct();
    this.getFrom();
    // this.getCategoryProductsub();

    this.getdata_province();
    this.getdata_district();
    this.getdata_subdistrict();
    this.getdata_contry();

    this._getDataBusiness();
    this._getfromBusiness();

    this._getDatamakets();
    this._getfromProduct();
    this._geDataProduct();
    this._getDataparticipant();
  }

  onSelect = country => {
    // setformat(country.callingCode[0]);
    this.setState({countryCode: country.cca2});
    this.setState({CountryCodePhone: '+' + country.callingCode[0]});
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

  //แสดงข้อมูลประเทศ ธุรกิจ

  _getDataBusiness = async value => {
    try {
      const {authData} = this.props;
      const token = authData.token;

      // if (this.props.getUser.userDetails.res_result.type === 1) {
      // alert(this.state.UserSSoid)
      const payload = {
        result: {
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(getDataBusiness(payload));

      // console.log('ถถถถถถ');
      // console.log('WOC', this.props.route.params.pid);
      // console.log(response.result[0].Items[1].Data);
      if (response.res_code === '00') {
        // this.setState({showDatabusiness: response.result[0].Items});
        // {this.state.showDatabusiness[0].Data.map(
        //   Data => {

        response.result[0].Items[0].Data.map(Dataa => {
          this.state.checkBoxbisness[Dataa.Key] = true;

          this.state.showDatabusiness.push({
            key: Dataa.Key.toString(),
            value: Dataa.Value.toString(),
          });
        });

        this.setState({
          textbusinessTypeOther: response.result[0].Items[1].Data,
        });
      }
    } catch (error) {}
  };

  _getDatamakets = async value => {
    try {
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        result: {
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(getDatamakets(payload));
      // console.log('DataNNNNN');
      // console.log(response.result.Items[0]);

      if ((response.res_code = '00')) {
        // console.log('Datamakets');
        response.result.Items[0].Data.map(Datamaket => {
          this.state.checkBoxMaket[Datamaket.ActivityExportMarketId] = true;

          this.state.itemMaket.push({
            activityExportMarketId: Datamaket.ActivityExportMarketId.toString(),
            ExportMarketNameTH: Datamaket.ExportMarketNameTH.toString(),
            ExportMarketNameEN: Datamaket.ExportMarketNameEN.toString(),
          });
        });
      }
    } catch (error) {}
  };

  _getfromBusiness = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      // console.log('authData', authData);
      const response = await this.props.dispatch(getfromibusiness());

      // console.log('#####TESTQQQ');
      // console.log(response.Form[1].Items[0].Data )
      if (response.res_code === '00') {
        response.Form[1].Items[0].Data.map(Datass => {
          // console.log('WEWEWEWEWE');
          // console.log(Datass);

          this.state.fromBisiness.push({
            key: Datass.Key.toString(),
            value: Datass.Value.toString(),
          });
        });
        // console.log('response.ActivityExportMarketId[1]');
        // console.log(
        response.ActivityExportMarketId[0].Items[0].Data.map(DataMaket => {
          // console.log('Maket dataqq');
          // console.log(this.state.DataMakets.length);
          if (this.state.DataMakets.length < 100) {
            this.state.DataMakets.push({
              ActivityExportMarketId: DataMaket.ActivityExportMarketId.toString(),
              ExportMarketNameTH: DataMaket.ExportMarketNameTH.toString(),
              ExportMarketNameEN: DataMaket.ExportMarketNameTH.toString(),
            });
          }
        });
      }
    } catch (error) {}
  };

  // _getfromProduct

  selectItemMaket = ({item, index}) => {
    let {checkBoxMaket, itemMaket, CheckBoxAllMaket} = this.state;
    checkBoxMaket[index] = !checkBoxMaket[index];
    this.setState({checkBoxMaket: checkBoxMaket});
    if (checkBoxMaket[index] === true) {
      itemMaket.push({
        activityExportMarketId: item.ActivityExportMarketId.toString(),
        ExportMarketNameTH: item.ExportMarketNameTH.toString(),
        ExportMarketNameEN: item.ExportMarketNameEN.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAllMaket: false});
      itemMaket.pop(item.id);
    }
    console.log('itemMaket', this.state.itemMaket);
  };

  selecitemDelete = ({item, index}) => {
    let {checkBox, idDelete, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.CitizenId.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idDelete.pop(item.CitizenId);
    }
    // console.log(this.state.idDelete);
  };

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }

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
    // console.log('FGFGFG', naturalId);
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
  selectbusiness = ({item, index}) => {
    let {checkBoxbisness, showDatabusiness, CheckBoxAllbsiness} = this.state;
    checkBoxbisness[index] = !checkBoxbisness[index];
    this.setState({checkBoxbisness: checkBoxbisness});
    if (checkBoxbisness[index] === true) {
      showDatabusiness.push({
        key: item.key.toString(),
        value: item.value.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAllbsiness: false});
      showDatabusiness.pop(item.key);
    }
    console.log('keybsiness', item);
    console.log('keybsiness', this.state.showDatabusiness);
  };

  // selectbusiness = ({item, index}) => {
  //   let {checkBoxbisness} = this.state;
  //   checkBoxbisness[index] = !checkBoxbisness[index];

  selecitemDelete = ({item, index}) => {
    let {checkBox, idDelete, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.CitizenId.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idDelete.pop(item.CitizenId);
    }
    // console.log(this.state.idDelete);
  };

  selecitemProduct = ({item, index}) => {
    let {checkBox, idDelete, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.ItemID.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idDelete.pop(item.ItemID);
    }
    // console.log(this.state.idDelete);
  };

  checkreload = async value => {
    alert(value);
    // if(index === 1){
    //   this._getDataBusiness()
    // }
  };



  ////////////////////////////////////////setdata API ////////////////////////////////////////////////

  getFrom = async value => {
    try {
      const {authData} = this.props;
      const token = authData.token;

      // if (this.props.getUser.userDetails.res_result.type === 1) {
      console.log('dataFromtype1NWE');
      //  console(
      //   this.props.route.params.pid,
      //   this.props.route.params.type,
      //   this.props.route.params.member_cid,
      //   this.props.route.params.activity_code,

      //  )
      const payload = {
        result: {
          pid: this.props.route.params.pid,
          type: this.props.route.params.type,
          member_cid: this.props.route.params.member_cid,
          case: this.props.route.params.case,
          activity_code: this.props.route.params.activity_code,
        },
        token: token,
      };
      const response = await this.props.dispatch(Getactivefrom(payload));

      // console.log('responseMMMMMMMMMMMMM');
      // console.log(response.result);

      if (response.res_code === '00') {
        response.result[0].Items.map(dataFromtype1 => {
          // dataFromtype1.Data.map(DataFromTitle => {
          console.log('dataFromtype1NWE');
          console.log(dataFromtype1);
          this.state.FormDatatype1.push({
            Label: dataFromtype1.Label.toString(),
            Name: dataFromtype1.Name.toString(),
            Type: dataFromtype1.Type.toString(),
            IsArray: dataFromtype1.IsArray.toString(),
            MaxArray: dataFromtype1.MaxArray.toString(),
            Data: dataFromtype1.Data.toString(),
          });
        });

        response.result[1].Items.map(data1Fromtype1 => {
          console.log(data1Fromtype1.Label);

          this.state.FormDatatype1addnress.push({
            Label: data1Fromtype1.Label.toString(),
            Name: data1Fromtype1.Name.toString(),
            Type: data1Fromtype1.Type.toString(),
            IsArray: data1Fromtype1.IsArray.toString(),
            MaxArray: data1Fromtype1.MaxArray.toString(),
            Data: data1Fromtype1.Data.toString(),
          });
        });

        response.result[2].Items.map(data1Fromtype1 => {
          this.state.FormDatatype1contact.push({
            Label: data1Fromtype1.Label.toString(),
            Name: data1Fromtype1.Name.toString(),
            Type: data1Fromtype1.Type.toString(),
            IsArray: data1Fromtype1.IsArray.toString(),
            MaxArray: data1Fromtype1.MaxArray.toString(),
            Data: data1Fromtype1.Data.toString(),
          });
        });
      }
    } catch (error) {}
  };

  editProfile = async value => {
    try {
      if (this.props.getUser.userDetails.res_result.type === 3) {
        // console.log('contact_postcode', this.state.contact_postcode);
      }
    } catch (error) {}
  };
  //////////////////////////////////////// getdata//////////////////////////////////////////////

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

//  ดึงข้อมูลผุ้เข้าร่วม
_getDataparticipant = async value =>{
  try{
    const {authData} = this.props;
    const token = authData.token;
    const payload = {
      result: {
        activity_code: this.props.route.params.activity_code,
        pid: this.props.route.params.pid,
      },
      token: token,
    };
    const response = await this.props.dispatch(getDataparticipant(payload));

    console.log("getDataparticipant")
    console.log(response.Search[0].Items[0].Data.map(Dataparticipant => {

      this.state.datamember.push({
        CitizenId: Dataparticipant.CitizenId,
        FullNameTH: Dataparticipant.FullNameTH,
        FullNameEN: Dataparticipant.FullNameEN

      })

    }))


  }catch(error){}
}


  _geDataProduct = async value => {

    console.log(
      "this.props.route.params.activity_code"
   )

    console.log(
       this.props.route.params.activity_code,
      this.props.route.params.pid,
    )
   
    try {
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        results: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(geDataProducts(payload));
      console.log('ถถถถถถถ');
     console.log(response.product[0].Items[0].Data[0])

     if(response.res_code = '00'){ 
     
        response.product[0].Items[0].Data.map(Dataproducts => {
          console.log('ถถถถถถถถถถ1');
          console.log(Dataproducts)
          this.state.dataProduct.push({
            ItemID : Dataproducts.ItemID.toString(),
            ProductCategory:  Dataproducts.ProductCategory.toString(),
            ProductSubCategory: Dataproducts.ProductSubCategory.toString(),
            ProductGroup: Dataproducts.ProductGroups[0].ProductGroupName.toString(),
            ProductBrandNameTh:Dataproducts.ProductBrandNameTh.toString(),
            ProductBrandNameEn: Dataproducts.ProductBrandNameEn.toString(),
            ProductDescriptionTh:Dataproducts.ProductDescriptionTh.toString() ,
            ProductDescriptionEn:Dataproducts.ProductDescriptionEn.toString(),
            ProductPictures:Dataproducts.ProductPictures[0].ImageUrl.toString(),
            
          });
        })
      }
      
    } catch (error) {}
  };

  _getfromProduct = async value => {
    try {
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        token: token,
      };
      const response = await this.props.dispatch(getfromProduct(payload));

      console.log('response.Form');

      response.Form[0].Items[0].Data.map(DataProduct => {
        this.state.dataCategoryProduct.push({
          idcategoryproduct: DataProduct.ProductCategoryId.toString(),
          namecategoryproductTH: DataProduct.ProductCategoryNameTH.toString(),
          namecategoryproductEN: DataProduct.ProductCategoryNameEN.toString(),
          ProductType: DataProduct.ProductType.toString(),
        });
      });
    } catch (error) {}
  };

  getCategoryProductsub = async value => {
    try {
      // console("this.state.idcateproduct")
      // alert()
      console.log(this.props.authData.token)
      // console.log(this.state.idcateproduct,this.props.route.params.pid,this.props.route.params.activity_code,payload)

      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductsub({
          result: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            ProductSubCategoryId: this.state.idcateproduct,
          },
          token: payload,
        }),
      );

      response.ProductSub[0].Items[0].Data.map(datacatesub => {
        this.state.dataCategoryProductsub.push({
          idProsub: datacatesub.ProductSubCategoryId.toString(),
          nameThsub: datacatesub.ProductSubCategoryNameTH.toString(),
          nameENsub: datacatesub.ProductSubCategoryNameEN.toString(),
        });
      });
      // console.log(response.results[0])
    } catch (error) {}
  };

  getCategoryProductdis = async value => {
    try {
      
      // console.log('idcateproductsub', this.state.idcateproductsub);
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductdis({
          result: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            ProducGroupstCategoryId: this.state.idcateproductsub,
          },
          token: payload,
        }),
      );

      response.ProductGroups[0].Items[0].Data.map(datacatesub => {
        this.state.dataCategoryProductdis.push({
          idProdis: datacatesub.ProductGroupId.toString(),
          nameThdis: datacatesub.ProductGroupNameTH.toString(),
          nameENdis: datacatesub.ProductGroupNameEN.toString(),
        });
      });
      // console.log(response.results[0]);
    } catch (error) {}
  };

  // ดึงจังหวัด
  getdata_province = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdataprovince({
          token: payload,
        }),
      );

      if (response.res_code === '00') {
        response.titleCode[0].Items.map(dataprovice => {
          dataprovice.Data.map(Data_provices => {
            this.state.Dataprovices.push({
              ProvinceCode: Data_provices.ProvinceCode,
              ProvinceNameTh: Data_provices.ProvinceNameTh,
              ProvinceNameEn: Data_provices.ProvinceNameEn,
            });
          });
        });
      }
    } catch (error) {}
  };
  //ดึงอำเภอ
  getdata_district = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatadistrict({
          results:{
            province:''
          },
          token: payload,
        }),
      );

      if (response.res_code ='00') {
        response.titleCode[0].Items.map(datadistrict => {
          datadistrict.Data.map(Data_datadistrict => {
            console.log('FUFUFU')
            console.log(Data_datadistrict)
            this.state.Datadistricts.push({
              ProvinceCode: Data_datadistrict.ProvinceCode,
              DistrictCode: Data_datadistrict.DistrictCode,
              DistrictNameTh: Data_datadistrict.DistrictNameTh,
              DistrictNameEn: Data_datadistrict.DistrictNameEn,
            });
          });
        });
      }
    } catch (error) {}
  };

  // ดึงตำบล
  getdata_subdistrict = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatasubdistrict({
          results:{
            district:''
          },
         
          token: payload,
        }),
      );

      if (response.res_code === '00') {
        response.titleCode[0].Items.map(datasubdistrict => {
          datasubdistrict.Data.map(Data_datasubdistrict => {
            this.state.Datasubdistricts.push({
              DistrictCode: Data_datasubdistrict.DistrictCode,
              SubDistrictCode: Data_datasubdistrict.SubDistrictCode,
              SubDistrictNameTh: Data_datasubdistrict.SubDistrictNameTh,
              SubDistrictNameEn: Data_datasubdistrict.SubDistrictNameEn,
            });
          });
        });
      }
    } catch (error) {}
  };

  // ดึงประเทศ

  getdata_contry = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatacontry({
          token: payload,
        }),
      );

      if (response.res_code === '00') {
        response.titleCode[0].Items.map(datacontry => {
          datacontry.Data.map(Data_contry => {
            this.state.Datagetcontry.push({
              CountryId: Data_contry.CountryId,
              CountryNameTh: Data_contry.CountryNameTh,
              CountryNameEn: Data_contry.CountryNameEn,
              CountryGroup: Data_contry.CountryGroup,
              ISOCodeAlpha2: Data_contry.ISOCodeAlpha2,
              ISOCodeNumeric: Data_contry.ISOCodeNumeric,
            });
          });
        });
      }
    } catch (error) {}
  };

  checkProvince = index => {
    //
    if (this.state.checktest === false) {
      this.checkdistrict(index);
      this.setState({checktest: true});
    }
    res = this.state.Dataprovices.find(
      ({ProvinceCode}) => ProvinceCode === index,
    );

    // if (index === '11') {
    //   res = 'นนทบุรี';
    if (I18n.locale == 'th') {
      return res.ProvinceNameTh;
    } else {
      return res.ProvinceNameEn;
    }

    // }
  };

  //เช็คอำเภอ
  checkdistrict = index => {
    selectedAmpor = this.state.Datadistricts.filter(
      Ampor => Ampor.ProvinceCode == index,
    );

    this.setState({getDataAmpor: selectedAmpor});
  };

  //เช็คตำบล

  checksubdistrict = index => {
    selectedtumbur = this.state.Datasubdistricts.filter(
      tumbur => tumbur.DistrictCode == index,
    );
    console.log('ANUCHHHHHH');
    console.log(selectedtumbur);

    this.setState({getDatatumbur: selectedtumbur});
  };

  checkdistrictshow = index => {
    if (this.state.checktest2 === false) {
      this.checksubdistrict(index);
      this.setState({checktest2: true});
    }
    res = this.state.Datadistricts.find(
      ({DistrictCode}) => DistrictCode === index,
    );

    if (I18n.locale == 'th') {
      return res.DistrictNameTh;
    } else {
      return res.DistrictNameEn;
    }
  };

  checksubdistrictshow = index => {
    res = this.state.Datasubdistricts.find(
      ({SubDistrictCode}) => SubDistrictCode === index,
    );

    if (I18n.locale == 'th') {
      return res.SubDistrictNameTh;
    } else {
      return res.SubDistrictNameEn;
    }
  };
  checkContry = index => {
    res = this.state.Datagetcontry.find(({CountryId}) => CountryId === index);

    if (I18n.locale == 'th') {
      return res.CountryNameTh;
    } else {
      return res.CountryNameEn;
    }
  };

  imageGalleryLaunch = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.1,
    };
    launchImageLibrary(options2, response => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;

        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!responses.fileName) {
          responses.fileName = path.split('/').pop();
        }

        this.setState({
          imageUrl: responses.uri,
          imagefilename: responses.fileName,
          imagetype: responses.type
        });
        

      }
    });
  };

  _sendDatabusiness = async value => {
    try {
      console.log('FHFHFHF', this.state.showDatabusiness);
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        result: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
          member_cid: this.props.route.params.member_cid,
          businessTypes: this.state.showDatabusiness,
          businessTypeOther: this.state.textbusinessTypeOther,
        },
        token: token,
      };
      const response = await this.props.dispatch(sendDatabusiness(payload));

      if ((response.res_code = '00')) {
        this.setState({checkeditmenu2: false, showDatabusiness: []});
        this._getDataBusiness();
      }
    } catch (error) {}
  };

  //บันทึกตลาดส่งออก
  _sendDataMaket = async value => {
    try {
      console.log('LLLLL', this.state.itemMaket);
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        result: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
          type: this.props.getUser.userDetails.res_result.type,
          exportMarkets: this.state.itemMaket,
          member_id: this.props.route.params.member_cid,
        },
        token: token,
      };
      const response = await this.props.dispatch(sendDataMaket(payload));

      if ((response.res_code = '00')) {
        this.setState({openPopupmaket: false, itemMaket: []});
        this._getDatamakets();
      }
    } catch (error) {}
  };
 //ลบตลาดส่งออกที่สนใจ
  _deleteDatabusiness = async value =>{
   
    try{
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        result: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
          type: this.props.getUser.userDetails.res_result.type,
          activityExportMarketId: value.id,
          member_id: this.props.route.params.member_cid,
        },
        token: token,
      };
      const response = await this.props.dispatch(deleteDatabusiness(payload));
      if ((response.res_code = '00')) {
        this.setState({itemMaket: []});
        this._getDatamakets();
      }


    }catch (error){}
  }


  

  //เพิ่มข้อมูลข้อมูลสินค้า
  _sendAddProduct = async value =>{

    try{
      const {authData} = this.props;
      const token = authData.token;

      if(this.state.idcateproduct != ''&& this.state.imagefilename != '' && this.state.idcateproduct != '' &&
      this.state.idcateproductsub != '' && this.state.productBrandnameTH != '' && this.state.productDescritionTH != '' &&
      this.state.productDescritionTH  != '' && this.state.productDescritionEN != '' ){ 
      const payload = {
        result: {
          
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            productCategoryID : this.state.idcateproduct,
            productSubCategoryID: this.state.idcateproductsub,
            productGroupID : this.state.idcateproductdis,
            productBrandNameTh: this.state.productBrandnameTH ,
            productBrandNameEn : this.state.productBrandnameEN,
            productDescriptionTh :  this.state.productDescritionTH,
            productDescriptionEn: this.state.productDescritionEN,
            imageBase64String : "",
            member_id : this.props.route.params.member_cid
        
        },
        token: token,
      };

      const response = await this.props.dispatch(SendAddprodutcs(payload));

      if ((response.res_code = '00')) {
        console.log("response.result.itemID")
         console.log(response.result.itemID)
        this._sendItem_geturlimg({Item:response.result.itemID})
      }
    }else{
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    }catch (error){}
  }

  _sendItem_geturlimg = async values =>{

    // console.log(
      // this.state.imageUrl.replace('file://', ''),values.Item,this.props.route.params.pid)
      // add_product_participate

     var _pid = this.props.route.params.pid.toString();
     var itemID = values.Item.toString();

    try{
      const {authData} = this.props;
      const token = authData.token;
      
      this.props.dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      RNFetchBlob.fetch(
        'POST',
        'http://one.ditp.go.th/api/add_product_participate',
        {token: token},
        [
          {
             name: 'data',
             filename: this.state.imagefilename,
            // type: this.state.imagetype,
              data: RNFetchBlob.wrap(
                Platform.OS === 'android' ? this.state.imageUrl : this.state.imageUrl.replace('file://', ''),
              ), 
        },{name: 'pid', data: _pid},{name: 'product', data: itemID}
      ],).then(response2 => {
         console.log("HHHHHHHH____")
        // console.log(response2);
        let response = JSON.parse(response2.data);
        console.log(response.result.linkUrl);

        this._sendupdateDataProduct({Imgurl:response.result.linkUrl,itemID:itemID});

      });
      setTimeout(() => {
        this.props.dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 1000);

      console.log('UDUDUDUUDUDUD', response);
    }catch (error){
      // console.log(error)
     
    }
  }

  _sendupdateDataProduct = async values =>{
   
    try{
      const {authData} = this.props;
      const token = authData.token;
      const payload = {
        results: {
          
            item: values.itemID,
            activity_code: this.props.route.params.activity_code,
            productCategoryID : this.state.idcateproduct,
            productSubCategoryID: this.state.idcateproductsub,
            productGroupID : this.state.idcateproductdis,
            productBrandNameTh: this.state.productBrandnameTH ,
            productBrandNameEn : this.state.productBrandnameEN,
            productDescriptionTh :  this.state.productDescritionTH,
            productDescriptionEn: this.state.productDescritionEN,
            imageBase64String : values.Imgurl,
            member_id : this.props.route.params.member_cid
        
        },
        token: token,
      };

      const response = await this.props.dispatch(SendupdateDataProduct(payload));

      if ((response.res_code = '00')) {
        console.log("response.result.itemID")
         console.log(response.result)
        // this._sendItem_geturlimg({Item:response.result.itemID})
        this.setState({AddProduct:false, dataProduct:[]})
        this._geDataProduct();
      }
    }catch (error){}
  }

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
            // this.checkreload(index)
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
          marginTop: 10,
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
              source={require('../../image/rrr.png')}
            />
          }
          title={
            <View
              style={{
                marginHorizontal: 15,
              
                // flex: 0.6,
              }}>
              <Text style={{color: '#163c70', fontSize: 20}}>{item.name}</Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.ProductCategory} 
              </Text>
              <Text  numberOfLines={2} style={{color: '#163c70', fontSize: 20}}>
                {item.ProductSubCategory}
              </Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.ProductGroup}
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
            flex: 0.4,
            justifyContent: 'center',
            // alignItems: 'flex-end',
            width:34,
          
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require('../../image/penlist.png')}
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
              source={require('../../image/rrrred.png')}
            />
          }
          title={
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text style={{color: '#163c70', fontSize: 20}}>{item.name}</Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.ProductCategory}
              </Text>
              <Text style={{color: '#163c70', fontSize: 20}}>
                {item.ProductSubCategory}
              </Text>
              <Text numberOfLines={1} style={{color: '#73838f', fontSize: 20}}>
                {item.ProductGroup}
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
            // this.selecitemProduct({item: item, index: index});
          }}
        />
      </View>
    );
  };

  ListMenu2 = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,

          marginVertical: 5,
          flexDirection: index <= 1 ? 'row' : 'column',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.selectbusiness({item: item, index: index});
          }}
          style={{
            borderWidth: 1,
            borderColor: '#2d6dc4',
            marginHorizontal: 30,
            height: 35,
            borderRadius: 4,
            backgroundColor:
              this.state.checkBoxbisness[index] === true
                ? '#2d6dc4'
                : '#FFFFFF',
            justifyContent: 'center',
            width: index <= 1 ? '50%' : '100%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color:
                this.state.checkBoxbisness[index] === true
                  ? '#FFFFFF'
                  : '#2d6dc4',
              fontSize: 18,
            }}>
            {item.Value}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  Listmember = ({item, index}) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../image/bgregister.png')}
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
                  source={require('../../image/rrr.png')}
                />
              }
              title={I18n.locale =='th' ? item.FullNameTH : item.FullNameEN  }
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
                alert('Edit');
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
                source={require('../../image/penlist.png')}
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
          source={require('../../image/bgregister.png')}
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
                  source={require('../../image/rrrred.png')}
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

  ListItemProduct = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          // alignItems: 'center',
          flexDirection: 'row',
        }}>
        {index === 0 && (
          <View
            style={{
              backgroundColor: '#FFF',
              // alignItems: 'center',
              paddingBottom: 15,
              flexDirection: 'row',
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                width: '96%',
                height: 170,

                marginHorizontal: 5,
              }}
              source={item.img}
            />
          </View>
        )}

        {index != 0 && (
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#eaf0f9',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#FFF',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#163c70',
                  textAlign: 'center',
                }}>
                {item.nameProduct}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลส่วนตัว)
  FormData1 = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: '#f9fafc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        {/* {index === 0 && ( */}
        <ImageBackground
          source={
            this.state.checkeditmenu0 === false
              ? require('../../image/bgregister.png')
              : require('../../image/bglock.png')
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
              {item.Label}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: '#73838f',
                marginHorizontal: 35,
                marginTop: 0,
              }}>
              {item.Data}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลที่อยู่)
  FormDataaddress = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: '#f9fafc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        {index === 0 && (
          <ImageBackground
            source={require('../../image/bgregister.png')}
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
                {this.state.contact_address_type1 === null ? '' : 'ต.'}
                {this.state.contact_subdistrict_type1}{' '}
                {this.state.contact_subdistrict_type1 === null ? '' : 'อ.'}
                {this.state.contact_district_type1}{' '}
                {this.state.contact_province_type1 === null ? '' : 'จ.'}
                {this.state.contact_province_type1}{' '}
                {this.state.contact_postcode_type1}{' '}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลที่อยู่)
  FormDatacantact = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: '#f9fafc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        {index === 0 && (
          <ImageBackground
            source={require('../../image/bgregister.png')}
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
                {item.Label}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {item.Data}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
        {index === 2 && (
          <ImageBackground
            source={require('../../image/bgregister.png')}
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
                {item.Label}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#73838f',
                  marginHorizontal: 35,
                  marginTop: 0,
                }}>
                {item.Data}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  FormDataEdit = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: '#f9fafc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        <ImageBackground
          source={
            this.state.checkeditmenu0 === true
              ? require('../../image/bgregister.png')
              : require('../../image/bglock.png')
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
              {item.Label}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: '#73838f',
                marginHorizontal: 35,
                marginTop: 0,
              }}>
              {item.Data}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  FormDataaddressedit = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: '#f9fafc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        <KeyboardAvoidingView style={{}}>
          {index === 0 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
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
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 1 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
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
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 2 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
                  resizeMode={'stretch'}
                  imageStyle={{height: 28, width: '100%'}}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ''
                    }
                    // enabled={this.state.enabled}

                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: '100%',
                      },
                    }}
                    onValueChange={(value, index) => {
                      // console.log(index);
                      if (index != 0) {
                        // console.log(
                        //   this.state.Dataprovices[index - 1].ProvinceNameTh,
                        // );
                        // console.log(
                        //   this.state.Dataprovices[index - 1].ProvinceCode,
                        // );

                        this.setState(
                          {
                            enabled: false,
                            getProvinceNameTh: this.state.Dataprovices[
                              index - 1
                            ].ProvinceNameTh,
                            getProvinceCode: this.state.Dataprovices[index - 1]
                              .ProvinceCode,
                          },
                          function() {
                            this.checkdistrict(
                              this.state.Dataprovices[index - 1].ProvinceCode,
                            );
                          },
                        );
                      }
                    }}
                    items={this.state.Dataprovices.map(data => ({
                      label:
                        I18n.locale === 'th'
                          ? data.ProvinceNameTh
                          : data.ProvinceNameEn,
                      value: data.ProvinceCode,
                      key: data.ProvinceCode,
                    }))}>
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: '93%',
                        }}>
                        {this.state.getProvinceNameTh != null ? (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.state.getProvinceNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.checkProvince(item.Data)}
                            {/* {this.checkdistrict(item.Data)} */}
                          </Text>
                        )}
                      </View>

                      <View
                        style={
                          {
                            // flex: 1,
                            // borderWidth:1
                          }
                        }>
                        <Icon
                          style={{color: '#73838f', marginTop: 6}}
                          name="keyboard-arrow-down"
                          size={16}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 3 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
                  resizeMode={'stretch'}
                  imageStyle={{height: 28, width: '100%'}}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ''
                    }
                    // disabled={this.state.enabled}
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: '100%',
                      },
                    }}
                    onValueChange={(value, index) => {
                      // console.log(index);
                      if (index != 0) {
                        // console.log(value);

                        this.setState(
                          {
                            getDataAmporNameTh: this.state.getDataAmpor[
                              index - 1
                            ].DistrictNameTh,
                            getDataAmporCode: this.state.getDataAmpor[index - 1]
                              .DistrictCode,
                          },
                          function() {
                            this.checksubdistrict(
                              this.state.getDataAmpor[index - 1].DistrictCode,
                            );
                          },
                        );
                      }
                    }}
                    items={this.state.getDataAmpor.map(data => ({
                      label:
                        I18n.locale === 'th'
                          ? data.DistrictNameTh
                          : data.DistrictNameEn,
                      value: data.DistrictCode,
                      key: data.DistrictCode,
                    }))}>
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: '93%',
                        }}>
                        {this.state.getDataAmporNameTh != null ? (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.state.getDataAmporNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {item.Data}
                            {this.checkdistrictshow(item.Data)}
                          </Text>
                        )}
                      </View>

                      <View
                        style={
                          {
                            // flex: 1,
                            // borderWidth:1
                          }
                        }>
                        <Icon
                          style={{color: '#73838f', marginTop: 6}}
                          name="keyboard-arrow-down"
                          size={16}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 4 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
                  resizeMode={'stretch'}
                  imageStyle={{height: 28, width: '100%'}}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ''
                    }
                    // disabled={this.state.enabled}
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: '100%',
                      },
                    }}
                    onValueChange={(value, index) => {
                      // console.log(index);
                      if (index != 0) {
                        this.state.getDatatumbur[index - 1].ProvinceNameTh,
                          this.state.getDatatumbur[index - 1].ProvinceCode,
                          this.setState({
                            getDatatumburNameTh: this.state.getDatatumbur[
                              index - 1
                            ].SubDistrictNameTh,
                            getDatatumburCode: this.state.getDatatumbur[
                              index - 1
                            ].SubDistrictCode,
                          });
                      }
                    }}
                    items={this.state.getDatatumbur.map(data => ({
                      label:
                        I18n.locale === 'th'
                          ? data.SubDistrictNameTh
                          : data.SubDistrictNameEn,
                      value: data.SubDistrictCode,
                      key: data.SubDistrictCode,
                    }))}>
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: '93%',
                        }}>
                        {this.state.getDatatumburNameTh != null ? (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.state.getDatatumburNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.checksubdistrictshow(item.Data)}
                          </Text>
                        )}
                      </View>

                      <View
                        style={
                          {
                            // flex: 1,
                            // borderWidth:1
                          }
                        }>
                        <Icon
                          style={{color: '#73838f', marginTop: 6}}
                          name="keyboard-arrow-down"
                          size={16}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}

          {/* รหัสไปรษณีย์ */}
          {index === 5 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
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
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}

          {/* ฟิวประเทศ */}
          {index === 6 && (
            <ImageBackground
              source={require('../../image/bgregister.png')}
              resizeMode={'stretch'}
              imageStyle={{width: '100%', height: 120}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#163c70',
                      marginHorizontal: 35,
                    }}>
                    {item.Label}
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
                  source={require('../../image/inputedittext.png')}
                  resizeMode={'stretch'}
                  imageStyle={{height: 28, width: '100%'}}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ''
                    }
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: '100%',
                      },
                    }}
                    onValueChange={(value, index) => {
                      // console.log(index);
                      if (index != 0) {
                        this.setState({
                          getcontryNameTh: this.state.Datagetcontry[index - 1]
                            .CountryNameTh,
                          getcontryCode: this.state.Datagetcontry[index - 1]
                            .CountryId,
                        });
                      }
                    }}
                    items={this.state.Datagetcontry.map(data => ({
                      label:
                        I18n.locale === 'th'
                          ? data.CountryNameTh
                          : data.CountryNameEn,
                      value: data.CountryId,
                      key: data.CountryId,
                    }))}>
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: '93%',
                        }}>
                        {this.state.getcontryNameTh != null ? (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.state.getcontryNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#73838f',
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}>
                            {this.checkContry(item.Data)}
                          </Text>
                        )}
                      </View>

                      <View
                        style={
                          {
                            // flex: 1,
                            // borderWidth:1
                          }
                        }>
                        <Icon
                          style={{color: '#73838f', marginTop: 6}}
                          name="keyboard-arrow-down"
                          size={16}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  };



  render() {
    const {
      StarD_1,
      EndD_1,
      name,
      detail,
      location,
      code,
    } = this.props.route.params;
    const {
      searchTerm,
      searchByTitle,
      searchAttribute,
      ignoreCase,
      dataMaket,
    } = this.state;

    console.log('FUCUDERDER', this.state.dataProduct, height);

    // this.props.getStatus1
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <HeaderstageRegister
          nameTab={I18n.t('transalte_registerdevlop')}
          nameTab2={1}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 20}
          style={{flex: 1, zIndex: -1}}>
          <ScrollView onScroll={({nativeEvent}) => {}} style={{flex: 1}}>
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
                        source={require('../../image/devlop.png')}
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

                        {/* {this.Star_Date(item.activity_list_start_date)}
                    {this.End_Date(item.activity_list_end_date)}{' '}
                    {this.Yearend(item.activity_list_end_date)}
                    {item.activity_product_category[0]} */}
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
                        source={require('../../image/makerlocation.png')}
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
                  onPress={() => {
                    // this.props.navigation.navigate('Questionnaireseminar')
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 1,
                    top: 3,
                  }}>
                  <Image
                    style={{width: 17, height: 13}}
                    source={require('../../image/readDetail.png')}
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
            <View style={{flex: 1}}>
              {this.state.sucess === false ? (
                <View style={{flex: 1}}>
                  <FlatList
                    style={{width: '95%', alignSelf: 'center'}}
                    data={
                      this.props.getUser.userDetails.res_result.type === 3
                        ? dadamenu3
                        : dadamenu1
                    }
                    renderItem={this.MenuRegister}
                    keyExtractor={item => item.id}
                    numColumns={2}
                  />
                  {/* หน้าข้อมูลส่วนตัว */}
                  <KeyboardAvoidingView behavior={10} style={{flex: 1}}>
                    {this.state.Isative === 0 && (
                      <View>
                        {/* {this.props.getUser.userDetails.res_result.type ===
                          1 && ( */}
                        {/* this.state.editdata === true คือ ก็คืดการแก้ไขข้อมูล */}
                        <View style={{marginBottom: 35 }}>
                          {this.state.editdata === false ? (
                            <View>
                              {/* ข้อมูลแต่ละบุคคล */}
                              <View>
                                {this.state.FormDatatype1.map(
                                  (from1, index) => (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginTop: 3,
                                        shadowColor: '#f9fafc',
                                        shadowOffset: {
                                          width: 0,
                                          height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.0,

                                        elevation: 24,
                                      }}>
                                      {/* {index === 0 && ( */}
                                      <ImageBackground
                                        source={
                                          this.state.checkeditmenu0 === false
                                            ? require('../../image/bgregister.png')
                                            : require('../../image/bglock.png')
                                        }
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          width: '100%',
                                          height: 125,
                                        }}
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
                                            {/* {item.Label} */}

                                            {from1.Label}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 22,
                                              color: '#73838f',
                                              marginHorizontal: 35,
                                              marginTop: 0,
                                            }}>
                                            {from1.Data}
                                          </Text>
                                        </View>
                                      </ImageBackground>
                                    </View>
                                  ),
                                )}
                              </View>
                              {/* ที่อยู่ติดต่อ */}
                              <View>
                                {this.state.FormDatatype1addnress.map(
                                  (from1, index) => (
                                    <>
                                      {index === 0 && (
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 3,
                                            shadowColor: '#f9fafc',
                                            shadowOffset: {
                                              width: 0,
                                              height: 12,
                                            },
                                            shadowOpacity: 0.58,
                                            shadowRadius: 16.0,

                                            elevation: 24,
                                          }}>
                                          <ImageBackground
                                            source={
                                              this.state.checkeditmenu0 ===
                                              false
                                                ? require('../../image/bgregister.png')
                                                : require('../../image/bglock.png')
                                            }
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 125,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 25}}>
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: '#163c70',

                                                  marginHorizontal: 35,
                                                }}>
                                                {/* {item.Label} */}

                                                {from1.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: '#73838f',
                                                  marginHorizontal: 35,
                                                  marginTop: 0,
                                                }}>
                                                {this.state
                                                  .FormDatatype1addnress[0]
                                                  .Data === null
                                                  ? ''
                                                  : this.state
                                                      .FormDatatype1addnress[0]
                                                      .Data}{' '}
                                                {this.state
                                                  .FormDatatype1addnress[3]
                                                  .Data === null
                                                  ? ''
                                                  : 'อ.'}
                                                {/* {this.state
                                                .FormDatatype1addnress[3]
                                                .Data === null
                                                ? ''
                                                : this.checkdistrictshow(
                                                    this.state
                                                      .FormDatatype1addnress[3]
                                                      .Data,
                                                  )}{' '} */}
                                                {this.state
                                                  .FormDatatype1addnress[2]
                                                  .Data === null
                                                  ? ''
                                                  : 'จ.'}
                                                {/* {this.state
                                                .FormDatatype1addnress[2]
                                                .Data === null
                                                ? ''
                                                : this.checkProvince(
                                                    this.state
                                                      .FormDatatype1addnress[2]
                                                      .Data,
                                                  )}{' '} */}
                                                {this.state
                                                  .FormDatatype1addnress[5]
                                                  .Data === null
                                                  ? ''
                                                  : this.state
                                                      .FormDatatype1addnress[5]
                                                      .Data}{' '}
                                              </Text>
                                            </View>
                                          </ImageBackground>
                                        </View>
                                      )}
                                    </>
                                  ),
                                )}
                              </View>

                              <View>
                                {this.state.FormDatatype1contact.map(
                                  (from1, index) => (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginTop: 3,
                                        shadowColor: '#f9fafc',
                                        shadowOffset: {
                                          width: 0,
                                          height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.0,

                                        elevation: 24,
                                      }}>
                                      {/* {index === 0 && ( */}
                                      <ImageBackground
                                        source={
                                          this.state.checkeditmenu0 === false
                                            ? require('../../image/bgregister.png')
                                            : require('../../image/bglock.png')
                                        }
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          width: '100%',
                                          height: 125,
                                        }}
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
                                            {/* {item.Label} */}

                                            {from1.Label}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 22,
                                              color: '#73838f',
                                              marginHorizontal: 35,
                                              marginTop: 0,
                                            }}>
                                            {from1.Data === ''
                                              ? '-'
                                              : from1.Data}
                                          </Text>
                                        </View>
                                      </ImageBackground>
                                    </View>
                                  ),
                                )}
                              </View>
                            </View>
                          ) : (
                            //  ข้อมูลการแก้ไข
                            <>
                              <View>
                                {this.state.FormDatatype1.map(
                                  (from1, index) => (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginTop: 3,
                                        shadowColor: '#f9fafc',
                                        shadowOffset: {
                                          width: 0,
                                          height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.0,

                                        elevation: 24,
                                      }}>
                                      <ImageBackground
                                        source={
                                          this.state.checkeditmenu0 === true
                                            ? require('../../image/bgregister.png')
                                            : require('../../image/bglock.png')
                                        }
                                        resizeMode={'stretch'}
                                        imageStyle={{
                                          width: '100%',
                                          height: 125,
                                        }}
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
                                            {from1.Label}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 22,
                                              color: '#73838f',
                                              marginHorizontal: 35,
                                              marginTop: 0,
                                            }}>
                                            {from1.Data}
                                          </Text>
                                        </View>
                                      </ImageBackground>
                                    </View>
                                  ),
                                )}
                              </View>

                              <View>
                                {this.state.FormDatatype1addnress.map(
                                  (item, index) => (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginTop: 3,
                                        shadowColor: '#f9fafc',
                                        shadowOffset: {
                                          width: 0,
                                          height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.0,

                                        elevation: 24,
                                      }}>
                                      <KeyboardAvoidingView style={{}}>
                                        {index === 0 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                }}>
                                                <TextInput
                                                  onChangeText={text => {
                                                    this.setState({
                                                      contact_postcode: text,
                                                    });
                                                  }}
                                                  style={{
                                                    fontSize: 24,
                                                    color: '#73838f',
                                                    marginHorizontal: 10,
                                                    flex: 1,
                                                  }}>
                                                  {item.Data}
                                                </TextInput>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}
                                        {index === 1 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                }}>
                                                <TextInput
                                                  onChangeText={text => {
                                                    this.setState({
                                                      contact_postcode: text,
                                                    });
                                                  }}
                                                  style={{
                                                    fontSize: 24,
                                                    color: '#73838f',
                                                    marginHorizontal: 10,
                                                    flex: 1,
                                                  }}>
                                                  {item.Data}
                                                </TextInput>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}
                                        {index === 2 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                  // borderWidth: 1,
                                                  borderColor: 'red',
                                                }}>
                                                <RNPickerSelect
                                                  mode="dropdown"
                                                  placeholder={
                                                    //   {
                                                    //   label: 'เลือกประเทศ',
                                                    //   value: 0,
                                                    // }
                                                    ''
                                                  }
                                                  // enabled={this.state.enabled}

                                                  useNativeAndroidPickerStyle={
                                                    false
                                                  }
                                                  _fixAndroidTouchableBug_={
                                                    true
                                                  }
                                                  style={{
                                                    ...pickerSelectStyles2,
                                                    inputAndroidContainer: {
                                                      width: '100%',
                                                    },
                                                  }}
                                                  onValueChange={(
                                                    value,
                                                    index,
                                                  ) => {
                                                    console.log(index);
                                                    if (index != 0) {
                                                      // console.log(
                                                      //   this.state.Dataprovices[index - 1].ProvinceNameTh,
                                                      // );
                                                      // console.log(
                                                      //   this.state.Dataprovices[index - 1].ProvinceCode,
                                                      // );

                                                      this.setState(
                                                        {
                                                          enabled: false,
                                                          getProvinceNameTh: this
                                                            .state.Dataprovices[
                                                            index - 1
                                                          ].ProvinceNameTh,
                                                          getProvinceCode: this
                                                            .state.Dataprovices[
                                                            index - 1
                                                          ].ProvinceCode,
                                                        },
                                                        function() {
                                                          this.checkdistrict(
                                                            this.state
                                                              .Dataprovices[
                                                              index - 1
                                                            ].ProvinceCode,
                                                          );
                                                        },
                                                      );
                                                    }
                                                  }}
                                                  items={this.state.Dataprovices.map(
                                                    data => ({
                                                      label:
                                                        I18n.locale === 'th'
                                                          ? data.ProvinceNameTh
                                                          : data.ProvinceNameEn,
                                                      value: data.ProvinceCode,
                                                      key: data.ProvinceCode,
                                                    }),
                                                  )}>
                                                  <View
                                                    style={{
                                                      // justifyContent: 'center',
                                                      // height: 30,
                                                      // marginHorizontal: 20,

                                                      flexDirection: 'row',
                                                    }}>
                                                    <View
                                                      style={{
                                                        // flex: 1,
                                                        // borderColor:'red',
                                                        // borderWidth:1,
                                                        width: '93%',
                                                      }}>
                                                      {this.state
                                                        .getProvinceNameTh !=
                                                      null ? (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {
                                                            this.state
                                                              .getProvinceNameTh
                                                          }
                                                        </Text>
                                                      ) : (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {this.checkProvince(
                                                            item.Data,
                                                          )}
                                                          {/* {this.checkdistrict(item.Data)} */}
                                                        </Text>
                                                      )}
                                                    </View>

                                                    <View
                                                      style={
                                                        {
                                                          // flex: 1,
                                                          // borderWidth:1
                                                        }
                                                      }>
                                                      <Icon
                                                        style={{
                                                          color: '#73838f',
                                                          marginTop: 6,
                                                        }}
                                                        name="keyboard-arrow-down"
                                                        size={16}
                                                      />
                                                    </View>
                                                  </View>
                                                </RNPickerSelect>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}
                                        {index === 3 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                  // borderWidth: 1,
                                                  borderColor: 'red',
                                                }}>
                                                <RNPickerSelect
                                                  mode="dropdown"
                                                  placeholder={
                                                    //   {
                                                    //   label: 'เลือกประเทศ',
                                                    //   value: 0,
                                                    // }
                                                    ''
                                                  }
                                                  // disabled={this.state.enabled}
                                                  useNativeAndroidPickerStyle={
                                                    false
                                                  }
                                                  _fixAndroidTouchableBug_={
                                                    true
                                                  }
                                                  style={{
                                                    ...pickerSelectStyles2,
                                                    inputAndroidContainer: {
                                                      width: '100%',
                                                    },
                                                  }}
                                                  onValueChange={(
                                                    value,
                                                    index,
                                                  ) => {
                                                    console.log(index);
                                                    if (index != 0) {
                                                      console.log(value);

                                                      this.setState(
                                                        {
                                                          getDataAmporNameTh: this
                                                            .state.getDataAmpor[
                                                            index - 1
                                                          ].DistrictNameTh,
                                                          getDataAmporCode: this
                                                            .state.getDataAmpor[
                                                            index - 1
                                                          ].DistrictCode,
                                                        },
                                                        function() {
                                                          this.checksubdistrict(
                                                            this.state
                                                              .getDataAmpor[
                                                              index - 1
                                                            ].DistrictCode,
                                                          );
                                                        },
                                                      );
                                                    }
                                                  }}
                                                  items={this.state.getDataAmpor.map(
                                                    data => ({
                                                      label:
                                                        I18n.locale === 'th'
                                                          ? data.DistrictNameTh
                                                          : data.DistrictNameEn,
                                                      value: data.DistrictCode,
                                                      key: data.DistrictCode,
                                                    }),
                                                  )}>
                                                  <View
                                                    style={{
                                                      // justifyContent: 'center',
                                                      // height: 30,
                                                      // marginHorizontal: 20,

                                                      flexDirection: 'row',
                                                    }}>
                                                    <View
                                                      style={{
                                                        // flex: 1,
                                                        // borderColor:'red',
                                                        // borderWidth:1,
                                                        width: '93%',
                                                      }}>
                                                      {this.state
                                                        .getDataAmporNameTh !=
                                                      null ? (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {
                                                            this.state
                                                              .getDataAmporNameTh
                                                          }
                                                        </Text>
                                                      ) : (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {/* {item.Data} */}
                                                          {this.checkdistrictshow(
                                                            item.Data,
                                                          )}
                                                        </Text>
                                                      )}
                                                    </View>

                                                    <View
                                                      style={
                                                        {
                                                          // flex: 1,
                                                          // borderWidth:1
                                                        }
                                                      }>
                                                      <Icon
                                                        style={{
                                                          color: '#73838f',
                                                          marginTop: 6,
                                                        }}
                                                        name="keyboard-arrow-down"
                                                        size={16}
                                                      />
                                                    </View>
                                                  </View>
                                                </RNPickerSelect>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}
                                        {index === 4 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                  // borderWidth: 1,
                                                  borderColor: 'red',
                                                }}>
                                                <RNPickerSelect
                                                  mode="dropdown"
                                                  placeholder={
                                                    //   {
                                                    //   label: 'เลือกประเทศ',
                                                    //   value: 0,
                                                    // }
                                                    ''
                                                  }
                                                  // disabled={this.state.enabled}
                                                  useNativeAndroidPickerStyle={
                                                    false
                                                  }
                                                  _fixAndroidTouchableBug_={
                                                    true
                                                  }
                                                  style={{
                                                    ...pickerSelectStyles2,
                                                    inputAndroidContainer: {
                                                      width: '100%',
                                                    },
                                                  }}
                                                  onValueChange={(
                                                    value,
                                                    index,
                                                  ) => {
                                                    console.log(index);
                                                    if (index != 0) {
                                                      console.log(
                                                        this.state
                                                          .getDatatumbur[
                                                          index - 1
                                                        ].ProvinceNameTh,
                                                      );
                                                      console.log(
                                                        this.state
                                                          .getDatatumbur[
                                                          index - 1
                                                        ].ProvinceCode,
                                                      );

                                                      this.setState({
                                                        getDatatumburNameTh: this
                                                          .state.getDatatumbur[
                                                          index - 1
                                                        ].SubDistrictNameTh,
                                                        getDatatumburCode: this
                                                          .state.getDatatumbur[
                                                          index - 1
                                                        ].SubDistrictCode,
                                                      });
                                                    }
                                                  }}
                                                  items={this.state.getDatatumbur.map(
                                                    data => ({
                                                      label:
                                                        I18n.locale === 'th'
                                                          ? data.SubDistrictNameTh
                                                          : data.SubDistrictNameEn,
                                                      value:
                                                        data.SubDistrictCode,
                                                      key: data.SubDistrictCode,
                                                    }),
                                                  )}>
                                                  <View
                                                    style={{
                                                      // justifyContent: 'center',
                                                      // height: 30,
                                                      // marginHorizontal: 20,

                                                      flexDirection: 'row',
                                                    }}>
                                                    <View
                                                      style={{
                                                        // flex: 1,
                                                        // borderColor:'red',
                                                        // borderWidth:1,
                                                        width: '93%',
                                                      }}>
                                                      {this.state
                                                        .getDatatumburNameTh !=
                                                      null ? (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {
                                                            this.state
                                                              .getDatatumburNameTh
                                                          }
                                                        </Text>
                                                      ) : (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {this.checksubdistrictshow(
                                                            item.Data,
                                                          )}
                                                        </Text>
                                                      )}
                                                    </View>

                                                    <View
                                                      style={
                                                        {
                                                          // flex: 1,
                                                          // borderWidth:1
                                                        }
                                                      }>
                                                      <Icon
                                                        style={{
                                                          color: '#73838f',
                                                          marginTop: 6,
                                                        }}
                                                        name="keyboard-arrow-down"
                                                        size={16}
                                                      />
                                                    </View>
                                                  </View>
                                                </RNPickerSelect>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}

                                        {/* รหัสไปรษณีย์ */}
                                        {index === 5 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                }}>
                                                <TextInput
                                                  onChangeText={text => {
                                                    this.setState({
                                                      contact_postcode: text,
                                                    });
                                                  }}
                                                  style={{
                                                    fontSize: 24,
                                                    color: '#73838f',
                                                    marginHorizontal: 10,
                                                    flex: 1,
                                                  }}>
                                                  {item.Data}
                                                </TextInput>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}

                                        {/* ฟิวประเทศ */}
                                        {index === 6 && (
                                          <ImageBackground
                                            source={require('../../image/bgregister.png')}
                                            resizeMode={'stretch'}
                                            imageStyle={{
                                              width: '100%',
                                              height: 120,
                                            }}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              flex: 1,
                                            }}>
                                            <View
                                              style={{flex: 1, marginTop: 20}}>
                                              <View
                                                style={{flexDirection: 'row'}}>
                                                <Text
                                                  style={{
                                                    fontSize: 20,
                                                    color: '#163c70',
                                                    marginHorizontal: 35,
                                                  }}>
                                                  {item.Label}
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
                                                source={require('../../image/inputedittext.png')}
                                                resizeMode={'stretch'}
                                                imageStyle={{
                                                  height: 28,
                                                  width: '100%',
                                                }}
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginHorizontal: 35,
                                                  // borderWidth: 1,
                                                  borderColor: 'red',
                                                }}>
                                                <RNPickerSelect
                                                  mode="dropdown"
                                                  placeholder={
                                                    //   {
                                                    //   label: 'เลือกประเทศ',
                                                    //   value: 0,
                                                    // }
                                                    ''
                                                  }
                                                  useNativeAndroidPickerStyle={
                                                    false
                                                  }
                                                  _fixAndroidTouchableBug_={
                                                    true
                                                  }
                                                  style={{
                                                    ...pickerSelectStyles2,
                                                    inputAndroidContainer: {
                                                      width: '100%',
                                                    },
                                                  }}
                                                  onValueChange={(
                                                    value,
                                                    index,
                                                  ) => {
                                                    console.log(index);
                                                    if (index != 0) {
                                                      this.setState({
                                                        getcontryNameTh: this
                                                          .state.Datagetcontry[
                                                          index - 1
                                                        ].CountryNameTh,
                                                        getcontryCode: this
                                                          .state.Datagetcontry[
                                                          index - 1
                                                        ].CountryId,
                                                      });
                                                    }
                                                  }}
                                                  items={this.state.Datagetcontry.map(
                                                    data => ({
                                                      label:
                                                        I18n.locale === 'th'
                                                          ? data.CountryNameTh
                                                          : data.CountryNameEn,
                                                      value: data.CountryId,
                                                      key: data.CountryId,
                                                    }),
                                                  )}>
                                                  <View
                                                    style={{
                                                      // justifyContent: 'center',
                                                      // height: 30,
                                                      // marginHorizontal: 20,

                                                      flexDirection: 'row',
                                                    }}>
                                                    <View
                                                      style={{
                                                        // flex: 1,
                                                        // borderColor:'red',
                                                        // borderWidth:1,
                                                        width: '93%',
                                                      }}>
                                                      {this.state
                                                        .getcontryNameTh !=
                                                      null ? (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {
                                                            this.state
                                                              .getcontryNameTh
                                                          }
                                                        </Text>
                                                      ) : (
                                                        <Text
                                                          style={{
                                                            color: '#73838f',
                                                            fontSize: 24,
                                                            marginHorizontal: 15,
                                                          }}>
                                                          {this.checkContry(
                                                            item.Data,
                                                          )}
                                                        </Text>
                                                      )}
                                                    </View>

                                                    <View
                                                      style={
                                                        {
                                                          // flex: 1,
                                                          // borderWidth:1
                                                        }
                                                      }>
                                                      <Icon
                                                        style={{
                                                          color: '#73838f',
                                                          marginTop: 6,
                                                        }}
                                                        name="keyboard-arrow-down"
                                                        size={16}
                                                      />
                                                    </View>
                                                  </View>
                                                </RNPickerSelect>
                                              </ImageBackground>
                                            </View>
                                          </ImageBackground>
                                        )}
                                      </KeyboardAvoidingView>
                                    </View>
                                  ),
                                )}
                              </View>
                              <View>
                                {this.state.FormDatatype1contact.map(
                                  (item, index) => (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginTop: 3,
                                        shadowColor: '#f9fafc',
                                        shadowOffset: {
                                          width: 0,
                                          height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.0,

                                        elevation: 24,
                                      }}>
                                      <KeyboardAvoidingView style={{}}>
                                        <ImageBackground
                                          source={require('../../image/bgregister.png')}
                                          resizeMode={'stretch'}
                                          imageStyle={{
                                            width: '100%',
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                          }}>
                                          <View
                                            style={{flex: 1, marginTop: 20}}>
                                            <View
                                              style={{flexDirection: 'row'}}>
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: '#163c70',
                                                  marginHorizontal: 35,
                                                }}>
                                                {item.Label}
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
                                              source={require('../../image/inputedittext.png')}
                                              resizeMode={'stretch'}
                                              imageStyle={{
                                                height: 28,
                                                width: '100%',
                                              }}
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: 35,
                                              }}>
                                              <TextInput
                                                onChangeText={text => {
                                                  this.setState({
                                                    // fromgetcontact: ,
                                                  });
                                                }}
                                                style={{
                                                  fontSize: 24,
                                                  color: '#73838f',
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                }}>
                                                {item.Data}
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      </KeyboardAvoidingView>
                                    </View>
                                  ),
                                )}
                              </View>
                            </>
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
                                บันทึก
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </KeyboardAvoidingView>

                  {/* หน้าข้อมูลประกอบ */}
                  {this.state.Isative === 1 && (
                    <View style={{}}>
                      <View style={{}}>
                        {this.state.checkeditmenu2 === false ? (
                          <View style={{}}>
                            <ImageBackground
                              source={require('../../image/bgregister.png')}
                              resizeMode={'stretch'}
                              imageStyle={{width: '100%', height: 170}}
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
                                  {I18n.t('member_business')}
                                </Text>
                                {this.state.showDatabusiness != undefined && (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      marginHorizontal: 35,

                                      backgroundColor: '#FFF',
                                    }}>
                                    {this.state.showDatabusiness.map(Data => {
                                      return (
                                        <View
                                          style={{
                                            // flexDirection: 'row',
                                            // flexWrap: 'wrap',
                                            backgroundColor: '#FFF',
                                          }}>
                                          <View>
                                            {Data.value === '0' && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: '#73838f',
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}>
                                                {'ผู้ผลิต'}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === '1' && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: '#73838f',
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}>
                                                {'ผู้ส่งออก'}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === '2' && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: '#73838f',
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}>
                                                {'บริษัทการค้ารหว่างประเทศ'}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === '3' && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: '#73838f',
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}>
                                                {'อื่นๆ'}
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      );
                                    })}
                                    <View style={{flexDirection: 'column'}}>
                                      <Text
                                        style={{
                                          fontSize: 22,
                                          color: '#73838f',
                                          marginHorizontal: 3,
                                          marginTop: 0,
                                        }}>
                                        {this.state.textbusinessTypeOther}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </ImageBackground>
                            <ImageBackground
                              source={require('../../image/bgregister.png')}
                              resizeMode={'stretch'}
                              imageStyle={{width: '100%', height: 123}}
                              style={{
                                marginBottom: 50,
                              }}>
                              <View style={{marginHorizontal: 23}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',
                                    marginTop: 25,
                                    marginHorizontal: 15,
                                  }}>
                                  ตลาดส่งออกที่สนใจ
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    backgroundColor: '#FFF',
                                  }}>
                                  {this.state.itemMaket.map(data => {
                                    return (
                                      <Chip
                                      onClose={() => {

                                        this._deleteDatabusiness({id:data.activityExportMarketId})
                                       
                                      }}
                                        style={{
                                          backgroundColor: '#2d6dc4',
                                          margin: 4,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: '#FFFF',
                                            marginHorizontal: 3,
                                            marginTop: 0,
                                          }}>
                                            
                                          {I18n.locale === 'th'
                                            ? data.ExportMarketNameTH
                                            : data.ExportMarketNameEN}
                                          
                                          
                                        </Text>
                                      </Chip>
                                    );
                                  })}
                                </View>
                              </View>
                            </ImageBackground>
                            {/* <FlatList /> */}
                          </View>
                        ) : (
                          <View style={{}}>
                            <ImageBackground
                              source={require('../../image/bginputx.png')}
                              resizeMode={'stretch'}
                              imageStyle={{width: '100%', height: 340}}
                              style={{}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#163c70',

                                  marginHorizontal: 35,
                                  marginTop: 25,
                                }}>
                                {I18n.t('member_business')}{' '}
                              </Text>
                              {this.state.fromBisiness.map((Data1, index) => {
                                return (
                                  <View
                                    style={{
                                      marginTop: 10,

                                      marginHorizontal: 25,
                                      marginBottom: 5,
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.selectbusiness({
                                          item: Data1,
                                          index: Data1.key,
                                        });
                                      }}
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#2d6dc4',
                                        backgroundColor:
                                          this.state.checkBoxbisness[
                                            Data1.key
                                          ] === true
                                            ? '#2d6dc4'
                                            : '#FFFFFF',
                                        flex: 0.5,
                                        height: 35,
                                        borderRadius: 4,
                                        marginHorizontal: 5,
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          textAlign: 'center',
                                          color:
                                            this.state.checkBoxbisness[
                                              Data1.key
                                            ] === true
                                              ? '#FFFFFF'
                                              : '#2d6dc4',
                                          fontSize: 18,
                                        }}>
                                        {/* {Data.Value} */}
                                        {Data1.value}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}

                              {/* <View style={{borderWidth:1}}> */}
                              <ImageBackground
                                source={require('../../image/inputedittext.png')}
                                resizeMode={'stretch'}
                                imageStyle={{height: 28, width: '100%'}}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginHorizontal: 35,
                                  marginTop: 8,
                                }}>
                                <TextInput
                                  placeholder={'กรณีอื่นๆ กรุณาระบุรายละเอียด'}
                                  onChangeText={text => {
                                    this.setState({
                                      textbusinessTypeOther: text,
                                    });
                                  }}
                                  style={{
                                    fontSize: 24,
                                    color: '#c0c0c0',

                                    marginHorizontal: 10,

                                    flex: 1,
                                  }}>
                                  {this.state.textbusinessTypeOther}
                                </TextInput>
                              </ImageBackground>
                            </ImageBackground>

                            <ImageBackground
                              source={require('../../image/bgregister.png')}
                              resizeMode={'stretch'}
                              imageStyle={{width: '100%', height: 123}}
                              style={{
                                marginBottom: 25,
                              }}>
                              <View style={{}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',
                                    marginTop: 25,
                                    marginHorizontal: 35,
                                  }}>
                                  ตลาดส่งออกที่สนใจ
                                </Text>

                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({openPopupmaket: true});
                                  }}
                                  style={{
                                    backgroundColor: '#2d6dc4',
                                    width: '30%',
                                    marginHorizontal: 35,
                                    height: 34,
                                    borderRadius: 17,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      marginHorizontal: 2,
                                    }}>
                                    <Image
                                      style={{width: 15, height: 15}}
                                      resizeMode={'stretch'}
                                      source={require('../../image/pencx.png')}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      flex: 0.8,
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                        fontSize: 18,
                                      }}>
                                      โปรดเลือก
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </ImageBackground>
                          </View>
                        )}

                        {/* edit ตอนclick แก้ไข */}
                      </View>
                      {/* เช็คปุ่ม แก้ไขข้อมูลประกอบ ถ้าคลิกแก้ไข ก้จะเปลี่ยนปุ่มและ state */}
                      {this.state.checkeditmenu2 === false && (
                        <View style={{marginTop: 25}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({checkeditmenu2: true});
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
                              แก้ไขข้อมูลประกอบ
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
                      )}
                      {/* ปุ่มบันทึกข้อมูลประกอบ*/}
                      {this.state.checkeditmenu2 === true && (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 40,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({checkeditmenu2: false});
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
                              // this._getDataBusiness();
                              this._sendDatabusiness();
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
                              บันทึก
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}

                  {/* เมนูสินค้า */}
                  {/* เช็คหน้าที่สินค้า */}
                  {this.state.Isative === 2 && (
                    <View>
                      {this.state.AddProduct === false ? (
                        <View>
                          {/* เช็คว่ามีข้อมูลมั้ย  ถ้าไม่มีก็ไม่ต้องแสดง ถ้ามีก็แสดง*/}
                          {this.state.dataProduct === null ? (
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
                                    ไม่มีสินค้า
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
                                    this.setState({Isative: 1});
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
                                    this.setState({Isative: 3});
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
                                  {/* แสดงข้อมูลของสินค้า */}
                                  <FlatList
                                    style={{
                                      height: height * 0.4,
                                    }}
                                    data={this.state.dataProduct}
                                    renderItem={this.Listproduct}
                                    keyExtractor={item => item.id}
                                  />
                                  {/* ปุ่มเพิ่มสินค้า */}
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

                                  {/* มีปุ่ม 3 ปุ่ม มี กลับ ลบผู้เข้าร่วม และ ต่อไป */}
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
                                        ลบสินค้า
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
                                    data={this.state.dataProduct}
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
                                          ลบสินค้า
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
                                          ยกเลิก
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
                        // หน้าการอัพโหลดข้อมูล
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
                                  source={require('../../image/inputedittext.png')}
                                  resizeMode={'stretch'}
                                  imageStyle={{height: 28, width: '100%'}}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                  }}
                                />
                                {/* เลือกประเภทสินค้า */}
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
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                      }}>
                                      {this.state.textcateproduct === null ? (
                                        <Text
                                          style={{
                                            color: '#c0c0c0',
                                            fontSize: 24,
                                          }}>
                                          เลือกประเภทสินค้า
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: '#163c70',
                                            fontSize: 24,
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
                                  source={require('../../image/inputedittext.png')}
                                  resizeMode={'stretch'}
                                  imageStyle={{height: 28, width: '100%'}}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                  }}
                                />
                                {/* เลือกประเภทสินค้าย่อย */}
                                <RNPickerSelect
                                  placeholder={{
                                    label: 'เลือกประเภทสินค้าย่อย',
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
                                            : I18n.locale === 'th'
                                            ? this.state.dataCategoryProductsub[
                                                index - 1
                                              ].nameThsub
                                            : this.state.dataCategoryProductsub[
                                                index - 1
                                              ].nameENsub,

                                        idcateproductsub:
                                          index === 0 ? 0 : value,
                                      },
                                      function() {
                                        this.getCategoryProductdis();
                                      },
                                    );
                                  }}
                                  items={this.state.dataCategoryProductsub.map(
                                    data => ({
                                      label:
                                        I18n.locale === 'th'
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
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                      }}>
                                      {this.state.textcateproductsub ===
                                      null ? (
                                        <Text
                                          style={{
                                            color: '#c0c0c0',
                                            fontSize: 24,
                                          }}>
                                          เลือกประเภทสินค้าย่อย{' '}
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: '#163c70',
                                            fontSize: 24,
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
                                  source={require('../../image/inputedittext.png')}
                                  resizeMode={'stretch'}
                                  imageStyle={{height: 28, width: '100%'}}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                  }}
                                />
                                {/* เลือกกลุ่มสินค้า */}
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
                                          : I18n.locale === 'th'
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
                                        I18n.locale === 'th'
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
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                      }}>
                                      {this.state.textcateproductdis ===
                                      null ? (
                                        <Text
                                          style={{
                                            color: '#c0c0c0',
                                            fontSize: 24,
                                          }}>
                                          เลือกกลุ่มสินค้า{' '}
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
                                  Product Brand Name
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../image/inputedittext.png')}
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
                                  onChangeText={value =>
                                    this.setState({
                                      productBrandnameEN: value,
                                    })
                                  }
                                />
                              </ImageBackground>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  Product Description
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../image/inputedittext.png')}
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
                                  onChangeText={value =>
                                    this.setState({
                                      productDescritionEN: value,
                                    })
                                  }
                                  // onChangeText={value => setTextComment(value)}
                                  // disabled={true}
                                />
                                <Text
                                  style={{
                                    color: '#c0c0c0',
                                    fontSize: 14,
                                    right: 70,
                                  }}>
                                  100 Charecter
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
                                  ชื่อแบรนด์
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../image/inputedittext.png')}
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
                                  onChangeText={value =>
                                    this.setState({
                                      productBrandnameTH: value,
                                    })
                                  }
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  รายละเอียดสินค้า
                                </Text>
                              </View>

                              <ImageBackground
                                source={require('../../image/inputedittext.png')}
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
                                  onChangeText={value =>
                                    this.setState({
                                      productDescritionTH: value,
                                    })
                                  }
                                  // disabled={true}
                                />
                                <Text
                                  style={{
                                    color: '#c0c0c0',
                                    fontSize: 14,
                                    right: 70,
                                  }}>
                                  100 Charecter
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
                                style={{
                                  flexDirection: 'row',
                                  paddingBottom: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#163c70',

                                    marginHorizontal: 10,
                                  }}>
                                  Product's Image / รูปสินค้า
                                </Text>
                              </View>
                              {/* เช็ครูปภาพและ  ขนากรูปภาพ 4 MB */}
                              <View style={{flexDirection: 'row'}}>
                                {/* {this.state.imagefilename != null && (
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'red',

                                marginHorizontal: 10,
                              }}>
                              *เฉพาะไฟล์ JPEG, PNG, GIF ขนาดไม่เกิน 4 MB
                            </Text>
                          )} */}
                              </View>

                              {this.state.imagefilename != null && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    paddingBottom: 10,
                                  }}>
                                  <View style={{flex: 0.2}}>
                                    <Icon2
                                      style={{
                                        marginHorizontal: 15,
                                        marginTop: 4,
                                      }}
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
                                      style={{
                                        marginHorizontal: 15,
                                        marginTop: 4,
                                      }}
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
                                      อัพโหลดไฟล์
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>

                          {/* ปุ่มหน้าการอัพโหลดข้อมูล */}
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
                                // this.setState({AddProduct: false});
                                this._sendAddProduct()
                                // this._sendItem_geturlimg()
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
                                บันทึก
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  {/* เมนูข้อมูลบริษัท */}
                  {this.state.Isative === 3 && (
                    <>
                      {this.props.getUser.userDetails.res_result.type === 3 && (
                        <>
                          {this.state.Addcompany === false ? (
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
                                    ไม่มีข้อมูลบริษัท
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View style={{marginTop: 15}}>
                              <View style={{}}>
                                <View
                                  style={{
                                    marginHorizontal: 15,

                                    flexDirection: 'row',
                                    marginBottom: 15,
                                  }}>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      marginHorizontal: 10,
                                      height: 30,
                                      borderRadius: 18,
                                      borderColor: '#999999',

                                      flexDirection: 'row',
                                      flex: 0.8,
                                    }}>
                                    <Image
                                      style={{
                                        width: 23,
                                        height: 23,
                                        marginTop: 4,
                                        marginHorizontal: 9,
                                      }}
                                      source={require('../../image/searchbluex.png')}
                                    />
                                    <TextInput
                                      style={{fontSize: 18}}
                                      placeholder="ค้นหา"
                                    />
                                  </View>
                                  <View style={{flex: 0.3}}>
                                    <TouchableOpacity
                                      style={{
                                        backgroundColor: '#2d6dc4',
                                        height: 30,
                                        borderRadius: 18,
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          textAlign: 'center',
                                          fontSize: 20,
                                          color: '#FFFFFF',
                                        }}>
                                        ค้นหา
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <View
                                  // source={require('../../image/bgregister.png')}
                                  // resizeMode={'cover'}
                                  // imageStyle={{width: '100%', height: 80}}
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
                                        เลขนิติบุคคล
                                      </Text>
                                      <Text
                                        style={{
                                          color: 'red',
                                        }}>
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  // source={require('../../image/bgtwoinput.png')}
                                  // resizeMode={'cover'}
                                  // imageStyle={{width: '100%', height: 145}}

                                  style={{
                                    // flexDirection: 'row',
                                    // alignItems: 'center',
                                    marginHorizontal: 15,

                                    shadowColor: '#f8f9fb',
                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    backgroundColor: '#FFFFFF',
                                    elevation: 5,
                                    paddingBottom: 15,
                                    marginBottom: 1,
                                  }}>
                                  <View style={{flex: 1, marginTop: 13}}>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
                                        }}>
                                        ชื่อบริษัท/กิจการ
                                      </Text>
                                      <Text
                                        style={{
                                          color: 'red',
                                        }}>
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
                                        }}>
                                        Company Name
                                      </Text>
                                      <Text
                                        style={{
                                          color: 'red',
                                        }}>
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  // source={require('../../image/bgmoreinput.png')}
                                  // resizeMode={'cover'}
                                  // imageStyle={{width: '100%', height: 520}}

                                  style={{
                                    // flexDirection: 'row',
                                    // alignItems: 'center',
                                    backgroundColor: '#FFFFFF',
                                    shadowColor: '#f8f9fb',
                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    marginHorizontal: 15,
                                    elevation: 5,
                                    marginBottom: 30,
                                    paddingBottom: 10,
                                  }}>
                                  <View style={{flex: 1, marginTop: 13}}>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
                                        }}>
                                        ประเทศ
                                      </Text>
                                      <Text
                                        style={{
                                          color: 'red',
                                        }}>
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
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

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
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

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
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

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
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

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
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

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
                                        }}>
                                        อีเมล์
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
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
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#163c70',

                                          marginHorizontal: 10,
                                        }}>
                                        หมายเลขโทรศัพท์
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            openphonenumber: true,
                                          });
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
                                            // console.log('OKOOKOK', iii);
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
                                          source={require('../../image/arrowtitle.png')}
                                        />
                                      </TouchableOpacity>

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

                                {/* แก้ตรงนี้ */}
                              </View>
                            </View>
                          )}
                        </>
                      )}
                      {this.props.getUser.userDetails.res_result.type != 6 &&
                      this.props.getUser.userDetails.res_result.type != 3 &&
                      this.props.getUser.userDetails.res_result.type != 4 ? (
                        <View>
                          {this.state.AddPersonativity === false ? (
                            <View>
                              {this.state.datamember.length === 0 ? (
                                <View>
                                  <View style={{height: height * 0.4}}>
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
                                          ไม่มีข้อมูลผู้เข้ากิจกรรม
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
                                      เพิ่มผู้เข้าร่วม
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
                                        this.setState({Isative: 2});
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
                                      <View
                                        style={{
                                          borderWidth: 1,
                                          marginHorizontal: 15,
                                          height: 30,
                                          borderRadius: 18,
                                          borderColor: '#999999',

                                          flexDirection: 'row',
                                        }}>
                                        <Image
                                          style={{
                                            width: 23,
                                            height: 23,
                                            marginTop: 4,
                                            marginHorizontal: 9,
                                          }}
                                          source={require('../../image/searchbluex.png')}
                                        />
                                        <TextInput
                                          style={{fontSize: 18}}
                                          placeholder="ค้นหา"
                                        />
                                      </View>
                                      {/* แสดงรายชื่อ เข้าร่วมกิจกรรม */}
                                      <FlatList
                                        style={{
                                          height: height * 0.4,
                                        }}
                                        data={this.state.datamember}
                                        renderItem={this.Listmember}
                                        keyExtractor={item => item.id}
                                      />

                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            AddPersonativity: true,
                                          });
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
                                          เพิ่มผู้เข้าร่วม
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
                                            this.setState({
                                              Deletemember: true,
                                            });
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
                                            ลบผู้เข้าร่วม
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.setState({sucess: true});
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
                                        data={this.state.datamember}
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
                                              ลบ
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
                                              ยกเลิก
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
                            <View style={{marginTop: 15}}>
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
                                        คำนำหน้าชื่อ
                                      </Text>
                                      <Text
                                        style={{
                                          color: 'red',
                                        }}>
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
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
                                      onValueChange={value =>
                                        console.log(value)
                                      }
                                      items={[
                                        {label: 'นาย', value: 'นาย'},
                                        {label: 'นาง', value: 'นาง'},
                                        {label: 'นางสาว', value: 'นางสาว'},
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
                                            เลือกคำนำหน้าชื่อ
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
                                    source={require('../../image/inputedittext.png')}
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
                                      onChangeText={searchTermProduct => {
                                        this.setState({});
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
                                    source={require('../../image/inputedittext.png')}
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
                                    source={require('../../image/inputedittext.png')}
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
                                    source={require('../../image/inputedittext.png')}
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
                                      อาชีพ
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      Center
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      ตำแหน่ง
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      Position
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      ประเทศ
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      รหัสไปรษณีย์
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      จังหวัด
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      อำเภอ/เขต
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      ตำบล/แขวง
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      ที่อยู่ติดต่อ
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'red',
                                      }}>
                                      *
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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
                                      อีเมล
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require('../../image/inputedittext.png')}
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

                                  <View style={{flex: 1}}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',

                                        marginHorizontal: 10,
                                      }}>
                                      หมายเลขโทรศัพท์
                                    </Text>

                                    <ImageBackground
                                      source={require('../../image/inputedittext.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{height: 28, width: '100%'}}
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
                                          containerButtonStyle={{bottom: 0}}
                                          countryCode={this.state.countryCode}
                                          withFlag={true}
                                          withFilter={true}
                                          withEmoji={true}
                                          withCallingCode={true}
                                          withAlphaFilter={false}
                                          onSelect={iii => {
                                            // console.log('OKOOKOK', iii);
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
                                          source={require('../../image/arrowtitle.png')}
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

                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginHorizontal: 32,
                                  marginTop: 20,
                                }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({AddPersonativity: false});
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
                                    this.setState({AddPersonativity: false});
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
                                    บันทึก
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </View>
                      ) : null}
                    </>
                  )}

                  {/* เมนูปุ่มที่2 */}

                  {/* เมนูปุ่มที่3 */}

                  {this.state.Isative === 3 && (
                    <>
                      {this.props.getUser.userDetails.res_result.type === 3 && (
                        <>
                          {this.state.Addcompany === false && (
                            <View style={{}}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({Addcompany: true});
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
                                  เพิ่มผู้เข้าร่วม
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          <View
                            style={{flexDirection: 'row', alignSelf: 'center'}}>
                            {/* เช็ค ถ้ากด เพิ่มผู้เข้าร่วม จากปุ่ม กลับที่หน้าเมนูสินค้า ก้จะเป็น กลับหน้าเดืม */}
                            {this.state.Addcompany === false ? (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({Isative: 2});
                                }}
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  borderColor: '#2d6dc4',
                                  height: 40,
                                  flex: 0.4,
                                  borderRadius: 24,
                                  // marginBottom: 15,
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  marginHorizontal: 3,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // display: 'flex',
                                }}>
                                <View style={{flex: 0.4}}>
                                  <Icon
                                    name="chevron-left"
                                    size={25}
                                    style={{
                                      color: '#2d6dc4',
                                      // marginTop: 9.1,
                                    }}
                                  />
                                </View>
                                <View style={{flex: 0.5}}>
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
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({Addcompany: false});
                                }}
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  borderColor: '#2d6dc4',
                                  height: 40,
                                  flex: 0.4,
                                  borderRadius: 24,
                                  // marginBottom: 15,
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  marginHorizontal: 3,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // display: 'flex',
                                }}>
                                <View style={{flex: 0.4}}>
                                  <Icon
                                    name="chevron-left"
                                    size={25}
                                    style={{
                                      color: '#2d6dc4',
                                      // marginTop: 9.1,
                                    }}
                                  />
                                </View>
                                <View style={{flex: 0.5}}>
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
                            )}

                            {/* เช็ค ถ้ากด เพิ่มผู้เข้าร่วม จากปุ่มต่อไป ก้จะเป็น ปุ่ม บันทึก */}
                            {this.state.Addcompany === false ? (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({sucess: true});
                                }}
                                style={{
                                  fontSize: 24,
                                  height: 40,
                                  flex: 0.4,
                                  marginHorizontal: 3,
                                  backgroundColor: '#2d6dc4',
                                  borderRadius: 24,
                                  justifyContent: 'center',
                                  marginBottom: 10,
                                  marginHorizontal: 3,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{flex: 0.8}}>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 22,
                                      textAlign: 'center',
                                      // flex: 0.7,

                                      // marginTop: 9.1,
                                    }}>
                                    {I18n.t('translate_Next')}
                                  </Text>
                                </View>
                                <View style={{flex: 0.2}}>
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
                                  this.setState({Addcompany: false});
                                }}
                                style={{
                                  fontSize: 24,
                                  height: 40,
                                  flex: 0.4,
                                  marginHorizontal: 3,
                                  backgroundColor: '#2d6dc4',
                                  borderRadius: 24,
                                  justifyContent: 'center',
                                  marginBottom: 10,
                                  marginHorizontal: 3,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{flex: 0.8}}>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontSize: 22,
                                      textAlign: 'center',
                                      // flex: 0.7,

                                      // marginTop: 9.1,
                                    }}>
                                    บันทึก
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>
              ) : (
                // หน้าถ้ากรอกข้อมูลเสร็จทั้งหมดแล้ว stateจะเปลี่ยนเป็น sucess
                <View style={{marginTop: 10}}>
                  {this.props.getUser.userDetails.res_result.type === 3 && (
                    <ScrollView style={{alignSelf: 'center'}}>
                      {this.state.Allcontents
                        ? this.state.Allcontents.map((param, i) => {
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
                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      เลขบัตรประชาชน :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.idcardh(this.state.IDcard)}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ชื่อ-นามสกุล (ไทย) :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.nember_usernameTh}{' '}
                                      {this.state.nember_lastusernameTh}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ชื่อ-นามสกุล (อังกฤษ) :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.nember_usernameEn}{' '}
                                      {this.state.nember_lastusernameEn}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ที่อยู่ปัจจุบัน :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_address}{' '}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      จังหวัด :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_province}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      อำเภอ/เขต :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_district}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ตำบล/แขวง :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_subdistrict}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      รหัสไปรษณีย์ :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_postcode}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      อีเมล :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.number_email}
                                      {''}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      หมายเลขโทรศัพท์ :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <View
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
                                          // console.log('OKOOKOK', iii);
                                          this.onSelect(iii);
                                        }}
                                        visible={false}
                                      />

                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#2d6dc4',
                                        }}>
                                        {this.PhoneNum(this.state.number_tel)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </DropDownItem>
                            );
                          })
                        : null}

                      <View style={{height: 10}} />
                    </ScrollView>
                  )}
                  {this.props.getUser.userDetails.res_result.type === 1 && (
                    <ScrollView style={{alignSelf: 'center'}}>
                      {this.state.Allcontents1
                        ? this.state.Allcontents1.map((param, i) => {
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
                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      หมายเลขสมาชิกกรม :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.number_naturalID}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ประเภทสมาชิกกรม :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.userstatus_category}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      เลขนิติบุคคล (Username) :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.idcardh(this.state.IDcard)}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',

                                    flexDirection: 'row',
                                    paddingBottom: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      บริษัท/กิจการ :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.company_nameTH}
                                    </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ที่อยู่ปัจจุบัน :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_address}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      จังหวัด :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_province}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      อำเภอ/เขต :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_district}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      ตำบล/แขวง :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_subdistrict}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      รหัสไปรษณีย์ :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.contact_postcode}{' '}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      อีเมล :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#2d6dc4',
                                      }}>
                                      {' '}
                                      {this.state.number_email}
                                      {''}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      width: '50%',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: '#163c70',
                                        textAlign: 'right',
                                      }}>
                                      หมายเลขโทรศัพท์ :{' '}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'column',

                                      width: '50%',
                                    }}>
                                    <View
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
                                          // console.log('OKOOKOK', iii);
                                          this.onSelect(iii);
                                        }}
                                        visible={false}
                                      />

                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: '#2d6dc4',
                                        }}>
                                        {this.PhoneNum(this.state.number_tel)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </DropDownItem>
                            );
                          })
                        : null}

                      <View style={{height: 10}} />
                    </ScrollView>
                  )}
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
                                  // alignItems: 'center',
                                  flexDirection: 'row',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'column',

                                    width: '50%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: '#163c70',
                                      textAlign: 'right',
                                    }}>
                                    {I18n.t('member_business')} :{' '}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'column',

                                    width: '50%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: '#2d6dc4',
                                    }}>
                                    {' '}
                                    {
                                      'ผู้ผลิต ,ผู้ส่งออก ,บริฐัทการค้าระหว่างประเทศ'
                                    }
                                    {''}
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  backgroundColor: '#FFF',
                                  // alignItems: 'center',
                                  flexDirection: 'row',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'column',

                                    width: '50%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: '#163c70',
                                      textAlign: 'right',
                                    }}>
                                    ตลาดส่งออกที่สนใจ :{' '}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'column',

                                    width: '50%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: '#2d6dc4',
                                    }}>
                                    {' '}
                                    {''}
                                  </Text>
                                </View>
                              </View>
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{height: 10}} />
                  </ScrollView>
                  {/* สินค้า */}
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
                              <FlatList
                                data={dataProdestsave}
                                renderItem={this.ListItemProduct}
                                keyExtractor={item => item.id}
                              />
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{height: 10}} />
                  </ScrollView>
                  {this.props.getUser.userDetails.res_result.type === 3 && (
                    <ScrollView style={{alignSelf: 'center'}}>
                      {this.state.Alldatacompany
                        ? this.state.Alldatacompany.map((param, i) => {
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

                      <View style={{height: 25}} />
                    </ScrollView>
                  )}
                  {this.props.getUser.userDetails.res_result.type === 1 && (
                    <ScrollView style={{alignSelf: 'center'}}>
                      {this.state.Alldatanumber
                        ? this.state.Alldatanumber.map((param, i) => {
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

                      <View style={{height: 25}} />
                    </ScrollView>
                  )}
                  {/* นโยบาย  */}
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
                          source={require('../../image/rrr.png')}
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
                              ข้าพเจ้ายอมรับเงื่อนไขข้อกำหนดของกรม
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              alert('Policy');
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#2d6dc4',
                                textAlign: 'center',
                                textDecorationLine: 'underline',
                              }}>
                              อ่านเงื่อนไขข้อกำหนดของกรม
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
                        ยืนยันการสมัคร
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.state.openPopupmaket && (
                <Overlay
                  backdropStyle={{backgroundColor: '#2d6dc480'}}
                  overlayStyle={{
                    borderWidth: 2,
                    borderColor: '#568ae0',
                    // backgroundColor: '#568ae0',
                    // top: height * 0.001,
                    top: height * 0.03,
                    height: height * 0.7,
                    width: width * 0.8,
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,

                    elevation: 15,
                  }}
                  isVisible={this.state.openPopupmaket}
                  onBackdropPress={() =>
                    this.setState({openPopupmaket: false})
                  }>
                  <View
                    style={{
                      height: 33,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: '#dadada',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: 'transparent',
                        marginLeft: 10,
                        top: 3,
                      }}
                      source={require('../../image/searchbluex.png')}
                    />
                    <TextInput
                      style={{fontSize: 20, flex: 1}}
                      placeholder={'ค้นหา'}
                      onChangeText={searchTerm => this.setState({searchTerm})}
                    />
                  </View>
                  <SearchableFlatList
                    style={{}}
                    data={this.state.DataMakets}
                    searchTerm={searchTerm}
                    searchAttribute={searchAttribute}
                    ignoreCase={ignoreCase}
                    renderItem={({item, index}) => (
                      <View>
                        {/* {item.id != null && ( */}
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            backgroundColor: '#FFF',
                          }}>
                          <CheckBox
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
                                source={require('../../image/rrr.png')}
                              />
                            }
                            checked={this.state.checkBoxMaket[item.ActivityExportMarketId]}
                            onPress={() => {
                              this.selectItemMaket({
                                item: item,
                                index: item.ActivityExportMarketId,
                              });
                            }}
                            containerStyle={{
                              backgroundColor: '#FFF',
                              borderWidth: 0,
                            }}
                            title={
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 20,
                                  color: '#6f7d91',
                                  marginLeft: 10,
                                  width: '100%',
                                }}>
                                {item.ExportMarketNameTH}
                              </Text>
                            }
                          />
                        </View>
                        {/* )} */}
                      </View>
                    )}
                    keyExtractor={item => item}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this._sendDataMaket();
                    }}
                    style={{
                      backgroundColor: '#2d6dc4',
                      height: 40,
                      borderRadius: 24,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#FFFF',
                        textAlign: 'center',
                        fontSize: 20,
                      }}>
                      บันทึก
                    </Text>
                  </TouchableOpacity>
                </Overlay>
              )}
            </View>

            {/* <DevelopPerson/> */}
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
)(DevlopRegister);

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
