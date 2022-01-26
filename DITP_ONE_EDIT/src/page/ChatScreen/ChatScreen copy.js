import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  AlertIOS,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Button,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';

import {ViewScale} from '../../config/ViewScale';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, ListItem, Input} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import {
  GiftedChat,
  Bubble,
  Time,
  Avatar,
  MessageImage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import styles from './Styles';
import Headers from '../../components/Headers';
import HeaderAndroid from '../../components/HeadersAndroid';
import Headerstage from '../../components/Headerstage';
import HeaderText from '../../components/HeaderText';
import CustomView from './CustomView';
import {
  getChat,
  chatCreate,
  putRead,
  chatRate,
  endchat,
  createTokenChat,
  chatActiveBot,
  getHistoryChat,
} from '../../actions/data.actions';
import {SendReteChat} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {log} from 'react-native-reanimated';
import {useScrollToTop} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var dayStart = yyyy + '-' + dd + '-' + mm + 'T00:00:00.000Z';
var dayend = yyyy + '-' + dd + '-' + mm + 'T23:59:59.999Z';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckck: false,
      uiddd: this.props.getUser.userDetails.res_result.naturalId,
      dataMess: [],
      datarecipient: [],
      datasender: [],
      // timestamp:null,
      // web_mid:null,
      Disconnect: false,
      Send: 1,
      token_join: '',
      unread: 0,
      list_chat: [],
      token_user: this.props.getUser.userDetails.res_result.token_connect,

      chat: [
        {
          emitter: '',
          receiver: 'nickname',
          message: 'Hola',
          date: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        },
      ],
      message: '',
      messages: [],
      messages2: [],
      popupRateChat: false,
      totalCount: null,
      dataHistoryChat: [],
      numckChat: 5,
    };
    this.Score = 0;
  }

  componentDidMount() {
    this.thisF = this;
    // this.chatCreate();
    this.CreatechatToken();
    // this.props.dispatch({
    //   type: 'Offline',
    // });\
    JSON.stringify(this.props.getUser);
  }

  async OpenWeb(item) {
    console.log(item);

    const deepLink = getDeepLinkAct();
    const url = item;
    console.log('OK', url);

    const headers = {};
    const client_id = {};
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deepLink, {
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
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  GetHistory = async value => {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      var dayStart = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z';
      var dayend = yyyy + '-' + mm + '-' + dd + 'T23:59:59.999Z';

      // alert(dayend)
      // alert(value.accessToken)

      const uid = this.props.getUser.userDetails.res_result.naturalId;
      const payload = {
        accessToken: value.accessToken,
        limit: 100,
        page: 0,
        start: dayStart,
        end: dayend,
        // social_network_ref_id: 'O2df29xA7ujiRnD3Y7zGVZzXWP2cgN0M',
        social_network_ref_id: 'uNPxpBP5afzA4u5NtZxSahtUsKZSX40k',

        uid: uid,
      };

      const response = await this.props.dispatch(getHistoryChat(payload));

      // alert(JSON.stringify(response))

      console.log(
        'getHistoryChat=============>???????chat' +
          JSON.stringify(response.totalCount),
      );
      this.setState({
        totalCount: response.totalCount,
        dataHistoryChat: response.res_result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async CreatechatToken() {
    try {
      const payload = {};
      const response = await this.props.dispatch(createTokenChat(payload));
      console.log(response, 'response--============>New');
      console.log(
        this.props.getUser.userDetails.res_result.naturalId,
        'UIDNew',
      );

      if (response.res_code == '00') {
        // this._chatCreate({AccessToken: response.res_result accessToken});
        // const uid = ;
        const uid = this.props.getUser.userDetails.res_result.naturalId;
        // const uid = '0105537041030';

        this.GetHistory({accessToken: response.res_result});

        const payload1 = {
          accessToken: response.res_result,
          uid: uid,
          type: 'pro',
        };

        console.log('FUCLLLLLL' + JSON.stringify(payload1));

        const response1 = await this.props.dispatch(chatCreate(payload1));
        // alert(JSON.stringify(response1))

        // alert("response1.activateBot"+JSON.stringify(response1.activateBot))

        if (response1.activateBot === true) {
          //  alert('true')

          console.log(response1, 'Reporn=>>>>>New');

          // this.socket = SocketIOClient('ws://uat-mojito-gateway.cg.gy', {
          //   path: '/chat-socket/socket.io',
          //   query: {
          //     token: response1.res_result,
          //   },
          //   transports: ['websocket'],
          //   jsonp: false,¸¸¸
          // });
          //
          //ws://uat-mojito-gateway.cg.gy

          this.socket = SocketIOClient(
            'wss://prod-mojito-gateway.socialenable.co',
            {
              path: '/chat-socket/socket.io',
              query: {
                token: response1.res_result,
              },
              transports: ['websocket'],
              jsonp: false,
            },
          );
        } else {
          // alert(response.res_result);

          const payload3 = {
            accessToken: response.res_result,
            uid: uid,
          };
          const response2 = await this.props.dispatch(chatActiveBot(payload3));

          console.log(JSON.stringify(response2), 'response2Reporn=>>>>>New');

          this.CreatechatToken();
        }

        // this.get_startChat()

        const t = this;

        t.socket.on('connected', async res => {
          console.log('Connect==> New');

          this.setState({Disconnect: true});

          console.log(res);

          const uid = this.props.getUser.userDetails.res_result.naturalId;
          // const uid = '0105537041030';

          await t.socket.emit('join', uid);
        });

        t.socket.on('join', async res => {
          console.log('Join==>OOOOOOO');
          console.log(res);
          this.getstartChat({refId: response1.refId_pro});
          this.setState({refIdState: response1.refId_pro});
        });
      }
      this.onSend = this.onSend.bind(this);
    } catch (error) {
      console.log(error);
    }
  }

  getstartChat = async value => {
    try {
      const uid = this.props.getUser.userDetails.res_result.naturalId;
      // const uid = '0105537041030';
      // alert("HHH"+this.state.dataHistoryChat)

      if (this.state.totalCount === 0) {
        const payload = {
          sender: {
            id: `${uid}`,
            type: 'user',
            avatar: '',
          },
          recipient: {
            id: `${value.refId}`,
          },
          message: {
            web_mid: `${uid}` + new Date().getTime(),
            postback: {
              title: 'เริ่มต้นแชท',
              payload: 'get_started',
            },
          },
          timestamp: new Date().getTime(),
        };
        await this.socket.emit('chat', payload);
      } else {
        let numchat = parseInt(this.state.totalCount);

        // let gg = numchat -1

        for (var i = numchat >= 25 ? 20 : numchat - 1; i >= 0; i--) {
          // alert("kkk"+i)

          if (
            this.state.dataHistoryChat[i].message != null &&
            this.state.dataHistoryChat[i].sender != null &&
            this.state.dataHistoryChat[i].recipient != null &&
            this.state.dataHistoryChat[i].message?.postback?.payload !==
              'get_started'
          ) {
            const dataBack = {
              dataquick_replies:
                this.state.dataHistoryChat[i].message?.quick_replies ===
                undefined
                  ? undefined
                  : this.state.dataHistoryChat[i].message?.quick_replies,
              title_name: this.state.dataHistoryChat[i].message?.postback
                ?.title,
              text1:
                this.state.dataHistoryChat[i].message !== undefined
                  ? this.state.dataHistoryChat[i].message?.text
                  : this.state.dataHistoryChat[i].message?.postback?.title,

              showtextdataquick_replies:
                this.state.dataHistoryChat[i].message !== undefined
                  ? this.state.dataHistoryChat[i].message?.text
                  : this.state.dataHistoryChat[i].message?.postback?.title,

              textdataquick_replies:
                this.state.dataHistoryChat[i].message !== undefined
                  ? this.state.dataHistoryChat[i].message?.attachment ===
                    undefined
                    ? ''
                    : this.state.dataHistoryChat[i].message?.text
                  : this.state.dataHistoryChat[i].message?.postback?.title,
              image:
                this.state.dataHistoryChat[i].message?.attachment !==
                  undefined &&
                this.state.dataHistoryChat[i].message?.attachment?.type ===
                  'image'
                  ? this.state.dataHistoryChat[i].message.attachment.payload.url
                  : this.state.dataHistoryChat[i].message?.type === 'IMAGE'
                  ? this.state.dataHistoryChat[i].message?.url
                  : '',

              imageList:
                this.state.dataHistoryChat[i].message?.attachment !==
                  undefined &&
                this.state.dataHistoryChat[i].message?.attachment?.type ===
                  'template'
                  ? this.state.dataHistoryChat[i].message?.attachment?.payload
                      ?.template_type === 'generic'
                    ? this.state.dataHistoryChat[i].message?.attachment?.payload
                        ?.elements
                    : this.state.dataHistoryChat[i].message?.attachment?.payload
                  : undefined,

              user: {
                _id:
                  this.state.dataHistoryChat[i].sender?.type === undefined
                    ? this.state.dataHistoryChat[i].sender?.id === uid
                      ? 'user'
                      : 'bot'
                    : this.state.dataHistoryChat[i].sender?.type,

                name: 'name',
                avatar:
                  this.state.dataHistoryChat[i].sender?.type === undefined
                    ? this.state.dataHistoryChat[i].sender?.id === uid
                      ? this.props.getImg.img
                      : 'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png'
                    : this.state.dataHistoryChat[i].sender?.type === 'user'
                    ? this.props.getImg.img
                    : 'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png'
                    ,
              },
              iduser: this.state.dataHistoryChat[i].recipient.id,
              _id: 'HomeBot',
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, dataBack),
            }));
          }
        }

        // if ( dataChat?.message?.postback?.title != 'ดูรายละเอียด') {
      }

      this.socket.on('chat', dataChat => {
        console.log(
          'HHHHHHHH============================>',
          dataChat?.message?.postback?.payload,
          JSON.stringify(dataChat),
        );

        if (
          dataChat !== null &&
          dataChat?.message?.postback?.payload !== 'get_started'
        ) {
          // if ( dataChat?.message?.postback?.title != 'ดูรายละเอียด') {
          const dataBack = {
            dataquick_replies:
              dataChat.message.quick_replies === undefined
                ? undefined
                : dataChat.message.quick_replies,
            title_name: dataChat?.message?.postback?.title,
            text1:
              dataChat.message !== undefined
                ? dataChat.message.text
                : dataChat?.message?.postback?.title,

            showtextdataquick_replies:
              dataChat.message !== undefined
                ? dataChat.message.text
                : dataChat?.message?.postback?.title,

            textdataquick_replies:
              dataChat.message !== undefined
                ? dataChat.message.attachment === undefined
                  ? ''
                  : dataChat.message.text
                : dataChat?.message?.postback?.title,

            image:
              dataChat.message.attachment !== undefined &&
              dataChat.message.attachment.type === 'image'
                ? dataChat.message.attachment.payload.url
                : '',
            imageList:
              dataChat.message.attachment !== undefined &&
              dataChat.message.attachment.type === 'template'
                ? dataChat.message.attachment.payload.template_type ===
                  'generic'
                  ? dataChat.message.attachment.payload.elements
                  : dataChat.message.attachment.payload
                : undefined,
            user: {
              _id: dataChat.sender.type,
              name: 'name',
              avatar:
                dataChat.sender.type === 'user'
                  ? this.props.getImg.img
                  : 'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
            },
            iduser: dataChat.recipient.id,
            _id: 'HomeBot',
          };

          this.setState({message: ''});

          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, dataBack),
          }));
        }
      });
    } catch (error) {
      console.log('ERROR' + error);
    }
  };

  async onSend(
    textinputma = '',
    text = '',
    text2 = '',
    text3 = '',
    IDtext = '',
    cktype = '',
    url,
    textinput,
  ) {
    if (text3 === 'user') {
      // alert(url);
      // this.setState({clearhomebot: 'clear'});

      // this.setState({ckdddd:'fuck',ckgetstart:'stop'})
      if (cktype === 'web_url') {
        this.OpenWeb(url);
      } else {
        const payload1 = {
          sender: {
            id: IDtext,
            type: 'user',
            avatar: '',
          },
          recipient: {
            id: `${this.state.refIdState}`,
          },
          message: {
            web_mid: IDtext + new Date().getTime(),
            postback: {
              title: text2,
              payload: text,
            },
          },
          timestamp: new Date().getTime(),
        };

        console.log('รายละเอียดคนกดดูqqq' + JSON.stringify(payload1));

        await this.socket.emit('chat', payload1);
      }
    } else {
      // alert(this.state.refIdState)
      // alert('user')

      const payload = {
        sender: {
          id: `${this.state.uiddd}`,
          type: 'user',
          avatar: '',
        },
        recipient: {
          // GceJq7rsxysT9BeFPL56nyaLmhFDGNaQ
          id: `${this.state.refIdState}`,
        },
        message: {
          web_mid: `${this.state.uiddd}` + new Date().getTime(),
          text: textinputma,
          type: 'text',
        },
        timestamp: new Date().getTime(),
      };

      // alert(JSON.stringify(payload) )

      await this.socket.emit('chat', payload);
    }

    this.instance._messageContainerRef.current.scrollToIndex({
      index: 0,
      viewOffset: 0,
      viewPosition: 1,
    });
  }

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderBubble = props => {
    if (
      props.currentMessage.image === '' &&
      props.currentMessage._id === 'HomeBot' &&
      props.currentMessage.imageList != undefined
    ) {
      return (
        <View style={[styles.viewMainBotChat, {flex: 1}]}>
          {props.currentMessage.image === '' &&
          props.currentMessage.imageList != undefined &&
          props.currentMessage.imageList.buttons === undefined &&
          props.currentMessage.imageList.dataquick_replies === undefined ? (
            <ScrollView
              horizontal={true}
              style={{width: width, backgroundColor: '#FFF', borderRadius: 13}}>
              {props.currentMessage.imageList.map((item, index) => {
                return (
                  <View
                    style={{
                      // borderWidth:1,
                      backgroundColor: '#e7e7e7',

                      width: ViewScale(320),
                      height: ViewScale(300),

                      borderRadius: 8,

                      flex: 1,
                      marginHorizontal: 4,
                      marginTop: 5,
                      marginBottom: 10,
                    }}>
                    <View>
                      <Image
                        resizeMode={'contain'}
                        style={{
                          width: ViewScale(320),
                          height: ViewScale(180),
                          borderRadius: 13,
                          marginHorizontal: 0,
                        }}
                        source={{uri: item.image_url}}
                      />
                      <Text
                        style={{
                          fontSize: ViewScale(20),
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontFamily: 'PSL Kittithada Pro',
                          fontWeight: 'normal',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: ViewScale(19),
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginHorizontal: 20,
                          color: '#4d4d4d',
                          fontFamily: 'PSL Kittithada Pro',
                          fontWeight: 'normal',
                        }}>
                        {item.subtitle}
                      </Text>
                      <View>
                        {item.buttons.map(data => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                props.onSend(
                                  '',
                                  data.payload,
                                  data.title,
                                  'user',
                                  props.currentMessage.iduser,
                                  data.type,
                                  data.url,
                                );
                              }}
                              style={{
                                borderWidth: 1,
                                marginHorizontal: 45,
                                borderRadius: 10,
                                marginBottom: 15,
                                marginTop: 5,
                                height: ViewScale(30),
                                justifyContent: 'center',
                                borderColor: '#FFF',
                                backgroundColor: '#FFF',
                              }}>
                              <Text
                                numberOfLines={2}
                                style={{
                                  fontSize: ViewScale(19),
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  marginHorizontal: 20,
                                  color: '#4d4d4d',
                                  fontFamily: 'PSL Kittithada Pro',
                                  fontWeight: 'normal',
                                }}>
                                {data.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                backgroundColor: '#e7e7e7',
                borderRadius: 8,
                width: width * 0.7,
              }}>
              <Text
                style={{
                  borderRadius: 10,
                  marginBottom: 10,
                  marginTop: 5,
                  height: null,
                  justifyContent: 'center',

                  fontSize: 19,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginHorizontal: 15,
                  color: '#4d4d4d',
                  fontFamily: 'PSL Kittithada Pro',
                  fontWeight: 'normal',
                }}>
                {props.currentMessage.imageList.text}
              </Text>
              <View>
                {props.currentMessage.imageList.buttons.map(data => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.onSend(
                          '',
                          data.payload,
                          data.title,
                          'user',
                          props.currentMessage.iduser,
                          data.type,
                          data.url,
                        );
                      }}
                      style={{
                        borderWidth: 1,
                        marginHorizontal: 45,
                        borderRadius: 10,
                        marginBottom: 10,
                        marginTop: 1,
                        height: ViewScale(30),
                        justifyContent: 'center',
                        borderColor: '#FFF',
                        backgroundColor: '#FFF',
                      }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: ViewScale(19),
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginHorizontal: 20,
                          color: '#4d4d4d',
                          fontFamily: 'PSL Kittithada Pro',
                          fontWeight: 'normal',
                        }}>
                        {data.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {props.currentMessage.dataquick_replies !== undefined ? (
                <View style={{marginHorizontal: 30}}>
                  {props.currentMessage.dataquick_replies.map(data => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => {
                            props.onSend(
                              '',
                              data.payload,
                              data.title,
                              'user',
                              props.currentMessage.iduser,
                              data.type,
                            );
                          }}
                          style={{
                            borderWidth: 1,
                            marginHorizontal: 15,
                            borderRadius: 10,
                            marginBottom: 5,
                            marginTop: 5,
                            height: ViewScale(30),
                            justifyContent: 'center',
                            borderColor: '#1A4797',
                            backgroundColor: '#FFF',
                          }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontSize: ViewScale(19),
                              fontWeight: 'bold',
                              textAlign: 'center',
                              marginHorizontal: 20,
                              color: '#1A4797',
                              fontFamily: 'PSL Kittithada Pro',
                              fontWeight: 'normal',
                            }}>
                            {data.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
        </View>
      );
    } else {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#e7e7e7',

              // backgroundColor: '#fff',
            },
            right: {
              backgroundColor: '#e6eff7',
            },
          }}
          // textStyle={{
          //   left: {color: '#4d4d4d', fontWeight: 'normal'},
          //   right: {color: '#4d4d4d', fontWeight: 'normal'},
          // }}
        />
      );
    }
  };

  renderAvatar = props => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: {width: 40, height: 40},
          right: {width: 40, height: 40},
        }}
      />
    );
  };

  renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#4d4d4d',
          },
          right: {
            color: '#4d4d4d',
          },
        }}
      />
    );
  };

  renderMessageImage = props => {
    return (
      <MessageImage
        {...props}
        // style={[styless.image, { }]}
        imageStyle={{
          resizeMode: 'contain',
          borderRadius: 0.1,
          // height: height * 0.2,
          // width: width * 0.9,
          width: ViewScale(350),
          height: ViewScale(190),
          backgroundColor: '#e7e7e7',
          borderColor: '#e7e7e7',
          // backgroundColor: 'red',
          // borderColor:'red'
        }}
        // imageProps={{defaultSource: require('../../Images/bg_image.jpg')}}
      />
    );
  };

  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        placeholder="ข้อความ ..."
        textInputStyle={{
          // borderWidth: 1,
          fontSize: ViewScale(22),
          fontFamily: 'PSL Kittithada Pro',
          fontWeight: 'normal',
          marginTop: ViewScale(
            Platform.OS === 'android' ? 0 : Platform.isPad ? 15 : 5,
          ),
        }}
        containerStyle={{
          borderTopWidth: ViewScale(1.5),
          borderTopColor: '#e7e7e7',
        }}
      />
    );
  }
  renderSend(props) {
    return (
      <Send
        {...props}
        containerStyle={{
          borderTopColor: '#FFF',
        }}>
        <Icon
          name="send"
          style={{
            top: ViewScale(Platform.isPad ? -5 : -10),
            marginHorizontal: 20,
            fontSize: ViewScale(25),
            color: '#3A97F9',
          }}
        />
      </Send>
    );
  }
  handleSend(newMessage = []) {
    // alert(JSON.stringify(newMessage[0].text));
    // this.setState(GiftedChat.append(this.state.messages, newMessage));
    // this.setState(previousMessages => GiftedChat.append(previousMessages, newMessage))
    // alert(this.state.message)
    // this.setState({message:newMessage[0].text})
    // this.onSend('', '', '', '', '', '', );
  }

  render() {
    // console.log('datasender'+this.state.datasender)

    return (
      <View style={[styles.chatWrap, {flex: 1}]}>
        {/* แบบประเมิน */}
        {this.state.popupRateChat && (
          <Overlay
            backdropStyle={styles.background2d6c480}
            isVisible
            onBackdropPress={() => {
              this.setState({
                popupRateChat: false,
              });
            }}>
            <View style={styles.viewMainAlert}>
              <View style={styles.alerttitle}>
                <Text style={styles.fontalertitle}>
                  กรุณาประเมินความพึงพอใจ คำปรึกษาที่ท่านได้รับ
                </Text>
              </View>

              <View style={styles.viewImagealert1}>
                <View style={styles.viewAlert2}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Send === 1) {
                        this.setState({
                          Send: null,
                        });
                      } else {
                        this.setState({
                          Send: 1,
                        });
                      }
                    }}>
                    <Image
                      style={styles.sizeImageAlert}
                      source={
                        this.state.Send === 1
                          ? require('../../image/SogoodA.png')
                          : require('../../image/Sogood.png')
                      }
                    />
                  </TouchableOpacity>
                  <Text
                    style={
                      this.state.Send === 1
                        ? styles.colorTextAlert
                        : styles.colorTextAlert2
                    }>
                    ประทับใจ
                  </Text>
                </View>
                <View style={styles.viewAlert2}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Send === 2) {
                        this.setState({
                          Send: null,
                        });
                      } else {
                        this.setState({
                          Send: 2,
                        });
                      }
                    }}>
                    <Image
                      style={styles.sizeImageAlert}
                      source={
                        this.state.Send === 2
                          ? require('../../image/goodA.png')
                          : require('../../image/good.png')
                      }
                    />
                  </TouchableOpacity>
                  <Text
                    style={
                      this.state.Send === 2
                        ? styles.colorTextAlert
                        : styles.colorTextAlert2
                    }>
                    พอใช้
                  </Text>
                </View>
                <View style={styles.viewAlert2}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Send === 3) {
                        this.setState({
                          Send: null,
                        });
                      } else {
                        this.setState({
                          Send: 3,
                        });
                      }
                    }}>
                    <Image
                      style={styles.sizeImageAlert}
                      source={
                        this.state.Send === 3
                          ? require('../../image/BadA.png')
                          : require('../../image/Bad.png')
                      }
                    />
                  </TouchableOpacity>
                  <Text
                    style={
                      this.state.Send === 3
                        ? styles.colorTextAlert
                        : styles.colorTextAlert2
                    }>
                    ควรปรับปรุง
                  </Text>
                </View>
              </View>
              <View style={styles.viewTextCenterAlert}>
                <Text style={styles.textCenterAlert}>
                  ทุกเสียงของท่านเป็นส่วนสำคัญในการพัฒนาการให้บริการ
                  ของกรมส่งเสริมการค้าระหว่างประเทศ
                </Text>
              </View>
              <View style={styles.marginTop20}>
                <TouchableOpacity
                  onPress={() => {
                    this.send();
                    this.send2();
                  }}
                  style={styles.btnAlert}>
                  <Text style={styles.textBTNAlert}>ส่งคำตอบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}

        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen2={false}
          Chect={true}
        />

        <View style={Platform.OS === 'android' && {marginTop: 90}} />
        <View
          style={{
            // position: 'absolute',
            zIndex: -1,
            width: '100%',
            flex: 1,
          }}>
          <HeaderText nameTab="คุยกับน้องใส่ใจ" />
          {/* <View style={[styles.lineChat]} /> */}
          <GiftedChat
            ref={c => {
              this.instance = c;
            }}
            scrollToBottom={true}
            style={{borderWidth: 1, flex: 1}}
            messages={this.state.messages}
            renderAvatarOnTop={true}
            onSend={(
              text1,
              text2,
              text3,
              text4,
              text5,
              text6,
              text7,
              text8,
            ) => {
              if (text1 === '') {
                // alert(text1+text2+text3+text4+text5+text6+text7+text8)
                this.onSend(text1, text2, text3, text4, text5, text6, text7);
              } else {
                // alert(text1[0].text)
                this.onSend(text1[0].text);
              }
            }}
            user={{
              _id: 'user',
            }}
            parsePatterns={linkStyle => [
              {type: 'phone', style: {color: '#4d4d4d'}},
            ]}
            showAvatarForEveryMessage={true}
            alwaysShowSend={true}
            showUserAvatar={true}
            isTyping={true}
            renderTime={this.renderTime}
            renderMessageImage={this.renderMessageImage}
            listViewProps={this.renderListViewChatbutton}
            imageProps={{openImageViewer: this.openImageViewer}}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderCustomView}
            renderAvatar={this.renderAvatar}
            // onSend={this.state.messages != '' ? this.onSend : 'vv'}
            renderChatFooter={() => (
              <View style={styles.viewFootEnd}>
                <TouchableOpacity
                onPress={()=>{
                  // alert('kkkk')
                }}
                
                style={styles.viewEnd}>
                  <Text style={styles.fontEnd}>จบการสนทนา</Text>
                </TouchableOpacity>
              </View>
            )}
            renderSend={this.renderSend}
            renderInputToolbar={this.renderInputToolbar}
          />
        </View>
        {/* <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={20}/> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  getImg: state.authReducer.getImg,
  authData: state.authReducer.authData,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);

const styless = StyleSheet.create({
  container: {},
  image: {
    // width: 150,
    // height: 100,
    width: ViewScale(350),
    borderRadius: 13,
    margin: 3,
    borderWidth:1,
    resizeMode: 'contain',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
})
