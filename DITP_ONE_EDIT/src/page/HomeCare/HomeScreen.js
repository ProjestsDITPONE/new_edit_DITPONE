import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import Styles from './Styles';
import { connect } from 'react-redux';
import Headers from '../../components/Headers';
import I18n from '../../utils/I18n';
import { ViewScale } from '../../config/ViewScale';
import {
  Country,
  TypeComplaint,
  TypeProduct,
  IncorrectType,
  Currency,
  Province,
  UpdateTerm,
} from '../../actions/data.actions';
import Icon3 from 'react-native-vector-icons/Entypo';

class HomeCare extends React.Component {
  constructor(props) {
    super(props);
    this._Country = '';
    this._TypeComplaint = '';
    this._TypeProduct = '';
    this._IncorrectType = '';
    this._TypeBusiness = '';
  }
  componentDidMount() {
    this._loadCountry();
    this._loadTypeComplaint();
    this._loadTypeProduct();
    this._loadIncorrectType();
    this._loadCurrency();
    this._loadProvince();
    this._loadTypeBusiness();
  }

  _loadTypeBusiness = async value => {
    try {
      this._TypeBusiness = [
        { id: '0', nameTH: 'ไม่ระบุ', nameEN: 'Unknown' },
        { id: '1', nameTH: 'นำเข้า', nameEN: 'Import' },
        { id: '2', nameTH: 'ส่งออก', nameEN: 'Export' },
      ];
      // console.log(_TypeBusiness);
    } catch (error) {
      console.log(error);
    }
  };
  _loadCountry = async value => {
    try {
      this._Country = await this.props.dispatch(Country());
      // console.log(_Country);
    } catch (error) {
      console.log(error);
    }
  };
  _loadTypeComplaint = async value => {
    try {
      this._TypeComplaint = await this.props.dispatch(TypeComplaint());
      console.log(_TypeComplaint);
    } catch (error) {
      console.log(error);
    }
  };
  _loadTypeProduct = async value => {
    try {
      this._TypeProduct = await this.props.dispatch(TypeProduct());
      const newfloors2 = this._TypeProduct.res_result.map(value => ({
        label:
          I18n.locale === 'th' ? value.prodType_name : value.prodType_name_en,
        value: value.prodType_id,
        icon: () =>
          value.prodType_level != 1 && (
            <Icon3
              style={
                value.prodType_level === 2
                  ? { marginLeft: 20 }
                  : value.prodType_level === 3
                    ? { marginLeft: 40 }
                    : value.prodType_level === 4
                      ? { marginLeft: 60 }
                      : { marginLeft: 80 }
              }
              name="level-down"
              size={ViewScale(18)}
              color="#cccccc"
            />
          ),
      }));
      this._TypeProduct = newfloors2;
    } catch (error) { }
  };
  _loadIncorrectType = async value => {
    try {
      this._IncorrectType = await this.props.dispatch(IncorrectType());
      // console.log(this._IncorrectType);
    } catch (error) { }
  };

  _loadCurrency = async value => {
    try {
      this._Currency = await this.props.dispatch(Currency());
      // console.log(_IncorrectType);
    } catch (error) { }
  };

  _loadProvince = async value => {
    try {
      this._Province = await this.props.dispatch(Province());
      // console.log(this._Province);
    } catch (error) { }
  };

  openTerm() {
    if (this.props.CheckTerm.Check === undefined) {
      this.props.navigation.navigate('Term', {
        _Country: this._Country,
        _TypeComplaint: this._TypeComplaint,
        _TypeProduct: this._TypeProduct,
        _IncorrectType: this._IncorrectType,
        _Currency: this._Currency,
        _Province: this._Province,
        _TypeBusiness: this._TypeBusiness,
      });
    } else {
      this.uploadTerm();
      // this.props.navigation.navigate('Term', {
      //   _Country: this._Country,
      //   _TypeComplaint: this._TypeComplaint,
      //   _TypeProduct: this._TypeProduct,
      //   _IncorrectType: this._IncorrectType,
      //   _Currency: this._Currency,
      //   _Province: this._Province,
      //   _TypeBusiness: this._TypeBusiness,
      // })
    }
  }

  uploadTerm = async () => {
    try {
      const userID =
        this.props.getUser.userDetails.res_result.userID_care === ''
          ? '476'
          : this.props.getUser.userDetails.res_result.userID_care;
          console.log(this.props.getUser.userDetails.res_result.userID_care)
      const response = await this.props.dispatch(UpdateTerm(userID));
      console.log("KKKKKKDDDD"+JSON.stringify(response));
      if (response.res_code === '00') {
        this.props.navigation.navigate('Typeappel', {
          _Country: this._Country,
          _TypeComplaint: this._TypeComplaint,
          _TypeProduct: this._TypeProduct,
          _IncorrectType: this._IncorrectType,
          _Currency: this._Currency,
          _Province: this._Province,
          _TypeBusiness: this._TypeBusiness,
          // _Country: route.params._Country,
          // _TypeComplaint: route.params._TypeComplaint,
          // _TypeProduct: route.params._TypeProduct,
          // _IncorrectType: route.params._IncorrectType,
          // _Currency: route.params._Currency,
          // _Province: route.params._Province,
          // _TypeBusiness: route.params._TypeBusiness,
        });
      } else {
        throw response;
      }
    } catch (error) { }
  };

  render() {
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;
    // console.log('ค่าาา', this.props.CheckTerm.Check);
    return (
      <View
        // source={require('../../image/background.png')}
        style={Styles.background}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
          ArrowColor={true}
        />

        <Image
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -2,
          }}
          source={require('../../image/background.png')}
        />

        <View style={{ marginTop: Platform.OS === 'android' && ViewScale(90) }} />
        <ScrollView style={{ zIndex: -1, width: '100%' }}>
          <View style={Styles.view}>
            <Image
              style={Styles.Imagelogo}
              source={require('../../image/logo.png')}
            />
          </View>
          {/* <View style={{width: '60%', marginTop: 30}}> */}
          <View
            style={{
              // width: '10%',
              justifyContent: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: ViewScale(50),
            }}>
            <TouchableOpacity
              style={{ width: '50%' }}
              onPress={() => {
                this.openTerm();
              }}>
              <Image
                resizeMode={'contain'}
                style={{ width: '100%', height: ViewScale(200) }}
                source={require('../../image/humman2.png')}
              />
              <View style={Styles.viewsubText}>
                <Text
                  onPress={() => {
                    this.openTerm();
                  }}
                  style={Styles.fontsub}>
                  {' '}
                  {I18n.t('translate_Report')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity

              style={{ width: '50%' }}
              onPress={() => {
                
                this.props.navigation.navigate('AppealHome');
              }}>
              <Image
                resizeMode={'contain'}
                style={{ width: '100%', height: ViewScale(200) }}
                source={require('../../image/humman1.png')}
              />
              <View style={Styles.viewsubText}>
                <Text
                  onPress={() => {
                    this.props.navigation.navigate('AppealHome');
                  }}
                  style={[Styles.fontsub, {textAlign:'center'}]}>
                  
                  {I18n.t('translate_Report_you')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* </View> */}
          <ImageBackground
            style={[Styles.backgroundStar, { zIndex: -1 }]}
            source={require('../../image/backgroundstar.png')}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  // loginUsers: state.authReducer.loginUser,
  // skipLogins: state.authReducer.skipLoginUser,
  // GetTermsss: state.dataReducer.getTermss,
  // SAVE: state.authReducer.saveData,
  // GetPrivacy: state.dataReducer.getPrivacy,
  CheckTerm: state.authReducer.CheckTerm,
  getUser: state.userReducer.getUser,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeCare);
