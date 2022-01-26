import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Header} from 'react-native-elements';
import RNPickerSelect from '../../lib_edit/react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Styles from './Styles';
import {TabActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  getProductCategory,
  getProductSubCategory,
  getmembertype,
} from '../../actions/data.actions';
import I18n from '../../utils/I18n';

class Seachtabex extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: '1',
      selection2: '2',
      selection3: '3',
      Selecitem1: [
        {label: 'Company List', value: '1'},
        {label: 'Product List', value: '2'},
        {label: 'Brand List', value: '3'},
      ],
      Selecitem2: [],
      Selecitem3: [],
      Selecitem4: [],
      info: {
        CompanyList: [],
        Category: [],
        SubCategory: [],
        TAX: '',
        Group: '',
        Product: '',
        Brand: '',
      },
    };
  }

  _getProductCategory = async values => {
    try {
      const response = await this.props.dispatch(getProductCategory());
      if (response.res_code == '00') {
        const Product_Cat = response.res_result.map(value => ({
          value: value.Product_Cat_ID,
          label: value.Product_Cat_Name_EN,
        }));
        this.setState({Selecitem2: Product_Cat});
        console.log('xx');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  _getProductSubCategory = async values => {
    try {
      const response = await this.props.dispatch(getProductSubCategory(values));
      if (response.res_code == '00') {
        const ProductSub_Cat = response.res_result.map(value => ({
          value: value.Product_Sub_Cat_ID,
          label: value.Product_Sub_Cat_Name_EN,
        }));
        this.setState({Selecitem3: ProductSub_Cat});
        console.log('xx');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  _getMemberType = async values => {
    try {
      const response = await this.props.dispatch(getmembertype());
      console.log(response);
      if (response.res_code == '00') {
        const ProductSub_Cat = response.res_result.map(value => ({
          value: value.property_id,
          label: value.property_detail,
        }));
        this.setState({Selecitem4: ProductSub_Cat});
        console.log('xx');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  btnSendData = () => {
    const jumpToAction = TabActions.jumpTo('Seachexporter', {
      user: this.state.info,
    });
    this.props.navigation.dispatch(jumpToAction);
    this.props.navigation.closeDrawer();
  };

  btnCleanData = () => {
    this.setState({
      // Selecitem1: [],
      // Selecitem2: [],
      Selecitem3: [],
      info: {
        CompanyList: [],
        Category: [],
        SubCategory: [],
        TAX: '',
        Group: '',
        Product: '',
        Brand: '',
        member_type: [],
      },
    });
  };

  componentDidMount() {
    this._getProductCategory();
    this._getMemberType();
  }

  render() {
    return (
      <View style={Styles.flex1}>
        <Header
          placement="left"
          leftComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}>
              <View style={Styles.ViewTabClose}>
                <Image
                  style={Styles.ImageSub2}
                  source={require('../../image/TapSearcOne.png')}
                />
              </View>
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'กรอง Exporter',
            style: {
              color: '#40536d',
              fontSize: 22,
              fontWeight: 'normal',
              fontFamily: 'PSL Kittithada Pro',
            },
          }}
          containerStyle={Styles.container}
        />
        <View style={Styles.ViewSub3}>
          <View
            style={{
              width: '90%',
              height: 40,
              borderRadius: 18,
              borderColor: '#d6d6d6',
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'กรุณาเลือก Member Type', value: null}}
              style={Styles.TextSelecitem}
              textInputProps={{
                style: Styles.TextSelecitem,
              }}
              value={this.state.info.member_type}
              onValueChange={value => {
                console.log('ค่าาา', value);
                this.setState(state => {
                  return {
                    ...state,
                    info: {
                      ...state.info,
                      member_type: value,
                    },
                  };
                });
              }}
              items={this.state.Selecitem4}
              Icon={() => (
                <View style={{top: 3, right: 5}}>
                  <Icon name="chevron-small-down" size={20} color="#4b4b4b" />
                </View>
              )}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 40,
              borderRadius: 18,
              borderColor: '#d6d6d6',
              borderWidth: 1,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'กรุณาเลือก List', value: null}}
              style={Styles.TextSelecitem}
              textInputProps={{
                style: Styles.TextSelecitem,
              }}
              value={this.state.info.CompanyList}
              onValueChange={value => {
                this.setState(state => {
                  return {
                    ...state,
                    info: {
                      ...state.info,
                      CompanyList: value,
                    },
                  };
                });
              }}
              items={this.state.Selecitem1}
              Icon={() => (
                <View style={{top: 3, right: 5}}>
                  <Icon name="chevron-small-down" size={20} color="#4b4b4b" />
                </View>
              )}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 33,
              borderRadius: 18,
              borderColor: '#d6d6d6',
              borderWidth: 1,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={Styles.TextSelecitem}
              placeholder={{label: 'กรุณาเลือก Category', value: null}}
              textInputProps={{style: Styles.TextSelecitem}}
              value={this.state.info.Category}
              onValueChange={value => {
                this._getProductSubCategory(value);
                this.setState(state => {
                  return {
                    ...state,
                    info: {
                      ...state.info,
                      Category: value,
                    },
                  };
                });
              }}
              items={this.state.Selecitem2}
              Icon={() => (
                <View style={{top: 3, right: 5}}>
                  <Icon name="chevron-small-down" size={20} color="#4b4b4b" />
                </View>
              )}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 33,
              borderRadius: 18,
              borderColor: '#d6d6d6',
              borderWidth: 1,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={Styles.TextSelecitem}
              placeholder={{label: 'กรุณาเลือก Sub Category', value: null}}
              textInputProps={{style: Styles.TextSelecitem}}
              value={this.state.info.SubCategory}
              onValueChange={value =>
                this.setState(state => {
                  return {
                    ...state,
                    info: {
                      ...state.info,
                      SubCategory: value,
                    },
                  };
                })
              }
              items={this.state.Selecitem3}
              Icon={() => (
                <View style={{top: 3, right: 5}}>
                  <Icon name="chevron-small-down" size={20} color="#4b4b4b" />
                </View>
              )}
            />
          </View>

          <View style={[Styles.marginTop30, {width: '90%'}]}>
            <View style={Styles.ViewSub4}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Seach.png')}
              />
              <TextInput
                style={[Styles.TextInputSub1, {flex: 1, paddingRight: 10}]}
                placeholder="Search (TAX NO.)"
                value={this.state.info.TAX}
                onChangeText={text =>
                  this.setState(state => {
                    return {
                      ...state,
                      info: {
                        ...state.info,
                        TAX: text,
                      },
                    };
                  })
                }
              />
            </View>
            <View style={Styles.ViewSub5}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Seach.png')}
              />
              <TextInput
                style={[Styles.TextInputSub1, {flex: 1, paddingRight: 10}]}
                placeholder="Search (Group Product)"
                value={this.state.info.Group}
                onChangeText={text =>
                  this.setState(state => {
                    return {
                      ...state,
                      info: {
                        ...state.info,
                        Group: text,
                      },
                    };
                  })
                }
              />
            </View>
            <View style={Styles.ViewSub5}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Seach.png')}
              />
              <TextInput
                style={[Styles.TextInputSub1, {flex: 1, paddingRight: 10}]}
                placeholder="Search (Product Name)"
                value={this.state.info.Product}
                onChangeText={text =>
                  this.setState(state => {
                    return {
                      ...state,
                      info: {
                        ...state.info,
                        Product: text,
                      },
                    };
                  })
                }
              />
            </View>
            <View style={Styles.ViewSub5}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Seach.png')}
              />
              <TextInput
                style={[Styles.TextInputSub1, {flex: 1, paddingRight: 10}]}
                placeholder="Search (Brand Name)"
                value={this.state.info.Brand}
                onChangeText={text =>
                  this.setState(state => {
                    return {
                      ...state,
                      info: {
                        ...state.info,
                        Brand: text,
                      },
                    };
                  })
                }
              />
            </View>
          </View>
          <View style={Styles.ViewSub6}>
            <View style={Styles.flexDirectionRow}>
              <TouchableOpacity
                style={Styles.TouchSub1}
                onPress={() => this.btnCleanData()}>
                <Text style={Styles.TextSub1}>{I18n.t('translate_Clean')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.btnSendData()}
                style={Styles.TouchSub2}>
                <Text style={Styles.TextSub10}>
                  {I18n.t('translate_Aceept')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

// const mapStateToProps = state => ({
//   HeaderBack: state.globalReducer.HeaderBack,
// });
export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps,
)(Seachtabex);
