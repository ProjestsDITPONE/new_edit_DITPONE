import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { ListItem } from '../../lib_edit/react-native-elements';
import Headers from '../../components/Headers';
import Styles from './Styles';
import { connect } from 'react-redux';
import { getViewpeople } from '../../actions/data.actions';
//DATA
import Datapeople from '../../Data/Datapeople';
class Viewpeople extends React.Component {
  constructor() {
    // const {dateSech} = this.props.route.params;
    super();
    this.arrayholder = [];
  }
  state = {
    dataViewPeople: [],
    dataView: [],
  };

  _getViewpeople = async values => {
    const list_code = this.props.route.params.list_code;
    const payload = {
      body: { id_list: list_code },
      // body: {id_list: '11102'},
      token: this.props.Token,
    };
    console.log('46448');
    try {
      const response = await this.props.dispatch(getViewpeople(payload));

      if (response.res_code === '00') {
        this.setState({
          dataViewPeople: response.res_result,
          dataView: response.res_result.member,
        });
      }
      this.arrayholder = this.state.dataView;
    } catch (error) { }
  };

  SearchSubmit = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name_th.toUpperCase()}${item.lastname_th.toUpperCase()}${item.company_name_th.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ dataView: newData });
  };

  componentDidMount() {
    this._getViewpeople();
  }

  ListDatapeople = ({ item, index }) => {
    // console.log(item);
    return (
      <ListItem
        style={Styles.ListSub2}
        bottomDivider
        title={
          <View style={Styles.ViewSub19}>
            <Text style={Styles.TextSub21}>{`${item.name_th}` || 'name'}</Text>
            {item.status_survay !== null && (
              <Image
                style={Styles.ImgSub13}
                source={require('../../image/ratetrue.png')}
              />
            )}
            {item.status_survay === null && (
              <Image
                style={Styles.ImgSub13}
                source={require('../../image/ratefalse.png')}
              />
            )}
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <Text style={{ fontSize: 14, color: '#a4a2a2' }}>{item.time}</Text>
            </View>
          </View>
        }
        subtitle={
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, color: '#4b4b4b' }}>
              {item.company_name_th || 'company name'}
            </Text>
            {item.status_join_activity === 1 && (
              <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                <Text style={{ fontSize: 20, color: '#029d00' }}>ลงทะเบียน</Text>
              </View>
            )}
            {item.status_join_activity === 2 && (
              <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                <Text style={{ fontSize: 20, color: '#f96145' }}>Walk in</Text>
              </View>
            )}
          </View>
        }
      />
    );
  };

  render() {

    return (
      <View style={Styles.SafeAre3}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{ zIndex: -1, marginTop: Platform.OS === 'android' && 90 }}>
          {this.state.dataViewPeople.activity && (
            <View style={{ marginLeft: 10 }}>
              <Text style={Styles.TextSub16}>
                {this.state.dataViewPeople.activity.activity_list_topic_th}
              </Text>
              <Text style={Styles.TextSub17}>
                {this.state.dataViewPeople.activity.activity_list_start_date} -
                {this.state.dataViewPeople.activity.activity_list_end_date}
              </Text>
              <View style={Styles.ViewSub15}>
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/maker4.png')}
                />
                <Text style={Styles.TextSub18}>
                  {' '}
                  {this.state.dataViewPeople.activity.activity_list_location_th}
                </Text>
                <View style={Styles.TextSub20}>
                  <Text style={Styles.TextSub18}>
                    เข้าร่วมแล้ว
                    <Text style={Styles.TextSub19}>
                      {' '}
                      {this.state.dataViewPeople.activity.count_ssoid}{' '}
                    </Text>
                    <Text style={Styles.TextSub18}>ราย</Text>
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={Styles.ViewSub16}>
            <Image
              style={Styles.ImgSub11}
              source={require('../../image/linepeople.png')}
            />
          </View>
          {/* <View style={Styles.ViewSub17}> */}
          {/* <View style={Styles.ViewSub18}> */}
          {/* <Image
              style={Styles.ImgSub12}
              source={require('../../image/Seach.png')}
            /> */}
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                borderWidth: 1,
                width: '90%',
                borderColor: '#dadada',
                borderRadius: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={Styles.ImgSub12}
                source={require('../../image/Seach.png')}
              />
              <TextInput
                onChangeText={e => {
                  this.SearchSubmit(e);
                }}
                style={Styles.TextInputSub1}
                placeholder="ค้นหา"
              />
            </View>
          </View>
          {/* </View> */}
          {/* </View> */}

          <ScrollView>
            <FlatList
              scrollEnabled={false}
              data={this.state.dataView}
              keyExtractor={(item, index) => index}
              renderItem={this.ListDatapeople}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  LoadingCounters: state.globalReducer.LoadingCounters,
  ViewpeopleRedux: state.dataReducer.getViewpeople.isResult,
  Token: state.authReducer.authData.token.res_result.token,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewpeople);
