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
import {CountNotification} from '../../actions/auth.actions';
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

class ListNotiScreen extends Component {
  constructor() {
    const getDate = new Date();
    super();
    this.state = {
      dataMarketData: [],
      disablemonth: getDate.getMonth(),
      showText: 0,
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

      checkBox: [],
      idAct: [],
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
          // console.log(this.props.getUser.userDetails.res_result.ssoid, 'aaaaa');
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
          this.setState({
            showText: showTextlength.length,
          });
          console.log('ค่าาาาครับ', this.response);
          if (this.response.res_code === '00') {
            if (this.response.results.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                dataMarketData: [
                  ...this.state.dataMarketData,
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
        noti_id: item.noti_id.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idAct.pop(item.noti_id);
    }
    console.log(this.state.idAct);
  };
  // เลือกทั้งหมดแล้วก็ลบ
  selecAllitem = () => {
    let {dataMarketData, idAct} = this.state;
    if (this.state.CheckBoxAll === false) {
      dataMarketData.map(data =>
        idAct.push({
          noti_id: data.noti_id.toString(),
        }),
      );
    } else {
      dataMarketData.map(
        data => idAct.pop(data.noti_id),
        console.log('ไม่มาเลย'),
      );
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
    return (
      <>
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
                  console.log('TESTANUCHIT');
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
                      <Image
                        style={{width: 20, height: 20, top: -15}}
                        source={require('../../image/noreadyet.png')}
                      />
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
        ) : null}
      </>
    );
  };

  Listreaded_Delete = ({item, index}) => {
    this.state.checkBox.push(false);
    return (

      <>
      <Text>{item.noti_read }</Text>
        {item.noti_read == '1' ?
          <>
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
                  // <View
                  //   style={{
                  //     backgroundColor: '#4caf50',
                  //     height: 24,
                  //     width: 24,
                  //     borderRadius: 2,
                  //     justifyContent:'center'
                  //   }}>
                  //   <Icon22
                  //     name="check"
                  //     size={17}
                  //     color="#FFFFFF"
                  //     style={{alignSelf: 'center'}}
                  //   />
                  // </View>
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
                              {item.noti_id}
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
                      console.log('TESTANUCHIT');
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
                }}>
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
                    </View>
                  }
                />
                {/* )} */}
              </TouchableOpacity>
              // )}
              // </>
            )}
          </>
        :null}
      </>
    );
  };

  _DeleteNotiAll = async values => {
    // console.log('ID DELETE ALL');
    // console.log(this.state.idAct);
    try {
      this.response = await this.props.dispatch(
        deleteTbNotification({
          noti_id: this.state.idAct,
        }),
      );
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
        <View style={{zIndex: -1}}>
          <SegmentedControlTab
            selectedIndex={this.state.SelecIndex}
            values={[
              I18n.t('transalte_noread'),
              I18n.t('transalte_readed'),
              '',
            ]}
            onTabPress={handleIndexChange}
          />

          <Popover
            isVisible={this.state.closePopover}
            onRequestClose={() => {
              this.setState({closePopover: false});
            }}
            //  onOpenStart={this.setState({closePopover:true})}
            from={
              <TouchableOpacity
                onPress={() => {
                  this.setState({closePopover: true});
                }}
                style={{
                  marginLeft: '90.5%',
                  width: '10%',
                  top: '-50%',
                  marginBottom: '1%',
                }}>
                <Icon
                  name="menu"
                  size={22}
                  color="#2d6dc4"
                  style={{alignSelf: 'center', top: 5}}
                />
              </TouchableOpacity>
            }>
            {this.state.SelecIndex === 0 ? (
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
                              ? this.props.getUser.userDetails.res_result.ssoid
                              : this.props.getUser.userDetails.res_result.id,
                        }),
                      );
                      // console.log('ReadNotiAll', this.response);
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
                    alert('comming soon');
                    this.setState({
                      CheckRead: false,
                      closePopover: false,
                      // openchoose1: true,
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
            ) : (
              <View>
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
                    this.setState({
                      CheckRead: false,
                      closePopover: false,
                      openchoose2: true,
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
            )}
          </Popover>
        </View>

        {this.state.SelecIndex === 0 && (
          <>
            <ScrollView style={{flex: 1, marginTop: '-6.5%', zIndex: -1}}>
              <FlatList
                style={{
                  width: '100%',
                  zIndex: -1,
                }}
                keyExtractor={(item, index) => index}
                data={this.state.dataMarketData}
                extraData={this.state}
                contentContainerStyle={{top: this.state.CheckRead ? 5 : 0}}
                renderItem={this.Listreaed}
              />
            </ScrollView>

            {this.state.openchoose1 === true && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                {/* <View style={{flex: 1, marginHorizontal: 10}}> */}
                <TouchableOpacity
                  style={{
                    borderColor: '#2d6dc4',
                    height: 80,
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
                    {I18n.locale === 'th' ? 'เลือกทั้งหมด' : 'Select All'}
                  </Text>
                </TouchableOpacity>
                {/* </View> */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 34,
                      backgroundColor: '#2d6dc4',
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      borderRadius: 8,
                      marginVertical: 5,
                      marginHorizontal: 3,
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: 'flex-end',
                        marginHorizontal: 5,
                      }}>
                      <Icon22
                        name="star"
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
                        บันทึกรายการโปรด
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
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
                          ยกเลิก
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </>
        )}

        {this.state.SelecIndex === 1 && (
          <>
            <ScrollView style={{flex: 1, marginTop: '-6.5%', zIndex: -1}}>
              <FlatList
                scrollEnabled={false}
                style={{
                  width: '100%',
                  zIndex: -1,
                }}
                keyExtractor={(item, index) => index}
                data={this.state.dataMarketData}
                extraData={this.state}
                contentContainerStyle={{top: this.state.CheckRead ? 5 : 0}}
                renderItem={this.Listreaded_Delete}
              />
            </ScrollView>
            {this.state.openchoose2 === true && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                {/* <View style={{flex: 1, marginHorizontal: 10}}> */}
                <TouchableOpacity
                  onPress={() => {
                    this.selecAllitem();
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
                    borderColor: '#2d6dc4',
                    height: 80,
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
                    {I18n.locale === 'th' ? 'เลือกทั้งหมด' : 'Select All'}
                  </Text>
                </TouchableOpacity>
                {/* </View> */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      alert('watting API \ncomming soon');
                    }}
                    style={{
                      height: 34,
                      backgroundColor: '#2d6dc4',
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      borderRadius: 8,
                      marginVertical: 5,
                      marginHorizontal: 3,
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: 'flex-end',
                        marginHorizontal: 5,
                      }}>
                      <Icon22
                        name="star"
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
                        บันทึกรายการโปรด
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        // if (this.state.CheckBoxAll === true) {
                        //   console.log('All');

                        //   alert('watting API \ncomming soon');
                        // } else {
                        //   alert('watting API \ncomming soon');
                        // }
                        setTimeout(() => {
                          this._DeleteNotiAll();
                          this.setState({
                            checkBox: [],
                            CheckBoxAll: false,
                            idAct: [],
                            openchoose2: false,
                          });
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
                        this.setState({openchoose2: false, CheckBoxAll: false});
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
                          ยกเลิก
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </>
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
  CountNotification: state.authReducer.getCountNotification,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListNotiScreen);
