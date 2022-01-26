import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Headers from '../../components/Headers';
import Styles from './Styles';
import I18n from '../../utils/I18n';
import {connect} from 'react-redux';
import {getExportlist} from '../../actions/data.actions';
const Viewexport = ({navigation, route, dispatch, authData}) => {
  const [SelecIndexYear, setSelecIndexYear] = useState(0);
  const [SelecIndexDate, setSelecIndexDate] = useState(0);
  const [Exporterdata1, setExporterdata1] = useState([]);
  const [Exporteryear1, setExporteryear1] = useState();
  const [Exporteryear2, setExporteryear2] = useState();
  const [Exporteryear3, setExporteryear3] = useState();
  const [Exporterdata2, setExporterdata2] = useState([]);
  const [Exporteryear11, setExporteryear11] = useState();
  const [Exporteryear22, setExporteryear22] = useState();
  const [Exporteryear33, setExporteryear33] = useState();
  const handleIndexChange = (index, number) => {
    setSelecIndexYear(index);
  };
  const handleIndexChange2 = (index, number) => {
    setSelecIndexDate(index);
  };

  const _getExportlist = async values => {
    try {
      const respones = await dispatch(
        getExportlist({
          naturalId: route.params.dataExport.naturalId,
          Authorization: authData.token.res_result.token,
        }),
      );
      console.log(respones);
      if (respones.res_code === '00') {
        console.log('ค่าาา1', respones.res_result.Exporter_data_1);
        setExporterdata1(respones.res_result.Exporter_data_1);
        const Year1 =
          parseInt(respones.res_result.Exporter_data_1[0].YearNo) + 543;
        const Year2 =
          parseInt(respones.res_result.Exporter_data_1[1].YearNo) + 543;
        const Year3 =
          parseInt(respones.res_result.Exporter_data_1[2].YearNo) + 543;
        const Year11 =
          parseInt(respones.res_result.Exporter_data_2[0].YearNo) + 543;
        const Year22 =
          parseInt(respones.res_result.Exporter_data_2[1].YearNo) + 543;
        const Year33 =
          parseInt(respones.res_result.Exporter_data_2[2].YearNo) + 543;
        setExporterdata1(respones.res_result.Exporter_data_1);
        setExporteryear1(
          respones.res_result.Exporter_data_1.length > 0
            ? Year1.toString()
            : 'ไม่มีข้อมูล',
        );
        setExporteryear2(
          respones.res_result.Exporter_data_1.length > 0
            ? Year2.toString()
            : 'ไม่มีข้อมูล',
        );
        setExporteryear3(
          respones.res_result.Exporter_data_1.length > 0
            ? Year3.toString()
            : 'ไม่มีข้อมูล',
        );
        setExporterdata2(respones.res_result.Exporter_data_2);
        setExporteryear11(
          respones.res_result.Exporter_data_2.length > 0
            ? Year11.toString()
            : 'ไม่มีข้อมูล',
        );
        setExporteryear22(
          respones.res_result.Exporter_data_2.length > 0
            ? Year22.toString()
            : 'ไม่มีข้อมูล',
        );
        setExporteryear33(
          respones.res_result.Exporter_data_2.length > 0
            ? Year33.toString()
            : 'ไม่มีข้อมูล',
        );
      }
    } catch (error) {}
  };

  function name(year) {
    var Value = parseInt(year) + 543;
    return Value;
  }

  useEffect(() => {
    _getExportlist();

    // console.log(Exporteryear1);
    // console.log(route.params.user, 'user');
    // console.log(route.params.dataExport.naturalId, 'ssss');
    // console.log(route.params.dataExport.Exporter_data_1, 'bbbbbbb');
  }, []);

  const currencyFormat = num => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  return (
    <View style={Styles.SafeAre1}>
      <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
      <View style={{marginTop: Platform.OS === 'android' && 90}} />
      <ScrollView style={{zIndex: -1}}>
        <View style={Styles.ViewSub7}>
          <Text style={Styles.TextSub2}>
            {I18n.locale == 'th'
              ? route.params.dataExport.name_th
              : route.params.dataExport.name_en}
          </Text>
          <Text style={Styles.TextSub3}>
            Status :{' '}
            {route.params.dataExport.property_name != ''
              ? route.params.dataExport.property_name
              : '-'}
          </Text>
          <View style={Styles.ViewSub8}>
            <Image
              style={Styles.ImgSub2}
              source={require('../../image/line6.png')}
            />
          </View>
          {route.params.dataExport.Products != undefined && (
            <View>
              {route.params.dataExport.Products.map(value => (
                <View style={Styles.marginTop12}>
                  <Text style={Styles.TextSub4}>
                    Product :{' '}
                    {I18n.locale == 'th'
                      ? value.Product_Name_TH != ''
                        ? value.Product_Name_TH
                        : '-'
                      : value.Product_Name_EN != ''
                      ? value.Product_Name_EN
                      : '-'}
                  </Text>
                  <View style={[Styles.ViewSub9]}>
                    {/* <View style={[Styles.margin20]}> */}
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub5}>
                        Brand{'\t'}
                        {'\t'} :{' '}
                      </Text>
                      <Text style={[Styles.TextSub4, {width: '70%'}]}>
                        {I18n.locale == 'th'
                          ? value.Product_Brand_TH != ''
                            ? value.Product_Brand_TH
                            : '-'
                          : value.Product_Brand_EN != ''
                          ? value.Product_Brand_EN
                          : '-'}
                      </Text>
                    </View>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub5}>Category{'\t'} : </Text>
                      <Text style={[Styles.TextSub4, {width: '70%'}]}>
                        {I18n.locale == 'th'
                          ? value.Product_Cat_Name_TH != ''
                            ? value.Product_Cat_Name_TH
                            : '-'
                          : value.Product_Cat_Name_EN != ''
                          ? value.Product_Cat_Name_EN
                          : '-'}
                      </Text>
                    </View>
                    <View style={Styles.ViewSub10}>
                      <Text style={Styles.TextSub5}>Short Detail{'\t'} : </Text>
                      <Text style={[Styles.TextSub4, {width: '70%'}]}>
                        {I18n.locale == 'th'
                          ? value.Product_Description_TH != ''
                            ? value.Product_Description_TH
                            : '-'
                          : value.Product_Description_EN != ''
                          ? value.Product_Description_EN
                          : '-'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={Styles.marginTop15}>
            <Text style={Styles.TextSub6}>{I18n.t('translate_Awards')}</Text>
            <View style={Styles.ViewSub9}>
              <Text style={Styles.TextSub9}>{'\t'}-</Text>
              {/* <View style={Styles.ViewSub13}>
                <Image
                  style={Styles.ImgSub3}
                  source={require('../../image/DemarkE.png')}
                />
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/ThaiE.png')}
                />
                <Image
                  style={Styles.ImgSub5}
                  source={require('../../image/PrimE.png')}
                />
              </View> */}
            </View>
          </View>
          <View style={Styles.marginTop15}>
            <Text style={Styles.TextSub6}>มูลค่าการส่งออก</Text>
            <View>
              <Text style={Styles.TextSub8}>ปีงบประมาณ :</Text>
            </View>
            {console.log('12345', Exporteryear1)}
            <SegmentedControlTab
              activeTabStyle={{backgroundColor: '#2d6dc4'}}
              tabTextStyle={Styles.tabtext}
              firstTabStyle={Styles.fistTab}
              lastTabStyle={Styles.lastTab}
              tabStyle={Styles.TabStyle}
              selectedIndex={SelecIndexYear}
              values={[
                Exporteryear1 != undefined
                  ? Exporteryear1
                  : 'ไม่มีข้อมูลปีล่าสุด',
                Exporteryear2 != undefined
                  ? Exporteryear2
                  : 'ไม่มีข้อมูลปีที่แล้ว',
                Exporteryear3 != undefined
                  ? Exporteryear3
                  : 'ไม่มีข้อมูล2ปีที่แล้ว',
              ]}
              onTabPress={handleIndexChange}
            />
            {SelecIndexYear === 0 && (
              <View style={Styles.ViewSub14}>
                <View style={Styles.ViewSub15}>
                  <Image
                    style={Styles.ImgSub6}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata1[0] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata1[0].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {SelecIndexYear === 1 && (
              <View>
                <View style={Styles.ViewSub14}>
                  <Image
                    style={Styles.ImgSub6}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata1[1] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata1[1].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {SelecIndexYear === 2 && (
              <View style={{flex: 1}}>
                <View style={Styles.ViewSub17}>
                  <Image
                    style={Styles.ImgSub6}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata1[2] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata1[2].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={Styles.marginTop15}>
            <Text style={Styles.TextSub8}>ปีปฏิทิน :</Text>

            <SegmentedControlTab
              activeTabStyle={{backgroundColor: '#2d6dc4'}}
              tabTextStyle={Styles.tabtext}
              firstTabStyle={Styles.fistTab}
              lastTabStyle={Styles.lastTab}
              tabStyle={Styles.TabStyle}
              selectedIndex={SelecIndexDate}
              values={[
                Exporteryear11 != undefined
                  ? Exporteryear11
                  : 'ไม่มีข้อมูลปีล่าสุด',
                Exporteryear22 != undefined
                  ? Exporteryear22
                  : 'ไม่มีข้อมูลปีที่แล้ว',
                Exporteryear33 != undefined
                  ? Exporteryear33
                  : 'ไม่มีข้อมูล2ปีที่แล้ว',
              ]}
              onTabPress={handleIndexChange2}
            />
            {SelecIndexDate === 0 && (
              <View style={Styles.ViewSub14}>
                <View style={Styles.ViewSub15}>
                  <Image
                    style={Styles.ImgSub6}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata2[0] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata2[0].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {SelecIndexDate === 1 && (
              <View>
                <View style={Styles.ViewSub14}>
                  <Image
                    style={Styles.ImgSub6}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata2[1] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata2[1].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {SelecIndexDate === 2 && (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    marginHorizontal: 60,
                  }}>
                  <Image
                    style={{width: 11, height: 7, bottom: 2}}
                    source={require('../../image/DropDown.png')}
                  />
                </View>
                <View style={Styles.marginTop5}>
                  <View style={Styles.ViewSub16}>
                    <View>
                      {Exporterdata2[2] != undefined ? (
                        <Text style={Styles.TextSub9}>
                          {'\t'}
                          {currencyFormat(Exporterdata2[2].sum)} บาท
                        </Text>
                      ) : (
                        <Text style={Styles.TextSub9}>{'\t'}-</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View style={Styles.marginTop15}>
              <Text style={Styles.TextSub5}>Contact :</Text>
              <View style={{width: 341, height: null, marginLeft: 10}}>
                <Text style={Styles.TextSub7}>
                  {I18n.locale == 'th'
                    ? route.params.dataExport.contact[0].no_th +
                      ' ' +
                      route.params.dataExport.contact[0].sub_district_name_th +
                      ' ' +
                      route.params.dataExport.contact[0].district_name_th +
                      ' ' +
                      route.params.dataExport.contact[0].province_name_th +
                      ' ' +
                      route.params.dataExport.contact[0].post_code
                    : route.params.dataExport.contact[0].no_en +
                      ' ' +
                      route.params.dataExport.contact[0].sub_district_name_en +
                      ' ' +
                      route.params.dataExport.contact[0].district_name_en +
                      ' ' +
                      route.params.dataExport.contact[0].province_name_en +
                      ' ' +
                      route.params.dataExport.contact[0].post_code}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../image/phone.png')}
                  />
                  <Text style={Styles.TextSub7}>
                    {'  '}
                    {route.params.dataExport.contact[0].tel != ''
                      ? route.params.dataExport.contact[0].tel
                      : '-'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 16, height: 12}}
                    source={require('../../image/mail.png')}
                  />
                  <Text style={Styles.TextSub7}>
                    {'  '}
                    {route.params.dataExport.contact[0].mail != ''
                      ? route.params.dataExport.contact[0].mail
                      : '-'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="web"
                    size={22}
                    color="#2d6dc4"
                    style={{right: 3}}
                  />
                  <Text style={Styles.TextSub7}>
                    {' '}
                    {route.params.dataExport.contact[0].website != ''
                      ? route.params.dataExport.contact[0].website
                      : '-'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewexport);
