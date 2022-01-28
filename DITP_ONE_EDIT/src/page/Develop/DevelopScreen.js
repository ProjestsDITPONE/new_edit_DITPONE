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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Styles from './Styles';
import Headers from '../../components/Headers';
import Headerstage3 from '../../components/Headerstage3';
import {CheckBox, Overlay, ListItem} from 'react-native-elements';
import {
  getToppic,
  getDatarecommend,
  getAllDevelop,
  CheckRegisterActivity,
  RegisterActivity
} from '../../actions/data.actions';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';
import {SendBasket, DeleteBasket} from '../../actions/auth.actions';
import I18n from '../../utils/I18n';
import Popover from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import MonthSelectorCalendar from 'react-native-month-selector';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SearchBar} from 'react-native-elements';
import {color} from 'react-native-reanimated';
import CalendarPicker from 'react-native-calendar-picker';
import HeaderText from '../../components/HeaderText';
import HeaderTopPickdev from '../../components/HeaderTopPickdev';
import ViewDevelop from './ViewDevelop';

//new
import {ModalProvider} from '@cawfree/react-native-modal-provider';
// import MaterialMenuModal from '@cawfree/react-native-modal-provider/RNModalProvider/src/components/MaterialMenuModal';
import SimplerDatePicker from '@cawfree/react-native-simpler-date-picker';
var date = new Date();
var mm = date.getMonth() ;
var YYDF1 = mm+1;
class DevelopScreen extends React.Component {
  constructor(props) {
    AsyncStorage.getItem('language', (err, result) => {
      if (result == 'TH') {
        this.setState({language: 'TH'});
      } else {
        this.setState({language: 'EN'});
      }
    });
    const getDate = new Date();
    super(props);
    this.state = {
      setdefulttear: null,
      countYear: [],
      endregis: null,
      starretgis: null,
      contry_img_flag: null,
      contry_TH: null,
      contry_EN: null,
      selecStartDate: null,
      date: null,
      check: false,
      SizebarModel: 550,
      PagebarModel: 1,
      disablemonth: getDate.getMonth(),
      disableday: getDate.getDate(),
      disableyear: getDate.getFullYear(),
      dataMarketData: [],
      selecStartDate: null,
      Selec: [],
      Selec2: [],
      intext: 0,
      Toppic: [],
      Show: false,
      Recommend: [],
      ToppicData: 5,
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      isListEnd1: false,
      loading1: false,
      fetching_from_server1: false,
      toppickData: [],
      tab: 0,
      AllDevelop: [],
      count: '',
      // month: Moment(new Date(), 'MM YYYY'),
      ddmmyyy: Moment(new Date(), 'DD MM YYYY'),
      // month1: Moment(new Date(), 'MM YYYY'),
      ddmmyyy1: Moment(new Date(), 'DD MM YYYY'),
      Page: 1,
      search: '',
      ckclick: true,
      showdate: '',
      checkRNPickerstate: false,
      checkfilter: false,
      checkfilter1: false,
      checkClose: false,
      product_category: [],
      ckhide: false,
      daparment_name: null,
      officer_name: null,
      deparment_tel: null,
      closePopover: false,
      valueSelectMMMM:'',
      YYDF : null,
      IDcard:
      this.props.getUser.userDetails.res_result.member != undefined
        ? this.props.getUser.userDetails.res_result.naturalId
        : this.props.getUser.userDetails.res_result.naturalId,
      
        SSOID:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.ssoid
          : this.props.getUser.userDetails.res_result.ssoid,
        

      CheckStatus: []

    };
    this.offset = 0;
    this.offset1 = 0;
    this.arrayholder = [];
    this.arrayholder2 = [];
    this.arrayholder3 = [];
  }
  componentDidMount() {
    this._getToppic();
    this._getRecommed();
    this._getAllDevelop();
    this.yearCount();
    this.checkMM()
  }
  updateSearch = search => {
    this.setState({search});
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
                basket_type: '2',
              },
            ],
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
    } catch (error) {}
  };
  yearCount() {
    var start_year = new Date().getFullYear();
    for (var yearDef = start_year+1; yearDef > start_year - 6; yearDef--) {
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
        this.state.setdefulttear = start_year + 543;
      } else {
        this.state.setdefulttear = start_year;
      }
      console.log('ฆฆฆฆฆฆ');
      console.log(this.state.setdefulttear);
    }
  }

  web(item) {
    var uri = item.split('/');
    console.log(uri[10]);
    return uri[10];
  }

  async openLink(item) {
    console.log(item);
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${item}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    console.log('OK', url);

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
          // alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  _getRecommed = async values => {
    console.log(
      '_getRecommedxx',

      this.state.valueSelectMouthindex,
      this.state.valueSelectYYYY,
      this.props.getUser.userDetails.res_result.type,
    );
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          const num = this.offset;
          var tokenActivity = '';
          if (this.props.getUser.userDetails.res_result.type == 6) {
            tokenActivity = this.props.authData.token.res_result.token;
          } else {
            tokenActivity = this.props.authData.token;
          }
          
          console.log('YEAR', this.state.valueSelectYYYY, date.getFullYear());
          this.response = await this.props.dispatch(
            getDatarecommend({
              list: 2,
              result: {
                // offset: 0,
                offset: '0',
                limit:"40",
                // day:
                //   this.state.valueSelectDay === undefined
                //     ? ''
                //     : this.state.valueSelectDay,
                month:
                  this.state.valueSelectMouthindex === undefined
                    ? this.state.YYDF
                    : this.state.valueSelectMouthindex+1,
                year:
                  this.state.valueSelectYYYY === undefined ||
                  this.state.valueindex === 0
                    ? date.getFullYear()
                    : this.state.language === 'TH'
                    ? this.state.valueSelectYYYY - 543
                    : this.state.valueSelectYYYY,
                text_search: values === undefined ? '' : values,
              },
              token: tokenActivity,
              type: this.props.getUser.userDetails.res_result.type,
            }),
          );
          if (this.response.res_code === '00') {
            // console.log('showDATA', this.response.result);

            if (this.response.result.length > 0) {
              this.offset = this.offset + 1;
              console.log('State', this.state.Recommend);
              this.setState({
                Recommend: [...this.state.Recommend, ...this.response.result],
                fetching_from_server: false,
                CheckRecom: [...this.state.Recommend, ...this.response.result],
              });

              // console.log(this.state.Recommend)

              this.arrayholder = this.state.Recommend;

              this.state.Recommend.map(data => {
                this.state.selec[data.activity_code] = data.status_basket;
              });

              this.state.Recommend.map(dataa => {});

              console.log('EEE');
              // console.log(this.response.result.Object.values(this.arrayholder).map(data=>{
              //   data.name_th
              // }))

              // console.log(this.state.Recommend.activity_product_category.name_th)

              // console.log('State', this.state.Recommend);

              // this.arrayholder = this.state.Recommend;
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
              this.arrayholder = this.state.Recommend;
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
  // _SelectDatacommend = e => {
  //   console.log('MEthod', e);

  //   this._getRecommed(e);
  // };
  SearchSubmit = e => {
    // console.log('seach', e, e === '' ? 'false' : 'true');
    // {
    //   e === '' || e === null
    //     ? this.setState({checkClose: false})
    //     : this.setState({checkClose: true});
    // }
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log('Newdata', newData);
    this.setState({Recommend: newData});
    //searchText
    // this.setState(
    //   {
    //     Recommend: [],
    //     isListEnd: false,
    //     loading: false,
    //     fetching_from_server: false,
    //   },
    //   function() {
    //     this.offset = 0;
    //     this._getRecommed(e);
    //   },
    // );
  };

  SearchSubmitT = e => {
    console.log('seach', e, this.arrayholder);
    const newData = this.arrayholder2.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({toppickData: newData});
  };

  SearchSubmitDev = e => {
    const newData = this.arrayholder3.filter(item => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({AllDevelop: newData});
  };

  _getToppic = async values => {
    try {
      const response = await this.props.dispatch(
        getToppic({list: 2, token: this.props.authData.token}),
      );

      if (response.res_code === '00') {
        this.setState({Toppic: response.result});
        this._DataToppick();
      }
    } catch (error) {}
  };

  _getAllDevelop = async values => {
  //  alert(
  //     '_getAllDevelop',
  //     this.state.valueSelectMouthdev,
  //     this.state.valueSelectActivity3dev,
  //   );
    try {
      if (!this.state.fetching_from_server1 && !this.state.isListEnd1) {
        this.setState({fetching_from_server1: true}, async () => {
          try {
            const num = this.offset;
            this.response = await this.props.dispatch(
              getAllDevelop({
                results: {

                  offset: num * 10,
                  month:
                    this.state.valueSelectMouthdev === undefined
                      ? this.state.YYDF
                      : this.state.valueSelectMouthdev,
                  year:
                    this.state.valueSelectActivity3dev === undefined ||
                    this.state.valueindexdev === 0
                      ? ''
                      : this.state.language === 'TH'
                      ? this.state.valueSelectActivity3dev - 543
                      : this.state.valueSelectActivity3dev,
                      product:""
                  
                },
                token: this.props.authData.token,
              }),
            );

            if (this.response.res_code === '00') {
              if (this.response.result.length > 0) {
                this.offset = this.offset + 1;
                this.setState({
                  AllDevelop: [
                    ...this.state.AllDevelop,
                    ...this.response.result,
                  ],
                  fetching_from_server1: false,
                });
                this.arrayholder3 = this.state.AllDevelop;
                this.state.AllDevelop.map(data => {
                  this.state.Selec[data.activity_code] = data.status_basket;
                });
                console.log(this.response.result.length);
              } else {
                this.setState({
                  fetching_from_server1: false,
                  isListEnd1: true,
                });
              }
            } else {
              this.setState({
                fetching_from_server1: false,
                isListEnd1: true,
              });
            }
          } catch (error) {}
        });
      }
    } catch (error) {}
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
            basket_type: '2',
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
    } catch (error) {}
  };

  _insertRegister = async values =>{
    try{
    // alert('กล้วย',values.activity_code,values.member_cid , values.type)
      const {authData} = this.props;
      const payload = authData.token;
      var tokenActivity = '';
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await  this.props.dispatch(
        RegisterActivity ({
          result:{
            activity_code:values.activity_code,
            member_cid:values.member_cid,
            type:values.type
          },
          token:tokenActivity,
        }),
      );
      if(response.res_code === '00'){
        // alert(response.result.pid)
        this.props.navigation.navigate(
          'DevlopRegister',
          {
            img: values.img,
            StarD_1: values.StarD_1,
            EndD_1: values.EndD_1,
            StarD: values.StarD,
            EndD: values.EndD,
            name:values.name,
            location:values.location,
            detail: values.detail,
            partic: values.partic,
            register: values.register,
            code: values.code,
            price:values.price,
            StatusFa: values.StatusFa,
            index: values.index,
            item1: values.item,
            linklive: values.linklive,
            live: values.live,
            Close: values.Close,
            contry_TH:values.contry_TH,
            contry_img_flag: values.contry_img_flag,
            endregis: values.endregis,
            starretgis:values.starretgis,
            product_category:values.product_category,
            daparment_name:values.daparment_name,
            officer_name:values.officer_name,
            deparment_tel:values.deparment_tel,
            pid:response.result.pid,
            activity_code:values.activity_code,
            member_cid:values.member_cid,
            type:values.type,
            case:1,
            imgtype:values.imgtype
              
          },
        );

      }

      


       

    }catch (error){}
  }

 _CheckRegister = async values =>{
  // alert('formTypeActivity'+values.formTypeActivity)
   try{
    // const token = authData.token;
    // this._CheckRegister({activity_code: item.activity_code,member_cid:this.state.IDcard})
   
    // alert(values.member_cid)
    // const {authData} = this.props;
    const {authData} = this.props;
    const payload = authData.token;
    var tokenActivity = '';
    if (this.props.getUser.userDetails.res_result.type == 6) {
      tokenActivity = this.props.authData.token.res_result.token;
    } else {
      tokenActivity = this.props.authData.token;
    }
    
    const response = await  this.props.dispatch(
      CheckRegisterActivity ({
        result:{
          activity_code:values.activity_code,
          member_cid: this.state.IDcard,
          type:values.type,
          formTypeActivity:values.formTypeActivity
        },
        token:tokenActivity,
      }),
    );

    if (response.res_code === '00') {
      console.log("Register !!!")

      this.setState({CheckStatus:response.result.status})

      console.log("response.result.pidnew1")

      console.log(response.result.pid)
      console.log(values.activity_code)
      
      // alert(response.result.message)

      if(response.result.pid != 0 &&  response.result.status === false){

        // alert('case 1')
        alert(response.result.message)
        

        this.props.navigation.navigate(
            'DevlopRegister',
            {
              img: values.img,
              StarD_1: values.StarD_1,
              EndD_1: values.EndD_1,
              StarD: values.StarD,
              EndD: values.EndD,
              name:values.name,
              location:values.location,
              detail: values.detail,
              partic: values.partic,
              register: values.register,
              code: values.code,
              price:values.price,
              StatusFa: values.StatusFa,
              index: values.index,
              item1: values.item,
              linklive: values.linklive,
              live: values.live,
              Close: values.Close,
              contry_TH:values.contry_TH,
              contry_img_flag: values.contry_img_flag,
              endregis: values.endregis,
              starretgis:values.starretgis,
              product_category:values.product_category,
              daparment_name:values.daparment_name,
              officer_name:values.officer_name,
              deparment_tel:values.deparment_tel,
              pid:response.result.pid,
              activity_code:values.activity_code,
              member_cid:values.member_cid,
              type:values.type,
              case:1,
              formTypeActivity:values.formTypeActivity,
                
            },
          );


      }
      else if (response.result.pid === 0 &&  response.result.status === true){
        // alert(response.result.message)

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
              onPress: () => 
              this._insertRegister(
                values
              ),
              // console.log('OK Pressed'),
              
                
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        // this.props.navigation.navigate(
        //   'DevlopRegister',
        //   {
        //     img: values.img,
        //     StarD_1: values.StarD_1,
        //     EndD_1: values.EndD_1,
        //     StarD: values.StarD,
        //     EndD: values.EndD,
        //     name:values.name,
        //     location:values.location,
        //     detail: values.detail,
        //     partic: values.partic,
        //     register: values.register,
        //     code: values.code,
        //     price:values.price,
        //     StatusFa: values.StatusFa,
        //     index: values.index,
        //     item1: values.item,
        //     linklive: values.linklive,
        //     live: values.live,
        //     Close: values.Close,
        //     contry_TH:values.contry_TH,
        //     contry_img_flag: values.contry_img_flag,
        //     endregis: values.endregis,
        //     starretgis:values.starretgis,
        //     product_category:values.product_category,
        //     daparment_name:values.daparment_name,
        //     officer_name:values.officer_name,
        //     deparment_tel:values.deparment_tel,
        //     pid:response.result.pid,
        //     activity_code:values.activity_code,
        //     member_cid:values.member_cid,
        //     type:values.type,
        //     case:1
              
        //   },
        // );
      }
      else {
        alert(response.result.message)

      }

    }
   }
   catch (error) {
    
    console.log(error)


   }

 }


  renderFooter() {
    return (
      <View style={Styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View>
            {this.state.Recommend.length == 0 ? (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{I18n.t('translate_Nodata')}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
  renderFooter1() {
    return (
      <View style={Styles.footer}>
        {this.state.fetching_from_server1 ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View style={{alignItems: 'center'}}>
            {this.state.AllDevelop.length == 0 ? (
              <Text style={{fontSize: 20}}>{I18n.t('translate_Nodata')}</Text>
            ) : null}
          </View>
        )}
      </View>
    );
  }

  End_DateR(Viewdate) {
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
    date = ' - ' + dd + ' ' + this.CheckMonth(mm);
    return date.toString();
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
  checkMM (){
    var mm = date.getMonth() ;
    var DFMM = mm +1;
  
    if(DFMM === 1){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'มกราคม'})
      : this.setState({valueSelectMMMM:'January'})
    }else if(DFMM === 2){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'กุมภาพันธ์'})
      : this.setState({valueSelectMMMM:'February'})
    }else if(DFMM === 3){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'มีนาคม'})
      : this.setState({valueSelectMMMM:'Murch'})
    }else if(DFMM === 4){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'เมษายน'})
      : this.setState({valueSelectMMMM:'April'})
    }else if(DFMM === 5){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'พฤษาภาคม'})
      : this.setState({valueSelectMMMM:'May'})
    }else if(DFMM === 6){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'มิถุนายน'})
      : this.setState({valueSelectMMMM:'June'})
    }else if(DFMM === 7){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'กรกฎาคม'})
      : this.setState({valueSelectMMMM:'July'})
    }else if(DFMM === 8){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'สิงหาคม'})
      : this.setState({valueSelectMMMM:'August'})
    }else if(DFMM === 9){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'กันยายน'})
      : this.setState({valueSelectMMMM:'September'})
    }else if(DFMM === 10){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'ตุลาคม'})
      : this.setState({valueSelectMMMM:'October'})
    }else if(DFMM === 11){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'พฤศจิกายน'})
      : this.setState({valueSelectMMMM:'Noverber'})
    }else if(DFMM === 12){
      I18n.locale ==='th'? 
      this.setState({valueSelectMMMM:'ธันวาคม'})
      : this.setState({valueSelectMMMM:'December'})
    }
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

  TopPick = ({item, index}) => {
    return (
      // <ImageBackground
      //   resizeMode="contain"
      //   imageStyle={{width: 303, height: 201}}
      //   source={require('../../image/backgroundTop.png')}
      //   style={{
      //     width: 255,
      //     height: 195,
      //   }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: 260,
          height: 140,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#3986ee',
          flex: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({Show: !this.state.Show});
            this.setState({
              img: item.activity_list_logo_banner,
              StarD: this.FullDate(item.activity_list_start_date),
              EndD: this.FullDate(item.activity_list_end_date),
              name: item.activity_list_topic_th,
              location: item.activity_list_location_th,
              detail: item.activity_list_desc_th,
              partic: item.max_of_participate,
              register: item.list_register_url,
              code: item.activity_code,
              price: item.activity_price_th,
              StatusFa: this.state.Selec[item.activity_code],
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
              product_category: item.activity_product_category,
              daparment_name: item.activity_list_department_name,
              officer_name: item.activity_list_officer_name,
              deparment_tel: item.activity_list_department_tel,
            });
          }}>
          <View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 5,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../image/startoppick.png')}
                />
                <View style={{flex: 0.9, flexDirection: 'row-reverse'}}>
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
                {/* <View style={{marginTop: 5}}> */}
                <Text style={Styles.TextSub3}>
                  {I18n.t('translate_Numberexposure')} {item.max_of_participate}{' '}
                  {I18n.t('translate_Case')}
                </Text>
                {/* </View> */}
              </View>

              <View
                style={{
                  left: 0,
                  width: '80%',
                  bottom: 5,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Image source={{uri: item.img_flag}} style={Styles.ImgSub3} />
                  <Text numberOfLines={1} style={Styles.TextSub3}>
                    {'  '}
                    {I18n.locale === 'th'
                      ? item.list_country_name_th
                      : item.list_country_name_en}
                  </Text>
                </View>
                {item.status_live === 'C' && (
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      flex: 0.2,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(item.activity_list_live_url)
                      }>
                      <View style={[Styles.ViewSub3]}>
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
                  </View>
                )}
                {item.status_live === 'Y' && (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(item.activity_list_live_url)
                    }>
                    <View style={Styles.ViewSub3}>
                      <ImageBackground
                        style={Styles.ImgBackgroungSub1}
                        source={require('../../image/newlive.png')}
                      />
                      <View style={{bottom: 13, right: 25}}>
                        <Text style={{fontSize: 12, color: '#ff5e5e'}}>
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
                    <View style={Styles.ViewSub3}>
                      <ImageBackground
                        style={Styles.ImgBackgroungSub1}
                        source={require('../../image/newlive.png')}
                      />
                      <View style={{bottom: 13, right: 31}}>
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
        </TouchableOpacity>
      </View>
      // </ImageBackground>
    );
  };

  Selecitem = ({index, item}) => {
    let {Selec, DataTopPick} = this.state;
    Selec[item.activity_code] = !Selec[item.activity_code];
    this.setState({Selec: Selec});
    if (Selec[item.activity_code] === true) {
      return this._SendBasket({code: item.activity_code});
    } else {
      return this._DeleteBasket({code: item.activity_code});
    }
  };

  BarCalendar = () => {
    const minDate = new Date();
    const dd = minDate.getDate();
    const mm = minDate.getMonth() + 1;
    const yyyy = minDate.getFullYear();
    if (this.state.Page == 1) {
      return (
        <View style={Styles.container}>
          <View style={{flex: 1}}>
            <View style={{width: 420}}>
              <CalendarPicker
                selectYearTitle={
                  I18n.locale === 'th' ? 'เลือกปี ' : 'Select Year '
                }
                selectMonthTitle={
                  I18n.locale === 'th' ? 'เลือกเดือน ' : 'Select Month in '
                }
                weekdays={
                  I18n.locale === 'th'
                    ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
                    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                }
                months={
                  I18n.locale === 'th'
                    ? [
                        'มกราคม',
                        'กุมภาพันธ์',
                        'มีนาคม',
                        'เมษายน',
                        'พฤษภาคม',
                        'มิถุนายน',
                        'กรกฎาคม',
                        'สิงหาคม',
                        'กันยายน',
                        'ตุลาคม',
                        'พฤศจิกายน',
                        'ธันวาคม',
                      ]
                    : [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                      ]
                }
                prevIcon={<Icon1 name="left" size={20} />}
                nextIcon={<Icon1 name="right" size={20} />}
                minDate={Moment('01-01-2019', 'DD-MM-YYYY')}
                previousTitle="<"
                previousTitleStyle={{color: '#9b9b9b', fontSize: 25}}
                nextTitle=">"
                nextTitleStyle={{color: '#9b9b9b', fontSize: 25}}
                selectedDayColor={'#2d6dc4'}
                selectedDayTextColor={'#fff'}
                selectedStartDate={this.state.selecStartDate}
                textStyle={{color: '#000', fontSize: 20}}
                onDateChange={value => {
                  setTimeout(() => {
                    this.setState({
                      selecStartDate: value,
                      ckclick: false,
                      showdate: value.format('DD/MM/YYYY'),
                    });
                  }, 200);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            disabled={this.state.ckclick}
            style={Styles.acceptDateButton}
            // style={this.state.ckclick=== true ? (Styles.clearDateButton ):(Styles.acceptDateButton)}
            onPress={async () => {
              this.RBSheet.close();

              this.state.selecStartDate.format('YYYY-MM-DD');

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
              // }, 300);
            }}>
            <Text style={Styles.acceptDateText}>
              {I18n.t('translate_Accept')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.clearDateButton}
            onPress={async () => {
              this.RBSheet.close();
              console.log(this.state.ddmmyyy);
              let mmyy = this.state.ddmmyyy.format('M YYYY');
              let mmmyyy = mmyy.split(' ');

              this.setState({ddmmyyy: mmmyyy});
              this.setState(
                {
                  ...this.state,
                  showdate: null,
                  selecStartDate: null,
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
              // }, 300);
            }}>
            <Text style={Styles.acceptDateText}>
              {I18n.t('translate_Clean')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.cancelDateButton}
            onPress={() => this.RBSheet.close()}>
            <Text style={Styles.cancelDateText}>
              {I18n.t('translate_Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.Page == 2) {
      return (
        <View style={Styles.container}>
          <View style={{flex: 1}}>
            <View style={{width: 420}}>
              <MonthSelectorCalendar
                maxDate={Moment('01-01-3000', 'DD-MM-YYYY')}
                minDate={Moment('01-01-2000', 'DD-MM-YYYY')}
                prevIcon={<Icon1 name="left" size={20} />}
                nextIcon={<Icon1 name="right" size={20} />}
                localeLanguage="en"
                yearTextStyle={{color: '#000', fontSize: 20}}
                selectedMonthTextStyle={{color: '#FFF', fontSize: 20}}
                monthTextStyle={{color: '#000', fontSize: 20}}
                selectedBackgroundColor={'#2d6dc4'}
                selectedDate={this.state.month1}
                onMonthTapped={date => {
                  this.setState({month1: date, ddmmyyy1: date});
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
          </View>

          <TouchableOpacity
            style={Styles.acceptDateButton}
            onPress={async () => {
              this.RBSheet.close();

              // setTimeout(() => {
              let mmyy1 = this.state.ddmmyyy1.format('M YYYY');
              let mmmyyy1 = mmyy1.split(' ');
              // console.log('ANUCHIT*********Fuck Accept',mmyy1)
              this.setState({ddmmyyy1: mmmyyy1});
              this.setState(
                {
                  ...this.state,
                  AllDevelop: [],
                  isListEnd1: false,
                  loading1: false,
                  fetching_from_server1: false,
                },
                function() {
                  this.offset = 0;
                  this._getAllDevelop();
                },
              );
              // }, 300);
            }}>
            <Text style={Styles.acceptDateText}>
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
              console.log('ANUCHIT*********' + this.state.ddmmyyy1);
              // setTimeout(() => {
              this.setState({ddmmyyy1: undefined, month1: undefined});
              this.setState(
                {
                  ...this.state,
                  AllDevelop: [],
                  isListEnd1: false,
                  loading1: false,
                  fetching_from_server1: false,
                },
                function() {
                  this.offset = 0;
                  this._getAllDevelop();
                },
              );
              // }, 300);
            }}>
            <Text style={Styles.acceptDateText}>
              {I18n.t('translate_Clean')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.cancelDateButton}
            onPress={() => this.RBSheet.close()}>
            <Text style={Styles.cancelDateText}>
              {I18n.t('translate_Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  Listre = ({item, index}) => {
    return (
      // <ImageBackground
      //   source={require('../../image/bgDrive.png')}
      //   imageStyle={{
      //     height: null,
      //     width: '110%',
      //     marginLeft: '-5%',
      //   }}
      //   resizeMode="cover"
      //   style={{
      //     alignItems: 'center',
      //   }}>
      // เริ่ม
      <>
        {item.active_status === true && (
          <View style={{}}>
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
                // },=j;
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
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        this.setState({Show: !this.state.Show});
                        this.setState({
                          img: item.activity_list_logo_banner,
                          StarD: this.FullDate(item.activity_list_start_date),
                          EndD: this.FullDate(item.activity_list_end_date),
                          name: item.activity_list_topic_th,
                          location: item.activity_list_location_th,
                          detail: item.activity_list_desc_th,
                          partic: item.max_of_participate,
                          register: item.list_register_url,
                          code: item.activity_code,
                          price: item.activity_price_th,
                          StatusFa: this.state.Selec[item.activity_code],
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
                          product_category: item.activity_product_category,
                          daparment_name: item.activity_list_department_name,
                          officer_name: item.activity_list_officer_name,
                          deparment_tel: item.activity_list_department_tel,
                          formTypeActivity:item.formTypeActivity,
                        });
                      }}>
                      {/* <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 55, height: 50, borderRadius: 15}}
                  /> */}
                      <Image
                        source={require('../../image/devlop.png')}
                        style={{width: 55, height: 50, borderRadius: 15}}
                      />
                      <Text
                        style={Styles.textactivityDate}>
                        {this.Star_Date(item.activity_list_start_date)}
                        {this.End_Date(item.activity_list_end_date)}{' '}
                        {this.Yearend(item.activity_list_end_date)}
                        {/* {item.activity_product_category[0]} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              title={
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '84%'}}>
                      <Text
                        onPress={() => {
                          this.setState({
                            Show: !this.state.Show,
                            img: item.activity_list_logo_banner,
                            StarD: this.FullDate(item.activity_list_start_date),
                            EndD: this.FullDate(item.activity_list_end_date),
                            formTypeActivity:item.formTypeActivity,
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
                            StatusFa: this.state.Selec[item.activity_code],
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
                            endregis: this.FullDate(
                              item.activity_list_end_regis,
                            ),
                            starretgis: this.FullDate(
                              item.activity_list_start_regis,
                            ),
                            product_category: item.activity_product_category,
                            daparment_name: item.activity_list_department_name,
                            officer_name: item.activity_list_officer_name,
                            deparment_tel: item.activity_list_department_tel,
                          });
                        }}
                        numberOfLines={2}
                        style={Styles.textActivityTitl}>
                        {I18n.locale === 'th'
                          ? `${item.activity_list_topic_th}`
                          : `${item.activity_list_topic_en}`}
                      </Text>
                    </View>
                    <View
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
                        checked={this.state.Selec[item.activity_code]}
                        onPress={() => {
                          this.Selecitem({item: item, index: index});
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
                        style={Styles.textactivityloca}>
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
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  {this.props.getUser.userDetails.res_result.type != 6 ? (
                    <View style={Styles.ViewSub10}>
                      {/* {
                      this.props.getStatus1.isResult.status_confirm_identity
                        .status_code != 0 ? ( */}
                      <View>
                        {this.props.getUser.userDetails.res_result.type != 6 &&
                        this.props.getUser.userDetails.res_result.type != 4 ? (
                          <TouchableOpacity
                            disabled={item.active_status === false}
                            onPress={() => {
                              
                              if (
                                this.props.getStatus1.isResult
                                  .status_confirm_identity.status_code === 0 
                              ) {
                                this.props.navigation.navigate('Identity');
                              }
                              else if(this.props.getStatus1.isResult
                                .status_confirm_identity.status_code === 1  ){

                                  alert('กำลังดำเนินการตรวจสอบข้อมูล')

                              }
                              
                              else {

                                this._CheckRegister({
                                  activity_code: item.activity_code,
                                  member_cid:this.state.IDcard,
                                  type:this.props.getUser.userDetails.res_result.type,
                                  formTypeActivity:item.formTypeActivity,
                                  img: item.activity_list_logo_banner,
                                      StarD_1: item.activity_list_start_date,
                                      EndD_1: item.activity_list_end_date,
                                      StarD: this.FullDate(
                                        item.activity_list_start_date,
                                      ),
                                      EndD: this.FullDate(
                                        item.activity_list_end_date,
                                      ),
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
                                      StatusFa: this.state.Selec[
                                        item.activity_code
                                      ],
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
                                      endregis: this.FullDate(
                                        item.activity_list_end_regis,
                                      ),
                                      starretgis: this.FullDate(
                                        item.activity_list_start_regis,
                                      ),
                                      product_category:
                                        item.activity_product_category,
                                      daparment_name:
                                        item.activity_list_department_name,
                                      officer_name:
                                        item.activity_list_officer_name,
                                      deparment_tel:
                                        item.activity_list_department_tel,
                                 
                                })

                                // if(this.state.CheckStatus === false){
                                //   alert('false')

                                // }else{
                                //   alert('true')
                                // }
                               
                                // this.props.navigation.navigate(
                                //   'DevlopRegister',
                                //   {
                                //     img: item.activity_list_logo_banner,
                                //     StarD_1: item.activity_list_start_date,
                                //     EndD_1: item.activity_list_end_date,
                                //     StarD: this.FullDate(
                                //       item.activity_list_start_date,
                                //     ),
                                //     EndD: this.FullDate(
                                //       item.activity_list_end_date,
                                //     ),
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
                                //     StatusFa: this.state.Selec[
                                //       item.activity_code
                                //     ],
                                //     index: index,
                                //     item1: item,
                                //     linklive: item.activity_list_live_url,
                                //     live: item.status_live,
                                //     Close: item.active_status,
                                //     contry_TH:
                                //       I18n.locale === 'th'
                                //         ? item.list_country_name_th
                                //         : item.list_country_name_en,

                                //     contry_img_flag: item.img_flag,
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
                                //   },
                                // );
                              }
                            }}
                            style={
                              item.active_status === true
                                ? Styles.TouchSub2
                                : Styles.TouchSub5
                            }>
                            <Text
                              style={Styles.textactivityregister}>
                              {item.active_status === true
                                ? I18n.t('translate_Apply_activities')
                                : 'ปิดรับสมัครกิจกรรม'}
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
                            formTypeActivity:item.formTypeActivity,
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
                            StatusFa: this.state.Selec[item.activity_code],
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
                            endregis: this.FullDate(
                              item.activity_list_end_regis,
                            ),
                            starretgis: this.FullDate(
                              item.activity_list_start_regis,
                            ),
                            product_category: item.activity_product_category,
                            daparment_name: item.activity_list_department_name,
                            officer_name: item.activity_list_officer_name,
                            deparment_tel: item.activity_list_department_tel,

                            activity_code: item.activity_code,
                            member_cid:this.state.IDcard,
                            type:this.props.getUser.userDetails.res_result.type,
                          })
                        }
                        // hitSlop={{top: 20, bottom: 20, left: 50, right: 50,borderWidth:1}}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 1,
                        }}>
                        <Image
                          style={{width: 17, height: 13}}
                          source={require('../../image/readDetail.png')}
                        />
                        <Text
                          style={
                           Styles.textreaddetail
                          }>
                          {' '}
                          {I18n.t('translate_Readmore')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          Show: !this.state.Show,
                          img: item.activity_list_logo_banner,
                          StarD: this.FullDate(item.activity_list_start_date),
                          EndD: this.FullDate(item.activity_list_end_date),
                          formTypeActivity:item.formTypeActivity,
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
                          StatusFa: this.state.Selec[item.activity_code],
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
                          product_category: item.activity_product_category,
                          daparment_name: item.activity_list_department_name,
                          officer_name: item.activity_list_officer_name,
                          deparment_tel: item.activity_list_department_tel,

                          activity_code: item.activity_code,
                          member_cid:this.state.IDcard,
                          type:this.props.getUser.userDetails.res_result.type,
                        })
                      }
                      hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                      style={Styles.TouchRead}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#7fadec',
                          fontFamily: 'Kittithada Bold 75',
                        }}>
                        {' '}
                        {I18n.t('translate_Readmore')}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      this.onShare(item);
                      // alert('coming soon')
                    }}
                    style={{flex: 0.8, alignItems: 'flex-end'}}>
                    <Image
                      resizeMode={'contain'}
                      style={{width: 14, height: 16}}
                      source={require('../../image/sharelx.png')}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        )}
      </>
      // </ImageBackground>
    );
  };

  _DataToppick = () => {
    const Start = 3;
    let data = [];

    for (let index = Start; index < this.state.Toppic.length; index++) {
      const {toppickData} = this.state;
      data.push(this.state.Toppic[index]);
      toppickData.push(this.state.Toppic[index]);
      this.arrayholder2 = this.state.toppickData;
    }
    return data;
  };

  onChangeTab2 = item => {
    this.setState({tab: item.i});
    this.SearchSubmit('');
    this.SearchSubmitT('');
    this.SearchSubmitDev('');
  };

  render() {
    const {AllDevelop} = this.state;

    const {search} = this.state;
    // console.log("this.state.CheckStatus1111")
    // console.log(this.state.CheckStatus)

    return (
      <View style={Styles.ViewSub1}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />

        <View style={{marginTop: Platform.OS === 'android' && 90}} />

        {/* <View style={{}}>
          <ModalProvider
            // ModalComponent={MaterialMenuModal}
           
            >
          </ModalProvider>
        </View> */}

        {this.state.Show === true && (
          <Overlay
            backdropStyle={{backgroundColor: '#2d6dc480'}}
            onBackdropPress={() => this.setState({Show: false})}
            isVisible={this.state.Show}>
            <View style={Styles.OverlayHight}>
              <View style={[Styles.OverlayView1, {marginTop: -10}]}>
                <TouchableOpacity onPress={() => this.setState({Show: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView style={{zIndex: -1}}>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    {this.state.img != '' ? (
                      <Image
                        resizeMode={'cover'}
                        style={{width: 334, height: 216}}
                        source={{uri: this.state.img}}
                      />
                    ) : (
                      <View style={{alignItems: 'center'}}>
                        <Image
                          resizeMode={'contain'}
                          style={{width: '100%', height: 216}}
                          source={require('../../image/banerDrive.png')}
                        />
                      </View>
                    )}
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={Styles.popupTextTitle}>
                      {this.state.name}
                    </Text>
                    <Text style={Styles.opoupTextData1}>
                      {this.state.StarD} - {this.state.EndD}
                    </Text>
                    <Text style={Styles.opoupTextData1}>
                      {I18n.t('translate_DataRegister')} :{' '}
                      {this.state.starretgis} - {this.state.endregis}{' '}
                    </Text>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          <Text
                            style={Styles.popupTextMap}>
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

                       {this.state.location === 'ออนไลน์' ? (
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
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
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
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require('../../image/Live.png')}>
                            <Text style={Styles.TextSub5}>
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
                          style={Styles.popupTexthideText}>
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

                    {/* <View style={{marginTop: 10}}>
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {this.state.price}
                      </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_Num')} : {this.state.partic}{' '}
                        {I18n.t('translate_case')}
                      </Text>
                    </View> */}
                    <View style={{margin: 10}}>
                      <Image
                        style={{width: 334, height: 1}}
                        source={require('../../image/line6.png')}
                      />
                    </View>

                    <View style={{flex: 1}}>
                      <Text style={Styles.popupTextdetail}>
                        หน่วยงานอบรมรับผิดชอบ : {this.state.daparment_name}
                      </Text>
                      <Text style={Styles.popupTextdetail}>
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
                      {this.state.StatusFa === false ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.Selecitem({
                              item: this.state.item1,
                            });

                            this.setState({StatusFa: true});
                          }}
                          style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: 20, height: 20}}
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
                            this.Selecitem({
                              item: this.state.item1,
                            });

                            this.setState({StatusFa: false});
                          }}
                          style={{flexDirection: 'row'}}>
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../image/startoppick.png')}
                          />
                          <Text style={Styles.popupTextdelect}>
                            {'  '}
                            {I18n.t('translate_Delete_basket')}
                          </Text>
                        </TouchableOpacity>
                      )}
                      
                      {this.props.getUser.userDetails.res_result.type != 6 && (
                        <View>
                          {this.props.getStatus1.isResult
                            .status_confirm_identity.status_code != 0 &&
                          this.props.getStatus1.isResult.status_confirm_identity
                            .status_code != 1 ? (
                            <View>
                              {this.props.getUser.userDetails.res_result.type !=
                                6 &&
                              this.props.getUser.userDetails.res_result.type !=
                                4 ? (
                                <TouchableOpacity
                                  disabled={this.state.Close === false}
                                  onPress={() => {
                                    if (
                                      this.props.getStatus1.isResult
                                        .status_confirm_identity.status_code === 0
                                    ) {
                                      this.props.navigation.navigate('Identity');
                                    } else {
                                      this.setState({Show:false,})

                                      this._CheckRegister({
                                        
                                        img: this.state.img,
                                        StarD: this.state.StarD,
                                        EndD: this.state.EndD,
                                        name: this.state.name,
                                          
                                        location:  this.state.location,
                                          
                                        detail: this.state.detail,
                                        partic:  this.state.partic,
                                        register: this.state.register,
                                        code: this.state.code,
                                        price:this.state.price,
                                         
                                        StatusFa: this.state.StatusFa,
                                        index: this.state.index,
                                        item1: this.state.item1,
                                        linklive: this.state.linklive,
                                        live: this.state.live,
                                        Close: this.state.Close,
                                        contry_TH: this.state.contry_TH ,
            
                                        contry_img_flag: this.state.contry_img_flag,
                                        endregis:  this.state.endregis,
                                        starretgis: this.state.starretgis,
                                        product_category: this.state.product_category,
                                        daparment_name: this.state.daparment_name,
                                        officer_name: this.state.officer_name,
                                        deparment_tel: this.state.deparment_tel,

                                        activity_code: this.state.activity_code ,
                                        member_cid:this.state.member_cid,
                                        type:this.state.type,
                                      })
                                    }
                                  }}
                                  style={
                                    this.state.Close
                                      ? Styles.TouchSub1
                                      : Styles.TouchSub6
                                  }>
                                  {/* ผิด */}
                                  <Text
                                    style={Styles.textactivityregister}>
                                    {this.state.Close
                                      ? I18n.t('translate_Apply_activities')
                                      : I18n.t('translate_Applacation')}
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <View />
                              )}
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      )}
                      <TouchableOpacity
                        style={{alignSelf: 'flex-end', marginTop: -25}}>
                        <Image
                          resizeMode={'contain'}
                          style={{width: 14, height: 16}}
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
        {this.props.getUser.userDetails.res_result.type != 6 ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 20}
            style={{flex: 1, zIndex: -1}}>
            <View style={{flex: 1, zIndex: -1}}>
              <ScrollView>
                {/* <Headerstage3 nameTab={I18n.t('translate_Develop')} /> */}
                <HeaderText nameTab={I18n.t('translate_Develop_title')} />
                {this.state.Toppic != undefined && (
                  <View
                    style={{
                      marginBottom: 13,
                      shadowColor: '#eff1f6',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.0,

                      elevation: 24,
                    }}>
                    {this.state.Toppic.length > 0 ? (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {/* <Text style={[Styles.TextSub1, {left: 10}]}>
                            {I18n.t('translate_Toppick')}
                          </Text> */}
                          <HeaderTopPickdev
                            nameTab={I18n.t('translate_Toppickanddoolan')}
                          />
                          <View
                            style={{flexDirection: 'row-reverse', flex: 0.8}}>
                            <Image
                              resizeMode={'contain'}
                              style={Styles.ImgSub1}
                              source={require('../../image/bitmap.png')}
                            />
                            <Text style={Styles.TextSub2}>
                              {I18n.t('translate_By')}{' '}
                            </Text>
                          </View>
                        </View>
                        <View style={[Styles.marginLeft10, {bottom: 10}]}>
                          <FlatList
                            horizontal={true}
                            keyExtractor={(item, index) => index}
                            data={this.state.Toppic.slice(
                              0,
                              this.state.ToppicData,
                            )}
                            renderItem={this.TopPick}
                          />
                        </View>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                )}

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                  }}>
              

                </View>
                 {/* lyl */}

                 <ViewDevelop navigation={this.props.navigation}/>

              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <View style={{flex: 1, zIndex: -1}}>
            <ScrollView>
              <View style={{margin: 20}}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#40536d',
                    fontFamily: 'Kittithada Bold 75',
                  }}>
                  {I18n.t('translate_Title_DevelopScreen')}
                </Text>

                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '100%',
                      height: 30,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#cacaca',
                      borderWidth: 1,
                      borderRadius: 21.5,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={Styles.Image}
                      source={require('../../image/Seach.png')}
                    />

                    <TextInput
                      onChangeText={e => {
                        this.SearchSubmit(e);
                      }}
                      placeholderTextColor="#dadada"
                      style={[
                        Styles.TextInputseach1,
                        {
                          height: '100%',
                          width: '80%',
                        },
                      ]}
                      placeholder={I18n.t('translate_Seach')}
                    />
                  </View>
                </View>
              </View>

              {this.state.Recommend.length > 0 ? (
                <View>
                  {this.state.loading ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <FlatList
                      onEndReached={() => this._getRecommed()}
                      scrollEnabled={false}
                      extraData={this.state}
                      contentContainerStyle={Styles.flastListContainer}
                      style={Styles.flastListtab1}
                      data={this.state.Recommend}
                      onEndReachedThreshold={0.5}
                      ItemSeparatorComponent={() => (
                        <View style={Styles.separator} />
                      )}
                      ListFooterComponent={this.renderFooter.bind(this)}
                      renderItem={this.Listre}
                      keyExtractor={(item, index) => index}
                    />
                  )}
                </View>
              ) : (
                <View style={{marginTop: 10, alignSelf: 'center'}}>
                  <Text style={{fontSize: 20,fontFamily: 'Kittithada Bold 75',}}>
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
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
    height: 40,
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
  getStatus1: state.dataReducer.getStatus,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevelopScreen);
