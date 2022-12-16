import React, { useEffect, useRef } from 'react'
import { View, Image, Text, TouchableOpacity, ImageBackground, AppState } from 'react-native'
import Colors from '../../../utility/colors/Colors';
import styles from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import ClientLayer from '../../../components/Layers/ClientLayer';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const CustomerHeader = (props) => {
    const navigation = useNavigation();
    const [ridename] = useState('Incoming Ride');
    const { leftIcon, label, book_id, screen_icon, screen_info, screen_name, userorDriverProfile, rideStatus } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [rideStatusVisible, setRideStatusVisible] = useState(false);
    const [navigationPath, setNavigationPath] = useState('');
    const [jobId, setJobId] = useState('');
    const appState = useRef(AppState.currentState);

    return (
        <View style={styles.headerView}>
            <Modal
                animationIn={'bounceInLeft'}
                visible={modalVisible}
                style={styles.modalStyle}
            >
                <View>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('../../../assets/Images/FourELogo.png')}>
                    </Image>

                </View>
                <View style={styles.childDataHeader}>
                    {screen_icon}
                    <Text style={styles.screenNameText}>
                        {screen_name}
                    </Text>
                    <Text style={styles.screenInfoText}>
                        {screen_info}
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.hideOpacity}>
                        <Text style={styles.hideText}>
                            Hide
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.iconandImageView}>
                <TouchableOpacity style={{ justifyContent: 'center' }}>
                    {leftIcon}
                </TouchableOpacity>
                {rideStatusVisible &&
                    <TouchableOpacity
                        onPress={() => {
                            pressedOnRide()
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center', margin: '2%', borderRadius: 5, flexDirection: 'row'
                        }}>
                        <Text style={{ color: 'black', fontSize: 15, paddingHorizontal: '4%', fontFamily: 'Montserrat-Medium', }}>
                            {rideStatus}
                        </Text>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            {/* <Text style={{
                                    backgroundColor: Colors.getLightColor('secondaryColor'), alignSelf: 'center',
                                    textAlign: 'center',  borderRadius: 70,
                                    fontSize: 4, fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('primaryColor')
                                }}>
                                    Finding {'\n'} Ride
                                </Text> */}
                            <FontAwesome5 name='car-side' size={15} color={Colors.getLightColor('secondaryColor')}></FontAwesome5>
                            <Ring delay={0} />
                            <Ring delay={1000} />
                            <Ring delay={1500} />
                            <Ring delay={2000} />
                        </View>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={styles.imageOpacity}
                    onPress={() => navigation.navigate(userorDriverProfile)}>
                    <Image source={require('../../../assets/Images/imgTwo.jpg')}
                        style={styles.imageStyle}>
                    </Image>
                </TouchableOpacity>
            </View>
            <View style={styles.carView}>
                <ImageBackground source={require('../../../assets/Images/carImage.png')}
                    style={styles.carImageStyle}>
                    <Text style={styles.labeltext}>
                        {label}
                    </Text>
                    <View style={styles.bookingIdParent}>
                        <Text style={styles.bookingIdText}>
                            {book_id}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <EvilIcons name='exclamation' size={18} style={styles.excalamtionOpacity}>
                            </EvilIcons>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}
export default CustomerHeader;