import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Linking,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-elements';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import {CheckBox, Overlay} from 'react-native-elements';
// test DATA
// import DataBrand from './DataBrand';
import I18n from '../../utils/I18n';
import Style from './Style';
import { ViewScale } from '../../config/ViewScale';
import {master_award, Cheackmaster_award} from '../../actions/data.actions';
import {connect} from 'react-redux';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      intext: 0,
      DataBrand: [],
      CheackDataBrand: [],
      popup: false,
    };
  }

  componentDidMount() {
    this.master_award();
  }

  master_award = async () => {
    // alert(this.props.getUser.userDetails.res_result.naturalId)
    try {
      const payload = this.props.getUser.userDetails.res_result.naturalId;
      const response = await this.props.dispatch(master_award(payload));
      // console.log('DataBrand', response);
      if (response.res_code === '00') {
        this.setState({DataBrand: response.result});
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  _Cheackmaster_award = async () => {
    // alert(this.props.getUser.userDetails.res_result.naturalId)
    try {
      const payload = {
        result: {
          memberID: this.props.getUser.userDetails.res_result.naturalId,
          type: '1',
        },
      };
      // alert(JSON.stringify(payload))
      const response = await this.props.dispatch(Cheackmaster_award(payload));
      // console.log('DataBrandFFF', response);
      if (response.res_code === '00') {
        this.setState({CheackDataBrand: response.result});
        this.setState({popup: true});
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  selecitem = ({item, index}) => {
    console.log(item, '++++++++');
    if (item.count >= 1) {
      // alert(this.props.getUser.userDetails.res_result.naturalId + '' + index);
      this._Cheackmaster_award();
      
    } else {
      this.openLink(item.regis_url);
    }
  };

  openLink = async item => {
    const url = item;
    // console.log(url);

    try {
      const url = item;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };
  ListBrand = ({item, index}) => {
    this.state.selectedItems.push(false);
    // console.log(this.state.selectedItems);
    return (
      <View>
        <ListItem
          containerStyle={{
            marginTop: ViewScale(2),
            marginHorizontal: ViewScale(10),
            borderRadius: ViewScale(8),
            marginBottom: ViewScale(2),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}
          leftAvatar={
            <View
              style={{marginRight: ViewScale(25), backgroundColor: '#FFFFFF', flex: 0.3}}>
              <Image style={{width: ViewScale(90), height: ViewScale(60)}} source={{uri: item.img}} />
            </View>
          }
          title={
            <View
              style={{
                width: '100%',

                marginTop: ViewScale(-4),
              }}>
              <Text numberOfLines={2} style={[Style.Textname]}>
                {item.title}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode={'contain'}
                  style={{width: ViewScale(13), height: ViewScale(13)}}
                  source={require('../../image/cupbrandx.png')}
                />
                <Text
                  numberOfLines={2}
                  style={{color: '#8b9bb0', marginHorizontal: ViewScale(10), fontSize: ViewScale(16)}}>
                  {I18n.t('transalte_getbrand')} {'(' + item.count + ')'}
                </Text>
              </View>
            </View>
          }
          rightTitle={
            <TouchableOpacity
              onPress={() => this.selecitem({item: item, index: index})}
              style={item.count >= 1 ? Style.TouchStyle : Style.TouchStyle1}>
              {item.count >= 1 ? (
                <Text style={Style.TouchText}>{I18n.locale === 'th' ? 'ตรวจสอบ' : 'Examine'}</Text>
              ) : (
                <Text style={Style.TouchText2}>
                  {I18n.t('translate_ApplyAward')}
                </Text>
              )}
            </TouchableOpacity>
          }
        />
      </View>
    );
  };

  ListBrand1 = ({item, index}) => {
    this.state.selectedItems.push(false);
    // console.log(this.state.selectedItems);
    return (
      <View>
        <Text style={{color:'#163c70',fontSize:ViewScale(22)}}>
         {''}
        </Text>
        <Text style={{color:'#163c70',fontSize:ViewScale(22)}}>
        ชื่อบริษัท : {I18n.locale === 'th'? item.company_name_th: item.company_name_en}
        </Text>
       
        <Text style={{color:'#163c70',fontSize:ViewScale(22)}}>
        วันที่สมัคร : { item.register_date}
        </Text>
        <Text style={{color:'#163c70',fontSize:ViewScale(22)}}>
        วันหมดอายุ : { item.expired_date}
        </Text>
        <Text style={{color:'#163c70',fontSize:ViewScale(22)}}>
         สถานะ { item.status}
        </Text>
      
      </View>
    );
  };
  render() {
    return (
      <View style={Style.SafeArea}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />

        <View style={{marginTop: Platform.OS === 'android' && ViewScale(90)}} />
        <Headerstage nameTab={I18n.t('transalte_value_added_activities_badge')} />
        <View style={{zIndex: -1, flex: 1}}>
          <FlatList
            // numColumns={2}
            // columnWrapperStyle={{
            //   justifyContent: 'space-around',
            //   alignContent: 'center',
            //   alignSelf: 'center',
            // }}
            data={this.state.DataBrand}
            keyExtractor={(item, index) => index}
            renderItem={this.ListBrand}
          />
        </View>

        {this.state.popup === true && (
          <Overlay
            backdropStyle={{backgroundColor: '#2d6dc480'}}
            overlayStyle={{
              top: height * 0.045,
              height: height * 0.5,
              width: width * 0.8,
              borderRadius: ViewScale(8),
            }}
            isVisible={this.state.popup}
            onBackdropPress={() => this.setState({popup: false})}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: ViewScale(18),
                backgroundColor: '#FFFFFF',
              }}>
              <FlatList
              
                data={this.state.CheackDataBrand}
                keyExtractor={(item, index) => index}
                renderItem={this.ListBrand1}
              />
            </View>
          </Overlay>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
  getUser: state.userReducer.getUser,
  getStatus1: state.dataReducer.getStatus,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brand);
