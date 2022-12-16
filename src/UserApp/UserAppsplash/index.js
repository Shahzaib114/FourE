import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import ClientLayer from '../../../components/Layers/ClientLayer';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";

const UserAppSplash = ({ navigation }) => {

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
            sessionCheck(result)
        })
    }, []);

    const subscribe = (interest) => {
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
                let id = JSON.parse(result)
                RNPusherPushNotifications.setInstanceId('4b6a75e4-b377-4556-8635-9b856cb9cd99')
                RNPusherPushNotifications.on('registered', () => {
                    subscribe('customer_'+id)
                })
                navigation.replace('CustomerHomePage')
            }
            else {
                navigation.replace('CustomerLogin')
            }
        }, 1000);
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle}
                contentContainerStyle={styles.contentContainer}>
                <View style={{ marginTop: '80%' }}>
                    <Image source={require('../../../assets/Images/FourEImage.png')} style={styles.imageStyle} />
                    <Text style={styles.appNameText}>
                        User App
                    </Text>
                </View>
            </ScrollView>

        </View>
    )
}
export default UserAppSplash;