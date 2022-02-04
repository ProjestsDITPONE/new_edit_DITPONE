import React, { Component } from "react";
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
  Alert,
} from "react-native";
import { Header, Avatar, Badge, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import SlideDownPanel from "../lib_edit/react-native-slide-down-panel";
import { logoutUser } from "../actions/auth.actions";
import { getcount, getChatHistory } from "../actions/data.actions";
import { connect } from "react-redux";
import Popup from "./Popup";
import I18n from "../utils/I18n";
import { ViewScale } from "../config/ViewScale";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import th from "../page/locales/th";
import { useIsFocused } from "@react-navigation/native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import LinearGradient from "react-native-linear-gradient";
const { height, width } = Dimensions.get("window");
//ipad
var aspectRatio = 1;
if (height / width > 1.6) {
  //iphone
  aspectRatio = 0;
}
class Headers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerHeight: 70,
      checkslideHeaderRow1: false,
      checkslideHeaderRow2: false,
      fadeAnim: new Animated.Value(1),
      fadeAnimRow1: new Animated.Value(0),
      fadeAnimRow2: new Animated.Value(0),
      backScreen: false,
      CountNoti: 0,
      Chect: false,
      ArrowColor: false,
      backScreen2: false,
      PopupLogout: false,
      index: null,
      index2: null,
      index3: null,
      checkScreenhome: null,
      checkPro: this.props.CheckAct === true ? true : false,
      Panel1: 70,
      Hide1: 70,
      Hide2: 317,
      backHome: false,
    };
  }
  static hideHeader = async (values) => {
    this.setState({ containerHeight: 70 });
    this.props.getContainerHeight(70);
  };

  _getMarketData = async (values) => {
    try {
      this.response = await this.props.dispatch(
        getChatHistory({
          sso_id: this.props.getUser.userDetails.res_result.ssoid,
          loadding: values,
        })
      );
      // console.log('เช็ค', this.response);
      // if (this.response.res_code === '00') {
      //   this.setState({
      //     dataMarketData: this.response,
      //   });
      //   this.setState({datachat: this.state.dataMarketData.results});
      // }
    } catch (error) {
      console.log(error);
    }
  };

  Noti = async (value) => {
    try {
      const payload = {
        sso_id:
          this.props.getUser.userDetails.res_result.ssoid != undefined
            ? this.props.getUser.userDetails.res_result.ssoid
            : this.props.getUser.userDetails.res_result.id,
        token: this.props.authData.token,
      };
      const xx = await this.props.dispatch(getcount(payload));

      // | 0 ตัดทศนิยมออก ครับ .0
      console.log("121212");
      console.log(xx.res_code);
      // this.Panel.handlePanResponderEnd();
      this.setState({ CountNoti: xx.res_count });
    } catch (error) {}
  };

  componentDidMount(anime1, anime2, containerHeight) {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", (test) => {
      SlideDownPanel.hideHeader();
      this.forceUpdate();
      this.Noti();
    });
  }

  CheactScreem = () => {
    this.props.navigation.navigate("ListChatScreen");
  };

  onLogout = () => {
    this.props.dispatch({
      type: "GET_REGION_FAIL",
      payload: null,
    });
    this.props.dispatch(
      logoutUser({
        device_uuid:
          this.props.getNotification.tokenNotification != undefined
            ? this.props.getNotification.tokenNotification
            : "0",
        token: this.props.authData.token,
      })
    );
  };

  getContainerHeight(containerHeight) {
    // console.log('สูง', containerHeight);
    if (containerHeight === 317) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.fadeAnimRow1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.fadeAnimRow2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
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
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.fadeAnimRow1, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.fadeAnimRow2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
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
    //  console.log('นับบ', this.props.getUser.userDetails.res_result);
    return (
      <View
        // start={{x: 0.2, y: 0.8}}
        // end={{x: 1, y: 0.5}}
        // colors={['#5dbde6', '#1d61bd']}
        style={[Platform.OS === "ios" && styles.zIndex99]}
      >
        <ImageBackground
          source={require("../image/BGHerderBottom.png")}
          imageStyle={styles.imageTop1}
          style={[styles.image]}
        >
          {Platform.OS === "ios" && (
            <Header
              backgroundImage={require("../image/BGHerder.png")}
              backgroundImageStyle={styles.marginTopD30}
              statusBarProps={{ barStyle: "dark-content" }}
              barStyle="dark-content"
              leftContainerStyle={[styles.marginTopD60, { zIndex: 99 }]}
              rightContainerStyle={styles.marginTopD60}
              containerStyle={styles.content}
              leftComponent={this.LeftComponent(
                this.state.fadeAnim,
                this.state.checkslideHeaderRow1
              )}
              rightComponent={this.RightComponent(
                this.state.fadeAnim,
                this.state.checkslideHeaderRow1
              )}
              centerComponent={this.CenterComponent(
                this.state.fadeAnimRow1,
                this.state.fadeAnimRow2
              )}
            />
          )}
          <View>
            {!this.state.checkslideHeaderRow1 ? (
              <View>
                {this.props.ArrowColor ? (
                  <Image
                    style={styles.iconArrowDown}
                    source={require("../image/ArrowHearder.png")}
                  />
                ) : (
                  <Image
                    style={styles.iconArrowDown}
                    source={require("../image/iconArrowDownHerder.png")}
                  />
                )}
              </View>
            ) : (
              <Image style={styles.iconArrowDown} />
            )}
          </View>
        </ImageBackground>
        {Platform.OS === "android" && (
          <View
            style={{
              zIndex: 99,
              width: ViewScale(100),
              position: "absolute",
              left: ViewScale(15),
              top: ViewScale(-5),
            }}
          >
            {this.LeftComponent(this.state.fadeAnim)}
          </View>
        )}
        {Platform.OS === "android" && (
          <SlideDownPanel
            // ref={() => console.log('ddd')}
            offsetTop={0}
            initialHeight={0}
            containerMaximumHeight={317}
            handlerHeight={70}
            handlerDefaultView={this.Handler()}
            containerBackgroundColor={"transparent"}
            handlerBackgroundColor={"transparent"}
            getContainerHeight={this.getContainerHeight.bind(this)}
          >
            {this.FrontContainer(
              this.state.fadeAnimRow1,
              this.state.fadeAnimRow2
            )}
          </SlideDownPanel>
        )}
        {Platform.OS === "android" && (
          <View
            style={{
              zIndex: 99,
              width: ViewScale(100),
              position: "absolute",
              right: ViewScale(-5),
              top: ViewScale(5),
            }}
          >
            {this.RightComponent(this.state.fadeAnim)}
          </View>
        )}
      </View>
    );
  }
  Handler(gg) {
    return (
      <ImageBackground
        resizeMode={"stretch"}
        source={require("../image/BGHerder.png")}
        imageStyle={styles.BGHeader}
        style={(styles.image, styles.BGHeaderSt)}
      >
        <View style={styles.handler}>
          <Image
            style={styles.HeaderCenterIcon}
            source={require("../image/logoTop.png")}
          />
        </View>
      </ImageBackground>
    );
  }
  LeftComponent(anime, anime2) {
    return (
      <Animated.View
        style={[
          styles.flexRow,
          { opacity: anime },
          anime2 === true && styles.display,
        ]}
      >
        {this.props.backScreen === false ? (
          <TouchableOpacity
            disabled={!(this.state.checkslideHeaderRow1 == false)}
            onPress={() => {
              this.props.navigation.goBack();

              SlideDownPanel.hideHeader();
            }}
          >
            <Icon
              name="chevron-small-left"
              size={ViewScale(35)}
              color={"#2d6dc4"}
              style={[
                styles.paddingR5,
                { marginTop: ViewScale(10), marginLeft: ViewScale(-11) },
              ]}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.backHome === false ? (
          <TouchableOpacity
            disabled={!(this.state.checkslideHeaderRow1 == false)}
            onPress={() => {
              this.props.navigation.navigate("Home");

              SlideDownPanel.hideHeader();
            }}
          >
            <Icon
              name="chevron-small-left"
              size={ViewScale(35)}
              color={"#2d6dc4"}
              style={[
                styles.paddingR5,
                { marginTop: ViewScale(10), marginLeft: ViewScale(-11) },
              ]}
            />
          </TouchableOpacity>
        ) : null}

        {this.props.backScreen2 === false ? (
          <TouchableOpacity
            onPress={() => {
              this._getMarketData();
              this.props.navigation.goBack();
            }}
          >
            <Icon
              name="chevron-small-left"
              size={ViewScale(35)}
              color={"#2d6dc4"}
              style={[
                styles.paddingR5,
                { marginTop: ViewScale(10), marginLeft: ViewScale(-11) },
              ]}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.getUser.isSuccess ? (
          <View>
            {this.props.getUser.userDetails.res_result.type === 6 ? (
              <View />
            ) : (
              <View>
                <TouchableOpacity
                  disabled={!(this.state.checkslideHeaderRow1 == false)}
                  onPress={() => this.CheactScreem()}
                  style={{
                    flexDirection: "row",
                    top: ViewScale(10),
                    right:
                      Platform.OS === "android" ? ViewScale(-4) : ViewScale(-4),
                  }}
                >
                  <View style={{ marginTop: ViewScale(5) }}>
                    <Image
                      style={styles.iconHumanBack}
                      source={require("../image/IconBackHerder.png")}
                    />
                    <Text
                      style={{
                        top: ViewScale(-8),
                        marginLeft: ViewScale(-10),
                        padding: ViewScale(5),
                        fontSize: ViewScale(12),
                        color: "#f05a71",
                        right: ViewScale(2),
                        fontFamily: "Kittithada Bold 75",
                      }}
                    >
                      {I18n.t("translate_Nong_Saijai")}
                    </Text>
                  </View>

                  {this.props.getCountChat.Countchat.res_code === "00" ? (
                    <View
                      style={{
                        zIndex: 1,
                        top: ViewScale(7),
                        left: ViewScale(14),
                      }}
                    >
                      {this.props.getCountChat.Countchat.res_result.num_chat >
                      0 ? (
                        <Badge
                          badgeStyle={{
                            width: ViewScale(10),
                            height: ViewScale(17),
                            borderRadius: ViewScale(35),
                          }}
                          textStyle={{ fontSize: ViewScale(15) }}
                          value={
                            this.props.getCountChat.Countchat.res_result
                              .num_chat
                          }
                          status="error"
                          containerStyle={styles.iconBadge}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : (
                    <View />
                  )}

                  <ImageBackground
                    source={require("../image/BGChatHerder.png")}
                    imageStyle={{
                      height: ViewScale(19),
                      width:
                        I18n.locale === "th" ? ViewScale(83) : ViewScale(83),
                      // left:
                      //   Platform.OS === "ios" ? ViewScale(6) : ViewScale(10),
                      // top: ViewScale(-4),
                    }}
                    style={[styles.BGChatSt, { justifyContent: "center" }]}
                  >
                    <View style={{ alignItems: "center" ,marginTop: ViewScale(5)}}>
                      <Text
                        style={[
                          styles.TextBGChat,
                          {
                            textAlign: "center",
                            left:
                              Platform.OS === "ios"
                                ? ViewScale(10)
                                : ViewScale(23),
                            top:
                              Platform.OS === "ios"
                                ? ViewScale(-8)
                                : ViewScale(-8),
                          },
                        ]}
                      >
                        {I18n.locale === "th"
                          ? "คุยกับน้องใส่ใจ"
                          : "    Live Chat"}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View />
        )}
      </Animated.View>
    );
  }
  RightComponent(anime, anime2) {
    console.log(this.props.CountNotification.CountNotification);
    return (
      <Animated.View
        style={[
          styles.flexRow,
          { opacity: anime },
          anime2 === true && styles.display,
        ]}
      >
        {/* <TouchableOpacity
          disabled={!(this.state.checkslideHeaderRow1 == false)}
          style={styles.ViewIconNoti}
          onPress={() => this.props.navigation.navigate('ListNotiScreen')}>
          
           <Image
                  style={[styles.IconNoti,{width:25,height:25,top:2}]}
                  source={require('../image/bellx.png')}
                />

        
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("UserChatHome");
          }}
          style={{}}
        >
          <Image
            style={[
              styles.IconNoti,
              {
                width: ViewScale(22),
                height: ViewScale(22),
                top: ViewScale(5),
              },
            ]}
            source={require("../image/message.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!(this.state.checkslideHeaderRow1 == false)}
          style={styles.ViewIconNoti}
          onPress={() => this.props.navigation.navigate("ListNotiScreen")}
        >
          {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} > 
          <Icon2
            name="bell"
            size={25}
            color={'#2d6dc4'}
            style={[styles.IconNoti,{opacity: 0}]}
          />
          </LinearGradient> */}
          <Image
            style={[
              styles.IconNoti,
              {
                width: ViewScale(25),
                height: ViewScale(25),
                top: ViewScale(2),
              },
            ]}
            source={require("../image/bellx.png")}
          />

          {this.props.CountNotification.CountNotification > 0 ? (
            <Badge
              badgeStyle={{
                top: ViewScale(3),
                right: ViewScale(2),
                width: ViewScale(21),
                height: ViewScale(21),
                borderRadius: ViewScale(35),
              }}
              textStyle={{ fontSize: ViewScale(15) }}
              // value={this.props.badgeNumber}
              value={this.props.CountNotification.CountNotification - 10}
              // value={10}
              status="error"
              containerStyle={styles.iconBadge}
            />
          ) : (
            this.state.CountNoti > 0 && (
              <Badge
                badgeStyle={{
                  top: ViewScale(3),
                  right: ViewScale(2),
                  width: ViewScale(21),
                  height: ViewScale(21),
                  borderRadius: ViewScale(35),
                }}
                textStyle={{ fontSize: ViewScale(15) }}
                // value={1}
                value={
                  this.state.CountNoti > 99 ? 99 + "+" : this.state.CountNoti
                }
                status="error"
                containerStyle={styles.iconBadge}
              />
            )
          )}
        </TouchableOpacity>
        {this.props.getImg.isSuccess ? (
          <TouchableOpacity
            style={{
              marginLeft:
                Platform.OS === "android" ? ViewScale(-14) : ViewScale(0),
            }}
            disabled={!(this.state.checkslideHeaderRow1 == false)}
            onPress={() => this.props.navigation.navigate("ProfileActivity")}
          >
            <Avatar
              size={ViewScale(30)}
              rounded
              source={{
                uri: this.props.getImg.img,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={!(this.state.checkslideHeaderRow1 == false)}
            onPress={() => this.props.navigation.navigate("ProfileActivity")}
          >
            <Avatar size={30} rounded source={require("../image/user.jpg")} />
          </TouchableOpacity>
        )}

        {this.props.getStatus.isResult != undefined ? (
          <View
            style={{
              right: Platform.OS === "android" ? ViewScale(8) : ViewScale(-1),
              zIndex: 2,
              position: "absolute",
              bottom: ViewScale(-6),
            }}
          >
            {this.props.getStatus.isResult.status_confirm_identity
              .status_code === 0 ? (
              <Image
                style={{ width: ViewScale(15), height: ViewScale(15) }}
                source={require("../image/Alert12.png")}
              />
            ) : (
              <View />
            )}
            {this.props.getStatus.isResult.status_confirm_identity
              .status_code === 1 ? (
              <Image
                style={{ width: ViewScale(15), height: ViewScale(15) }}
                source={require("../image/watingPro.png")}
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
        containerBackgroundColor={"transparent"}
        handlerBackgroundColor={"transparent"}
        getContainerHeight={(e) => {
          this.setState({ Hide: e });
          this.getContainerHeight(e);
        }}
      >
        {/* {console.log('ค่าาา', this.FrontContainer(anime1, anime2))} */}
        {this.FrontContainer(anime1, anime2)}
      </SlideDownPanel>
    );
  }
  FrontContainer(anime1, anime2) {
    return (
      <View style={styles.frontContainer}>
        {this.state.PopupLogout === true && (
          <Overlay
            onBackdropPress={() => this.setState({ PopupLogout: false })}
            fullScreen={false}
            isVisible={this.state.PopupLogout}
            backdropStyle={{
              backgroundColor:
                Platform.OS === "android" ? "#2d6dc420" : "#2d6dc480",
              borderColor: "transparent",
            }}
          >
            <Popup
              text={I18n.t("translate_Logout")}
              accept={() => {
                setTimeout(() => {
                  this.onLogout();
                }, 200);
                this.setState({ PopupLogout: false });
              }}
              cancle={() => this.setState({ PopupLogout: false })}
              Icon={
                <Icon2
                  name="alert-circle"
                  size={ViewScale(100)}
                  color="#e82d2d"
                />
              }
            />
          </Overlay>
        )}
        <View style={styles.ViewMainMenuTop}>
          <View style={[styles.ViewColMenuTop]}>
            {this.props.checkScreenhome === false ? (
              <TouchableOpacity
                onPress={() => {
                  SlideDownPanel.hideHeader();
                  this.props.navigation.navigate("Home");
                }}
              >
                <Animated.View
                  style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                >
                  <Image
                    style={styles.imageMenuTop}
                    source={require("../image/homeheader.png")}
                  />
                  <Text style={styles.textMenuTop} numberOfLines={2}>
                    {I18n.t("Home_Header")}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  SlideDownPanel.hideHeader();
                  this.props.navigation.navigate("Home");
                }}
              >
                <Animated.View
                  style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                >
                  <Image
                    style={styles.imageMenuTop}
                    source={require("../image/homeheader.png")}
                  />
                  <Text style={styles.textMenuTop} numberOfLines={2}>
                    {I18n.t("Home_Header")}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            )}
            <View style={styles.height35} />
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {}, 200);
                SlideDownPanel.hideHeader();
                this.props.navigation.navigate("Loan");
              }}
            >
              <Animated.View
                style={(styles.ViewInColMenuTop, { opacity: anime2 })}
              >
                <Image
                  style={styles.imageMenuTop}
                  source={require("../image/settingheader.png")}
                />
                <Text style={styles.textMenuTop} numberOfLines={2}>
                  {I18n.t("Setting_Header")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={[styles.ViewColMenuTop]}>
            {this.props.getUser.isSuccess && (
              <View>
                {this.props.getUser.userDetails.res_result.type != 6 ? (
                  <View>
                    {this.state.checkPro === false ? (
                      <TouchableOpacity
                        onPress={() => {
                          SlideDownPanel.hideHeader();
                          this.props.navigation.navigate("ProfileActivity", {
                            index: 1,
                          });
                        }}
                      >
                        <Animated.View
                          style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                        >
                          <Image
                            style={styles.imageMenuTop}
                            source={require("../image/canadie.png")}
                          />
                          <Text style={styles.textMenuTop} numberOfLines={2}>
                            {I18n.t("Status")}
                          </Text>
                        </Animated.View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={this.props.index}>
                        <Animated.View
                          style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                        >
                          <Image
                            style={styles.imageMenuTop}
                            source={require("../image/canadie.png")}
                          />
                          <Text style={styles.textMenuTop} numberOfLines={2}>
                            {I18n.t("Status")}
                          </Text>
                        </Animated.View>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      SlideDownPanel.hideHeader();
                      this.props.navigation.navigate("Activityscan", {
                        abc: false,
                        index: 1,
                      });
                    }}
                  >
                    <Animated.View
                      style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                    >
                      <Image
                        style={styles.imageMenuTop}
                        source={require("../image/QrcodeH.png")}
                      />
                      <Text style={styles.textMenuTop} numberOfLines={2}>
                        {I18n.t("ScanHearder")}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                SlideDownPanel.hideHeader();
                this.props.navigation.navigate("ListNotiScreen");
              }}
            >
              <Animated.View
                style={(styles.ViewInColMenuTop, { opacity: anime2 })}
              >
                <View
                  style={{
                    zIndex: 1,
                    right: 13,
                    bottom: 13,
                  }}
                >
                  {this.props.CountNotification.CountNotification > 0 ? (
                    <Badge
                      badgeStyle={{
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                      }}
                      textStyle={{ fontSize: 15 }}
                      // value={10}
                      value={
                        this.props.CountNotification.CountNotification - 10
                      }
                      status="error"
                      containerStyle={styles.iconBadge}
                    />
                  ) : (
                    this.state.CountNoti > 0 && (
                      <Badge
                        badgeStyle={{
                          width: 25,
                          height: 25,
                          borderRadius: 15,
                        }}
                        textStyle={{ fontSize: 15 }}
                        // value={this.props.badgeNumber}
                        value={
                          this.state.CountNoti > 99
                            ? 99 + "+"
                            : this.state.CountNoti
                        }
                        status="error"
                        containerStyle={styles.iconBadge}
                      />
                    )
                  )}
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.imageMenuTop}
                  source={require("../image/bellheader3.png")}
                />
                <Text style={styles.textMenuTop} numberOfLines={2}>
                  {I18n.t("Noti_Header")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewColMenuTop}>
            {this.state.checkPro === false ? (
              <TouchableOpacity
                onPress={() => {
                  SlideDownPanel.hideHeader();
                  this.props.navigation.navigate("ProfileActivity");
                }}
              >
                <Animated.View
                  style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                >
                  <Image
                    style={styles.imageMenuTop}
                    source={require("../image/proflieheader.png")}
                  />
                  <Text style={styles.textMenuTop} numberOfLines={2}>
                    {I18n.t("Profile_Header")}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.props.index2}>
                <Animated.View
                  style={(styles.ViewInColMenuTop, { opacity: anime1 })}
                >
                  <Image
                    style={styles.imageMenuTop}
                    source={require("../image/proflieheader.png")}
                  />
                  <Text style={styles.textMenuTop} numberOfLines={2}>
                    {I18n.t("Profile_Header")}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={
                () => {
                  SlideDownPanel.hideHeader();
                  this.setState({ PopupLogout: true });
                }

                // this.onLogout()
              }
            >
              <Animated.View
                style={(styles.ViewInColMenuTop, { opacity: anime2 })}
              >
                <Image
                  style={styles.imageMenuTop}
                  source={require("../image/logoutheader.png")}
                />
                <Text style={styles.textMenuTop} numberOfLines={2}>
                  {I18n.t("Logout_Header")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.checkslideHeaderRow1 && (
          <Image
            style={styles.iconArrowUp}
            source={require("../image/iconArrowUpHerder.png")}
          />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const mapStateToProps = (state) => ({
  getStatus: state.dataReducer.getStatus,
  getImg: state.authReducer.getImg,
  getUser: state.userReducer.getUser,
  CountNotification: state.authReducer.getCountNotification,
  authData: state.authReducer.authData,
  getNotification: state.authReducer.getNotification,
  getCountChat: state.authReducer.getCountChat,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Headers);

const styles = StyleSheet.create({
  zIndex99: {
    zIndex: 9999,
    height: 50,
  },
  frontContainer: {
    flex: 1,
    width: width,
    backgroundColor: "white",
  },
  imageMenuTop: {
    width: 80,
    height: 55,
    alignSelf: "center",
  },
  textMenuTop: {
    color: "#40536d",
    fontSize: ViewScale(20),
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Kittithada Bold 75",
  },
  ViewMainMenuTop: {
    paddingHorizontal: 10,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ViewColMenuTop: {
    width: "30%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ViewInColMenuTop: {
    height: 120,
  },
  image: {
    resizeMode: "cover",
    alignItems: "center",
  },
  handler: {
    backgroundColor: null,
    // width: width,
    alignItems: "center",
    marginTop: 35,
  },
  imageTop1: {
    height: 100,
    width: 250,
    marginTop: Platform.OS === "android" ? -5 : 18,
    position: "absolute",
    left: "50%",
    marginLeft: -125,
  },
  content: {
    backgroundColor: null,
    justifyContent: "space-around",
    height: 120,
    borderBottomColor: "#ffffff00",
  },
  iconArrowDown: {
    height: 5,
    width: 8,
    marginTop: Platform.OS === "android" ? 75 : -13,
    position: Platform.OS === "android" ? "absolute" : "relative",
    right: Platform.OS === "android" ? -3 : 0,
  },
  iconArrowUp: {
    height: 5,
    width: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  BGHeader: {
    height: aspectRatio == 2 ? 62 : 75,
    width: "100%",
    marginTop: 23,
  },
  BGHeaderSt: { height: 120, width: "100%" },
  HeaderCenterIcon: {
    // zIndex: 99,
    width: 55,
    height: 55,
  },
  marginTopD30: {
    marginTop: -30,
  },
  marginTopD60: {
    marginTop: -60,
  },
  paddingR5: {
    paddingRight: ViewScale(5),
  },
  iconHumanBack: {
    width: ViewScale(23),
    height: ViewScale(27),
    right: ViewScale(2),
  },
  flexRow: {
    marginTop: 5,
    flexDirection: "row",
  },
  display: {
    display: "none",
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
    left: Platform.OS === "android" ? -16 : -8,
  },
  TextBGChat: {
    color: "#40536d",
    fontSize: ViewScale(14),
    // left: ViewScale(12),
    // bottom: ViewScale(2),
    fontFamily: "Kittithada Bold 75",
  },
  IconNoti: {
    // transform: [{ rotate: '20deg' }],
  },
  ViewIconNoti: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  height35: {
    height: 35,
  },
  iconBadge: {
    position: "absolute",
    top: 13,
    right: 12,
  },
});
