import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Header, Avatar, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SlideDownPanel from '../lib_edit/react-native-slide-down-panel';
import {logoutUser} from '../actions/auth.actions';
import {connect} from 'react-redux';
import th from '../page/locales/th';
const {width} = Dimensions.get('window');
class HeadersAndroid extends React.Component {
  // export default class Headers extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props.navigation, 'อิอิ1');

    this.state = {
      containerHeight: 70,
      checkslideHeaderRow1: false,
      checkslideHeaderRow2: false,
      fadeAnim: new Animated.Value(1),
      fadeAnimRow1: new Animated.Value(0),
      fadeAnimRow2: new Animated.Value(0),
      backScreen: false,
      Chect: false,
      ArrowColor: false,
    };
  }
  onLogout = () => {
    this.props.dispatch(
      logoutUser({
        device_uuid:
          this.props.getNotification.tokenNotification != undefined
            ? this.props.getNotification.tokenNotification
            : '0',
        token: this.props.authData.token,
      }),
    );
  };
  getContainerHeight(containerHeight) {
    if (containerHeight === 317) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 200,
      }).start();
      Animated.timing(this.state.fadeAnimRow1, {
        toValue: 1,
        duration: 500,
      }).start();
      Animated.timing(this.state.fadeAnimRow2, {
        toValue: 1,
        duration: 1000,
      }).start();
      setTimeout(() => {
        this.setState({
          checkslideHeaderRow1: true,
        });
      }, 50);
      setTimeout(() => {
        this.setState({
          checkslideHeaderRow2: true,
        });
      }, 200);
    } else {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
      Animated.timing(this.state.fadeAnimRow1, {
        toValue: 0,
        duration: 200,
      }).start();
      Animated.timing(this.state.fadeAnimRow2, {
        toValue: 0,
        duration: 100,
      }).start();
      setTimeout(() => {
        this.setState({
          checkslideHeaderRow1: false,
        });
      }, 150);
      setTimeout(() => {
        this.setState({
          checkslideHeaderRow2: false,
        });
      }, 0);
    }

    this.setState({
      containerHeight: containerHeight,
    });
  }
  render() {
    // const {back} = this.route.params.back;
    // console.log(back);
    // console.log('สถานะ', this.props.getStatus.isSuccess);
    return (
      <View style={styles.zIndex99}>
        <ImageBackground
          source={require('../image/BGHerderBottom.png')}
          imageStyle={styles.imageTop1}
          style={[styles.image]}>
          {Platform.OS === 'ios' && (
            <Header
              backgroundImage={require('../image/BGHerder.png')}
              backgroundImageStyle={styles.marginTopD30}
              statusBarProps={{barStyle: 'dark-content'}}
              barStyle="dark-content"
              leftContainerStyle={[styles.marginTopD60, {zIndex: 99}]}
              rightContainerStyle={styles.marginTopD60}
              containerStyle={styles.content}
              leftComponent={this.LeftComponent(this.state.fadeAnim)}
              rightComponent={this.RightComponent(this.state.fadeAnim)}
              centerComponent={this.CenterComponent(
                this.state.fadeAnimRow1,
                this.state.fadeAnimRow2,
              )}
            />
          )}
          <View>
            {!this.state.checkslideHeaderRow1 ? (
              <View>
                {this.props.ArrowColor ? (
                  <Image
                    style={styles.iconArrowDown}
                    source={require('../image/ArrowHearder.png')}
                  />
                ) : (
                  <Image
                    style={styles.iconArrowDown}
                    source={require('../image/iconArrowDownHerder.png')}
                  />
                )}
              </View>
            ) : (
              <Image style={styles.iconArrowDown} />
            )}
          </View>
        </ImageBackground>
        {Platform.OS === 'android' && (
          <View
            style={{
              zIndex: 99,
              width: 100,
              position: 'absolute',
              left: 12,
              top: -5,
            }}>
            {this.LeftComponent(this.state.fadeAnim)}
          </View>
        )}
        {Platform.OS === 'android' && (
          <SlideDownPanel
            offsetTop={0}
            initialHeight={0}
            containerMaximumHeight={317}
            handlerHeight={70}
            handlerDefaultView={this.Handler()}
            containerBackgroundColor={'transparent'}
            handlerBackgroundColor={'transparent'}
            getContainerHeight={this.getContainerHeight.bind(this)}>
            {this.FrontContainer(
              this.state.fadeAnimRow1,
              this.state.fadeAnimRow2,
            )}
          </SlideDownPanel>
        )}
        {Platform.OS === 'android' && (
          <View
            style={{
              zIndex: 99,
              width: 100,
              position: 'absolute',
              right: -5,
              top: 5,
            }}>
            {this.RightComponent(this.state.fadeAnim)}
          </View>
        )}
      </View>
    );
  }
  Handler() {
    return (
      <ImageBackground
        source={require('../image/BGHerder.png')}
        imageStyle={styles.BGHeader}
        style={(styles.image, styles.BGHeaderSt)}>
        <View style={styles.handler}>
          <Image
            style={styles.HeaderCenterIcon}
            source={require('../image/CenterHerderIcon.png')}
          />
        </View>
      </ImageBackground>
    );
  }
  LeftComponent(anime) {
    return (
      <Animated.View style={[styles.flexRow, {opacity: anime}]}>
        {this.props.backScreen === false ? (
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="chevron-small-left"
              size={35}
              color={'#2d6dc4'}
              style={[styles.paddingR5, {marginTop: 10}]}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.getUser.isSuccess ? (
          <View>
            {this.props.getUser.userDetails.res_result.type === 6 ? (
              <View />
            ) : (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ChatScreen')}
                style={{
                  flexDirection: 'row',
                  top: 2,
                  right: Platform.OS === 'android' ? 5 : 0,
                }}>
                <View style={{marginTop: 5}}>
                  <Image
                    style={styles.iconHumanBack}
                    source={require('../image/IconBackHerder.png')}
                  />
                  <Text style={{fontSize: 14, color: '#f05a71', right: 2}}>
                    น้องใส่ใจ
                  </Text>
                </View>

                <ImageBackground
                  source={require('../image/BGChatHerder.png')}
                  imageStyle={[styles.BGChat]}
                  style={[styles.BGChatSt, {justifyContent: 'center'}]}>
                  <View>
                    <Text style={styles.TextBGChat}>มีคำถามปรึกษาเรา</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View />
        )}
      </Animated.View>
    );
  }
  RightComponent(anime) {
    console.log(this.props.getImg.img);
    return (
      <Animated.View style={[styles.flexRow, {opacity: anime}]}>
        <View style={styles.ViewIconNoti}>
          <Icon2
            name="bell"
            size={22}
            color={'#2d6dc4'}
            style={styles.IconNoti}
          />
          <Badge
            value={this.props.badgeNumber}
            status="error"
            containerStyle={styles.iconBadge}
          />
        </View>

        <Avatar
          onPress={() => this.props.navigation.navigate('ProfileActivity')}
          size={25}
          rounded
          source={{
            uri: this.props.getImg.img,
          }}
        />
        {this.props.getStatus.isResult != undefined ? (
          <View
            style={{
              right: 12,
              zIndex: 2,
              position: 'absolute',
              bottom: -6,
            }}>
            {this.props.getStatus.isResult.status_confirm_identity
              .status_code === 0 ? (
              <Image
                style={{width: 18, height: 18}}
                source={require('../image/Alert12.png')}
              />
            ) : (
              <View />
            )}
            {this.props.getStatus.isResult.status_confirm_identity
              .status_code === 1 ? (
              <Image
                style={{width: 18, height: 18}}
                source={require('../image/watingPro.png')}
              />
            ) : (
              <View />
            )}
            {this.props.getStatus.isResult.status_confirm_identity
              .status_code === 2 ? (
              <View />
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
      </Animated.View>
    );
  }
  CenterComponent(anime1, anime2) {
    return (
      <SlideDownPanel
        offsetTop={-50}
        initialHeight={0}
        containerMaximumHeight={317}
        handlerHeight={70}
        handlerDefaultView={this.Handler()}
        containerBackgroundColor={'transparent'}
        handlerBackgroundColor={'transparent'}
        getContainerHeight={this.getContainerHeight.bind(this)}>
        {this.FrontContainer(anime1, anime2)}
      </SlideDownPanel>
    );
  }
  FrontContainer(anime1, anime2) {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.ViewMainMenuTop}>
          <View style={styles.ViewColMenuTop}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime1})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/IconMenuTop1.png')}
                />
                <Text style={styles.textMenuTop}>หน้าแรก</Text>
              </Animated.View>
            </TouchableOpacity>
            <View style={styles.height35} />
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {}, 200);

                this.props.navigation.navigate('Loan');
              }}>
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime2})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/IconMenuTop4.png')}
                />
                <Text style={styles.textMenuTop}>ตั้งค่า</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewColMenuTop}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProfileActivity', {index: 1})
              }>
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime1})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/IconMenuTop2.png')}
                />
                <Text style={styles.textMenuTop}>ตรวจสอบสถานะ</Text>
              </Animated.View>
            </TouchableOpacity>
            {/*บุคลากรเจ้าหน้าที่ */}
            {/* <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('ProfileActivity')}
            >
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime1})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/ScanHearder.png')}
                />
                <Text style={styles.textMenuTop}>สแกน QRCode</Text>
              </Animated.View>
            </TouchableOpacity> */}
            <Animated.View style={(styles.ViewInColMenuTop, {opacity: anime2})}>
              <Image
                style={styles.imageMenuTop}
                source={require('../image/IconMenuTop5.png')}
              />
              <Text style={styles.textMenuTop}>การแจ้งเตือน</Text>
            </Animated.View>
          </View>
          <View style={styles.ViewColMenuTop}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProfileActivity')}>
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime1})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/IconMenuTop3.png')}
                />
                <Text style={styles.textMenuTop}>ข้อมูลส่วนตัว</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onLogout()}>
              <Animated.View
                style={(styles.ViewInColMenuTop, {opacity: anime2})}>
                <Image
                  style={styles.imageMenuTop}
                  source={require('../image/IconMenuTop6.png')}
                />
                <Text style={styles.textMenuTop}>ออกจากระบบ</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.checkslideHeaderRow1 && (
          <Image
            style={styles.iconArrowUp}
            source={require('../image/iconArrowUpHerder.png')}
          />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = state => ({
  getStatus: state.dataReducer.getStatus,
  getImg: state.authReducer.getImg,
  getUser: state.userReducer.getUser,
  getNotification: state.authReducer.getNotification,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeadersAndroid);

const styles = StyleSheet.create({
  zIndex99: {
    // zIndex: 9999,
    width: '100%',
    // position: 'absolute',
    // marginBottom: 100,
  },
  frontContainer: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
  imageMenuTop: {
    height: 56,
    width: 56,
    alignSelf: 'center',
  },
  textMenuTop: {
    color: '#40536d',
    fontSize: 18,
    alignSelf: 'center',
  },
  ViewMainMenuTop: {
    paddingHorizontal: 10,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ViewColMenuTop: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ViewInColMenuTop: {
    height: 120,
  },
  image: {
    resizeMode: 'cover',
    alignItems: 'center',
  },
  handler: {
    backgroundColor: null,
    width: width,
    alignItems: 'center',
    marginTop: 35,
  },
  imageTop1: {
    height: 100,
    width: 250,
    marginTop: 18,
    position: 'absolute',
    left: '50%',
    marginLeft: -125,
  },
  content: {
    backgroundColor: null,
    justifyContent: 'space-around',
    height: 120,
    borderBottomColor: '#ffffff00',
    // marginTop: -23,
  },
  iconArrowDown: {
    height: 5,
    width: 8,
    marginTop: 75,
  },
  iconArrowUp: {
    height: 5,
    width: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  BGHeader: {
    height: 62,
    width: '100%',
    marginTop: 23,
  },
  BGHeaderSt: {height: 120, width: '100%'},
  HeaderCenterIcon: {
    width: 60,
    height: 60,
  },
  marginTopD30: {
    marginTop: -30,
  },
  marginTopD60: {
    marginTop: -60,
  },
  paddingR5: {
    paddingRight: 5,
  },
  iconHumanBack: {
    width: 23,
    height: 27,
    right: 2,
  },
  flexRow: {
    flexDirection: 'row',
  },
  BGChat: {
    height: 19,
    width: 87,
  },
  BGChatSt: {
    height: 24,
    width: null,
    marginTop: 13,
    marginLeft: 0,
    right: 10,
    left: -8,
  },
  TextBGChat: {
    color: '#40536d',
    fontSize: 13,
    left: 13,
    bottom: 2,
    // marginTop: 1,
    // padding: 8,
  },
  IconNoti: {
    transform: [{rotate: '20deg'}],
  },
  ViewIconNoti: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  height35: {
    height: 35,
  },
  iconBadge: {
    position: 'absolute',
    top: 13,
    right: 12,
  },
});
