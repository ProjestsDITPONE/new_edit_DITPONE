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
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Platform,
  Button,
  FlatList,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, ListItem} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  GiftedChat,
  Bubble,
  Time,
  Avatar,
  MessageImage,
  Send,
} from 'react-native-gifted-chat';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../utils/I18n';
import Styles from './Styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import Popover from 'react-native-popover-view';
import {GetDataChatHome, DeleteChatMessges} from '../../actions/data.actions';

// import { initializeApp } from "firebase/app";
import database from '@react-native-firebase/database';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const {width, height} = Dimensions.get('window');

class UserChatHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: this.props.authData.token,
      ckread: true,
      IDcard:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.naturalId,
      heightTab2: 0,
      listViewData: [20],

      dataUser: [],
      dataUserNew: [],
      Ckdeletemessge: false,
      isRead: 0,
    };
  }

  onClickTab = item => {
    this.setState({heightTab2: item});
  };

  componentDidMount() {
    // this._GetDataChatHome();
    Promise.all([this._GetDataChatHome()]);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      // this._GetDataChatHome();
      Promise.all([this._GetDataChatHome()]);
    });
  }

  _GetDataChatHome = async values => {
    try {
      // alert(this.props.getUser.userDetails.res_result.sub_member.naturalId)
      let i = 0;
      const {authData} = this.props;

      let datachat = [];
      let temp_datachat = [];

      const payload =
        this.props.getUser.userDetails.res_result.member === undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.naturalId;

      const response = await this.props.dispatch(GetDataChatHome(payload));

      // console.log("==============MM",response.res_result)

      this.setState({dataUser: response.res_result[0]});

      while (i < this.state.dataUser.length) {
        const key_room = this.state.dataUser[i].chat_room;
        const UserId = this.state.dataUser[i].ditpone;
        const companyname = this.state.dataUser[i].thaitrade_company;
        const blockstatus_room = this.state.dataUser[i].status_room;
        const ditpone_fullname = this.state.dataUser[i].ditpone_fullname;

        

        // console.log(key_room)

        database()
          .ref('chatroom/' + key_room + '/chat')
          // .orderByChild('time')
          .on('value', snapshot => {
            const data = snapshot.val();

            // console.log('datadsdfsdfsdc11New' + i + JSON.stringify(data));

            let newArr = Object.keys(data).map((key, index) => {
              let newData = {
                chat_room: key_room,
                isRead: data[key].isRead,
                _id: index,
                text:
                  data[key].message_type === 'text'
                    ? data[key].message
                    : data[key].message_type === 'file'
                    ? 'ไฟล์เอกสาร'
                    : 'รูปภาพ',

                textfile:
                  data[key].message_type === 'file'
                    ? data[key].original_name
                    : '',
                filetype:
                  data[key].message_type === 'file' ? data[key].path_file : '',
                createdAt: data[key].time,
                image:
                  data[key].message_type === 'photo'
                    ? data[key].path_original
                    : '',
                userview: UserId,
                blockstatus_room: blockstatus_room,
                _Companyname: companyname,
                user: {
                  _id:
                    data[key].user_id === UserId ? UserId : data[key].user_id,
                  avatar:
                    data[key].user_id != UserId
                      ? 'http://one.ditp.go.th/uploads/member_profile/profile_new.png'
                      : this.props.getImg.img,
                },
              };
              return newData;
            });

            // const sortAscending = newArr.sort((a, b) =>
            //   new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
            // );
            const sortDescending = newArr
              .sort((a, b) =>
                new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
              )
              .reverse();

            // console.log(
            //   'sortDescendingnew10000' + JSON.stringify(sortDescending),
            // );

            // if (datachat === undefined) {
            //   console.log('cccc0000'+JSON.stringify(datachat[1].chat));
            // }
            datachat.push({chat: sortDescending});

            this.setState({datachat});
          });

          i++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteMessge = async values => {
    try {
      const ID =
        this.props.getUser.userDetails.res_result.member === undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.naturalId;

      const payload = {
        userID: ID,
        chatroom: this.state.chat_roomkey,
      };

      console.log("FFJJJ"+JSON.stringify(payload))

      const response = await this.props.dispatch(DeleteChatMessges(payload));

      alert(JSON.stringify(response))
    } catch (error) {
    
      console.log(error)

    }
  };

  handleSend(newMessage = []) {
    this.setState(GiftedChat.append(this.state.messages, newMessage));
  }

  MenuMessger = ({item, index}) => {
    return <View style={{backgroundColor: 'red', flex: 1}} />;
  };

  //function

  CuteName = values => {
    var rename = values.substring(0, 1);
    return rename;
  };

  generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  render() {
    // console.log('HHHHcathh', JSON.stringify(this.state.datachat));
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
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../image/Ms.png')}
                  />
                </View>
                <View style={{flex: 0.4}}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#FFFFFF',
                      fontFamily: 'Kittithada Bold 75',
                    }}>
                    {/* {I18n.t('translate_Policy')} */}
                    Live Chat
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
            backgroundColor="transparent"
          />
        </LinearGradient>

        <View style={{flex: 1}}>
          <View style={Styles.Searchcss}>
            <Image
              style={Styles.IconSearchcss}
              source={require('../../image/searchblue.png')}
            />

            <TextInput
              onChangeText={e => {}}
              placeholderTextColor="#999999"
              style={Styles.TextInputSearchcss}
              // placeholder={I18n.t('translate_Seach')}
              placeholder={I18n.locale === 'th' ? 'ค้นหา' : 'Search'}
            />
          </View>
          <View style={Styles.viewtab}>
            <TouchableOpacity
              onPress={() => {
                this.onClickTab(0);
              }}
              style={Styles.tabAll}>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0.8, y: 0}}
                colors={
                  this.state.heightTab2 == 0
                    ? ['#1d61bd', '#5dbde6']
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={{height: 42, justifyContent: 'center'}}>
                <Text
                  style={
                    this.state.heightTab2 == 0
                      ? Styles.textmeenustory
                      : Styles.textmeenustory2
                  }>
                  {I18n.t('transalte_noread')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.onClickTab(1);
              }}
              style={{
                flex: 0.7,
                height: 42,
                justifyContent: 'center',
                borderWidth: 0.8,
                borderColor: '#1d61bd',
              }}>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0.8, y: 0}}
                colors={
                  this.state.heightTab2 == 1
                    ? ['#1d61bd', '#5dbde6']
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={{height: 42, justifyContent: 'center'}}>
                <Text
                  style={
                    this.state.heightTab2 == 1
                      ? Styles.textmeenustory
                      : Styles.textmeenustory2
                  }>
                  {I18n.locale === 'th' ? 'ทั้งหมด' : 'All'}
                </Text>
              </LinearGradient>
              {/* <View
                style={{
                  backgroundColor: 'red',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  position: 'absolute',
                  right: 20,
                  top: -10,
                }}>
                <Text style={{color: '#FFFFFF', fontSize: 14, left: 3}}>
                  {' '}
                  3
                </Text>
              </View> */}
            </TouchableOpacity>
          </View>

          {this.state.heightTab2 === 0 ? (
            <View>
              {this.state.datachat != undefined ? (
                <SwipeListView
                  data={this.state.datachat}
                  renderItem={(data, index) => (
                    // console.log("BBK"+JSON.stringify(data)),
                    <TouchableHighlight
                      onPress={() => {
                        this.props.navigation.navigate('UserChatRoom', {
                          Username: data.item.chat[0]._Companyname,
                          ChatRoom: data.item.chat[0].chat_room,
                          UserId: data.item.chat[0].userview,
                          UserImg: '',
                        });
                      }}>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 82,
                          borderBottomWidth: 1,
                          borderColor: '#eaeaea',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 82,
                              marginHorizontal: 5,
                              justifyContent: 'center',
                              flex: 0.2,
                              padding: 5,
                            }}>
                            <View
                              style={{
                                backgroundColor: '#999999',
                                borderRadius: 35,
                                height: 50,
                                width: 50,
                              }}>
                              <Text
                                style={{
                                  fontSize: 40,
                                  color: '#FFF',
                                  textAlign: 'center',
                                }}>
                                {this.CuteName(data.item.chat[0]._Companyname)}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: 82,

                              justifyContent: 'center',

                              flex: 0.7,
                            }}>
                            <Text style={{fontSize: 25, color: '#000000'}}>
                              {' '}
                              {data.item.chat[0]._Companyname}
                            </Text>
                            {data.item.chat[0].isRead === true ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: 20, color: '#000000'}}>
                                {data.item.chat[0].text}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: 20, color: '#9b9b9b'}}>
                                {data.item.chat[0].text}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              height: 82,

                              justifyContent: 'center',
                              flex: 0.4,
                            }}>
                            {/* <Text style={{fontSize: 15,
                            color: '#9b9b9b',

                            textAlign: 'center',}} >{'09:30'}  </Text> */}

                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 15,
                                color: '#9b9b9b',

                                textAlign: 'center',
                              }}>
                              {' '}
                              {'09:30'}
                            </Text>
                            <View
                              style={{
                                height: 22,
                              }}
                            />
                            {data.item.chat[0].isRead === true && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <View style={{flex: 0.6}} />
                                <View
                                  style={{
                                    backgroundColor: 'red',
                                    width: 9,
                                    height: 9,
                                    borderRadius: 20,
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                  renderHiddenItem={(data, rowMap) => (
                    <View style={{height: 82}}>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingLeft: 15,
                        }}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            bottom: 0,
                            justifyContent: 'center',
                            top: 0,
                          }}>
                          <Text>{''}</Text>
                        </TouchableOpacity>

                        <Popover
                          backgroundStyle={
                            {
                              // backgroundColor: '',
                            }
                          }
                          from={
                            <TouchableOpacity
                              style={{
                                flex: 0.3,
                                alignItems: 'center',
                                bottom: 0,
                                justifyContent: 'center',
                                height: 75,
                                top: 0,
                                backgroundColor: '#568ae0',
                                borderRadius: 8,
                                marginHorizontal: 5,
                              }}>
                              <Image
                                source={require('../../image/combinedshape2x.png')}
                                style={{width: 20, height: 20, marginTop: 10}}
                              />

                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 20,
                                  marginTop: 5,
                                }}>
                                {'เพิ่มเติม'}
                              </Text>
                            </TouchableOpacity>
                          }>
                          <View
                            style={{
                              padding: 10,
                            }}>
                            <TouchableOpacity
                              style={{flexDirection: 'row', marginBottom: 10}}>
                              <View style={{marginHorizontal: 20}}>
                                <Image
                                  style={{width: 20, height: 20, marginTop: 5}}
                                  source={require('../../image/stopchatx.png')}
                                />
                              </View>
                              <View style={{marginHorizontal: 10}}>
                                <Text style={{fontSize: 20, color: '#4a4a4a'}}>
                                {I18n.locale === 'th' ? 'บล็อก' : 'Blog'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{flexDirection: 'row', marginBottom: 10}}>
                              <View style={{marginHorizontal: 20}}>
                                <Image
                                  style={{width: 18, height: 15, marginTop: 5}}
                                  source={require('../../image/messchat.png')}
                                />
                              </View>
                              <View style={{marginHorizontal: 10}}>
                                <Text style={{fontSize: 20, color: '#4a4a4a'}}>
                                  {I18n.t('transalte_Mark_as_unread')}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </Popover>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              Ckdeletemessge: true,
                              chat_roomkey: data.item.chat[0].chat_room,
                            });
                          }}
                          style={{
                            flex: 0.3,
                            height: 75,
                            alignItems: 'center',
                            bottom: 0,
                            justifyContent: 'center',

                            top: 0,
                            backgroundColor: '#f86767',
                            borderRadius: 8,
                            marginHorizontal: 5,
                          }}>
                          <Image
                            source={require('../../image/deletematerial2x.png')}
                            style={{width: 15, height: 20, marginTop: 10}}
                          />
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 20,
                              marginTop: 5,
                            }}>
                            {'ลบ'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  // leftOpenValue={75}
                  rightOpenValue={-170}
                  disableRightSwipe
                />
              ) : (
                // <ActivityIndicator color="black" style={{margin: 15}} />

                <View style={{marginTop: height*0.28}}>
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
            </View>
          ) : (
            <SwipeListView
              data={this.state.dataUser}
              renderItem={(data, rowMap) => (
                <View>
                  {data.item.read === false && (
                    <TouchableHighlight
                      onPress={() => {
                        this.props.navigation.navigate('UserChatRoom', {
                          Username: data.item.thaitrade_company,
                          UserId: '',
                          UserImg: data.item.user.img,
                          tokens: this.state.tokens,
                        });
                      }}>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 82,
                          borderBottomWidth: 1,
                          borderColor: '#eaeaea',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 82,
                              marginHorizontal: 5,
                              justifyContent: 'center',
                              flex: 0.2,
                              padding: 5,
                            }}>
                            {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                            <Image
                              source={data.item.user.img}
                              style={{
                                width: 59,
                                height: 58,
                                marginHorizontal: 5,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              height: 82,

                              justifyContent: 'center',

                              flex: 0.7,
                            }}>
                            {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                            <Text style={{fontSize: 25, color: '#000000'}}>
                              {' '}
                              {data.ditpone_fullname}{' '}
                            </Text>
                            {data.item.read === false ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: 20, color: '#000000'}}>
                                {' '}
                                {data.item.text}{' '}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: 20, color: '#9b9b9b'}}>
                                {' '}
                                {data.item.text}{' '}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              height: 82,

                              justifyContent: 'center',
                              flex: 0.4,
                            }}>
                            {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}

                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 15,
                                color: '#9b9b9b',

                                textAlign: 'center',
                              }}>
                              {' '}
                              {data.item.createdAt}{' '}
                            </Text>
                            <View
                              style={{
                                height: 22,
                              }}
                            />
                            {data.item.read === false && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <View style={{flex: 0.6}} />
                                <View
                                  style={{
                                    backgroundColor: 'red',
                                    width: 9,
                                    height: 9,
                                    borderRadius: 20,
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={{height: 82}}>
                  {data.item.read === false && (
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 15,
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          bottom: 0,
                          justifyContent: 'center',
                          top: 0,
                        }}>
                        <Text>{''}</Text>
                      </TouchableOpacity>

                      <Popover
                        backgroundStyle={
                          {
                            // backgroundColor: '',
                          }
                        }
                        from={
                          <TouchableOpacity
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              bottom: 0,
                              justifyContent: 'center',
                              height: 75,
                              top: 0,
                              backgroundColor: '#568ae0',
                              borderRadius: 8,
                              marginHorizontal: 5,
                            }}>
                            <Image
                              source={require('../../image/combinedshape2x.png')}
                              style={{width: 20, height: 20, marginTop: 10}}
                            />

                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontSize: 20,
                                marginTop: 5,
                              }}>
                              {'เพิ่มเติม'}
                            </Text>
                          </TouchableOpacity>
                        }>
                        <View
                          style={{
                            padding: 10,
                          }}>
                          <TouchableOpacity
                            style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{marginHorizontal: 20}}>
                              <Image
                                style={{width: 20, height: 20, marginTop: 5}}
                                source={require('../../image/stopchatx.png')}
                              />
                            </View>
                            <View style={{marginHorizontal: 10}}>
                              <Text style={{fontSize: 20, color: '#4a4a4a'}}>
                                {I18n.locale === 'th' ? 'บล็อก' : 'Blog'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{marginHorizontal: 20}}>
                              <Image
                                style={{width: 18, height: 15, marginTop: 5}}
                                source={require('../../image/messchat.png')}
                              />
                            </View>
                            <View style={{marginHorizontal: 10}}>
                              <Text style={{fontSize: 20, color: '#4a4a4a'}}>
                                {I18n.t('transalte_Mark_as_unread')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                      <TouchableOpacity
                        style={{
                          flex: 0.3,
                          height: 75,
                          alignItems: 'center',
                          bottom: 0,
                          justifyContent: 'center',

                          top: 0,
                          backgroundColor: '#f86767',
                          borderRadius: 8,
                          marginHorizontal: 5,
                        }}>
                        <Image
                          source={require('../../image/deletematerial2x.png')}
                          style={{width: 15, height: 20, marginTop: 10}}
                        />
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 20,
                            marginTop: 5,
                          }}>
                          {'ลบ'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              // leftOpenValue={75}
              rightOpenValue={-170}
              disableRightSwipe
            />
          )}
        </View>
        {this.state.Ckdeletemessge === true && (
          <View>
            <Overlay
              overlayStyle={{
                width: width * 0.75,
              }}
              onBackdropPress={() => this.setState({Ckdeletemessge: false})}
              backdropStyle={{
                backgroundColor:
                  Platform.OS === 'android' ? '#2d6dc460' : '#2d6dc4',
                opacity: Platform.OS === 'android' ? 0.5 : 0.8,
              }}>
              <View>
                <Text
                  style={{
                    color: '#20416e',
                    fontSize: 22,
                    fontFamily: 'Kittithada Bold 75',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  {'ยืนยันการลบการสนทนา \nจะไม่สามารถดูการสนทนาของท่านได้อีก'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({Ckdeletemessge: false});
                    }}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      height: 39,
                      backgroundColor: '#f86767',
                      borderRadius: 45,
                      marginHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#FFF',
                        fontSize: 20,
                      }}>
                      {'ยกเลิก'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.deleteMessge();
                      this.setState({Ckdeletemessge: false,datachat:[]});
                      this._GetDataChatHome()
                    }}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      height: 39,
                      backgroundColor: '#2d6dc4',
                      borderRadius: 25,
                      marginHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#FFF',
                        fontSize: 20,
                      }}>
                      {'ยืนยัน'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Overlay>
          </View>
        )}
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
)(UserChatHome);
