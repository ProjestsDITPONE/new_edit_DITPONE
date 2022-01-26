import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  SectionList,
  Dimensions,
} from 'react-native';
import {Header, CheckBox, Overlay} from '../../lib_edit/react-native-elements';
import Style from './Style';
import Popup from '../../components/Popup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {getQuestion} from '../../actions/data.actions';
import {SendQuestion} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import I18n from '../../utils/I18n';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {SearchableSectionList} from '../../lib_edit/react-native-searchable-list';
import CheckboxTree from 'react-checkbox-tree';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const {height, width} = Dimensions.get('window');
const nodes = [
  {
    value: 'mars',
    label: 'Mars',
    children: [
      {value: 'phobos', label: 'Phobos'},
      {value: 'deimos', label: 'Deimos'},
    ],
  },
];
class QuestionnaireScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      expanded: [],
      Seachpage1: '',
      Seachpage2: '',
      Swich: 1,
      CheckBox1: [],
      CheckBox2: [],
      checkBox3: [],
      checkBox5: [],
      lineBox: false,
      checkAll: false,
      HearderQuestion: '',
      HearderQuestion2: '',
      HearderQuestion3: '',
      idHearderQuestion: [],
      DataQuestion: [],
      DataQuestion2: [],
      DataQuestion3: [],
      list: [],
      data: [],
      line1: [],
      line2: [],
      PopupAlert: false,
      indexslide: 0,
      searchTerm: '',
      searchAttribute: 'questionnaire_name',
      searchByTitle: false,
      ignoreCase: true,
      itemClose: false,
      togleUser: [],
      ckHHH: [true, true, true, true, true, true, true],
      cktest: [],
    };
    this.arrayholder = [];
    this.arrayholder2 = [];
    this.data = [];
    this.swiperRef = swiper => (this.swiper = swiper);
  }

  SelecitemHead = ({index, item}) => {
    let {togleUser} = this.state;

    togleUser[index] = !togleUser[index];
    this.setState({togleUser: togleUser});
  };

  SearchSubmit = e => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.questionnaire_name.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({DataQuestion: newData});
  };

  SearchSubmit2 = e => {
    const newData = this.arrayholder2.filter(item => {
      const itemData = `${item.questionnaire_name.toUpperCase()}`;
      const textData = e.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({DataQuestion3: newData});
  };

  _getQuestion = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;

      const response = await this.props.dispatch(getQuestion({token: payload}));
      console.log(response);
      if (response.res_code === '00') {
        response.results[0].questionnaire_data.map(data1 => {
          this.state.CheckBox1[data1.questionnaire_code] = data1.status;
          if (data1.status) {
            this.state.list.push({
              questionnaire_code: data1.questionnaire_code.toString(),
              questionnaire_type: data1.questionnaire_type.toString(),
            });
          }
        });
        response.results[1].questionnaire_data.map(data2 => {
          this.state.CheckBox2[data2.questionnaire_code] = data2.status;
          if (data2.status) {
            this.state.list.push({
              questionnaire_code: data2.questionnaire_code.toString(),
              questionnaire_type: data2.questionnaire_type.toString(),
            });
          }
        });

        response.results[2].questionnaire_data.map(data3 => {
          data3.continent_data.map(data4 => {
            this.state.checkBox3[data4.questionnaire_code] = data4.status;
            if (data4.status) {
              this.state.list.push({
                questionnaire_code: data4.questionnaire_code.toString(),
                questionnaire_type: data4.questionnaire_type.toString(),
              });
            } else {
              console.log('FFALSEWSSSS', data4.id_main);
              if (data4.id_main === 1) {
                this.state.ckHHH[1] = false;
              } else if (data4.id_main === 2) {
                this.state.ckHHH[2] = false;
              } else if (data4.id_main === 3) {
                this.state.ckHHH[3] = false;
              } else if (data4.id_main === 4) {
                this.state.ckHHH[4] = false;
              } else if (data4.id_main === 5) {
                this.state.ckHHH[5] = false;
              } else if (data4.id_main === 6) {
                this.state.ckHHH[6] = false;
              }
            }
          });
        });
        this.setState(
          {
            HearderQuestion: response.results[0],
            HearderQuestion2: response.results[1],
            HearderQuestion3: response.results[2],
            idHearderQuestion: response.results[0].questionnaire_id,
            DataQuestion: response.results[0].questionnaire_data,
            DataQuestion2: response.results[1].questionnaire_data,
            DataQuestion3: response.results[2].questionnaire_data,
          },

          function() {
            for (
              let index = 0;
              index < this.state.DataQuestion.length;
              index++
            ) {
              this.setState({data: index});
            }
            // console.log('PAGE', response.results[2]);
          },
        );

        this.arrayholder = this.state.DataQuestion;
        this.arrayholder2 = this.state.DataQuestion3;
      }
    } catch (error) {}
  };

  _SendQuestion = async value => {
    try {
      const {authData} = this.props;
      const payload = authData.token;
      const {list} = this.state;
      console.log('listAnuchit');
      console.log(list);
      const response = await this.props.dispatch(
        SendQuestion({
          results: {
            member_questionnaire:
              list.length > 0
                ? list
                : [{questionnaire_code: 'null', questionnaire_type: 'null'}],
          },
          token: payload,
        }),
      );

      if (response.res_code === '00') {
      }
    } catch (error) {}
  };

  Underline = ({item, index}) => {
    return (
      <View>
        <Image source={require('../../image/lineQuspng.png')} />
      </View>
    );
  };

  selecitem1 = ({item, index}) => {
    let {CheckBox1} = this.state;
    CheckBox1[index] = !CheckBox1[index];

    this.setState({CheckBox1: CheckBox1});
    if (CheckBox1[index]) {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
          {
            questionnaire_code: item.questionnaire_code.toString(),
            questionnaire_type: item.questionnaire_type.toString(),
          },
        ],
      });
    } else {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
        ],
      });
    }
  };

  selecitem2 = ({item, index}) => {
    let {CheckBox2} = this.state;
    CheckBox2[index] = !CheckBox2[index];

    this.setState({CheckBox2: CheckBox2});
    console.log('LLLLLL', CheckBox2[index]);
    if (CheckBox2[index]) {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
          {
            questionnaire_code: item.questionnaire_code.toString(),
            questionnaire_type: item.questionnaire_type.toString(),
          },
        ],
      });
    } else {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
        ],
      });
    }
  };

  selecitem3 = ({item, index, ckheader}) => {
    console.log('FUCKYYYYYY', this.state.ckHHH[ckheader]);

    if (ckheader === 6) {
      // this.state.cktest.push({
      // })
      // if(this.state.ckHHH[ckheader]=== false){
      //   this.state.ckHHH[ckheader] = true
      // }else{
      //   this.state.ckHHH[ckheader] = false
      // }
    }

    console.log(index);
    let {checkBox3} = this.state;
    checkBox3[index] = !checkBox3[index];
    this.setState({checkBox3: checkBox3});
    // console.log("checkBox3[index]")
    console.log(checkBox3[index]);
    if (checkBox3[index]) {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
          {
            questionnaire_code: item.questionnaire_code.toString(),
            questionnaire_type: item.questionnaire_type.toString(),
          },
        ],
      });
    } else {
      this.setState({
        list: [
          ...this.state.list.filter(
            item2 => item2.questionnaire_code != item.questionnaire_code,
          ),
        ],
      });
    }
  };

  selecitemH = ({item, index, data}) => {
    console.log('8;p', index);
    if (index === 1) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }
    if (index === 2) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }
    if (index === 3) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }
    if (index === 4) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }
    if (index === 5) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }
    if (index === 6) {
      if (this.state.ckHHH[index] === false) {
        this.state.ckHHH[index] = true;
      } else {
        this.state.ckHHH[index] = false;
      }
    }

    try {
      var his = this;
      let {checkBox5, checkBox3} = this.state;
      checkBox5[index] = !checkBox5[index];
      this.setState({checkBox5: checkBox5});
      console.log("CHHH",this.state.ckHHH[index])
      if (checkBox5[index]) {
        console.log("SHOW")
        data.map(function name(item3) {
          let {checkBox3} = his.state;

          checkBox3[item3.questionnaire_code] = !checkBox3[
            item3.questionnaire_code
          ];
          his.setState({checkBox3: checkBox3});
          his.state.list.push({
            questionnaire_code: item3.questionnaire_code.toString(),
            questionnaire_type: item3.questionnaire_type.toString(),
          });
        });
      } else {
        console.log("NO SHOW")
        data.map(function name(item3) {
          let {checkBox3} = his.state;

          checkBox3[item3.questionnaire_code] = !checkBox3[
            item3.questionnaire_code
          ];
          his.setState({checkBox3: checkBox3});
          his.state.list.pop({
            questionnaire_code: item3.questionnaire_code.toString(),
            questionnaire_type: item3.questionnaire_type.toString(),
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  ListPage = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          textStyle={{
            fontSize: 18,
            color: '#4b4b4b',
            fontWeight: 'normal',
            fontFamily: 'PSL Kittithada Pro',
          }}
          checkedIcon={
            <Image
              style={{width: 18, height: 18}}
              source={require('../../image/rrr.png')}
            />
          }
          uncheckedIcon={
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                width: 18,
                height: 18,
                borderColor: '#999999',
                borderRadius: 2.6,
              }}
            />
          }
          title={`${item.questionnaire_name}`}
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          checked={this.state.CheckBox1[item.questionnaire_code]}
          onPress={() => {
            this.selecitem1({item: item, index: item.questionnaire_code});
          }}
        />
      </View>
    );
  };
  _CutText = value => {
    console.log(value);
    var text = value.substring(0, 7);

    return text;
  };
  _CutText2 = value => {
    console.log(value);
    console.log(value);
    var text = value.substring(7, 60);

    return text;
  };

  ListPage2 = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.selecitem2({item: item, index: item.questionnaire_code});
        }}
        style={{
          borderWidth: 0.9,

          paddingVertical: (height * 7) / 100,

          flex: 1,
          marginHorizontal: 4,
          marginVertical: 4,
          borderRadius: 4,
          borderColor: '#2d6dc4',
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor:
            this.state.CheckBox2[item.questionnaire_code] === false
              ? '#FFFFFF'
              : '#2d6dc4',
        }}>
        <Text
          style={{
            color:
              this.state.CheckBox2[item.questionnaire_code] === false
                ? '#2d6dc4'
                : '#FFFFFF',
            fontSize: 40,
            textAlign: 'center',
          }}>
          {this._CutText(item.questionnaire_name)}
        </Text>
        <Text
          style={{
            color:
              this.state.CheckBox2[item.questionnaire_code] === false
                ? '#2d6dc4'
                : '#FFFFFF',
            fontSize: 18,
            textAlign: 'center',
          }}>
          {this._CutText2(item.questionnaire_name)}
        </Text>
      </TouchableOpacity>
    );
  };
  ListPage3 = ({item, index}) => {
    return (
      <View>
        {/* <CheckBox
          textStyle={{
            fontSize: 17.5,
            color: '#4b4b4b',
            fontWeight: 'normal',
            fontFamily: 'PSL Kittithada Pro',
          }}
          uncheckedIcon={
            <Image
              style={{width: 18, height: 18}}
              source={require('../../image/uncheckQues.png')}
            />
          }
          checkedIcon={
            <ImageBackground
              style={{width: 18, height: 18}}
              source={require('../../image/checkQues.png')}>
              <Image
                style={{width: 13, height: 9, top: 5, left: 2}}
                source={require('../../image/CheckQues1.png')}
              />
            </ImageBackground>
          }
          title={`${item.questionnaire_name}`}
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          checked={this.state.checkBox3[item.questionnaire_code]}
          onPress={() => {
            this.selecitem3({item: item, index: index});
          }}
        /> */}
      </View>
    );
  };
  componentDidMount() {
    this._getQuestion();
  }

  render() {
    const {
      DataQuestion3,
      searchTerm,
      searchAttribute,
      ignoreCase,
      searchByTitle,
    } = this.state;
    console.log(this.state.list);
    return (
      <View style={Style.ViewSub1}>
        <Header
          backgroundColor="#ffffff"
          leftComponent={
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon2 name="left" size={20} />
              </TouchableOpacity>
            </View>
          }
          centerComponent={
            <View>
              <Text style={Style.TextSub1}>{I18n.t('translate_survey')}</Text>
            </View>
          }
        />
        <View style={{alignItems: 'center', flex: 1}}>
          <SwiperFlatList
            renderAll={true}
            disableGesture={true}
            ref={this.swiperRef}
            index={this.state.indexslide}
           
            
            >
            {/* หัวข้อ */}
            <View style={Style.ViewSub2}>
              <LinearGradient
                   colors={['#5dbde6', '#1d61bd']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  Style.ViewSub3,
                  {height: 42, marginTop: -9, marginBottom: 10},
                ]}>
                {console.log(this.state.HearderQuestion.questionnaire_name)}
                <Text style={[Style.TextSub2, {padding: 0}]}>
                  {'  '}1) {this.state.HearderQuestion.questionnaire_name}
                </Text>
                {/* <Text style={Style.TextSub2}>
                  {'\t'}
                  {I18n.t('translate_QuesSelec')}
                </Text> */}
              </LinearGradient>

              <ScrollView style={{}}>
                <View style={Style.ViewSub4}>
                  <View style={Style.ViewSub5}>
                    <View style={Style.ViewSub6}>
                      <Image
                        style={[Style.ImgSub1]}
                        source={require('../../image/Seach.png')}
                      />
                      <TextInput
                        autoCorrect={false}
                        onChangeText={e => this.SearchSubmit(e)}
                        style={[Style.TextInputSub1]}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>

                    <FlatList
                      keyExtractor={(item, index) => index}
                      scrollEnabled={false}
                      data={this.state.DataQuestion}
                      renderItem={this.ListPage}
                    />
                  </View>
                </View>
              </ScrollView>
              
              <View style={[Style.marginTop20, {}]}>
                <View style={{alignItems: 'center'}}>
                  <View style={{margin: 20}}>
                    {/* <Image
                      style={Style.ImgSub2}
                      source={require('../../image/pageQuestion1.png')}
                    /> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.swiper.scrollToIndex({
                        index: 1,
                        animated: true,
                      });
                    }}
                    style={Style.TocuhSub1}>
                    <Text style={Style.TextSub3}>
                      {I18n.t('translate_Next')}
                    </Text>
                  </TouchableOpacity>
                  <View style={Style.ViewSub7}>
                    <TouchableOpacity
                      onPress={() => {
                        this.swiper.scrollToIndex({
                          index: 1,
                          animated: true,
                        });
                      }}
                      style={Style.TocuhSub2}>
                      <Text style={Style.TextSub4}>
                        {I18n.t('translate_Skip')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* <View style={Style.ViewSub2}>
              <LinearGradient
                colors={['#5dbde6', '#1d61bd']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  Style.ViewSub3,
                  {height: 42, marginTop: -9, marginBottom: 10},
                ]}>
                {console.log(this.state.HearderQuestion.questionnaire_name)}
                <Text style={[Style.TextSub2, {padding: 0}]}>
                  <Text style={Style.TextSub2}>
                    {'  '}2) {this.state.HearderQuestion2.questionnaire_name}
                  </Text>
                </Text>
             
              </LinearGradient>

              // หัวข้อที่ 2  
              <View style={[Style.ViewSub8]}>
                <ScrollView style={{flex: 1}}>
                  <FlatList
                    keyExtractor={(item, index) => index}
                    scrollEnabled={false}
                    data={this.state.DataQuestion2}
                    numColumns={2}
                    renderItem={this.ListPage2}
                  />
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'column-reverse',
                }}>
                <View style={Style.ViewSub7}>
                  <TouchableOpacity
                    onPress={() => {
                      this.swiper.scrollToIndex({
                        index: 2,
                        animated: true,
                      });
                    }}
                    style={Style.TocuhSub2}>
                    <Text style={Style.TextSub4}>
                      {I18n.t('translate_Skip')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.swiper.scrollToIndex({
                        index: 0,
                        animated: true,
                      });
                    }}
                    style={{
                      width: '46%',
                      height: 38,
                      borderWidth: 1,
                      borderColor: '#2d6dc4',
                      borderRadius: 21.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Text style={{fontSize: 25, color: '#2d6dc4'}}>
                      {I18n.t('translate_Back')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.swiper.scrollToIndex({
                        index: 2,
                        animated: true,
                      });
                    }}
                    style={{
                      width: '46%',
                      height: 38,
                      backgroundColor: '#2d6dc4',
                      borderRadius: 21.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={Style.TextSub3}>
                      {I18n.t('translate_Next')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginBottom: 25}}>
                  <Image
                    style={Style.ImgSub2}
                    source={require('../../image/pageQuestion2.png')}
                  />
                </View>
              </View>
            </View> */}
            <View style={[Style.ViewSub2]}>
              <LinearGradient
                   colors={['#5dbde6', '#1d61bd']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  Style.ViewSub3,
                  {height: 42, marginTop: -9, marginBottom: 10},
                ]}>
                <Text style={Style.TextSub2}>
                  {'  '}2) {this.state.HearderQuestion3.questionnaire_name}
                </Text>
                {/* <Text style={Style.TextSub2}>
                  {'\t'}
                  {I18n.t('translate_QuesSelec')}
                </Text> */}
              </LinearGradient>
              <ScrollView>
                <View style={Style.ViewSub4}>
                  <View style={Style.ViewSub5}>
                    <View style={Style.ViewSub6}>
                      <Image
                        style={Style.ImgSub1}
                        source={require('../../image/Seach.png')}
                      />
                      <TextInput
                        autoCorrect={true}
                        defaultValue={this.state.DataQuestion3}
                        onChangeText={searchTerm => {
                          this.setState({searchTerm});
                        }}
                        style={Style.TextInputSub1}
                        placeholder={I18n.t('translate_Seach')}
                      />
                    </View>

                    {/* ข้อ 3  */}
                    {/* <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            /> */}

                    <SearchableSectionList
                      sections={this.state.DataQuestion3}
                      searchTerm={searchTerm}
                      searchAttribute={searchAttribute}
                      ignoreCase={true}
                      searchByTitle={false}
                      keyExtractor={item => item.questionnaire_name}
                      renderSectionHeader={({
                        section: {continent_title, data},
                      }) => (
                        <View style={{width: '100%', marginTop: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                            }}>
                            <CheckBox
                              textStyle={{
                                fontSize: 17.5,
                                color: '#4b4b4b',
                                fontWeight: 'normal',
                                fontFamily: 'PSL Kittithada Pro',
                              }}
                              uncheckedIcon={
                                <View
                                  style={{
                                    backgroundColor: '#FFFFFF',
                                    borderWidth: 0.5,
                                    width: 18,
                                    height: 18,
                                    borderColor: '#999999',
                                    borderRadius: 2.6,
                                  }}
                                />
                              }
                              checkedIcon={
                                <Image
                                  style={{
                                    width: 18,
                                    height: 18,
                                  }}
                                  source={require('../../image/rrr.png')}
                                />
                              }
                              title={`${continent_title.name_en}`}
                              containerStyle={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                              }}
                              checked={
                                this.state.checkAll === true
                                  ? true
                                  : this.state.ckHHH[continent_title.id]
                              }
                              disabled={
                                this.state.checkAll === true ? true : false
                              }
                              onPress={() => {
                                this.selecitemH({
                                  item: continent_title,
                                  index: continent_title.id,
                                  data: data,
                                });
                              }}
                            />

                            <View
                              style={{
                                flexDirection: 'row-reverse',
                                flex: 1,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.SelecitemHead({
                                    item: continent_title,
                                    index: continent_title.id,
                                  });
                                }}
                                style={{padding: 10}}>
                                <Image
                                  style={{width: 8, height: 6}}
                                  source={require('../../image/downreqes.png')}
                                />
                              </TouchableOpacity>
                              {/* <View
                                style={{
                                  width: 22,
                                  height: 23.3,
                                  backgroundColor: '#3673c6',
                                  borderRadius: 22,
                                }}>
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 20,
                                    textAlign: 'center',
                                  }}>
                                  {this.state.list.length}
                                </Text>
                              </View> */}
                            </View>
                          </View>
                        </View>
                      )}
                      renderItem={({item, index}) => (
                        <View>
                          {this.state.togleUser[item.id_main] && (
                            <CheckBox
                              textStyle={{
                                fontSize: 17.5,
                                color: '#4b4b4b',
                                fontWeight: 'normal',
                                fontFamily: 'PSL Kittithada Pro',
                              }}
                              uncheckedIcon={
                                <View
                                  style={{
                                    backgroundColor: '#FFFFFF',
                                    borderWidth: 0.5,
                                    width: 18,
                                    height: 18,
                                    borderColor: '#999999',
                                    borderRadius: 2.6,
                                  }}
                                />
                              }
                              checkedIcon={
                                <Image
                                  style={{
                                    width: 18,
                                    height: 18,
                                  }}
                                  source={require('../../image/rrr.png')}
                                />
                              }
                              title={`${item.questionnaire_name}`}
                              containerStyle={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                left: 20,
                              }}
                              checked={
                                this.state.checkBox3[item.questionnaire_code]
                              }
                              onPress={() => {
                                this.selecitem3({
                                  item: item,
                                  index: item.questionnaire_code,
                                  ckheader: item.id_main,
                                });
                              }}
                            />
                          )}
                        </View>
                      )}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      {this.state.checkAll === false ? (
                        <CheckBox
                          textStyle={{
                            fontSize: 17.5,
                            color: '#4b4b4b',
                            fontWeight: 'normal',
                            fontFamily: 'PSL Kittithada Pro',
                          }}
                          uncheckedIcon={
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 0.5,
                                width: 18,
                                height: 18,
                                borderColor: '#999999',
                                borderRadius: 2.6,
                              }}
                            />
                          }
                          checkedIcon={
                            <Image
                              style={{
                                width: 18,
                                height: 18,
                              }}
                              source={require('../../image/rrr.png')}
                            />
                          }
                          title={'World'}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                          }}
                          checked={this.state.checkAll}
                          onPress={() => {
                            this.setState({checkAll: true});
                          }}
                        />
                      ) : (
                        <CheckBox
                          textStyle={{
                            fontSize: 17.5,
                            color: '#4b4b4b',
                            fontWeight: 'normal',
                            fontFamily: 'PSL Kittithada Pro',
                          }}
                          uncheckedIcon={
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 0.5,
                                width: 18,
                                height: 18,
                                borderColor: '#999999',
                                borderRadius: 2.6,
                              }}
                            />
                          }
                          checkedIcon={
                            <Image
                              style={{
                                width: 18,
                                height: 18,
                              }}
                              source={require('../../image/rrr.png')}
                            />
                          }
                          title={'World'}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                          }}
                          checked={this.state.checkAll}
                          onPress={() => {
                            this.setState({checkAll: false});
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={{alignItems: 'center'}}>
                <View style={{margin: 20}}>
                  {/* <Image
                    style={Style.ImgSub2}
                    source={require('../../image/pageQuestion3.png')}
                  /> */}
                </View>
                {this.state.PopupAlert === true && (
                  <Overlay
                    onBackdropPress={() => this.setState({PopupAlert: false})}
                    fullScreen={false}
                    isVisible={this.state.PopupAlert}
                    backdropStyle={{
                      backgroundColor:
                        Platform.OS === 'android' ? '#2d6dc420' : '#2d6dc480',
                      borderColor: 'transparent',
                    }}>
                    <Popup
                      text={'ยืนยันการส่งแบบสอบถาม'}
                      accept={() => {
                        setTimeout(() => {
                          this._SendQuestion();
                          this.props.navigation.navigate('Home');
                        }, 200);
                        this.setState({PopupAlert: false});
                      }}
                      cancle={() => this.setState({PopupAlert: false})}
                      Icon={
                        <Icon name="alert-circle" size={100} color="#e82d2d" />
                      }
                    />
                  </Overlay>
                )}
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.swiper.scrollToIndex({
                        index: 0,
                        animated: true,
                      });
                    }}
                    style={{
                      width: '46%',
                      height: 38,
                      borderWidth: 1,
                      borderColor: '#2d6dc4',
                      borderRadius: 21.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Text style={{fontSize: 25, color: '#2d6dc4'}}>
                      {I18n.t('translate_Back')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.list.length > 0) {
                        this.setState({PopupAlert: true});
                      } else {
                        setTimeout(() => {
                          this._SendQuestion();
                          this.props.navigation.navigate('Home');
                        }, 200);
                      }
                    }}
                    style={{
                      width: '46%',
                      height: 38,
                      backgroundColor: '#2d6dc4',
                      borderRadius: 21.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={Style.TextSub3}>
                      {I18n.t('translate_Next')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={Style.ViewSub7}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.list.length > 0) {
                        this.setState({PopupAlert: true});
                      } else {
                        setTimeout(() => {
                          this._SendQuestion();
                          this.props.navigation.navigate('Home');
                        }, 200);
                      }
                    }}
                    style={Style.TocuhSub2}>
                    <Text style={Style.TextSub4}>
                      {I18n.t('translate_Skip')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SwiperFlatList>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireScreen);
