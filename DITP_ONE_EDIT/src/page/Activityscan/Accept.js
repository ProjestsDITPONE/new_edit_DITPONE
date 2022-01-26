import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Styles from './Styles';

const Accept = () => {
  return (
    <SafeAreaView style={Styles.SafeAre2}>
      <View style={Styles.ViewSub10}>
        <Avatar
          size={99}
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
        <View style={Styles.ViewSub11}>
          <Text style={Styles.TextSub12}>นางสาว มั่งมี ศรีสวัสดิ์</Text>
          <Text style={Styles.TextSub13}>
            บริษัท ไอบิสซิเนส คอร์ปอเรชั่น จํากัด
          </Text>
          <View style={Styles.marginTop10}>
            <Text style={Styles.TextSub13}>
              เลขนิติบุคคล : 1-4256-34862-14-2
            </Text>
            <Text style={Styles.TextSub13}>
              เลขบัตรประชาชน : 1-1001-12345-10-1
            </Text>
          </View>
        </View>
        <View style={Styles.marginTop20}>
          <Text style={{fontSize: 20, color: '#b1b1b1'}}>
            ไม่มีการลงทะเบียน
          </Text>
          {/*ลงทะเบียนแล้ว */}
          {/* <Text style={Styles.TextSub13}>14/5/2563</Text>
          <View style={Styles.ViewSub12}>
            <Image
              style={Styles.ImgSub10}
              source={require('../../image/corect.png')}
            />
            <Text style={Styles.TextSub14}>ลงทะเบียนแล้ว</Text>
          </View> */}
        </View>
        <View style={[Styles.ViewSub13, {top: 25}]}>
          <TouchableOpacity style={Styles.TouchSub2}>
            <Text style={Styles.TextSub15}> ลงทะเบียน Walk in</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={Styles.ViewSub13}>
          <TouchableOpacity style={Styles.TouchSub2}>
            <Text style={Styles.textsSub15}> ยืนยันการเข้าร่วม</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Accept;
