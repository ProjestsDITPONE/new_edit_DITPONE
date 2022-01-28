import React, {Fragment} from 'react';
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
} from 'react-native';
import {Header, Overlay} from 'react-native-elements';

import Icon2 from 'react-native-vector-icons/Octicons';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import I18n from '../../utils/I18n';
import {
  getRegion,
  SeachRegion,
  product_cate,
  regisFilternoti,
} from '../../actions/data.actions';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  backgroundColor,
  color,
} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Style from './Style';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';

import {connect} from 'react-redux';
import DropdownMenu from 'react-native-dropdown-menu';
import {SearchableSectionList2} from 'react-native-searchable-list';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import Popover from 'react-native-popover-view';
import MonthSelectorCalendar from 'react-native-month-selector';
import Icon1 from 'react-native-vector-icons/AntDesign';
// import I18n from '../utils/I18n';

import LinearGradient from 'react-native-linear-gradient';

import {Chip} from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const width1 = Dimensions.get('screen').width;

const getDate = new Date();

class NewSettingContry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: null,
      cancle: null,
      Icon: null,
      text: '',
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
      checkFocus2: false,
      datatest: [],
    };
    this.arrayholder = [];
    // this.onDateChange = this.onDateChange.bind(this);
  }

  // Selecitem = ({index, item}) => {
  //   console.log('ประเทศกล', index);
  //   let {Selec, ckAll} = this.state;
  //   Selec[index] = !Selec[index];
  //   this.setState({Selec: Selec});
  //   console.log('ประเทศเลือก1', Selec);
  //   console.log('ประเทศเลือก2', Selec[index], item);
  //   if (this.state.Seleccon === true) {
  //     this.setState({Selec: true});
  //   } else {
  //     if (ckAll === false) {
  //       if (Selec[index]) {
  //         console.log('1');
  //         this.setState({
  //           selectCountryFilter: [
  //             ...this.state.selectCountryFilter.filter(
  //               item2 => item2 !== item.id_main,
  //             ),
  //             item.id_main,
  //           ],
  //         });
  //       } else {
  //         console.log('2');
  //         this.setState({
  //           selectCountryFilter: [
  //             ...this.state.selectCountryFilter.filter(
  //               item2 => item2 !== item.name,
  //             ),
  //           ],
  //         });
  //       }
  //     } else if (ckAll === true) {
  //       if (Selec[index]) {
  //         console.log('3');
  //         this.setState({
  //           selectCountryFilter: [
  //             ...this.state.selectCountryFilter.filter(
  //               item2 => item2 !== item.name,
  //             ),
  //             item.name,
  //           ],
  //         });
  //       } else {
  //         console.log('4');
  //         this.setState({
  //           selectCountryFilter: [
  //             ...this.state.selectCountryFilter.filter(
  //               item2 => item2 !== item.name,
  //             ),
  //           ],
  //         });
  //       }
  //     }
  //   }
  // };

  Selecitem = ({index, item}) => {
    // console.log('ประเทศ', index);
    let {Selec} = this.state;
    Selec[index] = !Selec[index];
    this.setState({Selec: Selec});
    // console.log('ประเทศเลือก', Selec);
    if (Selec[index]) {
      console.log('1');
      this.setState({
        selectCountryFilter: [
          ...this.state.selectCountryFilter.filter(
            item2 => item2 !== I18n.locale==='th'?item.name_th: item.name,
          ),
          I18n.locale==='th'?item.name_th: item.name,
        ],
      });
    } else {
      console.log('2');
      this.setState({
        selectCountryFilter: [
          ...this.state.selectCountryFilter.filter(
            item2 => item2 !== I18n.locale==='th'?item.name_th: item.name,
          ),
        ],
      });
    }
  };

  SelecitemHearderT = ({index, item}) => {
    // console.log('ทวีปTT' + index, item);
    let {Seleccon, Selec, datatest} = this.state;
    Seleccon[index] = !Seleccon[index];
    this.setState({Seleccon: Seleccon, cccc: Seleccon[index], ckAll: false});

    // this.Selecitem({index: item.id, item: index,});

    // console.log('ทวีปUU', item.continent_code, Seleccon[index], item);
    if (Seleccon[index]) {
      this.setState({
        selectcontinentFilter: [
          ...this.state.selectcontinentFilter.filter(
            item2 => item2.title !== item.nameen,
          ),

          {id: item.continent_code, title: item.nameen ,titleth: item.nameth},
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
          ...this.state.selectProductFilter.filter(
            item2 => item2 !== I18n.locale==='th'? item.nameth: item.nameen,
          ),
          I18n.locale==='th'? item.nameth: item.nameen
        ],
      });
    } else {
      this.setState({
        selectProductFilter: [
          ...this.state.selectProductFilter.filter(
            item2 => item2 !== I18n.locale==='th'? item.nameth: item.nameen,
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
  SelecitemHead = ({index, item}) => {
    let {togleUser} = this.state;
    // console.log('togleUser' + togleUser);
    togleUser[index] = !togleUser[index];
    this.setState({togleUser: togleUser});
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
        // console.log('SDFSDFresponse.res_results',JSON.stringify(response.res_results) );
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
  componentDidMount() {
    this._getSeachCountry();
    this._getSeachProduct();

    let copy1 = [];
    let copy2 = [];
    let copy3 = [];

    // console.log(this.props.filterCounty.data);

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
        // console.log('component', data);
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
  }
  componentWillReceiveProps() {
    this.setState({searchTerm: ''});
    this.setState({searchTermProduct: ''});
  }

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
        <ScrollView style={{marginBottom: 20}}>
          <View
            style={{
              // width: width,
              flex: 1,
              //   backgroundColor:'red',
              //   zIndex:10
              // paddingHorizontal: 45,
            }}>
            <View style={[Style.ViewLine, {}]}>
              <View style={{marginBottom: 10}}>
                {/* <Text style={[Style.TextCountry]}>
                  {I18n.t('translate_Mybas')}
                </Text> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {this.state.selectcontinentFilter.map(data => (
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
                  style={{backgroundColor: '#e7edf2', marginHorizontal: 2,marginBottom:5}}>
                  <Text style={{color: '#20416e', fontSize: 18}}>
                    {I18n.locale ==='th'? data.titleth : data.title} {'  '}
                  </Text>
                  <Icon1
                    name="closecircle"
                    size={18}
                    style={{color: '#7C7C7C', marginTop: 6}}
                  />
                </Chip>
              ))}

              {this.state.selectCountryFilter.map(data => (
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
                  }}
                  style={{backgroundColor: '#e7edf2', marginHorizontal: 2,marginBottom:5}}>
                  <Text style={{color: '#20416e', fontSize: 18}}>
                    {data} {'  '}{' '}
                  </Text>
                  <Icon1
                    name="closecircle"
                    size={18}
                    style={{color: '#7C7C7C', marginTop: 6}}
                  />
                </Chip>
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
                  style={{backgroundColor: '#e7edf2', marginHorizontal: 2,marginBottom:5}}>
                  <Text style={{color: '#20416e', fontSize: 18}}>
                    {data} {'  '}{' '}
                  </Text>
                  <Icon1
                    name="closecircle"
                    size={18}
                    style={{color: '#7C7C7C', marginTop: 6}}
                  />
                </Chip>
              ))}
            </View>

            {this.state.selectcontinentFilter.length === 0 &&
              this.state.selectCountryFilter.length === 0 &&
              this.state.selectProductFilter.length === 0 && (
                <View>
                  <Text
                    style={{
                      color: '#f96145',
                      fontSize: 20,
                      marginBottom: 15,
                      textAlign: 'center',
                    }}>
               
                    {I18n.t('transalte_ProductPLZ')}
                  </Text>
                </View>
              )}

            <View
              style={{
                borderColor: '#c1d0dc',
                borderWidth: 0.5,
                flex: 1,
                height: 0.2,
              }}
            />

            <View style={{paddingHorizontal: '13%', marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={Style.TextCountry}>
                  {I18n.t('translate_COUNTRY')}
                </Text>
              </View>
              <View
                style={
                  this.state.checkFocus1 === true
                    ? Style.ViewSubSearch22
                    : Style.ViewSubSearch88
                }>
                <View
                  style={{
                    marginTop: 8,
                    marginLeft: 15,
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    style={{width: 15, height: 15, marginTop: -2}}
                    source={require('../../image/searchtabtab.png')}
                  />
                  <View style={{marginLeft: 25, width: '100%', marginTop: -21}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',

                        width: 200,
                        height: 25,
                      }}
                      onPress={() => {
                        this.setState({
                          // checkFocus: false,
                          checkFocus1: true,
                        });
                      }}>
                      <Text style={{color: '#999999', fontSize: 20}}>
                        {I18n.t('translate_Seachcontry')}
                      </Text>

                      {searchTerm != '' && (
                        <TouchableOpacity
                          hitSlop={{left: 50}}
                          onPress={() => this.setState({searchTerm: ''})}>
                          {/* <Icon4
                            name="x"
                            size={20}
                            color="#2d6dc4"
                            style={{marginTop: 2}}
                          /> */}
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {this.state.checkFocus1 == true && (
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
                isVisible={this.state.checkFocus1}
                onBackdropPress={() => this.setState({checkFocus1: false})}>
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
                    style={{width: 24, height: 24, top:Platform.OS === 'ios'?6:14, marginHorizontal: 5}}
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
                               {I18n.locale === 'th'? title.nameth:title.nameen}
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
                        {I18n.locale === 'th'? title.name_th:title.name}
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
                              {I18n.locale === 'th'? item.name_th:item.name}
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
                    this.setState({checkFocus1: false});
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
                    {I18n.locale ==='th'? 'บันทึก':'save'}
                  </Text>
                </TouchableOpacity>
              </Overlay>
            )}

            <View style={{paddingHorizontal: 25}}>
              {/* <Image
                style={{width: 275}}
                source={require('../../image/lineSearch2.png')}
              /> */}
            </View>

            <View style={{paddingHorizontal: '13%', marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={Style.TextCountry}>
                  {' '}
                  {I18n.t('translate_PRODUCTS')}
                </Text>
              </View>
              <View style={Style.ViewSubSearch88}>
                <View
                  style={{
                    marginTop: 8,
                    marginLeft: 15,
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    style={{width: 15, height: 15, marginTop: -2}}
                    source={require('../../image/searchtabtab.png')}
                  />
                  <View style={{marginLeft: 25, width: '80%', marginTop: -21}}>
                  
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',

                        width: 200,
                        height: 25,
                      }}
                      onPress={() => {
                        // console.log('OOOOKOKO');
                        this.setState({
                          // checkFocus: false,
                          checkFocus2: true,
                        });
                      }}>
                      <Text style={{color: '#999999', fontSize: 20}}>
                        {I18n.t('translate_Seachcontry')}
                      </Text>
                      {searchTermProduct != '' && (
                        <TouchableOpacity
                          hitSlop={{left: 50}}
                          onPress={() =>
                            this.setState({searchTermProduct: ''})
                          }>
                         
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {this.state.checkFocus2 === true && (
              <Overlay
                backdropStyle={{backgroundColor: '#2d6dc480'}}
                overlayStyle={{
                  top: height * 0.045,
                  height: height * 0.7,
                  width: width * 0.8,
                  borderRadius: 8,
                }}
                isVisible={this.state.checkFocus2}
                onBackdropPress={() => this.setState({checkFocus2: false})}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#999999',
                    borderRadius: 18,
                    backgroundColor: '#FFFFFF',
                  }}>
                  <Image
                    style={{width: 24, height: 24, top: Platform.OS === 'ios' ? 6 : 14, marginHorizontal: 5}}
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
                      {title.id != 501 && title.id != 515 && (
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
                                {/* {title.nameen} */}
                                {I18n.locale === 'th'? title.nameth:title.nameen}
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
                      )}
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
                    this.setState({checkFocus2: false});
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

            

            {/* <View style={[Style.ViewLine, {paddingHorizontal: 25}]}>
              
            </View> */}
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 35,
              backgroundColor: '#2d6dc4',
              justifyContent: 'center',
              borderRadius: 24,
              marginHorizontal: 40,
              marginTop: 55,
              marginBottom: 15,
            }}
            onPress={() => {
              // if (this.state.check) {
              // alert(JSON.stringify());
              this.props.dispatch({
                type: 'GET_REGION_SUCCESS',
                payload: {
                  selectcontinentFilter: this.state.selectcontinentFilter,
                  selectCountryFilter: this.state.selectCountryFilter,
                  selectProductFilter: this.state.selectProductFilter,
                  selectidcontinentFilter: this.state.selectidcontinentFilter,
                  dateSech: this.state.date2,
                  checksech: this.state.check,
                },
              });

              // console.log({
              //   selectCountryFilter: this.state.selectCountryFilter,
              //   selectProductFilter: this.state.selectProductFilter,
              //   selectcontinentFilter: this.state.selectcontinentFilter,
              //   selectidcontinentFilter: this.state.selectidcontinentFilter,
              //   dateSech: this.state.date2,
              //   checksech: this.state.check,
              // });

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
              // console.log('ANUCHITTESTSTSTSTS', {
              //   sso_id:
              //     this.props.getUser.userDetails.res_result.type != 6
              //       ? this.props.getUser.userDetails.res_result.ssoid
              //       : this.props.getUser.userDetails.res_result.id,
              //   countrie: this.state.selectCountryFilter,
              //   product: this.state.selectProductFilter,
              // });

              // this._getSeachCountry();
              // this._getSeachProduct();
              

              // this.props.navigation.openDrawer();
            
            }}>
            <Text
              style={{
                fontSize: 20,

                textAlign: 'center',

                color: '#ffffff',
                // backgroundColor: 'transparent',
              }}>
              {I18n.t('transalte_savefavorites')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
)(NewSettingContry);
