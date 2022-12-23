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

const CustomerEditRide = ({ route }) => {
    const navigation = useNavigation()
    const [rideSelected, setrideSelected] = useState(false)
    const [netModalVisible, setNetModalVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateAdded, setDateAdded] = useState('')
    const [fareLoader, setFareLoader] = useState(false);

    const [confirmationLoader, setConfirmationLoader] = useState(false);

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

    const [pickandDropFare, setPickandDropFare] = useState('');
    const [rideFare, setRideFare] = useState('');

   

    let { width, height } = Dimensions.get('window');
    const [currentLocationLabel, setCurrentLocationLabel] = useState('');
    const [destinationLabel, setdestinationLabel] = useState('');
    const [PickDropDetails, setPickDropDetails] = useState('');

   
    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [serviceName, SetServiceName] = useState('');

    const loading = useSelector((state) => state.customerServices.runLoader)
    const data = useSelector((state) => state.customerServices.data)
    const error = useSelector((state) => state.customerServices.error)
    const dispatch = useDispatch();

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
        console.log('data insdde is', route.params.rideParam)
        let rideDetails = route.params.rideParam
        console.log('ride details is', rideDetails[0].to_latitude)
        setFromCordinates({
            latitude: Number(rideDetails[0].from_latitude),
            longitude: Number(rideDetails[0].from_longitude),
            latitudeDelta: 0.0016185867283340372,
            longitudeDelta: 0.0009847059845924377,
        });
        setToCordinates({
            latitude: Number(rideDetails[0].to_latitude),
            longitude: Number(rideDetails[0].to_longitude),
            latitudeDelta: 0.0016185867283340372,
            longitudeDelta: 0.0009847059845924377,
        })
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
                                       fromCordinates
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
                                    }}>
                                    <Fontisto name='car'
                                        size={17} color='white' style={styles.fromMarker} />
                                </Marker>
                                {/* <View>
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
                                </View> */}
                            </MapView>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={() => getPermissions()}
                            style={styles.allowGPSOpacity}>
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
                                textColor={Colors.getLightColor('primaryColor')}
                                androidVariant='iosClone'
                                dividerHeight={5}
                                onDateChange={(date) => {
                                    setDateAdded(moment(date).format('LLL'))
                                    setDate(date)
                                    let dateset = moment(date).format()
                                    let myDate = dateset.replace('T', ' ')
                                    let properDateis = myDate.slice(0, 19)
                                    console.log('changed is', properDateis)
                                    setApiDate(properDateis)
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

                    {/* {fareLoader ?
                        (
                            <View style={styles.indicator}>
                                <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                            </View>
                        )
                        :
                        ( */}
                            <View style={styles.fareMainView}>
                                {/* {rideSelected === false ?
                                    ( */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={styles.fareText}>
                                                Fare :  Pkr {'('} ~  {')'}
                                            </Text>
                                            <Text style={styles.distanceText}>
                                                KM
                                            </Text>
                                        </View>
                                    {/* )
                                    :
                                    (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={styles.fareText}>
                                                Fare : {pickandDropFare.fare} Pkr {'('} ~ {pickandDropFare.duration} {')'}
                                            </Text>
                                            <Text style={styles.distanceText}>
                                                {pickandDropFare.distance}KM
                                            </Text>
                                        </View>
                                    )
                                } */}
                                {/* <Text style={styles.fareText}>
                                    Fare : {pickandDropFare.fare} Pkr {'('} ~ {pickandDropFare.duration} {')'}
                                </Text> */}

                             </View>
                        {/* ) */}
                    {/* } */}

                    <View style={{ width: '90%', marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {confirmationLoader ?
                            (
                                <View style={styles.indicator}>
                                    <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                </View>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => ValidationCheck()}
                                    style={styles.deleteBookingOpacity}>
                                    <Text style={styles.confrimBookingText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

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
                                        Confirm Book
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CustomerEditRide