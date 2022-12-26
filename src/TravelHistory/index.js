import { View, Text, ScrollView, TouchableOpacity,Image, ActivityIndicator, PermissionsAndroid, AppState, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../customDrawerIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTravelHistory } from '../../store/Actions/getTravelHistory/DriverTravelHistory';
import Colors from '../../utility/colors/Colors';
import { gettingTravelingDetails } from '../../store/Actions/getTravelingDetails/TravelingDetails';
import CustomeHeader from '../customeHeader';
import ClientLayer from '../../components/Layers/ClientLayer';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { PostingDriverLiveLocation } from '../../store/Actions/DriverLiveLocation/postDriverLiveLocation';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import IncomingRides from '../IncomingRide';
import { onResetRideCompleted } from '../../store/Actions/RideCompleted/rideCompleted';
import { onResetRideStarted } from '../../store/Actions/DriverArrived/RideStartedFromDriver';
import PushNotification, { PushNotificationDeliveredObject } from 'react-native-push-notification';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import FusedLocation from 'react-native-fused-location';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
export const gotoNext = false
import BackgroundJob from 'react-native-background-actions';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

// global.foo = ['foo']
const TravelHistory = ({ route }) => {
    global.foo = [false]
    const navigation = useNavigation()
    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);
    const [travelHistoryResponse, setTravelHistoryResponse] = useState(false);

    const [backHandle, setBackHandle] = useState(true)
    const [currentSection, setCurrentSection] = useState(false)
    const [rideStatus, setRideStatus] = useState('');
    // useEffect(() => {
    //     BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         _BackPressFunction
    //     );

    //     return () => BackHandler.removeEventListener(
    //         "hardwareBackPress",
    //         _BackPressFunction
    //     );
    // }, [currentSection]);

    // const _BackPressFunction = () =>{
    //     alert('are you sure to go Login')
    //     console.log(`onBackPress currentSection: ${currentSection}`);
    //     if (currentSection === true) {
    //         console.log('current section is true')
    //         return false;
    //     }
    //     else {
    //         console.log('current section is false')
    //         // setCurrentSection(true);
    //         return true;
    //     }
    // }
    const loading = useSelector((state) => state.travelHistory.runLoader)
    const data = useSelector((state) => state.travelHistory.data)
    const error = useSelector((state) => state.travelHistory.error)
    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState()
    const [onCurrectPage, setOnCurrentPage] = useState(appState.current);

    useEffect(() => {
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state inside main useeffect: ', remoteMessage.notification)
                if (remoteMessage.data.type == 'newRide') {
                    PushNotification.cancelAllLocalNotifications()
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
                    console.log('saved')
                    navigation.navigate('IncomingRides', {
                        paramModal: true,
                        paramJobId: remoteMessage.data.jobID
                    })
                } else {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
                    console.log('null')
                }
                console.log(remoteMessage.data.type); // e.g. "Settings"
            }
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', start => {
            let isStarted = JSON.parse(start)
            if (isStarted == 'jobAcceptance') {
                setRideStatus('OnGoing Ride')
            } else {
                setRideStatus('Incoming Ride')
            }
        })

        messaging().onNotificationOpenedApp(txt => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
                console.log(resultType)
                if (resultType != 'null') {
                    console.log('its not null')
                    global.foo[0] = true;
                    console.log('notifiaction', NotificationData(txt))
                }
                else {
                    console.log('its null')
                }
            })
        });
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/background/) &&
                nextAppState === "active"
            ) {
                navigation.navigate('TravelHistory')
                console.log("App has come to the foreground!");
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
            if (appState.current == 'active') {
                ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', start => {
                    let isStarted = JSON.parse(start)
                    if (isStarted == 'jobAcceptance') {
                        setRideStatus('OnGoing Ride')
                    } else {
                        setRideStatus('Incoming Ride')
                    }
                })
                ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
                    let type = JSON.parse(resultType)
                    if (type == 'newRide') {
                        PushNotification.cancelAllLocalNotifications()
                        setRideStatus('Incoming Ride')
                    }
                })
                messaging().getInitialNotification().then(remoteMessage => {
                    if (remoteMessage) {
                        console.log('Notification caused app to open from quit state inside activess:', remoteMessage.notification)
                        if (remoteMessage.data.type == 'newRide') {
                            PushNotification.cancelAllLocalNotifications()
                            ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
                            ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
                            console.log('saved insde activeness of getInitialNotification')
                            navigation.navigate('IncomingRides', {
                                paramModal: true,
                                paramJobId: remoteMessage.data.jobID
                            })
                        } else if (remoteMessage.data.type == 'rideCanceled') {
                            PushNotification.cancelAllLocalNotifications()
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
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);
    const [navigateToNext, setNavigateToNext] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            global.foo[0] = false;
        })
        return unsubscribe;
    }, [navigation]);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('called')
        // const navigation = useNavigation()
        console.log('Message handled in the background!', remoteMessage.data.type)
        if (remoteMessage.data.type == 'newRide') {
            PushNotification.cancelAllLocalNotifications()
            ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
            console.log('saved')
        }
        else if (remoteMessage.data.type === 'rideCanceled') {
            PushNotification.cancelAllLocalNotifications()
            ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
            ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
            console.log('Canceled')
        }
        else {
            ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
            console.log('null')
        }
    })
    const [netModalVisible, setNetModalVisible] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setOnCurrentPage('focused')
            onResetRideCompleted()
            onResetRideStarted()
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                    setTravelHistoryResponse(false)
                } else {
                    ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                        let id = JSON.parse(result)
                        dispatch(fetchTravelHistory({ driver_id: JSON.parse(id) }))
                    })
                }
            })
          
            ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', start => {
                let isStarted = JSON.parse(start)
                if (isStarted == 'jobAcceptance') {
                    setRideStatus('OnGoing Ride')
                } else {
                    setRideStatus('Incoming Ride')
                }
            })
            messaging().getInitialNotification().then(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state inside focus:', remoteMessage.notification)
                    if (remoteMessage.data.type == 'newRide') {
                        PushNotification.cancelAllLocalNotifications()
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
            })
            // console.log('navigateToNext inside useeeffect',navigateToNext)
            console.log('Refreshed in history!');
        })
        return unsubscribe;
    }, [navigation]);
    const NotificationData = (txt) => {
        console.log(global.foo[0]);
        // console.log('navigateToNext',navigateToNext)
        console.log('gotoNext is', gotoNext)
        //    await setNavigateToNext(true)
        console.log('tyype', txt)
        console.log('navigateToNext', navigateToNext)

        if (txt.data.type == 'newRide') {
            PushNotification.cancelAllLocalNotifications()
            if (global.foo[0] === true) {
                console.log('its in true')
                global.foo[0] = false;
                navigation.navigate('IncomingRides', {
                    paramModal: true,
                    paramJobId: txt.data.jobID
                })
            }
        }
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [triggerCount, setTriggerCount] = useState(0);

    useEffect(() => {
        // getPermissions()
        RNPusherPushNotifications.on('notification', (txt) => {
            // setNavigateToNext(true)
            // console.log(gotoNext)
            // gotoNext = true;
            global.foo[0] = true;
            // console.log(global.foo[0]); 

            console.log('notifiaction on foreground', NotificationData(txt))
        })

        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
                setTravelHistoryResponse(false)
            } else {
                ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                    dispatch(fetchTravelHistory({ driver_id: JSON.parse(result) }))
                })
            }
        })
    }, [])

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                // setInterval(() => {
                //     locationPermission()
                // }, 4000);
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    
    useEffect(() => {
        setDisplayView(loading)
        // console.log('daa', data)
        // if(data[0] === ''){
        //     console.log('null')
        // }
        if (!loading && data != null) {
            setTravelHistoryArray(data)
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])

    const gettingDetails = (id) => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                detailsDispatch(gettingTravelingDetails({ job_id: id }))
            }
        })
        
    }
    const detailsLoading = useSelector((state) => state.travelHistoryDetails.runLoader)
    const detailsData = useSelector((state) => state.travelHistoryDetails.data)
    const detailsError = useSelector((state) => state.travelHistoryDetails.error)
    const detailsDispatch = useDispatch();
    useEffect(() => {
        setTravelHistoryResponse(detailsLoading)
        if (!detailsLoading && detailsData != null) {
            navigation.navigate('TripDetails', { paramData: detailsData })
        }
        else if (!detailsLoading && detailsError != null) {
            alert('Credentials are Wrong')
        }
    }, [detailsLoading])
    const [refreshing, setRefreshing] = useState(false);
    const refreshEnd = () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                setRefreshing(true)
                ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                    dispatch(fetchTravelHistory({ driver_id: JSON.parse(result) }))
                })
                setRefreshing(false)
            }
        })
    }

    return (
        <View style={styles.container}>
            <CustomeHeader
                label={"History"}
                leftIcon={
                    <CustomeDrawerIcon />
                }
                userorDriverProfile={'ProfileScreen'}
                screen_icon={
                    <Octicons name='history' color={Colors.getLightColor('primayColor')} size={60}
                        style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                    >
                    </Octicons>
                }
                rideStatus={rideStatus}
                screen_name={'Travel History'}
                screen_info={`Here you can see the following details of your recent trips ${'\n'} 
                1 : Trip Starting Lcoation${'\n'}
                2 : Trip Ending Location${'\n'}
                3 : Total Distance Traveled${'\n'}
                4 : Total Amount of Trip${'\n'}
                5 : Trip Date${'\n'}
                6 : Trip Accepted/Rejected${'\n'}
                7 : Booking Ids of your Trips`
                }
            ></CustomeHeader>

            <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={netModalVisible}
                transparent={false}
                style={{ margin: 0 }}
            >
                <View style={styles.netContainer}>
                    <View>
                        <Image source={require('../../assets/Images/FourELogo.png')}>
                        </Image>
                    </View>
                    <View style={{ width: '90%' }}>
                        <View style={styles.netParentView}>
                            <AntDesign name="disconnect" size={80} color={Colors.getLightColor('primaryColor')}>
                            </AntDesign>
                            <Text style={styles.netNoInternetText}>
                                No Internet
                            </Text>
                        </View>
                        <View style={styles.netSecondMainView}>
                            <Text style={styles.netTurnOnWifiText}>
                                Please Turn On Your Wifi or Check Your Mobile Data !
                            </Text>
                            <TouchableOpacity style={styles.netOkOpacity}
                                onPress={() => { setNetModalVisible(false) }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {displayView || travelHistoryResponse ?
                (
                    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                    </View>
                )
                :
                (
                    <View>
                        <View style={styles.mappingOuterView}>
                            {data === 'error' ?
                                (
                                    <ScrollView
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={() => refreshEnd()}
                                            />
                                        }
                                        style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                                        <Text style={styles.emptyText}>
                                            No Job History
                                        </Text>
                                    </ScrollView>
                                )
                                :
                                (
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={() => refreshEnd()}
                                            />
                                        }
                                        keyExtractor={(item, index) => {
                                            return index.toString();
                                        }}
                                        data={travelHistoryArray}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => {
                                                {
                                                    gettingDetails(item.job_id)
                                                }
                                            }}
                                                style={styles.allitemsView}>

                                                <View style={styles.textualMainView}>

                                                    <Text style={styles.userNameText}>
                                                        {item.from}
                                                    </Text>
                                                    <Text style={styles.locationtypeText}>
                                                        {item.to}
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        {item.distance}KM
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        {item.price}Pkr
                                                    </Text>
                                                </View>
                                                <View style={styles.datedView}>
                                                    <Text style={styles.datedText}>
                                                        {item.date}
                                                    </Text>
                                                    <Text style={styles.completedRejectedText}>
                                                        {item.status == '3' ?
                                                            (
                                                                <Text style={{ color: Colors.getLightColor('greenColor'), borderRadius: 10 }}>
                                                                    Completed
                                                                </Text>
                                                            )
                                                            :
                                                            (
                                                                <Text style={{ color: Colors.getLightColor('mustardColor'), borderRadius: 10 }}>
                                                                    Rejected
                                                                </Text>
                                                            )}
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        Booking id: {item.job_booking_id}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    >
                                    </FlatList>
                                )
                            }
                        </View>
                    </View>
                )
            }
        </View>
    )
};
export default TravelHistory;