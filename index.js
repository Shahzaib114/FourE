/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import ClientLayer from './components/Layers/ClientLayer';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('called in setBackgroundMessageHandler index')
  console.log('Message handled in the background!', remoteMessage.data.type)
  if (remoteMessage.data.type == 'newRide') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
    console.log('saved')
  } else if (remoteMessage.data.type == 'rideCompleted') {
    ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(null))

    // ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(true))
    console.log('completed saved')
    PushNotification.cancelAllLocalNotifications()
  } else if (remoteMessage.data.type == 'rideStarted') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(true))
  } else if (remoteMessage.data.type == 'rideComing') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(true))
  } else if (remoteMessage.data.type === 'rideCanceled') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
    ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
    console.log('Canceled')
  } else {
    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
    console.log('null')
  }
})

messaging().getInitialNotification().then(remoteMessage => {
  if (remoteMessage) {
    console.log('Notification caused app to open from quit state inside index.js:', remoteMessage.notification)
    if (remoteMessage.data.type == 'newRide') {
      PushNotification.cancelAllLocalNotifications()
      ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
      console.log('saved')
    } else if (remoteMessage.data.type == 'rideCompleted') {
      // ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(true))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(null))

      console.log('completed saved')
      PushNotification.cancelAllLocalNotifications()
    } else if (remoteMessage.data.type == 'rideStarted') {
      PushNotification.cancelAllLocalNotifications()
      ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(true))
    } else if (remoteMessage.data.type == 'rideComing') {
      PushNotification.cancelAllLocalNotifications()
      ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(true))
    } else if (remoteMessage.data.type == 'rideCanceled') {
      PushNotification.cancelAllLocalNotifications()
      console.log('Canceled')
      ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
      ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
    } else {
      ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
      ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
      console.log('null')
    }
    console.log(remoteMessage.data.type); // e.g. "Settings"
  }
})

const bgMessaging = async (messages) => {
  console.log("BgMessaging", messages);
  return Promise.resolve();
};

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

AppRegistry.registerComponent(appName, () => App);
