import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import I18n from '../../utils/I18n';
import Icon from 'react-native-vector-icons/AntDesign';
import Style from '../../page/Typeappeal/Styles';

const FormSet5_History = Passing => {
  const [array, Setarray] = useState(0);

  return (
    <View style={{alignSelf: 'center'}}>
      <View style={Style.detailContainer}>
        {!Passing.history && (
          <View>
            <Text style={Style.TextSub12}>{I18n.t('translate_Subject')}</Text>

            <Text style={Style.textDetail}>
              {Passing.params.caseDtl_title != ''
                ? Passing.params.caseDtl_title
                : '-'}{' '}
              {/*Route */}
            </Text>
          </View>
        )}
        {!Passing.history ? (
          <View>
            <Text style={Style.TextSub12}>
              {I18n.t('translate_ProductType')}
            </Text>
            <Text style={Style.textDetail}>
              {Passing.params.prodType_id.label != null
                ? Passing.params.prodType_id.label
                : '-'}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={Style.TextSub12}>
              {I18n.t('translate_ProductType')}
            </Text>
            <Text style={Style.textDetail}>
              {Passing.params.prodType_id != null
                ? Passing.params.prodType_id
                : '-'}
            </Text>
          </View>
        )}

        <Text style={Style.TextSub12}>
          {I18n.t('translate_Background_Complaint')}
        </Text>
        <Text style={Style.textDetail}>
          {Passing.params.caseDtl_derivation != ''
            ? Passing.params.caseDtl_derivation
            : '-'}{' '}
          {/*Route */}
        </Text>

        {!Passing.history ? (
          <View>
            <Text style={Style.TextSub12}>{I18n.t('translate_Damage')}</Text>
            <Text style={Style.textDetail}>
              {Passing.params.caseDtl_damage_val != ''
                ? Passing.params.caseDtl_damage_val
                : '-'}{' '}
              {Passing.params.curren_id.l != ''
                ? Passing.params.curren_id.l
                : '-'}
              {/*Route */}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={Style.TextSub12}>{I18n.t('translate_Damage')}</Text>
            <Text style={Style.textDetail}>
              {Passing.params.caseDtl_damage_val != ''
                ? Passing.params.caseDtl_damage_val
                : '-'}{' '}
              {Passing.params.curren_id != '' ? Passing.params.curren_id : '-'}
              {/*Route */}
            </Text>
          </View>
        )}

        <Text style={Style.TextSub12}>{I18n.t('translate_Requirements')}</Text>
        <Text style={Style.textDetail}>
          {Passing.params.caseDtl_complnt_need != ''
            ? Passing.params.caseDtl_complnt_need
            : '-'}
          {/*Route */}
        </Text>
        {!Passing.history && (
          <View>
            <Text style={Style.TextSub12}>
              {I18n.t('translate_AttachFile')}
            </Text>
            {Passing.params.pdf != '' ? (
              <FlatList
                scrollEnabled={false}
                data={Passing.params.pdf}
                renderItem={({item, index}) => (
                  <View style={[Style.row, {marginVertical: 8}]}>
                    <View style={Style.insertListItem}>
                      <Image
                        style={{width: 27, height: 30}}
                        source={require('../../image/PDF.png')}
                      />
                      <Text style={Style.insertListFileName}>{item.name}</Text>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text>-</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default FormSet5_History;
