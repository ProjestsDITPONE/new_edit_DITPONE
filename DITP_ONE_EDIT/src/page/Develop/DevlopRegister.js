import React, { useState } from "react";
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
  Alert,
} from "react-native";

import { Chip } from "react-native-paper";
import { connect } from "react-redux";
import Headers from "../../components/Headers";
import HeaderstageRegister from "../../components/HeaderstageRegister";
import I18n from "../../utils/I18n";
import {
  CheckBox,
  Overlay,
  ListItem,
  Input,
  Avatar,
} from "react-native-elements";
import Styles from "./Styles";
import Moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/AntDesign";
import CountryPicker from "../../lib_edit/react-native-country-picker-modal/lib";
import RNPickerSelect from "react-native-picker-select";
import DropDownItem from "react-native-drop-down-item_edit";
import RNFetchBlob from "rn-fetch-blob";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import {
  getDatarefer,
  getChooseMaket,
  getCategoryProduct,
  getCateProductsub,
  getCateProductdis,
  Getactivefrom,
  updateProfileNiti,
  updateProfileNatural,
  getdataprovince,
  getdatadistrict,
  getdatasubdistrict,
  getdatacontry,
  getdatacontryCity,
  getDataBusiness,
  getfromibusiness,
  sendDatabusiness,
  deleteDatabusiness,
  sendDataMaket,
  getDatamakets,
  getfromProduct,
  geDataProducts,
  getDataparticipant,
  getSearchparticipantsearchspecific,
  getDataparticipantSearch,
  sendAddmemberparticipantSearch,
  sendDeleteDataparticipant,
  SendAddprodutcs,
  sendCheckAddmember,
  sendCheckuserdrive,
  sendItem_geturlimg,
  SendupdateDataProduct,
  SendupdateDataProductedit,
  sendDeleteidProduct,
  sendsucessactive,
  Sendaddnewmember,
  GetdateDataCorporat,
  getPersonCorporate,
  SearchPersonCorporate,
  sendAddpersonCorparate,
} from "../../actions/data.actions";
import { SearchableFlatList } from "react-native-searchable-list";
// import ImagePicker from 'react-native-image-picker';
import SwiperFlatList from "react-native-swiper-flatlist";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// import DevelopJuristic from './DevelopJuristic';
// import DevelopPerson from './DevelopPerson';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const IC_ARR_DOWN = require("../../image/arrowdownx.png");
const IC_ARR_UP = require("../../image/ArrowUpx.png");
const dadamenu3 = [
  {
    id: 1,
    txt: I18n.t("transalte_personal_information"),
  },
  {
    id: 2,
    txt: I18n.t("transalte_ฺฺAccompanying_Information"),
  },
  {
    id: 3,
    txt: I18n.t("translate_PRODUCTS"),
  },
  {
    id: 4,
    txt: "ข้อมูลบริษัท",
    txt2: I18n.t("transalte_Participants"),
  },
];
const dadamenu1 = [
  {
    id: 1,
    txt: I18n.t("transalte_personal_information"),
  },
  {
    id: 2,
    txt: I18n.t("transalte_ฺฺAccompanying_Information"),
  },
  {
    id: 3,
    txt: I18n.t("translate_PRODUCTS"),
  },
  {
    id: 4,
    txt: I18n.t("transalte_Participants"),
  },
];
const data2 = [
  { Value: "ผู้ผลิต", key: "1" },
  { Value: "ผู้ส่งออก", key: "2" },
  { Value: "บริษัทการค้าระหว่างประเทศ", key: "3" },
  { Value: "อื่นๆ", key: "4" },
];

const dataCkniti = [
  { type: "1", textname: "คนไทย" },
  { type: "2", textname: "คนต่างชาติ" },
];

const dataProdestsave = [
  {
    id: 1,
    img: require("../../image/Viewimg.png"),
  },
  {
    id: 2,
    name: "Category / ประเภทสินต้า :",
    nameProduct: "Textiles, Garments and Fashion Accessories",
  },
  {
    id: 3,
    name: "Sub-Category / ประเภทสินค้าย่อย :",
    nameProduct: "Textiles, Garments and Fashion Accessories",
  },
  {
    id: 4,
    name: "Category / ประเภทสินต้า :",
    nameProduct: "Textiles",
  },
  {
    id: 5,
    name: "Product Group / กลุ่มสินค้า :",
    nameProduct: "Textiles, Garments and Fashion Accessories",
  },
];

const dataCompany = [];

const datasearch = [];

class DevlopRegister extends React.Component {
  constructor(props) {
    const getDate = new Date();
    super(props);
    this.state = {
      // checkButton: 0,
      readPolicy: false,
      idDelectproduct: [],
      datauserdrive: [],
      checkBoxCitizenIdDelete: [],
      IDmember_cidDelete: [],
      IDmember_cid: [],
      idBusiness: 0,
      checkBoxCitizenId: [],
      checkBoxIDdeleteproduct: [],
      checkBox: [],
      idDelete: [],
      inputdisble: false,
      checkeditmenu2: false,
      openCodenumber: false,
      // month: Moment(new Date(), 'MM YYYY'),
      ddmmyyy: Moment(new Date(), "DD MM YYYY"),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), "DD MM YYYY"),
      Isative: 0,
      ///////////state get from //////////////////

      Allcontents: [
        {
          title: I18n.t("transalte_personal_information"),
        },
      ],
      Allcontents1: [
        {
          title: "ข้อมูลนิติบุคคล",
        },
      ],

      Alldataoperator: [
        {
          title: I18n.t("transalte_ฺฺAccompanying_Information"),
        },
      ],
      Alldataproduct: [
        {
          title: I18n.t("translate_PRODUCTS"),
        },
      ],
      Alldatacompany: [
        {
          title: "ข้อมูลบริษัท",
        },
      ],
      Alldatanumber: [
        {
          title: I18n.t("transalte_Participants"),
        },
      ],
      ///////เก็บข้อมูลข้อทมูลประกอบ
      checkBoxbisness: [],
      keybsiness: [],

      /////////////////////////
      ///////เก็บข้อมูลข้อมูลตลาดที่สนใจ
      dataMaket: [],
      openPopupmaket: false,
      searchTerm: "",
      searchAttribute: "ExportMarketNameTH",

      searchByTitle: false,
      ignoreCase: true,
      code: "",

      searchAttribute1: "CitizenId",
      ////////////////////////////////////////////เก็บข้อมูลรูปภาพ/////////////////////////////////////////

      FormDatatype1: [],
      FormDatatype1addnress: [],
      FormDatatype1contact: [],

      FormDataCorparat: [],
      FormDataCorparataddnress: [],
      FormDataCorparatcontact: [],

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
      ddmmyyy: Moment(new Date(), "DD MM YYYY"),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), "DD MM YYYY"),
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
          : "",
      number_naturalID:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : "",

      countryCode: "TH",
      CountryCodePhone: "+66",

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

      editProductfrom: false,

      /////////////////เก็บข้อมูลประเภทสินค้า/////////////////////////////////////////////////////////////
      dataCategoryProduct: [],
      textcateproduct: null,
      // idcateproduct: 0,

      dataCategoryProductsub: [],
      textcateproductsub: null,
      // idcateproductsub: 0,

      dataCategoryProductdis: [],
      textcateproductdis: null,
      // idcateproductdis: 0,
      checkBoxMaket: [],
      itemMaket: [],
      DataMakets: [],
      CheckBoxAllMaket: [],
      editProduct: false,

      ////////////////////////////////////////////////////////////////////////////////////////////////
      countryCode: "TH",
      CountryCodePhone: "+66",
      ////////////////////////////////////////////เก็บ ข้อมูล ที่อยู่ ////////////////////
      Dataprovices: [],
      Datadistricts: [],
      Datasubdistricts: [],
      Datagetcontry: [],
      DatagetcontryEN: [],

      getDataAmpor: [],
      getDatatumbur: [],

      ///////////////////////////////// เช็คการselect ข้อมูล ///////////
      enabled: true,
      checktest: false,
      checktest2: false,
      checkpopupaddmember: false,

      ///////////////////value get from ///////////

      fromgetcontact: [],
      fromBisiness: [],
      showDatabusiness: [],
      showDataMaket: [],
      ///////////////////////////////////

      popupparticipant: false,

      textbusinessTypeOther: null,
      dataProduct: [],

      datamember: [],
      datamemberSearch: [],
      datamemberSearch1: [],
      ckdatamemberSearch1: true,
      indexslide: 0,
      //////////////////////เก็บ satet  ที่อยู่//////////

      //////////////imguri//////////////////
      addimguri: null,
      addimagefilename: null,
      addimagetype: null,
      /////////////////////////เก็บ datacompanytype //////////
      FormDatacompany: [],
      FormDatacompanyaddress: [],
      FormDatacompanycantact: [],
    };
    this.swiperRef = (swiper) => (this.swiper = swiper);
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
    this._getDataparticipant_search();
    this._GetDatacorporat();
    this._getPersonCorporate();
    // console.log("Kthis.props.route.params.activity_code"+this.props.route.params.imgtype)
  }

  //////////////////////////////// get API ///////////////////////////////////////////////

  _getPersonCorporate = async (value) => {
    // alert('lllllll'+this.props.route.params.pid+"\t"+this.props.route.params.activity_code)
    try {
      const { authData } = this.props;
      const token = authData.token;

      const payload = { pid: this.props.route.params.pid };

      console.log("_getPersonCorporatepay" + JSON.stringify(payload));
      const response = await this.props.dispatch(getPersonCorporate(payload));

      this.setState({
        FormDatacompany: [],
        FormDatacompanyaddress: [],
        FormDatacompanycantact: [],
      });

      if (response.res_result[0] === "ไม่พบข้อมูลบริษัทที่สังกัด") {
        //  alert('ยังไม่มีนะ' + response.res_result.message+this.props.route.params.pid);
        this.setState({
          Addcompany: false,
          OpenAddcompany: false,
          FormDatacompany: [],
          FormDatacompanyaddress: [],
          FormDatacompanycantact: [],
        });
      } else {
        //  alert('มีแล้วบริษัท'+ JSON.stringify(response));
        this.setState({ Addcompany: true, OpenAddcompany: true });

        response.res_result[0].Items.map((data, index) => {
          console.log(
            "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
          );
          if (index !== 0) {
            this.state.FormDatacompany.push({
              Type: data.Type.toString(),
              Name: data.Name.toString(),
              Label: data.Label.toString(),
              Data: data.Data.toString(),
              IsRequired: data.IsRequired,
              IsArray: data.IsArray,
              MaxArray: data.MaxArray,
            });
          }
        });

        response.res_result[1].Items.map((data, index) => {
          console.log(
            "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
          );

          this.state.FormDatacompanyaddress.push({
            Type: data.Type.toString(),
            Name: data.Name.toString(),
            Label: data.Label.toString(),
            Data: data.Data.toString(),
            IsRequired: data.IsRequired,
            IsArray: data.IsArray,
            MaxArray: data.MaxArray,
          });
        });

        response.res_result[2].Items.map((data, index) => {
          console.log(
            "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
          );

          this.state.FormDatacompanycantact.push({
            Type: data.Type.toString(),
            Name: data.Name.toString(),
            Label: data.Label.toString(),
            Data: data.Data.toString(),
            IsRequired: data.IsRequired,
            IsArray: data.IsArray,
            MaxArray: data.MaxArray,
          });
        });
      }

      console.log("_getPersonCorporateNew" + JSON.stringify(response));
    } catch (error) {
      console.log("_getPersonCorporate" + error);
    }
  };

  SearchPersonCorparate = async (value) => {
    try {
      // alert("มาจาก"+value.ID)

      const { authData } = this.props;
      const token = authData.token;

      const payload = {
        results: {
          userid: value.ID,
        },
      };

      if (value.ID !== undefined && value.ID !== null && value.ID !== "") {
        // console.log('_getPersonCorporatepay' + JSON.stringify(payload));
        const response = await this.props.dispatch(
          SearchPersonCorporate(payload)
        );

        if (response.res_text === "success !") {
          this.setState({
            FormDatacompany: [],
            FormDatacompanyaddress: [],
            FormDatacompanycantact: [],
            Addcompany: true,
          });

          response.res_result[0].Items.map((data, index) => {
            console.log(
              "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
            );
            if (index !== 0) {
              this.state.FormDatacompany.push({
                Type: data.Type.toString(),
                Name: data.Name.toString(),
                Label: data.Label.toString(),
                Data: data.Data.toString(),
                IsRequired: data.IsRequired,
                IsArray: data.IsArray,
                MaxArray: data.MaxArray,
              });
            }
          });

          response.res_result[1].Items.map((data, index) => {
            console.log(
              "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
            );

            this.state.FormDatacompanyaddress.push({
              Type: data.Type.toString(),
              Name: data.Name.toString(),
              Label: data.Label.toString(),
              Data: data.Data.toString(),
              IsRequired: data.IsRequired,
              IsArray: data.IsArray,
              MaxArray: data.MaxArray,
            });
          });

          response.res_result[2].Items.map((data, index) => {
            console.log(
              "_getPersonCorporateNewมีแล้วยริษัทNew" + JSON.stringify(data)
            );

            this.state.FormDatacompanycantact.push({
              Type: data.Type.toString(),
              Name: data.Name.toString(),
              Label: data.Label.toString(),
              Data: data.Data.toString(),
              IsRequired: data.IsRequired,
              IsArray: data.IsArray,
              MaxArray: data.MaxArray,
            });
          });

          // alert (response.res_result[0].Items[1].Data)
          //   "pid": "312901",
          //   "activity_code":"12790",
          //   "member_cid": "1630500107061",
          //   "companyNameTH": "ไอบิสซิเนส คอร์ปอเรชั่น จำกัด",
          //   "companyNameEN": "IBUSINESS CORPORATION CO.,LTD.",
          //   "addressTh": "1111111111",
          //   "addressEn": "1111111111",
          //   "provinceCode": 12,
          //   "districtCode": 1206,
          //   "subDistrictCode": 120603,
          //   "postCode": "string",
          //   "countryId": 212,
          //   "tel": "string",
          //   "fax": "string",
          //   "email": "string",
          //   "website": "string",
          //   "updateByUser": "string"

          this.SaveSearchCorparateAuto({
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            member_cid: response.res_result[0].Items[1].Data,
            companyNameTH: response.res_result[0].Items[2].Data,
            companyNameEN: response.res_result[0].Items[3].Data,
            addressTh: response.res_result[1].Items[0].Data,
            addressEn: response.res_result[1].Items[1].Data,
            provinceCode: response.res_result[1].Items[2].ID.toString(),
            districtCode: response.res_result[1].Items[3].ID.toString(),
            subDistrictCode: response.res_result[1].Items[4].ID.toString(),
            postCode: response.res_result[1].Items[5].Data,
            countryId: response.res_result[1].Items[6].ID.toString(),
            tel: response.res_result[2].Items[0].Data,
            fax: response.res_result[2].Items[1].Data,
            email: response.res_result[2].Items[2].Data,
            website: response.res_result[2].Items[3].Data,
            updateByUser: response.res_result[0].Items[1].Data,
          });
        } else {
          alert(" ไม่พบข้อมูล " + value.ID + " ในระบบ");
        }
      } else {
        alert("กรุณากรอกเลขนิติบุคคล");
      }
    } catch (e) {
      console.log(e);
    }
  };

  SaveSearchCorparateAuto = async (values) => {
    try {
      const payload = {
        results: {
          pid: values.pid,
          activity_code: values.activity_code,
          member_cid: values.member_cid,
          companyNameTH: values.companyNameTH,
          companyNameEN: values.companyNameEN,
          addressTh: values.addressTh,
          addressEn: values.addressEn,
          provinceCode: values.provinceCode,
          districtCode: values.districtCode,
          subDistrictCode: values.subDistrictCode,
          postCode: values.postCode,
          countryId: values.countryId,
          tel: values.tel,
          fax: values.fax,
          email: values.email,
          website: values.website === "" ? "-" : values.website,
          updateByUser: values.updateByUser,
        },
      };

      // alert(JSON.stringify(payload))
      const response = await this.props.dispatch(
        sendAddpersonCorparate(payload)
      );

      console.log("SaveSearchCorparateAutoSucesss1" + JSON.stringify(response));

      if (response.res_result === true) {
        // this.setState({Addcompany:true,OpenAddcompany:true})

        // this._getPersonCorporate();

        alert("บันทึกสำเร็จ");
      }
    } catch (error) {}
  };

  SaveCorparate = async (value) => {
    try {
      // alert( this.props.route.params.pid +""+
      //    this.props.route.params.activity_code )

      if (
        this.state.IDcardcompany !== undefined &&
        this.state.namecompanyTH !== undefined &&
        this.state.namecompanyEN !== undefined &&
        this.state.companyAddressTH !== undefined &&
        this.state.companyAddressEN !== undefined &&
        this.state.getProvinceCodecompany !== undefined &&
        this.state.getDataAmporCodecompany !== undefined &&
        this.state.getDatatumburCodecompany !== undefined &&
        this.state.postmancodecompany !== undefined &&
        this.state.getcontryCode_membercompany !== undefined &&
        this.state.telcompany !== undefined &&
        this.state.telcompanypublic !== undefined &&
        this.state.emailcompany !== undefined &&
        this.state.websitecompany !== undefined
      ) {
        const payload = {
          results: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            member_cid: this.state.IDcardcompany,
            companyNameTH: this.state.namecompanyTH,
            companyNameEN: this.state.namecompanyEN,
            addressTh: this.state.companyAddressTH,
            addressEn: this.state.companyAddressEN,
            provinceCode: this.state.getProvinceCodecompany,
            districtCode: this.state.getDataAmporCodecompany,
            subDistrictCode: this.state.getDatatumburCodecompany,
            postCode: this.state.postmancodecompany,
            countryId: this.state.getcontryCode_membercompany,
            tel: this.state.telcompany,
            fax: this.state.telcompanypublic,
            email: this.state.emailcompany,
            website: this.state.websitecompany,
            updateByUser: this.props.route.params.member_cid,
          },
          // results:{
          //   "pid": "312901",
          //   "activity_code":"12790",
          //   "member_cid": "1630500107061",
          //   "companyNameTH": "ไอบิสซิเนส คอร์ปอเรชั่น จำกัด",
          //   "companyNameEN": "IBUSINESS CORPORATION CO.,LTD.",
          //   "addressTh": "1111111111",
          //   "addressEn": "1111111111",
          //   "provinceCode": 12,
          //   "districtCode": 1206,
          //   "subDistrictCode": 120603,
          //   "postCode": "string",
          //   "countryId": 212,
          //   "tel": "string",
          //   "fax": "string",
          //   "email": "string",
          //   "website": "string",
          //   "updateByUser": "string"
          // }
        };

        //  alert( JSON.stringify(payload) )

        const response = await this.props.dispatch(
          sendAddpersonCorparate(payload)
        );

        console.log(
          "sendAddpersonCorparate Sucesss1" + JSON.stringify(response)
        );

        if (response.res_result === true) {
          // this.setState({Addcompany:true,OpenAddcompany:true})

          this._getPersonCorporate();

          alert("บันทึกสำเร็จ");
        }
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    } catch (e) {}
  };

  showTitlename(titlenameindex) {
    if (titlenameindex === "1") {
      return "นาย";
    } else if (titlenameindex === "2") {
      return "นาง";
    } else if (titlenameindex === "3") {
      return "นาง";
    } else if (titlenameindex === "4") {
      return "นาง";
    } else if (titlenameindex === "5") {
      return "คุณ";
    } else {
      return "-";
    }
  }

  ckdataall() {
    // this.setState({sucess: true});
    if (
      this.state.dataProduct.length !== 0 &&
      this.state.showDatabusiness !== 0
    ) {
      this.setState({ sucess: true });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  }

  onSelect = (country) => {
    // setformat(country.callingCode[0]);
    this.setState({ countryCode: country.cca2 });
    this.setState({ CountryCodePhone: "+" + country.callingCode[0] });
  };
  PhoneNum(item) {
    var phone =
      this.state.CountryCodePhone +
      " " +
      item.substring(1, 3) +
      item.substring(3, 6) +
      " " +
      item.substring(6, 10);

    return phone;
  }

  Star_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + " " + this.CheckMonth(mm);
    return date.toString();
  }

  End_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = " - " + dd + " " + this.CheckMonth(mm) + " ";
    return date.toString();
  }

  End_Datet(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = " - " + dd + " " + this.CheckMonth(mm) + " " + yyyy;
    return date.toString();
  }

  //แสดงข้อมูลประเทศ ธุรกิจ

  _getDataBusiness = async (value) => {
    try {
      const { authData } = this.props;
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
      if (response.res_code === "00") {
        // this.setState({showDatabusiness: response.result[0].Items});
        // {this.state.showDatabusiness[0].Data.map(
        //   Data => {

        response.result[0].Items[0].Data.map((Dataa) => {
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

  _getDatamakets = async (value) => {
    try {
      const { authData } = this.props;
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

      if ((response.res_code = "00")) {
        // console.log('Datamakets');
        response.result.Items[0].Data.map((Datamaket) => {
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

  _getfromBusiness = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      // console.log('authData', authData);
      const response = await this.props.dispatch(getfromibusiness());

      // console.log('#####TESTQQQ');
      // console.log(response.Form[1].Items[0].Data )
      if (response.res_code === "00") {
        response.Form[1].Items[0].Data.map((Datass) => {
          // console.log('WEWEWEWEWE');
          // console.log(Datass);

          this.state.fromBisiness.push({
            key: Datass.Key.toString(),
            value: Datass.Value.toString(),
          });
        });
        // console.log('response.ActivityExportMarketId[1]');
        // console.log(
        response.ActivityExportMarketId[0].Items[0].Data.map((DataMaket) => {
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

  selectItemMaket = ({ item, index }) => {
    let { checkBoxMaket, itemMaket, CheckBoxAllMaket } = this.state;
    checkBoxMaket[index] = !checkBoxMaket[index];
    this.setState({ checkBoxMaket: checkBoxMaket });
    if (checkBoxMaket[index] === true) {
      itemMaket.push({
        activityExportMarketId: item.ActivityExportMarketId.toString(),
        ExportMarketNameTH: item.ExportMarketNameTH.toString(),
        ExportMarketNameEN: item.ExportMarketNameEN.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAllMaket: false });
      itemMaket.pop(item.id);
    }
    console.log("itemMaket", this.state.itemMaket);
  };

  selecitemDelete = ({ item, index }) => {
    let { checkBox, idDelete, DataType, CheckBoxAll } = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({ checkBox: checkBox });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.CitizenId.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAll: false });
      idDelete.pop(item.CitizenId);
    }
    // console.log(this.state.idDelete);
  };

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }

  CheckMonthFull = (month) => {
    if (month === null) {
      return "DD-MM";
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === "th" ? (Month = "มกราคม") : (Month = "January");
      } else if (month === 2) {
        return I18n.locale === "th"
          ? (Month = "กุมภาพันธ์")
          : (Month = "February");
      } else if (month === 3) {
        return I18n.locale === "th" ? (Month = "มีนาคม") : (Month = "March");
      } else if (month === 4) {
        return I18n.locale === "th" ? (Month = "เมษายน") : (Month = "April");
      } else if (month === 5) {
        return I18n.locale === "th" ? (Month = "พฤษภาคม") : (Month = "May");
      } else if (month === 6) {
        return I18n.locale === "th" ? (Month = "มิถุนายน") : (Month = "June");
      } else if (month === 7) {
        return I18n.locale === "th" ? (Month = "กรกฎาคม") : (Month = "July");
      } else if (month === 8) {
        return I18n.locale === "th" ? (Month = "สิงหาคม") : (Month = "August");
      } else if (month === 9) {
        return I18n.locale === "th"
          ? (Month = "กันยายน")
          : (Month = "September");
      } else if (month === 10) {
        return I18n.locale === "th" ? (Month = "ตุลาคม") : (Month = "October");
      } else if (month === 11) {
        return I18n.locale === "th"
          ? (Month = "พฤศจิกายน")
          : (Month = "November");
      } else if (month === 12) {
        return I18n.locale === "th"
          ? (Month = "ธันวาคม")
          : (Month = "December");
      }
    }
  };

  CheckMonth = (month) => {
    if (month === null) {
      return "DD-MM";
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === "th" ? (Month = "ม.ค.") : (Month = "JAN");
      } else if (month === 2) {
        return I18n.locale === "th" ? (Month = "ก.พ.") : (Month = "FEB");
      } else if (month === 3) {
        return I18n.locale === "th" ? (Month = "มี.ค.") : (Month = "MAR");
      } else if (month === 4) {
        return I18n.locale === "th" ? (Month = "เม.ย.") : (Month = "APR");
      } else if (month === 5) {
        return I18n.locale === "th" ? (Month = "พ.ค.") : (Month = "MAY");
      } else if (month === 6) {
        return I18n.locale === "th" ? (Month = "มิ.ย.") : (Month = "JUN");
      } else if (month === 7) {
        return I18n.locale === "th" ? (Month = "ก.ค.") : (Month = "JUL");
      } else if (month === 8) {
        return I18n.locale === "th" ? (Month = "ส.ค.") : (Month = "AUG");
      } else if (month === 9) {
        return I18n.locale === "th" ? (Month = "ก.ย.") : (Month = "SEP");
      } else if (month === 10) {
        return I18n.locale === "th" ? (Month = "ต.ค.") : (Month = "OCT");
      } else if (month === 11) {
        return I18n.locale === "th" ? (Month = "พ.ย.") : (Month = "NOV");
      } else if (month === 12) {
        return I18n.locale === "th" ? (Month = "ธ.ค.") : (Month = "DEC");
      }
    }
  };

  onSelect = (country) => {
    // setformat(country.callingCode[0]);
    this.setState({ countryCode: country.cca2 });
    this.setState({ CountryCodePhone: "+" + country.callingCode[0] });
  };

  checkPolicy = (item) => {
    if (this.state.checkPolicy === false) {
      this.setState({ checkPolicy: true });
    } else {
      this.setState({ checkPolicy: false });
    }
  };

  sucess__ = async (value) => {
    // alert(this.props.route.params.activity_code+"kkk"+this.props.route.params.pid)
    try {
      const { authData } = this.props;
      const token = authData.token;

      if (this.state.checkPolicy === true) {
        const payload = {
          results: {
            activity_code: this.props.route.params.activity_code,
            pid: this.props.route.params.pid,
            member_cid: this.props.route.params.member_cid,
          },
          token: token,
        };

        console.log("pay จบ จบ" + JSON.stringify(payload));
        const response = await this.props.dispatch(sendsucessactive(payload));

        console.log(JSON.stringify(response));

        console.log("จบ จบ" + JSON.stringify(response));
        if (response.res_result.success !== false) {
          this.props.navigation.navigate("Home", { checkScreenhome: true });
        } else {
          alert(response.res_result.message);
        }
        ////////////////
        /// จบ จบ //////
        ///////////////
      } else {
        alert("กรุณากดยอมรับเงื่อนไข");
      }
    } catch (error) {}
  };

  PhoneNum(item) {
    var phone =
      this.state.CountryCodePhone +
      " " +
      item.substring(1, 3) +
      item.substring(3, 6) +
      " " +
      item.substring(6, 10);

    return phone;
  }
  idcardh(naturalId) {
    // console.log('FGFGFG', naturalId);
    return (
      naturalId.substring(0, 1) +
      "-" +
      naturalId.substring(1, 5) +
      "-" +
      naturalId.substring(5, 10) +
      "-" +
      naturalId.substring(10, 12) +
      "-" +
      naturalId.substring(12, 13)
    );
  }
  selectbusiness = ({ item, index }) => {
    let { checkBoxbisness, showDatabusiness, CheckBoxAllbsiness } = this.state;
    checkBoxbisness[index] = !checkBoxbisness[index];
    this.setState({ checkBoxbisness: checkBoxbisness });
    if (checkBoxbisness[index] === true) {
      showDatabusiness.push({
        key: item.key.toString(),
        value: item.value.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAllbsiness: false });
      showDatabusiness.pop(item.key);
    }
    console.log("keybsiness", item);
    console.log("keybsiness", this.state.showDatabusiness);
  };

  // selectbusiness = ({item, index}) => {
  //   let {checkBoxbisness} = this.state;
  //   checkBoxbisness[index] = !checkBoxbisness[index];

  selecitemDelete = ({ item, index }) => {
    let { checkBox, idDelete, DataType, CheckBoxAll } = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({ checkBox: checkBox });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.CitizenId.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAll: false });
      idDelete.pop(item.CitizenId);
    }
    // console.log(this.state.idDelete);
  };

  selecitemProduct = ({ item, index }) => {
    let { checkBox, idDelete, DataType, CheckBoxAll } = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({ checkBox: checkBox });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idDelete.push({
        id_delete: item.ItemID.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAll: false });
      idDelete.pop(item.ItemID);
    }
    // console.log(this.state.idDelete);
  };

  // selecitemProductDelect = ({item, index}) => {
  //   console.log('Index', item.ItemID);
  //   console.log('Index', index);
  //   this.setState({idDelectproduct: index, ItemIDProductdelete: item.ItemID});
  // };

  selecitemProductDelect = ({ item, index }) => {
    let {
      checkBoxIDdeleteproduct,
      idDelectproduct,
      DataType,
      CheckBoxAllIDDelproduct,
    } = this.state;
    checkBoxIDdeleteproduct[index] = !checkBoxIDdeleteproduct[index];
    this.setState({ checkBoxIDdeleteproduct: checkBoxIDdeleteproduct });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBoxIDdeleteproduct[index] === true) {
      idDelectproduct.push({
        itemID: item.ItemID.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAllIDDelproduct: false });
      idDelectproduct.pop(item.ItemID);
    }
    console.log(this.state.idDelectproduct);
  };

  selectItemCitizenId = ({ item, index }) => {
    let {
      checkBoxCitizenId,
      IDmember_cid,
      DataType,
      CheckBoxAllIDmember_cid,
    } = this.state;
    checkBoxCitizenId[index] = !checkBoxCitizenId[index];
    this.setState({ checkBoxCitizenId: checkBoxCitizenId });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBoxCitizenId[index] === true) {
      IDmember_cid.push({
        member_cid: item.CitizenId.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAllIDmember_cid: false });
      IDmember_cid.pop(item.CitizenId);
    }
    console.log("ถ้า ติกออกถูกก็ให้ออกจากค่า idAct", this.state.IDmember_cid);
  };

  // selecitemDeletemember = ({item, index}) => {
  //   console.log('Index', item.ItemID);
  //   console.log('Index', index);
  //   this.setState({idDeletemember: item.ItemID, indexdelete: index});
  // };
  selecitemDeletemember = ({ item, index }) => {
    let {
      checkBoxCitizenIdDelete,
      IDmember_cidDelete,
      DataType,
      CheckBoxAllIDmember_cidDelete,
    } = this.state;
    checkBoxCitizenIdDelete[index] = !checkBoxCitizenIdDelete[index];
    this.setState({ checkBoxCitizenIdDelete: checkBoxCitizenIdDelete });
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBoxCitizenIdDelete[index] === true) {
      IDmember_cidDelete.push({
        itemID: item.ItemID.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({ CheckBoxAllIDmember_cidDelete: false });
      IDmember_cidDelete.pop(item.ItemID);
    }
    console.log(this.state.IDmember_cidDelete);
  };

  // selectItemCitizenId = ({item, index}) => {
  //   console.log('Index', item.CitizenId);
  //   console.log('Index', index);
  //   this.setState({idCitizenId: item.CitizenId, Itemindex: index});
  // };

  // selecitemDeletemember = ({item, index}) => {
  //   console.log('Index', item.ItemID);
  //   console.log('Index', index);
  //   this.setState({idDeletemember: item.ItemID, indexdelete: index});
  // };

  checkreload = async (value) => {
    // alert(value);
    // if(index === 1){
    //   this._getDataBusiness()
    // }
  };

  ////////////////////////////////////////setdata API ////////////////////////////////////////////////

  _GetDatacorporat = async (values) => {
    try {
      const payload = this.props.route.params.pid;

      // alert(payload);

      // const payload = this.;

      const response = await this.props.dispatch(GetdateDataCorporat(payload));

      //  alert("KKKKK"+JSON.stringify())

      if (response.res_result?.success === false) {
        // alert('Nulll');
      } else {
        // alert('Nooo');

        this.setState({ Addcompany: true });

        this.setState({ FormDataCorparat: response.res_result[0] });

        // response.res_result[1].Items.map(dataFromtype1 => {
        //   // dataFromtype1.Data.map(DataFromTitle => {

        //   console.log(dataFromtype1);
        //   this.state.FormDataCorparataddnress.push({
        //     Label: dataFromtype1.Label.toString(),
        //     Name: dataFromtype1.Name.toString(),
        //     Type: dataFromtype1.Type.toString(),
        //     IsArray: dataFromtype1.IsArray.toString(),
        //     MaxArray: dataFromtype1.MaxArray.toString(),
        //     Data: dataFromtype1.Data.toString(),
        //   });
        // });

        // response.res_result[2].Items.map(dataFromtype1 => {
        //   // dataFromtype1.Data.map(DataFromTitle => {

        //   console.log(dataFromtype1);
        //   this.state.FormDataCorparatcontact.push({
        //     Label: dataFromtype1.Label.toString(),
        //     Name: dataFromtype1.Name.toString(),
        //     Type: dataFromtype1.Type.toString(),
        //     IsArray: dataFromtype1.IsArray.toString(),
        //     MaxArray: dataFromtype1.MaxArray.toString(),
        //     Data: dataFromtype1.Data.toString(),
        //   });
        // });
      }
    } catch (error) {}
  };

  getFrom = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;

      const { FormDataCorparat } = this.state;

      // if (this.props.getUser.userDetails.res_result.type === 1) {
      console.log("FormDataCorparat", FormDataCorparat);

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

      if (response.res_code === "00") {
        response.result[0].Items.map((dataFromtype1) => {
          // dataFromtype1.Data.map(DataFromTitle => {
          console.log("dataFromtype1NWE");
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

        response.result[1].Items.map((data1Fromtype1) => {
          console.log(data1Fromtype1.Label);

          this.state.FormDatatype1addnress.push({
            Label: data1Fromtype1.Label.toString(),
            Name: data1Fromtype1.Name.toString(),
            Type: data1Fromtype1.Type.toString(),
            IsArray: data1Fromtype1.IsArray.toString(),
            MaxArray: data1Fromtype1.MaxArray.toString(),
            Data: data1Fromtype1.Data.toString(),
            DataID: data1Fromtype1.ID,
          });
        });

        response.result[2].Items.map((data1Fromtype1) => {
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

  updateProfile = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;

      if (this.props.getUser.userDetails.res_result.type === 1) {
        // alert(JSON.stringify(this.state.FormDatatype1addnress[2].DataID))
        const payload = {
          results: {
            activity_code: this.props.route.params.activity_code,
            pid: this.props.route.params.pid,
            type: this.props.getUser.userDetails.res_result.type,
            ditpMemberType: this.state.FormDatatype1[0].Data,
            ditpMeberNo: this.state.FormDatatype1[1].Data,
            taxNo: this.state.FormDatatype1[2].Data,
            companyNameTH: this.state.FormDatatype1[3].Data,
            companyNameEN: this.state.FormDatatype1[4].Data,
            addressTh:
              this.state.AddressTH === undefined
                ? this.state.FormDatatype1addnress[0].Data
                : this.state.AddressTH,
            addressEn:
              this.state.AddressEN === undefined
                ? this.state.FormDatatype1addnress[1].Data
                : this.state.AddressEN,
            provinceCode:
              this.state.getProvinceCode === undefined
                ? this.state.FormDatatype1addnress[2].DataID.toString()
                : this.state.getProvinceCode,
            districtCode:
              this.state.getDataAmporCode === undefined
                ? this.state.FormDatatype1addnress[3].DataID.toString()
                : this.state.getDataAmporCode,
            subDistrictCode:
              this.state.getDatatumburCode === undefined
                ? this.state.FormDatatype1addnress[4].DataID.toString()
                : this.state.getDatatumburCode,
            postCode:
              this.state.contact_postcode === undefined
                ? this.state.FormDatatype1addnress[5].Data
                : this.state.contact_postcode,
            countryId:
              this.state.getcontryCode === undefined
                ? this.state.FormDatatype1addnress[6].DataID.toString()
                : this.state.getcontryCode,
            cityId: "-",
            tel:
              this.state.contact_tel === undefined
                ? this.state.FormDatatype1contact[0].Data
                : this.state.contact_tel,
            fax:
              this.state.contact_fax === undefined
                ? this.state.FormDatatype1contact[1].Data
                : this.state.contact_fax,
            email:
              this.state.contact_email === undefined
                ? this.state.FormDatatype1contact[2].Data
                : this.state.contact_email,
            website:
              this.state.contact_web === undefined
                ? this.state.FormDatatype1contact[3].Data
                : this.state.contact_web,

            member_id: this.props.route.params.member_cid,

            updateByUser: this.props.route.params.member_cid,
          },
          token: token,
        };
        const response = await this.props.dispatch(updateProfileNiti(payload));
        console.log("จะแตกมั้ย");
        console.log(response);

        if (response.result.success === true) {
          this.getFrom();
          this.setState({
            editdata: false,
            FormDatatype1: [],
            FormDatatype1addnress: [],
            FormDatatype1contact: [],
          });
        }
      } else if (this.props.getUser.userDetails.res_result.type === 3) {
        // const {authData} = this.props;
        // const token = authData.token;
        // alert("type 3")

        const payload = {
          results: {
            activity_code: this.props.route.params.activity_code,
            pid: this.props.route.params.pid,
            type: this.props.getUser.userDetails.res_result.type,
            member_cid: this.props.route.params.member_cid,
            addressTh:
              this.state.AddressTH === undefined
                ? this.state.FormDatatype1addnress[0].Data
                : this.state.AddressTH,
            addressEn:
              this.state.AddressEN === undefined
                ? this.state.FormDatatype1addnress[1].Data
                : this.state.AddressEN,
            provinceCode:
              this.state.getProvinceCode === undefined
                ? this.state.FormDatatype1addnress[2].DataID.toString()
                : this.state.getProvinceCode,
            districtCode:
              this.state.getDataAmporCode === undefined
                ? this.state.FormDatatype1addnress[3].DataID.toString()
                : this.state.getDataAmporCode,
            subDistrictCode:
              this.state.getDatatumburCode === undefined
                ? this.state.FormDatatype1addnress[4].DataID.toString()
                : this.state.getDatatumburCode,
            postCode:
              this.state.contact_postcode === undefined
                ? this.state.FormDatatype1addnress[5].Data
                : this.state.contact_postcode,
            countryId:
              this.state.getcontryCode === undefined
                ? this.state.FormDatatype1addnress[6].DataID.toString()
                : this.state.getcontryCode,
            cityId: "-",
            tel:
              this.state.contact_tel === undefined
                ? this.state.FormDatatype1contact[0].Data
                : this.state.contact_tel,
            fax:
              this.state.contact_fax === undefined
                ? this.state.FormDatatype1contact[1].Data
                : this.state.contact_fax,
            email:
              this.state.contact_email === undefined
                ? this.state.FormDatatype1contact[2].Data
                : this.state.contact_email,
            website: "www.google.com",
            member_id: this.props.route.params.member_cid,

            updateByUser: this.props.route.params.member_cid,
          },
          token: token,
        };

        console.log("GGG" + payload);

        const response = await this.props.dispatch(
          updateProfileNatural(payload)
        );
        console.log("จะแตกมั้ยtype3");
        console.log(response);

        if (response.result.success === true) {
          this.getFrom();
          this.setState({
            editdata: false,
            FormDatatype1: [],
            FormDatatype1addnress: [],
            FormDatatype1contact: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////// getdata//////////////////////////////////////////////

  //ดึงข้อมูลผู้ประกอบการ
  getDataMenu2 = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      // console.log('authData', authData);
      const response = await this.props.dispatch(
        getDatarefer({
          token: payload,
        })
      );

      response.results[1].Items.map((databusiness) => {
        databusiness.Data.map((Datatypebusiness) => {
          this.state.datatypeIbusiness.push({
            key: Datatypebusiness.Key.toString(),
            Value: Datatypebusiness.Value.toString(),
          });
        });
      });
    } catch (error) {}
  };

  getDataMaket = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getChooseMaket({
          token: payload,
        })
      );

      response.results[0].Items.map((dataMakets) => {
        dataMakets.Data.map((Datamaket) => {
          this.state.dataMaket.push({
            id: Datamaket.ActivityExportMarketId.toString(),
            marketnameth: Datamaket.ExportMarketNameTH.toString(),
            marketnameen: Datamaket.ExportMarketNameEN.toString(),
          });
        });
      });
    } catch (error) {}
  };

  ///////////////////////////////  ดึงข้อมูลผุ้เข้าร่วม ///////////////////////////////////////////
  _sendDeleteDataparticipant = async (value) => {
    try {
      if (this.state.IDmember_cidDelete.length > 0) {
        const { authData } = this.props;
        const token = authData.token;
        const payload = {
          result: {
            pid: this.props.route.params.pid,
            items: this.state.IDmember_cidDelete,
            member_cid: this.props.route.params.member_cid,
          },
          token: token,
        };
        const response = await this.props.dispatch(
          sendDeleteDataparticipant(payload)
        );
        if (response.result.success === true) {
          this.setState({
            Deletemember: false,
            datamember: [],
            datamemberSearch: [],
            IDmember_cidDelete: [],
            checkBoxCitizenIdDelete: [],
            // CheckBoxAllIDmember_cidDelete :true
          });
          this._getDataparticipant();
          this._getDataparticipant_search();
        }
      } else {
        alert("กรุณาเลือกรายการที่ต้องการลบ");
      }
    } catch (error) {}
  };
  _getDataparticipant = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        result: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(getDataparticipant(payload));

      console.log("getDataparticipant");

      response.Participant[0].Items[0].Data.map((Dataparticipant) => {
        this.state.datamember.push({
          ItemID: Dataparticipant.ItemID,
          ActivityParticipantId: Dataparticipant.ActivityParticipantId,
          ParticipantNameTH: Dataparticipant.ParticipantNameTH,
          ParticipantNameEN: Dataparticipant.ParticipantNameEN,
        });
      });
    } catch (error) {}
  };

  Seacrparticipantspecific = async (value) => {
    try {
      // alert(this.state.searchTerm)

      const payload = {
        result: {
          member_cid: this.state.searchTerm,
        },
      };
      const response = await this.props.dispatch(
        getSearchparticipantsearchspecific(payload)
      );
      this.setState({
        datamemberSearch1: [],
        datamemberSearch: [],
        checkBoxCitizenId: [],
      });

      console.log("BOBOB", JSON.stringify(response));
      if (response.Search.success === true) {
        alert("ไม่พบข้อมูล");
        this.setState({ datamemberSearch1: [], ckdatamemberSearch1: false });
      } else {
        this.setState({ ckdatamemberSearch1: false });
        response.Search[0].Items[0].Data.map((DataparticipantSearch) => {
          this.state.datamemberSearch1.push({
            CitizenId: DataparticipantSearch.CitizenId,
            FullNameTH: DataparticipantSearch.FullNameTH,
            FullNameEN: DataparticipantSearch.FullNameEN,
          });
        });
      }
    } catch (error) {}
  };

  _getDataparticipant_search = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        result: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(
        getDataparticipantSearch(payload)
      );

      if ((response.res_code = "00")) {
        response.Search[0].Items[0].Data.map((DataparticipantSearch) => {
          this.state.datamemberSearch.push({
            CitizenId: DataparticipantSearch.CitizenId,
            FullNameTH: DataparticipantSearch.FullNameTH,
            FullNameEN: DataparticipantSearch.FullNameEN,
          });
        });
      }
    } catch (error) {}
  };

  _sendAddmemberparticipantSearch = async (value) => {
    try {
      console.log(
        this.props.route.params.activity_code,
        this.state.idCitizenId,
        this.props.route.params.pid
      );
      if (this.state.IDmember_cid.length > 0) {
        const { authData } = this.props;
        const token = authData.token;
        const payload = {
          result: {
            activity_code: this.props.route.params.activity_code,
            member_cidList: this.state.IDmember_cid,
            pid: this.props.route.params.pid,
          },
          token: token,
        };
        const response = await this.props.dispatch(
          sendAddmemberparticipantSearch(payload)
        );

        console.log("SeacrparticipantspecificNEW", JSON.stringify(response));

        if (response.result.success === true) {
          this.setState({
            popupparticipant: false,
            datamember: [],
            datamemberSearch: [],
            ckdatamemberSearch1: true,
            // datamemberSearch1: [],
            IDmember_cid: [],
            checkBoxCitizenId: [],
          });
          this._getDataparticipant();
          this._getDataparticipant_search();
          // this.Seacrparticipantspecific();
        } else {
          this.setState({ ckdatamemberSearch1: false }),
            alert(response.result.message);
        }
      }
    } catch (error) {}
  };

  _sendCheckAddmember = async (value) => {
    // alert(this.state.IDtype)
    try {
      if (
        this.state.IDnemberCI != undefined &&
        this.state.IDtype != undefined
      ) {
        const { authData } = this.props;
        const token = authData.token;
        const payload = {
          result: {
            type: this.state.IDtype,
            personid: this.state.IDnemberCI,
          },
          token: token,
        };
        const response = await this.props.dispatch(sendCheckAddmember(payload));

        if (response.CheckTypeStep1.success === true) {
          this.setState({
            AddPersonativity: true,
            checkpopupaddmember: false,
          });
        } else {
          // console.log(response.CheckTypeStep1);
          // this.setState({
          //   // AddPersonativity: true,
          //   // checkpopupaddmember: false,
          // });

          if (
            response.CheckTypeStep1.message.toString() ===
            "มีข้อมูลอยู่ในระบบแล้ว กรุณาค้าหารายชื่อจากปุ่มค้นหาประวัติข้อมูลผู้ติดต่อ"
          ) {
            Alert.alert(
              "",
              response.CheckTypeStep1.message.toString(),
              [
                {
                  text: I18n.t("translate_Accept"),
                  onPress: () => {
                    this.setState({
                      checkpopupaddmember: false,
                      popupparticipant: true,
                      ckdatamemberSearch1: true,
                    });
                  },

                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "",
              response.CheckTypeStep1.message.toString(),
              [
                {
                  text: I18n.t("translate_Accept"),
                  //  onPress: () =>
                  //  {
                  //    this.setState({  checkpopupaddmember: false})
                  //  },

                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }
        }
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    } catch (error) {}
  };

  _addnewmember = async (value) => {
    try {
      if (this.state.addimagefilename != null) {
        var _pid = this.props.route.params.pid.toString();
        // var itemID = values.Item.toString();

        const { authData } = this.props;
        const token = authData.token;

        this.props.dispatch({
          type: "INCREMENT",
          score: 1,
        });

        RNFetchBlob.fetch(
          "POST",
          "http://one.ditp.go.th/api/add_profile_participate",
          { token: token },
          [
            {
              name: "file",
              filename: this.state.addimagefilename,
              // type: this.state.imagetype,
              data: RNFetchBlob.wrap(
                Platform.OS === "android"
                  ? this.state.addimguri
                  : this.state.addimguri.replace("file://", "")
              ),
            },
            // {name: 'pid', data: _pid},
          ]
        ).then((response2) => {
          console.log("HHHHHHHH____222222");
          console.log(response2);
          let response = JSON.parse(response2.data);
          //  console.log(response.res_result);
          // console.log(response.res_result.linkUrl);

          this._sendDatamember({
            Imgurl: response.res_result.linkUrl,
          });
        });
        setTimeout(() => {
          this.props.dispatch({
            type: "DECREMENT",
            score: 1,
          });
        }, 1000);

        console.log("UDUDUDUUDUDUD", response);
      } else {
        alert("กรุณาเลือกรูป");
      }
    } catch (error) {
      console.log(error);
    }
  };

  _addnewmember = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;

      const payload = {
        results: {
          personid: this.state.indextype,
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
          pictureUrl: "",
          member_cid: this.state.IDnemberCI,
          titleNameId: this.state.indextitlevalue,
          firstNameTh: this.state.namemember_TH,

          lastNameTh: this.state.lastnamemember_TH,
          firstNameEn: this.state.namemember_EN,
          lastNameEn: this.state.lastnamemember_EN,

          addressTh: this.state.address_member,
          addressEn: this.state.address_member,

          provinceCode: this.state.getProvinceCode_addmember,
          districtCode: this.state.getDataAmporCode_addmember,
          subDistrictCode: this.state.getDatatumburCode_addmember,
          postCode: this.state.postmancode,

          countryId: this.state.getcontryCode_member,
          cityId: "3328",
          tel: this.state.phone_member,
          telCountryCode: "66",
          email: this.state.email_member,
          careerTH: this.state.major,
          careerEN: this.state.major,
          companyTH: this.state.centername,
          companyEN: this.state.centername,

          positonTH: this.state.positionname,
          positionEN: this.state.positionname,

          member_id: this.props.route.params.member_cid,
        },
        token: token,
      };

      const response = await this.props.dispatch(Sendaddnewmember(payload));

      console.log("SSSSSSSSSSSS");

      console.log(response);

      if (response.success === true) {
        this.setState({ AddPersonativity: false, datamember: [] });
        this._getDataparticipant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  selecitemcheckdata = ({ item, index }) => {
    console.log("Type", item.type);
    console.log("Index", index);
    this.setState({ IDtype: item.type, indextype: index });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  _geDataProduct = async (value) => {
    console.log("this.props.route.params.activity_code");

    console.log(
      this.props.route.params.activity_code,
      this.props.route.params.pid
    );

    try {
      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        results: {
          activity_code: this.props.route.params.activity_code,
          pid: this.props.route.params.pid,
        },
        token: token,
      };
      const response = await this.props.dispatch(geDataProducts(payload));
      console.log("ถถถถถถถ");
      console.log(response.product[0].Items[0].Data[0]);

      if ((response.res_code = "00")) {
        response.product[0].Items[0].Data.map((Dataproducts, index) => {
          console.log("PRO111111111");

          console.log(Dataproducts.ProductPictures[index]);
          this.state.dataProduct.push({
            ItemID: Dataproducts.ItemID.toString(),
            ProductCategory: Dataproducts.ProductCategory.toString(),
            ProductSubCategory: Dataproducts.ProductSubCategory.toString(),
            ProductGroup:
              Dataproducts.ProductGroups[0] === undefined
                ? ""
                : Dataproducts.ProductGroups[0].ProductGroupName.toString(),
            ProductBrandNameTh: Dataproducts.ProductBrandNameTh.toString(),
            ProductBrandNameEn: Dataproducts.ProductBrandNameEn.toString(),
            ProductDescriptionTh: Dataproducts.ProductDescriptionTh.toString(),
            ProductDescriptionEn: Dataproducts.ProductDescriptionEn.toString(),
            ProductPictures:
              Dataproducts.ProductPictures[0] === undefined
                ? ""
                : Dataproducts.ProductPictures[0].ImageUrl.toString(),
            ProductSubCategoryID: Dataproducts.ProductSubCategoryID.toString(),
            ProductCategoryID: Dataproducts.ProductCategoryID.toString(),
            ProductGroupID:
              Dataproducts.ProductGroups[0] === undefined
                ? ""
                : Dataproducts.ProductGroups[0].ProductGroupID.toString(),
          });
        });
      }
    } catch (error) {}
  };

  //ประเภทสินค้า

  _getfromProduct = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        token: token,
      };
      const response = await this.props.dispatch(getfromProduct(payload));

      console.log("response.Form" + JSON.stringify(response.Form[0]));

      response.Form[0].Items[0].Data.map((DataProduct) => {
        this.state.dataCategoryProduct.push({
          idcategoryproduct: DataProduct.ProductCategoryId.toString(),
          namecategoryproductTH: DataProduct.ProductCategoryNameTH.toString(),
          namecategoryproductEN: DataProduct.ProductCategoryNameEN.toString(),
          // ProductType: DataProduct.ProductType.toString(),
        });
      });
    } catch (error) {}
  };

  getCategoryProductsub = async (value) => {
    try {
      // alert(this.state.idcateproduct)
      // console("this.state.idcateproduct")
      console.log(this.props.authData.token);
      // console.log(this.state.idcateproduct,this.props.route.params.pid,this.props.route.params.activity_code,payload)

      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductsub({
          result: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            ProductSubCategoryId:
              this.state.idcateproduct === undefined
                ? this.state.idcateproduct
                : this.state.idcateproduct,
          },
          token: payload,
        })
      );

      response.ProductSub[0].Items[0].Data.map((datacatesub) => {
        this.state.dataCategoryProductsub.push({
          idProsub: datacatesub.ProductSubCategoryId.toString(),
          nameThsub: datacatesub.ProductSubCategoryNameTH.toString(),
          nameENsub: datacatesub.ProductSubCategoryNameEN.toString(),
        });
      });
      // console.log(response.results[0])
    } catch (error) {}
  };

  getCategoryProductdis = async (value) => {
    try {
      // console.log('idcateproductsub', this.state.idcateproductsub);
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getCateProductdis({
          result: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            ProducGroupstCategoryId:
              this.state.idcateproductsub === undefined
                ? this.state.idcateproductsub
                : this.state.idcateproductsub,
          },
          token: payload,
        })
      );

      response.ProductGroups[0].Items[0].Data.map((datacatesub) => {
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
  getdata_province = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdataprovince({
          token: payload,
        })
      );

      if (response.res_code === "00") {
        response.titleCode[0].Items.map((dataprovice) => {
          dataprovice.Data.map((Data_provices) => {
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
  getdata_district = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatadistrict({
          results: {
            province: "",
          },
          token: payload,
        })
      );

      if ((response.res_code = "00")) {
        response.titleCode[0].Items.map((datadistrict) => {
          datadistrict.Data.map((Data_datadistrict) => {
            // console.log(Data_datadistrict);
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
  getdata_subdistrict = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(getdatasubdistrict());

      if (response.res_code === "00") {
        response.titleCode[0].Items.map((datasubdistrict) => {
          datasubdistrict.Data.map((Data_datasubdistrict) => {
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

  // ดึงประเทศ City

  getdata_contry = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatacontryCity({
          token: payload,
        })
      );

      if (response.res_code === "00") {
        response.titleCode[0].Items.map((datacontry) => {
          datacontry.Data.map((Data_contry) => {
            this.state.DatagetcontryEN.push({
              CountryId: Data_contry.CountryId,
              CityId: Data_contry.CityId,
              CityNameTh: Data_contry.CityNameTh,
              CityNameEn: Data_contry.CityNameEn,
            });
          });
        });
      }
    } catch (error) {}
  };

  // ดึงประเทศ

  getdata_contry = async (value) => {
    try {
      const { authData } = this.props;
      const payload = authData.token;
      const response = await this.props.dispatch(
        getdatacontry({
          token: payload,
        })
      );

      if (response.res_code === "00") {
        response.titleCode[0].Items.map((datacontry) => {
          datacontry.Data.map((Data_contry) => {
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

  checkProvince = (index) => {
    //
    if (this.state.checktest === false) {
      this.checkdistrict(index);
      this.setState({ checktest: true });
    }
    var res = this.state.Dataprovices.find(
      ({ ProvinceCode }) => ProvinceCode === index
    );

    // if (res.ProvinceNameTh === undefined) {
    //   return '';
    // } else {
    //   if (I18n.locale == 'th') {
    //     return res.ProvinceNameTh;
    //   } else {
    //     return res.ProvinceNameEn;
    //   }
    // }
    // if (index === '11') {
    return (res = "");

    // }
  };

  //เช็คอำเภอ
  checkdistrict = (index) => {
    var selectedAmpor = this.state.Datadistricts.filter(
      (Ampor) => Ampor.ProvinceCode == index
    );

    this.setState({ getDataAmpor: selectedAmpor });
  };

  //เช็คตำบล

  checksubdistrict = (index) => {
    // alert(index)
    var selectedtumbur = this.state.Datasubdistricts.filter(
      (tumbur) => tumbur.DistrictCode == index
    );
    console.log("ANUCHHHHHHgetDatatumbur");
    console.log(selectedtumbur);

    this.setState({ getDatatumbur: selectedtumbur });
  };

  checkdistrictshow = (index) => {
    if (this.state.checktest2 === false) {
      this.checksubdistrict(index);
      this.setState({ checktest2: true });
    }
    var res = this.state.Datadistricts.find(
      ({ DistrictCode }) => DistrictCode === index
    );

    return (res = "");
    // if (res.DistrictNameTh === undefined) {
    //   return '-';

    // } else {
    //   if (I18n.locale == 'th') {
    //     return res.DistrictNameTh;
    //   } else {
    //     return res.DistrictNameEn;
    //   }

    // }
  };

  checksubdistrictshow = (index) => {
    var res = this.state.Datasubdistricts.find(
      ({ SubDistrictCode }) => SubDistrictCode === index
    );

    // return  res = 'ตำบล';
    // ข้อมูล ไม่มา
    // if (res.SubDistrictNameTh === undefined) {
    //   return '-';
    // } else {
    //   if (I18n.locale == 'th') {
    //     return res.SubDistrictNameTh;
    //   } else {
    //     return res.SubDistrictNameEn;
    //   }
    // }
    return "-";
  };
  checkContry = (index) => {
    var res1 = this.state.Datagetcontry.find(
      ({ CountryId }) => CountryId === index
    );

    // if (res1.CountryNameTh != undefined) {
    //   if (I18n.locale == 'th') {
    //     return res1.CountryNameTh;
    //   } else {
    //     return res1.CountryNameEn;
    //   }
    // } else {
    //   return '-';
    // }
    return "-";
  };

  imageGalleryLaunch = () => {
    const options2 = {
      title: "Select video",
      mediaType: "photo",
      path: "photo",
      quality: 0.1,
    };
    launchImageLibrary(options2, (response) => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;

        if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
        }
        if (!responses.fileName) {
          responses.fileName = path.split("/").pop();
        }

        this.setState({
          imageUrl: responses.uri,
          imagefilename: responses.fileName,
          imagetype: responses.type,
        });
      }
    });
  };
  imageGalleryLaunchedit = () => {
    const options2 = {
      title: "Select video",
      mediaType: "photo",
      path: "photo",
      quality: 0.1,
    };
    launchImageLibrary(options2, (response) => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;

        if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
        }
        if (!responses.fileName) {
          responses.fileName = path.split("/").pop();
        }

        this.setState({
          imageUrledit: responses.uri,
          imagefilenameedit: responses.fileName,
          imagetypeedit: responses.type,
        });
      }
    });
  };

  imageGalleryLaunchaddmember = () => {
    const options2 = {
      title: "Select video",
      mediaType: "photo",
      path: "photo",
      quality: 0.1,
    };
    launchImageLibrary(options2, (response) => {
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;

        if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
        }
        if (!responses.fileName) {
          responses.fileName = path.split("/").pop();
        }

        this.setState({
          addimguri: responses.uri,
          addimagefilename: responses.fileName,
          addimagetype: responses.type,
        });
      }
    });
  };

  _sendDatabusiness = async (value) => {
    try {
      console.log("FHFHFHF", this.state.showDatabusiness.length);

      const { authData } = this.props;
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

      if ((response.res_code = "00")) {
        this.setState({ checkeditmenu2: false, showDatabusiness: [] });
        this._getDataBusiness();
      }
    } catch (error) {}
  };

  //บันทึกตลาดส่งออก
  _sendDataMaket = async (value) => {
    // alert('บันทึกตลาดส่งออก')
    try {
      console.log("LLLLL", this.state.itemMaket);
      const { authData } = this.props;
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

      if ((response.res_code = "00")) {
        this.setState({ openPopupmaket: false, itemMaket: [] });
        this._getDatamakets();
      }
    } catch (error) {}
  }; //ลบตลาดส่งออกที่สนใจ
  _deleteDatabusiness = async (value) => {
    try {
      const { authData } = this.props;
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
      if ((response.res_code = "00")) {
        this.setState({ itemMaket: [], checkBoxMaket: [] });
        this._getDatamakets();
      }
    } catch (error) {}
  };

  //เพิ่มข้อมูลข้อมูลสินค้า
  _sendAddProduct = async (value) => {
    try {
      console.log("HFIFHHFFFHF");
      console.log(
        this.props.route.params.pid,
        this.props.route.params.activity_code
      );

      const { authData } = this.props;
      const token = authData.token;

      if (
        this.state.idcateproduct != undefined &&
        this.state.imagefilename != undefined &&
        this.state.productBrandnameTH_text != undefined &&
        this.state.productDescritionTH != undefined &&
        this.state.productDescritionEN != undefined
      ) {
        const payload = {
          result: {
            pid: this.props.route.params.pid,
            activity_code: this.props.route.params.activity_code,
            productCategoryID: this.state.idcateproduct,
            productSubCategoryID:
              this.state.idcateproductsub == undefined
                ? 0
                : this.state.idcateproductsub,
            productGroupID:
              this.state.idcateproductdis == undefined
                ? 0
                : this.state.idcateproductdis,
            productBrandTh:
              this.state.productBrandnameTH_text == undefined
                ? "-"
                : this.state.productBrandnameTH_text,
            productBrandNameEn:
              this.state.productBrandnameEN == undefined
                ? "-"
                : this.state.productBrandnameEN,
            productDescriptionTh:
              this.state.productDescritionTH == undefined
                ? "-"
                : this.state.productDescritionTH,
            productDescriptionEn:
              this.state.productDescritionEN == undefined
                ? "-"
                : this.state.productDescritionEN,
            imageBase64String: "",

            member_id: this.props.route.params.member_cid,
          },
          token: token,
        };

        const response = await this.props.dispatch(SendAddprodutcs(payload));

        if ((response.res_code = "00")) {
          console.log("debudADD");
          console.log(response);
          this._sendItem_geturlimg({ Item: response.result.itemID });
        }
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    } catch (error) {}
  };

  _sendDeleteidProduct = async (value) => {
    try {
      const { authData } = this.props;
      const token = authData.token;
      if (this.state.idDelectproduct != null) {
        const payload = {
          result: {
            pid: this.props.route.params.pid,
            items: this.state.idDelectproduct,
            userID: this.props.route.params.member_cid,
          },
          token: token,
        };
        const response = await this.props.dispatch(
          sendDeleteidProduct(payload)
        );

        if ((response.result.success = true)) {
          this.setState({
            DeleteProduct: false,
            dataProduct: [],
            checkBoxIDdeleteproduct: [],
          });
          this._geDataProduct();
        }
      } else {
        alert("กรุณาเลือกสินค้าที่ต้องการลบ");
      }
    } catch (error) {}
  };

  _sendItem_geturlimg = async (values) => {
    // console.log(
    // this.state.imageUrl.replace('file://', ''),values.Item,this.props.route.params.pid)
    // add_product_participate

    var _pid = this.props.route.params.pid.toString();
    var itemID = values.Item.toString();

    try {
      const { authData } = this.props;
      const token = authData.token;

      this.props.dispatch({
        type: "INCREMENT",
        score: 1,
      });

      RNFetchBlob.fetch(
        "POST",
        "http://one.ditp.go.th/api/add_product_participate",
        { token: token },
        [
          {
            name: "data",
            filename: this.state.imagefilename,
            // type: this.state.imagetype,
            data: RNFetchBlob.wrap(
              Platform.OS === "android"
                ? this.state.imageUrl
                : this.state.imageUrl.replace("file://", "")
            ),
          },
          { name: "pid", data: _pid },
          { name: "product", data: itemID },
        ]
      ).then((response2) => {
        console.log("HHHHHHHH____");
        // console.log(response2);
        let response = JSON.parse(response2.data);
        console.log(response.result.linkUrl);

        this._sendupdateDataProduct({
          Imgurl: response.result.linkUrl,
          itemID: itemID,
        });
      });
      setTimeout(() => {
        this.props.dispatch({
          type: "DECREMENT",
          score: 1,
        });
      }, 1000);

      console.log("UDUDUDUUDUDUD", response);
    } catch (error) {
      // console.log(error)
    }
  };

  _sendupdateDataProduct = async (values) => {
    try {
      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        results: {
          item: values.itemID,
          activity_code: this.props.route.params.activity_code,
          productCategoryID: this.state.idcateproduct,
          productSubCategoryID: this.state.idcateproductsub,
          productGroupID: this.state.idcateproductdis,
          productBrandNameTh: this.state.productBrandnameTH,
          productBrandNameEn: this.state.productBrandnameEN,
          productDescriptionTh: this.state.productDescritionTH,
          productDescriptionEn: this.state.productDescritionEN,
          imageBase64String: values.Imgurl,
          member_id: this.props.route.params.member_cid,
        },
        token: token,
      };

      const response = await this.props.dispatch(
        SendupdateDataProduct(payload)
      );

      if ((response.res_code = "00")) {
        console.log("response.result.itemID");
        console.log(response.result);
        // this._sendItem_geturlimg({Item:response.result.itemID})
        this.setState({ AddProduct: false, dataProduct: [] });
        this._geDataProduct();
      }
    } catch (error) {}
  };

  _sendItem_editurlimg = async (values) => {
    // alert(this.state.imagefilenameedit);

    var _pid = this.props.route.params.pid.toString();
    var itemID = this.state.itemID.toString();

    console.log("EditFUCK" + _pid + "" + itemID);

    try {
      if (this.state.imagefilenameedit != null) {
        const { authData } = this.props;
        const token = authData.token;

        this.props.dispatch({
          type: "INCREMENT",
          score: 1,
        });

        RNFetchBlob.fetch(
          "POST",
          "http://one.ditp.go.th/api/add_product_participate",
          { token: token },
          [
            {
              name: "data",
              filename: this.state.imagefilenameedit,
              // type: this.state.imagetype,
              data: RNFetchBlob.wrap(
                Platform.OS === "android"
                  ? this.state.imageUrledit
                  : this.state.imageUrledit.replace("file://", "")
              ),
            },
            { name: "pid", data: _pid },
            { name: "product", data: itemID },
          ]
        ).then((response2) => {
          console.log("HHHHHHHH____");
          // console.log(response2);
          let response = JSON.parse(response2.data);
          console.log(response.result.linkUrl);

          // this._sendupdateDataProduct({
          //   Imgurl: response.result.linkUrl,
          //   itemID: itemID,
          // });
          this._sendEditProduct({
            Imgurl: response.result.linkUrl,
          });
        });
        setTimeout(() => {
          this.props.dispatch({
            type: "DECREMENT",
            score: 1,
          });
        }, 1000);
      } else {
        this._sendEditProduct({
          Imgurl: this.state.ProductPictures_popup,
        });
      }

      console.log("UDUDUDUUDUDUD", response);
    } catch (error) {
      // console.log(error)
    }
  };

  _sendEditProduct = async (value) => {
    try {
      // alert('FUCK');

      const { authData } = this.props;
      const token = authData.token;
      const payload = {
        results: {
          item: this.state.itemID,
          activity_code: this.props.route.params.activity_code,
          productCategoryID:
            this.state.idcateproduct === 0
              ? this.state.ProductCategoryID_popup
              : this.state.idcateproduct,
          productSubCategoryID:
            this.state.idcateproductsub === 0
              ? this.state.ProductSubCategoryID_popup
              : this.state.idcateproductsub,
          productGroupID:
            this.state.idcateproductdis === 0
              ? this.state.ProducGroupstCategoryId
              : this.state.idcateproductdis,
          productBrandNameTh:
            this.state.productBrandnameTH_text_edit === undefined
              ? this.state.ProductBrandNameTh_popup
              : this.state.productBrandnameTH_text_edit,

          productBrandNameEn:
            this.state.productBrandnameEN_edit === undefined
              ? this.state.ProductBrandNameEn_popup
              : this.state.productBrandnameEN_edit,

          productDescriptionTh:
            this.state.productDescritionTH_edit === undefined
              ? this.state.ProductDescriptionTh_popup
              : this.state.productDescritionTH_edit,
          productDescriptionEn:
            this.state.productDescritionEN_edit === undefined
              ? this.state.ProductDescriptionEn_popup
              : this.state.productDescritionEN_edit,
          imageBase64String: "",
          member_id: this.props.route.params.member_cid,
        },
        token: token,
      };

      console.log(JSON.stringify(payload.results));

      const response = await this.props.dispatch(
        SendupdateDataProductedit(payload)
      );

      if ((response.res_code = "00")) {
        console.log("แตก111");
        console.log(response.result);

        // this._sendItem_geturlimg({Item:response.result.itemID})
        this.setState({
          editProductfrom: false,
          AddProduct: false,
          dataProduct: [],
        });
        this._geDataProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////// z List components ///////////////////////////////////////////////

  MenuRegister = ({ item, index }) => {
    return (
      <LinearGradient
        style={{
          borderRadius: 8,
          flex: 1,
          borderWidth: 1,
          marginVertical: 4,
          height: 34,
          justifyContent: "center",
          borderColor: "#2d6dc4",
          marginLeft: index % 2 != 0 ? 0 : 5,
          marginRight: 5,
        }}
        colors={
          this.state.Isative == index
            ? ["#73a6eb", "#8182da"]
            : ["#FFFFFF", "#FFFFFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "center" }}
          onPress={() => {
            this.setState({ Isative: index });
            // this.checkreload(index)
          }}
        >
          {this.state.Isative == index ? (
            <Text
              style={{ textAlign: "center", fontSize: 18, color: "#FFFFFF" }}
            >
              {item.txt}
            </Text>
          ) : (
            <Text
              style={{ textAlign: "center", fontSize: 18, color: "#2d6dc4" }}
            >
              {item.txt}
            </Text>
          )}
          {index === 0 && (
            <View
              style={{
                position: "absolute",
                right: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon2
                name="circle"
                size={20}
                style={{ color: "#FFF", position: "absolute", top: 0, left: 0 }}
              />
              <Icon2
                name="check-circle"
                size={20}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "#39b54a",
                }}
              />
            </View>
          )}
          {index === 1 && (
            <View
              style={{
                position: "absolute",
                right: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.showDatabusiness.length == 0 &&
              this.state.itemMaket.length == 0 ? (
                <View>
                  <Icon2
                    name="circle"
                    size={20}
                    style={{
                      color: "#FFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  <Icon4
                    name="exclamation-circle"
                    size={20}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "#ffaf47",
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Icon2
                    name="circle"
                    size={20}
                    style={{
                      color: "#FFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  <Icon2
                    name="check-circle"
                    size={20}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "#39b54a",
                    }}
                  />
                </View>
              )}
            </View>
          )}
          {index === 2 && (
            <View
              style={{
                position: "absolute",
                right: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.dataProduct.length == 0 ? (
                <View>
                  <Icon2
                    name="circle"
                    size={20}
                    style={{
                      color: "#FFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  <Icon4
                    name="exclamation-circle"
                    size={20}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "#ffaf47",
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Icon2
                    name="circle"
                    size={20}
                    style={{
                      color: "#FFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  <Icon2
                    name="check-circle"
                    size={20}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "#39b54a",
                    }}
                  />
                </View>
              )}
            </View>
          )}
          {index === 3 && (
            <View
              style={{
                position: "absolute",
                right: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.props.getUser.userDetails.res_result.type != 3 ? (
                <View>
                  {this.state.datamember.length == 0 ? (
                    <View>
                      <Icon2
                        name="circle"
                        size={20}
                        style={{
                          color: "#FFF",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Icon4
                        name="exclamation-circle"
                        size={20}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#ffaf47",
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Icon2
                        name="circle"
                        size={20}
                        style={{
                          color: "#FFF",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Icon2
                        name="check-circle"
                        size={20}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#39b54a",
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  {this.state.Addcompany === false ? (
                    <View>
                      <Icon2
                        name="circle"
                        size={20}
                        style={{
                          color: "#FFF",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Icon4
                        name="exclamation-circle"
                        size={20}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#ffaf47",
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Icon2
                        name="circle"
                        size={20}
                        style={{
                          color: "#FFF",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Icon2
                        name="check-circle"
                        size={20}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#39b54a",
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  Listproduct = ({ item, index }) => {
    return (
      <View
        style={{
          // height:150,
          // borderWidth:1,
          flex: 1,
          flexDirection: "row",
          marginHorizontal: 20,
          marginTop: 10,
          backgroundColor: "#FFF",
          shadowColor: "#f8f9fb",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      >
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: "#73838f",
            fontWeight: "normal",
            fontFamily: "PSL Kittithada Pro",

            // height: 30,
            // paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: "#FFFFFF",
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
              source={require("../../image/rrr.png")}
            />
          }
          title={
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  editProduct: true,
                  itemID: item.ItemID,

                  ProductBrandNameEn_popup: item.ProductBrandNameEn,
                  ProductBrandNameTh_popup: item.ProductBrandNameTh,
                  ProductCategory_popup: item.ProductCategory,
                  ProductDescriptionEn_popup: item.ProductDescriptionEn,
                  ProductDescriptionTh_popup: item.ProductDescriptionTh,
                  ProductGroup_popup: item.ProductGroup,
                  ProductPictures_popup: item.ProductPictures,
                  ProductSubCategory_popup: item.ProductSubCategory,

                  ProductGroupID_popup: item.ProductGroupID,
                  ProductSubCategoryID_popup: item.ProductSubCategoryID,
                  ProductCategoryID_popup: item.ProductCategoryID,
                });
              }}
              style={{
                marginHorizontal: 15,

                width: "80%",
              }}
            >
              <Text style={{ color: "#163c70", fontSize: 20 }}>
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: "#73838f", fontSize: 20 }}
              >
                {item.ProductCategory}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: "#163c70", fontSize: 20 }}
              >
                {item.ProductSubCategory}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: "#73838f", fontSize: 20 }}
              >
                {item.ProductGroup}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: "#73838f", fontSize: 20 }}
              >
                {item.ProductBrandNameTh}
              </Text>
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          // checked={this.state.checkBox[index]}
          checked={false}
          // disabled={true}
          onPress={() => {
            // this.selecitemProduct({item: item, index: index});
          }}
        />

        <TouchableOpacity
          onPress={() => {
            // alert('Edit');

            this.setState({
              editProductfrom: true,
              AddProduct: true,

              itemID: item.ItemID,

              ProductBrandNameEn_popup: item.ProductBrandNameEn,
              ProductBrandNameTh_popup: item.ProductBrandNameTh,
              ProductCategory_popup: item.ProductCategory,
              ProductDescriptionEn_popup: item.ProductDescriptionEn,
              ProductDescriptionTh_popup: item.ProductDescriptionTh,
              ProductGroup_popup: item.ProductGroup,
              ProductPictures_popup: item.ProductPictures,
              ProductSubCategory_popup: item.ProductSubCategory,

              ProductGroupID_popup: item.ProductGroupID,
              ProductSubCategoryID_popup: item.ProductSubCategoryID,
              ProductCategoryID_popup: item.ProductCategoryID,
            });
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            // alignItems: 'flex-end',
            // width: 48,
            left: -20,
          }}
        >
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require("../../image/penlist.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };
  ListproductDelete = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginHorizontal: 20,
          marginTop: 10,
          backgroundColor: "#FFF",
          shadowColor: "#f8f9fb",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      >
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: "#73838f",
            fontWeight: "normal",
            fontFamily: "PSL Kittithada Pro",

            // height: 30,
            // paddingHorizontal: 10,
            // marginHorizontal: 20,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: "#999999",
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
              source={require("../../image/rrrred.png")}
            />
          }
          title={
            <View
              style={{
                marginHorizontal: 15,
              }}
            >
              <Text style={{ color: "#163c70", fontSize: 20 }}>
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: "#73838f", fontSize: 20 }}
              >
                {item.ProductCategory}
              </Text>
              <Text style={{ color: "#163c70", fontSize: 20 }}>
                {item.ProductSubCategory}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: "#73838f", fontSize: 20 }}
              >
                {item.ProductGroup}
              </Text>
            </View>
          }
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          checked={this.state.checkBoxIDdeleteproduct[index]}
          // disabled={true}
          onPress={() => {
            this.selecitemProductDelect({ item: item, index: index });
          }}
        />
      </View>
    );
  };

  ListMenu2 = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,

          marginVertical: 5,
          flexDirection: index <= 1 ? "row" : "column",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.selectbusiness({ item: item, index: index });
          }}
          style={{
            borderWidth: 1,
            borderColor: "#2d6dc4",
            marginHorizontal: 30,
            height: 35,
            borderRadius: 4,
            backgroundColor:
              this.state.checkBoxbisness[index] === true
                ? "#2d6dc4"
                : "#FFFFFF",
            justifyContent: "center",
            width: index <= 1 ? "50%" : "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color:
                this.state.checkBoxbisness[index] === true
                  ? "#FFFFFF"
                  : "#2d6dc4",
              fontSize: 18,
            }}
          >
            {item.Value}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  ListDatamemberCheckout = ({ item, index }) => {
    return (
      <View>
        {index !== 1 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
              </Text>
            </View>
          </View>
        )}
        {index === 1 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {/* {item.Data} */}
                {this.showTitlename(item.Data)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  ListDataNitiCheckout = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#FFF",
            flexDirection: "row",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "right",
              }}
            >
              {item.Label} :{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#2d6dc4",
              }}
            >
              {" "}
              {item.Data}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  ListDataAddnressCheckout = ({ item, index }) => {
    return (
      <View>
        {index === 0 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
              </Text>
            </View>
          </View>
        )}
        {index === 1 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
              </Text>
            </View>
          </View>
        )}
        {index === 2 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
                {/* {this.checkProvince(item.Data)} */}
              </Text>
            </View>
          </View>
        )}
        {index === 3 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
                {/* {this.checkdistrictshow(item.Data)} */}
              </Text>
            </View>
          </View>
        )}
        {index === 4 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
                {/* {this.checksubdistrictshow(item.Data)} */}
              </Text>
            </View>
          </View>
        )}
        {index === 5 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
              </Text>
            </View>
          </View>
        )}
        {index === 6 && (
          <View
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",
                  textAlign: "right",
                }}
              >
                {item.Label} :{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#2d6dc4",
                }}
              >
                {" "}
                {item.Data}
                {/* {this.checkContry(item.Data)} */}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  ListDataContactCheckout = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#FFF",
            flexDirection: "row",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "right",
              }}
            >
              {item.Label} :{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#2d6dc4",
              }}
            >
              {" "}
              {item.Data === "" ? "-" : item.Data}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  Listmember = ({ item, index }) => {
    return (
      <View style={{ height: 100, flexDirection: "column", marginTop: -20 }}>
        <ImageBackground
          source={require("../../image/bgregister.png")}
          style={{
            flex: 1,

            justifyContent: "center",
            // marginVertical:2,
            // borderWidth:1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 30,
              // marginTop: 25,
              // borderWidth:1
            }}
          >
            <Text
              style={{ color: "#73838f", fontSize: 19, marginHorizontal: 10 }}
            >
              {/* {index+1}{'. '}  */}
              {I18n.locale == "th"
                ? item.ParticipantNameTH
                : item.ParticipantNameEN}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  ListmemberDelete = ({ item, index }) => {
    return (
      <View style={{ height: 100, flexDirection: "column", marginTop: -20 }}>
        <ImageBackground
          source={require("../../image/bgregister.png")}
          style={styles.image}
        >
          <View
            style={{
              height: 50,
              flexDirection: "row",
              marginHorizontal: 30,
              // marginTop: 25,
              // borderWidth:1
            }}
          >
            <CheckBox
              textStyle={{
                fontSize: 20,
                color: "#73838f",
                fontWeight: "normal",
                fontFamily: "PSL Kittithada Pro",

                height: 30,
                paddingHorizontal: 10,
                marginHorizontal: 20,
              }}
              uncheckedIcon={
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderWidth: 0.5,
                    width: 18,
                    height: 18,
                    borderColor: "#999999",
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
                  source={require("../../image/rrrred.png")}
                />
              }
              title={
                I18n.locale == "th"
                  ? item.ParticipantNameTH
                  : item.ParticipantNameEN
              }
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              checked={
                this.state.checkBoxCitizenIdDelete[index]

                // this.state.indexdelete === index
              }
              // disabled={true}
              onPress={() => {
                this.selecitemDeletemember({ item: item, index: index });
              }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };

  ListItemProduct = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          // alignItems: 'center',
          flexDirection: "row",
        }}
      >
        {/* <View
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
              source={item.ProductPictures}
            />
          </View> */}

        <View
          style={{
            width: "100%",
          }}
        >
          <Image
            resizeMode={"contain"}
            style={{
              width: "96%",
              height: 170,

              marginHorizontal: 5,
            }}
            source={{ uri: item.ProductPictures }}
          />
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"Category / ประเภทสินค้า :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductCategory}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"Sub-Category / ประเภทสินค้าย่อย :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductSubCategory}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"Product Group / กลุ่มสินค้า :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductGroup}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"ชื่อแบรนด์ :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductBrandNameTh === "" ? "-" : item.ProductBrandNameTh}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"รายละเอียดสินค้า :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductDescriptionTh}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"Product Brand Name :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductBrandNameEn}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#eaf0f9",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {"Product Description :"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",
                textAlign: "center",
              }}
            >
              {item.ProductDescriptionEn}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  ListmeNiticheck = ({ item, index }) => {
    return (
      <View
        style={{
          height: 60,
          flexDirection: "row",
          marginHorizontal: 30,
          // marginTop: 25,
          // borderWidth:1
        }}
      >
        <CheckBox
          textStyle={{
            fontSize: 20,
            color: "#73838f",
            fontWeight: "normal",
            fontFamily: "PSL Kittithada Pro",

            height: 30,
            paddingHorizontal: 10,
            marginHorizontal: 20,
          }}
          uncheckedIcon={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: "#999999",
                borderRadius: 12,
              }}
            />
          }
          checkedIcon={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: "#999999",
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: "#39b54a",
                  width: 10,
                  height: 10,
                  borderRadius: 12,
                  top: 3.6,
                  left: 3.3,
                }}
              />
            </View>
          }
          title={item.textname}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          checked={this.state.indextype === index}
          // disabled={true}
          onPress={() => {
            this.selecitemcheckdata({ item: item, index: index });
          }}
        />
      </View>
    );
  };

  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลส่วนตัว)
  FormData1 = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: "#f9fafc",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        {/* {index === 0 && ( */}
        <ImageBackground
          source={
            this.state.checkeditmenu0 === false
              ? require("../../image/bgregister.png")
              : require("../../image/bglock.png")
          }
          resizeMode={"stretch"}
          imageStyle={{ width: "100%", height: 125 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ flex: 1, marginTop: 25 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",

                marginHorizontal: 35,
              }}
            >
              {item.Label}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: "#73838f",
                marginHorizontal: 35,
                marginTop: 0,
              }}
            >
              {item.Data}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลที่อยู่)
  FormDataaddress = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: "#f9fafc",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        {index === 0 && (
          <ImageBackground
            source={require("../../image/bgregister.png")}
            resizeMode={"stretch"}
            imageStyle={{ width: "100%", height: 160 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",

                  marginHorizontal: 35,
                }}
              >
                ที่อยู่ติดต่อ
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "#73838f",
                  marginHorizontal: 35,
                  marginTop: 0,
                }}
              >
                {this.state.contact_address_type1}{" "}
                {this.state.contact_address_type1 === null ? "" : "ต."}
                {this.state.contact_subdistrict_type1}{" "}
                {this.state.contact_subdistrict_type1 === null ? "" : "อ."}
                {this.state.contact_district_type1}{" "}
                {this.state.contact_province_type1 === null ? "" : "จ."}
                {this.state.contact_province_type1}{" "}
                {this.state.contact_postcode_type1}{" "}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  // form แสดงข้อมูลการสมัครกิจกรรม (ข้อมูลที่อยู่)
  FormDatacantact = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: "#f9fafc",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        {index === 0 && (
          <ImageBackground
            source={require("../../image/bgregister.png")}
            resizeMode={"stretch"}
            imageStyle={{ width: "100%", height: 160 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",

                  marginHorizontal: 35,
                }}
              >
                {item.Label}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "#73838f",
                  marginHorizontal: 35,
                  marginTop: 0,
                }}
              >
                {item.Data}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
        {index === 2 && (
          <ImageBackground
            source={require("../../image/bgregister.png")}
            resizeMode={"stretch"}
            imageStyle={{ width: "100%", height: 160 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#163c70",

                  marginHorizontal: 35,
                }}
              >
                {item.Label}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "#73838f",
                  marginHorizontal: 35,
                  marginTop: 0,
                }}
              >
                {item.Data}
              </Text>
              {/* edit ตอนclick แก้ไข */}
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  FormDataEdit = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: "#f9fafc",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        <ImageBackground
          source={
            this.state.checkeditmenu0 === true
              ? require("../../image/bgregister.png")
              : require("../../image/bglock.png")
          }
          resizeMode={"stretch"}
          imageStyle={{ width: "100%", height: 125 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ flex: 1, marginTop: 25 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#163c70",

                marginHorizontal: 35,
              }}
            >
              {item.Label}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: "#73838f",
                marginHorizontal: 35,
                marginTop: 0,
              }}
            >
              {item.Data}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  FormDataaddressedit = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 3,
          shadowColor: "#f9fafc",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        <KeyboardAvoidingView style={{}}>
          {index === 0 && (
            <ImageBackground
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      this.setState({ contact_postcode: text });
                    }}
                    style={{
                      fontSize: 24,
                      color: "#73838f",
                      marginHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 1 && (
            <ImageBackground
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      this.setState({ contact_postcode: text });
                    }}
                    style={{
                      fontSize: 24,
                      color: "#73838f",
                      marginHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
          {index === 2 && (
            <ImageBackground
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: "red",
                  }}
                >
                  <RNPickerSelect
                    mode="dropdown"
                    placeholderTextColor={"#999999"}
                    placeholder={{
                      label: "เลือกประเทศ",
                      value: 0,
                    }}
                    // enabled={this.state.enabled}

                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: "100%",
                      },
                    }}
                    onValueChange={(value, index) => {
                      // console.log(index);
                      if (index != 0) {
                        // console.log(
                        //   this.state.Dataprovices[index - 1].ProvinceNameTh,
                        // );
                        // console.log(
                        //   รรรรรรรรรรร,
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
                              this.state.Dataprovices[index - 1].ProvinceCode
                            );
                          }
                        );
                      }
                    }}
                    items={this.state.Dataprovices.map((data) => ({
                      label:
                        I18n.locale === "th"
                          ? data.ProvinceNameTh
                          : data.ProvinceNameEn,
                      value: data.ProvinceCode,
                      key: data.ProvinceCode,
                    }))}
                  >
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: "93%",
                        }}
                      >
                        {this.state.getProvinceNameTh != null ? (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
                            {this.state.getProvinceNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
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
                        }
                      >
                        <Icon
                          style={{ color: "#73838f", marginTop: 6 }}
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
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: "red",
                  }}
                >
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ""
                    }
                    // disabled={this.state.enabled}
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: "100%",
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
                              this.state.getDataAmpor[index - 1].DistrictCode
                            );
                          }
                        );
                      }
                    }}
                    items={this.state.getDataAmpor.map((data) => ({
                      label:
                        I18n.locale === "th"
                          ? data.DistrictNameTh
                          : data.DistrictNameEn,
                      value: data.DistrictCode,
                      key: data.DistrictCode,
                    }))}
                  >
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: "93%",
                        }}
                      >
                        {this.state.getDataAmporNameTh != null ? (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
                            {this.state.getDataAmporNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
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
                        }
                      >
                        <Icon
                          style={{ color: "#73838f", marginTop: 6 }}
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
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: "red",
                  }}
                >
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ""
                    }
                    // disabled={this.state.enabled}
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: "100%",
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
                    items={this.state.getDatatumbur.map((data) => ({
                      label:
                        I18n.locale === "th"
                          ? data.SubDistrictNameTh
                          : data.SubDistrictNameEn,
                      value: data.SubDistrictCode,
                      key: data.SubDistrictCode,
                    }))}
                  >
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: "93%",
                        }}
                      >
                        {this.state.getDatatumburNameTh != null ? (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
                            {this.state.getDatatumburNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
                            {/* {item.Data} */}
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
                        }
                      >
                        <Icon
                          style={{ color: "#73838f", marginTop: 6 }}
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
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      this.setState({ contact_postcode: text });
                    }}
                    style={{
                      fontSize: 24,
                      color: "#73838f",
                      marginHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    {item.Data}
                  </TextInput>
                </ImageBackground>
              </View>
            </ImageBackground>
          )}

          {/* ฟิวประเทศ */}
          {index === 6 && (
            <ImageBackground
              source={require("../../image/bgregister.png")}
              resizeMode={"stretch"}
              imageStyle={{ width: "100%", height: 120 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#163c70",
                      marginHorizontal: 35,
                    }}
                  >
                    {item.Label}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      left: -32,
                    }}
                  >
                    *
                  </Text>
                </View>
                <ImageBackground
                  source={require("../../image/inputedittext.png")}
                  resizeMode={"stretch"}
                  imageStyle={{ height: 28, width: "100%" }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 35,
                    // borderWidth: 1,
                    borderColor: "red",
                  }}
                >
                  <RNPickerSelect
                    mode="dropdown"
                    placeholder={
                      //   {
                      //   label: 'เลือกประเทศ',
                      //   value: 0,
                      // }
                      ""
                    }
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: "100%",
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
                    items={this.state.Datagetcontry.map((data) => ({
                      label:
                        I18n.locale === "th"
                          ? data.CountryNameTh
                          : data.CountryNameEn,
                      value: data.CountryId,
                      key: data.CountryId,
                    }))}
                  >
                    <View
                      style={{
                        // justifyContent: 'center',
                        // height: 30,
                        // marginHorizontal: 20,

                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          // flex: 1,
                          // borderColor:'red',
                          // borderWidth:1,
                          width: "93%",
                        }}
                      >
                        {this.state.getcontryNameTh != null ? (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
                            {this.state.getcontryNameTh}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: "#73838f",
                              fontSize: 24,
                              marginHorizontal: 15,
                            }}
                          >
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
                        }
                      >
                        <Icon
                          style={{ color: "#73838f", marginTop: 6 }}
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

  //////////////////////////////// render ///////////////////////////////////////////////

  render() {
    const {
      StarD_1,
      EndD_1,
      name,
      detail,
      location,
      code,
      imgtype,
    } = this.props.route.params;
    const {
      searchTerm,
      searchByTitle,
      searchAttribute,
      searchAttribute1,
      ignoreCase,
      dataMaket,
    } = this.state;

    // console.log(
    //   'dataCategoryProductdataCategoryProductdataCategoryProduct',

    //   height,
    //   this.state.dataCategoryProduct,
    //   // this.state.datauserdrive,
    //   // this.state.datauserdrive[UserContact_TitleTH]
    // );

    // this.props.getStatus1
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'white',
          backgroundColor: "transparent",
        }}
      >
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{ marginTop: Platform.OS === "android" && 90 }} />
        <HeaderstageRegister
          nameTab={I18n.t("transalte_registerdevlop")}
          nameTab2={1}
        />

        {/* /////////////////////////////////////////////////////////////componnt ect /////////////////////////// */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : 20}
          style={{ flex: 1, zIndex: -1 }}
        >
          <ScrollView onScroll={({ nativeEvent }) => {}} style={{ flex: 1 }}>
            <ListItem
              containerStyle={{
                marginBottom: 8,
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 10,
                width: "95%",
                shadowColor: "#f4f6fa ",
                // shadowOffset: {
                //   width: 0,
                //   height: 1,
                // },
                // shadowOpacity: 0.18,
                // shadowRadius: 1.00,
              }}
              style={{
                width: "100%",
                height: null,
                flex: 1,
                backgroundColor: "#f4f5f850",
              }}
              leftAvatar={
                <View style={{ alignItems: "center", flex: 0.4 }}>
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                      {/* <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 55, height: 50, borderRadius: 15}}
                  /> */}
                      <Image
                        source={imgtype}
                        style={{ width: 55, height: 50, borderRadius: 15 }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#6f819a",
                          marginTop: 8,
                          textAlign: "center",
                        }}
                      >
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
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "100%" }}>
                      <Text
                        onPress={() => {}}
                        numberOfLines={2}
                        style={{
                          fontSize: 18,
                          color: "#4b4b4b",
                          fontFamily: "Kittithada Bold 75",
                        }}
                      >
                        {" "}
                        {name}{" "}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        bottom: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        alignSelf: "flex-start",
                      }}
                    >
                      {location === "ออนไลน์" ? (
                        <Image
                          style={{ width: 13, height: 13, top: 3 }}
                          source={require("../../image/WWW.png")}
                        />
                      ) : (
                        <Image
                          style={{ width: 9, height: 12, top: 3 }}
                          source={require("../../image/makerlocation.png")}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",

                        alignSelf: "flex-start",
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{ fontSize: 15.5, color: "#6f819a" }}
                      >
                        {"  "}
                        {location}
                      </Text>
                    </View>
                  </View>
                </View>
              }
              subtitle={
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.navigate('Questionnaireseminar');
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 1,
                    top: 3,
                  }}
                >
                  <Image
                    style={{ width: 17, height: 13 }}
                    source={require("../../image/readDetail.png")}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#7fadec",
                      fontFamily: "PSL Kittithada Pro",
                    }}
                  >
                    {" "}
                    {I18n.t("translate_Readmore")}{" "}
                  </Text>
                </TouchableOpacity>
              }
            />
            {this.state.sucess === false ? (
              <View>
                <FlatList
                  style={{ width: "95%", alignSelf: "center" }}
                  data={
                    this.props.getUser.userDetails.res_result.type === 3
                      ? dadamenu3
                      : dadamenu1
                  }
                  renderItem={this.MenuRegister}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                />
                {/* All menu */}

                <View style={styles.container1}>
                  {/* <KeyboardAvoidingView behavior={10} style={{flex: 1}}> */}
                  {/* หน้าข้อมูลส่วนตัว */}

                  {this.state.Isative === 0 && (
                    <View>
                      {/* {this.props.getUser.userDetails.res_result.type ===
                      1 && ( */}
                      {/* this.state.editdata === true คือ ก็คืดการแก้ไขข้อมูล */}
                      <View style={{ marginBottom: 35 }}>
                        {this.state.editdata === false ? (
                          <View>
                            {/* ข้อมูลแต่ละบุคคล */}
                            <View>
                              {this.state.FormDatatype1.map((from1, index) => (
                                <View
                                  style={{
                                    flex: 1,
                                    marginTop: 3,
                                    shadowColor: "#f9fafc",
                                    shadowOffset: {
                                      width: 0,
                                      height: 12,
                                    },
                                    shadowOpacity: 0.58,
                                    shadowRadius: 16.0,

                                    elevation: 24,
                                  }}
                                >
                                  {index !== 1 && (
                                    <ImageBackground
                                      source={
                                        this.state.checkeditmenu0 === false
                                          ? require("../../image/bgregister.png")
                                          : require("../../image/bglock.png")
                                      }
                                      resizeMode={"stretch"}
                                      imageStyle={{
                                        width: "100%",
                                        height: 125,
                                      }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                      }}
                                    >
                                      <View style={{ flex: 1, marginTop: 25 }}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: "#163c70",

                                            marginHorizontal: 35,
                                          }}
                                        >
                                          {/* {item.Label} */}

                                          {from1.Label}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 22,
                                            color: "#73838f",
                                            marginHorizontal: 35,
                                            marginTop: 0,
                                          }}
                                        >
                                          {from1.Data}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  )}

                                  {index === 1 && (
                                    <ImageBackground
                                      source={
                                        this.state.checkeditmenu0 === false
                                          ? require("../../image/bgregister.png")
                                          : require("../../image/bglock.png")
                                      }
                                      resizeMode={"stretch"}
                                      imageStyle={{
                                        width: "100%",
                                        height: 125,
                                      }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                      }}
                                    >
                                      <View style={{ flex: 1, marginTop: 25 }}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: "#163c70",

                                            marginHorizontal: 35,
                                          }}
                                        >
                                          {/* {item.Label} */}

                                          {from1.Label}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 22,
                                            color: "#73838f",
                                            marginHorizontal: 35,
                                            marginTop: 0,
                                          }}
                                        >
                                          {this.showTitlename(from1.Data)}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  )}
                                </View>
                              ))}
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
                                          shadowColor: "#f9fafc",
                                          shadowOffset: {
                                            width: 0,
                                            height: 12,
                                          },
                                          shadowOpacity: 0.58,
                                          shadowRadius: 16.0,

                                          elevation: 24,
                                        }}
                                      >
                                        <ImageBackground
                                          source={
                                            this.state.checkeditmenu0 === false
                                              ? require("../../image/bgregister.png")
                                              : require("../../image/bglock.png")
                                          }
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 153,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 25 }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",

                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {/* {item.Label} */}

                                              {from1.Label}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 22,
                                                color: "#73838f",
                                                marginHorizontal: 35,
                                                marginTop: 0,
                                              }}
                                            >
                                              {this.state
                                                .FormDatatype1addnress[0]
                                                .Data === null
                                                ? "-"
                                                : this.state
                                                    .FormDatatype1addnress[0]
                                                    .Data}{" "}
                                              {"ต. "}
                                              {this.state
                                                .FormDatatype1addnress[4]
                                                .Data === null
                                                ? "-"
                                                : this.state
                                                    .FormDatatype1addnress[4]
                                                    .Data}{" "}
                                              {"อ. "}
                                              {this.state
                                                .FormDatatype1addnress[3]
                                                .Data === null
                                                ? "-"
                                                : this.state
                                                    .FormDatatype1addnress[3]
                                                    .Data}{" "}
                                              {"จ. "}
                                              {this.state
                                                .FormDatatype1addnress[2]
                                                .Data === null
                                                ? "-"
                                                : this.state
                                                    .FormDatatype1addnress[2]
                                                    .Data}{" "}
                                              {this.state
                                                .FormDatatype1addnress[5]
                                                .Data === null
                                                ? "-"
                                                : this.state
                                                    .FormDatatype1addnress[5]
                                                    .Data}
                                            </Text>
                                          </View>
                                        </ImageBackground>
                                      </View>
                                    )}
                                  </>
                                )
                              )}
                            </View>

                            <View>
                              {this.state.FormDatatype1contact.map(
                                (from1, index) => (
                                  <View
                                    style={{
                                      flex: 1,
                                      marginTop: 3,
                                      shadowColor: "#f9fafc",
                                      shadowOffset: {
                                        width: 0,
                                        height: 12,
                                      },
                                      shadowOpacity: 0.58,
                                      shadowRadius: 16.0,

                                      elevation: 24,
                                    }}
                                  >
                                    {/* {index === 0 && ( */}
                                    <ImageBackground
                                      source={
                                        this.state.checkeditmenu0 === false
                                          ? require("../../image/bgregister.png")
                                          : require("../../image/bglock.png")
                                      }
                                      resizeMode={"stretch"}
                                      imageStyle={{
                                        width: "100%",
                                        height: 125,
                                      }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                      }}
                                    >
                                      <View style={{ flex: 1, marginTop: 25 }}>
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: "#163c70",

                                            marginHorizontal: 35,
                                          }}
                                        >
                                          {/* {item.Label} */}

                                          {from1.Label}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 22,
                                            color: "#73838f",
                                            marginHorizontal: 35,
                                            marginTop: 0,
                                          }}
                                        >
                                          {from1.Data === "" ? "-" : from1.Data}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ) : (
                          //  ข้อมูลการแก้ไข
                          <View>
                            <View>
                              {this.state.FormDatatype1.map((from1, index) => (
                                <View
                                  style={{
                                    flex: 1,
                                    marginTop: 3,
                                    shadowColor: "#f9fafc",
                                    shadowOffset: {
                                      width: 0,
                                      height: 12,
                                    },
                                    shadowOpacity: 0.58,
                                    shadowRadius: 16.0,

                                    elevation: 24,
                                  }}
                                >
                                  <ImageBackground
                                    source={
                                      this.state.checkeditmenu0 === true
                                        ? require("../../image/bgregister.png")
                                        : require("../../image/bglock.png")
                                    }
                                    resizeMode={"stretch"}
                                    imageStyle={{
                                      width: "100%",
                                      height: 125,
                                    }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      flex: 1,
                                    }}
                                  >
                                    <View style={{ flex: 1, marginTop: 25 }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 35,
                                        }}
                                      >
                                        {from1.Label}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 22,
                                          color: "#73838f",
                                          marginHorizontal: 35,
                                          marginTop: 0,
                                        }}
                                      >
                                        {from1.Data}
                                      </Text>
                                    </View>
                                  </ImageBackground>
                                </View>
                              ))}
                            </View>

                            <View>
                              {this.state.FormDatatype1addnress.map(
                                (DataItemss, index) => (
                                  <View
                                    style={{
                                      flex: 1,
                                      marginTop: 3,
                                      shadowColor: "#f9fafc",
                                      shadowOffset: {
                                        width: 0,
                                        height: 12,
                                      },
                                      shadowOpacity: 0.58,
                                      shadowRadius: 16.0,

                                      elevation: 24,
                                    }}
                                  >
                                    <KeyboardAvoidingView style={{}}>
                                      {index === 0 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 145,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    AddressTH: text,
                                                  });
                                                }}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  flex: 1,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {DataItemss.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                      {index === 1 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 145,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    AddressEN: text,
                                                  });
                                                }}
                                                placeholder={DataItemss.Data}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {DataItemss.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                      {index === 2 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                                // borderWidth: 1,
                                                borderColor: "red",
                                              }}
                                            >
                                              <RNPickerSelect
                                                placeholder={{
                                                  label: "เลือกจังหวัด",
                                                  value: 0,
                                                }}
                                                // enabled={this.state.enabled}

                                                useNativeAndroidPickerStyle={
                                                  false
                                                }
                                                _fixAndroidTouchableBug_={true}
                                                style={{
                                                  ...pickerSelectStyles2,
                                                  inputAndroidContainer: {
                                                    width: "100%",
                                                  },
                                                }}
                                                onValueChange={(
                                                  value,
                                                  index
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
                                                          ].ProvinceCode
                                                        );
                                                      }
                                                    );
                                                  }
                                                }}
                                                items={this.state.Dataprovices.map(
                                                  (data) => ({
                                                    label:
                                                      I18n.locale === "th"
                                                        ? data.ProvinceNameTh
                                                        : data.ProvinceNameEn,
                                                    value: data.ProvinceCode,
                                                    key: data.ProvinceCode,
                                                  })
                                                )}
                                              >
                                                <View
                                                  style={{
                                                    // justifyContent: 'center',
                                                    // height: 30,
                                                    // marginHorizontal: 20,

                                                    flexDirection: "row",
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      // flex: 1,
                                                      // borderColor:'red',
                                                      // borderWidth:1,
                                                      width: "93%",
                                                    }}
                                                  >
                                                    {this.state
                                                      .getProvinceNameTh !=
                                                    null ? (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {
                                                          this.state
                                                            .getProvinceNameTh
                                                        }
                                                      </Text>
                                                    ) : (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    )}
                                                  </View>

                                                  <View
                                                    style={
                                                      {
                                                        // flex: 1,
                                                        // borderWidth:1
                                                      }
                                                    }
                                                  >
                                                    <Icon
                                                      style={{
                                                        color: "#73838f",
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
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                                // borderWidth: 1,
                                                borderColor: "red",
                                              }}
                                            >
                                              <RNPickerSelect
                                                placeholder={{
                                                  label: "เลือกอำเภอ",
                                                  value: 0,
                                                }}
                                                // disabled={this.state.enabled}
                                                useNativeAndroidPickerStyle={
                                                  false
                                                }
                                                _fixAndroidTouchableBug_={true}
                                                style={{
                                                  ...pickerSelectStyles2,
                                                  inputAndroidContainer: {
                                                    width: "100%",
                                                  },
                                                }}
                                                onValueChange={(
                                                  value,
                                                  index
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
                                                          ].DistrictCode
                                                        );
                                                      }
                                                    );
                                                  }
                                                }}
                                                items={this.state.getDataAmpor.map(
                                                  (data) => ({
                                                    label:
                                                      I18n.locale === "th"
                                                        ? data.DistrictNameTh
                                                        : data.DistrictNameEn,
                                                    value: data.DistrictCode,
                                                    key: data.DistrictCode,
                                                  })
                                                )}
                                              >
                                                <View
                                                  style={{
                                                    // justifyContent: 'center',
                                                    // height: 30,
                                                    // marginHorizontal: 20,

                                                    flexDirection: "row",
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      // flex: 1,
                                                      // borderColor:'red',
                                                      // borderWidth:1,
                                                      width: "93%",
                                                    }}
                                                  >
                                                    {this.state
                                                      .getDataAmporNameTh !=
                                                    null ? (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {
                                                          this.state
                                                            .getDataAmporNameTh
                                                        }
                                                      </Text>
                                                    ) : (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    )}
                                                  </View>

                                                  <View
                                                    style={
                                                      {
                                                        // flex: 1,
                                                        // borderWidth:1
                                                      }
                                                    }
                                                  >
                                                    <Icon
                                                      style={{
                                                        color: "#73838f",
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
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                                // borderWidth: 1,
                                                borderColor: "red",
                                              }}
                                            >
                                              <RNPickerSelect
                                                placeholder={{
                                                  label: "เลือกตำบล",
                                                  value: 0,
                                                }}
                                                // disabled={this.state.enabled}
                                                useNativeAndroidPickerStyle={
                                                  false
                                                }
                                                _fixAndroidTouchableBug_={true}
                                                style={{
                                                  ...pickerSelectStyles2,
                                                  inputAndroidContainer: {
                                                    width: "100%",
                                                  },
                                                }}
                                                onValueChange={(
                                                  value,
                                                  index
                                                ) => {
                                                  console.log(index);
                                                  if (index != 0) {
                                                    console.log(
                                                      this.state.getDatatumbur
                                                    );
                                                    console.log(
                                                      this.state.getDatatumbur[
                                                        index - 1
                                                      ].SubDistrictCode
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
                                                  (data) => ({
                                                    label:
                                                      I18n.locale === "th"
                                                        ? data.SubDistrictNameTh
                                                        : data.SubDistrictNameEn,
                                                    value: data.SubDistrictCode,
                                                    key: data.SubDistrictCode,
                                                  })
                                                )}
                                              >
                                                <View
                                                  style={{
                                                    // justifyContent: 'center',
                                                    // height: 30,
                                                    // marginHorizontal: 20,

                                                    flexDirection: "row",
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      // flex: 1,
                                                      // borderColor:'red',
                                                      // borderWidth:1,
                                                      width: "93%",
                                                    }}
                                                  >
                                                    {this.state
                                                      .getDatatumburNameTh !=
                                                    null ? (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {
                                                          this.state
                                                            .getDatatumburNameTh
                                                        }
                                                      </Text>
                                                    ) : (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    )}
                                                  </View>

                                                  <View
                                                    style={
                                                      {
                                                        // flex: 1,
                                                        // borderWidth:1
                                                      }
                                                    }
                                                  >
                                                    <Icon
                                                      style={{
                                                        color: "#73838f",
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
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    contact_postcode: text,
                                                  });
                                                }}
                                                placeholder={DataItemss.Data}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {DataItemss.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}

                                      {/* ฟิวประเทศ */}
                                      {index === 6 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {DataItemss.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                                // borderWidth: 1,
                                                borderColor: "red",
                                              }}
                                            >
                                              <RNPickerSelect
                                                placeholder={{
                                                  label: "เลือกประเทศ",
                                                  value: 0,
                                                }}
                                                useNativeAndroidPickerStyle={
                                                  false
                                                }
                                                _fixAndroidTouchableBug_={true}
                                                style={{
                                                  ...pickerSelectStyles2,
                                                  inputAndroidContainer: {
                                                    width: "100%",
                                                  },
                                                }}
                                                onValueChange={(
                                                  value,
                                                  index
                                                ) => {
                                                  console.log(index);
                                                  if (index != 0) {
                                                    this.setState({
                                                      getcontryNameTh: this
                                                        .state.Datagetcontry[
                                                        index - 1
                                                      ].CountryNameTh,
                                                      getcontryCode: this.state
                                                        .Datagetcontry[
                                                        index - 1
                                                      ].CountryId,
                                                    });
                                                  }
                                                }}
                                                items={this.state.Datagetcontry.map(
                                                  (data) => ({
                                                    label:
                                                      I18n.locale === "th"
                                                        ? data.CountryNameTh
                                                        : data.CountryNameEn,
                                                    value: data.CountryId,
                                                    key: data.CountryId,
                                                  })
                                                )}
                                              >
                                                <View
                                                  style={{
                                                    // justifyContent: 'center',
                                                    // height: 30,
                                                    // marginHorizontal: 20,

                                                    flexDirection: "row",
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      // flex: 1,
                                                      // borderColor:'red',
                                                      // borderWidth:1,
                                                      width: "93%",
                                                    }}
                                                  >
                                                    {this.state
                                                      .getcontryNameTh !=
                                                    null ? (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {
                                                          this.state
                                                            .getcontryNameTh
                                                        }
                                                      </Text>
                                                    ) : (
                                                      <Text
                                                        style={{
                                                          color: "#73838f",
                                                          fontSize: 24,
                                                          marginHorizontal: 15,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    )}
                                                  </View>

                                                  <View
                                                    style={
                                                      {
                                                        // flex: 1,
                                                        // borderWidth:1
                                                      }
                                                    }
                                                  >
                                                    <Icon
                                                      style={{
                                                        color: "#73838f",
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
                                )
                              )}
                            </View>

                            <View>
                              {this.state.FormDatatype1contact.map(
                                (item, index) => (
                                  <View
                                    style={{
                                      flex: 1,
                                      marginTop: 3,
                                      shadowColor: "#f9fafc",
                                      shadowOffset: {
                                        width: 0,
                                        height: 12,
                                      },
                                      shadowOpacity: 0.58,
                                      shadowRadius: 16.0,

                                      elevation: 24,
                                    }}
                                  >
                                    <KeyboardAvoidingView style={{}}>
                                      {index === 0 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {item.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                keyboardType="numeric"
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    contact_tel: text,
                                                  });
                                                }}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {item.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                      {index === 1 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {item.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                keyboardType="numeric"
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    contact_fax: text,
                                                  });
                                                }}
                                                placeholder={item.Data}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {item.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                      {index === 2 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {item.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    contact_email: text,
                                                  });
                                                }}
                                                placeholder={item.Data}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {item.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                      {index === 3 && (
                                        <ImageBackground
                                          source={require("../../image/bgregister.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            width: "100%",
                                            height: 120,
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <View
                                            style={{ flex: 1, marginTop: 20 }}
                                          >
                                            <View
                                              style={{ flexDirection: "row" }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 20,
                                                  color: "#163c70",
                                                  marginHorizontal: 35,
                                                }}
                                              >
                                                {item.Label}
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "red",
                                                  left: -32,
                                                }}
                                              >
                                                *
                                              </Text>
                                            </View>
                                            <ImageBackground
                                              source={require("../../image/inputedittext.png")}
                                              resizeMode={"stretch"}
                                              imageStyle={{
                                                height: 28,
                                                width: "100%",
                                              }}
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              <TextInput
                                                onChangeText={(text) => {
                                                  this.setState({
                                                    contact_web: text,
                                                  });
                                                }}
                                                placeholder={item.Data}
                                                style={{
                                                  fontSize: 24,
                                                  color: "#73838f",
                                                  marginHorizontal: 10,
                                                  flex: 1,
                                                  marginTop:
                                                    Platform.OS === "android"
                                                      ? -11
                                                      : 0,
                                                  fontFamily:
                                                    Platform.OS === "android"
                                                      ? "Kittithada Bold 75"
                                                      : "PSL Kittithada Pro",
                                                }}
                                              >
                                                <Text
                                                  numberOfLines={2}
                                                  style={{
                                                    borderWidth: 1,
                                                    color: "#163c70",
                                                    fontSize: 24,
                                                    flex: 1,
                                                  }}
                                                >
                                                  {item.Data}
                                                </Text>
                                              </TextInput>
                                            </ImageBackground>
                                          </View>
                                        </ImageBackground>
                                      )}
                                    </KeyboardAvoidingView>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  )}

                  {/* หน้าข้อมูลประกอบ */}

                  {this.state.Isative === 1 && (
                    <View style={{}}>
                      <View style={{}}>
                        {this.state.checkeditmenu2 === false ? (
                          <View style={{}}>
                            <ImageBackground
                              source={require("../../image/bgregister.png")}
                              resizeMode={"stretch"}
                              imageStyle={{ width: "100%", height: 170 }}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View style={{ flex: 1, marginTop: 25 }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#163c70",
                                    marginTop: 6,
                                    marginHorizontal: 35,
                                  }}
                                >
                                  {I18n.t("member_business")} {""}
                                </Text>
                                {this.state.showDatabusiness != undefined && (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      marginHorizontal: 35,

                                      backgroundColor: "#FFF",
                                    }}
                                  >
                                    {this.state.showDatabusiness.map((Data) => {
                                      return (
                                        <View
                                          style={{
                                            // flexDirection: 'row',
                                            // flexWrap: 'wrap',
                                            backgroundColor: "#FFF",
                                          }}
                                        >
                                          <View>
                                            {Data.value === "0" && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: "#73838f",
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}
                                              >
                                                {"ผู้ผลิต"}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === "1" && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: "#73838f",
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}
                                              >
                                                {"ผู้ส่งออก"}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === "2" && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: "#73838f",
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}
                                              >
                                                {"บริษัทการค้าระหว่างประเทศ"}
                                              </Text>
                                            )}
                                          </View>
                                          <View>
                                            {Data.value === "3" && (
                                              <Text
                                                style={{
                                                  fontSize: 22,
                                                  color: "#73838f",
                                                  marginHorizontal: 3,
                                                  marginTop: 0,
                                                }}
                                              >
                                                {"อื่นๆ"}
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      );
                                    })}
                                    <View style={{ flexDirection: "column" }}>
                                      <Text
                                        style={{
                                          fontSize: 22,
                                          color: "#73838f",
                                          marginHorizontal: 3,
                                          marginTop: 0,
                                        }}
                                      >
                                        {this.state.textbusinessTypeOther}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </ImageBackground>
                            <ImageBackground
                              source={require("../../image/bgregister.png")}
                              resizeMode={"stretch"}
                              imageStyle={{ width: "100%", height: 123 }}
                              style={{
                                marginBottom: 50,
                              }}
                            >
                              <View style={{ marginHorizontal: 23 }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#163c70",
                                    marginTop: 25,
                                    marginHorizontal: 15,
                                  }}
                                >
                                  {I18n.t("transalte_export_market")}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    backgroundColor: "#FFF",
                                  }}
                                >
                                  {this.state.itemMaket.map((data) => {
                                    return (
                                      <Chip
                                        onPress={() => {
                                          this._deleteDatabusiness({
                                            id: data.activityExportMarketId,
                                          });
                                        }}
                                        style={{
                                          backgroundColor: "#2d6dc4",
                                          margin: 4,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 20,
                                            color: "#FFFF",
                                            marginHorizontal: 3,
                                            marginTop: 0,
                                          }}
                                        >
                                          {I18n.locale === "th"
                                            ? data.ExportMarketNameTH
                                            : data.ExportMarketNameEN}
                                        </Text>{" "}
                                        {"  "}
                                        <Icon3
                                          name="closecircle"
                                          size={18}
                                          style={{
                                            color: "#343434",
                                            marginTop: 6,
                                          }}
                                        />
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
                              source={require("../../image/bginputx.png")}
                              resizeMode={"stretch"}
                              imageStyle={{ width: "100%", height: 340 }}
                              style={{}}
                            >
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "#163c70",

                                  marginHorizontal: 35,
                                  marginTop: 25,
                                }}
                              >
                                {I18n.t("member_business")}{" "}
                              </Text>
                              {this.state.fromBisiness.map((Data1, index) => {
                                return (
                                  <View
                                    style={{
                                      marginTop: 10,

                                      marginHorizontal: 25,
                                      marginBottom: 5,
                                    }}
                                  >
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.selectbusiness({
                                          item: Data1,
                                          index: Data1.key,
                                        });
                                        if (Data1.key === "4") {
                                          alert("ok");
                                        }
                                      }}
                                      style={{
                                        borderWidth: 1,
                                        borderColor: "#2d6dc4",
                                        backgroundColor:
                                          this.state.checkBoxbisness[
                                            Data1.key
                                          ] === true
                                            ? "#2d6dc4"
                                            : "#FFFFFF",
                                        flex: 0.5,
                                        height: 35,
                                        borderRadius: 4,
                                        marginHorizontal: 5,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          color:
                                            this.state.checkBoxbisness[
                                              Data1.key
                                            ] === true
                                              ? "#FFFFFF"
                                              : "#2d6dc4",
                                          fontSize: 18,
                                        }}
                                      >
                                        {/* {Data.Value} */}
                                        {Data1.value}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}

                              {/* <View style={{borderWidth:1}}> */}
                              <ImageBackground
                                source={require("../../image/inputedittext.png")}
                                resizeMode={"stretch"}
                                imageStyle={{ height: 28, width: "100%" }}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginHorizontal: 35,
                                  marginTop: 8,
                                }}
                              >
                                <TextInput
                                  placeholder={"กรณีอื่นๆ กรุณาระบุรายละเอียด"}
                                  placeholderTextColor={"#999999"}
                                  onChangeText={(text) => {
                                    this.setState({
                                      textbusinessTypeOther: text,
                                    });
                                  }}
                                  style={{
                                    fontSize: 24,
                                    color: "#c0c0c0",
                                    marginTop:
                                      Platform.OS === "android" ? -10 : 0,
                                    marginHorizontal: 10,
                                    fontFamily: "PSL Kittithada Pro",
                                    flex: 1,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      fontFamily: "PSL Kittithada Pro",
                                    }}
                                  >
                                    {this.state.textbusinessTypeOther}
                                  </Text>
                                </TextInput>
                              </ImageBackground>
                            </ImageBackground>

                            <ImageBackground
                              source={require("../../image/bgregister.png")}
                              resizeMode={"stretch"}
                              imageStyle={{ width: "100%", height: 123 }}
                              style={{
                                marginBottom: 25,
                              }}
                            >
                              <View style={{}}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#163c70",
                                    marginTop: 25,
                                    marginHorizontal: 35,
                                  }}
                                >
                                  {I18n.t("transalte_export_market")}
                                </Text>

                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ openPopupmaket: true });
                                  }}
                                  style={{
                                    backgroundColor: "#2d6dc4",
                                    width: "30%",
                                    marginHorizontal: 35,
                                    height: 34,
                                    borderRadius: 17,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                  }}
                                >
                                  <View
                                    style={{
                                      justifyContent: "center",
                                      marginHorizontal: 2,
                                    }}
                                  >
                                    <Image
                                      style={{ width: 15, height: 15 }}
                                      resizeMode={"stretch"}
                                      source={require("../../image/pencx.png")}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      flex: 0.8,
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: "#FFFFFF",
                                        fontSize: 18,
                                      }}
                                    >
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
                    </View>
                  )}

                  {/* หน้าที่สินค้า */}
                  {this.state.Isative === 2 && (
                    <View>
                      {this.state.AddProduct === false ? (
                        <View>
                          {/* เช็คว่ามีข้อมูลมั้ย  ถ้าไม่มีก็ไม่ต้องแสดง ถ้ามีก็แสดง*/}
                          {this.state.dataProduct.length === 0 ? (
                            <View style={{}}>
                              <View style={{ flex: 1 }}>
                                <View
                                  style={{
                                    marginTop: 25,

                                    height: 84,
                                    justifyContent: "center",
                                    marginHorizontal: 15,
                                    backgroundColor: "#FFFFFF",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,

                                    elevation: 3,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 24,
                                      color: "#a3b4c1",
                                      fontStyle: "italic",
                                      textAlign: "center",
                                      marginHorizontal: 35,
                                    }}
                                  >
                                    ไม่มีสินค้า
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View>
                              {this.state.DeleteProduct === false ? (
                                <View>
                                  {/* แสดงข้อมูลของสินค้า */}
                                  <FlatList
                                    style={{}}
                                    data={this.state.dataProduct}
                                    renderItem={this.Listproduct}
                                    keyExtractor={(item) => item.id}
                                  />
                                  {/* ปุ่มเพิ่มสินค้า */}

                                  {/* มีปุ่ม 3 ปุ่ม มี กลับ ลบผู้เข้าร่วม และ ต่อไป */}
                                </View>
                              ) : (
                                <View>
                                  <FlatList
                                    style={{}}
                                    data={this.state.dataProduct}
                                    renderItem={this.ListproductDelete}
                                    keyExtractor={(item) => item.id}
                                  />
                                  <View
                                    style={{
                                      flexDirection: "row",

                                      marginBottom: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        flex: 0.5,
                                        flexDirection: "row",
                                      }}
                                    >
                                      <Text> </Text>
                                    </View>
                                  </View>
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      ) : (
                        <View>
                          {this.state.editProductfrom === false ? (
                            <View style={{ marginTop: 10, paddingBottom: 15 }}>
                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        {/* ต้องแก้29 */}
                                        {I18n.t("transalte_cateProductText")}
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกประเภทสินค้า */}
                                    <RNPickerSelect
                                      mode="dropdown"
                                      placeholder={{
                                        label: "เลือกประเภทสินค้า",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
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
                                                : I18n.locale === "TH"
                                                ? this.state
                                                    .dataCategoryProduct[
                                                    index - 1
                                                  ].namecategoryproductTH
                                                : this.state
                                                    .dataCategoryProduct[
                                                    index - 1
                                                  ].namecategoryproductEN,

                                            idcateproduct:
                                              index === 0 ? 0 : value,
                                          },
                                          function() {
                                            this.getCategoryProductsub();
                                          }
                                        );
                                      }}
                                      items={this.state.dataCategoryProduct.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "TH"
                                              ? data.namecategoryproductTH
                                              : data.namecategoryproductEN,
                                          value: data.idcategoryproduct,
                                          key: data.idcategoryproduct,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,

                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state.textcateproduct ===
                                          null ? (
                                            <Text
                                              style={{
                                                color: "#c0c0c0",
                                                fontSize: 24,
                                              }}
                                            >
                                              {I18n.t(
                                                "transalte_cateProductText"
                                              )}
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.textcateproduct}{" "}
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 0.1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
                                            name="keyboard-arrow-down"
                                            size={16}
                                          />
                                        </View>
                                      </View>
                                    </RNPickerSelect>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        {I18n.t("transalte_cateProductText2")}
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกประเภทสินค้าย่อย */}
                                    <RNPickerSelect
                                      placeholder={{
                                        label: "เลือกประเภทสินค้าย่อย",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
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
                                                : I18n.locale === "th"
                                                ? this.state
                                                    .dataCategoryProductsub[
                                                    index - 1
                                                  ].nameThsub
                                                : this.state
                                                    .dataCategoryProductsub[
                                                    index - 1
                                                  ].nameENsub,

                                            idcateproductsub:
                                              index === 0 ? 0 : value,
                                          },
                                          function() {
                                            this.getCategoryProductdis();
                                          }
                                        );
                                      }}
                                      items={this.state.dataCategoryProductsub.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "th"
                                              ? data.nameThsub
                                              : data.nameENsub,
                                          value: data.idProsub,
                                          key: data.idProsub,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state.textcateproductsub ===
                                          null ? (
                                            <Text
                                              style={{
                                                color: "#c0c0c0",
                                                fontSize: 24,
                                              }}
                                            >
                                              {I18n.t(
                                                "transalte_cateProductText2"
                                              )}{" "}
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.textcateproductsub}{" "}
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 0.1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
                                            name="keyboard-arrow-down"
                                            size={16}
                                          />
                                        </View>
                                      </View>
                                    </RNPickerSelect>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        {I18n.t("transalte_cateProductText3")}
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกกลุ่มสินค้า */}
                                    <RNPickerSelect
                                      placeholderTextColor={"#999999"}
                                      placeholder={{
                                        label: "เลือกกลุ่มสินค้า",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
                                        },
                                      }}
                                      onValueChange={(value, index) => {
                                        this.setState({
                                          textcateproductdis:
                                            index === 0
                                              ? null
                                              : I18n.locale === "th"
                                              ? this.state
                                                  .dataCategoryProductdis[
                                                  index - 1
                                                ].nameThdis
                                              : this.state
                                                  .dataCategoryProductdis[
                                                  index - 1
                                                ].nameENdis,

                                          idcateproductdis:
                                            index === 0 ? 0 : value,
                                        });
                                      }}
                                      items={this.state.dataCategoryProductdis.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "th"
                                              ? data.nameThdis
                                              : data.nameENdis,
                                          value: data.idProdis,
                                          key: data.idProdis,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,

                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state.textcateproductdis ===
                                          null ? (
                                            <Text
                                              style={{
                                                color: "#c0c0c0",
                                                fontSize: 24,
                                              }}
                                            >
                                              เลือกกลุ่มสินค้า{" "}
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.textcateproductdis}
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
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
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                }}
                              >
                                <View style={{ flex: 1, marginTop: 15 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      {I18n.t("transalte_ProductBrandNameEN")}
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 28, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <TextInput
                                      style={{
                                        fontSize: 24,
                                        color: "#73838f",
                                        marginHorizontal: 10,
                                        marginTop:
                                          Platform.OS === "android" ? -11 : 0,
                                        flex: 1,
                                      }}
                                      placeholderTextColor={"#999999"}
                                      placeholder={
                                        "Product Brand Name (English)"
                                      }
                                      onChangeText={(value) =>
                                        this.setState({
                                          productBrandnameEN: value,
                                        })
                                      }
                                    />
                                  </ImageBackground>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      {I18n.t("transalte_ProductDescription")}
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 90, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                    }}
                                  >
                                    <Input
                                      // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                      inputContainerStyle={{
                                        height: 90,
                                        borderBottomWidth: 0,
                                      }}
                                      numberOfLines={10}
                                      multiline={true}
                                      placeholderTextColor={"#999999"}
                                      placeholder={
                                        "Product Description (English)"
                                      }
                                      onChangeText={(value) =>
                                        this.setState({
                                          productDescritionEN: value,
                                        })
                                      }
                                      // onChangeText={value => setTextComment(value)}
                                      // disabled={true}
                                    />
                                    <Text
                                      style={{
                                        color: "#c0c0c0",
                                        fontSize: 14,
                                        right: 70,
                                      }}
                                    >
                                      100 Charecter
                                    </Text>
                                  </ImageBackground>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                }}
                              >
                                <View style={{ flex: 1 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      ชื่อแบรนด์
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 28, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <TextInput
                                      onChangeText={(value) =>
                                        this.setState({
                                          productBrandnameTH_text: value,
                                        })
                                      }
                                      style={{
                                        fontSize: 24,
                                        color: "#73838f",
                                        marginHorizontal: 10,
                                        marginTop:
                                          Platform.OS === "android" ? -11 : 0,
                                        flex: 1,
                                      }}
                                      placeholderTextColor={"#999999"}
                                      placeholder={"ชื่อแบรนด์ (ไทย)"}
                                    />
                                  </ImageBackground>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      รายละเอียดสินค้า
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 90, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                    }}
                                  >
                                    <Input
                                      // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                      inputContainerStyle={{
                                        height: 90,
                                        borderBottomWidth: 0,
                                      }}
                                      numberOfLines={10}
                                      multiline={true}
                                      placeholder={"รายละเอียด (ไทย)"}
                                      placeholderTextColor={"#999999"}
                                      onChangeText={(value) =>
                                        this.setState({
                                          productDescritionTH: value,
                                        })
                                      }
                                      // disabled={true}
                                    />
                                    <Text
                                      style={{
                                        color: "#c0c0c0",
                                        fontSize: 14,
                                        right: 70,
                                      }}
                                    >
                                      100 Charecter
                                    </Text>
                                  </ImageBackground>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                  paddingBottom: 15,
                                }}
                              >
                                <View style={{ flex: 1 }}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      Product's Image / รูปสินค้า
                                    </Text>
                                  </View>
                                  {/* เช็ครูปภาพและ  ขนากรูปภาพ 4 MB */}
                                  <View style={{ flexDirection: "row" }}>
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
                                        flexDirection: "row",
                                        paddingBottom: 10,
                                      }}
                                    >
                                      <View style={{ flex: 0.2 }}>
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
                                      <View style={{ flex: 0.6 }}>
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            fontSize: 20,
                                            color: "#73838f",
                                          }}
                                        >
                                          {this.state.imagefilename}
                                        </Text>
                                      </View>
                                      <TouchableOpacity
                                        style={{ flex: 0.3 }}
                                        onPress={() => {
                                          this.setState({
                                            imagefilename: null,
                                          });
                                        }}
                                      >
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
                                        backgroundColor: "#2d6dc4",
                                        marginHorizontal: 20,
                                        width: 116,
                                        height: 34,
                                        borderRadius: 24,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignSelf: "center",
                                        }}
                                      >
                                        <Icon3
                                          name="arrowup"
                                          size={16}
                                          style={{
                                            color: "#FFFFFF",
                                            marginTop: 3,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            color: "#FFFFFF",
                                            fontSize: 18,
                                            textAlign: "center",
                                          }}
                                        >
                                          อัพโหลดไฟล์
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View style={{ marginTop: 10, paddingBottom: 15 }}>
                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        Category / ประเภทสินค้า
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกประเภทสินค้า */}
                                    <RNPickerSelect
                                      mode="dropdown"
                                      placeholderTextColor={"#999999"}
                                      placeholder={{
                                        label: "เลือกประเภทสินค้า",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
                                        },
                                      }}
                                      onValueChange={(value, index) => {
                                        this.setState(
                                          {
                                            dataCategoryProductsub: [],
                                            textcateproductsub: null,

                                            textcateproduct_edit:
                                              index === 0
                                                ? null
                                                : I18n.locale === "TH"
                                                ? this.state
                                                    .dataCategoryProduct[
                                                    index - 1
                                                  ].namecategoryproductTH
                                                : this.state
                                                    .dataCategoryProduct[
                                                    index - 1
                                                  ].namecategoryproductEN,

                                            idcateproduct:
                                              index === 0 ? 0 : value,
                                          },
                                          function() {
                                            this.getCategoryProductsub();
                                          }
                                        );
                                      }}
                                      items={this.state.dataCategoryProduct.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "TH"
                                              ? data.namecategoryproductTH
                                              : data.namecategoryproductEN,
                                          value: data.idcategoryproduct,
                                          key: data.idcategoryproduct,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,

                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state.textcateproduct_edit ===
                                          undefined ? (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.ProductCategory_popup}
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.textcateproduct_edit}{" "}
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 0.1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
                                            name="keyboard-arrow-down"
                                            size={16}
                                          />
                                        </View>
                                      </View>
                                    </RNPickerSelect>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        Sub-Category / ประเภทสินค้าย่อย
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกประเภทสินค้าย่อย */}
                                    <RNPickerSelect
                                      placeholderTextColor={"#999999"}
                                      placeholder={{
                                        label: "เลือกประเภทสินค้าย่อย",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
                                        },
                                      }}
                                      onValueChange={(value, index) => {
                                        this.setState(
                                          {
                                            dataCategoryProductdis: [],
                                            textcateproductdis: null,
                                            textcateproductsub_edit:
                                              index === 0
                                                ? null
                                                : I18n.locale === "th"
                                                ? this.state
                                                    .dataCategoryProductsub[
                                                    index - 1
                                                  ].nameThsub
                                                : this.state
                                                    .dataCategoryProductsub[
                                                    index - 1
                                                  ].nameENsub,

                                            idcateproductsub:
                                              index === 0 ? 0 : value,
                                          },
                                          function() {
                                            this.getCategoryProductdis();
                                          }
                                        );
                                      }}
                                      items={this.state.dataCategoryProductsub.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "th"
                                              ? data.nameThsub
                                              : data.nameENsub,
                                          value: data.idProsub,
                                          key: data.idProsub,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state
                                            .textcateproductsub_edit ===
                                          undefined ? (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {
                                                this.state
                                                  .ProductSubCategory_popup
                                              }
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {
                                                this.state
                                                  .textcateproductsub_edit
                                              }{" "}
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 0.1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
                                            name="keyboard-arrow-down"
                                            size={16}
                                          />
                                        </View>
                                      </View>
                                    </RNPickerSelect>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1, marginTop: 1 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",

                                    shadowColor: "#f6f7fa",
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
                                  }}
                                >
                                  <View style={{ flex: 1, marginTop: 15 }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          color: "#163c70",

                                          marginHorizontal: 10,
                                        }}
                                      >
                                        Product Group/กลุ่มสินค้า
                                      </Text>
                                      <Text
                                        style={{
                                          color: "red",
                                        }}
                                      >
                                        *
                                      </Text>
                                    </View>

                                    <ImageBackground
                                      source={require("../../image/inputedittext.png")}
                                      resizeMode={"stretch"}
                                      imageStyle={{ height: 28, width: "100%" }}
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 10,
                                      }}
                                    />
                                    {/* เลือกกลุ่มสินค้า */}
                                    <RNPickerSelect
                                      placeholderTextColor={"#999999"}
                                      placeholder={{
                                        label: "เลือกกลุ่มสินค้า",
                                        value: 0,
                                      }}
                                      useNativeAndroidPickerStyle={false}
                                      _fixAndroidTouchableBug_={true}
                                      style={{
                                        ...pickerSelectStyles2,
                                        inputAndroidContainer: {
                                          width: "100%",
                                        },
                                      }}
                                      onValueChange={(value, index) => {
                                        this.setState({
                                          textcateproductdis_edit:
                                            index === 0
                                              ? null
                                              : I18n.locale === "th"
                                              ? this.state
                                                  .dataCategoryProductdis[
                                                  index - 1
                                                ].nameThdis
                                              : this.state
                                                  .dataCategoryProductdis[
                                                  index - 1
                                                ].nameENdis,

                                          idcateproductdis:
                                            index === 0 ? 0 : value,
                                        });
                                      }}
                                      items={this.state.dataCategoryProductdis.map(
                                        (data) => ({
                                          label:
                                            I18n.locale === "th"
                                              ? data.nameThdis
                                              : data.nameENdis,
                                          value: data.idProdis,
                                          key: data.idProdis,
                                        })
                                      )}
                                    >
                                      <View
                                        style={{
                                          justifyContent: "center",
                                          height: 30,
                                          marginHorizontal: 20,

                                          flexDirection: "row",
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            justifyContent: "center",
                                          }}
                                        >
                                          {this.state
                                            .textcateproductdis_edit ===
                                          undefined ? (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {this.state.ProductGroup_popup}
                                            </Text>
                                          ) : (
                                            <Text
                                              numberOfLines={2}
                                              style={{
                                                color: "#163c70",
                                                fontSize: 24,
                                                flex: 1,
                                              }}
                                            >
                                              {
                                                this.state
                                                  .textcateproductdis_edit
                                              }
                                            </Text>
                                          )}
                                        </View>
                                        <View
                                          style={{
                                            flex: 1,

                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Icon
                                            style={{ color: "#73838f" }}
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
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                }}
                              >
                                <View style={{ flex: 1, marginTop: 15 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      Product Brand Name
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 28, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <TextInput
                                      style={{
                                        fontSize: 24,
                                        color: "#163c70",
                                        marginHorizontal: 10,
                                        flex: 1,
                                      }}
                                      onChangeText={(value) =>
                                        this.setState({
                                          productBrandnameEN_edit: value,
                                        })
                                      }
                                    >
                                      {this.state.productBrandnameEN_edit ===
                                      undefined ? (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {this.state.ProductBrandNameEn_popup}
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {this.state.productBrandnameEN_edit}
                                        </Text>
                                      )}
                                    </TextInput>
                                  </ImageBackground>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      Product Description
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 90, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                    }}
                                  >
                                    <Input
                                      // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                      inputContainerStyle={{
                                        height: 90,
                                        borderBottomWidth: 0,
                                      }}
                                      numberOfLines={10}
                                      multiline={true}
                                      // placeholder={'Product Description (English)'}
                                      onChangeText={(value) =>
                                        this.setState({
                                          productDescritionEN_edit: value,
                                        })
                                      }
                                      // onChangeText={value => setTextComment(value)}
                                      // disabled={true}
                                    >
                                      {this.state.productDescritionEN_edit ===
                                      undefined ? (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {
                                            this.state
                                              .ProductDescriptionEn_popup
                                          }
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {this.state.productDescritionEN_edit}
                                        </Text>
                                      )}
                                    </Input>
                                    <Text
                                      style={{
                                        color: "#c0c0c0",
                                        fontSize: 14,
                                        right: 70,
                                      }}
                                    >
                                      100 Charecter
                                    </Text>
                                  </ImageBackground>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                }}
                              >
                                <View style={{ flex: 1 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      ชื่อแบรนด์
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 28, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <TextInput
                                      onChangeText={(value) =>
                                        this.setState({
                                          productBrandnameTH_text_edit: value,
                                        })
                                      }
                                      style={{
                                        fontSize: 24,
                                        color: "#163c70",
                                        marginHorizontal: 10,
                                        flex: 1,
                                      }}
                                    >
                                      {this.state
                                        .productBrandnameTH_text_edit ===
                                      undefined ? (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {this.state.ProductBrandNameTh_popup}
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {
                                            this.state
                                              .productBrandnameTH_text_edit
                                          }
                                        </Text>
                                      )}
                                    </TextInput>
                                  </ImageBackground>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      รายละเอียดสินค้า
                                    </Text>
                                  </View>

                                  <ImageBackground
                                    source={require("../../image/inputedittext.png")}
                                    resizeMode={"stretch"}
                                    imageStyle={{ height: 90, width: "100%" }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginHorizontal: 10,
                                    }}
                                  >
                                    <Input
                                      // style={{fontSize: 24, color: 'red', marginLeft: 4}}

                                      inputContainerStyle={{
                                        height: 90,
                                        borderBottomWidth: 0,
                                      }}
                                      numberOfLines={10}
                                      multiline={true}
                                      onChangeText={(value) =>
                                        this.setState({
                                          productDescritionTH_edit: value,
                                        })
                                      }
                                      // disabled={true}
                                    >
                                      {this.state.productDescritionTH_edit ===
                                      undefined ? (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {
                                            this.state
                                              .ProductDescriptionTh_popup
                                          }
                                        </Text>
                                      ) : (
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            color: "#163c70",
                                            fontSize: 24,
                                            flex: 1,
                                          }}
                                        >
                                          {this.state.productDescritionTH_edit}
                                        </Text>
                                      )}
                                    </Input>
                                    <Text
                                      style={{
                                        color: "#c0c0c0",
                                        fontSize: 14,
                                        right: 70,
                                      }}
                                    >
                                      100 Charecter
                                    </Text>
                                  </ImageBackground>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  backgroundColor: "#FFFFFF",

                                  shadowColor: "#f6f7fa",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginHorizontal: 15,
                                  paddingBottom: 15,
                                }}
                              >
                                <View style={{ flex: 1 }}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#163c70",

                                        marginHorizontal: 10,
                                      }}
                                    >
                                      Product's Image / รูปสินค้าแก้ไข
                                    </Text>
                                  </View>
                                  {/* เช็ครูปภาพและ  ขนากรูปภาพ 4 MB */}
                                  <View style={{ flexDirection: "row" }}>
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

                                  {this.state.imagefilenameedit != null ? (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        paddingBottom: 10,
                                      }}
                                    >
                                      <View style={{ flex: 0.2 }}>
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
                                      <View style={{ flex: 0.6 }}>
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            fontSize: 20,
                                            color: "#73838f",
                                          }}
                                        >
                                          {this.state.imagefilenameedit}
                                        </Text>
                                      </View>
                                      <TouchableOpacity
                                        style={{ flex: 0.3 }}
                                        onPress={() => {
                                          this.setState({
                                            imagefilenameedit: null,
                                          });
                                        }}
                                      >
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
                                  ) : (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        paddingBottom: 10,
                                      }}
                                    >
                                      <View style={{ flex: 0.2 }}>
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
                                      <View style={{ flex: 0.6 }}>
                                        <Image
                                          source={{
                                            uri: this.state
                                              .ProductPictures_popup,
                                          }}
                                          style={{
                                            width: "100%",
                                            height: 230,
                                            marginBottom: 20,
                                          }}
                                        />
                                      </View>
                                      <TouchableOpacity
                                        style={{ flex: 0.3 }}
                                        onPress={() => {
                                          // alert('edit')
                                          this.imageGalleryLaunchedit();
                                          // this.setState({imagefilename :''})
                                        }}
                                      >
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

                                  {/* {this.state.imagefilename_edit === null && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        
                                        this.imageGalleryLaunchedit();
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
                                          style={{
                                            color: '#FFFFFF',
                                            marginTop: 3,
                                          }}
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
                                  )} */}
                                </View>
                              </View>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}

                  {/*หน้าผุ้เข้าร่วม */}

                  {this.state.Isative === 3 && (
                    <>
                      {this.props.getUser.userDetails.res_result.type === 3 && (
                        <>
                          {this.state.OpenAddcompany === false ? (
                            <View style={{ height: height * 0.3 }}>
                              <View style={{ flex: 1 }}>
                                <View
                                  style={{
                                    marginTop: 25,

                                    height: 84,
                                    justifyContent: "center",
                                    marginHorizontal: 15,
                                    backgroundColor: "#FFFFFF",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,

                                    elevation: 3,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 24,
                                      color: "#a3b4c1",
                                      fontStyle: "italic",
                                      textAlign: "center",
                                      marginHorizontal: 35,
                                    }}
                                  >
                                    ไม่มีข้อมูลบริษัท
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            //  เช็คการเปลี่ยน form  ของการเพิ่ม บริษัท
                            //  เช็ค this.state.Addcompany  === true มั้ยถ้าใช่ก็เปลี่ยน
                            <>
                              {this.state.Addcompany === true ? (
                                <View
                                  style={{ marginTop: 15, marginBottom: 20 }}
                                >
                                  <View style={Styles.viewsearchIDcompany1}>
                                    <View style={Styles.viewsearchIDcompany}>
                                      <Image
                                        style={Styles.viewimgsearchcompany}
                                        source={require("../../image/searchbluex.png")}
                                      />
                                      <TextInput
                                        keyboardType="numeric"
                                        onChangeText={(e) => {
                                          this.setState({
                                            searchTextcompany: e,
                                          });
                                        }}
                                        style={{ fontSize: 18, flex: 1 }}
                                        placeholderTextColor={"#999999"}
                                        placeholder="ค้นหาเลขนิติบุคคล"
                                      />
                                    </View>
                                    <View style={{ flex: 0.3 }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          // alert(this.state.searchText);
                                          this.SearchPersonCorparate({
                                            ID: this.state.searchTextcompany,
                                          });
                                        }}
                                        style={Styles.Tsearchcompany}
                                      >
                                        <Text
                                          style={{
                                            textAlign: "center",
                                            fontSize: 20,
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          ค้นหา
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                  {/* ข้อมูลแต่ละบุคคล */}
                                  <View>
                                    {this.state.FormDatacompany.map(
                                      (item, index) => (
                                        <View style={Styles.viewcompany1}>
                                          <KeyboardAvoidingView style={{}}>
                                            {index === 0 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={Styles.imgbgcompany}
                                                style={Styles.imgbgcompany2}
                                              >
                                                <View
                                                  style={
                                                    Styles.viewininputcompany1
                                                  }
                                                >
                                                  <View
                                                    style={
                                                      Styles.viewininputcompany2
                                                    }
                                                  >
                                                    <Text
                                                      style={
                                                        Styles.texttitlecompany
                                                      }
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={
                                                        Styles.textredcompany
                                                      }
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={
                                                      Styles.inimgbginput
                                                    }
                                                    style={Styles.inimgbginput2}
                                                  >
                                                    <TextInput
                                                      keyboardType="numeric"
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_tel: text,
                                                        });
                                                      }}
                                                      style={
                                                        Styles.textinputcompany
                                                      }
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={
                                                          Styles.textininputcompany
                                                        }
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                            {index === 1 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={Styles.imgbgcompany}
                                                style={Styles.imgbgcompany2}
                                              >
                                                <View
                                                  style={
                                                    Styles.viewininputcompany1
                                                  }
                                                >
                                                  <View
                                                    style={
                                                      Styles.viewininputcompany2
                                                    }
                                                  >
                                                    <Text
                                                      style={
                                                        Styles.texttitlecompany
                                                      }
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={
                                                        Styles.textredcompany
                                                      }
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={
                                                      Styles.inimgbginput
                                                    }
                                                    style={Styles.inimgbginput2}
                                                  >
                                                    <TextInput
                                                      keyboardType="numeric"
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_tel: text,
                                                        });
                                                      }}
                                                      style={
                                                        Styles.textinputcompany
                                                      }
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={
                                                          Styles.textininputcompany
                                                        }
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}

                                            {index === 2 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={Styles.imgbgcompany}
                                                style={Styles.imgbgcompany2}
                                              >
                                                <View
                                                  style={
                                                    Styles.viewininputcompany1
                                                  }
                                                >
                                                  <View
                                                    style={
                                                      Styles.viewininputcompany2
                                                    }
                                                  >
                                                    <Text
                                                      style={
                                                        Styles.texttitlecompany
                                                      }
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={
                                                        Styles.textredcompany
                                                      }
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={
                                                      Styles.inimgbginput
                                                    }
                                                    style={Styles.inimgbginput2}
                                                  >
                                                    <TextInput
                                                      keyboardType="numeric"
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_tel: text,
                                                        });
                                                      }}
                                                      style={
                                                        Styles.textinputcompany
                                                      }
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={
                                                          Styles.textininputcompany
                                                        }
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                          </KeyboardAvoidingView>
                                        </View>
                                      )
                                    )}
                                  </View>

                                  {/* ที่อยู่ติดต่อ */}
                                  <View>
                                    {this.state.FormDatacompanyaddress.map(
                                      (DataItemss, index) => (
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 3,
                                            shadowColor: "#f9fafc",
                                            shadowOffset: {
                                              width: 0,
                                              height: 12,
                                            },
                                            shadowOpacity: 0.58,
                                            shadowRadius: 16.0,

                                            elevation: 24,
                                          }}
                                        >
                                          <KeyboardAvoidingView style={{}}>
                                            {index === 0 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 145,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          AddressTH: text,
                                                        });
                                                      }}
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        flex: 1,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                            {index === 1 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 145,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          AddressEN: text,
                                                        });
                                                      }}
                                                      placeholder={
                                                        DataItemss.Data
                                                      }
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}

                                            {index === 2 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                      // borderWidth: 1,
                                                      borderColor: "red",
                                                    }}
                                                  >
                                                    <RNPickerSelect
                                                      placeholder={{
                                                        label: "เลือกจังหวัด",
                                                        value: 0,
                                                      }}
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
                                                          width: "100%",
                                                        },
                                                      }}
                                                      onValueChange={(
                                                        value,
                                                        index
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
                                                                .state
                                                                .Dataprovices[
                                                                index - 1
                                                              ].ProvinceNameTh,
                                                              getProvinceCode: this
                                                                .state
                                                                .Dataprovices[
                                                                index - 1
                                                              ].ProvinceCode,
                                                            },
                                                            function() {
                                                              this.checkdistrict(
                                                                this.state
                                                                  .Dataprovices[
                                                                  index - 1
                                                                ].ProvinceCode
                                                              );
                                                            }
                                                          );
                                                        }
                                                      }}
                                                      items={this.state.Dataprovices.map(
                                                        (data) => ({
                                                          label:
                                                            I18n.locale === "th"
                                                              ? data.ProvinceNameTh
                                                              : data.ProvinceNameEn,
                                                          value:
                                                            data.ProvinceCode,
                                                          key:
                                                            data.ProvinceCode,
                                                        })
                                                      )}
                                                    >
                                                      <View
                                                        style={{
                                                          // justifyContent: 'center',
                                                          // height: 30,
                                                          // marginHorizontal: 20,

                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <View
                                                          style={{
                                                            // flex: 1,
                                                            // borderColor:'red',
                                                            // borderWidth:1,
                                                            width: "93%",
                                                          }}
                                                        >
                                                          {this.state
                                                            .getProvinceNameTh !=
                                                          null ? (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {
                                                                this.state
                                                                  .getProvinceNameTh
                                                              }
                                                            </Text>
                                                          ) : (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {DataItemss.Data}
                                                            </Text>
                                                          )}
                                                        </View>

                                                        <View
                                                          style={
                                                            {
                                                              // flex: 1,
                                                              // borderWidth:1
                                                            }
                                                          }
                                                        >
                                                          <Icon
                                                            style={{
                                                              color: "#73838f",
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
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                      // borderWidth: 1,
                                                      borderColor: "red",
                                                    }}
                                                  >
                                                    <RNPickerSelect
                                                      placeholder={{
                                                        label: "เลือกอำเภอ",
                                                        value: 0,
                                                      }}
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
                                                          width: "100%",
                                                        },
                                                      }}
                                                      onValueChange={(
                                                        value,
                                                        index
                                                      ) => {
                                                        console.log(index);
                                                        if (index != 0) {
                                                          console.log(value);

                                                          this.setState(
                                                            {
                                                              getDataAmporNameTh: this
                                                                .state
                                                                .getDataAmpor[
                                                                index - 1
                                                              ].DistrictNameTh,
                                                              getDataAmporCode: this
                                                                .state
                                                                .getDataAmpor[
                                                                index - 1
                                                              ].DistrictCode,
                                                            },
                                                            function() {
                                                              this.checksubdistrict(
                                                                this.state
                                                                  .getDataAmpor[
                                                                  index - 1
                                                                ].DistrictCode
                                                              );
                                                            }
                                                          );
                                                        }
                                                      }}
                                                      items={this.state.getDataAmpor.map(
                                                        (data) => ({
                                                          label:
                                                            I18n.locale === "th"
                                                              ? data.DistrictNameTh
                                                              : data.DistrictNameEn,
                                                          value:
                                                            data.DistrictCode,
                                                          key:
                                                            data.DistrictCode,
                                                        })
                                                      )}
                                                    >
                                                      <View
                                                        style={{
                                                          // justifyContent: 'center',
                                                          // height: 30,
                                                          // marginHorizontal: 20,

                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <View
                                                          style={{
                                                            // flex: 1,
                                                            // borderColor:'red',
                                                            // borderWidth:1,
                                                            width: "93%",
                                                          }}
                                                        >
                                                          {this.state
                                                            .getDataAmporNameTh !=
                                                          null ? (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {
                                                                this.state
                                                                  .getDataAmporNameTh
                                                              }
                                                            </Text>
                                                          ) : (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {DataItemss.Data}
                                                            </Text>
                                                          )}
                                                        </View>

                                                        <View
                                                          style={
                                                            {
                                                              // flex: 1,
                                                              // borderWidth:1
                                                            }
                                                          }
                                                        >
                                                          <Icon
                                                            style={{
                                                              color: "#73838f",
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
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                      // borderWidth: 1,
                                                      borderColor: "red",
                                                    }}
                                                  >
                                                    <RNPickerSelect
                                                      placeholder={{
                                                        label: "เลือกตำบล",
                                                        value: 0,
                                                      }}
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
                                                          width: "100%",
                                                        },
                                                      }}
                                                      onValueChange={(
                                                        value,
                                                        index
                                                      ) => {
                                                        console.log(index);
                                                        if (index != 0) {
                                                          console.log(
                                                            this.state
                                                              .getDatatumbur
                                                          );
                                                          console.log(
                                                            this.state
                                                              .getDatatumbur[
                                                              index - 1
                                                            ].SubDistrictCode
                                                          );

                                                          this.setState({
                                                            getDatatumburNameTh: this
                                                              .state
                                                              .getDatatumbur[
                                                              index - 1
                                                            ].SubDistrictNameTh,
                                                            getDatatumburCode: this
                                                              .state
                                                              .getDatatumbur[
                                                              index - 1
                                                            ].SubDistrictCode,
                                                          });
                                                        }
                                                      }}
                                                      items={this.state.getDatatumbur.map(
                                                        (data) => ({
                                                          label:
                                                            I18n.locale === "th"
                                                              ? data.SubDistrictNameTh
                                                              : data.SubDistrictNameEn,
                                                          value:
                                                            data.SubDistrictCode,
                                                          key:
                                                            data.SubDistrictCode,
                                                        })
                                                      )}
                                                    >
                                                      <View
                                                        style={{
                                                          // justifyContent: 'center',
                                                          // height: 30,
                                                          // marginHorizontal: 20,

                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <View
                                                          style={{
                                                            // flex: 1,
                                                            // borderColor:'red',
                                                            // borderWidth:1,
                                                            width: "93%",
                                                          }}
                                                        >
                                                          {this.state
                                                            .getDatatumburNameTh !=
                                                          null ? (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {
                                                                this.state
                                                                  .getDatatumburNameTh
                                                              }
                                                            </Text>
                                                          ) : (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {DataItemss.Data}
                                                            </Text>
                                                          )}
                                                        </View>

                                                        <View
                                                          style={
                                                            {
                                                              // flex: 1,
                                                              // borderWidth:1
                                                            }
                                                          }
                                                        >
                                                          <Icon
                                                            style={{
                                                              color: "#73838f",
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
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_postcode: text,
                                                        });
                                                      }}
                                                      placeholder={
                                                        DataItemss.Data
                                                      }
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {DataItemss.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}

                                            {/* ฟิวประเทศ */}
                                            {index === 6 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {DataItemss.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                      // borderWidth: 1,
                                                      borderColor: "red",
                                                    }}
                                                  >
                                                    <RNPickerSelect
                                                      placeholder={{
                                                        label: "เลือกประเทศ",
                                                        value: 0,
                                                      }}
                                                      useNativeAndroidPickerStyle={
                                                        false
                                                      }
                                                      _fixAndroidTouchableBug_={
                                                        true
                                                      }
                                                      style={{
                                                        ...pickerSelectStyles2,
                                                        inputAndroidContainer: {
                                                          width: "100%",
                                                        },
                                                      }}
                                                      onValueChange={(
                                                        value,
                                                        index
                                                      ) => {
                                                        console.log(index);
                                                        if (index != 0) {
                                                          this.setState({
                                                            getcontryNameTh: this
                                                              .state
                                                              .Datagetcontry[
                                                              index - 1
                                                            ].CountryNameTh,
                                                            getcontryCode: this
                                                              .state
                                                              .Datagetcontry[
                                                              index - 1
                                                            ].CountryId,
                                                          });
                                                        }
                                                      }}
                                                      items={this.state.Datagetcontry.map(
                                                        (data) => ({
                                                          label:
                                                            I18n.locale === "th"
                                                              ? data.CountryNameTh
                                                              : data.CountryNameEn,
                                                          value: data.CountryId,
                                                          key: data.CountryId,
                                                        })
                                                      )}
                                                    >
                                                      <View
                                                        style={{
                                                          // justifyContent: 'center',
                                                          // height: 30,
                                                          // marginHorizontal: 20,

                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <View
                                                          style={{
                                                            // flex: 1,
                                                            // borderColor:'red',
                                                            // borderWidth:1,
                                                            width: "93%",
                                                          }}
                                                        >
                                                          {this.state
                                                            .getcontryNameTh !=
                                                          null ? (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {
                                                                this.state
                                                                  .getcontryNameTh
                                                              }
                                                            </Text>
                                                          ) : (
                                                            <Text
                                                              style={{
                                                                color:
                                                                  "#73838f",
                                                                fontSize: 24,
                                                                marginHorizontal: 15,
                                                              }}
                                                            >
                                                              {DataItemss.Data}
                                                            </Text>
                                                          )}
                                                        </View>

                                                        <View
                                                          style={
                                                            {
                                                              // flex: 1,
                                                              // borderWidth:1
                                                            }
                                                          }
                                                        >
                                                          <Icon
                                                            style={{
                                                              color: "#73838f",
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
                                      )
                                    )}
                                  </View>

                                  {/*  ข้อมูลติดต่อ */}

                                  <View>
                                    {this.state.FormDatacompanycantact.map(
                                      (item, index) => (
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 3,
                                            shadowColor: "#f9fafc",
                                            shadowOffset: {
                                              width: 0,
                                              height: 12,
                                            },
                                            shadowOpacity: 0.58,
                                            shadowRadius: 16.0,

                                            elevation: 24,
                                          }}
                                        >
                                          <KeyboardAvoidingView style={{}}>
                                            {index === 0 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      keyboardType="numeric"
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_tel: text,
                                                        });
                                                      }}
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                            {index === 1 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      keyboardType="numeric"
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_fax: text,
                                                        });
                                                      }}
                                                      placeholder={item.Data}
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                            {index === 2 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_email: text,
                                                        });
                                                      }}
                                                      placeholder={item.Data}
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                            {index === 3 && (
                                              <ImageBackground
                                                source={require("../../image/bgregister.png")}
                                                resizeMode={"stretch"}
                                                imageStyle={{
                                                  width: "100%",
                                                  height: 120,
                                                }}
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  flex: 1,
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row",
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#163c70",
                                                        marginHorizontal: 35,
                                                      }}
                                                    >
                                                      {item.Label}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "red",
                                                        left: -32,
                                                      }}
                                                    >
                                                      *
                                                    </Text>
                                                  </View>
                                                  <ImageBackground
                                                    source={require("../../image/inputedittext.png")}
                                                    resizeMode={"stretch"}
                                                    imageStyle={{
                                                      height: 28,
                                                      width: "100%",
                                                    }}
                                                    style={{
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      marginHorizontal: 35,
                                                    }}
                                                  >
                                                    <TextInput
                                                      onChangeText={(text) => {
                                                        this.setState({
                                                          contact_web: text,
                                                        });
                                                      }}
                                                      placeholder={item.Data}
                                                      style={{
                                                        fontSize: 24,
                                                        color: "#73838f",
                                                        marginHorizontal: 10,
                                                        flex: 1,
                                                        marginTop:
                                                          Platform.OS ===
                                                          "android"
                                                            ? -11
                                                            : 0,
                                                        fontFamily:
                                                          Platform.OS ===
                                                          "android"
                                                            ? "Kittithada Bold 75"
                                                            : "PSL Kittithada Pro",
                                                      }}
                                                    >
                                                      <Text
                                                        numberOfLines={2}
                                                        style={{
                                                          borderWidth: 1,
                                                          color: "#163c70",
                                                          fontSize: 24,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        {item.Data}
                                                      </Text>
                                                    </TextInput>
                                                  </ImageBackground>
                                                </View>
                                              </ImageBackground>
                                            )}
                                          </KeyboardAvoidingView>
                                        </View>
                                      )
                                    )}
                                  </View>
                                </View>
                              ) : (
                                <View style={{ marginTop: 15 }}>
                                  <View style={Styles.viewsearchIDcompany1}>
                                    <View style={Styles.viewsearchIDcompany}>
                                      <Image
                                        style={Styles.viewimgsearchcompany}
                                        source={require("../../image/searchbluex.png")}
                                      />
                                      <TextInput
                                        keyboardType="numeric"
                                        onChangeText={(e) => {
                                          this.setState({
                                            searchTextcompany: e,
                                          });
                                        }}
                                        style={{ fontSize: 18, flex: 1 }}
                                        placeholderTextColor={"#999999"}
                                        placeholder="ค้นหาเลขนิติบุคคล"
                                      />
                                    </View>
                                    <View style={{ flex: 0.3 }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          // alert(this.state.searchText);
                                          this.SearchPersonCorparate({
                                            ID: this.state.searchTextcompany,
                                          });
                                        }}
                                        style={Styles.Tsearchcompany}
                                      >
                                        <Text
                                          style={{
                                            textAlign: "center",
                                            fontSize: 20,
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          ค้นหา
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>

                                  {/* เพิ่มข้อมูลด้วยตัวเองตรงนี้ */}
                                  <View
                                    style={[
                                      Styles.viewcompany1,
                                      { marginBottom: 20 },
                                    ]}
                                  >
                                    <KeyboardAvoidingView style={{}}>
                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"เลขทะเบียนนิติบุคคล"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              keyboardType="numeric"
                                              onChangeText={(text) => {
                                                this.setState({
                                                  IDcardcompany: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"บริษัท/กิจการ (ไทย)"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  namecompanyTH: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"บริษัท/กิจการ (อังกฤษ)"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  namecompanyEN: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>
                                    </KeyboardAvoidingView>
                                    {/* ที่อยู่ติดต่อ */}
                                    <KeyboardAvoidingView style={{}}>
                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 145,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"ที่อยู่ (ไทย)"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                            }}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  companyAddressTH: text,
                                                });
                                              }}
                                              style={{
                                                fontSize: 24,
                                                color: "#73838f",
                                                marginHorizontal: 10,
                                                marginTop:
                                                  Platform.OS === "android"
                                                    ? -11
                                                    : 0,
                                                flex: 1,
                                                fontFamily:
                                                  Platform.OS === "android"
                                                    ? "Kittithada Bold 75"
                                                    : "PSL Kittithada Pro",
                                              }}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={{
                                                  borderWidth: 1,
                                                  color: "#163c70",
                                                  fontSize: 24,
                                                  flex: 1,
                                                }}
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>
                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 145,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"ที่อยู่ (อังกฤษ)"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                            }}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  companyAddressEN: text,
                                                });
                                              }}
                                              style={{
                                                fontSize: 24,
                                                color: "#73838f",
                                                marginHorizontal: 10,
                                                marginTop:
                                                  Platform.OS === "android"
                                                    ? -11
                                                    : 0,
                                                flex: 1,
                                                fontFamily:
                                                  Platform.OS === "android"
                                                    ? "Kittithada Bold 75"
                                                    : "PSL Kittithada Pro",
                                              }}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={{
                                                  borderWidth: 1,
                                                  color: "#163c70",
                                                  fontSize: 24,
                                                  flex: 1,
                                                }}
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 120,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"จังหวัด"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                              // borderWidth: 1,
                                              borderColor: "red",
                                            }}
                                          >
                                            <RNPickerSelect
                                              placeholder={{
                                                label: "เลือกจังหวัด",
                                                value: 0,
                                              }}
                                              // enabled={this.state.enabled}

                                              useNativeAndroidPickerStyle={
                                                false
                                              }
                                              _fixAndroidTouchableBug_={true}
                                              style={{
                                                ...pickerSelectStyles2,
                                                inputAndroidContainer: {
                                                  width: "100%",
                                                },
                                              }}
                                              onValueChange={(value, index) => {
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
                                                      getProvinceNameThcompany: this
                                                        .state.Dataprovices[
                                                        index - 1
                                                      ].ProvinceNameTh,
                                                      getProvinceCodecompany: this
                                                        .state.Dataprovices[
                                                        index - 1
                                                      ].ProvinceCode,
                                                    },
                                                    function() {
                                                      this.checkdistrict(
                                                        this.state.Dataprovices[
                                                          index - 1
                                                        ].ProvinceCode
                                                      );
                                                    }
                                                  );
                                                }
                                              }}
                                              items={this.state.Dataprovices.map(
                                                (data) => ({
                                                  label:
                                                    I18n.locale === "th"
                                                      ? data.ProvinceNameTh
                                                      : data.ProvinceNameEn,
                                                  value: data.ProvinceCode,
                                                  key: data.ProvinceCode,
                                                })
                                              )}
                                            >
                                              <View
                                                style={{
                                                  // justifyContent: 'center',
                                                  // height: 30,
                                                  // marginHorizontal: 20,

                                                  flexDirection: "row",
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    // flex: 1,
                                                    // borderColor:'red',
                                                    // borderWidth:1,
                                                    width: "93%",
                                                  }}
                                                >
                                                  {this.state
                                                    .getProvinceNameThcompany !=
                                                  null ? (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {
                                                        this.state
                                                          .getProvinceNameThcompany
                                                      }
                                                    </Text>
                                                  ) : (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {"เลือกจังหวัด"}
                                                    </Text>
                                                  )}
                                                </View>

                                                <View
                                                  style={
                                                    {
                                                      // flex: 1,
                                                      // borderWidth:1
                                                    }
                                                  }
                                                >
                                                  <Icon
                                                    style={{
                                                      color: "#73838f",
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

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 120,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"อำเภอ"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                              // borderWidth: 1,
                                              borderColor: "red",
                                            }}
                                          >
                                            <RNPickerSelect
                                              placeholder={{
                                                label: "เลือกอำเภอ",
                                                value: 0,
                                              }}
                                              // disabled={this.state.enabled}
                                              useNativeAndroidPickerStyle={
                                                false
                                              }
                                              _fixAndroidTouchableBug_={true}
                                              style={{
                                                ...pickerSelectStyles2,
                                                inputAndroidContainer: {
                                                  width: "100%",
                                                },
                                              }}
                                              onValueChange={(value, index) => {
                                                console.log(index);
                                                if (index != 0) {
                                                  console.log(value);

                                                  this.setState(
                                                    {
                                                      getDataAmporNameThcompany: this
                                                        .state.getDataAmpor[
                                                        index - 1
                                                      ].DistrictNameTh,
                                                      getDataAmporCodecompany: this
                                                        .state.getDataAmpor[
                                                        index - 1
                                                      ].DistrictCode,
                                                    },
                                                    function() {
                                                      this.checksubdistrict(
                                                        this.state.getDataAmpor[
                                                          index - 1
                                                        ].DistrictCode
                                                      );
                                                    }
                                                  );
                                                }
                                              }}
                                              items={this.state.getDataAmpor.map(
                                                (data) => ({
                                                  label:
                                                    I18n.locale === "th"
                                                      ? data.DistrictNameTh
                                                      : data.DistrictNameEn,
                                                  value: data.DistrictCode,
                                                  key: data.DistrictCode,
                                                })
                                              )}
                                            >
                                              <View
                                                style={{
                                                  // justifyContent: 'center',
                                                  // height: 30,
                                                  // marginHorizontal: 20,

                                                  flexDirection: "row",
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    // flex: 1,
                                                    // borderColor:'red',
                                                    // borderWidth:1,
                                                    width: "93%",
                                                  }}
                                                >
                                                  {this.state
                                                    .getDataAmporNameThcompany !=
                                                  null ? (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {
                                                        this.state
                                                          .getDataAmporNameThcompany
                                                      }
                                                    </Text>
                                                  ) : (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {"เลือกอำเภอ"}
                                                    </Text>
                                                  )}
                                                </View>

                                                <View
                                                  style={
                                                    {
                                                      // flex: 1,
                                                      // borderWidth:1
                                                    }
                                                  }
                                                >
                                                  <Icon
                                                    style={{
                                                      color: "#73838f",
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

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 120,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"ตำบล"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                              // borderWidth: 1,
                                              borderColor: "red",
                                            }}
                                          >
                                            <RNPickerSelect
                                              placeholder={{
                                                label: "เลือกตำบล",
                                                value: 0,
                                              }}
                                              // disabled={this.state.enabled}
                                              useNativeAndroidPickerStyle={
                                                false
                                              }
                                              _fixAndroidTouchableBug_={true}
                                              style={{
                                                ...pickerSelectStyles2,
                                                inputAndroidContainer: {
                                                  width: "100%",
                                                },
                                              }}
                                              onValueChange={(value, index) => {
                                                console.log(index);
                                                if (index != 0) {
                                                  console.log(
                                                    this.state.getDatatumbur
                                                  );
                                                  console.log(
                                                    this.state.getDatatumbur[
                                                      index - 1
                                                    ].SubDistrictCode
                                                  );

                                                  this.setState({
                                                    getDatatumburNameThcompany: this
                                                      .state.getDatatumbur[
                                                      index - 1
                                                    ].SubDistrictNameTh,
                                                    getDatatumburCodecompany: this
                                                      .state.getDatatumbur[
                                                      index - 1
                                                    ].SubDistrictCode,
                                                  });
                                                }
                                              }}
                                              items={this.state.getDatatumbur.map(
                                                (data) => ({
                                                  label:
                                                    I18n.locale === "th"
                                                      ? data.SubDistrictNameTh
                                                      : data.SubDistrictNameEn,
                                                  value: data.SubDistrictCode,
                                                  key: data.SubDistrictCode,
                                                })
                                              )}
                                            >
                                              <View
                                                style={{
                                                  // justifyContent: 'center',
                                                  // height: 30,
                                                  // marginHorizontal: 20,

                                                  flexDirection: "row",
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    // flex: 1,
                                                    // borderColor:'red',
                                                    // borderWidth:1,
                                                    width: "93%",
                                                  }}
                                                >
                                                  {this.state
                                                    .getDatatumburNameThcompany !=
                                                  null ? (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {
                                                        this.state
                                                          .getDatatumburNameThcompany
                                                      }
                                                    </Text>
                                                  ) : (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                       {"เลือกตำบล"}
                                                    </Text>
                                                  )}
                                                </View>

                                                <View
                                                  style={
                                                    {
                                                      // flex: 1,
                                                      // borderWidth:1
                                                    }
                                                  }
                                                >
                                                  <Icon
                                                    style={{
                                                      color: "#73838f",
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

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 145,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"รหัสไปรษณีย์"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                            }}
                                          >
                                            <TextInput
                                              keyboardType="numeric"
                                              onChangeText={(text) => {
                                                this.setState({
                                                  postmancodecompany: text,
                                                });
                                              }}
                                              style={{
                                                fontSize: 24,
                                                color: "#73838f",
                                                marginHorizontal: 10,
                                                marginTop:
                                                  Platform.OS === "android"
                                                    ? -11
                                                    : 0,
                                                flex: 1,
                                                fontFamily:
                                                  Platform.OS === "android"
                                                    ? "Kittithada Bold 75"
                                                    : "PSL Kittithada Pro",
                                              }}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={{
                                                  borderWidth: 1,
                                                  color: "#163c70",
                                                  fontSize: 24,
                                                  flex: 1,
                                                }}
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={{
                                          width: "100%",
                                          height: 120,
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 1,
                                            marginTop: 20,
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",
                                                marginHorizontal: 35,
                                              }}
                                            >
                                              {"ประเทศ"}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                                left: -32,
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 35,
                                              // borderWidth: 1,
                                              borderColor: "red",
                                            }}
                                          >
                                            <RNPickerSelect
                                              placeholder={{
                                                label: "เลือกประเทศ",
                                                value: 0,
                                              }}
                                              // enabled={this.state.enabled}

                                              useNativeAndroidPickerStyle={
                                                false
                                              }
                                              _fixAndroidTouchableBug_={true}
                                              style={{
                                                ...pickerSelectStyles2,
                                                inputAndroidContainer: {
                                                  width: "100%",
                                                },
                                              }}
                                              //uuuuuuuuuuuuuu

                                              onValueChange={(value, index) => {
                                                // console.log(index);
                                                if (index != 0) {
                                                  this.setState({
                                                    getcontryNameTh_membercompany: this
                                                      .state.Datagetcontry[
                                                      index - 1
                                                    ].CountryNameTh,
                                                    getcontryCode_membercompany: this
                                                      .state.Datagetcontry[
                                                      index - 1
                                                    ].CountryId,
                                                  });
                                                }
                                              }}
                                              items={this.state.Datagetcontry.map(
                                                (data) => ({
                                                  label:
                                                    I18n.locale === "th"
                                                      ? data.CountryNameTh
                                                      : data.CountryNameEn,
                                                  value: data.CountryId,
                                                  key: data.CountryId,
                                                })
                                              )}
                                            >
                                              <View
                                                style={{
                                                  // justifyContent: 'center',
                                                  // height: 30,
                                                  // marginHorizontal: 20,

                                                  flexDirection: "row",
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    // flex: 1,
                                                    // borderColor:'red',
                                                    // borderWidth:1,
                                                    width: "93%",
                                                  }}
                                                >
                                                  {this.state
                                                    .getcontryNameTh_membercompany !=
                                                  null ? (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {
                                                        this.state
                                                          .getcontryNameTh_membercompany
                                                      }
                                                    </Text>
                                                  ) : (
                                                    <Text
                                                      style={{
                                                        color: "#73838f",
                                                        fontSize: 24,
                                                        marginHorizontal: 15,
                                                      }}
                                                    >
                                                      {"ประเทศ"}
                                                    </Text>
                                                  )}
                                                </View>

                                                <View
                                                  style={
                                                    {
                                                      // flex: 1,
                                                      // borderWidth:1
                                                    }
                                                  }
                                                >
                                                  <Icon
                                                    style={{
                                                      color: "#73838f",
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
                                    </KeyboardAvoidingView>

                                    <KeyboardAvoidingView style={{}}>
                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"เบอร์โทรศัพท์"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              keyboardType="numeric"
                                              onChangeText={(text) => {
                                                this.setState({
                                                  telcompany: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"เบอร์โทรสาร"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              keyboardType="numeric"
                                              onChangeText={(text) => {
                                                this.setState({
                                                  telcompanypublic: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"อีเมล"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  emailcompany: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>
                                      <ImageBackground
                                        source={require("../../image/bgregister.png")}
                                        resizeMode={"stretch"}
                                        imageStyle={Styles.imgbgcompany}
                                        style={Styles.imgbgcompany2}
                                      >
                                        <View
                                          style={Styles.viewininputcompany1}
                                        >
                                          <View
                                            style={Styles.viewininputcompany2}
                                          >
                                            <Text
                                              style={Styles.texttitlecompany}
                                            >
                                              {"เว็บไซต์"}
                                            </Text>
                                            <Text style={Styles.textredcompany}>
                                              *
                                            </Text>
                                          </View>
                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={Styles.inimgbginput}
                                            style={Styles.inimgbginput2}
                                          >
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  websitecompany: text,
                                                });
                                              }}
                                              style={Styles.textinputcompany}
                                            >
                                              <Text
                                                numberOfLines={2}
                                                style={
                                                  Styles.textininputcompany
                                                }
                                              >
                                                {""}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </ImageBackground>
                                    </KeyboardAvoidingView>
                                  </View>
                                </View>
                              )}
                            </>
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
                                  <View style={{ height: height * 0.4 }}>
                                    <View style={{ flex: 1 }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.setState({
                                            popupparticipant: true,
                                            // datamemberSearch1:[]
                                          });
                                        }}
                                        style={{
                                          borderWidth: 1,
                                          marginHorizontal: 15,
                                          height: 30,
                                          borderRadius: 18,
                                          borderColor: "#999999",
                                          marginTop: 10,
                                          flexDirection: "row",
                                        }}
                                      >
                                        <Image
                                          style={{
                                            width: 23,
                                            height: 23,
                                            marginTop: 4,
                                            marginHorizontal: 9,
                                          }}
                                          source={require("../../image/searchbluex.png")}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: "#3c3c3c",
                                            marginTop: 3,
                                          }}
                                        >
                                          {I18n.t(
                                            "transalte_Search_contact_history"
                                          )}
                                        </Text>
                                      </TouchableOpacity>
                                      <View
                                        style={{
                                          marginTop: 25,

                                          height: 84,
                                          justifyContent: "center",
                                          marginHorizontal: 15,
                                          backgroundColor: "#FFFFFF",
                                          shadowColor: "#000",
                                          shadowOffset: {
                                            width: 0,
                                            height: 1,
                                          },
                                          shadowOpacity: 0.22,
                                          shadowRadius: 2.22,

                                          elevation: 3,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 24,
                                            color: "#a3b4c1",
                                            fontStyle: "italic",
                                            textAlign: "center",
                                            marginHorizontal: 35,
                                          }}
                                        >
                                          ไม่มีข้อมูลผู้เข้ากิจกรรม
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              ) : (
                                <View>
                                  {this.state.Deletemember === false ? (
                                    <View style={{ marginTop: 8 }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          if (
                                            this.state.ckdatamemberSearch1 ===
                                            true
                                          ) {
                                            this.setState({
                                              popupparticipant: true,
                                              // datamemberSearch1:[]
                                              // IDmember_cid: [],
                                              ckdatamemberSearch1: true,
                                            });
                                          } else {
                                            this.setState({
                                              popupparticipant: true,
                                              // datamemberSearch1:[]
                                              // IDmember_cid: [],
                                              ckdatamemberSearch1: true,
                                            });

                                            this._getDataparticipant_search();
                                          }
                                        }}
                                        style={{
                                          borderWidth: 1,
                                          marginHorizontal: 15,
                                          height: 30,
                                          borderRadius: 18,
                                          borderColor: "#999999",

                                          flexDirection: "row",
                                        }}
                                      >
                                        <Image
                                          style={{
                                            width: 23,
                                            height: 23,
                                            marginTop: 4,
                                            marginHorizontal: 9,
                                          }}
                                          source={require("../../image/searchbluex.png")}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: "#3c3c3c",
                                            marginTop: 3,
                                          }}
                                        >
                                           
                                          {I18n.t(
                                            "transalte_Search_contact_history"
                                          )}
                                        </Text>
                                      </TouchableOpacity>
                                      {/* แสดงรายชื่อ เข้าร่วมกิจกรรม */}
                                      <FlatList
                                        style={{
                                          marginBottom: 20,
                                          marginTop: 10,
                                        }}
                                        data={this.state.datamember}
                                        renderItem={this.Listmember}
                                        keyExtractor={(item) => item.id}
                                      />
                                    </View>
                                  ) : (
                                    <View>
                                      <FlatList
                                        style={{
                                          marginBottom: 20,
                                          marginTop: 10,
                                        }}
                                        data={this.state.datamember}
                                        renderItem={this.ListmemberDelete}
                                        keyExtractor={(item) => item.id}
                                      />
                                      <View
                                        style={{
                                          flexDirection: "row",

                                          marginBottom: 10,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flex: 0.5,
                                            flexDirection: "row",
                                          }}
                                        >
                                          <Text> </Text>
                                        </View>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              )}
                            </View>
                          ) : (
                            //IDtype เช็คหน้า 1 ไทย กับ  2 อังกฤษ
                            <View>
                              {this.state.IDtype === "1" ? (
                                <View>
                                  <View
                                    style={{ marginTop: 15, marginBottom: 15 }}
                                  >
                                    <View style={{ flex: 1, marginTop: 1 }}>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                          backgroundColor: "#FFFFFF",

                                          shadowColor: "#f6f7fa",
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
                                        }}
                                      >
                                        <View
                                          style={{ flex: 1, marginTop: 15 }}
                                        >
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",

                                                marginHorizontal: 10,
                                              }}
                                            >
                                              คำนำหน้าชื่อ
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 10,
                                            }}
                                          />
                                          <RNPickerSelect
                                            placeholder={""}
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) =>
                                              this.setState({
                                                titlename: value,
                                                indextitlevalue: index,
                                              })
                                            }
                                            items={[
                                              { label: "นาย", value: "นาย" },
                                              { label: "นาง", value: "นาง" },
                                              {
                                                label: "นางสาว",
                                                value: "นางสาว",
                                              },
                                            ]}
                                          >
                                            <View
                                              style={{
                                                justifyContent: "center",
                                                height: 30,
                                                marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  flex: 1,
                                                  justifyContent: "center",
                                                }}
                                              >
                                                {this.state.titlename ===
                                                undefined ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                    }}
                                                  >
                                                    {"เลือกคำนำหน้า"}
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                    }}
                                                  >
                                                    {this.state.titlename}
                                                  </Text>
                                                )}
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,

                                                  alignItems: "flex-end",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <Icon
                                                  style={{ color: "#73838f" }}
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
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                        backgroundColor: "#FFFFFF",

                                        shadowColor: "#f6f7fa",
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
                                      }}
                                    >
                                      <View style={{ flex: 1, marginTop: 15 }}>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            ชื่อ
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                            onChangeText={(text) => {
                                              this.setState({
                                                namemember_TH: text,
                                              });
                                            }}
                                          >
                                            <Text>
                                              {this.state.namemember_TH}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            นามสกุล
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                lastnamemember_TH: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.lastnamemember_TH}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Name
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                namemember_EN: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.namemember_EN}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Surname
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                lastnamemember_EN: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.lastnamemember_EN}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            อาชีพ
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({ major: text });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          />
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Corporate
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                centername: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>{this.state.centername}</Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            ตำแหน่ง
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                            onChangeText={(text) => {
                                              this.setState({
                                                PositionTH: text,
                                              });
                                            }}
                                          >
                                            <Text>{this.state.PositionTH}</Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Position
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                positionname: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.positionname}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            ประเทศ
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <RNPickerSelect
                                            mode="dropdown"
                                            placeholder={
                                              //   {
                                              //   label: 'เลือกประเทศ',
                                              //   value: 0,
                                              // }
                                              ""
                                            }
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) => {
                                              // console.log(index);
                                              if (index != 0) {
                                                this.setState({
                                                  getcontryNameTh_member: this
                                                    .state.Datagetcontry[
                                                    index - 1
                                                  ].CountryNameTh,
                                                  getcontryCode_member: this
                                                    .state.Datagetcontry[
                                                    index - 1
                                                  ].CountryId,
                                                });
                                              }
                                            }}
                                            items={this.state.Datagetcontry.map(
                                              (data) => ({
                                                label:
                                                  I18n.locale === "th"
                                                    ? data.CountryNameTh
                                                    : data.CountryNameEn,
                                                value: data.CountryId,
                                                key: data.CountryId,
                                              })
                                            )}
                                          >
                                            <View
                                              style={{
                                                // justifyContent: 'center',
                                                // height: 30,
                                                // marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  // flex: 1,
                                                  // borderColor:'red',
                                                  // borderWidth:1,
                                                  width: "93%",
                                                }}
                                              >
                                                {this.state
                                                  .getcontryNameTh_member !=
                                                null ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {
                                                      this.state
                                                        .getcontryNameTh_member
                                                    }
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {/* {this.checkContry(item.Data)} */}
                                                    {"เลือกประเทศ"}
                                                  </Text>
                                                )}
                                              </View>

                                              <View
                                                style={
                                                  {
                                                    // flex: 1,
                                                    // borderWidth:1
                                                  }
                                                }
                                              >
                                                <Icon
                                                  style={{
                                                    color: "#73838f",
                                                    marginTop: 6,
                                                  }}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </ImageBackground>

                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            รหัสไปรษณีย์
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                postmancode: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.postmancode}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            จังหวัด
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <RNPickerSelect
                                            mode="dropdown"
                                            placeholder={
                                              //   {
                                              //   label: 'เลือกประเทศ',
                                              //   value: 0,
                                              // }
                                              ""
                                            }
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) => {
                                              // console.log(index);
                                              if (index != 0) {
                                                console.log(
                                                  this.state.Dataprovices[
                                                    index - 1
                                                  ].ProvinceCode
                                                );

                                                this.setState(
                                                  {
                                                    enabled: false,
                                                    getProvinceNameTh_addmember: this
                                                      .state.Dataprovices[
                                                      index - 1
                                                    ].ProvinceNameTh,
                                                    getProvinceCode_addmember: this
                                                      .state.Dataprovices[
                                                      index - 1
                                                    ].ProvinceCode,
                                                  },
                                                  function() {
                                                    this.checkdistrict(
                                                      this.state.Dataprovices[
                                                        index - 1
                                                      ].ProvinceCode
                                                    );
                                                  }
                                                );
                                              }
                                            }}
                                            items={this.state.Dataprovices.map(
                                              (data) => ({
                                                label:
                                                  I18n.locale === "th"
                                                    ? data.ProvinceNameTh
                                                    : data.ProvinceNameEn,
                                                value: data.ProvinceCode,
                                                key: data.ProvinceCode,
                                              })
                                            )}
                                          >
                                            <View
                                              style={{
                                                // justifyContent: 'center',
                                                // height: 30,
                                                // marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  // flex: 1,
                                                  // borderColor:'red',
                                                  // borderWidth:1,
                                                  width: "93%",
                                                }}
                                              >
                                                {this.state
                                                  .getProvinceNameTh_addmember !=
                                                null ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {
                                                      this.state
                                                        .getProvinceNameTh_addmember
                                                    }
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {/* {this.checkContry(item.Data)} */}
                                                    {"เลือกจังหวัด"}
                                                  </Text>
                                                )}
                                              </View>

                                              <View
                                                style={
                                                  {
                                                    // flex: 1,
                                                    // borderWidth:1
                                                  }
                                                }
                                              >
                                                <Icon
                                                  style={{
                                                    color: "#73838f",
                                                    marginTop: 6,
                                                  }}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            อำเภอ/เขต
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <RNPickerSelect
                                            mode="dropdown"
                                            placeholder={
                                              //   {
                                              //   label: 'เลือกประเทศ',
                                              //   value: 0,
                                              // }
                                              ""
                                            }
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) => {
                                              // console.log(index);
                                              if (index != 0) {
                                                // console.log(value);

                                                this.setState(
                                                  {
                                                    getDataAmporNameTh_addmember: this
                                                      .state.getDataAmpor[
                                                      index - 1
                                                    ].DistrictNameTh,
                                                    getDataAmporCode_addmember: this
                                                      .state.getDataAmpor[
                                                      index - 1
                                                    ].DistrictCode,
                                                  },
                                                  function() {
                                                    this.checksubdistrict(
                                                      this.state.getDataAmpor[
                                                        index - 1
                                                      ].DistrictCode
                                                    );
                                                  }
                                                );
                                              }
                                            }}
                                            items={this.state.getDataAmpor.map(
                                              (data) => ({
                                                label:
                                                  I18n.locale === "th"
                                                    ? data.DistrictNameTh
                                                    : data.DistrictNameEn,
                                                value: data.DistrictCode,
                                                key: data.DistrictCode,
                                              })
                                            )}
                                          >
                                            <View
                                              style={{
                                                // justifyContent: 'center',
                                                // height: 30,
                                                // marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  // flex: 1,
                                                  // borderColor:'red',
                                                  // borderWidth:1,
                                                  width: "93%",
                                                }}
                                              >
                                                {this.state
                                                  .getDataAmporNameTh_addmember !=
                                                null ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {
                                                      this.state
                                                        .getDataAmporNameTh_addmember
                                                    }
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {/* {this.checkContry(item.Data)} */}

                                                    {"เลือกอำเภอ"}
                                                  </Text>
                                                )}
                                              </View>

                                              <View
                                                style={
                                                  {
                                                    // flex: 1,
                                                    // borderWidth:1
                                                  }
                                                }
                                              >
                                                <Icon
                                                  style={{
                                                    color: "#73838f",
                                                    marginTop: 6,
                                                  }}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            ตำบล/แขวง
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <RNPickerSelect
                                            mode="dropdown"
                                            placeholder={
                                              //   {
                                              //   label: 'เลือกประเทศ',
                                              //   value: 0,
                                              // }
                                              ""
                                            }
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) => {
                                              // console.log(index);
                                              if (index != 0) {
                                                // this.state.getDatatumbur[index - 1].ProvinceNameTh,
                                                //   this.state.getDatatumbur[index - 1].ProvinceCode,
                                                this.setState({
                                                  getDatatumburNameTh_addmember: this
                                                    .state.getDatatumbur[
                                                    index - 1
                                                  ].SubDistrictNameTh,
                                                  getDatatumburCode_addmember: this
                                                    .state.getDatatumbur[
                                                    index - 1
                                                  ].SubDistrictCode,
                                                });
                                              }
                                            }}
                                            items={this.state.getDatatumbur.map(
                                              (data) => ({
                                                label:
                                                  I18n.locale === "th"
                                                    ? data.SubDistrictNameTh
                                                    : data.SubDistrictNameEn,
                                                value: data.SubDistrictCode,
                                                key: data.SubDistrictCode,
                                              })
                                            )}
                                          >
                                            <View
                                              style={{
                                                // justifyContent: 'center',
                                                // height: 30,
                                                // marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  // flex: 1,
                                                  // borderColor:'red',
                                                  // borderWidth:1,
                                                  width: "93%",
                                                }}
                                              >
                                                {this.state
                                                  .getDatatumburNameTh_addmember !=
                                                null ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {
                                                      this.state
                                                        .getDatatumburNameTh_addmember
                                                    }
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {/* {this.checkContry(item.Data)} */}
                                                    {"เลือกตำบล"}
                                                  </Text>
                                                )}
                                              </View>

                                              <View
                                                style={
                                                  {
                                                    // flex: 1,
                                                    // borderWidth:1
                                                  }
                                                }
                                              >
                                                <Icon
                                                  style={{
                                                    color: "#73838f",
                                                    marginTop: 6,
                                                  }}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            ที่อยู่ติดต่อ
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                address_member: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.address_member}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            อีเมล
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                email_member: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.email_member}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>

                                        <View style={{ flex: 1 }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            หมายเลขโทรศัพท์
                                          </Text>

                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 10,
                                            }}
                                          >
                                            <TouchableOpacity
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
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
                                                onSelect={(iii) => {
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
                                                  top:
                                                    Platform.OS === "ios"
                                                      ? 1
                                                      : 3,
                                                }}
                                                source={require("../../image/arrowtitle.png")}
                                              />
                                            </TouchableOpacity>
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  phone_member: text,
                                                });
                                              }}
                                              style={{
                                                fontSize: 24,
                                                color: "#73838f",
                                                marginHorizontal: 25,
                                                marginTop: 0,
                                                width: width * 0.4,
                                                marginTop: 0,

                                                right: 25,
                                              }}
                                            >
                                              <Text>
                                                {this.state.phone_member}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              ) : (
                                <View>
                                  <View
                                    style={{ marginTop: 15, marginBottom: 15 }}
                                  >
                                    <View style={{ flex: 1, marginTop: 1 }}>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          flex: 1,
                                          backgroundColor: "#FFFFFF",

                                          shadowColor: "#f6f7fa",
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
                                        }}
                                      >
                                        <View
                                          style={{ flex: 1, marginTop: 15 }}
                                        >
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#163c70",

                                                marginHorizontal: 10,
                                              }}
                                            >
                                              Title
                                            </Text>
                                            <Text
                                              style={{
                                                color: "red",
                                              }}
                                            >
                                              *
                                            </Text>
                                          </View>

                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 10,
                                            }}
                                          />
                                          <RNPickerSelect
                                            placeholder={""}
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) =>
                                              this.setState({
                                                titlename: value,
                                                indextitlevalue: index,
                                              })
                                            }
                                            items={[
                                              {
                                                label: "นาย [Mr.]",
                                                value: "นาย [Mr.]",
                                              },
                                              {
                                                label: "นาง [Mrs.]",
                                                value: "นาง [Mrs.]",
                                              },
                                              {
                                                label: "นางสาว [Miss]",
                                                value: "นางสาว [Miss]",
                                              },
                                              {
                                                label: "คุณ [KHUN]]",
                                                value: "คุณ [KHUN]",
                                              },
                                            ]}
                                          >
                                            <View
                                              style={{
                                                justifyContent: "center",
                                                height: 30,
                                                marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  flex: 1,
                                                  justifyContent: "center",
                                                }}
                                              >
                                                {this.state.titlename ===
                                                undefined ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                    }}
                                                  >
                                                    {"Select your title"}
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                    }}
                                                  >
                                                    {this.state.titlename}
                                                  </Text>
                                                )}
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,

                                                  alignItems: "flex-end",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <Icon
                                                  style={{ color: "#73838f" }}
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
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                        backgroundColor: "#FFFFFF",

                                        shadowColor: "#f6f7fa",
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
                                      }}
                                    >
                                      <View style={{ flex: 1, marginTop: 15 }}>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Name
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                namemember_EN: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.namemember_EN}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Surname
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                lastnamemember_EN: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.lastnamemember_EN}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>

                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Corporate
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                centername: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>{this.state.centername}</Text>
                                          </TextInput>
                                        </ImageBackground>

                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Position
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                positionname: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.positionname}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>

                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Address
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                address_member: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.address_member}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            country
                                          </Text>
                                          <Text
                                            style={{
                                              color: "red",
                                            }}
                                          >
                                            *
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <RNPickerSelect
                                            mode="dropdown"
                                            placeholder={
                                              //   {
                                              //   label: 'เลือกประเทศ',
                                              //   value: 0,
                                              // }
                                              ""
                                            }
                                            useNativeAndroidPickerStyle={false}
                                            _fixAndroidTouchableBug_={true}
                                            style={{
                                              ...pickerSelectStyles2,
                                              inputAndroidContainer: {
                                                width: "100%",
                                              },
                                            }}
                                            onValueChange={(value, index) => {
                                              // console.log(index);
                                              if (index != 0) {
                                                this.setState({
                                                  getcontryNameTh_member: this
                                                    .state.Datagetcontry[
                                                    index - 1
                                                  ].CountryNameTh,
                                                  getcontryCode_member: this
                                                    .state.Datagetcontry[
                                                    index - 1
                                                  ].CountryId,
                                                });
                                              }
                                            }}
                                            items={this.state.Datagetcontry.map(
                                              (data) => ({
                                                label:
                                                  I18n.locale === "th"
                                                    ? data.CountryNameTh
                                                    : data.CountryNameEn,
                                                value: data.CountryId,
                                                key: data.CountryId,
                                              })
                                            )}
                                          >
                                            <View
                                              style={{
                                                // justifyContent: 'center',
                                                // height: 30,
                                                // marginHorizontal: 20,

                                                flexDirection: "row",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  // flex: 1,
                                                  // borderColor:'red',
                                                  // borderWidth:1,
                                                  width: "93%",
                                                }}
                                              >
                                                {this.state
                                                  .getcontryNameTh_member !=
                                                null ? (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {
                                                      this.state
                                                        .getcontryNameTh_member
                                                    }
                                                  </Text>
                                                ) : (
                                                  <Text
                                                    style={{
                                                      color: "#73838f",
                                                      fontSize: 24,
                                                      marginHorizontal: 15,
                                                    }}
                                                  >
                                                    {/* {this.checkContry(item.Data)} */}
                                                    {"select country"}
                                                  </Text>
                                                )}
                                              </View>

                                              <View
                                                style={
                                                  {
                                                    // flex: 1,
                                                    // borderWidth:1
                                                  }
                                                }
                                              >
                                                <Icon
                                                  style={{
                                                    color: "#73838f",
                                                    marginTop: 6,
                                                  }}
                                                  name="keyboard-arrow-down"
                                                  size={16}
                                                />
                                              </View>
                                            </View>
                                          </RNPickerSelect>
                                        </ImageBackground>

                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Email
                                          </Text>
                                        </View>

                                        <ImageBackground
                                          source={require("../../image/inputedittext.png")}
                                          resizeMode={"stretch"}
                                          imageStyle={{
                                            height: 28,
                                            width: "100%",
                                          }}
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                          }}
                                        >
                                          <TextInput
                                            onChangeText={(text) => {
                                              this.setState({
                                                email_member: text,
                                              });
                                            }}
                                            style={{
                                              fontSize: 24,
                                              color: "#73838f",
                                              marginHorizontal: 10,
                                              flex: 1,
                                            }}
                                          >
                                            <Text>
                                              {this.state.email_member}
                                            </Text>
                                          </TextInput>
                                        </ImageBackground>

                                        <View style={{ flex: 1 }}>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#163c70",

                                              marginHorizontal: 10,
                                            }}
                                          >
                                            Phone Number
                                          </Text>

                                          <ImageBackground
                                            source={require("../../image/inputedittext.png")}
                                            resizeMode={"stretch"}
                                            imageStyle={{
                                              height: 28,
                                              width: "100%",
                                            }}
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              marginHorizontal: 10,
                                            }}
                                          >
                                            <TouchableOpacity
                                              style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
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
                                                onSelect={(iii) => {
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
                                                  top:
                                                    Platform.OS === "ios"
                                                      ? 1
                                                      : 3,
                                                }}
                                                source={require("../../image/arrowtitle.png")}
                                              />
                                            </TouchableOpacity>
                                            <TextInput
                                              onChangeText={(text) => {
                                                this.setState({
                                                  phone_member: text,
                                                });
                                              }}
                                              style={{
                                                fontSize: 24,
                                                color: "#73838f",
                                                marginHorizontal: 25,
                                                width: width * 0.4,
                                                marginTop: 0,

                                                right: 25,
                                              }}
                                            >
                                              <Text>
                                                {this.state.phone_member}
                                              </Text>
                                            </TextInput>
                                          </ImageBackground>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      ) : null}
                    </>
                  )}
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                {this.props.getUser.userDetails.res_result.type === 3 && (
                  <ScrollView style={{ alignSelf: "center" }}>
                    {this.state.Allcontents
                      ? this.state.Allcontents.map((param, i) => {
                          return (
                            <DropDownItem
                              key={i}
                              style={{
                                marginHorizontal: 15,
                                backgroundColor: "#FFF",
                              }}
                              contentVisible={false}
                              invisibleImage={IC_ARR_DOWN}
                              visibleImage={IC_ARR_UP}
                              header={
                                <View style={styles.header}>
                                  <Text
                                    style={{
                                      fontSize: 22,
                                      color: "#FFF",
                                      flex: 1,

                                      marginHorizontal: 15,
                                    }}
                                  >
                                    {param.title}
                                  </Text>
                                </View>
                              }
                            >
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatatype1}
                                  renderItem={this.ListDatamemberCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatatype1addnress}
                                  renderItem={this.ListDataAddnressCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatatype1contact}
                                  renderItem={this.ListDataContactCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{ height: 10 }} />
                  </ScrollView>
                )}
                {this.props.getUser.userDetails.res_result.type === 1 && (
                  <ScrollView style={{ alignSelf: "center" }}>
                    {this.state.Allcontents1
                      ? this.state.Allcontents1.map((param, i) => {
                          return (
                            <DropDownItem
                              key={i}
                              style={{
                                marginHorizontal: 15,
                                backgroundColor: "#FFF",
                              }}
                              contentVisible={false}
                              invisibleImage={IC_ARR_DOWN}
                              visibleImage={IC_ARR_UP}
                              header={
                                <View style={styles.header}>
                                  <Text
                                    style={{
                                      fontSize: 22,
                                      color: "#FFF",
                                      flex: 1,

                                      marginHorizontal: 15,
                                    }}
                                  >
                                    {param.title}
                                  </Text>
                                </View>
                              }
                            >
                              <FlatList
                                style={{
                                  marginBottom: 20,
                                }}
                                data={this.state.FormDatatype1}
                                renderItem={this.ListDataNitiCheckout}
                                keyExtractor={(item) => item.id}
                              />
                              <FlatList
                                style={{
                                  marginBottom: 20,
                                }}
                                data={this.state.FormDatatype1addnress}
                                renderItem={this.ListDataAddnressCheckout}
                                keyExtractor={(item) => item.id}
                              />
                              <FlatList
                                style={{
                                  marginBottom: 20,
                                }}
                                data={this.state.FormDatatype1contact}
                                renderItem={this.ListDataContactCheckout}
                                keyExtractor={(item) => item.id}
                              />
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{ height: 10 }} />
                  </ScrollView>
                )}
                <ScrollView style={{ alignSelf: "center" }}>
                  {this.state.Alldataoperator
                    ? this.state.Alldataoperator.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: "#FFF",
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: "#FFF",
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}
                                >
                                  {param.title}
                                </Text>
                              </View>
                            }
                          >
                            {/* <FlatList
                              style={{
                                marginBottom: 20,
                              }}
                              data={this.state.datatypeIbusiness}
                              renderItem={this.ListDataBusinessCheckout}
                              keyExtractor={item => item.id}
                            /> */}

                            <View
                              style={{
                                backgroundColor: "#FFF",
                                // alignItems: 'center',
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "column",

                                  width: "40%",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#163c70",
                                    textAlign: "right",
                                  }}
                                >
                                  {I18n.t("member_business")}
                                </Text>
                              </View>

                              {this.state.showDatabusiness != undefined && (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    marginHorizontal: 35,
                                    width: width * 0.3,
                                    backgroundColor: "#FFF",
                                  }}
                                >
                                  {this.state.showDatabusiness.map((Data) => {
                                    return (
                                      <View
                                        style={{
                                          // flexDirection: 'column',

                                          // flexDirection: 'row',
                                          flexWrap: "wrap",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <View>
                                          {Data.value === "0" && (
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#2d6dc4",

                                                marginTop: 0,
                                              }}
                                            >
                                              {"ผู้ผลิต"}
                                              {" ,"}
                                            </Text>
                                          )}
                                        </View>
                                        <View>
                                          {Data.value === "1" && (
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#2d6dc4",

                                                marginTop: 0,
                                              }}
                                            >
                                              {"ผู้ส่งออก"}
                                              {" ,"}
                                            </Text>
                                          )}
                                        </View>
                                        <View>
                                          {Data.value === "2" && (
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#2d6dc4",

                                                marginTop: 0,
                                              }}
                                            >
                                              {"บริษัทการค้าระหว่าง..."}
                                              {" ,"}
                                            </Text>
                                          )}
                                        </View>

                                        <View>
                                          {Data.value === "3" && (
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: "#2d6dc4",

                                                marginTop: 0,
                                              }}
                                            >
                                              {"อื่นๆ"}
                                              {" ,"}
                                            </Text>
                                          )}
                                        </View>
                                      </View>
                                    );
                                  })}
                                  <View style={{ flexDirection: "column" }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        color: "#2d6dc4",

                                        marginTop: 0,
                                      }}
                                    >
                                      {this.state.textbusinessTypeOther}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>

                            <View
                              style={{
                                backgroundColor: "#FFF",
                                // alignItems: 'center',
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "column",

                                  width: "40%",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#163c70",
                                    textAlign: "right",
                                  }}
                                >
                                  {I18n.t("transalte_export_market")} :{" "}
                                </Text>
                              </View>
                              {/* <View
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
                              </View> */}
                              {this.state.itemMaket != undefined && (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    marginHorizontal: 35,
                                    width: "40%",
                                    backgroundColor: "#FFF",
                                  }}
                                >
                                  {this.state.itemMaket.map((Data) => {
                                    return (
                                      <View
                                        style={{
                                          // flexDirection: 'column',

                                          // flexDirection: 'row',
                                          flexWrap: "wrap",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <View>
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              color: "#2d6dc4",

                                              marginTop: 0,
                                            }}
                                          >
                                            {I18n.locale === "th"
                                              ? Data.ExportMarketNameTH
                                              : Data.ExportMarketNameEN}{" "}
                                            {","}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </View>
                              )}
                            </View>
                          </DropDownItem>
                        );
                      })
                    : null}

                  <View style={{ height: 10 }} />
                </ScrollView>
                {/* สินค้า */}
                <ScrollView style={{ alignSelf: "center" }}>
                  {this.state.Alldataproduct
                    ? this.state.Alldataproduct.map((param, i) => {
                        return (
                          <DropDownItem
                            key={i}
                            style={{
                              marginHorizontal: 15,
                              backgroundColor: "#FFF",
                            }}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                              <View style={styles.header}>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    color: "#FFF",
                                    flex: 1,

                                    marginHorizontal: 15,
                                  }}
                                >
                                  {param.title}
                                </Text>
                              </View>
                            }
                          >
                            <FlatList
                              data={this.state.dataProduct}
                              renderItem={this.ListItemProduct}
                              keyExtractor={(item) => item.id}
                            />
                          </DropDownItem>
                        );
                      })
                    : null}

                  <View style={{ height: 10 }} />
                </ScrollView>
                {this.props.getUser.userDetails.res_result.type === 3 && (
                  <ScrollView style={{ alignSelf: "center" }}>
                    {this.state.Alldatacompany
                      ? this.state.Alldatacompany.map((param, i) => {
                          return (
                            <DropDownItem
                              key={i}
                              style={{
                                marginHorizontal: 15,
                                backgroundColor: "#FFF",
                              }}
                              contentVisible={false}
                              invisibleImage={IC_ARR_DOWN}
                              visibleImage={IC_ARR_UP}
                              header={
                                <View style={styles.header}>
                                  <Text
                                    style={{
                                      fontSize: 22,
                                      color: "#FFF",
                                      flex: 1,

                                      marginHorizontal: 15,
                                    }}
                                  >
                                    {param.title}
                                  </Text>
                                </View>
                              }
                            >
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatacompany}
                                  renderItem={this.ListDatamemberCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatacompanyaddress}
                                  renderItem={this.ListDataAddnressCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <FlatList
                                  style={{
                                    marginBottom: 20,
                                  }}
                                  data={this.state.FormDatacompanycantact}
                                  renderItem={this.ListDataContactCheckout}
                                  keyExtractor={(item) => item.id}
                                />
                              </View>
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{ height: 25 }} />
                  </ScrollView>
                )}
                {this.props.getUser.userDetails.res_result.type === 1 && (
                  <ScrollView style={{ alignSelf: "center" }}>
                    {this.state.Alldatanumber
                      ? this.state.Alldatanumber.map((param, i) => {
                          return (
                            <DropDownItem
                              key={i}
                              style={{
                                marginHorizontal: 15,
                                backgroundColor: "#FFF",
                              }}
                              contentVisible={false}
                              invisibleImage={IC_ARR_DOWN}
                              visibleImage={IC_ARR_UP}
                              header={
                                <View style={styles.header}>
                                  <Text
                                    style={{
                                      fontSize: 22,
                                      color: "#FFF",
                                      flex: 1,

                                      marginHorizontal: 15,
                                    }}
                                  >
                                    {param.title}
                                  </Text>
                                </View>
                              }
                            >
                              <View
                                style={{
                                  backgroundColor: "#FFF",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  paddingBottom: 5,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "column",

                                    width: "100%",
                                  }}
                                >
                                  <FlatList
                                    style={{
                                      marginBottom: 20,
                                    }}
                                    data={this.state.datamember}
                                    renderItem={this.Listmember}
                                    keyExtractor={(item) => item.id}
                                  />
                                </View>
                              </View>
                            </DropDownItem>
                          );
                        })
                      : null}

                    <View style={{ height: 25 }} />
                  </ScrollView>
                )}
                {/* นโยบาย  */}
                <View style={{ alignItems: "center" }}>
                  <CheckBox
                    textStyle={{
                      fontSize: 20,
                      color: "#73838f",
                      fontWeight: "normal",
                    }}
                    uncheckedIcon={
                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderWidth: 0.5,
                          width: 18,
                          height: 18,
                          borderColor: "#999999",
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
                        source={require("../../image/rrr.png")}
                      />
                    }
                    title={
                      <View
                        style={{
                          marginHorizontal: 15,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#40536d",
                              textAlign: "center",
                            }}
                          >
                            ข้าพเจ้ายอมรับเงื่อนไขข้อกำหนดของกรม
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            // alert('อ่านเงื่อนไขข้อกำหนดของกรม');
                            // this.setState({readPolicy:true})
                            this.props.navigation.navigate("RegisterPolicy");
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "#2d6dc4",
                              textAlign: "center",
                              textDecorationLine: "underline",
                            }}
                          >
                            อ่านเงื่อนไขข้อกำหนดของกรม
                          </Text>
                        </TouchableOpacity>
                      </View>
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    checked={this.state.checkPolicy}
                    // disabled={true}
                    onPress={() => {
                      this.checkPolicy();
                    }}
                  />
                </View>
                {/* ปุ่มกลับ */}
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        {/* /////////////////////////////////////////////////////////////control popup /////////////////////////// */}

        {this.state.openPopupmaket && (
          <Overlay
            backdropStyle={{ backgroundColor: "#2d6dc480" }}
            overlayStyle={{
              borderWidth: 2,
              borderColor: "#568ae0",
              // backgroundColor: '#568ae0',
              // top: height * 0.001,
              top: height * 0.03,
              height: height * 0.7,
              width: width * 0.8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
            }}
            // isVisible={this.state.openPopupmaket}
            // onBackdropPress={() => this.setState({openPopupmaket: false})}
          >
            <View
              style={{
                height: Platform.OS === "android" ? 40 : 0,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "#dadada",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "transparent",
                  marginLeft: 10,
                  top: 3,
                }}
                source={require("../../image/searchbluex.png")}
              />
              <TextInput
                style={{ fontSize: 20, flex: 1 }}
                placeholder={"ค้นหา"}
                placeholderTextColor={"#999999"}
                onChangeText={(searchTerm) => this.setState({ searchTerm })}
              />
            </View>
            <SearchableFlatList
              style={{}}
              data={this.state.DataMakets}
              searchTerm={searchTerm}
              searchAttribute={searchAttribute}
              ignoreCase={ignoreCase}
              renderItem={({ item, index }) => (
                <View>
                  {/* {item.id != null && ( */}
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      backgroundColor: "#FFF",
                    }}
                  >
                    <CheckBox
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderWidth: 0.5,
                            width: 18,
                            height: 18,
                            borderColor: "#999999",
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
                          source={require("../../image/rrr.png")}
                        />
                      }
                      checked={
                        this.state.checkBoxMaket[item.ActivityExportMarketId]
                      }
                      onPress={() => {
                        this.selectItemMaket({
                          item: item,
                          index: item.ActivityExportMarketId,
                        });
                      }}
                      containerStyle={{
                        backgroundColor: "#FFF",
                        borderWidth: 0,
                      }}
                      title={
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 20,
                            color: "#6f7d91",
                            marginLeft: 10,
                            width: "100%",
                          }}
                        >
                          {item.ExportMarketNameTH}
                        </Text>
                      }
                    />
                  </View>
                  {/* )} */}
                </View>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              onPress={() => {
                this._sendDataMaket();
              }}
              style={{
                backgroundColor: "#2d6dc4",
                height: 40,
                borderRadius: 24,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFF",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {I18n.t("translate_Save")}
              </Text>
            </TouchableOpacity>
          </Overlay>
        )}

        {this.state.editProduct && (
          <Overlay
            backdropStyle={{ backgroundColor: "#2d6dc480" }}
            overlayStyle={{
              borderWidth: 2,
              borderColor: "#568ae0",
              // backgroundColor: '#568ae0',
              // top: height * 0.001,
              top: height * 0.03,
              height: height * 0.8,
              width: width * 0.9,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
            }}
            // ProductBrandNameEn:item.ProductBrandNameEn,
            // ProductBrandNameTh:item.ProductBrandNameTh,
            // ProductCategory:item.ProductCategory,
            // ProductDescriptionEn:item.ProductDescriptionEn,
            // ProductDescriptionTh:item.ProductDescriptionTh,
            // ProductGroup:item.ProductGroup,
            // ProductPictures:item.ProductPictures,
            // ProductSubCategory:item.ProductSubCategory
            isVisible={this.state.editProduct}
            onBackdropPress={() => this.setState({ editProduct: false })}
          >
            <ScrollView style={{}}>
              <Image
                source={{ uri: this.state.ProductPictures_popup }}
                style={{ width: "100%", height: 230, marginBottom: 20 }}
              />
              <View
                style={{
                  marginHorizontal: 10,
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                  borderWidth: 0.5,
                  borderColor: "#FFFF",
                  padding: 10,
                }}
              >
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  Category / ประเภทสินค้า :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductCategory_popup}
                </Text>
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  Sub-Category / ประเภทสินค้าย่อย :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductSubCategory_popup}
                </Text>
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  Product Group / กลุ่มสินค้า :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductGroup_popup}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                  borderWidth: 0.5,
                  borderColor: "#FFFF",
                  padding: 10,
                }}
              >
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  ชื่อแบรนด์ :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductBrandNameTh_popup}
                </Text>
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  รายละเอียดสินค้า :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductDescriptionTh_popup}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                  borderWidth: 0.5,
                  borderColor: "#FFFF",
                  padding: 10,
                }}
              >
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  Product Brand Name :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductBrandNameEn_popup}
                </Text>
                <Text style={{ color: "#163c70", fontSize: 20 }}>
                  Product Description :
                </Text>
                <Text style={{ color: "#2d6dc4", fontSize: 20 }}>
                  {this.state.ProductDescriptionEn_popup}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#f86767',
                  justifyContent: 'center',
                  height: 45,
                  flexDirection: 'row',
                  borderRadius: 24,
                }}>
                <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                  <Image
                    style={{width: 18, height: 20}}
                    source={require('../../image/editttttt.png')}
                  />
                </View>
                <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                  <Text style={{color: '#FFFFFF', fontSize: 22}}>
                    แก้ไขข้อมูล
                  </Text>
                </View>
              </TouchableOpacity> */}
            </ScrollView>
          </Overlay>
        )}

        {this.state.popupparticipant && (
          <Overlay
            backdropStyle={{ backgroundColor: "#2d6dc480" }}
            overlayStyle={{
              borderWidth: 2,
              borderColor: "#568ae0",
              // backgroundColor: '#568ae0',
              // top: height * 0.001,
              top: height * 0.03,
              height: height * 0.7,
              width: width * 0.8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
            }}
            isVisible={this.state.popupparticipant}
            onBackdropPress={() => this.setState({ popupparticipant: false })}
          >
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 20, color: "#6f7d91" }}
              >
                เพิ่มข้อมูลผู้ติดต่อ
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                // flex: 1,

                // marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  marginTop: 13,
                  // width: '100%',
                  flex: 1,
                  height: 35,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#cacaca",
                  borderWidth: 1,
                  borderRadius: 16,
                  marginLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <Image
                  style={[Styles.Image, { marginTop: 3 }]}
                  source={require("../../image/searchblue.png")}
                />
                <View style={{height: 50, width: 150,}}>
                  <TextInput
                    style={{ fontSize: 20, flex: 1, color: "#0D0C0C" }}
                    placeholder={I18n.t("transalte_ID_card_number")}
                    placeholderTextColor={"#999999"}
                    onChangeText={(searchTerm) => this.setState({ searchTerm })}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 0.4,
                  backgroundColor: "#2d6dc4",
                  height: 35,
                  borderRadius: 16,
                  marginTop: 13,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // alert('OKOK')

                    this.Seacrparticipantspecific();
                  }}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: "#FFFF",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    ค้นหา
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <SearchableFlatList
              style={{}}
              data={
                this.state.ckdatamemberSearch1 === true
                  ? this.state.datamemberSearch
                  : this.state.datamemberSearch1
              }
              searchTerm={""}
              searchAttribute={searchAttribute1}
              ignoreCase={ignoreCase}
              renderItem={({ item, index }) => (
                <View>
                  {/* {item.id != null && ( */}
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      backgroundColor: "#FFF",
                    }}
                  >
                    <CheckBox
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderWidth: 0.5,
                            width: 18,
                            height: 18,
                            borderColor: "#999999",
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
                          source={require("../../image/rrr.png")}
                        />
                      }
                      checked={
                        // this.state.checkBoxMaket[item.ActivityExportMarketId]
                        // this.state.Itemindex === index
                        this.state.checkBoxCitizenId[index]
                      }
                      onPress={() => {
                        this.selectItemCitizenId({
                          item: item,
                          index: index,
                        });
                      }}
                      containerStyle={{
                        backgroundColor: "#FFF",
                        borderWidth: 0,
                      }}
                      title={
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 20,
                              color: "#6f7d91",
                              marginLeft: 10,
                              width: "100%",
                            }}
                          >
                            {I18n.locale === "th"
                              ? item.FullNameTH
                              : item.FullNameEN}
                          </Text>
                        </View>
                      }
                    />
                  </View>
                </View>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              onPress={() => {
                this._sendAddmemberparticipantSearch();

                // if (this.state.searchTerm != '') {
                //   alert('search');
                // } else {
                //   alert('NO');
                // }
              }}
              style={{
                backgroundColor: "#2d6dc4",
                height: 40,
                borderRadius: 24,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFF",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {I18n.t("translate_Save")}
              </Text>
            </TouchableOpacity>
          </Overlay>
        )}

        {this.state.checkpopupaddmember && (
          <Overlay
            backdropStyle={{ backgroundColor: "#2d6dc480" }}
            overlayStyle={{
              borderWidth: 2,
              borderColor: "#568ae0",
              // backgroundColor: '#568ae0',
              // top: height * 0.001,
              top: height * 0.03,
              height: height * 0.4,
              width: width * 0.8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
            }}
            isVisible={this.state.checkpopupaddmember}
            onBackdropPress={() =>
              this.setState({ checkpopupaddmember: false })
            }
          >
            <ScrollView style={{}}>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    color: "#20416e",
                  }}
                >
                  ตรวจสอบผู้เข้าร่วมกิจกกรม
                </Text>
              </View>
              <View style={{ height: 130 }}>
                <FlatList
                  scrollEnabled={false}
                  style={{}}
                  data={dataCkniti}
                  renderItem={this.ListmeNiticheck}
                  keyExtractor={(item) => item.id}
                />
              </View>

              <View
                style={{
                  height: Platform.OS === "android" ? 40 : 0,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: "#dadada",
                  flexDirection: "row",
                  alignItems: "center",
                  // marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    top: 3,
                  }}
                  source={require("../../image/searchbluex.png")}
                />
                <TextInput
                  keyboardType="numeric"
                  style={{
                    fontSize: 20,
                    flex: 1,
                    color: "#0D0C0C",
                  }}
                  placeholder={"กรอกเลขประจำตัวประชาชน/เลขพาสปอร์ต"}
                  placeholderTextColor={"#999999"}
                  onChangeText={(textnumberid) =>
                    this.setState({ IDnemberCI: textnumberid })
                  }
                >
                  {this.state.IDnemberCI === undefined ? (
                    <Text style={{ color: "#0D0C0C", fontSize: 13 }}>{""}</Text>
                  ) : (
                    <Text style={{ color: "#0D0C0C", fontSize: 13 }}>
                      {this.state.IDnemberCI}
                    </Text>
                  )}
                </TextInput>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this._sendCheckAddmember();
                }}
                style={{
                  backgroundColor: "#2d6dc4",
                  height: 40,
                  borderRadius: 24,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFF",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  ค้นหา
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Overlay>
        )}

        {/* /////////////////////////////////////////////////////////////control btn /////////////////////////// */}

        {/* ใส่ ปุ่ม ต่างๆ  */}
        {this.state.sucess === false ? (
          <View
            style={{
              // backgroundColor: 'white'
              backgroundColor: "transparent",
            }}
          >
            {this.state.Isative === 0 && (
              <View>
                {/* ปุ่มที่ 0 ข้อมูลส่วนตัว */}
                {this.state.editdata === false ? (
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ editdata: true });
                      }}
                      style={{
                        width: width * 0.8,
                        height: 38,
                        backgroundColor: "#f86767",
                        borderRadius: 21.5,
                        marginBottom: 10,
                        marginHorizontal: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 24, color: "#ffffff" }}>
                        {I18n.t("transalte_Edit_Juristic_Information")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ Isative: 1 });
                      }}
                      style={{
                        width: width * 0.8,
                        height: 38,
                        backgroundColor: "#2d6dc4",
                        borderRadius: 21.5,
                        marginBottom: 15,
                        marginHorizontal: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 24, color: "#ffffff" }}>
                        {I18n.t("translate_Next")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 40,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ editdata: false });
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#2d6dc4",
                        height: 40,
                        flex: 1,
                        borderRadius: 24,
                        // marginBottom: 15,
                        borderWidth: 1,
                        justifyContent: "center",
                        marginHorizontal: 3,
                        // flexDirection: 'row',
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 5,
                          transform: [{ translateX: -10 }],
                        }}
                      >
                        <Icon
                          name="chevron-left"
                          size={25}
                          style={{
                            color: "#2d6dc4",
                            marginTop: 0,
                            flex: 0.5,
                          }}
                        />
                        <Text
                          style={{
                            color: "#2d6dc4",
                            fontSize: 22,

                            flex: 0.4,

                            marginTop: 0,
                          }}
                        >
                          {I18n.t("transalte_Bt_back")}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // this._getDataBusiness();
                        // this.setState({editdata: false});
                        this.updateProfile();
                      }}
                      style={{
                        backgroundColor: "#2d6dc4",
                        flex: 1,
                        height: 40,
                        borderRadius: 24,
                        marginBottom: 15,
                        justifyContent: "center",
                        marginHorizontal: 2,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 22,

                          flex: 1,
                          textAlign: "center",
                          marginTop: 5.5,
                        }}
                      >
                        {I18n.t("translate_Save")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {this.state.Isative === 1 && (
              <View>
                {/* ปุ่มที่ 1 แก้ไขข้อมูลประกอบ */}
                {this.state.checkeditmenu2 === false ? (
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ checkeditmenu2: true });
                      }}
                      style={{
                        width: width * 0.8,
                        height: 38,
                        backgroundColor: "#f86767",
                        borderRadius: 21.5,
                        marginBottom: 10,
                        marginHorizontal: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 24, color: "#ffffff" }}>
                        {I18n.t("transalte_edit_accompanying_info")}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 40,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ Isative: 0 });
                        }}
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#2d6dc4",
                          height: 40,
                          flex: 1,
                          borderRadius: 24,
                          // marginBottom: 15,
                          borderWidth: 1,
                          justifyContent: "center",
                          marginHorizontal: 3,
                          // flexDirection: 'row',
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 5,
                            transform: [{ translateX: -10 }],
                          }}
                        >
                          <Icon
                            name="chevron-left"
                            size={25}
                            style={{
                              color: "#2d6dc4",
                              marginTop: 0,
                              flex: 0.5,
                            }}
                          />
                          <Text
                            style={{
                              color: "#2d6dc4",
                              fontSize: 22,

                              flex: 0.4,

                              marginTop: 0,
                            }}
                          >
                            {I18n.t("transalte_Bt_back")}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ Isative: 2 });
                        }}
                        style={{
                          backgroundColor: "#2d6dc4",
                          flex: 1,
                          height: 40,
                          borderRadius: 24,
                          marginBottom: 15,
                          justifyContent: "center",
                          marginHorizontal: 2,
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: 22,

                            flex: 1,
                            textAlign: "center",
                            marginTop: 5.5,
                          }}
                        >
                          {I18n.t("translate_Next")}
                        </Text>
                        <Icon
                          name="chevron-right"
                          size={25}
                          style={{
                            color: "#FFF",

                            flex: 0.2,
                            marginTop: 5.5,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 40,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ checkeditmenu2: false });
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#2d6dc4",
                        height: 40,
                        flex: 1,
                        borderRadius: 24,
                        // marginBottom: 15,
                        borderWidth: 1,
                        justifyContent: "center",
                        marginHorizontal: 3,
                        // flexDirection: 'row',
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 5,
                          transform: [{ translateX: -10 }],
                        }}
                      >
                        <Icon
                          name="chevron-left"
                          size={25}
                          style={{
                            color: "#2d6dc4",
                            marginTop: 0,
                            flex: 0.5,
                          }}
                        />
                        <Text
                          style={{
                            color: "#2d6dc4",
                            fontSize: 22,

                            flex: 0.4,

                            marginTop: 0,
                          }}
                        >
                          {I18n.t("transalte_Bt_back")}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // this._getDataBusiness();
                        this._sendDatabusiness();
                      }}
                      style={{
                        backgroundColor: "#2d6dc4",
                        flex: 1,
                        height: 40,
                        borderRadius: 24,
                        marginBottom: 15,
                        justifyContent: "center",
                        marginHorizontal: 2,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 22,

                          flex: 1,
                          textAlign: "center",
                          marginTop: 5.5,
                        }}
                      >
                        {I18n.t("translate_Save")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {this.state.Isative === 2 && (
              <View>
                {/* ปุ่มที่ 2 สินค้า */}
                {this.state.AddProduct === false ? (
                  <View>
                    {this.state.dataProduct.length === 0 ? (
                      <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              AddProduct: true,
                              editProductfrom: false,
                            });
                          }}
                          style={{
                            backgroundColor: "#04a68a",
                            marginHorizontal: 35,
                            height: 38,
                            borderRadius: 24,
                            marginBottom: 10,
                            justifyContent: "center",
                            flexDirection: "row",
                            alignContent: "center",
                            width: width * 0.8,
                          }}
                        >
                          <Icon
                            name="add-circle"
                            size={20}
                            style={{
                              color: "#FFFFFF",
                              marginTop: 9,
                              flex: 0.1,
                            }}
                          />
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 22,
                              marginTop: 5,
                            }}
                          >
                            {I18n.t("transalte_Bt_add_product")}
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 40,
                            marginBottom: 14,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ Isative: 1 });
                            }}
                            style={{
                              backgroundColor: "#FFFFFF",
                              borderColor: "#2d6dc4",
                              height: 38,
                              flex: 1,
                              borderRadius: 24,
                              // marginBottom: 15,
                              borderWidth: 1,
                              justifyContent: "center",
                              marginHorizontal: 3,
                              // flexDirection: 'row',
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 5,
                                transform: [{ translateX: -10 }],
                              }}
                            >
                              <Icon
                                name="chevron-left"
                                size={25}
                                style={{
                                  color: "#2d6dc4",
                                  marginTop: 0,
                                  flex: 0.5,
                                }}
                              />
                              <Text
                                style={{
                                  color: "#2d6dc4",
                                  fontSize: 22,

                                  flex: 0.4,

                                  marginTop: 0,
                                }}
                              >
                                {I18n.t("transalte_Bt_back")}
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ Isative: 3 });
                            }}
                            style={{
                              backgroundColor: "#2d6dc4",
                              borderColor: "#2d6dc4",
                              height: 38,
                              flex: 1,
                              borderRadius: 24,
                              // marginBottom: 15,

                              justifyContent: "center",
                              marginHorizontal: 3,
                              // flexDirection: 'row',
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 5,
                                transform: [{ translateX: 10 }],
                              }}
                            >
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontSize: 22,

                                  flex: 1,

                                  marginTop: 0,
                                  textAlign: "center",
                                }}
                              >
                                {I18n.t("translate_Next")}
                              </Text>
                              <Icon
                                name="chevron-right"
                                size={25}
                                style={{
                                  color: "#FFF",
                                  marginTop: 0,
                                  flex: 0.3,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        {this.state.DeleteProduct === false ? (
                          <View>
                            {/* แสดงข้อมูลของสินค้า */}

                            {/* ปุ่มเพิ่มสินค้า */}
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ AddProduct: true });
                              }}
                              style={{
                                backgroundColor: "#04a68a",
                                marginHorizontal: 35,
                                height: 38,
                                borderRadius: 24,
                                marginBottom: 10,
                                justifyContent: "center",
                                flexDirection: "row",
                                alignContent: "center",
                                width: width * 0.8,
                              }}
                            >
                              <Icon
                                name="add-circle"
                                size={20}
                                style={{
                                  color: "#FFFFFF",
                                  marginTop: 9,
                                  flex: 0.1,
                                }}
                              />
                              <Text
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: 22,
                                  marginTop: 5,
                                }}
                              >
                                {I18n.t("transalte_Bt_add_product")}
                              </Text>
                            </TouchableOpacity>

                            {/* มีปุ่ม 3 ปุ่ม มี กลับ ลบผู้เข้าร่วม และ ต่อไป */}
                            <View
                              style={{
                                flexDirection: "row",
                                marginHorizontal: 32,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({ Isative: 1 });
                                }}
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  borderColor: "#2d6dc4",
                                  height: 38,
                                  width: "30%",
                                  borderRadius: 24,
                                  // marginBottom: 15,
                                  borderWidth: 1,
                                  justifyContent: "center",
                                  marginHorizontal: 3,
                                  // flexDirection: 'row',
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 5,
                                    transform: [{ translateX: -10 }],
                                  }}
                                >
                                  <Icon
                                    name="chevron-left"
                                    size={25}
                                    style={{
                                      color: "#2d6dc4",
                                      // marginTop: 9.1,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#2d6dc4",
                                      fontSize: 22,
                                      // textAlign: 'left',
                                      // flex: 0.7,

                                      // marginTop: 9.1,
                                    }}
                                  >
                                    {I18n.t("transalte_Bt_back")}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    DeleteProduct: true,
                                    idDelectproduct: [],
                                    checkBoxIDdeleteproduct: [],
                                  });
                                }}
                                style={{
                                  backgroundColor: "#f86767",
                                  width: "34%",
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 15,
                                  justifyContent: "center",
                                  marginHorizontal: 5,
                                  flexDirection: "row",
                                }}
                              >
                                <Icon
                                  name="delete"
                                  size={18}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 9,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    textAlign: "center",
                                    marginTop: 5,
                                  }}
                                >
                                  {I18n.t("transalte_Bt_del_product")}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({ Isative: 3 });
                                }}
                                style={{
                                  backgroundColor: "#2d6dc4",
                                  width: "30%",
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 15,
                                  justifyContent: "center",
                                  marginHorizontal: 2,
                                  flexDirection: "row",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    textAlign: "right",
                                    flex: 0.5,
                                    marginTop: 5,
                                  }}
                                >
                                  {I18n.t("translate_Next")}
                                </Text>
                                <Icon
                                  name="chevron-right"
                                  size={25}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 6,
                                    flex: 0.2,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                marginBottom: 20,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",

                                  flex: 1,
                                  justifyContent: "center",
                                  marginHorizontal: 20,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ DeleteProduct: false });
                                  }}
                                  style={{
                                    borderColor: "#f86969",
                                    borderWidth: 1,
                                    backgroundColor: "#FFFFFF",
                                    flex: 1,
                                    height: 38,
                                    borderRadius: 24,
                                    marginHorizontal: 5,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#f86969",
                                      fontSize: 22,
                                      marginTop: 3.5,
                                    }}
                                  >
                                    ยกเลิก
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    // this.setState({DeleteProduct: false});
                                    this._sendDeleteidProduct();
                                  }}
                                  style={{
                                    backgroundColor: "#f86969",

                                    flex: 1,
                                    height: 38,
                                    borderRadius: 24,
                                    marginHorizontal: 5,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignContent: "center",
                                  }}
                                >
                                  <Icon
                                    name="delete"
                                    size={20}
                                    style={{
                                      color: "#FFFFFF",
                                      flex: 0.3,
                                      marginTop: 9,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontSize: 22,
                                      marginTop: 3.5,
                                    }}
                                  >
                                    {I18n.t("transalte_Bt_del_product")}
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
                  <>
                    {this.state.editProductfrom === false ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginHorizontal: 32,
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ AddProduct: false });
                          }}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#2d6dc4",
                            height: 38,
                            flex: 1,
                            borderRadius: 24,
                            // marginBottom: 15,
                            borderWidth: 1,
                            justifyContent: "center",
                            marginHorizontal: 3,
                            // flexDirection: 'row',
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginHorizontal: 5,
                              transform: [{ translateX: -10 }],
                            }}
                          >
                            <Icon
                              name="chevron-left"
                              size={25}
                              style={{
                                color: "#2d6dc4",
                                marginTop: 0,
                                flex: 0.5,
                              }}
                            />
                            <Text
                              style={{
                                color: "#2d6dc4",
                                fontSize: 22,

                                flex: 0.4,

                                marginTop: 0,
                              }}
                            >
                              {I18n.t("transalte_Bt_back")}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            // this.setState({AddProduct: false});
                            this._sendAddProduct();
                            // this._sendItem_geturlimg()
                          }}
                          style={{
                            backgroundColor: "#2d6dc4",
                            flex: 1,
                            height: 38,
                            borderRadius: 24,
                            marginBottom: 15,
                            justifyContent: "center",
                            marginHorizontal: 2,
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 22,
                              flex: 0.9,
                              marginTop: 5,

                              textAlign: "center",
                            }}
                          >
                            {I18n.t("translate_Save")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          marginHorizontal: 32,
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              AddProduct: false,
                              editProductfrom: false,
                            });
                          }}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#2d6dc4",
                            height: 38,
                            flex: 1,
                            borderRadius: 24,
                            // marginBottom: 15,
                            borderWidth: 1,
                            justifyContent: "center",
                            marginHorizontal: 3,
                            // flexDirection: 'row',
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginHorizontal: 5,
                              transform: [{ translateX: -10 }],
                            }}
                          >
                            <Icon
                              name="chevron-left"
                              size={25}
                              style={{
                                color: "#2d6dc4",
                                marginTop: 0,
                                flex: 0.5,
                              }}
                            />
                            <Text
                              style={{
                                color: "#2d6dc4",
                                fontSize: 22,

                                flex: 0.4,

                                marginTop: 0,
                              }}
                            >
                              {I18n.t("transalte_Bt_back")}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            // this.setState({AddProduct: false});
                            // this._sendAddProduct();
                            // this._sendItem_geturlimg()
                            // this._sendEditProduct();
                            this._sendItem_editurlimg();
                          }}
                          style={{
                            backgroundColor: "#2d6dc4",
                            flex: 1,
                            height: 38,
                            borderRadius: 24,
                            marginBottom: 15,
                            justifyContent: "center",
                            marginHorizontal: 2,
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 22,
                              flex: 0.9,
                              marginTop: 5,

                              textAlign: "center",
                            }}
                          >
                            {I18n.t("translate_Save")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}

            {this.state.Isative === 3 && (
              <View>
                {/* ปุ่มที่ 2 สินค้า */}
                {this.state.AddPersonativity === false ? (
                  <View>
                    {this.state.datamember.length === 0 ? (
                      <View style={{ alignItems: "center" }}>
                        {this.props.route.params.type === 3 ? (
                          <View>
                            {this.state.OpenAddcompany === false && (
                              <TouchableOpacity
                                onPress={() => {
                                  console.log("addEEE");

                                  this.setState({ OpenAddcompany: true });
                                }}
                                style={{
                                  backgroundColor: "#04a68a",
                                  marginHorizontal: 35,
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 10,
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  alignContent: "center",
                                  width: width * 0.8,
                                }}
                              >
                                <View style={{ marginHorizontal: 6 }}>
                                  <Icon
                                    name="add-circle"
                                    size={20}
                                    style={{
                                      color: "#FFFFFF",
                                      marginTop: 9,
                                      // flex: 0.1,
                                      // borderWidth:1
                                    }}
                                  />
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontSize: 22,
                                      marginTop: 5,
                                    }}
                                  >
                                    เพิ่มข้อมูลในบริษัทสังกัด
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ checkpopupaddmember: true });

                              // this.setState({AddPersonativity: true});
                            }}
                            style={{
                              backgroundColor: "#04a68a",
                              marginHorizontal: 35,
                              height: 38,
                              borderRadius: 24,
                              marginBottom: 10,
                              justifyContent: "center",
                              flexDirection: "row",
                              alignContent: "center",
                              width: width * 0.8,
                            }}
                          >
                            <Icon
                              name="add-circle"
                              size={20}
                              style={{
                                color: "#FFFFFF",
                                marginTop: 9,
                                flex: 0.1,
                              }}
                            />

                            <Text
                              style={{
                                color: "#FFFFFF",
                                fontSize: 22,
                                marginTop: 5,
                              }}
                            >
                              {I18n.t("transalte_Add_contact_info")}
                            </Text>
                          </TouchableOpacity>
                        )}

                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 40,
                            marginBottom: 14,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ Isative: 2 });
                            }}
                            style={{
                              backgroundColor: "#FFFFFF",
                              borderColor: "#2d6dc4",
                              height: 38,
                              flex: 1,
                              borderRadius: 24,
                              // marginBottom: 15,
                              borderWidth: 1,
                              justifyContent: "center",
                              marginHorizontal: 3,
                              // flexDirection: 'row',
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 5,
                                transform: [{ translateX: -10 }],
                              }}
                            >
                              <Icon
                                name="chevron-left"
                                size={25}
                                style={{
                                  color: "#2d6dc4",
                                  marginTop: 0,
                                  flex: 0.5,
                                }}
                              />
                              <Text
                                style={{
                                  color: "#2d6dc4",
                                  fontSize: 22,

                                  flex: 0.4,

                                  marginTop: 0,
                                }}
                              >
                                {I18n.t("transalte_Bt_back")}
                              </Text>
                            </View>
                          </TouchableOpacity>

                          {this.props.route.params.type === 3 ? (
                            <>
                              {this.state.OpenAddcompany === true ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    if (this.state.Addcompany === false) {
                                      // alert('กรุณาเพิ่มข้อมูลในบริษัทสังกัด');
                                      this.SaveCorparate();
                                    } else {
                                      if (
                                        this.state.showDatabusiness.length ===
                                          0 &&
                                        this.state.itemMaket.length === 0
                                      ) {
                                        alert("กรุณาเพิ่มข้อมูประกอบ");
                                      } else if (
                                        this.state.dataProduct.length === 0
                                      ) {
                                        alert("กรุณาเพิ่มข้อมูลสินค้า");
                                      } else {
                                        this.setState({ sucess: true });
                                      }
                                    }
                                  }}
                                  style={{
                                    backgroundColor: "#2d6dc4",
                                    borderColor: "#2d6dc4",
                                    height: 38,
                                    flex: 1,
                                    borderRadius: 24,
                                    // marginBottom: 15,

                                    justifyContent: "center",
                                    marginHorizontal: 3,
                                    // flexDirection: 'row',
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginHorizontal: 5,
                                      transform: [{ translateX: 10 }],
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#FFF",
                                        fontSize: 22,

                                        flex: 1,

                                        marginTop: 0,
                                        textAlign: "center",
                                      }}
                                    >
                                      {this.state.Addcompany === false
                                        ? I18n.t("translate_Save")
                                        : I18n.t("translate_Next")}
                                    </Text>
                                    <Icon
                                      name="chevron-right"
                                      size={25}
                                      style={{
                                        color: "#FFF",
                                        marginTop: 0,
                                        flex: 0.3,
                                      }}
                                    />
                                  </View>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    if (this.state.Addcompany === false) {
                                      alert("กรุณาเพิ่มข้อมูลในบริษัทสังกัด");

                                      // alert('บันทึก');

                                      // this.setState({sucess: true});
                                    } else if (
                                      this.state.showDatabusiness.length ===
                                        0 &&
                                      this.state.itemMaket.length === 0
                                    ) {
                                      alert("กรุณาเพิ่มข้อมูลประกอบ");
                                    } else if (
                                      this.state.dataProduct.length === 0
                                    ) {
                                      alert("กรุณาเพิ่มข้อมูลสินค้า");
                                    } else {
                                      this.setState({ sucess: true });
                                    }
                                  }}
                                  style={{
                                    backgroundColor: "#2d6dc4",
                                    borderColor: "#2d6dc4",
                                    height: 38,
                                    flex: 1,
                                    borderRadius: 24,
                                    // marginBottom: 15,

                                    justifyContent: "center",
                                    marginHorizontal: 3,
                                    // flexDirection: 'row',
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginHorizontal: 5,
                                      transform: [{ translateX: 10 }],
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#FFF",
                                        fontSize: 22,

                                        flex: 1,

                                        marginTop: 0,
                                        textAlign: "center",
                                      }}
                                    >
                                      {this.state.Addcompany === false
                                        ? I18n.t("translate_Next")
                                        : I18n.t("translate_Next")}
                                    </Text>
                                    <Icon
                                      name="chevron-right"
                                      size={25}
                                      style={{
                                        color: "#FFF",
                                        marginTop: 0,
                                        flex: 0.3,
                                      }}
                                    />
                                  </View>
                                </TouchableOpacity>
                              )}
                            </>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                // this.setState({Isative: 3});

                                alert("กรุณาเพิ่มข้อมูลติดต่อ");
                              }}
                              style={{
                                backgroundColor: "#2d6dc4",
                                borderColor: "#2d6dc4",
                                height: 38,
                                flex: 1,
                                borderRadius: 24,
                                // marginBottom: 15,

                                justifyContent: "center",
                                marginHorizontal: 3,
                                // flexDirection: 'row',
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginHorizontal: 5,
                                  transform: [{ translateX: 10 }],
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#FFF",
                                    fontSize: 22,

                                    flex: 1,

                                    marginTop: 0,
                                    textAlign: "center",
                                  }}
                                >
                                  {I18n.t("translate_Next")}
                                </Text>
                                <Icon
                                  name="chevron-right"
                                  size={25}
                                  style={{
                                    color: "#FFF",
                                    marginTop: 0,
                                    flex: 0.3,
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View>
                        {this.state.Deletemember === false ? (
                          <View>
                            {/* แสดงข้อมูลของสินค้า */}

                            {/* ปุ่มเพิ่มสินค้า */}
                            {this.props.route.params.type === 3 ? (
                              <TouchableOpacity
                                onPress={() => {
                                  // this.setState({AddPersonativity: true});
                                  // this.setState({checkpopupaddmember: true});
                                }}
                                style={{
                                  backgroundColor: "#04a68a",
                                  marginHorizontal: 35,
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 10,
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  alignContent: "center",
                                  width: width * 0.8,
                                }}
                              >
                                <Icon
                                  name="add-circle"
                                  size={20}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 9,
                                    flex: 0.1,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    marginTop: 5,
                                  }}
                                >
                                  เพิ่มบริษัท
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  // this.setState({AddPersonativity: true});
                                  this.setState({ checkpopupaddmember: true });
                                }}
                                style={{
                                  backgroundColor: "#04a68a",
                                  marginHorizontal: 35,
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 10,
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  alignContent: "center",
                                  width: width * 0.8,
                                }}
                              >
                                <Icon
                                  name="add-circle"
                                  size={20}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 9,
                                    flex: 0.2,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    marginTop: 5,
                                  }}
                                >
                                  {I18n.t("transalte_Add_contact_info")}
                                </Text>
                              </TouchableOpacity>
                            )}

                            {/* มีปุ่ม 3 ปุ่ม มี กลับ ลบผู้เข้าร่วม และ ต่อไป */}
                            <View
                              style={{
                                flexDirection: "row",
                                marginHorizontal: 32,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({ Isative: 2 });
                                }}
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  borderColor: "#2d6dc4",
                                  height: 38,
                                  width: "30%",
                                  borderRadius: 24,
                                  // marginBottom: 15,
                                  borderWidth: 1,
                                  justifyContent: "center",
                                  marginHorizontal: 3,
                                  // flexDirection: 'row',
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 5,
                                    transform: [{ translateX: -10 }],
                                  }}
                                >
                                  <Icon
                                    name="chevron-left"
                                    size={25}
                                    style={{
                                      color: "#2d6dc4",
                                      // marginTop: 9.1,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#2d6dc4",
                                      fontSize: 22,
                                      // textAlign: 'left',
                                      // flex: 0.7,

                                      // marginTop: 9.1,
                                    }}
                                  >
                                    {I18n.t("transalte_Bt_back")}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    Deletemember: true,
                                    IDmember_cidDelete: [],
                                    // CheckBoxAllIDmember_cidDelete :false

                                    checkBoxCitizenIdDelete: [],
                                  });
                                }}
                                style={{
                                  backgroundColor: "#f86767",
                                  width: "34%",
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 15,
                                  justifyContent: "center",
                                  marginHorizontal: 5,
                                  flexDirection: "row",
                                }}
                              >
                                <Icon
                                  name="delete"
                                  size={18}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 9,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    textAlign: "center",
                                    marginTop: 5,
                                  }}
                                >
                                  ลบผู้เข้าร่วม
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  // this.setState({sucess: true});
                                  this.ckdataall();
                                }}
                                style={{
                                  backgroundColor: "#2d6dc4",
                                  width: "30%",
                                  height: 38,
                                  borderRadius: 24,
                                  marginBottom: 15,
                                  justifyContent: "center",
                                  marginHorizontal: 2,
                                  flexDirection: "row",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: 22,
                                    textAlign: "right",
                                    flex: 0.5,
                                    marginTop: 5,
                                  }}
                                >
                                  {I18n.t("translate_Next")}
                                </Text>
                                <Icon
                                  name="chevron-right"
                                  size={25}
                                  style={{
                                    color: "#FFFFFF",
                                    marginTop: 6,
                                    flex: 0.2,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                marginBottom: 20,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",

                                  flex: 1,
                                  justifyContent: "center",
                                  marginHorizontal: 20,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ Deletemember: false });
                                  }}
                                  style={{
                                    borderColor: "#f86969",
                                    borderWidth: 1,
                                    backgroundColor: "#FFFFFF",
                                    flex: 1,
                                    height: 38,
                                    borderRadius: 24,
                                    marginHorizontal: 5,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#f86969",
                                      fontSize: 22,
                                      marginTop: 3.5,
                                    }}
                                  >
                                    ยกเลิก
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    // this.setState({Deletemember: false});
                                    this._sendDeleteDataparticipant();
                                  }}
                                  style={{
                                    backgroundColor: "#f86969",

                                    flex: 1,
                                    height: 38,
                                    borderRadius: 24,
                                    marginHorizontal: 5,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignContent: "center",
                                  }}
                                >
                                  <Icon
                                    name="delete"
                                    size={20}
                                    style={{
                                      color: "#FFFFFF",
                                      flex: 0.3,
                                      marginTop: 9,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontSize: 22,
                                      marginTop: 3.5,
                                    }}
                                  >
                                    ลบผู้เข้าร่วม
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
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 32,
                      marginTop: 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ AddPersonativity: false });
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#2d6dc4",
                        height: 38,
                        flex: 1,
                        borderRadius: 24,
                        // marginBottom: 15,
                        borderWidth: 1,
                        justifyContent: "center",
                        marginHorizontal: 3,
                        // flexDirection: 'row',
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 5,
                          transform: [{ translateX: -10 }],
                        }}
                      >
                        <Icon
                          name="chevron-left"
                          size={25}
                          style={{
                            color: "#2d6dc4",
                            marginTop: 0,
                            flex: 0.5,
                          }}
                        />
                        <Text
                          style={{
                            color: "#2d6dc4",
                            fontSize: 22,

                            flex: 0.4,

                            marginTop: 0,
                          }}
                        >
                          {I18n.t("transalte_Bt_back")}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // this.setState({AddProduct: false});
                        // this._sendItem_geturlimg()
                        this._addnewmember();
                      }}
                      style={{
                        backgroundColor: "#2d6dc4",
                        flex: 1,
                        height: 38,
                        borderRadius: 24,
                        marginBottom: 15,
                        justifyContent: "center",
                        marginHorizontal: 2,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 22,
                          flex: 0.9,
                          marginTop: 5,

                          textAlign: "center",
                        }}
                      >
                        {I18n.t("translate_Save")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View style={{ marginTop: -9 }}>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ Isative: 3, sucess: false });
                }}
                style={{
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  borderColor: "#2d6dc4",
                  height: 40,
                  borderRadius: 24,
                  borderWidth: 1,
                  flexDirection: "row",
                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Icon
                    name="keyboard-arrow-left"
                    size={25}
                    style={{ color: "#2d6dc4" }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      right: 12,
                      fontSize: 22,
                      color: "#2d6dc4",
                    }}
                  >
                    {I18n.t("transalte_Bt_back")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* ปุ่มยืนยัน */}
            <View
              style={{
                marginHorizontal: 25,

                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.sucess__();
                }}
                style={{
                  backgroundColor: "#2d6dc4",

                  borderRadius: 24,
                  height: 40,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",

                    fontSize: 22,
                    color: "#FFFFFF",
                  }}
                >
                  ยืนยันการสมัคร
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  getStatus1: state.dataReducer.getStatus,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevlopRegister);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // height: 70,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 110,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  header: {
    width: "100%",
    paddingVertical: 5,
    // paddingHorizontal: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d6dc4",
    // marginHorizontal: 15,
  },
});
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 23,
    color: "#73838f",
    // paddingHorizontal: 10,
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingBottom: 5,
    flex: 0.8,
    width: "100%",
  },
  inputAndroid: {
    height: 40,
    fontSize: 23,
    color: "#73838f",
    fontWeight: "normal",
    fontFamily: "PSL Kittithada Pro",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 70,
  },
  inputMore: {
    color: "red",
  },
});
