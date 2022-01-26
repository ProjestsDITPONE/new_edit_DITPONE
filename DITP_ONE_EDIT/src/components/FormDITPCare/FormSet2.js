import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import I18n from '../../utils/I18n';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Style from '../../page/Typeappeal/Styles';

const FormSet2 = Passing => {
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.row}>
          <Icon2
            name="user"
            size={20}
            color="#5D6D7E"
            style={Style.IconUser2}
          />
          <Text style={Style.textUser}>
            {'  '}
            {I18n.t('appellant_complaintP1')}
          </Text>
        </View>
        <View
          style={[
            Style.row,
            Style.marginLeft10,
            Style.marginBottom10,
            {alignItems: 'center'},
          ]}>
          <View style={{width: 5}} />
          <Text style={Style.textUser}>
            {'  '}
            {Passing.profile_care.applnt_firstname}{' '}
            {Passing.profile_care.applnt_lastname}
          </Text>
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('nameComp_regis')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp1 && Passing.touched.Set2temp1
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp1')}
            onBlur={() => Passing.setFieldTouched('Set2temp1')}
            values={Passing.values.Set2temp1}
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
            onChangeText={Passing.handleChange('Set2temp2')}
            onBlur={() => Passing.setFieldTouched('Set2temp2')}
            values={Passing.values.Set2temp2}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('name_complaintPa')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp3 && Passing.touched.Set2temp3
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp3')}
            onBlur={() => Passing.setFieldTouched('Set2temp3')}
            values={Passing.values.Set2temp3}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('tradeNumberComp_complaintP2new')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp4 && Passing.touched.Set2temp4
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            maxLength={20}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp4')}
            onBlur={() => Passing.setFieldTouched('Set2temp4')}
            values={Passing.values.Set2temp4}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('address_complaintP')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp5 && Passing.touched.Set2temp5
              ? Style.ViewInputRed2
              : Style.ViewInput2
          }>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            underlineColorAndroid={'transparent'}
            multiline
            onChangeText={Passing.handleChange('Set2temp5')}
            onBlur={() => Passing.setFieldTouched('Set2temp5')}
            values={Passing.values.Set2temp5}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('phone_complaintP')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp6 && Passing.touched.Set2temp6
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            maxLength={10}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp6')}
            onBlur={() => Passing.setFieldTouched('Set2temp6')}
            values={Passing.values.Set2temp6}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('applntOrg_fax')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={10}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp7')}
            onBlur={() => Passing.setFieldTouched('Set2temp7')}
            values={Passing.values.Set2temp7}
          />
        </View>
      </View>
      {/* //////////// */}
      {(Passing.country_id == '162' || Passing.formSetId_P1 == '9') && (
        <View>
          <View style={Style.Viewin}>
            <Text style={Style.TextSupinput}>
              {I18n.t('company_complaintP')}
            </Text>
            <Text style={Style.TextSupinput2}> *</Text>
          </View>
          <View
            style={
              Passing.errors.Set2temp9 && Passing.touched.Set2temp9
                ? Style.ViewInputRed
                : Style.ViewInput
            }>
            <RNPickerSelect
              mode="dropdown"
              placeholder={{
                label: '',
                value: '',
              }}
              onBlur={() => Passing.setFieldTouched('Set2temp9')}
              onValueChange={value => Passing.setFieldValue('Set2temp9', value)}
              style={{
                inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10},
              }}
              items={Passing.country.res_result.map(value => ({
                label: value.country_name,
                value: value.country_id,
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
        </View>
      )}
      {/* //////////// */}
      {Passing.country_id != '162' && Passing.formSetId_P1 != '9' && (
        <View>
          <View style={Style.Viewin}>
            <Text style={Style.TextSupinput}>{I18n.t('pro_userProfile')}</Text>
            <Text style={Style.TextSupinput2}> *</Text>
          </View>
          <View
            style={
              Passing.errors.Set2temp10 && Passing.touched.Set2temp10
                ? Style.ViewInputRed
                : Style.ViewInput
            }>
            <RNPickerSelect
              mode="dropdown"
              placeholder={{
                label: '',
                value: '',
              }}
              onBlur={() => Passing.setFieldTouched('Set2temp10')}
              onValueChange={value =>
                Passing.setFieldValue('Set2temp10', value)
              }
              style={{
                inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10},
              }}
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
        </View>
      )}

      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('postcode_regisPa')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set2temp8 && Passing.touched.Set2temp8
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={5}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set2temp8')}
            onBlur={() => Passing.setFieldTouched('Set2temp8')}
            values={Passing.values.Set2temp8}
          />
        </View>
      </View>
    </View>
  );
};

export default FormSet2;
