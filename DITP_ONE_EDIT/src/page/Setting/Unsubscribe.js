import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Styles from './Styles';
import Headers from '../../components/Headers';
import Popup from '../../components/Popup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'react-native-elements';
import {SendCancelmember} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import I18n from '../../utils/I18n';
class Unsubscribe extends React.Component {
  constructor() {
    super();
  }
  state = {
    name: null,
    lname: null,
    phone: null,
    email: null,
    data: null,
    PopAccept: false,
    count: null,
  };

  _SendCancelMem = async values => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      // console.log(payload, 'TOKEN');
      const response = this.props.dispatch(
        SendCancelmember({
          results: {
            name: this.state.name,
            lastname: this.state.lname,
            tel: this.state.phone,
            email: this.state.email,
            note: this.state.data,
          },
          token: payload,
        }),
      );
      // console.log(response, 'ส่ง');
    } catch (error) {}
  };

  CheckInput = async values => {
    const Info = await this.props.getUser;

    if (Info.userDetails.res_result.type === 3) {
      this.setState({name: Info.userDetails.res_result.member.nameTh});
      this.setState({lname: Info.userDetails.res_result.member.lastnameTh});
      this.setState({phone: Info.userDetails.res_result.member.tel});
      this.setState({email: Info.userDetails.res_result.member.email});
    } else if (Info.userDetails.res_result.type === 1) {
      this.setState({name: Info.userDetails.res_result.sub_member.nameTh});
      this.setState({lname: Info.userDetails.res_result.sub_member.lastnameTh});
      this.setState({phone: Info.userDetails.res_result.sub_member.tel});
      // this.setState({
      //   count: Info.userDetails.res_result.sub_member.tel,
      // });
      this.setState({email: Info.userDetails.res_result.sub_member.email});
    } else if (Info.userDetails.res_result.type === 4) {
      this.setState({name: Info.userDetails.res_result.sub_member.nameEn});
      this.setState({lname: Info.userDetails.res_result.sub_member.lastnameEn});
      this.setState({phone: Info.userDetails.res_result.sub_member.tel});
      this.setState({email: Info.userDetails.res_result.sub_member.email});
    } else if (Info.userDetails.res_result.type === 2) {
      this.setState({name: Info.userDetails.res_result.sub_member.nameEn});
      this.setState({lname: Info.userDetails.res_result.sub_member.lastnameEn});
      this.setState({phone: Info.userDetails.res_result.sub_member.tel});
      this.setState({email: Info.userDetails.res_result.sub_member.email});
    }
  };

  componentDidMount() {
    this.CheckInput();
  }

  render() {
    // console.log(this.state.phone.length());
    // console.log(this.state.count);
    return (
      <View style={Styles.SafeArea2}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 20}
          style={{flex: 1, zIndex: -1}}>
          <ScrollView>
            {this.state.PopAccept === true && (
              <Overlay
                onBackdropPress={() => this.setState({PopAccept: false})}
                fullScreen={false}
                isVisible={this.state.PopAccept}
                backdropStyle={{
                  backgroundColor:
                    Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                  borderColor: 'transparent',
                }}>
                <Popup
                  text={I18n.t('translate_UnSub')}
                  accept={() => {
                    setTimeout(() => {
                      this._SendCancelMem();
                      this.props.navigation.navigate('Home');
                    }, 200);
                    this.setState({PopAccept: false});
                  }}
                  cancle={() => this.setState({PopAccept: false})}
                  Icon={<Icon name="alert-circle" size={100} color="#e82d2d" />}
                />
              </Overlay>
            )}
            <TouchableWithoutFeedback
              accessible={false}
              onPress={Keyboard.dismiss}>
              <View style={{flex: 1}}>
                <View style={[Styles.margin10, {marginTop: 20}]}>
                  <Text style={Styles.TextSub2}>
                    {I18n.t('translate_ReportUn')}
                  </Text>
                </View>

                <View style={[Styles.alignItemsCenter]}>
                  <View style={[Styles.margin15]}>
                    <View style={{flexDirection:'row'}}> 
                    <Text style={Styles.TextSub3}>
                      {I18n.t('translate_nameUn')}
                    </Text>
                    <Text style={{color:'red'}}>
                      {'*'}
                    </Text>
                    </View>
                    <View style={Styles.ViewSub7}>
                      <TextInput
                        onChangeText={text => this.setState({name: text})}
                        defaultValue={this.state.name}
                        placeholder={I18n.t('translate_nameUn')}
                        style={Styles.TextinputSub1}
                      />
                    </View>
                  </View>
                  <View style={Styles.margin15}>
                    <View style={{flexDirection:'row'}}> 
                    <Text style={Styles.TextSub3}>
                      {I18n.t('translate_lnameUn')}
                    </Text>
                    <Text style={{color:'red'}}>
                      {'*'}
                    </Text>
                    </View>
                    <View style={Styles.ViewSub7}>
                      <TextInput
                        defaultValue={this.state.lname}
                        onChangeText={text => this.setState({lname: text})}
                        placeholder={I18n.t('translate_lnameUn')}
                        style={Styles.TextinputSub1}
                      />
                    </View>
                  </View>
                  <View style={Styles.margin15}>
                    <View style={{flexDirection:'row'}}> 
                    <Text style={Styles.TextSub3}>
                      {I18n.t('translate_PhoneUn')}
                    </Text>
                    <Text style={{color:'red'}}>
                      {'*'}
                    </Text>
                    </View>

                    <View style={Styles.ViewSub7}>
                      <TextInput
                        ref="mobileNumber"
                        keyboardType={'phone-pad'}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        defaultValue={this.state.phone}
                        onChangeText={text => {
                          this.setState({phone: text.replace(/[^0-9]/g, '')});
                          this.setState({count: text.length});
                          // console.log(text.length + 1);
                        }}
                        placeholder={I18n.t('translate_PhoneUn')}
                        style={Styles.TextinputSub1}
                      />
                    </View>
                  </View>
                  <View style={Styles.margin15}>
                  <View style={{flexDirection:'row'}}> 
                    <Text style={Styles.TextSub3}>
                      {I18n.t('translate_EmailUn')}
                    </Text>
                    <Text style={{color:'red'}}>
                      {'*'}
                    </Text>
                    </View>
                    <View style={Styles.ViewSub7}>
                      <TextInput
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({email: text})}
                        placeholder={I18n.t('translate_EmailUn')}
                        style={Styles.TextinputSub1}
                      />
                    </View>
                  </View>
                  <View style={Styles.marginTop20}>
                    <Text style={Styles.TextSub3}>
                      {I18n.t('translate_canMem')}
                    </Text>
                    <View style={Styles.ViewSub8}>
                      <TextInput
                        defaultValue={this.state.data}
                        onChangeText={text => this.setState({data: text})}
                        // multiline
                        placeholder={I18n.t('translate_canMem')}
                        style={Styles.TextinputSub2}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={Styles.ViewSub9}>
          <TouchableOpacity
            disabled={
              !(this.state.name != null,
              this.state.lname != null,
              this.state.phone != null,
              this.state.email != null,
              this.state.data != null)
            }
            onPress={() => {
              const Phone = this.state.phone;

              if (Phone.length === 10) {
                this.setState({PopAccept: true});
              } else {
                Alert.alert(I18n.t('translate_CheckPhone'), '', [
                  {
                    text: I18n.t('btn_submit_complaintP1'),
                    onPress: () => console.log('OK Pressed'),
                    style: 'cancel',
                  },
                ]);
              }
            }}
            style={
              (this.state.name != null,
              this.state.lname != null,
              // this.state.phone != null,
              this.state.count === '10',
              this.state.email != null,
              this.state.data != null ? Styles.TouchSub1 : Styles.TouchSub5)
            }>
            <Text style={Styles.TextSub4}>{I18n.t('translate_AcceptUn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unsubscribe);
