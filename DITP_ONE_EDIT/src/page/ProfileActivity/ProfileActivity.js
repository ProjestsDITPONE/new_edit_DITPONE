import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, ListItem, Overlay} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import Styles from './Styles';
import Style from '../IdentityScreen/Styles';
import Icon from 'react-native-vector-icons/Feather';
// import SegmentedControlTab from 'react-native-segmented-control-tab';

// import ScrollableTabView, {
//   ScrollableTabBar,
// } from '../../lib_edit/react-native-scrollable-tab-view';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import Headers from '../../components/Headers';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';

import {logoutUser} from '../../actions/auth.actions';
import {getDeepLink} from '../../config/utilities';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import RNFetchBlob from 'rn-fetch-blob';
import SafeArea from 'react-native-safe-area';
import {getDeepLinkAutoMem} from '../../config/utilities';
import {
  getActivity,
  getActivitySme,
  getSmeauthority,
  getCountries,
  getAwardType,
  master_award,
} from '../../actions/data.actions';
import SlideDownPanel from '../../lib_edit/react-native-slide-down-panel';

import {EditeProfile, getInfo} from '../../actions/auth.actions';

import I18n from '../../utils/I18n';
import CountryPicker from '../../lib_edit/react-native-country-picker-modal';
import RNPickerSelect from 'react-native-picker-select';
import IconDown from 'react-native-vector-icons/AntDesign';
import SegmentedControlTab from 'react-native-segmented-control-tabedit';
import LinearGradient from 'react-native-linear-gradient';
import Activities from './Activities';
import SmeAct from './SmeActivity';

const ProfileActivity = ({
  navigation,
  getUser,
  authData,
  dispatch,
  route,
  getStatus,
  getImg,
  getNotification,
  props,
}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [bottom, setbottom] = useState(30);

  //ipad
  var aspectRatio = 1.6;
  if (height / width > 1.6) {
    //iphone
    aspectRatio = 3;
  }

  if (route.params == undefined) {
    var index = 0;
  } else {
    var index = route.params.index;
  }
  const [heightSheet, setSheet] = useState(190);
  const [RBsheet1, setRBsheet1] = useState();
  const [ViewProfile, setProfile] = useState(false);
  const [CammeraOn1, setCammeraOn1] = useState(false);

  const [year1, setyear1] = useState();
  const [year2, setyear2] = useState();
  const [year3, setyear3] = useState();
  const [year11, setyear11] = useState();
  const [year22, setyear22] = useState();
  const [year33, setyear33] = useState();

  const [idAct, setidAct] = useState();
  const [page, pageSet] = useState(1);
  const [Page, setPage] = useState(3);
  const [Page2, setPage2] = useState(3);

  const [Page3, setPage3] = useState(3);
  const [Page4, setPage4] = useState(3);
  const [Page5, setPage5] = useState(3);

  const [Page6, setPage6] = useState(3);
  const [Page7, setPage7] = useState(3);
  const [Page8, setPage8] = useState(3);

  const [SelecIndex, setSelecIndex] = useState(index);
  const [SelecIndexYear, setSelecIndexYear] = useState(0);
  const [SelecIndexYear1, setSelecIndexYear1] = useState(0);
  const [AcceptEdit, setAcceptEdit] = useState(false);
  const [Detailact, setDetailact] = useState(false);
  const [Detailhis, setDetailhis] = useState(false);
  const [Editdata, setEditdata] = useState(true);

  //////////////////////////////////////
  const [ActivityAccept, setActivityAccept] = useState([]);
  const [ActivitySme, setActivitySme] = useState([]);
  const [ActivityYear, setActivityYear] = useState([]);
  const [ActivityYearSme, setActivityYearSme] = useState([]);
  const [LogoAct, setLogoAct] = useState();
  const [nameAct, setnameAct] = useState();
  const [StartDateAct, setStartDateAct] = useState();
  const [EndDateAct, setEndDateAct] = useState();
  const [location, setlocation] = useState();
  const [Country, setCountry] = useState();
  const [Product, setProduct] = useState();
  const [SaveEdit, setSaveEdit] = useState(false);
  const [AcceptDate, setAcceptDate] = useState();
  const [price, setprice] = useState();
  const [Status, setaStatus] = useState();
  const [Phone, setphone] = useState();
  const [DetailAct, setDatailAct] = useState();
  const [participate, setparticipate] = useState();
  const [Link, setLink] = useState();
  const [payProduct, setpayProduct] = useState();
  const [survay, setsurvay] = useState();
  const [datasuccess, setdatasuccess] = useState();
  const [img, setimg] = useState();
  const [url, seturl] = useState(
    getImg.img == 'http://one.ditp.go.th/uploads/member_profile/profile_new.png'
      ? 'https://adminshop.kwanpat.com/theme/test_uploads/accounnull.png'
      : getImg.img,
  );
  const [SmeAuth, setSmeAuth] = useState([]);
  //////////////////////////////////////
  const [company, setcompany] = useState(
    getUser.userDetails.res_result.company != undefined
      ? getUser.userDetails.res_result.company.nameTh
      : '',
  );
  const [companyEN, setcompanyEN] = useState(
    getUser.userDetails.res_result.company != undefined
      ? getUser.userDetails.res_result.company.nameEn
      : '',
  );
  const [corporate, setcorporate] = useState(
    getUser.userDetails.res_result.corporate != undefined
      ? getUser.userDetails.res_result.corporate.name
      : '',
  );
  const [address, setaddress] = useState(
    getUser.userDetails.res_result.addressTh != undefined
      ? getUser.userDetails.res_result.addressTh.address
      : '',
  );
  const [subdistrict, setsubdistrict] = useState(
    getUser.userDetails.res_result.addressTh != undefined
      ? getUser.userDetails.res_result.addressTh.subdistrict
      : '',
  );
  const [district, setdistrict] = useState(
    getUser.userDetails.res_result.addressTh != undefined
      ? getUser.userDetails.res_result.addressTh.district
      : '',
  );
  const [province, setprovince] = useState(
    getUser.userDetails.res_result.addressTh != undefined
      ? getUser.userDetails.res_result.addressTh.province
      : '',
  );
  const [postcode, setpostcode] = useState(
    getUser.userDetails.res_result.addressTh != undefined
      ? getUser.userDetails.res_result.addressTh.postcode
      : '',
  );
  //////////////////////////////////////
  const [contactAdress, setcontactAdress] = useState(
    getUser.userDetails.res_result.contact != undefined
      ? getUser.userDetails.res_result.contact.address
      : '',
  );
  const [contactsubdistrict, setcontactsubdistrict] = useState(
    getUser.userDetails.res_result.contact != undefined
      ? getUser.userDetails.res_result.contact.subdistrict
      : '',
  );
  const [contactdistrict, setcontactdistrict] = useState(
    getUser.userDetails.res_result.contact != undefined
      ? getUser.userDetails.res_result.contact.district
      : '',
  );
  const [contactprovince, setcontactprovince] = useState(
    getUser.userDetails.res_result.contact != undefined
      ? getUser.userDetails.res_result.contact.province
      : '',
  );
  const [contactpostcode, setcontactpostcode] = useState(
    getUser.userDetails.res_result.contact != undefined
      ? getUser.userDetails.res_result.contact.postcode
      : '',
  );

  ////////////////////////////////////
  const [addressEN, setaddressEN] = useState(
    getUser.userDetails.res_result.addressEn != undefined
      ? getUser.userDetails.res_result.addressEn.address
      : '',
  );
  const [subdistrictEN, setsubdistrictEN] = useState(
    getUser.userDetails.res_result.addressEn != undefined
      ? getUser.userDetails.res_result.addressEn.subdistrict
      : '',
  );
  const [districtEN, setdistrictEN] = useState(
    getUser.userDetails.res_result.addressEn != undefined
      ? getUser.userDetails.res_result.addressEn.district
      : '',
  );
  const [provinceEN, setprovinceEN] = useState(
    getUser.userDetails.res_result.addressEn != undefined
      ? getUser.userDetails.res_result.addressEn.province
      : '',
  );
  const [postcodeEN, setpostcodeEN] = useState(
    getUser.userDetails.res_result.addressEn != undefined
      ? getUser.userDetails.res_result.addressEn.postcode
      : '',
  );
  //////////////////////////////////////
  const [address4, setaddress4] = useState(
    getUser.userDetails.res_result.address != undefined
      ? getUser.userDetails.res_result.address.address
      : '',
  );
  const [country4, setcountry4] = useState(
    getUser.userDetails.res_result.address != undefined
      ? getUser.userDetails.res_result.address.country
      : '',
  );

  console.log('LLLLL', getImg.img);

  const [title, settitle] = useState('');
  const [titleEN, settitleEN] = useState('');
  const [name, setname] = useState('');
  const [nameEN, setnameEN] = useState('');
  const [lnameEN, setlnameEN] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [phoneN, setphoneN] = useState('');
  const [idcardSub, setidcard] = useState('');
  const [CountryCodePhone, setCountryCodePhone] = useState(null);

  //////////////////////////////////////
  const [Countries, setCountries] = useState([]);
  const [dataAwardType, setAwardType] = useState([]);
  const [dataAwardTypeCK, setdataAwardTypeCK] = useState([]);

  const [format, setformat] = useState('');
  const [countryCode, setCountryCode] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [country, setCountry1] = useState(null);

  const onSelect = country => {
    setformat(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountryCodePhone('+' + country.callingCode[0]);
  };

  function PhoneNum(item) {
    var phone =
      CountryCodePhone +
      ' ' +
      item.substring(0, 3) +
      ' '+
      item.substring(3, 6) +
      ' ' +
      item.substring(6, 10);

    return phone;
  }

  const _EditeProfile = async value => {
    try {
      if (value === 3) {
        const payload = {
          result: {
            code: 'Bearer ' + authData.token,
            client_id: 'SS0047423',
            member: {
              titleTh: title,
              nameTh: name,
              lastnameTh: lname,
              tel: phoneN,
              tel_code: CountryCodePhone,
              tel_country_code: countryCode,
              email: email,
            },
            addressTh: {
              address: address,
              province: province,
              district: district,
              subdistrict: subdistrict,
              postcode: postcode,
            },
            addressEn: {
              address: addressEN,
              province: provinceEN,
              district: districtEN,
              subdistrict: subdistrictEN,
              postcode: postcodeEN,
            },
          },
        };

        const respones = await dispatch(EditeProfile(payload));
        if (respones.res_code === '00') {
          AlertLogout2();
        }
      } else if (value === 4) {
        const payload = {
          result: {
            code: 'Bearer ' + authData.token,
            client_id: 'SS0047423',
            member: {
              titleEn: titleEN,
              nameEn: nameEN,
              lastnameEn: lnameEN,
              email: email,
              tel: phoneN,
              tel_code: CountryCodePhone,
              tel_country_code: countryCode,
            },
            address: {
              country: country4,
              address: address4,
            },
          },
        };

        const respones = await dispatch(EditeProfile(payload));
        if (respones.res_code === '00') {
          AlertLogout2();
        }
      } else if (value === 1) {
        const payload = {
          result: {
            code: 'Bearer ' + authData.token,
            client_id: 'SS0047423',
            company: {
              nameTh: company,
              nameEn: companyEN,
            },
            addressTh: {
              address: address,
              province: province,
              district: district,
              subdistrict: subdistrict,
              postcode: postcode,
            },
            addressEn: {
              address: addressEN,
              province: provinceEN,
              district: districtEN,
              subdistrict: subdistrictEN,
              postcode: postcodeEN,
            },
            contact: {
              address: contactAdress,
              province: contactprovince,
              district: contactdistrict,
              subdistrict: contactsubdistrict,
              postcode: contactpostcode,
            },
            sub_member: {
              titleTh: title,
              nameTh: name,
              lastnameTh: lname,
              cid: idcardSub,
              email: email,
              tel: phoneN,
              tel_code: CountryCodePhone,
              tel_country_code: countryCode,
            },
          },
        };

        const respones = await dispatch(EditeProfile(payload));
        if (respones.res_code === '00') {
          AlertLogout2();
        }
      } else if (value === 2) {
        const payload = {
          result: {
            code: 'Bearer ' + authData.token,
            client_id: 'SS0047423',
            corporate: {
              name: corporate,
            },
            address: {
              country: country4,
              address: address4,
            },
            sub_member: {
              titleEn: titleEN,
              nameEn: nameEN,
              lastnameEn: lnameEN,
              email: email,
              tel: phoneN,
              tel_code: CountryCodePhone,
              tel_country_code: countryCode,
            },
          },
        };

        const respones = await dispatch(EditeProfile(payload));
        if (respones.res_code === '00') {
          AlertLogout2();
        }
      }
    } catch (error) {}
  };

  const isFocused = useIsFocused();

  const openLinkMap = async item => {
    const Token = authData.token;
    const userDrive = getUser.userDetails.res_result.userID_drive;
    const deeplink = getDeepLinkAutoMem();
    const url = ``;
    console.log(url);
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deeplink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  const openLink2 = async item => {
    const Token = authData.token;
    const userDrive = getUser.userDetails.res_result.userID_drive;
    const deeplink = getDeepLinkAutoMem();
    const url = `https://drive.ditp.go.th/th-th/signin?type=1&client_id=SS0047423&userid=${userDrive}&code=${Token}`;
    console.log(url);
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, deeplink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  function idcard(naturalId) {
    return (
      naturalId.substring(0, 1) +
      '-' +
      naturalId.substring(1, 5) +
      '-' +
      naturalId.substring(5, 10) +
      '-' +
      naturalId.substring(10, 12) +
      '-' +
      naturalId.substring(12, 13)
    );
  }

  function Phonenumber(tel) {
    return (
      tel.substring(0, 3) +
      ' ' +
      tel.substring(3, 6) +
      ' ' +
      tel.substring(6, 10)
    );
  }

  const _getCountries = async value => {
    try {
      const respones = await dispatch(getCountries());
      if (respones.res_code === '00') {
        setCountries(respones.results);
      }
    } catch (error) {}
  };

  const _getAwardType = async value => {
    try {
      const token = authData.token;
      const payload = getUser.userDetails.res_result.naturalId;

      console.log('KLKLKLKLKL', payload);
      const respones = await dispatch(getAwardType(payload));

      // alert(JSON.stringify(respones))

      console.log('LOLOLOLO' + JSON.stringify(respones));
      // if (respones.res_code === '00') {

      setdataAwardTypeCK(respones);
      // }
    } catch (error) {}
  };

  const _master_award = async () => {
    // alert(this.props.getUser.userDetails.res_result.naturalId)
    try {
      const payload = getUser.userDetails.res_result.naturalId;
      const response = await dispatch(master_award(payload));
      console.log('DataBrand' + JSON.stringify(response));

      if (response.res_code === '00') {

          //  เช็คค่าใน  data ว่า ถ้าค่า  === 0 ก็ไม่ให้แสดง ค่าต้องไม่เท่ากับ 0 
        const Ckdata = response.result.filter(
          data => data.count !== 0,
        );

        // alert(JSON.stringify(Ckdata))
        setAwardType(Ckdata);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _getSmeauthority = async value => {
    try {
      const payload = authData.token;
      console.log('iloveu', payload);
      const respones = await dispatch(
        getSmeauthority({
          token: payload,
        }),
      );
      console.log(respones);
      if (respones.response.res_code === '00') {
        setSmeAuth(respones.response.res_result);
      }
    } catch (error) {}
  };

  const CheckMonthFull = month => {
    if (month === null) {
      return 'DD-MM';
    } else {
      var Month = null;
      if (month === 1) {
        return I18n.locale === 'th' ? (Month = 'มกราคม') : (Month = 'January');
      } else if (month === 2) {
        return I18n.locale === 'th'
          ? (Month = 'กุมภาพันธ์')
          : (Month = 'February');
      } else if (month === 3) {
        return I18n.locale === 'th' ? (Month = 'มีนาคม') : (Month = 'March');
      } else if (month === 4) {
        return I18n.locale === 'th' ? (Month = 'เมษายน') : (Month = 'April');
      } else if (month === 5) {
        return I18n.locale === 'th' ? (Month = 'พฤษภาคม') : (Month = 'May');
      } else if (month === 6) {
        return I18n.locale === 'th' ? (Month = 'มิถุนายน') : (Month = 'June');
      } else if (month === 7) {
        return I18n.locale === 'th' ? (Month = 'กรกฎาคม') : (Month = 'July');
      } else if (month === 8) {
        return I18n.locale === 'th' ? (Month = 'สิงหาคม') : (Month = 'August');
      } else if (month === 9) {
        return I18n.locale === 'th'
          ? (Month = 'กันยายน')
          : (Month = 'September');
      } else if (month === 10) {
        return I18n.locale === 'th' ? (Month = 'ตุลาคม') : (Month = 'October');
      } else if (month === 11) {
        return I18n.locale === 'th'
          ? (Month = 'พฤศจิกายน')
          : (Month = 'November');
      } else if (month === 12) {
        return I18n.locale === 'th'
          ? (Month = 'ธันวาคม')
          : (Month = 'December');
      }
    }
  };

  const Changpassword = async () => {
    const deepLink = getDeepLink('callback');
    const code = jwt_decode(authData.token).id_token;
    const urll = `https://sso.ditp.go.th/sso/auth/pre_changepassword?client_id=ssoidtest&token=${code}&redirect_uri=${deepLink}&test=123`;

    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(urll, code, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(response => {
          // console.log('ค่า', response.type);
          if (response.type === 'success') {
            AlertLogout();
          }
        });
      } else Linking.openURL(urll);
    } catch (error) {
      Linking.openURL(urll);
    }
  };

  const AlertLogout = () => {
    Alert.alert(
      I18n.t('translate_ChangepasswordProTitle'),
      I18n.t('translate_ChangepasswordProSubtitle'),
      [{text: I18n.t('btn_submit_complaintP1'), onPress: () => logout()}],
      {cancelable: false},
    );
  };

  const AlertLogout2 = () => {
    dispatch(
      getInfo({
        token: authData.token,
      }),
    );
  };

  const logout = () => {
    dispatch({
      type: 'GET_REGION_FAIL',
      payload: null,
    });
    dispatch(
      logoutUser({
        device_uuid:
          getNotification.tokenNotification != undefined
            ? getNotification.tokenNotification
            : '0',
        token: authData.token,
      }),
    );
  };

  const returnValue = () => {
    if (getUser.userDetails.res_result.type != 6) {
      settitle(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.titleTh
          : getUser.userDetails.res_result.sub_member.titleTh,
      );
      settitleEN(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.titleEn
          : getUser.userDetails.res_result.sub_member.titleEn,
      );
      setname(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.nameTh
          : getUser.userDetails.res_result.sub_member.nameTh,
      );
      setnameEN(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.nameEn
          : getUser.userDetails.res_result.sub_member.nameEn,
      );
      setlnameEN(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.lastnameEn
          : getUser.userDetails.res_result.sub_member.lastnameEn,
      );
      setlname(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.lastnameTh
          : getUser.userDetails.res_result.sub_member.lastnameTh,
      );
      setemail(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.email
          : getUser.userDetails.res_result.sub_member.email,
      );
      setphoneN(
        getUser.userDetails.res_result.member != undefined
          ? getUser.userDetails.res_result.member.tel
          : getUser.userDetails.res_result.sub_member.tel,
      );
      setidcard(
        getUser.userDetails.res_result.sub_member != undefined
          ? getUser.userDetails.res_result.sub_member.cid
          : '',
      );
      if (getUser.userDetails.res_result.type != 6) {
        setCountryCodePhone(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.tel_code
            : getUser.userDetails.res_result.sub_member.tel_code,
        );
        setCountryCode(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.tel_country_code
            : getUser.userDetails.res_result.sub_member.tel_country_code,
        );
        setcorporate(
          getUser.userDetails.res_result.corporate != undefined
            ? getUser.userDetails.res_result.corporate.name
            : '',
        );
        setaddress(
          getUser.userDetails.res_result.addressTh != undefined
            ? getUser.userDetails.res_result.addressTh.address
            : '',
        );
        setsubdistrict(
          getUser.userDetails.res_result.addressTh != undefined
            ? getUser.userDetails.res_result.addressTh.subdistrict
            : '',
        );
        setdistrict(
          getUser.userDetails.res_result.addressTh != undefined
            ? getUser.userDetails.res_result.addressTh.district
            : '',
        );
        setprovince(
          getUser.userDetails.res_result.addressTh != undefined
            ? getUser.userDetails.res_result.addressTh.province
            : '',
        );
        setpostcode(
          getUser.userDetails.res_result.addressTh != undefined
            ? getUser.userDetails.res_result.addressTh.postcode
            : '',
        );
        setcontactAdress(
          getUser.userDetails.res_result.contact != undefined
            ? getUser.userDetails.res_result.contact.address
            : '',
        );
        setcontactsubdistrict(
          getUser.userDetails.res_result.contact != undefined
            ? getUser.userDetails.res_result.contact.subdistrict
            : '',
        );
        setcontactdistrict(
          getUser.userDetails.res_result.contact != undefined
            ? getUser.userDetails.res_result.contact.district
            : '',
        );
        setcontactprovince(
          getUser.userDetails.res_result.contact != undefined
            ? getUser.userDetails.res_result.contact.province
            : '',
        );
        setcontactpostcode(
          getUser.userDetails.res_result.contact != undefined
            ? getUser.userDetails.res_result.contact.postcode
            : '',
        );
      }
    }
  };

  useEffect(() => {
    try {
      if (getUser.userDetails.res_result.type != 6) {
        settitle(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.titleTh
            : getUser.userDetails.res_result.sub_member.titleTh,
        );
        settitleEN(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.titleEn
            : getUser.userDetails.res_result.sub_member.titleEn,
        );
        setname(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.nameTh
            : getUser.userDetails.res_result.sub_member.nameTh,
        );
        setnameEN(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.nameEn
            : getUser.userDetails.res_result.sub_member.nameEn,
        );
        setlnameEN(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.lastnameEn
            : getUser.userDetails.res_result.sub_member.lastnameEn,
        );
        setlname(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.lastnameTh
            : getUser.userDetails.res_result.sub_member.lastnameTh,
        );
        setemail(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.email
            : getUser.userDetails.res_result.sub_member.email,
        );
        setphoneN(
          getUser.userDetails.res_result.member != undefined
            ? getUser.userDetails.res_result.member.tel
            : getUser.userDetails.res_result.sub_member.tel,
        );
        setidcard(
          getUser.userDetails.res_result.sub_member != undefined
            ? getUser.userDetails.res_result.sub_member.cid
            : '',
        );
        if (getUser.userDetails.res_result.type != 6) {
          setCountryCodePhone(
            getUser.userDetails.res_result.member != undefined
              ? getUser.userDetails.res_result.member.tel_code
              : getUser.userDetails.res_result.sub_member.tel_code,
          );
          setCountryCode(
            getUser.userDetails.res_result.member != undefined
              ? getUser.userDetails.res_result.member.tel_country_code
              : getUser.userDetails.res_result.sub_member.tel_country_code,
          );
        }
      }

      SafeArea.getSafeAreaInsetsForRootView().then(result => {
        if (result.safeAreaInsets.bottom != 0) {
          setbottom(20);
        }
      });
      // _getActivitySme();
      // _getActivity();

      _getSmeauthority();
      _getCountries();
      // _getAwardType();
      _master_award();
    } catch (error) {}
  }, [isFocused]);

  const handleIndexChange = async index => {
    try {
      if (Editdata === true) {
        console.log('NEDITE');
        setSelecIndex(index);
      } else {
        console.log('EDITE');

        setSaveEdit(true);
      }
    } catch (error) {}
  };

  const imageGalleryLaunch = async value => {
    const options = {
      title: 'Take Photo',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
      multiple: true,
    };

    launchImageLibrary(options, response => {
      // let responses = response.assets[0];
      // //  console.log(responses)
      // let path = responses.uri;
      // console.log(path)
      if (!response.didCancel) {
        let responses = response.assets[0];
        let path = responses.uri;
        //  alert(path)
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!responses.fileName) {
          responses.fileName = path.split('.').pop();
        }
        console.log('responses.uri');
        console.log(responses.uri);
        seturl(responses.uri);
        setimg(responses.fileName);
        RNFetchBlob.fetch(
          'POST',
          getUser.userDetails.res_result.type != 6
            ? 'http://one.ditp.go.th/api/upload_profile'
            : 'http://one.ditp.go.th/api/upload_profile_authorities',
          getUser.userDetails.res_result.type != 6
            ? {
                token: authData.token,
              }
            : {
                Authorization: 'Bearer ' + authData.token.res_result.token,
              },
          [
            {
              name: 'profile',
              filename: responses.fileName,

              data: RNFetchBlob.wrap(
                Platform.OS === 'android'
                  ? responses.uri
                  : responses.uri.replace('file://', ''),
              ),
            },
          ],
        ).then(response2 => {
          console.log(response2.data);
          let response1 = JSON.parse(response2.data);
          console.log(response1);
        });
        console.log('DADATR1');
        console.log(
          RNFetchBlob.wrap(
            Platform.OS === 'android'
              ? responses.uri
              : responses.uri.replace('file://', ''),
          ),
        );

        dispatch({
          type: 'GET_IMAGEPROFILE_SUCCESS',
          payload:
            Platform.OS === 'android'
              ? responses.uri
              : responses.uri.replace('file://', ''),
        });
      }
      RBsheet1.close();
    });
  };

  const ListAward = ({item, index}) => {
    return (
      <View style={{flexDirection:'row',marginHorizontal:5}}>
        {/* {item.count >= 1 && ( */}
         
            <Image
              style={{width: 60, height: 55}}
              source={{uri:item.img}}
            />
       
       {/* )}  */}
        
      </View>
    );
  };

  const TakePhoto = async value => {
    // alert('ควย')
    //     const options1 = {
    //       title: 'Select video',
    //       mediaType: 'photo',
    //       path: 'photo',
    //       quality: 0.3,
    // }
    // title: 'Select video',
    //       mediaType: 'photo',
    //       path: 'photo',
    //       quality: 0.3,
    //  launchCamera(options1, response => {
    //   let responses = response.didCancel;
    //  console.log(responses)
    // let path = responses.uri;
    //     console.log(response);
    //     if (!response.didCancel) {
    //       let responses = response.assets[0];
    // //  console.log(responses)
    // // let path = responses.uri;
    //       let path = responses.uri;
    //       // console.log("ffff",path);
    //       if (Platform.OS === 'ios') {
    //         path = '~' + path.substring(path.indexOf('/Documents'));
    //       }
    //       if (!responses.fileName) {
    //         responses.fileName = path.split('.').pop();
    //       }
    //       seturl(responses.uri);
    //       setimg(responses.fileName);
    //       RNFetchBlob.fetch(
    //         'POST',
    //         getUser.userDetails.res_result.type != 6
    //           ? 'http://one.ditp.go.th/api/upload_profile'
    //           : 'http://one.ditp.go.th/api/upload_profile_authorities',
    //         getUser.userDetails.res_result.type != 6
    //           ? {
    //               token: authData.token,
    //             }
    //           : {
    //               Authorization: 'Bearer ' + authData.token.res_result.token,
    //             },
    //         [
    //           {
    //             name: 'profile',
    //             filename: responses.fileName,
    //             data: RNFetchBlob.wrap(
    //               Platform.OS === 'android'
    //                 ? responses.uri
    //                 : responses.uri.replace('file://', ''),
    //             ),
    //           },
    //         ],
    //       ).then(response2 => {
    //         let response1 = JSON.parse(response2.data);
    //         console.log(response1);
    //       });
    //       dispatch({
    //         type: 'GET_IMAGEPROFILE_SUCCESS',
    //         payload:
    //           Platform.OS === 'android'
    //             ? responses.uri
    //             : responses.uri.replace('file://', ''),
    //       });
    //     }
    // RBsheet1.close();
    // });
  };

  const handleIndexChange2 = (index, number) => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    setSelecIndexYear(index);
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
  };

  const handleIndexChange3 = (index, number) => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    setSelecIndexYear1(index);
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
  };

  //Viewmore
  const DataAct2 = () => {
    try {
      const ActivityAccept2 = ActivityAccept;
      var number = [];
      if (ActivityAccept2.length > Page) {
        for (let index = 0; index < Page; index++) {
          number.push(ActivityAccept2[index]);
        }

        return number;
      } else {
        number.push(ActivityAccept2);

        return number[0];
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };
  DataAct2();

  const DataActSuses = values => {
    try {
      const Actitvity2020 = ActivityYear[year3];
      const ActivityYear2019 = ActivityYear[year2];
      const ActivityYear2018 = ActivityYear[year1];
      var number = [];
      if (values == 1) {
        if (Actitvity2020.length > Page3) {
          for (let index = 0; index < Page3; index++) {
            number.push(Actitvity2020[index]);
          }

          return number;
        } else {
          number.push(Actitvity2020);
          return number[0];
        }
      } else if (values == 2) {
        if (ActivityYear2019.length > Page4) {
          for (let index = 0; index < Page4; index++) {
            number.push(ActivityYear2019[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2019);
          return number[0];
        }
      } else if (values == 3) {
        if (ActivityYear2018.length > Page5) {
          for (let index = 0; index < Page5; index++) {
            number.push(ActivityYear2018[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2018);
          return number[0];
        }
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };
  DataActSuses();

  const DataHis = () => {
    try {
      const ActivitySme2 = ActivitySme;
      var number = [];
      if (ActivitySme2.length > Page2) {
        for (let index = 0; index < Page2; index++) {
          number.push(ActivitySme2[index]);
        }

        return number;
      } else {
        number.push(ActivitySme2);

        return number[0];
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };
  DataHis();

  const DataHisSuses = values => {
    try {
      const Actitvity2020 = ActivityYearSme[year33];
      const ActivityYear2019 = ActivityYearSme[year22];
      const ActivityYear2018 = ActivityYearSme[year11];
      var number = [];
      if (values == 1) {
        if (Actitvity2020.length > Page6) {
          for (let index = 0; index < Page6; index++) {
            number.push(Actitvity2020[index]);
          }

          return number;
        } else {
          number.push(Actitvity2020);
          return number[0];
        }
      } else if (values == 2) {
        if (ActivityYear2019.length > Page7) {
          for (let index = 0; index < Page7; index++) {
            number.push(ActivityYear2019[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2019);
          return number[0];
        }
      } else if (values == 3) {
        if (ActivityYear2018.length > Page8) {
          for (let index = 0; index < Page8; index++) {
            number.push(ActivityYear2018[index]);
          }

          return number;
        } else {
          number.push(ActivityYear2018);
          return number[0];
        }
      }
    } catch (error) {
      return 'ไม่แสดงข้อมูล';
    }
  };
  DataHisSuses();
  function FullDate(Viewdate) {
    var strSplitDate = String(Viewdate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear() + 543;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm;
    }
    date = dd + ' ' + CheckMonthFull(mm) + ' ' + yyyy;
    return date.toString();
  }

  function formatdateAct(strDate) {
    var strSplitDate = String(strDate).split(' ');

    var date = new Date(strSplitDate[0]);
    var Time = strSplitDate[1];

    var TimeN = String(Time).split(':');
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear() + 543;
    var Year = yyyy.toString();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date =
      dd +
      '-' +
      mm +
      '-' +
      Year.substring(2, 4) +
      ' ' +
      TimeN[0] +
      ':' +
      TimeN[1];

    return date.toString();
  }

  const Bar = () => {
    if (page === 1) {
      return (
        <View style={{flex: 1, left: 48, top: 10, marginBottom: 10}}>
          {ViewProfile === true && (
            <Overlay
              overlayStyle={{
                backgroundColor: '#000000',
                // borderColor: 'transparent',
                opacity: 1,
                shadowOpacity: 0,
              }}
              backdropStyle={{backgroundColor: '#00000'}}
              onBackdropPress={() => setProfile(false)}
              fullScreen={true}>
              <SafeAreaView style={{flex: 1}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        setProfile(false);
                        RBsheet1.close();
                      }, 200);
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../image/CloseCamra.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <ImageBackground
                      imageStyle={{
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        width: '100%',
                        height: '75%',
                      }}
                      source={{uri: url}}
                      style={{
                        width: '100%',
                        height: '75%',
                      }}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </Overlay>
          )}
          <View style={{bottom: bottom}}>
            <View style={{padding: 10}}>
              <TouchableOpacity
                // style={{marginBottom: 10}}
                onPress={() => {
                  setTimeout(() => {
                    setProfile(true);
                  }, 200);
                }}>
                <View style={Style.ViewSub13}>
                  <Image
                    style={{width: 14, height: 17}}
                    source={require('../../image/ViewProfile1.png')}
                  />
                  <Text style={Style.TextSub8}>
                    {'   '}
                    {I18n.t('translate_ViewProfile')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={{padding: 10}}>
              <TouchableOpacity
                // style={{marginBottom: 10}}
                onPress={() => {
                  setTimeout(() => {
                    TakePhoto();
                  }, 200);
                }}>
                <View style={Style.ViewSub13}>
                  <Image
                    style={Style.ImageSub5}
                    source={require('../../image/Camara.png')}
                  />
                  <Text style={Style.TextSub8}>
                    {'   '}
                    {I18n.t('translate_takePhoto')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={() => {
                  imageGalleryLaunch();
                }}>
                <View style={Style.ViewSub13}>
                  <Image
                    style={Style.ImageSub5}
                    source={require('../../image/gallry.png')}
                  />
                  <Text style={Style.TextSub8}>
                    {'   '}
                    {I18n.t('translate_SelecPhoto')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={[Styles.SafeArea, {flex: 1}]}>
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
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      <RBSheet
        ref={ref => {
          setRBsheet1(ref);
        }}
        height={heightSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: '#2d6dc490',
          },
          draggableIcon: {
            backgroundColor: '#f1f1f1',
            width: 66,
            height: 8,
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        {Bar()}
      </RBSheet>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 20}
        style={{flex: 1, zIndex: -1}}>
        <ScrollView style={{zIndex: -1}}>
          <View style={Styles.ViewSub1}>
            <ImageBackground
              imageStyle={Styles.ImagSubBackground}
              style={Styles.ImageBackground}
              source={require('../../image/BGlogoProfile.png')}>
              <Avatar
                containerStyle={Styles.AvatarContainer}
                size={100}
                overlayContainerStyle={{borderWidth: 2, borderColor: '#FFFFFF'}}
                rounded
                source={{uri: url}}
              />
            </ImageBackground>
            <View style={Styles.flexDirection}>
              <Avatar
                containerStyle={Styles.AvatarContainer2}
                onPress={() => {
                  pageSet(1);
                  setTimeout(() => {
                    RBsheet1.open();
                  }, 200);
                }}
                size={35}
                rounded
                overlayContainerStyle={Styles.overlayContainer}
                icon={{
                  name: 'photo-camera',
                  type: 'material',
                  color: '#2a9df0',
                  size: 19,
                }}
              />
            </View>
          </View>
          <View style={Styles.ViewSub2}>
            {getUser.userDetails.res_result.type === 1 && (
              <View style={[Styles.ViewSub3]}>
                <Text style={Styles.TextCompany}>{company}</Text>
              </View>
            )}
            {getUser.userDetails.res_result.type === 2 && (
              <View style={[Styles.ViewSub3]}>
                <Text style={Styles.TextCompany}>{corporate}</Text>
              </View>
            )}
            {/*LOGO สมาชิก */}
            {getUser.userDetails.res_result.type != 6 &&
              getUser.userDetails.res_result.type != 4 &&
              getUser.userDetails.res_result.type != 3 && (
                <View>
                  {getStatus.isResult != undefined && (
                    <View style={Styles.ViewSub4}>
                      {getStatus.isResult.status_ditp.status !=
                      'not active ditp' ? (
                        <View style={[Styles.flexDirectionRow, {}]}>
                          {getStatus.isResult.status_ditp.nameEn != null &&(
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['#59a6e4', '#2d6dc4']}
                            style={{
                              flexWrap: 'wrap',
                              height: 20,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                              marginHorizontal: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#FFFFFF',
                                textAlign: 'center',
                                marginTop: -2,
                              }}>
                              {getStatus.isResult.status_ditp.nameEn}
                             
                            </Text>
                          </LinearGradient>
                          )}
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['#59a6e4', '#2d6dc4']}
                            style={{
                              width: 25,
                              height: 20,
                              borderRadius: 8,
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: 15,
                                height: 13,
                                marginTop: 4,
                              }}
                              source={require('../../image/logoMM.png')}
                            />
                          </LinearGradient>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            openLink2(getStatus.isResult.status_ditp.url_regis);
                          }}>
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['#fc9898', '#f86c6b']}
                            style={{
                              flexWrap: 'wrap',
                              height: 20,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                              marginHorizontal: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#FFFFFF',
                                textAlign: 'center',
                                marginTop: -2,
                              }}>
                              ยังไม่ได้สมัครสมาชิกกรม
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              )}

            {/*ยืนยันตัวตน */}
            {getStatus.isResult != undefined && (
              <View>
                {getStatus.isResult.status_confirm_identity.status_code ===
                  0 && (
                  <View style={{alignItems: 'center'}}>
                    <View style={Styles.ViewSub21}>
                      <TouchableOpacity
                        onPress={() =>
                          setTimeout(() => {
                            navigation.navigate('Identity');
                          }, 200)
                        }
                        style={Styles.ViewSub32}>
                        <View style={Styles.ViewSub33}>
                          <Image
                            style={Styles.ImagSub3}
                            source={require('../../image/Alert12.png')}
                          />
                        </View>
                        <Text style={Styles.textIdent}>
                          {I18n.t('translate_Confirm_identity')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{bottom: 10}}>
                      {getUser.userDetails.res_result.type === 1 && (
                        <View style={Styles.ViewSub31}>
                          <Text style={Styles.textAlert}>
                            {I18n.t('translate_NonVerified')}
                          </Text>
                        </View>
                      )}
                      {getUser.userDetails.res_result.type === 2 && (
                        <View style={Styles.ViewSub31}>
                          <Text style={Styles.textAlert}>
                            {I18n.t('translate_NonVerified')}
                          </Text>
                        </View>
                      )}
                      {getUser.userDetails.res_result.type === 3 ||
                      getUser.userDetails.res_result.type === 4 ? (
                        <View style={Styles.ViewSub31}>
                          <Text style={Styles.textAlert}>
                            {I18n.t('translate_NonVerified')}
                          </Text>
                        </View>
                      ) : (
                        <View />
                      )}
                    </View>
                  </View>
                )}

                {getStatus.isResult != undefined && (
                  <View>
                    {getStatus.isResult.status_confirm_identity.status_code ===
                      1 && (
                      <View>
                        <View style={Styles.ViewSub34}>
                          <Image
                            style={Styles.ImagSub3}
                            source={require('../../image/watingPro.png')}
                          />
                        </View>
                        <View style={Styles.ViewSub35}>
                          <TouchableOpacity disabled style={Styles.ViewSub36}>
                            <Text style={Styles.textIdent}>
                              {I18n.t('translate_examination')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>

          {getUser.userDetails.res_result.type != 6 ? (
            <View>
              <View style={Styles.ViewSub8}>
                <SegmentedControlTab
                  selectedIndex={SelecIndex}
                  values={[
                    I18n.t('translate_Memberinformation'),
                    I18n.t('translate_Activities'),
                  ]}
                  onTabPress={handleIndexChange}
                />
              </View>
              {SelecIndex === 0 && (
                <View style={Styles.ViewSub9}>
                  {AcceptEdit === true && (
                    <Overlay
                      onBackdropPress={() => setAcceptEdit(false)}
                      backdropStyle={Styles.backdrop}
                      isVisible>
                      <View style={{height: 240, width: width * 0.8}}>
                        <View
                          style={{
                            flexDirection: 'row-reverse',
                            bottom: 35,
                            left: 10,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setTimeout(() => {
                                setAcceptEdit(false);
                              }, 200);
                            }}>
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../../image/ClosePro.png')}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          {/* <Image
                            style={{width: 70, height: 70}}
                            source={require('../../image/alert.png')}
                          /> */}
                          <Icon name="alert-circle" size={65} color="#f86767" />
                          <View style={{marginTop: 10}}>
                            <Text
                              style={{
                                color: '#f86c6b',
                                textAlign: 'center',
                                fontSize: 16,
                                fontFamily: 'Mitr-Regular',
                              }}>
                              {I18n.t('translate_EditProfile')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                          }}>
                        
                          <TouchableOpacity
                            onPress={() =>
                              setTimeout(() => {
                                setAcceptEdit(false);
                              }, 200)
                            }
                            style={{
                              width: 129,
                              height: 39,
                              borderRadius: 21.5,
                              backgroundColor: '#f86c6b',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 10,
                            }}>
                            <Text style={{fontSize: 20, color: '#ffffff'}}>
                              {I18n.t('translate_Cancel')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setTimeout(() => {
                                _EditeProfile(
                                  getUser.userDetails.res_result.type,
                                );
                                setEditdata(true);
                                setAcceptEdit(false);
                              }, 200)
                            }
                            style={{
                              width: 129,
                              height: 39,
                              borderRadius: 21.5,
                              backgroundColor: '#2d6dc4',
                              alignItems: 'center',
                              justifyContent: 'center',
                             
                            }}>
                            <Text style={{fontSize: 20, color: '#ffffff'}}>
                              {I18n.t('translate_Accept')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Overlay>
                  )}

                  {SaveEdit === true && (
                    <Overlay
                      onBackdropPress={() => setSaveEdit(false)}
                      backdropStyle={Styles.backdrop}
                      isVisible>
                      <View style={{height: 240, width: width * 0.8}}>
                        <View
                          style={{
                            flexDirection: 'row-reverse',
                            bottom: 35,
                            left: 10,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setTimeout(() => {
                                setSaveEdit(false);
                                // setAcceptEdit(false);
                              }, 200);
                            }}>
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../../image/ClosePro.png')}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Image
                            style={{width: 70, height: 70}}
                            source={require('../../image/alert.png')}
                          />
                          <View style={{marginTop: 15}}>
                            <Text
                              style={{
                                fontSize: 24,
                                color: '#e82d2d',
                                textAlign: 'center',
                              }}>
                              {I18n.t('translate_EditProfile')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              setTimeout(() => {
                                _EditeProfile(
                                  getUser.userDetails.res_result.type,
                                );
                                setEditdata(true);
                                setSelecIndex(1);
                                setSaveEdit(false);
                              }, 200)
                            }
                            style={{
                              width: 129,
                              height: 39,
                              borderRadius: 21.5,
                              backgroundColor: '#2d6dc4',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 10,
                            }}>
                            <Text style={{fontSize: 20, color: '#ffffff'}}>
                              {I18n.t('translate_Accept')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setTimeout(() => {
                                setSaveEdit(false);
                              }, 200)
                            }
                            style={{
                              width: 129,
                              height: 39,
                              borderRadius: 21.5,
                              backgroundColor: '#e82d2d',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 20, color: '#ffffff'}}>
                              {I18n.t('translate_Cancel')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Overlay>
                  )}

                  <View style={Styles.ViewSub22}>
                    <View style={[Styles.ViewSub23]}>
                      <ImageBackground
                        imageStyle={Styles.ImageBackgroundEdite}
                        resizeMode="cover"
                        style={{
                          alignItems: 'center',
                        }}
                        source={
                          Editdata
                            ? require('../../image/justID.png')
                            : require('../../image/justIDedit.png')
                        }>
                        <View
                          style={{
                            width: '80%',
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          <View style={[Styles.ViewSub24]}>
                            <View>
                              {getUser.userDetails.res_result.type === 1 && (
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Juristic_ID_Profile')}
                                </Text>
                              )}
                              {getUser.userDetails.res_result.type === 2 && (
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Juristic_ID_Profile')}
                                </Text>
                              )}
                              {getUser.userDetails.res_result.type === 3 && (
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Idcard')}
                                </Text>
                              )}
                              {getUser.userDetails.res_result.type === 4 && (
                                <Text style={Styles.TextSub1}>
                                  ID Card/Passport
                                </Text>
                              )}
                            </View>
                            {/* <TouchableOpacity
                              onPress={() => {
                                setTimeout(() => {
                                  if (Editdata === true) {
                                    setEditdata(false);
                                  } else {
                                    setEditdata(true);
                                    returnValue();
                                  }
                                }, 200);
                              }}
                              style={[Styles.ViewSub25, {padding: 10}]}>
                              <Image
                                style={Styles.ImagSub1}
                                source={require('../../image/editePro.png')}
                              />
                            </TouchableOpacity> */}
                          </View>

                          {getUser.userDetails.res_result.naturalId !=
                            undefined && (
                            <Text style={[Styles.TextSub3, {marginBottom: 10}]}>
                              {getUser.userDetails.res_result.type === 2 ||
                              getUser.userDetails.res_result.type === 4
                                ? getUser.userDetails.res_result.naturalId
                                : getUser.userDetails.res_result.naturalId}
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: '89%',
                            borderBottomColor: '#cccccc40',
                            shadowOffset: {
                              height: 0,
                              width: 1,
                            },
                            shadowRadius: 4,
                            shadowOpacity: 0.9,
                          }}
                        />
                      </ImageBackground>

                      {getUser.userDetails.res_result.type === 1 && (
                        <View>
                          <View style={[{left: 0, marginTop: -5}]}>
                            <ImageBackground
                              resizeMode="cover"
                              imageStyle={Styles.ImageBackgroundEdite}
                              style={{
                                alignItems: 'center',
                              }}
                              source={
                                Editdata
                                  ? require('../../image/justID.png')
                                  : require('../../image/justIDedit.png')
                              }>
                              <View
                                style={{
                                  width: '80%',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}>
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Nameentity')}
                                </Text>
                                <Text style={Styles.TextSub3}>{company}</Text>
                              </View>
                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  width: '89%',
                                  borderBottomColor: '#cccccc40',
                                  shadowOffset: {
                                    height: 0,
                                    width: 1,
                                  },
                                  shadowRadius: 4,
                                  shadowOpacity: 0.9,
                                }}
                              />
                            </ImageBackground>
                          </View>
                          <ImageBackground
                            imageStyle={[Styles.ImageBackgroundEdite]}
                            style={{
                              resizeMode: 'stretch',
                              alignItems: 'center',
                            }}
                            source={
                              Editdata
                                ? getUser.userDetails.res_result.type === 4
                                  ? require('../../image/adressIDedit.png')
                                  : require('../../image/addressID.png')
                                : require('../../image/adressIDedit.png')
                            }>
                            <View
                              style={{
                                width: '80%',
                                marginTop: 10,
                                marginBottom: 10,
                              }}>
                              <Text style={Styles.TextSub1}>
                                {I18n.t('translate_Corporate')}
                              </Text>
                              <View style={{marginLeft: 0}}>
                                <Text style={Styles.TextSub3}>
                                  {address != '' ? address : ''}
                                  {subdistrict != '' ? ' ต.' : ''}
                                  {subdistrict}
                                  {district != '' ? ' อ.' : ''}
                                  {district}
                                  {province != '' ? ' จ.' : ''}
                                  {province} {postcode}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                borderBottomWidth: 1,
                                width: '89%',
                                borderBottomColor: '#cccccc40',
                                shadowOffset: {
                                  height: 0,
                                  width: 1,
                                },
                                shadowRadius: 4,
                                shadowOpacity: 0.9,
                              }}
                            />
                          </ImageBackground>
                        </View>
                      )}
                      {getUser.userDetails.res_result.type === 2 && (
                        <View>
                          <View style={[{left: 0, marginTop: -5}]}>
                            <ImageBackground
                              resizeMode="cover"
                              imageStyle={Styles.ImageBackgroundEdite}
                              style={{
                                alignItems: 'center',
                              }}
                              source={require('../../image/group-2-copy-25.png')}>
                              <View
                                style={{
                                  width: '80%',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}>
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Nameentity')}
                                </Text>
                                <Text style={Styles.TextSub1}>{corporate}</Text>
                              </View>
                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  width: '89%',
                                  borderBottomColor: '#cccccc40',
                                  shadowOffset: {
                                    height: 0,
                                    width: 1,
                                  },
                                  shadowRadius: 4,
                                  shadowOpacity: 0.9,
                                }}
                              />
                            </ImageBackground>

                            <ImageBackground
                              resizeMode="cover"
                              imageStyle={Styles.ImageBackgroundEdite}
                              style={{
                                alignItems: 'center',
                              }}
                              source={require('../../image/group-2-copy-251.png')}>
                              <View style={{width: '80%', marginTop: 10}}>
                                <Text style={[Styles.TextSub1, {left: 0}]}>
                                  {I18n.t('translate_Corporate')}
                                </Text>
                                <View style={{flexDirection: 'column'}}>
                                  <Text style={Styles.TextSub3}>
                                    {address4}
                                  </Text>
                                  <Text style={Styles.TextSub3}>
                                    {country4}
                                  </Text>
                                </View>
                              </View>
                            </ImageBackground>
                          </View>
                        </View>
                      )}

                      <View>
                        <ImageBackground
                          imageStyle={[Styles.ImageBackgroundEdite]}
                          style={{
                            resizeMode: 'stretch',
                            alignItems: 'center',

                            height:
                              getUser.userDetails.res_result.type === 2
                                ? 0
                                : null,
                          }}
                          source={
                            Editdata
                              ? getUser.userDetails.res_result.type === 4
                                ? require('../../image/bgaadressproflie.png')
                                : require('../../image/bgaadressproflie.png')
                              : require('../../image/bgaadressproflie.png')
                          }>
                          <View
                            style={{
                              width: '80%',
                              marginTop:
                                getUser.userDetails.res_result.type != 4
                                  ? 10
                                  : 10,
                              marginBottom: 10,
                            }}>
                            {getUser.userDetails.res_result.type != 2 ? (
                              <Text style={Styles.TextSub1}>
                                {I18n.t('translate_Contactaddress')}
                              </Text>
                            ) : null}
                            {getUser.userDetails.res_result.type === 1 && (
                              <View style={{width: '100%'}}>
                                {Editdata === true ? (
                                  <View style={{width: '100%'}}>
                                    <Text style={Styles.TextSub3}>
                                      {contactAdress != '' ? contactAdress : ''}
                                      {contactsubdistrict != '' ? ' ต.' : ''}
                                      {contactsubdistrict}
                                      {contactdistrict != '' ? ' อ.' : ''}
                                      {contactdistrict}
                                      {contactprovince != '' ? ' จ.' : ''}
                                      {contactprovince}{' '}
                                      {contactpostcode != ''
                                        ? contactpostcode
                                        : ''}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      right: 0,
                                      bottom: 10,
                                      marginTop: 10,
                                    }}>
                                    <View style={{width: '80%'}}>
                                      <Text style={Styles.fileText}>
                                        {I18n.t('translate_Edite1')}
                                      </Text>
                                    </View>
                                    <ImageBackground
                                      source={require('../../image/TextinputContect.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '100%', height: 32}}
                                      style={{height: 32}}>
                                      <View
                                        style={{
                                          left: 5,

                                          justifyContent: 'center',
                                          width: '90%',
                                        }}>
                                        <TextInput
                                          maxLength={15}
                                          style={{
                                            height:
                                              Platform.OS === 'ios' ? 32 : 42,
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                          }}
                                          value={contactAdress}
                                          onChangeText={text =>
                                            setcontactAdress(text)
                                          }
                                        />
                                      </View>
                                    </ImageBackground>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={[
                                          Styles.fileText,
                                          {width: '50%'},
                                        ]}>
                                        {I18n.t('translate_Edite2')}
                                      </Text>
                                      <View
                                        style={{
                                          width: '50%',
                                        }}>
                                        <Text style={Styles.fileText}>
                                          {I18n.t('translate_Edite4')}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={Styles.ViewSub26}>
                                      <ImageBackground
                                        source={require('../../image/TextinputPro2.png')}
                                        resizeMode={'stretch'}
                                        style={{
                                          width: '60%',
                                          height: 32,
                                        }}
                                        imageStyle={{
                                          width: '90%',
                                          height: 32,
                                        }}>
                                        <View
                                          style={{
                                            left: 5,
                                            justifyContent: 'center',
                                            width: '80%',
                                          }}>
                                          <TextInput
                                            maxLength={15}
                                            style={{
                                              height:
                                                Platform.OS === 'ios' ? 32 : 42,
                                              fontSize: 23,
                                              color: '#73838f',
                                              fontWeight: 'normal',
                                              fontFamily: 'PSL Kittithada Pro',
                                            }}
                                            value={contactsubdistrict}
                                            onChangeText={text =>
                                              setcontactsubdistrict(text)
                                            }
                                          />
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require('../../image/TextinputPro2.png')}
                                        resizeMode={'stretch'}
                                        style={{
                                          width: '60%',
                                          height: 32,
                                        }}
                                        imageStyle={{
                                          width: '90%',
                                          height: 32,
                                        }}>
                                        <View
                                          style={{
                                            left: 5,
                                            justifyContent: 'center',
                                            width: '80%',
                                          }}>
                                          <TextInput
                                            maxLength={15}
                                            style={{
                                              fontSize: 23,
                                              color: '#73838f',
                                              fontWeight: 'normal',
                                              fontFamily: 'PSL Kittithada Pro',
                                              height:
                                                Platform.OS === 'ios' ? 32 : 42,
                                            }}
                                            value={contactdistrict}
                                            onChangeText={text =>
                                              setcontactdistrict(text)
                                            }
                                          />
                                        </View>
                                      </ImageBackground>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 3,
                                      }}>
                                      <Text
                                        style={[
                                          Styles.fileText,
                                          {width: '50%'},
                                        ]}>
                                        {I18n.t('translate_Edite3')}
                                      </Text>
                                      <View style={{width: '40%'}}>
                                        <Text style={Styles.fileText}>
                                          {I18n.t('translate_Edite5')}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={Styles.ViewSub26}>
                                      <ImageBackground
                                        source={require('../../image/TextinputPro2.png')}
                                        resizeMode={'stretch'}
                                        style={{
                                          width: '60%',
                                          height: 32,
                                        }}
                                        imageStyle={{
                                          width: '90%',
                                          height: 32,
                                        }}>
                                        <View
                                          style={{
                                            left: 5,
                                            justifyContent: 'center',
                                            width: '80%',
                                          }}>
                                          <TextInput
                                            maxLength={15}
                                            style={{
                                              fontSize: 23,
                                              color: '#73838f',
                                              fontWeight: 'normal',
                                              fontFamily: 'PSL Kittithada Pro',
                                              height:
                                                Platform.OS === 'ios' ? 32 : 42,
                                            }}
                                            value={contactprovince}
                                            onChangeText={text =>
                                              setcontactprovince(text)
                                            }
                                          />
                                        </View>
                                      </ImageBackground>

                                      <ImageBackground
                                        source={require('../../image/TextinputPro2.png')}
                                        resizeMode={'stretch'}
                                        style={{
                                          width: '60%',
                                          height: 32,
                                        }}
                                        imageStyle={{
                                          width: '90%',
                                          height: 32,
                                        }}>
                                        <View
                                          style={{
                                            left: 5,
                                            justifyContent: 'center',
                                            width: '80%',
                                          }}>
                                          <TextInput
                                            maxLength={15}
                                            style={{
                                              fontSize: 23,
                                              color: '#73838f',
                                              fontWeight: 'normal',
                                              fontFamily: 'PSL Kittithada Pro',
                                              height:
                                                Platform.OS === 'ios' ? 32 : 42,
                                            }}
                                            value={contactpostcode}
                                            onChangeText={text =>
                                              setcontactpostcode(text)
                                            }
                                          />
                                        </View>
                                      </ImageBackground>
                                    </View>
                                  </View>
                                )}
                              </View>
                            )}
                          </View>

                          {getUser.userDetails.res_result.type === 3 && (
                            <View style={{width: '80%', bottom: 10}}>
                              {Editdata === true ? (
                                <View>
                                  <Text style={Styles.TextSub3}>
                                    {address != '' ? address : ''}
                                    {subdistrict != '' ? ' ต.' : ''}
                                    {subdistrict}
                                    {district != '' ? ' อ.' : ''}
                                    {district}
                                    {province != '' ? ' จ.' : ''}
                                    {province} {postcode != '' ? postcode : ''}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{right: 0, bottom: 10, marginTop: 10}}>
                                  <View style={{width: '80%'}}>
                                    <Text style={Styles.fileText}>
                                      {I18n.t('translate_Edite1')}
                                    </Text>
                                  </View>
                                  <ImageBackground
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    source={require('../../image/TextinputContect.png')}
                                    style={{}}>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        width: '95%',
                                      }}>
                                      <TextInput
                                        maxLength={15}
                                        style={{
                                          fontSize: 23,
                                          left: 4,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          top: Platform.OS === 'ios' ? 0 : -8,
                                        }}
                                        value={address}
                                        onChangeText={text => setaddress(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text
                                      style={[Styles.fileText, {width: '50%'}]}>
                                      {I18n.t('translate_Edite2')}
                                    </Text>
                                    <View
                                      style={{
                                        width: '50%',
                                      }}>
                                      <Text style={Styles.fileText}>
                                        {I18n.t('translate_Edite4')}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={Styles.ViewSub26}>
                                    <ImageBackground
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '90%', height: 30}}
                                      source={require('../../image/TextinputPro2.png')}
                                      style={{
                                        width: '60%',
                                        height: 30,
                                      }}>
                                      <View
                                        style={{
                                          left: 5,
                                          justifyContent: 'center',
                                          width: '80%',
                                        }}>
                                        <TextInput
                                          maxLength={15}
                                          style={{
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                            top: Platform.OS === 'ios' ? 0 : -2,
                                            height:
                                              Platform.OS === 'ios' ? 35 : 45,
                                          }}
                                          value={subdistrict}
                                          onChangeText={text =>
                                            setsubdistrict(text)
                                          }
                                        />
                                      </View>
                                    </ImageBackground>

                                    <ImageBackground
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '90%', height: 30}}
                                      source={require('../../image/TextinputPro2.png')}
                                      style={{
                                        width: '60%',
                                        height: 30,
                                      }}>
                                      <View
                                        style={{
                                          left: 5,
                                          justifyContent: 'center',
                                          width: '80%',
                                        }}>
                                        <TextInput
                                          maxLength={15}
                                          style={{
                                            top: Platform.OS === 'ios' ? 0 : -2,
                                            height:
                                              Platform.OS === 'ios' ? 35 : 45,
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                          }}
                                          value={district}
                                          onChangeText={text =>
                                            setdistrict(text)
                                          }
                                        />
                                      </View>
                                    </ImageBackground>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: 3,
                                    }}>
                                    <Text
                                      style={[Styles.fileText, {width: '50%'}]}>
                                      {I18n.t('translate_Edite3')}
                                    </Text>
                                    <View style={{width: '40%'}}>
                                      <Text style={Styles.fileText}>
                                        {I18n.t('translate_Edite5')}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={Styles.ViewSub26}>
                                    <ImageBackground
                                      source={require('../../image/TextinputPro2.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '90%', height: 30}}
                                      style={{
                                        width: '60%',
                                        height: 30,
                                      }}>
                                      <View
                                        style={{
                                          left: 5,
                                          justifyContent: 'center',
                                          top: -2,
                                          width: '80%',
                                        }}>
                                        <TextInput
                                          maxLength={15}
                                          style={{
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                            top: Platform.OS === 'ios' ? 0 : -2,
                                            height:
                                              Platform.OS === 'ios' ? 40 : 45,
                                          }}
                                          value={province}
                                          onChangeText={text =>
                                            setprovince(text)
                                          }
                                        />
                                      </View>
                                    </ImageBackground>

                                    <ImageBackground
                                      source={require('../../image/TextinputPro2.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{
                                        width: '90%',
                                        height: 30,
                                      }}
                                      style={{
                                        width: '60%',
                                        height: 30,
                                      }}>
                                      <View style={{flex: 1}}>
                                        <View
                                          style={{
                                            left: 5,
                                            justifyContent: 'center',
                                            width: '80%',
                                          }}>
                                          <TextInput
                                            maxLength={15}
                                            style={{
                                              fontSize: 23,
                                              color: '#73838f',
                                              fontWeight: 'normal',
                                              fontFamily: 'PSL Kittithada Pro',
                                              top:
                                                Platform.OS === 'ios' ? 0 : -2,
                                              height:
                                                Platform.OS === 'ios' ? 35 : 45,
                                            }}
                                            value={postcode}
                                            onChangeText={text =>
                                              setpostcode(text)
                                            }
                                          />
                                        </View>
                                      </View>
                                    </ImageBackground>
                                  </View>
                                </View>
                              )}
                            </View>
                          )}
                          {getUser.userDetails.res_result.type === 4 && (
                            <View style={{width: '80%', marginTop: 0}}>
                              {Editdata === true ? (
                                <View
                                  style={{
                                    width: '80%',
                                    flexDirection: 'column',
                                  }}>
                                  <Text
                                    style={[Styles.TextSub3, {marginTop: -10}]}>
                                    {address4}
                                  </Text>
                                  <View
                                    style={[
                                      Styles.ViewSub26,
                                      {marginTop: 0, marginBottom: 8},
                                    ]}>
                                    <Text style={Styles.TextSub3}>
                                      {country4}
                                    </Text>
                                  </View>
                                </View>
                              ) : (
                                <View style={{width: '100%'}}>
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 32}}
                                    style={{}}>
                                    <View
                                      style={{
                                        height: 32,
                                        marginTop: 2,
                                        marginLeft: 6,
                                        width: '80%',
                                      }}>
                                      <TextInput
                                        maxLength={15}
                                        style={{
                                          height:
                                            Platform.OS === 'ios' ? 32 : 40,
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                        }}
                                        defaultValue={address4}
                                        onChangeText={text => setaddress4(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                  <View
                                    style={{
                                      width: '100%',
                                      marginTop: 10,
                                      marginBottom: 10,
                                    }}>
                                    <ImageBackground
                                      source={require('../../image/TextinputContect.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '100%', height: 32}}
                                      style={{}}>
                                      <View
                                        style={{
                                          marginTop: 2,
                                          marginLeft: 6,
                                          width: '80%',
                                          height: 32,
                                        }}>
                                        <TextInput
                                          style={{
                                            height:
                                              Platform.OS === 'ios' ? 32 : 40,
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                          }}
                                          value={country4}
                                          onChangeText={text =>
                                            setcountry4(text)
                                          }
                                        />
                                      </View>
                                    </ImageBackground>
                                  </View>
                                </View>
                              )}
                            </View>
                          )}
                        </ImageBackground>

                        <ImageBackground
                          resizeMode={'cover'}
                          source={
                            Editdata
                              ? require('../../image/bgaadressproflie.png')
                              : require('../../image/bgaadressproflie.png')
                          }
                          imageStyle={Styles.ImageBackgroundEdite}
                          style={{alignItems: 'center'}}>
                          <View
                            style={{
                              marginTop: 0.5,
                              borderBottomWidth: 1,
                              width: '89%',
                              borderBottomColor: '#cccccc40',
                              shadowOffset: {
                                height: 0,
                                width: 1,
                              },
                              shadowRadius: 4,
                              shadowOpacity: 0.9,
                            }}
                          />
                          <View style={{width: '80%', marginTop: 10}}>
                            <View>
                              <View
                                style={{
                                  marginTop: Platform.OS === 'android' ? 5 : 0,
                                }}>
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Prefix')}
                                </Text>
                              </View>
                              {getUser.userDetails.res_result.type === 1 && (
                                <View>
                                  {Editdata === true ? (
                                    <View style={{left: 0}}>
                                      <Text style={Styles.TextSub3}>
                                        {title}
                                      </Text>
                                    </View>
                                  ) : (
                                    <ImageBackground
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '100%', height: 30}}
                                      source={require('../../image/TextinputContect.png')}
                                      style={{zIndex: 1}}>
                                      <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        _fixAndroidTouchableBug_={true}
                                        style={{
                                          ...pickerSelectStyles2,
                                          inputAndroidContainer: {
                                            width: '100%',
                                          },
                                          headlessAndroidPicker: {},
                                        }}
                                        placeholder={{}}
                                        onValueChange={value => settitle(value)}
                                        items={[
                                          {label: 'นาย', value: 'นาย'},
                                          {label: 'นางสาว', value: 'นางสาว'},
                                          {label: 'นาง', value: 'นาง'},
                                        ]}
                                      />
                                      <View
                                        style={{
                                          flexDirection: 'row-reverse',
                                          width: '100%',
                                        }}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 7,
                                            bottom: 30,
                                            right: -10,
                                            top:
                                              Platform.OS === 'ios' ? -16 : -30,
                                          }}
                                          source={require('../../image/arrowtitle.png')}
                                        />
                                      </View>
                                    </ImageBackground>
                                  )}
                                </View>
                              )}
                            </View>
                            {getUser.userDetails.res_result.type === 2 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      width: '80%',
                                    }}>
                                    <Text style={Styles.TextSub3}>
                                      {titleEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <RNPickerSelect
                                      useNativeAndroidPickerStyle={false}
                                      style={{
                                        ...pickerSelectStyles2,
                                      }}
                                      placeholder={{}}
                                      onValueChange={value => settitleEN(value)}
                                      items={[
                                        {label: 'Mr.', value: 'Mr.'},
                                        {label: 'Mrs.', value: 'Mrs.'},
                                        {label: 'Miss', value: 'Miss'},
                                      ]}
                                    />
                                    <View
                                      style={{
                                        flexDirection: 'row-reverse',
                                        width: '100%',
                                      }}>
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 7,
                                          bottom: 30,
                                          right: -10,
                                          top:
                                            Platform.OS === 'ios' ? -22 : -30,
                                        }}
                                        source={require('../../image/arrowtitle.png')}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}

                            {getUser.userDetails.res_result.type === 3 && (
                              <View style={{width: '100%'}}>
                                {Editdata === true ? (
                                  <View style={{left: 0}}>
                                    <Text style={Styles.TextSub3}>{title}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <RNPickerSelect
                                      useNativeAndroidPickerStyle={false}
                                      style={{
                                        ...pickerSelectStyles2,
                                      }}
                                      placeholder={{}}
                                      onValueChange={value => settitle(value)}
                                      items={[
                                        {label: 'นาย', value: 'นาย'},
                                        {label: 'นางสาว', value: 'นางสาว'},
                                        {label: 'นาง', value: 'นาง'},
                                      ]}
                                    />
                                    <View
                                      style={{
                                        flexDirection: 'row-reverse',
                                        width: '100%',
                                      }}>
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 7,
                                          bottom: 30,
                                          right: -10,
                                          top:
                                            Platform.OS === 'ios' ? -15 : -28,
                                        }}
                                        source={require('../../image/arrowtitle.png')}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 4 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{width: '80%'}}>
                                    <Text style={Styles.TextSub3}>
                                      {titleEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    resizeMode={'stretch'}
                                    source={require('../../image/TextinputContect.png')}
                                    imageStyle={{width: '100%', height: 32}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginTop: 0,
                                        marginLeft: 4,
                                        height: 32,
                                      }}>
                                      <RNPickerSelect
                                        mode="dropdown"
                                        useNativeAndroidPickerStyle={false}
                                        style={{
                                          ...pickerSelectStyles2,
                                        }}
                                        placeholder={{}}
                                        onValueChange={value =>
                                          settitleEN(value)
                                        }
                                        items={[
                                          {label: 'Mr.', value: 'Mr.'},
                                          {label: 'Mrs.', value: 'Mrs.'},
                                          {label: 'Miss', value: 'Miss'},
                                        ]}
                                      />
                                      <View
                                        style={{
                                          flexDirection: 'row-reverse',
                                          width: '100%',
                                        }}>
                                        <Image
                                          style={{
                                            width: 12,
                                            height: 7,

                                            right: -10,
                                            top:
                                              Platform.OS === 'ios' ? -19 : -30,
                                          }}
                                          source={require('../../image/arrowtitle.png')}
                                        />
                                      </View>
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                          </View>
                          <View style={{width: '80%', marginTop: 5, bottom: 4}}>
                            <View style={{left: 0}}>
                              <Text style={Styles.TextSub1}>
                                {I18n.t('translate_name')}
                              </Text>
                              {getUser.userDetails.res_result.type === 1 && (
                                <View>
                                  {Editdata === true ? (
                                    <View style={{left: 0}}>
                                      <Text style={Styles.TextSub3}>
                                        {name}
                                      </Text>
                                    </View>
                                  ) : (
                                    <ImageBackground
                                      source={require('../../image/TextinputContect.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '100%', height: 30}}
                                      style={{}}>
                                      <View
                                        style={{
                                          top: -2,
                                          marginLeft: 4,
                                          width: '80%',
                                        }}>
                                        <TextInput
                                          defaultValue={name}
                                          style={{
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                            height:
                                              Platform.OS === 'ios' ? 35 : 42,
                                          }}
                                          // value={name}
                                          onChangeText={text => setname(text)}
                                        />
                                      </View>
                                    </ImageBackground>
                                  )}
                                </View>
                              )}
                            </View>
                            {getUser.userDetails.res_result.type === 2 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{left: 0}}>
                                    <Text style={Styles.TextSub3}>
                                      {nameEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%'}}
                                    source={require('../../image/TextinputContect.png')}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                        width: '80%',
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 32 : 33,
                                          padding:
                                            Platform.OS === 'android'
                                              ? 3
                                              : null,
                                        }}
                                        value={nameEN}
                                        onChangeText={text => setnameEN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 3 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      left: 0,
                                      top: Platform.OS === 'ios' ? 0 : 0,
                                    }}>
                                    <Text style={Styles.TextSub3}>{name}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%'}}
                                    style={{
                                      width: '100%',
                                      height: 35,
                                    }}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                        width: '80%',

                                        top: Platform.OS === 'ios' ? 0 : -3,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',

                                          height:
                                            Platform.OS === 'ios' ? 35 : 45,
                                        }}
                                        value={name}
                                        onChangeText={text => setname(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 4 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{left: 0}}>
                                    <Text style={Styles.TextSub3}>
                                      {nameEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <View style={{marginTop: 2, marginLeft: 4}}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 32 : 40,
                                        }}
                                        value={nameEN}
                                        onChangeText={text => setnameEN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                          </View>
                          <View style={{width: '80%'}}>
                            <View style={{left: 0}}>
                              <Text style={Styles.TextSub1}>
                                {I18n.t('translate_lname')}
                              </Text>
                              {getUser.userDetails.res_result.type === 1 && (
                                <View>
                                  {Editdata === true ? (
                                    <View style={{left: 0, marginBottom: 10}}>
                                      <Text style={Styles.TextSub3}>
                                        {lname}
                                      </Text>
                                    </View>
                                  ) : (
                                    <ImageBackground
                                      source={require('../../image/TextinputContect.png')}
                                      resizeMode={'stretch'}
                                      imageStyle={{width: '100%', height: 30}}
                                      style={{}}>
                                      <View
                                        style={{
                                          marginLeft: 4,
                                          width: '80%',
                                          marginTop:
                                            Platform.OS === 'ios' ? -2 : 0,
                                        }}>
                                        <TextInput
                                          style={{
                                            fontSize: 23,
                                            color: '#73838f',
                                            fontWeight: 'normal',
                                            fontFamily: 'PSL Kittithada Pro',
                                            height:
                                              Platform.OS === 'ios' ? 35 : 42,
                                          }}
                                          defaultValue={lname}
                                          onChangeText={text => {
                                            console.log(text);
                                            setlname(text);
                                          }}
                                        />
                                      </View>
                                    </ImageBackground>
                                  )}
                                </View>
                              )}
                            </View>

                            {getUser.userDetails.res_result.type === 2 && (
                              <View
                                style={{
                                  height: Platform.OS === 'ios' ? 35 : 60,
                                }}>
                                {Editdata === true ? (
                                  <View style={{left: 0}}>
                                    <Text style={Styles.TextSub3}>
                                      {lnameEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    imageStyle={{width: '100%'}}
                                    resizeMode={'stretch'}
                                    source={require('../../image/TextinputContect.png')}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                        width: '80%',
                                      }}>
                                      <TextInput
                                        style={{
                                          height:
                                            Platform.OS === 'ios' ? 32 : 33,
                                          padding:
                                            Platform.OS === 'android'
                                              ? 3
                                              : null,
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                        }}
                                        value={lnameEN}
                                        onChangeText={text => setlnameEN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 3 && (
                              <View
                                style={{
                                  height: Platform.OS === 'ios' ? 35 : 60,
                                }}>
                                {Editdata === true ? (
                                  <View style={{left: 0}}>
                                    <Text style={Styles.TextSub3}>{lname}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%'}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                        width: '80%',
                                        height: Platform.OS === 'ios' ? 30 : 35,
                                      }}>
                                      <TextInput
                                        style={{
                                          padding:
                                            Platform.OS === 'android'
                                              ? 5
                                              : null,
                                          marginTop:
                                            Platform.OS === 'ios' ? 6 : 0,
                                          // marginTop:Platform.OS === 'ios' ? -4 : 15,
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          // height: Platform.OS === 'ios' ? 35 : 30,
                                        }}
                                        value={lname}
                                        onChangeText={text => setlname(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 4 && (
                              <View
                                style={{
                                  height: Platform.OS === 'ios' ? 30 : 55,
                                }}>
                                {Editdata === true ? (
                                  <View style={{left: 0, marginBottom: 10}}>
                                    <Text style={Styles.TextSub3}>
                                      {lnameEN}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%'}}
                                    source={require('../../image/TextinputContect.png')}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height: 35,
                                          padding:
                                            Platform.OS === 'ios' ? 0 : 5,
                                        }}
                                        value={lnameEN}
                                        onChangeText={text => setlnameEN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                          </View>
                          <View
                            style={{
                              marginTop: Editdata === true ? 0 : 10,
                              borderBottomWidth: 1,
                              width: '89%',
                              borderBottomColor: '#cccccc40',
                              shadowOffset: {
                                height: 0,
                                width: 1,
                              },
                              shadowRadius: 4,
                              shadowOpacity: 0.9,
                            }}
                          />
                        </ImageBackground>

                        {getUser.userDetails.res_result.type === 1 && (
                          <ImageBackground
                            resizeMode={'cover'}
                            imageStyle={{
                              width: '100%',
                              height: null,
                              marginTop: 0,
                            }}
                            style={{alignItems: 'center'}}
                            source={
                              Editdata === true
                                ? require('../../image/bgaadressproflie.png')
                                : require('../../image/bgaadressproflie.png')
                            }>
                            <View
                              style={{
                                width: '80%',
                                marginTop: 10,
                                marginBottom: 10,
                              }}>
                              <Text style={Styles.TextSub1}>
                                {I18n.t('translate_Idcard')}
                              </Text>
                              {Editdata === true ? (
                                <Text style={Styles.TextSub1}>
                                  {idcardSub.length === 13
                                    ? idcard(idcardSub)
                                    : idcardSub}
                                </Text>
                              ) : (
                                <View>
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginTop: 0,
                                        marginLeft: 4,
                                      }}>
                                      <TextInput
                                        style={{
                                          height:
                                            Platform.OS === 'ios' ? 35 : 42,
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                        }}
                                        keyboardType={'phone-pad'}
                                        value={idcardSub}
                                        onChangeText={text => setidcard(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                </View>
                              )}
                            </View>
                            <View
                              style={{
                                borderBottomWidth: 1,
                                width: '89%',
                                borderBottomColor: '#cccccc40',
                                shadowOffset: {
                                  height: 0,
                                  width: 1,
                                },
                                shadowRadius: 4,
                                shadowOpacity: 0.9,
                              }}
                            />
                          </ImageBackground>
                        )}

                        <ImageBackground
                          resizeMode={'cover'}
                          imageStyle={{
                            width: '100%',
                            height: null,
                            marginTop: 0,
                          }}
                          style={{alignItems: 'center'}}
                          source={
                            Editdata
                              ? require('../../image/bgaadressproflie.png')
                              : require('../../image/bgaadressproflie.png')
                          }>
                          <View
                            style={{
                              left: 0,
                              marginTop: 10,
                              width: '80%',
                              marginBottom: 10,
                            }}>
                            <Text style={Styles.TextSub1}>
                              {I18n.t('translate_email')}
                            </Text>
                            {getUser.userDetails.res_result.type === 1 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{marginLeft: 0}}>
                                    <Text style={Styles.TextSub3}>{email}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginLeft: 4,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 35 : 42,
                                        }}
                                        value={email}
                                        onChangeText={text => setemail(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 2 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{marginLeft: 0}}>
                                    <Text style={Styles.TextSub3}>{email}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    style={{
                                      width: '100%',
                                      height: 30,
                                    }}>
                                    <View
                                      style={{
                                        marginTop: 2,
                                        marginLeft: 4,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 32 : 40,
                                        }}
                                        value={email}
                                        onChangeText={text => setemail(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}

                            {getUser.userDetails.res_result.type === 3 && (
                              <View style={{marginTop: 5}}>
                                {Editdata === true ? (
                                  <View style={{marginLeft: 0}}>
                                    <Text style={Styles.TextSub3}>{email}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginTop: 2,
                                        marginLeft: 4,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 35 : 40,
                                        }}
                                        value={email}
                                        onChangeText={text => setemail(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 4 && (
                              <View>
                                {Editdata === true ? (
                                  <View style={{marginLeft: 0}}>
                                    <Text style={Styles.TextSub3}>{email}</Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{}}>
                                    <View
                                      style={{
                                        marginTop: 2,
                                        marginLeft: 4,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 35 : 40,
                                        }}
                                        keyboardType="email-address"
                                        value={email}
                                        onChangeText={text => setemail(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                          </View>

                          <View
                            style={{
                              left: 0,
                              width: '80%',
                              marginTop: 0,
                              marginBottom: 10,
                            }}>
                            <Text style={Styles.TextSub1}>
                              {I18n.t('translate_Phonenumber')}
                            </Text>

                            {getUser.userDetails.res_result.type === 1 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      close={true}
                                      containerButtonStyle={{bottom: 0}}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 7,

                                        right: 3,
                                        top: Platform.OS === 'ios' ? 1 : 3,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />
                                    <Text style={Styles.TextSub3}>
                                      {' '}
                                      {PhoneNum(phoneN)}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View style={{bottom: 0}}>
                                      <CountryPicker
                                        containerButtonStyle={{
                                          bottom: 4,
                                          marginTop: 4,
                                          marginLeft: 5,
                                        }}
                                        countryCode={countryCode}
                                        withFlag={true}
                                        withFilter={true}
                                        withEmoji={true}
                                        withCallingCode={true}
                                        withAlphaFilter={false}
                                        {...{
                                          onSelect,
                                        }}
                                      />
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 7,

                                          left: 37,
                                          top:
                                            Platform.OS === 'ios' ? -23 : -19,
                                        }}
                                        source={require('../../image/arrowtitle.png')}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        marginTop: -12,
                                        marginLeft: 14,
                                        flex: 1,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                        }}
                                        keyboardType={'phone-pad'}
                                        value={phoneN}
                                        onChangeText={text => setphoneN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                            {getUser.userDetails.res_result.type === 2 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      close={true}
                                      containerButtonStyle={{bottom: 0}}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 7,
                                        bottom: 0,

                                        right: 3,
                                        top: Platform.OS === 'ios' ? 1 : 1,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />
                                    <Text style={Styles.TextSub3}>
                                      {' '}
                                      {PhoneNum(phoneN)}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{
                                      // width: 355,
                                      // height: 30,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <View style={{bottom: 0}}>
                                      <CountryPicker
                                        containerButtonStyle={{
                                          bottom: 0,
                                          marginLeft: 10,
                                        }}
                                        countryCode={countryCode}
                                        withFlag={true}
                                        withFilter={true}
                                        withEmoji={true}
                                        withCallingCode={true}
                                        withAlphaFilter={false}
                                        {...{
                                          onSelect,
                                        }}
                                      />
                                      <Image
                                        style={{
                                          width: 12,
                                          height: 7,
                                          bottom: 0,

                                          left: 43,
                                          top:
                                            Platform.OS === 'ios' ? -19 : -15,
                                        }}
                                        source={require('../../image/arrowtitle.png')}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        marginTop: 2,
                                        marginLeft: 10,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          padding: 5,
                                        }}
                                        value={phoneN}
                                        keyboardType={'phone-pad'}
                                        onChangeText={text => setphoneN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}

                            {getUser.userDetails.res_result.type === 3 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      close={true}
                                      containerButtonStyle={{bottom: 0}}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 7,
                                        bottom: 0,

                                        right: 3,
                                        top: Platform.OS === 'ios' ? 1 : -5,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />
                                    <Text style={Styles.TextSub3}>
                                      {' '}
                                      {PhoneNum(phoneN)}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      containerButtonStyle={{bottom: 5}}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 7,
                                        bottom: 0,

                                        right: 3,
                                        top: Platform.OS === 'ios' ? -5 : -5,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />

                                    <View
                                      style={{
                                        marginTop: 2,
                                        marginLeft: 4,
                                        bottom: 5,
                                      }}>
                                      <TextInput
                                        style={{
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          padding: 5,
                                        }}
                                        keyboardType={'phone-pad'}
                                        value={phoneN}
                                        onChangeText={text => setphoneN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}

                            {getUser.userDetails.res_result.type === 4 && (
                              <View>
                                {Editdata === true ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      close={true}
                                      containerButtonStyle={{bottom: 0}}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 12,
                                        height: 7,
                                        bottom: 0,

                                        right: 3,
                                        top: Platform.OS === 'ios' ? 1 : 1,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />

                                    <Text style={Styles.TextSub3}>
                                      {' '}
                                      {PhoneNum(phoneN)}
                                    </Text>
                                  </View>
                                ) : (
                                  <ImageBackground
                                    source={require('../../image/TextinputContect.png')}
                                    resizeMode={'stretch'}
                                    imageStyle={{width: '100%', height: 30}}
                                    style={{
                                      // width: 355,
                                      // height: 30,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CountryPicker
                                      containerButtonStyle={{
                                        bottom: 0,
                                        marginLeft: 5,
                                      }}
                                      countryCode={countryCode}
                                      withFlag={true}
                                      withFilter={true}
                                      withEmoji={true}
                                      withCallingCode={true}
                                      withAlphaFilter={false}
                                      {...{
                                        onSelect,
                                      }}
                                    />
                                    <Image
                                      style={{
                                        width: 10,
                                        height: 7,

                                        top: Platform.OS === 'ios' ? 1 : -2,
                                      }}
                                      source={require('../../image/arrowtitle.png')}
                                    />
                                    <View style={{marginLeft: 10}}>
                                      <TextInput
                                        style={{
                                          // marginTop: Platform.OS === 'ios' ? 1 : -1,
                                          fontSize: 23,
                                          color: '#73838f',
                                          fontWeight: 'normal',
                                          fontFamily: 'PSL Kittithada Pro',
                                          height:
                                            Platform.OS === 'ios' ? 32 : 35,
                                          padding:
                                            Platform.OS === 'android' ? 5 : 0,
                                        }}
                                        keyboardType={'phone-pad'}
                                        value={phoneN}
                                        onChangeText={text => setphoneN(text)}
                                      />
                                    </View>
                                  </ImageBackground>
                                )}
                              </View>
                            )}
                          </View>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              width: '89%',
                              borderBottomColor: '#cccccc40',
                              shadowOffset: {
                                height: 0,
                                width: 1,
                              },
                              shadowRadius: 4,
                              shadowOpacity: 0.9,
                            }}
                          />
                        </ImageBackground>

                        {getUser.userDetails.res_result.type != 3 &&
                          getUser.userDetails.res_result.type != 4 && (
                            <ImageBackground
                              imageStyle={Styles.ImageBackgroundEdite}
                              resizeMode="cover"
                              style={{
                                alignItems: 'center',
                              }}
                              source={require('../../image/bgaadressproflie.png')}>
                              <View style={{width: '80%'}}>
                                <Text style={Styles.TextSub1}>
                                  {I18n.t('translate_Awards')}
                                </Text>
                              </View>
                              {dataAwardType.length === 0 ? (
                                <View>
                                  <Text
                                    style={{fontSize: 24, color: '#cad8e1'}}>
                                    {I18n.t('translate_NotAwards')}
                                  </Text>
                                </View>
                              ) : (
                                <FlatList
                                  style={{flexDirection:'row'}}
                                  keyExtractor={(item, index) => index}
                                  scrollEnabled={false}
                                  data={dataAwardType}
                                  renderItem={ListAward}
                                  numColumns={5}
                                />
                             )} 

                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  width: '89%',
                                  borderBottomColor: '#cccccc40',
                                  shadowOffset: {
                                    height: 0,
                                    width: 1,
                                  },
                                  shadowRadius: 4,
                                  shadowOpacity: 0.9,
                                }}
                              />
                            </ImageBackground>
                          )}
                      </View>
                    </View>
                  </View>
                  <View style={{marginBottom: 20, marginTop: 20, width: '90%'}}>
                    {Editdata === false && (
                      <TouchableOpacity
                        onPress={() => {
                          setAcceptEdit(true);
                        }}
                        style={[Styles.TocuhSub3, {marginBottom: 10}]}>
                        <Text style={Styles.TextSub2}>
                          {I18n.t('translate_Savechanges')}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setTimeout(() => {
                          if (Editdata === true) {
                            setEditdata(false);
                          } else {
                            setEditdata(true);
                            returnValue();
                          }
                        }, 200);
                      }}
                      style={
                        Editdata === false ? Styles.TocuhSub4 : Styles.TocuhSub3
                      }>
                      <Text
                        style={
                          Editdata === false ? Styles.TextSub5 : Styles.TextSub2
                        }>
                        {Editdata === false
                          ? I18n.t('translate_Cancel')
                          : I18n.t('translate_EditTouch')}
                      </Text>
                    </TouchableOpacity>
                    {Editdata === true && (
                      <TouchableOpacity
                        onPress={() => {
                          Changpassword();
                        }}
                        style={Styles.TocuhSub2}>
                        <Text style={Styles.TextSub2}>
                          {I18n.t('translate_Changepassword')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}

              {SelecIndex === 1 && (
                <View style={{}}>
                  <View style={[Styles.flexDirectionRow, {marginBottom: 10}]}>
                    <View style={{marginHorizontal: 8}}>
                      <View style={[Styles.ViewSub37]}>
                        <Text
                          style={{
                            color: '#2d6dc4',
                            textAlign:'center',
                            fontSize: 16,
                            fontFamily: 'Mitr-Regular',
                          }}>
                          {I18n.t('translate_Depart_Act1')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[Styles.flexDirectionRow, {marginBottom: 10}]}>
                    <View
                      style={[
                        Styles.ViewSub37,
                        {flex: 1, marginHorizontal: 8},
                      ]}>
                      <Text style={[Styles.TextHearderSub1]}>
                        {I18n.t('translate_Activitie_Department')}
                      </Text>
                    </View>
                    <View style={[Styles.ViewSub37, {flex: 0.3}]}>
                      <Image
                        style={{width: 60, height: 25}}
                        source={require('../../image/CLDITP.png')}
                      />
                    </View>
                  </View>

                  <Activities navigation={navigation}  />

                  <SmeAct SmeAuth={SmeAuth} navigation={navigation} />
                </View>
              )}
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: 0.5,
                    borderBottomWidth: 1,
                    width: '89%',
                    borderBottomColor: '#cccccc40',
                    shadowOffset: {
                      height: 0,
                      width: 1,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 0.9,
                  }}
                />
              </View>
              <ImageBackground
                resizeMode={'cover'}
                source={require('../../image/editbackground5.png')}
                imageStyle={Styles.ImageBackgroundEdite}
                style={{alignItems: 'center'}}>
                <View style={{width: '80%', marginTop: 10}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_Prefix')}
                  </Text>

                  <Text style={Styles.TextSub3}>
                    {getUser.userDetails.res_result.title_th}
                  </Text>
                </View>
                <View style={{width: '80%'}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_name')}
                  </Text>
                  <View>
                    <View>
                      <Text style={Styles.TextSub3}>
                        {getUser.userDetails.res_result.name_th}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '80%', marginBottom: 10}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_lname')}
                  </Text>
                  <View>
                    <View>
                      <Text style={Styles.TextSub3}>
                        {getUser.userDetails.res_result.lastname_th}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 0.5,
                    borderBottomWidth: 1,
                    width: '89%',
                    borderBottomColor: '#cccccc40',
                    shadowOffset: {
                      height: 0,
                      width: 1,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 0.9,
                  }}
                />
              </ImageBackground>
              <ImageBackground
                resizeMode={'cover'}
                imageStyle={{
                  width: '100%',
                  height: null,
                  marginTop: 0,
                }}
                style={{alignItems: 'center'}}
                source={require('../../image/backgroudedit2.png')}>
                <View
                  style={{
                    width: '80%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_Idcard')}
                  </Text>
                </View>
                <View style={{width: '80%'}}>
                  <Text style={Styles.TextSub1}>
                    {idcard(getUser.userDetails.res_result.cid)}
                  </Text>
                </View>
              </ImageBackground>
              <ImageBackground
                resizeMode={'cover'}
                imageStyle={{
                  width: '100%',
                  height: null,
                  marginTop: 0,
                }}
                style={{alignItems: 'center'}}
                source={require('../../image/editbackground7.png')}>
                <View style={{left: 0, marginTop: 10, width: '80%'}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_email')}
                  </Text>
                </View>
                <View style={{width: '80%'}}>
                  <Text style={Styles.TextSub3}>
                    {getUser.userDetails.res_result.email}
                  </Text>
                </View>
                <View style={{left: 0, width: '80%', marginTop: 10}}>
                  <Text style={Styles.TextSub1}>
                    {I18n.t('translate_Phonenumber')}
                  </Text>
                </View>
                <View
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Image
                        style={{width: 20, height: 13}}
                        source={require('../../image/thai.png')}
                      />
                    </View>
                    <View style={{marginLeft: 5}}>
                      <Image
                        style={{width: 7, height: 4}}
                        source={require('../../image/arrowdrop.png')}
                      />
                    </View>
                  </View>
                  <Text style={Styles.TextSub3}>
                    {' '}
                    {Phonenumber(getUser.userDetails.res_result.tel)}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 0.5,
                    borderBottomWidth: 1,
                    width: '89%',
                    borderBottomColor: '#cccccc40',
                    shadowOffset: {
                      height: 0,
                      width: 1,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 0.9,
                  }}
                />
              </ImageBackground>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
  getImg: state.authReducer.getImg,
  getStatus: state.dataReducer.getStatus,
  getNotification: state.authReducer.getNotification,
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 23,
    color: '#73838f',
    paddingHorizontal: 10,
    justifyContent: 'center',

    paddingTop: Platform.OS === 'ios' ? 2 : -3,
    paddingBottom: 5,
  },
  inputAndroid: {
    height: 40,
    fontSize: 23,
    color: '#73838f',
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 70,
  },
});

export default connect(
  mapStateToProps,
  null,
)(ProfileActivity);
