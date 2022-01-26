
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @notifee/react-native
import io.invertase.notifee.NotifeePackage;
// @react-native-community/art
import com.reactnativecommunity.art.ARTPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/progress-bar-android
import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;
// @react-native-community/progress-view
import com.reactnativecommunity.progressview.RNCProgressViewPackage;
// @react-native-community/toolbar-android
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
// @react-native-firebase/analytics
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/database
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
// @react-native-firebase/in-app-messaging
import io.invertase.firebase.fiam.ReactNativeFirebaseFiamPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// react-native-android-badge
import me.jhen.react.BadgePackage;
// react-native-app-badge
import com.github.amarcruz.rnshortcutbadge.RNAppBadgePackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-document-picker
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
// react-native-encrypted-storage
import com.emeraldsanto.encryptedstorage.RNEncryptedStoragePackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fingerprint-scanner
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-i18n
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-inappbrowser-reborn
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-localize
import com.reactcommunity.rnlocalize.RNLocalizePackage;
// react-native-month-year-picker
import com.gusparis.monthpicker.RNMonthPickerPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-pdf
import org.wonday.pdf.RCTPdfView;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new NotifeePackage(),
      new ARTPackage(),
      new AsyncStoragePackage(),
      new RNDateTimePickerPackage(),
      new RNCMaskedViewPackage(),
      new NetInfoPackage(),
      new RNCProgressBarPackage(),
      new RNCProgressViewPackage(),
      new ReactToolbarPackage(),
      new ReactNativeFirebaseAnalyticsPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseDatabasePackage(),
      new ReactNativeFirebaseFiamPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new BadgePackage(),
      new RNAppBadgePackage(),
      new RNCameraPackage(),
      new DocumentPickerPackage(),
      new RNEncryptedStoragePackage(),
      new FastImageViewPackage(),
      new ReactNativeFingerprintScannerPackage(),
      new RNGestureHandlerPackage(),
      new RNI18nPackage(),
      new ImagePickerPackage(),
      new RNInAppBrowserPackage(),
      new LinearGradientPackage(),
      new RNLocalizePackage(),
      new RNMonthPickerPackage(),
      new PagerViewPackage(),
      new RCTPdfView(),
      new RNPermissionsPackage(),
      new ReactNativePushNotificationPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
