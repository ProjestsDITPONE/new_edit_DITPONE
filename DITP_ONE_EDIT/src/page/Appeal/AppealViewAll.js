import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import Styles from './Styles';
import { ViewScale } from '../../config/ViewScale';
import I18n from '../../utils/I18n';
import {
  getAppealViewAll,
  getSearchAppealViewAll,
} from '../../actions/data.actions';
import {connect} from 'react-redux';
import ProgressCircle from 'react-native-progress-circle';
import {color, set} from 'react-native-reanimated';

const AppealViewAll = ({route, navigation, dispatch, getAppealAll, Token}) => {
  const [offset, setOffset] = useState(0);
  const [fetching_from_server, setFetching_from_server] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [searchtext, setSearchtext] = useState('');
  const [dataAppealViewAll, setdataAppealViewAll] = useState([]);
  const [isrefresh, setIsRefresh] = useState(false);

  const showpercens = route.params.showpercens;
  const limit = 10;

  const onRefresh = async () => {
    LoadAPISearch();
  };

  const LoadMore = async () => {
    const payload =
      '?offset=' +
      offset +
      '&limit=' +
      limit +
      '&sort=-case_id' +
      `&filter={"(case_status)":"${showpercens}","% caseDtl_title %":"${searchtext}"}`;
    console.log('PAYLOAD LOADMORE', payload);

    const response = await dispatch(getAppealViewAll(payload));
    setFetching_from_server(true);
    if (response.res_code === '00') {
      if (response.res_result.length > 0) {
        setdataAppealViewAll([...dataAppealViewAll, ...response.res_result]);
      } else {
        console.log('faild');
      }
      setFetching_from_server(false);
      setOffset(val => val + 1);
    } else {
      setIsListEnd(true);
      setFetching_from_server(false);
    }
  };

  const LoadAPISearch = async () => {
    const payload =
      '?offset=0' +
      '&limit=' +
      limit +
      '&sort=-case_id' +
      `&filter={"(case_status)":"${showpercens}","% caseDtl_title %":"${searchtext}"}`;
    console.log('PAYLOAD API', payload);
    const response = await dispatch(getAppealViewAll(payload));
    setFetching_from_server(true);
    setIsListEnd(false);
    if (response.res_code === '00') {
      if (response.res_result.length > 0) {
        setdataAppealViewAll(response.res_result);
      } else {
        console.log('faild');
      }
      setFetching_from_server(false);
      setOffset(1);
    } else {
      // alert('ไม่พบข้อมูล');
      setdataAppealViewAll([]);
      setIsListEnd(true);
      setFetching_from_server(false);
    }
  };

  useEffect(() => {
    LoadAPISearch();
  }, []);

  const renderFooter = () => {
    return (
      <View style={Styles.footer}>
        {fetching_from_server && !isListEnd ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ListAppealViewAll = ({item}) => {
    let newDate = item.comp_date.split('-');
    return (
      <ImageBackground
        source={require('../../image/percentBack.png')}
        style={Styles.backgroundAppel}>
        <Image
          source={
            item.comp_perces === 0
              ? require('../../image/percen0.png')
              : item.comp_perces === 25
              ? require('../../image/percen1.png')
              : item.comp_perces === 50
              ? require('../../image/percen2.png')
              : item.comp_perces === 75
              ? require('../../image/percen3.png')
              : item.comp_perces === 100
              ? require('../../image/percen4.png')
              : ''
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
              : item.comp_perces === 25
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
              : item.comp_perces == 75
              ? {
                  width: ViewScale(65),
                  height: ViewScale(65),
                  borderColor: '#ff9800',
                  borderRadius: ViewScale(45),
                  backgroundColor: '#fff',
                }
              : item.comp_perces == 100
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
          <Text style={{fontSize: ViewScale(24), color: '#FFFFFF'}}>{item.comp_name}</Text>
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
    );
  };
  // console.log(dataAppealViewAll);
  return (
    <View style={Styles.height100}>
      <Headers
        badgeNumber="2"
        navigation={navigation}
        backScreen={false}
        ArrowColor={true}
      />
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -2,
        }}
        source={require('../../image/background.png')}
      />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
      <Headerstage nameTab={I18n.t('translate_Myreport')} />
      <View style={{flex: 1, zIndex: -1}}>
        <View style={Styles.searchContainer}>
          <ImageBackground
            source={require('../../image/tabserach.png')}
            style={Styles.searchBackground}>
            <Searchbar
              style={Styles.searchBar}
              icon={() => <Icon2 name="search" size={ViewScale(25)} color="#fff" />}
              onSubmitEditing={() => LoadAPISearch()}
              onChangeText={txt => setSearchtext(txt)}
              returnKeyType="search"
            />
          </ImageBackground>
        </View>
        {/* <ScrollView> */}
        <View style={{flex: 1}}>
          {/* <ScrollView style={Styles.viewSub2}> */}
          {dataAppealViewAll.length > 0 ? (
            <FlatList
              // scrollEnabled={false}
              keyExtractor={(item, index) => index}
              data={dataAppealViewAll}
              renderItem={ListAppealViewAll}
              onEndReached={() =>
                setTimeout(() => {
                  LoadMore();
                }, 1000)
              }
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl refreshing={isrefresh} onRefresh={onRefresh} />
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
          {/* </ScrollView> */}
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  getAppealAll: state.dataReducer.getAppealViewAll.isResult,
  Token: state.authReducer.authData.token,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppealViewAll);
