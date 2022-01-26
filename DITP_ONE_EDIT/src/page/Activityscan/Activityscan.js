import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {ListItem, Header} from '../../lib_edit/react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import RBSheet from 'react-native-raw-bottom-sheet';
import CalendarPicker from 'react-native-calendar-picker';
import I18n from '../../utils/I18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {connect} from 'react-redux';
//DATA
import DataScan from '../../Data/DataScan';
import Styles from './Styles';
import {getActivityAuthorities} from '../../actions/data.actions';

class Activityscan extends React.Component {
  constructor() {
    const getDate = new Date();
    super();
    this.state = {
      selecStartDate: null,
      date: null,
      check: false,
      SizebarModel: 500,
      PagebarModel: 1,
      disablemonth: getDate.getMonth(),
      disableday: getDate.getDate(),
      disableyear: getDate.getFullYear(),
      dataMarketData: [],
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.offset = 0;
  }

  CheckMonth = month => {
    // console.log(month);
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

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = ' - ' + dd + ' ' + this.CheckMonth(mm);
    return date.toString();
  }

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);

    var yyyy = date.getFullYear() + 543;

    return yyyy.toString();
  }
  _getMarketData = values => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          // console.log(this.state.date, 'aaaaa');
          this.response = await this.props.dispatch(
            getActivityAuthorities({
              offset: this.offset * 10,
              search: this.state.searchtext,
              date:
                this.state.date != null &&
                this.state.date.split('/')[2] +
                  '-' +
                  this.state.date.split('/')[1] +
                  '-' +
                  this.state.date.split('/')[0],
            }),
          );
          if (this.response.res_code === '00') {
            if (this.response.result.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                dataMarketData: [
                  ...this.state.dataMarketData,
                  ...this.response.result,
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

  searchSubmit = e => {
    this.setState(
      {
        ...this.state,
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
  };

  componentDidMount() {
    this._getMarketData();
  }

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

  BarCalendar = () => {
    return (
      <View style={Styles.container}>
        <View style={{flex: 0.8}}>
          <CalendarPicker
            previousTitle="<"
            previousTitleStyle={{color: '#9b9b9b', fontSize: 20}}
            nextTitle=">"
            nextTitleStyle={{color: '#9b9b9b', fontSize: 20}}
            selectedDayColor={'#2d6dc4'}
            selectedDayTextColor={'#fff'}
            selectedStartDate={this.state.selecStartDate}
            textStyle={{color: '#000', fontSize: 20}}
            onDateChange={value => {
              setTimeout(() => {
                this.setState({selecStartDate: value});
              }, 200);
            }}
          />
        </View>
        <TouchableOpacity
          style={Styles.acceptDateButton}
          onPress={async () => {
            this.RBSheet.close();
            setTimeout(() => {
              this.setState({
                date: Moment(this.state.selecStartDate).format('DD/MM/YYYY'),
              });
              this.setState(
                {
                  ...this.state,
                  fetching_from_server: false,
                  isListEnd: false,
                  dataMarketData: [],
                },
                function() {
                  this.offset = 0;
                  this._getMarketData();
                },
              );
            }, 300);
          }}>
          <Text style={Styles.acceptDateText}>
            {I18n.t('translate_Accept')}
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
  };

  ListData = ({item, Index}) => {
    return (
      <View style={Styles.listDataView}>
        <ListItem
          style={Styles.listDataItem}
          onPress={() =>
            this.props.navigation.navigate('Viewact', {
              name:
                I18n.locale == 'th'
                  ? item.activity_list_topic_th
                  : item.activity_list_topic_en,
              deteView:
                this.Star_Date(item.activity_list_start_date) +
                this.End_Date(item.activity_list_end_date) +
                ' ' +
                this.Yearend(item.activity_list_end_date),
              location:
                I18n.locale == 'th'
                  ? item.activity_list_location_th
                  : item.activity_list_location_en,
              imgview: item.activity_list_logo_banner,
              people: item.max_of_participate,
              count: item.participate,
              Detail:
                I18n.locale == 'th'
                  ? item.activity_list_desc_th
                  : item.activity_list_desc_en,
              list_code: item.activity_code,
              id: item.activity_code,
            })
          }
          containerStyle={Styles.ListSub1}
          leftAvatar={
            <View>
              <Image
                style={Styles.ImgSub3}
                source={{uri: item.activity_list_logo_thumb}}
              />
            </View>
          }
          title={
            <Text style={Styles.titleStyle} numberOfLines={2}>
              {I18n.locale == 'th'
                ? item.activity_list_topic_th
                : item.activity_list_topic_en}
            </Text>
          }
          subtitleNumberOfLines={2}
          subtitle={
            <View>
              <Text style={Styles.TextSub3}>
                {/* {item.date}activity_list_start_date activity_list_end_date */}
                <Text style={Styles.TextSub4}>
                  {this.Star_Date(item.activity_list_start_date)}
                  {this.End_Date(item.activity_list_end_date)}{' '}
                  {this.Yearend(item.activity_list_end_date)}
                </Text>
              </Text>
              <View style={Styles.ViewSub4}>
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/maker3.png')}
                />
                <Text style={Styles.TextSub5} numberOfLines={1}>
                  {' '}
                  {I18n.locale == 'th'
                    ? item.activity_list_location_th
                    : item.activity_list_location_en}
                </Text>
                <View style={Styles.ViewSub5}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Scanact', {
                        name:
                          I18n.locale == 'th'
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        id: item.activity_code,
                      })
                    }
                    style={Styles.TouchScan}>
                    <Image
                      style={Styles.ImgSub5}
                      source={require('../../image/scanAct.png')}
                    />
                    <Text style={Styles.TextSub6}>
                      {' '}
                      {I18n.t('translate_Scan')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        />
      </View>
    );
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

  date(item) {
    var date = item.split('/');
    console.log(date);
    let setdate = date[0] + '-' + date[1] + '-' + date[2];
    return setdate;
  }

  render() {
    const {abc} = this.props.route.params;

    console.log(abc);
    return (
      <View style={Styles.SafeAre}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={abc}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_ScanQrAct')} />
        <View style={[Styles.flex1, {zIndex: -1}]}>
          <RBSheet
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
            {this.BarCalendar()}
          </RBSheet>
          <View style={{marginLeft: 15}}>
            <Text style={Styles.TextSub1}>{I18n.t('translate_Scanwait')}</Text>
          </View>
          <View style={Styles.ViewSub1}>
            <View style={Styles.ViewSub2}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/seachAct.png')}
              />
              <TextInput
                style={[Styles.TextInputSearch, {flex: 1, paddingRight: 10}]}
                placeholder="ค้นหา"
                onSubmitEditing={this.searchSubmit}
                returnKeyType="done"
              />
            </View>
            <View style={[Styles.margin10, {width: '40%'}]}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    setTimeout(() => {
                      this.RBSheet.open();
                      this.BarCalendar();
                    }, 10)
                  }>
                  {this.state.date ? (
                    <View style={Styles.ViewSearYear2}>
                      <View style={Styles.ViewIconYear}>
                        <Icon
                          name="calendar-month"
                          size={22}
                          color={'#2d6dc4'}
                        />
                      </View>

                      <Text style={Styles.textInputYear2}>
                        {this.date(this.state.date)}
                      </Text>
                    </View>
                  ) : (
                    <View style={Styles.ViewSearYear}>
                      <View style={Styles.ViewIconYear}>
                        <Icon
                          name="calendar-month"
                          size={22}
                          color={'#dadada'}
                        />
                      </View>
                      <Text style={Styles.textInputYear}>
                        {I18n.t('translate_Date')}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <FlatList
              style={{width: '100%', marginBottom: 80}}
              keyExtractor={(item, index) => index}
              data={this.state.dataMarketData}
              onEndReached={() => this._getMarketData()}
              onEndReachedThreshold={0.5}
              renderItem={this.ListData}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          </View>
        </View>
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
)(Activityscan);
