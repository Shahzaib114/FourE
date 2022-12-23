import { Dimensions, View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, Modal, PermissionsAndroid, AppState } from 'react-native'
import React, { Component, useState, useEffect, Alert, useRef, useCallback } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../../utility/colors/Colors';
import StarRating from 'react-native-star-rating-widget';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import { useSelector, useDispatch } from 'react-redux';
import { getPickandDropLocations, onResetIncomingRide } from '../../store/Actions/getPickandDropLocations/getPickandDropDetails';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { ResponsetoCustomer } from '../../store/Actions/AcceptorRejectCustomer/AcceptRejectCustomer';
import ClientLayer from '../../components/Layers/ClientLayer';
import { useNavigation } from '@react-navigation/native';
import { onResetRideCompleted } from '../../store/Actions/RideCompleted/rideCompleted';
import { onResetRideStarted } from '../../store/Actions/DriverArrived/RideStartedFromDriver';
import { onResetTravelHistory } from '../../store/Actions/getTravelHistory/DriverTravelHistory';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";

const IncomingRides = ({ route }) => {
    const navigation = useNavigation();
    useEffect(() => {
        setModalVisible(route.params.paramModal)
        getPermissions()
        let JOB_ID = Number(route.params.paramJobId)
        dispatch(getPickandDropLocations({ job_id: JOB_ID }))
        RNPusherPushNotifications.on('notification', (txt) => {
            console.log('notifiaction',txt)
            if (txt.data.type == 'rideCanceled') {
                ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
                ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
                alert('Customer Canceled The Job!')
                PushNotification.cancelAllLocalNotifications()
                navigation.navigate('TravelHistory')
                
            }
        })
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state inside main useeffect: ', remoteMessage.notification)
                if (remoteMessage.data.type == 'rideCanceled') {
                    ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
                    alert('Customer Canceled The Job!')
                    PushNotification.cancelAllLocalNotifications()
                    navigation.navigate('TravelHistory')
                    
                }
            }
        })
    }, []);

    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    let { width, height } = Dimensions.get('window');
    const [coordinates, setCoordinates] = useState([
        {
            latitude: 37.3317876,
            longitude: -122.0054812,
        },
        {
            latitude: 37.771707,
            longitude: -122.4053769,
        },
    ]);

    const [PickDropDetails, setPickDropDetails] = useState('');

    const [noMoreJobs, setNoMoreJobs] = useState(false);

    const [fromCordinates, setFromCordinates] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [toCordinates, setToCordinates] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.003372395186460153,
        longitudeDelta: 0.0019201263785362244,
    });
    const [driverId, setDriverId] = useState();

    const loading = useSelector((state) => state.pickDropDetails.runLoader)
    const data = useSelector((state) => state.pickDropDetails.data)
    const error = useSelector((state) => state.pickDropDetails.error)
    const dispatch = useDispatch();

    const [locationPermissions, setLocationPermissions] = useState();

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                setLocationPermissions(true)
            } else {
                console.log("Camera permission denied");
                // (console.log(granted))
                setLocationPermissions(false)
            }
        } catch (err) {
            ToastAndroid.show(err.message)
            // console.warn(err);
        }
    };
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/background/) &&
                nextAppState === "active"
            ) {
                navigation.replace('TravelHistory')
                console.log("App has come to the foreground!");
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
            if (appState.current == 'background') {
                navigation.replace('TravelHistory')
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const [displayView, setDisplayView] = useState(false)
    useEffect(() => {
        console.log('noj ob', data)
        if (!loading && data != null) {
            if (data == 'error') {
                console.log('noj ob', data)
                setDisplayView(false)
                setNoMoreJobs(true)
            }
            else {
                setDisplayView(true)
            }
            setCoordinates(
                {
                    latitude: data.from_latitude,
                    longitude: data.from_longitude,
                },
                {
                    latitude: data.to_latitude,
                    longitude: data.to_longitude
                }
            )
            setFromCordinates({
                latitude: Number(data.from_latitude),
                longitude: Number(data.from_longitude),
            })
            setToCordinates({
                latitude: Number(data.to_latitude),
                longitude: Number(data.to_longitude),
            })
            setPickDropDetails(data)
        }
        else if (!loading && error != null) {
            //code for error message display 
            alert('Credentials are Wrong')
        }
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0016185867283340372,
                longitudeDelta: 0.0009847059845924377,
            });

            Geocoder.init('AIzaSyAbmXsLJF-4QhiKTNK204wFcNUxs_4akC8')
            Geocoder.from(crd.latitude, crd.longitude)
                .then(json => {
                    console.log('full location is', json.results[0].formatted_address)
                })
                .catch(error => console.warn(error));
        })
    }, [loading]);

    const [customStarRating, setCustomStarRating] = useState(4);

    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }
    const mapRef = useRef();
    const [loaderResponse, setLoaderResponse] = useState(false);
    const responseLoading = useSelector((state) => state.acceptOrReject.runLoader)
    const responseData = useSelector((state) => state.acceptOrReject.data)
    const responseError = useSelector((state) => state.acceptOrReject.error)
    const responseDispatch = useDispatch();

    const [goToNext, setGoToNext] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setGoToNext(false)
        });
        return unsubscribe;
    }, [navigation])
    useEffect(() => {
        setLoaderResponse(responseLoading)
        if (!responseLoading && responseData != null) {
            if ((responseData.message == 'You have accept the job offer')) {
                ClientLayer.getInstance().getDataManager().SaveValueForKey('incomingRideData', JSON.stringify(responseData.data))
                if (goToNext == true) {
                    navigation.replace('JobAcceptance', {
                        paramAccpetance: responseData.data
                    })
                }
            }
            else if (responseData.message == 'New job assign') {
                setPickDropDetails(responseData.data.nextjob)
                setFromCordinates({
                    latitude: Number(responseData.data.nextjob.from_latitude),
                    longitude: Number(responseData.data.nextjob.from_longitude),
                })
                setToCordinates({
                    latitude: Number(responseData.data.nextjob.to_latitude),
                    longitude: Number(responseData.data.nextjob.to_longitude),
                })
            }
            else if (responseData.message == 'No more job') {
                setDisplayView(false)
                setNoMoreJobs(true)
            }
            else if (responseData.message == 'No Job Id available') {
                alert('Job Has been Assigned')
            }
            else if (responseData.message == 'This job already assigned to driver') {
                alert(responseData.message)
            }
        }
        else if (!responseLoading && responseError != null) {
            console.log(responseData)
            //code for error message display 
            alert('Credentials are Wrong')
        }
    }, [responseLoading])

    const sendResponse = (number) => {
        onResetTravelHistory()
        setGoToNext(true)
        ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify('accepted'))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify('jobAcceptance'))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('job_id', JSON.stringify(PickDropDetails.job_id))
        responseDispatch(ResponsetoCustomer(
            {
                job_id: PickDropDetails.job_id,
                status: number,
            }
        ))
    }
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={modalVisible}
            >
                <View style={{ flex: 1, margin: '2.5%', borderRadius: 5, marginVertical: '10%', backgroundColor: Colors.getLightColor('verticalLineColor') }}>
                    <Text style={styles.tripText}>
                        Incoming Ride
                    </Text>
                    {displayView ?
                        (
                            <View style={{ flex: 1 }}>
                                <View style={styles.mapImageView}>
                                    {locationPermissions ?
                                        (
                                            <MapView
                                                toolbarEnabled={true}
                                                provider='google'
                                                ref={mapRef}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                zoomEnabled={true}
                                                initialRegion={position}
                                                showsCompass={true}
                                                scrollEnabled={true}
                                                rotateEnabled={true}
                                                maxZoomLevel={17.5}
                                                loadingEnabled
                                                onPress={(txt) => {
                                                    // console.log('place information is', txt)
                                                }}
                                            >
                                                <Marker
                                                    tracksViewChanges={false}
                                                    title={PickDropDetails.from}
                                                    coordinate={
                                                        {
                                                            latitude: fromCordinates.latitude,
                                                            longitude: fromCordinates.longitude,
                                                        }
                                                    }
                                                >
                                                    <MaterialCommunityIcons name='map-marker' size={20} color={Colors.getLightColor('whiteColor')}
                                                        style={{
                                                            padding: '2%', backgroundColor: Colors.getLightColor('primaryColor'),
                                                            borderRadius: 25
                                                        }} />
                                                </Marker>

                                                <Marker
                                                    title={PickDropDetails.to}
                                                    coordinate={{
                                                        latitude: toCordinates.latitude,
                                                        longitude: toCordinates.longitude,
                                                    }}
                                                >

                                                    <Fontisto name='car'
                                                        size={17} color='white' style={{
                                                            padding: '2%', backgroundColor: Colors.getLightColor('primaryColor'),
                                                            borderRadius: 25
                                                        }} />
                                                </Marker>

                                                <View>
                                                    {Object.keys(PickDropDetails).length > 0 && (
                                                        <MapViewDirections
                                                            origin={
                                                                {
                                                                    latitude: Number(PickDropDetails.from_latitude),
                                                                    longitude: Number(PickDropDetails.from_longitude),
                                                                    latitudeDelta: 0.0922,
                                                                    longitudeDelta: 0.0421
                                                                }
                                                            }
                                                            destination={
                                                                {
                                                                    latitude: Number(PickDropDetails.to_latitude),
                                                                    longitude: Number(PickDropDetails.to_longitude),
                                                                    latitudeDelta: 0.0922,
                                                                    longitudeDelta: 0.0421
                                                                }
                                                            }
                                                            apikey={'AIzaSyAbmXsLJF-4QhiKTNK204wFcNUxs_4akC8'}
                                                            strokeWidth={2}
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
                                                        />)}
                                                </View>
                                            </MapView>

                                        )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => getPermissions()}
                                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.tripText}>
                                                    Please Allow GPS Location
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>

                                <View style={styles.bottomMainView}>
                                    <View style={styles.userDetailsView}>
                                        <View style={styles.userdetailsText}>
                                            <Text style={styles.usernameText}>
                                                Usman Bhatti
                                            </Text>
                                            <View style={styles.ratingNumber}>
                                                <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                                    3KM
                                                </Text>
                                                <View style={styles.profileVerticalLine} />
                                                <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                                    {customStarRating}.00 {' '}
                                                </Text>
                                                <StarRating
                                                    style={{ alignSelf: 'center', }}
                                                    rating={customStarRating}
                                                    onChange={(rating) => {
                                                        onStarRatingPress(rating)
                                                        console.log(rating)
                                                    }}
                                                    maxStars={5}
                                                    minRating={1}
                                                    starSize={13}
                                                    enableHalfStar={false}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', }}>
                                            <Text style={styles.priceText}>
                                                {PickDropDetails.price}Pkr
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.locationsView}>
                                        <View style={styles.IconsView}>
                                            <Octicons name='dot-fill' size={25} color="#0887FC"
                                                style={styles.dotIcon}
                                            />
                                            <View style={styles.verticalLine} />
                                            <Fontisto name='rectangle' color={Colors.getLightColor('blackColor')} style={styles.rectangleIcon}>
                                            </Fontisto>
                                        </View>
                                        <View style={styles.textualView}>
                                            <View>
                                                <Text style={styles.locationText}>
                                                    Pick From
                                                </Text>
                                                <Text style={{ color: Colors.getLightColor('primaryColor') }}>
                                                    {PickDropDetails.from}
                                                </Text>
                                            </View>

                                            <View>
                                                <Text style={styles.locationText}>
                                                    Destination
                                                </Text>
                                                <Text style={{ color: Colors.getLightColor('primaryColor') }}
                                                >
                                                    {PickDropDetails.to}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.acceptRejectView} >
                                        {loaderResponse ?
                                            (
                                                <View style={styles.loaderView}>
                                                    <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                                </View>
                                            )
                                            :
                                            (
                                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                    {loaderResponse ?
                                                        (
                                                            <View style={styles.loaderView}>
                                                                <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                                            </View>
                                                        )
                                                        :
                                                        (
                                                            <View style={styles.acceptRejectInnerView}>
                                                                {/* <TouchableOpacity
                                                                    // onPress={() => {
                                                                    //     // setModalVisible(false)
                                                                    //     // navigation.goBack()
                                                                    //     // sendResponse(4)
                                                                    // }}
                                                                    style={styles.rejectOpacity}>
                                                                    <Text style={styles.acceptRejectText}>
                                                                        Reject
                                                                    </Text>
                                                                </TouchableOpacity> */}

                                                                <TouchableOpacity onPress={() => {
                                                                    sendResponse(1)
                                                                }}
                                                                    style={styles.acceptOpacity}>
                                                                    <Text style={styles.acceptRejectText}>
                                                                        Go
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>
                            </View>
                        )
                        :
                        (
                            <View style={styles.noMoreJObView}>
                                {noMoreJobs ?
                                    (
                                        <View style={styles.noMoreJObChildView}>
                                            <Text style={styles.tripText}>
                                                No More Jobs
                                            </Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <View>
                                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                        </View>
                                    )}
                            </View>
                        )}
                </View>
            </Modal>
        </View>
    )
};
export default IncomingRides;