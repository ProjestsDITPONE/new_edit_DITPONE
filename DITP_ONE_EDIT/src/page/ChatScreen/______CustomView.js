import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  View,
  Text,
} from 'react-native';
import styles from './Styles';
import {Overlay, ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomView extends React.Component {
  // export default class CustomView extends React.Component {
  renderPdf() {
    return (
      <TouchableOpacity
        style={[styles2.container, this.props.containerStyle]}
        onPress={() => {
          //   Linking.openURL(
          //     `https://docs.google.com/viewerng/viewer?url=${
          //       this.props.currentMessage.fileuri
          //     }`,
          //   );
          Linking.openURL(this.props.currentMessage.fileuri);
        }}>
        {this.props.currentMessage.file_type === 'pdf' && (
          <Icon
            name="file-pdf-o"
            size={30}
            color={'#3b4254'}
            style={{alignSelf: 'center', marginTop: 10}}
          />
        )}
        {this.props.currentMessage.file_type === 'zip' && (
          <Icon
            name="file-zip-o"
            size={30}
            color={'#3b4254'}
            style={{alignSelf: 'center', marginTop: 10}}
          />
        )}
        {(this.props.currentMessage.file_type === 'doc' ||
          this.props.currentMessage.file_type === 'docx') && (
          <Icon
            name="file-text-o"
            size={30}
            color={'#3b4254'}
            style={{alignSelf: 'center', marginTop: 10}}
          />
        )}
      </TouchableOpacity>
    );
  }

  renderHtml() {
    return (
      <TouchableOpacity
        style={[styles2.container, this.props.containerStyle]}
        onPress={() => {
          Actions.chat_html({properties: this.props.currentMessage});
        }}>
        <Image
          {...this.props.imageProps}
          style={[styles2.image, this.props.imageStyle]}
          source={{uri: this.props.currentMessage.template_image}}
        />
      </TouchableOpacity>
    );
  }

  renderBot = props => {
    return (
      <View style={styles.viewMainBotChat}>
        {this.props.getUser.userDetails.res_result.type === 1 && (
          <Text style={styles.textTitleBotChat}>
            สวัสดีค่ะ{' '}
            {this.props.getUser.userDetails.res_result.sub_member.titleTh +
              this.props.getUser.userDetails.res_result.sub_member.nameTh +
              ' ' +
              this.props.getUser.userDetails.res_result.sub_member
                .lastnameTh}{' '}
            วันนี้อยากให้น้องใส่ใจช่วยอะไรดีคะ?
            น้องใส่ใจสามารถตอบคำถามคุณในเรื่องเหล่านี้ได้
          </Text>
        )}
        {this.props.getUser.userDetails.res_result.type === 2 && (
          <Text style={styles.textTitleBotChat}>
            สวัสดีค่ะ{' '}
            {this.props.getUser.userDetails.res_result.sub_member.titleEn +
              this.props.getUser.userDetails.res_result.sub_member.nameEn +
              ' ' +
              this.props.getUser.userDetails.res_result.sub_member
                .lastnameEn}{' '}
            วันนี้อยากให้น้องใส่ใจช่วยอะไรดีคะ?
            น้องใส่ใจสามารถตอบคำถามคุณในเรื่องเหล่านี้ได้
          </Text>
        )}
        {this.props.getUser.userDetails.res_result.type === 3 && (
          <Text style={styles.textTitleBotChat}>
            สวัสดีค่ะ{' '}
            {this.props.getUser.userDetails.res_result.member.titleTh +
              this.props.getUser.userDetails.res_result.member.nameTh +
              ' ' +
              this.props.getUser.userDetails.res_result.member.lastnameTh}{' '}
            วันนี้อยากให้น้องใส่ใจช่วยอะไรดีคะ?
            น้องใส่ใจสามารถตอบคำถามคุณในเรื่องเหล่านี้ได้
          </Text>
        )}
        {this.props.getUser.userDetails.res_result.type === 4 && (
          <Text style={styles.textTitleBotChat}>
            สวัสดีค่ะ{' '}
            {this.props.getUser.userDetails.res_result.member.titleEn +
              this.props.getUser.userDetails.res_result.member.nameEn +
              ' ' +
              this.props.getUser.userDetails.res_result.member.lastnameEn}{' '}
            วันนี้อยากให้น้องใส่ใจช่วยอะไรดีคะ?
            น้องใส่ใจสามารถตอบคำถามคุณในเรื่องเหล่านี้ได้
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            this.props.onSend('สมัครสมาชิกกรมต้องทำอย่างไร?', 'custom');
          }}>
          <ListItem
            style={styles.listItemBotChat}
            title={
              <Text style={styles.textBotChat}>
                สมัครสมาชิกกรมต้องทำอย่างไร?
              </Text>
            }
            chevron={styles.color246dc4}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.onSend('ยืนยันตัวตนต้องทำอย่างไร?', 'custom');
          }}>
          <ListItem
            style={styles.listItemBotChat}
            title={
              <Text style={styles.textBotChat}>ยืนยันตัวตนต้องทำอย่างไร?</Text>
            }
            chevron={styles.color246dc4}
          />
        </TouchableOpacity>
        <Text style={styles.textBottomBotChat}>
          หรือพิมพ์คำถามในช่องข้อความ
        </Text>
      </View>
    );
  };

  render() {
    if (
      this.props.currentMessage.file_type === 'pdf' ||
      this.props.currentMessage.file_type === 'zip' ||
      this.props.currentMessage.file_type === 'doc' ||
      this.props.currentMessage.file_type === 'docx'
    ) {
      return this.renderPdf();
    } else if (
      this.props.currentMessage.template &&
      this.props.currentMessage.template !== 'none'
    ) {
      return this.renderHtml();
    } else if (
      this.props.currentMessage.text === '' &&
      this.props.currentMessage._id === 'CALLCENTER'
    ) {
      return this.renderBot();
    }
    return null;
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = state => ({
  // getStatus: state.dataReducer.getStatus,
  // getImg: state.authReducer.getImg,
  getUser: state.userReducer.getUser,
  // CountNotification: state.authReducer.getCountNotification,
  // authData: state.authReducer.authData,
  // getNotification: state.authReducer.getNotification,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomView);
const styles2 = StyleSheet.create({
  container: {},
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  webview: {
    flex: 1,
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

CustomView.defaultProps = {
  mapViewStyle: {},
  currentMessage: {
    image: null,
    file_type: null,
    template: null,
    template_html: null,
  },
  containerStyle: {},
  imageStyle: {},
};

CustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  mapViewStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
};
