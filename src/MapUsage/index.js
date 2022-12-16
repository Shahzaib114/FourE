import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
// import { createStore } from 'redux';
import { AnimatedRegion, enableLatestRenderer } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../utility/colors/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
enableLatestRenderer();
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './style';
import CustomBackArrow from '../CustomBackArrow';
import Entypo from 'react-native-vector-icons/Entypo';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector, useDispatch } from 'react-redux';
import { getPickandDropLocations } from '../../store/Actions/getPickandDropLocations/getPickandDropDetails';

const MapScreen = ({ navigation }) => {

    let { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
    // counter = 0;
    // this.se
    const [searchText, setSearchText] = useState('Enter Destination');
    const [markerCheck, setMarkerCheck] = useState(false);
    const [destinationLabel, setdestinationLabel] = useState('');
    const [toolbarHackHeight, setToolbarHackHeight] = useState(0);
    const [currentLocationLabel, setCurrentLocationLabel] = useState('');
    const [displayView, setDisplayView] = useState(true);
    const [PickDropDetails, setPickDropDetails] = useState('');
    const [modalVisibility, setModalVisibility] = useState(true);
    function showToolBarHack() {
        const heightDiff = 0.5; // we don't want to change the height too much so keep it small. I've noticed 0.5 works best, as opposed to 0.1 doesn't work at all, and 0.5 is barely noticeable to the user.
        // switch the height between 0 and 0.5 and back.
        setToolbarHackHeight(
            toolbarHackHeight === heightDiff
                ? toolbarHackHeight - heightDiff
                : toolbarHackHeight + heightDiff,
        );
    }
    // const {position, destination} = state

    const loading = useSelector((state) => state.pickDropDetails.runLoader)
    const data = useSelector((state) => state.pickDropDetails.data)
    const error = useSelector((state) => state.pickDropDetails.error)
    const dispatch = useDispatch();


    useEffect(() => {
        // getPermissions()
        dispatch(getPickandDropLocations())
    }, []);

    // useEffect(() => {
        
    // }, [loading]);




    useEffect(() => {
        console.log('loading before: ', loading)
        if (!loading && data != null) {
            setFromCordinates({
                latitude: Number(data.from_latitude),
                longitude: Number(data.from_longitude),
            })
            setToCordinates({
                latitude: Number(data.to_latitude),
                longitude: Number(data.to_longitude),
            })
            console.log('loading after: ', loading)

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

            Geocoder.init('AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM')
            Geocoder.from(crd.latitude, crd.longitude)
                .then(json => {
                    console.log('full location is', json.results[0].formatted_address)
                    setCurrentLocationLabel(json.results[0].formatted_address)
                })
                .catch(error => console.warn(error));
        }).catch((err) => {
            console.log(err);
        });
    }, [loading]);

    const mapRef = useRef();
    return (
        <View style={styles.mainContainer}>

            <MapView
                toolbarEnabled={true}
                // onMarkerPress={() => showToolBarHack()}
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                provider='google'
                showsBuildings={true}
                showsTraffic={true}
                ref={mapRef}
                style={styles.map}
                zoomEnabled={true}
                initialRegion={position}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                // zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                maxZoomLevel={17.5}
                region={position}
                loadingEnabled
                onPress={(txt) => {
                    console.log('place information is', txt)
                }}
                userLocationAnnotationTitle
                userInterfaceStyle='dark'
                onMarkerDrag={(region) => {
                    console.log(" region", region)
                }
                }
                onRegionChange={(region) => {
                    console.log(" region", region)
                }
                    // console.log(" region", position)
                }
            >

                {/* {markerCheck ?
                    (
                        <View>
                            <MapViewDirections
                                // timePrecision={true}
                                origin={position}
                                // waypoints={true}
                                destination={{
                                    latitude: 33.73804500,
                                    longitude: 73.08448800,
                                    latitudeDelta: 0.0016185867283340372,
                                    longitudeDelta: 0.0009847059845924377
                                }}
                                apikey={'AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM'}
                                strokeWidth={3}
                                strokeColor="blue"
                                strokeColors={'green'}
                                // optimizeWaypoints={true}
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

                            <Marker
                                title={destinationLabel}
                                description={destinationLabel}
                                coordinate={
                                    {
                                        latitude: destination.latitude,
                                        longitude: destination.longitude,
                                    }
                                }
                                draggable={false}
                                onDragStart={(e) => {
                                    console.log('drag start', e.nativeEvent.position)
                                }}
                                onDragEnd={(e) => {
                                    console.log('drag end', e.latitude);
                                    setPosition({
                                        latitude: e.nativeEvent.coordinate.latitude,
                                        longitude: e.nativeEvent.coordinate.longitude,
                                    })
                                }}
                            >
                            </Marker>

                        </View>
                    )
                    :
                    (
                        console.log('not checked')
                    )
                } */}
                <Marker
                    // title={currentLocationLabel}
                    // description={currentLocationLabel}
                    pinColor='red'

                    coordinate={
                        {
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }
                    }

              
                >

                    <MaterialCommunityIcons name='map-marker-account-outline' size={40} color='black' />
                    <Callout style={{ width: Dimensions.get('window').width * 0.8 }}>
                        <View style={{ width: '80%' }}>
                            <Text style={{ width: '90%' }}>
                                {currentLocationLabel}
                            </Text>
                        </View>

                    </Callout>
                </Marker>
            </MapView>

            <View style={{
                position: 'absolute',
                // flex:1,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>

                <TouchableOpacity onPress={() => navigation.openDrawer()}
                    style={styles.touchableDrawer}
                >
                    <Entypo name='menu' size={30} color="#0887FC"
                    />
                </TouchableOpacity>

                {/* <GooglePlacesAutocomplete
                    textInputProps={
                        {
                            clearButtonMode: 'always',
                            clearTextOnFocus: true,
                            onChangeText: (txt) => setSearchText(txt)
                            // onChangeText: (txt) => {
                            //     console.log(txt)
                            //     setSearchText(txt)
                            // }
                        }
                    }
                    fetchDetails={true}
                    enableHighAccuracyLocation={true}
                    GooglePlacesSearchQuery={{ radius: 3000 }}

                    // currentLocation={true}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    minLength={1}
                    styles={{
                        container: {
                            // width: '38%',
                            marginTop: '5%',
                            borderRadius: 10
                        },
                    }}
                    placeholder={searchText}
                    // ref={searchText}

                    onPress={(data, details = null) => {
                        console.log(data.description);
                        setdestinationLabel(data.description);
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0016185867283340372,
                            longitudeDelta: 0.0009847059845924377,
                        })
                        setMarkerCheck(true)

                    }}
                    currentLocationLabel={destinationLabel}
                    query={{
                        key: 'AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM',
                        language: 'en',
                        // type: "establishment",
                        radius: 3000,
                        // components: "country: pk",
                        location: `${destination.latitude}, ${destination.longitude}`
                    }}
                    onFail={error => console.error(error)}
                /> */}
            </View>

            <Modal style={{
                 justifyContent: 'center',alignItems:'center'
            }}
                visible={modalVisibility}>
                <View style={styles.mainHeader}>
                    <Text style={styles.tripText}>
                        Incoming Ride
                    </Text>
                    <View style={{ height: '60%', width: '90%', }}>
                        <MapView

                            toolbarEnabled={true}
                            // onMarkerPress={() => showToolBarHack()}
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
                            }}
                            // userLocationAnnotationTitle
                            // userInterfaceStyle='dark'
                            onMarkerDrag={(region) => {
                                console.log(" region", region)
                            }
                            }
                            onRegionChange={(region) => {
                                console.log(" region", region)
                            }
                                // console.log(" region", position)
                            }

                        >
                            <Marker
                                tracksViewChanges={false}
                                title={PickDropDetails.from}
                                // description='bjkb,m '

                                coordinate={
                                    {
                                        latitude: fromCordinates.latitude,
                                        longitude: fromCordinates.longitude,
                                    }
                                }

                            >
                                <MaterialCommunityIcons name='map-marker' size={40} color='black' style={{ padding: '2%' }} />

                            </Marker>

                            <Marker
                                title={PickDropDetails.to}
                                // pinColor='red'
                                coordinate={{
                                    latitude: toCordinates.latitude,
                                    longitude: toCordinates.longitude,

                                }
                                    // {
                                    //     latitude: Number(PickDropDetails.to_latitude),
                                    //     longitude: Number(PickDropDetails.to_longitude),
                                    // }
                                }

                            >
                                <MaterialCommunityIcons name='map-marker-account-outline' size={40} color='red' style={{ padding: '2%' }} />
                            </Marker>



                            <View>
                                <MapViewDirections
                                    origin={{
                                        latitude: 34.02591700,
                                        longitude: 71.56013500,
                                        // latitudeDelta: 0.015,
                                        // longitudeDelta: 0.0121,
                                    }}
                                    destination={{
                                        latitude: 33.73804500,
                                        longitude: 73.08448800,
                                        // latitudeDelta: 0.015,
                                        // longitudeDelta: 0.0121,
                                    }}
                                    apikey={'AIzaSyA49jdy5QYjxO5ZF1tak5BgcCeeesLzRGM'}
                                    strokeWidth={3}
                                    lineDashPattern={[0]}
                                    strokeColor="blue"
                                    strokeColors={'green'}
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

                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <TouchableOpacity onPress={() => setModalVisibility(false)}
                            style={{
                                width: '45%', backgroundColor: Colors.getLightColor('mustardColor'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 10
                            }}>
                            <Text style={{ color: Colors.getLightColor('whiteColor'), padding: '5%' }}>
                                Reject
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '45%', marginLeft: '5%', backgroundColor: Colors.getLightColor('greenColor'),
                            padding: '5%', justifyContent: 'center', alignItems: 'center', borderRadius: 10
                        }}>
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                Accept
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>

        </View>
    )
};
export default MapScreen;