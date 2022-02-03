import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  Platform,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getProductOSEC, getlistOSEC} from '../../actions/data.actions';
import Headers from '../../components/Headers';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { ViewScale } from '../../config/ViewScale';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Headerstage from '../../components/Headerstage';
import I18n from '../../utils/I18n';
import { List } from 'react-native-paper';
const OsecView = ({navigation, route, dispatch}) => {
  const [DataList, setDataList] = useState([]);

  const _getlistOSEC = async values => {
    try {
      const List = route.params.TextKey;
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const respones = await dispatch(
        getlistOSEC({
          para1: List,
          key: 'nxkNWaVX7oZ56CVGWTKmgi5lecQAg04u',
        }),
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
        console.log("_getlistOSEC"+ JSON.stringify(respones));

      setDataList(respones);
    } catch (error) {}
  };

  useEffect(() => {
    _getlistOSEC();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <Headers
        badgeNumber="2"
        navigation={navigation}
        backScreen={false}
        ArrowColor={false}
      />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <Headerstage nameTab={I18n.t('transalte_headerOSEC')} />
      <View style={{flex: 1, zIndex: -1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: ViewScale(20), marginLeft: ViewScale(10), color: '#163c70'}}>
            {I18n.t('translate_AnsSeach')} {route.params.TextKey} {I18n.locale === 'th' ? 'พบ' : 'Meet'} {DataList.length} {I18n.locale === 'th' ? 'รายการ' : 'List'}
          </Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={DataList}
          renderItem={({item}) => {
            return (
              <ListItem
                containerStyle={{
                  backgroundColor: '#fff',
                  margin: ViewScale(10),
                  borderRadius: ViewScale(8),
                }}
                subtitle={
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.bitly_url)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{ marginTop: ViewScale(-10)}}>
                        <Image
                          style={{width: ViewScale(27.7), height: ViewScale(25.7)}}
                          source={require('../../image/books.png')}
                        />
                      </View>

                      <View
                        style={{
                          
                          // backgroundColor: '#96b3cb',
                          // borderWidth: 1,
                          // backgroundColor: 'rgba(176,196,222,0.2)',
                          borderRadius: ViewScale(8),
                          paddingHorizontal: ViewScale(8),
                         
                        }}>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => Linking.openURL(item.bitly_url)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: ViewScale(20), color: '#2d6dc4'}}>
                              {item.items_name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            backgroundColor: 'rgba(176,196,222,0.2)',
                            borderRadius: ViewScale(8),
                            paddingHorizontal: ViewScale(8),
                          }}>
                          <Text style={{fontSize: ViewScale(20), color: '#20416e'}}>
                            {item.cats_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  null,
  mapDispatchToProps,
)(OsecView);
