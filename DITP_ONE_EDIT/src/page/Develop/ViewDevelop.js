import React from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  Linking,
  AsyncStorage,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import Headers from "../../components/Headers";
import Headers2 from "../../components/Headerstage4";
import Headerstage2 from "../../components/Headerstage2";
import { connect } from "react-redux";
import { CheckBox, Overlay, ListItem } from "react-native-elements";
import {
  getAllDevelop,
  getAllDevelopElearning,
  CheckRegisterActivity,
  RegisterActivity,
} from "../../actions/data.actions";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { getDeepLinkAct } from "../../config/utilities";
import { SendBasket, DeleteBasket } from "../../actions/auth.actions";
import Popover from "react-native-popover-view";
import I18n from "../../utils/I18n";
import Styles from "./Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import SegmentedControlTab from "react-native-segmented-control-tabedit";
import { height } from "../Typeappeal/Styles";
import {ViewScale} from '../../config/ViewScale';
var date = new Date();
var mm = date.getMonth();
var YYDF1 = mm + 1;
class ViewDevelop extends React.Component {
  constructor(props) {
    try {
      AsyncStorage.getItem("language", (err, result) => {
        if (result == "TH") {
          this.setState({ language: "TH" });
        } else {
          this.setState({ language: "EN" });
        }
      });
    } catch (error) {}
    super(props);
    this.state = {
      Selec2: [],
      countYear: [],
      setdefulttear: null,
      Selec: [],
      intext: 0,
      Show: false,
      AllDevelop: [],
      AllDevelopElearning: [],
      isListEnd: false,
      isListEnd2: false,
      loading: false,
      loading2: false,
      fetching_from_server: false,
      fetching_from_server2: false,
      count: "",
      count1: null,
      closePopover: false,
      daparment_name: null,
      officer_name: null,
      deparment_tel: null,
      closePopover: false,
      endregis: null,
      starretgis: null,
      contry_img_flag: null,
      contry_TH: null,
      contry_EN: null,
      selecStartDate: null,
      ckhide2: false,
      valueSelectMMMM: null,
      YYDF: null,
      selectedIndex: 0,

      IDcard:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.naturalId
          : this.props.getUser.userDetails.res_result.naturalId,

      SSOID:
        this.props.getUser.userDetails.res_result.member != undefined
          ? this.props.getUser.userDetails.res_result.ssoid
          : this.props.getUser.userDetails.res_result.ssoid,
    };
    this.offset = 0;
    this.arrayholder = [];
    this.arrayholder2 = [];
  }

  FullDate(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + " " + this.CheckMonthFull(mm) + " " + yyyy;
    return date.toString();
  }
  Call = (number) => {
    console.log(number);
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  onShare = async (value) => {
    console.log("vakkkk", value);
    try {
      const result = await Share.share({
        message: value.activity_list_topic_th,
        url: value.list_register_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t("alert_succeed"));
        } else {
          // shared
          // alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };
  onShareDetali = async (itename, itemregister_url) => {
    // console.log("vakkkk",itemregister_url)
    try {
      const result = await Share.share({
        message: itename,
        url: itemregister_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t("alert_succeed"));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  yearCount() {
    var start_year = date.getFullYear();
    for (var yearDef = start_year; yearDef < start_year + 9; yearDef++) {
      if (I18n.locale === "th") {
        this.state.countYear.push({
          YearN: yearDef + 543,
        });
      } else {
        this.state.countYear.push({
          YearN: yearDef,
        });
      }
      if (I18n.locale === "th") {
        this.state.setdefulttear = start_year + 543;
      } else {
        this.state.setdefulttear = start_year;
      }
      console.log("??????????????????");
      console.log(this.state.setdefulttear);
    }
  }

  CheckMonth = (month) => {
    // console.log(month);
    if (month === null) {
      return "DD-MM";
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "JAN");
      } else if (month === 2) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "FEB");
      } else if (month === 3) {
        return I18n.locale === "th" ? (Month = "??????.???.") : (Month = "MAR");
      } else if (month === 4) {
        return I18n.locale === "th" ? (Month = "??????.???.") : (Month = "APR");
      } else if (month === 5) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "MAY");
      } else if (month === 6) {
        return I18n.locale === "th" ? (Month = "??????.???.") : (Month = "JUN");
      } else if (month === 7) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "JUL");
      } else if (month === 8) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "AUG");
      } else if (month === 9) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "SEP");
      } else if (month === 10) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "OCT");
      } else if (month === 11) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "NOV");
      } else if (month === 12) {
        return I18n.locale === "th" ? (Month = "???.???.") : (Month = "DEC");
      }
    }
  };
  checkMM() {
    var mm = date.getMonth();
    var DFMM = mm + 1;

    if (DFMM === 1) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "??????????????????" })
        : this.setState({ valueSelectMMMM: "January" });
    } else if (DFMM === 2) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "??????????????????????????????" })
        : this.setState({ valueSelectMMMM: "February" });
    } else if (DFMM === 3) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "??????????????????" })
        : this.setState({ valueSelectMMMM: "Murch" });
    } else if (DFMM === 4) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "??????????????????" })
        : this.setState({ valueSelectMMMM: "April" });
    } else if (DFMM === 5) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "????????????????????????" })
        : this.setState({ valueSelectMMMM: "May" });
    } else if (DFMM === 6) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "????????????????????????" })
        : this.setState({ valueSelectMMMM: "June" });
    } else if (DFMM === 7) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "?????????????????????" })
        : this.setState({ valueSelectMMMM: "July" });
    } else if (DFMM === 8) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "?????????????????????" })
        : this.setState({ valueSelectMMMM: "August" });
    } else if (DFMM === 9) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "?????????????????????" })
        : this.setState({ valueSelectMMMM: "September" });
    } else if (DFMM === 10) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "??????????????????" })
        : this.setState({ valueSelectMMMM: "October" });
    } else if (DFMM === 11) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "???????????????????????????" })
        : this.setState({ valueSelectMMMM: "Noverber" });
    } else if (DFMM === 12) {
      I18n.locale === "th"
        ? this.setState({ valueSelectMMMM: "?????????????????????" })
        : this.setState({ valueSelectMMMM: "December" });
    }
  }
  Star_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + " " + this.CheckMonth(mm);
    return date.toString();
  }

  End_Date(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = " - " + dd + " " + this.CheckMonth(mm) + " ";
    return date.toString();
  }

  // Yearend(Viewdate) {
  //   var strSplitDate = String(Viewdate).split(' ');
  //   var date = new Date(strSplitDate[0]);

  //   var yyyy = date.getFullYear() + 543;

  //   return yyyy.toString();
  // }

  Yearend(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);

    var yyyy =
      I18n.locale === "th" ? date.getFullYear() + 543 : date.getFullYear();

    return yyyy.toString();
  }

  CheckMonthFull = (month) => {
    // console.log(month);
    if (month === null) {
      return "DD-MM";
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === "th" ? (Month = "??????????????????") : (Month = "January");
      } else if (month === 2) {
        return I18n.locale === "th"
          ? (Month = "??????????????????????????????")
          : (Month = "February");
      } else if (month === 3) {
        return I18n.locale === "th" ? (Month = "??????????????????") : (Month = "March");
      } else if (month === 4) {
        return I18n.locale === "th" ? (Month = "??????????????????") : (Month = "April");
      } else if (month === 5) {
        return I18n.locale === "th" ? (Month = "?????????????????????") : (Month = "May");
      } else if (month === 6) {
        return I18n.locale === "th" ? (Month = "????????????????????????") : (Month = "June");
      } else if (month === 7) {
        return I18n.locale === "th" ? (Month = "?????????????????????") : (Month = "July");
      } else if (month === 8) {
        return I18n.locale === "th" ? (Month = "?????????????????????") : (Month = "August");
      } else if (month === 9) {
        return I18n.locale === "th"
          ? (Month = "?????????????????????")
          : (Month = "September");
      } else if (month === 10) {
        return I18n.locale === "th" ? (Month = "??????????????????") : (Month = "October");
      } else if (month === 11) {
        return I18n.locale === "th"
          ? (Month = "???????????????????????????")
          : (Month = "November");
      } else if (month === 12) {
        return I18n.locale === "th"
          ? (Month = "?????????????????????")
          : (Month = "December");
      }
    }
  };

  End_DateR(Viewdate) {
    var strSplitDate = String(Viewdate).split(" ");
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = " - " + dd + " " + this.CheckMonth(mm);
    return date.toString();
  }
  renderFooter() {
    return (
      <View
        style={{
          padding: ViewScale(10),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginTop: this.state.AllDevelop.length == 0 ? height * 0.45 : 0,
        }}
      >
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: ViewScale(15) }} />
        ) : (
          <View>
            {this.state.AllDevelop.length == 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: ViewScale(22) }}>
                  {I18n.t("translate_Nodata")}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
  renderFooter1() {
    return (
      <View
        style={{
          padding: ViewScale(10),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginTop:
            this.state.AllDevelopElearning.length == 0 ? height * 0.45 : 0,
        }}
      >
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: ViewScale(15) }} />
        ) : (
          <View>
            {this.state.AllDevelopElearning.length == 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: ViewScale(22) }}>
                  {I18n.t("translate_Nodata")}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }

  // renderFooter() {
  //   return (
  //     <View style={Styles.footer}>
  //       {this.state.fetching_from_server ? (
  //         <ActivityIndicator size="small" color="black" style={{margin: 15}} />
  //       ) : null}
  //     </View>
  //   );
  // }

  _insertRegister = async (values) => {
    try {
      // alert('???????????????', values.activity_code, values.member_cid, values.type);
      const { authData } = this.props;
      const payload = authData.token;
      var tokenActivity = "";
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        RegisterActivity({
          result: {
            activity_code: values.activity_code,
            member_cid: values.member_cid,
            type: values.type,
          },
          token: tokenActivity,
        })
      );
      if (response.res_code === "00") {
        // alert(response.result.pid)
        this.props.navigation.navigate("DevlopRegister", {
          img: values.img,
          StarD_1: values.StarD_1,
          EndD_1: values.EndD_1,
          StarD: values.StarD,
          EndD: values.EndD,
          name: values.name,
          location: values.location,
          detail: values.detail,
          partic: values.partic,
          register: values.register,
          code: values.code,
          price: values.price,
          StatusFa: values.StatusFa,
          index: values.index,
          item1: values.item,
          linklive: values.linklive,
          live: values.live,
          Close: values.Close,
          contry_TH: values.contry_TH,
          contry_img_flag: values.contry_img_flag,
          endregis: values.endregis,
          starretgis: values.starretgis,
          product_category: values.product_category,
          daparment_name: values.daparment_name,
          officer_name: values.officer_name,
          deparment_tel: values.deparment_tel,
          pid: response.result.pid,
          activity_code: values.activity_code,
          member_cid:
            values.member_cid === undefined
              ? this.state.IDcard
              : values.member_cid,
          type: values.type,
          case: 1,
          imgtype:
            values.location === "?????????????????????"
              ? require("../../image/Elearing.png")
              : require("../../image/devlop.png"),
        });
      }
    } catch (error) {}
  };

  _CheckRegister = async (values) => {
    // alert(values.formTypeActivity);

    try {
      // const token = authData.token;
      // this._CheckRegister({activity_code: item.activity_code,member_cid:this.state.IDcard})
      //  console.log('values.member_cid'+JSON.stringify(values) )
      // alert(values.member_cid)
      // const {authData} = this.props;
      const { authData } = this.props;
      const payload = authData.token;
      var tokenActivity = "";
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        CheckRegisterActivity({
          result: {
            activity_code: values.activity_code,
            member_cid: this.state.IDcard,
            type: this.props.getUser.userDetails.res_result.type,
            formTypeActivity:
              values.formTypeActivity === undefined
                ? 1
                : values.formTypeActivity,
          },
          token: tokenActivity,
        })
      );

      console.log("FFFFffffresponseDDDDnew", response);

      if (response.res_code === "00") {
        console.log("Register !!!");

        this.setState({ CheckStatus: response.result.status });

        console.log("response.result.pidnew1dddddd");

        console.log(response.result.pid);
        console.log(values.activity_code);
        console.log(this.state.IDcard);

        // alert(response.result.message)

        if (response.result.pid != 0 && response.result.status === false) {
          // alert('case 1')
          alert(response.result.message);

          this.props.navigation.navigate("DevlopRegister", {
            img: values.img,
            StarD_1: values.StarD_1,
            EndD_1: values.EndD_1,
            StarD: values.StarD,
            EndD: values.EndD,
            name: values.name,
            location: values.location,
            detail: values.detail,
            partic: values.partic,
            register: values.register,
            code: values.code,
            price: values.price,
            StatusFa: values.StatusFa,
            index: values.index,
            item1: values.item,
            linklive: values.linklive,
            live: values.live,
            Close: values.Close,
            contry_TH: values.contry_TH,
            contry_img_flag: values.contry_img_flag,
            endregis: values.endregis,
            starretgis: values.starretgis,
            product_category: values.product_category,
            daparment_name: values.daparment_name,
            officer_name: values.officer_name,
            deparment_tel: values.deparment_tel,
            pid: response.result.pid,
            activity_code: values.activity_code,
            member_cid:
              values.member_cid === undefined
                ? this.state.IDcard
                : values.member_cid,
            type: values.type,
            case: 1,
            formTypeActivity: values.formTypeActivity,
            imgtype:
              values.location === "?????????????????????"
                ? require("../../image/Elearing.png")
                : require("../../image/devlop.png"),
          });
        } else if (
          response.result.pid === 0 &&
          response.result.status === true
        ) {
          // alert(response.result.message)

          Alert.alert(
            response.result.message,
            "",
            [
              {
                text: I18n.t("translate_Cancel"),
                onPress: () => console.log("OK cancel"),
              },
              {
                text: I18n.t("translate_Accept"),
                onPress: () => this._insertRegister(values),
                // console.log('OK Pressed'),

                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        } else {
          alert(response.result.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  _getAllDevelop = async (values) => {
    var mm = date.getFullYear();
    console.log(
      ";",
      this.state.YYDF,
      this.state.valueSelectMouthdev + 1,
      this.state.valueSelectActivity3dev - 543,
      mm
    );
    try {
      if (!this.state.fetching_from_server && !this.state.isListEnd) {
        this.setState({ fetching_from_server: true }, async () => {
          try {
            const num = this.offset;
            this.response = await this.props.dispatch(
              getAllDevelop({
                results: {
                  offset: num * 10,

                  month:
                    this.state.valueSelectMouthdev === undefined
                      ? this.state.YYDF
                      : this.state.valueSelectMouthdev + 1,
                  year:
                    this.state.valueSelectActivity3dev === undefined
                      ? ""
                      : this.state.language === "TH"
                      ? this.state.valueSelectActivity3dev - 543
                      : this.state.valueSelectActivity3dev,
                  text_search: "",
                },
                token: this.props.authData.token,
              })
            );

            if (this.response.res_code === "00") {
              if (this.response.result.length > 0) {
                this.offset = this.offset + 1;
                this.setState({
                  AllDevelop: [
                    ...this.state.AllDevelop,
                    ...this.response.result,
                  ],
                  CheckRecom: [
                    ...this.state.AllDevelop,
                    ...this.response.result,
                  ],
                  count: this.response.sum_result,
                  fetching_from_server: false,
                });
                this.arrayholder = this.state.AllDevelop;
                // console.log(this.response.result.length);
                this.state.AllDevelop.map((data) => {
                  this.state.selec[data.activity_code] = data.status_basket;
                });
              } else {
                this.setState({
                  fetching_from_server: false,
                  isListEnd: true,
                });
                this.arrayholder = this.state.AllDevelop;
              }
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
            // console.log(this.response);
          } catch (error) {}
        });
      }
    } catch (error) {}
  };
  _getAllDevelopElearning = async (values) => {
    var mm = date.getFullYear();
    // const YY = parseInt(this.state.valueSelectActivity3dev)
    // alert(YY - 543)
    console.log(this.state.valueSelectMouthdev + "<=>" + this.state.YYDF);
    try {
      if (!this.state.fetching_from_server2 && !this.state.isListEnd2) {
        this.setState({ fetching_from_server2: true }, async () => {
          try {
            const num = this.offset;
            this.response = await this.props.dispatch(
              getAllDevelopElearning({
                results: {
                  offset: num * 10,

                  month:
                    this.state.valueSelectMouthdevE === undefined ||
                    this.state.valueSelectMouthdevE === 0
                      ? ""
                      : this.state.valueSelectMouthdevE,
                  year:
                    this.state.valueSelectActivity3dev === undefined
                      ? ""
                      : I18n.locale === "th"
                      ? this.state.valueSelectActivity3dev - 543
                      : this.state.valueSelectActivity3dev,
                  text_search: "",
                },
                token: this.props.authData.token,
              })
            );

            if (this.response.res_code === "00") {
              if (this.response.result.length > 0) {
                this.offset = this.offset + 1;
                this.setState({
                  AllDevelopElearning: [
                    ...this.state.AllDevelopElearning,
                    ...this.response.result,
                  ],
                  CheckRecom2: [
                    ...this.state.AllDevelopElearning,
                    ...this.response.result,
                  ],
                  count1: this.response.sum_result,
                  fetching_from_server2: false,
                });
                this.arrayholder2 = this.state.AllDevelopElearning;
                // console.log(this.response.result.length);

                this.state.AllDevelopElearning.map((data) => {
                  this.state.Selec2[data.activity_code] = data.status_basket;
                });
              } else {
                this.setState({
                  fetching_from_server2: false,
                  isListEnd2: true,
                });
                this.arrayholder2 = this.state.AllDevelopElearning;
              }
            } else {
              this.setState({
                fetching_from_server2: false,
                isListEnd2: true,
              });
            }
            // console.log(this.response);
          } catch (error) {}
        });
      }
    } catch (error) {}
  };

  SearchSubmit = (e) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // console.log(newData);
    this.setState({ AllDevelop: newData });
  };
  SearchSubmit2 = (e) => {
    const newData = this.arrayholder2.filter((item) => {
      const itemData = `${item.activity_list_topic_th.toUpperCase()}${item.activity_list_topic_en.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // console.log(newData);
    this.setState({ AllDevelopElearning: newData });
  };

  _SendBasket = async (values) => {
    // alert(values.code1);
    try {
      const { authData } = this.props;
      const payload = authData.token;
      var tokenActivity = "";
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }
      const response = await this.props.dispatch(
        SendBasket({
          results: {
            basket_code: values.code1,
            basket_type: "2",
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        })
      );
      if (values.check == 1) {
        // alert('')
        if (response.res_code === "00") {
          this.setState({
            isListEnd: false,
            loading: false,
            fetching_from_server: false,
            AllDevelop: [],
            Selec: [],
          });
          this.offset = 0;
          this._getAllDevelop();
        }
      }
      // console.log(response);
    } catch (error) {}
  };

  Selecitem = ({ index, item }) => {
    console.log("SelecitemSelecitemSelecitem", item.activity_code);
    let { Selec, DataTopPick } = this.state;
    Selec[index] = !Selec[index];
    this.setState({ Selec: Selec });
    if (Selec[index] === true) {
      console.log("?????????", item.activity_code);
      return this._SendBasket({ code1: item.activity_code });
    } else {
      console.log("??????", item.activity_code);
      return this._DeleteBasket({ code1: item.activity_code });
    }
  };

  Selecitem2 = ({ index, item }) => {
    // alert('Selecitem2Ficii'+item.activity_code);
    let { Selec2, DataTopPick } = this.state;
    Selec2[index] = !Selec2[index];
    this.setState({ Selec2: Selec2 });
    if (Selec2[index] === true) {
      console.log("?????????", item.activity_code);
      return this._SendBasket({ code1: item.activity_code });
    } else {
      console.log("??????", item.activity_code);
      return this._DeleteBasket({ code1: item.activity_code });
    }
  };

  _DeleteBasket = async (values) => {
    console.log("delete", values);
    try {
      var tokenActivity = "";
      if (this.props.getUser.userDetails.res_result.type == 6) {
        tokenActivity = this.props.authData.token.res_result.token;
      } else {
        tokenActivity = this.props.authData.token;
      }

      const response = await this.props.dispatch(
        DeleteBasket({
          results: {
            basket: [
              {
                basket_code: values.code1,
                basket_type: "2",
              },
            ],
          },
          token: tokenActivity,
          type: this.props.getUser.userDetails.res_result.type,
        })
      );
      if (values.check == 1) {
        if (response.res_code === "00") {
          // this._getAllDevelop();

          this.setState({
            isListEnd: false,
            loading: false,
            fetching_from_server: false,
            AllDevelop: [],
            Selec2: [],
          });
          this.offset = 0;
          this._getAllDevelop();
        }
      }
      console.log(response, "Delete");
    } catch (error) {}
  };

  web(item) {
    var uri = item.split("/");
    console.log(uri[10]);
    return uri[10];
    // return item.substring(83, 88);
  }

  async openLink(item) {
    console.log(item);
    const Token = this.props.authData.token;
    const userDrive = this.props.getUser.userDetails.res_result.userID_drive;
    const deepLink = getDeepLinkAct();
    const url = `https://drive.ditp.go.th/th-th/signin?type=3&activityid=${item}&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    console.log(url);

    const headers = {};
    const client_id = {};
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deepLink, {
          // iOS Properties
          dismissButtonStyle: "cancel",
          preferredBarTintColor: "#453AA4",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "fullScreen",
          modalTransitionStyle: "partialCurl",
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: "#6200EE",
          secondaryToolbarColor: "black",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

  SelecItemStatus = (item) => {
    // console.log(item);
    let { AllDevelop } = this.state;

    AllDevelop = AllDevelop.map((e) => {
      if (item.status_basket === e.status_basket) {
        item.status_basket = "Y";

        return item;
      } else {
        e.status_basket = "N";
        return e;
      }
    });
    // this.setState({Detail});
  };

  SelecItemStatus2 = (item) => {
    // console.log(item);
    let { AllDevelopElearning } = this.state;

    AllDevelopElearning = AllDevelopElearning.map((e) => {
      if (item.status_basket === e.status_basket) {
        item.status_basket = "Y";

        return item;
      } else {
        e.status_basket = "N";
        return e;
      }
    });
    // this.setState({Detail});
  };

  Listre = ({ item, index }) => {
    if (item.status_basket === true) {
      this.state.Selec.push(true);
    }
    if (item.status_basket === false) {
      this.state.Selec.push(false);
    }

    return (
      <View style={{ backgroundColor: "#f7f9fc" }}>
        <ListItem
          containerStyle={{
            marginBottom:ViewScale(8),
            borderRadius: ViewScale(10),
            alignSelf: "center",
            flex: 1,
            width: "95%",
            // shadowColor: '#f4f6fa ',
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },=j;
            // shadowOpacity: 0.18,
            // shadowRadius: 1.00,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          style={{
            width: "100%",
            height: null,
            flex: 1,

            backgroundColor: "#f4f5f850",
          }}
          leftAvatar={
            <View style={[Styles.alignItemsCenter, { flex: 0.4 }]}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() =>
                    this.setState({
                      Show: !this.state.Show,
                      img: item.activity_list_logo_banner,
                      StarD_1: item.activity_list_start_date,
                      EndD_1: item.activity_list_end_date,
                      StarD: this.FullDate(item.activity_list_start_date),
                      EndD: this.FullDate(item.activity_list_end_date),
                      name:
                        I18n.locale === "th"
                          ? item.activity_list_topic_th
                          : item.activity_list_topic_en,
                      location:
                        I18n.locale === "th"
                          ? item.activity_list_location_th
                          : item.activity_list_topic_en,
                      detail: item.activity_list_desc_th,
                      partic: item.max_of_participate,
                      register: item.list_register_url,
                      code: item.activity_code,
                      Close: item.active_status,
                      price:
                        I18n.locale === "th"
                          ? item.activity_price_th
                          : item.activity_price_en,
                      StatusFa: this.state.Selec[index] === true ? true : false,
                      linklive: item.activity_list_live_url,
                      live: item.status_live,
                      contry_TH:
                        I18n.locale === "th"
                          ? item.list_country_name_th
                          : item.list_country_name_en,

                      contry_img_flag: item.img_flag,
                      endregis: this.FullDate(item.activity_list_end_regis),
                      starretgis: this.FullDate(item.activity_list_start_regis),
                      product_category: item.activity_product_category,
                      daparment_name: item.activity_list_department_name,
                      officer_name: item.activity_list_officer_name,
                      deparment_tel: item.activity_list_department_tel,
                      url: item.list_register_url,
                      formTypeActivity: item.formTypeActivity,
                    })
                  }
                >
                  {/* <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 60, height: 55, borderRadius: 15}}
                  /> */}
                  <Image
                    source={require("../../image/devlop.png")}
                    style={{ width:ViewScale(55), height:ViewScale(50), borderRadius: ViewScale(15) }}
                  />
                  <Text style={Styles.textactivityDate}>
                    {this.Star_Date(item.activity_list_start_date)}
                    {this.End_Date(item.activity_list_end_date)}{" "}
                    {this.Yearend(item.activity_list_end_date)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          title={
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "83%" }}>
                  <Text
                    onPress={() =>
                      this.setState({
                        Show: !this.state.Show,
                        img: item.activity_list_logo_banner,
                        StarD_1: item.activity_list_start_date,
                        EndD_1: item.activity_list_end_date,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
                        name:
                          I18n.locale === "th"
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        location:
                          I18n.locale === "th"
                            ? item.activity_list_location_th
                            : item.activity_list_topic_en,
                        detail: item.activity_list_desc_th,
                        partic: item.max_of_participate,
                        register: item.list_register_url,
                        code: item.activity_code,
                        Close: item.active_status,
                        price:
                          I18n.locale === "th"
                            ? item.activity_price_th
                            : item.activity_price_en,
                        StatusFa:
                          this.state.Selec[index] === true ? true : false,
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        contry_TH:
                          I18n.locale === "th"
                            ? item.list_country_name_th
                            : item.list_country_name_en,

                        contry_img_flag: item.img_flag,
                        endregis: this.FullDate(item.activity_list_end_regis),
                        starretgis: this.FullDate(
                          item.activity_list_start_regis
                        ),
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        url: item.list_register_url,
                        formTypeActivity: item.formTypeActivity,
                      })
                    }
                    numberOfLines={2}
                    style={Styles.textActivityTitl}
                  >
                    {I18n.locale === "th"
                      ? item.activity_list_topic_th
                      : item.activity_list_topic_en}
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    bottom: ViewScale(10),
                  }}
                >
                  <CheckBox
                    checkedIcon={
                      <Image
                        style={{ width: ViewScale(25), height: ViewScale(25), top: ViewScale(-10) }}
                        source={require("../../image/PickerMarket.png")}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={{ width: ViewScale(25), height: ViewScale(25), top: ViewScale(-10) }}
                        source={require("../../image/shoping.png")}
                      />
                    }
                    checked={this.state.Selec[index]}
                    onPress={() => {
                      this.SelecItemStatus(item);
                      this.Selecitem({ item: item, index: index });
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row", marginTop: ViewScale(5),}}>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                  }}
                >
                  {item.activity_list_location_th === "?????????????????????" ? (
                    <Image
                      style={{ width: ViewScale(13), height: ViewScale(14), top: ViewScale(3) }}
                      source={require("../../image/WWW.png")}
                    />
                  ) : (
                    <Image
                      style={{ width: ViewScale(13), height: ViewScale(14), top: ViewScale(3) }}
                      source={require("../../image/makerlocation.png")}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 1.4,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                  }}
                >
                  <Text numberOfLines={2} style={Styles.textactivityloca}>
                    {" "}
                    {I18n.locale === "th"
                      ? item.activity_list_location_th
                      : item.activity_list_location_en}
                  </Text>
                </View>
              </View>
            </View>
          }
          subtitle={
            <View style={[Styles.ViewSub10, { marginTop: 15, flex: 1 }]}>
              {/* {this.props.getStatus1.isResult.status_confirm_identity
                .status_code != 0 &&
              this.props.getStatus1.isResult.status_confirm_identity
                .status_code != 1 ? ( */}
              <View>
                {this.props.getUser.userDetails.res_result.type != 6 &&
                this.props.getUser.userDetails.res_result.type != 4 ? (
                  <TouchableOpacity
                    disabled={item.active_status === false}
                    onPress={() => {
                      if (
                        this.props.getStatus1.isResult.status_confirm_identity
                          .status_code === 0
                      ) {
                        // alert('???????????????????????????????????????????????? ')
                        this.props.navigation.navigate("Identity");
                      } else if (
                        this.props.getStatus1.isResult.status_confirm_identity
                          .status_code === 1
                      ) {
                        alert(I18n.t("alert_Data_verification_progress"));
                      } else {
                        this._CheckRegister({
                          activity_code: item.activity_code,
                          member_cid: this.state.IDcard,
                          type: this.props.getUser.userDetails.res_result.type,
                          formTypeActivity: item.formTypeActivity,
                          img: item.activity_list_logo_banner,
                          StarD_1: item.activity_list_start_date,
                          EndD_1: item.activity_list_end_date,
                          StarD: this.FullDate(item.activity_list_start_date),
                          EndD: this.FullDate(item.activity_list_end_date),
                          name:
                            I18n.locale === "th"
                              ? item.activity_list_topic_th
                              : item.activity_list_topic_en,
                          location:
                            I18n.locale === "th"
                              ? item.activity_list_location_th
                              : item.activity_list_topic_en,
                          detail: item.activity_list_desc_th,
                          partic: item.max_of_participate,
                          register: item.list_register_url,
                          code: item.activity_code,
                          price:
                            I18n.locale === "th"
                              ? item.activity_price_th
                              : item.activity_price_en,
                          StatusFa: this.state.Selec[item.activity_code],
                          index: index,
                          item1: item,
                          linklive: item.activity_list_live_url,
                          live: item.status_live,
                          Close: item.active_status,
                          contry_TH:
                            I18n.locale === "th"
                              ? item.list_country_name_th
                              : item.list_country_name_en,

                          contry_img_flag: item.img_flag,
                          endregis: this.FullDate(item.activity_list_end_regis),
                          starretgis: this.FullDate(
                            item.activity_list_start_regis
                          ),
                          product_category: item.activity_product_category,
                          daparment_name: item.activity_list_department_name,
                          officer_name: item.activity_list_officer_name,
                          deparment_tel: item.activity_list_department_tel,
                          imgtype: require("../../image/devlop.png"),
                        });
                      }
                    }}
                    style={
                      item.active_status === true
                        ? Styles.TouchSub2
                        : Styles.TouchSub5
                    }
                  >
                    <Text style={Styles.textactivityregister}>
                      {item.active_status === true
                        ? I18n.t("translate_Apply_activities")
                        : I18n.t("translate_Applacation")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
              {/* ) : (
                <View />
              )} */}

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    Show: !this.state.Show,
                    img: item.activity_list_logo_banner,
                    StarD_1: item.activity_list_start_date,
                    EndD_1: item.activity_list_end_date,
                    StarD: this.FullDate(item.activity_list_start_date),
                    EndD: this.FullDate(item.activity_list_end_date),
                    name:
                      I18n.locale === "th"
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en,
                    location:
                      I18n.locale === "th"
                        ? item.activity_list_location_th
                        : item.activity_list_topic_en,
                    detail: item.activity_list_desc_th,
                    partic: item.max_of_participate,
                    register: item.list_register_url,
                    code: item.activity_code,
                    Close: item.active_status,
                    price:
                      I18n.locale === "th"
                        ? item.activity_price_th
                        : item.activity_price_en,
                    StatusFa: this.state.Selec[index] === true ? true : false,
                    linklive: item.activity_list_live_url,
                    live: item.status_live,
                    contry_TH:
                      I18n.locale === "th"
                        ? item.list_country_name_th
                        : item.list_country_name_en,

                    contry_img_flag: item.img_flag,
                    endregis: this.FullDate(item.activity_list_end_regis),
                    starretgis: this.FullDate(item.activity_list_start_regis),
                    product_category: item.activity_product_category,
                    daparment_name: item.activity_list_department_name,
                    officer_name: item.activity_list_officer_name,
                    deparment_tel: item.activity_list_department_tel,
                    url: item.list_register_url,
                    formTypeActivity: item.formTypeActivity,
                  })
                }
                //  hitSlop={{top: 20, bottom: 20, left: 50, right: 50,borderWidth:1}}
                style={Styles.TouchRead}
              >
                <Image
                  style={{ width: ViewScale(17), height: ViewScale(13) }}
                  source={require("../../image/readDetail.png")}
                />
                <Text style={Styles.textreaddetail}>
                  {" "}
                  {I18n.t("translate_Readmore")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onShare(item);
                }}
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ width: 14, height: 16 }}
                  source={require("../../image/sharelx.png")}
                />
              </TouchableOpacity>

              {item.status_live === "C" && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#334c6e" }}>
                        {I18n.t("translate_Prepare")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {item.status_live === "Y" && (
                <TouchableOpacity
                  style={{}}
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#ff5e5e" }}>
                        {I18n.t("translate_OnAir")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {item.status_live === "B" && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#b7b7b7" }}>
                        {I18n.t("translate_returnBack")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
    );
  };
  ListreElearing = ({ item, index }) => {
    if (item.status_basket === true) {
      this.state.Selec2.push(true);
    }
    if (item.status_basket === false) {
      this.state.Selec2.push(false);
    }

    return (
      <View style={{ backgroundColor: "#f7f9fc" }}>
        <ListItem
          containerStyle={{
            marginBottom: ViewScale(8),
            borderRadius: ViewScale(10),
            alignSelf: "center",
            flex: 1,
            width: "95%",
            // shadowColor: '#f4f6fa ',
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },=j;
            // shadowOpacity: 0.18,
            // shadowRadius: 1.00,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          style={{
            width: "100%",
            height: null,
            flex: 1,

            backgroundColor: "#f4f5f850",
          }}
          leftAvatar={
            <View style={[Styles.alignItemsCenter, { flex: 0.4 }]}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() =>
                    this.setState({
                      Show: !this.state.Show,
                      img: item.activity_list_logo_banner,
                      StarD_1: item.activity_list_start_date,
                      EndD_1: item.activity_list_end_date,
                      StarD: this.FullDate(item.activity_list_start_date),
                      EndD: this.FullDate(item.activity_list_end_date),
                      name:
                        I18n.locale === "th"
                          ? item.activity_list_topic_th
                          : item.activity_list_topic_en,
                      location:
                        I18n.locale === "th"
                          ? item.activity_list_location_th
                          : item.activity_list_topic_en,
                      detail: item.activity_list_desc_th,
                      partic: item.max_of_participate,
                      register: item.list_register_url,
                      code: item.activity_code,
                      Close: item.active_status,
                      price:
                        I18n.locale === "th"
                          ? item.activity_price_th
                          : item.activity_price_en,
                      StatusFa:
                        this.state.Selec2[index] === true ? true : false,
                      linklive: item.activity_list_live_url,
                      live: item.status_live,
                      contry_TH:
                        I18n.locale === "th"
                          ? item.list_country_name_th
                          : item.list_country_name_en,

                      contry_img_flag: item.img_flag,
                      endregis: this.FullDate(item.activity_list_end_regis),
                      starretgis: this.FullDate(item.activity_list_start_regis),
                      product_category: item.activity_product_category,
                      daparment_name: item.activity_list_department_name,
                      officer_name: item.activity_list_officer_name,
                      deparment_tel: item.activity_list_department_tel,
                      url: item.list_register_url,
                      formTypeActivity: item.formTypeActivity,
                    })
                  }
                >
                  {/* <Image
                    source={{uri: item.activity_list_logo_thumb}}
                    style={{width: 60, height: 55, borderRadius: 15}}
                  /> */}
                  <Image
                    source={require("../../image/Elearing.png")}
                    style={{ width: 55, height: 50, borderRadius: 15 }}
                  />
                  <Text style={Styles.textactivityDate}>
                    {this.Star_Date(item.activity_list_start_date)}
                    {this.End_Date(item.activity_list_end_date)}{" "}
                    {this.Yearend(item.activity_list_end_date)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          title={
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "83%" }}>
                  <Text
                    onPress={() =>
                      this.setState({
                        Show: !this.state.Show,
                        img: item.activity_list_logo_banner,
                        StarD: this.FullDate(item.activity_list_start_date),
                        EndD: this.FullDate(item.activity_list_end_date),
                        name:
                          I18n.locale === "th"
                            ? item.activity_list_topic_th
                            : item.activity_list_topic_en,
                        location:
                          I18n.locale === "th"
                            ? item.activity_list_location_th
                            : item.activity_list_topic_en,
                        detail: item.activity_list_desc_th,
                        partic: item.max_of_participate,
                        register: item.list_register_url,
                        code: item.activity_code,
                        Close: item.active_status,
                        price:
                          I18n.locale === "th"
                            ? item.activity_price_th
                            : item.activity_price_en,
                        StatusFa:
                          this.state.Selec2[index] === true ? true : false,
                        linklive: item.activity_list_live_url,
                        live: item.status_live,
                        contry_TH:
                          I18n.locale === "th"
                            ? item.list_country_name_th
                            : item.list_country_name_en,

                        contry_img_flag: item.img_flag,
                        endregis: this.FullDate(item.activity_list_end_regis),
                        starretgis: this.FullDate(
                          item.activity_list_start_regis
                        ),
                        product_category: item.activity_product_category,
                        daparment_name: item.activity_list_department_name,
                        officer_name: item.activity_list_officer_name,
                        deparment_tel: item.activity_list_department_tel,
                        url: item.list_register_url,
                        formTypeActivity: item.formTypeActivity,
                      })
                    }
                    numberOfLines={2}
                    style={Styles.textActivityTitl}
                  >
                    {I18n.locale === "th"
                      ? item.activity_list_topic_th
                      : item.activity_list_topic_en}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    bottom: ViewScale(10),
                  }}
                >
                  <CheckBox
                    checkedIcon={
                      <Image
                        style={{ width: ViewScale(25), height: ViewScale(25), top: ViewScale(-10) }}
                        source={require("../../image/PickerMarket.png")}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={{ width: ViewScale(25), height: ViewScale(25), top: ViewScale(-10) }}
                        source={require("../../image/shoping.png")}
                      />
                    }
                    checked={this.state.Selec2[index]}
                    onPress={() => {
                      this.SelecItemStatus2(item);
                      this.Selecitem2({ item: item, index: index });
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    alignItems: "center",

                    alignSelf: "flex-start",
                  }}
                >
                  {item.activity_list_location_th === "?????????????????????" ? (
                    <Image
                      style={{ width: ViewScale(13), height: ViewScale(13), top: ViewScale(3) }}
                      source={require("../../image/WWW.png")}
                    />
                  ) : (
                    <Image
                      style={{ width: ViewScale(9), height: ViewScale(12), top: ViewScale(3) }}
                      source={require("../../image/makerlocation.png")}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 1.4,
                    flexDirection: "row",
                    alignItems: "center",

                    alignSelf: "flex-start",
                  }}
                >
                  <Text numberOfLines={2} style={Styles.textactivityloca}>
                    {" "}
                    {I18n.locale === "th"
                      ? item.activity_list_location_th
                      : item.activity_list_location_en}
                  </Text>
                </View>
              </View>
            </View>
          }
          subtitle={
            <View style={[Styles.ViewSub10, { marginTop: ViewScale(15), flex: 1 }]}>
              {/* {this.props.getStatus1.isResult.status_confirm_identity
                .status_code != 0 &&
              this.props.getStatus1.isResult.status_confirm_identity
                .status_code != 1 ? ( */}
              <View>
                {this.props.getUser.userDetails.res_result.type != 6 &&
                this.props.getUser.userDetails.res_result.type != 4 ? (
                  <TouchableOpacity
                    disabled={item.active_status === false}
                    onPress={() => {
                      if (
                        this.props.getStatus1.isResult.status_confirm_identity
                          .status_code === 0
                      ) {
                        // alert('???????????????????????????????????????????????? ')
                        this.props.navigation.navigate("Identity");
                      } else if (
                        this.props.getStatus1.isResult.status_confirm_identity
                          .status_code === 1
                      ) {
                        alert(I18n.t("alert_Data_verification_progress"));
                      } else {
                        this._CheckRegister({
                          activity_code: item.activity_code,
                          member_cid: this.state.IDcard,
                          type: this.props.getUser.userDetails.res_result.type,
                          formTypeActivity: item.formTypeActivity,
                          img: item.activity_list_logo_banner,
                          StarD_1: item.activity_list_start_date,
                          EndD_1: item.activity_list_end_date,
                          StarD: this.FullDate(item.activity_list_start_date),
                          EndD: this.FullDate(item.activity_list_end_date),
                          name:
                            I18n.locale === "th"
                              ? item.activity_list_topic_th
                              : item.activity_list_topic_en,
                          location:
                            I18n.locale === "th"
                              ? item.activity_list_location_th
                              : item.activity_list_topic_en,
                          detail: item.activity_list_desc_th,
                          partic: item.max_of_participate,
                          register: item.list_register_url,
                          code: item.activity_code,
                          price:
                            I18n.locale === "th"
                              ? item.activity_price_th
                              : item.activity_price_en,
                          StatusFa: this.state.Selec2[item.activity_code],
                          index: index,
                          item1: item,
                          linklive: item.activity_list_live_url,
                          live: item.status_live,
                          Close: item.active_status,
                          contry_TH:
                            I18n.locale === "th"
                              ? item.list_country_name_th
                              : item.list_country_name_en,

                          contry_img_flag: item.img_flag,
                          endregis: this.FullDate(item.activity_list_end_regis),
                          starretgis: this.FullDate(
                            item.activity_list_start_regis
                          ),
                          product_category: item.activity_product_category,
                          daparment_name: item.activity_list_department_name,
                          officer_name: item.activity_list_officer_name,
                          deparment_tel: item.activity_list_department_tel,
                          imgtype: require("../../image/Elearing.png"),
                          formTypeActivity: item.formTypeActivity,
                        });
                      }
                    }}
                    style={
                      item.active_status === true
                        ? Styles.TouchSub2
                        : Styles.TouchSub5
                    }
                  >
                    <Text style={Styles.textactivityregister}>
                      {item.active_status === true
                        ? I18n.t("translate_Apply_activities")
                        : I18n.t("translate_Applacation")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
              {/* ) : (
                <View />
              )} */}

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    Show: !this.state.Show,
                    img: item.activity_list_logo_banner,
                    StarD_1: item.activity_list_start_date,
                    EndD_1: item.activity_list_end_date,
                    StarD: this.FullDate(item.activity_list_start_date),
                    EndD: this.FullDate(item.activity_list_end_date),
                    name:
                      I18n.locale === "th"
                        ? item.activity_list_topic_th
                        : item.activity_list_topic_en,
                    location:
                      I18n.locale === "th"
                        ? item.activity_list_location_th
                        : item.activity_list_topic_en,
                    detail: item.activity_list_desc_th,
                    partic: item.max_of_participate,
                    register: item.list_register_url,
                    code: item.activity_code,
                    Close: item.active_status,
                    price:
                      I18n.locale === "th"
                        ? item.activity_price_th
                        : item.activity_price_en,
                    StatusFa: this.state.Selec2[index] === true ? true : false,
                    linklive: item.activity_list_live_url,
                    live: item.status_live,
                    contry_TH:
                      I18n.locale === "th"
                        ? item.list_country_name_th
                        : item.list_country_name_en,

                    contry_img_flag: item.img_flag,
                    endregis: this.FullDate(item.activity_list_end_regis),
                    starretgis: this.FullDate(item.activity_list_start_regis),
                    product_category: item.activity_product_category,
                    daparment_name: item.activity_list_department_name,
                    officer_name: item.activity_list_officer_name,
                    deparment_tel: item.activity_list_department_tel,
                    url: item.list_register_url,
                    formTypeActivity: item.formTypeActivity,
                  })
                }
                //  hitSlop={{top: 20, bottom: 20, left: 50, right: 50,borderWidth:1}}
                style={Styles.TouchRead}
              >
                <Image
                  style={{ width: ViewScale(17), height: ViewScale(13) }}
                  source={require("../../image/readDetail.png")}
                />
                <Text style={Styles.textreaddetail}>
                  {" "}
                  {I18n.t("translate_Readmore")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onShare(item);
                }}
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ width: (14), height: (16) }}
                  source={require("../../image/sharelx.png")}
                />
              </TouchableOpacity>

              {item.status_live === "C" && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#334c6e" }}>
                        {I18n.t("translate_Prepare")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {item.status_live === "Y" && (
                <TouchableOpacity
                  style={{}}
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#ff5e5e" }}>
                        {I18n.t("translate_OnAir")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {item.status_live === "B" && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.activity_list_live_url)}
                >
                  <View
                    style={[
                      Styles.ViewSub3,
                      { right: ViewScale(10), justifyContent: "center" },
                    ]}
                  >
                    <Image
                      style={{ width: ViewScale(26), height: ViewScale(15) }}
                      source={require("../../image/liveme.png")}
                    />
                    <View style={{ bottom: ViewScale(13), right: ViewScale(22) }}>
                      <Text style={{ fontSize: ViewScale(10), color: "#b7b7b7" }}>
                        {I18n.t("translate_returnBack")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
    );
  };

  componentDidMount() {
    this._getAllDevelop();
    this._getAllDevelopElearning();
    this.yearCount();
    this.checkMM();
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    const { AllDevelop, AllDevelopElearning } = this.state;
    // console.log(AllDevelop);
    return (
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        {/* <Headers
          
          navigation={this.props.navigation}
          backScreen={true}
        /> */}
        {/* <View style={{marginTop: Platform.OS === 'android' && 90}} /> */}
        {/* <Headerstage2
          nameTab={I18n.t('translate_Develop_title')}
          nameTab2={this.state.AllDevelop.length+this.state.AllDevelopElearning.length}
          // nameTab2={4}
        /> */}
        {/* <View style={{marginTop: Platform.OS === 'android' && 90}} /> */}

        {this.state.Show === true && (
          <Overlay
            backdropStyle={{ backgroundColor: "#2d6dc480" }}
            onBackdropPress={() => this.setState({ Show: false })}
            isVisible={this.state.Show}
          >
            <View style={Styles.OverlayHight}>
              <View style={Styles.OverlayView1}>
                <TouchableOpacity
                // style={{backgroundColor: 'red'}}
                  onPress={() => this.setState({ Show: false })}
                >
                  <Image
                    style={Styles.ImgClose}
                    source={require("../../image/closemenu.png")}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={Styles.OverlayView2}>
                  <View style={Styles.OverlayView3}>
                    {this.state.img != "" ? (
                      <Image
                        resizeMode={"cover"}
                        style={{ width: ViewScale(334), height: ViewScale(216) }}
                        source={{ uri: this.state.img }}
                      />
                    ) : (
                      <Image
                        resizeMode={"contain"}
                        style={{ width: "100%", height: ViewScale(216) }}
                        source={require("../../image/banerDrive.png")}
                      />
                    )}
                  </View>
                  <View style={{ margin: ViewScale(10) }}>
                    <Text style={Styles.popupTextTitle}>{this.state.name}</Text>
                    <Text style={Styles.opoupTextData1}>
                      {this.state.StarD} - {this.state.EndD}
                    </Text>
                    <Text style={Styles.opoupTextData1}>
                      {I18n.t("translate_DataRegister")} :{" "}
                      {this.state.starretgis} - {this.state.endregis}{" "}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Image
                          style={{ width: ViewScale(18), height: ViewScale(13), top: ViewScale(4) }}
                          source={{ uri: this.state.contry_img_flag }}
                        />
                        <Text style={Styles.popupTextloca}>
                          {"  "}
                          {this.state.contry_TH}
                        </Text>
                      </View>
                      <View style={{ flex: 0.3 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#2d6dc4",

                            borderRadius: ViewScale(11),
                          }}
                        >
                          <Text style={Styles.popupTextMap}>
                            {I18n.t("transalte_map")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {this.state.location === "?????????????????????" ? (
                        <Image
                          style={{ width: ViewScale(12), height: ViewScale(12), top: ViewScale(0) }}
                          source={require("../../image/WWW.png")}
                        />
                      ) : (
                        <Image
                          style={{ width: ViewScale(9), height: ViewScale(12) }}
                          source={require("../../image/maker2.png")}
                        />
                      )}
                      {/* <Image
                        style={{width: 7, height: 11}}
                        source={require('../../image/maker2.png')}
                      /> */}
                      <Text style={Styles.popupTextloca}>
                        {"  "}
                        {this.state.location}
                      </Text>
                    </View>
                    <View style={{ marginTop: ViewScale(10) }}>
                      <Text style={Styles.opoupTextData1}>
                        {I18n.t("translate_ActPrice")} : {this.state.price}
                      </Text>
                    </View>
                    <View style={{ marginTop: 0 }}>
                      <Text style={Styles.opoupTextData1}>
                        {I18n.t("translate_Num")} : {this.state.partic}{" "}
                        {I18n.t("translate_case")}
                      </Text>
                    </View>
                    {/*???????????????Live */}
                    {this.state.live === "C" && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}
                      >
                        <View style={[Styles.ViewSub3]}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require("../../image/Live.png")}
                          >
                            <Text style={Styles.TextSub5}>
                              {I18n.t("translate_LIVE")}
                            </Text>
                          </ImageBackground>
                          <View style={{ bottom: ViewScale(13), right: ViewScale(33) }}>
                            <Text style={{ fontSize: ViewScale(12), color: "#334c6e" }}>
                              {I18n.t("translate_Prepare")}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === "Y" && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}
                      >
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require("../../image/Live.png")}
                          >
                            <Text style={Styles.TextSub5}>
                              {I18n.t("translate_LIVE")}
                            </Text>
                          </ImageBackground>
                          <View style={{ bottom: ViewScale(13), right: ViewScale(31) }}>
                            <Text style={{ fontSize: ViewScale(12), color: "#ff5e5e" }}>
                              {I18n.t("translate_OnAir")}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {this.state.live === "B" && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(this.state.linklive)}
                      >
                        <View style={Styles.ViewSub3}>
                          <ImageBackground
                            style={Styles.ImgBackgroungSub1}
                            source={require("../../image/Live.png")}
                          >
                            <Text style={Styles.TextSub5}>
                              {I18n.t("translate_LIVE")}
                            </Text>
                          </ImageBackground>
                          <View style={{ bottom: ViewScale(13), right: ViewScale(31) }}>
                            <Text style={{ fontSize: ViewScale(12), color: "#b7b7b7" }}>
                              {I18n.t("translate_returnBack")}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={{ margin: ViewScale(10) }}>
                      <Image
                        style={{ width: ViewScale(334), height: 1 }}
                        source={require("../../image/line6.png")}
                      />
                    </View>

                    {this.state.ckhide2 === false ? (
                      <View
                        style={{ flexDirection: "row", alignSelf: "center" }}
                      >
                        <Text
                          onPress={() => {
                            this.setState({ ckhide2: true });
                          }}
                          style={Styles.popupTexthideText}
                        >
                          {I18n.t("transalte_show_details")}
                        </Text>
                        <Icon3
                          color="#2d6dc4"
                          name="keyboard-arrow-down"
                          size={ViewScale(20)}
                        />
                      </View>
                    ) : (
                      <>
                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_DataShow")} :
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {" "}
                          {this.state.StarD} - {this.state.EndD}{" "}
                        </Text>

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_DataRegister")} :{" "}
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {" "}
                          {this.state.starretgis} - {this.state.endregis}{" "}
                        </Text>

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_place")} :
                        </Text>

                        <Text style={Styles.popupTextdetail}>
                          {" "}
                          {this.state.location}{" "}
                        </Text>

                        {/* thking */}

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_group_product")} :
                        </Text>

                        {this.state.product_category.map((data, index) => {
                          return (
                            <View>
                              <Text style={Styles.popupTextdetail}>
                                {" "}
                                {index + 1} {data.name_th}
                              </Text>
                            </View>
                          );
                        })}

                        {/* {Object.values(this.state.product_category).map(ar => {
                      return (
                        <View>
                          <Text style={{fontSize: 18, color: '#3a3a3a'}}>
                            {ar.name_th}
                          </Text>
                        </View>
                      );
                    })} */}

                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_Readmore")} :
                        </Text>
                        <Text style={Styles.popupTextTitledetail}>
                          {I18n.t("translate_Main")}
                        </Text>
                        <View style={{ width: ViewScale(321), height: null }}>
                          <Text style={Styles.popupTextdetail}>
                            {this.state.detail}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignSelf: "center" }}
                        >
                          <Text
                            onPress={() => {
                              this.setState({ ckhide2: false });
                            }}
                            style={Styles.popupTexthideText}
                          >
                            {I18n.t("transalte_Hide_details")}
                          </Text>
                          <Icon3
                            color="#2d6dc4"
                            name="keyboard-arrow-up"
                            size={ViewScale(20)}
                          />
                        </View>
                      </>
                    )}
                    <View style={{ margin: ViewScale(10) }}>
                      <Image
                        style={{ width: ViewScale(334), height: ViewScale(1) }}
                        source={require("../../image/line6.png")}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={Styles.popupTextdetail}>
                        {I18n.t("transalte_responsible_agency")} :{" "}
                        {this.state.daparment_name}
                      </Text>
                      <Text style={Styles.popupTextdetail}>
                        {I18n.t("transalte_project_staff")} :{" "}
                        {this.state.officer_name}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={{ width: ViewScale(29), height: ViewScale(29) }}
                          source={require("../../image/phonelx.png")}
                        />

                        <Text
                          onPress={() => {
                            this.Call(this.state.deparment_tel);
                          }}
                          style={{ color: "#2d6dc4", fontSize: ViewScale(18), top: ViewScale(4) }}
                        >
                          {"   "} {this.state.deparment_tel}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: ViewScale(13),
                        alignItems: "center",
                      }}
                    >
                      {this.state.StatusFa === false ? (
                        <TouchableOpacity
                          onPress={() => {
                            setTimeout(() => {
                              this._SendBasket({
                                code1: this.state.code,
                                check: 1,
                              });
                              this.setState({ StatusFa: true });
                            }, 200);
                          }}
                          style={{ flexDirection: "row" }}
                        >
                          <Image
                            style={{ width: ViewScale(20), height: ViewScale(20) }}
                            source={require("../../image/shoping.png")}
                          />
                          <Text style={Styles.popupTextdelect}>
                            {"  "}
                            {I18n.t("translate_addFavorites")}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setTimeout(() => {
                              this._DeleteBasket({
                                code1: this.state.code,
                                check: 1,
                              });
                              this.setState({ StatusFa: false });
                            }, 200);
                          }}
                          style={{ flexDirection: "row" }}
                        >
                          <Image
                            style={{ width: ViewScale(20), height: ViewScale(20) }}
                            source={require("../../image/startoppick.png")}
                          />
                          <Text style={Styles.popupTextdelect}>
                            {"  "}
                            {I18n.t("translate_Delete_basket")}
                          </Text>
                        </TouchableOpacity>
                      )}

                      {this.props.getStatus1.isResult.status_confirm_identity
                        .status_code != 0 &&
                      this.props.getStatus1.isResult.status_confirm_identity
                        .status_code != 1 ? (
                        <View>
                          {this.props.getUser.userDetails.res_result.type !=
                            6 &&
                          this.props.getUser.userDetails.res_result.type != 3 &&
                          this.props.getUser.userDetails.res_result.type !=
                            4 ? (
                            <TouchableOpacity
                              disabled={this.state.Close === false}
                              onPress={() => {
                                // console.log(this.web(this.state.register));
                                // this.openLink(this.web(this.state.register));

                                if (
                                  this.props.getStatus1.isResult
                                    .status_confirm_identity.status_code === 0
                                ) {
                                  this.props.navigation.navigate("Identity");
                                } else if (
                                  this.props.getStatus1.isResult
                                    .status_confirm_identity.status_code === 1
                                ) {
                                  alert(
                                    I18n.t("alert_Data_verification_progress")
                                  );
                                } else {
                                  this._CheckRegister({
                                    activity_code: this.state.code,
                                    formTypeActivity: this.state
                                      .formTypeActivity,
                                    type: this.props.getUser.userDetails
                                      .res_result.type,
                                    member_cid: this.state.IDcard,
                                    name: this.state.name,
                                    StarD: this.state.StarD,
                                    EndD: this.state.EndD,
                                    starretgis: this.state.starretgis,
                                    endregis: this.state.endregis,
                                    contry_img_flag: this.state.contry_img_flag,
                                    contry_TH: this.state.contry_TH,
                                    location: this.state.location,
                                    price: this.state.price,
                                    partic: this.state.partic,
                                    live: this.state.live,
                                    linklive: this.state.linklive,
                                    starretgis: this.state.starretgis,
                                    endregis: this.state.endregis,
                                    detail: this.state.detail,
                                    daparment_name: this.state.daparment_name,
                                    officer_name: this.state.officer_name,
                                    deparment_tel: this.state.deparment_tel,
                                    StatusFa: this.state.StatusFa,
                                    StarD_1: this.state.StarD_1,
                                    EndD_1: this.state.EndD_1,
                                  });
                                }
                                this.setState({ Show: false });
                              }}
                              style={
                                this.state.Close
                                  ? Styles.TouchSub1
                                  : Styles.TouchSub6
                              }
                            >
                              <Text style={Styles.textactivityregister}>
                                {this.state.Close
                                  ? I18n.t("translate_Apply_activities")
                                  : I18n.t("translate_Applacation")}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          this.onShareDetali(this.state.name, this.state.url);
                        }}
                        style={{ alignSelf: "flex-end", marginTop: ViewScale(-25) }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ width: ViewScale(14), height: ViewScale(16) }}
                          source={require("../../image/sharelx.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Overlay>
        )}
        <View style={{ zIndex: -1, flex: 0.8 , }}>
          <SegmentedControlTab
          tabTextStyle={{fontSize: ViewScale(16)}}
          activeTabTextStyle={{fontSize : ViewScale(16),}}
            values={[
              I18n.t("translate_Title_AllDEV"),
              I18n.t("translate_Title_Elearning"),
            ]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />

          {this.state.selectedIndex === 0 && (
            <View style={{ marginTop: ViewScale(10) }}>
              <View style={{ marginHorizontal: ViewScale(10) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: ViewScale(1),
                    borderRadius: ViewScale(18),

                    borderColor: "#dadada",
                  }}
                >
                  <Image
                    style={{ width: ViewScale(22), height: ViewScale(22), left: ViewScale(10), top: ViewScale(2) }}
                    source={require("../../image/searchbluex.png")}
                  />

                  <TextInput
                    onChangeText={(e) => {
                      this.SearchSubmit(e);
                    }}
                    placeholderTextColor="#dadada"
                    style={Styles.textsearchView}
                    placeholder={I18n.t("translate_Seach")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: ViewScale(10),
                  }}
                >
                  <Popover
                    isVisible={this.state.closePopover}
                    onRequestClose={() => {
                      this.setState({ closePopover: false });
                    }}
                    popoverStyle={{
                      flex: 1,
                      width: "100%",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.51,
                      shadowRadius: 13.16,

                      elevation: 20,
                    }}
                    backgroundStyle={{
                      backgroundColor: "#2d6dc4",
                      opacity: 0.6,
                    }}
                    from={
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ closePopover: true });
                        }}
                        style={{
                          flex: 1,
                          marginHorizontal: ViewScale(10),
                          height: ViewScale(34),
                          backgroundColor: "#2d6dc4",

                          borderRadius: 8,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: ViewScale(21),
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {I18n.t("transalte_tradeActivities_search_time")}
                        </Text>
                      </TouchableOpacity>
                    }
                  >
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        height: ViewScale(100),
                        borderColor: "#2d6dc4",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // flex: 1,
                        }}
                      >
                        <View
                          style={{
                            // borderWidth: 1,
                            flex: 1,
                            height: ViewScale(35),
                            marginHorizontal: ViewScale(10),
                            marginVertical: ViewScale(10),
                            borderRadius: ViewScale(17),
                            // backgroundColor: 'red',
                            // borderColor: 'red',
                            // justifyContent:'center'
                          }}
                        >
                          <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            _fixAndroidTouchableBug_={false}
                            style={{
                              inputAndroidContainer: {
                                width: "100%",
                              },
                              ...pickerSelectStyles2,
                            }}
                            placeholder={
                              {
                                // label:
                                //   I18n.locale === 'th' ? '??????????????????????????????' : 'Choose Year',
                                // value:
                                //   I18n.locale === 'th' ? '??????????????????????????????' : 'Choose Year',
                              }
                            }
                            doneText={I18n.locale === "th" ? "???????????????" : "Done"}
                            onValueChange={(value, index) => {
                              this.setState({
                                valueSelectActivity3dev: value,
                                valueindexdev: index,
                              });
                            }}
                            value={this.state.valueSelectActivity3dev}
                            items={this.state.countYear.map((object) => ({
                              label: object.YearN.toString(),
                              value: object.YearN.toString(),
                              key: object.YearN.toString(),
                            }))}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "#2d6dc4",
                                height: ViewScale(35),
                                borderRadius: ViewScale(17),
                              }}
                            >
                              {this.state.valueSelectActivity3dev ===
                              undefined ? (
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  {this.state.valueSelectMouthdev > 0 ? (
                                    <Text
                                      style={{
                                        color: "#2d6dc4",
                                        fontSize: ViewScale(20),
                                        textAlign: "center",
                                      }}
                                    >
                                      {"   "}
                                      {this.state.setdefulttear}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        color: "#2d6dc4",
                                        fontSize: ViewScale(20),
                                        textAlign: "center",
                                      }}
                                    >
                                      {/* {I18n.t('translate_chooseyear')} */}
                                      {"   "}
                                      {this.state.setdefulttear}
                                    </Text>
                                  )}
                                </View>
                              ) : (
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  <Text
                                    style={{
                                      color: "#2d6dc4",
                                      fontSize: ViewScale(20),
                                      textAlign: "center",
                                    }}
                                  >
                                    {"   "}
                                    {this.state.valueSelectActivity3dev}
                                  </Text>
                                </View>
                              )}
                              <View
                                style={{ justifyContent: "center", flex: 0.19 }}
                              >
                                <Icon
                                  name="chevron-down"
                                  size={ViewScale(20)}
                                  color="#2d6dc4"
                                  style={{ justifyContent: "center" }}
                                />
                              </View>
                            </View>
                          </RNPickerSelect>
                        </View>

                        <View
                          style={{
                            // borderWidth: 1,
                            flex: 1,
                            height: ViewScale(35),
                            marginHorizontal: ViewScale(10),
                            marginVertical: ViewScale(10),
                            borderRadius: ViewScale(17),
                            // borderColor: 'red',
                          }}
                        >
                          <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            _fixAndroidTouchableBug_={false}
                            style={{
                              inputAndroidContainer: {
                                width: "100%",
                              },
                              ...pickerSelectStyles2,
                            }}
                            placeholder={{
                              label:
                                I18n.locale === "th" ? "????????????????????????????????????" : "All",
                              value:
                                I18n.locale === "th" ? "????????????????????????????????????" : "All",
                            }}
                            onValueChange={(value, index) =>
                              this.setState({
                                valueSelectActivity2dev: value,
                                valueSelectMouthdev: index,
                              })
                            }
                            value={
                              this.state.valueSelectActivity2dev === undefined
                                ? this.state.valueSelectMMMM
                                : this.state.valueSelectActivity2dev
                            }
                            doneText={I18n.locale === "th" ? "???????????????" : "Done"}
                            items={
                              I18n.locale === "th"
                                ? [
                                    { label: "??????????????????", value: "??????????????????" },
                                    {
                                      label: "??????????????????????????????",
                                      value: "??????????????????????????????",
                                    },
                                    { label: "??????????????????", value: "??????????????????" },
                                    { label: "??????????????????", value: "??????????????????" },
                                    { label: "????????????????????????", value: "????????????????????????" },
                                    { label: "????????????????????????", value: "????????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "??????????????????", value: "??????????????????" },
                                    {
                                      label: "???????????????????????????",
                                      value: "???????????????????????????",
                                    },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                  ]
                                : [
                                    { label: "January", value: "January" },
                                    { label: "February", value: "February" },
                                    { label: "Murch", value: "Murch" },
                                    { label: "April", value: "April" },
                                    { label: "May", value: "May" },
                                    { label: "June", value: "June" },
                                    { label: "July", value: "July" },
                                    { label: "August", value: "August" },
                                    {
                                      label: "September",
                                      value: "September",
                                    },
                                    { label: "October", value: "October" },
                                    { label: "Noverber", value: "Noverber" },
                                    { label: "December", value: "December" },
                                  ]
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "#2d6dc4",
                                height: ViewScale(35),
                                borderRadius: ViewScale(17),
                              }}
                            >
                              {this.state.valueSelectActivity2dev ===
                              undefined ? (
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  <Text
                                    style={{
                                      color: "#2d6dc4",
                                      fontSize: ViewScale(20),
                                      textAlign: "center",
                                    }}
                                  >
                                    {/* {I18n.t('translate_choosemouth')} */}
                                    {"   "}
                                    {this.state.valueSelectMMMM}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  <Text
                                    style={{
                                      color: "#2d6dc4",
                                      fontSize: ViewScale(20),
                                      textAlign: "center",
                                    }}
                                  >
                                    {"   "}
                                    {this.state.valueSelectActivity2dev}
                                  </Text>
                                </View>
                              )}
                              <View
                                style={{ justifyContent: "center", flex: 0.19 }}
                              >
                                <Icon
                                  name="chevron-down"
                                  size={ViewScale(20)}
                                  color="#2d6dc4"
                                  style={{}}
                                />
                              </View>
                            </View>
                          </RNPickerSelect>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState(
                            {
                              closePopover: false,
                              AllDevelop: [],
                              isListEnd: false,
                              loading: false,
                              fetching_from_server: false,
                              YYDF: YYDF1,
                            },
                            function() {
                              this.offset = 0;
                              this._getAllDevelop();
                            }
                          );
                        }}
                        style={{
                          backgroundColor: "#2d6dc4",
                          marginHorizontal: ViewScale(10),

                          height: ViewScale(34),

                          borderRadius: ViewScale(17),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: ViewScale(20),
                            textAlign: "center",
                          }}
                        >
                          {I18n.t("transalte_ButtonSearch")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Popover>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("SearchAdvancedDevelop");
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: ViewScale(10),
                      height: ViewScale(34),
                      backgroundColor: "#2d6dc4",
                      borderRadius: ViewScale(8),
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: ViewScale(21),
                        textAlign: "center",
                      }}
                    >
                      {I18n.t("translate_searchAdvanced")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{}}>
                {this.state.loading ? (
                  <View>
                    <ActivityIndicator
                      size="small"
                      color="black"
                      style={{ margin: 15 }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: ViewScale(10),
                      backgroundColor: "#f7f9fc",
                      marginBottom: ViewScale(10),
                    }}
                  >
                    {this.state.AllDevelop.length > 0 ? (
                      // <ScrollView style={{}}>
                      <FlatList
                        // onEndReached={() => this._getAllDevelop()}
                        // scrollEnabled={false}
                        contentContainerStyle={[
                          Styles.flastListContainer,
                          { marginTop: ViewScale(10) },
                        ]}
                        extraData={this.state}
                        data={AllDevelop}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        renderItem={this.Listre}
                        keyExtractor={(item, index) => index}
                      />
                    ) : (
                      // </ScrollView>

                      <View style={[Styles.footer]}>
                        {this.state.fetching_from_server ? (
                          <ActivityIndicator
                            color="black"
                            style={{ margin: ViewScale(15) }}
                          />
                        ) : (
                          <View style={Styles.footerNotdata}>
                            {this.state.AllDevelop.length == 0 ? (
                              <Text style={{ fontSize: 22 }}>
                                {I18n.t("translate_Nodata")}
                              </Text>
                            ) : null}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
          {this.state.selectedIndex === 1 && (
            <View style={{ marginTop: ViewScale(10) }}>
              <View style={{ marginHorizontal: ViewScale(10) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: ViewScale(18),

                    borderColor: "#dadada",
                  }}
                >
                  <Image
                    style={{ width: ViewScale(22), height: ViewScale(22), left: ViewScale(10), top: ViewScale(2) }}
                    source={require("../../image/searchbluex.png")}
                  />

                  <TextInput
                    onChangeText={(e) => {
                      this.SearchSubmit2(e);
                    }}
                    placeholderTextColor="#dadada"
                    style={Styles.textsearchView}
                    placeholder={I18n.t("translate_Seach")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: ViewScale(10),
                  }}
                >
                  <Popover
                    isVisible={this.state.closePopover}
                    onRequestClose={() => {
                      this.setState({ closePopover: false });
                    }}
                    popoverStyle={{
                      flex: 1,
                      width: "100%",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.51,
                      shadowRadius: 13.16,

                      elevation: 20,
                    }}
                    backgroundStyle={{
                      backgroundColor: "#2d6dc4",
                      opacity: 0.6,
                    }}
                    // ???????????????
                    from={
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ closePopover: true });
                        }}
                        style={{
                          flex: 1,
                          marginHorizontal: ViewScale(10),
                          height: ViewScale(34),
                          backgroundColor: "#2d6dc4",

                          borderRadius: 8,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: ViewScale(21),
                            textAlign: "center",
                          }}
                        >
                          {I18n.t("transalte_tradeActivities_search_time")}
                        </Text>
                      </TouchableOpacity>
                    }
                  >
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        height: ViewScale(100),
                        borderColor: "#2d6dc4",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // flex: 1,
                        }}
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            flex: 1,
                            height: ViewScale(35),
                            marginHorizontal: ViewScale(10),
                            marginVertical: ViewScale(10),
                            borderRadius: ViewScale(17),
                            borderColor: "#2d6dc4",
                          }}
                        >
                          <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            _fixAndroidTouchableBug_={false}
                            style={{
                              inputAndroidContainer: {
                                width: "100%",
                              },
                              ...pickerSelectStyles2,
                            }}
                            placeholder={
                              {
                                // label:
                                //   I18n.locale === 'th' ? '??????????????????????????????' : 'Choose Year',
                                // value:
                                //   I18n.locale === 'th' ? '??????????????????????????????' : 'Choose Year',
                              }
                            }
                            onValueChange={(value, index) => {
                              this.setState({
                                valueSelectActivity3dev: value,
                                valueindexdev: index,
                              });
                            }}
                            doneText={I18n.locale === "th" ? "???????????????" : "Done"}
                            value={
                              this.state.valueSelectActivity3dev === undefined
                                ? this.state.setdefulttear
                                : this.state.valueSelectActivity3dev
                            }
                            items={this.state.countYear.map((object) => ({
                              label: object.YearN.toString(),
                              value: object.YearN.toString(),
                              key: object.YearN.toString(),
                            }))}
                          >
                            <View style={{ flexDirection: "row" }}>
                              {this.state.valueSelectActivity3dev ===
                              undefined ? (
                                <>
                                  {this.state.valueSelectMouthdev > 0 ? (
                                    <Text
                                      style={{
                                        color: "#2d6dc4",
                                        fontSize: ViewScale(20),
                                        left: ViewScale(60),
                                        top: ViewScale(3.5),
                                      }}
                                    >
                                      {this.state.setdefulttear}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        color: "#2d6dc4",
                                        fontSize: ViewScale(20),
                                        left: ViewScale(60),
                                        top: ViewScale(3.5),
                                      }}
                                    >
                                      {/* {I18n.t('translate_chooseyear')} */}
                                      {this.state.setdefulttear}
                                    </Text>
                                  )}
                                </>
                              ) : (
                                <Text
                                  style={{
                                    color: "#2d6dc4",
                                    fontSize: ViewScale(20),
                                    left: ViewScale(50),
                                    top: ViewScale(3.5),
                                  }}
                                >
                                  {this.state.valueSelectActivity3dev}
                                </Text>
                              )}
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                              <Icon
                                name="chevron-down"
                                size={ViewScale(20)}
                                color="#2d6dc4"
                                style={{ top: ViewScale(-17), left: ViewScale(8) }}
                              />
                            </View>
                          </RNPickerSelect>
                        </View>

                        <View
                          style={{
                            borderWidth: 1,
                            flex: 1,
                            height: ViewScale(35),
                            marginHorizontal: ViewScale(10),
                            marginVertical: ViewScale(10),
                            borderRadius: ViewScale(17),
                            borderColor: "#2d6dc4",
                          }}
                        >
                          <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            _fixAndroidTouchableBug_={false}
                            style={{
                              inputAndroidContainer: {
                                width: "100%",
                              },
                              ...pickerSelectStyles2,
                            }}
                            placeholder={{
                              label:
                                I18n.locale === "th" ? "????????????????????????????????????" : "All",
                              value:
                                I18n.locale === "th" ? "????????????????????????????????????" : "All",
                            }}
                            value={
                              this.state.valueSelectActivity2devE === undefined
                                ? this.state.valueSelectMMMM
                                : this.state.valueSelectActivity2devE
                            }
                            onValueChange={(value, index) =>
                              this.setState({
                                valueSelectActivity2devE: value,
                                valueSelectMouthdevE: index,
                              })
                            }
                            doneText={I18n.locale === "th" ? "???????????????" : "Done"}
                            items={
                              I18n.locale === "th"
                                ? [
                                    { label: "??????????????????", value: "??????????????????" },
                                    {
                                      label: "??????????????????????????????",
                                      value: "??????????????????????????????",
                                    },
                                    { label: "??????????????????", value: "??????????????????" },
                                    { label: "??????????????????", value: "??????????????????" },
                                    { label: "????????????????????????", value: "????????????????????????" },
                                    { label: "????????????????????????", value: "????????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                    { label: "??????????????????", value: "??????????????????" },
                                    {
                                      label: "???????????????????????????",
                                      value: "???????????????????????????",
                                    },
                                    { label: "?????????????????????", value: "?????????????????????" },
                                  ]
                                : [
                                    { label: "January", value: "January" },
                                    { label: "February", value: "February" },
                                    { label: "Murch", value: "Murch" },
                                    { label: "April", value: "April" },
                                    { label: "May", value: "May" },
                                    { label: "June", value: "June" },
                                    { label: "July", value: "July" },
                                    { label: "August", value: "August" },
                                    {
                                      label: "September",
                                      value: "September",
                                    },
                                    { label: "October", value: "October" },
                                    { label: "Noverber", value: "Noverber" },
                                    { label: "December", value: "December" },
                                  ]
                            }
                          >
                            <View style={{ flexDirection: "row" }}>
                              {this.state.valueSelectActivity2devE ===
                              undefined ? (
                                <Text
                                  style={{
                                    color: "#2d6dc4",
                                    fontSize: ViewScale(20),
                                    left: ViewScale(50),
                                    top: ViewScale(3.5),
                                  }}
                                >
                                  {/* {I18n.t('translate_choosemouth')} */}
                                  {this.state.valueSelectMMMM}
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    color: "#2d6dc4",
                                    fontSize: ViewScale(20),
                                    left: ViewScale(50),
                                    top: ViewScale(3.5),
                                  }}
                                >
                                  {this.state.valueSelectActivity2devE}
                                </Text>
                              )}
                            </View>
                            <View style={{ flexDirection: "row-reverse" }}>
                              <Icon
                                name="chevron-down"
                                size={ViewScale(20)}
                                color="#2d6dc4"
                                style={{ top: ViewScale(-17), left: ViewScale(8) }}
                              />
                            </View>
                          </RNPickerSelect>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState(
                            {
                              closePopover: false,
                              AllDevelopElearning: [],
                              isListEnd2: false,
                              loading2: false,
                              fetching_from_server2: false,
                              YYDF: YYDF1,
                            },
                            function() {
                              this.offset = 0;
                              this._getAllDevelopElearning();
                            }
                          );
                        }}
                        style={{
                          backgroundColor: "#2d6dc4",
                          marginHorizontal: ViewScale(10),

                          height: ViewScale(34),

                          borderRadius: ViewScale(17),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: ViewScale(20),
                            textAlign: "center",
                          }}
                        >
                          {I18n.t("transalte_ButtonSearch")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Popover>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("SearchAdvancedDevelop");
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: ViewScale(10),
                      height: ViewScale(34),
                      backgroundColor: "#2d6dc4",

                      borderRadius: ViewScale(8),
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: ViewScale(21),
                        textAlign: "center",
                      }}
                    >
                      {I18n.t("translate_searchAdvanced")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {this.state.loading ? (
                  <View>
                    <ActivityIndicator
                      size="small"
                      color="black"
                      style={{ margin: ViewScale(15) }}
                    />
                  </View>
                ) : (
                  <View
                    style={{ backgroundColor: "#f7f9fc", marginBottom: ViewScale(10) }}
                  >
                    {this.state.AllDevelopElearning.length > 0 ? (
                      // <ScrollView style={{marginTop: 10}}>
                      <FlatList
                        // onEndReached={() => this._getAllDevelop()}
                        // scrollEnabled={false}
                        contentContainerStyle={[Styles.flastListContainer]}
                        extraData={this.state}
                        data={AllDevelopElearning}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={this.renderFooter1.bind(this)}
                        renderItem={this.ListreElearing}
                        keyExtractor={(item, index) => index}
                      />
                    ) : (
                      // </ScrollView>
                      <View style={Styles.footer}>
                        {this.state.fetching_from_server2 ? (
                          <ActivityIndicator
                            color="black"
                            style={{ margin: ViewScale(15) }}
                          />
                        ) : (
                          <View style={Styles.footerNotdata}>
                            {this.state.AllDevelopElearning.length == 0 ? (
                              <Text style={{ fontSize: ViewScale(22) }}>
                                {I18n.t("translate_Nodata")}
                              </Text>
                            ) : null}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: ViewScale(23),
    color: "#73838f",
    paddingHorizontal: ViewScale(10),
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? ViewScale(2) : ViewScale(-3),
    paddingBottom: ViewScale(5),
    // borderWidth:1
  },
  inputAndroid: {
    height: ViewScale(40),
    fontSize: ViewScale(23),
    color: "#73838f",
    fontWeight: "normal",
    fontFamily: "PSL Kittithada Pro",
    width: "100%",
    paddingHorizontal: ViewScale(10),
    paddingVertical: ViewScale(8),
    paddingRight: ViewScale(70),
  },
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  getStatus1: state.dataReducer.getStatus,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDevelop);
