import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import Styles from './Styles';
import Style from '../IdentityScreen/Styles';
import I18n from '../../utils/I18n';
import {ListItem, Overlay} from 'react-native-elements';
import {
  getActivitySme,
  getActivitySmePrivate,
} from '../../actions/data.actions';
import {connect} from 'react-redux';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../../lib_edit/react-native-scrollable-tab-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import TabBar from 'react-native-underline-tabbar';
import LinearGradient from 'react-native-linear-gradient';
const height = Dimensions.get('window').height;
const Page = ({label, text = ''}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }}>
    <Text style={{fontSize: 20, textAlign: 'center'}}>{label}</Text>
    <Text style={Styles.instructions}>{text}</Text>
  </View>
);
const Tab = ({tab, page, isTabActive, onPressHandler, onTabLayout, Styles}) => {
  const {label, icon} = tab;
  const style = {
    marginHorizontal: 15,
    paddingVertical: 5,
    // marginLeft:Platform.OS==='ios'? 10:10
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Styles.backgroundColor,
    opacity: Styles.opacity,
    transform: [{scale: Styles.opacity}],
  };
  const textStyle = {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
  };
  const iconStyle = {
    tintColor: Styles.textColor,
    resizeMode: 'contain',
    width: 80,
    height: 22,
    marginLeft: 10,
  };
  return (
    <TouchableOpacity
      style={style}
      onPress={onPressHandler}
      onLayout={onTabLayout}
      key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
        <Animated.Image style={iconStyle} source={icon} />
      </Animated.View>
    </TouchableOpacity>
  );
};
class SmeAct extends React.Component {
  _scrollX = new Animated.Value(0);
  // 6 is a quantity of tabs
  interpolators = Array.from({length: 2}, (_, i) => i).map(idx => ({
    // scale: this._scrollX.interpolate({
    //   inputRange: [idx - 1, idx, idx + 1],
    //   outputRange: [1, 1.2, 1],
    //   extrapolate: 'clamp',
    // }),
    opacity: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['#40536d', '#40536d', '#40536d'],
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['rgba(0,0,0,0.1)', '#40536d', 'rgba(0,0,0,0.1)'],
      extrapolate: 'clamp',
    }),
  }));
  constructor(props) {
    super(props);

    this.state = {
      heightTab2: 0,
      SmeAuth: [],
      ActivitySme: [],
      DataHis: [],
      Page: 3,
      Page6: 3,
      Page7: 3,
      Page8: 3,
      SelecIndexYear1: 0,
      year11: null,
      year22: null,
      year33: null,
      year44: null,
      ActivityYearSme: [],
      checkColor: false,
      typehis: 1,
      ActivitySmepri: [],
    };
  }
  _handleTabHeight2 = item => {
    console.log('Item', item.i);
    this.setState({heightTab2: item.i});
  };

  handleIndexChange3 = (index, number) => {
    console.log('index' + index);

    this.props.dispatch({
      type: 'INCREMENT',
      score: 1,
    });

    this.setState({SelecIndexYear1: index});
    setTimeout(() => {
      this.props.dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
  };

  _getActivitySme = async value => {
    console.log('game' + value);
    try {
      const payload = this.props.authData.token;
      const respones = await this.props.dispatch(
        getActivitySme({
          token: payload,
          result: {
            type: value === undefined ? 1 : value,
          },
        }),
      );

      if (respones.res_code === '00') {
        this.setState({ActivitySme: respones.res_result.active});
        this.setState({ActivityYearSme: respones.res_result.not_active});
        const Yearall = Object.keys(respones.res_result.not_active);
        console.log("FF"+ JSON.stringify(respones.res_result) );
        // console.log(respones.res_result.not_active['2022']);

        const Year1 = parseInt(Yearall[0]);
        const Year2 = parseInt(Yearall[1]);
        const Year3 = parseInt(Yearall[2]);
        const Year4 = parseInt(Yearall[3]);
        this.setState({year11: Year1});
        this.setState({year22: Year2});
        this.setState({year33: Year3});
        this.setState({year44: Year3});
        // this.DataHisSuses(3);
      }
    } catch (error) {}
  };

  DataHis = () => {
    try {
      const ActivitySme2 = this.state.ActivitySme;
      var number = [];
      if (ActivitySme2.length > this.state.Page) {
        for (let index = 0; index < this.state.Page; index++) {
          number.push(ActivitySme2[index]);
        }

        return number;
      } else {
        number.push(ActivitySme2);

        return number[0];
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };

  DataHisSuses = values => {
    try {
      const Actitvity2020 = this.state.ActivityYearSme[this.state.year33];
      const ActivityYear2019 = this.state.ActivityYearSme[this.state.year22];
      const ActivityYear2018 = this.state.ActivityYearSme[this.state.year11];
      var number = [];
      if (values == 1) {
        if (Actitvity2020.length > this.state.Page6) {
          for (let index = 0; index < this.state.Page6; index++) {
            number.push(Actitvity2020[index]);
          }

          return number;
        } else {
          number.push(Actitvity2020);
          return number[0];
        }
      } else if (values == 2) {
        if (ActivityYear2019.length > this.state.Page7) {
          for (let index = 0; index < this.state.Page7; index++) {
            number.push(ActivityYear2019[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2019);
          return number[0];
        }
      } else if (values == 3) {
        console.log('ATC', ActivityYear2018.length);
        if (ActivityYear2018.length > this.state.Page8) {
          for (let index = 0; index < this.state.Page8; index++) {
            number.push(ActivityYear2018[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2018);
          return number[0];
        }
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };

  ListDataHistory = ({item, index}) => {
    return (
      <View>
        {this.state.Detailhis === true && (
          <Overlay
            backdropStyle={Styles.backdrop}
            onBackdropPress={() => this.setState({Detailhis: false})}
            isVisible={this.state.Detailhis}>
            <View style={{height: height * 0.68}}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                  onPress={() => this.setState({Detailhis: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    <Image
                      style={{width: 155, height: 118}}
                      source={require('../../image/SMEsIMG.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginTop: 15,
                    }}>
                    <Text style={{fontSize: 25, color: '#163c70'}}>
                      {this.state.nameAct}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_continent')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : {this.state.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_country')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : {this.state.Country}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_goods')} {'\t\t'}
                    </Text>
                    <View style={{height: null}}>
                      <Text style={{fontSize: 20, color: '#73838f'}}>
                        :{' '}
                        {this.state.Product.map(function name(data) {
                          return data.name_th;
                        })}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_Detail')}
                      {'\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : ขอรับการสนับสนุนเข้าร่วมกิจกรรม
                    </Text>
                  </View>

                  <View style={{marginTop: 20}}>
                    {this.state.Status.map(function status(data, index) {
                      const Check = Color => {
                        var color = null;
                        if (data.status_color === 'green') {
                          return (color = '#51af12');
                        } else if (data.status_color === 'red') {
                          return (color = '#e82d2d');
                        } else if (data.status_color === 'orange') {
                          return (color = '#ffb468');
                        } else {
                          return (color = '#cad8e1');
                        }
                      };

                      return (
                        <View style={{marginTop: -20}}>
                          <View style={[Styles.OverlayView6, {bottom: -10}]}>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                backgroundColor: Check(data.status_color),
                                borderRadius: 30,
                                borderColor: 'transparent',
                              }}
                            />
                            <Text
                              style={[
                                Styles.TextOverlay4,
                                {color: Check(data.status_color)},
                              ]}>
                              {' '}
                              {data.status_name}
                            </Text>
                            <View
                              style={{
                                flex: Platform.OS === 'android' ? 0.9 : 1,
                                flexDirection: 'row-reverse',
                              }}>
                              <Text style={{fontSize: 16, color: '#73838f'}}>
                                {' '}
                                {data.status_date != ''
                                  ? data.status_date
                                  : null}
                              </Text>
                            </View>
                          </View>

                          {index != 3 ? (
                            <Image
                              style={Styles.ImgLinepoint}
                              source={require('../../image/linepoint.png')}
                            />
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>

                  <View style={Styles.OverlayView12}>
                    <TouchableOpacity
                      onPress={() => this.setState({Detailhis: false})}
                      style={Styles.Touchclose}>
                      <Text style={Styles.TextOverlay8}>
                        {I18n.t('translate_Close')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}
        <View>
          <ListItem
            style={{
              marginTop: 5,
              alignContent: 'center',
            }}
            onPress={() => {
              this.setState({Detailhis: true});

              this.setState({nameAct: item.activity_name_th});

              this.setState({location: item.continent_name_th});

              this.setState({Country: item.Country});

              this.setState({Product: item.product});

              this.setState({Status: item.activity_status});
            }}
            containerStyle={{
              width: '100%',
              height: null,
              backgroundColor: '#FFFFFF',
              borderWidth: 0,
              borderColor: '#f4f5f8',
            }}
            rightSubtitle={
              <View>
                <View style={Styles.ViewSubList3}>
                  {item.activity_status
                    .filter(function name(aa) {
                      return aa.status_active === 'Y';
                    })
                    .map(function aaa({status_date}) {
                      return (
                        <Text style={Styles.fontListDate}>{status_date}</Text>
                      );
                    })}
                </View>
                <View style={Styles.flexDirection}>
                  <Image
                    style={Styles.ImgSMEs}
                    source={require('../../image/SMEs.png')}
                  />
                </View>
              </View>
            }
            title={
              <View style={[Styles.flexDirectionRow, {width: '80%'}]}>
                <Text
                  numberOfLines={2}
                  style={[Styles.titleListHis, {lineHeight: 30}]}>
                  {item.activity_name_th}
                </Text>
              </View>
            }
            titleStyle={Styles.titleListHis}
            subtitle={
              <View>
                {/*อนุมัติเรียบร้อย */}

                <Text style={{fontSize: 16, color: '#73838f', left: 20}}>
                  {I18n.t('translate_Requesting_support')}
                </Text>

                <View>
                  {item.activity_status
                    .filter(function name(aa) {
                      return aa.status_active === 'Y';
                    })
                    .map(function aaa({
                      status_color,
                      status_date,
                      status_name,
                    }) {
                      const Check = Color => {
                        var color = null;
                        if (status_color === 'green') {
                          return (color = '#51af12');
                        } else if (status_color === 'red') {
                          return (color = '#e82d2d');
                        } else if (status_color === 'orange') {
                          return (color = '#ffb468');
                        } else {
                          return (color = '#cad8e1');
                        }
                      };
                      return (
                        <View style={[Styles.ViewSubList2, {left: 20}]}>
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderWidth: 1,
                              backgroundColor: Check(status_color),
                              borderRadius: 30,
                              borderColor: 'transparent',
                            }}
                          />
                          <Text
                            style={{fontSize: 16, color: Check(status_color)}}>
                            {' '}
                            {status_name}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            }
          />
        </View>
      </View>
    );
  };

  ListDataHistorySusess = ({item, index}) => {
    return (
      <View>
        {this.state.Detailhis === true && (
          <Overlay
            backdropStyle={Styles.backdrop}
            onBackdropPress={() => this.setState({Detailhis: false})}
            isVisible={this.state.Detailhis}>
            <View style={{height: height * 0.68}}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                  onPress={() => this.setState({Detailhis: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    <Image
                      style={{width: 155, height: 118}}
                      source={require('../../image/SMEsIMG.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginTop: 15,
                    }}>
                    <Text style={{fontSize: 25, color: '#163c70'}}>
                      {this.state.nameAct}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_continent')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : {this.state.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_country')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : {this.state.Country}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_goods')} {'\t\t'}
                    </Text>
                    <View style={{height: null}}>
                      <Text style={{fontSize: 20, color: '#73838f'}}>
                        :{' '}
                        {this.state.Product.map(function name(data) {
                          return data.name_th;
                        })}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      marginLeft: 20,
                    }}>
                    <Text style={{fontSize: 20, color: '#3a3a3a'}}>
                      {I18n.t('translate_Detail')}
                      {'\t'}
                    </Text>
                    <Text style={{fontSize: 20, color: '#73838f'}}>
                      : ขอรับการสนับสนุนเข้าร่วมกิจกรรม
                    </Text>
                  </View>

                  <View style={{marginTop: 20}}>
                    {this.state.Status.map(function status(data, index) {
                      const Check = Color => {
                        var color = null;
                        if (data.status_color === 'green') {
                          return (color = '#51af12');
                        } else if (data.status_color === 'red') {
                          return (color = '#e82d2d');
                        } else if (data.status_color === 'orange') {
                          return (color = '#ffb468');
                        } else {
                          return (color = '#cad8e1');
                        }
                      };

                      return (
                        <View style={{marginTop: -20}}>
                          <View style={[Styles.OverlayView6, {bottom: -10}]}>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                backgroundColor: Check(data.status_color),
                                borderRadius: 30,
                                borderColor: 'transparent',
                              }}
                            />
                            <Text
                              style={[
                                Styles.TextOverlay4,
                                {color: Check(data.status_color)},
                              ]}>
                              {' '}
                              {data.status_name}
                            </Text>
                            <View
                              style={{
                                flex: Platform.OS === 'android' ? 0.9 : 1,
                                flexDirection: 'row-reverse',
                              }}>
                              <Text style={{fontSize: 16, color: '#73838f'}}>
                                {' '}
                                {data.status_date != ''
                                  ? data.status_date
                                  : null}
                              </Text>
                            </View>
                          </View>

                          {index != 3 ? (
                            <Image
                              style={Styles.ImgLinepoint}
                              source={require('../../image/linepoint.png')}
                            />
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>

                  <View style={Styles.OverlayView12}>
                    <TouchableOpacity
                      onPress={() => this.setState({Detailhis: false})}
                      style={Styles.Touchclose}>
                      <Text style={Styles.TextOverlay8}>
                        {I18n.t('translate_Close')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}
        <ListItem
          onPress={() => {
            this.setState({Detailhis: true});

            this.setState({nameAct: item.activity_name_th});

            this.setState({location: item.continent_name_th});

            this.setState({Country: item.Country});

            this.setState({Product: item.product});

            this.setState({Status: item.activity_status});
          }}
          style={{
            alignContent: 'center',
          }}
          containerStyle={{
            width: '100%',
            height: null,
            backgroundColor: '#FFFFFF',

            borderWidth: 3,
            borderColor: '#f4f5f8',
          }}
          rightSubtitle={
            <View>
              <View>
                <View style={Styles.flexDirection}>
                  <Image
                    style={Styles.ImgSMEs}
                    source={require('../../image/SMEs.png')}
                  />
                </View>
              </View>
            </View>
          }
          title={
            <View style={(Styles.flexDirectionRow, {width: '80%'})}>
              <Text
                numberOfLines={2}
                style={[Styles.titleListHis, {lineHeight: 20}]}>
                {item.activity_name_th}
              </Text>
            </View>
          }
          titleStyle={Styles.titleListHis}
          subtitle={
            <View>
              {/*อนุมัติเรียบร้อย */}

              <Text style={{fontSize: 16, color: '#73838f', left: 20}}>
                {I18n.t('translate_Join')} {item.register_date}
              </Text>

              <View>
                <View style={[Styles.ViewSubList2, {left: 20}]}>
                  <Image
                    style={Styles.ImgListwating}
                    source={require('../../image/End.png')}
                  />
                  <Text style={Styles.textDateEnd}>
                    {' '}
                    {I18n.t('translate_EndAct')}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    );
  };

  componentDidMount() {
    this._getActivitySme();
    // this._getActivitySmePrivate();
  }
  // static TabHome = () => {
  //   const {navigation} = this.props;
  //   this.props.navigation.navigate('Home');
  // };

  render() {
    return (
      <View style={{}}>
        <View
          style={[
            Styles.flexDirectionRow,
            {marginTop: 15, marginHorizontal: 10},
          ]}>
          <View style={[Styles.ViewSub37, {flex: 1}]}>
            <Text style={[Styles.TextHearderSub1]}>
              {I18n.t('translate_History_SMEs_Pro')} {'(2562 - 2565)'}
            </Text>
          </View>
          <View style={[Styles.ViewSub37, {flex: 0.3}]}>
            <Image
              style={{width: 59, height: 45}}
              source={require('../../image/SMESprox.png')}
            />
          </View>
        </View>

        {this.props.SmeAuth.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              // alignSelf: 'center',
              marginTop: 10,
              // width: '100%',

              marginHorizontal: 8,
              // flex:1
              justifyContent: 'space-between',
              // justifyContent:'center'
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', flex: 1, paddingHorizontal: 5}}
              onPress={() => {
                // alert('please waiting')
                // this.setState({checkColor: false, typehis: 1});
                this.props.navigation.navigate('SmesActivityshowProduct', {
                  QuotaUse: this.props.SmeAuth[0].QuotaUse,
                  QuotaAll: this.props.SmeAuth[0].QuotaAll,
                });

                // this._getActivitySme(1);
              }}

              // style={[
              //   this.props.SmeAuth[0].QuotaUse != 6
              //     ? Styles.ViewSub16
              //     : Styles.ViewSubMax,
              //   this.state.checkColor === false
              //     ? Styles.Viewckbg2
              //     : Styles.Viewckbg1,
              //   {marginRight: 10},
              // ]}
            >
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#3eafca', '#3eafca']}
                style={{
                  height: 90,
                  borderRadius: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    color: '#FFFFFF',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {I18n.t('translate_RightsTotrade')}
                  {'\n'}
                  {/* {this.props.SmeAuth[0].QuotaUse == 6 ? 3 : this.props.SmeAuth[0].QuotaUse  } */}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    fontSize: 40,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginTop: -15,
                  }}>
                  {this.props.SmeAuth[0].QuotaUse}/
                  {this.props.SmeAuth[0].QuotaAll}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', flex: 1, paddingHorizontal: 5}}
              onPress={() => {

                this.props.navigation.navigate('SemsBusiness',{
                  QuotaUse: this.props.SmeAuth[1].QuotaUse,
                  QuotaAll: this.props.SmeAuth[1].QuotaAll,
                })

                // alert(' กำลังแก้ไข API');
                // this.setState({heightTab2:1});
                // this._getActivitySme(2);

                // this._handleTabHeight2(1);
                // this.handleIndexChange3();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#42a5ef', '#42a5ef']}
                style={{
                  height: 90,
                  borderRadius: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginTop: 10,
                  }}>
                  {I18n.t('translate_RightsToTrades')}
                  {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    fontSize: 40,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginTop: -15,
                  }}>
                  {this.props.SmeAuth[1].QuotaUse}/
                  {this.props.SmeAuth[1].QuotaAll}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', flex: 1, paddingHorizontal: 5}}
              onPress={() => {
                this.setState({checkColor: true, typehis: 2});

                alert('coming กำลังรอ API');
                // this._getActivitySme(2);

                // this._handleTabHeight2(1);
                // this.handleIndexChange3();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#2c84df', '#2c84df']}
                style={{
                  height: 90,
                  borderRadius: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginTop: 10,
                  }}>
                  {'สิทธิงานแสดงสินค้า\nเสมือนจริง'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kittithada Bold 75',
                    fontSize: 40,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginTop: -10,
                  }}>
                  {this.props.SmeAuth[1].QuotaUse}/
                  {this.props.SmeAuth[1].QuotaAll}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* <ScrollableTabView
          prerenderingSiblingsNumber={1}
          onChangeTab={item => {
            this._handleTabHeight2(item);
          }}
          tabBarActiveTextColor="#40536d"
          tabBarInactiveTextColor="#cad8e1"
          tabBarUnderlineStyle={Styles.ScrollTabView}
          tabBarTextStyle={Styles.ScrollTabText}
          renderTabBar={() => <ScrollableTabBar style={Styles.ScrollTabBar} />}>
          <View tabLabel={I18n.t('translate_Activities_actualize')} />
          <View tabLabel={I18n.t('translate_Completed_activities')} />
        </ScrollableTabView> */}

        {this.state.heightTab2 == 0 && (
          <View>
            {this.state.ActivitySme.length > 0 ? (
              <View>
                <FlatList
                  scrollEnabled={false}
                  onEndReachedThreshold={0.5}
                  style={{backgroundColor: '#f4f5f8', flex: 1}}
                  renderItem={this.ListDataHistory}
                  data={this.DataHis()}
                  extraData={this.state}
                  keyExtractor={(item, index) => index}
                />
                {this.state.ActivitySme.length > 3 && (
                  <View style={Styles.ViewSub12}>
                    <TouchableOpacity
                      style={Styles.Touchhide}
                      onPress={() => {
                        this.props.ActivitySme.length === this.state.Page
                          ? this.setState({Page: 3})
                          : this.setState({
                              Page: this.state.ActivitySme.length,
                            });
                      }}>
                      <Text style={Styles.TextHide}>
                        {' '}
                        {this.props.ActivitySme.length === this.state.Page
                          ? I18n.t('translate_Hide')
                          : I18n.t('translate_See_more')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View style={{marginBottom: 10}} />
              // <View style={{alignItems: 'center'}}>
              //   {/* //b */}
              //   <Text style={{fontSize: 25}}>
              //     {I18n.t('translate_NoHistory')}
              //   </Text>
              //   <View style={{alignItems: 'center'}}>
              //     <View style={[Styles.marginTop10, {marginBottom: 10}]}>
              //       <Image source={require('../../image/lineact2.png')} />
              //     </View>
              //   </View>
              // </View>
            )}
          </View>
        )}
        {this.state.heightTab2 == 1 && (
          <View>
            <View style={Styles.ViewSub19}>
              <Text style={{fontSize: 18, color: '#73838f'}}>
                {I18n.t('translate_fiscalyear')} :
              </Text>
            </View>
            <View style={Styles.ViewSub17}>
              <View
                style={{
                  alignItems: 'center',
                  width: '85%',
                  alignSelf: 'center',
                }}>
                <SegmentedControlTab
                  activeTabStyle={Styles.tabactive}
                  tabTextStyle={Styles.tabtext2}
                  firstTabStyle={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    marginRight: 2,
                  }}
                  lastTabStyle={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    marginRight: 2,
                  }}
                  tabStyle={Styles.tabStyle2}
                  tabsContainerStyle={Styles.tabContainer2}
                  selectedIndex={this.state.SelecIndexYear1}
                  values={[
            
                    (this.state.year33 + 543).toString(),
                    (this.state.year22 + 543).toString(),
                    (this.state.year11 + 543).toString(),
                  ]}
                  onTabPress={this.handleIndexChange3}
                />
              </View>
              {this.state.SelecIndexYear1 === 0 && (
                <View>
                  <View
                    style={{
                      width: '60%',
                      alignSelf: 'center',
                    }}>
                    <Image
                      style={{width: 11, height: 7, bottom: 2}}
                      source={require('../../image/DropDown.png')}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    {this.state.ActivityYearSme[this.state.year33].length >
                    0 ? (
                      <View>
                        <FlatList
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          data={this.DataHisSuses(1)}
                          renderItem={this.ListDataHistorySusess}
                          keyExtractor={(item, index) => index}
                        />
                        {this.state.ActivityYearSme[this.state.year33].length >
                          3 && (
                          <View style={Styles.ViewSub12}>
                            <TouchableOpacity
                              style={Styles.Touchhide}
                              onPress={() => {
                                this.state.ActivityYearSme[this.state.year33]
                                  .length === this.state.Page6
                                  ? this.setState({Page6: 3})
                                  : this.setState({
                                      Page6: this.state.ActivityYearSme[
                                        this.state.year33
                                      ].length,
                                    });
                              }}>
                              <Text style={Styles.TextHide}>
                                {' '}
                                {this.state.ActivityYearSme[this.state.year33]
                                  .length === this.state.Page6
                                  ? I18n.t('translate_Hide')
                                  : I18n.t('translate_See_more')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <Text style={{fontSize: 22}}>
                          {I18n.t('translate_NoHistory')}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                          <View style={Styles.marginTop10}>
                            <Image
                              source={require('../../image/lineact2.png')}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {this.state.SelecIndexYear1 === 1 && (
                <View>
                  <View style={[Styles.ViewSub9]}>
                    <Image
                      style={{
                        width: 11,
                        height: 7,
                        bottom: Platform.OS === 'android' ? 1 : 1,
                      }}
                      source={require('../../image/DropDown.png')}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    {this.state.ActivityYearSme[this.state.year22].length >
                    0 ? (
                      <View>
                        <FlatList
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          data={this.DataHisSuses(2)}
                          renderItem={this.ListDataHistorySusess}
                          keyExtractor={(item, index) => index}
                        />
                        {this.state.ActivityYearSme[this.state.year22].length >
                          3 && (
                          <View style={Styles.ViewSub12}>
                            <TouchableOpacity
                              style={Styles.Touchhide}
                              onPress={() => {
                                this.state.ActivityYearSme[this.state.year22]
                                  .length === this.state.Page7
                                  ? this.setState({Page7: 3})
                                  : this.setState({
                                      Page7: this.state.ActivityYearSme[
                                        this.state.year22
                                      ].length,
                                    });
                              }}>
                              <Text style={Styles.TextHide}>
                                {' '}
                                {this.state.ActivityYearSme[this.state.year22]
                                  .length === this.state.Page7
                                  ? I18n.t('translate_Hide')
                                  : I18n.t('translate_See_more')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <Text style={{fontSize: 22}}>
                          {I18n.t('translate_NoHistory')}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                          <View style={Styles.marginTop10}>
                            <Image
                              source={require('../../image/lineact2.png')}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {this.state.SelecIndexYear1 === 2 && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: '79%',
                    }}>
                    <Image
                      style={{width: 11, height: 7, bottom: 2}}
                      source={require('../../image/DropDown.png')}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    {this.state.ActivityYearSme[this.state.year11].length >
                    0 ? (
                      <View>
                        <FlatList
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          data={this.DataHisSuses(3)}
                          renderItem={this.ListDataHistorySusess}
                          keyExtractor={(item, index) => index}
                        />
                        {this.state.ActivityYearSme[this.state.year11].length >
                          3 && (
                          <View style={Styles.ViewSub12}>
                            <TouchableOpacity
                              style={Styles.Touchhide}
                              onPress={() => {
                                this.state.ActivityYearSme[this.state.year11]
                                  .length === this.state.Page8
                                  ? this.setState({Page8: 3})
                                  : this.setState({
                                      Page8: this.state.ActivityYearSme[
                                        this.state.year11
                                      ].length,
                                    });
                              }}>
                              <Text style={Styles.TextHide}>
                                {''}
                                {/* {this.state.ActivityYearSme[this.state.year11].length} */}
                                {this.state.ActivityYearSme[this.state.year11]
                                  .length === this.state.Page8
                                  ? I18n.t('translate_Hide')
                                  : I18n.t('translate_See_more')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <Text style={{fontSize: 22}}>
                          {I18n.t('translate_NoHistory')}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                          <View style={Styles.marginTop10}>
                            <Image
                              source={require('../../image/lineact2.png')}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
  getImg: state.authReducer.getImg,
  getStatus: state.dataReducer.getStatus,
  getNotification: state.authReducer.getNotification,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// const styles12 = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//     fontSize: 28,
//   },
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmeAct);
