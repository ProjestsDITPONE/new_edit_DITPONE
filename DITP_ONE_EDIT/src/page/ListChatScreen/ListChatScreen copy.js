import Swipeable from 'react-native-swipeable';
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
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import HeaderText from '../../components/HeaderText';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {CountNotification} from '../../actions/auth.actions';
import LinearGradient from 'react-native-linear-gradient';
import {
  tbNotification,
  ReadNoti,
  getChatHistory,
  deleteChatHistory,
  getStatusChat,
  getChatHistoryNew
} from '../../actions/data.actions';
import {UpdateCountChat, GetChatCount} from '../../actions/auth.actions';
import Styles from './Styles';
import I18n from '../../utils/I18n';

class ListChatScreen extends Component {
  constructor() {
    const getDate = new Date();
    super();
    this.state = {
      dataMarketData: [],
      currentlyOpenSwipeable: null,
      datachat: [],
      statusOpen: false,
      heightTab: 0,
    };
  }
  _getMarketData = async values => {
    try {
      this.response = await this.props.dispatch(
        getChatHistory({
          sso_id: this.props.getUser.userDetails.res_result.ssoid,
          loadding: values,
        }),
      );
      // console.log('เช็ค', this.response);
      if (this.response.res_code === '00') {
        this.setState({
          dataMarketData: this.response,
        });
        this.setState({datachat: this.state.dataMarketData.results});
      }
    } catch (error) {
      console.log(error);
    }
  };

  _UpdateCountChat = async values => {
    try {
      var tokenMenu = this.props.authData.token;
      const response = await this.props.dispatch(
        UpdateCountChat({token: tokenMenu}),
      );

      if (response.res_code === '00') {
        const respones = await this.props.dispatch(
          GetChatCount({
            token: tokenMenu,
          }),
        );
      }
    } catch (error) {}
  };

  static CallChatGoble = async values => {
    this._getMarketData(values);
  };

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._getMarketData(true);

    this.focusListener = navigation.addListener('focus', () => {
      this._getMarketData(false);
    });

    this._getStatusChat();
    console.log('xxxxwwwweeee');
  }

  _getStatusChat = async values => {
    try {
      this.response = await this.props.dispatch(
        getStatusChat({
          token_user: 'b04d0dd8-39fb-4f54-a12a-b4fafb3a6bc9',
        }),
      );
      if (this.response.res_code == '00') {
        this.setState({statusOpen: true});
      }
    } catch (error) {
      console.log(error);
    }
  };
  chageTabmenu = item => {
    this.setState({heightTab: item});
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
    const Data = this.state.dataMarketData.results;

    return (
      <View style={{flex: 1}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backHome={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        {/* <Headerstage nameTab={I18n.t('NongSaijai')} /> */}
        <HeaderText nameTab={I18n.t('NongSaijai')} />
        <View style={{alignItems: 'center', flex: 1, zIndex: -1}}>
          {this.state.dataMarketData.length == undefined && (
            <View style={{width: '100%'}}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 80,
                  marginBottom: 15,
                }}>
                <ListItem
                  leftAvatar={
                    <View style={{flex: 0.1}}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={{
                          uri:
                            'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                        }}
                      />
                    </View>
                  }
                  style={[Styles.listDataItem, Styles.listDataView]}
                  disabled={
                    !this.state.dataMarketData.resultsRealtime.length > 0
                  }
                  containerStyle={{
                    height: 80,
                    backgroundColor: 'transparent',
                  }}
                  title={
                    // เช็คกำลังสนทนาอยู่
                    // this.state.dataMarketData.resultsRealtime.length > 0 ? (
                    //   <Text style={Styles.titleStyle}>
                    //     {this.state.dataMarketData.resultsRealtime[0].messages}
                    //     {/* {I18n.t('translate_DateSaijai')} */}
                    //   </Text>
                    // ) : (
                    //   <View
                    //     style={{
                    //       backgroundColor: 'red',
                    //       alignSelf: 'center',
                    //     }}>
                    //     <Text style={Styles.titleStyle}>
                    //       {I18n.t('translate_DateSaijai')}
                    //     </Text>
                    //   </View>
                    // )
                    <View style={{flexDirection: 'row', width: '110%'}}>
                      <View style={{flex: 1, marginHorizontal: 4}}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: '#e3e4e7',
                            borderRadius: 8,
                          }}>
                          <Text
                            style={{
                              color: '#20416e',
                              fontSize: 20,
                              marginHorizontal: 9,
                            }}>
                            {'วันนี้อยากให้น้องใส่ใจ\ช่วยอะไรดีคะ?'}
                          </Text>
                        </View>
                      </View>
                      {/* {this.state.statusOpen ? ( */}
                        <View style={{flex: 1, marginHorizontal: 4}}>
                          <TouchableOpacity
                            onPress={async () => {
                              console.log('+++');
                              if (
                                this.state.dataMarketData.resultsRealtime
                                  .length > 0
                              ) {
                                this.props.navigation.navigate('ChatScreen');
                                this._UpdateCountChat();
                              } else {
                                this._UpdateCountChat();
                                Alert.alert(
                                  I18n.t('translate_Message_AddYourRequest'),
                                  '',
                                  [
                                    {
                                      text: I18n.t('translate_Cancel'),
                                      onPress: () => console.log('OK Pressed'),
                                    },
                                    {
                                      text: I18n.t('translate_Accept'),
                                      onPress: () =>
                                        this.props.navigation.navigate(
                                          'ChatScreen',
                                        ),
                                      style: 'cancel',
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              }
                            }}
                            style={{
                              backgroundColor: '#04a68a',
                              borderRadius: 8,
                              flexDirection: 'row',
                              width: '100%',
                            }}>
                            <View
                              style={{
                                flex: 0.5,

                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                style={{height: 28, width: 30}}
                                source={require('../../image/MESSN.png')}
                              />
                            </View>
                            <View style={{flex: 1}}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 20,
                                  marginHorizontal: 9,
                                }}>
                                {'เริ่มสนทนา\nกับน้องใส่ใจ'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                    {/* ) : (
                        <View style={{flex: 1, marginHorizontal: 4}}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#cfcfcf',
                              borderRadius: 8,
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                flex: 0.5,

                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                style={{height: 28, width: 30}}
                                source={require('../../image/Noopen.png')}
                              />
                            </View>
                            <View style={{flex: 1}}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 20,
                                  marginHorizontal: 9,
                                }}>
                                {'ขณะนี้อยู่นอก\nเวลาทำการ'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}  */}
                    </View>
                  }

                  // subtitle={
                  //   <View>
                  //     {this.state.statusOpen ? (
                  //       <View style={{width: '100%', alignItems: 'center'}}>
                  //         {this.state.dataMarketData.resultsRealtime.length >
                  //         0 ? (
                  //           <View style={{width: '100%'}}>
                  //             <Text
                  //               style={[
                  //                 Styles.TextSub4,
                  //                 Styles.TextSub3,
                  //                 {color: '#51af12'},
                  //               ]}
                  //               numberOfLines={2}>
                  //               {I18n.t('translate_waitChat')}
                  //             </Text>
                  //           </View>
                  //         ) : (
                  //           <TouchableOpacity
                  //             onPress={async () => {
                  //               console.log('+++');
                  //               if (
                  //                 this.state.dataMarketData.resultsRealtime
                  //                   .length > 0
                  //               ) {
                  //                 this.props.navigation.navigate('ChatScreen');
                  //                 this._UpdateCountChat();
                  //               } else {
                  //                 this._UpdateCountChat();
                  //                 Alert.alert(
                  //                   I18n.t('translate_Message_AddYourRequest'),
                  //                   '',
                  //                   [
                  //                     {
                  //                       text: I18n.t('translate_Cancel'),
                  //                       onPress: () =>
                  //                         console.log('OK Pressed'),
                  //                     },
                  //                     {
                  //                       text: I18n.t('translate_Accept'),
                  //                       onPress: () =>
                  //                         this.props.navigation.navigate(
                  //                           'ChatScreen',
                  //                         ),
                  //                       style: 'cancel',
                  //                     },
                  //                   ],
                  //                   {cancelable: false},
                  //                 );
                  //               }
                  //             }}

                  //             >
                  //             <View
                  //               style={{
                  //                 backgroundColor: '#51af12',
                  //                 alignItems: 'center',
                  //                 borderRadius: 21,
                  //                 flexDirection: 'row',
                  //                 paddingHorizontal: 10,
                  //                 padding: 3,
                  //               }}>
                  //               <Image
                  //                 style={{
                  //                   width: 13,
                  //                   height: 12,
                  //                   marginRight: 10,
                  //                 }}
                  //                 source={require('../../image/startChat.png')}
                  //               />
                  //               <Text
                  //                 style={[
                  //                   Styles.TextSub4,
                  //                   Styles.TextSub3,
                  //                   {color: '#fff'},
                  //                 ]}
                  //                 numberOfLines={2}>
                  //                 {I18n.t('translate_StartChat')}
                  //               </Text>
                  //             </View>
                  //           </TouchableOpacity>
                  //         )}
                  //       </View>
                  //     ) : (
                  //       <View style={{alignItems: 'center'}}>
                  //         <View
                  //           style={{
                  //             alignItems: 'center',
                  //             backgroundColor: '#cfcfcf',
                  //             borderRadius: 21,
                  //             flexDirection: 'row',
                  //             alignSelf: 'center',
                  //             paddingHorizontal: 10,
                  //             padding: 3,
                  //           }}>
                  //           <Image
                  //             style={{width: 14, height: 15, marginRight: 3}}
                  //             source={require('../../image/stopChat.png')}
                  //           />
                  //           <Text
                  //             style={[
                  //               Styles.TextSub4,
                  //               Styles.TextSub3,
                  //               {color: '#fff'},
                  //             ]}
                  //             numberOfLines={2}>
                  //             {/* ขณะนี้อยู่นอกเวลาทำการ */}
                  //             {I18n.t('translate_Message_Sorry')}
                  //           </Text>
                  //         </View>
                  //       </View>
                  //     )}
                  //   </View>
                  // }
                />

                {/* {this.state.dataMarketData.resultsRealtime.length > 0 && (
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      backgroundColor: this.state.statusOpen
                        ? '#42a300'
                        : '#717171',
                      position: 'absolute',
                      top: '50%',
                      right: 15,
                      borderRadius: 20,
                    }}
                  />
                )} */}
              </View>
              {/* <View
                style={{
                  backgroundColor: '#979797',
                  height: 2,
                  width: '90%',
                  marginVertical: 10,
                  opacity: 0.3,
                  alignSelf: 'center',
                }}
              /> */}

              {/* {this.state.dataMarketData.results != undefined && (
                <View style={{width: '90%'}}>
                  {this.state.dataMarketData.results.length > 0 && (
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#40536d',
                        marginTop: 5,
                        textAlign: 'left',
                        alignSelf: 'center',
                        width: '90%',
                      }}>
                      {I18n.t('translate_Before')}
                    </Text>
                  )}
                </View>
              )} */}
            </View>
          )}

          <View
            style={{
              borderWidth: 1,

              flexDirection: 'row',
              borderColor: '#3986ee',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                height: 42,
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#3986ee',
              }}
              onPress={() => {
                this.chageTabmenu(0);
              }}>
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
                  {'สนทนาอยู่'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.7,
                height: 42,
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#3986ee',
              }}
              onPress={() => {
                this.chageTabmenu(1);
              }}>
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
                  {I18n.t('translate_ConversationHistory')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.7,
                height: 42,
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#3986ee',
              }}
              onPress={() => {
                this.chageTabmenu(2);
              }}>
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
                  {'เก็บการสนทนา'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flexDirection: 'row',
              width: '90%',
            }}>
            {/* <Text style={{fontSize: 25, color: '#20416e'}}>
              {I18n.t('translate_ConversationHistory')}
            </Text> */}
          </View>

          {this.state.heightTab === 0 && (
            <View style={{width: '100%'}}>
              {this.state.dataMarketData.length == undefined && (
                <View style={{width: '100%'}}>
                  {/* เช็คกำลังสนทนาอยู่ */}

                  {this.state.dataMarketData.resultsRealtime.length > 0 ? (
                    <ListItem
                      leftAvatar={
                        <View style={{}}>
                          <Image
                            style={{width: 40, height: 40}}
                            source={{
                              uri:
                                'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                            }}
                          />
                        </View>
                      }
                      style={[Styles.listDataItem, Styles.listDataView]}
                      disabled={
                        !this.state.dataMarketData.resultsRealtime.length > 0
                      }
                      onPress={async () => {
                        if (
                          this.state.dataMarketData.resultsRealtime.length > 0
                        ) {
                          this.props.navigation.navigate('ChatScreen');
                          this._UpdateCountChat();
                          // console.log('Chat');
                        } else {
                          this._UpdateCountChat();
                          Alert.alert(
                            I18n.t('translate_Message_AddYourRequest'),
                            '',
                            [
                              {
                                text: I18n.t('translate_Cancel'),
                                onPress: () => {
                                  console.log('OK Pressed');
                                },
                              },
                              {
                                text: I18n.t('translate_Accept'),
                                onPress: () =>
                                  this.props.navigation.navigate('ChatScreen'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: false},
                          );
                        }
                      }}
                      containerStyle={{
                        height: 80,
                        backgroundColor:
                          this.state.dataMarketData.resultsRealtime.length > 0
                            ? '#fff'
                            : 'transparent',
                      }}
                      title={
                        <View>
                          {this.state.dataMarketData.resultsRealtime.length >
                            0 && (
                            <View style={{}}>
                              <Text numberOfLines={2} style={Styles.titleStyle}>
                                {
                                  this.state.dataMarketData.resultsRealtime[0]
                                    .messages
                                }
                              </Text>
                            </View>
                          )}
                          <View style={{}}>
                            <Text
                              style={[Styles.titleStyle, {color: '#42a300'}]}>
                              {I18n.t('translate_waitChat')}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: 14,
                              height: 14,
                              backgroundColor: this.state.statusOpen
                                ? '#42a300'
                                : '#717171',
                              position: 'absolute',
                              top: '20%',
                              right: 15,
                              borderRadius: 20,
                            }}
                          />
                        </View>
                      }
                    />
                  ) : (
                    <View
                      style={{
                        marginTop: 45,
                        alignSelf: 'center',
                      }}>
                      <View style={{alignSelf: 'center'}}>
                        <Image
                          style={{width: 35, height: 30}}
                          source={require('../../image/MessNo.png')}
                        />
                      </View>
                      <View style={{}}>
                        <Text style={{color: '#7d7d7d', fontSize: 18}}>
                          {'ไม่มีการสนทนา'}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          {this.state.heightTab === 1 && (
            <>
              {this.state.dataMarketData.res_code === '00' && (
                <View style={{width: '100%', flex: 1}}>
                  <ScrollView
                    scrollEnabled={
                      this.state.datachat.length > 0 ? true : false
                    }>
                    {this.state.datachat.length > 0 ? (
                      <FlatList
                        scrollEnabled={false}
                        style={{width: '100%', marginBottom: 10}}
                        keyExtractor={(item, index) => index}
                        data={this.state.dataMarketData.results}
                        // renderItem={this.ListData}
                        renderItem={({item, index}) => (
                          <Swipeable
                            rightButtons={[
                              <TouchableOpacity
                                onPress={async () => {
                                  Alert.alert(
                                    I18n.t('translate_wantDeleteChat'),
                                    '',
                                    [
                                      {
                                        text: I18n.t('translate_Cancel'),
                                        onPress: () => {
                                          currentlyOpenSwipeable.recenter();
                                          this.setState({
                                            xxx: '',
                                          });
                                        },
                                      },
                                      {
                                        text: I18n.t('translate_Accept'),
                                        onPress: async () => {
                                          try {
                                            this.response = await this.props.dispatch(
                                              deleteChatHistory({
                                                chat_token: item.chat_token,
                                              }),
                                            );
                                            if (
                                              this.response.res_code === '00'
                                            ) {
                                              this.state.dataMarketData.results.splice(
                                                index,
                                                1,
                                              );
                                              currentlyOpenSwipeable.recenter();
                                              this.setState({
                                                xxx: '',
                                              });
                                            }
                                          } catch (error) {
                                            console.log(error);
                                          }
                                        },
                                        style: 'cancel',
                                      },
                                    ],
                                    {cancelable: false},
                                  );
                                }}
                                style={[
                                  styles.rightSwipeItem,
                                  {backgroundColor: '#e7e7e7'},
                                ]}>
                                <Image
                                  style={{width: 24, height: 30}}
                                  source={require('../../image/deleteChat.png')}
                                />
                              </TouchableOpacity>,
                            ]}
                            rightButtonWidth={75}
                            onRightButtonsOpenRelease={itemProps.onOpen}
                            onRightButtonsCloseRelease={itemProps.onClose}>
                            <View style={{width: '90%', alignSelf: 'center'}}>
                              <ListItem
                                leftAvatar={{
                                  source: {
                                    uri:
                                      'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                                  },
                                  rounded: false,
                                }}
                                style={[
                                  Styles.listDataItem,
                                  Styles.listDataView,
                                ]}
                                onPress={async () => {
                                  console.log('+++');
                                  this.props.navigation.navigate(
                                    'ChatScreenHistory',
                                    {
                                      chat_token: item.chat_token,
                                    },
                                  );
                                }}
                                containerStyle={Styles.ListSub1}
                                title={
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                      <Text
                                        style={Styles.titleStyle}
                                        numberOfLines={2}>
                                        {item.messages}
                                      </Text>
                                    </View>
                                    <TouchableOpacity style={{}}>
                                      <View>
                                        <Image
                                          style={{width: 23, height: 23,marginTop:20}}
                                          source={require('../../image/starChat.png')}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                }
                                subtitleNumberOfLines={2}
                                subtitle={
                                  <View>
                                    <Text
                                      style={[Styles.TextSub4, Styles.TextSub3]}
                                      numberOfLines={2}>
                                      {I18n.t('translate_EndChat')}{' '}
                                      {item.datetime}
                                    </Text>
                                  </View>
                                }
                              />
                              {/* <View
                            style={{
                              width: 14,
                              height: 14,
                              backgroundColor: '#717171',
                              position: 'absolute',
                              top: '50%',
                              marginTop: -7,
                              right: 15,
                              borderRadius: 20,
                            }}
                          /> */}
                            </View>
                          </Swipeable>
                        )}
                      />
                    ) : (
                      <View style={{marginTop: 40}}>
                        <View
                          style={{
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            // height: '100%',
                            // flexDirection: 'column-reverse',
                            // flex: 1,
                          }}>
                          <Image
                            style={{width: 40, height: 35}}
                            source={require('../../image/chatHistory.png')}
                          />
                          <Text style={{fontSize: 20, color: '#7d7d7d'}}>
                            {I18n.t('translate_History_notFind')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </View>
              )}
            </>
          )}
        </View>
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
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListChatScreen);
