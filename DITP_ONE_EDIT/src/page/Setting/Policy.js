import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getPolicy} from '../../actions/data.actions';
import {Header} from 'react-native-elements';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import I18n from '../../utils/I18n';
import Icon from 'react-native-vector-icons/AntDesign';
import Style from './Styles';
const Policy = ({dispatch, navigation}) => {
  const [Policy_th, setPolicy] = useState();
  const [Policy_en, setPolicy_en] = useState();
  const _getPolicy = async values => {
    try {
      const response = await dispatch(getPolicy());

      if (response.res_code === '00') {
        setPolicy(response.res_result.policy_th);
        setPolicy_en(response.res_result.policy_en);
      } else {
      }
      //   console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    try {
      _getPolicy();
    } catch (error) {}
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000000',
                fontFamily: 'Kittithada Bold 75',
              }}>
              {I18n.t('translate_Policy')}
            </Text>
          </View>
        }
        leftComponent={
          <TouchableOpacity
            style={{padding: 0}}
            onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} />
          </TouchableOpacity>
        }
        backgroundColor="transparent"
      />
      <ScrollView>
        <View style={{width: '85%', alignSelf: 'center', marginBottom: 30}}>
          <HTML
            containerStyle={Style.color}
            baseFontStyle={Style.fontSize}
            html={I18n.locale === 'th' ? Policy_th : Policy_en}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Policy);
