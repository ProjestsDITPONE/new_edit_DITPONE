import Swipeable from 'react-native-swipeable';
import React, { Component } from 'react';
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
import { ListItem } from 'react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import HeaderText from '../../components/HeaderText';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { CountNotification } from '../../actions/auth.actions';
import {
  tbNotification,
  ReadNoti,
  getChatHistory,
  deleteChatHistory,
  getStatusChat,
} from '../../actions/data.actions';
import { UpdateCountChat, GetChatCount } from '../../actions/auth.actions'
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
        this.setState({ datachat: this.state.dataMarketData.results });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _UpdateCountChat = async values => {
    try {

      var tokenMenu = this.props.authData.token;
      const response = await this.props.dispatch(UpdateCountChat({ token: tokenMenu }))

      if (response.res_code === '00') {
        const respones = await this.props.dispatch(
          GetChatCount({
            token: tokenMenu,
          }),
        );
      }
    } catch (error) {

    }
  }

  static CallChatGoble = async values => {
    this._getMarketData(values);
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
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
        this.setState({ statusOpen: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null }),
    };
    const Data = this.state.dataMarketData.results;


    return (
      <View style={{ flex: 1 }}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backHome={false}
        />
        <View style={{ marginTop: Platform.OS === 'android' && 90 }} />
        {/* <Headerstage nameTab={I18n.t('NongSaijai')} /> */}
        <HeaderText nameTab={I18n.t('NongSaijai')} />
        <View style={{ alignItems: 'center', flex: 1, zIndex: -1 }}>
          {this.state.dataMarketData.length == undefined && (
            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 80,
                  marginBottom: 15,
                }}>
                <ListItem
                  leftAvatar={{
                    source: {
                      uri:
                        'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                    },
                    rounded: false,
                    size: 60,
                  }}
                  style={[Styles.listDataItem, Styles.listDataView]}
                  disabled={
                    !this.state.dataMarketData.resultsRealtime.length > 0
                  }
                  onPress={async () => {

                    if (this.state.dataMarketData.resultsRealtime.length > 0) {
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

                              console.log('OK Pressed')
                            },
                          },
                          {
                            text: I18n.t('translate_Accept'),
                            onPress: () =>
                              this.props.navigation.navigate('ChatScreen'),
                            style: 'cancel',
                          },
                        ],
                        { cancelable: false },
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
                    this.state.dataMarketData.resultsRealtime.length > 0 ? (
                      <Text style={Styles.titleStyle}>
                        {this.state.dataMarketData.resultsRealtime[0].messages}
                      </Text>
                    ) : (
                        <View
                          style={{
                            // backgroundColor: 'red',
                            alignSelf: 'center',
                          }}>
                          <Text style={Styles.titleStyle}>
                            {I18n.t('translate_DateSaijai')}
                          </Text>
                        </View>
                      )
                  }
                  subtitleNumberOfLines={2}
                  subtitle={
                    <View>
                      {this.state.statusOpen ? (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                          {this.state.dataMarketData.resultsRealtime.length >
                            0 ? (
                              <View style={{ width: '100%' }}>
                                <Text
                                  style={[
                                    Styles.TextSub4,
                                    Styles.TextSub3,
                                    { color: '#51af12' },
                                  ]}
                                  numberOfLines={2}>
                                  {I18n.t('translate_waitChat')}
                                </Text>
                              </View>
                            ) : (
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
                                          onPress: () =>
                                            console.log('OK Pressed'),
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
                                      { cancelable: false },
                                    );
                                  }
                                }}>
                                <View
                                  style={{

                                    backgroundColor: '#51af12',
                                    alignItems: 'center',
                                    borderRadius: 21,
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                    padding: 3
                                  }}>
                                  <Image
                                    style={{
                                      width: 13,
                                      height: 12,
                                      marginRight: 10,
                                    }}
                                    source={require('../../image/startChat.png')}
                                  />
                                  <Text
                                    style={[
                                      Styles.TextSub4,
                                      Styles.TextSub3,
                                      { color: '#fff' },
                                    ]}
                                    numberOfLines={2}>
                                    {I18n.t('translate_StartChat')}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                        </View>
                      ) : (
                          <View style={{ alignItems: 'center' }}>
                            <View
                              style={{
                                alignItems: 'center',
                                backgroundColor: '#cfcfcf',
                                borderRadius: 21,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                paddingHorizontal: 10,
                                padding: 3
                              }}>
                              <Image
                                style={{ width: 14, height: 15, marginRight: 3 }}
                                source={require('../../image/stopChat.png')}
                              />
                              <Text
                                style={[
                                  Styles.TextSub4,
                                  Styles.TextSub3,
                                  { color: '#fff' },
                                ]}
                                numberOfLines={2}>
                                {/* ขณะนี้อยู่นอกเวลาทำการ */}
                                {I18n.t('translate_Message_Sorry')}
                              </Text>
                            </View>
                          </View>
                        )}
                    </View>
                  }
                />

                
                {this.state.dataMarketData.resultsRealtime.length > 0 && (
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
                )}
              </View>
              <View
                style={{
                  backgroundColor: '#979797',
                  height: 2,
                  width: '90%',
                  marginVertical: 10,
                  opacity: 0.3,
                  alignSelf: 'center',
                }}
              />

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
              flexDirection: 'row',

              width: '90%',
            }}>
            <Text style={{ fontSize: 25, color: '#20416e' }}>
              {I18n.t('translate_ConversationHistory')}
            </Text>
          </View>
          {this.state.dataMarketData.res_code === '00' && (
            <View style={{ width: '100%', flex: 1 }}>
              <ScrollView
                scrollEnabled={this.state.datachat.length > 0 ? true : false}>
                {this.state.datachat.length > 0 ? (
                  <FlatList
                    scrollEnabled={false}
                    style={{ width: '100%', marginBottom: 10 }}
                    keyExtractor={(item, index) => index}
                    data={this.state.dataMarketData.results}
                    // renderItem={this.ListData}
                    renderItem={({ item, index }) => (
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
                                        if (this.response.res_code === '00') {
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
                                { cancelable: false },
                              );
                            }}
                            style={[
                              styles.rightSwipeItem,
                              { backgroundColor: '#e7e7e7' },
                            ]}>
                            <Image
                              style={{ width: 24, height: 30 }}
                              source={require('../../image/deleteChat.png')}
                            />
                          </TouchableOpacity>,
                        ]}
                        rightButtonWidth={75}
                        onRightButtonsOpenRelease={itemProps.onOpen}
                        onRightButtonsCloseRelease={itemProps.onClose}>
                        <View style={{ width: '90%', alignSelf: 'center' }}>
                          <ListItem
                            leftAvatar={{
                              source: {
                                uri:
                                  'http://one.ditp.go.th/dist/img/icon/iconAdminChat.png',
                              },
                              rounded: false,
                            }}
                            style={[Styles.listDataItem, Styles.listDataView]}
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
                              <Text style={Styles.titleStyle} numberOfLines={2}>
                                {item.messages}
                              </Text>
                            }
                            subtitleNumberOfLines={2}
                            subtitle={
                              <View>
                                <Text
                                  style={[Styles.TextSub4, Styles.TextSub3]}
                                  numberOfLines={2}>
                                  {I18n.t('translate_EndChat')} {item.datetime}
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
                    <View style={{ marginTop: 40 }}>
                      <View
                        style={{
                          alignItems: 'center',
                          // backgroundColor: 'red',
                          // height: '100%',
                          // flexDirection: 'column-reverse',
                          // flex: 1,
                        }}>
                        <Image
                          style={{ width: 40, height: 35 }}
                          source={require('../../image/chatHistory.png')}
                        />
                        <Text style={{ fontSize: 20, color: '#7d7d7d' }}>
                          {I18n.t('translate_History_notFind')}
                        </Text>
                      </View>
                    </View>
                  )}
              </ScrollView>
            </View>
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
