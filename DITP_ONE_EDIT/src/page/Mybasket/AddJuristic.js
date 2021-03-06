import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Platform,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Avatar, ListItem, Overlay } from "react-native-elements";
import I18n from "../../utils/I18n";
import { useIsFocused } from "@react-navigation/native";
import Styles from "./Styles";
import Style from "../IdentityScreen/Styles";
import { RNCamera } from "react-native-camera";
import { launchImageLibrary } from "react-native-image-picker";
import Headers from "../../components/Headers";
import { connect, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import LinearGradient from "react-native-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Addjuristic } from "../../actions/data.actions";
const AddJuristicScreen = ({ navigation, dispatch, getUser, authData }) => {
  const [Company_name, setCompany_name] = useState("");
  const [Address, setAddress] = useState("");
  const [Title, setTile] = useState("");
  const [Firstname, serFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Position, setPosition] = useState("");
  const [Email, setEmail] = useState("");
  const [Tel, setTel] = useState("");
  const [Event, setEvent] = useState("");
  const [Note, setNote] = useState("");

  const _Addjuristic = async (valuse) => {
    let response = await dispatch(
      Addjuristic({
        result: {
          ssoid: getUser.userDetails.res_result.ssoid,
          member_ssoid: getUser.userDetails.res_result.ssoid,
          type: getUser.userDetails.res_result.type,
          member_type: getUser.userDetails.res_result.type,
          company_name: Company_name,
          address: Address,
          title: Title,
          firstname: Firstname,
          lastname: Lastname,
          nickname: Nickname,
          position: Position,
          email: Email,
          tel: Tel,
          event: Event,
          note: Note,
        },
        token: authData.token,
      })
    );
    // console.log("Jurisitic", response);
  };
  // console.log("test", authData);

  const [imguri, setimguri] = useState(null);

  const imageJurisisticPerson = async () => {
    const options = {
      title: "Take Photo",
      mediaType: "photo",
      path: "photo",
      quality: 0.3,
      multiple: true,
    };
    launchImageLibrary(options, (response) => {
      let responses = response.assets[0];
      let path = responses.uri;
      path = "~" + path.substring(path.indexOf("/Documents"));
      // console.log("responses.uri");
      // console.log(responses.uri);
      setimguri(responses.uri);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Headers
        CheckAct={true}
        index={() => {
          setSelecIndex(1);
          SlideDownPanel.hideHeader();
        }}
        index2={() => {
          SlideDownPanel.hideHeader();
          setSelecIndex(0);
        }}
        badgeNumber="2"
        navigation={navigation}
        backScreen={false}
      />
      <View style={{ marginTop: Platform.OS === "android" && 90 }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : 20}
        style={{ flex: 1, zIndex: -1 }}
      >
        <ScrollView style={{ zIndex: -1 }}>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity 
            onPress={() => imageJurisisticPerson()}
            style={{ alignSelf: "center" }}>
              {imguri === null && (
                <LinearGradient
                  style={{ borderRadius: 65 }}
                  colors={["#865ff7", "#1e4af1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Avatar
                    size={113}
                    rounded
                    icon={{
                      name: "photo-camera",
                      type: "material",
                      color: "#dadde0",
                      size: 36,
                    }}
                    overlayContainerStyle={{
                      backgroundColor: "#efefef",
                      margin: 5,
                    }}
                    activeOpacity={0.7}
                  />
                </LinearGradient>
              )}
              {imguri != null && (
                <LinearGradient
                  style={{ borderRadius: 65 }}
                  colors={["#865ff7", "#1e4af1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Avatar
                    size={113}
                    rounded
                    source={{ uri: imguri }}
                    overlayContainerStyle={{
                      backgroundColor: "#efefef",
                      margin: 5,
                    }}
                    activeOpacity={0.7}
                  />
                </LinearGradient>
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                width: "25%",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#9c7df6",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#9c7df6",
                  }}
                >
                  {I18n.t("transalte_Juristic_Person")}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 15,
                marginHorizontal: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
            >
              <View style={{ backgroundColor: "#FFFFFF" }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",

                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_company_name")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setCompany_name}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",

                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Contactaddress")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setAddress}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: 5,
                    }}
                  >
                    <ImageBackground
                      source={require("../../image/inputedittext.png")}
                      resizeMode={"stretch"}
                      imageStyle={{ height: 28, width: "100%" }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        onChangeText={setAddress}
                        style={{
                          fontSize: 24,
                          color: "#73838f",
                          flex: 1,
                          marginHorizontal: 10,
                        }}
                      />
                    </ImageBackground>
                    <ImageBackground
                      source={require("../../image/inputedittext.png")}
                      resizeMode={"stretch"}
                      imageStyle={{ height: 28, width: "100%" }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        onChangeText={setAddress}
                        style={{
                          fontSize: 24,
                          color: "#73838f",
                          flex: 1,
                          marginHorizontal: 10,
                        }}
                      />
                    </ImageBackground>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: 5,
                    }}
                  >
                    <ImageBackground
                      source={require("../../image/inputedittext.png")}
                      resizeMode={"stretch"}
                      imageStyle={{ height: 28, width: "100%" }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        onChangeText={setAddress}
                        style={{
                          fontSize: 24,
                          color: "#73838f",
                          flex: 1,
                          marginHorizontal: 10,
                        }}
                      />
                    </ImageBackground>
                    <ImageBackground
                      source={require("../../image/inputedittext.png")}
                      resizeMode={"stretch"}
                      imageStyle={{ height: 28, width: "100%" }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        onChangeText={setAddress}
                        style={{
                          fontSize: 24,
                          color: "#73838f",
                          flex: 1,
                          marginHorizontal: 10,
                        }}
                      />
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_General_title")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  />
                  <RNPickerSelect
                    placeholder={{
                      label: "title",
                      value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    _fixAndroidTouchableBug_={true}
                    style={{
                      ...pickerSelectStyles2,
                      inputAndroidContainer: {
                        width: "100%",
                      },
                    }}
                    onValueChange={setTile}
                    items={[
                      { label: "??????????????????", value: "??????????????????" },
                      { label: "?????????", value: "?????????" },
                      { label: "?????????", value: "?????????" },
                    ]}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        height: 30,
                        marginHorizontal: 20,

                        flexDirection: "row",
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: "#c0c0c0", fontSize: 24 }}>
                          {Title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,

                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          style={{ color: "#73838f" }}
                          name="keyboard-arrow-down"
                          size={16}
                        />
                      </View>
                    </View>
                  </RNPickerSelect>
                </View>
              </View>
              <View style={{ backgroundColor: "#FFFFFF", marginBottom: 15 }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_name")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={serFirstname}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_lastname")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setLastname}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_nickname")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setNickname}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_position")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setPosition}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_email")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setEmail}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_tel")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setTel}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      {I18n.t("translate_Juristic_event")}
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setEvent}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, marginTop: 15, paddingBottom: 20 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#163c70",
                        marginHorizontal: 10,
                      }}
                    >
                      Note
                    </Text>
                  </View>

                  <ImageBackground
                    source={require("../../image/inputedittext.png")}
                    resizeMode={"stretch"}
                    imageStyle={{ height: 28, width: "100%" }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >
                    <TextInput
                      onChangeText={setNote}
                      style={{
                        fontSize: 24,
                        color: "#73838f",
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </ImageBackground>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                  style={{
                    flex: 1,
                    backgroundColor: "#f86767",
                    height: 45,
                    justifyContent: "center",
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      color: "#FFFFFF",
                    }}
                  >
                    {I18n.t("translate_Bt_cancel")}
                  </Text>
                </TouchableOpacity>
                <View style={{ width: 5 }} />
                <TouchableOpacity
                  onPress={() =>
                    _Addjuristic()
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "#2d6dc4",
                    height: 45,
                    justifyContent: "center",
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      color: "#FFFFFF",
                    }}
                  >
                    {I18n.t("translate_Bt_save")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
  getImg: state.authReducer.getImg,
  getStatus: state.dataReducer.getStatus,
  getNotification: state.authReducer.getNotification,
});
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 23,
    color: "#73838f",
    paddingHorizontal: 10,
    justifyContent: "center",

    paddingTop: Platform.OS === "ios" ? 2 : -3,
    paddingBottom: 5,
  },
  inputAndroid: {
    height: 40,
    fontSize: 23,
    color: "#73838f",
    fontWeight: "normal",
    fontFamily: "PSL Kittithada Pro",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 70,
  },
});

export default connect(
  mapStateToProps,
  null
)(AddJuristicScreen);
