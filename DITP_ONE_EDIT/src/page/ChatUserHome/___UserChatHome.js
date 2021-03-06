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
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, ListItem} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import {ViewScale} from '../../config/ViewScale'
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
import {GetDataChatHome} from '../../actions/data.actions';

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
      messages: [
        {
          id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
          system: true,
        },
        {
          id: 1,
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            id: 2,
            name: 'Test User',
          },
        },
      ],
      dataUser: [],
      Ckdeletemessge: false,
      isRead:0
    };
  }

  onClickTab = item => {
    this.setState({heightTab2: item});
  };

  componentDidMount() {
    this._GetDataChatHome();
  }

  _GetDataChatHome = async values => {
    try {
      // alert(this.props.getUser.userDetails.res_result.sub_member.naturalId)

      const {authData} = this.props;

      const payload =
        this.props.getUser.userDetails.res_result.member === undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.sub_member.naturalId;

      const response = await this.props.dispatch(GetDataChatHome(payload));

      // console.log("==============MM",response.res_result)

      this.setState({dataUser: response.res_result[0]});
    } catch (error) {
      console.log(error);
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
    console.log('HHHH=========>fffff', this.state.dataUser);
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
                    style={{width: ViewScale(20), height: ViewScale(20)}}
                    source={require('../../image/Ms.png')}
                  />
                </View>
                <View style={{flex: 0.4}}>
                  <Text
                    style={{
                      fontSize: ViewScale(25),
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
                style={{padding: ViewScale(0)}}
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="left" size={ViewScale(20)} color={'#FFFFFF'} />
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
              placeholder={'???????????????'}
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
                style={{height: ViewScale(42), justifyContent: 'center'}}>
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
                height: ViewScale(42),
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
                style={{height: ViewScale(42), justifyContent: 'center'}}>
                <Text
                  style={
                    this.state.heightTab2 == 1
                      ? Styles.textmeenustory
                      : Styles.textmeenustory2
                  }>
                  {I18n.locale === 'th' ? '?????????????????????' : 'All'}
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
            <SwipeListView
              data={this.state.dataUser}
              renderItem={(data, rowMap) => (
                <TouchableHighlight
                  onPress={() => {
                    this.props.navigation.navigate('UserChatRoom', {
                      Username: data.item.thaitrade_company,
                      ChatRoom: data.item.chat_room,
                      UserId: data.item.ditpone,
                      UserImg: '',
                    });
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: ViewScale(82),
                      borderBottomWidth: 1,
                      borderColor: '#eaeaea',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: ViewScale(82),
                          marginHorizontal: ViewScale(5),
                          justifyContent: 'center',
                          flex: 0.2,
                          padding: ViewScale(5),
                        }}>
                        {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                        <View
                          style={{
                            backgroundColor: '#999999',
                            borderRadius: ViewScale(35),
                            height: ViewScale(50),
                            width: ViewScale(50),
                          }}>
                          <Text
                            style={{
                              fontSize: ViewScale(40),
                              color: '#FFF',
                              textAlign: 'center',
                            }}>
                            {this.CuteName(data.item.thaitrade_company)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          height: ViewScale(82),

                          justifyContent: 'center',

                          flex: 0.7,
                        }}>
                        {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                        <Text style={{fontSize: ViewScale(25), color: '#000000'}}>
                          {' '}
                          {data.item.thaitrade_company}
                        </Text>
                    
                      </View>
                      <View
                        style={{
                          height: ViewScale(82),

                          justifyContent: 'center',
                          flex: 0.4,
                        }}>
                        {/* <Text style={{fontSize: 15,
                            color: '#9b9b9b',

                            textAlign: 'center',}} >{'09:30'}  </Text> */}

                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: ViewScale(15),
                            color: '#9b9b9b',

                            textAlign: 'center',
                          }}>
                          {' '}
                          {'09:30'}
                        </Text>
                        <View
                          style={{
                            height: ViewScale(22),
                          }}
                        />
                        {this.state.ckread === true && (
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <View style={{flex: 0.6}} />
                            <View
                              style={{
                                backgroundColor: 'red',
                                width: ViewScale(9),
                                height: ViewScale(9),
                                borderRadius: ViewScale(20),
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
                <View style={{height: ViewScale(82)}}>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: ViewScale(15),
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
                            bottom: ViewScale(0),
                            justifyContent: 'center',
                            height: ViewScale(75),
                            top: ViewScale(0),
                            backgroundColor: '#568ae0',
                            borderRadius: ViewScale(8),
                            marginHorizontal: ViewScale(5),
                          }}>
                          <Image
                            source={require('../../image/combinedshape2x.png')}
                            style={{width: ViewScale(20), height: ViewScale(20), marginTop: ViewScale(10)}}
                          />

                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: ViewScale(20),
                              marginTop: ViewScale(5),
                            }}>
                            {'???????????????????????????'}
                          </Text>
                        </TouchableOpacity>
                      }>
                      <View
                        style={{
                          padding: ViewScale(10),
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', marginBottom: ViewScale(10)}}>
                          <View style={{marginHorizontal: ViewScale(20)}}>
                            <Image
                              style={{width: ViewScale(20), height: ViewScale(20), marginTop: ViewScale(5)}}
                              source={require('../../image/stopchatx.png')}
                            />
                          </View>
                          <View style={{marginHorizontal: ViewScale(10)}}>
                            <Text style={{fontSize: ViewScale(20), color: '#4a4a4a'}}>
                              ???????????????
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{flexDirection: 'row', marginBottom: ViewScale(10)}}>
                          <View style={{marginHorizontal: ViewScale(20)}}>
                            <Image
                              style={{width: ViewScale(18), height: ViewScale(15), marginTop: 5}}
                              source={require('../../image/messchat.png')}
                            />
                          </View>
                          <View style={{marginHorizontal: ViewScale(10)}}>
                            <Text style={{fontSize: ViewScale(20), color: '#4a4a4a'}}>
                              ??????????????????????????????????????????????????????????????????????????????????????????
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Popover>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({Ckdeletemessge: true});
                      }}
                      style={{
                        flex: 0.3,
                        height: ViewScale(75),
                        alignItems: 'center',
                        bottom: ViewScale(0),
                        justifyContent: 'center',

                        top: ViewScale(0),
                        backgroundColor: '#f86767',
                        borderRadius: ViewScale(8),
                        marginHorizontal: ViewScale(5),
                      }}>
                      <Image
                        source={require('../../image/deletematerial2x.png')}
                        style={{width: ViewScale(15), height: ViewScale(20), marginTop: ViewScale(10)}}
                      />
                      <Text
                        style={{color: '#FFFFFF', fontSize: ViewScale(20), marginTop: ViewScale(5)}}>
                        {'??????'}
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
                          height: ViewScale(82),
                          borderBottomWidth: 1,
                          borderColor: '#eaeaea',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: ViewScale(82),
                              marginHorizontal: ViewScale(5),
                              justifyContent: 'center',
                              flex: 0.2,
                              padding: ViewScale(5),
                            }}>
                            {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                            <Image
                              source={data.item.user.img}
                              style={{
                                width: ViewScale(59),
                                height: ViewScale(58),
                                marginHorizontal: ViewScale(5),
                              }}
                            />
                          </View>
                          <View
                            style={{
                              height: ViewScale(82),

                              justifyContent: 'center',

                              flex: 0.7,
                            }}>
                            {/* <Text style={{}} >{data.ditpone_fullname}  </Text> */}
                            <Text style={{fontSize: ViewScale(25), color: '#000000'}}>
                              {' '}
                              {data.ditpone_fullname}{' '}
                            </Text>
                            {data.item.read === false ? (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(20), color: '#000000'}}>
                                {' '}
                                {data.item.text}{' '}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{fontSize: ViewScale(20), color: '#9b9b9b'}}>
                                {' '}
                                {data.item.text}{' '}
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              height: ViewScale(82),

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
                                height: ViewScale(22),
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
                                    width: ViewScale(9),
                                    height: ViewScale(9),
                                    borderRadius: ViewScale(20),
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
                <View style={{height: ViewScale(82)}}>
                  {data.item.read === false && (
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: ViewScale(15),
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          bottom: ViewScale(0),
                          justifyContent: 'center',
                          top: ViewScale(0),
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
                              bottom: ViewScale(0),
                              justifyContent: 'center',
                              height: ViewScale(75),
                              top: ViewScale(0),
                              backgroundColor: '#568ae0',
                              borderRadius: ViewScale(8),
                              marginHorizontal: ViewScale(5),
                            }}>
                            <Image
                              source={require('../../image/combinedshape2x.png')}
                              style={{width: ViewScale(20), height: ViewScale((20)), marginTop: ViewScale(10)}}
                            />

                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontSize: ViewScale(20),
                                marginTop: ViewScale(5),
                              }}>
                              {'???????????????????????????'}
                            </Text>
                          </TouchableOpacity>
                        }>
                        <View
                          style={{
                            padding: ViewScale(10),
                          }}>
                          <TouchableOpacity
                            style={{flexDirection: 'row', marginBottom: ViewScale(10)}}>
                            <View style={{marginHorizontal: ViewScale(20)}}>
                              <Image
                                style={{width: ViewScale(20), height: ViewScale(20), marginTop: ViewScale(5)}}
                                source={require('../../image/stopchatx.png')}
                              />
                            </View>
                            <View style={{marginHorizontal: ViewScale(10)}}>
                              <Text style={{fontSize: ViewScale(20), color: '#4a4a4a'}}>
                                ???????????????
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{flexDirection: 'row', marginBottom: ViewScale(10)}}>
                            <View style={{marginHorizontal: ViewScale(20)}}>
                              <Image
                                style={{width: ViewScale(18), height: ViewScale(15), marginTop: ViewScale(5)}}
                                source={require('../../image/messchat.png')}
                              />
                            </View>
                            <View style={{marginHorizontal: ViewScale(10)}}>
                              <Text style={{fontSize: ViewScale(20), color: '#4a4a4a'}}>
                                ??????????????????????????????????????????????????????????????????????????????????????????
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                      <TouchableOpacity
                        style={{
                          flex: 0.3,
                          height: ViewScale(75),
                          alignItems: 'center',
                          bottom: ViewScale(0),
                          justifyContent: 'center',

                          top: ViewScale(0),
                          backgroundColor: '#f86767',
                          borderRadius: ViewScale(8),
                          marginHorizontal: ViewScale(5),
                        }}>
                        <Image
                          source={require('../../image/deletematerial2x.png')}
                          style={{width: ViewScale(15), height: ViewScale(20), marginTop: ViewScale(10)}}
                        />
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: ViewScale(20),
                            marginTop: ViewScale(5),
                          }}>
                          {'??????'}
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
                    fontSize: ViewScale(22),
                    fontFamily: 'Kittithada Bold 75',
                    textAlign: 'center',
                    marginBottom: ViewScale(20),
                  }}>
                  {'????????????????????????????????????????????????????????? \n??????????????????????????????????????????????????????????????????????????????????????????????????????'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      height: ViewScale(39),
                      backgroundColor: '#f86767',
                      borderRadius: ViewScale(45),
                      marginHorizontal: ViewScale(5),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#FFF',
                        fontSize: ViewScale(20),
                      }}>
                      {'??????????????????'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      height: ViewScale(39),
                      backgroundColor: '#2d6dc4',
                      borderRadius: ViewScale(25),
                      marginHorizontal: ViewScale(5),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#FFF',
                        fontSize: ViewScale(20),
                      }}>
                      {'??????????????????'}
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
