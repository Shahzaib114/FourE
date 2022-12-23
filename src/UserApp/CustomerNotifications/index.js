import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import CustomeDrawerIcon from '../../customDrawerIcon';
import Colors from '../../../utility/colors/Colors';
import { NotificationData } from '../../../store/Actions/CustomerNotifications/NotificationData';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const CustomerNotificationScreen = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const loading = useSelector((state) => state.customernotifications.runLoader)
    const data = useSelector((state) => state.customernotifications.data)
    const error = useSelector((state) => state.customernotifications.error)
    const dispatch = useDispatch();
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);

    const [netModalVisible, setNetModalVisible] = useState(false)

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                dispatch(NotificationData())
            }
        })

    }, []);

    useEffect(() => {
        setIsLoading(loading)
        if (!loading && data != null) {
            setTravelHistoryArray(data)
        }
        else if (!loading && error != null) {
            console.log('success', error)
        }
    }, [loading])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                } else {
                    dispatch(NotificationData())
                }
            })
        });
        return unsubscribe;
    }, [navigation]);

    const refreshEnd = () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                setIsLoading(true)
                dispatch(NotificationData())
                setIsLoading(false)
            }
        })
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
                                onPress={() => { setNetModalVisible(false),navigation.goBack() }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.HeaderViewStyle}>
                <View style={styles.barViewStyle}>
                    <CustomeDrawerIcon />
                    <TouchableOpacity style={styles.prifileImageView}
                        onPress={() => navigation.navigate('CustomerProfileScreen')}>
                        <Image source={require('../../../assets/Images/user2.png')}
                            style={styles.profileImageStyle}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.carImageView}>
                    <Text style={styles.notificationsText}>
                        Notifications
                    </Text>
                    <Ionicons style={styles.notificationIcon}
                        name='notifications' size={30}
                        color={Colors.getLightColor('primaryColor')}
                    />
                </View>
            </View>
            <View style={styles.displayFlatListHeader}>
                {isLoading ?
                    (
                        <View >
                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                        </View>
                    )
                    :
                    (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={() => refreshEnd()}
                                />
                            }
                            keyExtractor={(item, index) => {
                                return index.toString();
                            }}
                            data={travelHistoryArray}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.notificationAPIIcon}>
                                    <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.mainTextStyle}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.subTextStyle}>
                                            {item.content}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        >
                        </FlatList>
                    )}
            </View>
        </View>
    )
};
export default CustomerNotificationScreen;