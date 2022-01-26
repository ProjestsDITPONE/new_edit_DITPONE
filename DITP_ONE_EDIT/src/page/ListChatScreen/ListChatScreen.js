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
  getChatHistoryNew,
  createTokenChat,
  getChatRealtime
} from '../../actions/data.actions';
import {UpdateCountChat, GetChatCount} from '../../actions/auth.actions';
import Styles from './Styles';
import I18n from '../../utils/I18n';
import {ViewScale} from '../../config/ViewScale';
var date = new Date();


import Moment from 'moment';

class ListChatScreen extends Component {
  constructor() {
    const getDate = new Date();
    super();
    this.state = {
      dataMarketData: [],
      currentlyOpenSwipeable: null,
      datachat: [],
      datachatNew:[],
      statusOpen: false,
      heightTab: 0,
      datarealtime:[]
    };
  }


  _getMarketData = async values => {
    try {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      var dayStart = yyyy + '-' + mm + '-' + dd + '00:00:00';
      var dayend = yyyy + '-' + mm + '-' + dd + '23:59:59';

      // alert(dayend)

      console.log(this.props.getUser.userDetails.res_result.naturalId)
    
          const payload = {};
          const responsetoken = await this.props.dispatch(createTokenChat(payload));
          console.log(responsetoken, 'responsetoken ===> prolist');
          // alert(JSON.stringify(responsetoken))
          // console.log(
          //   this.props.getUser.userDetails.res_result.naturalId,
          //   'UIDNew',
          // );
          if (responsetoken.res_code == '00') {
      this.response2 = await this.props.dispatch(
        getChatHistoryNew({
          
          accessToken:responsetoken.res_result,
          uid: this.props.getUser.userDetails.res_result.naturalId,
          limit:1000,
          page:0,
          start: "2021-11-01 00:00:00",
          end: dayend,
          social_network_ref_id:'uNPxpBP5afzA4u5NtZxSahtUsKZSX40k',
          token_chat:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NDQ3MjU4OC00NzcwLTRjNTMtOGE2NC00ZDExMWVjMDcwMmQiLCJjb21wYW55SWQiOiI2MDJjYzdlNWZmYTk4NzAwMDFmZWNiNmIiLCJjb21wYW55TmFtZSI6IkRJVFAiLCJ1aWQiOiIxNjMwNTAwMTA3MDYxIiwic29jaWFsTmV0d29ya0lkIjoiNjBkMmQ4ZGExZjI1OGQwMDAxZGFiNGFjIiwiaW'
          ,type:'pro'
        }),
      );
      console.log('HHHHHFFFFFFFF1111'+ JSON.stringify(this.response2.results) );
      if (this.response2.res_code === '00') {

        this.response2.results.map(NewData =>{

          console.log("NewData"+NewData)
          this.state.datachatNew.push({
            chat_token : NewData.chat_token.toString(),
            datetime : NewData.datetime.substring(0,10),
            messages :NewData.messages.toString(),
            status :NewData.status.toString(),
            status_basket :NewData.status_basket.toString(),
            user_token :NewData.user_token.toString(),
          })
        })

        let newDirectory =   Object.values(this.state.datachatNew.reduce((acc,item)=>{

          if (!acc[item.datetime]) acc[item.datetime] = {
            chat_token :item.chat_token,
            messages : item.messages,
            datetime : item.datetime,
            status : item.status,
            status_basket : item.status_basket,
            user_token : item.user_token,

        };

          // if(!acc[item.datetime]){
          //   acc[item.datetime]={
          //     mess : item.messages,
          //     data : item.datetime
          //   }
          // }
          return acc;
        },{}))

        console.log("newDirectory"+ JSON.stringify(newDirectory) )


        this.setState({
          dataMarketData: this.response2,
        });
        this.setState({datachat: newDirectory});
      }


      this.responserealtime = await this.props.dispatch(
        getChatRealtime({

          accessToken:responsetoken.res_result,
          uid: this.props.getUser.userDetails.res_result.naturalId,
          limit:1000,
          page:0,
          start: dayStart,
          end: dayend,
          // social_network_ref_id:'O2df29xA7ujiRnD3Y7zGVZzXWP2cgN0M',
          social_network_ref_id:'uNPxpBP5afzA4u5NtZxSahtUsKZSX40k',
          
          token_chat:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NDQ3MjU4OC00NzcwLTRjNTMtOGE2NC00ZDExMWVjMDcwMmQiLCJjb21wYW55SWQiOiI2MDJjYzdlNWZmYTk4NzAwMDFmZWNiNmIiLCJjb21wYW55TmFtZSI6IkRJVFAiLCJ1aWQiOiIxNjMwNTAwMTA3MDYxIiwic29jaWFsTmV0d29ya0lkIjoiNjBkMmQ4ZGExZjI1OGQwMDAxZGFiNGFjIiwiaW',
          type:'pro'
        }),
      );

      console.log('responserealtimeresponserealtime'+ JSON.stringify(this.responserealtime.results) );


    this.setState({
      datarealtime:this.responserealtime.results
    })




    }
    } catch (error) {
      console.log(error);
    }
  };

  _UpdateCountChat = async values => {
    try {
      var tokenMenu = this.props.authData.token;
      console.log('tokenMenu',tokenMenu)
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

  //  var getDate = new Date("YYYY-MMMM-DDDD")
  //  var disablemonth= getDate.getMonth()
  //  var disableday = getDate.getDate()
  //  var disableyear = getDate.getFullYear()
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var dayStart =  yyyy+ '-' + dd + '-' + mm+'T00:00:00.000Z';
var dayend =  yyyy+ '-' + dd + '-' + mm+'T23:59:59.999Z';

  //  alert(dayStart + dayend )

    // alert(disableyear+"-"+disablemonth+"-"+disableday  )
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


    console.log("this.state.datarealtime11"+JSON.stringify(this.state.datarealtime.length))

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
          {/* {this.state.dataMarketData.length == undefined && ( */}
            <View style={{width: '100%'}}>
              <View
                style={{
                  width: ViewScale(400),
                  alignSelf: 'center',
                  height: ViewScale(80),
                  marginBottom: 15,
                }}>
                <ListItem
                  leftAvatar={
                    <View style={{flex: 0.1}}>
                      <Image
                        style={{width:ViewScale(40), height:ViewScale(40)}}
                        source={{
                          uri:
                            'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                        }}
                      />
                    </View>
                  }
                  style={[Styles.listDataItem, Styles.listDataView]}
                  disabled={
                    false
                    // !this.state.dataMarketData.resultsRealtime.length > 0
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
                    <View style={{flexDirection: 'row',height:ViewScale(60), width: ViewScale(350)}}>
                      <View style={{flex: 1, marginHorizontal: 4}}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: '#e3e4e7',
                            borderRadius: 8,
                            justifyContent:'center'
                          }}>
                          <Text
                            style={{
                              color: '#20416e',
                              fontSize:ViewScale(20),
                              marginHorizontal: 9,
                              
                            }}>
                              
                            {'วันนี้อยากให้น้องใส่ใจ\nช่วยอะไรดีคะ?'}
                           
                          </Text>
                        </View>
                      </View>
                      {/* {this.state.statusOpen ? ( */}
                        <View style={{flex: 1, marginHorizontal: 4,justifyContent:'center'}}>
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
                             justifyContent:'center',
                              height: ViewScale(60)
                            }}>
                            <View
                              style={{
                                flex: 0.5,

                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                style={{height:ViewScale(28), width:ViewScale(30)}}
                                source={require('../../image/MESSN.png')}
                              />
                            </View>
                            <View style={{flex: 1,}}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize:ViewScale(22),
                                  marginHorizontal: 9,
                                  marginTop:12
                               
                                }}>
                                {'เริ่มสนทนา  '}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                  
                    </View>
                  }

                />

              
              </View>
          

            </View>
          {/* )} */}

          <View
            style={{
              borderWidth: 1,

              flexDirection: 'row',
              borderColor: '#5dbde6',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                height:ViewScale(45),
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#5dbde6',
              }}
              onPress={() => {
                this.chageTabmenu(0);
              }}>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0.8, y: 0}}
                colors={
                  this.state.heightTab == 0
                    ? ['#5dbde6', '#1d61bd']
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={{height:ViewScale(45), justifyContent: 'center'}}>
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
                height:ViewScale(45),
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#5dbde6',
              }}
              onPress={() => {
                this.chageTabmenu(1);
              }}>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0.8, y: 0}}
                colors={
                  this.state.heightTab == 1
                    ? ['#5dbde6', '#1d61bd']
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={{height:ViewScale(45), justifyContent: 'center'}}>
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
                height:ViewScale(45),
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#5dbde6',
              }}
              onPress={() => {
                this.chageTabmenu(2);
              }}>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0.8, y: 0}}
                colors={
                  this.state.heightTab == 2
                    ? ['#5dbde6', '#1d61bd']
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={{ height:ViewScale(45), justifyContent: 'center'}}>
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
              {this.state.datarealtime.length != 0 ? (
                <View style={{width: '100%'}}>
                  {/* เช็คกำลังสนทนาอยู่ */}

                  {this.state.datarealtime.length > 0 ? (
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
                        !this.state.datarealtime.length > 0
                      }
                      onPress={async () => {
                        if (
                          this.state.datarealtime.length > 0
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
                        height: ViewScale(80),
                        backgroundColor:
                          this.state.datarealtime.length >= 0
                            ? '#fff'
                            : 'transparent',
                      }}
                      title={
                        <View>
                          {this.state.datarealtime.length >=
                            0 && (
                            <View style={{}}>
                              <Text numberOfLines={2} style={Styles.titleStyle}>
                                {
                                  this.state.datarealtime[0]
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
                              width: ViewScale(14),
                              height: ViewScale(14),
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
                          style={{width:ViewScale(35), height:ViewScale(30)}}
                          source={require('../../image/MessNo.png')}
                        />
                      </View>
                      <View style={{}}>
                        <Text style={{color: '#7d7d7d', fontSize: ViewScale(18)}}>
                          {'ไม่มีการสนทนา'}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              ):(
                <View
                      style={{
                        marginTop: 45,
                        alignSelf: 'center',
                      }}>
                      <View style={{alignSelf: 'center'}}>
                        <Image
                          style={{width:ViewScale(35), height:ViewScale(30)}}
                          source={require('../../image/MessNo.png')}
                        />
                      </View>
                      <View style={{}}>
                        <Text style={{color: '#7d7d7d', fontSize: ViewScale(18)}}>
                          {'ไม่มีการสนทนา'}
                        </Text>
                      </View>
                    </View>

              )}
            </View>
          )}

          {this.state.heightTab === 1 && (
            <>
              {this.state.datachat.length != 0 ? (
                <View style={{width: '100%', flex: 1}}>
                  {/* <ScrollView
                     style
                    scrollEnabled={
                       false
                    }> */}
                    {this.state.datachat !=  undefined ? (
                      <FlatList
                        scrollEnabled={true}
                        style={{width: '100%',  }}
                        keyExtractor={(item, index) => index}

                        
                        data={this.state.datachat}
                        // renderItem={this.ListData}
                        renderItem={({item, index}) => (

                        // alert(JSON.stringify(item)),
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
                                  style={{width:ViewScale(24), height:ViewScale(30)}}
                                  source={require('../../image/deleteChat.png')}
                                />
                              </TouchableOpacity>,
                            ]}
                            rightButtonWidth={75}
                            onRightButtonsOpenRelease={itemProps.onOpen}
                            onRightButtonsCloseRelease={itemProps.onClose}>
                            <View style={{width: '90%', alignSelf: 'center',borderBottomRightRadius:23}}>
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
                                  // this.props.navigation.navigate(
                                  //   'ChatScreenHistory',
                                  //   {
                                  //     chat_token: item.chat_token,
                                  //     datatime:item.datetime

                                  //   },
                                  // );
                                }}
                                containerStyle={Styles.ListSub1}
                                title={
                                  <View style={{flexDirection: 'row',}}>
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
                                          style={{width: ViewScale(23), height: ViewScale(23),marginTop:20}}
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
                  {/* </ScrollView> */}
                </View>
              ):(
                // <View>
                //   <Text>{'jkkkkk'}</Text>
                // </View>
                <ActivityIndicator color="black" style={{margin: 15}} />
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
