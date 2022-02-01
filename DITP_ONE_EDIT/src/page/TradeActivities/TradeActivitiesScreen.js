import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  AsyncStorage,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import {ViewScale} from '../../config/ViewScale'

import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import HeaderToppick from '../../components/HeaderTopPick';
import HeaderText from '../../components/HeaderText';
import RNPickerSelect from 'react-native-picker-select';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import LinearGradient from 'react-native-linear-gradient';

import I18n from '../../utils/I18n';
import {connect} from 'react-redux';

import Styles from './Styles';
import {
  ListItem,
  Overlay,
  CheckBox,
} from '../../lib_edit/react-native-elements';

//API
import {
  getAllactivities,
  getToppic,
  getDatarecommend,
  GetActivityGroup,
  GetSearchproductneed,
  GetSearchproduct,
  GetCountryGroup,
} from '../../actions/data.actions';
import {SendBasket, DeleteBasket} from '../../actions/auth.actions';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';

import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import MonthSelectorCalendar from 'react-native-month-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';

import SegmentedControlTab from 'react-native-segmented-control-tabedit';
const {height, width} = Dimensions.get('window');

class TradeActivitiesScreen extends React.Component {
  constructor() {
    AsyncStorage.getItem('language', (err, result) => {
      if (result == 'TH') {
        this.setState({language: 'TH'});
      } else {
        this.setState({language: 'EN'});
      }
    });
    super();
    this.state = {
      tab: 0,
      selectedIndex: 0,
      endregis: null,
      starretgis: null,
      Show: false,
      Selec: [],
      Selec2: [],
      basket: false,
      AllActivity: [],
      language: '',
      Toppic: [],
      ToppicData: 5,
      Recommend: [],
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      contry_img_flag: null,
      contry_TH: null,
      contry_EN: null,
      Check: false,
      uri: 'http://one.ditp.go.th/dist/img/icon/no-image.png',
      failed: false,
      CheckFavorites: [],
      tab: 0,
      refresh: false,
      ToppickData: [],
      CheckRecom: [],
      SizebarModel: 500,
      text_searchReNew: '',
      checkfilter1: false,
      product_category: [],
      setYear: false,
      ckhide: false,
      ckhide2: false,
      daparment_name: null,
      officer_name: null,
      deparment_tel: null,
      OpenpopupContry: false,
      PopupSystemck: true,
      ckhide: false,
      popupShow: false,
      imgmenu: null,
      detailmenu: null,
      namemenu: null,
      GetactivityValue: [],
      dataproductNeed: [],
      datagetproduct: [],
      GetcounrtryValue: [],
      GetactivityValue: [],
      ckonline: false,
    };
    this.offset = 0;
    this.arrayholder = [];
    this.arrayholder2 = [];
  }

  onShare = async value => {
    console.log('vakkkk', value.activity_list_topic_th);
    try {
      const result = await Share.share({
        message:
          Platform.OS === 'android'
            ? value.activity_list_topic_th + '\n' + value.list_register_url
            : value.activity_list_topic_th,
        url: value.list_register_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_succeed'));
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

  _getCounttrySelect = async value => {
    console.log('DADA');
    try {
      const response = await this.props.dispatch(GetCountryGroup());

      if (response.res_code === '00') {
        // console.log('GetCountryGroup' + response.results);
        this.setState(
          {
            GetcounrtryValue: response.results,
          },
          function() {},
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  onShareDatali = async (itemname, itemurl) => {
    try {
      console.log(itemurl + 'name' + itemname);
      const result = await Share.share({
        message:
          Platform.OS === 'android' ? itemname + '\n' + itemurl : itemname,
        url: itemurl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_succeed'));
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

  SearchSubmit = e => {
    console.log('SEARCH', e, this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // console.log(newData)
    this.setState({Recommend: newData});
  };

  SearchSubmitToppick = e => {
    const newData = this.arrayholder2.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ToppickData: newData});
  };

  static TabHome = () => {
    const {navigation} = this.props;
    this.props.navigation.navigate('Home');
  };

  onChangeTab2 = item => {
    this.setState({tab: item.i});
    this.SearchSubmit('');
    this.SearchSubmitToppick('');
  };
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  officer_name(name) {
    console.log(name);
    // alert(name)
    const myArr = name.split(',');
    console.log(myArr.length);
    console.log(myArr[0], myArr[1]);

    if (myArr.length > 1) {
      for (let i = 1; i < myArr.length; i++) {
        const nametwo = '\n' + '1. ' + myArr[0] + '\n' + '2. ' + myArr[1];
        return nametwo;
      }
    } else {
      const nametwo = name;
      return nametwo;
    }
  }
  async openLinkativity(item) {
    console.log(item);
    const idact = item;
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${idact}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    console.log(url);
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

  async openLink(item) {
    const place = item;
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();

    const url = `https://www.google.co.th/maps/place/${place}`;
    console.log(url);
    const headers = {};
    const client_id = {};
    try {
      // this.setState({Show:false})
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

  Call = number => {
    console.log(number);
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  _SendBasket = async values => {
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
        SendBasket({
          results: {
            basket_code: values.code,
            basket_type: '1',
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );

      if (values.Status == 1) {
        if (response.res_code === '00') {
          this.setState({
            Toppic: [],
            isListEnd: false,
            loading: false,
            fetching_from_server: false,
          });
          this._getToppic();
        }
      }
    } catch (error) {}
  };

  _DeleteBasket = async values => {
    try {
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        DeleteBasket({
          results: {
            basket: [
              {
                basket_code: values.code,
                basket_type: '1',
              },
            ],
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );

      if (values.Status == 1) {
        if (response.res_code === '00') {
          this.setState({
            Toppic: [],
            isListEnd: false,
            loading: false,
            fetching_from_server: false,
          });
          this._getToppic();
        }
      }
    } catch (error) {}
  };

  renderFooter() {
    return (
      <View
        style={[
          Styles.footer,
          {marginTop: this.state.Recommend.length === 0 ? height * 0.07 : 0},
        ]}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View>
            {this.state.Recommend.length == 0 ? (
              <Text style={{fontSize: 22}}>{I18n.t('translate_Nodata')}</Text>
            ) : null}
          </View>
        )}
      </View>
    );
  }

  _getToppic = async values => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          this.response = await this.props.dispatch(
            getToppic({list: 1, token: this.props.authData.token}),
          );

          if (this.response.res_code === '00') {
            if (this.response.result.length > 0) {
              this.setState({
                Toppic: [...this.state.Toppic, ...this.response.result],
                fetching_from_server: false,
              });
              this.state.Toppic.map(data => {
                this.state.Selec2[data.activity_code] = data.status_basket;
              });
              this._DataToppick();
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          }
        } catch (error) {}
      });
    }
  };

  _getRecommed = async values => {
    // alert(this.state.valueindexdev);
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          const num = this.offset;
          var date = new Date();

          console.log('YEAR', this.state.gettestYear, date.getFullYear());
          this.response = await this.props.dispatch(
            getDatarecommend({
              result: {
                offset: num * 10,
                day: '',

                month: '',

                year: '',

                text_search: this.state.textSearch,

                need:
                  this.state.valueindexdev === undefined
                    ? ''
                    : this.state.valueindexdev === 0
                    ? ''
                    : this.state.valueindexdev,
                online:
                  this.state.searchOnline === null
                    ? ''
                    : this.state.searchOnline,
                country:
                  this.state.valueSelectActivity4 === undefined
                    ? ''
                    : this.state.valueSelectActivity4,
                activity_type:
                  this.state.valueSelectActivity1 === undefined
                    ? ''
                    : this.state.valueSelectActivity1 === 0
                    ? ''
                    : this.state.valueSelectActivity1,
              },
              list: 1,
              token: this.props.authData.token,
            }),
          );

          if (this.response.res_code === '00') {
            console.log(this.response.result);
            if (this.response.result.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                Recommend: [...this.state.Recommend, ...this.response.result],
                fetching_from_server: false,
                CheckRecom: [...this.state.Recommend, ...this.response.result],
                // Selec: [...this.state.Recommend.map(e => e.status_basket)],
              });
              this.state.Recommend.map(data => {
                this.state.Selec[data.activity_code] = data.status_basket;
              });

              console.log('ANUCHIT');

              this.arrayholder = this.state.Recommend;
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          } else {
            this.setState({
              fetching_from_server: false,
              isListEnd: true,
            });
          }
        } catch (error) {}
      });
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

  SelecDate = View => {
    try {
      var strSplitDate = String(View).split(' ');

      return (
        this.CheckMonthFull1(strSplitDate[1]) +
        '/' +
        (parseInt(strSplitDate[3]) + 543)
      );
    } catch (error) {
      console.log(error);
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

    var yyyy = date.getFullYear() + 543;
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

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm) + ' ' + yyyy;
    return date.toString();
  }

  End_DateR(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    var yyyy = date.getFullYear() + 543;

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm);
    return date.toString();
  }

  // Yearend(Viewdate) {
  //   var strSplitDate = String(Viewdate).split(' ');
  //   var date = new Date(strSplitDate[0]);

  //   var yyyy = date.getFullYear() + 543;

  //   return yyyy.toString();
  // }

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }
  CheckMonthFull1 = month => {
    var Month = null;
    if (month === 'Jan') {
      return I18n.locale === 'th' ? (Month = 'มกราคม') : (Month = 'January');
    } else if (month === 'Feb') {
      return I18n.locale === 'th'
        ? (Month = 'กุมภาพันธ์')
        : (Month = 'February');
    } else if (month === 'Mar') {
      return I18n.locale === 'th' ? (Month = 'มีนาคม') : (Month = 'March');
    } else if (month === 'Apr') {
      return I18n.locale === 'th' ? (Month = 'เมษายน') : (Month = 'April');
    } else if (month === 'May') {
      return I18n.locale === 'th' ? (Month = 'พฤษภาคม') : (Month = 'May');
    } else if (month === 'Jun') {
      return I18n.locale === 'th' ? (Month = 'มิถุนายน') : (Month = 'June');
    } else if (month === 'Jul') {
      return I18n.locale === 'th' ? (Month = 'กรกฎาคม') : (Month = 'July');
    } else if (month === 'Aug') {
      return I18n.locale === 'th' ? (Month = 'สิงหาคม') : (Month = 'August');
    } else if (month === 'Sep') {
      return I18n.locale === 'th' ? (Month = 'กันยายน') : (Month = 'September');
    } else if (month === 'Oct') {
      return I18n.locale === 'th' ? (Month = 'ตุลาคม') : (Month = 'October');
    } else if (month === 'Nov') {
      return I18n.locale === 'th'
        ? (Month = 'พฤศจิกายน')
        : (Month = 'November');
    } else if (month === 'Dec') {
      return I18n.locale === 'th' ? (Month = 'ธันวาคม') : (Month = 'December');
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

  FullDate(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear() + 543;
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

    return uri[10];
  }

  selecitem = ({index, item}) => {
    let {Selec, DataTopPick} = this.state;
    Selec[item.activity_code] = !Selec[item.activity_code];
    this.setState({Selec: Selec});
    if (Selec[item.activity_code] === true) {
      return this._SendBasket({code: item.activity_code});
    } else {
      return this._DeleteBasket({code: item.activity_code});
    }
  };

  selecitem2 = ({index, item}) => {
    let {Selec2, DataTopPick} = this.state;
    Selec2[item.activity_code] = !Selec2[item.activity_code];
    this.setState({Selec2: Selec2});
    if (Selec2[item.activity_code] === true) {
      return this._SendBasket({code: item.activity_code});
    } else {
      return this._DeleteBasket({code: item.activity_code});
    }
  };

  ListActivity = ({item, index}) => {
    return (
      <View style={{zIndex: -999}}>
        {item.active_status != false && (
          <ListItem
            // containerStyle={{
            //   marginBottom: 8,
            //   borderRadius: 10,
            //   alignSelf: 'center',
            //   flex: 1,
            //   width: '95%',
            //   shadowColor: '#f4f6fa ',
            //   // shadowOffset: {
            //   //   width: 0,
            //   //   height: 1,
            //   // },
            //   // shadowOpacity: 0.18,
            //   // shadowRadius: 1.00,

            //   elevation: 1,
            // }}
            containerStyle={{
              marginBottom: 8,
              borderRadius: 10,
              alignSelf: 'center',
              flex: 1,
              width: '95%',
              // shadowColor: '#f4f6fa ',
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },=j;
              // shadowOpacity: 0.18,
              // shadowRadius: 1.00,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
      
              elevation: 5,
            }}
            style={{
              width: '100%',
              height: null,
              flex: 1,

              backgroundColor: '#f4f5f850',
            }}
            leftAvatar={
              <View style={[Styles.alignItemsCenter, {flex: 0.4}]}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      this.setState({
                        Show: !this.state.Show,
                        img: item.activity_list_logo_banner,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
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
                        register: this.web(item.list_register_url),
                        code: item.activity_code,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        StatusFa: this.state.Selec[item.activity_code],
                        check: this.state.Selec[index],
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        item1: item,
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
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        url: item.list_register_url,
                        StarDx: item.activity_list_start_date,
                        EndDx: item.activity_list_end_date,
                        imgx: item.activity_list_logo_thumb,
                      })
                    }>
                    <Image
                      source={{uri: item.activity_list_logo_thumb}}
                      style={{width: ViewScale(60), height: ViewScale(55), borderRadius: 15}}
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
                    <Text
                      onPress={() =>
                        this.setState({
                          Show: !this.state.Show,
                          img: item.activity_list_logo_banner,
                          StarD: this.FullDate(item.activity_list_start_date),
                          EndD: this.FullDate(item.activity_list_end_date),
                          name: item.activity_list_topic_th,
                          location: item.activity_list_location_th,
                          detail: item.activity_list_desc_th,
                          partic: item.max_of_participate,
                          register: this.web(item.list_register_url),
                          code: item.activity_code,
                          price:
                            I18n.locale === 'th'
                              ? item.activity_price_th
                              : item.activity_price_en,
                          StatusFa: this.state.Selec[item.activity_code],
                          check: this.state.Selec[index],
                          linklive: item.activity_list_live_url,
                          live: item.status_live,
                          item1: item,
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
                          product_category: item.activity_product_category,
                          daparment_name: item.activity_list_department_name,
                          officer_name: item.activity_list_officer_name,
                          deparment_tel: item.activity_list_department_tel,
                          url: item.list_register_url,
                          StarDx: item.activity_list_start_date,
                          EndDx: item.activity_list_end_date,
                          imgx: item.activity_list_logo_thumb,
                        })
                      }
                      numberOfLines={2}
                      style={Styles.textActivityTitle}>
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
                    {this.state.CheckRecom.length > 0 ? (
                      <CheckBox
                        checkedIcon={
                          <Image
                            style={{width: ViewScale(25), height: ViewScale(25), top: -10}}
                            source={require('../../image/PickerMarket.png')}
                          />
                        }
                        uncheckedIcon={
                          <Image
                            style={{width: ViewScale(25), height: ViewScale(25), top: -10}}
                            source={require('../../image/shoping.png')}
                          />
                        }
                        checked={this.state.Selec[item.activity_code]}
                        onPress={() => {
                          this.selecitem({item: item, index: index});
                        }}
                      />
                    ) : (
                      <CheckBox
                        checkedIcon={
                          <Image
                            style={{width: ViewScale(25), height: ViewScale(25)}}
                            source={require('../../image/PickerMarket.png')}
                          />
                        }
                        uncheckedIcon={
                          <Image
                            style={{width: ViewScale(25), height: ViewScale(25)}}
                            source={require('../../image/shoping.png')}
                          />
                        }
                        checked={this.state.Selec2[item.activity_code]}
                        onPress={() => {
                          this.selecitem2({item: item, index: index});
                        }}
                      />
                    )}
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ? (
                      <Image
                        style={{width: ViewScale(13), height: ViewScale(13), top: 3}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: ViewScale(9), height: ViewScale(12), top: 3}}
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
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      alignSelf: 'flex-start',
                    }}>
                    <Image
                      style={{
                        width: ViewScale(16),
                        height: ViewScale(12),
                        top: 3,
                        borderWidth: 0.4,
                        borderColor: '#4b4b4b',
                      }}
                      source={{uri: item.img_flag}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1.4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <Text numberOfLines={2} style={Styles.textactivityloca}>
                      {'  '}
                      {I18n.locale === 'th'
                        ? item.list_country_name_th
                        : item.list_country_name_en}
                    </Text>
                  </View>
                </View>
              </View>
            }
            subtitle={
              <View style={[Styles.ViewSub10, {marginTop: 15, flex: 1}]}>
                {/* {this.props.getStatus1.isResult.status_confirm_identity
                  .status_code != 0 &&
                this.props.getStatus1.isResult.status_confirm_identity
                  .status_code != 1 ? ( */}
                <View>
                  {this.props.getUser.userDetails.res_result.type != 6 &&
                  this.props.getUser.userDetails.res_result.type != 4 &&
                  this.props.getUser.userDetails.res_result.type != 3 ? (
                    <TouchableOpacity
                      disabled={item.active_status === false}
                      onPress={() => {
                        // this.openLink(this.web(item.list_register_url));
                        // alert('opennext')
                        if (
                          this.props.getStatus1.isResult.status_confirm_identity
                            .status_code === 0
                        ) {
                          this.props.navigation.navigate('Identity');
                        } else {
                          this.openLinkativity(item.activity_code);
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
                          //     StatusFa: this.state.Selec[item.activity_code],
                          //     index: index,
                          //     item1: item,
                          //     linklive: item.activity_list_live_url,
                          //     live: item.status_live,
                          //     product_category: item.activity_product_category,
                          //     daparment_name:
                          //       item.activity_list_department_name,
                          //     officer_name: item.activity_list_officer_name,
                          //     deparment_tel: item.activity_list_department_tel,
                          //     url: item.list_register_url,
                          //   },
                          // );
                        }
                      }}
                      style={
                        item.active_status === true
                          ? Styles.TouchSub2
                          : Styles.TouchSub5
                      }>
                      <Text style={Styles.textactivityRegiter}>
                        {item.active_status === true
                          ? I18n.t('translate_Apply_activities')
                          : I18n.t('translate_Applacation')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>
                {/* ) : (
                  <View />
                )} */}

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      Show: !this.state.Show,
                      img: item.activity_list_logo_banner,
                      StarD: this.FullDate(item.activity_list_start_date),
                      EndD: this.FullDate(item.activity_list_end_date),
                      name: item.activity_list_topic_th,
                      location: item.activity_list_location_th,
                      detail: item.activity_list_desc_th,
                      partic: item.max_of_participate,
                      register: this.web(item.list_register_url),
                      code: item.activity_code,
                      price:
                        I18n.locale === 'th'
                          ? item.activity_price_th
                          : item.activity_price_en,
                      StatusFa: this.state.Selec[item.activity_code],
                      check: this.state.Selec[index],
                      linklive: item.activity_list_live_url,
                      live: item.status_live,
                      item1: item,
                      Close: item.active_status,
                      contry_TH:
                        I18n.locale === 'th'
                          ? item.list_country_name_th
                          : item.list_country_name_en,

                      contry_img_flag: item.img_flag,
                      endregis: this.FullDate(item.activity_list_end_regis),
                      starretgis: this.FullDate(item.activity_list_start_regis),
                      product_category: item.activity_product_category,
                      daparment_name: item.activity_list_department_name,
                      officer_name: item.activity_list_officer_name,
                      deparment_tel: item.activity_list_department_tel,
                      url: item.list_register_url,
                      StarDx: item.activity_list_start_date,
                      EndDx: item.activity_list_end_date,
                      imgx: item.activity_list_logo_thumb,
                    })
                  }
                  style={Styles.TouchRead}>
                  <Image
                    style={{width: 17, height: 13}}
                    source={require('../../image/readDetail.png')}
                  />
                  <Text style={Styles.textactivityread}>
                    {' '}
                    {I18n.t('translate_Readmore')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.onShare(item);
                    // alert('coming soon')
                  }}
                  style={{flex: 1, alignItems: 'flex-end'}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: 14, height: 16}}
                    source={require('../../image/sharelx.png')}
                  />
                </TouchableOpacity>

                {item.status_live === 'C' && (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(item.activity_list_live_url)
                    }>
                    <View
                      style={[
                        Styles.ViewSub3,
                        {right: 10, justifyContent: 'center'},
                      ]}>
                      <Image
                        style={{width: 26, height: 15}}
                        source={require('../../image/liveme.png')}
                      />
                      <View style={{bottom: 13, right: 22}}>
                        <Text style={{fontSize: 10, color: '#334c6e'}}>
                          {I18n.t('translate_Prepare')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {item.status_live === 'Y' && (
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      Linking.openURL(item.activity_list_live_url)
                    }>
                    <View
                      style={[
                        Styles.ViewSub3,
                        {right: 10, justifyContent: 'center'},
                      ]}>
                      <Image
                        style={{width: 26, height: 15}}
                        source={require('../../image/liveme.png')}
                      />
                      <View style={{bottom: 13, right: 22}}>
                        <Text style={{fontSize: 10, color: '#ff5e5e'}}>
                          {I18n.t('translate_OnAir')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {item.status_live === 'B' && (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(item.activity_list_live_url)
                    }>
                    <View
                      style={[
                        Styles.ViewSub3,
                        {right: 10, justifyContent: 'center'},
                      ]}>
                      <Image
                        style={{width: 26, height: 15}}
                        source={require('../../image/liveme.png')}
                      />
                      <View style={{bottom: 13, right: 22}}>
                        <Text style={{fontSize: 10, color: '#b7b7b7'}}>
                          {I18n.t('translate_returnBack')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            }
          />
        )}
      </View>
    );
  };

  TopPick = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: ViewScale(260),
          height: ViewScale(140),
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#3986ee',
          flex: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({Show2: !this.state.Show});
            this.setState({
              img: item.activity_list_logo_banner,
              StarD: this.FullDate(item.activity_list_start_date),
              EndD: this.FullDate(item.activity_list_end_date),
              name:
                I18n.locale === 'th'
                  ? item.activity_list_topic_th
                  : item.activity_list_topic_en,
              location:
                I18n.locale === 'th'
                  ? item.activity_list_location_th
                  : item.activity_list_location_en,
              detail:
                I18n.locale === 'th'
                  ? item.activity_list_desc_th
                  : item.activity_list_desc_en,
              partic: item.max_of_participate,
              register: this.web(item.list_register_url),
              code: item.activity_code,
              price:
                I18n.locale === 'th'
                  ? item.activity_price_th
                  : item.activity_price_en,

              StatusFa: this.state.Selec2[item.activity_code],
              check: this.state.Selec[index],
              linklive: item.activity_list_live_url,
              live: item.status_live,
              item1: item,
              Close: item.active_status,
              contry_TH:
                I18n.locale === 'th'
                  ? item.list_country_name_th
                  : item.list_country_name_en,

              contry_img_flag: item.img_flag,
              endregis: this.FullDate(item.activity_list_end_regis),
              starretgis: this.FullDate(item.activity_list_start_regis),
              product_category: item.activity_product_category,
              daparment_name: item.activity_list_department_name,
              officer_name: item.activity_list_officer_name,
              deparment_tel: item.activity_list_department_tel,
              url: item.list_register_url,
              StarDx: item.activity_list_start_date,
              EndDx: item.activity_list_end_date,
              imgx: item.activity_list_logo_thumb,
            });
          }}>
          <View>
            <View style={Styles.ViewSub5}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 5,
                }}>
                <Image
                  style={{width: ViewScale(30), height: ViewScale(30)}}
                  source={require('../../image/startoppick.png')}
                />
                <View style={[Styles.ViewSub3, {flex: 0.9}]}>
                  <Text style={Styles.TextSub3}>
                    {this.Star_Date(item.activity_list_start_date)}{' '}
                    {this.End_Datet(item.activity_list_end_date)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '80%',
                  marginTop: 5,
                  flexDirection: 'row',
                  marginLeft: -8,
                  left: 0,
                }}>
                <Text numberOfLines={2} style={Styles.TextSub4}>
                  {I18n.locale === 'th'
                    ? item.activity_list_topic_th
                    : item.activity_list_topic_en}
                </Text>
              </View>
              <View style={{width: '73%', marginBottom: 5, left: -12}}>
                <Text style={Styles.TextSub3}>
                  {I18n.t('translate_Numberexposure')} {item.max_of_participate}{' '}
                  {I18n.t('translate_Case')}
                </Text>
              </View>
              <View
                style={{
                  left: 0,
                  width: '80%',
                  bottom: 5,
                  flexDirection: 'row',
                }}>
                <View style={[Styles.ViewSub8, {flex: 1}]}>
                  <Image
                    style={Styles.ImgSub3}
                    source={{
                      uri: item.img_flag,
                    }}
                  />
                  <Text numberOfLines={1} style={Styles.textContry1}>
                    {'  '}
                    {I18n.locale === 'th'
                      ? item.list_country_name_th
                      : item.list_country_name_en}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row-reverse',

                    flex: 0.2,
                  }}>
                  {item.status_live === 'C' && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(item.activity_list_live_url)
                      }>
                      <View style={[Styles.ViewSub3, {}]}>
                        <ImageBackground
                          style={Styles.ImgBackgroungSub1}
                          source={require('../../image/newlive.png')}
                        />
                        <View style={{bottom: 13, right: 30}}>
                          <Text style={{fontSize: 12, color: '#334c6e'}}>
                            {I18n.t('translate_Prepare')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {item.status_live === 'Y' && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(item.activity_list_live_url)
                      }>
                      <View style={[Styles.ViewSub3, {}]}>
                        <ImageBackground
                          style={Styles.ImgBackgroungSub1}
                          source={require('../../image/newlive.png')}
                        />
                        <View style={{bottom: 13, right: 25}}>
                          <Text style={{fontSize: 12, color: '#ff7373'}}>
                            {I18n.t('translate_OnAir')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {item.status_live === 'B' && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(item.activity_list_live_url)
                      }>
                      <View style={[Styles.ViewSub3, {}]}>
                        <ImageBackground
                          style={Styles.ImgBackgroungSub1}
                          source={require('../../image/newlive.png')}
                        />
                        <View style={{bottom: 13, right: 28}}>
                          <Text style={{fontSize: 12, color: '#b7b7b7'}}>
                            {I18n.t('translate_returnBack')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      // </LinearGradient>
      // </View>
      // </ImageBackground>
    );
  };

  BarCalendar = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={{flex: 0.8, marginBottom: 20}}>
          <MonthSelectorCalendar
            containerStyle={{bottom: 20}}
            maxDate={Moment('01-01-3000', 'DD-MM-YYYY')}
            minDate={Moment('01-01-2000', 'DD-MM-YYYY')}
            prevIcon={<Icon1 name="left" size={20} />}
            nextIcon={<Icon1 name="right" size={20} />}
            localeLanguage="en"
            yearTextStyle={{color: '#000', fontSize: 20}}
            selectedMonthTextStyle={{color: '#FFF', fontSize: 20}}
            monthTextStyle={{color: '#000', fontSize: 20}}
            selectedBackgroundColor={'#2d6dc4'}
            selectedDate={this.state.month}
            onMonthTapped={date => {
              this.setState({month: date, ddmmyyy: date});
            }}
            monthFormat={'MMMM'}
            localeSettings={{
              months: [
                'ม.ค.',
                'ก.พ.',
                'มี.ค.',
                'เม.ย.',
                'พ.ค.',
                'มิ.ย.',
                'ก.ค.',
                'ส.ค.',
                'ก.ย.',
                'ต.ค.',
                'พ.ย.',
                'ธ.ค.',
              ],
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            width: '66%',
            height: '100%',
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 50,
            backgroundColor: '#2d6dc4',
          }}
          onPress={async () => {
            this.RBSheet.close();
            let mmyy = this.state.ddmmyyy.format('M YYYY');
            let mmmyyy = mmyy.split(' ');

            this.setState({ddmmyyy: mmmyyy});
            this.setState(
              {
                ...this.state,

                Recommend: [],

                isListEnd: false,
                loading: false,
                fetching_from_server: false,
              },
              function() {
                this.offset = 0;
                this._getRecommed();
              },
            );
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
            }}>
            {I18n.t('translate_Accept')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '66%',
            height: '100%',
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 50,
            backgroundColor: '#96b3cb',
          }}
          onPress={async () => {
            this.RBSheet.close();

            this.setState({ddmmyyy: undefined, month: undefined});
            this.setState(
              {
                Recommend: [],

                isListEnd: false,
                loading: false,
                fetching_from_server: false,
              },
              function() {
                this.offset = 0;
                this._getRecommed();
              },
            );
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
            }}>
            {I18n.t('translate_Clean')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '66%',
            height: '100%',
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
            marginTop: 10,
            borderRadius: 50,
            backgroundColor: '#f96145',
          }}
          onPress={() => this.RBSheet.close()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
            }}>
            {I18n.t('translate_Cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _getAllactivities = async values => {
    try {
      const response = await this.props.dispatch(getAllactivities());
      // console.log("Trade"+response.result)
      if (response.res_code === '00') {
        this.setState(
          {
            AllActivity: response.result,
          },
          function() {},
        );
      }
    } catch (error) {}
  };

  _DataToppick = () => {
    const Start = 5;
    let data = [];

    for (let index = Start; index < this.state.Toppic.length; index++) {
      const {ToppickData} = this.state;
      data.push(this.state.Toppic[index]);
      ToppickData.push(this.state.Toppic[index]);
      this.arrayholder2 = this.state.ToppickData;
    }

    return data;
  };

  componentDidMount() {
    this._getAllactivities();
    this._getToppic();
    this._getRecommed();
    this._getActivitySelect();
    this._GetSearchNeed();
    this._GetSearchProduct();
    this._getCounttrySelect();
  }

  _getActivitySelect = async value => {
    try {
      const response = await this.props.dispatch(GetActivityGroup());

      if (response.res_code === '00') {
        // console.log('TEZTDAT' + response.result);
        this.setState({
          GetactivityValue: response.result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  _GetSearchNeed = async value => {
    try {
      const payload = this.props.authData.token;
      const response = await this.props.dispatch(
        GetSearchproductneed({
          result: {},
          type: 1,
          token: payload,
        }),
      );

      if (response.res_code === '00') {
        this.setState({dataproductNeed: response.result});
      }

      // if (response.res_code === '00') {
      console.log('GetSearchproductneed');

      console.log(response.result);
      //   // this.setState({
      //   //   GetactivityValue: response.result,
      //   // });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  _GetSearchProduct = async value => {
    try {
      const payload = this.props.authData.token;
      const response = await this.props.dispatch(
        GetSearchproduct({
          result: {},
          type: 1,
          token: payload,
        }),
      );

      if (response.res_code === '00') {
        this.setState({datagetproduct: response.result});
      }

      // if (response.res_code === '00') {
      // console.log('_GetSearchProduct' );

      //   console.log( response.result);
      //   // this.setState({
      //   //   GetactivityValue: response.result,
      //   // });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  ListAllActivity = ({item}) => {
    return (
      <View style={{backgroundColor: '#f4f5f850',}}>
        {item.activity_list >= 1 ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ViewTrade', {
                idAct: item.activity_type_code,
                nameth: item.name_th,
                nameen: item.name_en,
                list: item.activity_list,
              });
              this.props.dispatch({
                type: 'GET_ID_SUCCESS',
                payload: item.activity_type_code,
              });
            }}>
            <ListItem
              // containerStyle={{
              //   width: '95%',
              //   borderRadius: 10,
              //   marginBottom: 6,
              //   alignSelf: 'center',
              //   backgroundColor: '#FFFFFF',
              // }}
              containerStyle={{
                marginBottom: 8,
                borderRadius: 10,
                alignSelf: 'center',
                flex: 1,
                width: '95%',
                // shadowColor: '#f4f6fa ',
                // shadowOffset: {
                //   width: 0,
                //   height: 1,
                // },=j;
                // shadowOpacity: 0.18,
                // shadowRadius: 1.00,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
        
                elevation: 5,
              }}
              style={{
                width: '100%',
                height: null,

                backgroundColor: '#f4f5f850',
              }}
              leftAvatar={
                <Image
                  source={{uri: item.img}}
                  style={{width: ViewScale(65), height: ViewScale(55)}}
                />
              }
              subtitle={
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        popupShow: true,
                        imgmenu: item.img,
                        namemenu:
                          I18n.locale === 'th' ? item.name_th : item.name_en,
                        detailmenu: item.detail,
                      });
                    }}
                    style={{flex: 0.2, justifyContent: 'center'}}>
                    <Image
                      style={{width: ViewScale(20), height: ViewScale(20)}}
                      source={require('../../image/infox.png')}
                    />
                  </TouchableOpacity>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={Styles.textlistactivityall}>
                      {I18n.locale === 'th' ? item.name_th : item.name_en}
                    </Text>
                  </View>
                  <View style={{flex: 0.2, justifyContent: 'center'}}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#9c7df6', '#3986ee']}
                      style={{width: ViewScale(35), height: ViewScale(35), borderRadius: 17}}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: ViewScale(20),
                          textAlign: 'center',
                          marginTop: 6,
                        }}>
                        {item.activity_list}
                      </Text>
                    </LinearGradient>
                  </View>
                  <View style={{flex: 0.1, justifyContent: 'center'}}>
                    <Icon name="chevron-right" size={25} color="#3986ee" />
                  </View>
                </View>

                // <View
                //   style={{
                //     width: 103,
                //     height: 20,
                //     backgroundColor: '#2d6dc4',
                //     borderRadius: 11.5,
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //   }}>
                //   <Text style={{fontSize: 14, color: '#FFFFFF'}}>
                //     {item.activity_list} {I18n.t('translate_activities')}
                //   </Text>
                // </View>
              }
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };

  render() {
    const {abc} = this.props.route.params;
    return (
      <View style={[Styles.ViewSub1, {flex: 1}]}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={abc}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />

        {this.props.getUser.userDetails.res_result.type != 6 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 20}
            style={{flex: 1, zIndex: -1}}>
            <ScrollView style={{zIndex: -1}}>
              {/* <Headerstage nameTab={I18n.t('translate_HearderTrade')} /> */}
              <HeaderText nameTab={I18n.t('translate_HearderTrade')} />
              <View style={{zIndex: -1, flex: 1, backgroundColor: '#'}}>
                <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  height={this.state.SizebarModel}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    draggableIcon: {
                      backgroundColor: '#d8d8d8',
                      width: 80,
                    },
                    container: {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    },
                  }}>
                  {this.BarCalendar()}
                </RBSheet>
                {this.state.Toppic != undefined && (
                  <View style={{marginBottom: 10}}>
                    {this.state.Toppic.length > 0 && (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <HeaderToppick
                            nameTab={I18n.t('translate_Toppickanddoolan')}
                          />

                          <View
                            style={{
                              flexDirection: 'row-reverse',
                              flex: 0.8,
                            }}>
                            <Image
                              mode="resize"
                              style={[Styles.ImgSub1]}
                              source={require('../../image/bitmap.png')}
                            />
                            <Text style={Styles.TextSub2}>
                              {I18n.t('translate_By')}{' '}
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '100%', flex: 1, bottom: 10,}}>
                          <FlatList
                            extraData={this.state}
                            horizontal={true}
                            data={this.state.Toppic.slice(
                              0,
                              this.state.ToppicData,
                            )}
                            keyExtractor={(item, index) => item.activity_code}
                            renderItem={this.TopPick}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                )}

                <SegmentedControlTab
                 tabTextStyle={{fontSize: ViewScale(16)}}
                 activeTabTextStyle={{fontSize : ViewScale(16),}}
                  values={[
                    I18n.t('translate_Recommended_activities'),
                    I18n.t('translate_All_activities'),
                  ]}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                />

                {this.state.selectedIndex === 0 && (
                  <View style={{flex: 1, }}>
                    <View style={{}}>
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 8,
                          marginBottom: 1,
                          zIndex: -1,
                        
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            // marginHorizontal: 10,
                          }}>
                          <View
                            style={{
                              marginTop: 13,
                              // width: '100%',
                              flex: 1,
                              height: ViewScale(35),
                              backgroundColor: '#FFFFFF',
                              borderColor: '#cacaca',
                              borderWidth: 1,
                              borderRadius: 16,
                              marginLeft: 0,
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: 5,
                            }}>
                            <Image
                              style={[Styles.Image, {marginTop: 3}]}
                              source={require('../../image/searchblue.png')}
                            />
                            {/* {this.state.CheckRecom.length > 0 ? (
                              <TextInput
                                onChangeText={e => {
                                  // this.SearchSubmit(e);
                                }}
                                placeholderTextColor="#dadada"
                                style={[Styles.TextInputseach1]}
                                placeholder={I18n.t('translate_Seach')}
                              />
                            ) : (
                              <TextInput
                                onChangeText={e => {
                                  // this.SearchSubmitToppick(e);
                                }}
                                placeholderTextColor="#dadada"
                                style={[Styles.TextInputseach1]}
                                placeholder={I18n.t('translate_Seach')}
                              />
                            )} */}
                            <TextInput
                              onChangeText={e => {
                                // this.SearchSubmit(e);
                                this.setState({textSearch: e});
                              }}
                              placeholderTextColor="#dadada"
                              style={[Styles.TextInputseach1]}
                              placeholder={I18n.locale==='th'?'ค้นหา':'Search'}
                              value={this.state.textSearch}
                            />
                          </View>
                          <View
                            style={{
                              flex: 0.4,
                              backgroundColor: '#2d6dc4',
                              height: ViewScale(35),
                              borderRadius: 16,
                              marginTop: 13,
                              marginHorizontal: 7,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState(
                                  {
                                    Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                  },
                                  function() {
                                    this.offset = 0;
                                    this._getRecommed();
                                  },
                                );
                              }}
                              style={{flex: 1, justifyContent: 'center'}}>
                              <Text style={Styles.searchText1}>{I18n.locale === 'th' ? 'ค้นหา' : 'Search' }</Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flex: 0.5,
                              backgroundColor: '#ff5e5e',
                              height: ViewScale(35),
                              borderRadius: 16,
                              marginTop: 13,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState(
                                  {
                                    Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                    textSearch: '',
                                    valueindexdev: undefined,
                                    searchOnline: null,
                                    ckonline:false,
                                    valueSelectActivity4: undefined,
                                    valueSelectActivity1: undefined,

                                    valueSelectActivity3dev: undefined,
                                    textSelectActivity1: undefined,
                                    valueSelectActivity4:undefined
                                  },
                                  function() {
                                    this.offset = 0;
                                    this._getRecommed();
                                  },
                                );
                              }}
                              style={{flex: 1, justifyContent: 'center'}}>
                              <Text style={Styles.searchText1}>
                                {I18n.t('transalte_Bt_clear_all')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            flex: 1,
                          }}>
                          <View
                            style={{
                              marginTop: 5,
                              // width: '50%',
                              flex: 1,
                              height: ViewScale(34),
                              backgroundColor: '#FFFFFF',

                              borderRadius: 21.5,
                              marginHorizontal: 5,
                              // flexDirection: 'row',
                              marginBottom: 4,
                            }}>
                            <RNPickerSelect
                              disabled={this.state.checkRNPickerstate}
                              useNativeAndroidPickerStyle={false}
                              _fixAndroidTouchableBug_={false}
                              style={{
                                inputAndroidContainer: {
                                  width: '100%',
                                },
                                ...pickerSelectStyles2,
                              }}
                              placeholder={{
                                label:
                                  I18n.locale === 'th' ? 'ความต้องการ' : 'All',
                                value:
                                  I18n.locale === 'th' ? 'ความต้องการ' : 'All',
                              }}
                              doneText={
                                I18n.locale === 'th' ? 'เลือก' : 'Done'
                              }
                              value={
                                this.state.valueSelectActivity3dev === undefined
                                  ? I18n.t('transalte_Demand')
                                  : this.state.valueSelectActivity3dev
                              }
                              onValueChange={(value, index) => {
                                this.setState({
                                  valueSelectActivity3dev:
                                    index === 0
                                      ? I18n.t('transalte_Demand')
                                      : this.state.dataproductNeed[index - 1]
                                          .Need,
                                  valueindexdev:
                                    index === 0
                                      ? ''
                                      : this.state.dataproductNeed[index - 1]
                                          .need_id,
                                });
                                if (Platform.OS === 'android') {
                                  this.setState(
                                    {
                                      Recommend: [],
                                      isListEnd: false,
                                      loading: false,
                                      fetching_from_server: false,
                                    },
                                    function() {
                                      this.offset = 0;
                                      this._getRecommed();
                                    },
                                  );
                                }
                              }}
                              onDonePress={() => {
                                this.setState(
                                  {
                                    Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                  },
                                  function() {
                                    this.offset = 0;
                                    this._getRecommed();
                                  },
                                );
                              }}
                              items={this.state.dataproductNeed.map(object => ({
                                label: object.Need.toString(),
                                value: object.Need.toString(),
                                key: object.Need.toString(),
                              }))}>
                              <View style={Styles.view1}>
                                <View style={Styles.view2}>
                                  {this.state.valueSelectActivity3dev ===
                                  undefined ? (
                                    <Text style={Styles.viewckText}>
                                      {'   '}{I18n.t('transalte_Demand')}
                                    </Text>
                                  ) : (
                                    <Text
                                      numberOfLines={1}
                                      style={Styles.viewckText}>
                                      {'   '}
                                      {this.state.valueSelectActivity3dev}
                                    </Text>
                                  )}
                                </View>

                                <View style={Styles.view3icon}>
                                  <Icon
                                    name="chevron-down"
                                    size={20}
                                    color="#2d6dc4"
                                    style={{}}
                                  />
                                </View>
                              </View>
                            </RNPickerSelect>
                          </View>

                          <View
                            style={{
                              marginTop: 5,
                              // width: '50%',
                              flex: 1,
                              height: ViewScale(34),
                              backgroundColor: '#FFFFFF',
                              // borderColor: '#2d6dc4',
                              // borderWidth: 1,
                              borderRadius: 21.5,
                              marginHorizontal: 5,
                              // flexDirection: 'row',
                              marginBottom: 4,
                            }}>
                            <RNPickerSelect
                              disabled={this.state.checkRNPickerstate}
                              useNativeAndroidPickerStyle={false}
                              _fixAndroidTouchableBug_={false}
                              style={{
                                inputAndroidContainer: {
                                  width: '100%',
                                },
                                ...pickerSelectStyles2,
                              }}
                              placeholder={{
                                label:
                                  I18n.locale === 'th'
                                    ? 'ประเภทกิจกรรม'
                                    : 'All',
                                value:
                                  I18n.locale === 'th'
                                    ? 'ประเภทกิจกรรม'
                                    : 'All',
                              }}
                              value={
                                this.state.valueSelectActivity1 === undefined
                                  ? '0'
                                  : this.state.valueSelectActivity1
                              }
                              doneText={
                                I18n.locale === 'th' ? 'เลือก' : 'Done'
                              }
                              onValueChange={(value, index) => {
                                // alert(value + ""+index);
                                this.setState({
                                  valueSelectActivity1:
                                    index === 0
                                      ? index
                                      : this.state.GetactivityValue[
                                          index - 1
                                        ].activity_type_code.toString(),

                                  textSelectActivity1:
                                    index === 0
                                      ? 'ประเภทกิจกรรม'
                                      : I18n.locale === 'th'
                                      ? this.state.GetactivityValue[index - 1]
                                          .name_th
                                      : this.state.GetactivityValue[index - 1]
                                          .name_en,
                                });

                                if (Platform.OS === 'android') {
                                  this.setState(
                                    {
                                      Recommend: [],
                                      isListEnd: false,
                                      loading: false,
                                      fetching_from_server: false,
                                    },
                                    function() {
                                      this.offset = 0;
                                      this._getRecommed();
                                    },
                                  );
                                }
                              }}
                              onDonePress={() => {
                                this.setState(
                                  {
                                    Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                  },
                                  function() {
                                    this.offset = 0;
                                    this._getRecommed();
                                  },
                                );
                              }}
                              items={this.state.GetactivityValue.map(
                                object => ({
                                  label:
                                    I18n.locale === 'th'
                                      ? object.name_th.toString()
                                      : object.name_en.toString(),
                                  value: object.activity_type_code.toString(),
                                  key: object.activity_type_code.toString(),
                                }),
                              )}>
                              <View style={Styles.view1}>
                                <View style={Styles.view2}>
                                  {this.state.textSelectActivity1 ===
                                  undefined ? (
                                    <Text style={Styles.viewckText}>
                                      {'   '}
                                      {I18n.t('translate_ActivityType')}
                                    </Text>
                                  ) : (
                                    <Text
                                      numberOfLines={1}
                                      style={Styles.viewckText}>
                                      {'   '}
                                      {this.state.textSelectActivity1}
                                    </Text>
                                  )}
                                </View>

                                <View style={Styles.view3icon}>
                                  <Icon
                                    name="chevron-down"
                                    size={20}
                                    color="#2d6dc4"
                                    style={{}}
                                  />
                                </View>
                              </View>
                            </RNPickerSelect>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              // width: '50%',
                              flex: 1,
                              height: ViewScale(34),
                              backgroundColor: '#FFFFFF',
                              // borderColor: '#4b4b4b',
                              // borderWidth: 1,
                              borderRadius: 17,
                              marginHorizontal: 5,
                              justifyContent: 'center',
                              // flexDirection: 'row',
                            }}>
                            <RNPickerSelect
                              disabled={this.state.checkRNPickerstate}
                              useNativeAndroidPickerStyle={false}
                              _fixAndroidTouchableBug_={false}
                              style={{
                                inputAndroidContainer: {
                                  width: '100%',
                                },
                                ...pickerSelectStyles2,
                              }}
                              disabled={true}
                              placeholder={{
                                label:
                                  I18n.locale === 'th' ? 'ความต้องการ' : 'All',
                                value:
                                  I18n.locale === 'th' ? 'ความต้องการ' : 'All',
                              }}
                              onValueChange={
                                (value, index) =>
                                  // console.log(value,index),
                                  // console.log(
                                  //   this.state.datagetproduct[index].name_th,
                                  //   this.state.datagetproduct[index]
                                  //     .activity_product_category_id,
                                  // )
                                  this.setState({
                                    datagetproductname_th: this.state
                                      .datagetproduct[index].name_th,
                                    activity_product_category_id: this.state
                                      .datagetproduct[index]
                                      .activity_product_category_id,
                                  })

                                // Detail: [],
                                // isListEnd: false,
                                // loading: false,
                                // fetching_from_server: false,
                                // },
                                // function() {
                                //   this.offset = 0;
                                //   this._getDetailactivities();
                                //   // },
                                // )
                              }
                              items={this.state.datagetproduct.map(object => ({
                                label: object.name_th.toString(),
                                value: object.name_th.toString(),
                                key: object.id_list.toString(),
                              }))}>
                              <View
                                style={[
                                  Styles.view1,
                                  {borderColor: '#4b4b4b'},
                                ]}>
                                <View style={Styles.view2}>
                                  {this.state.datagetproductname_th ===
                                  undefined ? (
                                    <Text
                                      style={[
                                        Styles.viewckText,
                                        {color: '#4b4b4b'},
                                      ]}>
                                      {'   '}{I18n.t('transalte_Product_TraedAc')}
                                    </Text>
                                  ) : (
                                    <Text
                                      numberOfLines={1}
                                      style={[Styles.viewckText, {color: ''}]}>
                                      {'   '}
                                      {this.state.datagetproductname_th}
                                    </Text>
                                  )}
                                </View>
                                <View style={[Styles.view3icon, {flex: 0.3}]}>
                                  <Icon
                                    name="chevron-down"
                                    size={20}
                                    color="#4b4b4b"
                                    // color="#2d6dc4"
                                    style={{}}
                                  />
                                </View>
                              </View>
                            </RNPickerSelect>
                          </View>

                          <View
                            style={{
                              // width: '50%',
                              flex: 1,
                              height: ViewScale(34),
                              backgroundColor: '#FFFFFF',
                              // borderColor: '#2d6dc4',
                              // borderWidth: 1,
                              borderRadius: 17,
                              marginHorizontal: 3,
                              justifyContent: 'center',
                              // flexDirection: 'row',
                            }}>
                            <RNPickerSelect
                              disabled={this.state.checkRNPickerstate}
                              useNativeAndroidPickerStyle={false}
                              _fixAndroidTouchableBug_={false}
                              style={{
                                inputAndroidContainer: {
                                  width: '100%',
                                },
                                ...pickerSelectStyles2,
                              }}
                              placeholder={{
                                label: I18n.locale === 'th' ? 'สถานที่' : 'All',
                                value: I18n.locale === 'th' ? 'สถานที่' : 'All',
                              }}
                              value={
                                this.state.valueSelectActivity4 === undefined
                                  ? '0'
                                  : this.state.valueSelectActivity4
                              }
                              onValueChange={(value, index) => {
                                this.setState({
                                  valueSelectActivity4:
                                    index === 0
                                      ? 0
                                      : this.state.GetcounrtryValue[index - 1]
                                          .country_code,
                                  textSelectActivity4:
                                    index === 0
                                      ? 'สถานที่'
                                      : I18n.locale === 'th'
                                      ? this.state.GetcounrtryValue[index - 1]
                                          .name_th
                                      : this.state.GetcounrtryValue[index - 1]
                                          .name_en,
                                });
                                if (Platform.OS === 'android') {
                                  this.setState(
                                    {
                                      Recommend: [],
                                      isListEnd: false,
                                      loading: false,
                                      fetching_from_server: false,
                                    },
                                    function() {
                                      this.offset = 0;
                                      this._getRecommed();
                                    },
                                  );
                                }
                              }}
                              doneText={
                                I18n.locale === 'th' ? ' เลือก' : 'Done'
                              }
                              onDonePress={() => {
                                this.setState(
                                  {
                                    Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                  },
                                  function() {
                                    this.offset = 0;
                                    this._getRecommed();
                                  },
                                );
                              }}
                              items={this.state.GetcounrtryValue.map(
                                object => ({
                                  label:
                                    I18n.locale === 'th'
                                      ? object.name_th.toString()
                                      : object.name_en.toString(),
                                  value: object.country_code.toString(),
                                  key: object.country_code.toString(),
                                }),
                              )}>
                              <View style={Styles.view1}>
                                <View style={Styles.view2}>
                                  {this.state.textSelectActivity4 ===
                                  undefined ? (
                                    <Text style={Styles.viewckText}>
                                      {'   '}{I18n.t('transalte_location')}
                                    </Text>
                                  ) : (
                                    <Text
                                      numberOfLines={1}
                                      style={[Styles.viewckText]}>
                                      {'   '}
                                      {this.state.textSelectActivity4}
                                    </Text>
                                  )}
                                </View>
                                <View style={[Styles.view3icon, {flex: 0.3}]}>
                                  <Icon
                                    name="chevron-down"
                                    size={20}
                                    color="#2d6dc4"
                                    style={{}}
                                  />
                                </View>
                              </View>
                            </RNPickerSelect>
                          </View>

                          {this.state.ckonline === false ? (
                            <TouchableOpacity
                              onPress={() => {
                             
                                this.setState({
                                  ckonline: true,
                                  searchOnline: 'Y',
                                  Recommend: [],
                                    isListEnd: false,
                                    loading: false,
                                    fetching_from_server: false,
                                },function(){
                                  this.offset = 0;
                                    this._getRecommed();

                                });
                              }}
                              style={{
                                borderWidth: 1,
                                borderColor: '#2d6dc4',
                                height: ViewScale(34),
                                flex: 1,
                                borderRadius: 17,
                                marginHorizontal: 3,
                                backgroundColor: '#FFFF',
                                justifyContent: 'center',
                              }}>
                              <Text style={Styles.Notnoline}>{I18n.t('translate_Online')}</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  ckonline: false,
                                  searchOnline: null,
                                  Recommend: [],
                                  isListEnd: false,
                                  loading: false,
                                  fetching_from_server: false,
                                },function(){
                                  this.offset = 0;
                                    this._getRecommed();

                                });
                              }}
                              style={{
                                borderWidth: 1,
                                borderColor: '#2d6dc4',
                                height: ViewScale(34),
                                flex: 1,
                                borderRadius: 17,
                                marginHorizontal: 3,
                                backgroundColor: '#2d6dc4',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: '#FFF',
                                  fontFamily: 'Mitr-Regular',
                                  fontSize: ViewScale(13),
                                }}>
                                {I18n.t('translate_Online')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                  

                      {/* <View style={{backgroundColor: 'red',marginBottom:10}}> */}
                        <FlatList
                          // onEndReached={() => this._getRecommed()}
                          // scrollEnabled={false}
                          contentContainerStyle={Styles.flastListContainer}
                          style={Styles.flastListtab1}
                          extraData={this.state}
                          data={this.state.Recommend}
                          onEndReachedThreshold={0.5}
                          ItemSeparatorComponent={() => (
                            <View style={Styles.separator} />
                          )}
                          ListFooterComponent={this.renderFooter.bind(this)}
                          renderItem={this.ListActivity}
                          keyExtractor={(item, index) => item.activity_code}
                        />
                      {/* </View> */}
                    </View>
                  </View>
                )}
                {this.state.selectedIndex === 1 && (
                  <View style={{flex: 1, backgroundColor: '#f4f5f850',marginBottom:15}}>
                    <FlatList
                      scrollEnabled={false}
                      contentContainerStyle={[Styles.flastListContainer]}
                      style={Styles.flastListtab1}
                      data={this.state.AllActivity}
                      renderItem={this.ListAllActivity}
                      keyExtractor={(item, index) => item.activity_type_code}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {this.props.getUser.userDetails.res_result.type === 6 && (
          <View style={{height: '100%', zIndex: -1, flex: 1}}>
            <Text style={[Styles.tabbarTextStyle, {color: '#40536d'}]}>
              {'\t'}
              {I18n.t('translate_All_activities')}
            </Text>
            <FlatList
              contentContainerStyle={Styles.flastListContainer}
              style={Styles.flastListtab1}
              data={this.state.AllActivity}
              renderItem={this.ListAllActivity}
              keyExtractor={(item, index) => item.activity_type_code}
            />
          </View>
        )}

        {this.state.Show === true && (
          <Overlay
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc4' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.8 : 0.8,
            }}
            onBackdropPress={() => this.setState({Show: false})}
            isVisible>
            <View style={Styles.OverlayHight}>
              <View style={[Styles.OverlayView1, {marginTop: -10}]}>
                <TouchableOpacity onPress={() => this.setState({Show: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={[Styles.OverlayView2]}>
                  <View style={Styles.OverlayView3}>
                    {this.state.img != '' ? (
                      <Image
                        resizeMode={'contain'}
                        style={{width: '100%', height: ViewScale(216)}}
                        source={{uri: this.state.img}}
                      />
                    ) : (
                      <Image
                        resizeMode={'center'}
                        style={{width: '100%', height: ViewScale(216)}}
                        source={require('../../image/banerDrive.png')}
                      />
                    )}
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={Styles.popupTextTitle}>{this.state.name}</Text>
                    <Text style={Styles.opoupTextData1}>
                      {this.state.StarD} - {this.state.EndD}
                    </Text>
                    <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                      {I18n.t('translate_DataRegister')} :{' '}
                      {this.state.starretgis} - {this.state.endregis}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                          style={{width: ViewScale(18), height: ViewScale(13), top: 4}}
                          source={{uri: this.state.contry_img_flag}}
                        />
                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {'  '}
                          {this.state.contry_TH}
                        </Text>
                      </View>
                      <View style={{flex: 0.3}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.openLink(this.state.contry_TH);
                          }}
                          style={{
                            backgroundColor: '#2d6dc4',

                            borderRadius: 11,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#FFFFFF',
                              fontSize: ViewScale(18),
                            }}>
                            {I18n.t('transalte_map')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: ViewScale(7), height: ViewScale(11)}}
                        source={require('../../image/maker2.png')}
                      />
                      <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                        {'  '}
                        {this.state.location}
                      </Text>
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {this.state.price}
                      </Text>
                    </View>
                    <View style={{marginTop: 0}}>
                      <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                        {I18n.t('translate_Num')} : {this.state.partic}{' '}
                        {I18n.t('translate_case')}
                      </Text>
                    </View>

                    {this.state.live === 'C' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={[Styles.ViewSub3]}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 33}}>
                            <Text style={{fontSize: ViewScale(12), color: '#334c6e'}}>
                              {I18n.t('translate_Prepare')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'Y' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: ViewScale(12), color: '#ff5e5e'}}>
                              {I18n.t('translate_OnAir')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'B' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: ViewScale(12), color: '#b7b7b7'}}>
                              {I18n.t('translate_returnBack')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={{margin: 10}}>
                      <Image
                        style={{width: ViewScale(334), height: ViewScale(1)}}
                        source={require('../../image/line6.png')}
                      />
                    </View>

                    {this.state.ckhide === false ? (
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text
                          onPress={() => {
                            this.setState({ckhide: true});
                          }}
                          style={{
                            fontSize: ViewScale(18),
                            color: '#2d6dc4',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                          }}>
                          {I18n.t('transalte_show_details')}
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-down"
                          size={20}
                        />
                      </View>
                    ) : (
                      <>
                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {I18n.t('translate_DataShow')} :
                        </Text>

                        <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                          {' '}
                          {this.state.StarD} - {this.state.EndD}{' '}
                        </Text>

                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {I18n.t('translate_DataRegister')} :{' '}
                        </Text>

                        <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                          {' '}
                          {this.state.starretgis} - {this.state.endregis}{' '}
                        </Text>

                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {I18n.t('translate_place')} :
                        </Text>

                        <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                          {' '}
                          {this.state.location}{' '}
                        </Text>

                        {/* thking */}

                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {I18n.t('translate_group_product')} :
                        </Text>

                        {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                                {' '}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })}
                        <Text style={{fontSize: ViewScale(18), color: '#3a3a3a'}}>
                          {I18n.t('translate_Readmore')} :
                        </Text>
                        <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                          {I18n.t('translate_Main')}
                        </Text>
                        <View style={{width: 321, height: null}}>
                          <Text style={{fontSize: ViewScale(18), color: '#7d7d7d'}}>
                            {this.state.detail}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <Text
                            onPress={() => {
                              this.setState({ckhide: false});
                            }}
                            style={{
                              fontSize: ViewScale(18),
                              color: '#2d6dc4',
                              textAlign: 'center',
                              textDecorationLine: 'underline',
                            }}>
                            {I18n.t('transalte_Hide_details')}
                          </Text>
                          <Icon3
                            color="#2d6dc4"
                            name="keyboard-arrow-up"
                            size={20}
                          />
                        </View>
                      </>
                    )}

                    <View style={{margin: 10}}>
                      <Image
                        style={{width: ViewScale(334), height: ViewScale(1)}}
                        source={require('../../image/line6.png')}
                      />
                    </View>

                    <View style={{flex: 1}}>
                      <Text style={{color: '#3a3a3a', fontSize: ViewScale(18)}}>
                        {I18n.t('transalte_responsible_agency')} : {this.state.daparment_name}
                      </Text>
                      <Text style={{color: '#3a3a3a', fontSize: ViewScale(18)}}>
                        {I18n.t('transalte_project_staff')} :{' '}
                        {this.officer_name(this.state.officer_name)}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={{width: ViewScale(29), height: ViewScale(29)}}
                          source={require('../../image/phonelx.png')}
                        />

                        <Text
                          onPress={() => {
                            this.Call(this.state.deparment_tel);
                          }}
                          style={{color: '#2d6dc4', fontSize: ViewScale(18), top: ViewScale(4)}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 13,

                        alignItems: 'center',
                      }}>
                      {this.state.StatusBas != '1' ? (
                        <View>
                          {this.state.StatusFa === false ? (
                            <TouchableOpacity
                              onPress={() => {
                                this.selecitem({
                                  item: this.state.item1,
                                });
                                // this.setState({Show: false});
                                this.setState({StatusFa: true});
                              }}
                              style={{flexDirection: 'row'}}>
                              <Image
                                style={{width: ViewScale(20), height: ViewScale(20)}}
                                source={require('../../image/shoping.png')}
                              />

                              <Text style={{fontSize: ViewScale(20), color: '#163c70'}}>
                                {'  '}
                                {I18n.t('translate_addFavorites')}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                this.selecitem({
                                  item: this.state.item1,
                                });

                                this.setState({StatusFa: false});
                              }}
                              style={{flexDirection: 'row'}}>
                              <Image
                                style={{width: ViewScale(20), height: ViewScale(20)}}
                                source={require('../../image/startoppick.png')}
                              />

                              <Text style={{fontSize: 20, color: '#163c70'}}>
                                {'  '}
                                {I18n.t('translate_Delete_basket')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ) : (
                        <View>
                          {this.state.status_bas === false ? (
                            <TouchableOpacity
                              onPress={() => {
                                this._SendBasket({code: this.state.code});
                                this.setState({Show: false});
                              }}
                              style={{flexDirection: 'row'}}>
                              {console.log(this.state.status_bas)}
                              <Image
                                style={{width: ViewScale(20), height: ViewScale(20)}}
                                source={require('../../image/shoping.png')}
                              />

                              <Text style={{fontSize: ViewScale(16), color: '#163c70'}}>
                                {'  '}
                                {I18n.t('translate_addFavorites')}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                this._DeleteBasket({code: this.state.code});

                                this.setState({Show: false});
                              }}
                              style={{flexDirection: 'row'}}>
                              <Image
                                style={{width: ViewScale(20), height: ViewScale(20)}}
                                source={require('../../image/PickerMarket.png')}
                              />

                              <Text style={{fontSize: ViewScale(16), color: '#163c70'}}>
                                {'  '}
                                {I18n.t('translate_Delete_basket')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}

                      <View style={{flexDirection: 'row'}}>
                        {this.props.getUser.userDetails.res_result.type != 6 &&
                        this.props.getUser.userDetails.res_result.type != 4 &&
                        this.props.getUser.userDetails.res_result.type != 3 ? (
                          <TouchableOpacity
                            disabled={this.state.Close === false}
                            onPress={() => {
                              this.setState({Show: false});

                              if (
                                this.props.getStatus1.isResult
                                  .status_confirm_identity.status_code === 0
                              ) {
                                this.props.navigation.navigate('Identity');
                              } else {
                                this.openLinkativity(this.state.code);
                                // this.props.navigation.navigate(
                                //   'TradeActivitiesRegister',
                                //   {
                                //     img: this.state.imgx,
                                //     imglogo: this.state.imglogo,
                                //     StarD_1: this.state.StarDx,
                                //     EndD_1: this.state.EndDx,
                                //     name: this.state.name,
                                //     imglogo: this.state.img,
                                //     location: this.state.location,

                                //     detail: this.state.detail,
                                //     partic: this.state.partic,
                                //     register: this.state.register,
                                //     code: this.state.code,
                                //     price: this.state.price,

                                //     StatusFa: this.state.Selec[this.state.code],

                                //     linklive: this.state.linklive,
                                //     live: this.state.live,
                                //     product_category: this.state
                                //       .product_category,
                                //     daparment_name: this.state.daparment_name,
                                //     officer_name: this.state.officer_name,
                                //     deparment_tel: this.state.deparment_tel,
                                //   },
                                // );
                              }
                            }}
                            style={
                              this.state.Close
                                ? Styles.TouchSub1
                                : Styles.TouchSub6
                            }>
                            <Text
                              style={{
                                fontSize: ViewScale(19),
                                color: '#FFFFFF',
                                fontFamily: 'Kittithada Bold 75',
                              }}>
                              {this.state.Close
                                ? I18n.t('translate_Apply_activities')
                                : I18n.t('translate_Applacation')}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View />
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          this.onShareDatali(this.state.name, this.state.url);
                        }}
                        style={{alignSelf: 'flex-end', marginTop: -25}}>
                        <Image
                          resizeMode={'contain'}
                          style={{width: ViewScale(14), height: ViewScale(16)}}
                          source={require('../../image/sharelx.png')}
                        />
                        {/* <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-down"
                          size={20}
                        /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}

        {this.state.Show2 === true && (
          <Overlay
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc4' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.8 : 0.8,
            }}
            onBackdropPress={() => this.setState({Show2: false})}
            isVisible>
            <View style={Styles.OverlayHight}>
              <View style={[Styles.OverlayView1, {marginTop: -10}]}>
                <TouchableOpacity onPress={() => this.setState({Show2: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    {this.state.img != '' ? (
                      <Image
                        resizeMode={'contain'}
                        style={{width: '100%', height: ViewScale(216)}}
                        source={{uri: this.state.img}}
                      />
                    ) : (
                      <View style={{alignItems: 'center'}}>
                        <Image
                          resizeMode={'contain'}
                          style={{width: '50%', height: ViewScale(216)}}
                          source={require('../../image/banerDrive.png')}
                        />
                      </View>
                    )}
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={Styles.popupTextTitle}>{this.state.name}</Text>
                    <Text style={Styles.opoupTextData1}>
                      {this.state.StarD} - {this.state.EndD}
                    </Text>
                    <Text style={Styles.opoupTextData1}>
                      {I18n.t('translate_DataRegister')} :{' '}
                      {this.state.starretgis} - {this.state.endregis}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                          style={{width: ViewScale(18), height: ViewScale(13), top: ViewScale(4)}}
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
                      <Image
                        style={{width: ViewScale(7), height: ViewScale(11)}}
                        source={require('../../image/maker2.png')}
                      />
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

                    {this.state.live === 'C' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={[Styles.ViewSub3]}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 33}}>
                            <Text style={{fontSize: ViewScale(12), color: '#334c6e'}}>
                              {I18n.t('translate_Prepare')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'Y' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: ViewScale(12), color: '#ff5e5e'}}>
                              {I18n.t('translate_OnAir')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'B' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: ViewScale(12), color: '#b7b7b7'}}>
                              {I18n.t('translate_returnBack')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={{margin: 10}}>
                      <Image
                        style={{width: ViewScale(334), height: ViewScale(1)}}
                        source={require('../../image/line6.png')}
                      />
                    </View>

                    {this.state.ckhide2 === false ? (
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text
                          onPress={() => {
                            this.setState({ckhide2: true});
                          }}
                          style={Styles.popupTexthideText}>
                          {I18n.t('transalte_show_details')}
                        </Text>
                        <Icon3
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
                          {' '}
                          {this.state.StarD} - {this.state.EndD}{' '}
                        </Text>

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_DataRegister')} :{' '}
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {' '}
                          {this.state.starretgis} - {this.state.endregis}{' '}
                        </Text>

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_place')} :
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {' '}
                          {this.state.location}{' '}
                        </Text>

                        {/* thking */}

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_group_product')} :
                        </Text>

                        {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={Styles.popupTextdetail}>
                                {' '}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })}

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_Readmore')} :
                        </Text>
                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_Main')}
                        </Text>
                        <View style={{width: ViewScale(321), height: null}}>
                          <Text style={Styles.popupTextdetail}>
                            {this.state.detail}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <Text
                            onPress={() => {
                              this.setState({ckhide2: false});
                            }}
                            style={Styles.popupTexthideText}>
                            {I18n.t('transalte_Hide_details')}
                          </Text>
                          <Icon3
                            color="#2d6dc4"
                            name="keyboard-arrow-up"
                            size={20}
                          />
                        </View>
                      </>
                    )}
                    <View style={{margin: 10}}>
                      <Image
                        style={{width: ViewScale(334), height: ViewScale(1)}}
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
                          style={{width: ViewScale(29), height: ViewScale(29)}}
                          source={require('../../image/phonelx.png')}
                        />

                        <Text
                          onPress={() => {
                            this.Call(this.state.deparment_tel);
                          }}
                          style={{color: '#2d6dc4', fontSize: ViewScale(18), top: ViewScale(4)}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 13,

                        alignItems: 'center',
                      }}>
                      {this.state.StatusFa === false ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.selecitem2({
                              item: this.state.item1,
                            });
                            this.setState({Show2: false});
                          }}
                          style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: ViewScale(20), height: ViewScale(20)}}
                            source={require('../../image/startoppick.png')}
                          />

                          <Text style={Styles.popupTextdelect}>
                            {'  '}
                            {I18n.t('translate_addFavorites')}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            this.selecitem2({
                              item: this.state.item1,
                            });

                            this.setState({Show2: false});
                          }}
                          style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: ViewScale(20), height: ViewScale(20)}}
                            source={require('../../image/startoppick.png')}
                          />

                          <Text style={Styles.popupTextdelect}>
                            {'  '}
                            {I18n.t('translate_Delete_basket')}
                          </Text>
                        </TouchableOpacity>
                      )}

                      <View>
                        {this.props.getUser.userDetails.res_result.type != 6 &&
                        this.props.getUser.userDetails.res_result.type != 4 &&
                        this.props.getUser.userDetails.res_result.type != 4 ? (
                          <TouchableOpacity
                            disabled={this.state.Close === false}
                            onPress={() => {
                              this.setState({Show2: false});

                              if (
                                this.props.getStatus1.isResult
                                  .status_confirm_identity.status_code === 0
                              ) {
                                this.props.navigation.navigate('Identity');
                              } else {
                                this.openLinkativity(this.state.code);
                                // this.props.navigation.navigate(
                                //   'TradeActivitiesRegister',
                                //   {
                                //     img: this.state.imgx,
                                //     imglogo: this.state.imglogo,
                                //     StarD_1: this.state.StarDx,
                                //     EndD_1: this.state.EndDx,
                                //     name: this.state.name,
                                //     imglogo: this.state.img,
                                //     location: this.state.location,

                                //     detail: this.state.detail,
                                //     partic: this.state.partic,
                                //     register: this.state.register,
                                //     code: this.state.code,
                                //     price: this.state.price,

                                //     StatusFa: this.state.Selec[this.state.code],

                                //     linklive: this.state.linklive,
                                //     live: this.state.live,
                                //     product_category: this.state
                                //       .product_category,
                                //     daparment_name: this.state.daparment_name,
                                //     officer_name: this.state.officer_name,
                                //     deparment_tel: this.state.deparment_tel,
                                //   },
                                // );
                              }
                            }}
                            style={
                              this.state.Close
                                ? Styles.TouchSub1
                                : Styles.TouchSub6
                            }>
                            <Text style={Styles.textactivityregister}>
                              {this.state.Close
                                ? I18n.t('translate_Apply_activities')
                                : I18n.t('translate_Applacation')}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View />
                        )}
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onShareDatali(this.state.name, this.state.url);
                      }}
                      style={{alignSelf: 'flex-end', marginTop: -25}}>
                      <Image
                        resizeMode={'contain'}
                        style={{width: 14, height: 16}}
                        source={require('../../image/sharelx.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}
        {this.state.OpenpopupContry === true && (
          <Overlay
            onBackdropPress={() => {
              this.setState({OpenpopupContry: false});
            }}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc4' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.8 : 0.8,
            }}>
            <View style={{width: width, paddingBottom: 15, marginTop: 15}}>
              <View style={{alignSelf: 'center', paddingBottom: 15}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2d6dc4',
                    height: ViewScale(40),
                    width: width * 0.7,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: ViewScale(20),
                      color: '#FFFFFF',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {I18n.t('transalte_Thailand')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#568ae0',
                    height: 40,
                    width: width * 0.7,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: ViewScale(20),
                      color: '#FFFFFF',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {I18n.t('transalte_foreign_country')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}
        {this.state.popupShow === true && (
          <Overlay
            onBackdropPress={() => {
              this.setState({popupShow: false});
            }}
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc4' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.8 : 0.8,
            }}>
            <View
              style={{
                width: width * 0.8,
                alignItems: 'center',
              }}>
              <View style={{paddingBottom: 10}}>
                <Image
                  style={{width: ViewScale(78), height: ViewScale(60)}}
                  source={{uri: this.state.imgmenu}}
                />
              </View>
              <View style={{paddingBottom: 10}}>
                <Text style={{fontSize: ViewScale(20), color: '#2d6dc4'}}>
                  {this.state.namemenu}
                </Text>
              </View>
              <View
                style={{
                  width: width * 0.8,
                  borderWidth: 0.5,
                  borderColor: '#cacaca',
                }}
              />
            </View>
            <View style={{width: width * 0.8}}>
              <Text style={{color: '#3a3a3a', fontSize: ViewScale(20)}}>
                {I18n.t('translate_Readmore')} :{' '}
              </Text>
              <Text
                style={{fontSize: 20, color: '#7d7d7d', marginHorizontal: 10}}>
                {this.state.detailmenu}
              </Text>
            </View>
          </Overlay>
        )}
      </View>
    );
  }
}
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 23,
    color: '#73838f',
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 2 : -3,
    paddingBottom: 5,
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
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  Number: state.globalReducer.Number,
  getStatus1: state.dataReducer.getStatus,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeActivitiesScreen);
