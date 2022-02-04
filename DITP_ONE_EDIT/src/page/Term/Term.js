/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import {CheckBox, Overlay, Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Headers from '../../components/Headers';
import Style from './Styles';
import {connect} from 'react-redux';
import { ViewScale } from '../../config/ViewScale';
import {getTerms, UpdateTerm} from '../../actions/data.actions';
import HTML from 'react-native-render-html';
import I18n from '../../utils/I18n';
const Term = ({
  navigation,
  dispatch,
  TermsRedux,
  LoadingCounters,
  route,
  getUser,
}) => {
  // this.userID = '459';
  const [Terms, setTerms] = useState();
  const [checkterm, setcheckterm] = useState(false);
  const [state, setstate] = useState(false);
  const [userID, setuserID] = useState(

    getUser.userDetails.res_result.userID_care === ''
      ? '476'
      : getUser.userDetails.res_result.userID_care,
      
  );
  const _getTerms = async values => {
    try {
      const response = await dispatch(getTerms());
      console.log(response, 'term');
      if (response.success) {
        console.log('xx');
        console.log(LoadingCounters);
        // setTerms(response.responseBody.res_result);
      } else {
        throw response;
      }
    } catch (error) {}
  };
 
  useEffect(() => {
    // if (!TermsRedux.isSuccess) {
    _getTerms();
    // }
    console.log("IDIDIDIDIIDIDISSS"+userID)
  }, [navigation]);

  const uploadTerm = async () => {
    try {
      const response = await dispatch(UpdateTerm(userID));
      console.log("JJJJJJJJJJJQ"+JSON.stringify(response) );
      if (response.res_code === '00') {
        navigation.navigate('Typeappel', {
          _Country: route.params._Country,
          _TypeComplaint: route.params._TypeComplaint,
          _TypeProduct: route.params._TypeProduct,
          _IncorrectType: route.params._IncorrectType,
          _Currency: route.params._Currency,
          _Province: route.params._Province,
          _TypeBusiness: route.params._TypeBusiness,
        });
      } else {
        throw response;
      }
    } catch (error) {}
  };

  return (
    <View
      // source={require('../../image/background.png')}
      style={Style.background}>
      <Headers
        badgeNumber="2"
        navigation={navigation}
        backScreen={false}
        ArrowColor={true}
      />
      {/* <ScrollView contentContainerStyle={{height: null}}> */}
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -2,
        }}
        source={require('../../image/background.png')}
      />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90), zIndex: -1}} />
      <ScrollView style={{zIndex: -1}}>
        <View style={[Style.background, {height: '85%'}]}>
          <View style={{alignSelf: 'center'}}>
            <Text style={Style.textHearder}>
              {I18n.t('translate_Messsage_Report')}
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              marginTop: ViewScale(20),
              flex: 1,
            }}>
            <View style={Style.termView}>
              {I18n.locale === 'th' && (
                <ScrollView contentContainerStyle={{height: null}}>
                  <HTML
                    baseFontStyle={{fontSize: ViewScale(18), fontWeight: 'normal'}}
                    containerStyle={Style.textterm}
                    html={
                      TermsRedux.isSuccess
                        ? TermsRedux.isResult[0].termsOfUse_text
                        : ''
                    }
                  />
                </ScrollView>
              )}
              {I18n.locale === 'en' && (
                <ScrollView contentContainerStyle={{height: null}}>
                  <HTML
                    baseFontStyle={{fontSize: ViewScale(18), fontWeight: 'normal'}}
                    containerStyle={Style.textterm}
                    html={
                      TermsRedux.isSuccess
                        ? TermsRedux.isResult[0].termsOfUse_text_en
                        : ''
                    }
                  />
                </ScrollView>
              )}
            </View>
          </View>
          <View style={Style.checkContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: 'transparent', //transparent
                borderColor: 'transparent',
                // width: 20,
                // height: 20,
              }}
              title={
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: ViewScale(20),
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: ViewScale(20),
                      color: '#ffffff',
                    }}>
                    {I18n.t('translate_understand_check')}
                  </Text>
                </View>
              }
              textStyle={{fontSize: ViewScale(20), color: '#ffffff'}}
              checked={checkterm}
              checkedIcon={
                <View
                  style={{
                    width: ViewScale(20),
                    height: ViewScale(20),
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../image/true.png')}
                    style={{width: ViewScale(14), height: ViewScale(12)}}
                  />
                </View>
              }
              uncheckedIcon={
                <Image
                  source={require('../../image/Chck.png')}
                  style={{width: ViewScale(20), height: ViewScale(20)}}
                />
              }
              onPress={() => {
                setcheckterm(!checkterm);
              }}
            />
          </View>
          {!checkterm ? (
            <View style={Style.ViewAccept}>
              <TouchableOpacity
                disabled
                style={[Style.BTNview, !checkterm && Style.opacityBTN]}>
                <Text numberOfLines={2} style={Style.TextView}>
                  {I18n.t('translate_Acceptterms')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={Style.ViewAccept}>
              <TouchableOpacity
                onPress={() => {
                  uploadTerm();
                  dispatch({
                    type: 'GET_CHECKTERM_SUCCESS',
                    payload: 'true',
                  });
                }}
                style={[Style.BTNview, !checkterm && Style.opacityBTN]}>
                <Text numberOfLines={2} style={Style.TextView}>
                  {I18n.t('translate_Acceptterms')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {/* </ScrollView> */}
    </View>
  );
};

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  TermsRedux: state.dataReducer.getTerms,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Term);
