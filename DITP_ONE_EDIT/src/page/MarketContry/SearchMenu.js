import React, {Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
  SectionList,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import {CheckBox} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import I18n from '../../utils/I18n';

import {
  getRegion,
  SeachRegion,
  product_cate,
  regisFilternoti,
} from '../../actions/data.actions';
import Style from './Style';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';

import {connect} from 'react-redux';
import DropdownMenu from 'react-native-dropdown-menu';
import {SearchableSectionList2} from '../../lib_edit/react-native-searchable-list/src';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { ViewScale } from '../../config/ViewScale';
import MonthSelectorCalendar from 'react-native-month-selector';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Chip} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

class SearchMenu extends React.Component {
  constructor() {
    AsyncStorage.getItem('language', (err, result) => {
      if (result == 'TH') {
        this.setState({language: 'TH'});
      } else {
        this.setState({language: 'EN'});
      }
    });
    const getDate = new Date();
    super();
    this.state = {
      Selec: [],
      Seleccon: [],
      SelecProduct: [],
      togleUser: [],
      togleUserProduct: [],
      selecStartDate: null,
      date: null,
      date2: null,
      check: false,
      SizebarModel: 500,
      PagebarModel: 1,
      disablemonth: getDate.getMonth(),
      disableday: getDate.getDate(),
      disableyear: getDate.getFullYear(),
      SeachCountry: '',
      SeachProducts: '',
      Continent: [],
      Product: [],
      Coutryname: '',
      selectedItems: [],
      // togleUser: null,
      // data: 0,
      Country: [],
      ViewCountry: false,
      searchTerm: '',
      searchTermProduct: '',
      searchAttribute: 'name',
      searchByTitle: false,
      ignoreCase: true,
      selectProductFilter: [],
      selectCountryFilter: [],
      selectcontinentFilter: [],
      selectidcontinentFilter: [],
      checkFocus: false,
      checkFocus1: false,
      ck: false,
    };
    this.arrayholder = [];
    this.onDateChange = this.onDateChange.bind(this);
  }
  Selecitem = ({index, item}) => {
    console.log('ประเทศ', index);
    let {Selec} = this.state;
    Selec[index] = !Selec[index];
    this.setState({Selec: Selec});
    console.log('ประเทศเลือก', Selec);
    if (Selec[index]) {
      console.log('1');
      this.setState({
        selectCountryFilter: [
          ...this.state.selectCountryFilter.filter(
            item2 => item2 !== item.name,
          ),
          item.name,
        ],
      });
    } else {
      console.log('2');
      this.setState({
        selectCountryFilter: [
          ...this.state.selectCountryFilter.filter(
            item2 => item2 !== item.name,
          ),
        ],
      });
    }
  };

  SelecitemHearderT = ({index, item}) => {
    console.log('ทวีป', index);
    let {Seleccon} = this.state;
    Seleccon[index] = !Seleccon[index];
    this.setState({Seleccon: Seleccon});

    if (Seleccon[index]) {
      this.setState({
        selectcontinentFilter: [
          ...this.state.selectcontinentFilter.filter(
            item2 => item2.title !== item.nameen,
          ),

          {id: item.continent_code, title: item.nameen, titleth: item.nameth},
        ],
      });
    } else {
      this.setState({
        selectcontinentFilter: [
          ...this.state.selectcontinentFilter.filter(
            item2 => item2.title !== item.nameen,
          ),
        ],
      });
    }
  };

  SelecitemProduct = ({index, item}) => {
    let {SelecProduct} = this.state;
    SelecProduct[index] = !SelecProduct[index];
    this.setState({SelecProduct: SelecProduct});

    if (SelecProduct[index]) {
      this.setState({
        selectProductFilter: [
          ...this.state.selectProductFilter.filter(item2 =>
            (item2 !== I18n.locale) === 'th' ? item.nameth : item.nameen,
          ),
          I18n.locale === 'th' ? item.nameth : item.nameen,
        ],
      });
    } else {
      this.setState({
        selectProductFilter: [
          ...this.state.selectProductFilter.filter(item2 =>
            (item2 !== I18n.locale) === 'th' ? item.nameth : item.nameen,
          ),
        ],
      });
    }
  };

  SelecitemHead = ({index, item}) => {
    let {togleUser} = this.state;
    console.log(togleUser);
    togleUser[index] = !togleUser[index];
    this.setState({togleUser: togleUser});
  };

  SelecitemHeadProduct = ({index, item}) => {
    let {togleUserProduct} = this.state;
    togleUserProduct[index] = !togleUserProduct[index];
    this.setState({togleUserProduct: togleUserProduct});
  };

  onDateChange = () => {
    this.setState({
      selectedStartDate: this.state.selecStartDate,
    });
  };

  checkmonth = () => {
    if (this.state.disablemonth + 1 < 10) {
      return '0' + (this.state.disablemonth + 1);
    } else if (this.state.disablemonth + 1 >= 10) {
      return this.state.disablemonth + 1;
    }
  };

  _getSeachCountry = async value => {
    try {
      const response = await this.props.dispatch(getRegion());

      if (response.res_code === '00') {
        this.setState({Continent: response.res_results});
      }
    } catch (error) {}
  };

  _getSeachProduct = async value => {
    try {
      const response = await this.props.dispatch(product_cate());

      if (response.res_code === '00') {
        this.setState({Product: response.res_results});
      }
    } catch (error) {}
  };

  componentDidUpdate = prevProps => {
    // console.log(prevProps.filterCounty.data.checksech);
    if (prevProps?.filterCounty?.data?.checksech != null) {
      if (!prevProps?.filterCounty?.data?.checksech) {
        let copy1 = [];
        let copy2 = [];
        let copy3 = [];

        if (this.props.filterCounty.data != null) {
          this.props.filterCounty.data.selectCountryFilter.map(data => {
            this.state.Selec[data] = true;
            copy1.push(data);
          });

          this.setState({
            selectCountryFilter: copy1,
          });
          this.props.filterCounty.data.selectProductFilter.map(data => {
            this.state.SelecProduct[data] = true;
            copy2.push(data);
          });
          this.setState({
            selectProductFilter: copy2,
          });

          this.props.filterCounty.data.selectcontinentFilter.map(data => {
            console.log('component', data);
            this.state.Seleccon[data] = true;
            copy3.push(data);
          });
          this.setState({
            selectcontinentFilter: copy3,
          });

          this.setState({
            check: this.props.filterCounty.data.checksech,
          });
        }
        prevProps.filterCounty.data.checksech = true;
      }
    }
    // if(this.state.ck === false){
    //    this._getSeachCountry();
    // this._getSeachProduct();

    // }
    console.log('xx11');
    //  alert("UPdate PLZ")
    // this._getSeachCountry();
    // this._getSeachProduct();
  };
  componentWillUpdate() {
    console.log('xx22');
    // this.setState({ck:true})
    // alert("UPdate PLZDDDD")
    // this._getSeachCountry();
    // this._getSeachProduct();
  }

  componentDidMount() {
    // alert("LLLLLLl")
    console.log('xx33');
    // console.log("UPdate PLZ")
    // this.focusListener = this.props.navigation.addListener('focus', () => {
    this._getSeachCountry();
    this._getSeachProduct();
    let copy1 = [];
    let copy2 = [];
    let copy3 = [];

    if (this.props.filterCounty.data != null) {
      this.props.filterCounty.data.selectCountryFilter.map(data => {
        this.state.Selec[data] = true;
        copy1.push(data);
      });

      this.setState({
        selectCountryFilter: copy1,
      });
      this.props.filterCounty.data.selectProductFilter.map(data => {
        this.state.SelecProduct[data] = true;
        copy2.push(data);
      });
      this.setState({
        selectProductFilter: copy2,
      });

      this.props.filterCounty.data.selectcontinentFilter.map(data => {
        console.log('component', data);
        this.state.Seleccon[data] = true;
        copy3.push(data);
      });
      this.setState({
        selectcontinentFilter: copy3,
      });

      this.setState({
        check: this.props.filterCounty.data.checksech,
      });
    }

    // });

    // this.focusListener = this.props.navigation.addListener('focus', () => {
    //   setTimeout(() => {
    //     // this._getSeachCountry();
    //     // this._getSeachProduct();
    //   }, 1000);

    //   //Put your Data loading function here instead of my this.loadData()
    // });
  }
  // static DrawerRe = () => {
  //   if (this.state.searchTerm != '' || this.state.searchTermProduct != '') {
  //     this.setState({searchTerm: ''});
  //     this.setState({searchTermProduct: ''});
  //   } else {
  //   }
  // };

  componentWillReceiveProps() {
    this.setState({searchTerm: ''});
    this.setState({searchTermProduct: ''});
  }

  BarCalendar = () => {
    const minDate = new Date(); // Today
    const maxDate = new Date(2000, 1, 1);
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={{flex: 0.8}}>
          <CalendarPicker
            minDate={maxDate}
            maxDate={minDate}
            previousTitle="<"
            previousTitleStyle={{color: '#9b9b9b', fontSize: ViewScale(20)}}
            nextTitle=">"
            nextTitleStyle={{color: '#9b9b9b', fontSize: ViewScale(20)}}
            selectedDayColor={'#2d6dc4'}
            selectedDayTextColor={'#fff'}
            selectedStartDate={this.state.selecStartDate}
            textStyle={{color: '#000', fontSize: ViewScale(20)}}
            onDateChange={value => {
              setTimeout(() => {
                this.setState({selecStartDate: value});
              }, 200);
            }}
          />
        </View>
        <View
          style={{
            width: '80%',
            flex: 0.1,
            justifyContent: 'center',
            marginTop: ViewScale(20),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#2d6dc4',
              justifyContent: 'center',
              height: '100%',
              width: '80%',

              alignSelf: 'center',
              borderRadius: ViewScale(50),
              alignItems: 'center',
            }}
            onPress={async () => {
              setTimeout(() => {
                this.setState({
                  date: Moment(this.state.selecStartDate).format('DD/MM/YYYY'),
                });
                this.setState({
                  date2: Moment(this.state.selecStartDate).format('YYYY-MM-DD'),
                });
                this.RBSheet.close();
              }, 100);
            }}>
            <Text style={{color: '#FFFFFF', fontSize: ViewScale(25)}}>
              {I18n.t('translate_Accept')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '80%',
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: ViewScale(20),
            marginTop: ViewScale(10),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f96145',
              height: '100%',
              width: '80%',
              alignSelf: 'center',
              borderRadius: ViewScale(50),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.RBSheet.close()}>
            <Text style={{color: '#FFFFFF', fontSize: ViewScale(25)}}>
              {I18n.t('translate_Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  BarCalendarMY = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.8, marginBottom: ViewScale(20)}}>
          <MonthSelectorCalendar
            containerStyle={{bottom: ViewScale(20)}}
            maxDate={Moment('01-01-3000', 'DD-MM-YYYY')}
            minDate={Moment('01-01-2000', 'DD-MM-YYYY')}
            prevIcon={<Icon1 name="left" size={ViewScale(20)} />}
            nextIcon={<Icon1 name="right" size={ViewScale(20)} />}
            localeLanguage="en"
            yearTextStyle={{color: '#000', fontSize: ViewScale(20)}}
            selectedMonthTextStyle={{color: '#FFF', fontSize: ViewScale(20)}}
            monthTextStyle={{color: '#000', fontSize: ViewScale(20)}}
            selectedBackgroundColor={'#2d6dc4'}
            selectedDate={this.state.month}
            onMonthTapped={value => {
              setTimeout(() => {
                this.setState({month: value, ddmmyyy: value});
              }, 200);
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
                      'JAN',
                      'FEB',
                      'MAR',
                      'APR',
                      'MAY',
                      'JUN',
                      'JUL',
                      'AUG',
                      'SEP',
                      'OCT',
                      'NOV',
                      'DEC',
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
            marginTop: ViewScale(20),
            borderRadius: ViewScale(50),
            backgroundColor: '#2d6dc4',
          }}
          onPress={async () => {
            setTimeout(() => {
              this.setState({
                date: Moment(this.state.month).format('MM/YYYY'),
              });
              this.setState({
                date2: Moment(this.state.month).format('YYYY-MM'),
              });
              this.RBSheet.close();
            }, 100);
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: ViewScale(25),
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
            marginBottom: ViewScale(20),
            marginTop: ViewScale(10),
            borderRadius: ViewScale(50),
            backgroundColor: '#f96145',
          }}
          onPress={() => this.RBSheet.close()}>
          <Text
            style={{
              color: '#fff',
              fontSize: ViewScale(25),
            }}>
            {I18n.t('translate_Cancel')}
          </Text>
        </TouchableOpacity>
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        contentContainerStyle={Style.flex1}
        style={Style.flex1}>
        <Header
          placement="left"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.props.navigation.closeDrawer();
              }}>
              <View style={Style.ViewTabClose}>
                <Image
                  style={{width: ViewScale(15), height: ViewScale(13)}}
                  source={require('../../image/TapSearcOne.png')}
                />
              </View>
            </TouchableOpacity>
          }
          centerComponent={
            <View>
              <Text style={Style.textHearder}>
                {I18n.t('translate_Fine_filter')}
              </Text>
            </View>
          }
          containerStyle={Style.containerSearch}
        />
        <ScrollView>
          <View style={Style.ViewSubSearch1}>
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
              {this.BarCalendarMY()}
            </RBSheet> */}
            {/* <View>
              <View style={{marginBottom: 10}}>
                <Text style={Style.textYear}>
                  {I18n.t('transalte_dataMMYYYY')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setTimeout(() => {
                    this.RBSheet.open();
                    this.BarCalendarMY();
                  }, 10)
                }>
                {this.state.date ? (
                  <View style={Style.ViewSearYear2}>
                    <View style={Style.ViewIconYear}>
                      <Icon name="calendar-month" size={22} color={'#2d6dc4'} />
                    </View>

                    <Text style={Style.textInputYear2}>{this.state.date}</Text>
                  </View>
                ) : (
                  <View style={Style.ViewSearYear}>
                    <View style={Style.ViewIconYear}>
                      <Icon name="calendar-month" size={22} color={'#dadada'} />
                    </View>
                    <Text style={Style.textInputYear}>
                      {I18n.t('transalte_dataMMYYYY')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View> */}

            {/* <View style={Style.ViewLine}>
              <Image
                style={{width: 275}}
                source={require('../../image/lineSearch2.png')}
              />
            </View> */}

            {/*Seach */}
            <View style={Style.ViewCountry}>
              <View style={{marginBottom: ViewScale(-10)}}>
                <Text style={Style.TextCountry}>
                  {I18n.t('translate_COUNTRY')}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: ViewScale(15),
                }}>
                <Text>{''}</Text>
              </View>

              {/* <View
                style={{
                  marginBottom: 15,
                }}>
                {this.state.selectcontinentFilter.map(data => (
                  <View
                    style={{
                      backgroundColor: '#e7edf2',
                      paddingVertical: 8,
                      paddingLeft: 15,
                      borderRadius: 20,
                      marginVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                   
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#40536d',
                      }}>
                      {data.title}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        this.state.Seleccon[data.title] = false;
                        this.setState({
                          selectcontinentFilter: [
                            ...this.state.selectcontinentFilter.filter(
                              item2 => item2.title !== data.title,
                            ),
                          ],
                        });
                      }}
                      style={{paddingLeft: 20, paddingRight: 15}}>
                      <Icon3 name={'close'} size={17} color="#2d6dc4" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View> */}

              <View
                style={
                  this.arrayholder === null
                    ? Style.ViewSubSearch2
                    : Style.ViewSubSearch8
                }>
                <View style={Style.ViewSubSearch3}>
                  <Image
                    style={{width: ViewScale(15), height: ViewScale(15)}}
                    source={
                      this.arrayholder === null
                        ? require('../../image/searchtabtab.png')
                        : require('../../image/unsearch.png')
                    }
                  />
                </View>

                <View
                  style={{
                    marginLeft: ViewScale(10),
                    width: '77%',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      autoCorrect={true}
                      defaultValue={this.state.Coutryname}
                      style={{
                        fontSize: ViewScale(22),
                        padding: 0,
                        width: '100%',
                        color: '#000000',
                      }}
                      placeholderTextColor="#dadada"
                      placeholder={I18n.t('translate_Seach')}
                      value={searchTerm}
                      onChangeText={searchTerm => {
                        console.log('okok', searchTerm);
                        this.setState({searchTerm});
                      }}
                      // onBlur={tt =>{
                      //   console.log('CHeckTrue2');
                      //   this.setState({checkFocus: false})
                      // }}

                      onFocus={text => {
                        console.log('CHeckTrue3');
                        this.setState({checkFocus: true, checkFocus1: false});
                      }}
                    />
                    {/* {searchTerm != '' && (
                      <TouchableOpacity
                        hitSlop={{left: 50}}
                        onPress={() => this.setState({searchTerm: ''})}>
                        <Icon4 name="x" size={20} color="#2d6dc4" />
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
              </View>
              {/* {console.log(this.state.Continent)} */}
              {/* {this.state.searchTerm != 'nnmn' && ( */}
              {this.state.checkFocus === false || (
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
                          backgroundColor: '#96b3cb20',
                          marginTop: ViewScale(10),
                          borderTopLeftRadius: ViewScale(10),
                          borderTopRightRadius: ViewScale(10),
                        },
                        this.state.togleUser[title.id] && {
                          borderBottomRightRadius: ViewScale(10),
                          borderBottomLeftRadius: ViewScale(10),
                        },
                      ]}>
                      <CheckBox
                        title={
                          <Text
                            style={{
                              marginLeft: ViewScale(10),
                              fontSize: ViewScale(22),
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
                            style={{width: ViewScale(15), height: ViewScale(15)}}
                            source={require('../../image/checkNotiTrue.png')}
                          />
                        }
                        uncheckedIcon={
                          <Image
                            style={{width: ViewScale(15), height: ViewScale(15)}}
                            source={require('../../image/checkNotiFalse.png')}
                          />
                        }
                        checked={this.state.Seleccon[title.nameen]}
                        onPress={() => {
                          this.SelecitemHearderT({
                            item: title,
                            index: title.nameen,
                          });
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: ViewScale(20),
                          fontSize: ViewScale(22),
                          color: '#20416e',
                          width: '80%',
                          height: ViewScale(40),
                          marginTop: ViewScale(10),
                        }}>
                        {title.nameen}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: ViewScale(20),
                          paddingLeft: ViewScale(50),
                          position: 'absolute',
                          top: ViewScale(-5),
                          right: ViewScale(0),
                        }}
                        onPress={() => {
                          this.SelecitemHead({item: title, index: title.id});
                        }}>
                        <Icon3
                          name={
                            this.state.togleUser[title.id]
                              ? 'upcircleo'
                              : 'downcircleo'
                          }
                          size={ViewScale(25)}
                          color="#000"
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
                            paddingHorizontal: ViewScale(15),
                            backgroundColor: '#96b3cb20',
                            borderTopColor: '#c1d0dc',
                            borderTopWidth: 1,
                          }}>
                          <CheckBox
                            title={
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: ViewScale(20),
                                  color: '#6f7d91',
                                  marginLeft: ViewScale(10),
                                  width: '90%',
                                }}>
                                <Image
                                  style={{width: ViewScale(25), height: ViewScale(15)}}
                                  source={{
                                    uri: item.url,
                                  }}
                                />{' '}
                                {I18n.locale === 'th'
                                  ? item.name_th
                                  : item.name}
                              </Text>
                            }
                            containerStyle={{
                              backgroundColor: 'transparent',
                              borderWidth: 0,
                            }}
                            checkedIcon={
                              <Image
                                style={{width: ViewScale(15), height: ViewScale(15)}}
                                source={require('../../image/checkNotiTrue.png')}
                              />
                            }
                            uncheckedIcon={
                              <Image
                                style={{width: ViewScale(15), height: ViewScale(15)}}
                                source={require('../../image/checkNotiFalse.png')}
                              />
                            }
                            checked={this.state.Selec[item.name]}
                            onPress={() => {
                              // alert('llll')
                              this.Selecitem({
                                item: item,
                                index: item.name,
                              });
                            }}
                          />
                        </View>
                      )}
                    </View>
                  )}
                  keyExtractor={item => item.name}
                />
              )}

              <View style={Style.ViewLine}>
                <Image
                  style={{width: ViewScale(275)}}
                  source={require('../../image/lineSearch2.png')}
                />
              </View>

              <View style={{marginBottom: ViewScale(0)}}>
                <View style={{marginTop: ViewScale(10), marginBottom: ViewScale(0)}}>
                  <Text style={Style.TextProducts}>
                    {I18n.t('translate_goods')}
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: ViewScale(15),
                  }}
                />
                <View
                  style={
                    this.state.SeachProducts
                      ? Style.ViewSubSearch2
                      : Style.ViewSubSearch8
                  }>
                  <View style={Style.ViewSubSearch3}>
                    <Image
                      style={{width: ViewScale(15), height: ViewScale(15)}}
                      source={
                        this.state.SeachProducts
                          ? require('../../image/searchtabtab.png')
                          : require('../../image/unsearch.png')
                      }
                    />
                  </View>
                  <View style={{marginLeft: ViewScale(10), width: '77%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        defaultValue={this.state.Coutryname}
                        style={{
                          fontSize: ViewScale(22),
                          padding: 0,
                          width: '100%',
                          color: '#000000',
                        }}
                        placeholderTextColor="#dadada"
                        placeholder={I18n.t('translate_Seach')}
                        value={searchTermProduct}
                        onChangeText={searchTermProduct => {
                          this.setState({searchTermProduct});
                        }}
                        onBlur={tt => {
                          console.log('CHeckTrue2');
                          this.setState({checkFocus: false});
                        }}
                        onFocus={text => {
                          console.log('CHeckTrue3');
                          this.setState({
                            checkFocus: false,
                            checkFocus1: true,
                          });
                        }}
                      />
                      {/* {searchTermProduct != '' && (
                        <TouchableOpacity
                          hitSlop={{left: 50}}
                          onPress={() =>
                            this.setState({searchTermProduct: ''})
                          }>
                          <Icon4 name="x" size={20} color="#2d6dc4" />
                        </TouchableOpacity>
                      )} */}
                    </View>
                  </View>
                  {/* {console.log(this.state.searchTermProduct)} this.state.searchTermProduct != '' &&   */}
                </View>
              </View>
            </View>
            {this.state.checkFocus1 === false || (
              <SearchableSectionList2
                sections={this.state.Product}
                searchTerm={searchTermProduct}
                searchAttribute={searchAttribute}
                searchByTitle={searchByTitle}
                ignoreCase={ignoreCase}
                renderSectionHeader={({section: {title}}) => (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        backgroundColor: '#96b3cb20',
                        marginTop: ViewScale(10),
                        borderTopLeftRadius: ViewScale(10),
                        borderTopRightRadius: ViewScale(10),
                      },
                      this.state.togleUserProduct[title.id] && {
                        borderBottomRightRadius: ViewScale(10),
                        borderBottomLeftRadius: ViewScale(10),
                      },
                    ]}>
                    <CheckBox
                      title={
                        <Text
                          numberOfLines={1}
                          style={{
                            marginLeft: ViewScale(10),
                            fontSize: ViewScale(22),
                            color: '#20416e',
                            width: '80%',
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
                          style={{width: ViewScale(15), height: ViewScale(15)}}
                          source={require('../../image/checkNotiTrue.png')}
                        />
                      }
                      uncheckedIcon={
                        <Image
                          style={{width: ViewScale(15), height: ViewScale(15)}}
                          source={require('../../image/checkNotiFalse.png')}
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
                )}
                renderItem={({item, index}) => <View />}
                keyExtractor={item => item.nameen}
              />
            )}
            <View style={{marginBottom: ViewScale(0)}}>
              <View style={{marginTop: ViewScale(10), marginBottom: ViewScale(0)}}>
                <Text style={Style.TextProducts}>
                  {I18n.t('transalte_marketofinterest')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {this.state.selectcontinentFilter.map(data => (
                <View>
                  <Chip
                    onPress={() => {
                      this.state.Seleccon[data.title] = false;
                      this.setState({
                        selectcontinentFilter: [
                          ...this.state.selectcontinentFilter.filter(
                            item2 => item2.title !== data.title,
                          ),
                        ],
                      });
                    }}
                    style={{backgroundColor: '#e7edf2', margin: ViewScale(4)}}>
                    <Text
                      style={{
                        color: '#20416e',
                        fontSize: ViewScale(18),
                        textAlign: 'center',
                      }}>
                      {I18n.locale === 'th' ? data.titleth : data.title}
                      {'  '}
                    </Text>
                    <Icon1
                      name="closecircle"
                      size={ViewScale(18)}
                      style={{color: '#7C7C7C', marginTop: ViewScale(6)}}
                    />
                  </Chip>
                </View>
              ))}

              {this.state.selectCountryFilter.map(data => (
                <View>
                  <Chip
                    onPress={() => {
                      this.state.Selec[data] = false;
                      this.setState({
                        selectCountryFilter: [
                          ...this.state.selectCountryFilter.filter(
                            item2 => item2 !== data,
                          ),
                        ],
                      });
                      console.log('ประเทศ', this.state.Selec[data]);
                    }}
                    style={{backgroundColor: '#e7edf2', margin: ViewScale(4)}}>
                    <Text
                      style={{
                        color: '#20416e',
                        fontSize: ViewScale(18),
                        textAlign: 'center',
                      }}>
                      {data}
                      {'  '}
                    </Text>
                    <Icon1
                      name="closecircle"
                      size={ViewScale(18)}
                      style={{color: '#7C7C7C', marginTop: ViewScale(6)}}
                    />
                  </Chip>
                </View>
              ))}

              {this.state.selectProductFilter.map(data => (
                <Chip
                  onPress={() => {
                    this.state.SelecProduct[data] = false;
                    this.setState({
                      selectProductFilter: [
                        ...this.state.selectProductFilter.filter(
                          item2 => item2 !== data,
                        ),
                      ],
                    });
                  }}
                  style={{backgroundColor: '#e7edf2', margin: ViewScale(4)}}>
                  <Text style={{color: '#20416e', fontSize: ViewScale(18)}}>{data} </Text>
                  <Icon1
                    name="closecircle"
                    size={ViewScale(18)}
                    style={{color: '#7C7C7C', marginTop: ViewScale(6)}}
                  />
                </Chip>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={Style.ViewSubSearch4}>
          {/* <CheckBox
            checked={this.state.check}
            checkedIcon={
              <Image
                style={{width: 18, height: 18}}
                source={require('../../image/checkSearch.png')}
              />
            }
            uncheckedIcon={
              <Image
                style={{width: 18, height: 18}}
                source={require('../../image/unchecksearch.png')}
              />
            }
            containerStyle={Style.containerCheck}
            title={
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#20416e',
                  }}>
                  {'  '}
                  {I18n.t('translate_SaveCconnect')}
                </Text>
              </View>
            }
            onPress={() => this.setState({check: !this.state.check})}
          /> */}

          <View
            style={[
              Style.ViewSubSearch5,
              {width: '100%', justifyContent: 'flex-end'},
            ]}>
            {/* <TouchableOpacity
              style={Style.TouchDelete}
              onPress={() => {
                setTimeout(() => {
                  this.setState({
                    date: null,
                    selectCountryFilter: [],
                    selectProductFilter: [],
                    selectcontinentFilter: [],
                    selectidcontinentFilter: [],
                    Selec: [],
                    SelecProduct: [],
                    searchTerm: '',
                    searchTermProduct: '',
                    date2: null,
                    check: false,
                  });
                }, 200);
              }}>
              <Text style={Style.TextTouchDelete}>
                {I18n.t('translate_Clean')}
              </Text>
            </TouchableOpacity> */}
            <LinearGradient
              colors={['#f55959', '#e82d2d']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={Style.TouchDelete}
              // style={{
              //   flex: 1,
              //   // paddingLeft: 15,
              //   // paddingRight: 15,
              //   borderRadius: 22,
              // }}
            >
              <TouchableOpacity
                style={Style.TouchDelete}
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      date: null,
                      selectCountryFilter: [],
                      selectProductFilter: [],
                      selectcontinentFilter: [],
                      selectidcontinentFilter: [],
                      Selec: [],
                      SelecProduct: [],
                      searchTerm: '',
                      searchTermProduct: '',
                      date2: null,
                      check: false,
                    });
                  }, 200);
                }}>
                <Text style={Style.TextTouchDelete}>
                  {I18n.t('translate_Clean')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#2d6dc4', '#59a6e4']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              style={Style.TouchAccept}
              // style={{
              //   flex: 1,
              //   // paddingLeft: 15,
              //   // paddingRight: 15,
              //   borderRadius: 22,
              // }}
            >
              <TouchableOpacity
                onPress={() => {
                  // if (this.state.check) {
                  console.log('GOGOGO', this.state.date2);
                  this.props.dispatch({
                    type: 'GET_REGION_SUCCESS',
                    payload: {
                      selectcontinentFilter: this.state.selectcontinentFilter,
                      selectCountryFilter: this.state.selectCountryFilter,
                      selectProductFilter: this.state.selectProductFilter,
                      selectidcontinentFilter: this.state
                        .selectidcontinentFilter,
                      dateSech: this.state.date2,
                      checksech: this.state.check,
                    },
                  });

                  console.log({
                    selectCountryFilter: this.state.selectCountryFilter,
                    selectProductFilter: this.state.selectProductFilter,
                    selectcontinentFilter: this.state.selectcontinentFilter,
                    dateSech: this.state.date2,
                    checksech: this.state.check,
                  });

                  this.props.dispatch(
                    regisFilternoti({
                      sso_id:
                        this.props.getUser.userDetails.res_result.type != 6
                          ? this.props.getUser.userDetails.res_result.ssoid
                          : this.props.getUser.userDetails.res_result.id,
                      countrie: JSON.stringify(this.state.selectCountryFilter),
                      product: JSON.stringify(this.state.selectProductFilter),
                      continent: JSON.stringify(
                        this.state.selectcontinentFilter.map(data => data.id),
                      ),
                    }),
                  );
                  console.log('TEST', {
                    sso_id:
                      this.props.getUser.userDetails.res_result.type != 6
                        ? this.props.getUser.userDetails.res_result.ssoid
                        : this.props.getUser.userDetails.res_result.id,
                    countrie: this.state.selectCountryFilter,
                    product: this.state.selectProductFilter,
                  });
                  // }

                  // console.log(this.state.check);
                  this.props.navigation.closeDrawer();
                  // setTimeout(() => {
                  //   this.props.navigation.jumpTo('MarketContry', {
                  //     dateSech: this.state.date,
                  //     // selectCountryFilter: this.state.selectCountryFilter,
                  //     // selectProductFilter: this.state.selectProductFilter,
                  //   });
                  // }, 200);
                }}>
                <Text style={Style.TextTouchAccept}>
                  {I18n.t('translate_Aceept')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  filterCounty: state.userReducer.filterCounty,
  getUser: state.userReducer.getUser,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchMenu);
