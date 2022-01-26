import React from 'react';
import {Text, View, TextInput} from 'react-native';
import I18n from '../../utils/I18n';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Style from '../../page/Typeappeal/Styles';

const FormSet3 = Passing => {
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('nameComp_complaintP')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set3temp1 && Passing.touched.Set3temp1
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp1')}
            onBlur={() => Passing.setFieldTouched('Set3temp1')}
            values={Passing.values.Set3temp1}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('branch_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp2')}
            onBlur={() => Passing.setFieldTouched('Set3temp2')}
            values={Passing.values.Set3temp2}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('tradeNumberComp_complaintP2')}
          </Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp6')}
            onBlur={() => Passing.setFieldTouched('Set3temp6')}
            values={Passing.values.Set3temp6}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('name_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp3')}
            onBlur={() => Passing.setFieldTouched('Set3temp3')}
            values={Passing.values.Set3temp3}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('phone_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp4')}
            onBlur={() => Passing.setFieldTouched('Set3temp4')}
            values={Passing.values.Set3temp4}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('email_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp5')}
            onBlur={() => Passing.setFieldTouched('Set3temp5')}
            values={Passing.values.Set3temp5}
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>{I18n.t('member_business')}</Text>
        <Text style={Style.TextSupinput2}> *</Text>
      </View>
      <View
        style={
          Passing.errors.Set3temp10 && Passing.touched.Set3temp10
            ? Style.ViewInputRed
            : Style.ViewInput
        }>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '',
            value: '',
          }}
          onBlur={() => Passing.setFieldTouched('Set3temp10')}
          onValueChange={value => Passing.setFieldValue('Set3temp10', value)}
          style={{inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10}}}
          items={Passing.typeBusiness.map(value => ({
            label: I18n.locale === 'th' ? value.nameTH : value.nameEN,
            value: value.id,
          }))}
          Icon={() => {
            return (
              <Icon
                name="caretdown"
                size={15}
                color="gray"
                style={Style.dropdownIcon2}
              />
            );
          }}
        />
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('address_complaintP')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set3temp7 && Passing.touched.Set3temp7
              ? Style.ViewInputRed2
              : Style.ViewInput2
          }>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            onChangeText={Passing.handleChange('Set3temp7')}
            onBlur={() => Passing.setFieldTouched('Set3temp7')}
            values={Passing.values.Set3temp7}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>{I18n.t('pro_userProfile')}</Text>
        <Text style={Style.TextSupinput2}> *</Text>
      </View>
      <View
        style={
          Passing.errors.Set3temp8 && Passing.touched.Set3temp8
            ? Style.ViewInputRed
            : Style.ViewInput
        }>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '',
            value: '',
          }}
          onBlur={() => Passing.setFieldTouched('Set3temp8')}
          onValueChange={value => Passing.setFieldValue('Set3temp8', value)}
          style={{inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10}}}
          items={Passing.province.res_result.map(value => ({
            label:
              I18n.locale === 'th'
                ? value.province_name
                : value.province_name_en,
            value: value.province_id,
          }))}
          Icon={() => {
            return (
              <Icon
                name="caretdown"
                size={15}
                color="gray"
                style={Style.dropdownIcon2}
              />
            );
          }}
        />
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('postcode_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set3temp9')}
            onBlur={() => Passing.setFieldTouched('Set3temp9')}
            values={Passing.values.Set3temp9}
          />
        </View>
      </View>
    </View>
  );
};

export default FormSet3;
