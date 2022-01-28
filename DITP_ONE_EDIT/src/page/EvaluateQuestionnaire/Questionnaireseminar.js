import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import Headers from '../../components/Headers';
import Headerstage from '../../components/Headerstage';
import I18n from '../../utils/I18n';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Point1 from './Point1';
import MultiSelect from 'react-native-multiple-select';
const {width} = Dimensions.get('window');
const dataQA = [
  {
    id: '1',
    name: 'ข้อมูลส่วนตัว',
  },
  {
    id: '2',
    name: 'ความพึงพอใจการฝึกอบรบ/สัมมนา',
  },
  {
    id: '3',
    name: '3. การสำรวจความคิดเห็นของผู้เข้าร่วมฝึกอบรม/สัมมนา',
  },
  {
    id: '4',
    name: 'ข้อเสนอแนะ',
  },
];
const businessType = [
  {
    id: '1',
    name: 'ผู้ผลิต',
  },
  {
    id: '2',
    name: 'ผู้ส่งออก',
  },
  {
    id: '3',
    name: 'ผู้นำเข้า',
  },
  {
    id: '4',
    name: 'เทรดเดอร์',
  },
  {
    id: '5',
    name: 'อื่น',
  },
];
const dataAgerange = [
  {
    id: '1',
    name: 'ต่ำกว่า 15 ปี',
  },
  {
    id: '2',
    name: '16 - 25 ปี',
  },
  {
    id: '3',
    name: '26 - 35 ปี',
  },
  {
    id: '4',
    name: '36 - 45 ปี',
  },
  {
    id: '5',
    name: '46 - 55 ปี',
  },
  {
    id: '5',
    name: '55 ปีขึ้นไป',
  },
];
const dataKnowNews = [
  {
    id: '1',
    name: 'กรมส่งเสริมการค้าระหว่างประเทศ',
  },
  {
    id: '2',
    name: 'สถาบันพัฒนาผู้ประกอบการการค้ายุคใหม่ NEA',
  },
  {
    id: '3',
    name: 'โปรดเลือก',
    list: [
      {
        id: '1',
        name: 'Website',
      },
      {
        id: '2',
        name: 'Email',
      },
      {
        id: '2',
        name: 'Facebook',
      },
    ],
  },
  {
    id: '4',
    name: 'อื่น ๆ',
  },
];
const datasuport = [
  {
    id: '1',
    name: 'การสร้างเครือข่าย',
  },
  {
    id: '2',
    name: 'การจับคู่เจรจาธุรกิจการค้า',
  },
  {
    id: '3',
    name: 'การพัฒนาแบรนด์และบรรจุภัณฑ์',
  },
  {
    id: '4',
    name: 'ช่องทางการโฆษณา',
  },
  {
    id: '5',
    name: 'คำแนะนำ/ปรึกษาทูตพาณิชย์',
  },
  {
    id: '6',
    name: 'การร่วมงานจัดแสดงสินค้าในต่างประเทศ',
  },
  {
    id: '7',
    name: 'อื่น ๆ',
  },
];
const datadevlop = [
  {
    id: '1',
    name: 'บ่มเพาะความรู้ด้านการส่งออกและช่องทางตลาดโลก',
  },
  {
    id: '2',
    name: 'ส่งเสริมเศรษฐกิจดิจิทัลและพาณิชย์อิเลคทรอนิกส์',
  },
  {
    id: '3',
    name: 'ผลักดันการค้าชายแดนและกลุ่มประเทศ CLMV',
  },
  {
    id: '4',
    name: 'สร้างมูลค่าเพิ่มและเศรษฐกิจกระแสใหม่ ',
  },
];

class Questionnaireseminar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexslide: 0,
      Ckbusiness: [],
      checkBox: [],
      checkBoxsupport: [],
      idbusiness: [],
      idSupport: [],
      idAge: [],
      idDevlop: [],
      CheckBoxAll: [],
      CheckBoxAllsupport: [],
      selectedItems: [],
    };
    this.swiperRef = swiper => (this.swiper = swiper);
  }

  selectbusiness = ({item, index}) => {
    let {checkBox, idbusiness, DataType, CheckBoxAll} = this.state;
    checkBox[index] = !checkBox[index];
    this.setState({checkBox: checkBox});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBox[index] === true) {
      idbusiness.push({
        id_delete: item.id.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idbusiness.pop(item.id);
    }
    console.log(this.state.idbusiness);
  };

  selectAge = ({item, index}) => {
    console.log('Index', index);
    
    this.setState({idAge: index});
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };
  selectsupport = ({item, index}) => {
    let {checkBoxsupport, idSupport, DataType, CheckBoxAll} = this.state;
    checkBoxsupport[index] = !checkBoxsupport[index];
    this.setState({checkBoxsupport: checkBoxsupport});
    // ถ้า ติกถูกก็ให้เพิ่มค่าลงไปใน idAct
    if (checkBoxsupport[index] === true) {
      idSupport.push({
        id_delete: item.id.toString(),
      });
    } else {
      // ถ้า ติกออกถูกก็ให้ออกจากค่า idAct
      this.setState({CheckBoxAll: false});
      idSupport.pop(item.id);
    }
    console.log(this.state.idSupport);
  };

  selectdevlop = ({item, index}) => {
    console.log('Index', index);
    this.setState({idDevlop: index});
  };

  ListBusiness = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.selectbusiness({item: item, index: index});
          }}
          //   style={{
          //     flex: 1,
          //     borderWidth: 1,
          //     borderColor: '#2d6dc4',
          //     marginHorizontal: 5,
          //     marginVertical: 3,
          //     height: 35,
          //     justifyContent: 'center',
          //     borderRadius: 4,

          //   }}
          style={
            this.state.checkBox[index] === true
              ? {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#2d6dc4',
                }
              : {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                }
          }>
          <Text
            style={
              this.state.checkBox[index] === true
                ? {textAlign: 'center', fontSize: 18, color: '#FFFFFF'}
                : {
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#2d6dc4',
                  }
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  ListAge = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.selectAge({item: item, index: index});
          }}
          style={
            this.state.idAge === index
              ? {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#2d6dc4',
                }
              : {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                }
          }>
          <Text
            style={
              this.state.idAge === index
                ? {textAlign: 'center', fontSize: 18, color: '#FFF'}
                : {
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#2d6dc4',
                  }
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  ListNews = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        {index != 2 ? (
          <TouchableOpacity
            onPress={() => {
              // this.selectAge({item: item, index: index});
            }}
            style={
              this.state.idAge === index
                ? {
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#2d6dc4',
                    marginHorizontal: 5,
                    marginVertical: 3,
                    height: 35,
                    justifyContent: 'center',
                    borderRadius: 4,
                    backgroundColor: '#2d6dc4',
                  }
                : {
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#2d6dc4',
                    marginHorizontal: 5,
                    marginVertical: 3,
                    height: 35,
                    justifyContent: 'center',
                    borderRadius: 4,
                  }
            }>
            <Text
              style={
                this.state.idAge === index
                  ? {textAlign: 'center', fontSize: 18, color: '#FFF'}
                  : {
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#2d6dc4',
                    }
              }>
              {item.name}
            </Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                // this.selectAge({item: item, index: index});
              }}
              style={
                this.state.idAge === index
                  ? {
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#2d6dc4',
                      marginHorizontal: 5,
                      marginVertical: 3,
                      height: 35,
                      justifyContent: 'center',
                      borderRadius: 4,
                      backgroundColor: '#2d6dc4',
                    }
                  : {
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#2d6dc4',
                      marginHorizontal: 5,
                      marginVertical: 3,
                      height: 35,
                      justifyContent: 'center',
                      borderRadius: 4,
                    }
              }>
              <Text
                style={
                  this.state.idAge === index
                    ? {textAlign: 'center', fontSize: 18, color: '#FFF'}
                    : {
                        textAlign: 'center',
                        fontSize: 18,
                        color: '#2d6dc4',
                      }
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  Listsupport = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.selectsupport({item: item, index: index});
          }}
          style={
            this.state.checkBoxsupport[index] === true
              ? {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#2d6dc4',
                }
              : {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                }
          }>
          <Text
            style={
              this.state.checkBoxsupport[index] === true
                ? {textAlign: 'center', fontSize: 18, color: '#FFF'}
                : {
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#2d6dc4',
                  }
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  ListDevlop = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.selectdevlop({item: item, index: index});
          }}
          style={
            this.state.idDevlop === index
              ? {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#2d6dc4',
                }
              : {
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#2d6dc4',
                  marginHorizontal: 5,
                  marginVertical: 3,
                  height: 35,
                  justifyContent: 'center',
                  borderRadius: 4,
                }
          }>
          <Text
            style={
              this.state.idDevlop === index
                ? {textAlign: 'center', fontSize: 18, color: '#FFF'}
                : {
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#2d6dc4',
                  }
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {selectedItems} = this.state;
    return (
      <View style={{flex: 1}}>
        <Headers
          badgeNumber="2"
          navigation={this.props.navigation}
          backScreen={false}
        />
        <View style={{marginTop: Platform.OS === 'android' && 90}} />
        <Headerstage nameTab={I18n.t('transalte_evaluation')} />

        <ScrollView>
          <View style={styles.container}>
            <SwiperFlatList
              renderAll={true}
              disableGesture={true}
              ref={this.swiperRef}
              index={this.state.indexslide}>
              {/* //////////////////////////////////////ประเมินข้อมูลส่วนตัว//////////////////////////////////////////////
//////////////////////////////////////ประเมินข้อมูลส่วนตัว//////////////////////////////////////////////
//////////////////////////////////////ประเมินข้อมูลส่วนตัว////////////////////////////////////////////// */}
              <View style={[styles.child]}>
                <Text
                  style={[
                    styles.text,
                    {fontSize: 22, color: '#163c70', paddingBottom: 5},
                  ]}>
                  1.ข้อมูลส่วนตัว
                </Text>
                <Point1 />
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 10,
                    paddingBottom: 15,
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#163c70',
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      1.1 ประเภทธุรกิจของท่าน (เลือกได้มากกว่า 1 ข้อ){' '}
                    </Text>
                    <View style={{}}>
                      <FlatList
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        data={businessType}
                        renderItem={this.ListBusiness}
                      />
                      <ImageBackground
                        source={require('../../image/inputedittext.png')}
                        resizeMode={'stretch'}
                        imageStyle={{height: 28, width: '100%'}}
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: 5,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 24,
                            color: '#c0c0c0',

                            marginHorizontal: 10,

                            flex: 1,
                          }}>
                          {'โปรดระบุ'}
                        </TextInput>
                      </ImageBackground>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 10,
                    paddingBottom: 15,
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#163c70',
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      1.2 ช่วงอายุของผู้เข้าร่วมฝึกอบรมและสัมมนา
                    </Text>
                    <View style={{}}>
                      <FlatList
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        data={dataAgerange}
                        renderItem={this.ListAge}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 10,
                    paddingBottom: 15,
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#163c70',
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      {
                        ' 1.3 ท่านทราบข่าวการฝึกอบรม/สัมมนาจากแหล่งใด \n  (เลือกได้มากกว่า 1 ข้อ)'
                      }
                    </Text>
                    <View style={{}}>
                      <FlatList
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        data={dataKnowNews}
                        renderItem={this.ListNews}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 10,
                    paddingBottom: 15,
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#163c70',
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      {
                        ' 1.4 การสนับสนุนจากกรมส่งเสริมการค้าระหว่างประเทศ\n  ที่ต้องการมากที่สุด (เลือกเพียง 1 ข้อ)'
                      }
                    </Text>
                    <View style={{}}>
                      <FlatList
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        data={datasuport}
                        renderItem={this.Listsupport}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 10,
                    paddingBottom: 15,
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#163c70',
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      {
                        '1.5 แกนหลักสูตรฝึกอบรม/สัมมนาใดของสถาบัน NEA ที่ท่านสนใจมากที่สุด'
                      }
                    </Text>
                    <View style={{}}>
                      <FlatList
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        data={datadevlop}
                        renderItem={this.ListDevlop}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* //////////////////////////////////////2. ความพึงพอใจกับการฝึกอบรม/สัมมนา//////////////////////////////////////////////
//////////////////////////////////////2. ความพึงพอใจกับการฝึกอบรม/สัมมนา//////////////////////////////////////////////
//////////////////////////////////////2. ความพึงพอใจกับการฝึกอบรม/สัมมนา////////////////////////////////////////////// */}

              <View style={[styles.child, {backgroundColor: 'thistle'}]}>
                <Text style={styles.text}>2</Text>
              </View>
              <View style={[styles.child, {backgroundColor: 'skyblue'}]}>
                <Text style={styles.text}>3</Text>
              </View>
              <View style={[styles.child, {backgroundColor: 'teal'}]}>
                <Text style={styles.text}>4</Text>
              </View>
            </SwiperFlatList>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            alignSelf: 'center',
           marginHorizontal:15
          }}>
          {/* <TouchableOpacity style={{borderWidth: 1, }}>
            <Text>กลับ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1}}>
            <Text>ถัดไป</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  // loginUsers: state.authReducer.loginUser,
  // skipLogins: state.authReducer.skipLoginUser,
  // GetTermsss: state.dataReducer.getTermss,
  // SAVE: state.authReducer.saveData,
  // GetPrivacy: state.dataReducer.getPrivacy,
  CheckTerm: state.authReducer.CheckTerm,
  getUser: state.userReducer.getUser,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaireseminar);

const styles = StyleSheet.create({
  container: {flex: 1},
  child: {width, justifyContent: 'center'},
  text: {textAlign: 'center'},
});
