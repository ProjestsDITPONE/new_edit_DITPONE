import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './Styles';
import {Overlay, ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


class UsercustomView extends React.Component {
  // export default class UsercustomView extends React.Component {



  renderHtml() {
    return (
      <TouchableOpacity
        style={[styles2.container, this.props.containerStyle]}
        onPress={() => {
          Actions.chat_html({properties: this.props.currentMessage});
        }}>
        <Image
          {...this.props.imageProps}
          style={[styles2.image, this.props.imageStyle]}
          source={{uri: this.props.currentMessage.template_image}}
        />
      </TouchableOpacity>
    );
  }

  renderBot = props => {
    return (
      <View style={styles.viewMainBotChat}>
        {this.props.currentMessage.image === '' &&
        this.props.currentMessage.imageList != undefined &&
        this.props.currentMessage.imageList.buttons === undefined  && 
        this.props.currentMessage.imageList.dataquick_replies === undefined ? (
          <ScrollView 
          horizontal={true}
          >
            {this.props.currentMessage.imageList.map((item, index) => {
              return (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 260,
                    height: null,
             
                    borderRadius: 8,

                    flex: 1,
                    marginHorizontal: 4,
                    marginTop: 5,
                    marginBottom: 10,
                  }}>
                  <View>
                    <Image
                      resizeMode={'contain'}
                      style={{
                        width: 260,
                        height: 160,
                        borderRadius: 13,
                        marginHorizontal: 0,
                      }}
                      source={{uri: item.image_url}}
                    />
                    <Text
                      style={{
                        fontSize: 19,
                    
                        textAlign: 'center',
                        fontFamily: 'PSL Kittithada Pro',
                       
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontFamily: 'PSL Kittithada Pro',
                      
                        fontSize: 19,
                    
                        textAlign: 'center',
                        marginHorizontal: 20,
                        color: '#4d4d4d',
                      }}>
                      {item.subtitle}
                    </Text>
                    <View>
                      {item.buttons.map(data => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.onSend(
                                '',
                                data.payload,
                                data.title,
                                'user',
                                this.props.currentMessage.iduser,
                                data.type,
                                data.url
                              );
                            }}
                            style={{
                              borderWidth: 1,
                              marginHorizontal: 45,
                              borderRadius: 10,
                              marginBottom: 15,
                              marginTop: 5,
                              height: 30,
                              justifyContent: 'center',
                              borderColor: '#e7e7e7',
                              backgroundColor: '#e7e7e7',
                            }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 19,
                            
                                textAlign: 'center',
                                marginHorizontal: 20,
                                color: '#4d4d4d',
                              }}>
                              {data.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <Text
              style={{
                borderRadius: 10,
                marginBottom: 10,
                marginTop: 5,
                height: null,
                justifyContent: 'center',
                fontFamily: 'PSL Kittithada Pro',
              

                fontSize: 19,
            
                textAlign: 'left',
                marginHorizontal: 15,
                color: '#4d4d4d',
              }}>
              {this.props.currentMessage.imageList.text} 
            </Text>
            <View>
              {this.props.currentMessage.imageList.buttons.map(data =>{
                return(
                  <TouchableOpacity
                  onPress={() => {
                    this.props.onSend(
                      '',
                      data.payload,
                      data.title,
                      'user',
                      this.props.currentMessage.iduser,
                      data.type,
                      data.url

                    );
                  }}
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 45,
                    borderRadius: 10,
                    marginBottom: 10,
                    marginTop: 1,
                    height: 30,
                    justifyContent: 'center',
                    borderColor: '#FFF',
                    backgroundColor: '#FFF',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 19,
                  
                      textAlign: 'center',
                      marginHorizontal: 20,
                      color: '#4d4d4d',
                      fontFamily: 'PSL Kittithada Pro',
                    
                    }}>
                  {data.title}
                  </Text>
                </TouchableOpacity>

                )
              })}
           
            </View>
            {this.props.currentMessage.dataquick_replies !== undefined ?(
            <View style={{marginHorizontal: 30}} >
              {this.props.currentMessage.dataquick_replies.map(data =>{
                return(
                  <View style={{}}>

                 
                  <TouchableOpacity
                  onPress={() => {
                    this.props.onSend(
                      '',
                      data.payload,
                      data.title,
                      'user',
                      this.props.currentMessage.iduser,
                      data.type,
                    );
                  }}
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 15,
                    borderRadius: 10,
                    marginBottom: 5,
                    marginTop: 5,
                    height: 30,
                    justifyContent: 'center',
                    borderColor: '#1A4797',
                    backgroundColor: '#FFF',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 19,
                  
                      textAlign: 'center',
                      marginHorizontal: 20,
                      color: '#1A4797',
                      fontFamily: 'PSL Kittithada Pro',
                     
                    }}>
                  {data.title}
                  </Text>
                </TouchableOpacity>
                </View>

                )
              })}
           
            </View>
            ):(
              <View/>
            )}
          </View>
        )}
      </View>
    );
  };
  rendeonlyText = props => {
    return (
      <View style={{flexDirection: 'row',
      flexWrap: 'wrap',}}>
        <Text
          style={{
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 5,
            height: null,
            justifyContent: 'center',
            fontFamily: 'PSL Kittithada Pro',
            fontWeight: 'normal',
            fontSize: 19,
           
            textAlign: 'left',
            marginHorizontal: 15,
            color: '#4d4d4d',
          }}>
          {this.props.currentMessage.text1} 
        </Text>
       
      </View>
    );
  };
  renderBotDetail = props => {
    return (
      <View style={{flexDirection: 'row',
      flexWrap: 'wrap',}}>
        <Text
          style={{
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 5,
            height: null,
            justifyContent: 'center',
            fontFamily: 'PSL Kittithada Pro',
            fontWeight: 'normal',
          
            
            fontSize: 19,
         
            textAlign: 'right',
            marginHorizontal: 15,
            color: '#4d4d4d',
          }}>
          {this.props.currentMessage.title_name}  
        </Text>
      </View>
    );
  };

  

  textuser = props => {
    return (
      <View style={{flexDirection: 'row',
      flexWrap: 'wrap',}}>
        <Text
          style={{
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 5,
            height: null,
            justifyContent: 'center',
            fontFamily: 'PSL Kittithada Pro',
            fontWeight: 'normal',
           
            
            fontSize: 19,
         
            textAlign: 'right',
            marginHorizontal: 15,
            color: 'red',
          }}>
          {this.props.currentMessage.text1}  
        </Text>
      </View>
    );
  };

  



  renderDataquickreplies = props => {
    return (
      <View style={styles.viewMainBotChat}>
        {this.props.currentMessage.text1 !== '' ? (
          <Text
            style={{
              borderRadius: 10,
              marginBottom: 10,
              marginTop: 5,
              height: null,
              justifyContent: 'center',
              fontFamily: 'PSL Kittithada Pro',
              fontWeight: 'normal',
             

              fontSize: 19,
          
              textAlign: 'left',
              marginHorizontal: 15,
              color: '#4d4d4d',
            }}>
            {this.props.currentMessage.showtextdataquick_replies}
          </Text>
        ) : (
          <Text
           
          />
        )}
         <View> 
          { this.props.currentMessage.imageList === undefined &&  
          this.props.currentMessage.dataquick_replies != undefined ?
          (
          <View> 
        {this.props.currentMessage.dataquick_replies.map(data =>{
                return(
                  <View style={{}}>

                 
                  <TouchableOpacity
                  onPress={() => {
                    this.props.onSend(
                      '',
                      data.payload,
                      data.title,
                      'user',
                      this.props.currentMessage.iduser,
                     
                    );
                  }}
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 15,
                    borderRadius: 10,
                    marginBottom: 5,
                    marginTop: 5,
                    height: 30,
                    justifyContent: 'center',
                    borderColor: '#1A4797',
                    backgroundColor: '#FFF',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 19,
                  
                      textAlign: 'center',
                      marginHorizontal: 20,
                      color: '#1A4797',
                      fontFamily: 'PSL Kittithada Pro',
                      fontWeight: 'normal',
                    }}>
                  {data.title}
                  </Text>
                </TouchableOpacity>
                </View>

                )
              })}
              </View>
              ):(
                <View>

                </View>

              )}
              </View>
      </View>
    );
  };

  render() {
    console.log('argumentforoptions ');
    console.log(this.props.currentMessage);
    console.log('user_id ');
    console.log(this.props.currentMessage.user);
    if (
      this.props.currentMessage.file_type === 'pdf' ||
      this.props.currentMessage.file_type === 'zip' ||
      this.props.currentMessage.file_type === 'doc' ||
      this.props.currentMessage.file_type === 'docx'
    ) {
      return this.renderPdf();
    } else if (
      this.props.currentMessage.template &&
      this.props.currentMessage.template !== 'none'
    ) {
      return this.renderHtml;
      // return null; rendeonlyText
    } 
     
    else if (
      
     
      this.props.currentMessage._id === ''
  
      

    ) {
      return this.rendeonlyText();
      // return this.renderBotDetail();
    }else{
        return  null;
    }
    
    
    

    
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = state => ({
  // getStatus: state.dataReducer.getStatus,
  // getImg: state.authReducer.getImg,
  getUser: state.userReducer.getUser,
  // CountNotification: state.authReducer.getCountNotification,
  // authData: state.authReducer.authData,
  // getNotification: state.authReducer.getNotification,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsercustomView);
const styles2 = StyleSheet.create({
  container: {},
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  webview: {
    flex: 1,
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

UsercustomView.defaultProps = {
  mapViewStyle: {},
  currentMessage: {
    image: null,
    file_type: null,
    template: null,
    template_html: null,
    imageList: undefined,
    text: '',
    _id: '',
  },
  containerStyle: {},
  imageStyle: {},
};

UsercustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  mapViewStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
};
