import React, { useState } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Modal from "react-native-modal";
import styles from './style';
import Colors from '../../utility/colors/Colors';
import StarRating from 'react-native-star-rating-widget';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerFeedback, onResetCustomerFeedback } from '../../store/Actions/CustomerFeedback/CustomerFeedback';
import ClientLayer from '../../components/Layers/ClientLayer';
import { useNavigation } from '@react-navigation/native';
import { onResetCurrentRide } from '../../store/Actions/CustomerBookingConfirmation/ConfirmBooking';
import { onResetServiceTypes } from '../../store/Actions/getCustomerServiceTypes/ServiceTypes';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-actions';

const AccountCreated = ({ route }) => {
    const navigation = useNavigation()
    const loading = useSelector((state) => state.addingFeedbacktoDriver.runLoader)
    const data = useSelector((state) => state.addingFeedbacktoDriver.data)
    const error = useSelector((state) => state.addingFeedbacktoDriver.error)
    const dispatch = useDispatch();
    const [goToNext, setGoToNext] = useState(false);
    const [rideFare, setRideFare] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            onResetCustomerFeedback()
            setGoToNext(false)
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);
    const _sendingResponse = async () => {
        setGoToNext(true)
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id_RideDetails', result => {
            let driverId = JSON.parse(result)
            dispatch(CustomerFeedback(
                {
                    driver_id: driverId,
                    comments: driverComments,
                    star_rating: customStarRating,
                }
            ))
        })
    }

    useEffect(() => {
        if (!loading && data != null) {
            if (goToNext == true) {
                PushNotification.cancelAllLocalNotifications()
                ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('currentRidePrice', JSON.stringify(null))
                removingBackgroundAction()
                navigation.navigate('CustomerHomePage')
                onResetCurrentRide()
                onResetServiceTypes()
                setModalVisible(false)
            }
        }
        else if (!loading && error != null) {
            //code for error message display 
            alert('Credentials are Wrong')
        }
    }, [loading])
    const removingBackgroundAction = async () => {
        await BackgroundJob.stop()
    }
    const [customStarRating, setCustomStarRating] = useState(4);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(route.params.paramModal)
        ClientLayer.getInstance().getDataManager().GetValueForKey('currentRidePrice', result => {
            let fare = JSON.parse(result)
            if (fare != null || fare != 'null') {
                setRideFare(fare)
            }
        })

    }, [])


    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }

    const [driverComments, setDriverComments] = useState();
    const [driverId, setDriverId] = useState();
    return (
        <View style={styles.header}>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Image source={require('../../assets/Images/imgOne.jpg')}
                        style={styles.imageStyle}>
                    </Image>
                    <Text style={{ color: Colors.getLightColor('secondaryColor'), fontFamily: 'Montserrat-Medium' }}>
                        Jeniffer Winget
                    </Text>
                    <Text style={{ color: Colors.getLightColor('secondaryColor'), fontFamily: 'Montserrat-Medium', marginTop: '3%' }}>
                        How was your Trip for fare {rideFare}?
                    </Text>
                    <View style={styles.ratingView}>
                        <StarRating
                            style={styles.ratingStyle}
                            rating={customStarRating}
                            onChange={(rating) => {
                                onStarRatingPress(rating)
                            }}
                            maxStars={5}
                            minRating={1}
                            starSize={20}
                            enableHalfStar={false}
                            color={Colors.getLightColor('secondaryColor')}
                        />
                    </View>
                    <TextInput
                        placeholder='Please give your feedback'
                        placeholderTextColor={Colors.getLightColor('secondaryColor')}
                        underlineColorAndroid={Colors.getLightColor('secondaryColor')}
                        style={{ width: '90%', fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('secondaryColor') }}
                        onChangeText={(txt) => { setDriverComments(txt) }}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => {
                        _sendingResponse()
                    }}
                        style={styles.reviewView}>
                        <Text style={{
                            padding: '4%', paddingHorizontal: '8%',
                            color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium'
                        }}>
                            Submit Review
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
};
export default AccountCreated;
