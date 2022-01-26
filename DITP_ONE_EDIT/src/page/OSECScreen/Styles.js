import {StyleSheet, Dimensions, Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  View1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  View2: {
    flex: 0.9,
  },
  View3: {
    // width: '100%',
    // flex:1,
   
    marginHorizontal:10,
    // height:'100%',
    backgroundColor:'#FFFFFF',
    borderRadius:8
  },
  View4: {
    width: '50%',
    alignItems: 'center',
  },
  TextView1: {
    fontSize: 30,
    color: '#40536d',
  },
  View5: {
    alignItems: 'center',
    marginTop: 10,
  },
  ViewH: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  TextView2: {
    fontSize: 23,
    color: '#163c70',
  },
  View6: {
    width: '40%',
    alignItems: 'center',
    marginTop: 10,
  },
  TextView3: {
    fontSize: 23,
    color: '#163c70',
  },
  ViewalignItem: {
    alignItems: 'center',
  },
  View7: {
    width: '90%',
    height: 40,
    borderRadius: 18,
    borderColor: '#d6d6d6',
    borderWidth: 1,
    // justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  ViewRN: {
    fontSize: 20,
    color: '#4b4b4b',
    marginLeft: 10,
    width: '80%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
  },
  TextRN: {
    fontSize: 23,
    color: '#4b4b4b',
    marginLeft: 10,
    width: '80%',
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'PSL Kittithada Pro',
  },

  View9: {
    width: '100%',
    height: Platform.OS ==='ios'?33:44,
    
    borderRadius: 18,
    borderColor: '#d6d6d6',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
