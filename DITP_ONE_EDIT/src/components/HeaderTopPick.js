import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Header, Avatar, Badge } from 'react-native-elements';
export default class HeaderTopPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTab: '',
      nameTab2: '',
    };
  }

  format(item) {
    var name = item;
    return name.substring(0, 31);
  }

  render() {
    return (
      <View
        style={{
          
          marginBottom: 10,
          flexDirection: 'row-reverse',
          zIndex: -1,
         
        }}>
               <View style={{ flexDirection: 'row', }}>
         
          <View style={{ flexDirection: 'row', left: 0, zIndex: -1 , }}>
          
            <Image
              style={{
                width: 33,
                height: 33,
                backgroundColor: 'transparent',
                top: 10,
              }}
              source={require('../image/doolan1.png')}
            />
            <View style={{ top: 45, right: 30 }}>
              <Text style={{ fontSize: 12, color: '#135f9b' }}>น้องดูแล</Text>
            </View>
          </View>
          <Image
              style={{
                  right:22,
                width: 24,
                height: 32,
                top: 7,
                zIndex: 9999,
                
                    transform: [
                      { scaleX: -1 }
                    ]
                
              }}
              source={require('../image/tagname.png')}
            />
           <View
            style={{
                right:36,
              backgroundColor: '#f4f5f8',
              margin: 10,
              width: null,
              height: null,
              flexDirection: 'row',
              borderRadius: 8,
              shadowOffset: {
                height: 0,
                width: 1,
              },
              shadowRadius: 0,
              shadowOpacity: 0.15,
              shadowColor: '#FFFFFF',
              alignSelf: 'center',
              paddingHorizontal: 1,
              
            }}>
                <Text  style={{fontSize:24}}> {this.nameTab(this.state.nameTab)} </Text>
           
          </View>
        </View>
    
      </View>
    );
  }
  nameTab() {
    return (
      <Text
        numberOfLines={1}
        style={{
          fontSize: 14,
          color: '#20416e',
          fontFamily: 'Mitr-Regular',
        }}>
        {' '}
        {this.props.nameTab}{' '}
      </Text>
    );
  }
  nameTabAct() {
    return (
      <View
        style={{
          width: 103,
          height: 20,
          backgroundColor: '#2d6dc480',
          borderRadius: 11.5,
          alignItems: 'center',
          left: 5,
        }}>
        <Text style={{ fontSize: 14, color: '#FFFFFF' }}>
          {this.props.nameTab2}
        </Text>
      </View>
    );
  }
}
