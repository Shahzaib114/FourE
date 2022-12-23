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
import { CustomerCancelingBookedRide, onResetCustomerCancelingBookedRide } from '../../../store/Actions/customerCancelSchedRide/CustomerCancelBookRide';

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

const CustomerCancelRide = ({ route }) => {
    const navigation = useNavigation()
    const [netModalVisible, setNetModalVisible] = useState(false)
    const [dateAdded, setDateAdded] = useState('')
    const [cancelLoader, setCancelLoader] = useState(false);
    const renderItem = ({ item }) => {
        const backgroundColor = item.type_id === selectedId ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('greyColor');
        const color = item.type_id === selectedId ? Colors.getLightColor('whiteColor') : Colors.getLightColor('blackColor');
        return (
            <View>
                <Item
                    item={item}
                    // onPress={() => {
                    //     _checkInternetBrforeRidePick(item)
                    // }}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </View>
        );
    };
    const [estimatedTime, setEstimatedTime] = useState('');
    const [rideFare, setRideFare] = useState('');
    const [rideDistance, setRideDistance] = useState('');

    let { width, height } = Dimensions.get('window');
    const [currentLocationLabel, setCurrentLocationLabel] = useState('');
    const [destinationLabel, setdestinationLabel] = useState('');
    const [PickDropDetails, setPickDropDetails] = useState();


    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);

    const loading = useSelector((state) => state.customerServices.runLoader)
    const data = useSelector((state) => state.customerServices.data)
    const error = useSelector((state) => state.customerServices.error)
    const dispatch = useDispatch();
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

    const markerRef = useRef();
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
        getPermissions()
        dispatch(getCustomerServiceTypes())
        let rideDetails = route.params.rideParam
        setFromCordinates({
            latitude: Number(rideDetails[0].from_latitude),
            longitude: Number(rideDetails[0].from_longitude),
            latitudeDelta: 0.0016185867283340372,
            longitudeDelta: 0.0009847059845924377,
        })
        setToCordinates({
            latitude: Number(rideDetails[0].to_latitude),
            longitude: Number(rideDetails[0].to_longitude),
            latitudeDelta: 0.0016185867283340372,
            longitudeDelta: 0.0009847059845924377,
        })
        setdestinationLabel(rideDetails[0].to)
        setCurrentLocationLabel(rideDetails[0].from)
        setSelectedId(rideDetails[0].service_id)
        let myDate = rideDetails[0].date
        setDateAdded(moment(myDate).format('MMMM Do YYYY, hh:mm a'))
        setPickDropDetails(rideDetails)
        setRideFare(rideDetails[0].price)
        setRideDistance(rideDetails[0].distance)
        setEstimatedTime(rideDetails[0].duration)
    }, []);

    const [locationPermissions, setLocationPermissions] = useState();

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLocationPermissions(true)
            } else {
                setLocationPermissions(false)
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [cancelRideCond, setCancelRideCond] = useState(false)
    const cancelLoading = useSelector((state) => state.customerCancelSchedRide.runLoader)
    const cancelData = useSelector((state) => state.customerCancelSchedRide.data)
    const cancelError = useSelector((state) => state.customerCancelSchedRide.error)
    const cancelDispatch = useDispatch();
    const _cancelRide = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
                setIsSchedule(true)
            } else {
                setCancelRideCond(true)
                cancelDispatch(CustomerCancelingBookedRide({
                    job_id: route.params.rideParam[0].job_id,
                    is_cancle: 1,
                }))
            }
        })
    }
    useEffect(() => {
        setCancelLoader(cancelLoading)
        if (!cancelLoading && cancelData != null) {
            if (cancelRideCond) {
                console.log('data of cancel', cancelData)
                navigation.goBack()
            }
        }
        else if (!cancelLoading && cancelError != null) {
            //code for error message display 
            ToastAndroid.showWithGravityAndOffset(error,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50)
            // alert('Credentials are Wrong')
        }
    }, [cancelLoading])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setCancelRideCond(false)
            onResetCustomerCancelingBookedRide()
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);


    const mapRef = useRef();
    return (
        <View style={styles.container}>

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
                    label={"Scheduled Ride"}
                    leftIcon={
                        <CustomBackArrow />
                    }
                    book_id={`Booking Id: ${route.params.rideParam[0].job_booking_id}`}
                    userorDriverProfile={'CustomerProfileScreen'}
                    screen_icon={
                        <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    screen_name={'Future Ride Details'}
                    screen_info={`Here you can see the following details of Your Future Ride${'\n'} 
                1 : Booking Id of your Trip${'\n'}
                2 : Trip Starting Lcoation${'\n'}
                3 : Trip Ending Location${'\n'}
                5 : Trip Date${'\n'}
                4 : Ride Type ${'\n'}
                5 : Trip Payment${'\n'}
                5 : Estimated time to complete trip${'\n'}
                5 : Trip distance${'\n'}`
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
                                initialRegion={position}
                                showsCompass={true}
                                scrollEnabled={true}
                                rotateEnabled={true}
                                maxZoomLevel={17.5}
                                loadingEnabled
                                onPress={(txt) => {
                                    console.log('place information is', txt)
                                }}>
                                <Marker
                                    title={currentLocationLabel}
                                    coordinate={
                                        {
                                            latitude: Number(fromCordinates.latitude),
                                            longitude: Number(fromCordinates.longitude)
                                        }
                                    }
                                >
                                    <MaterialCommunityIcons name='map-marker' size={20} color={Colors.getLightColor('whiteColor')}
                                        style={styles.fromMarker} />
                                </Marker>
                                <Marker
                                    title={destinationLabel}
                                    coordinate={toCordinates}>
                                    <Fontisto name='car'
                                        size={17} color='white' style={styles.fromMarker} />
                                </Marker>
                                <View>
                                    <MapViewDirections
                                        origin={
                                            fromCordinates
                                        }
                                        destination={
                                            toCordinates
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

                    <View
                        style={{
                            alignSelf: 'flex-end',
                            marginHorizontal: '5%', marginVertical: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'
                        }}>
                        <View>
                            <Text style={{
                                color: Colors.getLightColor('blackColor'),
                                fontSize: 15,
                                fontFamily: 'Montserrat-Medium',

                            }}>
                                {dateAdded}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.currentLocationParentView}>
                        <Ionicons name='location' size={30} color={Colors.getLightColor('blackColor')}
                            style={styles.currentMarkerIcon} />
                        <Text
                            style={styles.currentLocText}>
                            {currentLocationLabel}
                        </Text>
                    </View>
                    <View style={styles.destinationLocParentView}>
                        <FontAwesome name='location-arrow' size={30} color={Colors.getLightColor('blackColor')}
                            style={styles.destinationMarkerIcon} />
                        <Text
                            style={styles.destinationParentText}>
                            <Text style={styles.destinationChildText}>
                                {destinationLabel}
                            </Text>
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
                    <View style={styles.fareMainView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.fareText}>
                                Fare : {rideFare} Pkr {'('} ~ {estimatedTime} {')'}
                            </Text>
                            <Text style={styles.distanceText}>
                                {rideDistance}KM
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {cancelLoader ?
                            (
                                <View style={styles.indicator}>
                                    <ActivityIndicator size={'large'} color={Colors.getLightColor('mustardColor')}></ActivityIndicator>
                                </View>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => _cancelRide()}
                                    style={styles.deleteBookingOpacity}>
                                    <Text style={styles.confrimBookingText}>
                                        Cancel Ride
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={styles.confrimBookingOpacity}>
                            <Text style={styles.confrimBookingText}>
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CustomerCancelRide