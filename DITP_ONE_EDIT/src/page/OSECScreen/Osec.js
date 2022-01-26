import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import Headers from '../../components/Headers';
import RNPickerSelect from '../../lib_edit/react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo';
import Style from './Styles';
import {connect} from 'react-redux';
import {getProductOSEC, getlistOSEC} from '../../actions/data.actions';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {width} from '../Typeappeal/Styles';
import Headerstage from '../../components/Headerstage';
import I18n from '../../utils/I18n';

class OSECScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Selecitem1: [],
      Selecitem2: [],
      TextKey: '',
      info: '',
      selec: {
        title: 'เลือกรายการ',
      },
    };
  }
  _getProductOSEC = async values => {
    try {
      const respones = await this.props.dispatch(
        getProductOSEC({para1: '0', key: 'nxkNWaVX7oZ56CVGWTKmgi5lecQAg04u'}),
      );
      //   console.log(respones.length > 0);
      if (respones.length > 0) {
        const Product_Cat = respones.map(value => ({
          value: value.cats_id,
          label: value.cats_name,
        }));
        this.setState({Selecitem1: Product_Cat});
      } else {
        throw respones;
      }
    } catch (error) {}
  };
  //   /itemexport/items_export/
  _getlistOSEC = async values => {
    // console.log(values);
    try {
      const Parmeter = values.toString();
      const respones = await this.props.dispatch(
        getlistOSEC({
          para1: Parmeter,
          key: 'nxkNWaVX7oZ56CVGWTKmgi5lecQAg04u',
        }),
      );
      console.log(respones);
      if (respones.length > 0) {
        const Product_Cat = respones.map(value => ({
          value: value.bitly_url,
          label: value.items_name,
        }));
        this.setState({Selecitem2: Product_Cat});
      } else {
        throw respones;
      }
    } catch (error) {}
  };

  getLinkpdf(value) {
    this.openLink(value);
  }

  openLink = async item => {
    const url = item;
    // console.log("urlitem.bitly_url",url);

    try {
      const url = item;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  componentDidMount() {
    this._getProductOSEC();
  }

  render() {
    return (
      <View style={Style.View1}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
          ArrowColor={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        {/* <View style={Style.View2}> */}
        <Headerstage nameTab={I18n.t('transalte_headerOSEC')} />
        <ScrollView style={{flex: 2}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 8,

              marginHorizontal: 10,
              top: 5,
            }}>
            <View style={[Style.View3, {}]}>
              {/* <View style={Style.View4}>
                <Text style={Style.TextView1}>ขั้นตอนการส่งออก</Text>
              </View> */}
              <View style={[Style.View5, {marginBottom: 20}]}>
                {/* <View style={Style.ViewH}> */}
                <Text style={Style.TextView2}>
                  {I18n.t('translate_RegulationsAndProduct')}
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  marginHorizontal: 15,
                }}>
                <Text style={{fontSize: 23, color: '#40536d', marginBottom: 6}}>
                  ค้นหาสินค้า
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 15,
                  marginBottom: 15,
                }}>
                <View style={Style.View9}>
                  {Platform.OS === 'ios' ? (
                    <TextInput
                      value={this.state.TextKey}
                      style={{
                        fontSize: 20,
                        paddingLeft: 10,
                        color: '#000',

                        // fontFamily: 'PSL Kittithada Pro',
                      }}
                      onChangeText={value => this.setState({TextKey: value})}
                      placeholder={
                        I18n.locale === 'th' ? 'ค้นหาสินค้า' : 'Search Products'
                      }
                      placeholderTextColor="#999999"
                    />
                  ) : (
                    <TextInput
                      value={this.state.TextKey}
                      style={{
                        fontSize: 20,
                        paddingLeft: 10,

                        color: '#000',
                        fontWeight: 'normal',
                        fontFamily: 'PSL Kittithada Pro',
                        // fontFamily: 'PSL Kittithada Pro',
                      }}
                      onChangeText={value => this.setState({TextKey: value})}
                      placeholder="Search Keyword"
                      placeholderTextColor="#999999"
                    />
                  )}
                </View>
              </View>
              <View style={{marginHorizontal: 15, marginBottom: 6}}>
                <Text style={Style.TextView3}>เลือกหมวดหมู่</Text>
              </View>
              <View
                style={[
                  Style.ViewalignItem,
                  {marginHorizontal: 15, marginBottom: 15},
                ]}>
                <View
                  style={{
                    // width: Dimensions.get('window').width * 0.9,
                    width: '100%',
                    height: Platform.OS === 'ios' ? 33 : 44,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: '#2d6dc4',
                    backgroundColor: '#fff',
                  }}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'เลือกหมวดหมู่', value: null}}
                    onValueChange={value => {
                      // console.log(value);
                      this._getlistOSEC(value);
                    }}
                    // onDonePress={this._getlistOSEC()}
                    // style={Style.ViewRN}
                    // textInputProps={{style: Style.TextRN}}
                    style={{
                      inputAndroid: {
                        fontSize: 23,
                        color: '#ddddd',
                        // paddingRight: 30,
                        fontWeight: 'normal',
                        fontFamily: 'PSL Kittithada Pro',
                        padding: 5,
                        paddingRight: 10,
                        width: '120%',
                      },
                      inputIOS: {
                        fontSize: 23,
                        color: '#ddddd',
                        // paddingRight: 1-,
                        width: '100%',
                        left: 10,
                      },
                      placeholder: {
                        fontSize: 23,
                        color: '#2d6dc4',
                        // fontWeight: 'normal',
                        // fontFamily: 'PSL Kittithada Pro',
                      },
                    }}
                    items={this.state.Selecitem1}
                    Icon={() => (
                      <View style={{top: 3, right: 5}}>
                        <Icon
                          name="chevron-small-down"
                          size={20}
                          color="#4b4b4b"
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 15, marginBottom: 6}}>
                <Text style={Style.TextView3}>เลือกรายการ</Text>
              </View>
              <View
                style={[
                  Style.ViewalignItem,
                  {marginHorizontal: 15, marginBottom: 40},
                ]}>
                <View
                  style={{
                    width: '100%',
                    height: Platform.OS === 'ios' ? 33 : 44,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: '#2d6dc4',
                    backgroundColor: '#fff',
                  }}>
                  {console.log(this.state.info)}
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    // disabled={!this.state.Selecitem2.length > 0}
                    placeholder={{
                      label: 'เลือกรายการ',
                      value: null,
                    }}
                    onDonePress={() => {
                      // console.log(this.state.info);
                      if (this.state.info != '') {
                        Linking.openURL(this.state.info);
                        // alert(JSON.stringify(this.state.info));
                      }
                    }}
                    style={{
                      inputAndroid: {
                        fontSize: 22,
                        color: '#ddddd',
                        // paddingRight: 30,
                        fontWeight: 'normal',
                        fontFamily: 'PSL Kittithada Pro',
                        padding: 2,
                        // justifyContent: 'center',
                        // textAlign: 'center',
                        // width: '90%',
                        // position: 'relative',
                        // textAlign: 'center',
                      },
                      inputIOS: {
                        fontSize: 23,
                        color: '#ddddd',
                        paddingRight: 30,
                        width: '100%',
                        left: 10,
                      },
                      placeholder: {
                        fontSize: 23,
                        color: '#2d6dc4',
                        // fontWeight: 'normal',
                        // fontFamily: 'PSL Kittithada Pro',
                      },

                      // iconContainer: {
                      //   position: 'absolute',
                      // },
                    }}
                    mode="dropdown"
                    // textInputProps={{style: Style.TextRN}}
                    onValueChange={value => {
                      if (value != null) {
                        Platform.OS === 'android'
                          ? Linking.openURL(value)
                          : this.setState({info: value});
                      } else {
                      }
                    }}
                    items={this.state.Selecitem2}
                    Icon={() => (
                      <View style={{top: 3, right: 5}}>
                        <Icon
                          name="chevron-small-down"
                          size={20}
                          color="#4b4b4b"
                        />
                      </View>
                    )}
                  />
                  {/* {console.log(this.state.info)} */}
                </View>
              </View>
            </View>
            {this.state.TextKey != '' && (
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.TextKey != '') {
                      this.props.navigation.navigate('OsecView', {
                        TextKey: this.state.TextKey,
                      });
                      this.setState({TextKey: ''});
                    } else {
                      Alert.alert('กรุณากรอกข้อมูล');
                    }
                  }}
                  style={{
                    backgroundColor: '#2d6dc4',
                    width: '80%',

                    alignItems: 'center',
                    borderRadius: 22,
                    paddingVertical: 8,
                  }}>
                  <Text style={{fontSize: 25, color: '#ffffff'}}>ค้นหา</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{marginHorizontal: 15, top: 10, marginBottom: 15}}>
            <Text
              style={{
                fontWeight: '400',
                color: '#40536d',
                textAlign: 'center',
                fontSize: 16,
                fontStyle: 'italic',
              }}>
              {I18n.t('transalte_OSECis')}
            </Text>
          </View>
        </ScrollView>
      </View>
      // </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  null,
  mapDispatchToProps,
)(OSECScreen);
