import { Dimensions, View, Text, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, Modal, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import CustomBackArrow from '../../CustomBackArrow';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getCustomerServiceTypes } from '../../../store/Actions/getCustomerServiceTypes/ServiceTypes';
import Colors from '../../../utility/colors/Colors';
import { gettingPickandDropFares } from '../../../store/Actions/getPickandDropFare/pickandDropFare';
import ClientLayer from '../../../components/Layers/ClientLayer';
import { ConfirmingCustomerBooking, onResetCurrentRide } from '../../../store/Actions/CustomerBookingConfirmation/ConfirmBooking';
import { useNavigation } from '@react-navigation/native';
import CustomerHeader from '../CustomerHeader';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DatePicker from 'react-native-date-picker'
import moment from "moment";
import { now } from 'moment/moment';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <View style={{
        width: Dimensions.get('window').width * 0.25,
        // height: Dimensions.get('window').height * 0.08
    }}>
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Image
                style={{
                    width: '100%',
                    height: '60%',
                    alignSelf: 'center'
                }}
                source={{
                    uri: item.ride_pic_path
                }}
            />
            <Text style={[styles.title, textColor]}>{item.name}</Text>
        </TouchableOpacity>
    </View>
)

const PickDropDetails = ({ route }) => {
    const navigation = useNavigation()
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


    ]

    const [goToNext, setGoToNext] = useState(false);
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            onResetCurrentRide()
            setGoToNext(false)
        })
        return unsubscribe;
    }, [navigation]);

    const [netModalVisible, setNetModalVisible] = useState(false)

    const ValidationCheck = () => {
        setGoToNext(true)
        if ((destinationLabel.length == 0) || (selectedId == null)) {
            alert('Please Enter Correct Details!')
        }
        else {
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                } else {
                    ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
                        let customerId = JSON.parse(result)
                        confirmationBookingDispatch(ConfirmingCustomerBooking({
                            addressFrom: currentLocationLabel,
                            addressTo: destinationLabel,
                            service_id: JSON.parse(selectedId),
                            customer_id: JSON.parse(customerId),
                            comments: 'This is confirmation of Booking from Customer',
                        }))
                    })
                }
            })

        }
    }

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateAdded, setDateAdded] = useState('')
    const [minimumDate, setMinimumDate] = useState()

    const confirmationLoading = useSelector((state) => state.confirmBooking.runLoader)
    const confirmationData = useSelector((state) => state.confirmBooking.data)
    const confirmationError = useSelector((state) => state.confirmBooking.error)
    const [confirmationLoader, setConfirmationLoader] = useState(false);
    const confirmationBookingDispatch = useDispatch();
    useEffect(() => {
        setConfirmationLoader(confirmationLoading)
        if (!confirmationLoading && confirmationData != null) {
            if (confirmationData.success) {
                if (confirmationData.message == "Driver not available") {
                    alert(confirmationData.message)
                }
                else if (goToNext == true) {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify('OTW'))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(confirmationData.data))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(currentLocationLabel))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(destinationLabel))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('currentRidePrice', JSON.stringify(rideFare))
                    navigation.replace('CurrentRideDetails',
                        {
                            paramData: confirmationData.data,
                            paramFrom: currentLocationLabel,
                            paramTo: destinationLabel
                        })
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_id_RideDetails', confirmationData.data.find_driver.driver_id)
                }
            }
        }
        else if (!confirmationLoading && confirmationError != null) {
            alert('Credentials are Wrong')
        }
    }, [confirmationLoading]);

    const renderItem = ({ item }) => {
        const backgroundColor = item.type_id === selectedId ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('greyColor');
        const color = item.type_id === selectedId ? Colors.getLightColor('whiteColor') : Colors.getLightColor('blackColor');
        return (
            <View>
                <Item
                    item={item}
                    onPress={() => {
                        _checkInternetBrforeRidePick(item)
                    }}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </View>
        );
    };

    const _checkInternetBrforeRidePick = async (item) => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                if (destinationLabel.length == 0) {
                    get_Fare()
                }
                else if (destinationLabel.length != 0) {
                    setSelectedId(item.type_id)
                    get_Fare(item.type_id)
                }
            }
        })
    }

    const fareLoading = useSelector((state) => state.fromandToFare.runLoader)
    const fareData = useSelector((state) => state.fromandToFare.data)
    const fareError = useSelector((state) => state.fromandToFare.error)
    const [fareLoader, setFareLoader] = useState(false);
    const fareDispatch = useDispatch();
    const [pickandDropFare, setPickandDropFare] = useState('');
    const [rideFare, setRideFare] = useState('');

    useEffect(() => {
        setFareLoader(fareLoading)
        if (!fareLoading && fareData != null) {
            setPickandDropFare(fareData.data)
            console.log('fare is', fareData.data.fare)
            setRideFare(fareData.data.fare)
        }
        else if (!fareLoading && fareError != null) {
            alert('Credentials are Wrong')
        }
    }, [fareLoading]);

    const get_Fare = (id) => {
        if (destinationLabel.length == 0) {
            alert('please Add Destination Location !')
        }
        else {
            fareDispatch(gettingPickandDropFares({
                addressFrom: currentLocationLabel,
                addressTo: destinationLabel,
                service_id: id,
            }))
        }
    }

    let { width, height } = Dimensions.get('window');
    const [currentLocationLabel, setCurrentLocationLabel] = useState('');
    const [destinationLabel, setdestinationLabel] = useState('');
    const [currentLocSelected, setCurrentLocSelected] = useState(false);
    const [destinationLocSelected, setSestinationLocSelected] = useState(false);

    const [PickDropDetails, setPickDropDetails] = useState('');

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
    const [destination, setDestination] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [serviceName, SetServiceName] = useState('');
    const [locationPermissions, setLocationPermissions] = useState();

    const loading = useSelector((state) => state.customerServices.runLoader)
    const data = useSelector((state) => state.customerServices.data)
    const error = useSelector((state) => state.customerServices.error)
    const dispatch = useDispatch();
    const [mapCoords, setMapCoords] = useState(
        new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        })
    )
    const markerRef = useRef();

    useEffect(() => {
        setMinimumDate(moment().calendar())
        console.log('LLL is', moment().calendar())
        getPermissions()
        dispatch(getCustomerServiceTypes())
    }, []);

    const getCurrentLocation = async () => {
        await Geolocation.getCurrentPosition((pos) => {
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
                    // console.log('full location is', json.results[0].formatted_address)
                    setCurrentLocationLabel(json.results[0].formatted_address)
                })
                .catch(error =>
                    ToastAndroid.showWithGravityAndOffset(error.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50)
                )
        })

    }
    async function getPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLocationPermissions(true)
                getCurrentLocation()
            } else {
                setLocationPermissions(false)
            }
        } catch (err) {
            console.log(err)
        }
    };
    const updateLiveLocation = async () => {
        await Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setMapCoords({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0016185867283340372,
                longitudeDelta: 0.0009847059845924377,
            })
            animate(crd.latitude, crd.longitude)
            Geocoder.init('AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM')
            Geocoder.from(crd.latitude, crd.longitude)
                .then(json => {
                    // console.log('full location is', json.results[0].formatted_address)
                    setDriverLocation(json.results[0].formatted_address)
                })
                .catch(error => console.log(error));
        })
    }
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000)
            }
        } else {
            mapCoords.timing(newCoordinate).start();
        }
    }

    const [driverLocation, setDriverLocation] = useState('');

    useEffect(() => {
        if (!loading && data != null) {
            setServiceTypes(data)
        }
        else if (!loading && error != null) {
            //code for error message display 
            ToastAndroid.showWithGravityAndOffset(error,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50)
            // alert('Credentials are Wrong')
        }
    }, [loading])


    const mapRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [destinationModalVisible, setDestinationModalVisible] = useState(false);

    const _checkInternetBrforeCurrent = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                setModalVisible(true)
            }
        })
    }


    const _checkInternetBrforeDestination = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                setDestinationModalVisible(true)
            }
        })
    }

    const [distanceKM, setDistanceKM] = useState();

    return (

        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={modalVisible}
                style={{ margin: 0 }}

            >
                <View style={{
                    flex: 1, justifyContent: 'space-between'
                }}>
                    <View style={styles.modalChildView}>
                        <Ionicons name='flag' size={25} color='black' style={{ marginHorizontal: '3%', marginVertical: '4%' }} />
                        <GooglePlacesAutocomplete
                            placeholder='Enter Pickup Location'
                            textInputProps={
                                {
                                    placeholderTextColor: Colors.getLightColor('blackColor'),
                                    clearButtonMode: 'never',
                                    autoFocus: true,
                                    clearTextOnFocus: true,
                                    onChangeText: (txt) => {
                                        console.log(txt)
                                    }
                                }
                            }
                            fetchDetails={true}
                            enableHighAccuracyLocation={true}
                            GooglePlacesSearchQuery={{ radius: 3000 }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            minLength={1}
                            styles={{
                                description: {
                                    color: Colors.getLightColor('blackColor'),
                                },
                                container: {
                                    height: '90%'
                                },
                                textInputContainer: {
                                    marginTop: '2%',
                                },
                                textInput: {
                                    color: Colors.getLightColor('blackColor')
                                },

                            }}
                            onPress={(data, details = null) => {
                                setPosition({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.0016185867283340372,
                                    longitudeDelta: 0.0009847059845924377,
                                })
                                setModalVisible(false)
                                setCurrentLocSelected(true)
                                setCurrentLocationLabel(data.description)
                                setPickandDropFare('')
                                setSelectedId(null)
                            }}
                            query={{
                                key: 'AIzaSyAbmXsLJF-4QhiKTNK204wFcNUxs_4akC8',
                                language: 'en',
                                radius: 3000,
                                location: `${position.latitude}, ${position.longitude}`
                            }}
                            onFail={error => console.error(error)}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        setModalVisible(false)
                        setSelectedId(null)
                        setPickandDropFare('')
                        getCurrentLocation()
                    }
                    } style={styles.useCurrentOpacity}>
                        <Text style={styles.useCurrentText}>
                            Use Current Location
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                visible={destinationModalVisible}
                style={{ margin: 0 }}
            >
                <View style={{
                    flex: 1, justifyContent: 'space-between',
                }}>
                    <View style={styles.modalChildView}>
                        <Ionicons name='flag' size={25} color='black' style={{ marginHorizontal: '3%', marginVertical: '4%' }} />
                        <GooglePlacesAutocomplete
                            placeholder='Enter Destination'
                            textInputProps={
                                {
                                    placeholderTextColor: Colors.getLightColor('blackColor'),
                                    clearButtonMode: 'unless-editing',
                                    clearTextOnFocus: true,
                                    contextMenuHidden: true,
                                    autoFocus: true,
                                    onChangeText: (txt) => {
                                        console.log(txt)
                                    }
                                }
                            }
                            fetchDetails={true}
                            enableHighAccuracyLocation={true}
                            GooglePlacesSearchQuery={{ radius: 3000 }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            minLength={1}
                            styles={{
                                description: {
                                    color: Colors.getLightColor('blackColor')
                                },
                                container: {
                                    height: '90%',
                                },
                                textInputContainer: {
                                    marginTop: '2%',
                                },
                                textInput: {
                                    color: Colors.getLightColor('blackColor')
                                },

                            }}
                            onPress={(data, details = null) => {
                                setdestinationLabel(data.description);
                                setDestination({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.0016185867283340372,
                                    longitudeDelta: 0.0009847059845924377,
                                })
                                setSestinationLocSelected(true)
                                setSelectedId(null)
                                setPickandDropFare('')
                                setDestinationModalVisible(false)
                                var R = 6378.137; // Radius of earth in KM
                                var dLat = details.geometry.location.lat * Math.PI / 180 - position.latitude * Math.PI / 180;
                                var dLon = details.geometry.location.lng * Math.PI / 180 - position.longitude * Math.PI / 180;
                                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                    Math.cos(position.latitude * Math.PI / 180) * Math.cos(details.geometry.location.lat * Math.PI / 180) *
                                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                var d = R * c; //d is distance in meters
                                setDistanceKM(d * 1000)
                            }}
                            query={{
                                key: 'AIzaSyAbmXsLJF-4QhiKTNK204wFcNUxs_4akC8',
                                language: 'en',
                                radius: 3000,
                                location: `${destination.latitude}, ${destination.longitude}`
                            }}
                            onFail={error => console.error(error)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setDestinationModalVisible(false)} style={styles.useCurrentOpacity}>
                        <Text style={styles.useCurrentText}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType='slide'
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
                    label={"Book a Ride"}
                    leftIcon={
                        <CustomBackArrow />
                    }
                    userorDriverProfile={'CustomerProfileScreen'}
                    screen_icon={
                        <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    screen_name={'Book a Ride'}
                    screen_info={`Here you can see the following details of Booking Your Ride${'\n'} 
                1 : Booking Id of your Trip${'\n'}
                2 : Trip Starting Lcoation${'\n'}
                3 : Trip Ending Location${'\n'}
                4 : Trip Amount ${'\n'}
                5 : Payment Method${'\n'}`
                    }
                ></CustomerHeader>
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
                                zoomEnabled={true}
                                showsUserLocation={true}
                                initialRegion={position}
                                showsCompass={true}
                                scrollEnabled={true}
                                rotateEnabled={true}
                                maxZoomLevel={17.5}
                                region={position}
                                loadingEnabled
                            >

                                <Marker
                                    tracksViewChanges={false}
                                    title={currentLocationLabel}
                                    coordinate={position}
                                >
                                    <MaterialCommunityIcons name='map-marker' size={20} color={Colors.getLightColor('whiteColor')}
                                        style={styles.currentPosMarker} />
                                </Marker>

                                {/* {MarkerAnimations.map((number) =>
                                    <Marker.Animated key={number.id}
                                        title={number.name}
                                        coordinate={{
                                            latitude: number.latitude,
                                            longitude: number.longitude,
                                            latitudeDelta: 0.003372395186460153,
                                            longitudeDelta: 0.0019201263785362244,
                                        }}>
                                        <Image source={require('../../../assets/Images/car.png')}
                                            style={{
                                                width: 35,
                                                height: 35, resizeMode: 'contain', backgroundColor: Colors.getLightColor('verticalLineColor'), borderRadius: 50,
                                                transform: [{
                                                    rotate: '45deg'
                                                }],
                                            }}
                                        >
                                        </Image>
                                    </Marker.Animated>
                                )} */}

                                {destinationLocSelected ?
                                    (
                                        <Marker
                                            title={destinationLabel}
                                            coordinate={destination}
                                        >
                                            <Fontisto name='car'
                                                size={17} color='white' style={styles.currentPosMarker} />
                                        </Marker>
                                    )
                                    :
                                    (
                                        null
                                    )
                                }

                                <View>
                                    {destinationLocSelected ?
                                        (
                                            <MapViewDirections
                                                origin={
                                                    position
                                                }
                                                destination={
                                                    destination
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
                                            />
                                        )
                                        :
                                        (
                                            null
                                        )
                                    }
                                </View>
                            </MapView>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={() => getPermissions()}
                            style={styles.allowGps}>
                            <Text style={styles.tripText}>
                                Please Allow GPS Location
                            </Text>
                        </TouchableOpacity>
                    )
                }

                <View style={styles.locationsTextMainView}>
                    <Modal
                        animationType='slide'
                        animationInTiming={1200}
                        visible={open}
                        transparent={true}
                    >
                        <View style={{
                            height: '50%',
                            marginTop: 'auto',
                            backgroundColor: Colors.getLightColor('verticalLineColor'),
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            justifyContent: 'space-around'
                            , alignItems: 'center'
                        }}>
                            <Text style={{
                                color: Colors.getLightColor('primaryColor'),
                                fontSize: 25,
                                fontFamily: 'Montserrat-Medium',
                                marginTop: '5%',

                            }}>
                                Confirm Your Schedule Ride
                            </Text>
                            <DatePicker
                                style={{
                                    backgroundColor: Colors.getLightColor('verticalLineColor'),
                                    width: Dimensions.get('window').width * 1,
                                    height: Dimensions.get('window').height * 0.2,
                                }}
                                open={open}
                                minimumDate={new Date(Date.now())}
                                date={date}
                                cancelText='Cancel'
                                textColor={Colors.getLightColor('primaryColor')}
                                androidVariant='iosClone'
                                dividerHeight={5}
                                onDateChange={(date) => {
                                    // console.log('changed is', date)
                                    setDateAdded(moment(date).format('LLL'))
                                    setDate(date)
                                    console.log('changed is', moment(date).format('LLL'))
                                }}
                                is24hourSource={'device'}
                                fadeToColor={Colors.getLightColor('verticalLineColor')}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                <TouchableOpacity onPress={() => {
                                    setDateAdded('')
                                    setOpen(false)
                                }}
                                    style={{
                                        backgroundColor: Colors.getLightColor('primaryColor'), width: '45%', alignItems: 'center',
                                        padding: '3%', borderRadius: 5
                                    }}>
                                    <Text style={{
                                        color: Colors.getLightColor('secondaryColor'),
                                        fontSize: 20,
                                        fontFamily: 'Montserrat-Medium',
                                    }}>
                                        Go Now
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    const now = moment()
                                    console.log('current date is', moment().format("MMM Do YY"))
                                    console.log('selected date is', moment(date).format("MMM Do YY"))
                                    if (moment(date).format("MMM Do YY") === moment().format("MMM Do YY")) {
                                        if (moment(date).format('LT') < moment().format('LT')) {
                                            console.log('less', dateAdded)
                                            alert('Please Select Date Again!')
                                        } else if (moment(date).format('LT') == moment().format('LT')) {
                                            alert('Your Scheduled Time is too soon, Please Select Date Again!')
                                        } else if (moment(date).format('LT') > moment().format('LT')) {
                                            setOpen(false)
                                        }
                                    } else {
                                        setOpen(false)
                                    }

                                    // console.log('current date is',Date.now())

                                }}
                                    style={{
                                        backgroundColor: Colors.getLightColor('primaryColor'), width: '45%', padding: '3%', alignItems: 'center',
                                        borderRadius: 5
                                    }}>
                                    <Text style={{
                                        color: Colors.getLightColor('secondaryColor'),
                                        fontSize: 20,
                                        fontFamily: 'Montserrat-Medium',
                                    }}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => setOpen(true)}
                        style={{
                            alignSelf: 'flex-end',
                            marginHorizontal: '5%', marginVertical: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'
                        }}>
                        {dateAdded === '' ?
                            (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <SimpleLineIcons style={{ alignSelf: 'center', }}
                                        name='calendar' size={15} color='black'>
                                    </SimpleLineIcons>
                                    <Text style={{
                                        marginHorizontal: '2.5%',
                                        alignSelf: 'flex-end',
                                        color: Colors.getLightColor('blackColor'),
                                        fontSize: 15,
                                        fontFamily: 'Montserrat-Medium',
                                    }}>
                                        Now
                                    </Text>
                                    <MaterialIcons style={{ alignSelf: 'center', }}
                                        name='keyboard-arrow-down' size={15} color='black'>
                                    </MaterialIcons>
                                </View>
                            )
                            :
                            (
                                <View>
                                    <Text style={{
                                        color: Colors.getLightColor('blackColor'),
                                        fontSize: 15,
                                        fontFamily: 'Montserrat-Medium',

                                    }}>
                                        {dateAdded}
                                    </Text>
                                </View>
                            )}

                    </TouchableOpacity>
                    <View style={styles.currentLocationParentView}>
                        <Ionicons name='location' size={30} color={Colors.getLightColor('blackColor')}
                            style={styles.currentMarkerIcon} />
                        <Text onPress={() => _checkInternetBrforeCurrent()}
                            style={styles.currentLocText}>
                            {currentLocationLabel}
                        </Text>
                    </View>
                    <View style={styles.destinationLocParentView}>
                        <FontAwesome name='location-arrow' size={30} color={Colors.getLightColor('blackColor')}
                            style={styles.destinationMarkerIcon} />
                        <Text onPress={() => _checkInternetBrforeDestination()}
                            style={styles.destinationParentText}>
                            {destinationLabel.length == 0 ?
                                (
                                    <Text style={styles.destinationChildText}>
                                        Enter Destination
                                    </Text>
                                )
                                :
                                (
                                    <Text style={styles.destinationChildText}>
                                        {destinationLabel}
                                    </Text>
                                )}

                        </Text>
                    </View>

                    <View style={styles.rideTypesMainView}>

                        {loading ?
                            (
                                <View style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    keyExtractor={(item, index) => {
                                        return index.toString();
                                    }}
                                    data={ServiceTypes}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderItem}
                                    extraData={selectedId}
                                />
                            )}
                    </View>

                    {fareLoader ?
                        (
                            <View style={styles.indicator}>
                                <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                            </View>
                        )
                        :
                        (
                            <View style={styles.fareMainView}>
                                <Text style={styles.fareText}>
                                    Fare : {pickandDropFare.fare} Pkr {'('} ~ {pickandDropFare.duration} {')'}
                                </Text>
                                <Text style={styles.distanceText}>
                                    {pickandDropFare.distance}KM
                                </Text>
                            </View>
                        )
                    }

                    <View>
                        {confirmationLoader ?
                            (
                                <View style={styles.indicator}>
                                    <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                </View>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => ValidationCheck()}
                                    style={styles.confrimBookingOpacity}>
                                    <Text style={styles.confrimBookingText}>
                                        Confirm Booking
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default PickDropDetails;