import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Share,
} from 'react-native';
import Popover from 'react-native-popover-view';
import Headers from '../../components/Headers';
import Headerstage2 from '../../components/Headerstage2';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {Overlay, CheckBox, ListItem} from 'react-native-elements';
import {SendBasket, DeleteBasket} from '../../actions/auth.actions';
import RNPickerSelect from 'react-native-picker-select';
import {getDetailactivities} from '../../actions/data.actions';
import {connect} from 'react-redux';
import Styles from './Styles';
import I18n from '../../utils/I18n';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import FastImage from 'react-native-fast-image';
import {getDeepLinkAct} from '../../config/utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { ViewScale } from '../../config/ViewScale';
import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import MonthSelectorCalendar from 'react-native-month-selector';
import {height} from '../Typeappeal/Styles';
class ViewTrade extends React.Component {
  constructor() {
    try {
      AsyncStorage.getItem('language', (err, result) => {
        if (result == 'TH') {
          this.setState({language: 'TH'});
        } else {
          this.setState({language: 'EN'});
        }
      });
    } catch (error) {}

    super();
    this.state = {
      endregis: null,
      starretgis: null,
      contry_TH: null,
      contry_img_flag: null,
      selec: [],
      Detail: [],
      Show: false,
      Actlist: [],
      Check: false,
      codeAct: '',
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      CheckStatus: [],
      // ddmmyyy: Moment(new Date(), 'MM YYYY'),
      SizebarModel: 500,
      monthh: [],
      checkfilter: false,
      product_category: [],
      open_selectyaer: false,

      ckhide: false,
      product_category: null,
      daparment_name: null,
      officer_name: null,
      deparment_tel: null,
      closePopover: false,

      countYear: [],
    };
    this.arrayholder = [];
    this.offset = 0;
  }

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
      const nametwo = '1. ' + name;
      return nametwo;
    }
  }

  yearCount() {
    var start_year = new Date().getFullYear();
    for (var yearDef = start_year; yearDef < start_year + 9; yearDef++) {
      if (I18n.locale === 'th') {
        this.state.countYear.push({
          YearN: yearDef + 543,
        });
      } else {
        this.state.countYear.push({
          YearN: yearDef,
        });
      }
      if (I18n.locale === 'th') {
        const defulttear = start_year + 543;
        this.setState({setdefulttear: defulttear.toString()});
      } else {
        const defulttear = start_year;
        this.setState({setdefulttear: defulttear.toString()});
      }
      // console.log('ฆฆฆฆฆฆ');
      // console.log(this.state.setdefulttear);
    }
  }

  SearchSubmit = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({Detail: newData});
  };

  _getDetailactivities = async values => {
    var date = new Date();
    const mms =  new Date().getMonth();
    //  alert(mms);
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          const num = this.offset;
          var list = this.props.Number.isResult;
          var tokenActivity = '';
          if (this.props.getUser.userDetails.res_result.type == 6) {
            tokenActivity = this.props.authData.token.res_result.token;
          } else {
            tokenActivity = this.props.authData.token;
          }
         
          console.log(
            'YEAR',
            this.state.valueSelectActivity3,
            date.getFullYear(),
          );
          this.response = await this.props.dispatch(
            getDetailactivities({
              results: {
                offset: num * 10,
                day:
                  this.state.valueSelectDay === undefined
                    ? ''
                    : this.state.valueSelectDay,
                month:
                  this.state.valueSelectMouthdev === undefined || 
                  this.state.valueSelectMouthdev === 0
                    ? ''
                    : this.state.valueSelectMouthdev,
                year:
                  this.state.valueSelectActivity3dev === undefined ||
                  this.state.valueSelectActivity3dev === 'ปี'
                    ? ''
                    : I18n.locale === 'th'
                    ? this.state.valueSelectActivity3dev - 543
                    : this.state.valueSelectActivity3dev,
              },
              type: this.props.getUser.userDetails.res_result.type,
              list: this.props.route.params.idAct,
              token: tokenActivity,
            }),
          );
          if (this.response.res_code === '00') {
            if (this.response.result.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                Detail: [...this.state.Detail, ...this.response.result],
                fetching_from_server: false,
              });
              this.state.Detail.map(data => {
                this.state.selec[data.activity_code] = data.status_basket;
              });

              this.arrayholder = this.state.Detail;
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

  renderFooter() {
    return (
      <View
        style={[
          Styles.footer,
          {backgroundColor: '#FFF', marginTop: height * 0.25},
        ]}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View>
            {this.state.Detail.length == 0 ? (
              <Text style={{fontSize: 22}}>{I18n.t('translate_Nodata')}</Text>
            ) : (
              <View>
                {this.state.fetching_from_server ? (
                  <ActivityIndicator color="black" style={{margin: 15}} />
                ) : null}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
  renderFooter2() {
    return (
      <View
        style={[
          Styles.footer,
          {
            backgroundColor: '#FFF',
            marginTop: this.state.Detail.length == 0 ? height * 0.25 : 0,
          },
        ]}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View style={{}}>
            {this.state.Detail.length == 0 ? (
              <Text style={{fontSize: 22}}>{I18n.t('translate_Nodata')}</Text>
            ) : (
              <View>
                {this.state.fetching_from_server ? (
                  <ActivityIndicator color="black" style={{margin: 15}} />
                ) : null}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
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

      if (values.check == 1) {
        if (response.res_code === '00') {
          // this.offset = 0;
          // this.setState({
          //   isListEnd: false,
          //   loading: false,
          //   fetching_from_server: false,
          //   Detail: [],
          //   selec: [],
          // });
          // this.offset = 0;
          // this._getDetailactivities();
        }
      }
    } catch (error) {}
  };

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
      if (values.check == 1) {
        if (response.res_code === '00') {
          // this.offset = 0;
          // this.setState({
          //   isListEnd: false,
          //   loading: false,
          //   fetching_from_server: false,
          //   Detail: [],
          //   selec: [],
          // });
          // this.offset = 0;
          // this._getDetailactivities();
        }
      }
    } catch (error) {}
  };

  web(item) {
    var uri = item.split('/');

    return uri[10];
  }
  async openLinkactivity(item) {
    const place = item;
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${place}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    console.log(url);
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

  checkMM() {
    var mm = new Date().getMonth();
    const DFMM = mm + 1;

    // this.setState({})

    if (DFMM === 1) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'มกราคม'})
        : this.setState({valueSelectMMMM: 'January'});
    } else if (DFMM === 2) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'กุมภาพันธ์'})
        : this.setState({valueSelectMMMM: 'February'});
    } else if (DFMM === 3) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'มีนาคม'})
        : this.setState({valueSelectMMMM: 'Murch'});
    } else if (DFMM === 4) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'เมษายน'})
        : this.setState({valueSelectMMMM: 'April'});
    } else if (DFMM === 5) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'พฤษาภาคม'})
        : this.setState({valueSelectMMMM: 'May'});
    } else if (DFMM === 6) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'มิถุนายน'})
        : this.setState({valueSelectMMMM: 'June'});
    } else if (DFMM === 7) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'กรกฎาคม'})
        : this.setState({valueSelectMMMM: 'July'});
    } else if (DFMM === 8) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'สิงหาคม'})
        : this.setState({valueSelectMMMM: 'August'});
    } else if (DFMM === 9) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'กันยายน'})
        : this.setState({valueSelectMMMM: 'September'});
    } else if (DFMM === 10) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'ตุลาคม'})
        : this.setState({valueSelectMMMM: 'October'});
    } else if (DFMM === 11) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'พฤศจิกายน'})
        : this.setState({valueSelectMMMM: 'Noverber'});
    } else if (DFMM === 12) {
      I18n.locale === 'th'
        ? this.setState({valueSelectMMMM: 'ธันวาคม'})
        : this.setState({valueSelectMMMM: 'December'});
    }
  }

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

  uriCheck(uri) {
    var check = uri.split('.');
    var check2 = check[4];

    return check2;
  }

  selecitem = ({index, item}) => {
    let {selec, DataTopPick, Detail} = this.state;

    selec[item.activity_code] = !selec[item.activity_code];

    this.setState({selec: selec});

    if (selec[item.activity_code] === true) {
      return this._SendBasket({code: item.activity_code});
    } else {
      return this._DeleteBasket({code: item.activity_code});
    }
  };

  onShare = async value => {
    console.log('vakkkk', value);
    try {
      const result = await Share.share({
        message:Platform.OS==='android'? value.activity_list_topic_th+"\n"+value.list_register_url:value.activity_list_topic_th+"\n"+value.list_register_url,
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
  onSharedetail = async (name,url) => {
    console.log('vakkkk', url);
    try {
      const result = await Share.share({
        message:Platform.OS==='android'? name+"\n"+url:name+"\n"+url,
        url: url,
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

  ListDataViewAct = ({item, index}) => {
    return (
      <View style={{backgroundColor: '#FFF'}}>
        <ListItem
          containerStyle={{
            marginBottom: ViewScale(8),
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
            <View style={[Styles.alignItemsCenter, {flex: 0.4}]}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      Show: !this.state.Show,
                      banner: item.activity_list_logo_banner,
                      Stardate: this.FullDate(item.activity_list_start_date),
                      Enddate: this.FullDate(item.activity_list_end_date),
                      title:
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
                      register: item.list_register_url,
                      code: item.activity_code,
                      price:
                        I18n.locale === 'th'
                          ? item.activity_price_th
                          : item.activity_price_en,
                      StatusFa: this.state.selec[item.activity_code],
                      check: this.state.selec[index],
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
                    })
                  }
                  style={{alignItems: 'center'}}>
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
                <View style={{width: '80%'}}>
                  <Text
                    onPress={() =>
                      this.setState({
                        Show: !this.state.Show,
                        banner: item.activity_list_logo_banner,
                        Stardate: this.FullDate(item.activity_list_start_date),
                        Enddate: this.FullDate(item.activity_list_end_date),
                        title:
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
                        register:item.list_register_url,
                        code: item.activity_code,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        StatusFa: this.state.selec[item.activity_code],
                        check: this.state.selec[index],
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
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
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
                    bottom: ViewScale(10),
                  }}>
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
                    checked={this.state.selec[item.activity_code]}
                    onPress={() => {
                      this.selecitem({item: item, index: index});
                    }}
                  />
                </View>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: ViewScale(10)}}>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    {item.activity_list_location_th === 'ออนไลน์' ||
                    item.status_online_regis === 'Y' ? (
                      <Image
                        style={{width: ViewScale(13), height: ViewScale(15), top: ViewScale(3)}}
                        source={require('../../image/WWW.png')}
                      />
                    ) : (
                      <Image
                        style={{width: ViewScale(13), height: ViewScale(15), top: ViewScale(3)}}
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
                    onPress={() =>
                      this.setState({
                        Show: !this.state.Show,
                        banner: item.activity_list_logo_banner,
                        Stardate: this.FullDate(item.activity_list_start_date),
                        Enddate: this.FullDate(item.activity_list_end_date),
                        title:
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
                        register: item.list_register_url,
                        code: item.activity_code,
                        price:
                          I18n.locale === 'th'
                            ? item.activity_price_th
                            : item.activity_price_en,
                        StatusFa: this.state.selec[item.activity_code],
                        check: this.state.selec[index],
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
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                      })
                    }
                    numberOfLines={2}
                    style={Styles.textactivityloca}>
                    {I18n.locale === 'th'
                      ? item.activity_list_location_th
                      : item.activity_list_location_en}
                  </Text>
                   
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row',}}>
                <Image
                      style={{
                        width: ViewScale(16),
                        height: ViewScale(12),
                        top: ViewScale(1),
                        borderWidth: 0.4,
                        borderColor: '#4b4b4b',
                      }}
                      source={{uri: item.img_flag}}
                    />
                

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
            </View>
          }
          subtitle={
            <View style={[Styles.ViewSub10, {marginTop: ViewScale(15), flex: 1}]}>
              <View>
                {this.props.getUser.userDetails.res_result.type != 6 &&
                this.props.getUser.userDetails.res_result.type != 4 &&
                this.props.getUser.userDetails.res_result.type != 3 ? (
                  <TouchableOpacity
                    disabled={item.active_status === false}
                    onPress={() => {
                      if (
                        this.props.getStatus1.isResult
                          .status_confirm_identity.status_code === 0
                      ) {
                        this.props.navigation.navigate('Identity');
                      } else {
                          this.openLinkactivity(item.activity_code)

                      }
                      // alert(item.activity_code)
                      // this.openLink(this.web(item.list_register_url));
                    
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

              <TouchableOpacity
                // สติ
                onPress={() =>
                  this.setState({
                    Show: !this.state.Show,
                    banner: item.activity_list_logo_banner,
                    Stardate: this.FullDate(item.activity_list_start_date),
                    Enddate: this.FullDate(item.activity_list_end_date),
                    title:
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
                    register: item.list_register_url,
                    code: item.activity_code,
                    price:
                      I18n.locale === 'th'
                        ? item.activity_price_th
                        : item.activity_price_en,
                    StatusFa: this.state.selec[item.activity_code],
                    check: this.state.selec[index],
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
                    product_category: item.activity_product_category,
                    daparment_name: item.activity_list_department_name,
                    officer_name: item.activity_list_officer_name,
                    deparment_tel: item.activity_list_department_tel,
                  })
                }
                style={Styles.TouchRead}>
                <Image
                  style={{width: ViewScale(17), height: ViewScale(13)}}
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
                style={{flex: 1, alignItems: 'flex-end',}}>
                <Image
                  resizeMode={'contain'}
                  style={{width: ViewScale(14), height: ViewScale(16)}}
                  source={require('../../image/sharelx.png')}
                />
              </TouchableOpacity>

              {item.status_live === 'C' && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles.ViewSub3,
                      {right: ViewScale(10), justifyContent: 'center'},
                    ]}>
                    <Image
                      style={{width: ViewScale(26), height: ViewScale(15)}}
                      source={require('../../image/liveme.png')}
                    />
                    <View style={{bottom: ViewScale(13), right: ViewScale(22)}}>
                      <Text style={{fontSize: ViewScale(10), color: '#334c6e'}}>
                        {I18n.t('translate_Prepare')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {item.status_live === 'Y' && (
                <TouchableOpacity
                  style={{}}
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles.ViewSub3,
                      {right: ViewScale(10), justifyContent: 'center'},
                    ]}>
                    <Image
                      style={{width: ViewScale(26), height: ViewScale(15)}}
                      source={require('../../image/liveme.png')}
                    />
                    <View style={{bottom: ViewScale(13), right: ViewScale(22)}}>
                      <Text style={{fontSize: ViewScale(10), color: '#ff5e5e'}}>
                        {I18n.t('translate_OnAir')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {item.status_live === 'B' && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles.ViewSub3,
                      {right: ViewScale(10), justifyContent: 'center'},
                    ]}>
                    <Image
                      style={{width: ViewScale(26), height: ViewScale(15)}}
                      source={require('../../image/liveme.png')}
                    />
                    <View style={{bottom: ViewScale(13), right: ViewScale(22)}}>
                      <Text style={{fontSize: ViewScale(10), color: '#b7b7b7'}}>
                        {I18n.t('translate_returnBack')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
    );
  };

  BarCalendar = () => {
    var thiss = this;
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
            nextTitleStyle={{color: '#9b9b9b', fontSize: 20}}
            previousTitleStyle={{color: '#9b9b9b', fontSize: 20}}
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
            if (this.state.ddmmyyy == undefined) {
              let mmyy = Moment(new Date(), 'M YYYY').format('MM YYYY');
              let monthhh = Moment(new Date(), 'M YYYY');
              let mmmyyy = mmyy.split(' ');

              thiss.setState(
                {
                  ...thiss.state,
                  Detail: [],
                  isListEnd: false,
                  loading: false,
                  fetching_from_server: false,
                  monthh: mmmyyy,
                  month: monthhh,
                },
                function() {
                  thiss.offset = 0;
                  thiss.SelecDate(thiss.state.month);
                  thiss._getDetailactivities();
                  thiss.RBSheet.close();
                },
              );
            } else {
              let mmyy = this.state.ddmmyyy.format('M YYYY');
              let mmmyyy = mmyy.split(' ');

              thiss.setState(
                {
                  ...thiss.state,
                  Detail: [],
                  isListEnd: false,
                  loading: false,
                  fetching_from_server: false,
                  monthh: mmmyyy,
                },
                function() {
                  thiss.offset = 0;
                  thiss._getDetailactivities();
                  thiss.RBSheet.close();
                },
              );
            }
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
            let mmyy = Moment(new Date(), 'M YYYY').format('MM YYYY');
            let monthhh = Moment(new Date(), 'M YYYY');
            let mmmyyy = mmyy.split(' ');

            thiss.setState(
              {
                ...thiss.state,
                Detail: [],
                isListEnd: false,
                loading: false,
                fetching_from_server: false,
                monthh: mmmyyy,
                month: monthhh,
              },
              function() {
                thiss.offset = 0;
                thiss.SelecDate(thiss.state.month);
                thiss._getDetailactivities();
                thiss.RBSheet.close();
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

  componentDidMount() {
    this._getDetailactivities();
    this.yearCount();
    this.checkMM();
  }

  render() {
    const {nameth} = this.props.route.params;
    const {nameen} = this.props.route.params;
    const {list} = this.props.route.params;

    const {Detail} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View
          style={{
            marginTop: Platform.OS === 'android' && 90,
          }}
        />
        <Headerstage2
          nameTab={I18n.locale === 'th' ? nameth : nameen}
          nameTab2={list}
        />

        <View style={[Styles.ViewTab11, {zIndex: -1}]}>
          {/* <RBSheet
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
          </RBSheet> */}
          <View
            style={{flexDirection: 'row', alignItems: 'center', zIndex: -1}}>
            <View style={{width: '102%'}}>
              <View style={Styles.ViewSub11}>
                <Image
                  style={Styles.Image}
                  source={require('../../image/searchbluex.png')}
                />

                <TextInput
                  onChangeText={e => {
                    this.SearchSubmit(e);
                  }}
                  placeholderTextColor="#dadada"
                  style={[Styles.TextInputseach1, Styles.flex1]}
                  placeholder={I18n.t('translate_Seach')}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: ViewScale(10),
            backgroundColor: '#FFF',
          }}>
          <Popover
            isVisible={this.state.closePopover}
            onRequestClose={() => {
              this.setState({closePopover: false});
            }}
            popoverStyle={{
              flex: 1,
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,

              elevation: 20,
            }}
            backgroundStyle={{
              backgroundColor: '#2d6dc4',
              opacity: 0.6,
            }}
            from={
              <TouchableOpacity
                onPress={() => {
                  this.setState({closePopover: true});
                }}
                style={{
                  flex: 1,
                  marginHorizontal: ViewScale(10),
                  height: ViewScale(34),
                  backgroundColor: '#2d6dc4',

                  borderRadius: 8,
                  flexDirection:'row'
                }}>
                <View style={{justifyContent:'center',flex:1}}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: ViewScale(21),
                      textAlign:'center'
                     
                    }}>
                    {I18n.t('transalte_period_time')}
                  </Text>
                </View>
                <View style={{justifyContent:'center',flex:0.2}}>
                  <Icon
                    name="chevron-down"
                    size={ViewScale(20)}
                    color="#FFFFFF"
                    style={{}}
                  />
                </View>
              </TouchableOpacity>
            }>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
                height: ViewScale(110),
                borderColor: '#2d6dc4',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // flex: 1,
                }}>
                <View
                  style={{
                    marginTop: 10,
                    // width: '50%',
                    flex: 1,
                    height: ViewScale(34),
                    backgroundColor: '#FFFFFF',
                    // borderColor: '#2d6dc4',
                    // borderWidth: 1,
                    borderRadius: 21.5,
                    marginHorizontal: 10,
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
                      label: I18n.locale === 'th' ? 'ปี' : 'Choose Year',
                      value: I18n.locale === 'th' ? 'ปี' : 'Choose Year',
                    }}
                    value={
                      this.state.valueSelectActivity3dev === undefined
                        ? this.state.setdefulttear
                        : this.state.valueSelectActivity3dev
                    }
                    doneText={I18n.locale === 'th' ? 'เลือก' : 'Done'}
                    onValueChange={(value, index) =>
                      this.setState(
                        {
                          valueSelectActivity3dev: value,
                          valueindexdev: index,

                          // Detail: [],
                          // isListEnd: false,
                          // loading: false,
                          // fetching_from_server: false,
                        },
                        // function() {
                        //   this.offset = 0;
                        //   this._getDetailactivities();
                        // },
                      )
                    }
                    items={this.state.countYear.map(object => ({
                      label: object.YearN.toString(),
                      value: object.YearN.toString(),
                      key: object.YearN.toString(),
                    }))}>
                    <View style={Styles.view1}>
                      <View style={Styles.view2}>
                        {this.state.valueSelectActivity3dev === undefined ? (
                          <Text style={Styles.viewckText}>
                            {'   '}
                            {this.state.setdefulttear}
                          </Text>
                        ) : (
                          <Text style={Styles.viewckText}>
                            {'   '}
                            {this.state.valueSelectActivity3dev}
                          </Text>
                        )}
                      </View>
                      <View style={Styles.view3icon}>
                        <Icon
                          name="chevron-down"
                          size={ViewScale(20)}
                          color="#2d6dc4"
                          style={{}}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </View>
                <View
                  style={{
                    // borderWidth: 1,
                    flex: 1,
                    height: 35,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderRadius: 17,
                    // borderColor: '#2d6dc4',
                  }}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={false}
                    style={{
                      inputAndroidContainer: {
                        width: '100%',
                      },
                      ...pickerSelectStyles2,
                    }}
                    placeholder={{
                      label: I18n.locale === 'th' ? 'เดือน' : 'Choose Mouth',
                      value: I18n.locale === 'th' ? 'เดือน' : 'Choose Mouth',
                    }}
                    onValueChange={(value, index) => {
                      // alert(value + index);
                      this.setState(
                        {
                          valueSelectActivity2dev: value,
                          valueSelectMouthdev: index,
                          // Detail: [],
                          // isListEnd: false,
                          // loading: false,
                          // fetching_from_server: false,
                        },
                        // function() {
                        //   this.offset = 0;
                        //   this._getDetailactivities();
                        // },
                      );
                    }}
                    doneText={I18n.locale === 'th' ? 'เลือก' : 'Done'}
                    value={
                      this.state.valueSelectActivity2dev === undefined
                        ? this.state.valueSelectMMMM
                        : this.state.valueSelectActivity2dev
                    }
                    items={
                      I18n.locale === 'th'
                        ? [
                            {label: 'มกราคม', value: 'มกราคม'},
                            {
                              label: 'กุมภาพันธ์',
                              value: 'กุมภาพันธ์',
                            },
                            {label: 'มีนาคม', value: 'มีนาคม'},
                            {label: 'เมษายน', value: 'เมษายน'},
                            {label: 'พฤษาภาคม', value: 'พฤษาภาคม'},
                            {label: 'มิถุนายน', value: 'มิถุนายน'},
                            {label: 'กรกฎาคม', value: 'กรกฎาคม'},
                            {label: 'สิงหาคม', value: 'สิงหาคม'},
                            {label: 'กันยายน', value: 'กันยายน'},
                            {label: 'ตุลาคม', value: 'ตุลาคม'},
                            {
                              label: 'พฤศจิกายน',
                              value: 'พฤศจิกายน',
                            },
                            {label: 'ธันวาคม', value: 'ธันวาคม'},
                          ]
                        : [
                            {label: 'January', value: 'January'},
                            {label: 'February', value: 'February'},
                            {label: 'Murch', value: 'Murch'},
                            {label: 'April', value: 'April'},
                            {label: 'May', value: 'May'},
                            {label: 'June', value: 'June'},
                            {label: 'July', value: 'July'},
                            {label: 'August', value: 'August'},
                            {
                              label: 'September',
                              value: 'September',
                            },
                            {label: 'October', value: 'October'},
                            {label: 'Noverber', value: 'Noverber'},
                            {label: 'December', value: 'December'},
                          ]
                    }>
                    <View style={Styles.view1}>
                      <View style={Styles.view2}>
                        {this.state.valueSelectActivity2dev === undefined ? (
                          <Text style={Styles.viewckText}>
                            {'   '}
                            {this.state.valueSelectMMMM}
                          </Text>
                        ) : (
                          <Text style={Styles.viewckText}>
                            {'   '}
                            {this.state.valueSelectActivity2dev}
                          </Text>
                        )}
                      </View>
                      <View style={Styles.view3icon}>
                        <Icon
                          name="chevron-down"
                          size={ViewScale(20)}
                          color="#2d6dc4"
                          style={{}}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      closePopover: false,
                      Detail: [],
                      isListEnd: false,
                      loading: false,
                      fetching_from_server: false,
                    },
                    function() {
                      this.offset = 0;
                      this._getDetailactivities();
                    },
                  );
                }}
                style={{
                  backgroundColor: '#2d6dc4',
                  marginHorizontal: ViewScale(10),

                  height: ViewScale(34),

                  borderRadius: 17,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: ViewScale(21),
                    textAlign: 'center',
                  }}>
                  {I18n.t('transalte_Bt_sesrch')}
                </Text>
              </TouchableOpacity>
            </View>
          </Popover>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchData');
            }}
            style={{
              flex: 1,
              marginHorizontal: ViewScale(10),
              height: ViewScale(34),

              borderRadius: 8,
              backgroundColor: '#2d6dc4',
              justifyContent:'center'
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: ViewScale(21),
                textAlign: 'center',
                
              }}>
              {I18n.t('translate_searchAdvanced')}
            </Text>
          </TouchableOpacity>
          {/* </TouchableOpacity> */}
        </View>

        <View style={{backgroundColor: '#2d6dc4', marginTop: 0}}>
          {this.state.checkfilter === true ? (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: ViewScale(2),
              }}>
              <View style={Styles.GrouopViewSearchAD2}>
                <RNPickerSelect
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
                      I18n.locale === 'th' ? 'โปรดระบุเดือน' : 'Choose Mouth',
                    value:
                      I18n.locale === 'th' ? 'โปรดระบุเดือน' : 'Choose Mouth',
                  }}
                  onValueChange={(value, index) =>
                    this.setState(
                      {
                        valueSelectActivity2dev: value,
                        valueSelectMouthdev: index,
                        Detail: [],
                        isListEnd: false,
                        loading: false,
                        fetching_from_server: false,
                      },
                      function() {
                        this.offset = 0;
                        this._getDetailactivities();
                      },
                    )
                  }
                  items={
                    I18n.locale === 'th'
                      ? [
                          {label: 'มกราคม', value: 'มกราคม'},
                          {
                            label: 'กุมภาพันธ์',
                            value: 'กุมภาพันธ์',
                          },
                          {label: 'มีนาคม', value: 'มีนาคม'},
                          {label: 'เมษายน', value: 'เมษายน'},
                          {label: 'พฤษาภาคม', value: 'พฤษาภาคม'},
                          {label: 'มิถุนายน', value: 'มิถุนายน'},
                          {label: 'กรกฎาคม', value: 'กรกฎาคม'},
                          {label: 'สิงหาคม', value: 'สิงหาคม'},
                          {label: 'กันยายน', value: 'กันยายน'},
                          {label: 'ตุลาคม', value: 'ตุลาคม'},
                          {
                            label: 'พฤศจิกายน',
                            value: 'พฤศจิกายน',
                          },
                          {label: 'ธันวาคม', value: 'ธันวาคม'},
                        ]
                      : [
                          {label: 'January', value: 'January'},
                          {label: 'February', value: 'February'},
                          {label: 'Murch', value: 'Murch'},
                          {label: 'April', value: 'April'},
                          {label: 'May', value: 'May'},
                          {label: 'June', value: 'June'},
                          {label: 'July', value: 'July'},
                          {label: 'August', value: 'August'},
                          {
                            label: 'September',
                            value: 'September',
                          },
                          {label: 'October', value: 'October'},
                          {label: 'Noverber', value: 'Noverber'},
                          {label: 'December', value: 'December'},
                        ]
                  }>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '100%',
                    }}>
                    <Image
                      style={Styles.imageArrowGroup}
                      source={require('../../image/arrowtitle.png')}
                    />
                  </View>
                  <View>
                    {this.state.valueSelectActivity2dev === undefined ? (
                      <Text style={[Styles.TextGroup2, {textAlign: 'center'}]}>
                        {I18n.t('translate_choosemouth')}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          Styles.TextGroup2,
                          {textAlign: 'center', color: '#414141'},
                        ]}>
                        {this.state.valueSelectActivity2dev}
                      </Text>
                    )}
                  </View>
                </RNPickerSelect>
              </View>
              <View style={Styles.GrouopViewSearchAD3}>
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
                    label: I18n.locale === 'th' ? 'โปรดระบุปี' : 'Choose Year',
                    value: I18n.locale === 'th' ? 'โปรดระบุปี' : 'Choose Year',
                  }}
                  onValueChange={(value, index) =>
                    this.setState(
                      {
                        valueSelectActivity3dev: value,
                        valueindexdev: index,

                        // Detail: [],
                        // isListEnd: false,
                        // loading: false,
                        // fetching_from_server: false,
                      },
                      // function() {
                      //   this.offset = 0;
                      //   this._getDetailactivities();
                      // },
                    )
                  }
                  items={
                    I18n.locale === 'th'
                      ? [
                          {label: '2559', value: 2559},
                          {label: '2560', value: 2560},
                          {label: '2561', value: 2561},
                          {label: '2562', value: 2562},
                          {label: '2563', value: 2563},
                          {label: '2564', value: 2564},
                          {label: '2565', value: 2565},
                          {label: '2566', value: 2566},
                          {label: '2567', value: 2567},
                          {label: '2568', value: 2568},
                          {label: '2569', value: 2569},
                          {label: '2570', value: 2570},
                          {label: '2571', value: 2571},
                          {label: '2572', value: 2572},
                          {label: '2573', value: 2573},
                          {label: '2574', value: 2574},
                          {label: '2575', value: 2575},
                          {label: '2576', value: 2576},
                        ]
                      : [
                          {label: '2016', value: '2016'},
                          {label: '2017', value: '2017'},
                          {label: '2018', value: '2018'},
                          {label: '2019', value: '2019'},
                          {label: '2020', value: '2020'},
                          {label: '2021', value: '2021'},
                          {label: '2022', value: '2022'},
                          {label: '2023', value: '2023'},
                          {label: '2024', value: '2024'},
                          {label: '2025', value: '2025'},
                          {label: '2026', value: '2026'},
                          {label: '2027', value: '2027'},
                          {label: '2028', value: '2028'},
                          {label: '2029', value: '2029'},
                          {label: '2030', value: '2030'},
                          {label: '2031', value: '2031'},
                          {label: '2032', value: '2032'},
                          {label: '2033', value: '2033'},
                        ]
                  }>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '100%',
                    }}>
                    <Image
                      style={Styles.imageArrowGroup}
                      source={require('../../image/arrowtitle.png')}
                    />
                  </View>
                  <View>
                    {this.state.valueSelectActivity3dev === undefined ? (
                      <Text style={[Styles.TextGroup2, {textAlign: 'center'}]}>
                        {I18n.t('translate_chooseyear')}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          Styles.TextGroup2,
                          {textAlign: 'center', color: '#414141'},
                        ]}>
                        {this.state.valueSelectActivity3dev}
                      </Text>
                    )}
                  </View>
                </RNPickerSelect>
              </View>
            </View>
          ) : null}
        </View>

        <View style={[Styles.flex1, {backgroundColor: '#FFF'}]}>
          <FlatList
            onEndReached={() => this._getDetailactivities()}
            ListFooterComponent={this.renderFooter2.bind(this)}
            onEndReachedThreshold={0.5}
            contentContainerStyle={Styles.flastListContainer}
            style={Styles.flastListtab1}
            data={Detail}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={this.ListDataViewAct}
          />
        </View>


        {this.state.Show === true && (
          <Overlay
            backdropStyle={Styles.ViewSubOver}
            isVisible={this.state.Show}
            onBackdropPress={() => this.setState({Show: false})}>
            <View style={[Styles.OverlayHight]}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity onPress={() => this.setState({Show: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    {this.state.banner != '' ? (
                      <FastImage
                        resizeMode={'contain'}
                        style={{width: '100%', height: ViewScale(216)}}
                        source={{uri: this.state.banner}}
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
                  <View style={{margin: ViewScale(10)}}>
                    <Text style={Styles.popupTextTitle}>
                      {this.state.title} 

                      
                    </Text>
                    <Text style={Styles.opoupTextData1}>
                      {this.state.Stardate} - {this.state.Enddate}
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
                          onPress={() => {
                            this.openLink(this.state.location);
                          }}
                          style={{
                            backgroundColor: '#2d6dc4',
                            borderRadius: 11,
                          }}>
                          <Text style={Styles.popupTextMap}>{I18n.t('transalte_map')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      
                      <Image
                        style={{width: ViewScale(7), height: ViewScale(11)}}
                        source={require('../../image/maker2.png')}
                      />
                      <Text numberOfLines={1} style={Styles.popupTextloca}>
                        {'  '}
                        {this.state.location}
                      </Text>
                    </View>

                    <View style={{marginTop: ViewScale(10)}}>
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

                    <View style={{width: '30%'}}>
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
                            <View style={{bottom: (13), right: (33)}}>
                              <Text style={{fontSize: (12), color: '#334c6e'}}>
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
                            <View style={{bottom: (13), right: (31)}}>
                              <Text style={{fontSize: (12), color: '#ff5e5e'}}>
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
                            <View style={{bottom: (13), right: (31)}}>
                              <Text style={{fontSize: (12), color: '#b7b7b7'}}>
                                {I18n.t('translate_Backward')}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={{margin: (10)}}>
                      <Image
                        style={{width: (334), height: (1)}}
                        source={require('../../image/line6.png')}
                      />
                    </View>
                    {this.state.ckhide === false ? (
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text
                          onPress={() => {
                            this.setState({ckhide: true});
                          }}
                          style={Styles.popupTexthideText}>
                          {I18n.t('transalte_show_details')}
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-down"
                          size={ViewScale(20)}
                        />
                      </View>
                    ) : (
                      <>
                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t('translate_DataShow')} :
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {' '}
                          {this.state.Stardate} - {this.state.Enddate}
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
                          {I18n.t('translate_DetailBas')} :
                        </Text>
                        <Text style={Styles.popupTextdetail}>
                          {I18n.t('translate_Main')} :
                        </Text>

                        <View style={{width: ViewScale(319), height: null}}>
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
                          <Icon3
                            color="#2d6dc4"
                            name="keyboard-arrow-up"
                            size={20}
                          />
                        </View>
                      </>
                    )}

                    <View style={{margin: ViewScale(10)}}>
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
                          style={Styles.popuptextnumber}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      </View>
                    </View>

                    <View style={Styles.ViewSub18}>
                      {this.state.StatusFa === false ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.selecitem({
                              item: this.state.item1,
                            });
                            this.setState({StatusFa: true});
                          }}
                          style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: ViewScale(20), height: ViewScale(20)}}
                            source={require('../../image/shoping.png')}
                          />
                          <Text style={Styles.popupTextdelect}>
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
                          <Text style={Styles.popupTextdelect}>
                            {'  '}
                            {I18n.t('translate_Delete_basket')}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {this.props.getUser.userDetails.res_result.type != 6 ? (
                        <View>
                          <View>
                            {this.props.getUser.userDetails.res_result.type !=
                              6 &&
                            this.props.getUser.userDetails.res_result.type !=
                              4 &&
                            this.props.getUser.userDetails.res_result.type !=
                              4 ? (
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


                                    this.openLinkactivity(this.state.code)

                                    //registerja
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

                                    //     StatusFa: this.state.selec[
                                    //       this.state.code
                                    //     ],

                                    //     linklive: this.state.linklive,
                                    //     live: this.state.live,
                                    //     product_category: this.state
                                    //       .product_category,
                                    //     daparment_name: this.state
                                    //       .daparment_name,
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
                      ) : (
                        <View />
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => {

                        this.onSharedetail(this.state.title,this.state.register)


                      }}
                      style={{alignSelf: 'flex-end', marginTop: ViewScale(-25)}}>
                      <Image
                        resizeMode={'contain'}
                        style={{width: ViewScale(14), height: ViewScale(16)}}
                        source={require('../../image/sharelx.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}
        {/* gvv */}
        {this.state.open_selectyaer === true && (
          <Overlay
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.5 : 0.8,
            }}
            overlayStyle={[
              Styles.themeoverlay,
              {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
              },
            ]}
            isVisible={this.state.open_selectyaer}
            onBackdropPress={() => this.setState({open_selectyaer: false})}>
            <View style={[Styles.OverlayHight1, {marginHorizontal: ViewScale(30)}]}>
              <View style={Styles.OverlayView2}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 2,
                  }}>
                  <View
                    style={{
                      marginTop: ViewScale(10),
                      // width: '50%',
                      flex: 1,
                      height: 34,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 21.5,
                      marginHorizontal: ViewScale(10),
                      // flexDirection: 'row',
                      marginBottom: ViewScale(4),
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
                          I18n.locale === 'th' ? 'โปรดระบุปี' : 'Choose Year',
                        value:
                          I18n.locale === 'th' ? 'โปรดระบุปี' : 'Choose Year',
                      }}
                      onValueChange={(value, index) =>
                        this.setState(
                          {
                            valueSelectActivity3dev: value,
                            valueindexdev: index,

                            // Detail: [],
                            // isListEnd: false,
                            // loading: false,
                            // fetching_from_server: false,
                          },
                          // function() {
                          //   this.offset = 0;
                          //   this._getDetailactivities();
                          // },
                        )
                      }
                      items={
                        I18n.locale === 'th'
                          ? [
                              {label: '2559', value: 2559},
                              {label: '2560', value: 2560},
                              {label: '2561', value: 2561},
                              {label: '2562', value: 2562},
                              {label: '2563', value: 2563},
                              {label: '2564', value: 2564},
                              {label: '2565', value: 2565},
                              {label: '2566', value: 2566},
                              {label: '2567', value: 2567},
                              {label: '2568', value: 2568},
                              {label: '2569', value: 2569},
                              {label: '2570', value: 2570},
                              {label: '2571', value: 2571},
                              {label: '2572', value: 2572},
                              {label: '2573', value: 2573},
                              {label: '2574', value: 2574},
                              {label: '2575', value: 2575},
                              {label: '2576', value: 2576},
                            ]
                          : [
                              {label: '2016', value: '2016'},
                              {label: '2017', value: '2017'},
                              {label: '2018', value: '2018'},
                              {label: '2019', value: '2019'},
                              {label: '2020', value: '2020'},
                              {label: '2021', value: '2021'},
                              {label: '2022', value: '2022'},
                              {label: '2023', value: '2023'},
                              {label: '2024', value: '2024'},
                              {label: '2025', value: '2025'},
                              {label: '2026', value: '2026'},
                              {label: '2027', value: '2027'},
                              {label: '2028', value: '2028'},
                              {label: '2029', value: '2029'},
                              {label: '2030', value: '2030'},
                              {label: '2031', value: '2031'},
                              {label: '2032', value: '2032'},
                              {label: '2033', value: '2033'},
                            ]
                      }>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          width: '100%',
                        }}>
                        <Image
                          style={Styles.imageArrowGroup}
                          source={require('../../image/arrowtitle.png')}
                        />
                      </View>
                      <View>
                        {this.state.valueSelectActivity3dev === undefined ? (
                          <Text
                            style={[Styles.TextGroup2, {textAlign: 'center'}]}>
                            {I18n.t('translate_chooseyear')}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              Styles.TextGroup2,
                              {textAlign: 'center', color: '#999999'},
                            ]}>
                            {this.state.valueSelectActivity3dev}
                          </Text>
                        )}
                      </View>
                    </RNPickerSelect>
                  </View>
                  <View
                    style={{
                      marginTop: ViewScale(10),
                      // width: '50%',
                      flex: 1,
                      height: ViewScale(34),
                      backgroundColor: '#FFFFFF',
                      borderColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 21.5,
                      marginHorizontal: ViewScale(10),
                      // flexDirection: 'row',
                      marginBottom: ViewScale(4),
                    }}>
                    <RNPickerSelect
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
                            ? 'โปรดระบุเดือน'
                            : 'Choose Mouth',
                        value:
                          I18n.locale === 'th'
                            ? 'โปรดระบุเดือน'
                            : 'Choose Mouth',
                      }}
                      onValueChange={(value, index) =>
                        this.setState(
                          {
                            valueSelectActivity2dev: value,
                            valueSelectMouthdev: index,
                            // Detail: [],
                            // isListEnd: false,
                            // loading: false,
                            // fetching_from_server: false,
                          },
                          // function() {
                          //   this.offset = 0;
                          //   this._getDetailactivities();
                          // },
                        )
                      }
                      items={
                        I18n.locale === 'th'
                          ? [
                              {label: 'มกราคม', value: 'มกราคม'},
                              {
                                label: 'กุมภาพันธ์',
                                value: 'กุมภาพันธ์',
                              },
                              {label: 'มีนาคม', value: 'มีนาคม'},
                              {label: 'เมษายน', value: 'เมษายน'},
                              {label: 'พฤษาภาคม', value: 'พฤษาภาคม'},
                              {label: 'มิถุนายน', value: 'มิถุนายน'},
                              {label: 'กรกฎาคม', value: 'กรกฎาคม'},
                              {label: 'สิงหาคม', value: 'สิงหาคม'},
                              {label: 'กันยายน', value: 'กันยายน'},
                              {label: 'ตุลาคม', value: 'ตุลาคม'},
                              {
                                label: 'พฤศจิกายน',
                                value: 'พฤศจิกายน',
                              },
                              {label: 'ธันวาคม', value: 'ธันวาคม'},
                            ]
                          : [
                              {label: 'January', value: 'January'},
                              {label: 'February', value: 'February'},
                              {label: 'Murch', value: 'Murch'},
                              {label: 'April', value: 'April'},
                              {label: 'May', value: 'May'},
                              {label: 'June', value: 'June'},
                              {label: 'July', value: 'July'},
                              {label: 'August', value: 'August'},
                              {
                                label: 'September',
                                value: 'September',
                              },
                              {label: 'October', value: 'October'},
                              {label: 'Noverber', value: 'Noverber'},
                              {label: 'December', value: 'December'},
                            ]
                      }>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          width: '100%',
                        }}>
                        <Image
                          style={Styles.imageArrowGroup}
                          source={require('../../image/arrowtitle.png')}
                        />
                      </View>
                      <View>
                        {this.state.valueSelectActivity2dev === undefined ? (
                          <Text
                            style={[Styles.TextGroup2, {textAlign: 'center'}]}>
                            {I18n.t('translate_choosemouth')}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              Styles.TextGroup2,
                              {textAlign: 'center', color: '#999999'},
                            ]}>
                            {this.state.valueSelectActivity2dev}
                          </Text>
                        )}
                      </View>
                    </RNPickerSelect>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  top: ViewScale(15),
                  borderRadius: 17,
                  height: ViewScale(34),
                  justifyContent: 'center',
                  marginHorizontal: ViewScale(10),
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState(
                      {
                        Detail: [],
                        isListEnd: false,
                        loading: false,
                        fetching_from_server: false,
                      },
                      function() {
                        this.offset = 0;
                        this._getDetailactivities();
                      },
                    )
                  }
                  style={{
                    alignSelf: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: ViewScale(24),
                    }}>
                    {I18n.t('transalte_Bt_sesrch')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  Number: state.dataReducer.Number,
  getStatus1: state.dataReducer.getStatus,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewTrade);
