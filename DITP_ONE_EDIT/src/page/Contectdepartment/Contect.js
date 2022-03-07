import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
} from "react-native";
import Headers from "../../components/Headerscontect";
import Headerstage from "../../components/Headerstagecontect";
import I18n from "../../utils/I18n";
import { useIsFocused } from "@react-navigation/native";
import { getContect } from "../../actions/data.actions";
import { connect } from "react-redux";
import Styles from "./Styles";
import LinearGradient from "react-native-linear-gradient";
import { ViewScale } from "../../config/ViewScale";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const height = Dimensions.get("window").height;

const Contect = ({ navigation, dispatch }) => {
  const [backScreen, setbackscreen] = useState(false);
  const [Address1, setAddress1] = useState();
  const [Address2, setAddress2] = useState();

  //บางกระสอ
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const isFocused = useIsFocused();
  const [label, setlabel] = useState();

  const url1 = Platform.select({
    ios: "maps:" + latitude + "," + longitude + "?q=" + label,
    android: "geo:" + latitude + "," + longitude + "?q=" + label,
  });

  //รัชดา
  const [latitude1, setlatitude1] = useState();
  const [longitude1, setlongitude1] = useState();
  const [label1, setlabel1] = useState();

  const url2 = Platform.select({
    ios: "maps:" + latitude1 + "," + longitude1 + "?q=" + label1,
    android: "geo:" + latitude1 + "," + longitude1 + "?q=" + label1,
  });
  const window = Dimensions.get("window");
  const { height, width } = Dimensions.get("window");
  //ipad
  var aspectRatio = 1.6;
  if (height / width > 1.6) {
    //iphone
    aspectRatio = 3;
  }

  var aspectRatio1 = "82%";
  if (height / width > 1.6) {
    //iphone
    aspectRatio1 = "82%";
  }

  const Call = (number) => {
    console.log(number);
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const _getCountry = async (value) => {
    try {
      const respones = await dispatch(getContect());
      console.log(JSON.stringify(respones.res_result[1]));

      if ((respones.res_code = "00")) {
        setAddress1(respones.res_result[0]);
        setAddress2(respones.res_result[1]);
        setlatitude(respones.res_result[0].latitude);
        setlongitude(respones.res_result[0].longitude);
        setlabel(respones.res_result[0].title);
        setlatitude1(respones.res_result[1].latitude);
        setlongitude1(respones.res_result[1].longitude);
        setlabel1(respones.res_result[1].title);
      }
    } catch (error) {}
  };

  function Phone(item) {
    return (
      item.substring(0, 1) +
      "-" +
      item.substring(1, 5) +
      "-" +
      item.substring(5, 10)
    );
  }

  useEffect(() => {
    _getCountry();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, zIndex: -99999, backgroundColor: "#FFFFFF" }}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <ScrollView style={{ zIndex: -99 }}>
        <LinearGradient
          start={{ x: 0.2, y: 0.8 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#9c7df6", "#3986ee"]}
          style={{
            height: Platform.OS === "ios" ? height * 0.3 : height * 0.4,
            // borderBottomWidth: 180,
            // borderBottomColor: '#FFFFFF',

            borderBottomRightRadius: ViewScale(110),
            borderBottomLeftRadius: ViewScale(110),

            zIndex: Platform.OS === "android" ? 9999 : -1,
          }}
        >
          <View style={{ marginTop: ViewScale(43), zIndex: -99 }} />
          <Headerstage nameTab={I18n.t("translate_ContactDepartment")} />
        </LinearGradient>

        <Image
          resizeMode={"contain"}
          style={{
            width: "100%",
            height: ViewScale(210),
            zIndex: Platform.OS === "android" ? 9999 : 0,
            // borderWidth:1,

            marginTop:
              Platform.OS === "android" ? -height * 0.22 : ViewScale(-185),
          }}
          source={require("../../image/contactx.png")}
        />

        {Address1 != null ? (
          <>
            <LinearGradient
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#9c7df6", "#3986ee"]}
              style={{
                // backgroundColor: '#FFFFFF',
                borderRadius: ViewScale(10),
                marginTop:
                  Platform.OS === "android" ? ViewScale(-185) : ViewScale(-185),
                zIndex: Platform.OS === "android" ? 999 : -999,
                marginHorizontal: ViewScale(15),
              }}
            >
              <View
                style={{
                  paddingTop: ViewScale(200),
                  backgroundColor: "#FFFFFF",
                  marginHorizontal: ViewScale(1),
                  borderWidth: ViewScale(0.3),
                  borderRadius: ViewScale(10),
                  borderColor: "#9c7df6",
                  marginBottom: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: ViewScale(20),
                    color: "#20416e",
                    marginHorizontal: ViewScale(10),
                    fontFamily: "Kittithada Bold 75",
                  }}
                >
                  กรมส่งเสริมการค้าระหว่างประเทศ (บางกระสอ)
                </Text>

                <View
                  style={{
                    marginTop: ViewScale(5),
                    width: ViewScale(100),
                    marginHorizontal: ViewScale(10),
                    height: ViewScale(35),
                  }}
                >
                  <View style={Styles.ViewSub12}>
                    <TouchableOpacity
                      style={Styles.ViewSub11}
                      onPress={() => Linking.openURL(Address1.url_map)}
                    >
                      <Image
                        style={Styles.Img2}
                        source={require("../../image/makerlocation.png")}
                      />
                      <Text style={Styles.ViewFont1}>{"  "}แผนที่</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text
                    numberOfLines={2}
                    style={[
                      Styles.TextSub1,
                      {
                        marginHorizontal: ViewScale(25),
                        marginRight: ViewScale(10),
                      },
                    ]}
                  >
                    {I18n.locale === "th"
                      ? "563 ถนน นนทบุรี ตำบล บางกระสอ อำเภอ เมือง " +
                        "\n" +
                        "จังหวัด นนทบุรี 11000"
                      : Address1.address_en}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: ViewScale(20),
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: ViewScale(10),
                        height: ViewScale(10),
                        top: ViewScale(3),
                        left: ViewScale(5),
                      }}
                      source={require("../../image/numberphone.png")}
                    />
                  </View>
                  <View style={{ marginBottom: ViewScale(20) }}>
                    <Text
                      onPress={() => {
                        Call(Address1.tel);
                      }}
                      style={{
                        color: "#4b4b4b",
                        fontSize: ViewScale(17),
                        marginHorizontal: ViewScale(15),
                      }}
                    >
                      {Phone(Address1.tel)}
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center'}}>
                  <Image
                    style={{
                      width: "90%",
                      height: ViewScale(1),
                      marginHorizontal: ViewScale(15),
                      marginBottom: ViewScale(15),
                    }}
                    source={require("../../image/linecontectx.png")}
                  />
                </View>

                {Address2 != null && (
                  <>
                    <Text
                      style={{
                        fontSize: ViewScale(20),
                        color: "#20416e",
                        marginHorizontal: ViewScale(10),
                        fontFamily: "Kittithada Bold 75",
                      }}
                    >
                      กรมส่งเสริมการค้าระหว่างประเทศ (ถนนรัชดาภิเษก)
                    </Text>
                    <View>
                      <Text
                        style={[
                          Styles.TextSub1,
                          {
                            marginHorizontal: ViewScale(25),
                            marginRight: ViewScale(10),
                          },
                        ]}
                      >
                        - สถานบันฝึกอบรมการค้าระหว่างประเทศ
                      </Text>
                      <Text
                        style={[
                          Styles.TextSub1,
                          {
                            marginHorizontal: ViewScale(25),
                            marginRight: ViewScale(10),
                          },
                        ]}
                      >
                        - ศูนย์บริการส่งออกแบบเบ็ดเสร็จ
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: ViewScale(5),
                        width: ViewScale(100),
                        marginHorizontal: ViewScale(10),
                        height: ViewScale(35),
                      }}
                    >
                      <View style={Styles.ViewSub12}>
                        <TouchableOpacity
                          style={Styles.ViewSub11}
                          onPress={() => Linking.openURL(Address2.url_map)}
                        >
                          <Image
                            style={Styles.Img2}
                            source={require("../../image/makerlocation.png")}
                          />
                          <Text style={Styles.ViewFont1}>{"  "}แผนที่</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          Styles.TextSub1,
                          {
                            marginHorizontal: ViewScale(25),
                            marginRight: ViewScale(10),
                          },
                        ]}
                      >
                        {I18n.locale === "th"
                          ? "22/77 ถนน รัชดาภิเษก เขต จตุจักร กรุงเทพ 10900"
                          : Address2.address_en}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: ViewScale(20),
                        marginBottom: ViewScale(10),
                      }}
                    >
                      <View>
                        <Image
                          style={{
                            width: ViewScale(10),
                            height: ViewScale(10),
                            top: ViewScale(3),
                            left: ViewScale(5),
                          }}
                          source={require("../../image/numberphone.png")}
                        />
                      </View>
                      <View>
                        <Text
                          onPress={() => {
                            Call(Address2.tel);
                          }}
                          style={{
                            color: "#4b4b4b",
                            fontSize: ViewScale(17),
                            marginHorizontal: ViewScale(15),
                          }}
                        >
                          {Phone(Address2.tel)}
                        </Text>
                      </View>
                    </View>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        marginBottom: 10,
                      }}>
                      <View>
                        <Image
                          style={{width: 10, height: 10, top: 3, left: 5}}
                          source={require('../../image/phonehome.png')}
                        />
                      </View>
                      <View>
                        <Text
                          onPress={() => {
                            Call(Address2.flax);
                          }}
                          style={{
                            color: '#4b4b4b',
                            fontSize: 17,
                            marginHorizontal: 15,
                          }}>
                          {I18n.locale === 'th'
                            ? Phone(Address2.flax)
                            : Phone(Address2.flax)}
                        </Text>
                      </View>
                    </View> */}
                  </>
                )}
                <View />
              </View>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#9c7df6", "#3986ee"]}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: ViewScale(10),
                marginTop: ViewScale(10),
                marginHorizontal: ViewScale(15),
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: ViewScale(10),
                  marginHorizontal: ViewScale(1),
                  marginVertical: ViewScale(1),
                  borderWidth: ViewScale(0.3),
                  borderColor: "#9c7df6",
                  marginBottom: ViewScale(1),
                }}
              >
                <Text
                  style={{
                    fontSize: ViewScale(20),
                    color: "#20416e",
                    marginHorizontal: ViewScale(10),
                    fontFamily: "Kittithada Bold 75",
                    marginBottom: ViewScale(5),
                    marginTop: ViewScale(5),
                  }}
                >
                  {I18n.t("translate_Contect1")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://" + Address2.website)
                    }
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/DITPWWWWW.png")}
                    />
                    <Text
                      style={{
                        color: "#20416e",
                        fontSize: ViewScale(18),
                        fontFamily: "Kittithada Bold 75",
                      }}
                    >
                      Website
                      {""}
                    </Text>
                    <Text style={{ marginTop: ViewScale(-5) }}>{""}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Call(Address2.hotline);
                    }}
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/callcenter.png")}
                    />

                    <Text
                      style={{
                        color: "#20416e",
                        fontSize: ViewScale(18),
                        fontFamily: "Kittithada Bold 75",
                      }}
                    >
                      Call Center 1169
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL("mailto:" + Address2.email);
                      console.log(Address1.email);
                    }}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/mess.png")}
                    />

                    <Text
                      style={{
                        color: "#20416e",
                        fontSize: ViewScale(18),
                        fontFamily: "Kittithada Bold 75",
                      }}
                    >
                      E-mail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#9c7df6", "#3986ee"]}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: ViewScale(10),
                marginTop: ViewScale(10),
                marginHorizontal: ViewScale(15),
                marginBottom: ViewScale(10),
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: ViewScale(10),
                  marginHorizontal: ViewScale(1),
                  marginVertical: ViewScale(1),
                  borderWidth: ViewScale(0.3),
                  borderColor: "#9c7df6",
                  marginBottom: ViewScale(1),
                }}
              >
                <Text
                  style={{
                    fontSize: ViewScale(20),
                    color: "#20416e",
                    marginHorizontal: ViewScale(10),
                    fontFamily: "Kittithada Bold 75",
                    marginBottom: ViewScale(5),
                    marginTop: ViewScale(5),
                  }}
                >
                  Social Media
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (Platform.OS === "ios") {
                        Linking.openURL("fb://page/?id=607043296143076");
                      } else {
                        Linking.openURL("fb://page/607043296143076");
                      }
                    }}
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/facebookx.png")}
                    />
                    <Text>{""}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Address2.twitter)}
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/twix.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Address2.instagram)}
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/insx.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Address2.line)}
                    style={{ flex: 0.9, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/linex.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Address2.youtube)}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{
                        width: ViewScale(60),
                        height: ViewScale(60),
                      }}
                      source={require("../../image/Youtubex.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <View style={{ marginBottom: ViewScale(20) }}>
              <Text> </Text>
            </View>
          </>
        ) : (
          <View />
        )}

        {/*ที่อยู่กรม รัชดา */}
        {Address2 != null ? <View /> : <View />}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  getStatus: state.dataReducer.getStatus,
  getUser: state.userReducer.getUser,
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  PopupCounter: state.globalReducer.PopupCounter,
  HeaderBack: state.globalReducer.HeaderBack,
  getHome: state.dataReducer.getHome,
  getScore: state.dataReducer.getScore,
});

export default connect(
  mapStateToProps,
  null
)(Contect);
