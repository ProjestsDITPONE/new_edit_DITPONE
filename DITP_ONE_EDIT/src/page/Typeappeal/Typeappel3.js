import React, {Fragment} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {
  CheckBox,
  Overlay,
  Header,
  Avatar,
  ListItem,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import Style from './Styles';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../utils/I18n';
import * as yup from 'yup';
import {Formik} from 'formik';
import DocoumentPicker from 'react-native-document-picker';
class Typeappel3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaint: null,
      typec: null,
      subject: null,
      total: null,
      request: null,
      pdf: [],
      type: [],
    };
  }

  Picker = async value => {
    try {
      const res = await DocoumentPicker.pickMultiple({
        type: [DocoumentPicker.types.allFiles],
      });
      console.log(res);

      const name = JSON.stringify(res);
      const type = JSON.stringify(res);
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + name.uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + name.size);

      this.setState({pdf: [...this.state.pdf, {name: res[0].name}]});
      this.setState({type: [...this.state.type, {type: res[0].type}]});
    } catch (err) {
      if (DocoumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  render() {
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={Style.backgroundView}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_Report_Header')} />
        <View style={{backgroundColor: '#F0F3F4', flex: 1, zIndex: -1}}>
          <ScrollView>
            <View style={Style.headerContainer}>
              <Text style={Style.headerText}>
                {I18n.t('translate_FromInternationaltrade')}
              </Text>
              <Text style={Style.headerText}>
                {I18n.t('translate_entrepreneurscomplain')}
              </Text>
              <Text style={Style.headerText}>
                {I18n.t('translate_product_notdelivered')}
              </Text>
            </View>
            <TouchableOpacity>
              <LinearGradient
                colors={['#59a6e4', '#2d6dc4']}
                start={{x: 1, y: 0}}
                style={Style.headerGradient}>
                <Icon2
                  name="user"
                  size={24}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={Style.headerGradientText}>
                  {I18n.t('translate_DataReport')}
                </Text>
                <View style={Style.headerGradientIcon}>
                  <Icon name="downcircleo" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <LinearGradient
              colors={['#59a6e4', '#2d6dc4']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={[
                Style.headerGradient,
                {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
              ]}>
              <Icon2
                name="edit"
                size={24}
                color="#fff"
                style={{marginRight: 5}}
              />
              <Text style={Style.headerGradientText}>
                {I18n.t('translate_DetailReport')}
              </Text>
            </LinearGradient>
            <View style={Style.bodyContainer}>
              <Formik
                initialValues={{
                  complaint: null,
                  typec: null,
                  subject: null,
                  total: null,
                  request: null,
                  pdf: null,
                }}
                onSubmit={(values, formikActions) => {
                  this.setState({complaint: values.complaint});
                  this.setState({typec: values.typec});
                  this.setState({subject: values.subject});
                  this.setState({total: values.total});
                  this.setState({request: values.request});
                  this.setState({pdf: values.pdf});
                  formikActions.setSubmitting(false);
                }}
                validationSchema={yup.object().shape({
                  complaint: yup.string(),
                  typec: yup.string(),
                  subject: yup.number(),
                  total: yup.string(),
                  request: yup.number(),
                  pdf: yup.string(),
                })}>
                {({
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  setFieldTouched,
                  touched,
                  isValid,
                  handleSubmit,
                }) => (
                  <>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_HearderReport')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.ViewInput}>
                      <TextInput
                        style={Style.TextInput}
                        onChangeText={handleChange('complaint')}
                        // placeholderTextColor="#FFFFFF"
                        onBlur={() => setFieldTouched('complaint')}
                        value={I18n.t('translate_Customerrefuses')}
                        //values.complaint
                        maxLength={30}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_ProductType')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.ViewInput}>
                      <RNPickerSelect
                        mode="dropdown"
                        placeholder={{
                          label: '   ' + 'เลือกประเภทสินค้า',
                          value: 'null',
                        }}
                        onValueChange={value => console.log(value)}
                        style={{inputIOS: {fontSize: 22, color: '#4b4b4b'}}}
                        items={[
                          {label: '   ' + 'ข้าว', value: 'ข้าว'},
                          {
                            label: '   ' + 'เครื่องใช้ไฟฟ้า',
                            value: ' เครื่องใช้ไฟฟ้า',
                          },
                          {
                            label: '   ' + 'น้ำดื่ม',
                            value: 'น้ำดื่ม',
                          },
                        ]}
                        Icon={() => {
                          return (
                            <Icon
                              name="caretdown"
                              size={15}
                              color="gray"
                              style={Style.dropdownIcon}
                            />
                          );
                        }}
                      />
                    </View>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_Background_Complaint')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.ViewInput3}>
                      <TextInput
                        style={Style.TextInput}
                        onChangeText={handleChange('branch')}
                        // placeholderTextColor="#FFFFFF"
                        multiline
                        onBlur={() => setFieldTouched(' branch')}
                        value={
                          'บริษัท สยามเกรนส์ จำกัด ได้ส่งออกข้าวไปให้ลูกค้า Lay Brothers PTY.LID มาเป็นเวลากว่า 10 ปี ภายใต้ Team D/P 60 Days after B/L Date  แต่เมื่อครบกำหนดลูกค้าไม่ได้ชำระเงินมาเป็นเวลากว่า 1 ปี รายละเอียด Invoice  ที่ไม่ชำระเงินตามเอกสารที่บริษัทส่งมา เป็นยอดเงินรวมจำนวน 367,752.23 บาท'
                        }
                        //   value={values.request}
                        //
                        // maxLength={30}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_Damagevalue')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.Viewin2}>
                      <View style={Style.ViewInput5}>
                        <TextInput
                          keyboardType={'phone-pad'}
                          style={Style.TextInput}
                          onChangeText={handleChange('branch')}
                          // placeholderTextColor="#FFFFFF"
                          onBlur={() => setFieldTouched(' branch')}
                          value={'367,752.23'}
                          //values.total
                          maxLength={30}
                          underlineColorAndroid="transparent"
                        />
                      </View>
                      <View style={Style.ViewInput6}>
                        <RNPickerSelect
                          mode="dropdown"
                          placeholder={{
                            label: '   ' + 'หน่วย',
                            value: 'null',
                          }}
                          onValueChange={value => console.log(value)}
                          style={{inputIOS: {fontSize: 22, color: '#4b4b4b'}}}
                          items={[
                            {label: '   ' + 'บาท', value: 'บาท'},
                            {label: '   ' + 'ล้านบาท', value: ' ล้านบาท'},
                          ]}
                          Icon={() => {
                            return (
                              <Icon
                                name="caretdown"
                                size={15}
                                color="gray"
                                style={Style.dropdownIcon}
                              />
                            );
                          }}
                        />
                      </View>
                    </View>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_Requirements')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.ViewInput2}>
                      <TextInput
                        multiline
                        style={Style.TextInput}
                        onChangeText={handleChange('branch')}
                        // placeholderTextColor="#FFFFFF"
                        onBlur={() => setFieldTouched(' branch')}
                        value={
                          'ขอความอนุเคาระห์จากกรมการค้าระหว่างประเทศช่วยติดตามทวงเงินจากลูกค้ารายนี้ให้กับทางบริษัทฯด้วย'
                        }
                        //   value={values.request}
                        // maxLength={30}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={Style.Viewin}>
                      <Text style={Style.TextSupinput}>
                        {I18n.t('translate_AttachFile')}
                      </Text>
                      <Text style={Style.TextSupinput2}> *</Text>
                    </View>
                    <View style={Style.row}>
                      <View style={Style.insertInput} />
                      <TouchableOpacity
                        style={Style.insertFileButton}
                        onPress={() => this.Picker()}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../../image/insertfile.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    {this.state.pdf !== '' && (
                      <FlatList
                        scrollEnabled={false}
                        data={this.state.pdf}
                        renderItem={({item}) => (
                          <ScrollView>
                            <View style={Style.row}>
                              <View style={Style.insertListItem}>
                                <Image
                                  style={{width: 27, height: 30}}
                                  source={require('../../image/PDF.png')}
                                />
                                <Text style={Style.insertListFileName}>
                                  {item.name}
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={Style.insertFileButton}
                                onPress={() => {
                                  this.state.pdf.pop();
                                  this.setState({pdf: this.state.pdf});
                                }}>
                                <Image
                                  style={{width: 29, height: 30}}
                                  source={require('../../image/deletefile.png')}
                                />
                              </TouchableOpacity>
                            </View>
                          </ScrollView>
                        )}
                      />
                    )}
                  </>
                )}
              </Formik>
            </View>
            <View style={Style.ViewBTN}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Typeappel4')}
                style={Style.BTN1}>
                <Text style={Style.BTNText}>{I18n.t('translate_Next')}</Text>
              </TouchableOpacity>
              <Image
                style={{width: 42, height: 10, marginTop: 10}}
                source={require('../../image/page2.png')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Typeappel3;
