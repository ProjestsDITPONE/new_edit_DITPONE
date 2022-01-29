import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Styles from './Styles';
import Headers from '../../components/Headers';
const Viewact = ({ navigation, route }) => {
  const imgView = route.params.imgview;
  const name = route.params.name;
  const deteView = route.params.deteView;
  const people = route.params.people;
  const Detail = route.params.Detail;
  const count = route.params.count;
  const location = route.params.location;
  const list_code = route.params.list_code;
  const id = route.params.id;

  return (
    <View style={[Styles.SafeAre1, { flex: 1 }]}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <ScrollView style={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
        <View
          style={{
            zIndex: -1,
            marginTop: Platform.OS === 'android' && 90,
            backgroundColor: '#ffffff',
          }}>

          <View style={[Styles.ViewSub6]}>
            <Image style={Styles.ImgSub6}
              resizeMode={'contain'}
              source={{ uri: imgView }} />
          </View>
          <View style={Styles.ViewSub7}>
            <Text style={Styles.TextSub7}>{name}</Text>
            <Text style={Styles.TextSub8}>{deteView}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={Styles.ViewSub4}>
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/maker4.png')}
                />
              </View>
              <Text> </Text>
              <Text style={[Styles.TextSub9, { width: '60%' }]}>
                {location}
              </Text>
              <View style={Styles.ViewSub8}>
                <Text style={Styles.TextSub9}>
                  {I18n.t('transalte_joined')}
                    <Text style={Styles.TextSub10}> {count} </Text>
                  <Text style={Styles.TextSub9}>{I18n.locale === 'th' ? 'ราย' : 'Income'}</Text>
                </Text>
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Image
                style={Styles.ImgSub7}
                source={require('../../image/line6.png')}
              />
            </View>

            <Text style={Styles.TextSub9}>{I18n.t('translate_Detail')} :</Text>
            <Text style={Styles.TextSub11}>{Detail}</Text>
            <Text style={[Styles.TextSub9, Styles.marginTop10]}>
              {I18n.t('transalte_number_apply')} :
                  <Text style={Styles.TextSub9}> {people} {I18n.locale === 'th' ? 'ราย' : 'Income'}</Text>
            </Text>

            {/* <View style={Styles.ViewSub9}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Scanact', { name: name, id: id })
                }
                style={Styles.TouchSub1}>
                <Image
                  style={Styles.ImgSub8}
                  source={require('../../image/scanact2.png')}
                />
                <Text style={Styles.textsSub11}> สแกน QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Viewpeople', { list_code: list_code })
                }
                style={Styles.TouchSub2}>
                <Image
                  style={Styles.ImgSub9}
                  source={require('../../image/invate.png')}
                />
                <Text style={Styles.textsSub11}> ผู้เข้าร่วมแล้ว</Text>
              </TouchableOpacity>
            </View> */}
          </View>

        </View>
      </ScrollView>
      <View style={Styles.ViewSub9}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Scanact', { name: name, id: id })
          }
          style={Styles.TouchSub1}>
          <Image
            style={Styles.ImgSub8}
            source={require('../../image/scanact2.png')}
          />
          <Text style={Styles.textsSub11}> {I18n.t('translate_ScanQrr')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Viewpeople', { list_code: list_code })
          }
          style={Styles.TouchSub2}>
          <Image
            style={Styles.ImgSub9}
            source={require('../../image/invate.png')}
          />
          <Text style={Styles.textsSub11}> {I18n.t('translate_Participants')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Viewact;
