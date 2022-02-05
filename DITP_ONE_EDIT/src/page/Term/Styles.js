import {StyleSheet} from 'react-native';
import { ViewScale } from '../../config/ViewScale';
export default StyleSheet.create({
  background: {
    height: '100%',
  },
  containerHearder: {
    backgroundColor: 'transparent',
    paddingTop: ViewScale(0),
    height: ViewScale(40),
    borderBottomColor: 'transparent',
  },
  textHearder: {
    fontSize: ViewScale(30),
    //fontWeight: 'bold',
    color: '#FFFFFF',
  },
  termView: {
    backgroundColor: '#fff',
    borderRadius: ViewScale(10),
    opacity: 0.8,
    paddingLeft: ViewScale(10),
    paddingVertical: ViewScale(10),
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
    marginVertical: ViewScale(20),
    marginHorizontal: ViewScale(10),
  },
  checkView: {
    marginLeft: ViewScale(20),
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
    fontSize: ViewScale(20),
    marginTop: ViewScale(3),
    //fontWeight: 'bold',
  },
  ViewAccept: {
    alignSelf: 'center',
    flex: 0.2,
    marginBottom: ViewScale(20),
  },
  BTNview: {
    width: '80%',
    height: ViewScale(48),
    backgroundColor: '#f96145',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: ViewScale(10),
    paddingHorizontal: ViewScale(10),
  },
  TextView: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: ViewScale(25),
    color: '#FFFFFF',
  },
  opacityBTN: {
    opacity: 0.5,
  },
});
