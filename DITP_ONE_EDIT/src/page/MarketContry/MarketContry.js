import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Platform,
  Linking,
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/MaterialCommunityIcons';
import SegmentedControlTab from 'react-native-segmented-control-tabnew';
import DropDownPicker from 'react-native-dropdown-picker';
import Style from './Style';
import SlidingView from 'rn-sliding-view';
import {connect} from 'react-redux';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import {CheckBox, Overlay} from 'react-native-elements';
import I18n from '../../utils/I18n';
import {SendBasket, DeleteBasket} from '../../actions/auth.actions';
import {
  getMarketData,
  getSearchMarketData,
  getRegion,
  regisFilternoti,
  product_cate,
} from '../../actions/data.actions';
import Data from '../../Data/Data';
import {date} from 'yup';
import HTML from 'react-native-render-html';
import styles from 'rn-sliding-view/styles';
import NewSettingContry from './NewSettingContry';
import SearchMenu from './SearchMenu';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchableSectionList2} from '../../lib_edit/react-native-searchable-list/src';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import {Chip} from 'react-native-paper';
import Popover from 'react-native-popover-view';
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
const getDate = new Date();
class MarketContry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0,
      shopping: require('../../image/shoping.png'),
      pickShopping: require('../../image/PickerMarket.png'),
      touch: false,
      selectedItems: [],
      Sort: 'Sort',
      page: 5,
      componentVisible: false,
      typeMarket: 1,
      dataMarketData: [],
      dataPage: 1,
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      searchtext: '',
      country: '',
      sortby: '1',
      dateSe: '',
      Send: null,
      SendBasket: [],
      ckindex: 0,
      showTime: false,
      selectcontry: false,
      searchproduct: false,
      selectdataindex: 0,
      setValueDay: null,
      setValueMounth: null,
      setValueYear: null,

      togleUser: [],
      togleUserProduct: [],
      Seleccon: [],
      Selec: [],
      ssss: false,
      countYear: [],
      countDay: [],
      SelecProduct: [],

      valueYearindex: null,
      valueMonthindex: null,
      valueDayindex: null,

      data: [
        'Taj Mahal',
        'Great Wall of China',
        'Machu Picchu',
        'Christ the Redeemer',
        'Chichen Itza',
        'Roman Colosseum',
        'Petra',
      ],

      Country: [],
      ViewCountry: false,
      searchTerm: '',
      searchTermProduct: '',
      searchAttribute: 'name',
      searchByTitle: false,
      ignoreCase: true,
      selectProductFilter1: [],
      selectCountryFilter1: [],
      selectcontinentFilter1: [],
      selectidcontinentFilter1: [],
      checkFocus: false,
      checkFocus1: false,
      Continent: [],
      Coutryname: '',

      Product: [],

      openOverlaytwo: false,
      closePopover: false,
    };

    this.offset = 0;
    this.response = '';
    this.dateP = null;
    this.arrayholder = [];
  }

  // _getSeachCountry = async value => {
  //   try {
  //     const response = await this.props.dispatch(getRegion());

  //     if (response.res_code === '00') {
  //       alert('DDD'+response.res_results);
  //       this.setState({Continent: response.res_results});
  //     }
  //   } catch (error) {}
  // };
  Selecitem = ({index, item}) => {
    console.log('ประเทศ', index);
    let {Selec} = this.state;
    Selec[index] = !Selec[index];
    this.setState({Selec: Selec});
    console.log('ประเทศเลือก', Selec);
    if (Selec[index]) {
      console.log('1');
      this.setState({
        selectCountryFilter1: [
          ...this.state.selectCountryFilter1.filter(
            item2 => item2 !== item.name,
          ),
          item.name,
        ],
      });
    } else {
      console.log('2');
      this.setState({
        selectCountryFilter1: [
          ...this.state.selectCountryFilter1.filter(
            item2 => item2 !== item.name,
          ),
        ],
      });
    }
    console.log(this.state.selectCountryFilter1);
  };

  SelecitemHearderT = ({index, item}) => {
    console.log('ทวีป', index);
    let {Seleccon} = this.state;
    Seleccon[index] = !Seleccon[index];
    this.setState({Seleccon: Seleccon});

    if (Seleccon[index]) {
      this.setState({
        selectcontinentFilter1: [
          ...this.state.selectcontinentFilter1.filter(
            item2 => item2.title !== item.nameen,
          ),

          {id: item.continent_code, title: item.nameen},
        ],
      });
    } else {
      this.setState({
        selectcontinentFilter1: [
          ...this.state.selectcontinentFilter1.filter(
            item2 => item2.title !== item.nameen,
          ),
        ],
      });
    }
    console.log(
      '<><><><><>><>===' + JSON.stringify(this.state.selectcontinentFilter1),
    );
  };

  SelecitemHead = ({index, item}) => {
    let {togleUser} = this.state;
    console.log(togleUser);
    togleUser[index] = !togleUser[index];
    this.setState({togleUser: togleUser});
  };

  SelecitemProduct = ({index, item}) => {
    let {SelecProduct} = this.state;
    SelecProduct[index] = !SelecProduct[index];
    this.setState({SelecProduct: SelecProduct});

    if (SelecProduct[index]) {
      this.setState({
        selectProductFilter1: [
          ...this.state.selectProductFilter1.filter(item2 =>
            (item2 !== I18n.locale) === 'th' ? item.nameth : item.nameen,
          ),
          I18n.locale === 'th' ? item.nameth : item.nameen,
        ],
      });
    } else {
      this.setState({
        selectProductFilter1: [
          ...this.state.selectProductFilter1.filter(item2 =>
            (item2 !== I18n.locale) === 'th' ? item.nameth : item.nameen,
          ),
        ],
      });
    }
  };
  SelecitemHeadProduct = ({index, item}) => {
    let {togleUserProduct} = this.state;
    togleUserProduct[index] = !togleUserProduct[index];
    this.setState({togleUserProduct: togleUserProduct});
  };

  _getSeachProduct = async value => {
    try {
      const response = await this.props.dispatch(product_cate());

      if (response.res_code === '00') {
        console.log(JSON.stringify(response.res_results) + 'KKKOUHJOIIKKKKKK');
        this.setState({Product: response.res_results});
      }
    } catch (error) {}
  };

  _SendBasket = async values => {
    // alert(values)

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
            basket_code: values,
            basket_type: '3',
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
      console.log(response, 'ส่ง');
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
                basket_code: values,
                basket_type: '3',
              },
            ],
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        }),
      );
    } catch (error) {}
  };

  componentWillReceiveProps() {
    this.setState(
      {
        ...this.state,
        fetching_from_server: false,
        isListEnd: false,
        dataMarketData: [],
      },
      function() {
        this.offset = 0;
        this.dateP =
          this.props.filterCounty.data != null
            ? this.props.filterCounty.data?.dateSech
            : null;
        this._getMarketData();
      },
    );
  }

  yearCount() {
    var start_year = new Date().getFullYear();
    for (var yearDef = start_year; yearDef > start_year - 3; yearDef--) {
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
        const defulttear1 = start_year + 543;
        this.setState({setdefulttear: defulttear1.toString()});
      } else {
        const defulttear1 = start_year;
        this.setState({setdefulttear: defulttear1.toString});
      }
      console.log('ฆฆฆฆฆฆ');
      //  alert(this.state.setdefulttear);
    }
  }
  dateCount() {
    const DD = new Date().getDate();
    // alert(DD);
    this.setState({defultday: DD.toString()});

    var num = 1;
    for (var i = num; i <= 31; i++) {
      this.state.countDay.push({
        DayN: num++,
      });
    }
  }
  checkMM() {
    var mm = new Date().getMonth();
    var DFMM = mm + 1;
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

  _getMarketData = async values => {
    console.log(
      'valueDayindexselectCountryFilter1' + this.state.selectCountryFilter1,
    );
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          const num = this.offset;
          const type = this.state.selectdataindex;
          const text = this.state.searchtext;
          const sortby = this.state.sortby;
          const yyyy = parseInt(this.state.setdefulttear);
          var date = new Date();
          var tokenActivity = '';
          console.log('CHQค่าาา', type);
          if (this.props.getUser.userDetails.res_result.type == 6) {
            tokenActivity = this.props.authData.token.res_result.token;
          } else {
            tokenActivity = this.props.authData.token;
          }
          if (type == 1) {
            this.response = await this.props.dispatch(
              // alert('llll'+this.state.valueMonthindex),
              getSearchMarketData({
                res: {
                  num: num * 10,
                  type: 1,
                  text: text,
                  country:
                    this.state.selectCountryFilter1 === null
                      ? []
                      : this.state.selectCountryFilter1,
                  continent:
                    this.state.selectidcontinentFilter1 === null
                      ? []
                      : this.state.selectcontinentFilter1,
                  products:
                    this.state.selectProductFilter1 === null
                      ? []
                      : this.state.selectProductFilter1,
                  sortby: sortby,
                  year:
                    this.state.setValueYear === null ||
                    this.state.valueYearindex === 0
                      ? yyyy - 543
                      : I18n.locale === 'th'
                      ? this.state.setValueYear - 543
                      : this.state.setValueYear,
                  mouth:
                    this.state.valueMonthindex === null
                      ? ''
                      : this.state.valueMonthindex,
                  day:
                    this.state.setValueDay === null ||
                    this.state.valueDayindex === 0
                      ? ''
                      : this.state.setValueDay,
                },
                typep: this.props.getUser.userDetails.res_result.type,
                token: tokenActivity,
              }),
            );
          } else if (type == 0) {
            console.log(
              'FUCKJJJJnew123' +
                JSON.stringify(
                  this.props.filterCounty.data?.selectcontinentFilter,
                ),
            );

            this.response = await this.props.dispatch(
              getSearchMarketData({
                res: {
                  num: num * 10,
                  type: type,
                  text: text,
                  country:
                    this.props.filterCounty.data != null
                      ? this.props.filterCounty.data?.selectCountryFilter
                      : [],
                  continent:
                    this.props.filterCounty.data != null
                      ? this.props.filterCounty.data?.selectcontinentFilter
                      : [],
                  products:
                    this.props.filterCounty.data != null
                      ? this.props.filterCounty.data?.selectProductFilter
                      : [],
                  sortby: sortby,
                  year:
                    this.state.setValueYear === null ||
                    this.state.valueYearindex === 0
                      ? yyyy - 543
                      : yyyy - 543,
                  mouth: this.state.valueMonthindex === null ? '' : '',
                  day:
                    this.state.setValueDay === null ||
                    this.state.valueDayindex === 0
                      ? ''
                      : '',
                },
                typep: this.props.getUser.userDetails.res_result.type,
                token: tokenActivity,
              }),
            );
          } else {
            this.response = await this.props.dispatch(
              getSearchMarketData({
                res: {
                  num: num * 10,
                  type: type,
                  text: text,
                  country:
                    this.state.selectCountryFilter1 === null
                      ? this.props.filterCounty.data != null
                        ? this.props.filterCounty.data?.selectCountryFilter
                        : []
                      : this.state.selectCountryFilter1,
                  continent:
                    this.state.selectidcontinentFilter1 === null
                      ? this.props.filterCounty.data != null
                        ? this.props.filterCounty.data?.selectcontinentFilter
                        : []
                      : this.state.selectcontinentFilter1,
                  products:
                    this.state.selectProductFilter1 === null
                      ? this.props.filterCounty.data != null
                        ? this.props.filterCounty.data?.selectProductFilter
                        : []
                      : this.state.selectProductFilter1,
                  sortby: sortby,
                  year:
                    this.state.setValueYear === null ||
                    this.state.valueYearindex === 0
                      ? yyyy - 543
                      : I18n.locale === 'th'
                      ? this.state.setValueYear - 543
                      : this.state.setValueYear,
                  mouth:
                    this.state.valueMonthindex === null
                      ? ''
                      : this.state.valueMonthindex,
                  day:
                    this.state.setValueDay === null ||
                    this.state.valueDayindex === 0
                      ? ''
                      : this.state.setValueDay,
                },
                typep: this.props.getUser.userDetails.res_result.type,
                token: tokenActivity,
              }),
            );
          }

          if (this.response.res_code === '00') {
            if (this.response.res_result.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                dataMarketData: [
                  ...this.state.dataMarketData,
                  ...this.response.res_result,
                ],
                fetching_from_server: false,
              });
            } else {
              // alert('false')
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  selecitem = ({item, index}) => {
    let {selectedItems, DataActivity} = this.state;
    selectedItems[index] = !selectedItems[index];
    this.setState({checkBox: selectedItems});
    if (selectedItems[index] === true) {
      return this._SendBasket(item.guid);
    } else {
      return this._DeleteBasket(item.guid);
    }
  };

  toggleComponentVisibility = () => {
    this.setState({componentVisible: !this.state.componentVisible});
  };

  DataMarket = () => {
    try {
      const Listloader = Data;
      var number = [];
      if (Data > this.state.page) {
        for (let index = 0; index < this.state.page; index++) {
          number.push(Data);
        }

        return number;
      } else {
        for (let index = 0; index < this.state.page; index++) {
          number.push(Data[index]);
        }

        return number;
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };
  renderFooter() {
    return (
      <View
        style={[
          Style.footer,
          {marginTop: this.state.dataMarketData.length == 0 ? height * 0.22 : 0},
        ]}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : (
          <View>
            {this.state.dataMarketData.length == 0 ? (
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{I18n.t('translate_Nodata')}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }


  ListData = ({item, index, onPress}) => {
    return (
      <View style={Style.ViewFlatList1}>
        <View style={Style.ViewFlatList4}>
          <View style={Style.marginLeft10}>
            <Image style={{width: 33, height: 24}} source={item.picture} />
          </View>
          <View style={Style.ViewFlatList3}>
            <View style={Style.flewRow}>
              <Text style={Style.fontFlatList}>{item.name}</Text>
            </View>
            <View style={Style.flewRow}>
              <Text style={Style.fontFlatList2}>
                {item.mine} - {item.country}
              </Text>
              <View style={Style.ViewFlatList5}>
                <View>
                  <Text style={Style.fontFlatList3}>
                    {'  '}
                    {item.view} {I18n.t('translate_View')}
                  </Text>
                </View>
                <TouchableOpacity disabled onPress={() => console.log('VIEW')}>
                  <Image
                    style={{width: 21, height: 13}}
                    source={require('../../image/ViewEye.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{right: 18, bottom: 20}}>
            <CheckBox
              checkedIcon={
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../image/PickerMarket.png')}
                />
              }
              uncheckedIcon={
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../image/shoping.png')}
                />
              }
              checked={this.state.selectedItems[index]}
              onPress={() => {
                this._SendBasket(item.guid);
                setTimeout(() => {
                  this.selecitem({item: item, index: index});
                }, 200);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  // ttt = kkk => {
  //   console.log('ID', kkk);
  // };

  checkStatus = ({item}) => {
    if (item.status_basket === 'Y') {
      return this._DeleteBasket(item.guid);
    } else {
      return this._SendBasket(item.guid);
    }
  };

  ListMarket_Trend = ({item, index}) => {
    if (item.status_basket === true) {
      this.state.selectedItems.push(true);
    }
    if (item.status_basket === false) {
      this.state.selectedItems.push(false);
    }

    return (
      <TouchableOpacity
        onPress={
          () =>
            this.props.navigation.navigate('ViewMarketCountry', {
              uri: item.link_shered,
              image: item.flag_url,
              title: item.title,
              timeElapsed: item.timeElapsed,
              country_name: item.country_name,
              view: item.view,
              market_id: item.market_id,
            })

          // this.ttt(item.market_id)

          //  alert(item.market_id)
        }
        // Style.ViewFlatList1,
        style={{backgroundColor: '#FFFFFF'}}>
        <View style={Style.ViewFlatList4}>
          <View style={Style.marginLeft10}>
            <Image
              style={{width: 33, height: 24, top: 6}}
              source={{uri: item.flag_url}}
            />
          </View>
          <View style={[Style.ViewFlatList3, {}]}>
            <View style={[Style.flewRow, {}]}>
              <Text
                style={
                  Platform.OS === 'android'
                    ? Style.fontFlatList
                    : Style.fontFlatListIos
                }
                numberOfLines={2}>
                {item.title}
              </Text>
            </View>
            <View style={[Style.flewRow, {flex: 1, marginVertical: 10}]}>
              <Text style={Style.fontFlatList2}>
                {item.timeElapsed} - {item.country_name}
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row-reverse',
                  flex: 0.4,
                  alignItems: 'center',

                  left: 40,
                }}>
                <View>
                  <Text
                    style={[
                      Style.fontFlatList3,
                      {fontFamily: 'PSL-Text', top: 1},
                    ]}>
                    {' '}
                    {item.view} {I18n.t('translate_View')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => console.log('VIEW')}>
                  <Image
                    style={{width: 21, height: 13}}
                    source={require('../../image/eyeviewx.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex: 0.2}}>
            <CheckBox
              containerStyle={[
                Style.basketIconContainer,
                {top: -15, right: 10},
              ]}
              checkedIcon={
                <Image
                  style={{width: 28, height: 28}}
                  source={require('../../image/PickerMarket.png')}
                />
              }
              uncheckedIcon={
                <Image
                  style={{width: 28, height: 30}}
                  source={require('../../image/shoping.png')}
                />
              }
              checked={this.state.selectedItems[index]}
              onPress={() => {
                setTimeout(() => {
                  this.selecitem({item: item, index: index});
                }, 200);
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    const {navigation} = this.props;

    console.log('MYNAME' + this.props.filterCounty.data);

    this.focusListener = navigation.addListener('focus', () => {
      this._getMarketData();
    });
    this._getMarketData();
    this._getSeachCountry();
    this.yearCount();
    this._getSeachProduct();
    this.checkMM();
    this.dateCount();
  }

  _getSeachCountry = async value => {
    // console.log('fuck good');
    try {
      const response = await this.props.dispatch(getRegion());
      console.log(response.res_results);
      if (response.res_code === '00') {
        this.setState({Continent: response.res_results});
      }
    } catch (error) {}
  };

  handleIndexChange = (index, number) => {
    console.log('OK', index);
    if (index === 2) {
      this.setState(
        {
          ...this.state,
          selectedIndex: index,
          selectdataindex: 2,
          dataPage: 0,
          fetching_from_server: false,
          isListEnd: false,
          dataMarketData: [],
          selectedItems: [],
          ckindex: index,
        },
        function() {
          this.offset = 0;

          this._getMarketData();
          this._getSeachCountry();
        },
      );
    } else if (index === 3) {
      this.setState(
        {
          ...this.state,
          selectedIndex: index,
          selectdataindex: 4,
          dataPage: 0,
          fetching_from_server: false,
          isListEnd: false,
          dataMarketData: [],
          selectedItems: [],
          ckindex: index,
        },
        function() {
          this.offset = 0;

          this._getMarketData();
          this._getSeachCountry();
        },
      );
    } else if (index === 4) {
      this.setState(
        {
          ...this.state,
          selectedIndex: index,
          selectdataindex: 4,
          dataPage: 0,
          fetching_from_server: false,
          isListEnd: false,
          dataMarketData: [],
          selectedItems: [],
          ckindex: index,
        },
        function() {
          this.offset = 0;

          this._getMarketData();
          this._getSeachCountry();
        },
      );
    } else {
      this.setState(
        {
          ...this.state,
          selectedIndex: index,
          selectdataindex: index,
          dataPage: 0,
          fetching_from_server: false,
          isListEnd: false,
          dataMarketData: [],
          selectedItems: [],
          ckindex: index,
        },
        function() {
          this.offset = 0;

          this._getMarketData();
          this._getSeachCountry();
        },
      );
    }
  };
  searchSubmit = e => {
    this.setState(
      {
        ...this.state,
        selectedIndex: this.state.selectedIndex,
        dataPage: 0,
        fetching_from_server: false,
        isListEnd: false,
        dataMarketData: [],
        searchtext: e.nativeEvent.text,
      },
      function() {
        this.offset = 0;
        this._getMarketData();
      },
    );
    // console.log(e.nativeEvent.text);
  };

  sortbyMarket = (label, value) => {
    this.setState(
      {
        ...this.state,
        selectedIndex: this.state.selectedIndex,
        dataPage: 0,
        fetching_from_server: false,
        isListEnd: false,
        dataMarketData: [],
        sortby: value,
      },
      function() {
        this.offset = 0;
        this._getMarketData();
      },
    );
  };

  formatdate(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = yyyy + '-' + dd + '-' + mm;
    return date.toString();
  }

  HelloWorldApp = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Hello, world!</Text>
      </View>
    );
  };

  render() {
    const {
      data,
      searchTerm,
      searchAttribute,
      ignoreCase,
      searchByTitle,
      searchTermProduct,
    } = this.state;
    return (
      <View style={Style.SafeArea}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View
          style={{
            zIndex: -1,
            backgroundColor: '#FFFFFF',
            flex: 1,
            marginTop: Platform.OS === 'android' && 90,
          }}>
          <Headerstage nameTab={I18n.t('translate_HInter')} />
          {/* <View
            style={{
              alignItems: 'center',
              // marginBottom: 13,
              borderColor: 'red',
            }}> */}

          {this.state.ckindex === 0 ? (
            <View>
              {this.props.filterCounty.data?.selectCountryFilter.length > 0 ||
              this.props.filterCounty.data?.selectcontinentFilter.length > 0 ||
              this.props.filterCounty.data?.selectProductFilter.length > 0 ? (
                <View style={Style.ViewSeach}>
                  <Image
                    style={Style.ImageSeach}
                    source={require('../../image/searchbluex.png')}
                  />
                  <TextInput
                    placeholder={I18n.t('translate_Seach')}
                    style={Style.TextInputSeach}
                    onSubmitEditing={this.searchSubmit}
                    returnKeyType="done"
                  />
                </View>
              ) : null}
            </View>
          ) : (
            <View style={Style.ViewSeach}>
              <Image
                style={Style.ImageSeach}
                source={require('../../image/searchbluex.png')}
              />
              <TextInput
                placeholder={I18n.t('translate_Seach')}
                style={Style.TextInputSeach}
                onSubmitEditing={this.searchSubmit}
                returnKeyType="done"
              />
            </View>
          )}

          {/* </View> */}
          {/* เลือกปุ่ม */}
          {this.state.ckindex > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginBottom: 8,
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
                  <View style={{zIndex: -1, flex: 1, paddingHorizontal: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({closePopover: true});
                      }}
                      style={Style.choosetime}>
                      <View style={Style.Viewin1}>
                        <Text style={Style.ViewTextin}>
                          {' '}
                          {I18n.locale === 'th' ? 'ช่วงเวลา' : 'time'}
                        </Text>
                      </View>
                      <View style={Style.Viewin2}>
                        <Icon
                          size={15}
                          name="keyboard-arrow-down"
                          style={{
                            color: '#FFFFFF',
                            justifyContent: 'center',
                          }}>
                          {' '}
                        </Icon>
                      </View>
                    </TouchableOpacity>
                  </View>
                }>
                <View style={{borderWidth: 1, borderColor: '#2d6dc4'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      marginHorizontal: 15,
                    }}>
                    <View style={Style.choosetime1}>
                      <RNPickerSelect
                        disabled={this.state.checkRNPickerstate}
                        useNativeAndroidPickerStyle={false}
                        _fixAndroidTouchableBug_={false}
                        onValueChange={(value, index) =>
                          this.setState({
                            setValueYear: value,
                            valueYearindex: index,
                          })
                        }
                        onDonePress={(value, index) => {
                          this.setState({
                            setValueYear:
                              this.state.setValueYear === undefined ||
                              this.state.setValueYear === null
                                ? this.state.setdefulttear
                                : this.state.setValueYear,
                          });
                        }}
                        value={
                          this.state.setValueYear === undefined ||
                          this.state.setValueYear === null
                            ? this.state.setdefulttear
                            : this.state.setValueYear
                        }
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
                        doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                        items={this.state.countYear.map(object => ({
                          label: object.YearN.toString(),
                          value: object.YearN.toString(),
                          key: object.YearN.toString(),
                        }))}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 32,
                              flex: 1,
                            }}>
                            {this.state.setValueYear === undefined ||
                            this.state.setValueYear === null ? (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                }}>
                                {I18n.t('translate_chooseyear')}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                }}>
                                {this.state.setValueYear}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 32,
                              flex: 0.2,
                            }}>
                            {Platform.OS !== 'android' && (
                              <Icon
                                size={15}
                                name="keyboard-arrow-down"
                                style={{
                                  color: '#2d6dc4',
                                  alignItems: 'flex-end',
                                }}>
                                {' '}
                              </Icon>
                            )}
                          </View>
                        </View>
                      </RNPickerSelect>
                    </View>
                    <View
                      style={{
                        zIndex: -1,
                        flex: 1,
                        // paddingHorizontal: 5,
                        borderWidth: 0.5,
                        borderColor: '#FFFFFF',
                        backgroundColor: '#FFFFFF',
                        height: 35,
                        paddingHorizontal: 10,
                        marginHorizontal: 3,
                        borderRadius: 17,
                        borderColor: '#2d6dc4',
                        borderWidth: 1,
                      }}>
                      <RNPickerSelect
                        disabled={this.state.checkRNPickerstate}
                        useNativeAndroidPickerStyle={false}
                        _fixAndroidTouchableBug_={false}
                        onValueChange={(value, index) =>
                          this.setState({
                            setValueMounth: value,
                            valueMonthindex: index,
                          })
                        }
                        onDonePress={() => {
                          // alert('jjjj')
                          this.setState({
                            setValueMounth:
                              this.state.setValueMounth === null
                                ? this.state.valueSelectMMMM
                                : this.state.setValueMounth,
                            valueMonthindex:
                              this.state.valueMonthindex === undefined
                                ? getDate.getMonth() + 1
                                : this.state.valueMonthindex,
                          });

                          // this.setState({

                          //   valueMonthindex:''
                          //     // this.state.valueMonthindex === undefined
                          //     //   ? getDate.getMonth() + 1
                          //     //   : this.state.valueMonthindex,
                          //       // setValueMounth
                          // });
                          // this.checkMM(this.state.valueSelectMouthindex)
                          // this.setState({valueSelectMMMM:this.state.valueSelectMMMM === undefined?
                          //   'ธันวาคม':this.state.valueSelectMMMM})
                        }}
                        style={{
                          inputAndroidContainer: {
                            width: '100%',
                          },
                          ...pickerSelectStyles2,
                        }}
                        doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                        value={
                          this.state.setValueMounth === undefined ||
                          this.state.setValueMounth === null
                            ? this.state.valueSelectMMMM
                            : this.state.setValueMounth
                        }
                        placeholder={{
                          label:
                            I18n.locale === 'th'
                              ? 'เดือนทั้งหมด'
                              : 'Choose Mouth',
                          value:
                            I18n.locale === 'th'
                              ? 'เดือนทั้งหมด'
                              : 'Choose Mouth',
                        }}
                        items={
                          I18n.locale === 'th'
                            ? [
                                {
                                  label: 'มกราคม',
                                  value: 'มกราคม',
                                },
                                {
                                  label: 'กุมภาพันธ์',
                                  value: 'กุมภาพันธ์',
                                },
                                {
                                  label: 'มีนาคม',
                                  value: 'มีนาคม',
                                },
                                {
                                  label: 'เมษายน',
                                  value: 'เมษายน',
                                },
                                {
                                  label: 'พฤษาภาคม',
                                  value: 'พฤษาภาคม',
                                },
                                {
                                  label: 'มิถุนายน',
                                  value: 'มิถุนายน',
                                },
                                {
                                  label: 'กรกฎาคม',
                                  value: 'กรกฎาคม',
                                },
                                {
                                  label: 'สิงหาคม',
                                  value: 'สิงหาคม',
                                },
                                {
                                  label: 'กันยายน',
                                  value: 'กันยายน',
                                },
                                {
                                  label: 'ตุลาคม',
                                  value: 'ตุลาคม',
                                },
                                {
                                  label: 'พฤศจิกายน',
                                  value: 'พฤศจิกายน',
                                },
                                {
                                  label: 'ธันวาคม',
                                  value: 'ธันวาคม',
                                },
                              ]
                            : [
                                {
                                  label: 'January',
                                  value: 'January',
                                },
                                {
                                  label: 'February',
                                  value: 'February',
                                },
                                {
                                  label: 'Murch',
                                  value: 'Murch',
                                },
                                {
                                  label: 'April',
                                  value: 'April',
                                },
                                {label: 'May', value: 'May'},
                                {label: 'June', value: 'June'},
                                {label: 'July', value: 'July'},
                                {
                                  label: 'August',
                                  value: 'August',
                                },
                                {
                                  label: 'September',
                                  value: 'September',
                                },
                                {
                                  label: 'October',
                                  value: 'October',
                                },
                                {
                                  label: 'Noverber',
                                  value: 'Noverber',
                                },
                                {
                                  label: 'December',
                                  value: 'December',
                                },
                              ]
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 32,

                              justifyContent: 'center',
                              flex: 1,
                            }}>
                            {this.state.setValueMounth === undefined ||
                            this.state.setValueMounth === null ? (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                }}>
                                {I18n.t('translate_choosemouth')}
                                {/* {this.state.setValueMounth} */}

                                {'     '}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                  borderWidth: 0,
                                }}>
                                {this.state.setValueMounth}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              flex: 0.2,
                              height: 32,
                              justifyContent: 'center',
                            }}>
                            {Platform.OS !== 'android' && (
                              <Icon
                                size={15}
                                name="keyboard-arrow-down"
                                style={{
                                  color: '#2d6dc4',
                                }}>
                                {' '}
                              </Icon>
                            )}
                          </View>
                        </View>
                      </RNPickerSelect>
                    </View>
                    <View
                      style={{
                        zIndex: -1,
                        flex: 0.8,
                        // paddingHorizontal: 5,
                        borderWidth: 0.5,
                        borderColor: '#FFFFFF',
                        backgroundColor: '#FFFFFF',
                        height: 35,
                        paddingHorizontal: 10,
                        marginHorizontal: 3,
                        borderRadius: 17,
                        borderWidth: 1,
                        borderColor: '#2d6dc4',
                      }}>
                      <RNPickerSelect
                        disabled={this.state.checkRNPickerstate}
                        useNativeAndroidPickerStyle={false}
                        _fixAndroidTouchableBug_={false}
                        onDonePress={() => {
                          // alert(this.state.valueSelectDDDD);
                          this.setState({
                            setValueDay:
                              this.state.setValueDay === null
                                ? this.state.defultday
                                : this.state.setValueDay,
                          });
                        }}
                        onValueChange={(value, index) =>
                          // console.log(value)
                          this.setState({
                            setValueDay: value,
                            valueDayindex: index,
                          })
                        }
                        style={{
                          inputAndroidContainer: {
                            width: '100%',
                          },
                          ...pickerSelectStyles2,
                        }}
                        placeholder={{
                          label: I18n.locale === 'th' ? 'วันที่' : 'Choose Day',
                          value: I18n.locale === 'th' ? 'วันที่' : 'Choose Day',
                        }}
                        value={
                          this.state.setValueDay === null
                            ? this.state.defultday
                            : this.state.setValueDay
                        }
                        doneText={I18n.locale === 'th' ? ' เลือก' : 'Done'}
                        items={this.state.countDay.map(object => ({
                          label: object.DayN.toString(),
                          value: object.DayN.toString(),
                          key: object.DayN.toString(),
                        }))}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 32,
                              flex: 1,
                            }}>
                            {this.state.setValueDay === null ? (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                }}>
                                {I18n.t('translate_chooseday')}
                                {'   '}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#2d6dc4',
                                  textAlign: 'center',
                                }}>
                                {this.state.setValueDay}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 32,
                              flex: 0.2,
                            }}>
                            {Platform.OS !== 'android' && (
                              <Icon
                                size={15}
                                name="keyboard-arrow-down"
                                style={{
                                  color: '#2d6dc4',
                                }}>
                                {' '}
                              </Icon>
                            )}
                          </View>
                        </View>
                      </RNPickerSelect>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#2d6dc4',
                      borderRadius: 17,
                      height: 34,
                      justifyContent: 'center',
                      marginHorizontal: 15,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState(
                          {
                            dataMarketData: [],
                            isListEnd: false,
                            loading: false,
                            fetching_from_server: false,
                            showTime: false,
                            closePopover: false,
                          },
                          function() {
                            this.offset = 0;
                            this._getMarketData();
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
                          fontSize: 22,
                        }}>
                        ค้นหา
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Popover>

              <View style={{zIndex: -1, flex: 1, paddingHorizontal: 5}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      selectcontry: true,
                      searchproduct: false,
                      showTime: false,
                    });
                  }}
                  style={Style.choosecontry}>
                  <View style={Style.Viewin1}>
                    <Text style={Style.ViewTextin}> ประเทศ</Text>
                  </View>
                  <View style={Style.Viewin2}>
                    <Icon
                      size={15}
                      name="keyboard-arrow-down"
                      style={{
                        color: '#FFFFFF',
                      }}>
                      {' '}
                    </Icon>
                  </View>
                </TouchableOpacity>
              </View>

              {/* ค้นหาประเทศ */}

              {this.state.searchproduct === false ? (
                <View style={{zIndex: -1, flex: 1, paddingHorizontal: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        searchproduct: true,
                        showTime: false,
                        selectcontry: false,
                      });
                    }}
                    style={Style.chooseproducts}>
                    <View style={Style.Viewin1}>
                      <Text style={Style.ViewTextin}> สินค้า</Text>
                    </View>
                    <View style={Style.Viewin2}>
                      <Icon
                        size={15}
                        name="keyboard-arrow-down"
                        style={{
                          color: '#FFFFFF',
                        }}>
                        {' '}
                      </Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{zIndex: -1, flex: 1, paddingHorizontal: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({searchproduct: false});
                    }}
                    style={Style.chooseproducts}>
                    <View style={Style.Viewin1}>
                      <Text style={Style.ViewTextin}> สินค้า</Text>
                    </View>
                    <View style={Style.Viewin2}>
                      <Icon
                        size={15}
                        name="keyboard-arrow-up"
                        style={{
                          color: '#FFFFFF',
                        }}>
                        {' '}
                      </Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null}

          <View style={[Style.ViewSub1, Platform.OS === 'ios' && {zIndex: 1}]}>
            <Text style={Style.TextHear}>
              {I18n.t('translate_Market_Data')}
            </Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                flex: 0.98,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <DropDownPicker
                  itemStyle={{
                    justifyContent: 'center',
                  }}
                  dropDownMaxHeight={300}
                  style={[Style.StyeSelec]}
                  searchableStyle={Style.backgroundColor}
                  selectedLabelStyle={Style.fontSelec}
                  placeholderStyle={Style.fontSelecP}
                  arrowStyle={[Style.ArrowStyle]}
                  activeItemStyle={{justifyContent: 'center'}}
                  labelStyle={Style.fontSelec}
                  placeholder={I18n.t('translate_SORTBY')}
                  defaultValue={this.setState((this.state.Sort = null))}
                  items={[
                    {label: I18n.t('translate_Latest_Date'), value: 1},
                    // {label: I18n.t('translate_Oldest_Date'), value: 2},
                    {label: I18n.t('translate_Most_Date'), value: 3},
                    // {label: I18n.t('translate_Least_Date'), value: 4},
                  ]}
                  customTickIcon
                  defaultIndex={0}
                  containerStyle={{width: 125, height: 60}}
                  onChangeItem={item =>
                    this.sortbyMarket(item.label, item.value)
                  }
                />
                {/* ถ้าเท่ากับ index0 ก็ ไม่ให้แสดง ตั้งค่าตัวกรอง */}
                {this.props.filterCounty.data != null ? (
                  <View>
                    {this.state.ckindex === 0 ? (
                      <View>
                        {this.props.filterCounty.data?.selectCountryFilter
                          .length > 0 ||
                        this.props.filterCounty.data?.selectcontinentFilter
                          .length > 0 ||
                        this.props.filterCounty.data?.selectProductFilter
                          .length > 0 ? (
                          <View>
                            <View style={{justifyContent: 'center'}}>
                             
                              <Text style={{width: 1, height: 20}}> </Text>
                            </View>

                            <View style={Style.ViewTabSearch}>
                              <TouchableOpacity
                                onPress={() => {
                                  Keyboard.dismiss();
                                  this.props.navigation.openDrawer();
                                  // this.props.navigation.toggleDrawer();

                                  // this.props.navigation.navigate('SearchMenu')
                                }}
                                style={Style.TouchSearch}>
                                <Text style={Style.fontSearch}>
                                  {I18n.t('translate_Filter')}
                                </Text>
                                <View style={Style.ViewImgSearch}>
                                  <Image
                                    style={{width: 13, height: 10}}
                                    source={require('../../image/TapSearcOne.png')}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          {this.props.filterCounty.data != null ? (
            <View style={[Style.ViewTab, {zIndex: -1}]}>
              {this.props.filterCounty.data?.selectCountryFilter.length > 0 ||
              this.props.filterCounty.data?.selectcontinentFilter.length > 0 ||
              this.props.filterCounty.data?.selectProductFilter.length > 0 ? (
                <SegmentedControlTab
                  textNumberOfLines={2}
                  tabStyle={Style.TabStyle}
                  tabTextStyle={Style.TabText}
                  firstTabStyle={Style.fistTabStyle}
                  lastTabStyle={Style.lastTabStyle}
                  activeTabStyle={Style.backgroundTab}
                  tabsContainerStyle={[
                    Platform.OS === 'ios'
                      ? Style.tabContainer
                      : Style.AndroidTab,
                    {},
                  ]}
                  allowFontScaling={false}
                  values={[
                    '',
                    I18n.t('translate_ALL_maket'),
                    I18n.t('translate_Market_Trend'),

                    I18n.t('translate_Product_Spotlight'),
                  ]}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                />
              ) : (
                <SegmentedControlTab
                  textNumberOfLines={2}
                  tabStyle={Style.TabStyle}
                  tabTextStyle={Style.TabText}
                  firstTabStyle={Style.fistTabStyle}
                  lastTabStyle={Style.lastTabStyle}
                  activeTabStyle={Style.backgroundTab}
                  tabsContainerStyle={[
                    Platform.OS === 'ios'
                      ? Style.tabContainer
                      : Style.AndroidTab,
                    {},
                  ]}
                  allowFontScaling={false}
                  values={[
                    '',
                    I18n.t('translate_ALL_maket'),
                    I18n.t('translate_Market_Trend'),

                    I18n.t('translate_Product_Spotlight'),
                  ]}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                />
              )}
            </View>
          ) : (
            <View style={[Style.ViewTab, {zIndex: -1}]}>
              <SegmentedControlTab
                textNumberOfLines={2}
                tabStyle={Style.TabStyle}
                tabTextStyle={Style.TabText}
                firstTabStyle={Style.fistTabStyle}
                lastTabStyle={Style.lastTabStyle}
                activeTabStyle={Style.backgroundTab}
                tabsContainerStyle={[
                  Platform.OS === 'ios' ? Style.tabContainer : Style.AndroidTab,
                  {},
                ]}
                allowFontScaling={false}
                values={[
                  '',
                  I18n.t('translate_ALL_maket'),
                  I18n.t('translate_Market_Trend'),

                  I18n.t('translate_Product_Spotlight'),
                ]}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
          )}

          <View style={{flex: 1, marginHorizontal: 10}}>
            {this.state.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
           
                {this.props.filterCounty.data != null ? (
                  <>
                    {this.state.ckindex === 0 &&
                    this.props.filterCounty.data.selectcontinentFilter
                      .length === 0 &&
                    this.props.filterCounty.data.selectCountryFilter.length ===
                      0 &&
                    this.props.filterCounty.data.selectProductFilter.length ===
                      0 ? (
                      <NewSettingContry />
                    ) : (
                      <FlatList
                        style={{flex: 1}}
                        keyExtractor={(item, index) => index}
                        data={this.state.dataMarketData}
                        onEndReached={() => this._getMarketData()}
                        onEndReachedThreshold={0.5}
                        renderItem={this.ListMarket_Trend}
                        ItemSeparatorComponent={() => (
                          <View style={Style.separator} />
                        )}
                        ListFooterComponent={this.renderFooter.bind(this)}
                      />
                    )}
                  </>
                ) : (
                  <> 
                  {this.state.ckindex === 0 ? (
                    <NewSettingContry />
                  ):(
                    <FlatList
                        style={{}}
                        keyExtractor={(item, index) => index}
                        data={this.state.dataMarketData}
                        onEndReached={() => this._getMarketData()}
                        onEndReachedThreshold={0.5}
                        renderItem={this.ListMarket_Trend}
                        ItemSeparatorComponent={() => (
                          <View style={Style.separator} />
                        )}
                        ListFooterComponent={this.renderFooter.bind(this)}
                      />

                  )}
                  
                  </>
                 
                )}
              </>
           
            )}
          </View>
        </View>

        {/* popup show */}

        {this.state.selectcontry == true && (
          <Overlay
            backdropStyle={{backgroundColor: '#2d6dc480'}}
            overlayStyle={{
              // borderWidth: 1,
              // borderColor: '#2d6dc4',
              // backgroundColor: '#FFFFFF',
              top: height * 0.045,
              height: height * 0.7,
              width: width * 0.8,
              borderRadius: 8,
            }}
            isVisible={this.state.selectcontry}
            onBackdropPress={() => this.setState({selectcontry: false})}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#999999',
                borderRadius: 18,
                //  width: width * 0.8,
                // top: height * -0.06,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                style={{width: 24, height: 24, top: Platform.OS === 'ios' ? 6 : 14, marginHorizontal: 5}}
                source={require('../../image/searchbluex.png')}
              />
              <TextInput
                autoCorrect={true}
                defaultValue={this.state.Coutryname}
                style={{
                  fontSize: 22,
                  height: Platform.OS === 'ios' ? 33 : 45,
                  width: '100%',
                  color: '#000000',
                  fontFamily: 'Kittithada Bold 75',
                }}
                placeholderTextColor="#dadada"
                placeholder={I18n.t('translate_Seach')}
                value={searchTerm}
                onChangeText={searchTerm => {
                  this.setState({searchTerm});
                }}
              />
            </View>
            <SearchableSectionList2
              sections={this.state.Continent}
              searchTerm={searchTerm}
              searchAttribute={searchAttribute}
              searchByTitle={searchByTitle}
              ignoreCase={ignoreCase}
              renderSectionHeader={({section: {title}}) => (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      backgroundColor: '#e7edf2',
                      marginTop: 10,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    },
                    this.state.togleUser[title.id] && {
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                    },
                  ]}>
                  <CheckBox
                    title={
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 22,
                          color: '#20416e',
                          width: '100%',
                        }}>
                        {I18n.locale === 'th' ? title.nameth : title.nameen}
                      </Text>
                    }
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    checkedIcon={
                      <Image
                        style={{width: 24, height: 24}}
                        source={require('../../image/rrr.png')}
                      />
                    }
                    uncheckedIcon={
                      <View
                        style={{
                          borderWidth: 1,
                          width: 24,
                          height: 24,
                          borderColor: '#999999',
                          borderRadius: 3.4,
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                    }
                    checked={this.state.Seleccon[title.nameen]}
                    onPress={() => {
                      // alert('SelecitemHearderT')
                      this.SelecitemHearderT({
                        item: title,
                        index: title.nameen,
                      });
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      color: '#20416e',
                      width: '80%',
                      height: 35,
                      marginTop: 10,
                    }}>
                    {title.nameen}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      paddingLeft: 50,
                      position: 'absolute',
                      top: -5,
                      right: 0,
                    }}
                    onPress={() => {
                      // alert('SelecitemHead')

                      this.SelecitemHead({item: title, index: title.id});
                    }}>
                    <Icon0
                      name={
                        this.state.togleUser[title.id]
                          ? 'upcircleo'
                          : 'downcircleo'
                      }
                      size={25}
                      color="#73838f"
                    />
                  </TouchableOpacity>
                </View>
              )}
              renderItem={({item, index}) => (
                <View>
                  {item.status && this.state.togleUser[item.id_main] && (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        backgroundColor: '#96b3cb20',
                        borderTopColor: '#c1d0dc',
                        borderTopWidth: 1,
                      }}>
                      <CheckBox
                        // disabled={this.state.togleUser[item.id_main]}
                        title={
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 20,
                              color: '#6f7d91',
                              marginLeft: 10,
                              width: '90%',
                            }}>
                            <Image
                              style={{width: 25, height: 15}}
                              source={{
                                uri: item.url,
                              }}
                            />{' '}
                            {I18n.locale === 'th' ? item.name_th : item.name}
                          </Text>
                        }
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        checkedIcon={
                          <Image
                            style={{width: 24, height: 24}}
                            source={require('../../image/rrr.png')}
                          />
                        }
                        uncheckedIcon={
                          <View
                            style={{
                              borderWidth: 1,
                              width: 24,
                              height: 24,
                              borderColor: '#999999',
                              borderRadius: 3.4,
                              backgroundColor: '#FFFFFF',
                            }}
                          />
                        }
                        checked={
                          this.state.ckAll === false
                            ? this.state.Selec[item.id_main]
                            : this.state.Selec[item.name]
                        }
                        onPress={() => {
                          // alert('Selecitem')

                          this.Selecitem({
                            item: item,
                            index: item.name,
                          });
                          this.setState({ckAll: true});
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item.name}
            />
            <TouchableOpacity
              onPress={() => {
                // this.setState({selectcontry: false});
                console.log(
                  JSON.stringify(this.state.selectidcontinentFilter1),
                );
                this.setState(
                  {
                    dataMarketData: [],
                    isListEnd: false,
                    loading: false,
                    fetching_from_server: false,
                    showTime: false,
                    closePopover: false,
                    selectcontry: false,
                  },
                  function() {
                    this.offset = 0;
                    this._getMarketData();
                  },
                );
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
                {I18n.t('transalte_Searchcontinents')}
              </Text>
            </TouchableOpacity>
          </Overlay>
        )}

        {this.state.searchproduct === true && (
          <Overlay
            backdropStyle={{backgroundColor: '#2d6dc480'}}
            overlayStyle={{
              top: height * 0.045,
              height: height * 0.7,
              width: width * 0.8,
              borderRadius: 8,
            }}
            isVisible={this.state.searchproduct}
            onBackdropPress={() => this.setState({searchproduct: false})}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#999999',
                borderRadius: 18,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                style={{width: 24, height: 24, top:  Platform.OS === 'ios' ? 6 : 14, marginHorizontal: 5}}
                source={require('../../image/searchbluex.png')}
              />
              <TextInput
                autoCorrect={true}
                defaultValue={this.state.Product}
                style={{
                  fontSize: 20,
                  height: Platform.OS === 'ios' ? 33 : 45,
                  width: '100%',
                  color: '#000000',
                  fontFamily: 'Kittithada Bold 75',
                }}
                placeholderTextColor="#dadada"
                placeholder={I18n.t('translate_Seach')}
                value={searchTermProduct}
                onChangeText={searchTermProduct => {
                  this.setState({searchTermProduct});
                }}
              />
            </View>
            <SearchableSectionList2
              sections={this.state.Product}
              searchTerm={searchTermProduct}
              searchAttribute={searchAttribute}
              searchByTitle={searchByTitle}
              ignoreCase={ignoreCase}
              renderSectionHeader={({section: {title}}) => (
                <>
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        backgroundColor: '#96b3cb20',
                        marginTop: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      },
                      this.state.togleUserProduct[title.id] && {
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                      },
                    ]}>
                    <CheckBox
                      title={
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 22,
                            color: '#20416e',
                            width: '100%',
                          }}>
                          {I18n.locale === 'th' ? title.nameth : title.nameen}
                        </Text>
                      }
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checkedIcon={
                        <Image
                          style={{width: 24, height: 24}}
                          source={require('../../image/rrr.png')}
                        />
                      }
                      uncheckedIcon={
                        <View
                          style={{
                            borderWidth: 1,
                            width: 24,
                            height: 24,
                            borderColor: '#999999',
                            borderRadius: 3.4,
                            backgroundColor: '#FFFFFF',
                          }}
                        />
                      }
                      checked={this.state.SelecProduct[title.nameen]}
                      onPress={() => {
                        this.SelecitemProduct({
                          item: title,
                          index: title.nameen,
                        });
                      }}
                    />
                  </View>
                </>
              )}
              renderItem={({item, index}) => (
                <View>
                  {item.status && this.state.togleUser[item.id_main] && (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        backgroundColor: '#96b3cb20',
                        borderTopColor: '#c1d0dc',
                        borderTopWidth: 1,
                      }}
                    />
                  )}
                </View>
              )}
              keyExtractor={item => item.name}
            />

            <TouchableOpacity
              onPress={() => {
                // this.setState({searchproduct: false});
                console.log(JSON.stringify(this.state.selectProductFilter1));

                this.setState(
                  {
                    dataMarketData: [],
                    isListEnd: false,
                    loading: false,
                    fetching_from_server: false,
                    showTime: false,
                    closePopover: false,
                    selectcontry: false,
                    searchproduct: false,
                  },
                  function() {
                    this.offset = 0;
                    this._getMarketData();
                  },
                );
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
                ค้นหาสินค้า
              </Text>
            </TouchableOpacity>
          </Overlay>
        )}
      </View>
    );
  }
}
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    color: '#c0c0c0',
    paddingHorizontal: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 2 : -3,
    paddingBottom: 5,
    height: 40,
  },
  inputAndroid: {
    height: 40,
    fontSize: 23,
    color: '#c0c0c0',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 70,
  },
});
const mapStateToProps = state => ({
  filterCounty: state.userReducer.filterCounty,
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketContry);
