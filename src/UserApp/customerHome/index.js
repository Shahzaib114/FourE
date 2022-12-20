import { Dimensions, View, Text, ScrollView, Image, TextInput, Modal, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, } from 'react-native'
import React, { useState, useEffect, Alert, useRef } from 'react';
import CustomeDrawerIcon from '../../customDrawerIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../../utility/colors/Colors';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import { useNavigation } from '@react-navigation/native';
import { onResetCurrentRide } from '../../../store/Actions/CustomerBookingConfirmation/ConfirmBooking';
import { onResetCustomerProfile } from '../../../store/Actions/CustomerProfile/CustomerProfile';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import ClientLayer from '../../../components/Layers/ClientLayer';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import NetInfo from "@react-native-community/netinfo";

const CustomerHomePage = (route) => {
    const navigation = useNavigation()
    const [rideStatus, setRideStatus] = useState('')
    const [rideStatusVisible, setRideStatusVisible] = useState(false);
    const [navigationPath, setNavigationPath] = useState('');
    const [netModalVisible, setNetModalVisible] = useState(false)

    const [destination, setDestination] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            onResetCurrentRide()
            onResetCustomerProfile()
        });
        return unsubscribe;
    }, [navigation]);

    const entries = [
        {
            id: '1', title: 'shahzaib', header: 'Planning a Big trip?', img: require('../../../assets/Images/Featured1.png')
        },
        {
            id: '2', title: 'Ali', header: 'Planning a Two Way trip?', img: require('../../../assets/Images/Featured2.png')
        },
        {
            id: '3 ', title: 'Ali', header: 'Planning a Monthly trip?', img: require('../../../assets/Images/Featured3.png')
        },
        {
            id: '4', title: 'shahzaib', header: 'Planning a Weekly trip?', img: require('../../../assets/Images/Featured1.png')
        },
        {
            id: '5', title: 'Ali', header: 'Planning a One Way trip?', img: require('../../../assets/Images/Featured2.png')
        },
        {
            id: '6', title: 'Ali', header: 'Planning a big trip?', img: require('../../../assets/Images/Featured3.png')
        }
    ]
    const entries2 = [
        {
            id: '1', title: 'shahzaib', name: 'SHahzaib', img: require('../../../assets/Images/Featured2.png'),
        },
        {
            id: '2', title: 'Ali', name: 'Ali', img: require('../../../assets/Images/Featured1.png')
        }
    ]

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('rideOnTheWay', result => {
            let isStarted = JSON.parse(result)
            if (isStarted === 'OTW') {
                setRideStatus('OnGoing Ride')
                setRideStatusVisible(true)
                setNavigationPath('CurrentRideDetails')
            }
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('completed', completeRideData => {
            let rideComplete = JSON.parse(completeRideData)
            if (rideComplete == true) {
                navigation.navigate('AccountCreated',
                    {
                        paramModal: true
                    }
                )
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
        })
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                if (remoteMessage.data.type == 'rideCompleted') {
                    navigation.navigate('AccountCreated',
                        {
                            paramModal: true
                        }
                    )
                }
            }
        })


        RNPusherPushNotifications.on('notification', (txt) => {
            console.log('notifiaction', NotificationData(txt))
        })
    }, []);

    const NotificationData = (txt) => {
        console.log('data of notification is', txt.data.type)
        if (txt.data.type == 'rideCompleted') {
            navigation.navigate('AccountCreated',
                {
                    paramModal: true
                }
            )
        }
    }

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
        return <Animated.View style={[styles.ring, ringStyle]} />
    };

    const pressedOnRide = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                PushNotification.cancelAllLocalNotifications()
                navigation.navigate(navigationPath)
            }
        })
    }

    const _gotoBookRide = async () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                if (rideStatusVisible) {
                    alert('Please Complete Your Ongoing Ride, and try again!')
                }
                else {
                    navigation.navigate('PickDropDetails')
                }
            }
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            ClientLayer.getInstance().getDataManager().GetValueForKey('rideOnTheWay', result => {
                ClientLayer.getInstance().getDataManager().GetValueForKey('RiderOTW', resultOTW => {
                    let RiderOTW = JSON.parse(resultOTW)
                    let isStarted = JSON.parse(result)
                    if (isStarted === 'OTW') {
                        setRideStatus('OnGoing Ride')
                        setRideStatusVisible(true)
                        setNavigationPath('CurrentRideDetails')
                    }
                    else {
                        setRideStatusVisible(false)
                    }
                })
            })
            console.log('Refreshed in history!');
        })
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ flex: 1 }}>
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
                                No Internet, Last Location Shared
                            </Text>
                        </View>
                        <View style={styles.netSecondMainView}>
                            <Text style={styles.netTurnOnWifiText}>
                                Rider will arrive at your last location. To track Rider, Please Turn On Your Wifi or Check Your Mobile Data !
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
            <ScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.iconandImageView}>
                    <CustomeDrawerIcon />
                    {rideStatusVisible && (
                        <TouchableOpacity
                            onPress={() => {
                                pressedOnRide()
                            }}
                            style={styles.pressedOnRideOpacity}>
                            <Text style={styles.rideStatusText}>
                                {rideStatus}
                            </Text>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <FontAwesome5 name='car-side' size={15} color={Colors.getLightColor('secondaryColor')}></FontAwesome5>
                                <Ring delay={0} />
                                <Ring delay={1000} />
                                <Ring delay={1500} />
                                <Ring delay={2000} />
                            </View>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.imageOpacity}
                        onPress={() => navigation.navigate('CustomerProfileScreen')}
                    >
                        <Image source={require('../../../assets/Images/imgTwo.jpg')}
                            style={styles.imageStyle}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.firstView}>
                    <Swiper
                        loop={true}
                        autoplay
                        from={1}
                        activeDotColor={Colors.getLightColor('secondaryColor')}
                        activeDotStyle={{ width: '5%' }}
                        dot={<View style={styles.swiperDor} />}
                        showsPagination={true}
                        autoplayTimeout={2}
                    >
                        {
                            entries.map(item => {
                                return (
                                    <View key={item.id} style={styles.swiperFirstView} >
                                        <View style={styles.swiperChildView}>
                                            <Text style={styles.swiperHeaderText}>
                                                {item.header}
                                            </Text>
                                            <Text style={styles.rideWith4EText}>
                                                Ride with 4E
                                            </Text>
                                            <TouchableOpacity onPress={() => alert('Clicked')}
                                                style={styles.letsGoOpacity}>
                                                <Text style={styles.letsGoText}>
                                                    Lets Go
                                                </Text>
                                                <AntDesign name='caretright' color={'white'} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.swiperImageView}>
                                            <Image source={item.img}
                                                style={styles.swiperImage}
                                            >
                                            </Image>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>

                <View style={styles.secondView}>
                    <ImageBackground source={require('../../../assets/Images/CustomerHomeImage.png')}
                        style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 5 }}
                    >
                        <TouchableOpacity onPress={() => _gotoBookRide()}
                            style={styles.bookRideOpacity}>
                            <ImageBackground source={require('../../../assets/Images/CustomerHomeBlueShade.png')}
                                style={styles.bookRideImage} imageStyle={{ borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                            >
                                <Text style={styles.bookRideText}>
                                    Book a Trip
                                </Text>
                                <AntDesign name='caretright' size={20} style={styles.bookRideIcon}></AntDesign>
                            </ImageBackground>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.thirdView}>
                    <TouchableOpacity style={styles.sendParcelOpacity}>
                        <Text style={styles.sendParcelText}>
                            Send Parcel
                        </Text>
                        <View style={styles.verticleLine}></View>
                        <Image source={require('../../../assets/Images/gift.png')} style={styles.gidtImage}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendParcelOpacity}>
                        <Text style={styles.sendParcelText}>
                            Order Food
                        </Text>
                        <View style={styles.verticleLine}></View>
                        <Image source={require('../../../assets/Images/food.png')} style={styles.foodImage}>
                        </Image>
                    </TouchableOpacity>

                    <View style={{ width: '90%', marginHorizontal: '5%' }}>
                        <Text style={styles.featuedTrip}>
                            Featured Trips
                        </Text>
                        <FlatList
                            keyExtractor={(item, index) => {
                                return index.toString();
                            }}
                            data={entries}
                            horizontal
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    console.log('id of selectd item is: ', item.id)
                                }}
                                    style={{ borderRadius: 10, }}>
                                    <Image source={item.img} style={{
                                        borderRadius: 10,
                                        marginHorizontal: 5, marginVertical: 5
                                    }}>
                                    </Image>
                                </TouchableOpacity>
                            )}
                        >
                        </FlatList>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CustomerHomePage;