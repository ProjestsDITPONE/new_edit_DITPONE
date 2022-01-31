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
import HeaderText from '../../components/HeaderText';
import CustomView from './CustomView';
import {
  getChat,
  chatCreate,
  putRead,
  chatRate,
  endchat,
  createTokenChat,
} from '../../actions/data.actions';
import {SendReteChat} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      uiddd:this.props.getUser.userDetails.res_result.naturalId,
      dataMess: [],
      datarecipient: [],
      datasender: [],
      // timestamp:null,
      // web_mid:null,
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
    // this.chatCreate();
    this.CreatechatToken();
    this.props.dispatch({
      type: 'Offline',
    });
 
  }

  async CreatechatToken() {
    try {
      const payload = {};
      const response = await this.props.dispatch(createTokenChat(payload));
      console.log(response, 'response--============>');
      if (response.res_code == '00') {
        // this._chatCreate({AccessToken: response.res_result});
        const uid = this.props.getUser.userDetails.res_result.naturalId;
  
        const payload1 = {
          accessToken: response.res_result,
          uid: uid,

        };
        const response1 = await this.props.dispatch(chatCreate(payload1));
          console.log(response1, 'Reporn=>>>>>');
          this.socket = SocketIOClient('ws://uat-mojito-gateway.cg.gy', {
            path: '/chat-socket/socket.io',
            query: {
              token: response1.res_result,
            },
            transports: ['websocket'],
            jsonp: false,
          });

          // this.get_startChat()

          const t = this;
  
          t.socket.on('connected', async res => {
            console.log('Connect==>');
  
            console.log(res);
  
          
            const uid = this.props.getUser.userDetails.res_result.naturalId;
  
            await t.socket.emit('join',uid);
            
          });

          t.socket.on('join', async res =>{
            console.log('Join==>OOOOOOO');
  
            console.log(res);
              
            
          } )

          this.get_startChat()
          this.onSend = this.onSend.bind(this);
          
      }
      // this.onSend = this.onSend.bind(this);
    } catch (error) {

      console.log(error)
    }
  }

  // _chatCreate = async values => {
  //   try {
  //     // this.get_chat()
  //     // const uid = this.props.getUser.userDetails.res_result.naturalId;
  //     // const socialNetWorkID = response.refId;
  //     this.setState({token_join: response.res_result}, async () => {
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async get_startChat (){
    try {
      alert('ok')

      // console.log(this.socket)
      // this.socket.on('join', async res => {
        // console.log(res, 'res=>');

        const uid = this.props.getUser.userDetails.res_result.naturalId;

      //  เปิดมาครั้งแรกก็เช็คเลยครับว่า ข้อความเท่ากับค่าว่างมั้ย  ถ้าก็ให้ไปที่ตัวเลือกครับ

        // if(this.state.message != ''){ 
        const payload = {
          sender: {
            id: uid,
            type: 'user',
            avatar: '',
          },
          recipient: {
            id: `${'GceJq7rsxysT9BeFPL56nyaLmhFDGNaQ'}`,
          },
          message: {
            web_mid: uid + new Date().getTime(),
            postback: {
              title: 'เริ่มต้นแชท',
              payload: 'get_started',
            },
          },
          timestamp: new Date().getTime(),
        };


        await this.socket.emit('chat', payload);

      // }
     
       
       
      // });
       // รับค่ากลับ
      this.socket.on('chat', dataChat => {

        this.setState({datasender:dataChat})
      
        console.log('UUUUUUUUOOOOOOOOOOOOOO');
        console.log(JSON.stringify(dataChat));
  
         if(dataChat !== null && dataChat?.message?.postback?.payload !== 'get_started') { 

        const dataBack = {
          
          text: dataChat.message.text === undefined ? '':dataChat.message.text,
          image: dataChat.message.attachment !== undefined && dataChat.message.attachment.type ==='image'?
          dataChat.message.attachment.payload.url:''
           ,
           imageList:dataChat.message.attachment !== undefined && dataChat.message.attachment.type ==='template' ?
           dataChat.message.attachment.payload.elements: ''
           ,
          user: {
            _id: dataChat.sender.type,
            name: '',
            avatar: 
            'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png' ,
          },
          iduser: dataChat.recipient.id,
          _id: '',
    
        };

        this.setState({message: ''});
       
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, dataBack),
        }));
      }
      });
    
      // this.onSend = this.onSend.bind(this);


    }catch(error){

      console.log(error)

    }


  }

  async get_chat() {
    try {
      const payload =
        'token_user=' +
        this.state.token_user +
        '&token_join=' +
        this.state.token_join;
      // console.log(payload);
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

  async onSend(text = '', text2 = '',text3 = '') {
    if(text != '' && text2 != '' ) { 
      alert(text+":"+text2+text3 )
  
    // const payload1 = {
    //   sender: {
    //     id: text3,
    //     type: 'user',
    //     avatar: '',
    //   },
    //   recipient: {
    //     id: `${'O2df29xA7ujiRnD3Y7zGVZzXWP2cgN0M'}`,
    //   },
    //   message: {
    //     web_mid: text3 + new Date().getTime(),
    //     postback: {
    //       title: text2,
    //       payload: text,
    //     },
    //   },
    //   timestamp: new Date().getTime(),
    // };

    // await this.socket.emit('chat', payload1);

    }else{
      const payload = {
        sender: {
          id: this.state.uiddd,
          type: 'user',
          avatar: '',
        },
        recipient: {
          id: `${'GceJq7rsxysT9BeFPL56nyaLmhFDGNaQ'}`,
        },
        message: {
          web_mid: this.state.uiddd + new Date().getTime(),
          text:this.state.message,
          type:'text'
        },
        timestamp: new Date().getTime(),
      };
  
      await this.socket.emit('chat', payload);

    }

  // const dataBack = {
          
  //     text: '', 
  //     image: '',
  //     imageList:'',
  //     user: {
  //       _id: 'bot',
  //       name: 'user',
  //       avatar: 
  //       'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
  //     },
  //     iduser: '1111111111111',
  //     _id: 'Detail_user',

  //   };
  //   this.setState({message: ''});

  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages,dataBack ),
  //   }));
   

    // alert(text+":"+text2+text3 )
  
    // const payload1 = {
    //   sender: {
    //     id: text3,
    //     type: 'user',
    //     avatar: '',
    //   },
    //   recipient: {
    //     id: `${'O2df29xA7ujiRnD3Y7zGVZzXWP2cgN0M'}`,
    //   },
    //   message: {
    //     web_mid: text3 + new Date().getTime(),
    //     postback: {
    //       title: text2,
    //       payload: text,
    //     },
    //   },
    //   timestamp: new Date().getTime(),
    // };

    // await this.socket.emit('chat', payload1);


  //  this.socket.on('chat', textdataChat => {

  //     // this.setState({datasender:dataChat.sender})
    
  //     console.log('ComeBoy!!!');
  //     console.log(JSON.stringify(textdataChat.sender));
    

     
  //  });


    // if (text2 === 'custom') {
    //   const data = {
    //     authenToken: this.state.token_user,
    //     chatroomToken: this.state.token_join,
    //     message: text,
    //     message_uuid: '123456789UUID',
    //   };
    //   this.socket.emit('send', data, function(receipt) {});
    // } else {
    //   if (this.state.message !== '') {
    //     alert('send message');
    //     const data = {
    //       authenToken: this.state.token_user,
    //       chatroomToken: this.state.token_join,
    //       message: this.state.message,
    //       message_uuid: '123456789UUID',
    //     };
    //     this.setState({message: ''});
    //     // this.socket.emit('send', data, function(receipt) {});
    //   }
    // }
    this.instance._messageContainerRef.current.scrollToIndex({
      index: 0,
      viewOffset: 0,
      viewPosition: 1,
    });
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
            I18n.locale === 'th' ? 'ขอบคุณสำหรับการประเมิน' : 'Thank you for the evaluation',
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
        I18n.locale === 'th' ? 'กรุณาประเมินความพึ่งพอใจ' : 'Please rate your satisfaction.', 
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
        // console.log(response, 'oneee');
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
        I18n.locale === 'th' ? 'กรุณาประเมินความพึ่งพอใจ' : 'Please rate your satisfaction.', 
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
            // backgroundColor: '#fff',
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

//   <TouchableOpacity
//   onPress={() => {
//     this.onSend(
//       'e48ca256-31ed-44ae-bf1e-8d04ef7be43c',
//       'ดูรายละเอียด',
//       'user',
//       '0105548157964',
//     );
//   }}>
//   <Text>{'ok'}</Text>
// </TouchableOpacity>

  // renderCustomView(props) {
   

  //   if(props.currentMessage._id === 'HomeBot'){
  //     alert(props.currentMessage._id)

  //   }
    


  //   return (
  //     <View style={styles.viewMainBotChat} >
  //       {
  //         props.currentMessage._id === 'HomeBot' ?(
  //           <View>
  //              {props.currentMessage.imageList !== '' &&(
  //                <View>
  //                {props.currentMessage.imageList.map((item ,index )=> {
  //               return (
  //                 <View
  //                   style={{
  //                     backgroundColor: '#FFF',
  //                     width: 260,
  //                     height: null,

  //                     borderRadius: 8,

  //                     flex: 1,
  //                     marginHorizontal: 4,
  //                     marginTop: 5,
  //                     marginBottom: 10,
  //                   }}>
  //                     {index === 0 && (
  //                       <View> 
  //                   <Image
  //                     resizeMode={'contain'}
  //                     style={{
  //                       width: 260,
  //                       height: 160,
  //                       borderRadius: 13,
  //                       marginHorizontal: 0,
  //                     }}
  //                     source={{uri: item.image_url}}
  //                   />
  //                   <Text
  //                     style={{
  //                       fontSize: 22,
  //                       fontWeight: 'bold',
  //                       textAlign: 'center',
  //                     }}>
  //                     {item.title}
  //                   </Text>
  //                   <Text
  //                     numberOfLines={2}
  //                     style={{
  //                       fontSize: 16,
  //                       fontWeight: 'bold',
  //                       textAlign: 'center',
  //                       marginHorizontal: 20,
  //                       color: '#4d4d4d',
  //                     }}>
  //                     {item.subtitle}
  //                   </Text>
  //                   <View>
  //                     {item.buttons.map(data => {
  //                       return (
  //                         <TouchableOpacity
  //                           onPress={() => {
  //                             this.onSend(
  //                               data.payload,
  //                               data.title,
  //                               'user',
  //                               props.currentMessage.iduser,
  //                             );
                             
  //                           }}
  //                           style={{
  //                             borderWidth: 1,
  //                             marginHorizontal: 45,
  //                             borderRadius: 10,
  //                             marginBottom: 15,
  //                             marginTop: 5,
  //                             height: 30,
  //                             justifyContent: 'center',
  //                             borderColor: '#e7e7e7',
  //                             backgroundColor: '#e7e7e7',
  //                           }}>
  //                           <Text
  //                             numberOfLines={2}
  //                             style={{
  //                               fontSize: 17,
  //                               fontWeight: 'bold',
  //                               textAlign: 'center',
  //                               marginHorizontal: 20,
  //                               color: '#4d4d4d',
  //                             }}>
  //                             {data.title}
  //                           </Text>
  //                         </TouchableOpacity>
  //                       );
  //                     })}
  //                   </View>
  //                   </View>
  //                     )}
  //                 </View>
  //               );
  //             })}
  //                </View>

  //              )}
           
  //           </View>
           
  //         ):(
  //           <View>
              
  //           </View>
  //         )
  //       }

  //     {/* { props.currentMessage._id === 'gggg' && (
  //           <View>
  //             <Text>{'รายละเอียด'}</Text>
  //           </View>
           
  //         )} */}
  //     </View>
  //   );
  // }

  renderMessageImage = props => {
   

    return (
      <MessageImage
        {...props}
        imageStyle={{
          borderRadius: 0,
          // height: 0,
          // width: 0,
          backgroundColor: '#e7e7e7',
          borderColor:'#e7e7e7'
          // backgroundColor: '#FFF',
          // borderColor:'#FFF'
    
        }}
        // imageProps={{defaultSource: require('../../Images/bg_image.jpg')}}
      />
    );
  };


  render() {
    
    console.log('datasender'+this.state.datasender)

    return (
      <View style={styles.chatWrap}>
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
            marginBottom: 30,
          }}>
          <HeaderText nameTab="คุยกับน้องใส่ใจ" />
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
            listViewProps={
              this.renderListViewChatbutton
            }
            imageProps={{openImageViewer: this.openImageViewer}}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderCustomView}
            renderAvatar={this.renderAvatar}
            renderChatFooter={() => (
              <View style={styles.viewFootEnd}>
                <TouchableOpacity
                 
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
                      <Text style={styles.textBtnInput}>{I18n.locale === 'th' ? 'ส่ง' : 'Send'}</Text>
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
