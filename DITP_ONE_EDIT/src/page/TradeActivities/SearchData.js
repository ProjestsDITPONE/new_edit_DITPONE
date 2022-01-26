import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Picker,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Share,
} from 'react-native';
import Styles from 'rn-sliding-view/styles';
import Styles2 from './Styles';
import Headers from '../../components/Headers';
import RNPickerSelect from 'react-native-picker-select';
import Headerstage from '../../components/Headerstage';
import I18n from '../../utils/I18n';
import {
  ListItem,
  Overlay,
  CheckBox,
} from '../../lib_edit/react-native-elements';

//API
import {
  GetCountryGroup,
  GetActivityGroup,
  getAllactivities,
  getDataSearchAdvaned,
  GetSearchproduct,
  GetSearchproductneed,
} from '../../actions/data.actions';

import {SendBasket, DeleteBasket} from '../../actions/auth.actions';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';

import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import MonthSelectorCalendar from 'react-native-month-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {object} from 'yup';
import FastImage from 'react-native-fast-image';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get('window');
const {height, width} = Dimensions.get('window');
var aspectRatio = '40%';
if (height / width > 1.6) {
  //iphone
  aspectRatio = '75%';
}
var aspectRatio1 = '40%';
if (height / width > 1.6) {
  //iphone
  aspectRatio1 = '60%';
}
var datat = new Date();
var y = datat.getFullYear();
var date = new Date();
var mm = date.getMonth();
var YYDF1 = mm + 1;
class SearchData extends Component {
  constructor(props) {
    AsyncStorage.getItem('language', (err, result) => {
      if (result == 'TH') {
        this.setState({language: 'TH'});
      } else {
        this.setState({language: 'EN'});
      }
    });
    super(props);
    this.state = {
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      selec: null,
      valueSelectActivity1: null,
      valueSelectActivity2: null,
      valueSelectActivity3: null,
      valueSelectActivity4: null,
      textSelectActivity1: null,
      textSelectActivity2: null,
      textSelectActivity3: null,
      textSelectActivity4: null,

      language: '',
      GetcounrtryValue: [],
      GetactivityValue: [],
      AllActivity: [],
      Recommend: [],
      CheckRecom: [],
      clickCK: false,
      datadate: y,
      loading: false,
      fetching_from_server: false,
      countYear: [],
      SizebarModel: 500,
      Show: false,
      Selec: [],
      Selec2: [],
      basket: false,
      checkfilter1: true,
      product_category: [],
      ckhide: false,
      valueSelectMMMM: null,
      setdefulttear: null,
      datagetproduct: [],
      dataproductNeed: [],
      ckonline: false,
      // searchOnline: null,
      MMDF: '',
    };
    this.offset = 0;
  }
  componentDidMount() {
    this._getCounttrySelect();
    this._getActivitySelect();
    this._getAllActivitySearchAdvaned();
    this.yearCount();
    this.checkMM();
    this._GetSearchProduct();
    this._GetSearchNeed();
  }

  _getAllActivitySearchAdvaned = async value => {
    console.log(this.state.valueSelectmouth +"<=>"+this.state.valueSelectActivity1year +"searchOnline"+this.state.searchOnline );
    if (!this.state.fetching_from_server) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          const num = this.offset;
          var date = new Date();
          console.log(this.state.valueSelectActivity1);

          this.response = await this.props.dispatch(
            getDataSearchAdvaned({
              result: {
                offset: num * 1,
                text_search:
                  this.state.textsearch === undefined
                    ? ''
                    : this.state.textsearch,
                day: '',
                // this.state.valueSelectDaydev === null
                //   ? ''
                //   : this.state.valueSelectDaydev,
                month:
                  this.state.valueSelectmouth === undefined ||
                  this.state.valueSelectmouth === 0 ||
                  this.state.valueSelectmouth === 'เดือน'
                    ? ''
                    : this.state.valueSelectmouth ,

                year:
                  this.state.valueSelectActivity1year === undefined ||
                  this.state.valueSelectActivity1year === 'ปี'
                    ? ''
                    : I18n.locale === 'th'
                    ? this.state.valueSelectActivity1year - 543
                    : this.state.valueSelectActivity1year,

                country:
                  this.state.valueSelectActivity4 === null
                    ? ''
                    : this.state.valueSelectActivity4,

                activity_type:
                  this.state.valueSelectActivity1 === undefined
                    ? ''
                    : this.state.valueSelectActivity1,

                activity_group: '',

                activity_category:
                  this.state.activity_product_category_id === undefined
                    ? ''
                    : this.state.activity_product_category_id,

                online:
                  this.state.searchOnline === undefined ||  this.state.searchOnline === null
                    ? ''
                    : this.state.searchOnline,
              },

              token: this.props.authData.token,
            }),
          );
          // console.log(this.props.authData.token);
          if (this.response.res_code === '00') {
            console.log('Response55555');
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
        } catch (error) {
          console.log(error);
        }
      });
    }
  };
  //     });
  //   }
  // };
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
        const setdefulttear1 = start_year + 543;
        this.setState({setdefulttear: setdefulttear1.toString()});
      } else {
        const setdefulttear1 = start_year;
        this.setState({setdefulttear: setdefulttear1.toString()});
      }
      // console.log('ฆฆฆฆฆฆ')
      // console.log(this.state.setdefulttear )

      // console.log('AZAZAZAZ');
      // console.log(this.state.countYear);
    }
  }
  onShareDatali = async (itemname, itemurl) => {
    try {
      const result = await Share.share({
        message: itemname,
        url: itemurl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert('สำเสร็จ');
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
  onShare = async value => {
    console.log('vakkkk', value);
    try {
      const result = await Share.share({
        message: value.activity_list_topic_th,
        url: value.list_register_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert('สำเสร็จ');
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

  _GetSearchProduct = async value => {
    try {
      const payload = this.props.authData.token;
      const response = await this.props.dispatch(
        GetSearchproduct({
          result: {},
          type:1,
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
  _GetSearchNeed = async value => {
    try {
      
      const payload = this.props.authData.token;
      const response = await this.props.dispatch(
        GetSearchproductneed({
          result: {},
          
          token: payload,
          type:1,
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

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === 'th' ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }

  checkMM() {
    const mm = date.getMonth();
    const DFMM = mm + 1;

    this.setState({DFMM: DFMM});
    // alert(DFMM)

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
  setTitle = value => {
    console.log('5555');
  };

  renderFooter() {
    return (
      <View
        style={[
          Styles2.footer,
          {marginTop: this.state.Recommend.length == 0 ? height * 0.15 : 0},
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

  web(item) {
    var uri = item.split('/');

    return uri[10];
  }
  async openLink(item) {
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${item}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
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
      console.log('Type' + this.props.getUser.userDetails.res_result.type);

      if (values.Status == 1) {
        if (response.res_code === '00') {
          this.setState({
            Toppic: [],
            isListEnd: false,
            loading: false,
            fetching_from_server: false,
          });
          // this._getToppic();
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
          // this._getToppic();
        }
      }
    } catch (error) {}
  };

  ListActivity = ({item, index}) => {
    return (
      <View style={{backgroundColor: '#f7f9fc'}}>
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
                      starretgis: this.FullDate(item.activity_list_start_date),
                      product_category: item.activity_product_category,
                      daparment_name: item.activity_list_department_name,
                      officer_name: item.activity_list_officer_name,
                      deparment_tel: item.activity_list_department_tel,
                      url: item.list_register_url,
                      StarDx: this.Star_Date(item.activity_list_start_date),
                      EndDx: item.activity_list_end_date,
                      imgx: item.activity_list_logo_thumb,
                    })
                  }>
                  <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 60, height: 55, borderRadius: 15}}
                  />

                  <Text
                    style={{
                      fontSize: 15,
                      color: '#6f819a',
                      marginTop: 8,
                      textAlign: 'center',
                    }}>
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
                          item.activity_list_start_date,
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
                  {this.state.CheckRecom.length > 0 ? (
                    <CheckBox
                      checkedIcon={
                        <Image
                          style={{width: 25, height: 25}}
                          source={require('../../image/PickerMarket.png')}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          style={{width: 25, height: 25}}
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
                          style={{width: 25, height: 25}}
                          source={require('../../image/PickerMarket.png')}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          style={{width: 25, height: 25}}
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
              <View style={{flex: 1, marginBottom: 10}}>
                <View style={Styles2.ViewImgList}>
                  {item.activity_list_location_th === 'ออนไลน์' ? (
                    <Image
                      style={{width: 13, height: 13, top: 0}}
                      source={require('../../image/WWW.png')}
                    />
                  ) : (
                    <Image
                      style={{width: 9, height: 12, top: 0}}
                      source={require('../../image/makerlocation.png')}
                    />
                  )}
                  <Text
                    numberOfLines={2}
                    style={{color: '#8b9bb0', fontSize: 16}}>
                    {' '}
                    {item.activity_list_location_th}
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
                      width: 16,
                      height: 12,
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
            <View style={[Styles2.ViewSub10, {marginTop: 15, flex: 1}]}>
              <View>
                {this.props.getUser.userDetails.res_result.type != 6 &&
                this.props.getUser.userDetails.res_result.type != 4 &&
                this.props.getUser.userDetails.res_result.type != 3 ? (
                  <TouchableOpacity
                    disabled={item.active_status === false}
                    onPress={() => {
                      // this.openLink(this.web(item.list_register_url));
                    }}
                    style={
                      item.active_status === true
                        ? Styles2.TouchSub2
                        : Styles2.TouchSub5
                    }>
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#FFFFFF',
                        fontFamily: 'PSL Kittithada Pro',
                      }}>
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
                    starretgis: this.FullDate(item.activity_list_start_date),
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
                style={Styles2.TouchRead}>
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
                  style={{width: 17.3, height: 22}}
                  source={require('../../image/sharelx.png')}
                />
              </TouchableOpacity>

              {item.status_live === 'C' && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles2.ViewSub3,
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
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles2.ViewSub3,
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
                  onPress={() => Linking.openURL(item.activity_list_live_url)}>
                  <View
                    style={[
                      Styles2.ViewSub3,
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
      </View>
    );
  };

  //

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
              months:
                this.state.language === 'TH'
                  ? [
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
                    ]
                  : [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
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
                ...this.state,
                isListEnd: false,
                loading: false,
                fetching_from_server: false,
              },
              function() {
                this.offset = 0;
                // this._getAllActivitySearchAdvaned();
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

  render() {
    // console.log('FFFFFFFFfffffff');
    // console.log(this.state.dataproductNeed);
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_HearSearch')} />
        {/* <View style={{alignItems: 'center'}} /> */}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 20}
          style={{flex: 1, zIndex: -1}}>
          <ScrollView style={{zIndex: -1}}>
            <View style={{width: '100%', zIndex: -1}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: -10,
                    flex: 1,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '100%',
                      height: 35,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#999999',
                      borderWidth: 1,
                      borderRadius: 21.5,

                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={Styles2.Image}
                      source={require('../../image/searchbluex.png')}
                    />

                    <TextInput
                      onChangeText={e => {
                        // this.SearchSubmit(e);
                        this.setState({textsearch: e});
                      }}
                      placeholderTextColor="#999999"
                      style={[Styles2.TextInputseach1]}
                      placeholder={I18n.t('translate_Seach')}
                      value={this.state.textsearch}
                    />
                  </View>
                  <View
                    style={[
                      {
                        width: '15%',
                        height: 34,
                        backgroundColor: '#FFFFFF',
                        // borderColor: this.state.month === undefined ? '#cacaca' : '#2d6dc4',
                        borderWidth: 1,
                        borderRadius: 21.5,
                        marginLeft: 5,
                        backgroundColor: '#FFF',
                        borderColor: '#FFF',
                        justifyContent: 'center',
                      },
                    ]}
                  />
                </View>

                {this.state.checkfilter1 === true ? (
                  <View>
                    <View style={{top: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          marginHorizontal: 10,
                        }}>
                        <View
                          style={{
                            // width: '50%',
                            flex: 1,
                            height: 34,
                            backgroundColor: '#FFFFFF',
                            // borderColor: '#4b4b4b',
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
                            disabled={true}
                            placeholder={{}}
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
                              style={[Styles2.view1, {borderColor: '#4b4b4b'}]}>
                              <View style={Styles2.view2}>
                                {this.state.datagetproductname_th ===
                                undefined ? (
                                  <Text
                                    style={[
                                      Styles2.viewckText,
                                      {color: '#4b4b4b'},
                                    ]}>
                                    {I18n.t('translate_PRODUCTS')}
                                  </Text>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      Styles2.viewckText,
                                      {color: '#4b4b4b'},
                                    ]}>
                                    {'   '}
                                    {this.state.datagetproductname_th}
                                  </Text>
                                )}
                              </View>
                              <View style={[Styles2.view3icon, {flex: 0.3}]}>
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
                            height: 34,
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
                              label:
                                I18n.locale === 'th' ? 'สถานที่ทั้งหมด' : 'All',
                              value:
                                I18n.locale === 'th' ? 'สถานที่ทั้งหมด' : 'All',
                            }}
                            doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                            onValueChange={(value, index) =>
                              this.setState(
                                {
                                  valueSelectActivity4:
                                    index === 0
                                      ? 0
                                      : this.state.GetcounrtryValue[index - 1]
                                          .country_code,
                                  textSelectActivity4:
                                    index === 0
                                      ? 'สถานที่ทั้งหมด'
                                      : I18n.locale === 'th'
                                      ? this.state.GetcounrtryValue[index - 1]
                                          .name_th
                                      : this.state.GetcounrtryValue[index - 1]
                                          .name_en,
                                },
                                function() {
                                  // this.offset = 0;
                                  // this._getAllActivitySearchAdvaned();
                                },
                              )
                            }
                            items={this.state.GetcounrtryValue.map(object => ({
                              label:
                                I18n.locale === 'th'
                                  ? object.name_th
                                  : object.name_en,
                              value: object.country_code,
                              key: object.country_code,
                            }))}>
                            <View style={Styles2.view1}>
                              <View style={Styles2.view2}>
                                {this.state.textSelectActivity4 === null ? (
                                  <Text style={Styles2.viewckText}>
                                    {'   '}สถานที่ทั้งหมด
                                  </Text>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={Styles2.viewckText}>
                                    {'   '}
                                    {this.state.textSelectActivity4}
                                  </Text>
                                )}
                              </View>
                              <View style={[Styles2.view3icon, {flex: 0.3}]}>
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
                              });
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: '#2d6dc4',
                              height: 34,
                              flex: 1,
                              borderRadius: 17,
                              marginHorizontal: 3,
                              backgroundColor: '#FFFF',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#2d6dc4',
                              }}>
                              Online
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                ckonline: false,
                                searchOnline: null,
                              });
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: '#2d6dc4',
                              height: 34,
                              flex: 1,
                              borderRadius: 17,
                              marginHorizontal: 3,
                              backgroundColor: '#2d6dc4',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#FFFFFF',
                              }}>
                              Online
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          marginBottom: 2,
                        }}>
                        <View
                          style={{
                            marginTop: 10,
                            // width: '50%',
                            flex: 1,
                            height: 34,
                            backgroundColor: '#FFFFFF',
                            // borderColor: '#2d6dc4',
                            // borderWidth: 1,
                            borderRadius: 21.5,
                            marginHorizontal: 4,
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
                            doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                            onValueChange={(value, index) =>
                              this.setState({
                                valueSelectActivity3dev: value,
                                valueindexdev: index,
                              })
                            }
                            items={this.state.dataproductNeed.map(object => ({
                              label: object.Need.toString(),
                              value: object.Need.toString(),
                              key: object.Need.toString(),
                            }))}>
                            <View style={Styles2.view1}>
                              <View style={Styles2.view2}>
                                {this.state.valueSelectActivity3dev ===
                                undefined ? (
                                  <Text style={Styles2.viewckText}>
                                    {'   '}ความต้องการ
                                  </Text>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={Styles2.viewckText}>
                                    {'   '}
                                    {this.state.valueSelectActivity3dev}
                                  </Text>
                                )}
                              </View>

                              <View style={[Styles2.view3icon, {flex: 0.2}]}>
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
                            marginTop: 10,
                            // width: '50%',
                            flex: 1,
                            height: 34,
                            backgroundColor: '#FFFFFF',
                            // borderColor: '#2d6dc4',
                            // borderWidth: 1,
                            borderRadius: 21.5,
                            marginHorizontal: 4,
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
                                  ? 'ประเภทกิจกรรมทั้งหมด'
                                  : 'All',
                              value:
                                I18n.locale === 'th'
                                  ? 'ประเภทกิจกรรมทั้งหมด'
                                  : 'All',
                            }}
                            doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                            onValueChange={(value, index) =>
                              // {console.log("index",value)},
                              this.setState(
                                {
                                  valueSelectActivity1:
                                    index === 0
                                      ? 0
                                      : this.state.GetactivityValue[index - 1]
                                          .activity_type_code,

                                  textSelectActivity1:
                                    index === 0
                                      ? 'ประเภทกิจกรรมทั้งหมด'
                                      : I18n.locale === 'th'
                                      ? this.state.GetactivityValue[index - 1]
                                          .name_th
                                      : this.state.GetactivityValue[index - 1]
                                          .name_en,

                                  // Recommend: [],
                                  // isListEnd: false,
                                  // loading: false,
                                  // fetching_from_server: false,
                                },
                                function() {
                                  // this.offset = 0;
                                  // this._getAllActivitySearchAdvaned();
                                },
                              )
                            }
                            items={this.state.GetactivityValue.map(
                              (object, index) => ({
                                label:
                                  I18n.locale === 'th'
                                    ? object.name_th
                                    : object.name_en,
                                value: object.activity_type_code,
                                key: object.activity_type_code,
                              }),
                            )}>
                            <View style={Styles2.view1}>
                              <View style={Styles2.view2}>
                                {this.state.textSelectActivity1 === null ? (
                                  <Text style={Styles2.viewckText}>
                                    {'   '}
                                    {I18n.t('translate_ActivityType')}
                                  </Text>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={Styles2.viewckText}>
                                    {'   '}
                                    {this.state.textSelectActivity1}
                                  </Text>
                                )}
                              </View>

                              <View style={[Styles2.view3icon, {flex: 0.2}]}>
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

                          marginHorizontal: 10,
                          flex: 1,
                        }}>
                        <View
                          style={{
                            marginTop: 4,
                            height: 34,
                            backgroundColor: '#FFFFFF',
                            borderColor: '#cacaca',
                            // borderWidth: 1,
                            borderRadius: 21.5,
                            // borderColor: '#2d6dc4',
                            // flexDirection: 'row',
                            marginBottom: 4,
                            justifyContent: 'center',
                            flex: 1,
                            marginHorizontal: 4,
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
                              label: I18n.t('translate_chooseyear'),
                              value: I18n.t('translate_chooseyear'),
                            }}
                            value={
                              this.state.valueSelectActivity1year === undefined
                                ? this.state.setdefulttear
                                : this.state.valueSelectActivity1year
                            }
                            doneText={I18n.locale === 'th' ? 'เลือก' : 'Done'}
                            onValueChange={(value, index) =>
                              this.setState(
                                {
                                  valueSelectActivity1year: value,
                                  valueSelectyear: index,
                                },
                                function() {
                                  // this.offset = 0;
                                  // this._getAllActivitySearchAdvaned();
                                },
                              )
                            }
                            items={this.state.countYear.map(object => ({
                              label: object.YearN.toString(),
                              value: object.YearN.toString(),
                              key: object.YearN.toString(),
                            }))}>
                            <View style={Styles2.view1}>
                              <View style={Styles2.view2}>
                                {this.state.valueSelectActivity1year ===
                                undefined ? (
                                  <Text style={Styles2.viewckText}>
                                    {/* {I18n.t('translate_chooseyear')} */}

                                    {'   '}
                                    {this.state.setdefulttear}
                                  </Text>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={Styles2.viewckText}>
                                    {'   '}
                                    {this.state.valueSelectActivity1year}
                                  </Text>
                                )}
                              </View>

                              <View style={[Styles2.view3icon, {flex: 0.2}]}>
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
                            marginTop: 4,

                            height: 34,
                            backgroundColor: '#FFFFFF',
                            borderColor: '#cacaca',
                            // borderWidth: 1,
                            borderRadius: 21.5,
                            // borderColor: '#2d6dc4',
                            // flexDirection: 'row',
                            marginBottom: 4,
                            justifyContent: 'center',

                            flex: 1,
                            marginHorizontal: 4,
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
                              label: I18n.t('translate_choosemouth'),
                              value: I18n.t('translate_choosemouth'),
                            }}
                            onValueChange={(value, index) =>
                              this.setState(
                                {
                                  valueSelectActivity1mouth: value,
                                  valueSelectmouth: index,

                                  // Recommend: [],
                                  // isListEnd: false,
                                  // loading: false,
                                  // fetching_from_server: false,
                                },
                                function() {
                                  // this.offset = 0;
                                  // this._getAllActivitySearchAdvaned();
                                },
                              )
                            }
                            value={
                              this.state.valueSelectActivity1mouth === undefined
                                ? this.state.valueSelectMMMM
                                : this.state.valueSelectActivity1mouth
                            }
                            doneText={I18n.locale === 'th' ? 'เลือก' : 'Done'}
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
                                    {label: 'พฤศจิกายน', value: 'พฤศจิกายน'},
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
                                    {label: 'September', value: 'September'},
                                    {label: 'October', value: 'October'},
                                    {label: 'Noverber', value: 'Noverber'},
                                    {label: 'December', value: 'December'},
                                  ]
                            }>
                            <View style={Styles2.view1}>
                              <View style={Styles2.view2}>
                                {this.state.valueSelectActivity1mouth ===
                                undefined ? (
                                  <Text style={Styles2.viewckText}>
                                    {/* {I18n.t('translate_choosemouth')} */}
                                    {'   '}
                                    {this.state.valueSelectMMMM}
                                  </Text>
                                ) : (
                                  <Text style={Styles2.viewckText}>
                                    {'   '}
                                    {this.state.valueSelectActivity1mouth}
                                  </Text>
                                )}
                              </View>

                              <View style={[Styles2.view3icon, {flex: 0.2}]}>
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
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 4,
                        marginBottom: 2,
                        // borderWidth:1,
                        marginHorizontal: 10,
                        flex: 1,
                      }}>
                      <View style={{flex: 1, marginHorizontal: 4}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState(
                              {
                                Recommend: [],
                                isListEnd: false,
                                loading: false,
                                fetching_from_server: false,
                                MMDF: YYDF1,
                              },
                              function() {
                                this.offset = 0;
                                this._getAllActivitySearchAdvaned();
                              },
                            );
                          }}
                          style={{
                            backgroundColor: '#2d6dc4',

                            marginTop: 13,
                            height: 34,
                            flex: 1,

                            borderRadius: 17,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 20,
                              textAlign: 'center',
                            }}>
                            ค้นหา
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: 1, marginHorizontal: 4}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState(
                              {
                                Recommend: [],
                                isListEnd: false,
                                loading: false,
                                fetching_from_server: false,
                                MMDF: YYDF1,
                                textsearch: undefined,

                                valueSelectmouth: 'เดือน',
                                valueSelectActivity1mouth:undefined,

                                valueSelectMMMM:'เดือน',

                                valueSelectActivity1year: 'ปี',

                                valueSelectActivity4: undefined,

                                valueSelectActivity1: undefined,

                                activity_product_category_id: undefined,

                                searchOnline: '',
                                ckonline: false,
                                textSelectActivity1:null
                              },
                              function() {
                                this.offset = 0;
                                this._getAllActivitySearchAdvaned();
                              },
                            );
                          }}
                          style={{
                            backgroundColor: '#f96145',

                            marginTop: 13,
                            height: 34,
                            flex: 1,
                            borderRadius: 17,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 20,
                              textAlign: 'center',
                            }}>
                            ล้างทั้งหมด
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
                <View style={{alignItems: 'center', padding: 8, top: -12}} />
              </View>
              <ScrollView>
                <FlatList
                  // onEndReached={() => this._getAllActivitySearchAdvaned()}
                  scrollEnabled={true}
                  contentContainerStyle={Styles2.flastListContainer}
                  style={Styles2.flastListtab1}
                  extraData={this.state}
                  data={this.state.Recommend}
                  onEndReachedThreshold={0.5}
                  ItemSeparatorComponent={() => (
                    <View style={Styles2.separator} />
                  )}
                  ListFooterComponent={this.renderFooter.bind(this)}
                  renderItem={this.ListActivity}
                  keyExtractor={(item, index) => item.activity_code}
                />
              </ScrollView>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {this.state.Show === true && (
          <Overlay
            backdropStyle={{
              backgroundColor:
                Platform.OS === 'android' ? '#2d6dc4' : '#2d6dc4',
              opacity: Platform.OS === 'android' ? 0.8 : 0.8,
            }}
            onBackdropPress={() => this.setState({Show: false})}
            isVisible>
            <View style={Styles2.OverlayHight}>
              <View style={[Styles2.OverlayView1, {marginTop: -10}]}>
                <TouchableOpacity onPress={() => this.setState({Show: false})}>
                  <Image
                    style={Styles2.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={[Styles2.OverlayView2]}>
                  <View style={Styles2.OverlayView3}>
                    {this.state.img != '' ? (
                      <Image
                        resizeMode={'contain'}
                        style={{width: '100%', height: 216}}
                        source={{uri: this.state.img}}
                      />
                    ) : (
                      <Image
                        resizeMode={'center'}
                        style={{width: '100%', height: 216}}
                        source={require('../../image/banerDrive.png')}
                      />
                    )}
                  </View>
                  <View style={{margin: 10}}>
                    <Text
                      style={{
                        fontSize: 25,
                        color: '#163c70',
                        fontFamily: 'Kittithada Bold 75',
                      }}>
                      {this.state.name}
                    </Text>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {this.state.StarD} - {this.state.EndD}
                    </Text>
                    <Text style={{fontSize: 18, color: '#3a3a3a'}}>
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
                          style={{width: 18, height: 13, top: 4}}
                          source={{uri: this.state.contry_img_flag}}
                        />
                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
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
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#FFFFFF',
                              fontSize: 18,
                            }}>
                            แผนที่
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
                        style={{width: 7, height: 11}}
                        source={require('../../image/maker2.png')}
                      />
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {'  '}
                        {this.state.location}
                      </Text>
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {this.state.price}
                      </Text>
                    </View>
                    <View style={{marginTop: 0}}>
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_Num')} : {this.state.partic}{' '}
                        {I18n.t('translate_case')}
                      </Text>
                    </View>

                    {this.state.live === 'C' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={[Styles2.ViewSub3]}>
                          <ImageBackground
                            style={Styles2.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles2.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 33}}>
                            <Text style={{fontSize: 12, color: '#334c6e'}}>
                              {I18n.t('translate_Prepare')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'Y' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles2.ViewSub3}>
                          <ImageBackground
                            style={Styles2.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles2.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: 12, color: '#ff5e5e'}}>
                              {I18n.t('translate_OnAir')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === 'B' && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}>
                        <View style={Styles2.ViewSub3}>
                          <ImageBackground
                            style={Styles2.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles2.TextSub5}>
                              {I18n.t('translate_LIVE')}
                            </Text>
                          </ImageBackground>
                          <View style={{bottom: 13, right: 31}}>
                            <Text style={{fontSize: 12, color: '#b7b7b7'}}>
                              {I18n.t('translate_returnBack')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={{margin: 10}}>
                      <Image
                        style={{width: 334, height: 1}}
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
                            fontSize: 18,
                            color: '#2d6dc4',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                          }}>
                          แสดงรายละเอียด
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-down"
                          size={20}
                        />
                      </View>
                    ) : (
                      <>
                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataShow')} :
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.StarD} - {this.state.EndD}{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataRegister')} :{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.starretgis} - {this.state.endregis}{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_place')} :
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.location}{' '}
                        </Text>

                        {/* thking */}

                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_group_product')} :
                        </Text>

                        {/* {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                                {' '}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })} */}
                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_Readmore')} :
                        </Text>
                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {I18n.t('translate_Main')}
                        </Text>
                        <View style={{width: 321, height: null}}>
                          <Text style={{fontSize: 18, color: '#7d7d7d'}}>
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
                              fontSize: 18,
                              color: '#2d6dc4',
                              textAlign: 'center',
                              textDecorationLine: 'underline',
                            }}>
                            ซ่อนรายละเอียด
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
                        style={{width: 334, height: 1}}
                        source={require('../../image/line6.png')}
                      />
                    </View>

                    <View style={{flex: 1}}>
                      <Text style={{color: '#3a3a3a', fontSize: 18}}>
                        หน่วยงานอบรมรับผิดชอบ : {this.state.daparment_name}
                      </Text>
                      <Text style={{color: '#3a3a3a', fontSize: 18}}>
                        เจ้าหน้าที่โครงการ : {this.state.officer_name}
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
                                this.setState({Show: false});
                              }}
                              style={{flexDirection: 'row'}}>
                              <Image
                                style={{width: 20, height: 20}}
                                source={require('../../image/shoping.png')}
                              />

                              <Text style={{fontSize: 20, color: '#163c70'}}>
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

                                this.setState({Show: false});
                              }}
                              style={{flexDirection: 'row'}}>
                              <Image
                                style={{width: 20, height: 20}}
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
                                style={{width: 20, height: 20}}
                                source={require('../../image/shoping.png')}
                              />

                              <Text style={{fontSize: 16, color: '#163c70'}}>
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
                                style={{width: 20, height: 20}}
                                source={require('../../image/PickerMarket.png')}
                              />

                              <Text style={{fontSize: 16, color: '#163c70'}}>
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
                              // this.openLink(this.state.register);

                              if (
                                this.props.getStatus1.isResult
                                  .status_confirm_identity.status_code === 0
                              ) {
                                this.props.navigation.navigate('Identity');
                              } else {
                                this.props.navigation.navigate(
                                  'TradeActivitiesRegister',
                                  {
                                    img: this.state.imgx,
                                    imglogo: this.state.imglogo,
                                    StarD_1: this.state.StarDx,
                                    EndD_1: this.state.EndDx,
                                    name: this.state.name,
                                    imglogo: this.state.img,
                                    location: this.state.location,

                                    detail: this.state.detail,
                                    partic: this.state.partic,
                                    register: this.state.register,
                                    code: this.state.code,
                                    price: this.state.price,

                                    StatusFa: this.state.Selec[this.state.code],

                                    linklive: this.state.linklive,
                                    live: this.state.live,
                                    product_category: this.state
                                      .product_category,
                                    daparment_name: this.state.daparment_name,
                                    officer_name: this.state.officer_name,
                                    deparment_tel: this.state.deparment_tel,
                                  },
                                );
                              }
                            }}
                            style={
                              this.state.Close
                                ? Styles2.TouchSub1
                                : Styles2.TouchSub6
                            }>
                            <Text
                              style={{
                                fontSize: 19,
                                color: '#FFFFFF',
                                fontFamily: 'Kittithada Bold 75',
                              }}>
                              {this.state.Close
                                ? I18n.t('translate_Apply_activities')
                                : '  ปิดรับสมัครกิจกรรม  '}
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
                          style={{width: 17, height: 22}}
                          source={require('../../image/sharelx.png')}
                        />
                      </TouchableOpacity>
                    </View>
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
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2d6dc4',
                    height: 40,
                    width: width * 0.7,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 22,
                      color: '#FFFFFF',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {'ประเทศไทย'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center', marginTop: 15}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#568ae0',
                    height: 40,
                    width: width * 0.7,
                    borderRadius: 20,
                    justifyContent: 'center',
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
                    placeholder={
                      {
                        // label: I18n.t('translate_chooseyear'),
                        // value: I18n.t('translate_chooseyear'),
                      }
                    }
                    onValueChange={(value, index) =>
                      this.setState(
                        {
                          valueSelectActivity4: this.state.GetcounrtryValue[
                            index
                          ].country_code,
                          textSelectActivity4:
                            index === 0
                              ? I18n.t('translate_Country')
                              : I18n.locale === 'th'
                              ? this.state.GetcounrtryValue[index].name_th
                              : this.state.GetcounrtryValue[index].name_en,
                        },
                        function() {
                          // this.offset = 0;
                          // this._getAllActivitySearchAdvaned();
                        },
                      )
                    }
                    items={this.state.GetcounrtryValue.map(object => ({
                      label:
                        I18n.locale === 'th' ? object.name_th : object.name_en,
                      value: object.country_code,
                      key: object.country_code,
                    }))}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',

                          alignContent: 'center',
                        }}>
                        {this.state.textSelectActivity4 === null ? (
                          <Text
                            style={{
                              fontSize: 22,
                              color: '#FFFFFF',
                              fontFamily: 'PSL Kittithada Pro',
                            }}>
                            {'ต่างประเทศ'}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 22,
                              color: '#FFFFFF',
                              fontFamily: 'PSL Kittithada Pro',
                            }}>
                            {this.state.textSelectActivity4}
                          </Text>
                        )}
                      </View>
                    </View>
                  </RNPickerSelect>
                </TouchableOpacity>
              </View>
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
const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  Number: state.globalReducer.Number,
  getStatus1: state.dataReducer.getStatus,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchData);
