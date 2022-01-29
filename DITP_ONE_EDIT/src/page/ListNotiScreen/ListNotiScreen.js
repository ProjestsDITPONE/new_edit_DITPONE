import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  Linking,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {ListItem} from '../../lib_edit/react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import {useIsFocused, CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  CountNotification,
  SendBasket,
  DeleteBasket,
} from '../../actions/auth.actions';
import Popover from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/Feather';
import Icon33 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon22 from 'react-native-vector-icons/FontAwesome';
import {
  tbNotification,
  ReadNoti,
  deleteTbNotification,
  ReadNotiAll,
  DeleteNonti,
} from '../../actions/data.actions';

import Styles from './Styles';
import I18n from '../../utils/I18n';
// import {Icon} from 'react-native-vector-icons/Icon';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Swipeable from 'react-native-swipeable';
import {CheckBox, Overlay} from 'react-native-elements';
import {array} from 'yup';
import SegmentedControlTab from 'react-native-segmented-control-tab-noti';
import {backgroundColor} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import LinearGradient from 'react-native-linear-gradient';
import {height} from '../Typeappeal/Styles';

class ListNotiScreen extends Component {
  constructor() {
    const getDate = new Date();
    super();
    this.state = {
      dataMarketData: [],
      disablemonth: getDate.getMonth(),
      showText: 0,
      datanotread: [],
      datareaed: [],
      CheckRead: false,
      CheckDelete: [],
      CheckData: [],
      DeleteNonti: false,
      DeleteNotiAll: false,
      SelecIndex: 0,
      cktab: false,
      isVisible: false,
      closePopover: false,
      openchoose2: false,
      openchoose1: false,
      CheckBoxAll: false,
      selectedItemsBasket: [],
      checkBox: [],
      idAct: [],

      checkBox1: [],
      iddelete: [],
      CheckBoxAll1: false,
    };
    this.offset = 0;
  }
  CheactScreem = () => {
    this.props.navigation.navigate('ListChatScreen');
  };

  _DeleteNoti = values => {
    let {CheckDelete} = this.state;

    for (let index = 0; index < values.length; index++) {
      var element = values[index];

      CheckDelete[element.noti_id] = !CheckDelete[element.noti_id];
      this.setState({CheckDelete: CheckDelete});
      var data = values.map(function name(item) {
        return item;
      });
      if (CheckDelete[element.noti_id]) {
        this.setState({
          CheckData: values,
        });
      } else {
        this.setState({
          CheckData: [],
        });
      }
    }
  };

  _getMarketData = values => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          console.log('เทพกิตบอก');
          console.log(this.props.getUser.userDetails.res_result.ssoid, 'aaaaa');
          this.response = await this.props.dispatch(
            tbNotification({
              sso_id:
                this.props.getUser.userDetails.res_result.ssoid != undefined
                  ? this.props.getUser.userDetails.res_result.ssoid
                  : this.props.getUser.userDetails.res_result.id,
            }),
          );
          const showTextlength = this.response.results.filter(
            data => data.noti_read == '0',
          );

          const datareaed = this.response.results.filter(
            data => data.noti_read == '1',
          );

          // alert(JSON.stringify(showTextlength) )

          this.setState({
            showText: showTextlength.length,
          });
          this.setState({
            datanotread: showTextlength,
            datareaed: datareaed,
          });

          console.log('ค่าาาาครับ', this.response);
          if (this.response.res_code === '00') {
            if (this.response.results.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                dataMarketData: [
                  this.state.dataMarketData,
                  ...this.response.results,
                ],
                fetching_from_server: false,
              });
            } else {
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
    date = dd + '/' + this.CheckMonth(mm) + '/' + yyyy;
    return date.toString();
  }

  CheckMonth = () => {
    if (this.state.disablemonth + 1 < 10) {
      return '0' + this.state.disablemonth;
    } else if (this.state.disablemonth + 1 >= 10) {
      return this.state.disablemonth;
    }
  };
  //  เลือกที่ละช่องและก็ลบ
  selecitemDelete = ({item, index}) => {
    let {checkBox, idAct, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idAct.push({
        noti_code: item.noti_code,
        sso_id: this.props.getUser.userDetails.res_result.ssoid,
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idAct.pop(item.noti_code);
    }
    console.log(this.state.idAct);
  };

  selecitemDeleteontread = ({item, index}) => {
    let {checkBox1, idAct, DataType, CheckBoxAll} = this.state;
    checkBox1[index] = !checkBox1[index];
    this.setState({checkBox1: checkBox1});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox1[index] === true) {
      idAct.push({
        noti_code: item.noti_code,
        sso_id: this.props.getUser.userDetails.res_result.ssoid,
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll1: false});
      idAct.pop(item.noti_code);
    }
    console.log(this.state.idAct);
  };

  // selectitemDelete1 = ({item,index})=>{

  //   let {checkBox1, iddelete, DataType, CheckBoxAll1} = this.state;
  //   checkBox1[index] = !checkBox1[index];
  //   this.setState({checkBox1: checkBox1});
  //   // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
  //   if (checkBox1[index] === true) {
  //     iddelete.push({
  //       noti_code: item.noti_code,
  //       sso_id: this.props.getUser.userDetails.res_result.ssoid,
  //     });
  //   } else {
  //     // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
  //     this.setState({CheckBoxAll1: false});
  //     iddelete.pop(item.noti_code);
  //   }
  //   console.log(this.state.iddelete);

  // };
  // เลือกทั้งหมดแล้วก็ลบ
  selecAllitemreaded = () => {
    let dataMK = this.state.dataMarketData;
    let dataID = this.state.idAct;

    let {dataMarketData, idAct} = this.state;
    if (this.state.CheckBoxAll === false) {
      dataMK.map(data1 => {
        if (data1.noti_id != undefined && data1.noti_read == 1) {
          dataID.push({
            noti_code: data1.noti_code,
            sso_id: this.props.getUser.userDetails.res_result.ssoid,
          });
        }
      });
    } else {
      dataMK.map(data1 => dataID.pop(data1.noti_code), console.log('ไม่มาเลย'));
    }
    console.log(this.state.idAct);
  };
  selecAllitemnotread = () => {
    let dataMK = this.state.dataMarketData;
    let dataID = this.state.idAct;

    // console.log('IDIDIDI', dataMK);s
    let {dataMarketData, idAct} = this.state;
    if (this.state.CheckBoxAll1 === false) {
      dataMK.map(data1 => {
        if (data1.noti_id != undefined && data1.noti_read == 0) {
          dataID.push({
            noti_code: data1.noti_code,
            sso_id: this.props.getUser.userDetails.res_result.ssoid,
          });
        }
      });
    } else {
      dataMK.map(data1 => dataID.pop(data1.noti_code), console.log('ไม่มาเลย'));
    }
    console.log(this.state.idAct);
  };

  // เก่า
  SelecitemDelete = ({index, item}) => {
    let {CheckDelete} = this.state;
    CheckDelete[index] = !CheckDelete[index];
    this.setState({CheckDelete: CheckDelete});

    if (CheckDelete[index]) {
      this.setState({
        CheckData: [
          ...this.state.CheckData.filter(item2 => item2 !== item),
          item,
        ],
      });
    } else {
      this.setState({
        CheckData: [...this.state.CheckData.filter(item2 => item2 !== item)],
      });
    }
  };

  selecitem = ({item, index}) => {
    console.log('selecitem');
    console.log(item, index);
    let {selectedItemsBasket, DataActivity} = this.state;
    selectedItemsBasket[index] = !selectedItemsBasket[index];
    this.setState({checkBoxBasket: selectedItemsBasket});
    if (selectedItemsBasket[index] === true) {
      return this._SendBasket(item.market_code);
    } else {
      return this._DeleteBasket(item.market_code);
    }
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

  renderFooter() {
    return (
      <View style={Styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._getMarketData();
  }
  Listreaed = ({item, index}) => {
    this.state.checkBox1.push(false);
    return (
      <View style={{borderWidth: 0.05}}>
        {item.noti_read == '0' && (
          <View>
            {this.state.openchoose1 === false ? (
              <TouchableOpacity
                style={{marginHorizontal: 10, top: 10}}
                onPress={async () => {
                  if (item.noti_type == '1') {
                    // console.log('Type1');
                    this.props.navigation.navigate('ProfileActivity', {
                      index: 1,
                    });
                  } else if (item.noti_type == '2') {
                    console.log('Type2');
                  } else if (item.noti_type == '3') {
                  } else if (item.noti_type == '4') {
                    this.props.navigation.navigate('AppealHome');
                  } else if (item.noti_type == '5') {
                  } else if (item.noti_type == '6') {
                    this.CheactScreem();
                    // this.props.navigation.navigate('ChatScreen');
                  } else if (item.noti_type == '7') {
                  } else if (item.noti_type == '8') {
                    this.props.navigation.navigate('ProfileActivity');
                  } else if (item.noti_type == '9') {
                    if (item.market_code != null) {
                      console.log('TestNewsss');
                      this.props.navigation.navigate('ViewMarketCountry', {
                        uri: item.url_attach,
                        image: item.country_flag_1x,
                        title: item.title,
                        timeElapsed: item.timeElapsed,
                        country_name: item.country_name,
                        view: item.view,
                        market_id: item.market_id,
                        ck: true,
                      });
                    } else {
                      this.props.navigation.navigate('MarketContry');
                    }
                  } else if (item.noti_type == '10') {
                    this.props.navigation.navigate('TradeActivities', {
                      abc: false,
                      index: 1,
                      activity_detail: [item.activity_detail],
                      checkNonti: true,
                    });
                  } else if (item.noti_type == '11') {
                    this.props.navigation.navigate('DevelopScreen', {
                      activity_detail: [item.activity_detail],
                      checkNonti: true,
                    });
                  }

                  const response = await this.props.dispatch(
                    ReadNoti({
                      noti_id: item.noti_id,
                      noti_code: item.noti_code,
                      sso_id: this.props.getUser.userDetails.res_result.ssoid,
                      noti_type: item.type,
                    }),
                  );
                  this.setState({dataMarketData: []});
                  this.props.dispatch(
                    CountNotification(
                      this.props.CountNotification.CountNotification * 1 - 1,
                    ),
                  );
                  this._getMarketData();
                }}>
                {item.noti_read == '0' && (
                  <ListItem
                    //ถ้าไม่ใส่เวลาclick backgroup จะเป็นสีดำ
                    // Component={ TouchableOpacity}

                    containerStyle={{
                      backgroundColor: '#e7edf2',
                      marginVertical: 7,
                      borderRadius: 8,
                    }}
                    style={{
                      width: '100%',
                      height: null,

                      // backgroundColor: 'red',
                    }}
                    leftAvatar={
                      <>
                        {item.noti_img != '' && (
                          <View style={{flex: 0.1}}>
                            <Image
                              style={{
                                width: 33,
                                height: 34,
                                top: -10,
                              }}
                              source={{uri: item.noti_img}}
                            />
                          </View>
                        )}
                      </>
                    }
                    title={
                      <View style={{flexDirection: 'row', top: -8}}>
                        <View style={{flex: 1}}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#014886',
                              fontSize: 18,
                              fontWeight: '500',
                            }}>
                            {item.noti_message}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.1,

                            alignItems: 'center',
                          }}>
                          {/* <Image
                            style={{width: 20, height: 20, top: -15}}
                            source={require('../../image/noreadyet.png')}
                          /> */}
                        </View>
                      </View>
                    }
                    subtitle={
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: '#73838f',
                              fontSize: 18,
                              fontWeight: '500',
                            }}>
                            {item.timeElapsed} - {item.markets_name}
                          </Text>
                        </View>
                        {item.type != null && (
                          <View
                            style={{
                              flex: 0.3,

                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                flex: 1,

                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flex: 0.4,
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  style={{width: 15, height: 11}}
                                  source={require('../../image/eyenoti.png')}
                                />
                              </View>
                              <View style={{flex: 0.9}}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#73838f',
                                  }}>
                                  {item.view} {I18n.t('translate_View')}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    }
                  />
                )}
              </TouchableOpacity>
            ) : (
              <View>
                {item.noti_code != undefined && (
                  <CheckBox
                    onPress={() => {
                      this.selecitemDeleteontread({item: item, index: index});
                    }}
                    checked={this.state.checkBox1[index]}
                    checkedIcon={
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../../image/rrr.png')}
                      />
                    }
                    uncheckedIcon={
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 24,
                          width: 24,
                          borderRadius: 2,
                        }}
                      />
                    }
                    containerStyle={{
                      marginHorizontal: 10,
                      top: 10,
                      backgroundColor: '#e7edf2',
                      height: 85,
                      borderRadius: 8,
                    }}
                    title={
                      <View style={{flex: 1}}>
                        <ListItem
                          containerStyle={{
                            backgroundColor: '#e7edf2',
                            marginVertical: 7,
                            borderRadius: 8,
                          }}
                          leftAvatar={
                            <>
                              {item.noti_img != '' && (
                                <View style={{flex: 0.1}}>
                                  <Image
                                    style={{
                                      width: 33,
                                      height: 34,
                                      top: -10,
                                    }}
                                    source={{uri: item.noti_img}}
                                  />
                                </View>
                              )}
                            </>
                          }
                          title={
                            <View style={{flexDirection: 'row', top: -8}}>
                              <View style={{flex: 1}}>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    color: '#014886',
                                    fontSize: 18,
                                    fontWeight: '500',
                                  }}>
                                  {item.noti_message}
                                </Text>
                              </View>
                            </View>
                          }
                          subtitle={
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 1}}>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    color: '#73838f',
                                    fontSize: 18,
                                    fontWeight: '500',
                                  }}>
                                  {item.timeElapsed} - {item.markets_name}{' '}
                                </Text>
                              </View>
                              {/* //เช็ค ถ้าเท่ากับค่าว่าง ไม่ให้แสดง ลูกตา */}
                              {item.type != null && (
                                <View
                                  style={{
                                    flex: 0.4,

                                    justifyContent: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,

                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flex: 0.1,
                                        justifyContent: 'center',
                                      }}>
                                      <Image
                                        style={{
                                          width: 15,
                                          height: 11,
                                        }}
                                        source={require('../../image/eyenoti.png')}
                                      />
                                    </View>
                                    <View style={{flex: 0.9}}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          color: '#73838f',
                                          textAlign: 'center',
                                        }}>
                                        {item.view} {I18n.t('translate_View')}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              )}
                            </View>
                          }
                        />
                        {/* )} */}
                      </View>
                    }
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  Listreaded_Delete = ({item, index}) => {
    this.state.checkBox.push(false);
    return (
      <View style={{borderWidth: 0.05}}>
        {item.noti_read == '1' && (
          <View>
            {this.state.openchoose2 === true ? (
              <CheckBox
                onPress={() => {
                  this.selecitemDelete({item: item, index: index});
                }}
                checked={this.state.checkBox[index]}
                checkedIcon={
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('../../image/rrr.png')}
                  />
                }
                uncheckedIcon={
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: 24,
                      width: 24,
                      borderRadius: 2,
                    }}
                  />
                }
                containerStyle={{
                  marginHorizontal: 10,
                  top: 10,
                  backgroundColor: '#e7edf2',
                  height: 85,
                  borderRadius: 8,
                }}
                title={
                  <View style={{flex: 1}}>
                    {/* {item.noti_read == '1' && ( */}
                    <ListItem
                      containerStyle={{
                        backgroundColor: '#e7edf2',
                        marginVertical: 7,
                        borderRadius: 8,
                      }}
                      leftAvatar={
                        <>
                          {item.noti_img != '' && (
                            <View style={{flex: 0.1}}>
                              <Image
                                style={{
                                  width: 33,
                                  height: 34,
                                  top: -10,
                                }}
                                source={{uri: item.noti_img}}
                              />
                            </View>
                          )}
                        </>
                      }
                      title={
                        <View style={{flexDirection: 'row', top: -8}}>
                          <View style={{flex: 1}}>
                            <Text
                              numberOfLines={2}
                              style={{
                                color: '#014886',
                                fontSize: 18,
                                fontWeight: '500',
                              }}>
                              {item.noti_message}
                            </Text>
                          </View>
                          {/* <View
                        style={{
                          flex: 0.1,

                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 20, height: 20, top: -15}}
                          source={require('../../image/noreadyet.png')}
                        />
                      </View> */}
                        </View>
                      }
                      subtitle={
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <Text
                              numberOfLines={2}
                              style={{
                                color: '#73838f',
                                fontSize: 18,
                                fontWeight: '500',
                              }}>
                              {item.timeElapsed} - {item.markets_name}{' '}
                            </Text>
                          </View>
                          {/* //เช็ค ถ้าเท่ากับค่าว่าง ไม่ให้แสดง ลูกตา */}
                          {item.type != null && (
                            <View
                              style={{
                                flex: 0.4,

                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flex: 1,

                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                <View
                                  style={{
                                    flex: 0.1,
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    style={{
                                      width: 15,
                                      height: 11,
                                    }}
                                    source={require('../../image/eyenoti.png')}
                                  />
                                </View>
                                <View style={{flex: 0.9}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: '#73838f',
                                      textAlign: 'center',
                                    }}>
                                    {item.view} {I18n.t('translate_View')}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}
                        </View>
                      }
                    />
                    {/* )} */}
                  </View>
                }
              />
            ) : (
              <TouchableOpacity
                style={{marginHorizontal: 1, top: 10}}
                // onPress={async () => {
                //   if (item.noti_type == '1') {
                //     // console.log('Type1');
                //     this.props.navigation.navigate('ProfileActivity', {
                //       index: 1,
                //     });
                //   } else if (item.noti_type == '2') {
                //     console.log('Type2');
                //   } else if (item.noti_type == '3') {
                //   } else if (item.noti_type == '4') {
                //     this.props.navigation.navigate('AppealHome');
                //   } else if (item.noti_type == '5') {
                //   } else if (item.noti_type == '6') {
                //     this.CheactScreem();
                //     // this.props.navigation.navigate('ChatScreen');
                //   } else if (item.noti_type == '7') {
                //   } else if (item.noti_type == '8') {
                //     this.props.navigation.navigate('ProfileActivity');
                //   } else if (item.noti_type == '9') {
                //     if (item.market_code != null) {
                //       console.log('TESTANUCHIT');
                //       this.props.navigation.navigate('ViewMarketCountry', {
                //         uri: item.url_attach,
                //         image: item.country_flag_1x,
                //         title: item.title,
                //         timeElapsed: item.timeElapsed,
                //         country_name: item.country_name,
                //         view: item.view,
                //         market_id: item.market_id,
                //         ck: true,
                //       });
                //     } else {
                //       this.props.navigation.navigate('MarketContry');
                //     }
                //   } else if (item.noti_type == '10') {
                //     this.props.navigation.navigate('TradeActivities', {
                //       abc: false,
                //       index: 1,
                //       activity_detail: [item.activity_detail],
                //       checkNonti: true,
                //     });
                //   } else if (item.noti_type == '11') {
                //     this.props.navigation.navigate('DevelopScreen', {
                //       activity_detail: [item.activity_detail],
                //       checkNonti: true,
                //     });
                //   }

                //   // const response = await this.props.dispatch(
                //   //   ReadNoti({
                //   //     noti_id: item.noti_id,
                //   //   }),
                //   // );
                //   // this.setState({ dataMarketData: [] });
                //   // this.props.dispatch(
                //   //   CountNotification(
                //   //     this.props.CountNotification.CountNotification * 1 -
                //   //     1,
                //   //   ),
                //   // );
                //   // this._getMarketData();
                // }}
              >
                {/* {item.noti_read == '1' && ( */}
                <ListItem
                  containerStyle={{
                    backgroundColor: '#e7edf2',
                    marginVertical: 7,
                    borderRadius: 8,
                  }}
                  leftAvatar={
                    <View style={{flexDirection: 'row', marginHorizontal: 1}}>
                      <View style={{width: 50}}>
                        <CheckBox
                          containerStyle={{
                            marginLeft: -10,
                          }}
                          onPress={() => {
                            this.selecitemDelete({item: item, index: index});
                          }}
                          checked={this.state.checkBox[index]}
                          checkedIcon={
                            <Image
                              style={{height: 24, width: 24}}
                              source={require('../../image/rrr.png')}
                            />
                          }
                          uncheckedIcon={
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                height: 24,
                                width: 24,
                                borderRadius: 2,
                              }}
                            />
                          }
                        />
                      </View>
                      <View style={{}}>
                        {item.noti_img != '' && (
                          <View style={{flex: 0.1}}>
                            <Image
                              style={{
                                width: 33,
                                height: 34,
                                top: -10,
                              }}
                              source={{uri: item.noti_img}}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  }
                  title={
                    <TouchableOpacity
                      onPress={async () => {
                        if (item.noti_type == '1') {
                          // console.log('Type1');
                          this.props.navigation.navigate('ProfileActivity', {
                            index: 1,
                          });
                        } else if (item.noti_type == '2') {
                          console.log('Type2');
                        } else if (item.noti_type == '3') {
                        } else if (item.noti_type == '4') {
                          this.props.navigation.navigate('AppealHome');
                        } else if (item.noti_type == '5') {
                        } else if (item.noti_type == '6') {
                          this.CheactScreem();
                          // this.props.navigation.navigate('ChatScreen');
                        } else if (item.noti_type == '7') {
                        } else if (item.noti_type == '8') {
                          this.props.navigation.navigate('ProfileActivity');
                        } else if (item.noti_type == '9') {
                          if (item.market_code != null) {
                            console.log('TESTANUCHIT');
                            this.props.navigation.navigate(
                              'ViewMarketCountry',
                              {
                                uri: item.url_attach,
                                image: item.country_flag_1x,
                                title: item.title,
                                timeElapsed: item.timeElapsed,
                                country_name: item.country_name,
                                view: item.view,
                                market_id: item.market_id,
                                ck: true,
                              },
                            );
                          } else {
                            this.props.navigation.navigate('MarketContry');
                          }
                        } else if (item.noti_type == '10') {
                          this.props.navigation.navigate('TradeActivities', {
                            abc: false,
                            index: 1,
                            activity_detail: [item.activity_detail],
                            checkNonti: true,
                          });
                        } else if (item.noti_type == '11') {
                          this.props.navigation.navigate('DevelopScreen', {
                            activity_detail: [item.activity_detail],
                            checkNonti: true,
                          });
                        }

                        // const response = await this.props.dispatch(
                        //   ReadNoti({
                        //     noti_id: item.noti_id,
                        //   }),
                        // );
                        // this.setState({ dataMarketData: [] });
                        // this.props.dispatch(
                        //   CountNotification(
                        //     this.props.CountNotification.CountNotification * 1 -
                        //     1,
                        //   ),
                        // );
                        // this._getMarketData();
                      }}
                      style={{flexDirection: 'row', top: -8}}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#014886',
                            fontSize: 18,
                            fontWeight: '500',
                          }}>
                          {item.noti_message}
                        </Text>
                      </View>
                      {/* <View
                        style={{
                          flex: 1,
                          // borderWidth: 1,
                          alignItems: 'center',
                        }}> */}
                      {/* <Image
                            style={{width: 20, height: 20, }}
                            source={require('../../image/noreadyet.png')}
                          /> */}
                      {item.noti_type != '8' &&
                      item.noti_type != '7' &&
                      item.noti_type != '1' &&
                      item.noti_type != '6' ? (
                        <CheckBox
                          containerStyle={{width: 20, height: 10}}
                          checkedIcon={
                            <Image
                              style={{width: 23, height: 23}}
                              source={require('../../image/PickerMarket.png')}
                            />
                          }
                          uncheckedIcon={
                            <Image
                              style={{width: 23, height: 23}}
                              source={require('../../image/shoping.png')}
                            />
                          }
                          checked={this.state.selectedItemsBasket[index]}
                          onPress={() => {
                            setTimeout(() => {
                              this.selecitem({item: item, index: index});
                            }, 200);
                          }}
                        />
                      ) : (
                        <View />
                      )}
                    </TouchableOpacity>
                    // </View>
                  }
                  subtitle={
                    <TouchableOpacity
                      onPress={async () => {
                        if (item.noti_type == '1') {
                          // console.log('Type1');
                          this.props.navigation.navigate('ProfileActivity', {
                            index: 1,
                          });
                        } else if (item.noti_type == '2') {
                          console.log('Type2');
                        } else if (item.noti_type == '3') {
                        } else if (item.noti_type == '4') {
                          this.props.navigation.navigate('AppealHome');
                        } else if (item.noti_type == '5') {
                        } else if (item.noti_type == '6') {
                          this.CheactScreem();
                          // this.props.navigation.navigate('ChatScreen');
                        } else if (item.noti_type == '7') {
                        } else if (item.noti_type == '8') {
                          this.props.navigation.navigate('ProfileActivity');
                        } else if (item.noti_type == '9') {
                          if (item.market_code != null) {
                            console.log('TESTANUCHIT');
                            this.props.navigation.navigate(
                              'ViewMarketCountry',
                              {
                                uri: item.url_attach,
                                image: item.country_flag_1x,
                                title: item.title,
                                timeElapsed: item.timeElapsed,
                                country_name: item.country_name,
                                view: item.view,
                                market_id: item.market_id,
                                ck: true,
                              },
                            );
                          } else {
                            this.props.navigation.navigate('MarketContry');
                          }
                        } else if (item.noti_type == '10') {
                          this.props.navigation.navigate('TradeActivities', {
                            abc: false,
                            index: 1,
                            activity_detail: [item.activity_detail],
                            checkNonti: true,
                          });
                        } else if (item.noti_type == '11') {
                          this.props.navigation.navigate('DevelopScreen', {
                            activity_detail: [item.activity_detail],
                            checkNonti: true,
                          });
                        }

                        // const response = await this.props.dispatch(
                        //   ReadNoti({
                        //     noti_id: item.noti_id,
                        //   }),
                        // );
                        // this.setState({ dataMarketData: [] });
                        // this.props.dispatch(
                        //   CountNotification(
                        //     this.props.CountNotification.CountNotification * 1 -
                        //     1,
                        //   ),
                        // );
                        // this._getMarketData();
                      }}
                      style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#73838f',
                            fontSize: 18,
                            fontWeight: '500',
                          }}>
                          {item.timeElapsed} - {item.markets_name}
                        </Text>
                      </View>
                      {/* //เช็ค ถ้าเท่ากับค่าว่าง ไม่ให้แสดง ลูกตา */}
                      {item.type != null && (
                        <View
                          style={{
                            flex: 0.4,

                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flex: 1,

                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                flex: 0.1,
                                justifyContent: 'center',
                              }}>
                              <Image
                                style={{width: 15, height: 11}}
                                source={require('../../image/eyenoti.png')}
                              />
                            </View>
                            <View style={{flex: 0.9}}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: '#73838f',
                                  textAlign: 'center',
                                }}>
                                {item.view} {I18n.t('translate_View')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  }
                />
                {/* )} */}
              </TouchableOpacity>
              // )}
              // </View>
            )}
          </View>
        )}
      </View>
    );
  };

  _DeleteNotiAll = async values => {
    console.log('ID DELETE APPPPP1');
    const {authData} = this.props;
    const {idAct} = this.state;

    console.log(idAct);

    try {
      if (idAct.length > 0) {
        const payload = idAct;
        this.response = await this.props.dispatch(
          deleteTbNotification(payload),
        );

        this._getMarketData();
      } else {
        alert('กรุณาเลือกรายการที่ต้องการลบ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  _addmybasket = async values => {
    console.log('IGIGI API ADD');
    const {authData} = this.props;
    const {idAct} = this.state;

    console.log(idAct);

    try {
      const payload = idAct;
      // this.response = await this.props.dispatch(deleteTbNotification(payload));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null}),
    };
    const handleIndexChange = async index => {
      try {
        console.log('NEDITE', index);
        this.setState({SelecIndex: index});
      } catch (error) {}
    };

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            // height: '23.5%',
          }}>
          <Headers
            badgeNumber="2"
            navigation={this.props.navigation}
            backScreen={false}
          />
          <View style={{marginTop: Platform.OS === 'android' && 90}} />
          <Headerstage nameTab={I18n.t('translate_nonti')} />
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 10,
            zIndex: -1,
          }}
        />
        <View
          style={{flexDirection: 'row', height: 42, width: '100%', zIndex: -1}}>
          <LinearGradient
            // Background Linear Gradient
            colors={
              this.state.SelecIndex === 0
                ? ['#5dbde6', '#1d61bd']
                : ['#FFFFFF', '#FFFFFF']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              {
                flex: 1,
                borderColor: '#5dbde6',
                borderWidth: 0.7,

                // height: 42,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({SelecIndex: 0});
              }}
              style={{flex: 1, justifyContent: 'center'}}>
              <View>
                <Text
                  style={{
                    color: this.state.SelecIndex === 0 ? '#FFFFFF' : '#2d6dc4',
                    fontSize: 22,
                    textAlign: 'center',
                    fontFamily: 'Kittithada Bold 75',
                  }}>
                  {I18n.t('transalte_noread')}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            // Background Linear Gradient
            colors={
              this.state.SelecIndex === 1
                ? ['#5dbde6', '#1d61bd']
                : ['#FFFFFF', '#FFFFFF']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              {
                flex: 1,
                borderColor: '#5dbde6',
                borderWidth: 0.7,

                // height: 42,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({SelecIndex: 1});
              }}
              style={{flex: 1, justifyContent: 'center'}}>
              <View>
                <Text
                  style={{
                    color: this.state.SelecIndex === 1 ? '#FFFFFF' : '#2d6dc4',
                    fontSize: 22,
                    textAlign: 'center',
                    fontFamily: 'Kittithada Bold 75',
                  }}>
                  {I18n.t('transalte_readed')}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          {this.state.SelecIndex === 0 && (
          <TouchableOpacity
            // Background Linear Gradient
            // colors={['#FFFFFF', '#FFFFFF']}
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 0}}
            style={[
              {
               
                flex: 0.2,
                borderColor: '#5dbde6',
                borderWidth: 0.7,

                // height: 42,
              },
            ]}>
            <Popover
              isVisible={this.state.closePopover}
              popoverStyle={{}}
              onRequestClose={() => {
                this.setState({closePopover: false});
              }}
              //  onOpenStart={this.setState({closePopover:true})}
              from={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({closePopover: true});
                  }}
                  style={{flex: 1, justifyContent: 'center'}}>
                  <Icon
                    name="menu"
                    size={25}
                    color="#2d6dc4"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              }>
             
                <View>
                  <TouchableOpacity
                    onPress={async () => {
                      this.setState({
                        CheckRead: false,
                        closePopover: false,
                      });

                      try {
                        this.response = await this.props.dispatch(
                          ReadNotiAll({
                            noti_token:
                              this.props.getUser.userDetails.res_result.ssoid !=
                              undefined
                                ? this.props.getUser.userDetails.res_result
                                    .ssoid
                                : this.props.getUser.userDetails.res_result.id,
                          }),
                        );
                        console.log(
                          'ReadNotiAll',
                          this.props.getUser.userDetails.res_result.ssoid,
                        );
                        if (this.response.res_code === '00') {
                          this.props.dispatch(CountNotification(0));
                          this.props.navigation.dispatch(
                            CommonActions.navigate({
                              name: 'Setting',
                            }),
                          );
                          this.props.navigation.dispatch(
                            CommonActions.navigate({
                              name: 'ListNotiScreen',
                            }),
                          );
                          this.setState({dataMarketData: []});
                          this._getMarketData();
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      flex: 1,
                      marginHorizontal: 8,
                      width: '100%',
                      height: 45,
                      flexDirection: 'row',
                      top: 10,
                    }}>
                    <View>
                      <Icon22
                        name="share"
                        size={17}
                        color="#20416e"
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View>
                      <Text style={{color: '#20416e', fontSize: 17}}>
                        {' '}
                        {I18n.t('transalte_Move_all_read')}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '75%',
                      backgroundColor: '#979797',
                      height: 1,
                      opacity: 0.4,
                      marginHorizontal: 25,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      // alert('comming soon');
                      this.setState({
                        CheckRead: false,
                        closePopover: false,
                        openchoose1: true,
                      });
                    }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      flex: 1,
                      marginHorizontal: 8,
                      width: '100%',
                      height: 45,
                      flexDirection: 'row',
                      top: 10,
                    }}>
                    <View>
                      <Icon22
                        name="check"
                        size={17}
                        color="#20416e"
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View>
                      <Text style={{color: '#20416e', fontSize: 17}}>
                        {' '}
                        {I18n.t('translate_PlaeseChooseIrems')}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
             
            </Popover>
          </TouchableOpacity>
          )}
        </View>

        <View style={{zIndex: -1}} />

        {this.state.SelecIndex === 0 && (
          <>
            <ScrollView style={{flex: 1, marginTop: 0, zIndex: -1}}>
              {this.state.datanotread.length !== 0 ? (
                <FlatList
                  style={{
                    width: '100%',
                    zIndex: -1,
                  }}
                  keyExtractor={(item, index) => index}
                  data={this.state.datanotread}
                  extraData={this.state}
                  contentContainerStyle={{top: this.state.CheckRead ? 5 : 0}}
                  renderItem={this.Listreaed}
                />
              ) : (
                <View style={{flex: 1, marginTop: height * 0.25}}>
                  <Text style={{fontSize: 22, textAlign: 'center'}}>
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </ScrollView>

            {this.state.datanotread.length != 0 && (
              <View style={{}}>
                {this.state.openchoose1 === true && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.selecAllitemnotread();
                        if (this.state.CheckBoxAll1 === true) {
                          this.setState({CheckBoxAll1: false});
                          this.setState({
                            checkBox1: this.state.checkBox1.map(() => false),
                            idAct: [],
                          });
                        } else {
                          this.setState({CheckBoxAll1: true});
                          this.setState({
                            checkBox1: this.state.checkBox1.map(() => true),
                          });
                        }
                      }}
                      style={{
                        borderColor: '#2d6dc4',
                        height: 40,
                        borderRadius: 8,
                        borderWidth: 1,
                        flex: 0.5,
                        marginHorizontal: 10,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 18,
                          color: '#2d6dc4',
                        }}>
                        {this.state.CheckBoxAll1 === false
                          ? I18n.locale === 'th' ? 'เลือกทั้งหมด' : 'Select All'
                          : I18n.t('translate_Bt_cancel')}
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        flex: 1,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this._DeleteNotiAll();
                            setTimeout(() => {
                              console.log('มาๆ');
                              this.setState(
                                {
                                  checkBox1: [],
                                  CheckBoxAll1: false,
                                  idAct: [],
                                  // dataMarketData:[],
                                  // openchoose2: false,
                                },

                                // this._getMarketData();
                              );
                            }, 200);
                          }}
                          style={{
                            height: 34,
                            backgroundColor: '#f86767',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 0.5,
                            borderRadius: 8,
                            marginHorizontal: 3,
                          }}>
                          <View
                            style={{
                              flex: 0.5,
                              alignItems: 'flex-end',
                              marginHorizontal: 5,
                            }}>
                            <Icon33
                              name="delete"
                              size={19}
                              color="#FFFFFF"
                              style={{}}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontSize: 18,
                                color: '#FFFFFF',
                              }}>
                              {I18n.t('transalte_delete_list')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({openchoose1: false});
                          }}
                          style={{
                            height: 34,
                            backgroundColor: '#ff8856',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 0.5,
                            borderRadius: 8,
                            marginHorizontal: 3,
                          }}>
                          <View
                            style={{
                              flex: 0.5,
                              alignItems: 'flex-end',
                              marginHorizontal: 5,
                            }}
                          />
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontSize: 18,
                                color: '#FFFFFF',
                              }}>
                              {I18n.t('translate_Bt_cancel')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}
          </>
        )}

        {this.state.SelecIndex === 1 && (
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, marginTop: 0, zIndex: -1}}>
              {this.state.datareaed.length !== 0 ? (
                <FlatList
                  scrollEnabled={false}
                  style={{
                    width: '100%',
                    zIndex: -1,
                  }}
                  keyExtractor={(item, index) => index}
                  data={this.state.datareaed}
                  extraData={this.state}
                  contentContainerStyle={{top: this.state.CheckRead ? 5 : 0}}
                  renderItem={this.Listreaded_Delete}
                />
              ) : (
                <View style={{flex: 1, marginTop: height * 0.25}}>
                  <Text style={{fontSize: 22, textAlign: 'center'}}>
                    {I18n.t('translate_Nodata')}
                  </Text>
                </View>
              )}
            </ScrollView>

            {this.state.openchoose2 === false && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                {this.state.datareaed.length != 0 && (
                  <View
                    style={{
                      flex: 1,
                    }}>
                    {/* <Text>{this.state.dataMarketData.length} </Text> */}

                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.selecAllitemreaded();
                          if (this.state.CheckBoxAll === true) {
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
                        style={{
                          height: 34,
                          borderColor: '#2d6dc4',
                          borderWidth: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 0.5,
                          borderRadius: 8,
                          marginHorizontal: 3,
                        }}>
                        <View
                          style={{
                            flex: 0.5,
                            alignItems: 'flex-end',
                            marginHorizontal: 5,
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 18,
                              color: '#2d6dc4',
                            }}>
                            {this.state.CheckBoxAll === false
                              ? I18n.locale === 'th' ? 'เลือกทั้งหมด' : 'Select All'
                              : I18n.t('translate_Bt_cancel')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // if (this.state.CheckBoxAll === true) {
                          //   console.log('All');

                          //   alert('watting API \ncomming soon');
                          // } else {
                          //   alert('watting API \ncomming soon');
                          // }
                          // setTimeout(() => {
                          // this._DeleteNotiAll();
                          this._DeleteNotiAll();
                          setTimeout(() => {
                            console.log('มาๆ');
                            this.setState(
                              {
                                checkBox: [],
                                CheckBoxAll: false,
                                idAct: [],
                                // dataMarketData:[],
                                // openchoose2: false,
                              },

                              // this._getMarketData();
                            );
                            // this._getMarketData();
                          }, 200);
                        }}
                        style={{
                          height: 34,
                          backgroundColor: '#f86767',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 0.5,
                          borderRadius: 8,
                          marginHorizontal: 3,
                        }}>
                        <View
                          style={{
                            flex: 0.5,
                            alignItems: 'flex-end',
                            marginHorizontal: 5,
                          }}>
                          <Icon33
                            name="delete"
                            size={19}
                            color="#FFFFFF"
                            style={{}}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 18,
                              color: '#FFFFFF',
                            }}>
                            {I18n.t('transalte_delete_list')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
  },
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
  CountNotification: state.authReducer.getCountNotification,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListNotiScreen);
