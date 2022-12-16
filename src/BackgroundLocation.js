import React, { useRef, useState, useEffect } from "react";
import {
  AppState, StyleSheet, Text, View,
  NativeModules,
  Modal,
  TouchableOpacity,
  Linking,
  PermissionsAndroid
} from "react-native";
import BackgroundJob from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';
import FusedLocation from 'react-native-fused-location';
import Locations from "./Locatins";


const BackgroundLocation = () => {
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
  BackgroundJob.on('expiration', () => {
    console.log('IOS: i am being closed')
  })
  const taskRandom = async (taskData) => {
    console.log('inside taskRandom')
    await new Promise(async resolve => {
      console.log('getting locations')
      const { delay } = taskData;
      console.log(BackgroundJob.isRunning(), delay)
      for (let i = 0; BackgroundJob.isRunning(); i++) {
        
        console.log('getting locations', 'Runned -> ' + i)
        await BackgroundJob.updateNotification(
          {
            taskDesc: 'Runned -> ' + i,
            progressBar: 2,
          });
          getPermissions()
        await sleep(delay);
      }
    });
  }
  const handleOpenUrl = (evt) => {
    console.log('clicked')
    console.log('opening', evt.url)
  }
  Linking.addEventListener('url', handleOpenUrl)

  const options = {
    taskName: 'Example',
    taskTitle: 'Location On',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 4000,
    },
  };
  let playing = BackgroundJob.isRunning()

  const locationCalling = async () => {
    playing = !playing
    if (playing) {
      try {
        await BackgroundJob.start(taskRandom, options)
        console.log('trying yo start background service')
        console.log('successful start')
      } catch (e) {
        console.log('error is', e)
      }
    } else {
      console.log('trying yo Stop background service')
      await BackgroundJob.stop()
    }

  }

  const getPermissions = async () => {
    console.log('getting permission')

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        setHasLocationPermission(true)
        gettingLocations()
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [hasLocationPermission, setHasLocationPermission] = useState(false)

  const gettingLocations = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => locationCalling()}>
          <Text>
            vcdfbvjh
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationIn={'fadeIn'}
        animationInTiming={800}
        visible={false}
      >
        <View style={{ backgroundColor: 'red', flex: 1, margin: '5%', borderRadius: 5, marginVertical: '10%' }}>
          <View style={{ flex: 2.5, backgroundColor: 'silver', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <Text style={{ fontSize: 20 }}>
              Map View
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'brown', justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Customer Name and Price View
            </Text>
          </View>
          <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>
              Accept or Reject
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'grey'
  },
});

export default BackgroundLocation