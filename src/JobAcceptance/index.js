import { Dimensions, View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, Modal, AppState } from 'react-native'
import React, { Component, useState, useEffect, Alert, useRef } from 'react';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../utility/colors/Colors';
import StarRating from 'react-native-star-rating-widget';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';

import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import CustomeHeader from '../customeHeader';
import CustomBackArrow from '../CustomBackArrow';
import ClientLayer from '../../components/Layers/ClientLayer';
import { onResetRideStarted, RideStarted } from '../../store/Actions/DriverArrived/RideStartedFromDriver';
import { RideCompleted } from '../../store/Actions/RideCompleted/rideCompleted';
import { onResetIncomingRide } from '../../store/Actions/getPickandDropLocations/getPickandDropDetails';
import { onResetTravelHistory } from '../../store/Actions/getTravelHistory/DriverTravelHistory';
import { useNavigation } from '@react-navigation/native';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import messaging from '@react-native-firebase/messaging';

const JobAcceptance = ({ route }) => {
    const navigation = useNavigation()
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
    const [rideStatus, setRideStatus] = useState('');

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                navigation.navigate('TravelHistory')
                console.log("App has come to the foreground!");
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
            if (appState.current == 'background') {
                navigation.navigate('TravelHistory')
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const [PickDropDetails, setPickDropDetails] = useState('');

    const [locations, setLocations] = useState();


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
    useEffect(() => {
        RNPusherPushNotifications.on('notification', (txt) => {
            setCanCancelJob(true)
            console.log('notifiaction', NotificationData(txt))
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', result => {
            let isStarted = JSON.parse(result)
            if (isStarted == 'jobAcceptance') {
                setRideStatus('OnGoing Ride')
            }
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('started', result => {
            let isStarted = JSON.parse(result)
            if (isStarted == 'C') {
                setStartOrComplete('C')
            } else {
                setStartOrComplete('S')
            }
        })

        ClientLayer.getInstance().getDataManager().GetValueForKey('incomingRideData', result => {
            let params = JSON.parse(result)
            setFromCordinates({
                latitude: Number(params.from_latitude),
                longitude: Number(params.from_longitude),
            })
            setToCordinates({
                latitude: Number(params.to_latitude),
                longitude: Number(params.to_longitude),
            })
            setPickDropDetails(params)
        })
        // setFromCordinates({
        //     latitude: Number(route.params.paramAccpetance.from_latitude),
        //     longitude: Number(route.params.paramAccpetance.from_longitude),
        // })
        // setToCordinates({
        //     latitude: Number(route.params.paramAccpetance.to_latitude),
        //     longitude: Number(route.params.paramAccpetance.to_longitude),
        // })
        // setPickDropDetails(route.params.paramAccpetance)
    }, []);
    const [canCancelJob, setCanCancelJob] = useState(false)
    const NotificationData = (txt) => {
        console.log('notification data of job acceptance is', txt)
        if (txt.data.type == 'rideCanceled') {
            ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
            ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
            ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
            alert('Customer Canceled The Job!')
            navigation.navigate('TravelHistory')
        }
    }

    const [customStarRating, setCustomStarRating] = useState(3);
    const [Click, setClick] = useState(false)
    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }
    const mapRef = useRef();


    const [startOrComplete, setStartOrComplete] = useState('S');
    const [rideStartedLoader, setRideStartedLoader] = useState(false)
    const startLoading = useSelector((state) => state.rideStarted.runLoader)
    const startData = useSelector((state) => state.rideStarted.data)
    const startError = useSelector((state) => state.rideStarted.error)
    const startDispatch = useDispatch();
    const _rideStarted = () => {
        setGoToNextStarted(true)
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('job_id', Jobid => {
                let driverId = JSON.parse(result)
                let jobId = JSON.parse(Jobid)
                startDispatch(RideStarted({
                    driver_id: JSON.parse(driverId),
                    job_id: jobId,
                    status: 2,
                }))
            })
        })

    }
    useEffect(() => {
        setRideStartedLoader(startLoading)
        if (!startLoading && startData != null) {
            if (goToNextStarted == true) {
                alert(startData.message)
                setStartOrComplete('C')
                ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify('C'))
            }
        }
        else if (!startLoading && startError != null) {
            alert('Credentials are Wrong')
        }
    }, [startLoading])


    const comepletedLoading = useSelector((state) => state.rideCompleted.runLoader)
    const comepletedData = useSelector((state) => state.rideCompleted.data)
    const comepletedError = useSelector((state) => state.rideCompleted.error)
    const comepletedDispatch = useDispatch();
    const [rideCompletedLoader, setRideCompletedLoader] = useState(false)


    const [goToNext, setGoToNext] = useState(false);
    const [goToNextStarted, setGoToNextStarted] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setGoToNext(false)
            setGoToNextStarted(false)
            onResetRideStarted()
            setCanCancelJob(false)
            // navigation.navigate('TravelHistory')
        });
        return unsubscribe;
    }, [navigation]);
    const _rideComepleted = async () => {
        setGoToNext(true)
        ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
        ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('job_id', Jobid => {
                let driverId = JSON.parse(result)
                let jobId = JSON.parse(Jobid)
                comepletedDispatch(RideCompleted({
                    driver_id: JSON.parse(driverId),
                    job_id: jobId,
                    status: 3,
                }))
            })
        })
    }
    useEffect(() => {
        setRideCompletedLoader(comepletedLoading)
        if (!comepletedLoading && comepletedData != null) {
            if (goToNext == true) {
                alert(comepletedData.message)
                navigation.navigate('TravelHistory')
                ClientLayer.getInstance().getDataManager().RemoveKey('job_id')
            }
        }
        else if (!comepletedLoading && comepletedError != null) {
            alert('Credentials are Wrong', comepletedError)
        }
    }, [comepletedLoading])

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <CustomeHeader
                    label={"Ride Started"}
                    leftIcon={
                        <CustomBackArrow></CustomBackArrow>
                    }
                    userorDriverProfile={'ProfileScreen'}
                    book_id={`Booking Id: ${PickDropDetails.job_booking_id}`}
                    screen_icon={
                        <AntDesign name='forward' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    rideStatus={rideStatus}
                    screen_name={'Ride Accepted'}
                    screen_info={`Here you can see the following details of your Accepted Trips ${'\n'} 
                    1 : Trip Destination${'\n'}
                    2 : Customer Name${'\n'}
                    3 : Total Distance of Trip${'\n'}
                    4 : Total Amount of Trip${'\n'}
                    5 : Start And Arrived Rides${'\n'}
                    6 : Booking Ids of your Trips`
                    }
                >
                </CustomeHeader>

                <View style={styles.mapImageView}>
                    <MapView
                        toolbarEnabled={true}
                        provider='google'
                        ref={mapRef}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        zoomEnabled={true}
                        // showsUserLocation={true}
                        initialRegion={position}
                        showsCompass={true}
                        scrollEnabled={true}
                        // zoomEnabled={true}
                        rotateEnabled={true}
                        maxZoomLevel={17.5}
                        // region={position}
                        loadingEnabled
                        onPress={(txt) => {
                            console.log('place information is', txt)
                        }}>
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
                                style={styles.fromMarker} />
                        </Marker>

                        <Marker
                            title={PickDropDetails.to}
                            coordinate={{
                                latitude: toCordinates.latitude,
                                longitude: toCordinates.longitude,
                            }}

                        >

                            <Fontisto name='car'
                                size={17} color='white' style={styles.fromMarker} />
                        </Marker>

                        <View>
                            {Object.keys(PickDropDetails).length > 0 &&
                                (
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
                                )
                            }

                        </View>
                    </MapView>
                </View>



                <View style={styles.userProfileContainer}>

                    <View style={styles.userDetailsView}>
                        <View style={styles.userdetailsText}>
                            <Text style={styles.usernameText}>
                                {/* {PickDropDetails.username} */}
                                Usman Bhatti
                            </Text>
                            <View style={styles.ratingNumber} pointerEvents='none'>
                                <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                    {PickDropDetails.distance}KM Away
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
                            <Text style={styles.ridestartedText}>
                                Ride Started
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', }}>
                            <Text style={styles.priceText}>
                                {PickDropDetails.price}Pkr
                            </Text>
                        </View>
                    </View>

                    <View style={styles.locationsView}>
                        <View style={styles.destinationView}>
                            <View>
                                <View style={styles.destinationInnerView}>
                                    <Text style={styles.locationText}>
                                        Destination
                                    </Text>
                                    <Text style={styles.locationText}>
                                        {PickDropDetails.distance}KM
                                    </Text>
                                </View>
                                <Text style={styles.locationText}>
                                    {PickDropDetails.to}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.startArriveView}>
                        {startOrComplete == 'S' ?
                            (
                                <View>
                                    {rideStartedLoader ?
                                        (
                                            <View style={styles.indicatorView}>
                                                <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')}></ActivityIndicator>
                                            </View>
                                        )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => {
                                                _rideStarted()
                                            }
                                            }
                                                style={styles.startRideOpacity}>
                                                <Text style={styles.acceptRejectText}>
                                                    Start Ride
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            )
                            :
                            (
                                <View>
                                    {rideCompletedLoader ?
                                        (
                                            <View style={styles.indicatorView}>
                                                <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')}></ActivityIndicator>
                                            </View>
                                        )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => {
                                                onResetIncomingRide()
                                                onResetTravelHistory()
                                                _rideComepleted()
                                            }
                                            }
                                                style={styles.ArrivedOpacity}>
                                                <Text style={styles.acceptRejectText}>
                                                    Completed
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default JobAcceptance;