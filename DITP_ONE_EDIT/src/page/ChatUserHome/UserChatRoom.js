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
  FlatList,
  KeyboardAvoidingView,
  Linking
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getDeepLinkAct} from '../../config/utilities';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, ListItem} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  GiftedChat,
  Bubble,
  Time,
  Avatar,
  MessageImage,
  InputToolbar,
  Send,
  renderAvatar,
  MessageText
} from 'react-native-gifted-chat';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../utils/I18n';
import Styles from './Styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import Popover from 'react-native-popover-view';
import database from '@react-native-firebase/database';
import UserCustomView from './UsercustomView';

const {width, height} = Dimensions.get('window');

class UserChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopover: false,
      heightTab2: 0,
      listViewData: [20],
      message: '',
      messages: [],
    };
  }

  onClickTab = item => {
    this.setState({heightTab2: item});
  };
  convertData = itemstamp => {
    let date = new Date(itemstamp);

    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      (date.getFullYear() + 543) +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  };

  componentDidMount() {
    const {ChatRoom, UserId, UserImg} = this.props.route.params;

    // alert(ChatRoom)
    this.open_library11 = this.open_library11.bind(this);
    this.open_file11 = this.open_file11.bind(this);
    this.open_camera11 = this.open_camera11.bind(this);

    
    

    var room_key = ChatRoom;

    database()
      .ref('chatroom/' + room_key + '/chat')
      // .orderByChild('time')
      .on('value', snapshot => {
        // this.setState({messages:snapshot.val()})
        //   snapshot.forEach((child,index)=> {
        //     // console.log("GOOFOFFOOFFO"+JSON.stringify(child.val())) // NOW THE CHILDREN PRINT IN ORDER

        //     // alert(child.val().user_id )
        //     this.state.messages.push({

        //       _id:index,
        //       text: child.val().message_type === 'text' ? child.val().message: '',
        //       createdAt: child.val().time,
        //       user: {
        //         _id: child.val().user_id === UserId ? UserId:child.val().user_id,
        //         avatar:
        //         child.val().user_id != UserId
        //             ? 'http://one.ditp.go.th/uploads/member_profile/profile_new.png'
        //             : this.props.getImg.img,
        //       },

        //     })
        // });

        const data = snapshot.val();
        let newArr = Object.keys(data).map((key, index) => {
          let newData = {
            _id: index,
            text: data[key].message_type === 'text' ? data[key].message : '',
            textfile:
              data[key].message_type === 'file' ? data[key].original_name : '',
            filetype:
              data[key].message_type === 'file' ? data[key].path_file : '',
            createdAt: data[key].time,
            image:
              data[key].message_type === 'photo' ? data[key].path_original : '',
              userview:UserId,
            user: {
              _id: data[key].user_id === UserId ? UserId : data[key].user_id,
              avatar:
                data[key].user_id != UserId
                  ? 'http://one.ditp.go.th/uploads/member_profile/profile_new.png'
                  : this.props.getImg.img,
            },
          };
          return newData;
        });

        console.log('DATAJSON' + JSON.stringify(data));

        // sortAscending = () => {
        // const { prices } = this.state;
        const sortAscending = newArr.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        );
        // this.setState({ prices })
        // }

        // sortDescending = () => {
        // const { prices } = this.state;
        const sortDescending = newArr
          .sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
          )
          .reverse();
        // this.setState({ prices })
        // }
        console.log('sortAscending' + JSON.stringify(sortAscending));
        console.log('sortDescending' + JSON.stringify(sortDescending));

        console.log('ARDatadata' + JSON.stringify(data));

        this.setState({messages: sortAscending});
        // console.log('UsernewArrdatasss: ', JSON.stringify(newArr));
      });

    // this.onSendmess = this.onSendmess.bind(this);
  }
  open_library11() {
    var keyRoom = this.props.route.params.ChatRoom;

    try {
      // this.props.dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });

      const {authData} = this.props;
      const token = authData.token;
      const options2 = {
        title: 'Select video',
        mediaType: 'photo',
        path: 'photo',
        quality: 0.4,
      };
      launchImageLibrary(options2, response => {
        if (!response.didCancel) {
          let responses = response.assets[0];

          let path = responses.uri;
          if (Platform.OS === 'ios') {
            path = '~' + path.substring(path.indexOf('/Documents'));
          }
          if (!responses.fileName) {
            responses.fileName = path.split('/').pop();
          }

          RNFetchBlob.fetch(
            'POST',
            'http://one.ditp.go.th/api/popup_creat',
            {
              token: token,
            },
            [
              {
                name: 'data',
                filename: responses.fileName,
                // type: responses.type,
                data: RNFetchBlob.wrap(
                  Platform.OS === 'android'
                    ? responses.uri
                    : responses.uri.replace('file://', ''),
                ),
              },
              // {name: 'token', data: this.state.token_user},
            ],
          ).then(responses2 => {
            // console.log('KKKKKKKKKKKKK');
            // console.log(JSON.stringify(responses2));
            let response = JSON.parse(responses2.data);

            // console.log(
            //   'JJJJJJJ' + JSON.stringify(response.res_result[0]),
            // );
            let postChat = database().ref('/chatroom/' + keyRoom + '/chat');
            postChat
              .push({
                path_original: response.res_result[0],
                path_resize: response.res_result[0],
                message_type: 'photo',
                isRead: false,
                status: 1,
                time: new Date().getTime(),
                time_zone: 'Asia/Bangkok',
                user_id: this.props.route.params.UserId,
              })
              .then(res => {
                console.log(postChat);
              });

            const payload = {
              _id: this.props.route.params.UserId,
              image: response.res_result.linkUrl,
              createdAt: new Date().getTime(),
              user: {
                _id: this.props.route.params.UserId,
                avatar: this.props.getImg.img,
              },
              BBuser: 'UserBB',
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, payload),
            }));
          });
          // setTimeout(() => {
          //   this.props.dispatch({
          //     type: 'DECREMENT',
          //     score: 1,
          //   });
          // }, 1000);
        }
      });
    } catch (error) {}
  }

  async open_file11(){
    try{
      var keyRoom = this.props.route.params.ChatRoom;
      const {authData} = this.props;
      const token = authData.token;
      const source = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
       console.log(
          source.uri,
        //  source.type, // mime type
          source.name,
        //  source.size,
        );
      RNFetchBlob.fetch(
        'POST',
        'http://one.ditp.go.th/api/popup_creat',
        {
          token: token,
        },
        [
          {
            name: 'data',
            filename: source.name,
            // type: responses.type,
            type: source.type,
            data: RNFetchBlob.wrap(
              Platform.OS === 'android'
                ? source.uri
                : source.uri.replace('file://', ''),
            ),
          },
          // {name: 'token', data: this.state.token_user},
        ],
      ).then(responses2 => {
        console.log('KKKKKKKKKKKKK');
        console.log(JSON.stringify(responses2));
        let response = JSON.parse(responses2.data);

        // console.log(
        //   'JJJJJJJ' + JSON.stringify(response.res_result[0]),
        // );
        let postChat = database().ref('/chatroom/' + keyRoom + '/chat');
        postChat
          .push({
            path_file: response.res_result[0],
            size_file: response.res_result[0],
            original_name:source.name,
            
            message_type: 'file',
            isRead: false,
            status: 1,
            time: new Date().getTime(),
            time_zone: 'Asia/Bangkok',
            user_id: this.props.route.params.UserId,
          })
          .then(res => {
            console.log(postChat);
          });

        const payload = {
          _id: this.props.route.params.UserId,
          textfile:source.name,
        filetype: response.res_result[0],
          createdAt: new Date().getTime(),
          user: {
            _id: this.props.route.params.UserId,
            avatar: this.props.getImg.img,
          },
          BBuser: 'UserBB',
        };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, payload),
        }));
      });

    }catch(error){
      console.log(error)

    }
   
  }
  open_camera11() {
    var keyRoom = this.props.route.params.ChatRoom;

    try {
      // this.props.dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });

      const {authData} = this.props;
      const token = authData.token;
      const options2 = {
        title: 'Select video',
        mediaType: 'photo',
        path: 'photo',
        quality: 0.4,
      };
      launchCamera(options2, response => {
        if (!response.didCancel) {
          let responses = response.assets[0];

          let path = responses.uri;
          if (Platform.OS === 'ios') {
            path = '~' + path.substring(path.indexOf('/Documents'));
          }
          if (!responses.fileName) {
            responses.fileName = path.split('/').pop();
          }

          RNFetchBlob.fetch(
            'POST',
            'http://one.ditp.go.th/api/popup_creat',
            {
              token: token,
            },
            [
              {
                name: 'data',
                filename: responses.fileName,
                // type: responses.type,
                data: RNFetchBlob.wrap(
                  Platform.OS === 'android'
                    ? responses.uri
                    : responses.uri.replace('file://', ''),
                ),
              },
              // {name: 'token', data: this.state.token_user},
            ],
          ).then(responses2 => {
            // console.log('KKKKKKKKKKKKK');
            // console.log(JSON.stringify(responses2));
            let response = JSON.parse(responses2.data);

            // console.log(
            //   'JJJJJJJ' + JSON.stringify(response.res_result[0]),
            // );
            let postChat = database().ref('/chatroom/' + keyRoom + '/chat');
            postChat
              .push({
                path_original: response.res_result[0],
                path_resize: response.res_result[0],
                message_type: 'photo',
                isRead: false,
                status: 1,
                time: new Date().getTime(),
                time_zone: 'Asia/Bangkok',
                user_id: this.props.route.params.UserId,
              })
              .then(res => {
                console.log(postChat);
              });

            const payload = {
              _id: this.props.route.params.UserId,
              image: response.res_result.linkUrl,
              createdAt: new Date().getTime(),
              user: {
                _id: this.props.route.params.UserId,
                avatar: this.props.getImg.img,
              },
              BBuser: 'UserBB',
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, payload),
            }));
          });
          // setTimeout(() => {
          //   this.props.dispatch({
          //     type: 'DECREMENT',
          //     score: 1,
          //   });
          // }, 1000);
        }
      });
    } catch (error) {}
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

  onSendmess(newMessage = []) {
    console.log(JSON.stringify(newMessage));

    var keyRoom = this.props.route.params.ChatRoom;

    let postChat = database().ref('/chatroom/' + keyRoom + '/chat');
    postChat
      .push({
        message: newMessage[0].text,
        message_type: 'text',
        isRead: false,
        status: 1,
        time: new Date().getTime(),
        time_zone: 'Asia/Bangkok',
        user_id: this.props.route.params.UserId,
      })
      .then(res => {
        console.log(postChat);
      });

    const payload = {
      _id: this.props.route.params.UserId,
      text: newMessage[0].text,
      createdAt: newMessage[0].createdA,
      user: {
        _id: this.props.route.params.UserId,
        avatar: this.props.getImg.img,
      },
      BBuser: 'UserBB',
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, payload),
    }));

    this.instance._messageContainerRef.current.scrollToIndex({
      index: 0,
      viewOffset: 0,
      viewPosition: 1,
    });
  }

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

  renderMessageText(props) {
    return (
      <MessageText 
      {...props}
      style={{flex: 1, borderWidth:1  }} textStyle={{
        left: {
          color: '#4d4d4d',
        },
        right: {
          color: '#4d4d4d',
        },
      }}
    
      
      
      />
   
  )
}
  renderBubble = props => {
    if (
      props.currentMessage.filetype !== '' &&
      props.currentMessage.image === '' &&
      props.currentMessage.text === ''
      
    ) {
      return (
        <TouchableOpacity 
      
        onPress={()=>{
          this.OpenWeb(props.currentMessage.filetype)
        }}

       
        style={{flexDirection: 'row',
        
        // borderRadius:20,
        marginTop:5,
        marginBottom:1,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:props.currentMessage.userview === props.currentMessage.user._id ? 15:0,
        borderBottomRightRadius:props.currentMessage.userview === props.currentMessage.user._id ? 0:15,
        flexWrap: 'wrap',
        backgroundColor: props.currentMessage.userview === props.currentMessage.user._id ? '#d7e5f3b3':'#e7e7e7'}}>
          <Text
          numberOfLines={2}
            style={{
              borderRadius: 10,
              marginBottom: 10,
              width:width*0.6,
              marginTop: 5,
              height: null,
              justifyContent: 'center',
              fontFamily: 'PSL Kittithada Pro',
              fontWeight: 'normal',
              fontSize: 19,
              textDecorationLine: 'underline',
              // textAlign: props.currentMessage.userview === props.currentMessage.user._id ?'right':'left',
              marginHorizontal: 15,
              color: '#2d6dc4',

            }}>
            {props.currentMessage.textfile} 
          </Text>
         
         
        </TouchableOpacity>
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
          textStyle={{
           
            left: {color: '#4d4d4d', fontWeight: 'normal'},
            right: {color: '#4d4d4d', fontWeight: 'normal'},
          }}
        />
      );
    }
  };

  renderSend(props) {
    return (
      <Send
        {...props}
        containerStyle={{
          borderTopColor: '#FFF',
        }}>
        <Icon2
          name="send"
          style={{
            top: Platform.OS === 'android' ? -10 : -10,
            marginHorizontal: 20,
            fontSize: 22,
            color: '#2d6dc4',
          }}
        />
      </Send>
    );
  }
  renderMessageImage = props => {
    return (
      <MessageImage
        {...props}
        imageStyle={{
          borderRadius: 0,
          height: height * 0.3,
          width: width * 0.7,
          backgroundColor: '#e7e7e7',
          borderColor: '#e7e7e7',
          // backgroundColor: '#FFF',
          // borderColor:'#FFF'
        }}
        // imageProps={{defaultSource: require('../../Images/bg_image.jpg')}}
      />
    );
  };
  renderInputToolbar(props) {
    // alert(this.state.tokens)

    //Add the extra styles via containerStyle
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', flex: 0.1}}>
          <TouchableOpacity
            onPress={() => {
              try {
                const source = DocumentPicker.pick({
                  type: [DocumentPicker.types.allFiles],
                });
                console.log(
                  'HRHRHR',
                  source,
                  source.uri,
                  source.type, // mime type
                  source.name,
                  source.size,
                );
              } catch (error) {}
            }}
            style={{
              marginHorizontal: 5,
              marginLeft: Platform.OS === 'android' ? 10 : 10,
            }}>
            <Image
              style={{width: 11, resizeMode: 'contain'}}
              source={require('../../image/attachfile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 5, marginTop: -11}}>
            <Image
              style={{width: 23, resizeMode: 'contain'}}
              source={require('../../image/cameraimg.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
      
            style={{marginHorizontal: 5}}>
            <Image
              style={{width: 20, resizeMode: 'contain', marginTop: 4}}
              source={require('../../image/photochat1.png')}
            />
          </TouchableOpacity>
        </View>
        <InputToolbar
          {...props}
          placeholder="ข้อความ ..."
          textInputStyle={{
            fontSize: 21,
            fontFamily: 'PSL Kittithada Pro',
            fontWeight: 'normal',
          }}
          containerStyle={{
            borderTopWidth: 1.5,
            borderTopColor: '#e7e7e7',
            borderLeftWidth: 1.5,
            borderLeftColor: '#e7e7e7',
            marginLeft: 90,

            flex: 1,
            borderRadius: 8,
          }}
        />
      </View>
    );
  }

  renderCustomView(props) {
    return <UserCustomView {...props} />;
  }
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

  render() {
    console.log('DddSSSSFFFFF' + JSON.stringify(this.state.messages));
    const {Username, UserId, UserImg, tokens} = this.props.route.params;
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#5dbde6', '#1d61bd']}>
          <Header
            centerComponent={
              <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#FFFFFF',
                      fontFamily: 'Kittithada Bold 75',
                    }}>
                  {Username}
                    
                  </Text>
                </View>
              </View>
            }
            leftComponent={
              <TouchableOpacity
                style={{padding: 0}}
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="left" size={20} color={'#FFFFFF'} />
              </TouchableOpacity>
            }
            rightComponent={
              //   <TouchableOpacity
              //   style={{padding: 0}}
              //  >
              //   <Icon1 name="menu" size={24} color={'#FFFFFF'} />
              // </TouchableOpacity>

              // <View>
              <Popover
                isVisible={this.state.closePopover}
                onRequestClose={() => {
                  this.setState({closePopover: false});
                }}
                //  onOpenStart={{}}
                from={
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({closePopover: true});
                    }}
                    style={{flex: 1, justifyContent: 'center'}}>
                    <Icon1
                      name="menu"
                      size={25}
                      color="#FFF"
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                }>
                <Text>This is the contents of the popover</Text>
              </Popover>
              // </View>
            }
            backgroundColor="transparent"
          />
        </LinearGradient>
        <View style={[Styles.chatWrap, {flex: 1}]}>
          <GiftedChat
            ref={c => {
              this.instance = c;
            }}
            scrollToBottom={false}
            style={{borderWidth: 1, flex: 1}}
            renderAvatarOnTop={true}
            messages={this.state.messages}
            onSend={newMessage => this.onSendmess(newMessage)}
            user={{
              _id: this.props.route.params.UserId,
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
            renderAvatar={this.renderAvatar}
            renderBubble={this.renderBubble}
            renderSend={this.renderSend}
            renderInputToolbar={props => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{flexDirection: 'row', flex: 0.1}}>
                  <TouchableOpacity
                    onPress={this.open_file11}
                    style={{
                      
                      width:20,
                      marginHorizontal: 3,
                      marginLeft: Platform.OS === 'android' ? 12 : 10,
                    }}>
                    <Image
                      style={{width: 11, resizeMode: 'contain'}}
                      source={require('../../image/attachfile.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={this.open_camera11}
                    style={{marginHorizontal: 5, marginTop: -11}}>
                    <Image
                      style={{width: 23, resizeMode: 'contain'}}
                      source={require('../../image/cameraimg.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.open_library11}
                    style={{marginHorizontal: 8}}>
                    <Image
                      style={{width: 20, resizeMode: 'contain', marginTop: 4}}
                      source={require('../../image/photochat1.png')}
                    />
                  </TouchableOpacity>
                </View>
                <InputToolbar
                  {...props}
                  placeholder="ข้อความ ..."
                  textInputStyle={{
                    fontSize: 21,
                    fontFamily: 'PSL Kittithada Pro',
                    fontWeight: 'normal',
                  }}
                  containerStyle={{
                    borderTopWidth: 1.5,
                    borderTopColor: '#e7e7e7',
                    borderLeftWidth: 1.5,
                    borderLeftColor: '#e7e7e7',
                    marginLeft: Platform.OS==='android'? 100:96,

                    flex: 1,
                    borderRadius: 8,
                  }}
                />
              </View>
            )}
            // renderCustomView={this.renderCustomView}
            // renderMessageText={this.renderMessageText}
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
)(UserChatRoom);
