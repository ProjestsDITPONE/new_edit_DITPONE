import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  background: {
    height: '100%',
  },
  containerHearder: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    height: 40,
    borderBottomColor: 'transparent',
  },
  textHearder: {
    fontSize: 30,
    //fontWeight: 'bold',
    color: '#FFFFFF',
  },
  termView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    opacity: 0.8,
    paddingLeft: 10,
    paddingVertical: 10,
    // maxWidth: 381,
    width: '95%',
    //height: 490,
    alignSelf: 'center',
  },
  textterm: {
    // fontSize: 25,
    color: '#20416e',
    //fontWeight: 'bold',
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  checkView: {
    marginLeft: 20,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  checkView2: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  checkText: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 3,
    //fontWeight: 'bold',
  },
  ViewAccept: {
    alignSelf: 'center',
    flex: 0.2,
    marginBottom: 20,
  },
  BTNview: {
    width: '80%',
    height: 48,
    backgroundColor: '#f96145',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  TextView: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 25,
    color: '#FFFFFF',
  },
  opacityBTN: {
    opacity: 0.5,
  },
});
