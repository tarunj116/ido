import React from 'react';
import NavigationProvider from './app/navigation/NavigationContext';
import { View ,Platform,LogBox} from 'react-native';
import Routes from './app/navigation/Routes';
import ActivityIndicatorApp from './app/config/ActivityIndicatorApp'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
import Helper from './app/config/Helper';

export default class App extends React.Component {

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    // if (Platform.OS === 'android') {
    //   // this.getToken();
    // }
    // else {
    //   this.checkPermission()
    // }
  }

  async getToken() {
    let fcmToken = await Helper.getData('fcmToken');
    if (!fcmToken) {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        Helper.device_token = fcmToken
        await Helper.setData('fcmToken', fcmToken)
      }
    }
    else {
      Helper.device_token = fcmToken
    }
    console.log("Helper.device_token-------------------------------------------------", Helper.device_token)
   console.log("Firebase Token-------------------------------------------------", fcmToken)
    // this.checkVersionApi()
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    return (
      // <NavigationProvider />
      <View style={{ flex: 1 }}>
        <Routes />
        <ActivityIndicatorApp />
      </View>
    )
  }
};