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
import I18n from '../../utils/I18n';
import {getStatistics, getViewStatistics} from '../../actions/data.actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from '../../lib_edit/react-native-picker-select';
import FastImage from 'react-native-fast-image';
import SlideDownPanel from '../../lib_edit/react-native-slide-down-panel';
class ViewStatisticsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      selectedIndex1: 0,
      dataStatistics: false,
      itemsCount: 5,
      yearSelect: 1,
      typeSelect: 1,
      typeMoneySelect: null,
      mySelect: false,
      Y1: 'year1_value',
      Y2: 'year2_value',
      YCH1: 'year1_change',
      YCH2: 'year2_change',
      YCH3: 'year3_change',
    };
  }
  _getViewStatistis = async value => {
    const {link2, tabtype, tabMoney} = this.props.route.params;
    //  console.log(JSON.stringify(link2+tabtype+tabMoney) )

    // alert(this.state.typeMoneySelect);

    try {
      const response = await this.props.dispatch(
        getViewStatistics({
          results: {
            link_lv2: {
              country: link2.country,
              product: link2.product,
            },
            type_money:
              this.state.typeMoneySelect === null
                ? tabMoney
                : this.state.typeMoneySelect,
            tab_type: tabtype,
          },
          token: this.props.authData.token,
        }),
      );

      if (response.res_code === '00') {
        this.setState({dataStatistics: response.res_result.content});
        // alert(JSON.stringify( response.res_result.content))
      }
    } catch (error) {}
  };
  componentDidMount() {
    this._getViewStatistis();
  }

  cutTextyear = values => {
    // alert(values)
    var year = values.substring(2, 5);
    console.log('CUTUTU' + year);
    return year;
  };
  MoneyChange(value) {
    // alert('MMMMMM'+ value);
    this.setState({typeMoneySelect: value}, function() {
      this.MoneySelect();
    });
  }
  MoneySelect(value) {
    this._getViewStatistis(value);
  }

  clickarrow(page) {
    // alert(page)
    this.setState({yearSelect: page, itemsCount: 20}, function() {
      this._getViewStatistis();
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
  ListRanking = ({item, index}) => {
    return (
      <View>
        <View style={[Style.ViewSub15, {borderWidth:0}]}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 8,
              flexDirection: 'row',
            }}>
            {/* ใส่สามเหลี่ยมตรงงรน่ี */}
            {/* <View style={{flex: 1, flexDirection: 'row', }}> */}
            <TouchableOpacity
              // onPress={() => {
              //   //  console.log(item.link_lv2)
              //   this.props.navigation.navigate('ViewStaticsScren', {
              //     link2: item.link_lv2,
              //     uriimg: item.flag_url,
              //     namecontry:item.title
              //   });
              // }}
              style={{flex: 1, flexDirection: 'row'}}>
              {/* <FastImage
                style={{width: 26, height: 18, left: 5}}
                source={{uri: item.flag_url}}
              /> */}
              <Text style={{fontSize: 18, color: '#014886'}}>
                {' '}
                {index + 1}
                {'  '}
              </Text>
              <Text
                numberOfLines={2}
                style={{flex: 0.7, fontSize: 18, color: '#014886'}}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {/* </View> */}
            {index === 0 && (
              <TouchableOpacity
                style={{flex: 0.5,justifyContent:'center', flexDirection: 'row', alignItems: 'center',}}>
                <Text style={{fontSize: 18, color: '#014886'}}>
                  % Chg{' '}
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
                {/* <Image
                  style={{width: 10, height: 8, top: 10, marginLeft: 10}}
                  source={require('../../image/shape.png')}
                /> */}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[Style.ViewSub9, {height: 28}]}>
          {/* ปีที่1 */}
          {this.state.yearSelect === 1 && (
            <>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 18, color: '#73838f'}}>
                  {item.year1_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 18, color: '#73838f'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#42a300'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#d0021b'}}>
                          {item.year1_change}
                        </Text>
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
                <Text style={{fontSize: 18, color: '#73838f'}}>
                  {item.year3_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 18, color: '#73838f'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#42a300'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#d0021b'}}>
                          {item.year3_change}
                        </Text>
                      </View>
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
                <Text style={{fontSize: 18, color: '#73838f'}}>
                  {item.year4_value}
                </Text>
              </View>
              <View
                style={[
                  Style.ViewSub12,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 18, color: '#73838f'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdropupstatic.png')}
                        />
                      </View>
                      <View style={{width: '65%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#42a300'}}>
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
                          style={{width: 10, height: 5}}
                          source={require('../../image/arrowdownRed.png')}
                        />
                      </View>
                      <View style={{width: '65%', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#d0021b'}}>
                          {item.year4_change}
                        </Text>
                      </View>
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
  loadmore() {
    this.setState({
      itemsCount: 100,
    });
  }

  render() {
    const {link2, uriimg, namecontry} = this.props.route.params;
    // console.log('LLLLLLL');
    // console.log(this.state.dataStatistics);

    return (
      <View style={Style.ViewSub1}>
        {/* <Headers badgeNumber="2" navigation={navigation} backScreen={false} /> */}
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_StatisticsH')} />
        <ScrollView style={{zIndex: -1}}>
          <View
            style={{
              marginHorizontal: 10,
            }}>
            <View style={{paddingLeft: 15, flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                {this.props.route.params.tabtype === 1 ? (
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#2d6dc4',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {I18n.t('translate_Statistics1')}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#2d6dc4',
                      fontFamily: 'PSL Kittithada Pro',
                    }}>
                    {I18n.t('translate_Statistics2')}
                  </Text>
                )}
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {this.state.typeMoneySelect === 1 && (
                  <Text
                    style={{
                      fontSize: 19,
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
                      fontSize: 19,
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
                        fontSize: 18,
                        fontWeight: 'bold',
                        // backgroundColor: "#eee",
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 0.5,
                        borderColor: 'transparent',
                        borderRadius: 8,
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
                    if(Platform.OS==='android'){
                      this.MoneyChange(value);

                    }
                    this.setState({typeMoneySelect:value})
                   
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
                        size={15}
                        color="#014886"
                        style={{top: 8, right: 10}}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View style={[Style.ViewTab]} />

            <View style={[Style.Tabcontainer]}>
              <View style={{alignSelf: 'center'}}>
                <View
                  style={{
                    width: '100%',
                    height: 10,
                    borderRadius: 18,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                  }}
                />
              </View>
              <View style={[Style.ViewSub4, {marginHorizontal: 10}]}>
                <View style={Style.flexDirectionRow}>
                  {this.state.yearSelect === 2 && (
                    <TouchableOpacity
                      style={{width: 50}}
                      onPress={() => {
                        this.clickarrow(1);
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
                          <Text style={{left: 19}}>{'   - '}</Text>
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
                      style={{width: 50}}
                      onPress={() => {
                        this.clickarrow(2);
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
                          <Text style={{left: 19}}>{'  - '}</Text>
                          {'\n'}
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year4
                            : ''}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={{width: 50}} />
                  )}
                  {this.state.yearSelect === 1 && (
                    <View style={Style.ViewSub5}>
                      <Text style={Style.TextSub1}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics.header.year1 +
                            ' - ' +
                            this.state.dataStatistics.header.year2
                          : ''}
                      </Text>

                      <Text style={Style.TextSub2}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics.header.year1_remark
                          : ''}
                      </Text>
                    </View>
                  )}
                  {this.state.yearSelect === 2 && (
                    <View style={Style.ViewSub5}>
                      <Text style={Style.TextSub1}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics.header.year1 -
                            1 +
                            ' - ' +
                            this.state.dataStatistics.header.year4
                          : ''}
                      </Text>

                      {/* <Text style={Style.TextSub2}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year1_remark
                            : ''}
                        </Text> */}
                    </View>
                  )}
                  {this.state.yearSelect === 3 && (
                    <View style={Style.ViewSub5}>
                      <Text style={Style.TextSub1}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics.header.year4 +
                            ' - ' +
                            this.state.dataStatistics.header.year5
                          : ''}
                      </Text>

                      {/* <Text style={Style.TextSub2}>
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year1_remark
                            : ''}
                        </Text> */}
                    </View>
                  )}

                  {this.state.yearSelect === 1 ? (
                    <TouchableOpacity
                      style={{width: 50}}
                      onPress={() => {
                        this.clickarrow(2);
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
                          <Text style={{left: 19}}>{'  - '}</Text>
                          {'\n'}
                          {this.state.dataStatistics
                            ? this.state.dataStatistics.header.year4
                            : ''}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={{width: 50}} />
                  )}

                  {this.state.yearSelect === 2 && (
                    <TouchableOpacity
                      style={{width: 50}}
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
                          <Text style={{left: 19}}>{'  - '}</Text>
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

              <ScrollView>
                <>
                  <View style={[Style.ViewTab, {marginTop: 15}]} />

                  <View style={{backgroundColor:'#568ae0',flexDirection:'row', flex: 0.3,height:35}}>
                    {/* <FastImage
                      style={{width: 26, height: 18, left: 5}}
                      source={{uri: uriimg}}
                    /> */}
                    <View style={{flex:1,justifyContent:'center'}}>
                    <Text numberOfLines={2} style={{fontSize: 20, color: '#ffffff',left:5}}>
                      {namecontry}
                    </Text>

                    </View>
                    
                    <View style={[Style.ViewSub8,{justifyContent:'center',}]}>
                      {this.state.typeMoneySelect === null ? (
                        <>
                          {this.props.route.params.tabMoney === 1 ? (
                            <Text style={[Style.TextSub4,{justifyContent: 'center',textAlign:'center'}]}>
                              {I18n.t('translate_Million_US_Dollars')}
                            </Text>
                          ) : (
                            <Text style={[Style.TextSub4,{textAlign:'center'}]}>
                              {I18n.t('translate_Million_TH_Dollars')}
                            </Text>
                          )}
                        </>
                      ) : (
                        <>
                          {this.state.typeMoneySelect === 1 ? (
                            <Text style={[Style.TextSub4,{textAlign:'center'}]}>
                              {I18n.t('translate_Million_US_Dollars')}
                            </Text>
                          ) : (
                            <Text style={[Style.TextSub4,{textAlign:'center'}]}>
                              {I18n.t('translate_Million_TH_Dollars')}
                            </Text>
                          )}
                        </>
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

                  <View style={{marginBottom: 10}}>
                    {this.state.itemsCount === 5 && (
                      <TouchableOpacity
                        onPress={() => {
                          this.loadmore();
                        }}
                        style={{
                          width: '100%',
                          height: 38,
                          backgroundColor: '#ffffff',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 3,
                          borderTopWidth: 5,
                          borderColor: '#e1e7eb30',
                        }}>
                        <Text style={{fontSize: 18, color: '#3b4254'}}>
                          {I18n.t('translate_See_more')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* เมน รวม  */}
                  <View style={[Style.ViewSub14, {justifyContent:'center'}]}>
                    <Text style={{fontSize: 20, color: '#ffffff', left: 10}}>
                      {I18n.locale === 'th'
                        ? 'รวมมูลค่าสินค้า 20 อันดับแรก'
                        : 'total top'}
                    </Text>
                  </View>
                  <View style={[Style.ViewSub9, {height: 28}]}>
                    <View
                      style={[
                        Style.ViewSub12,
                        {alignItems: 'center', justifyContent: 'center'},
                      ]}>
                      <Text style={{fontSize: 18, color: '#73838f'}}>
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
                      <Text style={{fontSize: 18, color: '#73838f'}}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics['footer']['total-top'][
                              this.state.Y2
                            ]
                          : ''}
                      </Text>
                    </View>
                    {this.state.dataStatistics['footer'] != null && (

                      <View style={{width: '100%'}}>
                        
                        {this.state.dataStatistics['footer']['total-top'][
                          this.state.YCH1
                        ] > '0' && (
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
                                    style={{width: 10, height: 5}}
                                    source={require('../../image/arrowdropupstatic.png')}
                                  />
                                </View>
                                <View
                                  style={{width: '100%', alignItems: 'center'}}>
                                  <Text
                                    style={{fontSize: 18, color: '#42a300'}}>
                                    {
                                      this.state.dataStatistics['footer'][
                                        'total-top'
                                      ][this.state.YCH1]
                                    }
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                                </View>
                              </View>
                            </View>
                          </View>
                        )}

                        

                        {this.state.dataStatistics['footer']['total-top'][
                          this.state.YCH1
                        ] < '0' && (
                          <View
                            style={{
                              width: '34%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              // padding: 10,
                              backgroundColor: '#f3c0c6',
                              flex: 1,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,

                                marginHorizontal: 20,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{width: '25%'}}>
                                  <Image
                                    style={{width: 10, height: 5}}
                                    source={require('../../image/arrowdownRed.png')}
                                  />
                                </View>
                                <View
                                  style={{width: '65%', alignItems: 'center'}}>
                                  <Text
                                    style={{fontSize: 18, color: '#d0021b'}}>
                                    {
                                      this.state.dataStatistics['footer'][
                                        'total-top'
                                      ][this.state.YCH1]
                                    }
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  {/* <Text style={{fontSize: 18, color: '#d0021b'}}>
                                  %
                                </Text> */}
                                </View>
                              </View>
                            </View>
                          </View>
                        )}

                      </View>
                    )}


                  </View>

                  {/* เมน สินค้าอื่น  */}
                  <View style={[Style.ViewSub14, {justifyContent:'center'}]}>
                    <Text style={{fontSize: 20, color: '#ffffff', left: 10}}>
                      {I18n.locale === 'th' ? 'สินค้าอื่น ๆ' : 'total other'}
                    </Text>
                  </View>
                  <View
                    style={[Style.ViewSub9, {height: 28, marginBottom: 25}]}>
                    <View
                      style={[
                        Style.ViewSub12,
                        {alignItems: 'center', justifyContent: 'center'},
                      ]}>
                      <Text style={{fontSize: 18, color: '#73838f'}}>
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
                      <Text style={{fontSize: 18, color: '#73838f'}}>
                        {this.state.dataStatistics
                          ? this.state.dataStatistics['footer']['total-other'][
                              this.state.Y2
                            ]
                          : ''}
                      </Text>
                    </View>
                    {this.state.dataStatistics['footer'] != null && (
                      <View style={{width: '100%'}}>
                        {this.state.dataStatistics['footer']['total-other'][
                          this.state.YCH1
                        ] > '0' && (
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
                                    style={{width: 10, height: 5}}
                                    source={require('../../image/arrowdropupstatic.png')}
                                  />
                                </View>
                                <View
                                  style={{width: '65%', alignItems: 'center'}}>
                                  <Text
                                    style={{fontSize: 18, color: '#42a300'}}>
                                    {
                                      this.state.dataStatistics['footer'][
                                        'total-other'
                                      ][this.state.YCH1]
                                    }
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  {/* <Text style={{fontSize: 18, color: '#42a300'}}>%</Text> */}
                                </View>
                              </View>
                            </View>
                          </View>
                        )}

                        {this.state.dataStatistics['footer']['total-other'][
                          this.state.YCH1
                        ] < '0' && (
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
                                    style={{width: 10, height: 5}}
                                    source={require('../../image/arrowdownRed.png')}
                                  />
                                </View>
                                <View
                                  style={{width: '65%', alignItems: 'center'}}>
                                  <Text
                                    style={{fontSize: 18, color: '#d0021b'}}>
                                    {
                                      this.state.dataStatistics['footer'][
                                        'total-other'
                                      ][this.state.YCH1]
                                    }
                                  </Text>
                                </View>
                                <View style={{width: '20%'}}>
                                  {/* <Text style={{fontSize: 18, color: '#d0021b'}}>%</Text> */}
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                </>
              </ScrollView>
            </View>
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewStatisticsScreen);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    color: '#014886',
    paddingRight: 30,
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
    paddingHorizontal: 0,
    paddingVertical: 8,
    paddingRight: 45,
    bottom: 2,
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
