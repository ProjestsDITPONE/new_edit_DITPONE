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
import Headers from '../../components/Headers';
import Headerstage5 from '../../components/Headerstage5';
import {
  getActivitySme,
  getActivitySmePrivate,
} from '../../actions/data.actions';
import {connect} from 'react-redux';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../../lib_edit/react-native-scrollable-tab-view';
import { ViewScale } from '../../config/ViewScale';
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
    <Text style={{fontSize: ViewScale(20), textAlign: 'center'}}>{label}</Text>
    <Text style={Styles.instructions}>{text}</Text>
  </View>
);
const Tab = ({tab, page, isTabActive, onPressHandler, onTabLayout, Styles}) => {
  const {label, icon} = tab;
  const style = {
    marginHorizontal: ViewScale(15),
    paddingVertical: ViewScale(5),
    // marginLeft:Platform.OS==='ios'? 10:10
  };
  const containerStyle = {
    paddingHorizontal: ViewScale(20),
    paddingVertical: ViewScale(5),
    borderRadius: ViewScale(25),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Styles.backgroundColor,
    opacity: Styles.opacity,
    transform: [{scale: Styles.opacity}],
  };
  const textStyle = {
    color: '#FFF',
    fontWeight: '800',
    fontSize: ViewScale(20),
    textAlign: 'center',
  };
  const iconStyle = {
    tintColor: Styles.textColor,
    resizeMode: 'contain',
    width: ViewScale(80),
    height: ViewScale(22),
    marginLeft: ViewScale(10),
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
class SmesActivityProduct extends React.Component {
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
      Page9: 3,
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

  chageTabmenu = item => {
    this.setState({heightTab2: item});
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
    console.log('Chit' + value, this.props.authData.token);
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
        console.log(respones.res_result);
        console.log(respones.res_result.not_active['2019']);

        const Year1 = parseInt(Yearall[0]);
        const Year2 = parseInt(Yearall[1]);
        const Year3 = parseInt(Yearall[2]);
        const Year4 = parseInt(Yearall[3]);
        this.setState({year11: Year1});
        this.setState({year22: Year2});
        this.setState({year33: Year3});
        this.setState({year44: Year4});
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
    // alert(values)
    try {
      const Actitvity2021 = this.state.ActivityYearSme[this.state.year44];
      const Actitvity2020 = this.state.ActivityYearSme[this.state.year33];
      const ActivityYear2019 = this.state.ActivityYearSme[this.state.year22];
      const ActivityYear2018 = this.state.ActivityYearSme[this.state.year11];
      var number = [];
      if(Actitvity2021.length > this.state.Page9){
        for (let index = 0; index < this.state.Page9; index++) {
          number.push(Actitvity2021[index]);
        }

      }
      else if(values == 2) {
        if (Actitvity2020.length > this.state.Page6) {
          for (let index = 0; index < this.state.Page6; index++) {
            number.push(Actitvity2020[index]);
          }

          return number;
        } else {
          number.push(Actitvity2020);
          return number[0];
        }
      } else if (values == 3) {
        if (ActivityYear2019.length > this.state.Page7) {
          for (let index = 0; index < this.state.Page7; index++) {
            number.push(ActivityYear2019[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2019);
          return number[0];
        }
      } else if (values == 4) {
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
                      style={{width: ViewScale(155), height: ViewScale(118)}}
                      source={require('../../image/SMEsIMG.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: ViewScale(20),
                      marginTop: ViewScale(15),
                    }}>
                    <Text style={{fontSize: ViewScale(25), color: '#163c70'}}>
                      {this.state.nameAct}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_continent')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {this.state.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_country')} {'\t\t'}
                    </Text>
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {this.state.Country}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_goods')} {'\t\t'}
                    </Text>
                    <View style={{height: null}}>
                      <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
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

                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_Detail')}
                      {'\t'}
                    </Text>
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {I18n.t('translate_Requesting_support')}
                    </Text>
                  </View>

                  <View style={{marginTop: ViewScale(20)}}>
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
                        <View style={{marginTop: ViewScale(-20)}}>
                          <View style={[Styles.OverlayView6, {bottom: ViewScale(-10)}]}>
                            <View
                              style={{
                                width: ViewScale(10),
                                height: ViewScale(10),
                                borderWidth: 1,
                                backgroundColor: Check(data.status_color),
                                borderRadius: ViewScale(30),
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
                                flex: Platform.OS === 'android' ? ViewScale(0.9) : ViewScale(1),
                                flexDirection: 'row-reverse',
                              }}>
                              <Text style={{fontSize: ViewScale(16), color: '#73838f'}}>
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
              marginTop: ViewScale(5),
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
                  style={[Styles.titleListHis, {lineHeight: ViewScale(30)}]}>
                  {item.activity_name_th}
                </Text>
              </View>
            }
            titleStyle={Styles.titleListHis}
            subtitle={
              <View>
                {/*อนุมัติเรียบร้อย */}

                <Text style={{fontSize: 16, color: '#73838f', left: ViewScale(20)}}>
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
                        <View style={[Styles.ViewSubList2, {left: ViewScale(20)}]}>
                          <View
                            style={{
                              width: ViewScale(10),
                              height: ViewScale(10),
                              borderWidth: 1,
                              backgroundColor: Check(status_color),
                              borderRadius: ViewScale(30),
                              borderColor: 'transparent',
                            }}
                          />
                          <Text
                            style={{fontSize: ViewScale(16), color: Check(status_color)}}>
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

  Showdate = values => {
    if (values != undefined) {
      var time2 = values.split(' ');
      // var time2 = values.split('-').join('/');
      console.log(time2[0]);

      var time = time2[0].split('-');
      var yearthai = parseInt(time[0]);
      var yearthai2 = yearthai + 543;
      var timedate = time[2] + '/' + time[1] + '/' + yearthai2;
      return timedate;
    } else {
      return values;
    }
  };

  ListDataHistorySusess = ({item, index}) => {
    return (
      <View style={{}}>
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
                      style={{width: ViewScale(155), height: ViewScale(118)}}
                      source={require('../../image/SMEsIMG.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: ViewScale(20),
                      marginTop: ViewScale(15),
                    }}>
                    <Text style={{fontSize: ViewScale(25), color: '#163c70'}}>
                      {this.state.nameAct}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_continent')} {'\t\t'}
                    </Text>
                    {I18n.locale === 'th' ?(
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      :  {this.state.CountryTH}
                    </Text>
                    ):(
                      <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      :  {this.state.CountryEN}
                    </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_country')} {'\t\t'}
                    </Text>
                    {I18n.locale === 'th' ? ( 
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {this.state.locationTH}
                    </Text>
                    ): ( 
                      <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {this.state.locationEN}
                    </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_goods')} {'\t\t'}
                    </Text>
                    <View style={{height: null}}>
                      {this.state.Product != ''  ? (
                      <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                        :{' '}
                        {this.state.Product.map(function name(data) {
                          return data.name_th;
                        })}
                      </Text>
                      ):(
                        <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                        :{' - '}
                        
                      </Text>


                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      marginLeft: ViewScale(20),
                    }}>
                    <Text style={{fontSize: ViewScale(20), color: '#3a3a3a'}}>
                      {I18n.t('translate_Detail')}
                      {'\t'}
                    </Text>
                    <Text style={{fontSize: ViewScale(20), color: '#73838f'}}>
                      : {I18n.t('translate_Requesting_support')}
                    </Text>
                  </View>

                  <View style={{margin: ViewScale(10)}}>
                    <Image
                      style={{width: ViewScale(334), height: ViewScale(1)}}
                      source={require('../../image/line6.png')}
                    />
                  </View>

                  <View style={{marginTop: ViewScale(30)}}>
                    {this.state.Status.map(function status(data, index) {
                      // const Check = Color => {
                      //   var color = null;
                      //   if (data.status_color === 'green') {
                      //     return (color = '#51af12');
                      //   } else if (data.status_color === 'red') {
                      //     return (color = '#e82d2d');
                      //   } else if (data.status_color === 'orange') {
                      //     return (color = '#ffb468');
                      //   } else {
                      //     return (color = '#cad8e1');
                      //   }
                      // };

                      return (
                        <View style={{marginTop: ViewScale(-20), marginHorizontal: ViewScale(40)}}>
                          {index == 0 && (
                            <View style={{marginBottom: ViewScale(15)}}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={{width: ViewScale(12), height: ViewScale(12), marginTop: ViewScale(5)}}
                                  source={require('../../image/pontone1.png')}
                                />

                                <Text style={{fontSize: ViewScale(18), color: '#2d6dc4'}}>
                                  {' '}
                                  {data.status_name}
                                </Text>
                              </View>
                              <Image
                                style={{
                                  width: ViewScale(2),
                                  height: ViewScale(17),
                                  marginLeft: ViewScale(4.5),
                                  marginTop: ViewScale(-3),
                                }}
                                source={require('../../image/linepont1.png')}
                              />
                            </View>
                          )}
                          {index == 1 && (
                            <View style={{marginBottom: ViewScale(15), marginTop: ViewScale(3)}}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={{width: ViewScale(12), height: ViewScale(12), marginTop: ViewScale(5)}}
                                  source={require('../../image/point2.png')}
                                />

                                <Text style={{fontSize: ViewScale(18), color: '#2d6dc4'}}>
                                  {' '}
                                  {data.status_name}
                                </Text>
                              </View>
                              <Image
                                style={{
                                  width: ViewScale(2),
                                  height: ViewScale(17),
                                  marginLeft: ViewScale(4.5),
                                  marginTop: ViewScale(-3),
                                }}
                                source={require('../../image/linepoint2.png')}
                              />
                            </View>
                          )}
                          {index == 2 && (
                            <View style={{marginBottom: ViewScale(15), marginTop: ViewScale(3)}}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={{width: ViewScale(12), height: ViewScale(12), marginTop: ViewScale(5)}}
                                  source={require('../../image/point3.png')}
                                />

                                <Text style={{fontSize: ViewScale(18), color: '#2d6dc4'}}>
                                  {' '}
                                  {data.status_name}
                                </Text>
                              </View>
                              <Image
                                style={{
                                  width: ViewScale(2),
                                  height: ViewScale(30),
                                  marginLeft: ViewScale(4.5),
                                  marginTop: ViewScale(-3),
                                }}
                                source={require('../../image/linepoint3.png')}
                              />
                            </View>
                          )}
                          {index == 3 && (
                            <View style={{marginBottom: ViewScale(15), marginTop: ViewScale(3)}}>
                              <View style={{flexDirection: 'row'}}>
                                {/* <Image
                                  style={{width: 12, height: 12, marginTop: 5}}
                                  source={require('../../image/point3.png')}
                                /> */}
                                <View
                                  style={{
                                    width: ViewScale(12),
                                    height: ViewScale(12),
                                    marginTop: ViewScale(5),
                                    backgroundColor: '#FFFFFF',
                                    borderWidth: 1,
                                    borderColor: '#5dbde6',
                                    borderRadius: ViewScale(8),
                                  }}
                                />

                                <TouchableOpacity
                                  style={{
                                    width: ViewScale(135),
                                    height: ViewScale(50),
                                    borderColor: '#5dbde6',
                                    borderWidth: 1,
                                    borderRadius: ViewScale(8),
                                    justifyContent: 'center',
                                    marginHorizontal: ViewScale(15),
                                    marginTop: ViewScale(-10),
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: ViewScale(25),
                                      color: '#2d6dc4',
                                      textAlign: 'center',
                                    }}>
                                    {I18n.t('translate_Approved')}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
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

            this.setState({locationTH:item.country_name_th, locationEN:item.country_name_en});
            // continent_name_th
            this.setState({CountryTH: item.continent_name_th,CountryEN:item.continent_name_en}); 

            this.setState({Product: item.product});

            this.setState({Status: item.activity_status});
          }}
          style={{
            alignContent: 'center',
          }}
          containerStyle={{
            width: '100%',
            height: null,
            borderWidth: ViewScale(3),
            borderColor: '#f4f5f8',
          }}
          rightSubtitle={
            <View>
              <View>
              <Text
                  style={{alignSelf: 'center', color: '#73838f', fontSize: ViewScale(16)}}>
                  {I18n.t('transalte_application_submission_date')}
                 
                </Text>
                <Text
                  style={{alignSelf: 'center', color: '#73838f', fontSize: ViewScale(16)}}>
                
                  {this.Showdate(item.register_date)}
                </Text>
                <View style={(Styles.flexDirection, {})}>
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
                style={[Styles.titleListHis, {lineHeight: ViewScale(20)}]}>
                {item.activity_name_th}
              </Text>
            </View>
          }
          titleStyle={Styles.titleListHis}
          subtitle={
            <View>
              {/*อนุมัติเรียบร้อย */}
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f', left: ViewScale(20)}}>
                  {I18n.t('translate_country')} :
                </Text>

                <Text style={{fontSize: ViewScale(18), color: '#163c70', left: ViewScale(20)}}>
                  {' '}
                  {item.country_name_th} 
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f', left: ViewScale(20)}}>
                  {I18n.t('transalte_Event_date')} :
                </Text>

                <Text style={{fontSize: ViewScale(18), color: '#163c70', left: ViewScale(20)}}>
                  {' '}
                  {this.Showdate(item.activity_start_date)}
                  {' - '}
                  {this.Showdate(item.activity_end_date)}
                </Text>
              </View>

              <View>
                <View style={[Styles.ViewSubList2, {left: ViewScale(20)}]}>
                  <Image
                    style={Styles.ImgListwating}
                    source={require('../../image/End.png')}
                  />
                  <Text  numberOfLines={1} style={Styles.textDateEnd}>
                    {' '}
                    {/* {I18n.t('translate_EndAct')} */}
                    {I18n.t('transalte_application_status')}{' : '} {item.activity_status[3].status_name}
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
    this._getActivitySme(1);
    // this._getActivitySmePrivate();

    console.log('<MMMMM></MMMMM>');
  }
  // static TabHome = () => {
  //   const {navigation} = this.props;
  //   this.props.navigation.navigate('Home');
  // };

  render() {
    const {QuotaUse} = this.props.route.params;
    const {QuotaAll} = this.props.route.params;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View
          style={{
            marginTop: Platform.OS === 'android' && ViewScale(90),
          }}
        />
        <Headerstage5
          nameTab={I18n.t('translate_RightsTotrade')}
          nameTab2={QuotaUse}
          nameTab3={QuotaAll}
        />
        {/* <View
          style={[
            Styles.flexDirectionRow,
            {marginTop: 15, marginHorizontal: 10},
          ]}>
          <View style={[Styles.ViewSub37, {flex: 1}]}>
            <Text style={[Styles.TextHearderSub1]}>
           { QuotaAll}
            </Text>
          </View>
          <View style={[Styles.ViewSub37, {flex: 0.3}]}>
            <Image
              style={{width: 59, height: 45}}
              source={require('../../image/SMESprox.png')}
            />
          </View>
        </View> */}

        {/* <ScrollableTabView
          prerenderingSiblingsNumber={1}
          onChangeTab={item => {
            this._handleTabHeight2(item);
          }}
          tabBarActiveTextColor="#40536d"
          tabBarInactiveTextColor="#cad8e1"
          tabBarUnderlineStyle={{
            width: 0,
            height: 3,
            backgroundColor: '#40536d',
          }}
          tabBarTextStyle={Styles.ScrollTabText}
          renderTabBar={() => <ScrollableTabBar style={Styles.ScrollTabBar} />
          
          }> */}
        <View
          style={{
            borderWidth: 1,

            flexDirection: 'row',
            borderColor: '#5dbde6',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.chageTabmenu(1);
            }}
            style={Styles.Touchmenustory1}>
            <LinearGradient
              start={{x: 0, y: 0.7}}
              end={{x: 0.8, y: 0}}
              colors={
                this.state.heightTab2 == 1
                  ? ['#5dbde6', '#1d61bd']
                  : ['#FFFFFF', '#FFFFFF']
              }
              style={{height: ViewScale(42), justifyContent: 'center'}}>
              <Text
                style={
                  this.state.heightTab2 == 1
                    ? Styles.textmeenustory
                    : Styles.textmeenustory2
                }>
                {I18n.t('translate_Activities_actualize')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.chageTabmenu(2);
            }}
            style={Styles.Touchmenustory2}>
            <LinearGradient
              start={{x: 0, y: 0.7}}
              end={{x: 0.8, y: 0}}
              colors={
                this.state.heightTab2 == 2
                  ? ['#5dbde6', '#1d61bd']
                  : ['#FFFFFF', '#FFFFFF']
              }
              style={{height: ViewScale(42), justifyContent: 'center'}}>
              <Text
                style={
                  this.state.heightTab2 == 2
                    ? Styles.textmeenustory
                    : Styles.textmeenustory2
                }>
                {I18n.t('translate_Completed_activities')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View>
          {this.state.heightTab2 == 0 && (
            <View>
              {this.state.ActivitySme.length > 0 ? (
                <View style={{flex: 1}}>
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
                // <View style={{marginBottom:10}}> </View>
                <View style={{alignItems: 'center',marginTop:height*0.3}}>
                  {/* //b */}
                  <Text style={{fontSize: ViewScale(22)}}>
                    {I18n.t('translate_NoHistory')}
                  </Text>
                  {/* <View style={{alignItems: 'center'}}>
                    <View style={[Styles.marginTop10, {marginBottom: 10}]}>
                      <Image source={require('../../image/lineact2.png')} />
                    </View>
                  </View> */}
                </View>
              )}
            </View>
          )}
        </View>
        <View>
          {this.state.heightTab2 == 1 && (
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
                // <View style={{marginBottom:10}}> </View>
                <View style={{alignItems: 'center',marginTop:height*0.3}}>
                  {/* //b */}
                  <Text style={{fontSize: ViewScale(22)}}>
                    {I18n.t('translate_NoHistory')}
                  </Text>
                  {/* <View style={{alignItems: 'center'}}>
                    <View style={[Styles.marginTop10, {marginBottom: 10}]}>
                      <Image source={require('../../image/lineact2.png')} />
                    </View>
                  </View> */}
                </View>
              )}
            </View>
          )}
        </View>
        <View>
          {this.state.heightTab2 == 2 && (
            <View style={{marginTop: ViewScale(10)}}>
              {/* <View style={{}}>
               <Text style={{fontSize: 18, color: '#73838f'}}>
                 {I18n.t('translate_fiscalyear')} :
               </Text>
             </View> */}
              <View style={{width: '100%', alignSelf: 'center'}}>
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
                      borderTopLeftRadius: ViewScale(8),
                      borderBottomLeftRadius: ViewScale(8),
                      borderTopRightRadius: ViewScale(8),
                      borderBottomRightRadius: ViewScale(8),
                      marginRight: ViewScale(2),
                    }}
                    lastTabStyle={{
                      borderTopLeftRadius: ViewScale(8),
                      borderBottomLeftRadius: ViewScale(8),
                      borderTopRightRadius: ViewScale(8),
                      borderBottomRightRadius: ViewScale(8),
                      marginRight: ViewScale(2),
                    }}
                    tabStyle={{
                      borderColor: '#FFFFFF',
                      width: '50%',
                      height: ViewScale(31),
                      backgroundColor: '#d8d8d8',
                      paddingVertical: 1,
                      justifyContent: 'center',
                      borderRadius: ViewScale(8),
                      padding: ViewScale(20),
                    }}
                    tabsContainerStyle={Styles.tabContainer2}
                    selectedIndex={this.state.SelecIndexYear1}
                    values={[
                      (this.state.year44 + 543).toString(),
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
                        width: '65%',
                        alignSelf: 'center',
                        
                      }}>
                      <Image
                        style={{width: ViewScale(11), height: ViewScale(7), bottom: ViewScale(2)}}
                        source={require('../../image/DropDown.png')}
                      />
                    </View>

                    <View style={{height:height*0.6}}>
                      {this.state.ActivityYearSme[this.state.year44].length >
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
                          {this.state.ActivityYearSme[this.state.year44]
                            .length > 3 && (
                            <View style={Styles.ViewSub12}>
                              <TouchableOpacity
                                style={Styles.Touchhide}
                                onPress={() => {
                                  this.state.ActivityYearSme[this.state.year44]
                                    .length === this.state.Page9
                                    ? this.setState({Page9: 3})
                                    : this.setState({
                                        Page9: this.state.ActivityYearSme[
                                          this.state.year44
                                        ].length,
                                      });
                                }}>
                                <Text style={Styles.TextHide}>
                                  {' '}
                                  {this.state.ActivityYearSme[this.state.year44]
                                    .length === this.state.Page9
                                    ? I18n.t('translate_Hide')
                                    : I18n.t('translate_See_more')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      ) : (
                        <View style={{alignItems: 'center',marginTop:height*0.3}}>
                          <Text style={{fontSize: ViewScale(22)}}>
                            {I18n.t('translate_NoHistory')}
                          </Text>
                          {/* <View style={{alignItems: 'center'}}>
                            <View style={Styles.marginTop10}>
                              <Image
                                source={require('../../image/lineact2.png')}
                              />
                            </View>
                          </View> */}
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {this.state.SelecIndexYear1 === 1 && (
                  <View>
                    <View style={{ width: '78%',alignItems:'center'}}>
                      <Image
                        style={{
                          width: ViewScale(11),
                          height: ViewScale(7),
                          bottom: Platform.OS === 'android' ? 1 : 1,
                        }}
                        source={require('../../image/DropDown.png')}
                      />
                    </View>

                    <View style={{height:height*0.6}}>
                      {this.state.ActivityYearSme[this.state.year33].length >
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
                          {this.state.ActivityYearSme[this.state.year33]
                            .length > 3 && (
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
                        <View style={{alignItems: 'center',marginTop:height*0.3}}>
                          <Text style={{fontSize: ViewScale(22)}}>
                            {I18n.t('translate_NoHistory')}
                          </Text>
                          {/* <View style={{alignItems: 'center'}}>
                            <View style={Styles.marginTop10}>
                              <Image
                                source={require('../../image/lineact2.png')}
                              />
                            </View>
                          </View> */}
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {this.state.SelecIndexYear1 === 2 && (
                  <View style={{}}>
                    <View
                      style={{
                        alignItems:'flex-end',
                        width: '62%',
                       
                      }}>
                      <Image
                        style={{width: ViewScale(11), height: ViewScale(7), bottom: ViewScale(2)}}
                        source={require('../../image/DropDown.png')}
                      />
                    </View>

                    <View style={{height:height*0.6}}>
                      {this.state.ActivityYearSme[this.state.year22].length >
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
                          {this.state.ActivityYearSme[this.state.year22]
                            .length > 3 && (
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
                                  {''}
                                  {/* {this.state.ActivityYearSme[this.state.year22].length} */}
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
                        <View style={{alignItems: 'center',marginTop:height*0.3}}>
                          <Text style={{fontSize: ViewScale(22)}}>
                            {I18n.t('translate_NoHistory')}
                          </Text>
                          {/* <View style={{alignItems: 'center'}}>
                            <View style={Styles.marginTop10}>
                              <Image
                                source={require('../../image/lineact2.png')}
                              />
                            </View>
                          </View> */}
                        </View>
                      )}
                    </View>
                  </View>
                )}
                {this.state.SelecIndexYear1 === 3 && (
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        width: '83%',
                    
                      }}>
                      <Image
                        style={{width: ViewScale(11), height: ViewScale(7), bottom: 2}}
                        source={require('../../image/DropDown.png')}
                      />
                    </View>

                    <View style={{height:height*0.6}}>
                      {this.state.ActivityYearSme[this.state.year11].length >
                      0 ? (
                        <View>
                          <FlatList
                            style={{
                              backgroundColor: 'transparent',
                            }}
                          
                            data={this.DataHisSuses(4)}
                            renderItem={this.ListDataHistorySusess}
                            keyExtractor={(item, index) => index}
                          />
                          {this.state.ActivityYearSme[this.state.year11]
                            .length > 3 && (
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
                        <View style={{alignItems: 'center',marginTop:height*0.3}}>
                          <Text style={{fontSize: ViewScale(22)}}>
                            {I18n.t('translate_NoHistory')}
                          </Text>
                          {/* <View style={{alignItems: 'center'}}>
                            <View style={Styles.marginTop10}>
                              <Image
                                source={require('../../image/lineact2.png')}
                              />
                            </View>
                          </View> */}
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>

            </View>
          )}
        </View>
        {/* </ScrollableTabView> */}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmesActivityProduct);
