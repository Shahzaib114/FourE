import * as React from 'react';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import ClientLayer from './components/Layers/ClientLayer';
import LogIn from './src/Login/index';
import SignupStart from './src/SignupStart';
import EmailSignup from './src/EmailSignup';
import VehicleInfo from './src/VehicleInformation';
import UploadFiles from './src/uploadFiles';
import ConfirmPass from './src/ConfirmPass';
import ForgetPass from './src/ForgotPassword';
import ResetPass from './src/ResetPass';
import TripDetails from './src/TripDetails';
import ProfileScreen from './src/userProfile';
import TransactionHistoryScreen from './src/TransactionHistory';
import TravelHistory from './src/TravelHistory';
import AccountCreated from './src/AccountCreated';
import CustomDrawer from './src/CustomeDrawer';
import Colors from './utility/colors/Colors';
import store from './store/store';
import { Provider } from 'react-redux';
import VerifyForgotOtp from './src/verifyForgotOtp';
import EmailSignupFirstPart from './src/EmailSignupFirstPart';
import Invoice from './src/Invoice';
import NotificationScreen from './src/NotificationScreens';
import UpComingTrips from './src/upcomingTrips';
import IncomingRides from './src/IncomingRide';
import JobAcceptance from './src/JobAcceptance';
import CustomeHeader from './src/customeHeader';
import CustomBackArrow from './src/CustomBackArrow';
import UserAppSplash from './src/UserApp/UserAppsplash';
import CustomerLogin from './src/UserApp/UserLogin';
import CustomerSignup from './src/UserApp/UserSignup';
import CustomerSignupOTP from './src/UserApp/ConfirmSignupOTP';
import CustomerAppDrawer from './src/UserApp/CustomerAppDrawer';
import CustomerHomePage from './src/UserApp/customerHome';
import CustomerForgotPass from './src/UserApp/CustomerForgotPass';
import CustomerVerifyForgotOTP from './src/UserApp/CustomerVerifyOTP';
import CustomerResetPass from './src/UserApp/CustomerResetPass';
import CustomerTravelHistory from './src/UserApp/CustomerTravelHistory';
import SignupOptions from './src/SignupOptions'
import CustomerNotificationScreen from './src/UserApp/CustomerNotifications';
import CustomerUpComingTrips from './src/UserApp/CustomerFeaturedRides';
import CustomerCouponScreen from './src/UserApp/CustomerCoupon';
import DriverTransactionDetails from './src/TransactionDetails';
import PickDropDetails from './src/UserApp/PickandDropDetails';
import CurrentRideDetails from './src/UserApp/RideDetails';
import BackgroundLocation from './src/BackgroundLocation';
import CustomerProfileScreen from './src/UserApp/customerProfile';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import CustomerHeader from './src/UserApp/CustomerHeader';
import Locations from './src/Locatins';
import CustomerTransactionHistory from './src/UserApp/CustomerTransactionHistory';
import CustomerTransactionDetails from './src/UserApp/CustomerTransactionDetails';
import PushNotification from 'react-native-push-notification';
import DriverWalletScreen from './src/Wallet';
import CustomerWalletScreen from './src/UserApp/CustomerWallet';
import NetInfo from "@react-native-community/netinfo";
import NetworkCheck from './src/NetworkError';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const InitializeComponents = () => {
  ClientLayer.createInstance();
  ClientLayer.getInstance().InitializeWithCallback(
    () => {
      console.log('Client Layer Initialize Success')
    },
    () => {
      console.log('Client Layer Initialize Failure')
    },
  )
}

function DrawerUsrerData() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
      headerShown: false,
    }}>
      <Drawer.Screen name="Your Trips" component={TravelHistory} options={{
        drawerIcon: ({ focused, size }) => (
          <Foundation
            name="target-two"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
          borderTopColor: Colors.getLightColor('lightGreyColor'),
        }
      }} />
      {/* <Drawer.Screen name="Wallet" component={DriverWalletScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="wallet"
              size={size}
              color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
            />
          ),
          drawerItemStyle: {
            borderBottomColor: Colors.getLightColor('lightGreyColor'),
          }
        }} /> */}
      {/* <Drawer.Screen name="Map" component={MapScreen} options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="notifications"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} /> */}
      {/* <Drawer.Screen name="Invoice" component={Invoice} options={{
        drawerIcon: ({ focused, size }) => (
          <MaterialCommunityIcons
            name="clipboard-list"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} /> */}
      {/* <Drawer.Screen name="Notifications" component={NotificationScreen} options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="notifications"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} /> */}
      {/* <Drawer.Screen name="UpComing Trips" component={UpComingTrips} options={{
        drawerIcon: ({ focused, size }) => (
          <MaterialCommunityIcons
            name="chevron-triple-right"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} /> */}
    </Drawer.Navigator>
  )
};

function DrawerCustomerData() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomerAppDrawer {...props} />} screenOptions={{
      headerShown: false,
    }} >
      <Drawer.Screen name="DashBoard" component={CustomerHomePage} options={{
        drawerIcon: ({ focused, size }) => (
          <AntDesign
            name="home"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
          borderTopColor: Colors.getLightColor('lightGreyColor'),
        }
      }} />
      {/* <Drawer.Screen name="Your Trips" component={CustomerTravelHistory}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Foundation
              name="target-two"
              size={size}
              color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
            />
          ),
          drawerItemStyle: {
            borderBottomColor: Colors.getLightColor('lightGreyColor'),
          }
        }} /> */}
      {/* <Drawer.Screen name="Wallet" component={CustomerWalletScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="wallet"
              size={size}
              color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
            />
          ),
          drawerItemStyle: {
            borderBottomColor: Colors.getLightColor('lightGreyColor'),
          }
        }} /> */}

      <Drawer.Screen name="Coupons" component={CustomerCouponScreen} options={{
        drawerIcon: ({ focused, size }) => (
          <AntDesign
            name="tag"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} />

      <Drawer.Screen name="Notifications" component={CustomerNotificationScreen} options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="notifications"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} />

      <Drawer.Screen name="Scheduled Rides" component={CustomerUpComingTrips} options={{
        drawerIcon: ({ focused, size }) => (
          <MaterialCommunityIcons
            name="chevron-triple-right"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} />
      {/* <Drawer.Screen name="Trip Ended" component={AccountCreated} options={{
        drawerIcon: ({ focused, size }) => (
          <MaterialCommunityIcons
            name="chevron-triple-right"
            size={size}
            color={focused ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('blackColor')}
          />
        ),
        drawerItemStyle: {
          borderBottomColor: Colors.getLightColor('lightGreyColor'),
        }
      }} /> */}
    </Drawer.Navigator>

  )
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background APP.js!', remoteMessage)
  if (remoteMessage.data.type == 'rideCompleted') {
    ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(true))
    console.log('completed saved')
    PushNotification.cancelAllLocalNotifications()
  } else if (remoteMessage.data.type == 'rideComing') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(true))
  } else if (remoteMessage.data.type == 'rideStarted') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(true))
  } else if (remoteMessage.data.type == 'newRide') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
    console.log('newRide saved')
  } else if (remoteMessage.data.type == 'rideCanceled') {
    PushNotification.cancelAllLocalNotifications()
    ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
    ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
    ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
  }
});

function App({ navigation }) {

  useEffect(() => {
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state insode APP.js:', remoteMessage.notification)
        if (remoteMessage.data.type == 'newRide') {
          PushNotification.cancelAllLocalNotifications()
          ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
          ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
          console.log('newRide saved')
        } else if (remoteMessage.data.type == 'rideCompleted') {
          ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(true))
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
          ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
          ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
          ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
          ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
          ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
        }
        else {
          ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
          ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
          console.log('null')
        }
        console.log(remoteMessage.data.type)
      }
    })
  }, [])

  InitializeComponents()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'UserAppSplash'}
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignupStart" component={SignupStart} />
          <Stack.Screen name="SignupOptions" component={SignupOptions} />
          <Stack.Screen name="EmailSignupFirstPart" component={EmailSignupFirstPart} />
          <Stack.Screen name="EmailSignup" component={EmailSignup} />
          <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
          <Stack.Screen name="UploadFiles" component={UploadFiles} />
          <Stack.Screen name="ConfirmPass" component={ConfirmPass} />
          <Stack.Screen name="ForgetPass" component={ForgetPass} />
          <Stack.Screen name="ResetPass" component={ResetPass} />
          <Stack.Screen name="TravelHistory" component={DrawerUsrerData} />
          <Stack.Screen name="TripDetails" component={TripDetails} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
          <Stack.Screen name="DriverTransactionDetails" component={DriverTransactionDetails} />
          <Stack.Screen name="VerifyForgotOtp" component={VerifyForgotOtp} />
          <Stack.Screen name="JobAcceptance" component={JobAcceptance} />
          <Stack.Screen name="CustomeHeader" component={CustomeHeader} />
          <Stack.Screen name="CustomBackArrow" component={CustomBackArrow} />
          <Stack.Screen name="IncomingRides" component={IncomingRides} />
          <Stack.Screen name="NetworkCheck" component={NetworkCheck} />


          {/* Starting Customer App*/}
          <Stack.Screen name="UserAppSplash" component={UserAppSplash} />
          <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
          <Stack.Screen name="CustomerProfileScreen" component={CustomerProfileScreen} />
          <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
          <Stack.Screen name="CustomerSignupOTP" component={CustomerSignupOTP} />
          <Stack.Screen name="CustomerHomePage" component={DrawerCustomerData} />
          <Stack.Screen name="CustomerForgotPass" component={CustomerForgotPass} />
          <Stack.Screen name="CustomerVerifyForgotOTP" component={CustomerVerifyForgotOTP} />
          <Stack.Screen name="CustomerResetPass" component={CustomerResetPass} />
          <Stack.Screen name="PickDropDetails" component={PickDropDetails} />
          <Stack.Screen name="CurrentRideDetails" component={CurrentRideDetails} />
          <Stack.Screen name="AccountCreated" component={AccountCreated} />
          <Stack.Screen name="BackgroundLocation" component={BackgroundLocation} />
          <Stack.Screen name="Locations" component={Locations} />
          <Stack.Screen name="CustomerHeader" component={CustomerHeader} />
          <Stack.Screen name="CustomerTransactionHistory" component={CustomerTransactionHistory} />
          <Stack.Screen name="CustomerTransactionDetails" component={CustomerTransactionDetails} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;