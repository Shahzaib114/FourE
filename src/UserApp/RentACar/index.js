import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Linking, Modal, PermissionsAndroid, Platform, ActivityIndicator, AppState, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomBackArrow from '../../CustomBackArrow';
import Colors from '../../../utility/colors/Colors';
import { _CancelRide } from '../../../store/Actions/CancelRide/CacncelRide';
import { _CancelReason } from '../../../store/Actions/CancelReason/CacncelRideReason';
import CustomerHeader from '../CustomerHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { RefreshControl } from 'react-native-gesture-handler';
import moment from 'moment';

const CustomerRentACar = ({ route, delay }) => {
    const [netModalVisible, setNetModalVisible] = useState(false)
    const [displayView, setDisplayView] = useState(false);
    const [isSchedule, setIsSchedule] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const travelHistoryArray = [
            {
                id: '1', company: 'NetTech', carAndColor: 'Yamaha Red Color ', price: 'Rs. 3500 / Day',
                 img: require('../../../assets/Images/Featured1.png')
            },
            {
                id: '2', company: 'Metro', carAndColor: 'Mehran Grey Color ', price: 'Rs. 2000 / Day',
                img: require('../../../assets/Images/Featured2.png')
            },
            {
                id: '3 ', company: 'Hafeez Rent a Car', carAndColor: 'Mehran Grey Color ', price: 'Rs. 2500 / Day',
                img: require('../../../assets/Images/Featured3.png')
            },
            {
                id: '4', company: 'T. Rides', carAndColor: 'Mehran Grey Color ', price: 'Rs. 1500 / Day',
                img: require('../../../assets/Images/Featured1.png')
            },
            {
                id: '5', company: 'Fast Bookings', carAndColor: 'Mehran Grey Color ', price: 'Rs. 2000 / Day',
                img: require('../../../assets/Images/Featured2.png')
            },
            {
                id: '6', company: '24/7 Rent a Car', carAndColor: 'Mehran Grey Color ', price: 'Rs. 1000 / Day',
                img: require('../../../assets/Images/Featured3.png')
            }
    ]

    const refreshEnd = () => {
        // NetInfo.fetch().then(state => {
        //     if (state.isInternetReachable === false) {
        //         setNetModalVisible(true)
        //         setIsSchedule(true)
        //     } else {
        //         setRefreshing(true)
        //         ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
        //             let UserId = JSON.parse(result)
        //             dispatch(GettingCustomerScheduling({
        //                 customer_id: UserId
        //             }))
        //         })
        //         setRefreshing(false)
        //     }
        // })
    }

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
                                onPress={() => { setNetModalVisible(false), navigation.goBack() }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
                <CustomerHeader
                    label={"Rent a Car"}
                    leftIcon={
                        <CustomBackArrow />
                    }
                    userorDriverProfile={'CustomerProfileScreen'}
                    screen_icon={
                        <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                            style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                        />
                    }
                    screen_name={'Rent a Car'}
                    screen_info={`Here you can see the following details of Rent a Car${'\n'} 
                    1 : Picture of Car${'\n'}
                    2 : Name of Company${'\n'}
                    3 : Color of Car${'\n'}
                    4 : Rent details of car ${'\n'}
                    5 : Query Button${'\n'}`
                    }
                >
                </CustomerHeader>
                <View style={{ height: Dimensions.get('window').height * 0.78, }}>
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
                                    <View style={{
                                        height: Dimensions.get('window').height * 0.70,
                                        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                                    }}>
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
                                            <View
                                                onPress={() => {
                                                    //  console.log('is', item.job_id),
                                                    // _ValidateDetails(item.job_id)
                                                    //     // navigation.navigate('CustomerEditRide')
                                                }}
                                                style={styles.allitemsView}>
                                                {/* <View style={styles.textualMainView}> */}
                                                    {/* <View style={styles.IconsView}>
                                                        <Octicons name='dot-fill' size={25} color={Colors.getLightColor('secondaryColor')}
                                                            style={styles.dotIcon}
                                                        />
                                                        <View style={styles.verticalLine} />
                                                        <Fontisto name='rectangle' size={15} color={Colors.getLightColor('secondaryColor')}
                                                        >
                                                        </Fontisto>
                                                    </View> */}
                                                    <Image style={{
                                                         alignSelf: 'center',
                                                         height: Dimensions.get('window').height * 0.06,
                                                         width: Dimensions.get('window').width * 0.15,
                                                         marginRight:10,
                                                         
                                                    }}
                                                    source={require('../../../assets/Images/202210110712bike.png')}>
                                                    </Image>
                                                    <View style={styles.verticleLine}></View>

                                                    <View style={{justifyContent: 'space-between', width:'70%',marginVertical:'2%' }}>
                                                        <Text style={styles.userNameText}>
                                                            {item.company}
                                                        </Text>
                                                        <Text style={styles.locationtypeText}>
                                                            {item.carAndColor}
                                                        </Text>
                                                        <Text style={styles.locationtypeText}>
                                                            {item.price}
                                                        </Text>
                                                        <TouchableOpacity  style={{
                                                                color: Colors.getLightColor('primaryColor'),
                                                                fontWeight: '600',
                                                                fontFamily: 'Montserrat-Medium',
                                                                fontSize: 13,
                                                                backgroundColor:Colors.getLightColor('secondaryColor'),
                                                                width:'30%',
                                                                justifyContent:'center',
                                                                alignItems:'center',
                                                                borderRadius:5,
                                                                padding:'3%'
                                                            }}>
                                                            <Text style={styles.locationtypeText}>
                                                                Check-In
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                {/* </View> */}
                                            </View>
                                        )}
                                    >
                                    </FlatList>
                                )}
                        </View>
                    )}
            </View>

                
            {/* </ScrollView> */}
        </View>
    )
};
export default CustomerRentACar;