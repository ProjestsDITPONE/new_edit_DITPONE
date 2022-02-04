import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import { ViewScale } from '../../config/ViewScale';

import {
  getAppealHome,
  getAppealViewAll,
  DetailCare,
} from '../../actions/data.actions';
import {connect} from 'react-redux';
import Styles from './Styles';
import I18n from '../../utils/I18n';

const AppealHome = ({
  navigation,
  dispatch,
  AppealHomeRedux,
  Token,
  getUser,
}) => {
  const [Search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [fetching_from_server, setFetching_from_server] = useState(false);
  const [appealHome, setAppealHome] = useState([]);
  const [isListEnd, setIsListEnd] = useState(false);
  const [issearch, setIsSearch] = useState(false);
  const [isrefresh, setIsRefresh] = useState(false);

  const viewDetailCare = async id => {
    try {
      const response = await dispatch(
        DetailCare({
          res: id,
          token:
            getUser.userDetails.res_result.token_care === ''
              ? 'de8a23983dae2f90f4cab2af19b37905'
              : getUser.userDetails.res_result.token_care,
        }),
      );
      if (response.res_code == '00') {
        navigation.navigate('AppealView', {detail: response.res_result[0]});
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoadAPISearch = async () => {
    const payload =
      '?sort=-case_id' + `&filter={"% caseDtl_title %":"${Search}"}`;
    console.log('PAYLOAD API', payload);
    let response = '';
    console.log('search', Search);
    if (Search === '') {
      console.log('IN IF');
      response = await dispatch(
        getAppealHome({
          res: payload,
          token:
            getUser.userDetails.res_result.token_care === ''
              ? 'de8a23983dae2f90f4cab2af19b37905'
              : getUser.userDetails.res_result.token_care,
        }),
      );
      setIsSearch(false);
    } else {
      response = await dispatch(
        getAppealViewAll({
          res: payload,
          token:
            getUser.userDetails.res_result.token_care === ''
              ? 'de8a23983dae2f90f4cab2af19b37905'
              : getUser.userDetails.res_result.token_care,
        }),
      );
      setIsSearch(true);
      console.log('IN ELSE');
    }
    setFetching_from_server(true);
    if (response.res_code === '00') {
      if (response.res_result.length > 0) {
        console.log('wwwwww');
        setAppealHome(response.res_result);
      } else {
        console.log('faild');
      }
      setFetching_from_server(false);
    } else {
      setAppealHome([]);
      setFetching_from_server(false);
    }
    console.log('APPEALHOE', appealHome);
  };

  useEffect(() => {
    LoadAPISearch();
  }, []);

  const Link = () => {
    try {
      const Listloader = [
        <TouchableOpacity
          onPress={() => navigation.navigate('AppealView')}
          style={{borderRadius: ViewScale(10)}}>
          <ImageBackground
            source={require('../../image/percentBack.png')}
            style={Styles.backgroundAppel}>
            <View
              style={{
                marginTop: ViewScale(10),
                flex: 0.85,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: ViewScale(24), color: '#FFFFFF'}}>
                {''}
                ลูกค้าไม่ยอมชำระเงินเป็นเวลา 1 ปี{'\n'}
                <View>
                  <Image
                    style={{width: ViewScale(11), height: ViewScale(11)}}
                    source={require('../../image/calenda.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: ViewScale(16),
                    color: '#20416e',
                  }}>
                  {' '}
                  25/06/2562{'\t'}
                  <Icon name="clockcircleo" />
                  <Text> 09:30</Text>
                </Text>
              </Text>
            </View>
            <View style={{justifyContent: 'center', flex: 0.1}}>
              <Icon name="rightcircleo" size={ViewScale(25)} color="#FFFFFF" />
            </View>
          </ImageBackground>
        </TouchableOpacity>,
      ];
      var number = [];
      if (Listloader > page) {
        for (let index = 0; index < page; index++) {
          number.push(Listloader[index]);
        }
        // console.log(number);
        return number;
      } else {
        for (let index = 0; index < page; index++) {
          number.push(Listloader[index]);
        }
        // console.log(number);
        return number;
      }
    } catch (error) {
      return 'N/A';
    }
  };

  const onRefresh = async () => {
    LoadAPISearch();
  };

  const ListAppealWaiting = ({item}) => {
    console.log('show', item.comp_name);
    let newDate = item.comp_date.split('-');
    console.log(newDate, 'DDDDDDD');
    console.log(item.comp_id);
    return (
      <TouchableOpacity onPress={() => viewDetailCare(item.comp_id)}>
        <ImageBackground
          source={require('../../image/percentBack.png')}
          style={Styles.backgroundAppel}>
          <Image
            source={
              item.comp_perces === 0 ? require('../../image/percen0.png') : ''
            }
            style={
              item.comp_perces === 0
                ? {
                    width: ViewScale(65),
                    height: ViewScale(65),
                    borderColor: '#ff9800',
                    borderRadius: ViewScale(45),
                    backgroundColor: '#fff',
                  }
                : ''
            }
          />
          <View style={Styles.reportCardTitle}>
            <Text style={{fontSize: ViewScale(24), color: '#FFFFFF'}}>
              {item.comp_name}
            </Text>
            <View style={[Styles.flexRow, {alignItems: 'center'}]}>
              <Image
                style={Styles.reportCardCalender}
                source={require('../../image/calenda.png')}
              />
              <Text style={Styles.reportCardLabel}>
                {newDate[2] + '-' + newDate[1] + '-' + newDate[0]}
              </Text>
              <Icon name="clockcircleo" style={Styles.reportCardLabel} />
              <Text style={Styles.reportCardLabel}>{item.comp_time}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <Icon name="rightcircleo" size={ViewScale(24)} color="#FFFFFF" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const ListAppealPending = ({item}) => {
    let newDate = item.comp_date.split('-');
    console.log('show', item);
    return (
      <TouchableOpacity onPress={() => viewDetailCare(item.comp_id)}>
        <ImageBackground
          source={require('../../image/percentBack.png')}
          style={Styles.backgroundAppel}>
          <Image
            source={
              item.comp_perces === 25
                ? require('../../image/percen1.png')
                : item.comp_perces === 50
                ? require('../../image/percen2.png')
                : item.comp_perces === 75
                ? require('../../image/percen3.png')
                : ''
            }
            style={
              item.comp_perces === 25
                ? {
                    width: ViewScale(65),
                    height: ViewScale(65),
                    borderColor: '#ff9800',
                    borderRadius: ViewScale(45),
                    backgroundColor: '#fff',
                  }
                : item.comp_perces === 50
                ? {
                    width: ViewScale(65),
                    height: ViewScale(65),
                    borderColor: '#ff9800',
                    borderRadius: ViewScale(45),
                    backgroundColor: '#fff',
                  }
                : item.comp_perces === 75
                ? {
                    width: ViewScale(65),
                    height: ViewScale(65),
                    borderColor: '#ff9800',
                    borderRadius: ViewScale(45),
                    backgroundColor: '#fff',
                  }
                : ''
            }
          />

          <View style={Styles.reportCardTitle}>
            <Text style={{fontSize: ViewScale(24), color: '#FFFFFF'}}>
              {item.comp_name}
            </Text>
            <View style={[Styles.flexRow, {alignItems: 'center'}]}>
              <Image
                style={Styles.reportCardCalender}
                source={require('../../image/calenda.png')}
              />
              <Text style={Styles.reportCardLabel}>
                {newDate[2] + '-' + newDate[1] + '-' + newDate[0]}
              </Text>
              <Icon name="clockcircleo" style={Styles.reportCardLabel} />
              <Text style={Styles.reportCardLabel}>{item.comp_time}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <Icon name="rightcircleo" size={ViewScale(24)} color="#FFFFFF" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const ListAppealComplete = ({item}) => {
    let newDate = item.comp_date.split('-');
    return (
      <TouchableOpacity onPress={() => viewDetailCare(item.comp_id)}>
        <ImageBackground
          source={require('../../image/percentBack.png')}
          style={Styles.backgroundAppel}>
          <Image
            source={
              item.comp_perces === 100 ? require('../../image/percen4.png') : ''
            }
            style={
              item.comp_perces === 100
                ? {
                    width: ViewScale(65),
                    height: ViewScale(65),
                    borderColor: '#ff9800',
                    borderRadius: ViewScale(45),
                    backgroundColor: '#fff',
                  }
                : ''
            }
          />
          <View style={Styles.reportCardTitle}>
            <Text style={{fontSize: ViewScale(24), color: '#FFFFFF'}}>
              {item.comp_name}
            </Text>
            <View style={[Styles.flexRow, {alignItems: 'center'}]}>
              <Image
                style={Styles.reportCardCalender}
                source={require('../../image/calenda.png')}
              />
              <Text style={Styles.reportCardLabel}>
                {newDate[2] + '-' + newDate[1] + '-' + newDate[0]}
              </Text>
              <Icon name="clockcircleo" style={Styles.reportCardLabel} />
              <Text style={Styles.reportCardLabel}>{item.comp_time}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <Icon name="rightcircleo" size={ViewScale(25)} color="#FFFFFF" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // console.log('ค่าาาา', appealHome[0].comp_perces);
  return (
    <View
      // source={require('../../image/background.png')}
      style={Styles.height100}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -2,
        }}
        source={require('../../image/background.png')}
      />
      <Headers
        badgeNumber="2"
        navigation={navigation}
        backScreen={false}
        ArrowColor={true}
      />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <Headerstage nameTab={I18n.t('translate_Myreport')} />
      <View style={{zIndex: -1}}>
        <View style={Styles.searchContainer}>
          <ImageBackground
            source={require('../../image/tabserach.png')}
            style={Styles.searchBackground}>
            <Searchbar
              style={Styles.searchBar}
              icon={() => <Icon2 name="search" size={ViewScale(25)} color="#fff" />}
              onSubmitEditing={() => LoadAPISearch()}
              onChangeText={txt => setSearch(txt)}
              returnKeyType="search"
            />
          </ImageBackground>
        </View>

        {/* Complete Waiting  ///แก้สีสถานะ*/}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isrefresh} onRefresh={onRefresh} />
          }>
          {!issearch && (
            <View style={Styles.viewSub2}>
              <Text style={Styles.textsub1}>
                {I18n.t('translate_Status')} :
              </Text>
              <View style={Styles.waitingPill}>
                <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                  {I18n.t('translate_Waiting')}
                </Text>
              </View>
              <View style={Styles.viewSub4}>
                <TouchableOpacity
                  style={Styles.flexRow}
                  onPress={() =>
                    navigation.navigate('AppealViewAll', {showpercens: '0'})
                  }>
                  <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                    {I18n.t('translate_ViewAll')}
                  </Text>
                  <Icon3 name="chevron-small-right" color="#FFFFFF" size={ViewScale(23)} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{height: null}}>
            {appealHome.length > 0 ? (
              <View>
                {appealHome[0].comp_perces === 0 ? (
                  <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    data={
                      appealHome
                        ? appealHome.filter(data => data.comp_perces == 0)
                        : ''
                    }
                    renderItem={ListAppealWaiting}
                    refreshControl={
                      <RefreshControl
                        refreshing={isrefresh}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: ViewScale(25),
                        color: '#FFFFFF',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: ViewScale(40),
                      }}>
                      {I18n.t('translate_NodataCare')}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: ViewScale(25),
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    paddingTop: ViewScale(40),
                  }}>
                  {I18n.t('translate_NodataCare')}
                </Text>
              </View>
            )}

            {/* Complete Pending */}
            {!issearch && (
              <View style={Styles.viewSub2}>
                <Text style={Styles.textsub1}>
                  {I18n.t('translate_Status')} :
                </Text>
                <View style={Styles.pendingPill}>
                  <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                    {I18n.t('translate_Pending')}
                  </Text>
                </View>
                <View style={Styles.viewSub4}>
                  <TouchableOpacity
                    style={Styles.flexRow}
                    onPress={() =>
                      navigation.navigate('AppealViewAll', {showpercens: '1,2'})
                    }>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      {I18n.t('translate_ViewAll')}
                    </Text>
                    <Icon3
                      name="chevron-small-right"
                      color="#FFFFFF"
                      size={ViewScale(23)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {appealHome.length > 0 ? (
              <View>
                {appealHome[0].comp_perces === 25 &&
                appealHome[0].comp_perces === 75 ? (
                  <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    data={
                      appealHome
                        ? appealHome.filter(
                            data =>
                              data.comp_perces >= 25 && data.comp_perces <= 75,
                          )
                        : ''
                    }
                    // data={appealHome }
                    renderItem={ListAppealPending}
                  />
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: ViewScale(25),
                        color: '#FFFFFF',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: ViewScale(40),
                      }}>
                      {I18n.t('translate_NodataCare')}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: ViewScale(25),
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    paddingTop: ViewScale(40),
                  }}>
                  {I18n.t('translate_NodataCare')}
                </Text>
              </View>
            )}
            {/* Complete Report */}
            {!issearch && (
              <View style={Styles.viewSub2}>
                <Text style={Styles.textsub1}>
                  {I18n.t('translate_Status')} :
                </Text>
                <View style={Styles.completePill}>
                  <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                    {I18n.t('translate_Complete')}
                  </Text>
                </View>
                <View style={Styles.viewSub4}>
                  <TouchableOpacity
                    style={Styles.flexRow}
                    onPress={() =>
                      navigation.navigate('AppealViewAll', {showpercens: '3'})
                    }>
                    <Text style={{fontSize: ViewScale(22), color: '#FFFFFF'}}>
                      {I18n.t('translate_ViewAll')}
                    </Text>
                    <Icon3
                      name="chevron-small-right"
                      color="#FFFFFF"
                      size={ViewScale(23)}
                      style={{marginTop: ViewScale(2)}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {appealHome.length > 0 ? (
              <View>
                {appealHome[0].comp_perces === 100 ? (
                  <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    data={
                      appealHome
                        ? appealHome.filter(data => data.comp_perces >= 100)
                        : ''
                    }
                    // data={appealHome }
                    renderItem={ListAppealComplete}
                  />
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: ViewScale(25),
                        color: '#FFFFFF',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: ViewScale(40),
                      }}>
                      {I18n.t('translate_NodataCare')}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: ViewScale(25),
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    paddingTop: ViewScale(40),
                  }}>
                  {I18n.t('translate_NodataCare')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
  LoadingCounters: state.globalReducer.LoadingCounters,
  AppealHomeRedux: state.dataReducer.getAppealHome.isResult,
  Token: state.authReducer.authData.token,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppealHome);
