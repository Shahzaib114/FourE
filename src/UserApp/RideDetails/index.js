import { Dimensions, View, Text, ScrollView, Image, FlatList, TouchableOpacity, Linking, Modal, PermissionsAndroid, Platform, ActivityIndicator, AppState } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import { useSelector, useDispatch } from 'react-redux';

import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout, AnimatedRegion } from 'react-native-maps';
import CustomBackArrow from '../../CustomBackArrow';
import messaging from '@react-native-firebase/messaging';

import Geolocation from '@react-native-community/geolocation';
import Colors from '../../../utility/colors/Colors';
import ClientLayer from '../../../components/Layers/ClientLayer';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import { gettingRiderDetails, onResetRiderDetails } from '../../../store/Actions/gettingRider/RiderDetails';
import { _CancelRide } from '../../../store/Actions/CancelRide/CacncelRide';
import { _CancelReason } from '../../../store/Actions/CancelReason/CacncelRideReason';
import { useNavigation } from '@react-navigation/native';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import CustomerHeader from '../CustomerHeader';
import PushNotification from 'react-native-push-notification';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CurrentRideDetails = ({ route, delay }) => {
    const navigation = useNavigation();
    const MarkerAnimations = [
        {
            id: '1', name: 'Karachi', latitude: 33.734862, longitude: 73.090654
        },
        {
            id: '2', name: 'Lahore', latitude: 33.735130, longitude: 73.091653
        },
        {
            id: '3', name: 'Islamabad', latitude: 33.733470, longitude: 73.087562
        },
        {
            id: '4', name: 'G6', latitude: 33.732721, longitude: 73.086179
        },
        {
            id: '5', name: 'G7', latitude: 33.734050, longitude: 73.088337
        },
        {
            id: '6', name: 'Rahim yar Khan', latitude: 33.732524, longitude: 73.090323
        },
        {
            id: '7', name: 'Afhanistan', latitude: 33.732239, longitude: 73.085385
        },

    ]

    const Ring = ({ delay }) => {
        const ring = useSharedValue(0);
        const ringStyle = useAnimatedStyle(() => {
            return {
                opacity: 0.8 - ring.value,
                transform: [
                    {
                        scale: interpolate(ring.value, [0, 1], [1, 4]),
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
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!");
            }
            appState.current = nextAppState;
            console.log("AppState", appState.current);
            if (appState.current == 'active') {
                ClientLayer.getInstance().getDataManager().GetValueForKey('ridestarted', startRideData => {
                    let rideStart = JSON.parse(startRideData)
                    if (rideStart == true) {
                        PushNotification.cancelAllLocalNotifications()
                        setCanCancelJob(true)
                    }
                })
                ClientLayer.getInstance().getDataManager().GetValueForKey('completed', completeRideData => {
                    if (completeRideData != 'null') {
                        let rideComplete = JSON.parse(completeRideData)
                        if (rideComplete == true) {
                            PushNotification.cancelAllLocalNotifications()
                            navigation.navigate('AccountCreated',
                                {
                                    paramModal: true
                                }
                            )
                        }
                    }
                })
                // ClientLayer.getInstance().getDataManager().GetValueForKey('RiderOTW', resultOTW => {
                //     if (resultOTW != 'null') {
                //         let rideOnTheWay = JSON.parse(resultOTW)
                //         if (rideOnTheWay == true) {
                //             PushNotification.cancelAllLocalNotifications()
                //             alert('Rider On The Way!')
                //         }
                //     }
                // })

            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('ridestarted', startRideData => {
            let rideStart = JSON.parse(startRideData)
            if (rideStart == true) {
                setCanCancelJob(true)
            }
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('completed', completeRideData => {
            if (completeRideData != 'null') {
                let rideComplete = JSON.parse(completeRideData)
                if (rideComplete == true) {
                    navigation.navigate('AccountCreated',
                        {
                            paramModal: true
                        }
                    )
                }
            }

        })
        messaging().onNotificationOpenedApp(txt => {
            if (txt.data.type == 'rideCompleted') {
                navigation.navigate('AccountCreated',
                    {
                        paramModal: true
                    }
                )
            }
            else if (txt.data.type === 'rideComing') {
                alert('Rider On The Way!')
            }
        });
        ClientLayer.getInstance().getDataManager().GetValueForKey('rideData', startRideData => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('fromLabel', startFromLabel => {
                ClientLayer.getInstance().getDataManager().GetValueForKey('toLabel', startToLabel => {
                    let rideData = JSON.parse(startRideData)
                    let fromLabel = JSON.parse(startFromLabel)
                    let toLabel = JSON.parse(startToLabel)
                    if (rideData != null || rideData != undefined) {
                        setDriverLocation(loading)
                        setDriverId(rideData.find_driver.driver_id)
                        setJobId(rideData.find_driver.job_id)
                        setDriverTotalinfo(rideData.find_driver)
                        setTimeout(async () => {
                            setRiderFound(true)
                        }, 3000);
                        setCurrentLocationLabel(fromLabel)
                        setdestinationLabel(toLabel)
                        getPermissions()
                        _getDriverLocation(rideData.find_driver.driver_id, rideData.find_driver.job_id)
                    } else {
                        setDriverLocation(loading)
                        let DId = JSON.parse(route.params.paramData.find_driver.driver_id)
                        let JId = JSON.parse(route.params.paramData.find_driver.job_id)
                        setDriverId(DId)
                        setJobId(JId)
                        setDriverTotalinfo(route.params.paramData.find_driver)
                        setTimeout(async () => {
                            setRiderFound(true)
                        }, 3000);
                        setCurrentLocationLabel(route.params.paramFrom)
                        setdestinationLabel(route.params.paramTo)
                        getPermissions()
                        _getDriverLocation(DId, JId)
                    }
                })
            })
        })
    }, []);

    useEffect(() => {
        RNPusherPushNotifications.on('notification', (txt) => {
            console.log('notifiaction', NotificationData(txt))
        })
      
          
    }, []);

    const [canCancelJob, setCanCancelJob] = useState(false)

    const NotificationData = (txt) => {
        if (txt.data.type == 'rideStarted') {
            ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(true))
            setCanCancelJob(true)
        }
        else if (txt.data.type === 'rideComing') {
            alert('Rider On The Way!')
        }
        // else if(txt.data.type == 'rideCompleted') {
        //     navigation.navigate('AccountCreated',
        //     {
        //         paramModal:true
        //     }
        //     )
        // }
    }

    const [currentLocationLabel, setCurrentLocationLabel] = useState('');
    const [destinationLabel, setdestinationLabel] = useState('');

    const [riderFound, setRiderFound] = useState(false);

    const [currentLocSelected, setCurrentLocSelected] = useState(false);
    const [destinationLocSelected, setSestinationLocSelected] = useState(false);

    const [mapCoords, setMapCoords] = useState(
        new AnimatedRegion({
            latitude: 34.8331529,
            longitude: 73.2883919,
            latitudeDelta: 0.003372395186460153,
            longitudeDelta: 0.0019201263785362244,
        })
    )

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 2000)
            }
        } else {
            mapCoords.timing(newCoordinate).start();
        }
    }

    const [position, setPosition] = useState({
        latitude: 34.7331529,
        longitude: 73.0883919,
        latitudeDelta: 0.003372395186460153,
        longitudeDelta: 0.0019201263785362244,
    });



    const [locationPermissions, setLocationPermissions] = useState();

    const loading = useSelector((state) => state.riderDetails.runLoader)
    const data = useSelector((state) => state.riderDetails.data)
    const error = useSelector((state) => state.riderDetails.error)
    const dispatch = useDispatch();
    const [driverLocationCheck, setDriverLocationCheck] = useState(false);

    const [driverLocation, setDriverLocation] = useState(false)
    const [driverLocationLabel, setDriverLocationLabel] = useState('')

    useEffect(() => {
        if (!loading && data != null) {
            if (driverLocationCheck == true) {
                setDriverLocation(true)
                setDriverLocationLabel(data.location)
                setHeading(JSON.parse(data.direction))
                setMapCoords({
                    latitude: JSON.parse(data.latitude),
                    longitude: JSON.parse(data.longitude),
                    latitudeDelta: 0.0016185867283340372,
                    longitudeDelta: 0.0009847059845924377,
                })
                animate(JSON.parse(data.latitude), JSON.parse(data.longitude))
            }
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])

    const [netModalVisible, setNetModalVisible] = useState(false)

    const getDriverLocation = (DId, JId) => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
                setStopInterval(false)
            } else {
                setDriverLocationCheck(true)
                dispatch(gettingRiderDetails({
                    driver_id: DId,
                    job_id: JId,
                }))
            }
        })
       
    }

    const [stopInterval, setStopInterval] = useState()

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setStopInterval(false)
            onResetRiderDetails()
            setDriverLocationCheck(false)
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);

    const [driverId, setDriverId] = useState()
    const [jobId, setJobId] = useState()
    const [driverTotalinfo, setDriverTotalinfo] = useState()

    const _getDriverLocation = (DId, JId) => {
        const intervalId = setInterval(() => {
            getDriverLocation(DId, JId)
        }, 3000);
        const unsubscribe = navigation.addListener('blur', () => {
            clearInterval(intervalId)
        });
        return unsubscribe;
    }

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLocationPermissions(true)
                getCurrentLocation()
            } else {
                setLocationPermissions(false)
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setHeading(crd.heading)
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0016185867283340372,
                longitudeDelta: 0.0009847059845924377,
            });
            Geocoder.init('AIzaSyAbmXsLJF-4QhiKTNK204wFcNUxs_4akC8')
            Geocoder.from(crd.latitude, crd.longitude)
                .then(json => {
                    // console.log('full location is', json.results[0].formatted_address)
                    setCurrentLocationLabel(json.results[0].formatted_address)
                })
                .catch(error => console.warn(error));
        })

    }

    const [driverNumber, setDriverNumber] = useState('+923047451370')

    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:+${number}`; }
        Linking.openURL(phoneNumber);
    };

    const mapRef = useRef();
    const markerRef = useRef();
    const [heading, setHeading] = useState();

    const [cancelPress, setCancelPress] = useState(false);
    const [cancelReasonPress, setCancelReasonPress] = useState(false);

    const _onpressCancel = () => {
        setCancelPress(true)
        cancelDispatch(_CancelRide())
    }
    const [cancelReason, setCancelReason] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const cancelLoading = useSelector((state) => state.cancelRide.runLoader)
    const cancelData = useSelector((state) => state.cancelRide.data)
    const cancelError = useSelector((state) => state.cancelRide.error)
    const cancelDispatch = useDispatch();

    useEffect(() => {
        if (!cancelLoading && cancelData != null) {
            if (cancelPress == true) {
                setCancelReason(cancelData.data)
                setModalVisible(true)
            }
        }
        else if (!cancelLoading && cancelError != null) {
            //code for error message display 
            alert('Credentials are Wrong')
        }
    }, [cancelLoading])

    const cancelReasonLoading = useSelector((state) => state.cancelRideReason.runLoader)
    const cancelReasonData = useSelector((state) => state.cancelRideReason.data)
    const cancelReasonError = useSelector((state) => state.cancelRideReason.error)
    const cancelReasonDispatch = useDispatch();

    useEffect(() => {
        if (!cancelReasonLoading && cancelReasonData != null) {
            setModalVisible(false)
            if (cancelReasonData.data == 'error') {
                alert(cancelReasonData.message)
            } else {
                if (cancelReasonPress == true) {
                    alert(cancelReasonData.message)
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(null))
                    navigation.navigate('CustomerHomePage')
                }
            }
        }
        else if (!cancelReasonLoading && cancelReasonError != null) {
            //code for error message display 
            alert('Credentials are Wrong')
        }
    }, [cancelReasonLoading])

    const _onCancelResponse = (reason) => {
        setCancelReasonPress(true)
        cancelReasonDispatch(_CancelReason({
            job_id: jobId,
            status: 5,
            cancel_reason: reason,
        }))
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent
            >
                <View style={styles.modalMainView}>
                    <View style={styles.modalChildView1}>
                        <Text style={styles.whyCancelText}>
                            Why DO You Want To Cancel
                        </Text>
                        <FlatList
                            data={cancelReason}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    _onCancelResponse(item.reason)
                                }}
                                    style={styles.touchableFlatList}>
                                    <Text style={styles.reasonsText}>
                                        {item.reason}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        >
                        </FlatList>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)}
                        style={styles.noCancelOpacity}>
                        <Text style={styles.noCancelText}>
                            Do not cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={netModalVisible}
                transparent={false}
                style={{ margin: 0 }}
            >
                <View style={styles.netContainer}>
                    <View>
                        <Image source={require('../../../assets/Images/FourELogo.png')}>
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
                                onPress={() => { setNetModalVisible(false), navigation.goBack() }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>

                <CustomerHeader
                    label={"Ride Confirmation"}
                    leftIcon={
                        <CustomBackArrow />
                    }
                    userorDriverProfile={'CustomerProfileScreen'}
                    screen_icon={
                        <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    screen_name={'Ride Confirmation'}
                    screen_info={`Here you can see the following details of Booked Ride${'\n'} 
                    1 : Booking Id of your Trip${'\n'}
                    2 : Trip Starting Lcoation${'\n'}
                    3 : Trip Ending Location${'\n'}
                    4 : Trip Amount ${'\n'}
                    5 : Payment Method${'\n'}`
                    }
                >
                </CustomerHeader>

                {locationPermissions ?
                    (
                        <View style={styles.mapImageView}>
                            <MapView
                                toolbarEnabled={true}
                                provider='google'
                                ref={mapRef}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                showsUserLocation={true}
                                initialRegion={position}
                                showsCompass={true}
                                scrollEnabled={true}
                                rotateEnabled={false}
                                maxZoomLevel={17.5}
                                region={position}
                                loadingEnabled={false}
                            >
                                {driverLocation && (
                                    console.log(driverLocation),
                                    <Marker.Animated
                                        ref={markerRef}
                                        title={driverTotalinfo.username}
                                        coordinate={mapCoords}>
                                        <View style={{ padding: 5 }}>
                                            <Image source={require('../../../assets/Images/car.png')}
                                                style={{
                                                    width: 35,
                                                    height: 35, backgroundColor: Colors.getLightColor('verticalLineColor'), borderRadius: 50,
                                                    transform: [{
                                                        rotate: heading === undefined ? '0deg' : `${heading}deg`
                                                    }],
                                                }}
                                            >
                                            </Image>
                                        </View>
                                    </Marker.Animated>
                                )}



                                {/* <Marker
                                    tracksViewChanges={false}
                                    title={currentLocationLabel}
                                    coordinate={position}
                                >
                                    <MaterialCommunityIcons name='map-marker' size={20} color={Colors.getLightColor('whiteColor')}
                                        style={{
                                            padding: '1.5%', backgroundColor: Colors.getLightColor('primaryColor'),
                                            borderRadius: 25, alignSelf: 'center', textAlign: 'center'
                                        }} />

                                </Marker>
                                <Marker
                                    title={destinationLabel}
                                    coordinate={destination}
                                >
                                    <Fontisto name='car'
                                        size={17} color='white' style={{
                                            padding: '1.5%', backgroundColor: Colors.getLightColor('primaryColor'),
                                            borderRadius: 25, textAlign: 'center'
                                        }} />
                                </Marker> */}
                                {/* <View>
                                    <MapViewDirections
                                        origin={
                                            position
                                        }
                                        // origin={{
                                        //     coordi
                                        // }}
                                        destination={
                                            destination
                                        }
                                        apikey={'AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM'}
                                        strokeWidth={2}
                                        // lineDashPattern={[0]}
                                        strokeColor={Colors.getLightColor('primaryColor')}
                                        strokeColors={Colors.getLightColor('primaryColor')}
                                        onReady={result => {
                                            mapRef.current.fitToCoordinates(result.coordinates, {
                                                edgePadding: {
                                                    right: (width / 20),
                                                    bottom: (height / 20),
                                                    left: (width / 20),
                                                    top: (height / 10),
                                                }
                                            })
                                        }}
                                        onError={(errorMessage) => {
                                            console.log('GOT AN ERROR', errorMessage);
                                        }}
                                    />

                                </View> */}

                            </MapView>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={() => getPermissions()}
                            style={{ width: '100%', height: Dimensions.get('window').height * 0.40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.tripText}>
                                Please Allow GPS Location
                            </Text>
                        </TouchableOpacity>
                    )
                }
                <View style={styles.rideFoundParentView}>
                    {riderFound ?
                        (
                            <View style={{ height: Dimensions.get('window').height * 0.35, justifyContent: 'space-around' }}>
                                <View style={styles.userDetailsView}>
                                    <View>
                                        <Text style={styles.usernameText}>
                                            {driverTotalinfo.username}{driverTotalinfo.full_name}
                                        </Text>
                                        <Text style={styles.vehicleDetailsText}>
                                            {driverTotalinfo.vehicle_make} {driverTotalinfo.vehicle_color}
                                        </Text>
                                        <Text style={styles.vehicleDetailsText}>
                                            {driverTotalinfo.vehicle_number}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => dialCall(driverTotalinfo.phone)}
                                        style={styles.callNowOpacity}>
                                        <Ionicons name='call-outline' size={18} color={Colors.getLightColor('whiteColor')}
                                            style={{ margin: '3%' }} />
                                        <Text style={styles.usernameText}>
                                            Call Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '80%', marginHorizontal: '10%', }}>
                                    <Text style={styles.awayText}>
                                        Rider is few min Away
                                    </Text>
                                </View>
                                <View style={styles.locationsView}>
                                    <View style={styles.IconsView}>
                                        <Octicons name='dot-fill' size={25} color="#0887FC"
                                            style={styles.dotIcon}
                                        />
                                        <View style={styles.verticalLine} />
                                        <Fontisto name='rectangle' size={15} color={Colors.getLightColor('blackColor')} style={styles.rectangleIcon}>
                                        </Fontisto>
                                    </View>

                                    <View style={styles.textualView}>
                                        <Text
                                            style={styles.locationText}>
                                            {currentLocationLabel}
                                        </Text>
                                        <Text
                                            style={styles.locationText}>
                                            {destinationLabel}
                                        </Text>
                                    </View>
                                </View>
                                {canCancelJob ?
                                    (
                                        <View style={styles.enjoyYourRideView}>
                                            <Text style={{ color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium' }}>
                                                Enjoy Your Ride
                                            </Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <View>
                                            {cancelLoading ?
                                                (
                                                    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                                                        <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                                    </View>
                                                )
                                                :
                                                (
                                                    <TouchableOpacity onPress={() => _onpressCancel()}
                                                        style={styles.cancelRideOpacity}
                                                    >
                                                        <Text style={{ color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium' }}>
                                                            Cancel Ride
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                    )
                                }
                            </View>
                        )
                        :
                        (
                            <View style={styles.findingRideView}>
                                <Text style={styles.findingRideText}>
                                    Finding {'\n'} Ride
                                </Text>
                                <Ring delay={0} />
                                <Ring delay={1000} />
                                <Ring delay={1500} />
                                <Ring delay={2000} />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
};
export default CurrentRideDetails;