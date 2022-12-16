import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import CustomeDrawerIcon from '../../customDrawerIcon';
import Colors from '../../../utility/colors/Colors';
import { NotificationData } from '../../../store/Actions/CustomerNotifications/NotificationData';

const CustomerNotificationScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const loading = useSelector((state) => state.customernotifications.runLoader)
    const data = useSelector((state) => state.customernotifications.data)
    const error = useSelector((state) => state.customernotifications.error)
    const dispatch = useDispatch();
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);

    useEffect(() => {
        dispatch(NotificationData())
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

    const refreshEnd = () => {
        setIsLoading(true)
        dispatch(NotificationData())
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.HeaderViewStyle}>
                <View style={styles.barViewStyle}>
                    <CustomeDrawerIcon />
                    <TouchableOpacity style={styles.prifileImageView}
                        onPress={() => navigation.navigate('CustomerProfileScreen')}>
                        <Image source={require('../../../assets/Images/imgTwo.jpg')}
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