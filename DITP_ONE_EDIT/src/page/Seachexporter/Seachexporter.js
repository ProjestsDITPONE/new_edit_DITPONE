import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {ListItem} from '../../lib_edit/react-native-elements';
import DataExporter from '../../Data/DataExporter';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import Styles from './Styles';
import {connect} from 'react-redux';
import {getExporterData} from '../../actions/data.actions';
import I18n from '../../utils/I18n';

class Seachexporter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0,
      shopping: require('../../image/shoping.png'),
      pickShopping: require('../../image/PickerMarket.png'),
      touch: false,
      selectedItems: [],
      Sort: 'Sort',
      page: 5,
      componentVisible: false,
      typeMarket: 1,
      dataMarketData: [],
      dataPage: 1,
      isListEnd: false,
      loading: false,
      fetching_from_server: false,
      searchtext: '',
      country: '',
      sortby: '',
      date: '',
    };
    this.offset = 0;
  }

  _getMarketData = values => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      this.setState({fetching_from_server: true}, async () => {
        try {
          console.log(this.props.getUser.userDetails.res_result.level);
          // console.log('ค่า', this.props.route.params.user);
          this.response = await this.props.dispatch(
            getExporterData({
              offset: this.offset * 10,
              txt_no:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.TAX
                  : '',
              search: this.state.searchtext,
              group_product:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.Group
                  : '',
              product_name:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.Product
                  : '',
              brand_name:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.Brand
                  : '',
              product_category_id: this.props.route.params.user
                ? this.props.route.params.user.Category
                : '',
              product_sub_category_id: this.props.route.params.user
                ? this.props.route.params.user.SubCategory
                : '',
              search_by:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.CompanyList
                  : '',
              member_type:
                this.props.route.params.user != undefined
                  ? this.props.route.params.user.member_type
                  : '',
              Authorization: this.props.authData.token.res_result.token,
            }),
          );
          // console.log(this.response.all_item);

          if (this.response.res_code === '00') {
            if (this.response.count_item > 0) {
              this.offset = this.offset + 1;
              this.setState({
                dataMarketData: [
                  ...this.state.dataMarketData,
                  ...this.response.res_result,
                ],
                fetching_from_server: false,
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  componentWillReceiveProps() {
    this.setState(
      {
        ...this.state,
        fetching_from_server: false,
        isListEnd: false,
        dataMarketData: [],
      },
      function() {
        this.offset = 0;
        this._getMarketData();
      },
    );
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      console.log('TEST');
      this._getMarketData();
      // console.log(this.props.getUser.res_result);
    });

    this._getMarketData();
  }

  ViewDetail = data => {
    this.props.navigation.navigate('Viewexport', {dataExport: data});
  };

  ListDataExport = ({item, index}) => {
    // console.log(item, '+++++++');
    return (
      <ListItem
        style={{margin: 5}}
        onPress={data => this.ViewDetail(item)}
        bottomDivider
        title={I18n.locale === 'th' ? item.name_th : item.name_en}
        titleStyle={{
          fontSize: 22,
          color: '#163c70',
          fontWeight: 'normal',
          fontFamily: 'Kittithada Bold 75',
        }}
      />
    );
  };

  searchSubmit = e => {
    // console.log(e.nativeEvent.text);
    this.setState(
      {
        ...this.state,
        selectedIndex: this.state.selectedIndex,
        dataPage: 0,
        fetching_from_server: false,
        isListEnd: false,
        dataMarketData: [],
        searchtext: e.nativeEvent.text,
      },

      function() {
        console.log('เคลีย');
        clearTimeout(Seach);
        const Seach = setTimeout(() => {
          console.log('เรียก');
          this.offset = 0;
          this._getMarketData();
        }, 3000);

        // const time = setTimeout(() => {

        // }, 3000);
        // return () => clearInterval(time);
        // this._getMarketData();

        // this._getMarketData();
        // if (e.nativeEvent.text.lenght) {
        //   console.log('+++++');
        // }
      },
    );
    // if (e.nativeEvent.text.length > 0) {
    //   setTimeout(() => {
    //     this._getMarketData();
    //     this.offset = 0;
    //   }, 30000);
    // }
    // console.log(e.nativeEvent.text.length);
  };

  checkHeader = () => {
    if (this.props.navigation.navigate) {
      return false;
    } else {
      return true;
    }
  };

  renderFooter() {
    return (
      <View style={Styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  }

  render() {
    // console.log('ค่า', this.props.route.params.abc.abc);
    // console.log('ค่า1', this.props.route.params.abcc);
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={this.props.route.params.abc.abc}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('translate_ExH')} />
        <View style={{flex: 1, zIndex: -1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                color: '#20416e',
                fontFamily: 'Kittithada Bold 75',
              }}>
              {I18n.t('translate_ConBuy')}{' '}
              {this.response != undefined && this.response.all_item}{' '}
              {I18n.t('translate_case')}
            </Text>
            <View style={{flexDirection: 'row-reverse', flex: 1, right: 15}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 13, height: 10}}
                  source={require('../../image/tab2.png')}
                />
                <Text style={{fontSize: 22, color: '#40536d'}}>
                  {' '}
                  {I18n.t('translate_Gong')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={Styles.ViewSub1}>
            <View style={Styles.ViewSub2}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Seach.png')}
              />
              {/* <TextInput
                style={Styles.TextInputSub1}
                placeholder="ค้นหา อาทิเช่น ชื่อบริษัท,เลขนิติบุคคล"
              /> */}
              <TextInput
                placeholder={I18n.t('translate_SeachEx')}
                style={[Styles.TextInputSub1, {flex: 1, paddingRight: 10}]}
                onChange={this.searchSubmit}
                returnKeyType="done"
              />
            </View>
            <View style={{margin: 10}}>
              {this.state.searchtext == '' ? (
                <Text
                  style={{fontSize: 20, color: '#4b4b4b', alignSelf: 'center'}}>
                  {I18n.t('translate_SeachThai_Eng')}
                </Text>
              ) : (
                <Text style={{fontSize: 20, color: '#4b4b4b', marginLeft: 8}}>
                  {I18n.t('translate_AnsSeach')} “
                  <Text style={{color: '#2d6dc4', fontWeight: 'normal'}}>
                    {this.state.searchtext}
                  </Text>
                  ” {I18n.t('translate_All')} {this.response.count_found}{' '}
                  {I18n.t('translate_case')}
                </Text>
              )}
            </View>
          </View>
          {/* <ScrollView>
            <FlatList
              scrollEnabled={false}
              keyExtractor={(item, index) => index}
              data={DataExporter}
              renderItem={this.ListDataExport}
            />
          </ScrollView> */}
          <View
            style={{alignSelf: 'center', width: '100%', paddingBottom: 100}}>
            {this.state.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                style={{width: '100%'}}
                keyExtractor={(item, index) => index}
                data={this.state.dataMarketData}
                onEndReached={() => this._getMarketData()}
                onEndReachedThreshold={0.5}
                renderItem={this.ListDataExport}
                // ItemSeparatorComponent={() => <View style={Styles.separator} />}
                ListFooterComponent={this.renderFooter.bind(this)}

                //Adding Load More button as footer component
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  HeaderBack: state.globalReducer.HeaderBack,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
});
export default connect(
  // mapStateToProps,
  mapStateToProps,
  mapDispatchToProps,
)(Seachexporter);
