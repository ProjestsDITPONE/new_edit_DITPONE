import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import I18n from '../../utils/I18n';
import Icon from 'react-native-vector-icons/AntDesign';
import Style from '../../page/Typeappeal/Styles';

const FormSet4_History = Passing => {
  const [array, Setarray] = useState(0);

  return (
    <View style={{alignSelf: 'center'}}>
      <TouchableOpacity
        style={Style.TouchViewBox1}
        onPress={() => {
          if (array === 0) {
            Setarray(null);
          } else {
            Setarray(0);
          }
        }}>
        <View style={Style.ViewBox2}>
          <View style={[Style.DropDownHaed2, Style.shadow4, Style.flexRow]}>
            <View style={Style.flex}>
              <Text style={Style.TextSub12}>
                {I18n.t('companyDetail_complaintP4')}
              </Text>
            </View>

            <Icon
              style={Style.selfCenter}
              name={array === null ? 'downcircleo' : 'upcircleo'}
              size={20}
              color="#5f5f5f"
            />
          </View>
        </View>
      </TouchableOpacity>
      {array === 0 && (
        <View style={Style.ViewBox3}>
          <View style={Style.Line} />

          <View style={Style.row}>
            <View style={Style.smallIcon}>
              <Image
                style={{width: 13, height: 17}}
                source={require('../../image/companygray.png')}
              />
            </View>
            <Text style={Style.textUser}>
              {Passing.params.complnt_name != ''
                ? Passing.params.complnt_name
                : '-'}
            </Text>
          </View>
          <View style={Style.row}>
            <Text style={Style.detailHeadLabel}>
              {I18n.t('translate_branch')}
            </Text>
            <View style={Style.detailLabel}>
              <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                :{' '}
                {Passing.params.complnt_branch != ''
                  ? Passing.params.complnt_branch
                  : '-'}{' '}
                {/*Route */}
              </Text>
            </View>
          </View>
          <View style={Style.row}>
            <Text style={Style.detailHeadLabel}>
              {I18n.t('translate_NameContect')}
            </Text>
            <View style={Style.detailLabel}>
              <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                :{' '}
                {Passing.params.complnt_contact_name != ''
                  ? Passing.params.complnt_contact_name
                  : '-'}{' '}
                {/*Route */}
              </Text>
            </View>
          </View>
          <View style={Style.row}>
            <Text style={Style.detailHeadLabel}>
              {I18n.t('translate_EmailContect')}
            </Text>
            <View style={Style.detailLabel}>
              <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                :{' '}
                {Passing.params.complnt_contact_email != ''
                  ? Passing.params.complnt_contact_email
                  : '-'}{' '}
                {/*Route */}
              </Text>
            </View>
          </View>
          <View style={Style.row}>
            <Text style={Style.detailHeadLabel}>
              {I18n.t('translate_Phonenumber')}
            </Text>
            <View style={Style.detailLabel}>
              <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                :{' '}
                {Passing.params.complnt_contact_tel != ''
                  ? Passing.params.complnt_contact_tel
                  : '-'}{' '}
                {/*Route */}
              </Text>
            </View>
          </View>
          <View style={Style.row}>
            <Text style={Style.detailHeadLabel}>
              {I18n.t('translate_Contect')}
            </Text>
            <View style={Style.detailLabel}>
              <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                :{' '}
                {Passing.params.complnt_contact_address != ''
                  ? Passing.params.complnt_contact_address
                  : '-'}
                {/*Route */}
              </Text>
            </View>
          </View>
          {!Passing.history ? (
            <View style={Style.row}>
              <Text style={Style.detailHeadLabel}>
                {I18n.t('translate_Country')}
              </Text>
              <View style={Style.detailLabel}>
                <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                  :{' '}
                  {Passing.params.complnt_country_id.l != ''
                    ? Passing.params.complnt_country_id.l
                    : '-'}
                </Text>
              </View>
            </View>
          ) : (
            <View style={Style.row}>
              <Text style={Style.detailHeadLabel}>
                {I18n.t('translate_Country')}
              </Text>
              <View style={Style.detailLabel}>
                <Text style={{fontSize: 20, color: '#4b4b4b'}}>
                  :{' '}
                  {Passing.params.complnt_country_id != ''
                    ? Passing.params.complnt_country_id
                    : '-'}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FormSet4_History;
