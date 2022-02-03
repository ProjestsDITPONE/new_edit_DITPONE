import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import Headers from '../../components/Headers';
// import PDFView from 'react-native-view-pdf';
import Pdf from 'react-native-pdf';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import Style from './Style';

import {UpdateViewMore} from '../../actions/data.actions';
import {getInfo} from '../../actions/auth.actions';
import I18n from '../../utils/I18n';
import { ViewScale } from '../../config/ViewScale';
import Styles from '../TradeActivities/Styles';
import {Value} from 'react-native-reanimated';
import {Alert} from 'react-native';
const ViewMarketCountry = ({
  navigation,
  route,
  LoadingCounters,
  dispatch,
  authData,
}) => {
  const [visible, setvisible] = useState(false);

  // const resources = `https://docs.google.com/gview?embedded=true&url=${
  //   route.params.uri
  // }`;
  const resources = {
    uri: route.params.uri,
    cache: true,
  };

  const resourceType = 'url';
  const title = route.params.title;
  const image = route.params.image;
  const timeElapsed = route.params.timeElapsed;
  const country_name = route.params.country_name;
  const view = route.params.view;
  const IDmarket = route.params.market_id;
  const ckck =route.params.ck;
  const user = authData.token;

  const urinews = route.params.uri;

   var num = 0;
  


  const AlertLogout2 = () => {

  
    dispatch(
      getInfo({
        token: authData.token,
      }),
    );
  };
  useEffect(() => {

    console.log("News"+ IDmarket)
    setTimeout(() => {
      const payload = {
        result: {
          market_id: IDmarket,
        },
        token: user,
      };
      const response = dispatch(UpdateViewMore(payload));
      
      if (response.res_code === undefined) {
       
        AlertLogout2;
      }
    }, 1000);
 
  },[]);

  const onShareNews = async value => {
    // console.log('vakkkk', value);
    try {
      
      const result = await Share.share({
        message:title +"\n"+ urinews,
        url: '',
      });
      // alert(result.activityType);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_succeed'));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onShareNewsIos = async value => {
    console.log('vakkkk', urinews);
    try {
      
      const result = await Share.share({
        message:title,
        url: urinews,
      });
      // alert(result.activityType);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log(result.activityType);
          alert(I18n.t('alert_succeed'));
        } else {
          // shared
          alert(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderLoading = () => {
    return (
      <View
        style={{
          // padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" style={{margin: ViewScale(15)}} />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && ViewScale(90), zIndex: -1}} />
      <View style={[Style.ViewFlatList1, {marginTop: ViewScale(20), zIndex: -1}]}>
        <View style={Style.ViewFlatList4}>
          <View style={Style.marginLeft10}>
            <Image
              style={{width: ViewScale(33), height: ViewScale(24), top: ViewScale(6)}}
              source={{uri: image}}
            />
          </View>
          <View style={Style.ViewFlatList3}>
            <View style={Style.flewRow}>
              <Text style={Style.fontFlatList}>{title}</Text>
            </View>
            <View style={[Style.flewRow,{}]}>
              <Text style={Style.fontFlatList2}>
                {timeElapsed} - {country_name}
              </Text>
          
              <View style={{flexDirection:'row',flex:0.55}}>
                <View style={{marginHorizontal:ViewScale(10)}}> 
              <TouchableOpacity disabled onPress={() => console.log('VIEW')}>
                  <Image
                    style={{width: ViewScale(21), height: ViewScale(13),marginTop:Platform.OS==='ios'?5:3}}
                    source={require('../../image/ViewEye.png')}
                  />
                </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={Style.fontFlatList3}>
                    {' '}
                    {view} {I18n.t('translate_View')}
                  </Text>
                </View>
                
             <View style={{justifyContent:'center'}}> 

                <TouchableOpacity
                    onPress={() => {
                     if(Platform.OS === 'android'){
                      onShareNews();    

                     }else{
                      onShareNewsIos()
                     }
                  
                     
                      // alert(JSON.stringify(urinews))
                    }}
                    style={{ marginHorizontal:ViewScale(10),}}>
                    <Image
                      resizeMode={'contain'}
                      style={{width: ViewScale(14), height: ViewScale(16)}}
                      source={require('../../image/sharelx.png')}
                    />
                  </TouchableOpacity>
                  </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Pdf
        source={resources}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={{flex: 1, zIndex: -1}}
        // style={styles.pdf}
      />
      {/* <PDFView
        fadeInDuration={250.0}
        style={{flex: 1}}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={error => console.log('Cannot render PDF', error)}
      /> */}
      {/* <View style={{flex: 1, zIndex: -1}}>
        {visible === false && renderLoading()}
        <WebView
          onLoad={() => setvisible(true)}
          // startInLoadingState={true}
          renderLoading={() => renderLoading()}
          source={{uri: resources}}
        />
      </View> */}
      {/* <View style={{zIndex: -1}}>
        <View style={[Style.ViewFlatList1, {marginTop: 20}]}>
          <View style={Style.ViewFlatList4}>
            <View style={Style.marginLeft10}>
              <Image
                style={{width: 33, height: 24, top: 6}}
                source={{uri: image}}
              />
            </View>
            <View style={Style.ViewFlatList3}>
              <View style={Style.flewRow}>
                <Text style={Style.fontFlatList}>{title}</Text>
              </View>
              <View style={Style.flewRow}>
                <Text style={Style.fontFlatList2}>
                  {timeElapsed} - {country_name}
                </Text>
                <View style={Style.ViewFlatList5}>
                  <View>
                    <Text style={Style.fontFlatList3}>
                      {' '}
                      {view} {I18n.t('translate_View')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled
                    onPress={() => console.log('VIEW')}>
                    <Image
                      style={{width: 21, height: 13}}
                      source={require('../../image/ViewEye.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <WebView
            // startInLoadingState={true}
            // renderLoading={() => renderLoading()}
            source={{uri: resources}}
          />
        </View>
      </View> */}
    </View>
  );
};

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  authData: state.authReducer.authData,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewMarketCountry);
