import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Linking,
  ScrollView,
  ImageBackground,
  Share,
  Alert,
} from 'react-native';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import {ListItem, CheckBox, Overlay} from 'react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';

import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import {
  getBasket,
  getBasketNewsAI,
  CheckRegisterActivity,
  RegisterActivity,
} from '../../actions/data.actions';
import {DeleteBasket, SendNoteMem} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import I18n from '../../utils/I18n';
import Styles from './Styles';
import Popup from '../../components/Popup';
import Icon2 from 'react-native-vector-icons/AntDesign';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';
import CountryPicker from '../../lib_edit/react-native-country-picker-modal';
import Icon6 from 'react-native-vector-icons/MaterialIcons';
import {height} from '../Typeappeal/Styles';

class Mybasket extends React.Component {
  constructor(props) {
    super(props);
    // console.log('IDIDIDID', this.props.id )
    const {navigation, route} = this.props;

    if (navigation != undefined) {
      console.log('TEST', route.params);
      console.log(this.props.id);
    }
    this.arrayholder = [];
  }

  state = {
    tabnewscheck: 0,
    Seach: '',
    delete: false,
    checkBox: [],
    idAct: [],

    IDcard:
      this.props.getUser.userDetails.res_result.member != undefined
        ? this.props.getUser.userDetails.res_result.naturalId
        : this.props.getUser.userDetails.res_result.naturalId,

    CheckBoxAll: false,
    CheckBoxAll2: false,
    CheckBoxAll3: false,
    CheckBoxAll4: false,
    CheckBoxAll5: false,
    ckhide: false,

    Show: false,
    checkBoxMarket: [],
    checkBoxContect: [],
    checkBoxContectNet: [],
    checkBoxContectNet: [],
    checkBox4: false,

    checkBox5: false,
    checkBoxContectNet: [],
    checkBox6: false,
    noteOver: false,
    note: [],
    note2: [],
    DataType: [],
    DataTypeAI: [],
    Menu: 1,
    isFocused: false,
    PopAccept: false,
    total: [],
    ssoid: '',
    refresh: false,
    SussesNote: null,
    notetype: null,
    membertype: null,
    editNickname: false,
    Nname: '',
    tel_country_code: null,
    tel_code: null,
    tabsgo: 0,
    PopAccept2: false,
    MRname:
      this.props.getUser.userDetails.res_result.corporate != undefined
        ? this.props.getUser.userDetails.res_result.corporate.name
        : '555',
  };

  componentDidCatch() {
    console.log(
      'SETID AGING!!!!! componentDidCatch ',
      this.props.getUser.userDetails.res_result.corporate,
    );
    let initialCheck = this.state.lists.map(() => false);
    this.setState({checkBox: initialCheck});
  }

  SearchSubmit = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({DataType: newData});
  };

  SearchSubmitMarket = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({DataType: newData});
  };

  SearchSubmitContect = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name_th.toUpperCase()}${item.lastname_th.toUpperCase()}${item.nick_namne.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({DataType: newData});
  };

  _getBasket = async values => {
    // alert('DEDE')
    try {
      const payload = '/' + this.state.Menu;
      const {authData} = this.props;
      const Token = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }
      const response = await this.props.dispatch(
        getBasket({
          type: payload,
          token: tokenActivity,
          typee: this.props.getUser.userDetails.res_result.type,
        }),
      );

      if (response.res_code === '00') {
        console.log('GGGGGGG======>' + response.result);
        this.setState({total: response});
        if (response.result.guid !== null) {
          this.setState(
            {DataType: response.result, refresh: !this.state.refresh},

            function() {},
          );

          this.arrayholder = this.state.DataType;
        }
      }
    } catch (error) {}
  };

  _getBasketNewsAI = async values => {
    // alert('DEDE')
    try {
      const payload = '/6';
      const {authData} = this.props;
      const Token = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }
      const response = await this.props.dispatch(
        getBasketNewsAI({
          type: payload,
          token: tokenActivity,
          typee: this.props.getUser.userDetails.res_result.type,
        }),
      );

      if ((response.res_code = '00')) {
        console.log('GGGGGGG======>_getBasketANUCHITITI', response.result);
        this.setState({total: response});
        if (response.result.guid !== null) {
          this.setState(
            {DataTypeAI: response.result, refresh: !this.state.refresh},

            function() {},
          );

          this.arrayholder = this.state.DataTypeAI;
        }
      }
    } catch (error) {}
  };

  _DeleteBasket = async values => {
    //  alert('DELETE');
    console.log(this.state.idAct);
    try {
      const {authData} = this.props;
      const Token = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }
      // console.log(this.props.getUser.userDetails.res_result.type);
      const response = await this.props.dispatch(
        DeleteBasket({
          results: {basket: this.state.idAct},
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
      if (response.res_code === '00') {
        var num = this.state.Menu;
        var nummenu = parseInt(num);
        this.SelecMenu(nummenu - 1);
        // alert(nummenu+1)
      }
    } catch (error) {}
  };

  _SendNoteMem = async values => {
    try {
      // console.log(values, 'ID', values.id);
      const {authData} = this.props;
      const Token = authData.token;
      var tokenActivity = '';
      var typee = null;
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }
      // console.log(values.from);
      const response = await this.props.dispatch(
        SendNoteMem({
          results: {
            // member_ssoid: this.state.ssoid,
            type: this.state.notetype,
            note: this.state.note,
            member_type: this.state.membertype,
            nick_name: this.state.Nname,
            type_from: values.from,
            id: values.id,
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
      // console.log(response);
      if (response.res_text === 'success !') {
        this._getBasket();
        this.setState({notetype: null});
        this.setState({Nname: ''});
      }
      console.log('บันทึกโน้ต', response);
    } catch (error) {}
  };

  onShare = async value => {
    console.log('vakkkk', value);
    try {
      const result = await Share.share({
        message: value.activity_list_topic_th + '\n' + value.list_register_url,
        url: value.list_register_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_Share_successfully'));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onShareNews = async value => {
    // console.log('vakkkk', value);
    try {
      const result = await Share.share({
        message: value.title + '\n' + value.link_shered,
        url: '',
      });
      // alert(result.activityType);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_Share_successfully'));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    console.log(
      'SETID AGING!!!!! componentDidCatch ',
      this.props.getUser.userDetails.res_result.corporate != undefined
        ? this.props.getUser.userDetails.res_result.corporate.name
        : '555',
    );
    this._getBasketNewsAI();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      console.log('ID ANUCHIT ', this.props.SetID.ID);
      setTimeout(() => {
        {
          this.props.SetID.ID != undefined
            ? this.props.SetID.ID === 3
              ? this.tabView.goToPage(3)
              : this.tabView.goToPage(4)
            : this.tabView.goToPage(this.state.tabsgo);
        }
      }, 100);
      //Put your Data loading function here instead of my this.loadData()
    });
  }

  /////////// _insertRegister ////////////////

  _insertRegister = async values => {
    // alert(JSON.stringify(values));
    try {
      const {authData} = this.props;
      const payload = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        RegisterActivity({
          result: {
            activity_code: values.activity_code,
            member_cid: values.member_cid,
            type: values.type,
          },
          token: tokenActivity,
        }),
      );

      //  alert(JSON.stringify(values.formTypeActivity))

      // if (response.res_code === '00') {
      // alert(response.result.pid)

      if (values.formTypeActivity === 1) {
        this.props.navigation.navigate('DevlopRegister', {
          img: values.img,
          StarD_1: values.StarD_1,
          EndD_1: values.EndD_1,
          StarD: values.StarD,
          EndD: values.EndD,
          name: values.name,
          location: values.location,
          detail: values.detail,
          partic: values.partic,
          register: values.register,
          code: values.code,
          price: values.price,
          StatusFa: values.StatusFa,
          index: values.index,
          item1: values.item,
          linklive: values.linklive,
          live: values.live,
          Close: values.Close,
          contry_TH: values.contry_TH,
          contry_img_flag: values.contry_img_flag,
          endregis: values.endregis,
          starretgis: values.starretgis,
          product_category: values.product_category,
          daparment_name: values.daparment_name,
          officer_name: values.officer_name,
          deparment_tel: values.deparment_tel,
          pid: response.result.pid,
          activity_code: values.activity_code,
          member_cid: values.member_cid,
          type: values.type,
          case: 1,
          imgtype:
            values.location === 'ออนไลน์'
              ? require('../../image/Elearing.png')
              : require('../../image/devlop.png'),
        });
      } else {
        this.props.navigation.navigate('TradeActivitiesRegister', {
          img: values.img,
          StarD_1: values.StarD_1,
          EndD_1: values.EndD_1,
          StarD: values.StarD,
          EndD: values.EndD,
          name: values.name,
          location: values.location,
          detail: values.detail,
          partic: values.partic,
          register: values.register,
          code: values.code,
          price: values.price,
          StatusFa: values.StatusFa,
          index: values.index,
          item1: values.item,
          linklive: values.linklive,
          live: values.live,
          Close: values.Close,
          contry_TH: values.contry_TH,
          contry_img_flag: values.contry_img_flag,
          endregis: values.endregis,
          starretgis: values.starretgis,
          product_category: values.product_category,
          daparment_name: values.daparment_name,
          officer_name: values.officer_name,
          deparment_tel: values.deparment_tel,
          pid: response.result.pid,
          activity_code: values.activity_code,
          member_cid: values.member_cid,
          type: values.type,
          case: 1,
          img:
            values.img === ''
              ? 'http://one.ditp.go.th/dist/img/icon/no-image.png'
              : values.img,
        });
      }
      // }
    } catch (error) {}
  };

  /////////// _CheckRegister ////////////////

  _CheckRegister = async values => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        CheckRegisterActivity({
          result: {
            activity_code: values.activity_code,
            member_cid: this.state.IDcard,
            type: values.type,
            formTypeActivity: values.formTypeActivity,
          },
          token: tokenActivity,
        }),
      );

      if (response.res_code === '00') {
        this.setState({CheckStatus: response.result.status});

        if (response.result.pid != 0 && response.result.status === false) {
          // alert('case 1')
          alert(response.result.message);
          if (values.formTypeActivity === 1) {
            this.props.navigation.navigate('DevlopRegister', {
              img: values.img,
              StarD_1: values.StarD_1,
              EndD_1: values.EndD_1,
              StarD: values.StarD,
              EndD: values.EndD,
              name: values.name,
              location: values.location,
              detail: values.detail,
              partic: values.partic,
              register: values.register,
              code: values.code,
              price: values.price,
              StatusFa: values.StatusFa,
              index: values.index,
              item1: values.item,
              linklive: values.linklive,
              live: values.live,
              Close: values.Close,
              contry_TH: values.contry_TH,
              contry_img_flag: values.contry_img_flag,
              endregis: values.endregis,
              starretgis: values.starretgis,
              product_category: values.product_category,
              daparment_name: values.daparment_name,
              officer_name: values.officer_name,
              deparment_tel: values.deparment_tel,
              pid: response.result.pid,
              activity_code: values.activity_code,
              member_cid:
                values.member_cid === undefined
                  ? this.state.IDcard
                  : values.member_cid,
              type: values.type,
              case: 1,
              formTypeActivity: values.formTypeActivity,
              imgtype:
                values.location === 'ออนไลน์'
                  ? require('../../image/Elearing.png')
                  : require('../../image/devlop.png'),
            });
          } else {
            this.props.navigation.navigate('TradeActivitiesRegister', {
              img: values.img,
              StarD_1: values.StarD_1,
              EndD_1: values.EndD_1,
              StarD: values.StarD,
              EndD: values.EndD,
              name: values.name,
              location: values.location,
              detail: values.detail,
              partic: values.partic,
              register: values.register,
              code: values.code,
              price: values.price,
              StatusFa: values.StatusFa,
              index: values.index,
              item1: values.item,
              linklive: values.linklive,
              live: values.live,
              Close: values.Close,
              contry_TH: values.contry_TH,
              contry_img_flag: values.contry_img_flag,
              endregis: values.endregis,
              starretgis: values.starretgis,
              product_category: values.product_category,
              daparment_name: values.daparment_name,
              officer_name: values.officer_name,
              deparment_tel: values.deparment_tel,
              pid: response.result.pid,
              activity_code: values.activity_code,
              member_cid: values.member_cid,
              type: values.type,
              case: 1,
              img:
                values.img === ''
                  ? 'http://one.ditp.go.th/dist/img/icon/no-image.png'
                  : values.img,
            });
          }
        } else if (
          response.result.pid === 0 &&
          response.result.status === true
        ) {
          Alert.alert(
            response.result.message,
            '',
            [
              {
                text: I18n.t('translate_Cancel'),
                onPress: () => console.log('OK cancel'),
              },
              {
                text: I18n.t('translate_Accept'),
                onPress: () => this._insertRegister(values),
                // console.log('OK Pressed'),

                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          alert(response.result.message);
        }
      }

      // alert(
      //  JSON.stringify(response)
      // );
    } catch (error) {}
  };

  CheckMonth = month => {
    // console.log(month);
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

  Star_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
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

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm);
    return date.toString();
  }

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }

  FullDate(Viewdate) {
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
    date = dd + ' ' + this.CheckMonthFull(mm) + ' ' + yyyy;
    return date.toString();
  }

  web(item) {
    var uri = item.split('/');
    console.log(uri[10]);
    return uri[10];
  }

  Phonenumber(tel) {
    return (
      tel.substring(0, 3) +
      '-' +
      tel.substring(3, 6) +
      '-' +
      tel.substring(6, 10)
    );
  }

  selecAllitem = () => {
    let {DataType, idAct} = this.state;
    if (this.state.CheckBoxAll === false) {
      DataType.map(data =>
        idAct.push({
          basket_code: data.activity_code.toString(),
          basket_type: '1',
        }),
      );
    } else {
      DataType.map(data => idAct.pop(data.activity_code), console.log('55555'));
    }
  };

  selecitem = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.activity_code.toString(),
        basket_type: '1',
      });
    } else {
      this.setState({CheckBoxAll: false});
      idAct.pop(item.activity_code);
    }
  };

  selecAllitem2 = () => {
    let {DataType, idAct} = this.state;
    if (this.state.CheckBoxAll2 === false) {
      DataType.map(data =>
        idAct.push({
          basket_code: data.activity_code.toString(),
          basket_type: '2',
        }),
      );
    } else {
      DataType.map(data => idAct.pop(data.activity_code));
    }
  };

  selecitem2 = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll2} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.activity_code.toString(),
        basket_type: '2',
      });
    } else {
      this.setState({CheckBoxAll2: false});
      idAct.pop(item.activity_code);
    }
  };

  selecAllitem3 = () => {
    let {DataType, idAct} = this.state;
    if (this.state.CheckBoxAll3 === false) {
      DataType.map(data =>
        idAct.push({
          basket_code: data.guid.toString(),
          basket_type: '3',
        }),
      );
    } else {
      DataType.map(data => idAct.pop(data.guid));
    }
  };

  selecitem3 = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll3} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.guid.toString(),
        basket_type: '3',
      });
    } else {
      this.setState({CheckBoxAll3: false});
      idAct.pop(item.guid);
    }
  };

  selecAllitemnewsAI = () => {
    let {DataTypeAI, idAct} = this.state;
    if (this.state.CheckBoxAllAI === false) {
      DataTypeAI.map(data =>
        idAct.push({
          basket_code: data.new_ID.toString(),
          basket_type: '6',
        }),
      );
    } else {
      DataTypeAI.map(data => idAct.pop(data.guid));
    }
  };

  selecitemnewsAI = ({item, index}) => {

    console.log("TYTYTY")
    let {checkBox, idAct, DataType, CheckBoxAll3} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.new_ID.toString(),
        basket_type: '6',
      });
    } else {
      this.setState({CheckBoxAll3: false});
      idAct.pop(item.new_ID);
    }

    console.log(this.state.idAct)
  };


  selecAllitemCon = () => {
    let {DataType, idAct} = this.state;
    if (this.state.CheckBoxAll === false) {
      DataType.map(data =>
        idAct.push({
          basket_code: data.ssoid.toString(),
          basket_type: '4',
        }),
      );
    } else {
      DataType.map(data => idAct.pop(data.ssoid), console.log('55555'));
    }
  };

  selecitem4 = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll4} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.ssoid.toString(),
        basket_type: '4',
      });
    } else {
      this.setState({CheckBoxAll4: false});
      idAct.pop(item.ssoid);
    }
  };

  selecAllitemCon2 = () => {
    let {DataType, idAct} = this.state;
    if (this.state.CheckBoxAll === false) {
      DataType.map(data =>
        idAct.push({
          basket_code: data.ssoid.toString(),
          basket_type: '5',
        }),
      );
    } else {
      DataType.map(data => idAct.pop(data.ssoid), console.log('55555'));
    }
  };

  selecitem5 = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll5} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    if (checkBox[index] === true) {
      idAct.push({
        basket_code: item.ssoid.toString(),
        basket_type: '5',
      });
    } else {
      this.setState({CheckBoxAll5: false});
      idAct.pop(item.ssoid);
    }
  };

  async openLink(item) {
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${item}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    // console.log(item);
    // console.log(url);

    const headers = {};
    const client_id = {};
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deepLink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  uriCheck(uri) {
    var check = uri.split('.');
    var check2 = check[4];

    return check2;
  }

  async openLinknewsAI(item) {
    // console.log(item);

    const deepLink = getDeepLinkAct();
    const url = item;
    // console.log('OK', url);

    const headers = {};
    const client_id = {};
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deepLink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  onShareNewsAI = async value => {
    // console.log('vakkkk', value);
    try {
      const result = await Share.share({
        message: value.title + "\n"+ value.url,
        url: value.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_Share_successfully'));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  ListActivity = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View>
        {this.state.delete === false ? (
          <ListItem
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
              width: '95%',
              shadowColor: '#f4f6fa ',
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowOpacity: 0.18,
              // shadowRadius: 1.00,

              elevation: 1,
            }}
            style={{
              width: '100%',
              height: null,
              flex: 1,

              backgroundColor: '#f4f5f850',
            }}
            leftAvatar={
              <View style={{flex: 0.4, alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity style={{alignItems: 'center'}}>
                    <Image
                      source={{uri: item.activity_list_logo_thumb}}
                      style={{width: 60, height: 55, borderRadius: 15}}
                    />
                    <Text style={Styles.textActivitydate}>
                      {this.Star_Date(item.activity_list_start_date)}
                      {this.End_Date(item.activity_list_end_date)}{' '}
                      {this.Yearend(item.activity_list_end_date)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            title={
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text numberOfLines={2} style={Styles.textActivityTitle}>
                      {I18n.locale === 'th'
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en}
                    </Text>
                  </View>
                  <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                    {/* <Image
                      style={{width: 24, height: 24, top: -8, left: 5}}
                      source={require('../../image/startoppick.png')}
                    /> */}
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        style={{width: 13, height: 13, top: 3}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 9, height: 12, top: 3}}
                        source={require('../../image/makerlocation.png')}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1.4,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    <Text numberOfLines={2} style={Styles.textactivityloca}>
                      {' '}
                      {I18n.locale === 'th'
                        ? item.activity_list_location_th
                        : item.activity_list_location_en}
                    </Text>
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View style={[Styles.ViewSub10]}>
                {this.props.getUser.userDetails.res_result.type != 6 && (
                  // this.props.getStatus1.isResult.status_confirm_identity
                  //   .status_code != 0 &&
                  // this.props.getStatus1.isResult.status_confirm_identity
                  //   .status_code != 1 &&
                  <View style={{alignItems: 'center'}}>
                    {this.props.getUser.userDetails.res_result.type != 6 &&
                      this.props.getUser.userDetails.res_result.type != 4 && (
                        <TouchableOpacity
                          disabled={item.active_status === false}
                          onPress={
                            () => {
                              if (
                                this.props.getStatus1.isResult
                                  .status_confirm_identity.status_code === 0
                              ) {
                                this.props.navigation.navigate('Identity');
                              } else {
                                this.openLink(item.activity_code);

                                // this.props.navigation.navigate(
                                //   'TradeActivitiesRegister',
                                //   {
                                //     img: item.activity_list_logo_thumb,
                                //     imglogo: item.activity_list_logo_banner,
                                //     StarD_1: item.activity_list_start_date,
                                //     EndD_1: item.activity_list_end_date,
                                //     name:
                                //       I18n.locale === 'th'
                                //         ? item.activity_list_topic_th
                                //         : item.activity_list_topic_en,
                                //     location:
                                //       I18n.locale === 'th'
                                //         ? item.activity_list_location_th
                                //         : item.activity_list_topic_en,
                                //     detail: item.activity_list_desc_th,
                                //     partic: item.max_of_participate,
                                //     register: item.list_register_url,
                                //     code: item.activity_code,
                                //     price:
                                //       I18n.locale === 'th'
                                //         ? item.activity_price_th
                                //         : item.activity_price_en,
                                //     // StatusFa: this.state.Selec[
                                //     //   item.activity_code
                                //     // ],
                                //     index: index,
                                //     item1: item,
                                //     linklive: item.activity_list_live_url,
                                //     live: item.status_live,
                                //     endregis: this.FullDate(
                                //       item.activity_list_end_regis,
                                //     ),
                                //     starretgis: this.FullDate(
                                //       item.activity_list_start_regis,
                                //     ),
                                //     product_category:
                                //       item.activity_product_category,
                                //     daparment_name:
                                //       item.activity_list_department_name,
                                //     officer_name:
                                //       item.activity_list_officer_name,
                                //     deparment_tel:
                                //       item.activity_list_department_tel,
                                //     partic: item.max_of_participate,
                                //   },
                                // );
                              }
                            }
                            // this.openLink(this.web(item.list_register_url))
                          }
                          style={
                            item.active_status === false
                              ? Styles.TouchStyle1
                              : Styles.TouchStyle
                          }>
                          <Text style={Styles.textactivityRegiter}>
                            {item.active_status === true
                              ? I18n.t('translate_Apply_activities')
                              : I18n.t('translate_Applacation')}
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                )}
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        Show: true,
                        title:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        location:
                          I18n.locale === 'th'
                            ? item.activity_list_location_th
                            : item.activity_list_location_en,
                        Stardate: item.activity_list_start_date,
                        Enddate: item.activity_list_end_date,
                        desc:
                          I18n.locale === 'th'
                            ? item.activity_list_desc_th
                            : item.activity_list_desc_en,
                        countPe: item.max_of_participate,
                        codeAct: item.activity_code,

                        banner: item.activity_list_logo_banner,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        Close: item.active_status,
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        partic: item.max_of_participate,
                        activity_code: item.activity_code,
                        member_cid: this.state.IDcard,
                        type: this.props.getUser.userDetails.res_result.type,
                        formTypeActivity: item.formTypeActivity,
                        img: item.activity_list_logo_banner,
                        StarD_1: item.activity_list_start_date,
                        EndD_1: item.activity_list_end_date,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
                        name:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        detail: item.activity_list_desc_th,
                        partic: item.max_of_participate,
                        register: item.list_register_url,
                        code: item.activity_code,
                        index: index,
                        item1: item,
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        Close: item.active_status,
                        contry_TH:
                          I18n.locale === 'th'
                            ? item.list_country_name_th
                            : item.list_country_name_en,
                        contry_img_flag: item.img_flag,
                        endregis: this.FullDate(item.activity_list_end_regis),
                        starretgis: this.FullDate(
                          item.activity_list_start_regis,
                        ),
                        imgtype: require('../../image/devlop.png'),
                        contry_img_flag: item.img_flag,
                      })
                    }
                    style={Styles.TouchRead}>
                    <Image
                      style={{width: 17, height: 13}}
                      source={require('../../image/readDetail.png')}
                    />
                    <Text numberOfLines={1} style={Styles.textactivityread}>
                      {' '}
                      {I18n.t('translate_Readmore')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // alert('WOWOWOW')
                    this.onShare(item);
                  }}
                  style={{flex: 0.5, alignItems: 'flex-end'}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        ) : (
          <ListItem
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
              width: '95%',
              shadowColor: '#f4f6fa ',
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowOpacity: 0.18,
              // shadowRadius: 1.00,

              elevation: 1,
            }}
            style={{
              width: '100%',
              height: null,
              flex: 1,

              backgroundColor: '#f4f5f850',
            }}
            leftAvatar={
              <View style={{flex: 0.4, alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity style={{alignItems: 'center'}}>
                    <Image
                      source={{uri: item.activity_list_logo_thumb}}
                      style={{width: 60, height: 55, borderRadius: 15}}
                    />
                    <Text style={Styles.textActivitydate}>
                      {this.Star_Date(item.activity_list_start_date)}
                      {this.End_Date(item.activity_list_end_date)}{' '}
                      {this.Yearend(item.activity_list_end_date)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            title={
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '83%'}}>
                    <Text numberOfLines={2} style={Styles.textActivityTitle}>
                      {I18n.locale === 'th'
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      bottom: 10,
                    }}>
                    <CheckBox
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() => {
                        this.selecitem({item: item, index: index});
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,

                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        style={{width: 13, height: 13, top: 3}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 9, height: 12, top: 3}}
                        source={require('../../image/makerlocation.png')}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1.4,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    <Text numberOfLines={2} style={Styles.textactivityLoca}>
                      {'  '}
                      {I18n.locale === 'th'
                        ? item.activity_list_location_th
                        : item.activity_list_location_en}
                    </Text>
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View style={[Styles.ViewSub10]}>
                <View style={{alignItems: 'center'}}>
                  {this.props.getUser.userDetails.res_result.type != 6 &&
                    this.props.getUser.userDetails.res_result.type != 4 && (
                      <TouchableOpacity
                        // this.openLink(this.web(item.list_register_url))

                        style={
                          item.active_status === false
                            ? Styles.TouchStyle1
                            : Styles.TouchStyle
                        }>
                        <Text style={Styles.fontAct}>
                          {item.active_status === true
                            ? I18n.t('translate_Apply_activities')
                            : I18n.t('translate_Applacation')}
                        </Text>
                      </TouchableOpacity>
                    )}
                </View>

                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        Show: true,
                        title:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        location:
                          I18n.locale === 'th'
                            ? item.activity_list_location_th
                            : item.activity_list_location_en,
                        Stardate: item.activity_list_start_date,
                        Enddate: item.activity_list_end_date,
                        desc:
                          I18n.locale === 'th'
                            ? item.activity_list_desc_th
                            : item.activity_list_desc_en,
                        countPe: item.max_of_participate,
                        codeAct: item.activity_code,

                        banner: item.activity_list_logo_banner,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        Close: item.active_status,
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        partic: item.max_of_participate,
                        activity_code: item.activity_code,
                        member_cid: this.state.IDcard,
                        type: this.props.getUser.userDetails.res_result.type,
                        formTypeActivity: item.formTypeActivity,
                        img: item.activity_list_logo_banner,
                        StarD_1: item.activity_list_start_date,
                        EndD_1: item.activity_list_end_date,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
                        name:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        detail: item.activity_list_desc_th,
                        partic: item.max_of_participate,
                        register: item.list_register_url,
                        code: item.activity_code,
                        index: index,
                        item1: item,
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        Close: item.active_status,
                        contry_TH:
                          I18n.locale === 'th'
                            ? item.list_country_name_th
                            : item.list_country_name_en,
                        contry_img_flag: item.img_flag,
                        endregis: this.FullDate(item.activity_list_end_regis),
                        starretgis: this.FullDate(
                          item.activity_list_start_regis,
                        ),
                        imgtype: require('../../image/devlop.png'),
                        contry_img_flag: item.img_flag,
                      })
                    }
                    style={Styles.TouchRead}>
                    <Image
                      style={{width: 17, height: 13}}
                      source={require('../../image/readDetail.png')}
                    />
                    <Text numberOfLines={1} style={Styles.textactivityread}>
                      {' '}
                      {I18n.t('translate_Readmore')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.onShare(item);
                  }}
                  style={{flex: 0.5, alignItems: 'flex-end'}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    );
  };

  Listdevelop = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View style={{}}>
        {this.state.delete === false ? (
          <ListItem
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
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
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        source={require('../../image/Elearing.png')}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                    ) : (
                      <Image
                        source={require('../../image/devlop.png')}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                    )}

                    <Text style={Styles.textActivitydate}>
                      {this.Star_Date(item.activity_list_start_date)}
                      {this.End_Date(item.activity_list_end_date)}{' '}
                      {this.Yearend(item.activity_list_end_date)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            title={
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 19,
                        color: '#4b4b4b',
                        fontFamily: 'Kittithada Bold 75',
                      }}>
                      {I18n.locale === 'th'
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en}
                    </Text>
                  </View>
                  <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                    {/* <Image
                      style={{width: 24, height: 24, top: -8, left: 5}}
                      source={require('../../image/startoppick.png')}
                    /> */}
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        style={{width: 13, height: 13, top: 3}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 9, height: 12, top: 3}}
                        source={require('../../image/makerlocation.png')}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1.4,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    <Text numberOfLines={2} style={Styles.textActivityTitle}>
                      {' '}
                      {I18n.locale === 'th'
                        ? item.activity_list_location_th
                        : item.activity_list_location_en}
                    </Text>
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View style={[Styles.ViewSub10]}>
                {/* {this.props.getUser.userDetails.res_result.type != 6 && 
                  // this.props.getStatus1.isResult.status_confirm_identity
                  //   .status_code != 0 &&
                  // this.props.getStatus1.isResult.status_confirm_identity
                  //   .status_code != 1 && ( */}
                <View style={{alignItems: 'center'}}>
                  {this.props.getUser.userDetails.res_result.type != 6 &&
                    this.props.getUser.userDetails.res_result.type != 4 && (
                      <TouchableOpacity
                        disabled={item.active_status === false}
                        onPress={() => {
                          if (
                            this.props.getStatus1.isResult
                              .status_confirm_identity.status_code === 0
                          ) {
                            this.props.navigation.navigate('Identity');
                          } else {
                            // this.openLink(item.activity_code)
                            this._CheckRegister({
                              img: item.activity_list_logo_thumb,
                              imglogo: item.activity_list_logo_banner,
                              StarD_1: item.activity_list_start_date,
                              EndD_1: item.activity_list_end_date,
                              name:
                                I18n.locale === 'th'
                                  ? item.activity_list_topic_th
                                  : item.activity_list_topic_en,
                              location:
                                I18n.locale === 'th'
                                  ? item.activity_list_location_th
                                  : item.activity_list_topic_en,
                              detail: item.activity_list_desc_th,
                              partic: item.max_of_participate,
                              register: item.list_register_url,
                              code: item.activity_code,
                              price:
                                I18n.locale === 'th'
                                  ? item.activity_price_th
                                  : item.activity_price_en,
                              // StatusFa: this.state.Selec[
                              //   item.activity_code
                              // ],
                              index: index,
                              item1: item,
                              linklive: item.activity_list_live_url,
                              live: item.status_live,
                              product_category: item.activity_product_category,
                              daparment_name:
                                item.activity_list_department_name,
                              officer_name: item.activity_list_officer_name,
                              deparment_tel: item.activity_list_department_tel,

                              formTypeActivity: item.formTypeActivity,
                              activity_code: item.activity_code,
                              type: this.props.getUser.userDetails.res_result
                                .type,
                              member_cid: this.state.IDcard,
                            });
                          }
                        }}
                        style={
                          item.active_status === false
                            ? Styles.TouchStyle1
                            : Styles.TouchStyle
                        }>
                        <Text style={Styles.textactivityRegiter}>
                          {item.active_status === true
                            ? I18n.t('translate_Apply_activities')
                            : I18n.t('translate_Applacation')}
                        </Text>
                      </TouchableOpacity>
                    )}
                </View>
                {/* )} */}

                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        Show: true,
                        title:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        location:
                          I18n.locale === 'th'
                            ? item.activity_list_location_th
                            : item.activity_list_location_en,
                        Stardate: item.activity_list_start_date,
                        Enddate: item.activity_list_end_date,
                        desc:
                          I18n.locale === 'th'
                            ? item.activity_list_desc_th
                            : item.activity_list_desc_en,
                        countPe: item.max_of_participate,
                        codeAct: item.activity_code,

                        banner: item.activity_list_logo_banner,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        Close: item.active_status,
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        partic: item.max_of_participate,
                        activity_code: item.activity_code,
                        member_cid: this.state.IDcard,
                        type: this.props.getUser.userDetails.res_result.type,
                        formTypeActivity: item.formTypeActivity,
                        img: item.activity_list_logo_banner,
                        StarD_1: item.activity_list_start_date,
                        EndD_1: item.activity_list_end_date,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
                        name:
                          I18n.locale === 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        detail: item.activity_list_desc_th,
                        partic: item.max_of_participate,
                        register: item.list_register_url,
                        code: item.activity_code,
                        index: index,
                        item1: item,
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        Close: item.active_status,
                        contry_TH:
                          I18n.locale === 'th'
                            ? item.list_country_name_th
                            : item.list_country_name_en,
                        contry_img_flag: item.img_flag,
                        endregis: this.FullDate(item.activity_list_end_regis),
                        starretgis: this.FullDate(
                          item.activity_list_start_regis,
                        ),
                        imgtype: require('../../image/devlop.png'),
                        contry_img_flag: item.img_flag,
                      })
                    }
                    style={Styles.TouchRead}>
                    <Image
                      style={{width: 17, height: 13}}
                      source={require('../../image/readDetail.png')}
                    />
                    <Text numberOfLines={1} style={Styles.textactivityread}>
                      {' '}
                      {I18n.t('translate_Readmore')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={{flex: 1, marginHorizontal: 8}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    // alert('WOWOWOW')
                    this.onShare(item);
                  }}
                  style={{flex: 0.5, alignItems: 'flex-end'}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        ) : (
          <ListItem
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
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
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        source={require('../../image/Elearing.png')}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                    ) : (
                      <Image
                        source={require('../../image/devlop.png')}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                    )}
                    <Text style={Styles.textActivitydate}>
                      {this.Star_Date(item.activity_list_start_date)}
                      {this.End_Date(item.activity_list_end_date)}{' '}
                      {this.Yearend(item.activity_list_end_date)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            title={
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '83%'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 19,
                        color: '#4b4b4b',
                        fontFamily: 'Kittithada Bold 75',
                      }}>
                      {I18n.locale === 'th'
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      bottom: 10,
                    }}>
                    <CheckBox
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() => {
                        this.selecitem2({item: item, index: index});
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,

                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        style={{width: 13, height: 13, top: 3}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 9, height: 12, top: 3}}
                        source={require('../../image/makerlocation.png')}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1.4,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{fontSize: 15.5, color: '#6f819a'}}>
                      {'  '}
                      {I18n.locale === 'th'
                        ? item.activity_list_location_th
                        : item.activity_list_location_en}
                    </Text>
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View style={[Styles.ViewSub10]}>
                <View style={{alignItems: 'center'}}>
                  {this.props.getUser.userDetails.res_result.type != 6 &&
                    this.props.getUser.userDetails.res_result.type != 4 && (
                      <TouchableOpacity
                        disabled={item.active_status === false}
                        onPress={() => {
                          if (
                            this.props.getStatus1.isResult
                              .status_confirm_identity.status_code === 0
                          ) {
                            this.props.navigation.navigate('Identity');
                          } else {
                            this.openLink(item.activity_code);
                            // this._CheckRegister({
                            //   img: item.activity_list_logo_thumb,
                            //   imglogo: item.activity_list_logo_banner,
                            //   StarD_1: item.activity_list_start_date,
                            //   EndD_1: item.activity_list_end_date,
                            //   name:
                            //     I18n.locale === 'th'
                            //       ? item.activity_list_topic_th
                            //       : item.activity_list_topic_en,
                            //   location:
                            //     I18n.locale === 'th'
                            //       ? item.activity_list_location_th
                            //       : item.activity_list_topic_en,
                            //   detail: item.activity_list_desc_th,
                            //   partic: item.max_of_participate,
                            //   register: item.list_register_url,
                            //   code: item.activity_code,
                            //   price:
                            //     I18n.locale === 'th'
                            //       ? item.activity_price_th
                            //       : item.activity_price_en,
                            //   // StatusFa: this.state.Selec[
                            //   //   item.activity_code
                            //   // ],
                            //   index: index,
                            //   item1: item,
                            //   linklive: item.activity_list_live_url,
                            //   live: item.status_live,
                            //   product_category: item.activity_product_category,
                            //   daparment_name:
                            //     item.activity_list_department_name,
                            //   officer_name: item.activity_list_officer_name,
                            //   deparment_tel: item.activity_list_department_tel,

                            //   formTypeActivity: item.formTypeActivity,
                            //   activity_code: item.activity_code,
                            //   type: this.props.getUser.userDetails.res_result
                            //     .type,
                            //   member_cid: this.state.IDcard,
                            // });
                          }
                        }}
                        style={
                          item.active_status === false
                            ? Styles.TouchStyle1
                            : Styles.TouchStyle
                        }>
                        <Text style={Styles.fontAct}>
                          {item.active_status === true
                            ? I18n.t('translate_Apply_activities')
                            : I18n.t('translate_Applacation')}
                        </Text>
                      </TouchableOpacity>
                    )}
                </View>

                {/* <View style={{flex: 1,borderWidth:1}}> */}
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      Show: true,
                      title:
                        I18n.locale === 'th'
                          ? item.activity_list_topic_th
                          : item.activity_list_topic_en,
                      location:
                        I18n.locale === 'th'
                          ? item.activity_list_location_th
                          : item.activity_list_location_en,
                      Stardate: item.activity_list_start_date,
                      Enddate: item.activity_list_end_date,
                      desc:
                        I18n.locale === 'th'
                          ? item.activity_list_desc_th
                          : item.activity_list_desc_en,
                      countPe: item.max_of_participate,
                      codeAct: item.activity_code,

                      banner: item.activity_list_logo_banner,
                      price:
                        I18n.locale === 'th'
                          ? item.activity_price_th
                          : item.activity_price_en,
                      Close: item.active_status,
                      product_category: item.activity_product_category,
                      daparment_name: item.activity_list_department_name,
                      officer_name: item.activity_list_officer_name,
                      deparment_tel: item.activity_list_department_tel,
                      partic: item.max_of_participate,
                      activity_code: item.activity_code,
                      member_cid: this.state.IDcard,
                      type: this.props.getUser.userDetails.res_result.type,
                      formTypeActivity: item.formTypeActivity,
                      img: item.activity_list_logo_banner,
                      StarD_1: item.activity_list_start_date,
                      EndD_1: item.activity_list_end_date,
                      StarD: this.FullDate(item.activity_list_start_date),
                      EndD: this.FullDate(item.activity_list_end_date),
                      name:
                        I18n.locale === 'th'
                          ? item.activity_list_topic_th
                          : item.activity_list_topic_en,
                      detail: item.activity_list_desc_th,
                      partic: item.max_of_participate,
                      register: item.list_register_url,
                      code: item.activity_code,
                      index: index,
                      item1: item,
                      linklive: item.activity_list_live_url,
                      live: item.status_live,
                      Close: item.active_status,
                      contry_TH:
                        I18n.locale === 'th'
                          ? item.list_country_name_th
                          : item.list_country_name_en,
                      contry_img_flag: item.img_flag,
                      endregis: this.FullDate(item.activity_list_end_regis),
                      starretgis: this.FullDate(item.activity_list_start_regis),
                      imgtype: require('../../image/devlop.png'),
                      contry_img_flag: item.img_flag,
                    })
                  }
                  style={Styles.TouchRead}>
                  <Image
                    style={{width: 17, height: 13}}
                    source={require('../../image/readDetail.png')}
                  />
                  <Text numberOfLines={1} style={Styles.TextRead}>
                    {' '}
                    {I18n.t('translate_Readmore')}
                  </Text>
                </TouchableOpacity>
                {/* </View> */}
                <TouchableOpacity
                  onPress={() => {
                    this.onShare(item);
                  }}
                  style={{flex: 1, marginHorizontal: 8}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    );
  };

  ListMarket = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View>
        {this.state.delete === false ? (
          //yy
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ViewMarketCountry', {
                uri: item.link_shered,
                image: item.flag_url,
                title: item.title,
                timeElapsed: item.timeElapsed,
                country_name: item.country_name,
                view: item.view,
                market_id: item.market_id,
                ck: true,
              });
            }}>
            <ListItem
              // style={Styles.ListStyle}
              // onPress={() => Linking.openURL(item.link_shered)}
              // containerStyle={Styles.ContainerList4}
              containerStyle={{
                marginBottom: 8,
                borderRadius: 10,
                alignSelf: 'center',
                flex: 1,
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
              title={
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '90%'}}>
                    <Text
                      numberOfLines={2}
                      style={Styles.textActivityTitleNews}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{width: '10%', alignItems: 'center'}}>
                    {/* <Image
                      style={{width: 24, height: 24, top: -8}}
                      source={require('../../image/startoppick.png')}
                    /> */}
                  </View>
                </View>
              }
              titleStyle={Styles.ListTitleStyle}
              leftAvatar={
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                    marginTop: -25,
                  }}>
                  <Image
                    style={{width: 33, height: 24}}
                    source={{uri: item.flag_url}}
                  />
                </View>
              }
              subtitle={
                <View style={Styles.ViewSubtitle}>
                  <View style={Styles.ViewSubtitle2}>
                    <Text style={Styles.fontSubtitle}>{item.timeElapsed}</Text>
                    <Text numberOfLines={1} style={[Styles.fontSubtitle]}>
                      {' '}
                      - {item.country_name}
                    </Text>
                  </View>
                  <View style={[Styles.ViewSubtitle3, {right: 10}]}>
                    <TouchableOpacity style={Styles.TouchSutitle}>
                      <Image
                        style={{width: 21, height: 13}}
                        source={require('../../image/eyeviewx.png')}
                      />
                      <Text style={Styles.fontSubtitle}>
                        {' '}
                        {item.view} {I18n.t('translate_View')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onShareNews(item);

                      // alert(JSON.stringify(item))
                    }}
                    style={{alignSelf: 'flex-end', marginTop: -25, flex: 0.1}}>
                    <Image
                      resizeMode={'contain'}
                      style={{width: 14, height: 16}}
                      source={require('../../image/sharelx.png')}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </TouchableOpacity>
        ) : (
          <ListItem
            // containerStyle={Styles.ContainerList2}
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
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
            title={
              <View style={Styles.ViewListPop2}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '90%'}}>
                    <Text numberOfLines={2} style={Styles.ListTitleStyle}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, flexDirection: 'row-reverse', bottom: 10}}>
                    <CheckBox
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() =>
                        this.selecitem3({item: item, index: index})
                      }
                    />
                  </View>
                </View>
              </View>
            }
            leftAvatar={
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  bottom: 12,
                }}>
                <Image
                  style={{width: 33, height: 24}}
                  source={{uri: item.flag_url}}
                />
              </View>
            }
            subtitle={
              <View style={Styles.ViewSubtitle}>
                <View style={Styles.ViewSubtitle2}>
                  <Text style={Styles.fontSubtitle}>{item.timeElapsed}</Text>
                  <Text style={Styles.fontSubtitle}>
                    {' '}
                    - {item.country_name}
                  </Text>
                </View>
                <View style={[Styles.ViewSubtitle3, {right: 10}]}>
                  <TouchableOpacity style={Styles.TouchSutitle}>
                    <Image
                      style={{width: 21, height: 13}}
                      source={require('../../image/eyeviewx.png')}
                    />
                    <Text style={Styles.fontSubtitle}>
                      {' '}
                      {item.view} {I18n.t('translate_View')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.onShare(item);
                  }}
                  style={{alignSelf: 'flex-end', marginTop: -25, flex: 0.1}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    );
  };
  ListNewsAI = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View>
        {this.state.delete === false ? (
          //yy
          <TouchableOpacity onPress={() => {}}>
            <ListItem
              // style={Styles.ListStyle}
              // onPress={() => Linking.openLinknewsAI(item.link_shered)}
              // containerStyle={Styles.ContainerList4}
              containerStyle={{
                marginBottom: 8,
                borderRadius: 10,
                alignSelf: 'center',
                flex: 1,
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
              title={
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '90%'}}>
                    <Text
                      numberOfLines={2}
                      style={Styles.textActivityTitleNews}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{width: '10%', alignItems: 'center'}}>
                    {/* <Image
                      style={{width: 24, height: 24, top: -8}}
                      source={require('../../image/startoppick.png')}
                    /> */}
                  </View>
                </View>
              }
              titleStyle={Styles.ListTitleStyle}
              leftAvatar={
                <View style={{alignItems: 'center', flex: 0.4}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.openLinknewsAI(item.url);
                      
                    }}
                    style={{alignItems: 'center', marginBottom: 8}}>
                    {item.image_url != null ? (
                      <Image
                        source={{uri: item.image_url}}
                        style={{width: 70, height: 68, borderRadius: 2}}
                      />
                    ) : (
                      <Image
                        style={{width: 70, height: 68, borderRadius: 2}}
                        source={require('../../image/imgnull.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <View>
                    <Text style={{color: '#6f819a', fontSize: 14}}>
                      {item.published_date}
                    </Text>
                  </View>
                  {item.sentiment_id == '0' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/+0.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '1' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/+2.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '2' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/+2.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '3' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/+3.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '-3' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/-3.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '-2' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/-2.png')}
                      />
                    </View>
                  )}
                  {item.sentiment_id == '-1' && (
                    <View>
                      <Image
                        style={{width: 68, height: 34, top: 10}}
                        source={require('../../image/-1.png')}
                      />
                    </View>
                  )}
                </View>
              }
              title={
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '84%'}}>
                      <Text
                        onPress={() => {
                          this.openLinknewsAI(item.url);
                        }}
                        numberOfLines={2}
                        style={Styles.textActivityTitl}>
                        {item.title}
                      </Text>
                    </View>
                    {/* <View
                      style={{
                        width: '20%',
                        bottom: 10,
                      }}>
                      <CheckBox
                        checkedIcon={
                          <Image
                            style={{width: 25, height: 25, top: -10}}
                            source={require('../../image/PickerMarket.png')}
                          />
                        }
                        uncheckedIcon={
                          <Image
                            style={{width: 25, height: 25, top: -10}}
                            source={require('../../image/shoping.png')}
                          />
                        }
                        checked={false}
                        onPress={() => {}}
                      />
                    </View> */}
                  </View>
                </View>
              }
              subtitle={
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={Styles.ViewSub10AI}>
                      <Text style={{color: '#8b9bb0', fontSize: 14}}>
                        {I18n.t('transalte_published_by')} - {item.publisher}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                      {item.img != 'http://one.ditp.go.th/Flags/.png' ? (
                        <Image
                          source={{uri: item.img}}
                          style={{width: 16, height: 12, top: 0}}
                        />
                      ) : (
                        <Image
                          style={{width: 9, height: 12, top: 0}}
                          source={require('../../image/makerlocation.png')}
                        />
                      )}
                    </View>
                    <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                      <Text
                        style={{
                          color: '#6f819a',
                          fontSize: 14,
                          letterSpacing: 1,
                        }}>
                        {item.countries_iso_3}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                      <Text
                        onPress={() => {
                          this.openLinknewsAI(item.url);
                        }}
                        numberOfLines={3}
                        style={{color: '#6f819a', fontSize: 14}}>
                        {item.description === null
                          ? item.content
                          : item.description}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',

                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.openLinknewsAI(item.url);
                      }}
                      style={{flexDirection: 'row', flex: 0.5}}>
                      <Image
                        style={{width: 17, height: 13}}
                        source={require('../../image/readDetail.png')}
                      />
                      <Text style={Styles.textreaddetail}>
                        {' '}
                        {I18n.t('translate_Readmore')}
                      </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', flex: 0.8}}>
                      <Text> </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.onShareNewsAI(item);
                        // alert('coming soon')
                      }}
                      style={{flex: 0.2, alignItems: 'flex-end'}}>
                      <Image
                        resizeMode={'contain'}
                        style={{width: 14, height: 16}}
                        source={require('../../image/sharelx.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              }
            />
          </TouchableOpacity>
        ) : (
          <ListItem
            // style={Styles.ListStyle}
            // onPress={() => Linking.openURL(item.link_shered)}
            // containerStyle={Styles.ContainerList4}
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
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
            title={
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '90%'}}>
                  <Text numberOfLines={2} style={Styles.textActivityTitleNews}>
                    {item.title}
                  </Text>
                </View>
                <View style={{width: '10%', alignItems: 'center'}}>
                  {/* <Image
                          style={{width: 24, height: 24, top: -8}}
                          source={require('../../image/startoppick.png')}
                        /> */}
                </View>
              </View>
            }
            titleStyle={Styles.ListTitleStyle}
            leftAvatar={
              <View style={{alignItems: 'center', flex: 0.4}}>
                <TouchableOpacity
                  onPress={() => {
                    this.openLinknewsAI(item.url);
                  }}
                  style={{alignItems: 'center', marginBottom: 8}}>
                  {item.image_url != null ? (
                    <Image
                      source={{uri: item.image_url}}
                      style={{width: 70, height: 68, borderRadius: 2}}
                    />
                  ) : (
                    <Image
                      style={{width: 70, height: 68, borderRadius: 2}}
                      source={require('../../image/imgnull.png')}
                    />
                  )}
                </TouchableOpacity>
                <View>
                  <Text style={{color: '#6f819a', fontSize: 14}}>
                    {item.published_date}
                  </Text>
                </View>
                {item.sentiment_id == '0' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/+0.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '1' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/+2.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '2' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/+2.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '3' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/+3.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '-3' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/-3.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '-2' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/-2.png')}
                    />
                  </View>
                )}
                {item.sentiment_id == '-1' && (
                  <View>
                    <Image
                      style={{width: 68, height: 34, top: 10}}
                      source={require('../../image/-1.png')}
                    />
                  </View>
                )}
              </View>
            }
            title={
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '84%'}}>
                    <Text
                      onPress={() => {
                        this.openLinknewsAI(item.url);
                      }}
                      numberOfLines={2}
                      style={Styles.textActivityTitl}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, flexDirection: 'row-reverse', bottom: 10}}>
                    <CheckBox
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() =>
                        this.selecitemnewsAI({item: item, index: index})
                      }
                    />
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={Styles.ViewSub10AI}>
                    <Text style={{color: '#8b9bb0', fontSize: 14}}>
                      {I18n.t('transalte_published_by')} - {item.publisher}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                    {item.img != 'http://one.ditp.go.th/Flags/.png' ? (
                      <Image
                        source={{uri: item.img}}
                        style={{width: 16, height: 12, top: 0}}
                      />
                    ) : (
                      <Image
                        style={{width: 9, height: 12, top: 0}}
                        source={require('../../image/makerlocation.png')}
                      />
                    )}
                  </View>
                  <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                    <Text
                      style={{
                        color: '#6f819a',
                        fontSize: 14,
                        letterSpacing: 1,
                      }}>
                      {item.countries_iso_3}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={[Styles.ViewSub10AI, {marginHorizontal: 2}]}>
                    <Text
                      onPress={() => {
                        this.openLinknewsAI(item.url);
                      }}
                      numberOfLines={3}
                      style={{color: '#6f819a', fontSize: 14}}>
                      {item.description === null
                        ? item.content
                        : item.description}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',

                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.openLinknewsAI(item.url);
                    }}
                    style={{flexDirection: 'row', flex: 0.5}}>
                    <Image
                      style={{width: 17, height: 13}}
                      source={require('../../image/readDetail.png')}
                    />
                    <Text style={Styles.textreaddetail}>
                      {' '}
                      {I18n.t('translate_Readmore')}
                    </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', flex: 0.8}}>
                    <Text> </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.onShareNewsAI(item);
                      // alert('coming soon')
                    }}
                    style={{flex: 0.2, alignItems: 'flex-end'}}>
                    <Image
                      resizeMode={'contain'}
                      style={{width: 14, height: 16}}
                      source={require('../../image/sharelx.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        )}
      </View>
    );
  };

  Call = number => {
    // console.log(number);
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  timeOut(values) {
    console.log(values);
    if (values != undefined) {
      var time2 = values.split('-').join('/');
      // var time2 = time[0];
      // time2.join('/')
      return time2;
    } else {
      return values;
    }
  }

  ListContact = ({item, index}) => {
    this.state.checkBox.push(false);

    return (
      <View>
        {this.state.noteOver === true && (
          <Overlay
            fullScreen={false}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
              borderColor: 'transparent',
            }}
            overlayStyle={Styles.Overlay}>
            <View style={Styles.ViewOverlay}>
              <View style={Styles.ViewOerlay2}>
                <View style={Styles.ViewOverlay3}>
                  <TouchableOpacity
                    onPress={() => this.setState({noteOver: false})}>
                    <Icon name="x" size={16} style={Styles.Iconoverlay} />
                  </TouchableOpacity>
                </View>

                {this.state.work != '' ? (
                  <Text style={Styles.TextOverlay}>{this.state.work}</Text>
                ) : (
                  <View />
                )}
                <Text style={Styles.TextOverlay2}>{this.state.name}</Text>
              </View>
              <View style={Styles.ViewOverlay5}>
                <Text style={Styles.TextOverlay3}>
                  {I18n.t('translate_Note')} :
                </Text>
                <View style={Styles.ViewOverlay4}>
                  <TextInput
                    value={this.state.note}
                    style={Styles.TextInputOverlay}
                    onChangeText={text => this.setState({note: text})}
                  />
                </View>
              </View>
              <View style={Styles.ViewOverlay6}>
                <TouchableOpacity
                  style={Styles.TouchOverlay}
                  onPress={() => {
                    this._SendNoteMem({
                      id: this.state.id,
                      from: this.state.from,
                    });
                    this.setState({noteOver: false});
                  }}>
                  <Text style={Styles.TouchOverlay2}>
                    {I18n.t('translate_Save')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}

        {this.state.editNickname === true && (
          <Overlay
            fullScreen={false}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
            }}
            overlayStyle={Styles.Overlay}>
            <View style={Styles.ViewOverlay}>
              <View style={Styles.ViewOerlay2}>
                <View style={Styles.ViewOverlay3}>
                  <TouchableOpacity
                    onPress={() => this.setState({editNickname: false})}>
                    <Icon name="x" size={16} style={Styles.Iconoverlay} />
                  </TouchableOpacity>
                </View>
                <Text style={Styles.TextOverlay}>{I18n.t('transalte_set_nickname')}</Text>
              </View>
              <View style={Styles.ViewOverlay5}>
                <Text style={Styles.TextOverlay3}>
                  {I18n.t('transalte_set_nickname')} : {item.title_th} {this.state.name}
                </Text>
                <View style={Styles.ViewOverlay4}>
                  <TextInput
                    placeholder={this.state.name}
                    value={this.state.Nname}
                    style={Styles.TextInputOverlay}
                    onChangeText={text => this.setState({Nname: text})}
                  />
                </View>
              </View>
              <View style={Styles.ViewOverlay6}>
                <TouchableOpacity
                  style={Styles.TouchOverlay}
                  onPress={() => {
                    this._SendNoteMem({
                      id: this.state.id,
                      from: this.state.from,
                    });
                    this.setState({editNickname: false});
                  }}>
                  <Text style={Styles.TouchOverlay2}>
                    {I18n.t('translate_Save')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}

        <View>
          {this.state.delete === false ? (
            <ListItem
              onPress={() =>
                this.props.navigation.navigate('ProfileContect', {
                  name: 'คุณ' + item.name_th,
                  lastname: item.lastname_th,
                  work: item.company_name_th,
                  imgPro: item.profile,
                  position: item.position,
                  date: item.created_at,
                  phone: item.tel,
                  email: item.email,
                  note: item.note,
                  type: 1,
                  ssoid: item.ssoid,
                  address:
                    item.address_address_th +
                    ' ต.' +
                    item.address_district_th +
                    ' อ.' +
                    item.address_subdistrict_th +
                    ' จ.' +
                    item.address_province_th +
                    ' ' +
                    item.address_postcode_en,
                  member_type: item.member_type,
                  id: item.id,
                  from: item.from,
                  nick_namne: item.nick_namne,
                  tel_country_code: item.countryCode,
                  tel_code: item.CountryCodePhone,
                  MRname: I18n.locale == 'th' ? item.title_th : item.title_en,
                })
              }
              containerStyle={[
                {
                  width: '100%',
                  // borderWidth: 0,
                  // borderLeftWidth: 5,
                  // borderRightWidth: 5,
                  // borderTopWidth: 5,
                  borderColor: '#cacaca',
                  borderBottomWidth: 1,
                  // borderBottomWidth: 1,
                  // borderBottomColor: '#cacaca',
                  // borderWidth:1
                  backgroundColor: '#f4f5f880',
                },
              ]}
              leftAvatar={
                <View style={{}}>
                  {/* <Image
                    style={{width: 28, height: 28}}
                    source={require('../../image/startoppick.png')}
                  /> */}
                </View>
              }
              title={
                <View style={Styles.ViewListContect}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.7,
                    }}>
                    {item.company_name_th ? (
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 21,
                          color: '#163c70',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {item.company_name_th}
                      </Text>
                    ) : (
                      <View>
                        <Text />
                      </View>
                    )}
                  </View>
                  <View style={{flex: 0.3}}>
                    <Text style={{fontSize: 14, color: '#a4a2a2'}}>
                      {this.timeOut(item.created_at)}
                    </Text>
                  </View>
                </View>
              }
              subtitle={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    {/* บริษัท */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                        {item.nick_namne === ''
                          ? 'คุณ' + item.name_th + ' ' + item.lastname_th
                          : item.nick_namne}
                      </Text>
                      <View style={{marginLeft: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              editNickname: true,
                              name:
                                'คุณ' + item.name_th + ' ' + item.lastname_th,
                              ssoid: item.ssoid,
                              notetype: 1,
                              note: item.note,
                              id: item.id,
                              from: item.from,
                              Nname: item.nick_namne,
                            });
                            this.setState({membertype: item.member_type});
                          }}>
                          <Image
                            style={{width: 14, height: 15}}
                            source={require('../../image/editBasketCon.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* {item.tel ? (
                      <Text
                        onPress={() => this.Call(item.tel)}
                        style={{
                          fontSize: 20,
                          color: '#4b4b4b',
                          color: '#2d6dc4',
                          textDecorationLine: 'underline',
                        }}>
                        {this.Phonenumber(item.tel)}
                      </Text>
                    ) : (
                      <View />
                    )} */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      flex: 1,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          noteOver: !this.state.noteOver,
                          name: 'คุณ' + item.name_th + ' ' + item.lastname_th,
                          work: item.company_name_th,
                          note: item.note,
                          ssoid: item.ssoid,
                          Nname: item.nick_namne,
                          notetype: 1,
                          id: item.id,
                          from: item.from,
                        });
                        this.setState({membertype: item.member_type});
                      }}>
                      <Image
                        style={{width: 21, height: 21}}
                        source={require('../../image/note.png')}
                      />
                    </TouchableOpacity>

                    <Text style={{fontSize: 14, color: '#2d6dc4'}}>
                      {item.note}{' '}
                    </Text>
                  </View>
                </View>
              }
              subtitleStyle={{fontSize: 20, color: '#4b4b4b', marginTop: 10}}
            />
          ) : (
            <ListItem
              containerStyle={[
                Styles.ContainerList3,
                {borderBottomWidth: 1, borderBottomColor: '#cacaca'},
              ]}
              title={
                <View style={Styles.ViewListContect}>
                  <View style={{flex: 1}}>
                    {/* {item.company_name_th ? (
                        <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                          {item.company_name_th} */}
                    {item.company_name_th ? (
                      <Text
                        style={{
                          fontSize: 21,
                          color: '#163c70',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {item.company_name_th}
                      </Text>
                    ) : (
                      <Text>-</Text>
                    )}
                  </View>
                  <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={{fontSize: 14, color: '#a4a2a2'}}>
                      {this.timeOut(item.created_at)}
                    </Text>
                  </View>
                  <View style={{flex: 0.1, marginRight: 10}}>
                    <CheckBox
                      containerStyle={{
                        flexDirection: 'row-reverse',
                        alignContent: 'center',
                      }}
                      // checkedIcon={
                      //   <Image
                      //     style={Styles.checkIcon}
                      //     source={require('../../image/checkBasket.png')}
                      //   />
                      // }
                      // uncheckedIcon={
                      //   <Image
                      //     style={Styles.checkIcon}
                      //     source={require('../../image/unchecckBasket.png')}
                      //   />
                      // }
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() =>
                        this.selecitem4({item: item, index: index})
                      }
                    />
                  </View>
                </View>
              }
              subtitle={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    {/* <View>
                      {item.company_name_th ? (
                        <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                          {item.company_name_th}
                        </Text>
                      ) : (
                        <View>
                          <Text>-</Text>
                        </View>
                      )}
                    </View> */}

                    <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                      {'คุณ'}
                      {item.name_th} {item.lastname_th}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row-reverse', flex: 1}}>
                    <TouchableOpacity
                      disabled
                      onPress={() => {
                        this.setState({
                          noteOver: !this.state.noteOver,
                          name: item.name,
                          work: item.work,
                          note: item.note,
                          ssoid: item.ssoid,
                          notetype: 1,
                          Nname: item.nick_namne,
                        });
                        this.setState({membertype: item.member_type});
                      }}>
                      <Image
                        style={{width: 18, height: 18}}
                        source={require('../../image/note.png')}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: 14, color: '#2d6dc4'}}>
                      {item.note}{' '}
                    </Text>
                  </View>
                </View>
              }
            />
          )}
        </View>
      </View>
    );
  };

  ListContactNet = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View>
        {this.state.noteOver === true && (
          <Overlay
            fullScreen={false}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
              borderColor: 'transparent',
            }}
            overlayStyle={Styles.Overlay}>
            <View style={Styles.ViewOverlay}>
              <View style={Styles.ViewOerlay2}>
                <View style={Styles.ViewOverlay3}>
                  <TouchableOpacity
                    onPress={() => this.setState({noteOver: false})}>
                    <Icon name="x" size={16} style={Styles.Iconoverlay} />
                  </TouchableOpacity>
                </View>

                {this.state.work != '' ? (
                  <Text style={Styles.TextOverlay}>{this.state.work}</Text>
                ) : (
                  <View />
                )}
                <Text style={Styles.TextOverlay2}>{this.state.name}</Text>
              </View>
              <View style={Styles.ViewOverlay5}>
                <Text style={Styles.TextOverlay3}>
                  {I18n.t('translate_Note')} :
                </Text>
                <View style={Styles.ViewOverlay4}>
                  <TextInput
                    value={this.state.note}
                    style={Styles.TextInputOverlay}
                    onChangeText={text => this.setState({note: text})}
                  />
                </View>
              </View>
              <View style={Styles.ViewOverlay6}>
                <TouchableOpacity
                  style={Styles.TouchOverlay}
                  onPress={() => {
                    this._SendNoteMem({
                      id: this.state.id,
                      from: this.state.from,
                    });

                    this.setState({noteOver: false});
                  }}>
                  <Text style={Styles.TouchOverlay2}>
                    {I18n.t('translate_Save')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}

        {this.state.editNickname === true && (
          <Overlay
            fullScreen={false}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
            }}
            overlayStyle={Styles.Overlay}>
            <View style={Styles.ViewOverlay}>
              <View style={Styles.ViewOerlay2}>
                <View style={Styles.ViewOverlay3}>
                  <TouchableOpacity
                    onPress={() => this.setState({editNickname: false})}>
                    <Icon name="x" size={16} style={Styles.Iconoverlay} />
                  </TouchableOpacity>
                </View>
                <Text style={Styles.TextOverlay}>{I18n.t('transalte_set_nickname')}</Text>
              </View>
              <View style={Styles.ViewOverlay5}>
                <Text style={Styles.TextOverlay3}>
                  {I18n.t('transalte_set_nickname')} : {this.state.name}{' '}
                </Text>
                <View style={Styles.ViewOverlay4}>
                  <TextInput
                    placeholder={this.state.name}
                    value={this.state.Nname}
                    style={Styles.TextInputOverlay}
                    onChangeText={text => this.setState({Nname: text})}
                  />
                </View>
              </View>
              <View style={Styles.ViewOverlay6}>
                <TouchableOpacity
                  style={Styles.TouchOverlay}
                  onPress={() => {
                    this._SendNoteMem({
                      id: this.state.id,
                      from: this.state.from,
                    });
                    this.setState({editNickname: false});
                  }}>
                  <Text style={Styles.TouchOverlay2}>
                    {I18n.t('translate_Save')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}

        <View>
          {this.state.delete === false ? (
            <ListItem
              onPress={() =>
                this.props.navigation.navigate('ProfileContect', {
                  name: 'คุณ' + item.name_th + ' ' + item.lastname_th,
                  work: item.company_name_th,
                  imgPro: item.profile,
                  position: item.position,
                  date: item.created_at,
                  phone: item.tel,
                  email: item.email,
                  note: item.note,
                  type: 2,
                  ssoid: item.ssoid,
                  address:
                    item.address_address_th +
                    '\n' +
                    item.address_district_th +
                    '\t\t\t\t' +
                    item.address_subdistrict_th +
                    '\n' +
                    item.address_province_th +
                    '\t\t\t\t' +
                    item.address_postcode_en,
                  member_type: item.member_type,
                  id: item.id,
                  from: item.from,
                  nick_namne: item.nick_namne,
                })
              }
              containerStyle={[
                Styles.ContainerList3,
                {borderBottomWidth: 1, borderBottomColor: '#cacaca'},
              ]}
              leftAvatar={
                <View style={{}}>
                  {/* <Image
                    style={{width: 28, height: 28}}
                    source={require('../../image/startoppick.png')}
                  /> */}
                </View>
              }
              // title={
              //   <View style={Styles.ViewListContect}>
              //     <View
              //       style={{
              //         flexDirection: 'row',
              //         alignItems: 'center',
              //         width: '90%',
              //       }}>
              //       {item.company_name_th ? (
              //         <Text
              //           style={{
              //             fontSize: 21,
              //             color: '#163c70',
              //             fontFamily: 'Kittithada Bold 75',
              //           }}>
              //           {item.company_name_th}
              //         </Text>
              //       ) : (
              //         <View>
              //           <Text />
              //         </View>
              //       )}
              //     </View>
              //     <View style={{flexDirection: 'row-reverse'}}>
              //       <Text style={{fontSize: 14, color: '#a4a2a2'}}>
              //         {this.timeOut(item.created_at)}
              //         {/* {item.Country} */}
              //       </Text>
              //     </View>
              //   </View>
              // }
              title={
                <View style={Styles.ViewListContect}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.7,
                    }}>
                    {item.company_name_th ? (
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 21,
                          color: '#163c70',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {item.company_name_th}
                      </Text>
                    ) : (
                      <View>
                        <Text />
                      </View>
                    )}
                  </View>
                  <View style={{flex: 0.3}}>
                    <Text style={{fontSize: 14, color: '#a4a2a2'}}>
                      {this.timeOut(item.created_at)}
                    </Text>
                  </View>
                </View>
              }
              subtitle={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* [i] */}

                  <View>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                        {item.nick_namne === ''
                          ? 'คุณ' + item.name_th + ' ' + item.lastname_th
                          : item.nick_namne}
                      </Text>
                      <View style={{marginLeft: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              editNickname: true,
                              name:
                                'คุณ' + item.name_th + ' ' + item.lastname_th,
                              ssoid: item.ssoid,
                              notetype: 2,
                              note: item.note,
                              id: item.id,
                              from: item.from,
                              Nname: item.nick_namne,
                            });
                            this.setState({membertype: item.member_type});
                          }}>
                          <Image
                            style={{width: 14, height: 15}}
                            source={require('../../image/editBasketCon.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* {item.tel ? (
                      <Text
                        onPress={() => this.Call(item.tel)}
                        style={{
                          fontSize: 20,
                          color: '#4b4b4b',
                          color: '#2d6dc4',
                          textDecorationLine: 'underline',
                        }}>
                        {this.Phonenumber(item.tel)}
                      </Text>
                    ) : (
                      <View />
                    )} */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      flex: 1,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          noteOver: !this.state.noteOver,
                          name: 'คุณ' + item.name_th + ' ' + item.lastname_th,
                          work: item.company_name_th,
                          note: item.note,
                          ssoid: item.ssoid,
                          Nname: item.nick_namne,
                          notetype: 2,
                          id: item.id,
                          from: item.from,
                        });
                        this.setState({membertype: item.member_type});
                      }}>
                      <Image
                        style={{width: 21, height: 21}}
                        source={require('../../image/note.png')}
                      />
                    </TouchableOpacity>

                    <Text style={{fontSize: 14, color: '#2d6dc4'}}>
                      {item.note}{' '}
                    </Text>
                  </View>
                </View>
              }
              subtitleStyle={{fontSize: 20, color: '#4b4b4b', marginTop: 10}}
            />
          ) : (
            <ListItem
              containerStyle={[
                Styles.ContainerList3,
                {borderBottomWidth: 1, borderBottomColor: '#cacaca'},
              ]}
              title={
                <View style={Styles.ViewListContect}>
                  <View style={{flex: 1}}>
                    {item.company_name_th ? (
                      <Text
                        style={{
                          fontSize: 21,
                          color: '#163c70',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {item.company_name_th}
                      </Text>
                    ) : (
                      <View>
                        <Text>-</Text>
                      </View>
                    )}
                  </View>

                  <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={{fontSize: 14, color: '#a4a2a2'}}>
                      {this.timeOut(item.created_at)}
                    </Text>
                  </View>
                  <View style={{flex: 0.1, marginRight: 10}}>
                    <CheckBox
                      containerStyle={{
                        flexDirection: 'row-reverse',
                        alignContent: 'center',
                      }}
                      // checkedIcon={
                      //   <Image
                      //     style={Styles.checkIcon}
                      //     source={require('../../image/checkBasket.png')}
                      //   />
                      // }
                      // uncheckedIcon={
                      //   <Image
                      //     style={Styles.checkIcon}
                      //     source={require('../../image/unchecckBasket.png')}
                      //   />
                      // }
                      checkedIcon={
                        <Image
                          style={{width: 21, height: 21, top: -10}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            width: 21,
                            height: 21,
                            borderRadius: 2.7,
                            borderColor: '#c0c0c0',
                            top: -10,
                          }}
                        />
                      }
                      checked={this.state.checkBox[index]}
                      onPress={() =>
                        this.selecitem5({item: item, index: index})
                      }
                    />
                  </View>
                </View>
              }
              subtitle={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                      {'คุณ'}
                      {item.name_th} {item.lastname_th}
                    </Text>

                    {/* {item.company_name_th ? (
                      <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                        {item.company_name_th}
                      </Text>
                    ) : (
                      <View>
                        <Text>-</Text>
                      </View>
                    )} */}
                  </View>
                  <View style={{flexDirection: 'row-reverse', flex: 1}}>
                    <TouchableOpacity
                      disabled
                      onPress={() => {
                        this.setState({
                          noteOver: !this.state.noteOver,
                          name: item.name,
                          work: item.work,
                          note: item.note,
                          ssoid: item.ssoid,
                          membertype: item.member_type,
                          Nname: item.nick_namne,
                          id: item.id,
                          from: item.from,
                        });
                      }}>
                      <Image
                        style={{width: 21, height: 21}}
                        source={require('../../image/note.png')}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: 14, color: '#2d6dc4'}}>
                      {item.note}{' '}
                    </Text>
                  </View>
                </View>
              }
            />
          )}
        </View>
      </View>
    );
  };

  SelecMenu = i => {
    // alert('MENUFUCK' + i);
    this.setState({Menu: i + 1, idAct: [], DataType: []}, function() {
      this._getBasket();
      this._getBasketNewsAI()
    });
  };

  render() {
    // alert(JSON.stringify(this.props.SetID.ID))
    console.log('this.state.DataType');
    // console.log(this.state.DataType);

    return (
      <View style={Styles.SafeAreaView}>
        <Headers badgeNumber="2" navigation={this.props.navigation} />

        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <View style={{flex: 1, zIndex: -1}}>
          <Headerstage nameTab={I18n.t('translate_Mybasket')} />

          {/* อยู่ตรงนี้  */}
          {this.state.Show === true && (
            <Overlay
              backdropStyle={{
                backgroundColor:
                  Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                opacity: Platform.OS === 'android' ? 0.5 : 0.8,
              }}
              isVisible={this.state.Show}
              onBackdropPress={() => this.setState({Show: false})}>
              <View style={Styles.OverlayHight}>
                <View style={Styles.OverlayView1}>
                  {/* <TouchableOpacity
                    onPress={() => this.setState({Show: false})}>
                    <Image
                      style={Styles.ImgClose}
                      source={require('../../image/closemenu.png')}
                    />
                  </TouchableOpacity> */}
                </View>
                <ScrollView>
                  <View style={Styles.OverlayView2}>
                    <View style={Styles.OverlayView3}>
                      {this.state.banner != '' ? (
                        <FastImage
                          resizeMode={'contain'}
                          style={{width: '100%', height: 216}}
                          source={{uri: this.state.banner}}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          style={{width: '100%', height: 216}}
                          source={require('../../image/banerDrive.png')}
                        />
                      )}
                    </View>
                    <View style={{margin: 10}}>
                      <Text style={{fontSize: 25, color: '#163c70'}}>
                        {this.state.title}
                      </Text>
                      <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                        {this.FullDate(this.state.Stardate)} -{' '}
                        {this.FullDate(this.state.Enddate)}
                      </Text>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 7, height: 11}}
                          source={require('../../image/maker2.png')}
                        />
                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {'  '}
                          {this.state.location}
                        </Text>
                      </View> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Image
                            style={{width: 18, height: 13, top: 4}}
                            source={{uri: this.state.contry_img_flag}}
                          />
                          <Text style={Styles.popupTextloca}>
                            {'  '}
                            {this.state.contry_TH}
                          </Text>
                        </View>
                        <View style={{flex: 0.3}}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#2d6dc4',

                              borderRadius: 11,
                            }}>
                            <Text style={Styles.popupTextMap}>{I18n.t('transalte_map')}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {this.state.location === 'ออนไลน์' ? (
                          <Image
                            style={{width: 13, height: 13, top: 3}}
                            source={require('../../image/WWW.png')}
                          />
                        ) : (
                          <Image
                            style={{width: 9, height: 12, top: 3}}
                            source={require('../../image/makerlocation.png')}
                          />
                        )}
                        <Text style={Styles.popupTextloca}>
                          {'  '}
                          {this.state.location}
                        </Text>
                      </View>
                      <View style={{marginTop: 10}}>
                        <Text style={Styles.opoupTextData1}>
                          {I18n.t('translate_ActPrice')} : {this.state.price}
                        </Text>
                      </View>
                      <View style={{marginTop: 0}}>
                        <Text style={Styles.opoupTextData1}>
                          {I18n.t('translate_Num')} : {this.state.partic}{' '}
                          {I18n.t('translate_case')}
                        </Text>
                      </View>
                      <View style={{margin: 10}}>
                        <Image
                          style={{width: 334, height: 1}}
                          source={require('../../image/line6.png')}
                        />
                      </View>

                      {this.state.ckhide === false ? (
                        <View
                          style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <Text
                            onPress={() => {
                              this.setState({ckhide: true});
                            }}
                            style={Styles.popupTexthideText}>
                            {I18n.t('transalte_show_details')}
                          </Text>
                          <Icon6
                            color="#2d6dc4"
                            name="keyboard-arrow-down"
                            size={20}
                          />
                        </View>
                      ) : (
                        <>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_DataShow')} :
                          </Text>
                          <Text style={Styles.popupTextdetail}>
                            {this.state.StarD} - {this.state.EndD}
                          </Text>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_DataRegister')} :{' '}
                          </Text>
                          <Text style={Styles.popupTextdetail}>
                            {this.state.starretgis} - {this.state.endregis}
                          </Text>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_place')} :
                          </Text>
                          <Text style={Styles.popupTextdetail}>
                            {' '}
                            {this.state.location}{' '}
                          </Text>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_group_product')} :
                          </Text>
                          <>
                            {this.state.product_category != null && (
                              <>
                                {this.state.product_category.map(
                                  (data, index) => {
                                    return (
                                      <View>
                                        <Text style={Styles.popupTextdetail}>
                                          {' '}
                                          {index + 1} {data.name_th}
                                        </Text>
                                      </View>
                                    );
                                  },
                                )}
                              </>
                            )}
                          </>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_DetailBas')} :
                          </Text>
                          <Text style={Styles.popupTextTitledetail}>
                            {I18n.t('translate_Main')}
                          </Text>
                          {/* thking */}

                          <View style={{width: 321, height: null}}>
                            <Text style={Styles.popupTextdetail}>
                              {this.state.detail}
                            </Text>
                          </View>
                          <View
                            style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <Text
                              onPress={() => {
                                this.setState({ckhide: false});
                              }}
                              style={Styles.popupTexthideText}>
                              {I18n.t('transalte_Hide_details')}
                            </Text>
                            <Icon6
                              color="#2d6dc4"
                              name="keyboard-arrow-up"
                              size={20}
                            />
                          </View>
                        </>
                      )}

                      <View style={{margin: 10}}>
                        <Image
                          style={{width: 334, height: 1}}
                          source={require('../../image/line6.png')}
                        />
                      </View>

                      <View style={{flex: 1}}>
                        <Text style={Styles.popupTextdetail}>
                          {I18n.t('transalte_responsible_agency')} : {this.state.daparment_name}
                        </Text>
                        <Text style={Styles.popupTextdetail}>
                          {I18n.t('transalte_project_staff')} : {this.state.officer_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: 29, height: 29}}
                            source={require('../../image/phonelx.png')}
                          />

                          <Text
                            onPress={() => {
                              this.Call(this.state.deparment_tel);
                            }}
                            style={{color: '#2d6dc4', fontSize: 18, top: 4}}>
                            {'   '} {this.state.deparment_tel}
                          </Text>
                        </View>
                      </View>
                      {this.props.getUser.userDetails.res_result.type ==
                      6 ? null : (
                        <View
                          style={{
                            marginTop: 13,
                            alignItems: 'center',
                          }}>
                          {this.props.getStatus1.isResult
                            .status_confirm_identity.status_code != 0 &&
                          this.props.getStatus1.isResult.status_confirm_identity
                            .status_code != 1 ? (
                            <View>
                              {this.props.getUser.userDetails.res_result.type !=
                                6 &&
                                this.props.getUser.userDetails.res_result
                                  .type != 4 &&
                                this.props.getUser.userDetails.res_result
                                  .type != 3 && (
                                  <TouchableOpacity
                                    disabled={this.state.Close === false}
                                    onPress={() => {
                                      setTimeout(() => {
                                        this.setState({Show: false});

                                        if (
                                          this.props.getStatus1.isResult
                                            .status_confirm_identity
                                            .status_code === 0
                                        ) {
                                          // alert('กรุณายืนยันตัวตน ')
                                          this.props.navigation.navigate(
                                            'Identity',
                                          );
                                        } else if (
                                          this.props.getStatus1.isResult
                                            .status_confirm_identity
                                            .status_code === 1
                                        ) {
                                          alert(I18n.t('alert_Data_verification_progress'));
                                        } else {
                                          if (
                                            this.state.formTypeActivity === 1
                                          ) {
                                            this._CheckRegister({
                                              activity_code: this.state.code,
                                              formTypeActivity: this.state
                                                .formTypeActivity,
                                              type: this.props.getUser
                                                .userDetails.res_result.type,
                                              member_cid: this.state.IDcard,
                                              name: this.state.name,
                                              StarD: this.state.StarD,
                                              EndD: this.state.EndD,
                                              starretgis: this.state.starretgis,
                                              endregis: this.state.endregis,
                                              contry_img_flag: this.state
                                                .contry_img_flag,
                                              contry_TH: this.state.contry_TH,
                                              location: this.state.location,
                                              price: this.state.price,
                                              partic: this.state.partic,
                                              live: this.state.live,
                                              linklive: this.state.linklive,
                                              starretgis: this.state.starretgis,
                                              endregis: this.state.endregis,
                                              detail: this.state.detail,
                                              daparment_name: this.state
                                                .daparment_name,
                                              officer_name: this.state
                                                .officer_name,
                                              deparment_tel: this.state
                                                .deparment_tel,
                                              StatusFa: this.state.StatusFa,
                                              StarD_1: this.state.StarD_1,
                                              EndD_1: this.state.EndD_1,
                                            });
                                          } else {
                                            this.openLink(this.state.code);
                                          }

                                          // 999999
                                        }
                                      }, 200);
                                    }}
                                    style={
                                      this.state.Close != false
                                        ? Styles.TouchSub1
                                        : Styles.TouchSub2
                                    }>
                                    <Text style={Styles.textactivityregister}>
                                      {this.state.Close
                                        ? I18n.t('translate_Apply_activities')
                                        : I18n.t('translate_Applacation')}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </Overlay>
          )}

          {/* <ScrollView style={{borderWidth:1 }} > */}
          <ScrollableTabView
            onChangeTab={data => {
              this.SelecMenu(data.i);

              this.setState({delete: false, DataType: [], tabsgo: data.i});

              // setTimeout(() => {

              //   this.tabView.goToPage(4)
              console.log('TATATATATA', data.i);
              // }, 3000);
            }}
            ref={tabView => {
              this.tabView = tabView;
              return;
            }}
            style={[Styles.ScrollTabStyle]}
            // tabBarActiveTextColor="#40536d"
            // tabBarInactiveTextColor="#cad8e1"
         
            tabBarTextStyle={Styles.tabbarTextStyle}
            tabBarUnderlineStyle={Styles.tabunderLine}
            renderTabBar={() => (
              <ScrollableTabBar style={Styles.ScrollViewTabBar} />
            )}>
            <View
              tabLabel={I18n.t('translate_Depart_Act')}
              style={Styles.ViewTab1}>
              {this.state.delete === false ? (
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 15,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <Text style={Styles.textShowAll}>
                        {I18n.t('translate_All')} {this.state.DataType.length}{' '}
                        {I18n.t('transalte_ACT')}
                      </Text>
                    </View>
                    {this.state.DataType != undefined && (
                      <View>
                        {this.state.DataType.length > 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 0.1,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({delete: !this.state.delete})
                              }
                              style={{
                                backgroundColor: '#f86767',

                                justifyContent: 'center',
                                height: 25,
                                width: 25,
                                borderRadius: 35,

                                alignItems: 'center',
                              }}>
                              <Icon3
                                name="delete"
                                size={16}
                                style={{color: '#FFFFFF'}}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View />
                        )}
                      </View>
                    )}
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        height: 30,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#cacaca',
                        borderWidth: 1,
                        borderRadius: 21.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 19,
                          height: 19,
                          marginHorizontal: 10,
                          marginTop: 4,
                        }}
                        source={require('../../image/searchblue.png')}
                      />

                      <TextInput
                        placeholderTextColor="#dadada"
                        style={[Styles.TextInputseach1]}
                        onChangeText={e => this.SearchSubmit(e)}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{overflow: 'hidden'}} />
              )}
              {this.state.DataType != undefined ? (
                <View style={{flex: 1}}>
                  {this.state.DataType.length > 0 ? (
                    <ScrollView style={{}}>
                      <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{
                          // marginTop: 5,
                          backgroundColor: '#f4f5f805',
                          borderColor: '#f4f5f880',
                          borderWidth: 8,
                        }}
                        style={Styles.flastListtab1}
                        data={this.state.DataType}
                        extraData={this.state.DataType}
                        renderItem={this.ListActivity}
                        keyExtractor={(item, index) => index}
                      />
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={Styles.footerNotdata}>
                  <Text style={Styles.textnodata}>
                    {' '}
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </View>
            <View
              tabLabel={I18n.t('translate_Develop')}
              style={Styles.ViewTab1}>
              {this.state.delete === false ? (
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 15,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <Text style={Styles.textShowAll}>
                        {/* ทั้งหมด {this.state.DataType.length} ราย */}
                        {I18n.t('translate_All')} {this.state.DataType.length}{' '}
                        {I18n.t('transalte_ACT')}
                      </Text>
                    </View>
                    {this.state.DataType != undefined && (
                      <View>
                        {this.state.DataType.length > 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 0.1,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({delete: !this.state.delete})
                              }
                              style={{
                                backgroundColor: '#f86767',

                                justifyContent: 'center',
                                height: 25,
                                width: 25,
                                borderRadius: 35,

                                alignItems: 'center',
                              }}>
                              <Icon3
                                name="delete"
                                size={16}
                                style={{color: '#FFFFFF'}}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View />
                        )}
                      </View>
                    )}
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <View style={Styles.viewtabsearch2}>
                      <Image
                        style={Styles.viewsearchiconbule}
                        source={require('../../image/searchblue.png')}
                      />
                      <TextInput
                        placeholderTextColor="#dadada"
                        style={[Styles.TextInputseach1]}
                        onChangeText={e => this.SearchSubmit(e)}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{overflow: 'hidden'}} />
              )}
              {this.state.DataType != undefined ? (
                <View style={{flex: 1}}>
                  {this.state.DataType.length > 0 ? (
                    <ScrollView style={{}}>
                      <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{
                          marginTop: 5,
                          backgroundColor: '#f4f5f805',
                          borderColor: '#f4f5f880',
                          borderWidth: 8,
                        }}
                        style={Styles.flastListtab1}
                        data={this.state.DataType}
                        extraData={this.state.DataType}
                        renderItem={this.Listdevelop}
                        keyExtractor={(item, index) => index}
                      />
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {' '}
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={Styles.footerNotdata}>
                  <Text style={Styles.textnodata}>
                    {' '}
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </View>

            <View
              tabLabel={I18n.t('translate_DataMarketnews')}
              style={[Styles.ViewTab1, {}]}>
              {/* เช็คข้างบน พวกจำนวนทั้งหมดและ ช่องการค้นหา */}
              {this.state.tabnewscheck === 0 ? (
                <View>
                  {this.state.delete === false ? (
                    <View style={{width: '100%'}}>
                      <View style={Styles.viewtabsearch1}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                          }}>
                          <Text style={Styles.textShowAll}>
                            {I18n.t('translate_All')}{' '}
                            {this.state.DataType.length}{' '}
                            {I18n.t('transalte_Newss')}
                          </Text>
                        </View>
                        {this.state.DataType != undefined && (
                          <View>
                            {this.state.DataType.length > 0 ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flex: 0.1,
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState({delete: !this.state.delete})
                                  }
                                  style={Styles.viewdelete1}>
                                  <Icon3
                                    name="delete"
                                    size={16}
                                    style={{color: '#FFFFFF'}}
                                  />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View />
                            )}
                          </View>
                        )}
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.viewtabsearch2}>
                          <Image
                            style={Styles.viewsearchiconbule}
                            source={require('../../image/searchblue.png')}
                          />
                          <TextInput
                            onChangeText={e => {
                              this.SearchSubmitMarket(e);
                            }}
                            placeholderTextColor="#dadada"
                            style={[Styles.TextInputseach1]}
                            placeholder={I18n.t('translate_Seach')}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={{overflow: 'hidden'}} />
                  )}
                </View>
              ) : (
                <View>
                  {this.state.delete === false ? (
                    <View style={{width: '100%'}}>
                      <View style={Styles.viewtabsearch1}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                          }}>
                          <Text style={Styles.textShowAll}>
                            {I18n.t('translate_All')}{' '}
                            {this.state.DataTypeAI.length}{' '}
                            {I18n.t('transalte_Newss')}
                          </Text>
                        </View>
                        {this.state.DataTypeAI != undefined && (
                          <View>
                            {this.state.DataTypeAI.length > 0 ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flex: 0.1,
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState({delete: !this.state.delete})
                                  }
                                  style={Styles.viewdelete1}>
                                  <Icon3
                                    name="delete"
                                    size={16}
                                    style={{color: '#FFFFFF'}}
                                  />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View />
                            )}
                          </View>
                        )}
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.viewtabsearch2}>
                          <Image
                            style={{
                              width: 19,
                              height: 19,
                              marginHorizontal: 10,
                              marginTop: 4,
                            }}
                            source={require('../../image/searchblue.png')}
                          />
                          <TextInput
                            onChangeText={e => {
                              this.SearchSubmitMarket(e);
                            }}
                            placeholderTextColor="#dadada"
                            style={[Styles.TextInputseach1]}
                            placeholder={I18n.t('translate_Seach')}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={{overflow: 'hidden'}} />
                  )}
                </View>
              )}

              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 8,
                  // marginBottom: 8,

                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({tabnewscheck: 0});
                  }}
                  style={
                    this.state.tabnewscheck === 0
                      ? Styles.tabnewsck1
                      : Styles.tabnewsck2
                  }>
                  <Text
                    style={
                      this.state.tabnewscheck === 0
                        ? Styles.texttabnewsck1
                        : Styles.texttabnewsck2
                    }>
                    {I18n.t('translate_Market_Data')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({tabnewscheck: 1});
                  }}
                  style={
                    this.state.tabnewscheck === 0
                      ? Styles.tabnewsck2
                      : Styles.tabnewsck1
                  }>
                  <Text
                    style={
                      this.state.tabnewscheck === 0
                        ? Styles.texttabnewsck2
                        : Styles.texttabnewsck1
                    }>
                    {I18n.t('transalte_trade_situation_news')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* เช็ค tab ข่าวสถานการณ์ค้า และ ข่าว AI  */}
              {this.state.tabnewscheck === 0 ? (
                <View style={{flex: 1}}>
                  {this.state.DataType != undefined ? (
                    <ScrollView>
                      {this.state.DataType.length > 0 ? (
                        // <ScrollView style={{}}>
                        <FlatList
                          // scrollEnabled={false}
                          contentContainerStyle={{
                            marginTop: 5,
                            backgroundColor: '#f4f5f805',
                            borderColor: '#f4f5f880',
                            borderWidth: 8,
                          }}
                          style={{}}
                          data={this.state.DataType}
                          extraData={this.state.DataType}
                          renderItem={this.ListMarket}
                          keyExtractor={(item, index) => index}
                        />
                      ) : (
                        // </ScrollView>
                        <View style={Styles.footerNotdata}>
                          <Text style={Styles.textnodata}>
                            {I18n.t('translate_Nodata')}
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={{flex: 1}}>
                  {this.state.DataTypeAI != undefined ? (
                    <ScrollView>
                      {this.state.DataTypeAI.length > 0 ? (
                        // <ScrollView style={{}}>
                        <FlatList
                          scrollEnabled={false}
                          contentContainerStyle={{
                            marginTop: 5,
                            backgroundColor: '#f4f5f805',
                            borderColor: '#f4f5f880',
                            borderWidth: 8,
                          }}
                          style={{}}
                          data={this.state.DataTypeAI}
                          extraData={this.state.DataTypeAI}
                          renderItem={this.ListNewsAI}
                          keyExtractor={(item, index) => index}
                        />
                      ) : (
                        // </ScrollView>
                        <View style={Styles.footerNotdata}>
                          <Text style={Styles.textnodata}>
                            {I18n.t('translate_Nodata')}
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            <View tabLabel={I18n.t('translate_Mybuy')} style={Styles.ViewTab1}>
              <View
                style={{
                  marginBottom: 10,

                  flexDirection: 'row',
                }}>
                <View style={{flex: 0.9}}>
                  <Text
                    style={{
                      fontSize: 21,
                      color: '#2d6dc4',
                      left: 20,
                      fontFamily: 'Kittithada Bold 75',
                    }}>
                    {I18n.t('translate_All')}{' '}
                    {this.state.DataType.length}{' '}
                    {I18n.t('translate_Case')}
                  </Text>
                </View>
                {this.state.DataType != undefined && (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.1,
                    }}>
                    {this.state.DataType.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({delete: !this.state.delete})
                          }
                          style={{
                            backgroundColor: '#f86767',

                            justifyContent: 'center',
                            height: 25,
                            width: 25,
                            borderRadius: 35,

                            alignItems: 'center',
                          }}>
                          <Icon3
                            name="delete"
                            size={16}
                            style={{color: '#FFFFFF'}}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                )}
                {/* <View style={{flex: 0.2, borderWidth: 1}}>
                    <View>
                      <Image source={require('../../image/bin.png')} />
                    </View>
                  </View> */}
              </View>
              {this.state.delete === false ? (
                <View style={{width: '100%'}}>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        height: 30,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#cacaca',
                        borderWidth: 1,
                        borderRadius: 21.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 19,
                          height: 19,
                          marginHorizontal: 10,
                          marginTop: 4,
                        }}
                        source={require('../../image/searchblue.png')}
                      />

                      <TextInput
                        onChangeText={e => {
                          this.SearchSubmitContect(e);
                        }}
                        placeholderTextColor="#dadada"
                        style={[Styles.TextInputseach1, {flex: 1}]}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: 10,
                      alignContent: 'center',
                    }}>
                    {/* <Text>555555</Text> */}
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({PopAccept2: true});
                      }}
                      style={{
                        flex: 0.8,

                        backgroundColor: '#2d6dc4',
                        height: 34,
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 8,
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{width: 19, height: 19, top: 7}}
                        source={require('../../image/addmybasket.png')}
                      />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 20,
                          textAlign: 'center',
                          justifyContent: 'center',
                          marginTop: 4,
                        }}>
                        {' '}
                        {I18n.t('translate_Bt_Add_Manually')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Qrcode');
                      }}
                      style={{
                        flex: 0.8,
                        flexDirection: 'row',
                        backgroundColor: '#04a68a',
                        height: 34,
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 8,
                      }}>
                      <Image
                        style={{width: 19, height: 19, top: 7}}
                        source={require('../../image/QRcodemybasket.png')}
                      />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 20,
                          textAlign: 'center',
                          marginTop: 4,
                        }}>
                        {' '}
                        {I18n.t('translate_Bt_Add_QRcode')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Overlay
                    onBackdropPress={() => this.setState({PopAccept2: false})}
                    fullScreen={false}
                    isVisible={this.state.PopAccept2}
                    backdropStyle={{
                      backgroundColor:
                        Platform.OS === 'android' ? '#2d6dc480' : '#2d6dc480',
                    }}
                    // overlayStyle={[Styles.Overlay, ]}
                  >
                    <View
                      style={[
                        Styles.OverlayView2,
                        {backgroundColor: '#FFFFFF', borderRadius: 8},
                      ]}>
                      <View style={[Styles.OverlayView1, {marginTop: -45}]}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({Show: false, PopAccept2: false})
                          }>
                          <Image
                            style={Styles.ImgClose}
                            source={require('../../image/closemenu.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}>
                          {''}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Text style={{color: '#2d6dc4', fontSize: 24}}>
                          {I18n.t('transalte_add_my_buyer')}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,

                          width: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Addperson');
                            this.setState({Show: false, PopAccept2: false});
                          }}
                          style={{
                            backgroundColor: '#3986ee',
                            height: 48,

                            justifyContent: 'center',
                            width: '80%',
                            borderRadius: 21.5,
                            marginBottom: 15,
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: '#FFFFFF',
                              textAlign: 'center',
                            }}>
                            {I18n.t('transalte_General_Person')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('AddJuristic');
                            this.setState({Show: false, PopAccept2: false});
                          }}
                          style={{
                            backgroundColor: '#9c7df6',
                            height: 48,

                            justifyContent: 'center',
                            width: '80%',
                            borderRadius: 21.5,
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: '#FFFFFF',
                              textAlign: 'center',
                            }}>
                            {I18n.t('transalte_Juristic_Person')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: -5,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -14,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                    </View>
                  </Overlay>
                </View>
              ) : (
                <View style={{overflow: 'hidden'}} />
              )}
              {this.state.DataType != undefined ? (
                <View style={{flex: 1}}>
                  {this.state.DataType.length > 0 ? (
                    <ScrollView style={{}}>
                      <FlatList
                        scrollEnabled={false}
                        renderItem={this.ListContact}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{
                          // marginTop: 5,
                          backgroundColor: '#f4f5f805',
                          borderColor: '#f4f5f880',
                          borderWidth: 8,
                        }}
                        style={{}}
                        data={this.state.DataType}
                      />
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={Styles.footerNotdata}>
                  <Text style={Styles.textnodata}>
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </View>
            <View
              tabLabel={I18n.t('translate_Mynetwork')}
              style={Styles.ViewTab1}>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 15,

                  flexDirection: 'row',
                }}>
                <View style={{marginBottom: 10, flex: 1}}>
                  <Text
                    style={{
                      fontSize: 21,
                      color: '#2d6dc4',
                      left: 20,
                      fontFamily: 'Kittithada Bold 75',
                    }}>
                    {I18n.t('translate_All')} {this.state.DataType.length}{' '}
                    {I18n.t('translate_Case')}
                  </Text>
                </View>
                {this.state.DataType != undefined && (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.1,
                    }}>
                    {this.state.DataType.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({delete: !this.state.delete})
                          }
                          style={{
                            backgroundColor: '#f86767',

                            justifyContent: 'center',
                            height: 25,
                            width: 25,
                            borderRadius: 35,

                            alignItems: 'center',
                          }}>
                          <Icon3
                            name="delete"
                            size={16}
                            style={{color: '#FFFFFF'}}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                )}
              </View>

              {this.state.delete === false ? (
                <View style={{width: '100%'}}>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        height: 30,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#cacaca',
                        borderWidth: 1,
                        borderRadius: 21.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 19,
                          height: 19,
                          marginHorizontal: 10,
                          marginTop: 4,
                        }}
                        source={require('../../image/searchblue.png')}
                      />

                      <TextInput
                        onChangeText={e => {
                          this.SearchSubmitContect(e);
                        }}
                        placeholderTextColor="#dadada"
                        style={Styles.TextInputseach1}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: 10,
                        alignContent: 'center',
                      }}>
                      {/* <Text>555555</Text> */}
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({PopAccept2: true});
                        }}
                        style={{
                          flex: 0.8,

                          backgroundColor: '#2d6dc4',
                          height: 34,
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          borderRadius: 8,
                          flexDirection: 'row',
                        }}>
                        <Image
                          style={{width: 19, height: 19, top: 7}}
                          source={require('../../image/addmybasket.png')}
                        />
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 20,
                            textAlign: 'center',
                            justifyContent: 'center',
                            marginTop: 4,
                          }}>
                          {' '}
                          {I18n.t('translate_Bt_Add_Manually')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Qrcode');
                        }}
                        style={{
                          flex: 0.8,
                          flexDirection: 'row',
                          backgroundColor: '#04a68a',
                          height: 34,
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          borderRadius: 8,
                        }}>
                        <Image
                          style={{width: 19, height: 19, top: 7}}
                          source={require('../../image/QRcodemybasket.png')}
                        />
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 20,
                            textAlign: 'center',
                            marginTop: 4,
                          }}>
                          {' '}
                          {I18n.t('translate_Bt_Add_QRcode')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Overlay
                    onBackdropPress={() => this.setState({PopAccept2: false})}
                    fullScreen={false}
                    isVisible={this.state.PopAccept2}
                    backdropStyle={{
                      backgroundColor:
                        Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                      borderColor: 'transparent',
                    }}
                    overlayStyle={[Styles.Overlay, {borderRadius: 5}]}>
                    <View
                      style={[
                        Styles.OverlayView2,
                        {backgroundColor: '#FFFFFF', borderRadius: 8},
                      ]}>
                      <View style={[Styles.OverlayView1, {marginTop: -30}]}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({Show: false, PopAccept2: false})
                          }>
                          <Image
                            style={Styles.ImgClose}
                            source={require('../../image/closemenu.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}>
                          {''}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Text style={{color: '#2d6dc4', fontSize: 24}}>
                          {I18n.t('transalte_Add_Network')}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -10,
                          alignContent: 'center',
                          alignItems: 'center',
                          marginTop: 4,

                          width: '100%',
                        }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#3986ee',
                            height: 48,

                            justifyContent: 'center',
                            width: '80%',
                            borderRadius: 21.5,
                            marginBottom: 15,
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: '#FFFFFF',
                              textAlign: 'center',
                            }}>
                            {I18n.t('transalte_General_Person')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#9c7df6',
                            height: 48,

                            justifyContent: 'center',
                            width: '80%',
                            borderRadius: 21.5,
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: '#FFFFFF',
                              textAlign: 'center',
                            }}>
                            {I18n.t('transalte_Juristic_Person')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: -5,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                      <View
                        style={{
                          marginTop: -14,
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#20416e', fontSize: 24}}> </Text>
                      </View>
                    </View>
                  </Overlay>
                </View>
              ) : (
                <View style={{overflow: 'hidden'}} />
              )}
              {this.state.DataType != undefined ? (
                <View style={{flex: 1}}>
                  {this.state.DataType.length > 0 ? (
                    <ScrollView style={{}}>
                      <FlatList
                        scrollEnabled={false}
                        renderItem={this.ListContactNet}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{
                          marginTop: 5,
                          backgroundColor: '#f4f5f805',
                          borderColor: '#f4f5f880',
                          borderWidth: 8,
                        }}
                        style={Styles.flastListtab1}
                        data={this.state.DataType}
                      />
                    </ScrollView>
                  ) : (
                    <View style={Styles.footerNotdata}>
                      <Text style={Styles.textnodata}>
                        {I18n.t('translate_Nodata')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={Styles.footerNotdata}>
                  <Text style={Styles.textnodata}>
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollableTabView>
          {/* </ScrollView> */}

          {/*เมนูลบ1 */}
          <View>
            {this.state.Menu === 1 && (
              <View>
                {this.state.delete == false ? (
                  <View style={[Styles.ViewTouchFlat1, {marginBottom: 10}]}>
                    {this.state.DataType != undefined ? (
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        {/* {this.state.DataType.length > 0 ? (
                          <TouchableOpacity
                            style={Styles.TouchFlat}
                            onPress={() =>
                              this.setState({delete: !this.state.delete})
                            }>
                            <Image source={require('../../image/bin.png')} />
                            <Text style={Styles.TextTouchbasket}>
                              {' '}
                              {I18n.t('translate_Editbasket')}
                            </Text>
                          </TouchableOpacity>
                        ) : null} */}
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '95%',
                      alignSelf: 'center',
                    }}>
                    <CheckBox
                      checked={this.state.CheckBoxAll}
                      checkedIcon={
                        <Image
                          style={Styles.checkIcon}
                          source={require('../../image/checkBasket.png')}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          style={Styles.checkIcon}
                          source={require('../../image/unchecckBasket.png')}
                        />
                      }
                      onPress={() => {
                        this.selecAllitem();
                        if (this.state.CheckBoxAll === true) {
                          // alert('ok')
                          this.setState({CheckBoxAll: false});
                          this.setState({
                            checkBox: this.state.checkBox.map(() => false),
                            idAct: [],
                          });
                        } else {
                          this.setState({CheckBoxAll: true});
                          this.setState({
                            checkBox: this.state.checkBox.map(() => true),
                          });
                        }
                      }}
                      containerStyle={Styles.CheckAllContainer}
                      title={
                        <View style={{left: 10}}>
                          <Text style={Styles.textStyleCheck}>
                            {I18n.t('translate_Allpick')}
                          </Text>
                        </View>
                      }
                      textStyle={Styles.textStyleCheck}
                    />

                    <TouchableOpacity
                      disabled={!(this.state.idAct.length > 0)}
                      onPress={() => this.setState({PopAccept: true})}
                      style={
                        this.state.idAct.length > 0
                          ? Styles.TouchDelete
                          : Styles.TouchDelete1
                      }>
                      <Image source={require('../../image/bin.png')} />
                      <Text style={Styles.texttDelete}>
                        {' '}
                        {I18n.t('translate_Delete_basket')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          delete: !this.state.delete,
                          CheckBoxAll: false,
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        });
                      }}
                      style={Styles.TouchCancle}>
                      <Text style={Styles.textCancle}>
                        {' '}
                        {I18n.t('translate_Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
          {/*เมนูลบ2 */}
          <View>
            {this.state.Menu === 2 && (
              <View>
                {this.state.delete == false ? (
                  <View style={[Styles.ViewTouchFlat1, {marginBottom: 10}]}>
                    {this.state.DataType != undefined ? (
                      <View>
                        {/* {this.state.DataType.length > 0 ? (
                          <TouchableOpacity
                            style={Styles.TouchFlat}
                            onPress={() =>
                              this.setState({delete: !this.state.delete})
                            }>
                            <Image source={require('../../image/bin.png')} />
                            <Text style={Styles.TextTouchbasket}>
                              {' '}
                              {I18n.t('translate_Editbasket')}
                            </Text>
                          </TouchableOpacity>
                        ) : null} */}
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '95%',
                      alignSelf: 'center',
                    }}>
                    <CheckBox
                      checked={this.state.CheckBoxAll2}
                      checkedIcon={
                        <Image
                          style={Styles.checkIcon}
                          source={require('../../image/checkBasket.png')}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          style={Styles.checkIcon}
                          source={require('../../image/unchecckBasket.png')}
                        />
                      }
                      onPress={() => {
                        this.selecAllitem2();
                        if (this.state.CheckBoxAll2 === true) {
                          this.setState({CheckBoxAll2: false});
                          this.setState({
                            checkBox: this.state.checkBox.map(() => false),
                            idAct: [],
                          });
                        } else {
                          this.setState({CheckBoxAll2: true});
                          this.setState({
                            checkBox: this.state.checkBox.map(() => true),
                          });
                        }
                      }}
                      containerStyle={Styles.CheckAllContainer}
                      title={
                        <View style={{left: 10}}>
                          <Text style={Styles.textStyleCheck}>
                            {I18n.t('translate_Allpick')}
                          </Text>
                        </View>
                      }
                      textStyle={Styles.textStyleCheck}
                    />

                    <TouchableOpacity
                      disabled={!(this.state.idAct.length > 0)}
                      onPress={() => this.setState({PopAccept: true})}
                      style={
                        this.state.idAct.length > 0
                          ? Styles.TouchDelete
                          : Styles.TouchDelete1
                      }>
                      <Image source={require('../../image/bin.png')} />
                      <Text style={Styles.texttDelete}>
                        {' '}
                        {I18n.t('translate_Delete_basket')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          delete: !this.state.delete,
                          CheckBoxAll2: false,
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        })
                      }
                      style={Styles.TouchCancle}>
                      <Text style={Styles.textCancle}>
                        {' '}
                        {I18n.t('translate_Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
          {this.state.Menu === 3 && (
            <View>
              {/* เช็คลบทั้งหมด ข่าวธรรมดา กับ ข่าวAI */}
             {this.state.tabnewscheck === 0?(
              <View> 
              {this.state.delete == true && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CheckBox
                    checked={this.state.CheckBoxAll3}
                    checkedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/checkBasket.png')}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/unchecckBasket.png')}
                      />
                    }
                    onPress={() => {
                      this.selecAllitem3();
                      if (this.state.CheckBoxAll3 === true) {
                        this.setState({CheckBoxAll3: false});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        });
                      } else {
                        this.setState({CheckBoxAll3: true});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => true),
                        });
                      }
                    }}
                    containerStyle={Styles.CheckAllContainer}
                    title={
                      <View style={{left: 10}}>
                        <Text style={Styles.textStyleCheck}>
                          {I18n.t('translate_Allpick')}
                        </Text>
                      </View>
                    }
                    textStyle={Styles.textStyleCheck}
                  />

                  <TouchableOpacity
                    disabled={!(this.state.idAct.length > 0)}
                    onPress={() => this.setState({PopAccept: true})}
                    style={
                      this.state.idAct.length > 0
                        ? Styles.TouchDelete
                        : Styles.TouchDelete1
                    }>
                    <Image source={require('../../image/bin.png')} />
                    <Text style={Styles.texttDelete}>
                      {' '}
                      {I18n.t('translate_Delete_basket')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        delete: !this.state.delete,

                        CheckBoxAll3: false,

                        checkBox: this.state.checkBox.map(() => false),
                        idAct: [],
                      })
                    }
                    style={Styles.TouchCancle}>
                    <Text style={Styles.textCancle}>
                      {' '}
                      {I18n.t('translate_Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              </View>
              ):(
                <View>
                  {this.state.delete == true && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CheckBox
                    checked={this.state.CheckBoxAllAI}
                    checkedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/checkBasket.png')}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/unchecckBasket.png')}
                      />
                    }
                    onPress={() => {
                      this.selecAllitemnewsAI();
                      if (this.state.CheckBoxAllAI === true) {
                        this.setState({CheckBoxAllAI: false});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        });
                      } else {
                        this.setState({CheckBoxAllAI: true});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => true),
                        });
                      }
                    }}
                    containerStyle={Styles.CheckAllContainer}
                    title={
                      <View style={{left: 10}}>
                        <Text style={Styles.textStyleCheck}>
                          {I18n.t('translate_Allpick')}
                        </Text>
                      </View>
                    }
                    textStyle={Styles.textStyleCheck}
                  />

                  <TouchableOpacity
                    disabled={!(this.state.idAct.length > 0)}
                    onPress={() => this.setState({PopAccept: true})}
                    style={
                      this.state.idAct.length > 0
                        ? Styles.TouchDelete
                        : Styles.TouchDelete1
                    }>
                    <Image source={require('../../image/bin.png')} />
                    <Text style={Styles.texttDelete}>
                      {' '}
                      {I18n.t('translate_Delete_basket')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        delete: !this.state.delete,

                        CheckBoxAllAI: false,

                        checkBox: this.state.checkBox.map(() => false),
                        idAct: [],
                      })
                    }
                    style={Styles.TouchCancle}>
                    <Text style={Styles.textCancle}>
                      {' '}
                      {I18n.t('translate_Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}


                </View>


              )}
            </View>
          )}


          {this.state.Menu === 4 && (
            <View>
              {this.state.delete == false ? (
                <View style={[Styles.ViewTouchFlat1, {marginBottom: 10}]}>
                  {this.state.DataType != undefined ? (
                    <View>
                      {/* {this.state.DataType.length > 0 ? (
                        <TouchableOpacity
                          style={Styles.TouchFlat}
                          onPress={() =>
                            this.setState({delete: !this.state.delete})
                          }>
                          <Image source={require('../../image/bin.png')} />
                          <Text style={Styles.TextTouchbasket}>
                            {' '}
                            {I18n.t('translate_Editbasket')}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )} */}
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CheckBox
                    checked={this.state.CheckBoxAll4}
                    checkedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/checkBasket.png')}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/unchecckBasket.png')}
                      />
                    }
                    onPress={() => {
                      this.selecAllitemCon();
                      if (this.state.CheckBoxAll4 === true) {
                        this.setState({CheckBoxAll4: false});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        });
                      } else {
                        this.setState({CheckBoxAll4: true});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => true),
                        });
                      }
                    }}
                    containerStyle={Styles.CheckAllContainer}
                    title={
                      <View style={{left: 10}}>
                        <Text style={Styles.textStyleCheck}>
                          {I18n.t('translate_Allpick')}
                        </Text>
                      </View>
                    }
                    textStyle={Styles.textStyleCheck}
                  />

                  <TouchableOpacity
                    disabled={!(this.state.idAct.length > 0)}
                    onPress={() => this.setState({PopAccept: true})}
                    style={
                      this.state.idAct.length > 0
                        ? Styles.TouchDelete
                        : Styles.TouchDelete1
                    }>
                    <Image source={require('../../image/bin.png')} />
                    <Text style={Styles.texttDelete}>
                      {' '}
                      {I18n.t('translate_Delete_basket')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        delete: !this.state.delete,
                        CheckBoxAll4: false,
                        checkBox: this.state.checkBox.map(() => false),
                        idAct: [],
                      })
                    }
                    style={Styles.TouchCancle}>
                    <Text style={Styles.textCancle}>
                      {' '}
                      {I18n.t('translate_Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          {this.state.Menu === 5 && (
            <View>
              {this.state.delete == false ? (
                <View style={[Styles.ViewTouchFlat1, {marginBottom: 10}]}>
                  {this.state.DataType != undefined ? (
                    <View>
                      {/* {this.state.DataType.length > 0 ? (
                        <TouchableOpacity
                          style={Styles.TouchFlat}
                          onPress={() =>
                            this.setState({delete: !this.state.delete})
                          }>
                          <Image source={require('../../image/bin.png')} />
                          <Text style={Styles.TextTouchbasket}>
                            {' '}
                            {I18n.t('translate_Editbasket')}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )} */}
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CheckBox
                    checked={this.state.CheckBoxAll5}
                    checkedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/checkBasket.png')}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={Styles.checkIcon}
                        source={require('../../image/unchecckBasket.png')}
                      />
                    }
                    onPress={() => {
                      this.selecAllitemCon2();
                      if (this.state.CheckBoxAll5 === true) {
                        this.setState({CheckBoxAll5: false});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => false),
                          idAct: [],
                        });
                      } else {
                        this.setState({CheckBoxAll5: true});
                        this.setState({
                          checkBox: this.state.checkBox.map(() => true),
                        });
                      }
                    }}
                    containerStyle={Styles.CheckAllContainer}
                    title={
                      <View style={{left: 10}}>
                        <Text style={Styles.textStyleCheck}>
                          {I18n.t('translate_Allpick')}{' '}
                        </Text>
                      </View>
                    }
                    textStyle={Styles.textStyleCheck}
                  />

                  <TouchableOpacity
                    disabled={!(this.state.idAct.length > 0)}
                    onPress={() => this.setState({PopAccept: true})}
                    style={
                      this.state.idAct.length > 0
                        ? Styles.TouchDelete
                        : Styles.TouchDelete1
                    }>
                    <Image source={require('../../image/bin.png')} />
                    <Text style={Styles.texttDelete}>
                      {' '}
                      {I18n.t('translate_Delete_basket')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        delete: !this.state.delete,
                        CheckBoxAll5: false,
                        checkBox: this.state.checkBox.map(() => false),
                        idAct: [],
                      })
                    }
                    style={Styles.TouchCancle}>
                    <Text style={Styles.textCancle}>
                      {' '}
                      {I18n.t('translate_Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          {this.state.PopAccept === true && (
            <Overlay
              onBackdropPress={() => this.setState({PopAccept: false})}
              fullScreen={false}
              isVisible={this.state.PopAccept}
              backdropStyle={{
                backgroundColor:
                  Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                borderColor: 'transparent',
              }}
              overlayStyle={[Styles.Overlay, {borderRadius: 5}]}>
              <Popup
                text={I18n.t('translate_ConFavorite')}
                accept={() => {
                  setTimeout(() => {
                    this._DeleteBasket();
                    this.setState(
                      {
                        checkBox: [],
                        CheckBoxAll: false,
                        CheckBoxAll: false,
                        CheckBoxAll2: false,
                        CheckBoxAll3: false,
                        CheckBoxAll4: false,
                        CheckBoxAll5: false,

                        checkBoxMarket: [],
                        checkBoxContect: [],
                        checkBoxContectNet: [],
                        checkBoxContectNet: [],
                        idAct: [],
                      },
                      function() {
                        this._getBasket();
                      },
                    );

                    // this._getBasket();
                  }, 200);

                  this.setState({PopAccept: false});
                  this.setState({delete: false});
                }}
                cancle={() => {
                  this.setState({PopAccept: false});
                  this.setState({delete: false});
                }}
              />
            </Overlay>
          )}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
  getBasket1: state.dataReducer.getBasket,
  getUser: state.userReducer.getUser,
  getStatus1: state.dataReducer.getStatus,
  SetID: state.dataReducer.SetID,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mybasket);
