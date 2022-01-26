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
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import I18n from '../../utils/I18n';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Style from '../../page/Typeappeal/Styles';

const FormSet34 = ({Passing}) => {
  // alert(Passing)
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('caseDtl_title_IdxFs_8')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set34temp9 && Passing.touched.Set34temp9
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set34temp9')}
            onBlur={() => Passing.setFieldTouched('Set34temp9')}
            values={Passing.values.Set34temp9}
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>
          {I18n.t('formSet34History_title')}
        </Text>
        <Text style={Style.TextSupinput2}> *</Text>
      </View>
      <View
        style={
          Passing.errors.Set34temp10 && Passing.touched.Set34temp10
            ? Style.ViewInputRed
            : Style.ViewInput
        }>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '',
            value: '',
          }}
          onBlur={() => Passing.setFieldTouched('Set34temp10')}
          onValueChange={value => {
            Passing.setFieldValue('Set34temp10', value);
          }}
          style={{inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10}}}
          items={Passing.incorrectType.res_result.map(value => ({
            label:
              I18n.locale === 'th' ? value.incType_name : value.incType_name_en,
            value: {
              v: value.incType_id,
              l:
                I18n.locale === 'th'
                  ? value.incType_name
                  : value.incType_name_en,
            },
            flag: value.incType_other_flag,
          }))}
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
      {/* //////////// */}
      {/* <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('comptitlename')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('textotherflag_comp2')}
            onBlur={() => Passing.setFieldTouched('textotherflag_comp2')}
            values={Passing.values.textotherflag_comp2}
          />
        </View>
      </View> */}
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('derivation_complaintP')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set34temp11 && Passing.touched.Set34temp11
              ? Style.ViewInputRed2
              : Style.ViewInput2
          }>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set34temp11')}
            onBlur={() => Passing.setFieldTouched('Set34temp11')}
            values={Passing.values.Set34temp11}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('value_complaintP')} {I18n.t('value2_complaintP')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View style={Style.Viewin2}>
          <View
            style={
              Passing.errors.Set34temp12 && Passing.touched.Set34temp12
                ? Style.ViewInputRed5
                : Style.ViewInput5
            }>
            <TextInput
              style={Style.TextInput}
              maxLength={30}
              underlineColorAndroid="transparent"
              onChangeText={Passing.handleChange('Set34temp12')}
              onBlur={() => Passing.setFieldTouched('Set34temp12')}
              values={Passing.values.Set34temp12}
            />
          </View>
          <View
            style={
              Passing.errors.Set34temp5 && Passing.touched.Set34temp5
                ? Style.ViewInputRed6
                : Style.ViewInput6
            }>
            <RNPickerSelect
              mode="dropdown"
              placeholder={{
                label: '',
                value: '',
              }}
              onBlur={() => Passing.setFieldTouched('Set34temp5')}
              onValueChange={value =>
                Passing.setFieldValue('Set34temp5', value)
              }
              style={{
                inputIOS: {fontSize: 22, color: '#4b4b4b', marginLeft: 10},
              }}
              items={Passing.currency.res_result.map(value => ({
                label: value.curren_name,
                value: {
                  v: value.curren_idPrimary,
                  l: value.curren_name,
                },
              }))}
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
      </View>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('want_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput2}>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set34temp14')}
            onBlur={() => Passing.setFieldTouched('Set34temp14')}
            values={Passing.values.Set34temp14}
          />
        </View>
      </View>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('file_complaintP')}</Text>
        </View>
        <View style={Style.row}>
          <View style={Style.insertInput} />
          <TouchableOpacity
            style={Style.insertFileButton}
            onPress={() => {
              if (Platform.OS === 'ios') {
                Passing.Picker(1);
              } else {
                Passing.Picker(2);
              }
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../image/insertfile.png')}
            />
          </TouchableOpacity>
        </View>
        {Passing.pdf !== '' && (
          <FlatList
            scrollEnabled={false}
            data={Passing.pdf}
            renderItem={({item, index}) => (
              // <ScrollView>
              <View style={[Style.row, {marginBottom: 8}]}>
                <View style={Style.insertListItem}>
                  <Image
                    style={{width: 27, height: 30}}
                    source={require('../../image/PDF.png')}
                  />
                  <Text numberOfLines={2} style={Style.insertListFileName}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={Style.insertFileButton}
                  onPress={() => {
                    Passing.pdf.splice(index, 1);
                    Passing.setDeletePdf(Passing.pdf);
                  }}>
                  <Image
                    style={{width: 29, height: 30}}
                    source={require('../../image/deletefile.png')}
                  />
                </TouchableOpacity>
              </View>
              // </ScrollView>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default FormSet34;
