import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import I18n from '../../utils/I18n';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Style from '../../page/Typeappeal/Styles';
import {DatePicker} from '@99xt/first-born';

const FormSet33 = Passing => {
  const handleDateChange = value => {
    console.log(value);
    Passing.setFieldValue('Set33temp4', value);
  };
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_name_IdxFs_7')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set33temp1 && Passing.touched.Set33temp1
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp1')}
            onBlur={() => Passing.setFieldTouched('Set33temp1')}
            values={Passing.values.Set33temp1}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_branch_IdxFs_7')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set33temp2 && Passing.touched.Set33temp2
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp2')}
            onBlur={() => Passing.setFieldTouched('Set33temp2')}
            values={Passing.values.Set33temp2}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_position_IdxFs_7')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set33temp3 && Passing.touched.Set33temp3
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp3')}
            onBlur={() => Passing.setFieldTouched('Set33temp3')}
            values={Passing.values.Set33temp3}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_birthday_IdxFs_7')}
          </Text>
        </View>
        <View style={Style.ViewInput}>
          <DatePicker
            onDateChange={handleDateChange}
            noStyle
            style={{padding: 10}}
            activeStyle={{padding: 10}}
            placeholder={'dd/mm/yyyy'}
          />
          {/* <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp4')}
            onBlur={() => Passing.setFieldTouched('Set33temp4')}
            values={Passing.values.Set33temp4}
          /> */}
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_age_IdxFs_7')}
          </Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp5')}
            onBlur={() => Passing.setFieldTouched('Set33temp5')}
            values={Passing.values.Set33temp5}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_contact_tel_IdxFs_7')}
          </Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp6')}
            onBlur={() => Passing.setFieldTouched('Set33temp6')}
            values={Passing.values.Set33temp6}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('complnt_contact_email_IdxFs_7')}
          </Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set33temp7')}
            onBlur={() => Passing.setFieldTouched('Set33temp7')}
            values={Passing.values.Set33temp7}
          />
        </View>
        {/* //////////// */}
        <View>
          <View style={Style.Viewin}>
            <Text style={Style.TextSupinput}>
              {I18n.t('complnt_contact_address_IdxFs_7')}
            </Text>
          </View>
          <View style={Style.ViewInput2}>
            <TextInput
              style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
              multiline
              underlineColorAndroid="transparent"
              onChangeText={Passing.handleChange('Set33temp8')}
              onBlur={() => Passing.setFieldTouched('Set33temp8')}
              values={Passing.values.Set33temp8}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FormSet33;
