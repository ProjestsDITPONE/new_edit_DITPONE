import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  ViewSub1: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  TextSub1: {
    fontSize: 30,
    color: '#2d6dc4',
    // fontWeight: 'bold',
  },
  ViewSub2: {
    
    width: width * 1,
    alignItems: 'center',
    marginTop: 20,
    height: '100%',
    alignSelf: 'center',
  },

  ViewSub3: {
    width: '99%',
    height: 50,
    backgroundColor: '#2d6dc4',
    justifyContent: 'center',
  },

  TextSub2: {
    fontSize: 22,
    color: '#ffffff',
  },

  ViewSub4: {
    width: (width * 95) / 100,
    height: null,
    backgroundColor: '#ffffff',
  },

  ViewSub5: {
    margin: 20,
  },

  ViewSub6: {
    width: '100%',
    height: 33,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#dadada',

    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgSub1: {
    width: 14,
    height: 14,
    left: 10,
  },

  TextInputSub1: {
    fontSize: 20,
    left: 20,
    padding: 0,
    color: '#000000',
    width:"80%",
  
  },
  marginTop10: {
    marginTop: 10,
  },
  ImgSub2: {
    width: 42,
    height: 10,
  
  },
  marginTop20: {
    marginTop: 30,
  },
  TocuhSub1: {
    width: width * 0.9,
    height: 38,
    backgroundColor: '#2d6dc4',
    borderRadius: 21.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextSub3: {
    fontSize: 24,
    color: '#ffffff',
  },

  ViewSub7: {
    marginTop: 15,
    marginBottom: 30,
  },

  TocuhSub2: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextSub4: {
    fontSize: 25,
    color: '#4b4b4b',
    textDecorationLine: 'underline',
  },

  ViewSub8: {
    width: (width * 95) / 100,
    // height: null,
    backgroundColor: '#ffffff',
    flex:1,
   
  },

  ViewSub9: {
    alignItems: 'center',
    marginTop: 20,
    height: '100%',
    alignSelf: 'center',
  },
});
