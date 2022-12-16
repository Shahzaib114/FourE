import { Dimensions, View, Text, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { Component, useState, useEffect, Alert, useRef } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../../utility/colors/Colors';
import StarRating from 'react-native-star-rating-widget';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import CustomeHeader from '../customeHeader';
import CustomBackArrow from '../CustomBackArrow';

const TripDetails = ({ navigation, route }) => {
    let { width, height } = Dimensions.get('window');
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
    useEffect(() => {
        getPermissions()
        setPickDropDetails(route.params.paramData)
        setFromCordinates({
            latitude: Number(route.params.paramData.from_latitude),
            longitude: Number(route.params.paramData.from_longitude),
        })
        setToCordinates({
            latitude: Number(route.params.paramData.to_latitude),
            longitude: Number(route.params.paramData.to_longitude),
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
    const [customStarRating, setCustomStarRating] = useState(3.5);
    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }
    const mapRef = useRef();
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <CustomeHeader
                    label={"Trip Details"}
                    leftIcon={
                        <CustomBackArrow />
                    }
                    userorDriverProfile={'ProfileScreen'}
                    book_id={`Booking Id: ${PickDropDetails.job_booking_id}`}
                    screen_icon={
                        <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    screen_name={'Trip Details'}
                    screen_info={`Here you can see the following details of your recent Trips ${'\n'} 
                    1 : Booking Id of your Trip${'\n'}
                    2 : Trip Starting Lcoation${'\n'}
                    3 : Trip Ending Location${'\n'}
                    4 : Trip Date and Amount ${'\n'}
                    5 : Time and Payment Method${'\n'}
                    6 : Customer Name${'\n'}
                    7 : Customer rating${'\n'}
                    8 : Contact Customer`
                    }

                >
                </CustomeHeader>
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
                                    }}>
                                    <Fontisto name='car'
                                        size={17} color='white' style={styles.fromMarker} />
                                </Marker>
                                <View>
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
                                    />
                                </View>
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
                <View style={{ height: Dimensions.get('window').height * 0.35, justifyContent: 'space-around' }}>
                    <View style={{ height: '25%', justifyContent: 'center' }}>
                        <View style={styles.dateCashView}>
                            <Text style={styles.dateCashText}>
                                {PickDropDetails.date}
                            </Text>
                            <Text style={styles.dateCashText}>
                                {PickDropDetails.price}
                            </Text>
                        </View>
                        <View style={styles.dateCashView}>
                            <Text style={styles.dateCashText}>
                                {PickDropDetails.time}
                            </Text>
                            <Text style={styles.dateCashText}>
                                Direct Cash
                            </Text>
                        </View>
                        <View style={styles.dateCashView}>
                            <Text style={styles.dateCashText}>
                                Distance Traveled
                            </Text>
                            <Text style={styles.dateCashText}>
                                {PickDropDetails.distance}KM
                            </Text>
                        </View>
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
                                {PickDropDetails.from}
                            </Text>
                            <Text
                                style={styles.locationText}>
                                {PickDropDetails.to}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.userDetailsView}>
                        <View style={styles.userdetailsText}>
                            <View>
                                <Text style={styles.usernameText}>
                                    Usman Bhatti
                                </Text>
                                <View style={styles.ratingNumber} pointerEvents='none'>
                                    <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                        {customStarRating}.00 {' '}
                                    </Text>
                                    <StarRating
                                        style={{ alignSelf: 'center', }}
                                        rating={customStarRating}
                                        onChange={(rating) => {
                                            onStarRatingPress(rating)
                                        }}
                                        maxStars={5}
                                        minRating={1}
                                        starSize={13}
                                        enableHalfStar={false}
                                    />
                                </View>
                                {/* <TouchableOpacity style={styles.contactCustomerOpacity}>
                                    <Text style={{ borderRadius: 5, fontFamily: 'Montserrat-Medium' }}>
                                        Contact Customer
                                    </Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default TripDetails;