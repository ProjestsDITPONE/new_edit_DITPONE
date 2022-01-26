import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import Styles from './Styles';
import I18n from '../../utils/I18n';
import {ListItem, Overlay} from 'react-native-elements';
import {getActivity} from '../../actions/data.actions';
import {connect} from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../../lib_edit/react-native-scrollable-tab-view';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLink} from '../../config/utilities';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const height = Dimensions.get('window').height;
class Activities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heightTab: 0,
      Page: 3,
      Page3: 3,
      Page4: 3,
      Page5: 3,
      ActivityAccept: [],
      SelecIndexYear: 0,
      year1: null,
      year2: null,
      year3: null,
      ActivityYear: [],
      idAct: '',
      ckhide: false,
    };
  }

  _getActivity = async value => {
    try {
      const payload = this.props.authData.token;
      const respones = await this.props.dispatch(
        getActivity({
          token: payload,
        }),
      );

      if (respones.res_code === '00') {
        this.setState({
          ActivityAccept: respones.result.active,
          ActivityYear: respones.result.not_active,
        });
        const Yearall = Object.keys(respones.result.not_active);

        const Year1 = parseInt(Yearall[0]);
        const Year2 = parseInt(Yearall[1]);
        const Year3 = parseInt(Yearall[2]);
        this.setState({year1: Year1});
        this.setState({year2: Year2});
        this.setState({year3: Year3});
      }
    } catch (error) {}
  };

  CheckMonthFull = month => {
    if (month === null) {
      return 'DD-MM';
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === 'th' ? (Month = 'มกราคม') : (Month = 'January');
      } else if (month === 2) {
        return I18n.locale === 'th'
          ? (Month = 'กุมภาพันธ์')
          : (Month = 'February');
      } else if (month === 3) {
        return I18n.locale === 'th' ? (Month = 'มีนาคม') : (Month = 'March');
      } else if (month === 4) {
        return I18n.locale === 'th' ? (Month = 'เมษายน') : (Month = 'April');
      } else if (month === 5) {
        return I18n.locale === 'th' ? (Month = 'พฤษภาคม') : (Month = 'May');
      } else if (month === 6) {
        return I18n.locale === 'th' ? (Month = 'มิถุนายน') : (Month = 'June');
      } else if (month === 7) {
        return I18n.locale === 'th' ? (Month = 'กรกฎาคม') : (Month = 'July');
      } else if (month === 8) {
        return I18n.locale === 'th' ? (Month = 'สิงหาคม') : (Month = 'August');
      } else if (month === 9) {
        return I18n.locale === 'th'
          ? (Month = 'กันยายน')
          : (Month = 'September');
      } else if (month === 10) {
        return I18n.locale === 'th' ? (Month = 'ตุลาคม') : (Month = 'October');
      } else if (month === 11) {
        return I18n.locale === 'th'
          ? (Month = 'พฤศจิกายน')
          : (Month = 'November');
      } else if (month === 12) {
        return I18n.locale === 'th'
          ? (Month = 'ธันวาคม')
          : (Month = 'December');
      }
    }
  };

  Call = number => {
    console.log(number);
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  formatdate(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    const year = yyyy.toString();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + year.substring(2, 4);
    return date.toString();
  }

  FullDate(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + ' ' + this.CheckMonthFull(mm) + ' ' + yyyy;
    return date.toString();
  }
  ListDataAct1 = ({item, index}) => {
    var Props = this.props;
    var state = this.state;

    return (
      <View style={{backgroundColor: '#fbfbfd', marginTop: 10}}>
        {this.state.Detailact1 === true && (
          <Overlay
            onBackdropPress={() => this.setState({Detailact1: false})}
            backdropStyle={Styles.backdrop}
            isVisible>
            <View style={{height: height * 0.8}}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                  onPress={() => this.setState({Detailact1: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(this.state.Link)}>
                      {this.state.LogoAct != '' ? (
                        <Image
                          resizeMode={'contain'}
                          style={Styles.ImgActivity}
                          source={{uri: this.state.LogoAct}}
                        />
                      ) : (
                        <Image
                          resizeMode={'center'}
                          style={{width: 360, height: 216}}
                          source={require('../../image/banerDrive.png')}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.marginTop4}>
                    <Text style={Styles.TextOverlay}>
                      {I18n.t('translate_subject')} {this.state.nameAct}
                    </Text>
                  </View>
                  <View>
                    <Text style={Styles.TextOverlay2}>
                      {this.state.StartDateAct} - {this.state.EndDateAct}
                    </Text>
                  </View>

                  {/* <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {I18n.t('translate_DataRegister')} :{' '}
                      {this.state.startregis} - {this.state.endregis}{' '}
                    </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{width: 18, height: 13, top: 4}}
                        source={{uri: this.state.contry_img_flag}}
                      />
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {'  '}
                        {this.state.contry_TH}
                      </Text>
                    </View>
                    <View style={{flex: 0.3}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.openLink(this.state.contry_TH);
                        }}
                        style={{
                          backgroundColor: '#2d6dc4',

                          borderRadius: 11,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 18,
                          }}>
                          แผนที่
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 7, height: 11}}
                      source={require('../../image/maker2.png')}
                    />
                    <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {'  '}
                      {this.state.location}
                    </Text>
                  </View>

                  <View style={{marginTop: 10}}>
                    {this.state.price === '' ? (
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {'ไม่มีค่าใช้จ่าย'}
                      </Text>
                    ) : (
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {this.state.price}
                      </Text>
                    )}
                  </View>
                  <View style={{marginTop: 0}}>
                    <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {I18n.t('translate_Num')} : {this.state.participate}{' '}
                      {I18n.t('translate_case')}
                    </Text>
                  </View>

                  <View style={{margin: 10}}>
                    <Image
                      style={{width: 334, height: 1}}
                      source={require('../../image/line6.png')}
                    />
                  </View>

                  <View style={[Styles.marginTop20, Styles.marginBottom20]}>
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

                      function uri(item) {
                        var uri = item.split('/');
                        console.log(uri[10]);
                        return uri[10];
                      }

                      const openLink = async item => {
                        const Token = Props.authData.token;
                        const userDrive =
                          Props.getUser.userDetails.res_result.userID_drive;
                        const idAct = item.id;
                        const idpid = uri(item.uri);

                        const deepLink = getDeepLink('callback');
                        const urlpid = `https://drive.ditp.go.th/th-th/signin?type=4&pid=${idpid}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        const urlpid2 = `https://drive.ditp.go.th/th-th/signin?type=5&pid=${idpid}&activityid=${idAct}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        // console.log('ค่า', urlpid2);
                        // console.log(item);
                        if (item.selec == 1) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  // Specify full animation resource identifier(package:anim/name)
                                  // or only resource name(in case of animation bundled with app).
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid);
                          } catch (error) {
                            Linking.openURL(urlpid);
                          }
                        } else if (item.selec == 2) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid2,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  // Specify full animation resource identifier(package:anim/name)
                                  // or only resource name(in case of animation bundled with app).
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid2);
                          } catch (error) {
                            Linking.openURL(urlpid2);
                          }
                        }
                      };

                      return (
                        <View style={{marginTop: -20}}>
                          <View style={[Styles.OverlayView6, {bottom: -10}]}>
                            <View style={Styles.ViewSub30}>
                              {index == 0 && (
                                <View style={{}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 12,
                                        marginTop: 5,
                                      }}
                                      source={require('../../image/pontone1.png')}
                                    />

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepont1.png')}
                                  />
                                </View>
                              )}
                              {index == 1 && (
                                <View style={{marginBottom: 15, marginTop: 3}}>
                                  <View style={{flexDirection: 'row'}}>
                                    {data.status_active === 'Y' ? (
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                        }}
                                        source={require('../../image/point2.png')}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                          backgroundColor: '#FFFFFF',
                                          borderWidth: 1,
                                          borderColor: '#3986ee',
                                          borderRadius: 8,
                                        }}
                                      />
                                    )}

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepoint2.png')}
                                  />
                                </View>
                              )}
                              {index == 2 && (
                                <View style={{marginTop: -10}}>
                                  {data.status_url != '' ? (
                                    <View style={{marginBottom: 15}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                        }}>
                                        {data.status_active === 'N' ? (
                                          <Image
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                            }}
                                            source={require('../../image/point2.png')}
                                          />
                                        ) : (
                                          <View
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                              backgroundColor: '#FFFFFF',
                                              borderWidth: 1,
                                              borderColor: '#3986ee',
                                              borderRadius: 8,
                                            }}
                                          />
                                        )}
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            marginHorizontal: 15,
                                            borderColor: '#9c7df6',
                                            borderRadius: 8,
                                            width: 250,
                                            height: 70,
                                          }}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 24,
                                                color: '#2d6dc4',
                                              }}>
                                              {' '}
                                              รอการชำระเงิน
                                            </Text>
                                            <TouchableOpacity
                                              onPress={() =>
                                                openLink({
                                                  uri: data.status_url,
                                                  selec: 1,
                                                })
                                              }
                                              style={{
                                                height: 34,
                                                width: 112,
                                                backgroundColor: '#9c7df6',
                                                borderRadius: 8,
                                                marginTop: 18,
                                                right: 9,
                                                position: 'absolute',
                                                justifyContent: 'center',
                                              }}>
                                              <View>
                                                <Text
                                                  style={{
                                                    textAlign: 'center',
                                                    color: '#FFF',
                                                    fontSize: 18,
                                                  }}>
                                                  {' '}
                                                  {I18n.t('translate_lPayment')}
                                                </Text>
                                              </View>
                                            </TouchableOpacity>
                                          </View>
                                          <View>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#e82d2d',
                                              }}>
                                              {' '}
                                              ครบกำหนด
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      <Image
                                        style={{
                                          width: 2,
                                          height: 80,
                                          marginLeft: 4.5,
                                          marginTop: -50,
                                        }}
                                        source={require('../../image/linepoint2.png')}
                                      />
                                    </View>
                                  ) : (
                                    <View style={{marginBottom: 15}}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 12,
                                            marginTop: 5,
                                          }}
                                          source={require('../../image/point2.png')}
                                        />

                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: '#2d6dc4',
                                          }}>
                                          {' '}
                                          {data.status_name}
                                        </Text>
                                      </View>
                                      <Image
                                        style={{
                                          width: 2,
                                          height: 17,
                                          marginLeft: 4.5,
                                          marginTop: -3,
                                        }}
                                        source={require('../../image/linepoint2.png')}
                                      />
                                    </View>
                                  )}
                                </View>
                              )}
                              {index == 3 && (
                                <View
                                  style={{marginBottom: 15, marginTop: -10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    {data.status_active === 'N' ? (
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                        }}
                                        source={require('../../image/point2.png')}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                          backgroundColor: '#FFFFFF',
                                          borderWidth: 1,
                                          borderColor: '#3986ee',
                                          borderRadius: 8,
                                        }}
                                      />
                                    )}

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepoint2.png')}
                                  />
                                </View>
                              )}
                              {index == 4 && (
                                <View style={{marginTop: -10}}>
                                  {data.status_url != '' ? (
                                    <View style={{marginBottom: 15}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                        }}>
                                        {data.status_active === 'N' ? (
                                          <Image
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                            }}
                                            source={require('../../image/point2.png')}
                                          />
                                        ) : (
                                          <View
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                              backgroundColor: '#FFFFFF',
                                              borderWidth: 1,
                                              borderColor: '#3986ee',
                                              borderRadius: 8,
                                            }}
                                          />
                                        )}
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            marginHorizontal: 15,
                                            borderColor: '#3986ee',
                                            borderRadius: 8,
                                            width: 250,
                                            height: 70,
                                          }}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 24,
                                                color: '#2d6dc4',
                                              }}>
                                              {' '}
                                              ทำแบบประเมิน
                                            </Text>
                                            <TouchableOpacity
                                              onPress={() => {
                                                openLink({
                                                  uri: data.status_url,
                                                  selec: 2,
                                                  id: state.idAct,
                                                });
                                              }}
                                              style={{
                                                height: 34,
                                                width: 112,
                                                backgroundColor: '#3986ee',
                                                borderRadius: 8,
                                                marginTop: 18,
                                                right: 9,
                                                position: 'absolute',
                                                justifyContent: 'center',
                                              }}>
                                              <View>
                                                <Text
                                                  style={{
                                                    textAlign: 'center',
                                                    color: '#FFF',
                                                    fontSize: 18,
                                                  }}>
                                                  {' '}
                                                  {I18n.t(
                                                    'translate_assessmentBotton',
                                                  )}
                                                </Text>
                                              </View>
                                            </TouchableOpacity>
                                          </View>
                                          <View>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#e82d2d',
                                              }}>
                                              {' '}
                                              ครบกำหนด
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#7d7d7d',
                                                marginTop: 4,
                                              }}>
                                              {' '}
                                              *เพื่อใช้ประกอบการพิจารณาคัดเลือกเข้าร่วมกิจกรรมครั้งต่อไป
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  ) : (
                                    <View style={{marginBottom: 15}}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 12,
                                            marginTop: 5,
                                          }}
                                          source={require('../../image/point2.png')}
                                        />

                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: '#2d6dc4',
                                          }}>
                                          {' '}
                                          {data.status_name}
                                        </Text>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              )}
                            </View>
                          </View>
                          {index != 4 ? (
                            <View>
                              <Text />
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>

                  {this.state.ckhide === false ? (
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <Text
                        onPress={() => {
                          this.setState({ckhide: true});
                        }}
                        style={{
                          fontSize: 18,
                          color: '#2d6dc4',
                          textAlign: 'center',
                          textDecorationLine: 'underline',
                        }}>
                        แสดงรายละเอียด
                      </Text>
                      <Icon3
                        color="#2d6dc4"
                        name="keyboard-arrow-down"
                        size={20}
                      />
                    </View>
                  ) : (
                    <>
                      {/* <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataShow')} :
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.StarD} - {this.state.EndD}{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataRegister')} :{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.starretgis} - {this.state.endregis}{' '}
                        </Text> */}

                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_place')} :
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 7, height: 11}}
                          source={require('../../image/maker2.png')}
                        />
                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.location}{' '}
                        </Text>
                      </View>

                      {/* thking */}

                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_group_product')} :
                      </Text>

                      {/* {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                                {' '}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })} */}
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_Readmore')} :
                      </Text>
                      <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                        {I18n.t('translate_Main')}
                      </Text>
                      <View style={{width: 321, height: null}}>
                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {this.state.detail}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text
                          onPress={() => {
                            this.setState({ckhide: false});
                          }}
                          style={{
                            fontSize: 18,
                            color: '#2d6dc4',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                          }}>
                          ซ่อนรายละเอียด
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-up"
                          size={20}
                        />
                      </View>
                    </>
                  )}

                  <View style={{margin: 10}}>
                    <Image
                      style={{width: 334, height: 1}}
                      source={require('../../image/line6.png')}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={{color: '#3a3a3a', fontSize: 18}}>
                      หน่วยงานอบรมรับผิดชอบ : {this.state.daparment_name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{color: '#3a3a3a', fontSize: 18}}>
                      เจ้าหน้าที่โครงการ : {this.state.officer_name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {this.state.deparment_tel === 'ditp.ciie@gmail.com' ? (
                        <Image
                          style={{width: 29, height: 29}}
                          source={require('../../image/emailx.png')}
                        />
                      ) : (
                        <Image
                          style={{width: 29, height: 29}}
                          source={require('../../image/phonelx.png')}
                        />
                      )}
                      {this.state.deparment_tel === 'ditp.ciie@gmail.com' ? (
                        <Text style={{color: '#2d6dc4', fontSize: 18, top: 4}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      ) : (
                        <Text
                          onPress={() => {
                            this.Call(this.state.deparment_tel);
                          }}
                          style={{color: '#2d6dc4', fontSize: 18, top: 4}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}

        {/* <ImageBackground
          imageStyle={{width: '100%', height: null}}
          resizeMode="cover"
          style={{}}
          source={require('../../image/Actbackground.png')}> */}
        {item.participate_status_code === '0' && (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginHorizontal: 10,
              // marginBottom: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({Detailact1: true});
                this.setState({LogoAct: item.activity_list_logo_banner});
                this.setState({nameAct: item.activity_name_th});
                this.setState({
                  StartDateAct: this.FullDate(item.activity_list_start_date),
                });
                this.setState({
                  EndDateAct: this.FullDate(item.activity_list_end_date),
                  startregis: this.FullDate(item.activity_list_start_regis),
                });
                this.setState({location: item.activity_list_location_th});
                this.setState({AcceptDate: this.formatdate(item.regis_date)});
                this.setState({
                  price:
                    I18n.locale === 'th'
                      ? item.activity_price_th
                      : item.activity_price_en,
                });
                this.setState({Status: item.participate_status_code});
                this.setState({Phone: item.activity_list_department_tel});
                this.setState({DatailAct: item.activity_desc_th});
                this.setState({participate: item.max_of_participate});
                this.setState({Link: item.url_detail});
                this.setState({
                  payProduct: this.formatdate(item.activity_pay_duedate),
                });
                this.setState({survay: item.url_survay});

                this.setState({Status: item.activity_status});
                this.setState({
                  idAct: item.id_list,
                  detail:
                    I18n.locale === 'th'
                      ? item.activity_desc_th
                      : item.activity_desc_en,
                  officer_name: item.activity_list_officer_name,
                  daparment_name: item.activity_list_department_name,
                  deparment_tel: item.activity_list_department_tel,
                });
              }}>
              <ListItem
                style={Styles.styeList}
                containerStyle={Styles.containerList}
                leftAvatar={
                  <Image
                    resizeMode={'center'}
                    source={{
                      uri:
                        item.activity_list_logo_thumb === ''
                          ? 'http://one.ditp.go.th/dist/img/icon/no-image.png'
                          : item.activity_list_logo_thumb,
                    }}
                    style={
                      item.activity_list_logo_thumb === ''
                        ? {width: 60, height: 56, borderRadius: 10}
                        : Styles.ImgList
                    }
                  />
                }
                title={
                  <View style={{width: '80%', marginTop: 10}}>
                    <Text
                      numberOfLines={2}
                      style={[Styles.titleList, {lineHeight: 18}]}>
                      {item.activity_name_th}
                    </Text>
                    <View>
                      <Text style={Styles.TextDateList}>
                        {I18n.t('translate_Join')}
                        <Text
                          style={{
                            color: '#8b9bb0',
                            fontSize: Platform.OS === 'android' ? 12 : 18,
                          }}>
                          {' '}
                          {this.formatdate(item.regis_date)}
                        </Text>
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
                              <>
                                <View
                                  style={[
                                    Styles.ViewSubList2,
                                    {width: '100%', left: 0},
                                  ]}>
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
                                    numberOfLines={1}
                                    style={{
                                      fontSize: 16,
                                      color: Check(status_color),
                                    }}>
                                    {' '}
                                    {status_name}
                                  </Text>
                                </View>
                                {status_name === 'ทำแบบประเมิน' && (
                                  <TouchableOpacity
                                    onPress={() => {}}
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 8,
                                      flexDirection: 'row',
                                      width: 112,
                                      height: 34,
                                      backgroundColor: Check(status_color),
                                    }}>
                                    <Icon
                                      name="clipboard"
                                      size={18}
                                      style={{
                                        color: '#FFFFFF',
                                        marginHorizontal: 5,
                                      }}
                                    />
                                    <Text
                                      style={{color: '#FFFFFF', fontSize: 18}}>
                                      {status_name}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </>
                            );
                          })}
                      </View>
                    </View>
                  </View>
                }
              />
            </TouchableOpacity>
            {/* </ImageBackground> */}
          </View>
        )}
      </View>
    );
  };

  ListDataAct2 = ({item, index}) => {
    var Props = this.props;
    var state = this.state;

    return (
      <View style={{backgroundColor: '#fbfbfd', marginTop: 10}}>
        {this.state.Detailact === true && (
          <Overlay
            onBackdropPress={() => this.setState({Detailact: false})}
            backdropStyle={Styles.backdrop}
            isVisible>
            <View style={{height: height * 0.8}}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                  onPress={() => this.setState({Detailact: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(this.state.Link)}>
                      {this.state.LogoAct != '' ? (
                        <Image
                          resizeMode={'contain'}
                          style={Styles.ImgActivity}
                          source={{uri: this.state.LogoAct}}
                        />
                      ) : (
                        <Image
                          resizeMode={'center'}
                          style={{width: 360, height: 216}}
                          source={require('../../image/banerDrive.png')}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.marginTop4}>
                    <Text style={Styles.TextOverlay}>
                      {I18n.t('translate_subject')} {this.state.nameAct}
                    </Text>
                  </View>
                  <View>
                    <Text style={Styles.TextOverlay2}>
                      {this.state.StartDateAct} - {this.state.EndDateAct}
                    </Text>
                  </View>

                  {/* <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {I18n.t('translate_DataRegister')} :{' '}
                      {this.state.startregis} - {this.state.endregis}{' '}
                    </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{width: 18, height: 13, top: 4}}
                        source={{uri: this.state.contry_img_flag}}
                      />
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {'  '}
                        {this.state.contry_TH}
                      </Text>
                    </View>
                    <View style={{flex: 0.3}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.openLink(this.state.contry_TH);
                        }}
                        style={{
                          backgroundColor: '#2d6dc4',

                          borderRadius: 11,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 18,
                          }}>
                          แผนที่
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 7, height: 11}}
                      source={require('../../image/maker2.png')}
                    />
                    <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {'  '}
                      {this.state.location}
                    </Text>
                  </View>

                  <View style={{marginTop: 10}}>
                    {this.state.price === '' ? (
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {'ไม่มีค่าใช้จ่าย'}
                      </Text>
                    ) : (
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_ActPrice')} : {this.state.price}
                      </Text>
                    )}
                  </View>
                  <View style={{marginTop: 0}}>
                    <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                      {I18n.t('translate_Num')} : {this.state.participate}{' '}
                      {I18n.t('translate_case')}
                    </Text>
                  </View>

                  <View style={{margin: 10}}>
                    <Image
                      style={{width: 334, height: 1}}
                      source={require('../../image/line6.png')}
                    />
                  </View>

                  <View style={[Styles.marginTop20, Styles.marginBottom20]}>
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

                      function uri(item) {
                        var uri = item.split('/');
                        console.log(uri[10]);
                        return uri[10];
                      }

                      const openLink = async item => {
                        const Token = Props.authData.token;
                        const userDrive =
                          Props.getUser.userDetails.res_result.userID_drive;
                        const idAct = item.id;
                        const idpid = uri(item.uri);

                        const deepLink = getDeepLink('callback');
                        const urlpid = `https://drive.ditp.go.th/th-th/signin?type=4&pid=${idpid}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        const urlpid2 = `https://drive.ditp.go.th/th-th/signin?type=5&pid=${idpid}&activityid=${idAct}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        // console.log('ค่า', urlpid2);
                        // console.log(item);
                        if (item.selec == 1) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  // Specify full animation resource identifier(package:anim/name)
                                  // or only resource name(in case of animation bundled with app).
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid);
                          } catch (error) {
                            Linking.openURL(urlpid);
                          }
                        } else if (item.selec == 2) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid2,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  // Specify full animation resource identifier(package:anim/name)
                                  // or only resource name(in case of animation bundled with app).
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid2);
                          } catch (error) {
                            Linking.openURL(urlpid2);
                          }
                        }
                      };

                      return (
                        <View style={{marginTop: -20}}>
                          <View style={[Styles.OverlayView6, {bottom: -10}]}>
                            <View style={Styles.ViewSub30}>
                              {index == 0 && (
                                <View style={{}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 12,
                                        marginTop: 5,
                                      }}
                                      source={require('../../image/pontone1.png')}
                                    />

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepont1.png')}
                                  />
                                </View>
                              )}
                              {index == 1 && (
                                <View style={{marginBottom: 15, marginTop: 3}}>
                                  <View style={{flexDirection: 'row'}}>
                                    {data.status_active === 'N' ? (
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                        }}
                                        source={require('../../image/point2.png')}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                          backgroundColor: '#FFFFFF',
                                          borderWidth: 1,
                                          borderColor: '#3986ee',
                                          borderRadius: 8,
                                        }}
                                      />
                                    )}

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepoint2.png')}
                                  />
                                </View>
                              )}
                              {index == 2 && (
                                <View style={{marginTop: -10}}>
                                  {data.status_url != '' ? (
                                    <View style={{marginBottom: 15}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                        }}>
                                        {data.status_active === 'N' ? (
                                          <Image
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                            }}
                                            source={require('../../image/point2.png')}
                                          />
                                        ) : (
                                          <View
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                              backgroundColor: '#FFFFFF',
                                              borderWidth: 1,
                                              borderColor: '#3986ee',
                                              borderRadius: 8,
                                            }}
                                          />
                                        )}
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            marginHorizontal: 15,
                                            borderColor: '#9c7df6',
                                            borderRadius: 8,
                                            width: 250,
                                            height: 70,
                                          }}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 24,
                                                color: '#2d6dc4',
                                              }}>
                                              {' '}
                                              รอการชำระเงิน
                                            </Text>
                                            <TouchableOpacity
                                              onPress={() =>
                                                openLink({
                                                  uri: data.status_url,
                                                  selec: 1,
                                                })
                                              }
                                              style={{
                                                height: 34,
                                                width: 112,
                                                backgroundColor: '#9c7df6',
                                                borderRadius: 8,
                                                marginTop: 18,
                                                right: 9,
                                                position: 'absolute',
                                                justifyContent: 'center',
                                              }}>
                                              <View>
                                                <Text
                                                  style={{
                                                    textAlign: 'center',
                                                    color: '#FFF',
                                                    fontSize: 18,
                                                  }}>
                                                  {' '}
                                                  {I18n.t('translate_lPayment')}
                                                </Text>
                                              </View>
                                            </TouchableOpacity>
                                          </View>
                                          <View>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#e82d2d',
                                              }}>
                                              {' '}
                                              ครบกำหนด
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      <Image
                                        style={{
                                          width: 2,
                                          height: 80,
                                          marginLeft: 4.5,
                                          marginTop: -50,
                                        }}
                                        source={require('../../image/linepoint2.png')}
                                      />
                                    </View>
                                  ) : (
                                    <View style={{marginBottom: 15}}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 12,
                                            marginTop: 5,
                                          }}
                                          source={require('../../image/point2.png')}
                                        />

                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: '#2d6dc4',
                                          }}>
                                          {' '}
                                          {data.status_name}
                                        </Text>
                                      </View>
                                      <Image
                                        style={{
                                          width: 2,
                                          height: 17,
                                          marginLeft: 4.5,
                                          marginTop: -3,
                                        }}
                                        source={require('../../image/linepoint2.png')}
                                      />
                                    </View>
                                  )}
                                </View>
                              )}
                              {index == 3 && (
                                <View
                                  style={{marginBottom: 15, marginTop: -10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    {data.status_active === 'N' ? (
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                        }}
                                        source={require('../../image/point2.png')}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 12,
                                          height: 12,
                                          marginTop: 5,
                                          backgroundColor: '#FFFFFF',
                                          borderWidth: 1,
                                          borderColor: '#3986ee',
                                          borderRadius: 8,
                                        }}
                                      />
                                    )}

                                    <Text
                                      style={{fontSize: 18, color: '#2d6dc4'}}>
                                      {' '}
                                      {data.status_name}
                                    </Text>
                                  </View>
                                  <Image
                                    style={{
                                      width: 2,
                                      height: 17,
                                      marginLeft: 4.5,
                                      marginTop: -3,
                                    }}
                                    source={require('../../image/linepoint2.png')}
                                  />
                                </View>
                              )}
                              {index == 4 && (
                                <View style={{marginTop: -10}}>
                                  {data.status_url != '' ? (
                                    <View style={{marginBottom: 15}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                        }}>
                                        {data.status_active === 'N' ? (
                                          <Image
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                            }}
                                            source={require('../../image/point2.png')}
                                          />
                                        ) : (
                                          <View
                                            style={{
                                              width: 12,
                                              height: 12,
                                              marginTop: 5,
                                              backgroundColor: '#FFFFFF',
                                              borderWidth: 1,
                                              borderColor: '#3986ee',
                                              borderRadius: 8,
                                            }}
                                          />
                                        )}
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            marginHorizontal: 15,
                                            borderColor: '#3986ee',
                                            borderRadius: 8,
                                            width: 250,
                                            height: 70,
                                          }}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 24,
                                                color: '#2d6dc4',
                                              }}>
                                              {' '}
                                              ทำแบบประเมิน
                                            </Text>
                                            <TouchableOpacity
                                              onPress={() => {
                                                openLink({
                                                  uri: data.status_url,
                                                  selec: 2,
                                                  id: state.idAct,
                                                });
                                              }}
                                              style={{
                                                height: 34,
                                                width: 112,
                                                backgroundColor: '#3986ee',
                                                borderRadius: 8,
                                                marginTop: 18,
                                                right: 9,
                                                position: 'absolute',
                                                justifyContent: 'center',
                                              }}>
                                              <View>
                                                <Text
                                                  style={{
                                                    textAlign: 'center',
                                                    color: '#FFF',
                                                    fontSize: 18,
                                                  }}>
                                                  {' '}
                                                  {I18n.t(
                                                    'translate_assessmentBotton',
                                                  )}
                                                </Text>
                                              </View>
                                            </TouchableOpacity>
                                          </View>
                                          <View>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#e82d2d',
                                              }}>
                                              {' '}
                                              ครบกำหนด
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                color: '#7d7d7d',
                                                marginTop: 4,
                                              }}>
                                              {' '}
                                              *เพื่อใช้ประกอบการพิจารณาคัดเลือกเข้าร่วมกิจกรรมครั้งต่อไป
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  ) : (
                                    <View style={{marginBottom: 15}}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 12,
                                            marginTop: 5,
                                          }}
                                          source={require('../../image/point2.png')}
                                        />

                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: '#2d6dc4',
                                          }}>
                                          {' '}
                                          {data.status_name}
                                        </Text>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              )}
                            </View>
                          </View>
                          {index != 4 ? (
                            <View>
                              <Text />
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>

                  {this.state.ckhide === false ? (
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <Text
                        onPress={() => {
                          this.setState({ckhide: true});
                        }}
                        style={{
                          fontSize: 18,
                          color: '#2d6dc4',
                          textAlign: 'center',
                          textDecorationLine: 'underline',
                        }}>
                        แสดงรายละเอียด
                      </Text>
                      <Icon3
                        color="#2d6dc4"
                        name="keyboard-arrow-down"
                        size={20}
                      />
                    </View>
                  ) : (
                    <>
                      {/* <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataShow')} :
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.StarD} - {this.state.EndD}{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                          {I18n.t('translate_DataRegister')} :{' '}
                        </Text>

                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.starretgis} - {this.state.endregis}{' '}
                        </Text> */}

                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_place')} :
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 7, height: 11}}
                          source={require('../../image/maker2.png')}
                        />
                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {' '}
                          {this.state.location}{' '}
                        </Text>
                      </View>

                      {/* thking */}

                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_group_product')} :
                      </Text>

                      {/* {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                                {' '}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })} */}
                      <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                        {I18n.t('translate_Readmore')} :
                      </Text>
                      <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                        {I18n.t('translate_Main')}
                      </Text>
                      <View style={{width: 321, height: null}}>
                        <Text style={{fontSize: 18, color: '#7d7d7d'}}>
                          {this.state.detail}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text
                          onPress={() => {
                            this.setState({ckhide: false});
                          }}
                          style={{
                            fontSize: 18,
                            color: '#2d6dc4',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                          }}>
                          ซ่อนรายละเอียด
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-up"
                          size={20}
                        />
                      </View>
                    </>
                  )}

                  <View style={{margin: 10}}>
                    <Image
                      style={{width: 334, height: 1}}
                      source={require('../../image/line6.png')}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={{color: '#3a3a3a', fontSize: 18}}>
                      หน่วยงานอบรมรับผิดชอบ : {this.state.daparment_name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{color: '#3a3a3a', fontSize: 18}}>
                      เจ้าหน้าที่โครงการ : {this.state.officer_name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {this.state.deparment_tel === 'ditp.ciie@gmail.com' ? (
                        <Image
                          style={{width: 29, height: 29}}
                          source={require('../../image/emailx.png')}
                        />
                      ) : (
                        <Image
                          style={{width: 29, height: 29}}
                          source={require('../../image/phonelx.png')}
                        />
                      )}
                      {this.state.deparment_tel === 'ditp.ciie@gmail.com' ? (
                        <Text style={{color: '#2d6dc4', fontSize: 18, top: 4}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      ) : (
                        <Text
                          onPress={() => {
                            this.Call(this.state.deparment_tel);
                          }}
                          style={{color: '#2d6dc4', fontSize: 18, top: 4}}>
                          {'   '} {this.state.deparment_tel}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}

        {/* <ImageBackground
          imageStyle={{width: '100%', height: null}}
          resizeMode="cover"
          style={{}}
          source={require('../../image/Actbackground.png')}> */}
      
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginHorizontal: 10,
              // marginBottom: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({Detailact: true});
                this.setState({LogoAct: item.activity_list_logo_banner});
                this.setState({nameAct: item.activity_name_th});
                this.setState({
                  StartDateAct: this.FullDate(item.activity_list_start_date),
                });
                this.setState({
                  EndDateAct: this.FullDate(item.activity_list_end_date),
                  startregis: this.FullDate(item.activity_list_start_regis),
                });
                this.setState({location: item.activity_list_location_th});
                this.setState({AcceptDate: this.formatdate(item.regis_date)});
                this.setState({
                  price:
                    I18n.locale === 'th'
                      ? item.activity_price_th
                      : item.activity_price_en,
                });
                this.setState({Status: item.participate_status_code});
                this.setState({Phone: item.activity_list_department_tel});
                this.setState({DatailAct: item.activity_desc_th});
                this.setState({participate: item.max_of_participate});
                this.setState({Link: item.url_detail});
                this.setState({
                  payProduct: this.formatdate(item.activity_pay_duedate),
                });
                this.setState({survay: item.url_survay});

                this.setState({Status: item.activity_status});
                this.setState({
                  idAct: item.id_list,
                  detail:
                    I18n.locale === 'th'
                      ? item.activity_desc_th
                      : item.activity_desc_en,
                  officer_name: item.activity_list_officer_name,
                  daparment_name: item.activity_list_department_name,
                  deparment_tel: item.activity_list_department_tel,
                });
              }}>
              <ListItem
                style={Styles.styeList}
                containerStyle={Styles.containerList}
                leftAvatar={
                  <Image
                    resizeMode={'center'}
                    source={{
                      uri:
                        item.activity_list_logo_thumb === ''
                          ? 'http://one.ditp.go.th/dist/img/icon/no-image.png'
                          : item.activity_list_logo_thumb,
                    }}
                    style={
                      item.activity_list_logo_thumb === ''
                        ? {width: 60, height: 56, borderRadius: 10}
                        : Styles.ImgList
                    }
                  />
                }
                title={
                  <View style={{width: '80%', marginTop: 10}}>
                    <Text
                      numberOfLines={2}
                      style={[Styles.titleList, {lineHeight: 18}]}>
                      {item.activity_name_th}
                    </Text>
                    <View>
                      <Text style={Styles.TextDateList}>
                        {I18n.t('translate_Join')}
                        <Text
                          style={{
                            color: '#8b9bb0',
                            fontSize: Platform.OS === 'android' ? 12 : 18,
                          }}>
                          {' '}
                          {this.formatdate(item.regis_date)}
                        </Text>
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
                              <>
                                <View
                                  style={[
                                    Styles.ViewSubList2,
                                    {width: '100%', left: 0},
                                  ]}>
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
                                    numberOfLines={1}
                                    style={{
                                      fontSize: 16,
                                      color: Check(status_color),
                                    }}>
                                    {' '}
                                    {status_name}
                                  </Text>
                                </View>
                                {status_name === 'ทำแบบประเมิน' && (
                                  <TouchableOpacity
                                    onPress={() => {}}
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 8,
                                      flexDirection: 'row',
                                      width: 112,
                                      height: 34,
                                      backgroundColor: Check(status_color),
                                    }}>
                                    <Icon
                                      name="clipboard"
                                      size={18}
                                      style={{
                                        color: '#FFFFFF',
                                        marginHorizontal: 5,
                                      }}
                                    />
                                    <Text
                                      style={{color: '#FFFFFF', fontSize: 18}}>
                                      {status_name}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </>
                            );
                          })}
                      </View>
                    </View>
                  </View>
                }
              />
            </TouchableOpacity>
            {/* </ImageBackground> */}
          </View>
        
      </View>
    );
  };

  DataAct2 = () => {
    try {
      const ActivityAccept2 = this.state.ActivityAccept;
      var number = [];
      if (ActivityAccept2.length > this.state.Page) {
        for (let index = 0; index < this.state.Page; index++) {
          number.push(ActivityAccept2[index]);
        }

        return number;
      } else {
        number.push(ActivityAccept2);

        return number[0];
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };

  DataActSuses = values => {
    try {
      const Actitvity2020 = this.state.ActivityYear[this.state.year3];
      const ActivityYear2019 = this.state.ActivityYear[this.state.year2];
      const ActivityYear2018 = this.state.ActivityYear[this.state.year1];
      var number = [];
      if (values == 1) {
        if (Actitvity2020.length > this.state.Page3) {
          for (let index = 0; index < this.state.Page3; index++) {
            number.push(Actitvity2020[index]);
          }

          return number;
        } else {
          number.push(Actitvity2020);
          return number[0];
        }
      } else if (values == 2) {
        if (ActivityYear2019.length > this.state.Page4) {
          for (let index = 0; index < this.state.Page4; index++) {
            number.push(ActivityYear2019[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2019);
          return number[0];
        }
      } else if (values == 3) {
        if (ActivityYear2018.length > this.state.Page5) {
          for (let index = 0; index < this.state.Page5; index++) {
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

  ListDataAct2Susess = ({item, index}) => {
    var Props = this.props;
    var state = this.state;
    return (
      <View style={{}}>
        {this.state.Detailact === true && (
          <Overlay
            onBackdropPress={() => this.setState({Detailact: false})}
            backdropStyle={Styles.backdrop}
            isVisible>
            <View style={{height: height * 0.8}}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                  onPress={() => this.setState({Detailact: false})}>
                  <Image
                    style={Styles.ImgClose}
                    source={require('../../image/closemenu.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(this.state.Link)}>
                      {this.state.LogoAct != '' ? (
                        <Image
                          resizeMode={'contain'}
                          style={Styles.ImgActivity}
                          source={{uri: this.state.LogoAct}}
                        />
                      ) : (
                        <Image
                          resizeMode={'center'}
                          style={{width: 360, height: 216}}
                          source={require('../../image/banerDrive.png')}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.marginTop4}>
                    <Text style={Styles.TextOverlay}>
                      {I18n.t('translate_subject')} {this.state.nameAct}
                    </Text>
                  </View>
                  <View>
                    <Text style={Styles.TextOverlay2}>
                      {this.state.StartDateAct} - {this.state.EndDateAct}
                    </Text>
                  </View>
                  <View style={Styles.OverlayView4}>
                    <Image
                      style={Styles.Imgmaker}
                      source={require('../../image/maker2.png')}
                    />
                    <Text style={Styles.TextOverlay3}>
                      {' '}
                      {this.state.location}
                    </Text>
                  </View>
                  <View style={Styles.OverlayView5}>
                    <Image
                      style={Styles.Imgunderline}
                      source={require('../../image/underline4.png')}
                    />
                  </View>
                  <View style={Styles.marginTop10}>
                    <Text style={Styles.TextOverlay3}>
                      {I18n.t('translate_Join_date')} : {this.state.AcceptDate}
                    </Text>
                    <Text style={Styles.TextOverlay3}>
                      {I18n.t('translate_Activity_participation')} :{' '}
                      {this.state.price === '-' || this.state.price === ''
                        ? 'ไม่มีค่าใช้จ่าย'
                        : this.state.price}
                    </Text>
                  </View>

                  <View style={[Styles.marginTop20, Styles.marginBottom20]}>
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

                      function uri(item) {
                        var uri = item.split('/');
                        console.log(uri[10]);
                        return uri[10];
                      }

                      const openLink = async item => {
                        const Token = Props.authData.token;
                        const userDrive =
                          Props.getUser.userDetails.res_result.userID_drive;
                        const idAct = item.id;
                        const idpid = uri(item.uri);

                        const deepLink = getDeepLink('callback');
                        const urlpid = `https://drive.ditp.go.th/th-th/signin?type=4&pid=${idpid}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        const urlpid2 = `https://drive.ditp.go.th/th-th/signin?type=5&pid=${idpid}&activityid=${idAct}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
                        // console.log('ค่า', urlpid2);
                        // console.log(item);
                        if (item.selec == 1) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid);
                          } catch (error) {
                            Linking.openURL(urlpid);
                          }
                        } else if (item.selec == 2) {
                          try {
                            if (await InAppBrowser.isAvailable()) {
                              const result = await InAppBrowser.open(
                                urlpid2,
                                deepLink,
                                {
                                  // iOS Properties
                                  dismissButtonStyle: 'cancel',
                                  preferredBarTintColor: '#453AA4',
                                  preferredControlTintColor: 'white',
                                  readerMode: false,
                                  animated: true,
                                  modalPresentationStyle: 'fullScreen',
                                  modalTransitionStyle: 'partialCurl',
                                  modalEnabled: true,
                                  enableBarCollapsing: false,
                                  // Android Properties
                                  showTitle: true,
                                  toolbarColor: '#6200EE',
                                  secondaryToolbarColor: 'black',
                                  enableUrlBarHiding: true,
                                  enableDefaultShare: true,
                                  forceCloseOnRedirection: false,
                                  // Specify full animation resource identifier(package:anim/name)
                                  // or only resource name(in case of animation bundled with app).
                                  animations: {
                                    startEnter: 'slide_in_right',
                                    startExit: 'slide_out_left',
                                    endEnter: 'slide_in_left',
                                    endExit: 'slide_out_right',
                                  },
                                },
                              );
                            } else Linking.openURL(urlpid2);
                          } catch (error) {
                            Linking.openURL(urlpid2);
                          }
                        }
                      };

                      return (
                        <View style={{marginTop: -20}}>
                          <View style={[Styles.OverlayView6, {bottom: -10}]}>
                            <View
                              style={[
                                Styles.ViewSub29,
                                {
                                  backgroundColor: Check(data.status_color),
                                },
                              ]}
                            />
                            <View style={{width: '70%'}}>
                              <Text
                                numberOfLines={2}
                                style={[
                                  Styles.TextOverlay4,
                                  {color: Check(data.status_color)},
                                ]}>
                                {' '}
                                {data.status_name}
                              </Text>
                            </View>
                            <View style={Styles.ViewSub30}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: '#73838f',
                                    right: 10,
                                  }}>
                                  {data.status_date != ''
                                    ? data.status_date
                                    : null}
                                </Text>
                              </View>
                              {index == 2 && (
                                <View>
                                  {data.status_url != '' && (
                                    <TouchableOpacity
                                      onPress={() =>
                                        openLink({
                                          uri: data.status_url,
                                          selec: 1,
                                        })
                                      }
                                      style={{
                                        width: 75,
                                        height: 23,
                                        alignItems: 'center',
                                        backgroundColor: '#51c42d',
                                        borderRadius: 11,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          color: '#ffffff',
                                        }}>
                                        {I18n.t('translate_lPayment')}
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              )}

                              <View style={{flexDirection: 'row'}}>
                                {index == 4 && (
                                  <View>
                                    {data.status_url != '' && (
                                      <TouchableOpacity
                                        onPress={() => {
                                          openLink({
                                            uri: data.status_url,
                                            selec: 2,
                                            id: state.idAct,
                                          });
                                        }}
                                        style={{
                                          width: 75,
                                          height: 23,
                                          alignItems: 'center',
                                          backgroundColor: '#51c42d',
                                          borderRadius: 11,
                                          marginLeft: 10,
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                        }}>
                                        <Image
                                          style={{width: 12, height: 12}}
                                          source={require('../../image/statusP.png')}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            color: '#ffffff',
                                          }}>
                                          {' '}
                                          {I18n.t('translate_assessmentBotton')}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                          {index != 4 ? (
                            <Image
                              style={[Styles.ImgLinepoint, {zIndex: -1}]}
                              source={require('../../image/linepoint.png')}
                            />
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>
                  <View style={Styles.bottom30}>
                    <Text style={Styles.TextOverlay3}>
                      {I18n.t('translate_Contactprojectstaff')} :{' '}
                      {this.state.Phone}
                    </Text>
                    <View style={Styles.OverlayView5}>
                      <Image
                        style={Styles.Imgunderline}
                        source={require('../../image/underline4.png')}
                      />
                    </View>
                    <View style={Styles.marginTop5}>
                      <Text style={Styles.TextOverlay3}>
                        {I18n.t('translate_Detail')} :
                      </Text>
                      <View>
                        <Text style={Styles.TextOverlay7}>
                          {this.state.DatailAct}
                        </Text>
                      </View>
                      <View style={Styles.marginTop20}>
                        <Text style={Styles.TextOverlay3}>
                          {I18n.t('translate_Numberbooths')} :{' '}
                          {this.state.participate} ราย
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.OverlayView12}>
                    <TouchableOpacity
                      onPress={() => this.setState({Detailact: false})}
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
        {/* <ImageBackground
          imageStyle={{width: '100%', height: null}}
          resizeMode="cover"
          style={{}}
          source={require('../../image/Actbackground.png')}> */}
        <View style={{backgroundColor: '#fbfbfd', marginTop: 5}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({Detailact: true});
              this.setState({LogoAct: item.activity_list_logo_banner});
              this.setState({nameAct: item.activity_name_th});
              this.setState({
                StartDateAct: this.FullDate(item.activity_list_start_date),
              });
              this.setState({
                EndDateAct: this.FullDate(item.activity_list_end_date),
              });
              this.setState({location: item.activity_list_location_th});
              this.setState({AcceptDate: this.formatdate(item.regis_date)});
              this.setState({price: item.activity_price_th});
              this.setState({Status: item.participate_status_code});
              this.setState({Phone: item.activity_list_department_tel});
              this.setState({DatailAct: item.activity_desc_th});
              this.setState({participate: item.max_of_participate});
              this.setState({Link: item.url_detail});
              this.setState({
                payProduct: this.formatdate(item.activity_pay_duedate),
              });
              this.setState({survay: item.url_survay});
              this.setState({Status: item.activity_status});
              this.setState({idAct: item.id_list});
            }}>
            <ListItem
              style={{
                backgroundColor: 'red',
                marginHorizontal: 10,
                marginBottom: 5,
              }}
              containerStyle={{}}
              leftAvatar={
                <Image
                  resizeMode={'center'}
                  source={{
                    uri:
                      item.activity_list_logo_thumb === ''
                        ? 'http://one.ditp.go.th/dist/img/icon/no-image.png'
                        : item.activity_list_logo_thumb,
                  }}
                  style={
                    item.activity_list_logo_thumb === ''
                      ? {width: 60, height: 56, borderRadius: 10}
                      : Styles.ImgList
                  }
                />
              }
              title={
                <View style={{width: '80%', marginTop: 10}}>
                  <Text
                    numberOfLines={2}
                    style={[Styles.titleList, {lineHeight: 20}]}>
                    {item.activity_name_th}
                  </Text>
                  <View>
                    <Text style={Styles.TextDateList}>
                      {I18n.t('translate_Join')}
                      <Text
                        style={{
                          color: '#ffb468',
                          fontSize: Platform.OS === 'android' ? 12 : 18,
                        }}>
                        {' '}
                        {this.formatdate(item.regis_date)}
                      </Text>
                    </Text>
                    <View>
                      <View
                        style={[Styles.ViewSubList2, {width: '100%', left: 0}]}>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            backgroundColor: '#cad8e1',
                            borderRadius: 30,
                            borderColor: 'transparent',
                          }}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 16,

                            color: '#cad8e1',
                          }}>
                          {' '}
                          {I18n.t('translate_EndAct')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              }
            />
          </TouchableOpacity>
          {/* </ImageBackground> */}
        </View>
      </View>
    );
  };

  _handleTabHeight = item => {
    this.setState({heightTab: item.i});
  };
  chageTabmenu = item => {
    this.setState({heightTab: item});
  };

  handleIndexChange = (index, number) => {
    this.props.dispatch({
      type: 'INCREMENT',
      score: 1,
    });

    this.setState({SelecIndexYear: index});
    setTimeout(() => {
      this.props.dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
  };

  componentDidMount() {
    this._getActivity();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <ScrollableTabView
          onChangeTab={test => {
            this._handleTabHeight(test);
          }}
          initialPage={0}
          style={{flex: 1}}
          tabBarActiveTextColor="#40536d"
          tabBarInactiveTextColor="#cad8e1"
          tabBarUnderlineStyle={Styles.ScrollTabView}
          tabBarTextStyle={Styles.ScrollTabText}
          prerenderingSiblingsNumber={1}
          renderTabBar={test => (
            <ScrollableTabBar style={Styles.ScrollTabBar} />
          )}>
          <View tabLabel={'การสมัคร'} />
          <View tabLabel={I18n.t('translate_Activities_actualize')} />
          <View tabLabel={I18n.t('translate_Completed_activities')} />
        </ScrollableTabView> */}

        <View
          style={{
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            borderColor: '#3986ee',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.chageTabmenu(0);
            }}
            style={Styles.Touchmenustory}>
            <LinearGradient
              start={{x: 0, y: 0.7}}
              end={{x: 0.8, y: 0}}
              colors={
                this.state.heightTab == 0
                  ? ['#3986ee', '#9c7df6']
                  : ['#FFFFFF', '#FFFFFF']
              }
              style={{height: 42, justifyContent: 'center'}}>
              <Text
                style={
                  this.state.heightTab == 0
                    ? Styles.textmeenustory
                    : Styles.textmeenustory2
                }>
                {'การสมัคร'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.chageTabmenu(1);
            }}
            style={Styles.Touchmenustory1}>
            <LinearGradient
              start={{x: 0, y: 0.7}}
              end={{x: 0.8, y: 0}}
              colors={
                this.state.heightTab == 1
                  ? ['#3986ee', '#9c7df6']
                  : ['#FFFFFF', '#FFFFFF']
              }
              style={{height: 42, justifyContent: 'center'}}>
              <Text
                style={
                  this.state.heightTab == 1
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
                this.state.heightTab == 2
                  ? ['#3986ee', '#9c7df6']
                  : ['#FFFFFF', '#FFFFFF']
              }
              style={{height: 42, justifyContent: 'center'}}>
              <Text
                style={
                  this.state.heightTab == 2
                    ? Styles.textmeenustory
                    : Styles.textmeenustory2
                }>
                {I18n.t('translate_Completed_activities')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {this.state.heightTab == 0 && (
          <View style={{}}>
            {this.state.ActivityAccept.length > 0 ? (
              <View style={{backgroundColor: '#fbfbfd'}}>
                <FlatList
                  scrollEnabled={false}
                  style={{backgroundColor: 'transparent', flex: 1}}
                  renderItem={this.ListDataAct1}
                  data={this.DataAct2()}
                  keyExtractor={(item, index) => item.id_list}
                />

                {/* <View style={{}}> */}
                {this.state.ActivityAccept.length > 3 && (
                  // <View style={Styles.ViewSub12}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 33,
                      justifyContent: 'center',

                      marginBottom: 10,
                      backgroundColor: '#FFFFFF',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      this.state.ActivityAccept.length === this.state.Page
                        ? this.setState({Page: 3})
                        : this.setState({
                            Page: this.state.ActivityAccept.length,
                          });
                    }}>
                    <Text style={Styles.TextHide}>
                      {' '}
                      {this.state.ActivityAccept.length === this.state.Page
                        ? I18n.t('translate_Hide')
                        : I18n.t('translate_See_more')}
                    </Text>
                  </TouchableOpacity>
                  // </View>
                )}
                <View style={{alignItems: 'center'}}>
                  <View style={Styles.marginTop10}>
                    <Image source={require('../../image/lineact2.png')} />
                  </View>
                </View>
              </View>
            ) : (
              // </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 25}}>
                  {I18n.t('translate_NoHistory')}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <View style={Styles.marginTop10}>
                    <Image source={require('../../image/lineact2.png')} />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        {this.state.heightTab == 1 && (
          <View style={{}}>
            {this.state.ActivityAccept.length > 0 ? (
              <View style={{backgroundColor: '#fbfbfd'}}>
                <FlatList
                  scrollEnabled={false}
                  style={{backgroundColor: 'transparent', flex: 1}}
                  renderItem={this.ListDataAct2}
                  data={this.DataAct2()}
                  keyExtractor={(item, index) => item.id_list}
                />

                {/* <View style={{}}> */}
                {this.state.ActivityAccept.length > 3 && (
                  // <View style={Styles.ViewSub12}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 33,
                      justifyContent: 'center',

                      marginBottom: 10,
                      backgroundColor: '#FFFFFF',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      this.state.ActivityAccept.length === this.state.Page
                        ? this.setState({Page: 3})
                        : this.setState({
                            Page: this.state.ActivityAccept.length,
                          });
                    }}>
                    <Text style={Styles.TextHide}>
                      {' '}
                      {this.state.ActivityAccept.length === this.state.Page
                        ? I18n.t('translate_Hide')
                        : I18n.t('translate_See_more')}
                    </Text>
                  </TouchableOpacity>
                  // </View>
                )}
                <View style={{alignItems: 'center'}}>
                  <View style={Styles.marginTop10}>
                    <Image source={require('../../image/lineact2.png')} />
                  </View>
                </View>
              </View>
            ) : (
              // </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 25}}>
                  {I18n.t('translate_NoHistory')}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <View style={Styles.marginTop10}>
                    <Image source={require('../../image/lineact2.png')} />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        {this.state.heightTab == 2 && (
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
                  selectedIndex={this.state.SelecIndexYear}
                  values={[
                    (this.state.year3 + 543).toString(),
                    (this.state.year2 + 543).toString(),
                    (this.state.year1 + 543).toString(),
                  ]}
                  onTabPress={this.handleIndexChange}
                />
              </View>
              {this.state.SelecIndexYear === 0 && (
                <View style={{width: '100%'}}>
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

                  {this.state.ActivityYear[this.state.year3].length > 0 ? (
                    <View style={{flex: 1, backgroundColor: '#fbfbfd'}}>
                      <FlatList
                        scrollEnabled={false}
                        style={{backgroundColor: 'transparent', flex: 1}}
                        data={this.DataActSuses(1)}
                        keyExtractor={(item, index) => index}
                        renderItem={this.ListDataAct2Susess}
                      />

                      {this.state.ActivityYear[this.state.year3].length > 3 && (
                        // <View style={Styles.ViewSub12}>
                        <TouchableOpacity
                          // style={Styles.Touchhide}
                          style={{
                            flex: 1,
                            height: 33,
                            justifyContent: 'center',

                            marginBottom: 10,
                            backgroundColor: '#FFFFFF',
                            marginTop: 10,
                          }}
                          onPress={() => {
                            this.state.ActivityYear[this.state.year3].length ===
                            this.state.Page3
                              ? this.setState({Page3: 3})
                              : this.setState({
                                  Page3: this.state.ActivityYear[
                                    this.state.year3
                                  ].length,
                                });
                          }}>
                          <Text style={Styles.TextHide}>
                            {' '}
                            {this.state.ActivityYear[this.state.year3]
                              .length === this.state.Page3
                              ? I18n.t('translate_Hide')
                              : I18n.t('translate_See_more')}
                          </Text>
                        </TouchableOpacity>
                        // </View>
                      )}
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                      <Text style={{fontSize: 25}}>
                        {I18n.t('translate_NoHistory')}
                      </Text>
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {this.state.SelecIndexYear === 1 && (
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      //   width: '1%',
                      alignSelf: 'center',
                    }}>
                    <Image
                      style={{width: 11, height: 7, bottom: 2}}
                      source={require('../../image/DropDown.png')}
                    />
                  </View>

                  {this.state.ActivityYear[this.state.year2].length != 0 ? (
                    <View style={{flex: 1, backgroundColor: '#fbfbfd'}}>
                      <FlatList
                        scrollEnabled={false}
                        style={{backgroundColor: 'transparent', flex: 1}}
                        data={this.DataActSuses(2)}
                        keyExtractor={(item, index) => index}
                        renderItem={this.ListDataAct2Susess}
                      />

                      {this.state.ActivityYear[this.state.year2].length > 3 && (
                        // <View style={Styles.ViewSub12}>
                        <TouchableOpacity
                          // style={Styles.Touchhide}
                          style={{
                            flex: 1,
                            height: 33,
                            justifyContent: 'center',

                            marginBottom: 10,
                            backgroundColor: '#FFFFFF',
                            marginTop: 10,
                          }}
                          onPress={() => {
                            this.state.ActivityYear[this.state.year2].length ===
                            this.state.Page4
                              ? this.setState({Page4: 3})
                              : this.setState({
                                  Page4: this.state.ActivityYear[
                                    this.state.year2
                                  ].length,
                                });
                          }}>
                          <Text style={Styles.TextHide}>
                            {' '}
                            {this.state.ActivityYear[this.state.year2]
                              .length === this.state.Page4
                              ? I18n.t('translate_Hide')
                              : I18n.t('translate_See_more')}
                          </Text>
                        </TouchableOpacity>
                        // </View>
                      )}
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                      <Text style={{fontSize: 25}}>
                        {I18n.t('translate_NoHistory')}
                      </Text>
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {this.state.SelecIndexYear === 2 && (
                <View style={{width: '100%'}}>
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

                  {this.state.ActivityYear[this.state.year1].length != 0 ? (
                    <View style={{flex: 1, backgroundColor: '#fbfbfd'}}>
                      <FlatList
                        scrollEnabled={false}
                        style={{backgroundColor: 'transparent', flex: 1}}
                        data={this.DataActSuses(3)}
                        keyExtractor={(item, index) => index}
                        renderItem={this.ListDataAct2Susess}
                      />

                      {this.state.ActivityYear[this.state.year1].length > 3 && (
                        // <View style={Styles.ViewSub12}>
                        <TouchableOpacity
                          // style={Styles.Touchhide}
                          style={{
                            flex: 1,
                            height: 33,
                            justifyContent: 'center',

                            marginBottom: 10,
                            backgroundColor: '#FFFFFF',
                            marginTop: 10,
                          }}
                          onPress={() => {
                            this.state.ActivityYear[this.state.year1].length ===
                            this.state.Page5
                              ? this.setState({Page5: 3})
                              : this.setState({
                                  Page5: this.state.ActivityYear[
                                    this.state.year1
                                  ].length,
                                });
                          }}>
                          <Text style={Styles.TextHide}>
                            {' '}
                            {this.state.ActivityYear[this.state.year1]
                              .length === this.state.Page5
                              ? I18n.t('translate_Hide')
                              : I18n.t('translate_See_more')}
                          </Text>
                        </TouchableOpacity>
                        // </View>
                      )}
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                      <Text style={{fontSize: 25}}>
                        {I18n.t('translate_NoHistory')}
                      </Text>
                      <View style={{alignItems: 'center'}}>
                        <View style={Styles.marginTop10}>
                          <Image source={require('../../image/lineact2.png')} />
                        </View>
                      </View>
                    </View>
                  )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activities);
