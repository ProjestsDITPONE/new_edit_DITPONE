import React, { useEffect } from 'react';
import {
  StyleSheet,
  YellowBox,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,

} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './src/#Main';
import persist from './src/config/store';
import SplashScreen from 'react-native-splash-screen';
import GlobalFont from 'react-native-global-font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from './src/page/Login/Styles';
Icon.loadFont();

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1;

TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const App = navigation => {
  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);
  console.disableYellowBox = true;
  YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
  YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
  YellowBox.ignoreWarnings(['componentWillMount']);
  YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);


  let fontName = 'PSL Kittithada Pro';
  GlobalFont.applyGlobal(fontName);
  const persistStore = persist();

  const ErrorCard = () => {
    return (
      <ImageBackground
        source={require('./src/image/Backgrounglogin.png')}
        style={Styles.ImgBackground}>
        <View style={Styles.flex1}>
          <View style={Styles.ViewSub1}>
            <Image
              style={{ opacity: 0.5, width: 110, height: 150 }}
              source={require('./src/image/DitpLogin.png')}
            />
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{ fontSize: 28, color: '#4b4b4b' }}>
                No Internet connection
              </Text>
              <Text style={{ fontSize: 23, color: '#999999' }}>
                Check your internet settings and try again.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };


  return (
    <Provider store={persistStore.store} style={styles.container}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'PSL Kittithada Pro',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ffff',
  },
});
