import React, {useState} from 'react';
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
import DropDownPicker from '../../lib_edit/react-native-dropdown-picker';
import Icon3 from 'react-native-vector-icons/Feather';

const FormSet5 = Passing => {
  // this.selectType = '';

  console.log(Passing.typeProduct)

  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>
            {I18n.t('headtitle_complaintP')}
          </Text>
          <Text style={Style.TextSupinput2}> *</Text>
        </View>
        <View
          style={
            Passing.errors.Set5temp1 && Passing.touched.Set5temp1
              ? Style.ViewInputRed
              : Style.ViewInput
          }>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set5temp1')}
            onBlur={() => Passing.setFieldTouched('Set5temp1')}
            values={Passing.values.Set5temp1}
          />
        </View>
      </View>
      {/* //////////// */}
      <View style={Style.Viewin}>
        <Text style={Style.TextSupinput}>{I18n.t('type_complaintP')}</Text>
        <Text style={Style.TextSupinput2}> *</Text>
      </View>

      {/* <View
        style={[
          Passing.errors.Set5temp2 && Passing.touched.Set5temp2
            ? Style.ViewInputRed
            : Style.ViewInput,
          {zIndex: 10},
        ]}> */}

      <DropDownPicker
      containerStyle={{ padding: 10 }}
        scrollViewProps={{
          nestedScrollEnabled: true,
          persistentScrollbar: true,
        }}
        onOpen={() => setPickerOpen(true)}
        onClose={() => setPickerOpen(false)}
        // activeItemStyle={{left:10}}
        items={Passing.typeProduct}
        searchable={true}
        placeholder=""
        searchablePlaceholder={I18n.t('transalte_ButtonSearch')}
        labelStyle={{fontSize: 20}}
        selectedLabelStyle={{left: -40}}
        searchableStyle={{fontSize: 20}}
        searchableError={() => <Text>Not Found</Text>}
        containerStyle={{height: 40}}
        // style={{backgroundColor: 'transparent', borderWidth: 0,borderWidth:1}}
        style={[
          Passing.errors.Set5temp2 && Passing.touched.Set5temp2
            ? {
                borderWidth: 1,

                borderColor: '#B22222',
                backgroundColor: '#FFFFFF',
                width: 20,
                width: Dimensions.get('window').width * 0.8,
                // left: 30,
                borderTopLeftRadius: 21.5,
                borderTopRightRadius: 21.5,
                borderBottomLeftRadius: 21.5,
                borderBottomRightRadius: 21.5,
              }
            : {
                borderWidth: 1,

                borderColor: '#cad8e1',
                backgroundColor: '#ffffff',

                shadowColor: '#cad8e1',
                shadowOffset: {
                  height: 0,
                  width: 9,
                },
                shadowRadius: 4,
                shadowOpacity: 0.4,
                width: Dimensions.get('window').width * 0.8,
                // left: 30,
                borderTopLeftRadius: 21.5,
                borderTopRightRadius: 21.5,
                borderBottomLeftRadius: 21.5,
                borderBottomRightRadius: 21.5,
              },
        ]}
        itemStyle={{
          justifyContent: 'flex-start'
          // // borderWidth:1,
          // width: '100%',
          // // padding: 15,

          // // justifyContent: 'center',
          // // width: '100%',
          // // flexWrap: 'wrap',
          // marginLeft:-20,
          // // backgroundColor: '#fafa',
          // padding: 10,
          // marginTop: 2,
          // backgroundColor: '#ddd',
          // borderColor: '#bbb',
          // borderWidth: 1,
          // borderRadius: 5,
          
        }}
       
        dropDownMaxHeight={300}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          marginTop: 8,
          width: '99%',
          marginLeft:-29,
               

          // zIndex: 10,
        }}
        onChangeItem={value => {
          console.log(value);
          Passing.setFieldValue('Set5temp2', value);
        }}
        zIndex={30}
      />

      {/* <View style={{position: 'relative'}} />
      </View> */}

      {/* //////////// */}
      {/* {this.selectType == 'อื่นๆ' || this.selectType == 'Other'}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('comptitlename')}</Text>
        </View>
        <View style={Style.ViewInput}>
          <TextInput
            style={Style.TextInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('textotherflag_comp1')}
            onBlur={() => Passing.setFieldTouched('textotherflag_comp1')}
            values={Passing.values.textotherflag_comp1}
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
            Passing.errors.Set5temp3 && Passing.touched.Set5temp3
              ? Style.ViewInputRed2
              : Style.ViewInput2
          }>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set5temp3')}
            onBlur={() => Passing.setFieldTouched('Set5temp3')}
            values={Passing.values.Set5temp3}
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
              Passing.errors.Set5temp4 && Passing.touched.Set5temp4
                ? Style.ViewInputRed5
                : Style.ViewInput5
            }>
            <TextInput
              keyboardType={'phone-pad'}
              style={Style.TextInput}
              maxLength={30}
              underlineColorAndroid="transparent"
              onChangeText={Passing.handleChange('Set5temp4')}
              onBlur={() => Passing.setFieldTouched('Set5temp4')}
              values={Passing.values.Set5temp4}
            />
          </View>
          <View
            style={
              Passing.errors.Set5temp5 && Passing.touched.Set5temp5
                ? Style.ViewInputRed6
                : Style.ViewInput6
            }>
            <RNPickerSelect
              mode="dropdown"
              placeholder={{
                label: '',
                value: '',
              }}
              onBlur={() => Passing.setFieldTouched('Set5temp5')}
              onValueChange={value => Passing.setFieldValue('Set5temp5', value)}
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
                    style={Style.dropdownIcon2}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('want_complaintP')}</Text>
        </View>
        <View style={Style.ViewInput2}>
          <TextInput
            style={[Style.TextInput, {height: 110, textAlignVertical: 'top'}]}
            multiline
            underlineColorAndroid="transparent"
            onChangeText={Passing.handleChange('Set5temp6')}
            onBlur={() => Passing.setFieldTouched('Set5temp6')}
            values={Passing.values.Set5temp6}
          />
        </View>
      </View>
      {/* //////////// */}
      <View>
        <View style={Style.Viewin}>
          <Text style={Style.TextSupinput}>{I18n.t('file_complaintP')}</Text>
          {/* <Text style={Style.TextSupinput2}> *</Text> */}
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

export default FormSet5;
