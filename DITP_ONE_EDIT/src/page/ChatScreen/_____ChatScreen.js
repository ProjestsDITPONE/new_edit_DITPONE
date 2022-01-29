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
  Alert,
  Platform,
  Button,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, ListItem} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import {
  GiftedChat,
  Bubble,
  Time,
  Avatar,
  MessageImage,
} from 'react-native-gifted-chat';
import styles from './Styles';
import Headers from '../../components/Headers';
import HeaderAndroid from '../../components/HeadersAndroid';
import Headerstage from '../../components/Headerstage';
import CustomView from './CustomView';
import {
  getChat,
  chatCreate,
  putRead,
  chatRate,
  endchat,
  chatCreateOld
} from '../../actions/data.actions';
import {SendReteChat} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Send: 1,
      token_join: '',
      unread: 0,
      list_chat: [],
      token_user: this.props.getUser.userDetails.res_result.token_connect,
      // token_user: '3685c3c2-a164-4bb7-b648-a3fb7f456e9a',
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
      popupRateChat: false,
    };
    this.Score = 0;
  }

  componentDidMount() {
    this.thisF = this;
    this.chatCreate();
    this.props.dispatch({
      type: 'Offline',
    });
  }

  async chatCreate() {
    try {
      // console.log(
      //   'getUser---',
      //   this.props.getUser.userDetails.res_result.ssoid,
      // );

      // const payload = 'token_user=' + this.state.token_user;
      const payload = {
        token_user: this.state.token_user,
        sso_id: this.props.getUser.userDetails.res_result.ssoid,
      };
      const response = await this.props.dispatch(chatCreateOld(payload));
      console.log(response, 'xxxxx');
      // if (response.status === false) {
      //   Alert.alert(
      //     'ขออภัย',
      //     'ขณะนี้อยู่นอกเวลาทำการกรุณาเข้ามาใช้บริการได้\nเวลา 08:30-17:30น.(ยกเว้นวันหยุดราชการ)ขอบคุณค่ะ',
      //     [{text: 'ตกลง', onPress: () => this.props.navigation.goBack()}],
      //     {cancelable: false},
      //   );
      // }
      this.setState({token_join: response.res_result}, async () => {
        if (response.res_code !== '') {
          this.setState({
            unread: 0,
          });
          this.get_chat();
          
          const options = {
            query: {
              authenToken: this.state.token_user,
              chatroomToken: this.state.token_join,
            },
            transports: ['websocket'],
            jsonp: false,
          };

          this.socket = SocketIOClient(response.res_url_ditptouch, options);


          const t = this;
          /////////////////////
          this.socket.on('connect', function() {
            console.log('connect');

            const data_read = {
              authenToken: t.state.token_user,
              chatroomToken: t.state.token_join,
            };
            t.socket.emit('read', data_read, function(receipt) {
              console.log('read');
              this.setState({
                unread: 1,
              });
              console.log(receipt);
            });
            ///////////////
            t.socket.on('message', function(data) {
              // setTimeout(() => {
              //   t.chat_read();
              // }, 1000);
              const timestamp = data[0].timestamp,
                date = new Date(timestamp * 1000),
                datevalues = [
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate(),
                  date.getHours(),
                  date.getMinutes(),
                  date.getSeconds(),
                ];
              let time;
              if (datevalues[4] < 10) {
                time = '0' + datevalues[4];
              } else {
                time = datevalues[4];
              }
              data[0].timestamp = datevalues[3] + ':' + time;
              let imageProfile = '';
              if (data[0].sender_type === 'CALLCENTER') {
                imageProfile =
                  'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png';
              } else {
                imageProfile = t.props.getImg.img;
              }
              let textname = data[0].message;
              if (data[0].attach_ext != null) {
                textname = '';
              }
              const dataBack = {
                text: textname,
                file_type: data[0].attach_ext,
                fileuri: data[0].attach_url,
                user: {
                  _id: data[0].sender_type,
                  name: data[0].sender_name,
                  avatar: imageProfile,
                },
                image: data[0].thumb_url,
                createdAt: data[0].datetime.iso8601,
                _id: data[0].id,
              };
              t.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, dataBack),
              }));
            });
            t.socket.on('upload', function(data) {
              console.log('upload');
              const timestamp = data[0].timestamp,
                date = new Date(timestamp * 1000),
                datevalues = [
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate(),
                  date.getHours(),
                  date.getMinutes(),
                  date.getSeconds(),
                ];
              let time;
              if (datevalues[4] < 10) {
                time = '0' + datevalues[4];
              } else {
                time = datevalues[4];
              }
              data[0].timestamp = datevalues[3] + ':' + time;
              let imageProfile = '';
              if (data[0].sender_type === 'CALLCENTER') {
                imageProfile =
                  'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png';
              } else {
                imageProfile = t.props.getImg.img;
              }
              let textname = data[0].message;
              if (data[0].attach_ext != null) {
                textname = '';
              }
              const dataBack = {
                text: textname,
                file_type: data[0].attach_ext,
                fileuri: data[0].attach_url,
                user: {
                  _id: data[0].sender_type,
                  name: data[0].sender_name,
                  avatar: imageProfile,
                },
                image: data[0].thumb_url,
                createdAt: data[0].datetime.iso8601,
                _id: data[0].id,
              };
              t.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, dataBack),
              }));
            });
          });
          ////////////////

          this.onSend = this.onSend.bind(this);
          this.open_image = this.open_image.bind(this);
          this.open_file = this.open_file.bind(this);
          this.open_camera = this.open_camera.bind(this);
          this.open_library = this.open_library.bind(this);
        }
      });
    } catch (error) {}
  }

  async get_chat() {
    try {
      const payload =
        'token_user=' +
        this.state.token_user +
        '&token_join=' +
        this.state.token_join;
      console.log(payload);
      const response = await this.props.dispatch(
        getChat({
          token_user: this.state.token_user,
          token_join: this.state.token_join,
        }),
      );
      if (response.res_code === '00') {
        const dataBack = {
          text: '',
          user: {
            _id: 1,
            name: 'CALLCENTER',
            avatar: 'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
          },
          _id: 'CALLCENTER',
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, dataBack),
        }));

        await response.res_result.messages.map(async userData => {
          let imageProfile = '';
          if (userData.sender_type === 'CALLCENTER') {
            imageProfile =
              'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png';
          } else {
            imageProfile = this.props.getImg.img;
          }
          let textname = userData.message;
          if (userData.attach_size != null) {
            textname = '';
          }

          const dataBack = {
            text: textname,
            file_type: userData.attach_ext,
            fileuri: userData.attach_url,
            user: {
              _id: userData.sender_type,
              name: userData.sender_name,
              avatar: imageProfile,
            },
            image: userData.thumb_url,
            createdAt: userData.datetime.iso8601,
            _id: userData.id,
          };
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, dataBack),
          }));
        });
        this.setState({
          unread: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async chat_read() {
    try {
      const payload =
        'token_user=' +
        this.state.token_user +
        '&token_join=' +
        this.state.token_join;
      const response = await this.props.dispatch(putRead(payload));
      if (response.res_code === '00') {
        this.setState({
          unread: 1,
        });
        console.log('put_read ok');
      }
    } catch (error) {}
  }

  async onSend(text = '', text2 = '') {

   
    if (text2 === 'custom') {
      const data = {
        authenToken: this.state.token_user,
        chatroomToken: this.state.token_join,
        message: text,
        message_uuid: '123456789UUID',
      };
      this.socket.emit('send', data, function(receipt) {});
    } else {
      if (this.state.message !== '') {
        console.log('send message');
        const data = {
          authenToken: this.state.token_user,
          chatroomToken: this.state.token_join,
          message: this.state.message,
          message_uuid: '123456789UUID',
        };
        this.setState({message: ''});
        this.socket.emit('send', data, function(receipt) {});
      }
    }
    this.instance._messageContainerRef.current.scrollToIndex({
      index: 0,
      viewOffset: 0,
      viewPosition: 1,
    });
  }

  open_camera() {
    this.open_image(1);
  }
  open_library() {
    this.open_image(2);
  }

  async open_image(type) {
    this.props.dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const options = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.5,
    };
    let typeCamera = '';
    if (type === 1) {
      typeCamera = ImagePicker.launchCamera;
    } else {
      typeCamera = ImagePicker.launchImageLibrary;
    }
    typeCamera(options, source => {
      if (!source.didCancel) {
        let path = source.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!source.fileName) {
          source.fileName = path.split('.').pop();
        }
        const dateTime = Math.floor(Date.now() / 1000);

        RNFetchBlob.fetch(
          'POST',
          // 'https://api.ditptouch.rgb72.dev/v1/chat/' +
          'https://api.ditptouch.com/v1/chat/' +
            this.state.token_join +
            '/upload',
          {},
          [
            {
              name: 'fileAttach',
              filename: dateTime + source.fileName,
              type: source.type,
              data: RNFetchBlob.wrap(
                Platform.OS === 'android'
                  ? source.uri
                  : source.uri.replace('file://', ''),
              ),
            },
            {name: 'token', data: this.state.token_user},
          ],
        )
          .then(response2 => {
            let response = JSON.parse(response2.data);
            if (response.status === true) {
              const data_chat = {
                authenToken: this.state.token_user,
                chatroomToken: this.state.token_join,
                data: response,
                message_uuid: '123456789UUID',
              };
              console.log(data_chat);
              this.socket.emit('upload', data_chat, function(receipt) {
                console.log('emit data_chat', receipt);
              });
              const timestamp = response.timestamp,
                // tslint:disable-next-line:prefer-const
                date = new Date(timestamp * 1000),
                datevalues = [
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate(),
                  date.getHours(),
                  date.getMinutes(),
                  date.getSeconds(),
                ];
              response.timestamp = datevalues[3] + ':' + datevalues[4];

              let imageProfile = '';
              if (response.sender_type === 'CALLCENTER') {
                imageProfile =
                  'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png';
              } else {
                imageProfile = this.props.getImg.img;
              }
              let textname = response.message;
              if (response.attach_ext != null) {
                textname = '';
              }
              const dataBack = {
                text: textname,
                file_type: response.attach_ext,
                fileuri: response.attach_url,
                user: {
                  _id: response.sender_type,
                  name: response.sender_name,
                  avatar: imageProfile,
                },
                image: response.thumb_url,
                createdAt: response.datetime.iso8601,
                _id: response.id,
              };
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, dataBack),
              }));
            }
            setTimeout(() => {
              this.props.dispatch({
                type: 'DECREMENT',
                score: 1,
              });
            }, 500);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.props.dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }
    });
  }

  async open_file() {
    // Pick a single file
    try {
      this.props.dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const source = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log(
      //   source.uri,
      //   source.type, // mime type
      //   source.name,
      //   source.size,
      // );
      RNFetchBlob.fetch(
        'POST',
        // 'https://api.ditptouch.rgb72.dev/v1/chat/' +
        'https://api.ditptouch.com/v1/chat/' +
          this.state.token_join +
          '/upload',
        {},
        [
          {
            name: 'fileAttach',
            filename: source.name,
            type: source.type,
            data: RNFetchBlob.wrap(
              Platform.OS === 'android'
                ? source.uri
                : source.uri.replace('file://', ''),
            ),
          },
          {name: 'token', data: this.state.token_user},
        ],
      )
        .then(response2 => {
          let response = JSON.parse(response2.data);
          if (response.status === true) {
            const data_chat = {
              authenToken: this.state.token_user,
              chatroomToken: this.state.token_join,
              data: response,
              message_uuid: '123456789UUID',
            };
            console.log(data_chat);
            this.socket.emit('upload', data_chat, function(receipt) {
              console.log('emit data_chat', receipt);
            });
            const timestamp = response.timestamp,
              // tslint:disable-next-line:prefer-const
              date = new Date(timestamp * 1000),
              datevalues = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
              ];
            response.timestamp = datevalues[3] + ':' + datevalues[4];
            let textname = response.message;
            if (response.attach_size != null) {
              textname = '';
            }
            const dataBack = {
              text: textname,
              file_type: response.attach_ext,
              fileuri: response.attach_url,
              user: {
                _id: response.sender_type,
                name: response.sender_name,
                // avatar: '../../image/iconAdminChat.png',
              },
              image: response.thumb_url,
              createdAt: response.datetime.iso8601,
              _id: response.id,
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, dataBack),
            }));
          }
          setTimeout(() => {
            this.props.dispatch({
              type: 'DECREMENT',
              score: 1,
            });
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        this.props.dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      } else {
        throw err;
      }
    }
  }

  async close_chat() {
    Alert.alert(
      'ยืนยันการจบสนทนา',
      '',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: () => {
            this.setState({
              popupRateChat: true,
            });
          },
        },
      ],
      {cancelable: false},
    );
  }

  async send() {
    if (this.state.Send !== null) {
      try {
        if (this.state.Send === 1) {
          this.Score = '1/5';
        } else if (this.state.Send === 2) {
          this.Score = '3/5';
        } else {
          this.Score = '5/5';
        }
        this.setState({
          popupRateChat: false,
        });
        const payload =
          'token_touch=' +
          this.state.token_user +
          '&token_join=' +
          this.state.token_join +
          '&rate=' +
          this.Score;
        const response = await this.props.dispatch(chatRate(payload));

        if (response.res_code === '00') {
          Alert.alert(
            'ขอบคุณสำหรับการประเมิน',
            '',
            [{text: 'ตกลง', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
        const data = {
          authenToken: this.state.token_user,
          chatroomToken: this.state.token_join,
          data: data,
          message_uuid: '123456789UUID',
        };
        this.props.dispatch(endchat(data));
        this.socket.emit('close', data, function(receipt) {});
        this.props.navigation.navigate('HomeStackScreen');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        'กรุณาประเมินความพึ่งพอใจ',
        '',
        [{text: 'ตกลง', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }
  async send2() {
    if (this.state.Send !== null) {
      try {
        if (this.state.Send === 1) {
          this.Score = '5';
        } else if (this.state.Send === 2) {
          this.Score = '3';
        } else {
          this.Score = '1';
        }

        const payload = this.props.authData.token;

        const response = await this.props.dispatch(
          SendReteChat({results: {point: this.Score}, token: payload}),
        );
        console.log(response, 'oneee');
        if (response.res_code === '00') {
          // Alert.alert(
          //   'ขอบคุณสำหรับการประเมิน',
          //   '',
          //   [{text: 'ตกลง', onPress: () => console.log('OK Pressed')}],
          //   {cancelable: false},
          // );
        }
        const data = {
          authenToken: this.state.token_user,
          chatroomToken: this.state.token_join,
          data: data,
          message_uuid: '123456789UUID',
        };
        this.props.dispatch(endchat(data));
        this.socket.emit('close', data, function(receipt) {});
        this.props.navigation.navigate('HomeStackScreen');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        'กรุณาประเมินความพึ่งพอใจ',
        '',
        [{text: 'ตกลง', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }
  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#e7e7e7',
          },
          right: {
            backgroundColor: '#e6eff7',
          },
        }}
        textStyle={{
          left: {color: '#4d4d4d', fontWeight: 'normal'},
          right: {color: '#4d4d4d', fontWeight: 'normal'},
        }}
      />
    );
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
    // let image = props.currentMessage;
    // let sizeimage,
    //   width,
    //   height = 0;
    // sizeimage = await ImageSize.getSize(image.image);
    // let rate = sizeimage.width / sizeimage.height;
    // if (sizeimage.width >= sizeimage.height) {
    //   width = 200;
    //   height = width / rate;
    // } else {
    //   height = 200;
    //   width = height * rate;
    // }
    // console.log(height, width, '-----');

    return (
      <MessageImage
        {...props}
        imageStyle={{
          borderRadius: 0,
          // height: 0,
          // width: 0,
          backgroundColor: 'black',
        }}
        // imageProps={{defaultSource: require('../../Images/bg_image.jpg')}}
      />
    );
  };

  render() {
    return (
      <View style={styles.chatWrap}>
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
            marginBottom: 30,
          }}>
          <Headerstage nameTab={I18n.t('transalte_have_questions_consult_us')} />
          <View style={styles.lineChat} />
          <GiftedChat
            ref={c => {
              this.instance = c;
            }}
            scrollToBottom={true}
            style={{borderWidth: 1}}
            messages={this.state.messages}
            renderAvatarOnTop={true}
            onSend={this.onSend}
            user={{
              _id: 'MEMBER',
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
            imageProps={{openImageViewer: this.openImageViewer}}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderCustomView}
            renderAvatar={this.renderAvatar}
            renderChatFooter={() => (
              <View style={styles.viewFootEnd}>
                <TouchableOpacity
                  onPress={() => this.close_chat()}
                  style={styles.viewEnd}>
                  <Text style={styles.fontEnd}>จบการสนทนา</Text>
                </TouchableOpacity>
              </View>
            )}
            renderInputToolbar={props => (
              <View>
                <View style={styles.viewMainInput}>
                  <View style={styles.viewLeftInput}>
                    <TouchableOpacity onPress={this.open_file}>
                      <Image
                        style={styles.imageFile}
                        source={require('../../image/IconFileChat.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.open_camera}>
                      <Image
                        style={styles.imagePhoto}
                        source={require('../../image/IconPhotoChat.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.open_library}>
                      <Image
                        style={styles.imagePhoto}
                        source={require('../../image/IconImageChat.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewCenterInput}>
                    <TextInput
                      style={styles.inputChat}
                      placeholder={'ข้อความ...'}
                      returnKeyType={'send'}
                      onChangeText={message => this.setState({message})}
                      value={this.state.message}
                      blurOnSubmit={false}
                      ref={'chatInputRef'}
                    />
                    <TouchableOpacity
                      onPress={this.onSend}
                      style={styles.viewBTNChat}>
                      <Text style={styles.textBtnInput}>ส่ง</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
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
