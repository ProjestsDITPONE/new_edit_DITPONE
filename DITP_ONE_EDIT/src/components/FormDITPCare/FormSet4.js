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
            Passing.errors.Set4temp1 && Passing.touched.Set4temp1
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set4temp1')}
            onBlur={() => Passing.setFieldTouched('Set4temp1')}
            values={Passing.values.Set4temp1}
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
            onChangeText={Passing.handleChange('Set4temp2')}
            onBlur={() => Passing.setFieldTouched('Set4temp2')}
            values={Passing.values.Set4temp2}
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
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set4temp6')}
            onBlur={() => Passing.setFieldTouched('Set4temp6')}
            values={Passing.values.Set4temp6}
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
            onChangeText={Passing.handleChange('Set4temp3')}
            onBlur={() => Passing.setFieldTouched('Set4temp3')}
            values={Passing.values.Set4temp3}
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
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            maxLength={10}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set4temp4')}
            onBlur={() => Passing.setFieldTouched('Set4temp4')}
            values={Passing.values.Set4temp4}
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
            onChangeText={Passing.handleChange('Set4temp5')}
            onBlur={() => Passing.setFieldTouched('Set4temp5')}
            values={Passing.values.Set4temp5}
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
          Passing.errors.Set4temp10 && Passing.touched.Set4temp10
            ? Style.ViewInputRed
            : Style.ViewInput
        }>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '',
            value: '',
          }}
          onBlur={() => Passing.setFieldTouched('Set4temp10')}
          onValueChange={value => Passing.setFieldValue('Set4temp10', value)}
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
            Passing.errors.Set4temp7 && Passing.touched.Set4temp7
              ? Style.ViewInputRed2
              : Style.ViewInput2
          }>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            onChangeText={Passing.handleChange('Set4temp7')}
            onBlur={() => Passing.setFieldTouched('Set4temp7')}
            values={Passing.values.Set3temp7}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>{I18n.t('company_complaintP')}</Text>
        <Text style={Style.TextSupinput2}> *</Text>
      </View>
      <View
        style={
          Passing.errors.Set4temp8 && Passing.touched.Set4temp8
            ? Style.ViewInputRed
            : Style.ViewInput
        }>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '',
            value: '',
          }}
          onBlur={() => Passing.setFieldTouched('Set4temp8')}
          onValueChange={value => Passing.setFieldValue('Set4temp8', value)}
          style={{inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10}}}
          items={Passing.country.res_result.map(value => ({
            label: value.country_name,
            value: {
              v: value.country_id,
              l: value.country_name,
            },
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
