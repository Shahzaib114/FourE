import React, { useState, } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./style";
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from "@react-navigation/native";
import StarRating from 'react-native-star-rating-widget';
import ClientLayer from '../../../components/Layers/ClientLayer';
import Colors from '../../../utility/colors/Colors';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomerAppDrawer = (props) => {
    const navigation = useNavigation()
    const [userName, setUserName] = useState('Shahzaib Younus');
    const [customStarRating, setCustomStarRating] = useState(4);
    const [rideStatusVisible, setRideStatusVisible] = useState(false);

    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }

    const unsubscribe = interest => {
        console.log('unSubscribe', interest)
        RNPusherPushNotifications.unsubscribe(
            interest,
            (statusCode, response) => {
                console.log(statusCode, response);
            },
            () => {
                console.log('unsubscibed', interest)
            }
        );
    };

    const navigationhandle = () => {
        navigation.replace('CustomerLogin')
    }

    const [netModalVisible, setNetModalVisible] = useState(false)

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('rideOnTheWay', result => {
            let isStarted = JSON.parse(result)
            console.log('rise is', isStarted)
            if (isStarted === 'OTW') {
                setRideStatusVisible(true)
            } else {
                setRideStatusVisible(false)
            }
        })
    })

    const sessionHandle = () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
            } else {
                if (rideStatusVisible) {
                    alert('Please Complete Your Ongoing Ride, and try again!')
                } else {
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('completed', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('ridestarted', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideOnTheWay', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('rideData', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('fromLabel', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('toLabel', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('RiderOTW', JSON.stringify(null))
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('customer_id', JSON.stringify(null));
                    ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_id', JSON.stringify(null));
                    ClientLayer.getInstance().getDataManager().GetValueForKey('customerInstanceId', instanceId => {
                        let id = JSON.parse(instanceId)
                        unsubscribe(id)
                    })
                    navigationhandle()
                }
            }
        })

    }


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

            <View style={styles.secondaryView}>
                <View style={styles.imageView}>
                    <ImageBackground source={require('../../../assets/Images/user.png')}
                        style={styles.ImageStyling}
                        imageStyle={{ borderRadius: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CustomerProfileScreen')}>
                            <FontAwesome5 name='user-edit' size={15} color="black" style={styles.userEditIcon}>
                            </FontAwesome5>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.ProfileName}>{userName}</Text>
                <View style={styles.ratingNumber}>
                    <Text style={styles.ratingText}>
                        {customStarRating}
                    </Text>
                    <View style={{ width: '60%' }} pointerEvents='none'>
                        <StarRating
                            rating={customStarRating}
                            onChange={(rating) => {
                                onStarRatingPress(rating)
                                console.log(rating)
                            }}
                            maxStars={5}
                            minRating={1}
                            starSize={25}
                        />
                    </View>

                    {/* <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={customStarRating}
                    selectedStar= {(rating)=> onStarRatingPress(rating)}
                    /> */}
                    {/* <Entypo name='star' size={12} color="yellow" style={{ marginLeft: '5%', }}>
                    </Entypo>

                    <Entypo name='star' color="yellow" size={12} >
                    </Entypo>

                    <Entypo name='star' size={12} >
                    </Entypo> */}

                </View>
                <View style={styles.horizontalLineView} />
            </View>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false} >
                <View style={styles.DrawerItemsStyling}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.bottomImageView}>
                <TouchableOpacity onPress={() => alert('You will be directed to FourE Help Page')}
                    style={styles.helpButtonOpacity}>
                    <Text style={styles.contactUsText}>
                        Contact Us
                    </Text>
                    <Entypo name='help-with-circle' size={18} color={Colors.getLightColor('primaryColor')} />
                </TouchableOpacity>

                <ImageBackground style={styles.bottomImage}
                    source={require('../../../assets/Images/logoutBottomCornerButton.png')}>
                    <TouchableOpacity onPress={() => sessionHandle()}>
                        <Text style={styles.LogoutButtonText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
    )
}

export default CustomerAppDrawer;