import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import ClientLayer from '../../components/Layers/ClientLayer';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import messaging from '@react-native-firebase/messaging';

const SignupStart = ({ navigation }) => {
    const [checkId, setCheckId] = useState('');
    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
            sessionCheck(result)
        })
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state inside splash:', remoteMessage.notification)
                if (remoteMessage.data.type == 'newRide') {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
                    navigation.navigate('IncomingRides', {
                        paramModal: true,
                        paramJobId: remoteMessage.data.jobID
                    })
                    console.log('saved')
                } else {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
                    console.log('null')
                }
                console.log(remoteMessage.data.type); // e.g. "Settings"
            }
            // setLoading(false);
        })
    }, []);
    const unsubscribe = interest => {
        console.log('unSubscribe', interest)
        RNPusherPushNotifications.unsubscribe(
            interest,
            (statusCode, response) => {
                console.log(statusCode, response);
            },
            () => {
                console.log('unsubscibed', interest);
            }
        );
    };

    const subscribe = (interest) => {
        console.log('subscribe', interest)
        // Note that only Android devices will respond to success/error callbacks
        RNPusherPushNotifications.subscribe(
            interest,
            (statusCode, response) => {
                console.error(statusCode, response);
            },
            () => {
                console.log('Success');
            }
        );
    }
    const sessionCheck = (result) => {
        setTimeout(async () => {
            if ((result != null) && (result != 'null')) {
                navigation.replace('TravelHistory')
                let id = JSON.parse(result)
                RNPusherPushNotifications.setInstanceId('4b6a75e4-b377-4556-8635-9b856cb9cd99')
                RNPusherPushNotifications.on('registered', () => {
                    subscribe('driver_' + id)
                })
            }
            else {
                navigation.replace('LogIn')
            }
        }, 1500);
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle}
                contentContainerStyle={styles.contentContainer}>
                <View style={{ marginTop: '80%' }}>
                    <Image source={require('../../assets/Images/FourEImage.png')} style={styles.imageStyle} />
                    <Text style={styles.appNameText}>
                        Driver App
                    </Text>
                </View>
            </ScrollView>

        </View>
    )
}
export default SignupStart;