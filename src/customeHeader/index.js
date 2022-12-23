import React, { useEffect, useRef } from 'react'
import { View, Image, Text, TouchableOpacity, ImageBackground, AppState, PermissionsAndroid, Linking, Alert } from 'react-native'
import Colors from '../../utility/colors/Colors';
import styles from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import ClientLayer from '../../components/Layers/ClientLayer';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Switch } from 'react-native-gesture-handler';
import BackgroundJob from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import { PostingDriverLiveLocation } from '../../store/Actions/DriverLiveLocation/postDriverLiveLocation';
import { useDispatch, useSelector } from 'react-redux';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import { postingActivityStatus } from '../../store/Actions/DriverStatus/postDriverStatusUpdate';
import NetInfo from "@react-native-community/netinfo";

const CustomeHeader = (props) => {
    const navigation = useNavigation();
    const [ridename] = useState('Incoming Ride');
    const { leftIcon, label, book_id, screen_icon, screen_info, screen_name, userorDriverProfile, rideStatus } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [rideStatusVisible, setRideStatusVisible] = useState(false);
    const [navigationPath, setNavigationPath] = useState('');
    const [jobId, setJobId] = useState('');
    const appState = useRef(AppState.currentState);


    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('locationAllowed', allow => {
            let isAllowed = JSON.parse(allow)
            if (isAllowed === true) {
                setIsEnabled(false)
            } else if (isAllowed === false) {
                setIsEnabled(true)
            }
        })
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                navigation.navigate('TravelHistory')
            }

            appState.current = nextAppState;
            if (appState.current == 'active') {
                messaging().getInitialNotification().then(remoteMessage => {
                    if (remoteMessage) {
                        console.log('Notification caused app to open from quit state:', remoteMessage.notification)
                        if (remoteMessage.data.type == 'newRide') {
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
                    // setLoading(false);
                })
                ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
                    ClientLayer.getInstance().getDataManager().GetValueForKey('notificationJobId', resultId => {
                        ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', started => {
                            let isstarted = JSON.parse(started)
                            let id = JSON.parse(resultId)
                            let type = JSON.parse(resultType)
                            setJobId(id)
                            if (type == null) {
                                setRideStatusVisible(false)
                            }
                            else if (type === 'newRide') {
                                setRideStatusVisible(true)
                                setNavigationPath('IncomingRides')
                            }
                            else if (isstarted == 'jobAcceptance') {
                                setRideStatusVisible(true)
                                setNavigationPath('JobAcceptance')
                            }
                        })
                    })
                })
            }
        })
        return () => {
            subscription.remove();
        };
    }, []);
    useEffect(() => {
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification)
                if (remoteMessage.data.type == 'newRide') {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(remoteMessage.data.type))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(remoteMessage.data.jobID))
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
        ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('notificationJobId', resultId => {
                ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', started => {
                    let isstarted = JSON.parse(started)
                    let id = JSON.parse(resultId)
                    let type = JSON.parse(resultType)
                    setJobId(id)
                    if (type == null) {
                        setRideStatusVisible(false)
                    }
                    else if (type === 'newRide') {
                        setRideStatusVisible(true)
                        setNavigationPath('IncomingRides')
                    }
                    else if (isstarted == 'jobAcceptance') {
                        setRideStatusVisible(true)
                        setNavigationPath('JobAcceptance')
                    }
                })
            })
        })
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
                ClientLayer.getInstance().getDataManager().GetValueForKey('notificationJobId', resultId => {
                    ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', started => {
                        let isstarted = JSON.parse(started)
                        let id = JSON.parse(resultId)
                        let type = JSON.parse(resultType)
                        setJobId(id)
                        if (type == null) {
                            setRideStatusVisible(false)
                        }
                        else if (type === 'newRide') {
                            setRideStatusVisible(true)
                            setNavigationPath('IncomingRides')
                        }
                        else if (isstarted == 'jobAcceptance') {
                            setRideStatusVisible(true)
                            setNavigationPath('JobAcceptance')
                        }
                    })
                })
            })
        })
        return unsubscribe;
    }, [navigation]);

    const Ring = ({ delay }) => {
        const ring = useSharedValue(0);
        const ringStyle = useAnimatedStyle(() => {
            return {
                opacity: 0.8 - ring.value,
                transform: [
                    {
                        scale: interpolate(ring.value, [0, 1], [0, 1]),
                    },
                ],
            };
        });
        useEffect(() => {
            ring.value = withDelay(
                delay,
                withRepeat(
                    withTiming(1, {
                        duration: 2000,
                    }),
                    -1,
                    false
                )
            );
        }, []);
        return <Animated.View style={[styles.ring, ringStyle]} />;
    };

    const pressedOnRide = async () => {
        PushNotification.cancelAllLocalNotifications()
        ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', started => {
            let isstarted = JSON.parse(started)
            console.log('errror outsides', isstarted)
            console.log('path is', navigationPath)
            if (isstarted == 'jobAcceptance') {
                console.log('errror os', isstarted)
                navigation.navigate(navigationPath, {
                    // console.log('errror os')
                    paramModal: true,
                    paramJobId: jobId
                })
            }
            navigation.navigate(navigationPath, {
                // console.log('errror os')
                paramModal: true,
                paramJobId: jobId
            })
        })

    }

    const [isEnabled, setIsEnabled] = useState()
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
    BackgroundJob.on('expiration', () => {
        console.log('IOS: i am being closed')
    })
    const taskRandom = async (taskData) => {
        await new Promise(async resolve => {
            const { delay } = taskData;
            for (let i = 0; BackgroundJob.isRunning(); i++) {
                shareDriverLocation()
                console.log('getting locations', 'Runned -> ' + i)
                await BackgroundJob.updateNotification(
                    {
                        taskDesc: 'Your Location will be shared to your concerned Rider!',
                        progressBar: 2,
                    });
                await sleep(delay);
            }
        });
    }
    const handleOpenUrl = (evt) => {
        console.log('clicked')
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
            delay: 2000,
        },
    };

    const locationCalling = async (param) => {
        if (param == false) {
            try {
                await BackgroundJob.start(taskRandom, options)
                console.log('Started Background Action')
            } catch (e) {
                console.log('error is', e)
                setIsEnabled(true)
            }
        } else {
            console.log('Stopped Background Action')
            await BackgroundJob.stop()
        }

    }
    const activityLoading = useSelector((state) => state.driverStatus.runLoader)
    const activityData = useSelector((state) => state.driverStatus.data)
    const activityError = useSelector((state) => state.driverStatus.error)
    const activityDispatching = useDispatch()

    const geoLocationON  = async () => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('type', resultType => {
            let isType = JSON.parse(resultType)
            if (isType == null) {
                setIsEnabled(previousState => !previousState)
                if (isEnabled === false || isEnabled === undefined) {
                    console.log('is enabled inside false')
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('locationAllowed', JSON.stringify(false))
                    locationCalling(false)
                    ClientLayer.getInstance().getDataManager().GetValueForKey('driverInstanceId', instanceId => {
                        let Driver_Id = JSON.parse(instanceId)
                        subscribe(Driver_Id)
                    })
                    ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                        let Driver_Id = JSON.parse(result)
                        activityDispatching(postingActivityStatus({
                            is_online: 1,
                            id: JSON.parse(Driver_Id),
                        }))
                    })

                } else if (isEnabled === true) {
                    console.log('is enabled inside true')
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('locationAllowed', JSON.stringify(true))
                    locationCalling(true)
                    ClientLayer.getInstance().getDataManager().GetValueForKey('driverInstanceId', instanceId => {
                        let Driver_Id = JSON.parse(instanceId)
                        unsubscribe(Driver_Id)
                    })
                    ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                        let Driver_Id = JSON.parse(result)
                        activityDispatching(postingActivityStatus({
                            is_online: 0,
                            id: JSON.parse(Driver_Id),
                        }))
                    })
                }
            } else {
                alert('You can not turn off activity during an ride!')
            }
        })
    }
    const _stopLocations = async () => {
        await BackgroundJob.stop()
        setIsEnabled(false)
        ClientLayer.getInstance().getDataManager().SaveValueForKey('locationAllowed', JSON.stringify(true))
    }

    const toggleSwitch = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                console.log('network not available!')
                Alert.alert(
                    "No Internet",
                    "Please Turn On Your Wifi or Recharge your Mobile Data",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
                _stopLocations()
            } else {
                if (getLocation) {
                    geoLocationON()
                }
                else {
                    console.log('not allowed')
                    getPermissions()
                }
            }
        })
    }


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

    const unsubscribe = interest => {
        RNPusherPushNotifications.unsubscribe(
            interest,
            (statusCode, response) => {
                console.log(statusCode, response);
            },
            () => {
                console.log('unsubscibed', interest);
            }
        );
    }

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                getBackgroundDone()
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const [getLocation, setGetLocation] = useState(false)
    const getBackgroundDone = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: "FourE App wants to Access Your Location",
                    message:
                        "Please enable location to ALLOW ALL THE TIME " +
                        "so you can take awesome pictures.",
                    buttonPositive: "Allow all the time"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the Backgroundlocation");
                setGetLocation(true)
                // 
            } else {
                console.log("location permission denied");
                setIsEnabled(false)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const liveLoading = useSelector((state) => state.travelHistoryDetails.runLoader)
    const liveData = useSelector((state) => state.travelHistoryDetails.data)
    const liveError = useSelector((state) => state.travelHistoryDetails.error)
    const liveDetailsDispatch = useDispatch();

    const shareDriverLocation = () => {
        Geolocation.getCurrentPosition(pos => {
            const crd = pos.coords;
            console.log(crd)
            ClientLayer.getInstance().getDataManager().GetValueForKey('lat', lat1 => {
                ClientLayer.getInstance().getDataManager().GetValueForKey('lon', lon1 => {
                    if (lat1 == crd.latitude) {
                        console.log('Old Locations!')
                    }
                    else {
                        console.log('New Locations!')
                        var R = 6378.137; // Radius of earth in KM
                        var dLat = crd.latitude * Math.PI / 180 - lat1 * Math.PI / 180;
                        var dLon = crd.longitude * Math.PI / 180 - lon1 * Math.PI / 180;
                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(lat1 * Math.PI / 180) * Math.cos(crd.latitude * Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c; //d is distance in meters
                        console.log('distance is', d * 1000)
                        if (d * 1000 > 2) { //distance is greater than 2 meters
                            ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', id => {
                                ClientLayer.getInstance().getDataManager().GetValueForKey('job_id', booking_id => {
                                    let idNumber = Number(JSON.parse(id));
                                    let job_id
                                    if (Number(JSON.parse(booking_id)) === 0) {
                                        job_id = null;
                                    } else {
                                        job_id = Number(JSON.parse(booking_id))
                                    }
                                    liveDetailsDispatch(PostingDriverLiveLocation({
                                        driver_id: idNumber,
                                        latitude: crd.latitude,
                                        longitude: crd.longitude,
                                        job_id: job_id,
                                        direction: crd.heading
                                    }))
                                })
                            })
                        }
                        else {
                            null
                        }
                        ClientLayer.getInstance().getDataManager().SaveValueForKey('lon', JSON.stringify(crd.longitude));
                        ClientLayer.getInstance().getDataManager().SaveValueForKey('lat', JSON.stringify(crd.latitude));
                    }
                })
            })
        }), (error) => {
            logError(
                new Error(
                    `Cannot get current location: ${error.code} ${error.message}`,
                ),
            );
        },
        {
            enableHighAccuracy: true,
            accuracy: {
                android: 'high',
                ios: 'bestForNavigation',
            },
            
            timeout: 12000,
            maximumAge: 10000,
            // distanceFilterr: 1,
        }
    }
    return (
        <View style={styles.headerView}>
            <Modal
                animationIn={'bounceInLeft'}
                visible={modalVisible}
                style={styles.modalStyle}
            >
                <View>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('../../assets/Images/FourELogo.png')}>
                    </Image>

                </View>
                <View style={styles.childDataHeader}>
                    {screen_icon}
                    <Text style={styles.screenNameText}>
                        {screen_name}
                    </Text>
                    <Text style={styles.screenInfoText}>
                        {screen_info}
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.hideOpacity}>
                        <Text style={styles.hideText}>
                            Hide
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.iconandImageView}>
                <TouchableOpacity style={{ justifyContent: 'center' }}>
                    {leftIcon}
                </TouchableOpacity>
                {rideStatusVisible &&
                    (
                        <TouchableOpacity
                            onPress={() => {
                                pressedOnRide()
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center', margin: '2%', borderRadius: 5, flexDirection: 'row'
                            }}>
                            <Text style={{ color: 'black', fontSize: 15, paddingHorizontal: '4%', fontFamily: 'Montserrat-Medium', }}>
                                {rideStatus}
                            </Text>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                {/* <Text style={{
                                  backgroundColor: Colors.getLightColor('secondaryColor'), alignSelf: 'center',
                                  textAlign: 'center',  borderRadius: 70,
                                  fontSize: 4, fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('primaryColor')
                              }}>
                                  Finding {'\n'} Ride
                              </Text> */}
                                <FontAwesome5 name='car-side' size={15} color={Colors.getLightColor('secondaryColor')}></FontAwesome5>
                                <Ring delay={0} />
                                <Ring delay={1000} />
                                <Ring delay={1500} />
                                <Ring delay={2000} />
                            </View>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity style={styles.imageOpacity}
                    onPress={() => navigation.navigate(userorDriverProfile)}>
                    <Image source={require('../../assets/Images/user2.png')}
                        style={styles.imageStyle}>
                    </Image>
                </TouchableOpacity>
            </View>
            <View style={styles.carView}>
                <ImageBackground source={require('../../assets/Images/carImage.png')}
                    style={styles.carImageStyle}>
                    <Text style={styles.labeltext}>
                        {label}
                    </Text>
                    <Text style={styles.bookingIdText}>
                        {book_id}
                    </Text>
                    <View style={styles.lastView}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.getRidesText}>
                                Get Rides
                            </Text>
                            <Switch
                                trackColor={{ false: Colors.getLightColor('verticalLineColor'), true: Colors.getLightColor('secondaryColor') }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor={Colors.getLightColor('primaryColor')}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={styles.bookingIdParent}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <EvilIcons name='exclamation' size={18} style={styles.excalamtionOpacity}>
                                </EvilIcons>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}
export default CustomeHeader;