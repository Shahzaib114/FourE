import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../../customDrawerIcon';
import Colors from '../../../utility/colors/Colors';
import ClientLayer from '../../../components/Layers/ClientLayer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GettingCustomerScheduling } from '../../../store/Actions/CustomerFutureRides/CustomerFutureRides';
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const CustomerUpComingTrips = ({ navigation }) => {
    const [showDate, setShowDate] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [netModalVisible, setNetModalVisible] = useState(false)

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.day}</Text>
            <Text style={[styles.title, textColor]}>{item.date}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('primaryColor');
        const color = item.id === selectedId ? Colors.getLightColor('whiteColor') : Colors.getLightColor('whiteColor');
        return (
            <View >
                <Item
                    item={item}
                    onPress={() => {
                        setSelectedId(item.id)
                        console.log(item.id)
                    }}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </View>
        )
    }

    const CartItems = [
        {
            id: '1', name: "Russ Hant", ItemNum: '3 Items x ', date: '24 june, 12:30', status: "Cancelled  ",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$20.10', colortext: 'orange', color: "red", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '2', name: "Alexa", ItemNum: '4 Items x ', date: '25 june, 12:20', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$16.40', colortext: 'green', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '3', name: "Shahzaib", ItemNum: '2 Items x ', date: '25 june, 1:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$13.20', colortext: 'purple', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '4', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '5', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '6', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '7', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '8', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '9', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
    ]

    const CartItems1 = [
        {
            id: '1', name: "Russ Hant", ItemNum: '3 Items x ', date: '24 june, 12:30', status: "Cancelled  ",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$20.10', colortext: 'orange', color: "red", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '2', name: "Alexa", ItemNum: '4 Items x ', date: '25 june, 12:20', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$16.40', colortext: 'green', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '3', name: "Shahzaib", ItemNum: '2 Items x ', date: '25 june, 1:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$13.20', colortext: 'purple', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
    ]

    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState();
    const [isSchedule, setIsSchedule] = useState(false);

    const loading = useSelector((state) => state.customerScheduleRide.runLoader)
    const data = useSelector((state) => state.customerScheduleRide.data)
    const error = useSelector((state) => state.customerScheduleRide.error)
    const dispatch = useDispatch();

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
            let UserId = JSON.parse(result)
            console.log('id is', UserId)
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                    setIsSchedule(true)
                } else {
                    dispatch(GettingCustomerScheduling({
                        customer_id: UserId
                    }))
                }
            })

        })
    }, []);

    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            if (data.data === 'error') {
                setIsSchedule(true)
            } else {
                setIsSchedule(false)
                setTravelHistoryArray(data.data)
            }
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])

    const refreshEnd = () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
                setIsSchedule(true)
            } else {
                setRefreshing(true)
                ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
                    let UserId = JSON.parse(result)
                    dispatch(GettingCustomerScheduling({
                        customer_id: UserId
                    }))
                })
                setRefreshing(false)
            }
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                    setIsSchedule(true)
                } else {
                    ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
                        let UserId = JSON.parse(result)
                        dispatch(GettingCustomerScheduling({
                            customer_id: UserId
                        }))
                    })
                }
            })

            // console.log('navigateToNext inside useeeffect',navigateToNext)
            console.log('Refreshed in history!');
        })
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
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
                                onPress={() => { setNetModalVisible(false) }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.HeaderViewStyle}>
                <View style={styles.HeaderViewStyle}>
                    <View style={styles.barViewStyle}>
                        <CustomeDrawerIcon />
                        <TouchableOpacity style={styles.headerImageOpacity}
                            onPress={() => navigation.navigate('CustomerProfileScreen')}>
                            <Image source={require('../../../assets/Images/imgTwo.jpg')}
                                style={styles.headerImageStyle}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.carImageView}>
                        <Text style={styles.notificationsText}>
                        Scheduled Rides
                        </Text>
                        <MaterialCommunityIcons style={styles.notificationIcon}
                            name='layers-triple-outline' size={30}
                            color={Colors.getLightColor('primaryColor')}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.78,}}>
                {displayView ?
                    (
                        <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                        </View>
                    )
                    :
                    (
                        <View style={styles.flatlistParentView}>
                            {isSchedule ?
                                (
                                    <View style={{height: Dimensions.get('window').height * 0.70,
                                         justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                        <Text style={styles.noHistoryText}>
                                            No history
                                        </Text>
                                    </View>
                                )
                                :
                                (
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={() => refreshEnd()}
                                            />
                                        }
                                        keyExtractor={(item, index) => {
                                            return index.toString();
                                        }}
                                        horizontal={false}
                                        data={travelHistoryArray}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.allitemsView}>
                                                <View style={styles.textualMainView}>
                                                    <View style={styles.IconsView}>
                                                        <Octicons name='dot-fill' size={25} color={Colors.getLightColor('secondaryColor')}
                                                            style={styles.dotIcon}
                                                        />
                                                        <View style={styles.verticalLine} />
                                                        <Fontisto name='rectangle' size={15} color={Colors.getLightColor('secondaryColor')} 
                                                       >
                                                        </Fontisto>
                                                    </View>

                                                    <View style={{width:'90%', justifyContent:'space-between'}}>
                                                    {/* <Text style={styles.pickUpText}> */}
                                                      <Text style={styles.userNameText}>
                                                      {item.from}
                                                        {/* </Text>  */}
                                                    </Text>
                                                    {/* <Text style={styles.rideTypeText}>
                                                        {item.name}
                                                    </Text> */}
                                                    {/* <Text style={styles.dropText}> */}
                                                      <Text style={styles.locationtypeText}>
                                                      {item.to}
                                                      </Text>
                                                    {/* </Text> */}
                                                    </View>

                                                </View>
                                                <View style={styles.datedView}>
                                                    {/* <Text style={styles.DateText}>
                                                    Date: {' '} */}
                                                        <Text style={styles.datedText}>
                                                        {moment(item.date).format('MMMM Do YYYY, hh:mm a')}
                                                        {/* </Text> */}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    >
                                    </FlatList>
                                )}
                        </View>
                    )}
            </View>
        </View>
    )
};
export default CustomerUpComingTrips;
