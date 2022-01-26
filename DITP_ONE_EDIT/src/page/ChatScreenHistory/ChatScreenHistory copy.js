import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import SocketIOClient from 'socket.io-client';
import {
  GiftedChat,
  Bubble,
  Time,
  Avatar,
  MessageImage,
} from 'react-native-gifted-chat';
import styles from './Styles';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import { getChat, chatCreate } from '../../actions/data.actions';
import { connect } from 'react-redux';
import CustomView from '../ChatScreen/CustomView';
import I18n from '../../utils/I18n';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      popupRateChat: false,
    };
    this.Score = 0;
  }

  componentDidMount() {
    this.thisF = this;
    this.chatCreate();
  }

  async chatCreate() {
    try {
      this.setState(
        { token_join: this.props.route.params.chat_token },
        async () => {
          this.get_chat();
        },
      );
    } catch (error) { }
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
      console.log('getChat', response);
      if (response.res_code === '00') {
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
          left: { color: '#4d4d4d', fontWeight: 'normal' },
          right: { color: '#4d4d4d', fontWeight: 'normal' },
        }}
      />
    );
  };

  renderAvatar = props => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: { width: 40, height: 40 },
          right: { width: 40, height: 40 },
        }}
      />
    );
  };

  renderCustomView(props) {
    return <CustomView {...props} />;
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

  renderMessageImage = props => {
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
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen2={false}
          Chect={true}
        />

        <View style={Platform.OS === 'android' && { marginTop: 90 }} />
        <View
          style={{
            // position: 'absolute',
            zIndex: -1,
            width: '100%',
            flex: 1,
          }}>
          <Headerstage nameTab={I18n.t('translate_ConsultUs')} />
          <View style={styles.lineChat} />
          <GiftedChat
            ref={c => {
              this.instance = c;
            }}
            scrollToBottom={true}
            style={{ borderWidth: 1 }}
            messages={this.state.messages}
            renderAvatarOnTop={true}
            onSend={this.onSend}
            user={{
              _id: 'MEMBER',
            }}
            parsePatterns={linkStyle => [
              { type: 'phone', style: { color: '#4d4d4d' } },
            ]}
            showAvatarForEveryMessage={true}
            alwaysShowSend={true}
            showUserAvatar={true}
            isTyping={true}
            renderTime={this.renderTime}
            renderMessageImage={this.renderMessageImage}
            imageProps={{ openImageViewer: this.openImageViewer }}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderCustomView}
            renderAvatar={this.renderAvatar}
            renderInputToolbar={props => <View />}
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
