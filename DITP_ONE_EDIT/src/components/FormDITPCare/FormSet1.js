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
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import I18n from '../../utils/I18n';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Style from '../../page/Typeappeal/Styles';

const FormSet1 = () => {
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('fname_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('lname_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('cid_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('occupation_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('position_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('address_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput2}>
          <TextInput
            style={Style.TextInput}
            multiline
            onChangeText={{}}
            // placeholderTextColor="#FFFFFF"
            onBlur={() => {}}
            value={
              '23-29 (LOT2) David Street, Dandenong, Victoria 3175, Australia'
            }
            // values.nameC
            // maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>{I18n.t('pro_userProfile')}</Text>
      </View>
      <View style={Style.ViewInput}>
        <RNPickerSelect
          mode="dropdown"
          placeholder={{
            label: '   ' + I18n.t('translate_Country_Selec'),
            value: 'null',
          }}
          onValueChange={value => console.log(value)}
          style={{inputIOS: {fontSize: 22, color: '#4b4b4b'}}}
          items={[
            {label: '   ' + 'Thai', value: 'Thai'},
            {label: '   ' + 'America', value: ' America'},
            {label: '   ' + 'Australia', value: 'Australia'},
          ]}
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
          <Text style={Style.TextSupinput}>{I18n.t('phone_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('sex_regis')}</Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View style={Style.Viewin}>
          <CheckBox
            checked={false}
            title={I18n.t('male_regis')}
            textStyle={Style.checkboxText}
            containerStyle={Style.conCheckBok}
            uncheckedIcon={
              <View style={Style.checkIcon}>
                <Image
                  source={require('../../image/checkAccept.png')}
                  style={Style.checkTrue}
                />
              </View>
            }
            checkedIcon={
              <View style={Style.checkIcon}>
                <Image
                  source={require('../../image/checkbox.png')}
                  style={Style.checkFalse}
                />
              </View>
            }
            onPress={() => {
              // this.setState({checktype1: !this.state.checktype1});
            }}
          />
          <CheckBox
            checked={true}
            title={I18n.t('female_regis')}
            textStyle={Style.checkboxText}
            containerStyle={Style.conCheckBok}
            uncheckedIcon={
              <View style={Style.checkIcon}>
                <Image
                  source={require('../../image/checkAccept.png')}
                  style={Style.checkTrue}
                />
              </View>
            }
            checkedIcon={
              <View style={Style.checkIcon}>
                <Image
                  source={require('../../image/checkbox.png')}
                  style={Style.checkFalse}
                />
              </View>
            }
            onPress={() => {
              // this.setState({checktype1: !this.state.checktype1});
            }}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('postcode_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('nameComp_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('branchComp_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('address_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('postcode_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('phone_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('fax_regis')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            keyboardType={'phone-pad'}
            style={Style.TextInput}
            value={''}
            maxLength={30}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    </View>
  );
};

export default FormSet1;
