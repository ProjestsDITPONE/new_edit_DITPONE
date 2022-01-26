import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Headers from '../../components/Headers';
import ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import SafeArea, {SafeAreaInsets} from 'react-native-safe-area';
import Styles from './Styles';
const Infopersonal = ({navigation}) => {
  const [img, setimg] = useState(null);
  const [Imgpro, setImgpro] = useState(null);
  const [imgRefs, setRefimg] = useState(null);
  const [Ref, imageRef] = useState(null);
  const [page, pageSet] = useState(1);
  const [heightSheet, setSheet] = useState(230);
  const [bottom, setBottom] = useState(0);
  const [url, setUrl] = useState('');
  console.log(img, 'ภาพ');
  const cameraLaunch = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
    };
    ImagePicker.launchCamera(options2, response => {
      setimg({
        uri: 'data:image/jpeg;base64,' + response.data,
      });
      setRefimg(response.data);
      Imgechck(response.data);
      setUrl(response.data);
      this.RBSheet.close();
    });
  };
  const Imgechck = value => {
    if (value == null) {
      setimg(undefined);
      if (url == null) {
        return null;
      } else {
        return {uri: url};
      }
    } else {
      return value;
      // return {uri: url};
    }
  };

  const imageGalleryLaunch = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'photo',
      path: 'photo',
      quality: 0.3,
    };
    ImagePicker.launchImageLibrary(options2, response => {
      const source = {uri: response.uri};
      //   setimg({uri: 'data:image/png;base64,' + response.data});
      //   setRefimg(response.data);
      //   Imgechck(response.data);
      //   setUrl(response.data);
      setimg(source);

      this.RBSheet.close();
    });
  };

  const Bar = () => {
    if (page === 1) {
      return (
        <View style={Styles.ViewSub2}>
          <TouchableOpacity>
            <View style={Styles.ViewSub3}>
              <Image
                style={Styles.ImgSub1}
                source={require('../../image/Viewprofile.png')}
              />
              <Text style={Styles.TextSub1}>{'   '}ดูรูปโปรไฟล์</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                cameraLaunch();
              }, 200)
            }>
            <View style={Styles.ViewSub4}>
              <Image
                style={Styles.ImgSub2}
                source={require('../../image/Camara.png')}
              />
              <Text style={Styles.TextSub1}>{'   '}ถ่ายรูป</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                imageGalleryLaunch();
              }, 200)
            }>
            <View style={Styles.ViewSub5}>
              <Image
                style={Styles.ImgSub3}
                source={require('../../image/ViewPhoto.png')}
              />
              <Text style={Styles.TextSub1}>{'   '}เลือกไฟล์รูปภาพ</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View style={Styles.ViewSub6}>
      <ScrollView>
        <Headers badgeNumber="2" navigation={navigation} backScreen={false} />
        <View style={Styles.ViewSub1}>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={heightSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: '#2d6dc490',
              },
              draggableIcon: {
                backgroundColor: '#f1f1f1',
                width: 66,
                height: 8,
              },
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            }}>
            {Bar()}
          </RBSheet>
          <ImageBackground
            style={Styles.ImageBackground}
            source={require('../../image/onelogo.png')}>
            <Avatar
              containerStyle={Styles.AvatarContainer}
              size={101}
              // overlayContainerStyle={{borderWidth: 2, borderColor: '#FFFFFF'}}
              rounded
              source={img}
            />
          </ImageBackground>
          <View style={Styles.flexDirection}>
            <Avatar
              containerStyle={Styles.AvatarContainer2}
              onPress={() => {
                pageSet(1);
                setTimeout(() => {
                  this.RBSheet.open();
                }, 200);
              }}
              size={34}
              rounded
              overlayContainerStyle={Styles.overlayContainer}
              icon={{
                name: 'photo-camera',
                type: 'material',
                color: '#2a9df0',
                size: 19,
              }}
            />
          </View>
        </View>
        <View style={Styles.ViewSub7}>
          <Text style={Styles.TextSub2}>ชาตรี สีเมือง</Text>
          <Text style={Styles.TextSub3}>สำนักงานส่งเสริมการค้าในประเทศ</Text>
        </View>
        <View style={Styles.ViewSub8}>
          <View style={Styles.ViewSub9}>
            <View style={Styles.margin15}>
              <Text style={Styles.TextSub4}>อีเมล (Username)</Text>
              <Text style={Styles.TextSub4}>myemail@gmail.com</Text>
              <View style={Styles.marginTop7}>
                <Image
                  style={Styles.ImgSub4}
                  source={require('../../image/lineInfo.png')}
                />
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub4}>คำนำหน้า</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub5}>{'   '}นาย</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub4}>ชื่อ</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub5}>{'   '}ชาตรี</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub4}>นามสกุล</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub5}>{'   '}สีเมือง</Text>
              </View>
              <View style={Styles.marginTop15}>
                <Text style={Styles.TextSub4}>เลขบัตรประชาชน</Text>
              </View>
              <View style={Styles.marginTop5}>
                <Text style={Styles.TextSub4}>1-1001-12345-10-1</Text>
              </View>
            </View>
            <View style={{marginTop: 1}}>
              <Image
                style={Styles.ImgSub5}
                source={require('../../image/lineInfo.png')}
              />
            </View>
            <View style={{margin: 15}}>
              <Text style={Styles.TextSub4}>หมายเลขโทรศัพท์</Text>
              <View style={Styles.ViewSub10}>
                <TouchableOpacity
                  onPress={() => console.log('เลือกธง')}
                  style={Styles.ViewSub10}>
                  <View style={{marginLeft: 10}}>
                    <Image
                      style={{width: 20, height: 13}}
                      source={require('../../image/thai.png')}
                    />
                  </View>
                  <View style={{marginLeft: 5}}>
                    <Image
                      style={{width: 7, height: 4}}
                      source={require('../../image/arrowdrop.png')}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={{fontSize: 18, color: '#73838f'}}>
                  {'   '}
                  081 234 5678
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Infopersonal;

//   const cameraLaunch = () => {
//     const options = {
//       title: 'Select video',
//       mediaType: 'photo',
//       path: 'photo',
//       quality: 0.3,
//     };
//     ImagePicker.showImagePicker(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const source = {uri: response.uri};

//         // You can also display the image using data:
//         // const source = {uri: 'data:image/jpeg;base64,' + response.data};

//         setImgpro(source);
//       }
//     });
//   };
