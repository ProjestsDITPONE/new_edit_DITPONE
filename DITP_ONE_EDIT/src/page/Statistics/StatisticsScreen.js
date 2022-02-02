import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SegmentedControlTab2 from '../../lib_edit/react-native-segmented-control-tabstatics';
import Style from './Styles';
import DataStatic from '../../Data/DataStatics';
import { ViewScale } from '../../config/ViewScale';
import I18n from '../../utils/I18n';
import {getStatistics} from '../../actions/data.actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from '../../lib_edit/react-native-picker-select';
import FastImage from 'react-native-fast-image';
import SlideDownPanel from '../../lib_edit/react-native-slide-down-panel';
class StatisticsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      selectedIndex1: 0,
      dataStatistics: false,
      itemsCount: 5,
      yearSelect: 1,
      typeSelect: 1,
      typeMoneySelect: 1,
      mySelect: false,
      Y1: 'year1_value',
      Y2: 'year2_value',
      YCH1: 'year1_change',
      YCH2: 'year2_change',
      YCH3: 'year3_change',
    };
  }

  _getStatistics = async values => {
    const _typeSelect = values || this.state.typeSelect;
    const _typeMoneySelect = values || this.state.typeMoneySelect;
    try {
      const payload = {
        result: {
          tab_type: this.state.selectedIndex + 1,
          type: _typeSelect,
          type_money: _typeMoneySelect,
          year: this.state.yearSelect,
        },
      };

      console.log('URLOOOOO', payload);
      const response = await this.props.dispatch(getStatistics(payload));
      if (response.res_code === '00') {
        this.setState({
          dataStatistics: response.res_result.content,
        });
      }
      console.log('response.res_result.content');
      console.log(response.res_result.content);
    } catch (error) {}
  };

  cksub = async values => {
    // alert(values)
    return values;
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this._getStatistics();
      SlideDownPanel.hideHeader();
    });
    this._getStatistics();
  }

  loadmore() {
    this.setState({
      itemsCount: 100,
    });
  }
  cutTextyear = values => {
    // alert(values)
    var year = values.substring(2, 5);
    console.log('CUTUTU' + year);
    return year;
  };

  clickarrow(page) {
    this.setState({yearSelect: page, itemsCount: 5}, function() {
      this._getStatistics();
    });

    if (page === 1) {
      this.setState({
        Y1: 'year1_value',
        Y2: 'year2_value',
        YCH1: 'year1_change',
      });
    } else if (page === 2) {
      this.setState({
        Y1: 'year3_value',
        Y2: 'year4_value',
        YCH1: 'year3_change',
      });
    } else if (page === 3) {
      this.setState({
        Y1: 'year4_value',
        Y2: 'year5_value',
        YCH1: 'year4_change',
      });
    }
  }

  exportChange(value) {
    console.log('OKOKO', value);
    this.setState({typeSelect: value}, function() {
      this.exportSelect();
    });
  }
  exportSelect(value) {
    console.log('GOGOGGO', value);
    this._getStatistics(value);
  }

  MoneyChange(value) {
    // alert('MMMMMM'+ value);
    this.setState({typeMoneySelect: value}, function() {
      this.MoneySelect();
    });
  }
  MoneySelect(value) {
    this._getStatistics(value);
  }

  handleIndexChange = (index, number) => {
    // alert('Texttestsete', index);
    this.setState(
      {
        ...this.state,
        selectedIndex: index,
      },
      function() {
        this._getStatistics();
      },
    );
  };
  handleIndexChange1 = (index, number) => {
    console.log('handleIndexChange1', index);
    this.setState(
      {
        selectedIndex1: index,
        typeSelect: index + 1,
      },
      function() {
        // this.exportChange(index)
        this.exportSelect();
      },
    );
  };

  ListRanking = ({item, index}) => {
    return (
      <View>
        <View style={[Style.ViewSub15, {}]}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: ViewScale(8),
              flexDirection: 'row',
            }}>
            {/* ใส่สามเหลี่ยมตรงงรน่ี */}
            {/* <View style={{flex: 1, flexDirection: 'row', }}> */}
            <TouchableOpacity
              onPress={() => {
                //  console.log(item.link_lv2)
                this.props.navigation.navigate('ViewStaticsScren', {
                  link2: item.link_lv2,
                  uriimg: item.flag_url,
                  namecontry: I18n.locale === 'th' ? item.title : item.titleEng,
                  tabtype: this.state.selectedIndex + 1,
                  tabMoney: this.state.typeMoneySelect,
                });
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontSize: ViewScale(18), color: '#014886', marginLeft: ViewScale(5)}}>
                {index + 1}
              </Text>
              {/* {this.state.typeSelect=== 1 &&( */}
              <FastImage
                style={{width: ViewScale(26), height: ViewScale(18), left: ViewScale(5)}}
                source={
                  item.flag_url === 'http://one.ditp.go.th/Flags/none@1x.png'
                    ? {uri: ''}
                    : {uri: item.flag_url}
                }
              />
              {/* <FastImage
                style={{width: 26, height: 18, left: 5}}
                source={{uri: item.flag_url}}
              /> */}
              {/* )}  */}
              {item.flag_url === 'http://one.ditp.go.th/Flags/none@1x.png' ? (
                <Text
                  numberOfLines={2}
                  style={{
                    flex: 0.8,
                    fontSize: ViewScale(18),
                    color: '#014886',
                    left: ViewScale(-11),
                  }}>
                  {I18n.locale === 'th' ? item.title : item.titleEng}
                </Text>
              ) : (
                <Text
                  numberOfLines={2}
                  style={{fontSize: ViewScale(18), color: '#014886'}}>
                  {'   '}
                  {I18n.locale === 'th' ? item.title : item.titleEng}
                </Text>
              )}

              {item.flag_url === 'http://one.ditp.go.th/Flags/none@1x.png' ? (
                <View />
              ) : (
                <Image
                  style={{width: ViewScale(10), height: ViewScale(8), top: ViewScale(10), marginLeft: ViewScale(5)}}
                  source={require('../../image/shape.png')}
                />
              )}
            </TouchableOpacity>
            {/* </View> */}
            {index === 0 && (
              <TouchableOpacity
                style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: ViewScale(18), color: '#014886'}}>
                  % Chg {this.state.type}{' '}
                  {this.state.dataStatistics &&
                    this.state.yearSelect === 1 &&
                    '(' +
                      this.cutTextyear(this.state.dataStatistics.header.year1) +
                      '/' +
                      this.cutTextyear(this.state.dataStatistics.header.year2) +
                      ')'}
                  {this.state.dataStatistics &&
                    this.state.yearSelect === 2 &&
                    '(' +
                      this.cutTextyear(this.state.dataStatistics.header.year2) +
                      '/' +
                      this.cutTextyear(this.state.dataStatistics.header.year4) +
                      ')'}
                  {this.state.dataStatistics &&
                    this.state.yearSelect === 3 &&
                    '(' +
                      this.cutTextyear(this.state.dataStatistics.header.year4) +
                      '/' +
                      this.cutTextyear(this.state.dataStatistics.header.year5) +
                      ')'}
                </Text>
                <Image
                  style={{width: ViewScale(10), height: ViewScale(8), top: ViewScale(10), marginLeft: 5}}
                  source={require('../../image/shape.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[Style.ViewSub9, {height: ViewScale(28)}]}>
          {/* ปีที่1 */}
          {this.state.yearSelect === 1 && (
            <>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year1_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year2_value}
                </Text>
              </View>
              {item.year1_change > '0' && (
                <View
                  style={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#d0e8c0',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#42a300'}}>
                          {item.year1_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}}>
                        {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {item.year1_change < '0' && (
                <View
                  style={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#f3c0c6',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                          {item.year1_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}}>
                        {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          {/* ปีที่2 */}
          {this.state.yearSelect === 2 && (
            <>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year3_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year4_value}
                </Text>
              </View>
              {item.year3_change > '0' && (
                <View
                  style={{
                    width: '34%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#d0e8c0',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#42a300'}}>
                          {item.year3_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}}>
                        {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {item.year3_change < '0' && (
                <View
                  style={{
                    width: '34%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#f3c0c6',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                          {item.year3_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}} />
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          {/* ปีที่3 */}
          {this.state.yearSelect === 3 && (
            <>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year4_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                  {item.year5_value}
                </Text>
              </View>
              {item.year4_change > '0' && (
                <View
                  style={{
                    width: '34%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#d0e8c0',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '65%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#42a300'}}>
                          {item.year4_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}}>
                        {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {item.year4_change < '0' && (
                <View
                  style={{
                    width: '34%',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flex: 1,
                    backgroundColor: '#f3c0c6',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '25%'}}>
                        <Image
                          style={{width: ViewScale(10), height: ViewScale(5)}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '65%', alignItems: 'center'}}>
                        <Text style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                          {item.year4_change}
                        </Text>
                      </View>
                      <View style={{width: '20%'}} />
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  render() {
    const {abc} = this.props.route.params;

    return (
      <View style={Style.ViewSub1}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={abc}
        />

        <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
        <Headerstage nameTab={I18n.t('translate_StatisticsH')} />
        <ScrollView style={{zIndex: -1}}>
          <View
            style={{
              marginHorizontal: ViewScale(10),
            }}>
            <View style={{paddingLeft: ViewScale(15), flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: ViewScale(24),
                    color: '#2d6dc4',
                    fontFamily: 'PSL Kittithada Pro',
                  }}>
                  {I18n.t('translate_Statistics')}
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {this.state.typeMoneySelect === 1 && (
                  <Text
                    style={{
                      fontSize: ViewScale(18),
                      color: '#2d6dc4',
                      fontFamily: 'PSL Kittithada Pro',
                      textAlign: 'right',
                    }}>
                    {/* {I18n.t('translate_USD')} */}
                  </Text>
                )}
                {this.state.typeMoneySelect === 2 && (
                  <Text
                    style={{
                      fontSize: ViewScale(18),
                      color: '#2d6dc4',
                      fontFamily: 'PSL Kittithada Pro',
                      textAlign: 'right',
                    }}>
                    {/* {I18n.t('transalte_THB')} */}
                  </Text>
                )}
              </View>
              <View style={{flex: 0.5}}>
                <RNPickerSelect
                  doneText={I18n.t('transalte_Done_text')}
                  fixAndroidTouchableBug={false}
                  useNativeAndroidPickerStyle={false}
                  style={
                    (Style.TextSelec,
                    {
                      inputAndroid: {
                        fontSize: ViewScale(18),
                        fontWeight: 'bold',
                        // backgroundColor: "#eee",
                        paddingHorizontal: ViewScale(10),
                        paddingVertical: ViewScale(8),
                        borderWidth: 0.5,
                        borderColor: 'transparent',
                        borderRadius: ViewScale(8),
                        color: 'black',
                        // borderWidth:1

                        // paddingRight: 30,
                      },
                    })
                  }
                  textInputProps={{
                    style: Style.TextSelec1,
                  }}
                  placeholder={{}}
                  onValueChange={value => {
                    if (Platform.OS === 'android') {
                      this.MoneyChange(value);
                      // this.state.typeMoneySelect
                    }

                    this.setState({typeMoneySelect: value});
                  }}
                  onDonePress={value => {
                    this.MoneySelect(value);
                  }}
                  value={this.state.typeMoneySelect}
                  items={[
                    {
                      label: I18n.t('translate_USD'),
                      value: 1,
                    },
                    {label: I18n.t('transalte_THB'), value: 2},
                  ]}
                  Icon={test => {
                    return (
                      <Icon
                        name="caretdown"
                        size={ViewScale(15)}
                        color="#014886"
                        style={{top: ViewScale(8), right: ViewScale(10)}}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View style={[Style.ViewTab]}>
              <SegmentedControlTab
                tabsContainerStyle={{borderRadius: ViewScale(8), height: ViewScale(40)}}
                tabStyle={Style.TabStyle}
                tabTextStyle={Style.TabText}
                firstTabStyle={Style.fistTabStyle}
                lastTabStyle={Style.lastTabStyle}
                activeTabStyle={Style.backgroundTab}
                values={[
                  I18n.t('translate_Export_Statistics'),
                  I18n.t('translate_Import_Statistics'),
                ]}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <ScrollView>
              <View style={[Style.Tabcontainer]}>
                <View style={{alignSelf: 'center'}}>
                  <View
                    style={{
                      width: '100%',
                      height: ViewScale(10),
                      borderRadius: ViewScale(18),
                      borderColor: 'transparent',
                      borderWidth: 1,
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                    }}
                  />
                </View>
                <View style={[Style.ViewSub4, {marginHorizontal: ViewScale(10)}]}>
                  <View style={Style.flexDirectionRow}>
                    {this.state.yearSelect === 2 && (
                      <TouchableOpacity
                        style={{width: ViewScale(50)}}
                        onPress={() => {
                          this.clickarrow(1);
                          // alert('kkkk');
                        }}>
                        <View style={Style.flexDirectionRow}>
                          <View style={Style.ViewSub6}>
                            <Image
                              style={[Style.ImgSub3, Style.IconArrow]}
                              source={require('../../image/arrowrightstatic.png')}
                            />
                          </View>
                          <Text style={Style.TextSub3}>
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year1
                              : ''}
                            {'\n'}
                            <Text style={{left: ViewScale(19)}}>{'   - '}</Text>
                            {'\n'}
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year1 - 1
                              : ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.yearSelect === 3 ? (
                      <TouchableOpacity
                        style={{width: ViewScale(50)}}
                        onPress={() => {
                          this.clickarrow(2);
                          // alert('2');
                        }}>
                        <View style={Style.flexDirectionRow}>
                          <View style={Style.ViewSub6}>
                            <Image
                              style={[Style.ImgSub3, Style.IconArrow]}
                              source={require('../../image/arrowrightstatic.png')}
                            />
                          </View>
                          <Text style={[Style.TextSub3, {}]}>
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year3
                              : ''}
                            {'\n'}
                            <Text style={{left: ViewScale(19)}}>{'  - '}</Text>
                            {'\n'}
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year4
                              : ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={{width: ViewScale(50)}} />
                    )}

                    {/* แสดงตรงกลาง */}

                    <View style={Style.ViewSub5}>
                      {this.state.yearSelect === 1 && (
                        <Text style={Style.TextSub1}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year1 +
                              ' -  ' +
                              this.state.dataStatistics.header.year2
                            : ''}
                        </Text>
                      )}

                      {this.state.yearSelect === 2 && (
                        <Text style={Style.TextSub1}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year2 +
                              ' -  ' +
                              this.state.dataStatistics.header.year4
                            : ''}
                        </Text>
                      )}

                      {this.state.yearSelect === 3 && (
                        <Text style={Style.TextSub1}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year4 +
                              ' -  ' +
                              this.state.dataStatistics.header.year5
                            : ''}
                        </Text>
                      )}

                      {this.state.yearSelect === 1 && (
                        <Text style={Style.TextSub2}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year1_remark
                            : ''}
                        </Text>
                      )}
                    </View>

                    {this.state.yearSelect === 1 ? (
                      <TouchableOpacity
                        style={{width: ViewScale(50)}}
                        onPress={() => {
                          this.clickarrow(2);
                          // alert('23');
                        }}>
                        <View style={Style.flexDirectionRowres}>
                          <View style={Style.ViewSub6}>
                            <Image
                              style={Style.ImgSub3}
                              source={require('../../image/arrowrightstatic.png')}
                            />
                          </View>
                          <Text style={Style.TextSub3}>
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year3
                              : ''}
                            {'\n'}
                            <Text style={{left: ViewScale(19)}}>{'  - '}</Text>
                            {'\n'}
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year4
                              : ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={{width: ViewScale(50)}} />
                    )}
                    {this.state.yearSelect === 2 && (
                      <TouchableOpacity
                        style={{width: ViewScale(50)}}
                        onPress={() => {
                          this.clickarrow(3);
                        }}>
                        <View style={Style.flexDirectionRowres}>
                          <View style={Style.ViewSub6}>
                            <Image
                              style={Style.ImgSub3}
                              source={require('../../image/arrowrightstatic.png')}
                            />
                          </View>
                          <Text style={Style.TextSub3}>
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year4
                              : ''}
                            {'\n'}
                            <Text style={{left: ViewScale(19)}}>{'  - '}</Text>
                            {'\n'}
                            {this.state.dataStatistics
                              ? this.state.dataStatistics.header.year5
                              : ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* <View style={[Style.ViewSub7, {}]}>
                  <View style={{flex: 1}}>
                    <Text style={Style.TextSub4}>
                      {'  '}
                      {this.state.selectedIndex === 0
                        ? I18n.t('translate_Grand_total')
                        : I18n.t('translate_Grand_total_import')}
                    </Text>
                  </View>
                  <View style={[Style.ViewSub8]}>
                    {this.state.typeMoneySelect === 1 ? (
                      <Text style={[Style.TextSub4, {textAlign: 'center'}]}>
                        {I18n.t('translate_Million_US_Dollars')}
                      </Text>
                    ) : (
                      <Text style={[Style.TextSub4, {textAlign: 'center'}]}>
                        {I18n.t('translate_Million_TH_Dollars')}
                      </Text>
                    )}
                  </View>
                </View> */}
                <View
                  style={{
                    // justifyContent: 'center',
                    width: '100%',
                    height: ViewScale(37),
                    backgroundColor: '#2d6dc4',
                    flexDirection:'row'
                  }}>
                  <View style={{flex:0.95,justifyContent:'center'}}>
                    <Text style={Style.TextSub4}>
                      {'  '}
                      {this.state.selectedIndex === 0
                        ? I18n.t('translate_Grand_total')
                        : I18n.t('translate_Grand_total_import')}
                    </Text>
                  </View>

                  <View style={{justifyContent:'center'}}>
                    {this.state.typeMoneySelect === 1 ? (
                      <Text style={Style.TextSub4}>
                        {I18n.t('translate_Million_US_Dollars')}
                      </Text>
                    ) : (
                      <Text style={Style.TextSub4}>
                        {I18n.t('translate_Million_TH_Dollars')}{'    '}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={[{width: '100%', flexDirection: 'row', height: ViewScale(35)}]}>
                  <View
                    style={[
                      Style.ViewSub10,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={{fontSize: ViewScale(18), color: '#014886'}}>
                      {this.state.dataStatistics &&
                        this.state.yearSelect === 1 &&
                        this.state.dataStatistics.header.year1}

                      {this.state.dataStatistics &&
                        this.state.yearSelect === 2 &&
                        this.state.dataStatistics.header.year2}

                      {this.state.dataStatistics &&
                        this.state.yearSelect === 3 &&
                        this.state.dataStatistics.header.year4}

                      {this.state.dataStatistics && this.state.yearSelect === 1
                        ? this.state.dataStatistics.header.year1_remark != null
                          ? ' (' +
                            this.state.dataStatistics.header.year1_remark +
                            ') '
                          : ''
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub10,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={{fontSize: ViewScale(18), color: '#014886'}}>
                      {this.state.dataStatistics &&
                        this.state.yearSelect === 1 &&
                        this.state.dataStatistics.header.year2}

                      {this.state.dataStatistics &&
                        this.state.yearSelect === 2 &&
                        this.state.dataStatistics.header.year4}

                      {this.state.dataStatistics &&
                        this.state.yearSelect === 3 &&
                        this.state.dataStatistics.header.year5}

                      {this.state.dataStatistics && this.state.yearSelect === 1
                        ? this.state.dataStatistics.header.year2_remark != null
                          ? ' (' +
                            this.state.dataStatistics.header.year2_remark +
                            ') '
                          : ''
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '34%',
                        height: null,
                        backgroundColor: '#ebf3f7',
                        // padding: 10
                      },
                    ]}>
                    <Text style={{fontSize: ViewScale(18), color: '#014886'}}>
                      % Chg{' '}
                      {this.state.dataStatistics &&
                        this.state.yearSelect === 1 &&
                        '(' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year1,
                          ) +
                          '/' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year2,
                          ) +
                          ')'}
                      {this.state.dataStatistics &&
                        this.state.yearSelect === 2 &&
                        '(' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year2,
                          ) +
                          '/' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year4,
                          ) +
                          ')'}
                      {this.state.dataStatistics &&
                        this.state.yearSelect === 3 &&
                        '(' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year4,
                          ) +
                          '/' +
                          this.cutTextyear(
                            this.state.dataStatistics.header.year5,
                          ) +
                          ')'}
                    </Text>
                  </View>
                </View>
                <View style={[Style.ViewSub9, {height: ViewScale(30)}]}>
                  <View style={[Style.ViewSub12]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-all'][
                            this.state.Y1
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub12,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-all'][
                            this.state.Y2
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub13,
                      this.state.dataStatistics['footer'] != null &&
                        (this.state.dataStatistics['footer']['total-all'][
                          this.state.YCH1
                        ] > 0
                          ? {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#167c09',
                            }
                          : {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f3c0c6',
                            }),
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '25%'}}>
                            {this.state.dataStatistics['footer']['total-all'][
                              this.state.YCH1
                            ] > 0 ? (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowup.png')}
                              />
                            ) : (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowdownRed.png')}
                              />
                            )}
                          </View>
                        )}

                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '100%'}}>
                            {this.state.dataStatistics['footer']['total-all'][
                              this.state.YCH1
                            ] > 0 ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#FFFFFF'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-all'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                                %
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-all'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                                %
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[Style.ViewTab, {marginTop: ViewScale(15)}]}>
                  <SegmentedControlTab2
                    tabsContainerStyle={{borderRadius: 1, height: ViewScale(40)}}
                    tabStyle={Style.TabStyle}
                    tabTextStyle={Style.TabText}
                    firstTabStyle={Style.fistTabStyle}
                    lastTabStyle={Style.lastTabStyle}
                    activeTabStyle={Style.backgroundTab}
                    values={
                      this.state.selectedIndex === 0
                        ? [
                            I18n.t('translate_Market_of_Thai'),
                            I18n.t('translate_Product_of_Thai'),
                          ]
                        : [
                            I18n.t('translate_Market_of_Thai_import'),
                            I18n.t('translate_Product_of_Thai_import'),
                          ]
                    }
                    selectedIndex={this.state.selectedIndex1}
                    onTabPress={this.handleIndexChange1}
                  />
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    width: '100%',
                    height: ViewScale(37),
                    backgroundColor: '#568ae0',
                    flexDirection:'row'
                  }}>
                  <View style={{flex:0.95,justifyContent:'center'}}>
                    <Text style={Style.TextSub4}>
                      {'  '}
                      {I18n.t('translate_Ranking')}
                    </Text>
                  </View>

                  <View style={{justifyContent:'center'}}>
                    {this.state.typeMoneySelect === 1 ? (
                      <Text style={Style.TextSub4}>
                        {I18n.t('translate_Million_US_Dollars')}
                      </Text>
                    ) : (
                      <Text style={Style.TextSub4}>
                        {I18n.t('translate_Million_TH_Dollars')}{'    '}
                      </Text>
                    )}
                  </View>
                </View>
                <FlatList
                  keyExtractor={(item, index) => index}
                  scrollEnabled={false}
                  data={
                    this.state.dataStatistics &&
                    this.state.dataStatistics.list.slice(
                      0,
                      this.state.itemsCount,
                    )
                  }
                  renderItem={this.ListRanking}
                  initialNumToRender={2}
                />
                <View style={{marginBottom: ViewScale(10)}}>
                  {this.state.itemsCount === 5 && (
                    <TouchableOpacity
                      onPress={() => {
                        this.loadmore();
                      }}
                      style={{
                        width: '100%',
                        height: ViewScale(38),
                        backgroundColor: '#ffffff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: ViewScale(3),
                        borderTopWidth: ViewScale(5),
                        borderColor: '#e1e7eb30',
                      }}>
                      <Text style={{fontSize: ViewScale(18), color: '#3b4254'}}>
                        {I18n.t('translate_See_more')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/*  รวม  */}
                <View style={[Style.ViewSub7]}>
                  <Text style={Style.TextSub4}>
                    {'  '}

                    {I18n.locale === 'th'
                      ? 'รวมมูลค่าสินค้า 20 อันดับแรก '
                      : 'total top'}
                  </Text>
                  <View style={[Style.ViewSub8]}>
                    {/* <Text style={Style.TextSub4}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics.header.remark
                        : ''}{' '}
                    </Text> */}
                  </View>
                </View>

                <View style={[Style.ViewSub9, {height: ViewScale(35)}]}>
                  <View style={[Style.ViewSub12]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-top'][
                            this.state.Y1
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub12,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-top'][
                            this.state.Y2
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub13,
                      this.state.dataStatistics['footer'] != null &&
                        (this.state.dataStatistics['footer']['total-top'][
                          this.state.YCH1
                        ] > '0'
                          ? {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#167c09',
                            }
                          : {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f3c0c6',
                            }),
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '25%'}}>
                            {this.state.dataStatistics['footer']['total-top'][
                              this.state.YCH1
                            ] > '0' ? (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowup.png')}
                              />
                            ) : (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowdownRed.png')}
                              />
                            )}
                          </View>
                        )}

                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '100%'}}>
                            {this.state.dataStatistics['footer']['total-top'][
                              this.state.YCH1
                            ] > '0' ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#FFFFFF'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-top'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-top'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                {/*  รวมทั้งหมด */}
                <View style={[Style.ViewSub7, {marginTop: ViewScale(-2)}]}>
                  <Text style={Style.TextSub4}>
                    {'  '}
                    {I18n.locale === 'th' ? 'สินค้าอื่น ๆ' : 'total other'}
                  </Text>
                  <View style={[Style.ViewSub8]}>
                    {/* <Text style={Style.TextSub4}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics.header.remark
                        : ''}{' '}
                    </Text> */}
                  </View>
                </View>

                <View style={[Style.ViewSub9, {height: ViewScale(30), marginBottom: ViewScale(20)}]}>
                  <View style={[Style.ViewSub12]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-other'][
                            this.state.Y1
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub12,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    <Text style={{fontSize: ViewScale(18), color: '#73838f'}}>
                      {this.state.dataStatistics
                        ? this.state.dataStatistics['footer']['total-other'][
                            this.state.Y2
                          ]
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      Style.ViewSub13,
                      this.state.dataStatistics['footer'] != null &&
                        (this.state.dataStatistics['footer']['total-other'][
                          this.state.YCH1
                        ] > '0'
                          ? {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#167c09',
                            }
                          : {
                              opacity: 0.8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f3c0c6',
                            }),
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '25%'}}>
                            {this.state.dataStatistics['footer']['total-other'][
                              this.state.YCH1
                            ] > '0' ? (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowup.png')}
                              />
                            ) : (
                              <Image
                                style={{width: ViewScale(10), height: ViewScale(5)}}
                                source={require('../../image/arrowdownRed.png')}
                              />
                            )}
                          </View>
                        )}

                        {this.state.dataStatistics['footer'] != null && (
                          <View style={{width: '100%'}}>
                            {this.state.dataStatistics['footer']['total-other'][
                              this.state.YCH1
                            ] > '0' ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#FFFFFF'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-other'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(18), color: '#d0021b'}}>
                                {'  '}
                                {this.state.dataStatistics
                                  ? this.state.dataStatistics['footer'][
                                      'total-other'
                                    ][this.state.YCH1]
                                  : ''}{' '}
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  null,
  mapDispatchToProps,
)(StatisticsScreen);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: ViewScale(18),
    color: '#014886',
    paddingRight: ViewScale(30),
    width: '100%',
    marginBottom: ViewScale(5),
    // paddingHorizontal: 10,
  },
  inputAndroid: {
    height: ViewScale(40),
    width: '100%',
    fontSize: ViewScale(18),
    color: '#73838f',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    paddingHorizontal: 0,
    paddingVertical: ViewScale(8),
    paddingRight: ViewScale(45),
    bottom: ViewScale(2),
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    color: '#014886',
    paddingRight: 25,
    width: '100%',
    marginBottom: 5,

    // paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    width: '100%',
    fontSize: 18,
    color: '#73838f',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    paddingRight: 50,
    marginBottom: 5,
  },
  // inputAndroidContainer: {
  //   // backgroundColor: 'red',
  //   // paddingHorizontal: 20,
  // },
});
